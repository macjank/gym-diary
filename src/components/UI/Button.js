import styles from './Button.module.css'

const Button = ({onClick}) => {
    return (
        <button className={styles.button} onClick={onClick}>+</button>
    );
}
 
export default Button;