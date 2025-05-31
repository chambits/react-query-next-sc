import { getQueryClient } from "@/utils/queryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getShoes } from "@/lib/data/getShoes";
import { ShoesClient } from "./client";

interface PageProps {
  searchParams: Promise<{ filter?: string }> | { filter?: string };
}

export default async function ShoesPage({ searchParams }: PageProps) {
  // Await searchParams if it's a promise
  const resolvedParams =
    searchParams instanceof Promise ? await searchParams : searchParams;
  const filter = resolvedParams.filter || "all";

  const queryClient = getQueryClient();

  // ✅ Prefetch data on the server
  await queryClient.prefetchQuery({
    queryKey: ["shoes", filter],
    queryFn: () => getShoes(filter),
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ShoesClient filter={filter} />
      </HydrationBoundary>
    </div>
  );
}
