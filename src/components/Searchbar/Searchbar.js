import { Component } from "react";
// import { toast } from "react-toastify";
import Button from "../Button/Button";
import styles from "./Searchbar.module.css";

var shortid = require("shortid");

export default class Searchbar extends Component {
  state = {
    findImage: "",
  };

  handleFindImage = (e) => {
    this.setState({ findImage: e.currentTarget.value.toLowerCase() });
  };

  onChangeInput = (e) => {
    e.preventDefault();
    if (this.state.findImage.trim() === "") {
      // toast.warn("🦄 Wow so easy!", {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: false,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
      return;
    }
    this.props.onSubmit(this.state.findImage);
    this.setState({ findImage: "" });
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.onChangeInput}>
          <Button
            type="submit"
            newClassName={styles.SearchFormButton}
            id={shortid.generate()}
          />

          <input
            className={styles.SearchFormInput}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={this.state.findImage}
            onChange={this.handleFindImage}
          />
        </form>
      </header>
    );
  }
}
