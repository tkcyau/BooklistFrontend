import UpdateBook from '../components/UpdateBook';

export default function UpdatePage({ query }) {
  return (
    <div>
      <UpdateBook id={query.id} />
    </div>
  );
}
