"use client";
import axios from "axios";
import { useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

const youtubeDurationToSeconds = (duration: string): number => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return 0;
  const hours = match[1] ? parseInt(match[1].replace("H", "")) : 0;
  const minutes = match[2] ? parseInt(match[2].replace("M", "")) : 0;
  const seconds = match[3] ? parseInt(match[3].replace("S", "")) : 0;
  return hours * 3600 + minutes * 60 + seconds;
};

const secondsToRealTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h : ${minutes.toString().padStart(2, "0")}m : ${seconds
    .toString()
    .padStart(2, "0")}s`;
};

export default function usePlaylist() {
  const [basicDetails, setBasicDetails] = useState({
    title: "",
    creator: "",
    totalVideos: 0,
  });
  const [playlistId, setPlaylistId] = useState<string>("");
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleFindPlaylistLength = async () => {
    try {
      setLoading(true);
      setTotalDuration(0);
      let nextToken: string | null = null;
      let totalSeconds = 0;
      const playlistRes = await axios.get(
        "https://www.googleapis.com/youtube/v3/playlists",
        {
          params: {
            part: "snippet,contentDetails",
            id: playlistId,
            key: API_KEY,
          },
        }
      );
      if (playlistRes.data.items.length > 0) {
        const playlist = playlistRes.data.items[0];
        setBasicDetails({
          title: playlist.snippet.title,
          creator: playlist.snippet.channelTitle,
          totalVideos: playlist.contentDetails.itemCount,
        });
      }
      do {
        const res: any = await axios.get(
          "https://www.googleapis.com/youtube/v3/playlistItems",
          {
            params: {
              part: "snippet,contentDetails",
              maxResults: 50,
              playlistId: playlistId,
              pageToken: nextToken,
              key: API_KEY,
            },
          }
        );
        const videoIds = res.data.items.map(
          (item: any) => item.contentDetails.videoId
        );
        const detailsRes = await axios.get(
          "https://www.googleapis.com/youtube/v3/videos",
          {
            params: {
              part: "contentDetails",
              id: videoIds.join(","),
              key: API_KEY,
            },
          }
        );
        detailsRes.data.items.forEach((item: any) => {
          totalSeconds += youtubeDurationToSeconds(item.contentDetails.duration);
        });
        nextToken = res.data.nextPageToken || null;
      } while (nextToken);
      setTotalDuration(totalSeconds);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    playlistId,
    setPlaylistId,
    totalDuration,
    handleFindPlaylistLength,
    loading,
    secondsToRealTime,
    basicDetails,
  };
}
