import { useQuery, gql } from "@apollo/client";
import { Main } from "../components/Main";

export default function Home() {
  const GET_ALL_PRODUCTS = gql`
    query GetProductList {
      products {
        id
        name
        price
        slug
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  if (loading) {
    return <Main>Loading...</Main>;
  }

  if (error) {
    console.log(error);

    return <Main>{JSON.stringify(error)}</Main>;
  }

  return (
    <Main>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Main>
  );
}
