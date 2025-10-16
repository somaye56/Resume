interface LibrarySectionProps<T> {
    title: string;
    items: T[];
    getTitle: (item: T) => string;
    getSubtitle: (item: T) => string;
    getLink?: (item: T) => string; 
  }
  
  const LibrarySection = <T,>({ title, items, getTitle, getSubtitle, getLink }: LibrarySectionProps<T>) => {
    return (
      <div className="rounded-2xl bg-gradient-to-br bg-[#896C6C]/10 shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <ul className="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full">
          {items.map((item, idx) => (
            <li key={idx} className="group relative flex flex-col justify-between p-4 bg-white/90 border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-[#EDE7E6]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
              <a
                href={getLink ? getLink(item) : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 font-semibold hover:text-[#AF3E3E] transition-colors duration-200"
              >
                {getTitle(item)}
              </a>
              <span className="relative z-10 text-xs text-gray-500 mt-1">{getSubtitle(item)}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
export default LibrarySection