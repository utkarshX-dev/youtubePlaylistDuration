"use client";
import { useState, useEffect } from "react";
import HeroComponent from "./hero";
import usePlaylist from "./main";

export default function Page() {
    const {
    playlistId,
    setPlaylistId,
    totalDuration,
    handleFindPlaylistLength,
    loading,
    secondsToRealTime,
    basicDetails,
  } = usePlaylist();

  useEffect(() => {
  if (playlistId) {
    handleFindPlaylistLength();
  }
}, [playlistId]);

  const [url, setUrl] = useState<string>("");

  const urlToPlaylist = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.searchParams.get("list");
    } catch {
      return null;
    }
  };

  return (
    <main
      className="flex min-h-screen items-center justify-center 
  bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 
  dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 
  p-6 transition-colors"
    >
      <div
        className="w-full max-w-2xl rounded-2xl 
    bg-white dark:bg-gray-900 
    p-10 shadow-2xl border border-gray-200 dark:border-gray-700"
      >
        <HeroComponent />

        <input
          type="text"
          placeholder="Paste Playlist URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="mb-4 w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring focus:ring-red-500/30 outline-none"
        />

        <button
          onClick={() => {
            const playlistId = urlToPlaylist(url);
            if (playlistId) {
              setPlaylistId(playlistId);
              handleFindPlaylistLength();
            }
          }}
          disabled={loading}
          className="w-full rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700 disabled:bg-red-400"
        >
          {loading ? "Calculating..." : "Find Playlist Length"}
        </button>

        {basicDetails.title && (
          <div className="mt-6 rounded-lg bg-gray-900 border border-gray-800 p-5 text-gray-100">
            <p className="text-lg font-semibold">{basicDetails.title}</p>
            <p className="text-sm text-gray-400">
              By {basicDetails.creator} • {basicDetails.totalVideos} videos
            </p>
            <p className="text-sm text-gray-400">Playlist Id: {playlistId}</p>
          </div>
        )}

        {totalDuration > 0 && (
          <div className="mt-6 rounded-xl bg-gray-900 border border-gray-800 p-5 text-center shadow-inner">
            <p className="text-lg font-semibold text-red-400">
              Total Duration: {secondsToRealTime(totalDuration)}
            </p>
            <div className="mt-3 space-y-2 text-gray-300 text-sm">
              <p>Normal speed: {secondsToRealTime(totalDuration)}</p>
              <p>1.25x: {secondsToRealTime(totalDuration / 1.25)}</p>
              <p>1.5x: {secondsToRealTime(totalDuration / 1.5)}</p>
              <p>2x: {secondsToRealTime(totalDuration / 2)}</p>
            </div>
          </div>
        )}
        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Made with ❤️ by Utkarsh
        </p>
      </div>
    </main>
  );
}
