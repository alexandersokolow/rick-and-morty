import { render } from "@testing-library/react";
import { App } from "./App";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { gql } from '@apollo/client';

export const GET_CHARACTERS_QUERY = gql`
  query {
    characters(page: 1) {
      info {
        count,
        pages
      }
      results {
        id
        name
        species
        origin {
          name
        }
        location {
          name
        }
      }
    }
  }
`;

const mocks: MockedResponse[] = [
 {
    request: {
      query: GET_CHARACTERS_QUERY
    },
    result: {
      data: {
        characters: {
          info: {
            count: 1,
            pages: 1,
          },
          results: [
            {
              id: 1,
              name: "test",
              species: "test",
              origin: { name: "test" },
              location: { name: "test" },
            }

          ]
        },
      }
    },
  },
];

test("renders app", () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );
});
