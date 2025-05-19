import Navbar from "@/components/Navbar";
import VideoCard from "@/components/VideoCard";
import NewsCard from "@/components/NewsCard";
import { shorts, news } from "@/data/content";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <section className="p-4">
        <h2 className="text-2xl font-bold mb-4">YouTube Shorts Style Videos</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {shorts.map((item) => (
            <VideoCard
              key={item.id}
              thumbnail={item.thumbnail}
              title={item.title}
              creator={item.creator}
            />
          ))}
        </div>
      </section>

      <section className="p-4">
        <h2 className="text-2xl font-bold mb-4">Latest News</h2>
        <div className="space-y-4">
          {news.map((item) => (
            <NewsCard
              key={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
              date={item.date}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
