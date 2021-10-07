/* eslint react/prop-types: 0 */
import { createGlobalStyle } from 'styled-components';
import Header from './Header';

const GlobalStyles = createGlobalStyle`
html {
  box-sizing: border-box;

}

*, *::before, *:after {
box-sizing: inherit;

}

body {
  padding:0;
  margin:0;
  font-family: "Arial";

}
`;

export default function Layout({ children }) {
  return (
    <div>
      <GlobalStyles />
      <Header />
      {children}
    </div>
  );
}
