import { useCallback } from "react";
import ThemeChanger from "../ThemeChanger";

export const Footer = () => {
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
      <ThemeChanger/>
    </footer>
  );
};
