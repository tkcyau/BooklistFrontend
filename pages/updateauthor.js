import UpdateAuthor from '../components/UpdateAuthor';

export default function UpdatePage({ query }) {
  return (
    <div>
      <UpdateAuthor id={query.id} />
    </div>
  );
}
