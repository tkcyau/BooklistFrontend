import { useLazyQuery, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import BookCard from './BookCard';
import CreateBookForm from './CreateBookForm';
import BookSearch from './BookSearch';

const BookCardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <BookSearch />
      <h1>Booklist</h1>
      <CreateBookForm />
      <BookCardsWrapper>
        {data.allBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </BookCardsWrapper>
    </div>
  );
}
