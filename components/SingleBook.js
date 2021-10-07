import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Book(where: { id: $id }) {
      title
      year
      id
      author {
        id
        name
        dateOfBirth
      }
    }
  }
`;

export default function SingleBook({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading...</p>;
  console.log(data);

  return (
    <div>
      <Head>
        <title>{data?.Book.title}</title>
      </Head>
      <h2>Book Title: {data?.Book.title}</h2>
      <p>Year: {data?.Book.year}</p>

      <p>Author Name: {data?.Book.author.name}</p>
      <p>Author Date of Birth: {data?.Book.author.dateOfBirth}</p>
    </div>
  );
}
