/* eslint-disable react/jsx-props-no-spreading */

import { useCombobox, resetIdCounter } from 'downshift';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import useForm from '../lib/useForm';
import { SearchStyles, DropDown, DropDownItem } from './DropdownStyles';

const SEARCH_BOOKS_QUERY = gql`
  query SEARCH_BOOKS_QUERY($searchTerm: String!) {
    searchTerms: allBooks(
      where: {
        OR: [
          { title_contains_i: $searchTerm }
          { author: { name_contains_i: $searchTerm } }
        ]
      }
    ) {
      id
      title
      year
      author {
        id
        name
      }
    }
  }
`;

export default function BookSearch() {
  const router = useRouter();
  resetIdCounter();

  const [findBooks, { loading, data, error }] = useLazyQuery(
    SEARCH_BOOKS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );
  const items = data?.searchTerms || [];
  const findBooksDebounced = debounce(findBooks, 350);
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
      console.log('Input changed!');
      findBooksDebounced({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      router.push({
        pathname: `/book/${selectedItem.id}`,
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
            placeholder: 'Search for a book',
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
              {item.title}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>Sorry, no books found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
