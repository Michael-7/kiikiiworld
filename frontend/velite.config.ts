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
        category: s.string().default('Photo'),
        title: s.string(),
        date: s.isodate(),
        video: s.string().optional(),
        image: s.string().optional(),
        description: s.string().optional(),
        body: s.mdx(),
    }).transform(computedFields)
});

const categories = defineCollection({
    name: 'category',
    pattern: 'categories/index.yml',
    schema: s.object({
        name: s.string().max(20),
        slug: s.slug('global', ['admin', 'login']),
    })
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
    collections: { posts, categories },
    mdx: {
        rehypePlugins: [],
        remarkPlugins: [],
    }
})
