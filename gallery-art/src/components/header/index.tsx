import styles from './style.module.scss';
import {Link} from 'react-router-dom'

export default function Index({menuIsActive, setMenuIsActive}) {
  return (
    <div className={styles.header}>
        <div className={styles.logo}>
            <h1> <Link to="/">Gallery Art</Link> </h1>
        </div>
        <div onClick={() => {setMenuIsActive(!menuIsActive)}} className={`${styles.burger} ${menuIsActive ? styles.burgerActive : ""}`}>
        </div>
    </div>
)}