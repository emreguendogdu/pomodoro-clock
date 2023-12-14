import { useCallback } from "react";

export const Footer = (props) => {
  const ThemeChanger = useCallback(() => {
    if (props.bg === "forest") {
      props.handlers.setSpace();
    } else {
      props.handlers.setForest();
    }
  }, [props.bg, props.handlers]);

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
      <button id="theme-switch-button" onClick={ThemeChanger}>
        Change Theme
      </button>
    </footer>
  );
};
