import { useCallback } from "react"
import ThemeChanger from "../ThemeChanger"

export const Footer = () => {
  return (
    <footer>
      <div className="links-wrapper">
        <a
          href="https://github.com/osmangund"
          target="_blank"
          rel="noreferrer noopener"
        >
          <i className="fa fa-brands fa-github" />
        </a>
        <a
          href="https://linkedin.com/in/osmangund"
          target="_blank"
          rel="noreferrer noopener"
        >
          <i className="fa-brands fa-linkedin-in" />
        </a>
      </div>
      <p className="nametag">osmangund</p>
      <ThemeChanger />
    </footer>
  )
}
