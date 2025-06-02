"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getShoesInfinite, ShoeProduct } from "@/lib/data/getShoesInfinite";
import { useEffect, useRef } from "react";
import Link from "next/link";
import React from "react";

export function ShoesInfiniteClient() {
  // Reference to the sentinel element for infinite scrolling
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    status,
  } = useInfiniteQuery({
    queryKey: ["shoes-infinite"],
    queryFn: ({ pageParam = 1 }) => {
      console.log(`🔄 Fetching infinite shoes page ${pageParam}`);
      return getShoesInfinite(pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  // Explanation of how useInfiniteQuery differs from regular useQuery
  const infiniteQueryExplanation = (
    <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 mb-6">
      <h2 className="text-lg font-semibold text-purple-800 mb-3 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Understanding Infinite Queries
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium text-purple-700 mb-2">
            How Infinite Queries Work:
          </h3>
          <ul className="space-y-2 text-sm text-purple-900">
            <li className="flex items-start">
              <span className="font-bold mr-1">•</span>
              <span>
                <b>Initial Data:</b> Only the first page (10 items) is
                prefetched on the server
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-1">•</span>
              <span>
                <b>Pagination Structure:</b> Each response includes a
                &quot;nextPage&quot; parameter telling React Query what to fetch
                next
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-1">•</span>
              <span>
                <b>Data Preservation:</b> All pages are kept in memory, not
                replaced like with regular queries
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-1">•</span>
              <span>
                <b>Scroll Detection:</b> IntersectionObserver API automatically
                loads more data as you scroll
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-purple-700 mb-2">
            Key Differences from Regular Queries:
          </h3>
          <ul className="space-y-2 text-sm text-purple-900">
            <li className="flex items-start">
              <span className="font-bold mr-1">•</span>
              <span>
                <b>Data Structure:</b> Returns pages array instead of a simple
                data object
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-1">•</span>
              <span>
                <b>Fetching:</b> Use fetchNextPage() instead of refetch()
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-1">•</span>
              <span>
                <b>Cache Behavior:</b> Pages accumulate in cache rather than
                replacing previous data
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-1">•</span>
              <span>
                <b>Server Prefetching:</b> Only the first page is prefetched,
                client handles the rest
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  // Set up intersection observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "0px 0px 200px 0px" } // Load more when within 200px of the bottom
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Calculate total loaded shoes
  const totalLoadedShoes =
    data?.pages.reduce((total, page) => total + page.shoes.length, 0) || 0;

  return (
    <div className="w-full px-6 py-6 md:py-8 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 md:mb-0 tracking-tight">
          <span className="text-purple-600">React Query</span> Infinite Query
          Example
        </h1>

        <Link
          href="/"
          className="inline-flex items-center gap-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Add our detailed explanation of infinite queries */}
      {infiniteQueryExplanation}

      <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-purple-100">
        <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Live Query Status
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-400 text-sm font-medium">
                Total Items
              </span>
              <span className="h-6 w-6 bg-purple-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </span>
            </div>
            <div className="text-2xl font-bold text-purple-800">
              {data?.pages[0]?.totalShoes || 0}
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-400 text-sm font-medium">Loaded</span>
              <span className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                  />
                </svg>
              </span>
            </div>
            <div className="text-2xl font-bold text-blue-800">
              {totalLoadedShoes}
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-green-50 to-white rounded-lg border border-green-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-400 text-sm font-medium">Status</span>
              <span className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </div>
            <div
              className={`text-2xl font-bold ${
                status === "pending"
                  ? "text-yellow-600"
                  : status === "error"
                  ? "text-red-600"
                  : "text-green-800"
              }`}
            >
              {status}
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-amber-50 to-white rounded-lg border border-amber-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-amber-400 text-sm font-medium">
                Has More
              </span>
              <span className="h-6 w-6 bg-amber-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </div>
            <div className="text-2xl font-bold text-amber-800">
              {hasNextPage ? "Yes" : "No"}
            </div>
          </div>
        </div>
      </div>

      {/* Error State */}
      {isError && (
        <div className="mb-8 rounded-xl overflow-hidden border border-red-200">
          <div className="bg-red-500 px-4 py-2 text-white font-semibold">
            Error Occurred
          </div>
          <div className="p-4 bg-red-50">
            <p className="text-red-800">{error.message}</p>
          </div>
        </div>
      )}

      {/* Loading State (initial load) */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-purple-200 border-t-purple-500 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl">👟</span>
              </div>
            </div>
            <span className="text-gray-600 font-medium">Loading shoes...</span>
          </div>
        </div>
      )}

      {/* Shoes Grid */}
      {!isLoading && data && (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-semibold flex items-center text-gray-800">
              <span className="bg-purple-100 text-purple-800 rounded-full h-8 w-8 flex items-center justify-center mr-2">
                {totalLoadedShoes}
              </span>
              <span>of {data.pages[0].totalShoes} Shoes</span>
            </h3>

            {hasNextPage && (
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
              >
                {isFetchingNextPage ? "Loading more..." : "Load More"}
              </button>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page.shoes.map((shoe) => (
                  <ShoeCard key={shoe.id} shoe={shoe} />
                ))}
              </React.Fragment>
            ))}
          </div>

          {/* Loading indicator for next page */}
          {(isFetchingNextPage || hasNextPage) && (
            <div
              ref={loadMoreRef}
              className="flex justify-center items-center py-8"
            >
              {isFetchingNextPage ? (
                <div className="flex items-center space-x-2">
                  <div className="h-6 w-6 rounded-full border-2 border-purple-200 border-t-purple-500 animate-spin"></div>
                  <span className="text-gray-500">Loading more shoes...</span>
                </div>
              ) : hasNextPage ? (
                <span className="text-gray-400 text-sm">Scroll for more</span>
              ) : null}
            </div>
          )}

          {/* End of results message */}
          {!hasNextPage && (
            <div className="text-center py-8 text-gray-500">
              You&apos;ve reached the end of the results
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Shoe card component
function ShoeCard({ shoe }: { shoe: ShoeProduct }) {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800">{shoe.name}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            shoe.inStock
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {shoe.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
        <span>{shoe.brand}</span>
        <span>{shoe.category}</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
          <span className="text-xl">👟</span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <span className="text-gray-600">Color: {shoe.color}</span>
            <span className="font-bold text-gray-800">${shoe.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
