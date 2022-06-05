import { Link, useParams } from "react-router-dom";
import useModel from '../hooks/useModel';
import BeatLoader from "react-spinners/BeatLoader";

import styles from "../styles/SingleView.module.css";

interface Location {
  id: string;
  name: string;
}

interface Episode {
  id: string;
  name: string;
}

interface Character {
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  location?: Location;
  origin?: Location;
  image?: string;
  episode?: Episode[];
}

const mapEpisode = (episode: Episode) => {
  const path = "/episode/" + episode.id;
  return <Link to={path}><div className={styles.listRow}>{episode.name} ({episode.id})</div></Link>;
}

const CharacterView = () => {
  const params = useParams();
  const id = params?.id || "1";
  const { loading, error, data } = useModel(id, "character");
  const character: Character = data?.character || {};
  const locationPath = "/location/" + character.location?.id;
  const originPath = "/location/" + character.origin?.id;
  console.log("character: ", character);

  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <Link to="/characters">Character List</Link>
      </div>
      <h1>Character</h1>
      { !!error ? (<div className={styles.error}>Could not fetch the character</div>)
        : loading ? (
        <div className={styles.loader}>
          <BeatLoader color="#000000" loading={true} size={30} />
        </div>
        ) : (
        <div className={styles.table}>
          { character.image && <img className={styles.image} src={character.image} alt="" /> }
          <div className={styles.row}><b>Name: </b>{character.name}</div>
          <div className={styles.row}><b>Status: </b>{character.status}</div>
          <div className={styles.row}><b>Type: </b>{character.type || "-"}</div>
          <div className={styles.row}><b>Gender: </b>{character.gender}</div>
          <div className={styles.row}><b>Species: </b>{character.species}</div>
          <div className={styles.row}><b>Location: </b><Link to={locationPath}>{character.location?.name}</Link></div>
          <div className={styles.row}><b>Origin: </b><Link to={originPath}>{character.origin?.name}</Link></div>
          <div className={styles.row}>
            <b>Episodes: </b><br/>
            { character?.episode?.map(mapEpisode) }
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterView;
