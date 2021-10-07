/* eslint react/prop-types: 0 */

import Link from 'next/dist/client/link';
import styled from 'styled-components';
import DeleteAuthorButton from './DeleteAuthorButton';

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

export default function AuthorCard({ author }) {
  return (
    <Card>
      <h2>Name: {author.name}</h2>
      <Link href={`/author/${author.id}`}>More info</Link>
      <Link
        href={{
          pathname: '/updateauthor',
          query: {
            id: author.id,
          },
        }}
      >
        Edit
      </Link>
      <DeleteAuthorButton id={author.id}>Delete Author</DeleteAuthorButton>
    </Card>
  );
}
