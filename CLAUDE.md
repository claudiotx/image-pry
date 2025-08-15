# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm run lint -- --fix` - Fix auto-fixable ESLint issues

## Docker Commands

- `docker build -t immage-pry .` - Build the Docker image
- `docker run -p 3000:3000 immage-pry` - Run the container locally

## Architecture Overview

This is a Next.js 15 application with the following key features:

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Build**: Configured with standalone output for Docker deployment
- **Structure**: 
  - `/src/app/` - App Router pages and layouts
  - `/src/components/` - Reusable React components (when created)
  - `/public/` - Static assets
  - `next.config.ts` - Next.js configuration with standalone output enabled

## Key Configuration

- Next.js configured with `output: 'standalone'` for optimized Docker builds
- Tailwind CSS v4 integrated with PostCSS
- TypeScript strict mode enabled
- ESLint configured with Next.js recommended rules

## Notes

- The project uses the new App Router (not Pages Router)
- Tailwind CSS v4 is configured and ready to use
- Docker setup is optimized with multi-stage builds for smaller production images