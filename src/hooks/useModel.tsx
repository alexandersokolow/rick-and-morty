import { gql, useQuery } from '@apollo/client';

type modelType = "character" | "location" | "episode";

const schemas = {
  character: "name\nstatus\nspecies\ntype\ngender\norigin{name}\nlocation{name}\nimage\nepisode{id, name}",
  location: "name\ntype\ndimension\nresidents{id, name}",
  episode: "name\nair_date\nepisode\ncharacters{id, name}",
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
