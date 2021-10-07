import styled from 'styled-components';
import BookList from '../components/Booklist';

const Pagewrapper = styled.div`
  padding: 48px;
`;

export default function IndexPage() {
  return (
    <Pagewrapper>
      <BookList />
    </Pagewrapper>
  );
}
