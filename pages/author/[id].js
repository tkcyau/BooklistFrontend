import SingleAuthor from '../../components/SingleAuthor';

export default function SingleAuthorPage({ query }) {
  return <SingleAuthor id={query.id} />;
}
