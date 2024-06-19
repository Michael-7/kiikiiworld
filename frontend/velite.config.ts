import { defineCollection, defineConfig, s } from 'velite';

const computedFields = <T extends {slug: string}>(data: T) => ({
    ...data,
    slugAsParams: data.slug.split('/').slice(1).join('/'),
})

const posts = defineCollection({
    name: 'post',
    pattern: 'blog/**/*.mdx',
    schema: s.object({
        slug: s.path(),
        title: s.string(),
        description: s.string(),
        date: s.isodate(),
        video: s.string(),
        image: s.image(),
        body: s.mdx(),
    }).transform(computedFields)
});

export default defineConfig({
    root: 'content',
    output: {
        data: '.velite',
        assets: 'public/static',
        base: '/static/',
        name: '[name]-[hash:6].[ext]',
        clean: true,
    },
    collections: { posts },
    mdx: {
        rehypePlugins: [],
        remarkPlugins: [],
    }
})
