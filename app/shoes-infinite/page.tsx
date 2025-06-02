import { getQueryClient } from "@/utils/queryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getShoesInfinite } from "@/lib/data/getShoesInfinite";
import { ShoesInfiniteClient } from "./client";

export default async function ShoesInfinitePage() {
  const queryClient = getQueryClient();

  // Prefetch the first page of data
  // This optimizes the initial page load experience by:
  // 1. Fetching the first batch of data on the server
  // 2. Dehydrating the query cache state
  // 3. Sending it to the client to avoid loading states
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["shoes-infinite"],
    queryFn: ({ pageParam = 1 }) => getShoesInfinite(pageParam),
    initialPageParam: 1,
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white">
      {/* 
        Infinite Query Hydration Process:
        1. The server prefetches only the first page
        2. The client takes over for subsequent pages
        3. The dehydrated state is used to initialize the query cache
        4. This creates a seamless SSR → CSR transition
      */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ShoesInfiniteClient />
      </HydrationBoundary>
    </div>
  );
}
