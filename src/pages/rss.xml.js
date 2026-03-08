import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	const logs = await getCollection('logs');
	const items = [
		...posts.map((post) => ({
			...post.data,
			link: `/blog/${post.id}/`,
		})),
		...logs.map((log) => ({
			...log.data,
			link: `/logs/${log.id}/`,
		})),
	].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items,
	});
}
