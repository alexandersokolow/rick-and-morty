import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import useModels from '../hooks/useModels';
import classnames from 'classnames';
import BeatLoader from "react-spinners/BeatLoader";

import styles from "../styles/List.module.css";

interface Location {
  name: string;
}

interface Character {
  id: string;
  name: string;
  species: string;
  location: Location;
  origin: Location;
}

const mapCharacter = (character: Character, navigate: Function) => {
  const path = "/character/" + character.id;
  return (
    <div className={styles.row}>
      <div className={styles.column}>{character.name}</div>
      <div className={styles.column}>{character.species}</div>
      <div className={styles.column}>{character.origin.name}</div>
      <div className={styles.column}>{character.location.name}</div>
      <div className={classnames(styles.column, styles.buttons)}>
        <button className={styles.button} onClick={() => navigate(path)}>View</button>
      </div>
    </div>
  );
}

const Characters = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { loading, data } = useModels(page, "characters");
  const characters = data?.characters?.results || [];
  const maxCount = data?.characters?.info?.count || 0;
  const countStart = (20*(page-1));
  const countEnd = countStart + (data?.characters?.results?.length || 0);
  const pages = data?.characters?.info?.pages || 0;
  const isFirstPage = page === 1;
  const isLastPage = page === pages;

  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <Link to="/">go back</Link>
      </div>
      <h1>Characters</h1>
      { loading ? (
        <div className={styles.loader}>
          <BeatLoader color="#000000" loading={true} size={30} />
        </div>
        ) : (
        <div className={styles.table}>
          <div className={styles.header}>
            <div className={styles.column}>Name</div>
            <div className={styles.column}>Species</div>
            <div className={styles.column}>Origin</div>
            <div className={styles.column}>Location</div>
            <div className={classnames(styles.column, styles.buttons)}>Actions</div>
          </div>
          { characters.map((character: Character) => mapCharacter(character, navigate))}
          <div className={styles.footer}>
            <div>Showing <b>{countStart}</b>-<b>{countEnd}</b> of <b>{maxCount}</b></div>
            <div>
              { !isFirstPage && <button className={styles.button} onClick={() => setPage((old: number) => old - 1)}>Previous</button>}
              { !isLastPage && <button className={classnames(styles.button, styles.rightButton)} onClick={() => setPage((old: number) => old + 1)}>Next</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Characters;
