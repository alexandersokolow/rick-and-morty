import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import useModels from '../hooks/useModels';
import classnames from 'classnames';
import BeatLoader from "react-spinners/BeatLoader";

import styles from "../styles/List.module.css";

interface Location {
  id: string;
  name: string;
  type: string;
  dimension: string;
}

const mapLocation = (location: Location, navigate: any) => {
  const path = "/location/" + location.id;
  return (
    <div className={styles.row}>
      <div className={styles.column}>{location.name}</div>
      <div className={styles.column}>{location.type}</div>
      <div className={styles.column}>{location.dimension}</div>
      <div className={classnames(styles.column, styles.buttons)}>
        <button className={styles.button} onClick={() => navigate(path)}>View</button>
      </div>
    </div>
  );
}

const Locations = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { loading, data } = useModels(page, "locations");
  const locations = data?.locations?.results || [];
  const maxCount = data?.locations?.info?.count || 0;
  const countStart = (20*(page-1));
  const countEnd = countStart + (data?.locations?.results?.length || 0);
  const pages = data?.locations?.info?.pages || 0;
  const isFirstPage = page === 1;
  const isLastPage = page === pages;

  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <Link to="/">go back</Link>
      </div>
      <h1>Locations</h1>
      { loading ? (
        <div className={styles.loader}>
          <BeatLoader color="#000000" loading={true} size={30} />
        </div>
        ) : (
        <div className={styles.table}>
          <div className={styles.header}>
            <div className={styles.column}>Name</div>
            <div className={styles.column}>Type</div>
            <div className={styles.column}>Dimension</div>
            <div className={classnames(styles.column, styles.buttons)}>Actions</div>
          </div>
          { locations.map((location: Location) => mapLocation(location, navigate))}
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

export default Locations;
