interface SearchHistoryProps {
  searches: string[];
  onSelect: (city: string) => void;
}

const SearchHistory = ({ searches, onSelect }: SearchHistoryProps) => {
  if (searches.length === 0) return null;

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <h3 className="text-sm text-gray-500 mb-2">Recent Searches:</h3>
      <div className="flex flex-wrap gap-2">
        {searches.map((city, index) => (
          <button
            key={`${city}-${index}`}
            onClick={() => onSelect(city)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full transition-colors"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory; 