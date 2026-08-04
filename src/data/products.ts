export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  description: string;
  inStock: boolean;
  image?: string;
}

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: "p-001",
    name: "UltraTech Super Premium Cement",
    category: "Structural Core",
    price: 450,
    unit: "50kg bag",
    description: "High-grade Portland Pozzolana Cement for structural integrity.",
    inStock: true,
  },
  {
    id: "p-002",
    name: "JSW NeoSteel 550D TMT Bar",
    category: "Structural Core",
    price: 68,
    unit: "kg",
    description: "Premium thermo-mechanically treated steel bars with high ductility.",
    inStock: true,
  },
  {
    id: "p-003",
    name: "Statuario Italian Marble",
    category: "Surface & Finishes",
    price: 1250,
    unit: "sq.ft",
    description: "Imported Italian marble with distinct grey veining on pristine white.",
    inStock: true,
  },
  {
    id: "p-004",
    name: "Burma Teak Wood Planks",
    category: "Timber & Joinery",
    price: 3200,
    unit: "cft",
    description: "Authentic Burma teak, kiln-dried and ready for premium architectural joinery.",
    inStock: true,
  },
  {
    id: "p-005",
    name: "Kohler Modernist Faucet",
    category: "Bath & Plumbing",
    price: 14500,
    unit: "piece",
    description: "Matte black finish, geometric design with precision flow control.",
    inStock: true,
  },
  {
    id: "p-006",
    name: "Legrand Smart Touch Switch",
    category: "Lighting & Power",
    price: 3400,
    unit: "piece",
    description: "IoT enabled, glass fascia touch switch with scene control.",
    inStock: true,
  }
];
