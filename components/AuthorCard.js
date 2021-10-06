/* eslint react/prop-types: 0 */

import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid darkblue;
  width: 300px;
  margin-bottom: 16px;
  padding: 16px;
  border-radius: 4px;
  background: #b1dce0;
`;

export default function AuthorCard({ data }) {
  return (
    <Card>
      <h2>Name: {data.name}</h2>
      <p>Date of birth: {data.dateOfBirth}</p>
    </Card>
  );
}
