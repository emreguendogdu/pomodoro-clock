export const Footer = (props) => {
  const ThemeChanger = () => {
    if (props.bg === "forest") {
      props.handlers.setSpace();
    } else {
      props.handlers.setForest();
    }
  };
  return (
    <footer>
      <a
        href="https://github.com/emreguendogdu"
        target="_blank"
        rel="noreferrer noopener"
      >
        <i className="fa fa-github" />
        emreguendogdu
      </a>
      <button id="theme-switch-button" onClick={() => ThemeChanger()}>
        Space Theme
      </button>
    </footer>
  );
};
