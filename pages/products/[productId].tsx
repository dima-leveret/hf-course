import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
// import { useRouter } from "next/router";
import { ProductDetails } from "../../components/Product";
import Link from "next/link";
import { apolloClient } from "../../graphql/apolloClient";
import {
  GetProductDetailsByIdDocument,
  GetProductDetailsByIdQuery,
  GetProductDetailsByIdQueryVariables,
  GetProductsSlugDocument,
  GetProductsSlugQuery,
} from "../../generated/graphql/graphql";

const ProductIdPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  //   const router = useRouter();

  if (!data) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <Link href="/products">Back home</Link>
      <ProductDetails
        data={{
          thumbnailUrl: data.images[0].url,
          thumbnailAlt: data.name,
          title: data.name,
          description: data.description,
          rating: 5,
          id: data.id,
          longDescription: data.description,
        }}
      />
    </div>
  );
};

export default ProductIdPage;

export const getStaticPaths = async () => {
  // const res = await fetch("https://naszsklep-api.vercel.app/api/products");
  // const data: StoreApiResponse[] = await res.json();

  const { data } = await apolloClient.query<GetProductsSlugQuery>({
    query: GetProductsSlugDocument,
  });

  return {
    paths: data.products.map((product) => {
      return {
        params: {
          productId: product.id,
          productSlug: product.slug,
        },
      };
    }),
    fallback: false,
  };
};

export type InferGetStaticPathsType<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? R
  : never;

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<InferGetStaticPathsType<typeof getStaticPaths>>) => {
  if (!params?.productId) {
    return {
      props: {},
      notFound: true,
    };
  }

  // const res = await fetch(
  //   `https://naszsklep-api.vercel.app/api/products/${params.productId}`
  // );
  // const data: StoreApiResponse | null = await res.json();

  const { data } = await apolloClient.query<
    GetProductDetailsByIdQuery,
    GetProductDetailsByIdQueryVariables
  >({
    variables: {
      id: params?.productId,
    },
    query: GetProductDetailsByIdDocument,
  });

  if (!data || !data.product) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        ...data.product,
      },
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
//   longDescription: string;
//   rating: {
//     rate: number;
//     count: number;
//   };
// }
