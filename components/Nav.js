import Link from 'next/link';
import styled from 'styled-components';

const NavWrapper = styled.nav`
  padding: 8px 48px;
  background: #b1dce0;
  a {
    font-family: 'Arial';
    color: darkblue;
    padding: 0 12px;
    margin-right: 16px;
    text-decoration: none;
  }
`;

export default function Nav() {
  return (
    <NavWrapper>
      <Link href="/">BookList</Link>
      <Link href="/authors">Authors</Link>
    </NavWrapper>
  );
}
