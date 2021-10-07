import styled from 'styled-components';
import Link from 'next/dist/client/link';
import DeleteBookButton from './DeleteBookButton';

const Card = styled.div`
  border: 1px solid darkblue;
  width: 300px;
  margin-bottom: 16px;
  margin-right: 16px;
  padding: 16px;
  border-radius: 4px;
  background: #b1dce0;
  a {
    margin-right: 16px;
  }
`;
/* eslint react/prop-types: 0 */

export default function BookCard({ book }) {
  return (
    <Card>
      <h2>Title: {book.title}</h2>
      <p>year: {book.year}</p>
      <Link href={`/book/${book.id}`}>More info</Link>
      <Link
        href={{
          pathname: '/updatebook',
          query: {
            id: book.id,
          },
        }}
      >
        Edit
      </Link>
      <DeleteBookButton id={book.id}>Delete</DeleteBookButton>
    </Card>
  );
}
