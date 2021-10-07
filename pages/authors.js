import styled from 'styled-components';
import AuthorsList from '../components/AuthorsList';

const PageWrapper = styled.div`
  padding: 48px;
`;
export default function AuthorPage() {
  return (
    <PageWrapper>
      <AuthorsList />
    </PageWrapper>
  );
}
