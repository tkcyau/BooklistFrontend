import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import BookCard from './BookCard';
import CreateBookForm from './CreateBookForm';

export const ALL_BOOKS_QUERY = gql`
  query ALL_BOOKS_QUERY {
    allBooks {
      id
      title
      year
      author {
        id
        name
      }
    }
  }
`;
export default function BookList() {
  const { data, error, loading } = useQuery(ALL_BOOKS_QUERY);
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <h1>Booklist</h1>
      {data.allBooks.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
      <CreateBookForm />
    </div>
  );
}
