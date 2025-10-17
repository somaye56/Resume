interface LibrarySectionProps<T> {
    title: string;
    items: T[];
    getTitle: (item: T) => string;
    getSubtitle: (item: T) => string;
    getLink?: (item: T) => string; 
    isRTL?: boolean; 
  }
  
  const LibrarySection = <T,>({ title, items, getTitle, getSubtitle, getLink, isRTL = false }: LibrarySectionProps<T>) => {
    return (
      <div className={`rounded-2xl bg-gradient-to-br bg-card-bg/10 shadow-sm p-6 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
<h3 className="text-xl font-extrabold bg-gradient-to-r from-custom-red to-text-muted bg-clip-text text-transparent mb-6">
  {title}
</h3>

        <ul className="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full">
          {items.map((item, idx) => (
            <li key={idx} className="group relative flex flex-col justify-between p-4 bg-white/90 border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-tag-bg]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
              <a
                href={getLink ? getLink(item) : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative z-10 font-semibold hover:text-custom-red transition-colors duration-200 ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {getTitle(item)}
              </a>
              <span className={`relative z-10 text-xs text-gray-500 mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>{getSubtitle(item)}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
export default LibrarySection