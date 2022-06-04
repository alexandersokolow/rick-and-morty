import { Link, useParams } from "react-router-dom";
import useModel from '../hooks/useModel';
import BeatLoader from "react-spinners/BeatLoader";

import styles from "../styles/SingleView.module.css";

interface Location {
  name?: string;
  type?: string;
  dimension?: string;
}

const LocationView = () => {
  const params = useParams();
  const id = params?.id || "1";
  const { loading, error, data } = useModel(id, "location");
  const location: Location = data?.location || {};

  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <Link to="/locations">go back</Link>
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
        </div>
      )}
    </div>
  );
};

export default LocationView;
