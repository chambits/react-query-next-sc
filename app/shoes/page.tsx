import { getQueryClient } from "@/utils/queryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getShoes } from "@/lib/data/getShoes";
import { ShoesClient } from "./client";

interface ShoesPageProps {
  searchParams?: Promise<{ filter?: string }>;
}

export default async function ShoesPage({ searchParams }: ShoesPageProps) {
  const filter = (await searchParams)?.filter || "all";
  const queryClient = getQueryClient();

  // Server-side prefetching
  // 1. This loads the data on the server during page render
  // 2. The data is dehydrated and sent to the client
  // 3. React Query will reuse this data on the client without refetching
  await queryClient.prefetchQuery({
    queryKey: ["shoes", filter],
    queryFn: () => getShoes(filter),
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white">
      {/* How it works:
          1. HydrationBoundary rehydrates React Query cache with the prefetched data
          2. This means the client starts with data already available
          3. No loading state is shown initially since data is prefetched
      */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ShoesClient filter={filter} />
      </HydrationBoundary>
    </div>
  );
}
