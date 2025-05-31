import { getQueryClient } from "@/utils/queryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getShoesInfinite } from "@/lib/data/getShoesInfinite";
import { ShoesInfiniteClient } from "./client";

export default async function ShoesInfinitePage() {
  const queryClient = getQueryClient();

  // Prefetch the first page of data
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["shoes-infinite"],
    queryFn: ({ pageParam = 1 }) => getShoesInfinite(pageParam),
    initialPageParam: 1,
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ShoesInfiniteClient />
      </HydrationBoundary>
    </div>
  );
}
