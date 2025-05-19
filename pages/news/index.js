import { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import NewsCard from "@/components/NewsCard";
import { news as newsData } from "@/data/content";

export default function NewsPage() {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setNews(newsData);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>News - MyApp</title>
        <meta name="description" content="Read the latest tech and business news articles." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Latest News</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array(6)
                .fill()
                .map((_, i) => (
                  <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-xl" />
                ))
            : news.map((item) => (
                <NewsCard
                  key={item.id}
                  image={item.image}
                  title={item.title}
                  date={item.date}
                  description={item.description}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
