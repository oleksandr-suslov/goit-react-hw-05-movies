import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Searchbar from "./components/Searchbar/Searchbar";
import { serviceApi, unit } from "./utility/ServiceApi";
import Modal from "./components/Modal/Modal";
import View from "./components/View/View";
import styles from "./App.css";

export default function App() {
  const [find, setFind] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("idle");
  const [showModal, setShowModal] = useState(false);
  const [onModalUrl, setOnModalUrl] = useState("");
  const [totalPage, setTotalPage] = useState(true);

  const handleFormSubmit = (data) => {
    setImages([]);
    setTotalPage(true);
    setStatus("idle");
    if (data.trim() === "") {
    } else {
      setFind(data);
    }
  };
  const toggleShowModal = (url) => {
    setShowModal(!showModal);
    setOnModalUrl(url);
  };

  useEffect(() => {
    if (find === "") {
      return;
    }
    if (find !== "") {
      setStatus("pending");
    }
    serviceApi(find, page)
      .then((data) => {
        const findPages = Math.ceil(data.totalHits / unit);
        if (page === findPages) {
          setTotalPage(false);
        }
        if (page === 1) {
          if (data.hits.length === 0) {
            toast.error("No result were found for your search", {
              theme: "colored",
              position: "top-left",
              autoClose: 5000,
            });

            return setStatus("idle");
          }
          setImages(data.hits);
          setStatus("resolved");
        } else {
          setImages([...images, ...data.hits]);
          setStatus("resolved");

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
        setStatus("rejected");
      });
  }, [find, page]);

  const onButtonNextPage = () => {
    setPage((prevState) => prevState + 1);
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      <View
        hideBtn={totalPage}
        images={images}
        status={status}
        onButtonNextPage={onButtonNextPage}
        toggleShowModal={toggleShowModal}
      />
      {showModal && (
        <Modal onClose={toggleShowModal}>
          <img src={onModalUrl} alt="#" />
        </Modal>
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
}
