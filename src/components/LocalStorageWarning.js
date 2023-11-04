import React from "react";

export default function LocalStorageWarning({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center max-w-lg gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 bg-gray-800 text-gray-100">
      <button onClick={onClose} className="absolute top-2 right-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
          className="flex-shrink-0 w-6 h-6"
        >
          <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
        </svg>
      </button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        className="stroke-violet-400"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12" y2="16" />
      </svg>
      <h2 className="text-2xl font-semibold leadi tracki">Please be aware,</h2>
      <p className="flex-1 text-center text-gray-400">
        that your favorite items are stored locally and are only accessible on
        this device. They won't be available on other devices.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="px-8 py-3 font-semibold rounded-full bg-violet-400 text-gray-900"
      >
        I understand
      </button>
    </div>
  );
}
