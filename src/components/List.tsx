import "./Boilerplate.css";
import useModels from '../hooks/useModels';

interface Props {
  model: "characters" | "locations" | "episodes";
}

export const List = ({model}: Props) => {
  const { loading, error, data } = useModels(1, model);
  console.log("loading: ", loading);
  console.log("error: ", error);
  console.log("data: ", data);

  return (<div></div>);
};
