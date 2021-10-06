import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useForm from '../lib/useForm';
import { ALL_BOOKS_QUERY } from './Booklist';

const CREATE_BOOK_MUTATION = gql`
  mutation CREATE_BOOK_MUTATION(
    $title: String!
    $year: Int!
    $authorName: String!
    $dateOfBirth: String!
  ) {
    createBook(
      data: {
        title: $title
        year: $year
        author: { create: { name: $authorName, dateOfBirth: $dateOfBirth } }
      }
    ) {
      id
    }
  }
`;

export default function BookForm() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    title: '',
    year: '',
    authorName: '',
    dateOfBirth: '',
  });

  const [createBook, { loading, error, data }] = useMutation(
    CREATE_BOOK_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_BOOKS_QUERY }],
    }
  );
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(inputs);
        // Submit input fields to the backend
        const res = await createBook();
        clearForm();
        Router.push({
          pathName: `/product/${res.data.createBook.id}`,
        });
      }}
    >
      <fieldset disabled={loading}>
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
        <button type="submit">Add Book</button>
      </fieldset>
    </form>
  );
}
