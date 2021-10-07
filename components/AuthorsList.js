import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import AuthorCard from './AuthorCard';
import CreateAuthorForm from './CreateAuthorForm';
import AuthorSearch from './AuthorSearch';

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <AuthorSearch />
      <h1>Authors List</h1>
      <CreateAuthorForm />

      <AuthorCardWrapper>
        {data.allAuthors.map((author) => (
          <AuthorCard key={author.id} author={author} />
        ))}
      </AuthorCardWrapper>
    </div>
  );
}
