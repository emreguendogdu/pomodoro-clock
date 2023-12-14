import { useState } from "react";

export default function ThemeChanger(props) {
  const [theme, setTheme] = useState("forest");

  const changeTheme = () => setTheme(theme === "forest" ? "space" : "forest");
  return (
    <>
      <button
        id="theme-switch-button"
        aria-label={`Change theme to ${
          theme === "forest" ? "space" : "forest"
        }`}
        role="switch"
        aria-checked={theme === "forest"}
        onClick={() => changeTheme}
      >
        Switch theme
      </button>
    </>
  );
}
