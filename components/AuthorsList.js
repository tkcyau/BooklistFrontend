import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import AuthorCard from './AuthorCard';

const ALL_AUTHORS_QUERY = gql`
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
      <h1>Authors List</h1>
      {data.allAuthors.map((author) => (
        <AuthorCard key={author.id} data={author} />
      ))}
    </div>
  );
}
