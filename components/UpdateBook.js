import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';

import useForm from '../lib/useForm';

const SINGLE_BOOK_QUERY = gql`
  query SINGLE_BOOK_QUERY($id: ID!) {
    Book(where: { id: $id }) {
      title
      year
      id
      author {
        id
        name
        dateOfBirth
      }
    }
  }
`;

const UPDATE_BOOK_MUTATION = gql`
  mutation UPDATE_BOOK_MUTATION($id: ID!, $title: String!, $year: Int!) {
    updateBook(id: $id, data: { title: $title, year: $year }) {
      id
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

export default function UpdateBook({ id }) {
  //   Get existing book

  const { data, error, loading } = useQuery(SINGLE_BOOK_QUERY, {
    variables: { id },
  });

  const { inputs, handleChange, clearForm, resetForm } = useForm({
    title: data?.Book.title,
    year: data?.Book.year,
    authorName: data?.Book.author.name,
    dateOfBirth: data?.Book.author.dateOfBirth,
  });

  const [
    updateBook,
    { data: updatedData, error: updatedError, loading: updatedLoading },
  ] = useMutation(UPDATE_BOOK_MUTATION);

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
      <p>Update {id}</p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await updateBook({
            variables: {
              id,
              title: inputs.title,
              year: inputs.year,
              //   authorName: inputs.authorName,
              //   dateOfBirth: inputs.dateOfBirth,
            },
          }).catch(console.error);
          console.log(res);

          const authorRes = await updateAuthor({
            variables: {
              id: data.Book.author.id,
              name: inputs.authorName,
              dateOfBirth: inputs.dateOfBirth,
            },
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
        <fieldset disabled={updatedLoading}>
          <label htmlFor="title">
            Title
            <input
              required
              type="text"
              id="title"
              name="title"
              placeholder="Title"
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
              placeholder="year"
              value={inputs.year}
              onChange={handleChange}
            />
          </label>
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
          <button type="submit">Edit Book</button>
        </fieldset>
      </form>
    </div>
  );
}
