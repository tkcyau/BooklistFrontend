import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';

import useForm from '../lib/useForm';
import { ALL_AUTHORS_QUERY } from './AuthorsList';

const SINGLE_AUTHOR_QUERY = gql`
  query SINGLE_AUTHOR_QUERY($id: ID!) {
    Author(where: { id: $id }) {
      id
      name
      dateOfBirth
    }
  }
`;

const UPDATE_AUTHOR_MUTATION = gql`
  mutation UPDATE_AUTHOR_MUTATION(
    $id: ID!
    $name: String!
    $dateOfBirth: String!
  ) {
    updateAuthor(id: $id, data: { name: $name, dateOfBirth: $dateOfBirth }) {
      id
    }
  }
`;

export default function UpdateAuthor({ id }) {
  //   Get existing Author

  const { data, error, loading } = useQuery(SINGLE_AUTHOR_QUERY, {
    variables: { id },
  });

  const { inputs, handleChange, clearForm, resetForm } = useForm({
    authorName: data?.Author.name,
    dateOfBirth: data?.Author.dateOfBirth,
  });

  const [
    updateAuthor,
    {
      data: updatedAuthorData,
      error: updatedAuthorError,
      loading: updatedAuthorLoading,
    },
  ] = useMutation(UPDATE_AUTHOR_MUTATION);

  if (loading) return <p>Loading...</p>;
  console.log(data);
  console.log(inputs);
  return (
    <div>
      <p>Update Author</p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const authorRes = await updateAuthor({
            variables: {
              id,
              name: inputs.authorName,
              dateOfBirth: inputs.dateOfBirth,
            },
            refetchQueries: [
              {
                query: ALL_AUTHORS_QUERY,
              },
            ],
          });
          alert('Edit complete!');
          Router.push({
            pathName: `/authors`,
          });

          //   console.log(inputs);
          //   // Submit input fields to the backend
          //   const res = await createBook();
          //   clearForm();
          //   Router.push({
          //     pathName: `/product/${res.data.createBook.id}`,
          //   });
        }}
      >
        <fieldset disabled={updatedAuthorLoading}>
          <label htmlFor="authorName">
            Author Name
            <input
              required
              type="text"
              id="authorName"
              name="authorName"
              placeholder="Author Name"
              value={inputs.authorName}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="dateOfBirth">
            Author Date of Birth
            <input
              required
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              placeholder="Author Date of Birth"
              value={inputs.dateOfBirth}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Edit Author</button>
        </fieldset>
      </form>
    </div>
  );
}
