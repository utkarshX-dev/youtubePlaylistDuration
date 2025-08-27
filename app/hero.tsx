function HeroComponent() {
  return (
    <div className="text-center mb-10">
      <div className="flex justify-center items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="red"
          className="w-12 h-12 drop-shadow-lg"
        >
          <path d="M23.498 6.186a2.997 2.997 0 0 0-2.113-2.12C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.385.566a2.997 2.997 0 0 0-2.113 2.12A31.32 31.32 0 0 0 0 12a31.32 31.32 0 0 0 .502 5.814 2.997 2.997 0 0 0 2.113 2.12C4.495 20.5 12 20.5 12 20.5s7.505 0 9.385-.566a2.997 2.997 0 0 0 2.113-2.12A31.32 31.32 0 0 0 24 12a31.32 31.32 0 0 0-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
        </svg>
        <h1 className="text-4xl font-extrabold text-white">
          YouTube Playlist Duration
        </h1>
      </div>
      <p className="mt-3 text-lg text-gray-400">
        Find out how long it takes to finish a playlist at different speeds.
      </p>
    </div>
  );
}

export default HeroComponent;
