import { gql, useQuery } from '@apollo/client';

const useCharacters = (page: number) => {
  const query = gql`
    query {
      characters(page: ${page || 1}) {
        info {
          count
        }
        results {
          name
        }
      }
    }
    `;
  const { loading, error, data } = useQuery(query);
  return { loading, error, data };
};

export default useCharacters;
