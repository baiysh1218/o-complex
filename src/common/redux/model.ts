export interface Review {
  id: number;
  text: string;
}

interface itemsType {
  id: number;
  image_url: string;
  title: string;
  description: string;
  price: number;
}

export type ProductsT = {
  page: number;
  amount: number;
  total: number;
  items: itemsType[];
};
