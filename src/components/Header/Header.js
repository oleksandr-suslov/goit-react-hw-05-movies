import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import Section from "../Section/Section";

export default function Header() {
  return (
    <Section>
      <nav className={styles.NavList}>
        <NavLink
          exact
          to="/"
          className={styles.NavItem}
          activeClassName={styles.activeLink}
        >
          Home
        </NavLink>
        <NavLink
          to="/movie"
          className={styles.NavItem}
          activeClassName={styles.activeLink}
        >
          Movie
        </NavLink>
      </nav>
    </Section>
  );
}
