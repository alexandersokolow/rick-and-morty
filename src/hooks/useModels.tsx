import { gql, useQuery } from '@apollo/client';

type modelType = "characters" | "locations" | "episodes";

const schemas = {
  characters: "id\nname\nspecies\norigin{name}\nlocation{name}",
  locations: "id\nname\ntype\ndimension",
  episodes: "id\nname\nair_date\nepisode",
}

const buildQuery = (page: number, model: modelType) => {
  const query = gql`
    query {
      ${model}(page: ${page || 1}) {
        info {
          count,
          pages
        }
        results {
          ${schemas[model]}
        }
      }
    }
    `;
    return query;
}

const useModels = (page: number, model: modelType) => {
  const query = buildQuery(page, model);
  const { loading, error, data } = useQuery(query);
  return { loading, error, data };
};

export default useModels;
