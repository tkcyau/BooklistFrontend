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
    <PageWrapper>
      <Head>
        <title />
      </Head>
      <InfoContainer>
        <h2>Author name: {data.Author.name}</h2>
        <p>Date of birth: {data.Author.dateOfBirth}</p>
      </InfoContainer>
    </PageWrapper>
  );
}
