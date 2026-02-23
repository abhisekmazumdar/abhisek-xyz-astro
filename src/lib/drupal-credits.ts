/**
 * Fetches Drupal.org contribution record counts for a user by project machine name.
 * Uses the direct JSON:API view URL. Used at build time.
 */

const JSONAPI_BASE =
	'https://new.drupal.org/jsonapi/views/contribution_records/by_user';

export interface DrupalCreditsProject {
	label: string;
	machineName: string;
	count: number;
}

export interface DrupalCreditsResult {
	total: number;
	projects: DrupalCreditsProject[];
}

export interface GetDrupalCreditsOptions {
	/** Limit to credits in the last N months. Omit for all-time (matches drupal.org profile page). */
	months?: number;
	timeoutMs?: number;
	/** Drupal.org user ID (uid). Required – the JSON:API uses uid, not username. */
	uid: number;
	/** Projects to fetch counts for (e.g. [{ label: 'Drupal Core', machineName: 'drupal' }, ...]). */
	projects: { label: string; machineName: string }[];
}

function fetchWithTimeout(
	url: string,
	{ timeoutMs = 8000 }: { timeoutMs?: number } = {}
): Promise<Response> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), timeoutMs);
	return fetch(url, {
		signal: controller.signal,
		headers: { Accept: 'application/vnd.api+json' },
	})
		.finally(() => clearTimeout(timeout));
}

function parseCount(response: unknown): number {
	if (response == null || typeof response !== 'object') return 0;
	const obj = response as Record<string, unknown>;
	if (typeof obj.meta === 'object' && obj.meta !== null && 'count' in obj.meta) {
		const n = (obj.meta as Record<string, unknown>).count;
		if (typeof n === 'number' && Number.isInteger(n) && n >= 0) return n;
		if (typeof n === 'string') {
			const parsed = parseInt(n, 10);
			if (Number.isInteger(parsed) && parsed >= 0) return parsed;
		}
	}
	if (Array.isArray(obj.data)) return obj.data.length;
	return 0;
}

async function fetchCount(
	uid: number,
	machineName: string | null,
	months: number | undefined,
	timeoutMs: number
): Promise<number> {
	const params = new URLSearchParams({
		'views-argument[0]': String(uid),
		'views-filter[field_is_sa_value]': '0',
		page: '0',
	});
	if (machineName !== null) {
		params.set('views-filter[field_project_name_value]', machineName);
	}
	if (months !== undefined) {
		params.set('views-filter[last_status_change]', `${months} months ago`);
	}
	const url = `${JSONAPI_BASE}?${params.toString()}`;
	try {
		const res = await fetchWithTimeout(url, { timeoutMs });
		if (!res.ok) return 0;
		const contentType = res.headers.get('content-type') ?? '';
		if (!contentType.includes('application/vnd.api+json') && !contentType.includes('application/json')) {
			return 0;
		}
		const json = (await res.json()) as unknown;
		return parseCount(json);
	} catch {
		return 0;
	}
}

/**
 * Returns total contribution count and per-project counts.
 * Call at build time. Pass projects from consts (e.g. DRUPAL_CREDITS_PROJECTS).
 */
export async function getDrupalCredits(
	options: GetDrupalCreditsOptions
): Promise<DrupalCreditsResult> {
	const { months, timeoutMs = 15000, uid, projects } = options;

	const totalPromise = fetchCount(uid, null, months, timeoutMs);
	const projectPromises = projects.map((p) =>
		fetchCount(uid, p.machineName, months, timeoutMs).then((count) => ({
			label: p.label,
			machineName: p.machineName,
			count,
		}))
	);

	const [total, ...projectCounts] = await Promise.all([totalPromise, ...projectPromises]);

	return {
		total,
		projects: projectCounts,
	};
}
