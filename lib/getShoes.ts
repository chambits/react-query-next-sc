// lib/getShoes.ts
export async function getShoes(filter: string): Promise<string[]> {
  console.log(`🚀 getShoes called on server with filter: ${filter}`);

  // Simulated fetch delay to make cache testing easier
  await new Promise((res) => setTimeout(res, 1000));

  const allShoes = {
    all: [
      "Nike Air Max",
      "Adidas Ultraboost",
      "Dr. Martens",
      "Timberland",
      "Converse Chuck Taylor",
    ],
    running: [
      "Nike ZoomX",
      "Adidas Ultraboost",
      "Brooks Ghost",
      "Asics Gel-Kayano",
    ],
    casual: ["Converse Chuck Taylor", "Vans Old Skool", "Nike Air Force 1"],
    boots: ["Dr. Martens", "Timberland", "Red Wing Iron Ranger"],
  };

  const result = allShoes[filter as keyof typeof allShoes] || allShoes.all;
  console.log(`✅ getShoes returning:`, result);

  return result;
}
