# Heaven Blog

> [!NOTE] 
> 
> This project is vibe-coded as it is only used to share the notes that I take : ).

A modern, fast, and elegant personal blog built with Astro, React, and Tailwind CSS. This blog showcases technical articles, tutorials, and personal notes with support for mathematical expressions and enhanced markdown features.

## Features

- **Fast & Modern**: Built with Astro for optimal performance and minimal JavaScript
- **Mathematical Expressions**: Full LaTeX support via KaTeX for technical writing
- **GitHub-Style Alerts**: Enhanced markdown with styled admonitions
- **Responsive Design**: Tailwind CSS with custom styling and dark mode support
- **SEO Optimized**: Sitemap, RSS feed, and meta tags for better discoverability
- **Syntax Highlighting**: Prism.js integration for beautiful code blocks
- **Interactive Components**: React components for enhanced user experience

## Tech Stack

- **Framework**: [Astro](https://astro.build) 2.1.3
- **UI Library**: [React](https://react.dev) 18
- **Styling**: [Tailwind CSS](https://tailwindcss.com) 3.x
- **Component Library**: Material-UI (@mui/material)
- **Icons**: React Icons
- **Math Rendering**: KaTeX
- **Markdown**: Enhanced with remark-math and rehype plugins

## Project Structure

```
heaven-blog/
├── public/          # Static assets (images, fonts, etc.)
├── src/
│   ├── components/  # React and Astro components
│   ├── content/     # Blog posts and content collections
│   │   └── blog/    # Markdown blog posts
│   ├── layouts/     # Page layouts
│   ├── lib/         # Utility functions
│   ├── pages/       # File-based routing
│   ├── styles/      # Global styles
│   └── consts.ts    # Site configuration constants
├── astro.config.mjs # Astro configuration
└── package.json     # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Or using yarn
yarn install
```

### Development

```bash
# Start development server
npm run dev

# The site will be available at http://localhost:3000
```

### Building for Production

```bash
# Build the site
npm run build

# Preview the production build
npm run preview
```

## Available Commands

| Command            | Action                                           |
| :----------------- | :----------------------------------------------- |
| `npm install`      | Install dependencies                             |
| `npm run dev`      | Start local dev server at `localhost:3000`       |
| `npm run build`    | Build production site to `./dist/`               |
| `npm run preview`  | Preview production build locally                 |
| `npm run astro`    | Run Astro CLI commands                           |

## Writing Blog Posts

Blog posts are written in Markdown/MDX and stored in `src/content/blog/`. Each post includes frontmatter metadata:

```markdown
---
title: "Your Post Title"
description: "Post description"
pubDate: "YYYY-MM-DD"
tags: ["tag1", "tag2"]
---

Your content here...
```

### Special Features

**Mathematical Expressions:**
```markdown
Inline math: $E = mc^2$

Block math:
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

**GitHub Alerts:**
```markdown
> [!NOTE]
> Useful information that users should know

> [!WARNING]
> Urgent info that needs immediate attention
```

## Deployment

This blog is deployed at [heaven-blog.netlify.app](https://heaven-blog.netlify.app/) and can be deployed to various platforms:

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Import project and deploy
- **Static Hosting**: Upload the `dist/` folder to any static host

## Configuration

Site configuration is managed in:
- `astro.config.mjs` - Astro settings, integrations, and markdown plugins
- `src/consts.ts` - Site constants and metadata
- `tailwind.config.cjs` - Tailwind CSS customization

## License

Personal project by Heaven Chen.

## Links

- **Blog**:[heaven-blog.netlify.app](https://heaven-blog.netlify.app/) 
- **Built with**: [Astro](https://astro.build)
