export default function NewsCard({ title, description, image, date }) {
    return (
      <div className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col sm:flex-row gap-4 p-4">
        <img src={image} alt={title} className="w-full sm:w-40 h-32 object-cover rounded-md" />
        <div>
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
          <p className="text-xs text-gray-400 mt-2">{date}</p>
        </div>
      </div>
    );
  }
  