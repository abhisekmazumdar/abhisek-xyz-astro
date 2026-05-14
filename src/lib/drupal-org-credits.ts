/**
 * Fetches Drupal.org contribution records and aggregates credits by sponsoring
 * organization for a given user. Paginates the full history at build time.
 */

const JSONAPI_BASE =
	'https://www.drupal.org/jsonapi/views/contribution_records/by_user';

const PAGE_SIZE = 50;
const MAX_RETRIES = 4;
const BASE_DELAY_MS = 1500;

export interface OrgCredit {
	name: string;
	count: number;
}

export interface DrupalOrgCreditsResult {
	orgs: OrgCredit[];
	volunteerCount: number;
}

export interface GetDrupalOrgCreditsOptions {
	uid: number;
	timeoutMs?: number;
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchPage(
	uid: number,
	page: number,
	timeoutMs: number,
	attempt = 0
): Promise<unknown> {
	const params = new URLSearchParams({
		'views-argument[0]': String(uid),
		'views-filter[field_is_sa_value]': '0',
		page: String(page),
		include: 'field_contributors,field_contributors.field_contributor_organisation',
	});

	const url = `${JSONAPI_BASE}?${params.toString()}`;
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), timeoutMs);

	try {
		const res = await fetch(url, {
			signal: controller.signal,
			headers: { Accept: 'application/vnd.api+json' },
		});

		if (res.status === 503 || res.status === 429) {
			if (attempt < MAX_RETRIES) {
				const delay = BASE_DELAY_MS * 2 ** attempt;
				await sleep(delay);
				return fetchPage(uid, page, timeoutMs, attempt + 1);
			}
			return null;
		}

		if (!res.ok) return null;

		const ct = res.headers.get('content-type') ?? '';
		if (!ct.includes('json')) return null;

		return await res.json();
	} catch {
		if (attempt < MAX_RETRIES) {
			const delay = BASE_DELAY_MS * 2 ** attempt;
			await sleep(delay);
			return fetchPage(uid, page, timeoutMs, attempt + 1);
		}
		return null;
	} finally {
		clearTimeout(timer);
	}
}

/**
 * Fetches all contribution records for a user and returns credit counts grouped
 * by the sponsoring organization. Runs at build time only.
 */
export async function getDrupalOrgCredits(
	options: GetDrupalOrgCreditsOptions
): Promise<DrupalOrgCreditsResult> {
	const { uid, timeoutMs = 30000 } = options;

	const orgTotals = new Map<string, number>();
	let volunteerCount = 0;
	let page = 0;

	while (true) {
		const data = await fetchPage(uid, page, timeoutMs);

		if (data == null || typeof data !== 'object') break;

		const obj = data as Record<string, unknown>;
		const records = Array.isArray(obj.data) ? obj.data : [];
		const included = Array.isArray(obj.included) ? obj.included : [];

		if (records.length === 0) break;

		// Build org lookup from included resources
		const orgs = new Map<string, string>();
		for (const item of included) {
			if (
				typeof item === 'object' &&
				item !== null &&
				(item as Record<string, unknown>).type === 'node--organization'
			) {
				const inc = item as Record<string, unknown>;
				const id = inc.id as string;
				const attrs = (inc.attributes ?? {}) as Record<string, unknown>;
				const title = typeof attrs.title === 'string' ? attrs.title : 'Unknown';
				orgs.set(id, title);
			}
		}

		// Filter contributor paragraphs that belong to this user
		const myContributors = (included as unknown[]).filter((item) => {
			if (typeof item !== 'object' || item === null) return false;
			const inc = item as Record<string, unknown>;
			if (inc.type !== 'paragraph--contributor') return false;
			const rels = (inc.relationships ?? {}) as Record<string, unknown>;
			const userRel = (rels.field_contributor_user ?? {}) as Record<string, unknown>;
			const userData = userRel.data as Record<string, unknown> | undefined;
			const meta = (userData?.meta ?? {}) as Record<string, unknown>;
			return meta.drupal_internal__target_id === uid;
		});

		for (const contrib of myContributors) {
			const c = contrib as Record<string, unknown>;
			const rels = (c.relationships ?? {}) as Record<string, unknown>;
			const orgRel = (rels.field_contributor_organisation ?? {}) as Record<string, unknown>;
			const orgData = Array.isArray(orgRel.data) ? orgRel.data : [];

			if (orgData.length === 0) {
				volunteerCount++;
				continue;
			}

			for (const orgRef of orgData) {
				const ref = orgRef as Record<string, unknown>;
				const orgId = ref.id as string;
				const orgName = orgs.get(orgId) ?? 'Unknown';
				orgTotals.set(orgName, (orgTotals.get(orgName) ?? 0) + 1);
			}
		}

		if (records.length < PAGE_SIZE) break;
		page++;
	}

	const orgs: OrgCredit[] = Array.from(orgTotals.entries())
		.map(([name, count]) => ({ name, count }))
		.sort((a, b) => b.count - a.count);

	return { orgs, volunteerCount };
}
