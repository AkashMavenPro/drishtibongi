import { useState, useEffect, useRef } from "react";
import { newsData } from "../../data/content";
import Navbar from "../../components/Navbar";

export default function News() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredCategory, setFilteredCategory] = useState("All");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Categories from data + "All"
  const categories = ["All", ...new Set(newsData.map((post) => post.category))];

  // Filtered posts based on category
  const filteredPosts =
    filteredCategory === "All"
      ? newsData
      : newsData.filter((post) => post.category === filteredCategory);

  // Swipe handling (similar to shorts)
  const touchStartY = useRef(null);
  const touchEndY = useRef(null);
  const minSwipeDistance = 50;

  useEffect(() => {
    if (!isMobile) return;

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
      touchEndY.current = null;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
    };

    const handleTouchEnd = (e) => {
      if (touchStartY.current === null) return;
      touchEndY.current = e.changedTouches[0].clientY;
      const distance = touchStartY.current - touchEndY.current;

      if (Math.abs(distance) > minSwipeDistance) {
        if (distance > 0) {
          // Swipe up
          nextPost();
        } else {
          // Swipe down
          prevPost();
        }
      }

      touchStartY.current = null;
      touchEndY.current = null;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMobile, filteredPosts, currentIndex]);

  const nextPost = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredPosts.length);
  };

  const prevPost = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredPosts.length - 1 : prev - 1
    );
  };

  // Reset index if filteredPosts change and currentIndex out of range
  useEffect(() => {
    if (currentIndex >= filteredPosts.length) {
      setCurrentIndex(0);
    }
  }, [filteredPosts, currentIndex]);

  return (
    <>
      <Navbar />
      {/* Category Filter */}
      <div className="fixed top-14 left-0 right-0 bg-white z-40 flex overflow-x-auto border-b border-gray-200">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`flex-shrink-0 px-4 py-2 m-2 rounded-full border ${
              filteredCategory === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 text-gray-700 border-gray-300"
            }`}
            onClick={() => {
              setFilteredCategory(cat);
              setCurrentIndex(0);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {isMobile ? (
        <div
          className="w-screen h-[calc(100vh-56px-48px)] mt-[56px] pt-[48px] overflow-hidden relative"
          // 56px navbar + 48px category filter height
        >
          {filteredPosts.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              No posts in this category.
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg mx-4 overflow-auto">
              <div className="text-sm font-semibold mb-2 text-blue-600">
                {filteredPosts[currentIndex].category}
              </div>
              <h2 className="text-xl font-bold mb-4 text-center">
                {filteredPosts[currentIndex].title}
              </h2>
              <p className="text-gray-700 mb-4">{filteredPosts[currentIndex].content}</p>
              {filteredPosts[currentIndex].imageUrl && (
                <img
                  src={filteredPosts[currentIndex].imageUrl}
                  alt={filteredPosts[currentIndex].title}
                  className="w-full max-h-60 object-cover rounded"
                />
              )}
              {/* Pagination indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm">
                {currentIndex + 1} / {filteredPosts.length}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 py-8 mt-20 grid grid-cols-2 gap-6 mt-[56px]">
          {/* Desktop: show all filtered posts */}
          {filteredPosts.map(({ id, title, content, category, imageUrl }) => (
            <div
              key={id}
              className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}
              <div className="text-sm font-semibold text-blue-600 mb-1">{category}</div>
              <h2 className="text-lg font-bold mb-2">{title}</h2>
              <p className="text-gray-700">{content}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
