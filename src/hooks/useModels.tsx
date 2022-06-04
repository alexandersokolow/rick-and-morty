import { gql, useQuery } from '@apollo/client';

type modelType = "characters" | "locations" | "episodes";

const useModels = (page: number, model: modelType) => {
  const query = gql`
    query {
      ${model}(page: ${page || 1}) {
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

export default useModels;
