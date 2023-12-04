import React from "react";

const ToggleMode = () => {
  const darkModeListener = () => {
    document.querySelector("html")?.classList.toggle("dark");
  }

  return <label className="flex items-center cursor-pointer">
    <input type="checkbox" name="dark-mode" id="toggle" className="sr-only peer" onClick={() => darkModeListener()} />
    <div className="block relative dark:bg-slate-800 bg-[#acb8cc] w-16 h-8 p-1 rounded-full before:absolute before:bg-blue-600 before:w-6 before:h-6 before:p-1 before:rounded-full before:transition-all before:duration-500 before:left-1 peer-checked:before:left-8 peer-checked:before:bg-white"></div>
  </label>
};

export default ToggleMode;
