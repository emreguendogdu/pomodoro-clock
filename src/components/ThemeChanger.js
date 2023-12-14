import { useState, useEffect } from "react";

export default function ThemeChanger() {
  const [theme, setTheme] = useState("forest");

  useEffect(() => {
    document.documentElement.setAttribute("color-scheme", theme);
  }, [theme]);

  return (
    <>
      <button
        id="theme-switch-button"
        onClick={() => setTheme(theme === "forest" ? "space" : "forest")}
      >
        Switch theme
      </button>
    </>
  );
}
