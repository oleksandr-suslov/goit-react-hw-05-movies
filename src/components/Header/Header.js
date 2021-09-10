import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import Section from "../Section/Section";

export default function Header() {
  return (
    <Section>
      <nav>
        <ul className={styles.NavList}>
          <li className={styles.NavItem}>
            <NavLink exact to="/" activeClassName={styles.activeLink}>
              Home
            </NavLink>
          </li>
          <li className={styles.NavItem}>
            <NavLink to="/movie" activeClassName={styles.activeLink}>
              Movie
            </NavLink>
          </li>
        </ul>
      </nav>
    </Section>
  );
}
