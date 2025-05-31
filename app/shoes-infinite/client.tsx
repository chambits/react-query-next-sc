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
    staleTime: 60 * 1000, // 1 minute
  });

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
          <span className="text-purple-600">Shoe</span>Collection
        </h1>

        <Link
          href="/"
          className="inline-flex items-center text-purple-600 hover:text-purple-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Home
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-8 border border-purple-100">
        <h2 className="text-lg font-semibold mb-3 text-purple-800">
          Infinite Query Example
        </h2>
        <p className="text-gray-700 mb-3">
          This example demonstrates React Query&apos;s useInfiniteQuery hook
          with server-side prefetching and client-side pagination using
          intersection observer for infinite scrolling.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-purple-50 p-3 rounded-lg">
            <h3 className="font-medium text-purple-700 mb-2">How It Works</h3>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>
                • The server prefetches page 1 using prefetchInfiniteQuery
              </li>
              <li>
                • Client uses IntersectionObserver to detect scroll position
              </li>
              <li>• New pages load automatically as you scroll down</li>
              <li>• Query key: [&apos;shoes-infinite&apos;]</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <h3 className="font-medium text-blue-700 mb-2">Query Status</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-600">Total Items:</span>{" "}
                <span className="font-medium text-gray-900">
                  {data?.pages[0]?.totalShoes || 0}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Loaded:</span>{" "}
                <span className="font-medium text-gray-900">
                  {totalLoadedShoes}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>{" "}
                <span
                  className={`font-medium ${
                    status === "pending"
                      ? "text-yellow-600"
                      : status === "error"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {status}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Has More:</span>{" "}
                <span className="font-medium text-gray-900">
                  {hasNextPage ? "Yes" : "No"}
                </span>
              </div>
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
