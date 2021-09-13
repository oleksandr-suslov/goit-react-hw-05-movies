import { lazy, Suspense } from "react";
import { Switch, Route,Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Section from "../Section/Section";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header/Header";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


import styles from "./App.css";


const HomePage = lazy(() => import("../../pages/HomePage"));
const MoviePage = lazy(() => import("../../pages/MoviePage"));
const MovieDetailsPage = lazy(() => import("../../pages/MovieDetailsPage"));

export default function App() {

  return (
    <div className={styles.App}>
      <Header />
      <Section>
      <Suspense fallback={<h2>LOADING ...</h2>}>
        <Switch>
            <Route
              exact
              path="/" >
            <HomePage    />
          </Route>

            <Route
              exact
              path="/movie" >
            <MoviePage />
          </Route>

          <Route path="/movie/:movieId">
            <MovieDetailsPage />
          </Route>

          <Redirect to={"/"} />
                    
        </Switch>
      </Suspense>
      </Section>
      <ToastContainer autoClose={3000} />
    </div>
  );
}
