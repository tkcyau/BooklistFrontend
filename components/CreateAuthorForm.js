import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import styled from 'styled-components';
import useForm from '../lib/useForm';
import { ALL_AUTHORS_QUERY } from './AuthorsList';
import BookForm from './CreateBookForm';

const CreateFormWrapper = styled.div`
  margin-bottom: 24px;
  input {
    margin-left: 8px;
    margin-right: 16px;
    border: none;
    border-bottom: 1px solid darkgrey;
  }

  fieldset {
    border: none;
    border-bottom: 1px solid lightgrey;
  }
`;
const AuthorFieldsGroup = styled.div`
  margin-bottom: 16px;
`;
const BookFieldsGroup = styled.div``;

const CREATE_AUTHOR_MUTATION = gql`
  mutation CREATE_AUTHOR_MUTATION(
    $authorName: String!
    $dateOfBirth: String!
    $title: String
    $year: Int
  ) {
    createAuthor(
      data: {
        name: $authorName
        dateOfBirth: $dateOfBirth
        book: { create: { title: $title, year: $year } }
      }
    ) {
      id
    }
  }
`;

export default function CreateAuthorForm() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    authorName: '',
    dateOfBirth: '',
    title: '',
    year: '',
  });

  const [createAuthor, { loading, error, data }] = useMutation(
    CREATE_AUTHOR_MUTATION,
    {
      variables: {
        authorName: inputs.authorName,
        dateOfBirth: inputs.dateOfBirth,
        title: inputs.title,
        year: inputs.year,
      },
      refetchQueries: [{ query: ALL_AUTHORS_QUERY }],
    }
  );
  return (
    <CreateFormWrapper>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          // Submit input fields to the backend
          await createAuthor();
          clearForm();
          // Router.push({
          //   pathName: `/book/${res.data.createBook.id}`,
          // });
        }}
      >
        <fieldset disabled={loading}>
          <AuthorFieldsGroup>
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
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                placeholder="Author Date of Birth"
                value={inputs.dateOfBirth}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Add Author</button>
          </AuthorFieldsGroup>
          <BookFieldsGroup>
            <label htmlFor="title">
              Book title
              <input
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
                type="number"
                id="year"
                name="year"
                placeholder="Year"
                value={inputs.year}
                onChange={handleChange}
              />
            </label>
          </BookFieldsGroup>
        </fieldset>
      </form>
    </CreateFormWrapper>
  );
}
