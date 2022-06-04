import styles from "../styles/Home.module.css";
import { Link } from "react-router-dom";
import Logo from '../logo.png';

const Home = () => {
  return (
    <div className={styles.container}>
      <img src={Logo} className={styles.logo} alt="" />
      <h1>Rick and Morty Database</h1>
      <Link to="/characters" className={styles.link}>Characters</Link>
      <Link to="/locations" className={styles.link}>Locations</Link>
      <Link to="/episodes" className={styles.link}>Episodes</Link>
    </div>
  );
};

export default Home;
