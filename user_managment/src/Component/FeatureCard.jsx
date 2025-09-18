import React, {useState }from "react";

function FeatureCard({
  title,
  description,
  icon: Icon,
  color,
  action,
  comingSoon = false,
}) {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100 hover:border-transparent transform hover:-translate-y-2 relative group cursor-pointer"
      style={{
        boxShadow:
          hoveredCard === title
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)"
            : undefined,
      }}
      onMouseEnter={() => setHoveredCard(title)}
      onMouseLeave={() => setHoveredCard(null)}
      onClick={action}
    >
      {comingSoon && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs px-2 py-1 rounded-full">
          Coming Soon
        </div>
      )}
      <div
        className={`p-3 rounded-full ${color
          .replace("text-", "bg-")
          .replace(
            "600",
            "100"
          )} inline-flex mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
      <h3 className="font-bold text-gray-900 text-xl mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
      <div className="mt-4 flex items-center text-blue-600 font-medium group-hover:text-blue-800 transition-colors">
        <span className="mr-2">Learn more</span>
        <svg
          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
}

export default FeatureCard;
