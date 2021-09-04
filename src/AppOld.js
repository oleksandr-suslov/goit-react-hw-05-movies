import { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loader from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Searchbar from "./components/Searchbar/Searchbar";
import Section from "./components/Section/Section";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import getImagesApi from "./utility/ServiceApi";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import styles from "./App.css";

var shortid = require("shortid");

export default class App extends Component {
  state = {
    findImage: "",
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    onModalUrl: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const { findImage, page } = this.state;

    if (prevState.findImage !== findImage) {
      this.searchImages(findImage, 1);
      this.setState({ page: 1 });
    }
    if (prevState.page !== page) {
      this.searchImages(findImage, page);
    }
  }
  handleFormSubmit = (findImage) => {
    if (findImage.trim() === "") {
      this.setState({ images: [] });
    } else {
      this.setState({ findImage });
    }
  };

  toggleShowModal = (url) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      onModalUrl: url,
    }));
  };

  searchImages(findImage, page) {
    if (findImage !== "") {
      this.setState({
        isLoading: true,
      });
    }
    getImagesApi(findImage, page)
      .then((data) => {
        if (page === 1) {
          if (data.hits.length === 0) {
            toast.error("No result were found for your search", {
              theme: "colored",
              position: "top-left",
              autoClose: 5000,
            });
          }
          this.setState({
            images: data.hits,
          });
        } else {
          this.setState((prevState) => ({
            images: [...prevState.images, ...data.hits],
          }));
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
      })
      .catch((error) => {
        toast.error(error, {
          theme: "colored",
        });
      })
      .finally(() => this.setState({ isLoading: false }));
  }
  onButtonNextPage = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isLoading, onModalUrl, showModal } = this.state;
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {(images.length === 0 && (
          <Section>
            <p>Please input search request</p>
          </Section>
        )) || (
          <Section>
            <ImageGallery arr={images} onClick={this.toggleShowModal} />
            {isLoading && (
              <Loader
                type="BallTriangle"
                color="#00BFFF"
                height={200}
                width={200}
              />
            )}

            <Button
              type="button"
              name="Load more"
              id={shortid.generate()}
              clickOnBtn={this.onButtonNextPage}
            />
          </Section>
        )}
        {showModal && (
          <Modal onClose={this.toggleShowModal}>
            <img src={onModalUrl} alt="#" />
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
