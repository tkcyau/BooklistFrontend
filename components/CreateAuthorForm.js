import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import styled from 'styled-components';
import useForm from '../lib/useForm';
import { ALL_AUTHORS_QUERY } from './AuthorsList';

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

const CREATE_AUTHOR_MUTATION = gql`
  mutation CREATE_AUTHOR_MUTATION($authorName: String!, $dateOfBirth: String!) {
    createAuthor(data: { name: $authorName, dateOfBirth: $dateOfBirth }) {
      id
    }
  }
`;

export default function CreateAuthorForm() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    authorName: '',
    dateOfBirth: '',
  });

  const [createAuthor, { loading, error, data }] = useMutation(
    CREATE_AUTHOR_MUTATION,
    {
      variables: {
        authorName: inputs.authorName,
        dateOfBirth: inputs.dateOfBirth,
      },
      refetchQueries: [{ query: ALL_AUTHORS_QUERY }],
    }
  );
  return (
    <CreateFormWrapper>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log(inputs);
          // Submit input fields to the backend
          const res = await createAuthor();
          clearForm();
          // Router.push({
          //   pathName: `/book/${res.data.createBook.id}`,
          // });
        }}
      >
        <fieldset disabled={loading}>
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
        </fieldset>
      </form>
    </CreateFormWrapper>
  );
}