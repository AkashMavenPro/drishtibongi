import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import VideoCard from "@/components/VideoCard";
import { shorts as shortData } from "@/data/content";
import Head from "next/head";

export default function ShortsPage() {
  const [loading, setLoading] = useState(true);
  const [shorts, setShorts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setShorts(shortData);
      setLoading(false);
    }, 1000); // simulate fetch
  }, []);

  return (
    
    <div className="bg-gray-50 min-h-screen">
        <Head>
  <title>Shorts - MyApp</title>
  <meta name="description" content="Watch latest YouTube Shorts style videos" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</Head>
      <Navbar />
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">YouTube Shorts</h1>
        <div className="flex gap-4 overflow-x-auto">
          {loading
            ? Array(4)
                .fill()
                .map((_, i) => (
                  <div
                    key={i}
                    className="w-[180px] h-[320px] bg-gray-200 animate-pulse rounded-xl"
                  />
                ))
            : shorts.map((item) => (
                <VideoCard
                  key={item.id}
                  thumbnail={item.thumbnail}
                  title={item.title}
                  creator={item.creator}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
