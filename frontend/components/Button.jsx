import React from "react";

export function Button({ label, onClick }) {
  return (
    <button
      type="button"
      className="bg-gray-800 w-full text-white transition-all focus:scale-105 hover:scale-105 hover:bg-gray-950 active:scale-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
