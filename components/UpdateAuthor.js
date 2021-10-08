import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import useForm from '../lib/useForm';
import { ALL_AUTHORS_QUERY } from './AuthorsList';

const FormWrapper = styled.div`
  h2 {
    text-align: center;
  }
  input {
    margin-left: 8px;
    margin-right: 16px;
    margin-bottom: 16px;
    border: none;
    border-bottom: 1px solid darkgrey;
  }

  fieldset {
    padding: 24px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    max-width: 400px;
    border: 1px solid lightgrey;
  }
`;

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

const ADD_BOOK_TO_AUTHOR_MUTATION = gql`
  mutation ADD_BOOK_TO_AUTHOR_MUTATION($id: ID!, $title: String!, $year: Int!) {
    createBook(
      data: { title: $title, year: $year, author: { connect: { id: $id } } }
    ) {
      id
      title
    }
  }
`;

export default function UpdateAuthor({ id }) {
  const router = useRouter();
  //   Get existing Author

  const { data, error, loading } = useQuery(SINGLE_AUTHOR_QUERY, {
    variables: { id },
  });

  const { inputs, handleChange, clearForm, resetForm } = useForm({
    authorName: data?.Author.name,
    dateOfBirth: data?.Author.dateOfBirth,
    title: '',
    year: '',
  });

  const [
    updateAuthor,
    {
      data: updatedAuthorData,
      error: updatedAuthorError,
      loading: updatedAuthorLoading,
    },
  ] = useMutation(UPDATE_AUTHOR_MUTATION);

  const [
    addBook,
    { data: addBookData, error: addBookError, loading: addBookloading },
  ] = useMutation(ADD_BOOK_TO_AUTHOR_MUTATION);

  if (loading) return <p>Loading...</p>;
  return (
    <FormWrapper>
      <div>
        <h2>Update Author</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            await updateAuthor({
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
            alert('Author updated!');
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
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            await addBook({
              variables: {
                id,
                title: inputs.title,
                year: inputs.year,
              },
              refetchQueries: [
                {
                  query: ALL_AUTHORS_QUERY,
                },
              ],
            });
            alert('Book added to author!');
          }}
        >
          <fieldset disabled={updatedAuthorLoading}>
            <label htmlFor="title">
              Book title
              <input
                required
                type="text"
                id="title"
                name="title"
                placeholder="Book title"
                value={inputs.title}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="year">
              Year
              <input
                required
                type="number"
                id="year"
                name="year"
                placeholder="Year"
                value={inputs.year}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Add Book to Author</button>
          </fieldset>
        </form>
      </div>
    </FormWrapper>
  );
}
