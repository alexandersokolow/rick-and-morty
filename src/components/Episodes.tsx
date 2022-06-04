import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import useModels from '../hooks/useModels';
import classnames from 'classnames';
import BeatLoader from "react-spinners/BeatLoader";

import styles from "../styles/List.module.css";

interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
}

const mapEpisode = (episode: Episode, navigate: any) => {
  const path = "/episode/" + episode.id;
  return (
    <div className={styles.row}>
      <div className={styles.column}>{episode.name}</div>
      <div className={styles.column}>{episode.air_date}</div>
      <div className={styles.column}>{episode.episode}</div>
      <div className={classnames(styles.column, styles.buttons)}>
        <button className={styles.button} onClick={() => navigate(path)}>View</button>
      </div>
    </div>
  );
}

const Episodes = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { loading, data } = useModels(page, "episodes");
  const episodes = data?.episodes?.results || [];
  const maxCount = data?.episodes?.info?.count || 0;
  const countStart = (20*(page-1));
  const countEnd = countStart + (data?.episodes?.results?.length || 0);
  const pages = data?.episodes?.info?.pages || 0;
  const isFirstPage = page === 1;
  const isLastPage = page === pages;

  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <Link to="/">go back</Link>
      </div>
      <h1>Episodes</h1>
      { loading ? (
        <div className={styles.loader}>
          <BeatLoader color="#000000" loading={true} size={30} />
        </div>
        ) : (
        <div className={styles.table}>
          <div className={styles.header}>
            <div className={styles.column}>Name</div>
            <div className={styles.column}>Air Date</div>
            <div className={styles.column}>Episode Code</div>
            <div className={classnames(styles.column, styles.buttons)}>Actions</div>
          </div>
          { episodes.map((episode: Episode) => mapEpisode(episode, navigate))}
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

export default Episodes;
