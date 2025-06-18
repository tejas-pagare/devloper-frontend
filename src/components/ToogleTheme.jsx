import { useEffect, useState } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = (theme) => {
      setTheme(theme);
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <>
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} role="button" className="btn btn-soft m-1 rounded-full ">
          {theme==="light"&& <span>🌙</span>}
          {theme==="dark"&& <span>☀️</span>}
          
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li>
            <button onClick={()=>toggleTheme("dark")}>Dark</button>
          </li>
          <li>
            <button onClick={()=>toggleTheme("light")} >light</button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ThemeToggle;
