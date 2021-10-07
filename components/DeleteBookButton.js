import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DELETE_BOOK_MUTATION = gql`
  mutation DELETE_BOOK_MUTATION($id: ID!) {
    deleteBook(id: $id) {
      id
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteBook));
}

export default function DeleteBookButton({ id, children }) {
  const [deleteBook, { loading }] = useMutation(DELETE_BOOK_MUTATION, {
    variables: { id },
    update,
  });
  return (
    <button
      disabled={loading}
      onClick={() => {
        if (confirm('Are you sure you want to delete this item?')) {
          deleteBook().catch((err) => alert(err.message));
        }
      }}
      type="button"
    >
      {children}
    </button>
  );
}
