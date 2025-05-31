"use client";
import { useQuery } from "@tanstack/react-query";
import { getShoes } from "@/lib/data/getShoes";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTransition, useState } from "react";

interface ShoesClientProps {
  filter: string;
}

export function ShoesClient({ filter }: ShoesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [activeFilter, setActiveFilter] = useState(filter);

  const {
    data: shoes,
    isLoading,
    error,
    isFetching,
    isStale,
  } = useQuery({
    queryKey: ["shoes", filter],
    queryFn: () => {
      // This log might not appear for initial page load due to SSR prefetching!
      // Since the data is already in the cache from server prefetching,
      // the client-side queryFn never actually runs for the initial load.
      // It only runs when:
      // - The cache becomes stale (after 60 seconds)
      // - You change the filter (which creates a new query key)
      // - You manually invalidate the cache
      console.log(`🔄 Fetching shoes on client for filter: ${filter}`);
      return getShoes(filter);
    },
  });

  const handleFilterChange = (newFilter: string) => {
    // Update the UI immediately
    setActiveFilter(newFilter);

    // Then update the URL in a transition
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (newFilter === "all") {
        params.delete("filter");
      } else {
        params.set("filter", newFilter);
      }
      router.push(`/shoes?${params.toString()}`);
    });
  };

  const filters = [
    { key: "all", label: "All Shoes", icon: "👟" },
    { key: "running", label: "Running", icon: "🏃" },
    { key: "casual", label: "Casual", icon: "😎" },
    { key: "boots", label: "Boots", icon: "🥾" },
  ];

  return (
    <div className="w-full px-6 py-6 md:py-8 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 md:mb-0 tracking-tight">
          <span className="text-blue-600">Shoe</span>Collection
        </h1>

        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
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

      {/* Filter Buttons */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
              clipRule="evenodd"
            />
          </svg>
          Filter Collection{" "}
          {isPending && (
            <span className="ml-2 text-blue-500 text-sm">(Updating...)</span>
          )}
        </h2>
        <div className="flex gap-3 flex-wrap">
          {filters.map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => handleFilterChange(filterOption.key)}
              disabled={isPending}
              className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 ${
                // Show active state based on local state for immediate feedback
                activeFilter === filterOption.key
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-200 transform scale-105"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-300 hover:shadow"
              } ${isPending ? "opacity-70" : ""}`}
            >
              <span>{filterOption.icon}</span>
              <span className="font-medium">{filterOption.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Debug Info Panel */}
      <div className="mb-10 overflow-hidden rounded-xl border border-gray-200 bg-white shadow">
        <div className="px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <h3 className="font-semibold flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Query Debug Info
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 text-sm divide-x divide-y divide-gray-100">
          <div className="p-4 flex flex-col">
            <span className="text-xs uppercase text-gray-500 mb-1">Filter</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-center font-medium">
              {filter}
            </span>
          </div>
          <div className="p-4 flex flex-col">
            <span className="text-xs uppercase text-gray-500 mb-1">
              Loading
            </span>
            <span
              className={`px-2 py-1 rounded text-center font-medium ${
                isLoading
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {isLoading ? "🔄 Yes" : "✅ No"}
            </span>
          </div>
          <div className="p-4 flex flex-col">
            <span className="text-xs uppercase text-gray-500 mb-1">
              Fetching
            </span>
            <span
              className={`px-2 py-1 rounded text-center font-medium ${
                isFetching
                  ? "bg-orange-100 text-orange-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {isFetching ? "🔄 Yes" : "✅ No"}
            </span>
          </div>
          <div className="p-4 flex flex-col">
            <span className="text-xs uppercase text-gray-500 mb-1">Stale</span>
            <span
              className={`px-2 py-1 rounded text-center font-medium ${
                isStale
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {isStale ? "⚠️ Yes" : "✅ No"}
            </span>
          </div>
          <div className="p-4 flex flex-col">
            <span className="text-xs uppercase text-gray-500 mb-1">
              Query Key
            </span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-center font-medium text-xs">
              [&quot;shoes&quot;, &quot;{filter}&quot;]
            </span>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center">
          <span className="text-sm text-gray-700 font-medium mr-2">
            Status:
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              isLoading
                ? "bg-yellow-100 text-yellow-800"
                : isFetching
                ? "bg-orange-100 text-orange-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {isLoading
              ? "🔄 Initial Loading..."
              : isFetching
              ? "🔄 Fetching..."
              : "💾 Served from Cache"}
          </span>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-8 rounded-xl overflow-hidden border border-red-200">
          <div className="bg-red-500 px-4 py-2 text-white font-semibold">
            Error Occurred
          </div>
          <div className="p-4 bg-red-50 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-red-800">{error.message}</span>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-blue-200 border-t-blue-500 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl">👟</span>
              </div>
            </div>
            <span className="text-gray-600 font-medium">Loading shoes...</span>
          </div>
        </div>
      )}

      {/* Shoes Grid */}
      {!isLoading && shoes && (
        <div>
          <h3 className="text-xl font-semibold mb-6 flex items-center text-gray-800">
            <span className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center mr-2">
              {shoes.length}
            </span>
            <span>{shoes.length === 1 ? "Shoe" : "Shoes"} Found</span>
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shoes.map((shoe, index) => (
              <div
                key={index}
                className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">👟</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-800">
                      {shoe}
                    </h4>
                    <p className="text-sm text-gray-500">Premium Collection</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
