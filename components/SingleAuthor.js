import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';

const PageWrapper = styled.div`
  padding: 48px;
`;

const InfoContainer = styled.div`
  border: 1px solid darkblue;
  width: 400px;
  margin: 0 auto;
  padding: 16px;
  border-radius: 4px;
  h2,
  h3,
  p {
    text-align: center;
  }
`;

const SINGLE_AUTHOR_QUERY = gql`
  query SINGLE_AUTHOR_QUERY($id: ID!) {
    Author(where: { id: $id }) {
      id
      name
      dateOfBirth
      book {
        id
        title
        year
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
  if (loading) return <p>Loading...</p>;
  console.log(data);
  return (
    <PageWrapper>
      <Head>
        <title />
      </Head>
      <InfoContainer>
        <h2>Author name: {data.Author.name}</h2>
        <p>Date of birth: {data.Author.dateOfBirth}</p>
        {data.Author.book.length && (
          <div>
            <h3>Books authored:</h3>
            {data.Author.book.map((book) => (
              <div key={book.id}>
                <p>Title: {book.title}</p>
                <p>Year: {book.year}</p>
              </div>
            ))}
          </div>
        )}
      </InfoContainer>
    </PageWrapper>
  );
}
