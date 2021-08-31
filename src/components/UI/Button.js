import styles from "./Button.module.css";

const Button = ({ onClick, content, style }) => {
  return (
    <button className={styles.button} onClick={onClick} style={style}>
      {content}
    </button>
  );
};

export default Button;
