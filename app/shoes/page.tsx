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
