import Navbar from "@/components/Navbar";
import NewsCard from "@/components/NewsCard";
import { shortsData, newsData } from "@/data/content";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
<div className="mt-[56px]">
      {/* Shorts Section */}
      <section className="p-4">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {shortsData.map(({ id, videoId }) => (
            <div
              key={id}
              className="w-48 h-96 flex-shrink-0 rounded overflow-hidden shadow-lg"
            >
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${id}?controls=0&modestbranding=1&rel=0&autoplay=0&mute=1&playsinline=1`}
                title={`Short video ${id}`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      </section>

      {/* News Section */}
      <section className="p-4">
        <div className="space-y-4">
          {newsData.map(({ id, title, content, imageUrl, videoId, category }) => (
            <NewsCard
              key={id}
              title={title}
              description={content}
              image={imageUrl}
              category={category}
            />
          ))}
        </div>
      </section>
      </div>
    </div>
  );
}
