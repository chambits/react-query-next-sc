# React Query + Next.js Example

A practical demonstration of React Query with Next.js App Router for efficient server and client-side data fetching, caching, and state management.

![React Query + Next.js](https://tanstack.com/query.png)

## Features

- ⚡ **Server-side prefetching** - Data ready on initial page load
- 🔄 **Client-side caching** - Prevent unnecessary fetches
- 🧠 **Automatic cache invalidation** - Keep data fresh
- 🔍 **Query key-based filtering** - Organize and group queries
- 📱 **Loading and error states** - Smooth UX with proper state handling

## Examples Included

1. **Basic Query Example** - Shows filter-based query caching
2. **Infinite Query Example** - Demonstrates infinite scroll with pagination

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Concepts Demonstrated

- **Query Keys**: Unique identifiers used for caching
- **Hydration**: Transfer server state to client
- **StaleTime**: How long data stays fresh
- **Prefetching**: Load data ahead of time
- **Query Functions**: Async data fetching

## How to Test

- Watch the "Fetching" indicator in the debug panel
- Try different filters to see caching in action
- Watch network requests in browser DevTools
- See how data is served from cache vs fetched

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TanStack Query](https://tanstack.com/query) - Data fetching library
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## Created by

Chamith Madusanka
