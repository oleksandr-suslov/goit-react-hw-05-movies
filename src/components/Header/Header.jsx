import { NavLink, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import Section from "../Section/Section";
import {routes} from '../../utility/routes'

export default function Header() {
  const location = useLocation();

  return (
    <Section>
      <nav>
        <ul className={styles.NavList}>
          <li className={styles.NavItem}>
            <NavLink
              exact
              to={{pathname: routes.home, state:{from: location}}}
              
              activeClassName={styles.activeLink}>
              Home
            </NavLink>
          </li>
          <li className={styles.NavItem}>
            <NavLink
              
              to={{pathname:routes.movie, state:{from: location ??routes.home}}}
              
              activeClassName={styles.activeLink}>
              Movie
            </NavLink>
          </li>
        </ul>
      </nav>
    </Section>
  );
}
