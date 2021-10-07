/* eslint-disable react/jsx-props-no-spreading */

import { useCombobox, resetIdCounter } from 'downshift';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { SearchStyles, DropDown, DropDownItem } from './DropdownStyles';

const SEARCH_AUTHORS_QUERY = gql`
  query SEARCH_AUTHORS_QUERY($searchTerm: String!) {
    searchTerms: allAuthors(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { dateOfBirth_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      dateOfBirth
    }
  }
`;

export default function AuthorSearch() {
  const router = useRouter();
  resetIdCounter();

  const [findAuthors, { loading, data, error }] = useLazyQuery(
    SEARCH_AUTHORS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );
  const items = data?.searchTerms || [];
  const findBooksDebounced = debounce(findAuthors, 350);
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange() {
      findBooksDebounced({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      router.push({
        pathname: `/author/${selectedItem.id}`,
      });
    },
    itemToString: (item) => item?.name || '',
  });
  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for a author',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              {...getItemProps({ item, index })}
              key={item.id}
              highlighted={index === highlightedIndex}
            >
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>Sorry, no authors found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
