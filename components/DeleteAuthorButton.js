import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DELETE_AUTHOR_MUTATION = gql`
  mutation DELETE_AUTHOR_MUTATION($id: ID!) {
    deleteAuthor(id: $id) {
      id
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteAuthor));
}

export default function DeleteAuthorButton({ id, children }) {
  const [deleteAuthor, { loading }] = useMutation(DELETE_AUTHOR_MUTATION, {
    variables: { id },
    update,
  });
  return (
    <button
      disabled={loading}
      onClick={() => {
        if (confirm('Are you sure you want to delete this item?')) {
          deleteAuthor().catch((err) => alert(err.message));
        }
      }}
      type="button"
    >
      {children}
    </button>
  );
}
