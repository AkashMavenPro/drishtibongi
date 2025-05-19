export default function VideoCard({ thumbnail, title, creator }) {
    return (
      <div className="w-48 md:w-60 bg-white rounded-xl shadow hover:scale-105 transition p-2">
        <div className="aspect-[9/16] overflow-hidden rounded-lg bg-black">
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        </div>
        <h3 className="text-sm font-semibold mt-2 truncate">{title}</h3>
        <p className="text-xs text-gray-500">{creator}</p>
      </div>
    );
  }
  