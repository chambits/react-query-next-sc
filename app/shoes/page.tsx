import { getQueryClient } from "@/utils/queryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getShoes } from "@/lib/getShoes";
import { ShoesClient } from "./client";

export default async function ShoesPage({
  searchParams,
}: {
  searchParams: { filter?: string };
}) {
  const filter = searchParams.filter || "all";
  const queryClient = getQueryClient();

  // ✅ Prefetch data on the server
  await queryClient.prefetchQuery({
    queryKey: ["shoes", filter],
    queryFn: () => getShoes(filter),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ShoesClient filter={filter} />
    </HydrationBoundary>
  );
}
