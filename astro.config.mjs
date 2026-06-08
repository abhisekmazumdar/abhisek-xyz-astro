// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { visit } from 'unist-util-visit';

/** Wraps `![alt](src "Caption")` images in <figure><figcaption> */
function rehypeFigureCaption() {
    return (tree) => {
        visit(tree, 'element', (node, index, parent) => {
            if (node.tagName !== 'img' || !node.properties?.title || !parent) return;
            const figure = {
                type: 'element',
                tagName: 'figure',
                properties: { className: ['post-figure'] },
                children: [
                    node,
                    {
                        type: 'element',
                        tagName: 'figcaption',
                        properties: {},
                        children: [{ type: 'text', value: String(node.properties.title) }],
                    },
                ],
            };
            parent.children.splice(index, 1, figure);
        });
    };
}

// https://astro.build/config
export default defineConfig({
    site: 'https://www.abhisek.xyz',
    integrations: [mdx(), sitemap(), react()],
    vite: {
        plugins: [tailwindcss()],
    },
    markdown: {
        rehypePlugins: [rehypeFigureCaption],
    },
});