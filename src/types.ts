export type Category = 'Footwear' | 'Apparel' | 'Accessories' | 'Equipment';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  blurb: string;
  description: string;
  rating: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
