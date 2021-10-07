import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';

const SINGLE_AUTHOR_QUERY = gql`
  query SINGLE_AUTHOR_QUERY($id: ID!) {
    Author(where: { id: $id }) {
      id
      name
      dateOfBirth
      book {
        title
      }
    }
  }
`;

export default function SingleAuthor({ id }) {
  const { data, loading, error } = useQuery(SINGLE_AUTHOR_QUERY, {
    variables: {
      id,
    },
  });
  console.log(data);
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Head>
        <title />
      </Head>
      <h2>Author name: {data.Author.name}</h2>
      <p>Date of birth: {data.Author.dateOfBirth}</p>
      {/* <p>Book authored: {data.Author.book[0]}</p> */}
    </div>
  );
}
