import { getQueryClient } from "@/utils/queryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getShoes } from "@/lib/data/getShoes";
import { ShoesClient } from "./client";

export default async function ShoesPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // Use proper type checking and default to "all" if filter is undefined
  const filterParam = searchParams?.filter;
  const filter = typeof filterParam === "string" ? filterParam : "all";

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
