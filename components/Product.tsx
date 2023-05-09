import { Rating } from "./Rating";
import Link from "next/link";
import Image from "next/legacy/image";
import { ZaisteReactMarkdown } from "./ZaisteReactMarkdown";
import { useCartSate } from "./Cart/CartContext";

interface ProductDetails {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: number;
  longDescription: string;
}

interface ProductProps {
  data: ProductDetails;
}

export const ProductDetails = ({ data }: ProductProps) => {
  return (
    <>
      <div className="p-4 bg-white">
        <Image
          src={data.thumbnailUrl}
          alt={data.thumbnailAlt}
          width={16}
          height={9}
          layout="responsive"
          objectFit="contain"
        />
      </div>

      <h2 className="p-4 font-bold">{data.title}</h2>
      <p className="p-4">{data.description}</p>
      <article className="p-4 prose lg:prose-xl">
        <ZaisteReactMarkdown>{data.longDescription}</ZaisteReactMarkdown>
      </article>
      <Rating rating={data.rating} />
    </>
  );
};

type ProductListItem = Pick<
  ProductDetails,
  "id" | "title" | "thumbnailUrl" | "thumbnailAlt"
>;

interface ProductListItemProps {
  data: ProductListItem;
}

export const ProductListItem = ({ data }: ProductListItemProps) => {
  const cartState = useCartSate();

  return (
    <>
      <div className="p-4 bg-white">
        <Image
          src={data.thumbnailUrl}
          alt={data.thumbnailAlt}
          width={16}
          height={9}
          layout="responsive"
          objectFit="contain"
        />
      </div>

      <Link href={`/products/${data.id}`}>
        <h2 className="p-4 font-bold">{data.title}</h2>
      </Link>
      <button
        onClick={() =>
          cartState.addItemToCart({
            id: data.id,
            price: 10,
            title: data.title,
            count: 1,
          })
        }
        className="p-5 m-5 text-white bg-green-600 rounded-xl hover:bg-green-700">
        Dodaj do koszyka
      </button>
    </>
  );
};
