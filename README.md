# Jyothi Power Projects Website

Premium React + Vite marketing website for Jyothi Power Projects with reusable components, Telugu + English content, and performance-focused animations.

## Local Development

1. Install dependencies

   pnpm install

2. Start dev server

   pnpm dev

3. Production build check

   pnpm build

## Deploy to GitHub Pages

This repository now includes an automated workflow:

- Workflow file: .github/workflows/deploy-pages.yml
- Trigger: push to main
- Output: GitHub Pages site

### One-time GitHub setup

1. Push this project to a GitHub repository.
2. Open repository settings on GitHub.
3. Go to Pages.
4. Under Build and deployment, set Source to GitHub Actions.
5. Push to main again (or run the workflow manually from Actions).

### Your public URL

After deployment completes, your site will be available at:

https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME/

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
