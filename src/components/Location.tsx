import { Link, useParams } from "react-router-dom";
import useModel from '../hooks/useModel';
import BeatLoader from "react-spinners/BeatLoader";

import styles from "../styles/SingleView.module.css";

interface Character {
  id: string;
  name: string;
}

interface Location {
  name?: string;
  type?: string;
  dimension?: string;
  residents?: Character[];
}

const mapCharacter = (character: Character) => {
  const path = "/character/" + character.id;
  return <Link to={path}><div className={styles.listRow}>{character.name}</div></Link>;
}

const LocationView = () => {
  const params = useParams();
  const id = params?.id || "1";
  const { loading, error, data } = useModel(id, "location");
  const location: Location = data?.location || {};

  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <Link to="/locations">Location List</Link>
      </div>
      <h1>Location</h1>
      { !!error ? (<div className={styles.error}>Could not fetch the location</div>)
        : loading ? (
        <div className={styles.loader}>
          <BeatLoader color="#000000" loading={true} size={30} />
        </div>
        ) : (
        <div className={styles.table}>
          <div className={styles.row}><b>Name: </b>{location.name}</div>
          <div className={styles.row}><b>Type: </b>{location.type}</div>
          <div className={styles.row}><b>Dimension: </b>{location.dimension}</div>
          <div className={styles.row}>
            <b>Residents: </b><br/>
            { location?.residents?.map(mapCharacter) }
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationView;
