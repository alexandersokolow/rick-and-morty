import { Link, useParams } from "react-router-dom";
import useModel from '../hooks/useModel';
import BeatLoader from "react-spinners/BeatLoader";

import styles from "../styles/SingleView.module.css";

interface Episode {
  name: string;
  air_date: string;
  episode: string;
}

const EpisodeView = () => {
  const params = useParams();
  const id = params?.id || "1";
  const { loading, error, data } = useModel(id, "episode");
  const episode: Episode = data?.episode || {};

  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <Link to="/episodes">go back</Link>
      </div>
      <h1>Episode</h1>
      { !!error ? (<div className={styles.error}>Could not fetch the episode</div>)
        : loading ? (
        <div className={styles.loader}>
          <BeatLoader color="#000000" loading={true} size={30} />
        </div>
        ) : (
        <div className={styles.table}>
          <div className={styles.row}><b>Name: </b>{episode.name}</div>
          <div className={styles.row}><b>Air Date: </b>{episode.air_date}</div>
          <div className={styles.row}><b>Episode: </b>{episode.episode}</div>
        </div>
      )}
    </div>
  );
};

export default EpisodeView;
