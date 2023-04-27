import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
// import { useRouter } from "next/router";
import { ProductDetails } from "../../components/Product";
import Link from "next/link";

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
          thumbnailUrl: data.image,
          thumbnailAlt: data.title,
          title: data.title,
          description: data.description,
          rating: data.rating.rate,
          id: data.id,
          longDescription: data.longDescription,
        }}
      />
    </div>
  );
};

export default ProductIdPage;

export const getStaticPaths = async () => {
  const res = await fetch("https://naszsklep-api.vercel.app/api/products");
  const data: StoreApiResponse[] = await res.json();

  return {
    paths: data.map((product) => {
      return {
        params: {
          productId: product.id.toString(),
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

  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products/${params.productId}`
  );
  const data: StoreApiResponse | null = await res.json();

  return {
    props: {
      data,
    },
  };
};

export interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  longDescription: string;
  rating: {
    rate: number;
    count: number;
  };
}
