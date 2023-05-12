import { ProductListItem } from "../components/Product";
import { InferGetStaticPropsType } from "next";
import { apolloClient } from "../graphql/apolloClient";
import { gql } from "@apollo/client";
import {
  GetProductListQuery,
  GetProductListDocument,
} from "../generated/graphql/graphql";

const ProductsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {data.products.map((product) => {
        return (
          <li key={product.id} className="border-2 shadow-xl">
            <ProductListItem
              data={{
                id: product.id,
                title: product.name,
                thumbnailUrl: product.images[0].url,
                thumbnailAlt: product.name,
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ProductsPage;

export const getStaticProps = async () => {
  // const res = await fetch("https://naszsklep-api.vercel.app/api/products");
  // const data: StoreApiResponse[] = await res.json();

  const { data } = await apolloClient.query<GetProductListQuery>({
    query: GetProductListDocument,
  });

  return {
    props: {
      data,
    },
  };
};

// export interface StoreApiResponse {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   category: string;
//   image: string;
//   rating: {
//     rate: number;
//     count: number;
//   };
// }
