import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import image from '@astrojs/image'
import tailwind from '@astrojs/tailwind'
import addClasses from 'rehype-add-classes'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { rehypeGithubAlerts } from 'rehype-github-alerts'

// https://astro.build/config
export default defineConfig({
    site: 'https://blog.heaven.dev',
    integrations: [sitemap(), react(), image(), tailwind()],
    markdown: {
        remarkPlugins: [
            remarkMath
        ],
        rehypePlugins: [
            [
                addClasses,
                {
                    h1: 'text-3xl font-bold font-mplus text-orange-500 mt-5 mb-4',
                    h2: 'text-2xl font-bold font-mplus text-slate-500 mt-5 mb-2',
                    h3: 'text-xl font-bold font-mplus mb-3',
                    h4: 'text-lg font-bold font-mplus mb-3',
                    h5: 'font-bold font-mplus mb-3',
                    h6: 'font-bold font-mplus mb-3',
                    img: 'border border-slate-300 dark:border-zinc-700 rounded-xl mb-6 mt-5',
                    p: 'leading-6',
                    a: 'underline underline-offset-2 hover:text-orange-500 decoration-orange-500',
                    ul: 'list-disc',
                    code: 'text-red-400',
                    hr: 'mt-5 mb-4',
                    strong: 'text-gray-400'
                }
            ],
            [rehypeKatex, { throwOnError: false }],
            rehypeGithubAlerts
        ],
        syntaxHighlight: 'prism'
    }
})
