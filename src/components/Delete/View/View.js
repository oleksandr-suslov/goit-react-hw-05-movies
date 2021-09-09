import Loader from "react-loader-spinner";
import Section from "../../Section/Section";
import ImageGallery from "../../MovieGallery/MovieGallery";
// import Button from "../Button/Button";

var shortid = require("shortid");

export default function View({
  hideBtn,
  images,
  status,
  onButtonNextPage,
  toggleShowModal,
}) {
  //   const { images, onModalUrl, isLoading, showModal, status } = this.state;

  if (status === "idle") {
    return (
      <Section>
        <p>Please input search request</p>
      </Section>
    );
  }
  if (status === "pending") {
    return (
      <Section>
        <ImageGallery
          arr={images}
          onClick={toggleShowModal}
          key={shortid.generate()}
        />
        <Loader type="BallTriangle" color="#00BFFF" height={200} width={200} />
      </Section>
    );
  }

  if (status === "rejected") {
    return (
      <Section>
        <p>Service not responding, please try again later</p>
      </Section>
    );
  }
  if (status === "resolved") {
    return (
      <Section>
        <ImageGallery
          arr={images}
          // onClick={toggleShowModal}
          key={shortid.generate()}
        />
      </Section>
    );
  }
}
