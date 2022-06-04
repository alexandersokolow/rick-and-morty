import { gql, useQuery } from '@apollo/client';

type modelType = "character" | "location" | "episode";

const schemas = {
  character: "name\nstatus\nspecies\ntype\ngender\norigin{name}\nlocation{name}\nimage",
  location: "name\ntype\ndimension",
  episode: "name\nair_date\nepisode",
}

const buildQuery = (id: string, model: modelType) => {
  const query = gql`
    query {
      ${model}(id: ${id || 1}) {
        ${schemas[model]}
      }
    }
    `;
    return query;
}

const useModels = (id: string, model: modelType) => {
  const query = buildQuery(id, model);
  const { loading, error, data } = useQuery(query);
  return { loading, error, data };
};

export default useModels;
