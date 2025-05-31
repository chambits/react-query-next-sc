import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <header className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={120}
              height={30}
              priority
            />
            <a
              href="https://tanstack.com/query/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
              TanStack Query Docs
            </a>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              React Query
            </span>
            <span className="mx-2">+</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-700">
              Next.js
            </span>
            <span className="absolute -bottom-2 left-0 w-20 h-1 bg-blue-500 rounded-full"></span>
            <span className="text-3xl text-blue-600 ml-2">⚡</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            A practical example demonstrating React Query with Next.js App
            Router for efficient server and client-side data fetching, caching,
            and state management.
          </p>
        </header>

        {/* Main Example Card */}
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 max-w-3xl mx-auto">
          <div className="h-3 bg-blue-500"></div>
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                />
              </svg>
              React Query Filter Example
            </h2>

            <p className="text-gray-600 mb-4">
              Demonstrates React Query basics with programmatic navigation using
              router.push(). Shows query caching, refetching, and loading
              states.
            </p>

            <div className="bg-blue-50 p-3 rounded-lg mb-5 text-sm text-blue-800">
              <strong>Features:</strong>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Server-side prefetching</li>
                <li>Client-side caching</li>
                <li>Loading states</li>
                <li>Filter-based query keys</li>
              </ul>
            </div>

            <Link
              href="/shoes"
              className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span>View Example</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Infinite Query Example Card */}
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 max-w-3xl mx-auto mt-8">
          <div className="h-3 bg-purple-500"></div>
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-purple-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              Infinite Query Example
            </h2>

            <p className="text-gray-600 mb-4">
              Demonstrates React Query&apos;s infinite query capabilities with
              automatic loading as you scroll. Perfect for implementing
              &quot;load more&quot; or infinite scrolling patterns.
            </p>

            <div className="bg-purple-50 p-3 rounded-lg mb-5 text-sm text-purple-800">
              <strong>Features:</strong>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Server-side prefetching with prefetchInfiniteQuery</li>
                <li>Automatic loading with intersection observer</li>
                <li>Pagination with cursor-based navigation</li>
                <li>100 items loaded 10 at a time</li>
              </ul>
            </div>

            <Link
              href="/shoes-infinite"
              className="inline-flex items-center gap-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <span>View Infinite Example</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Understanding React Query with Next.js
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
                Key Concepts
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-1">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>
                    <strong>Query Keys:</strong> Unique identifiers used for
                    caching
                  </span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>
                    <strong>Hydration:</strong> Transfer server state to client
                  </span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>
                    <strong>StaleTime:</strong> How long data stays fresh
                  </span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>
                    <strong>Prefetching:</strong> Load data ahead of time
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
                Tips for Testing
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-1">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>Use React Query DevTools to inspect cache</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>Watch network requests in browser DevTools</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>Try different filters to see caching in action</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>Test with different staleTime values</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-4">
              <span className="inline-block h-3 w-3 rounded-full bg-blue-500"></span>
              <span className="inline-block h-3 w-3 rounded-full bg-purple-500"></span>
              <span className="inline-block h-3 w-3 rounded-full bg-green-500"></span>
            </div>

            <p className="text-gray-700 font-medium mb-2">
              Built with
              <span className="mx-1 text-blue-600">Next.js</span>•
              <span className="mx-1 text-purple-600">React Query</span>•
              <span className="mx-1 text-green-600">Tailwind CSS</span>
            </p>

            <div className="mt-3 mb-4 flex items-center">
              <div className="h-px w-12 bg-gray-200"></div>
              <p className="mx-3 text-gray-600 text-sm">
                Created by{" "}
                <a
                  href="https://www.linkedin.com/in/chamith24/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-blue-600 transition-colors"
                >
                  Chamith Madusanka
                </a>
              </p>
              <div className="h-px w-12 bg-gray-200"></div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
