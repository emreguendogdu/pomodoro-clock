import ThemeChanger from "../../ThemeChanger"
import "./Footer.css"

export const Footer = () => {
  return (
    <footer>
      <div className="links-wrapper">
        <a
          href="https://github.com/osmangund"
          target="_blank"
          rel="noreferrer noopener"
        >
          <i className="fa fa-brands fa-github icon" />
        </a>
        <a
          href="https://linkedin.com/in/osmangund"
          target="_blank"
          rel="noreferrer noopener"
        >
          <i className="fa-brands fa-linkedin-in icon" />
        </a>
      </div>
      <a
        className="nametag"
        href="https://linkedin.com/in/osmangund"
        target="_blank"
        rel="noreferrer noopener"
      >
        osmangund
      </a>
      <ThemeChanger />
    </footer>
  )
}
