// Shoe data structure
export interface ShoeProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  color: string;
  inStock: boolean;
}

// All available shoe colors for random generation
const shoeColors = [
  "Black",
  "White",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Purple",
  "Brown",
  "Gray",
  "Orange",
];

// All available shoe brands for random generation
const shoeBrands = [
  "Nike",
  "Adidas",
  "New Balance",
  "Puma",
  "Reebok",
  "Converse",
  "Vans",
  "Under Armour",
  "Asics",
  "Brooks",
];

// Shoe categories
const categories = ["Running", "Casual", "Boots", "Athletic", "Formal"];

// Create a deterministic "random" shoe for consistent pagination results
const generateShoe = (index: number): ShoeProduct => {
  // Using index to create deterministic but varied results
  const id = `shoe-${index + 1}`;
  const brandIndex = index % shoeBrands.length;
  const colorIndex = Math.floor(index / 3) % shoeColors.length;
  const categoryIndex = Math.floor(index / 7) % categories.length;
  const inStock = index % 5 !== 0; // 20% out of stock

  return {
    id,
    name: `${shoeBrands[brandIndex]} ${shoeColors[colorIndex]} ${index + 1}`,
    brand: shoeBrands[brandIndex],
    category: categories[categoryIndex],
    price: 50 + (index % 15) * 10, // Prices between $50 and $190
    color: shoeColors[colorIndex],
    inStock,
  };
};

// Create the full dataset of 100 shoes
const allShoes = Array.from({ length: 100 }, (_, i) => generateShoe(i));

export interface PaginatedResponse {
  shoes: ShoeProduct[];
  nextPage: number | null;
  totalShoes: number;
}

export async function getShoesInfinite(
  page = 1,
  pageSize = 10
): Promise<PaginatedResponse> {
  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Calculate pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const shoes = allShoes.slice(startIndex, endIndex);

  return {
    shoes,
    nextPage: endIndex < allShoes.length ? page + 1 : null,
    totalShoes: allShoes.length,
  };
}
