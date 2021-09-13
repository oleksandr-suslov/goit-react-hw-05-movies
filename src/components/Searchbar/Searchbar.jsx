import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./Searchbar.module.css";

export default function Searchbar({ onSubmit }) {
  const [find, setFind] = useState("");
  const history = useHistory();
  const location = useLocation();

  // console.log("history", history);
  // console.log("location", location);

  const handleFindImage = (e) => {
      setFind(e.currentTarget.value.toLowerCase());
    },
    onChangeInput = (e) => {
      e.preventDefault();

      if (find.trim() === "") {
        toast.error("Please, enter your request!", {
          theme: "colored",
        });
      }
      onSubmit(find);
      history.push({ ...location, search: `query=${find}` });
      setFind("");
    };

  return (
    <div className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={onChangeInput}>
        <input
          className={styles.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
          value={find}
          onChange={handleFindImage}
        />
        <button type="submit" className={styles.SearchFormButton}>
          {/* Search */}
        </button>
      </form>
    </div>
  );
}
