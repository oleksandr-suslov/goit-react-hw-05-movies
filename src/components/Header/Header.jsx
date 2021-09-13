import { NavLink,useRouteMatch } from "react-router-dom";
import styles from "./Header.module.css";
import Section from "../Section/Section";

export default function Header() {
  //  const  url   = useRouteMatch();
  // console.log("url header", url);
  return (
    <Section>
      <nav>
        <ul className={styles.NavList}>
          <li className={styles.NavItem}>
            <NavLink
              exact
              // to={{pathname:`${url}`, state:{from: `${url}`}}}
              to="/"
              activeClassName={styles.activeLink}>
              Home
            </NavLink>
          </li>
          <li className={styles.NavItem}>
            <NavLink
              //  exact
              // to={{pathname:`${url}movie`, state:{from: `${url}`}}}
              to="/movie"
              activeClassName={styles.activeLink}>
              Movie
            </NavLink>
          </li>
        </ul>
      </nav>
    </Section>
  );
}
