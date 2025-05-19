import { useState, useEffect, useRef } from "react";
import { shortsData } from "../../data/content";
import Navbar from "../../components/Navbar";

export default function Shorts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartY = useRef(null);
  const touchEndY = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const minSwipeDistance = 50;

  // Handlers moved to useEffect for native event listeners
  useEffect(() => {
    if (!isMobile) return;

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
      touchEndY.current = null;
    };

    const handleTouchMove = (e) => {
      // Prevent scroll while swiping vertically
      e.preventDefault();
    };

    const handleTouchEnd = (e) => {
      if (touchStartY.current === null) return;

      touchEndY.current = e.changedTouches[0].clientY;
      const distance = touchStartY.current - touchEndY.current;

      if (Math.abs(distance) > minSwipeDistance) {
        if (distance > 0) {
          // Swipe up
          nextVideo();
        } else {
          // Swipe down
          prevVideo();
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
  }, [isMobile]);

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % shortsData.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev === 0 ? shortsData.length - 1 : prev - 1));
  };

  // Keyboard navigation on desktop (optional)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") prevVideo();
      if (e.key === "ArrowDown") nextVideo();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Navbar />
      {isMobile ? (
        <div
          className="w-screen h-[calc(100vh-56px)] bg-black flex items-center justify-center overflow-hidden relative mt-[56px]"
        >
          <iframe
            key={shortsData[currentIndex].id}
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${shortsData[currentIndex].id}?autoplay=1&controls=0&mute=0&loop=1&playlist=${shortsData[currentIndex].id}&modestbranding=1&playsinline=1`}
            title={`Short video ${currentIndex + 1}`}
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
          {/* Pagination indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded">
            {currentIndex + 1} / {shortsData.length}
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 py-8 mt-4 grid grid-cols-2 gap-6 mt-[56px]">
          {shortsData.map(({ id }) => (
            <div
              key={id}
              className="aspect-video relative rounded-md overflow-hidden shadow-lg"
            >
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${id}?controls=1&modestbranding=1`}
                title="Desktop short video"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
