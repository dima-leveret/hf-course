import { ProductDetails } from "../components/Product";
import { useQuery } from "react-query";

const getProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data: StoreApiResponse[] = await res.json();
  return data;
};

const ProductsCSRPage = () => {
  const result = useQuery("products", getProducts);

  if (result.isLoading) {
    return <div>Loading...</div>;
  }

  if (!result.data || result.error) {
    return <div>Something went wrong</div>;
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {result.data.map((product) => {
        return (
          <li key={product.id} className="border-2 shadow-xl">
            <ProductDetails
              data={{
                description: product.description,
                thumbnailUrl: product.image,
                thumbnailAlt: product.title,
                rating: product.rating.rate,
                title: product.title,
                id: product.id,
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ProductsCSRPage;

export interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
