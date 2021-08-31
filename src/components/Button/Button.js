import styles from "./Button.module.css";

export default function Button({ type, name, clickOnBtn, id, newClassName }) {
  return (
    <button
      className={newClassName || styles.Button}
      type={type}
      onClick={clickOnBtn}
      id={id}
    >
      {name}
    </button>
  );
}

// window.scrollTo({
//   top: document.documentElement.scrollHeight,
//   behavior: "smooth",
// });
