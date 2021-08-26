import styles from "./Navbar.module.css";
import { FiMenu } from "react-icons/fi";
import { IconContext } from "react-icons";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <h1>Gym Diary</h1>
      <IconContext.Provider value={{ size: "3em" }}>
        <FiMenu />
      </IconContext.Provider>
    </div>
  );
};

export default Navbar;
