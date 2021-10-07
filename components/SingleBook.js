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
  p {
    text-align: center;
  }
`;

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
    <PageWrapper>
      <Head>
        <title>{data?.Book.title}</title>
      </Head>
      <InfoContainer>
        <h2>Book Title: {data?.Book.title}</h2>
        <p>Year: {data?.Book.year}</p>

        <p>Author Name: {data?.Book.author.name}</p>
        <p>Author Date of Birth: {data?.Book.author.dateOfBirth}</p>
      </InfoContainer>
    </PageWrapper>
  );
}
