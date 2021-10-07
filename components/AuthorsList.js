import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import AuthorCard from './AuthorCard';
import CreateAuthorForm from './CreateAuthorForm';

const AuthorCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ALL_AUTHORS_QUERY = gql`
  query ALL_AUTHORS_QUERY {
    allAuthors {
      id
      name
      dateOfBirth
    }
  }
`;
export default function BookList() {
  const { data, error, loading } = useQuery(ALL_AUTHORS_QUERY);
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <CreateAuthorForm />

      <h1>Authors List</h1>
      <AuthorCardWrapper>
        {data.allAuthors.map((author) => (
          <AuthorCard key={author.id} author={author} />
        ))}
      </AuthorCardWrapper>
    </div>
  );
}
