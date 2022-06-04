import styles from "../styles/Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Rick and Morty Lists</h1>
      <Link to="/characters" className={styles.link}>Characters</Link>
      <Link to="/locations" className={styles.link}>Locations</Link>
      <Link to="/episodes" className={styles.link}>Episodes</Link>
    </div>
  );
};

export default Home;
