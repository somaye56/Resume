"use client"
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { IoClose, IoFilter, IoSearch } from 'react-icons/io5';
import LibrarySection from "../elements/LibrarySection";
import LineComponent from "../elements/LineComponent";

interface Article {
    title: string;
    author: string;
    link: string;
}

interface Course {
    title: string;
    platform: string;
    link: string;
}

interface Tool {
    name: string;
    description: string;
    link: string;
}

interface Video {
    title: string;
    channel: string;
    link: string;
}

const PersonalLibraryPage = () => {
    const locale = useLocale();
    const t = useTranslations("personalLibrary");
    const articles: Article[] = t.raw("articles.items");
    const courses: Course[] = t.raw("courses.items");
    const tools: Tool[] = t.raw("tools.items");
    const videos: Video[] = t.raw("videos.items");

    const [query, setQuery] = useState<string>("");
    const [activeFilters, setActiveFilters] = useState<string[]>(['articles', 'courses', 'tools', 'videos']);
    const [showFilters, setShowFilters] = useState<boolean>(false);

    const filtered = useMemo(() => {
        if (!query.trim()) {
            return { articles, courses, tools, videos };
        }

        const q = query.toLowerCase();
        return {
            articles: articles.filter((item: Article) => {
                return `${item.title.toLowerCase()} ${item.author.toLowerCase()}`.includes(q);
            }),
            courses: courses.filter((item: Course) => {
                return `${item.title.toLowerCase()} ${item.platform.toLowerCase()}`.includes(q);
            }),
            tools: tools.filter((item: Tool) => {
                return `${item.name.toLowerCase()} ${item.description.toLowerCase()}`.includes(q);
            }),
            videos: videos.filter((item: Video) => {
                return `${item.title.toLowerCase()} ${item.channel.toLowerCase()}`.includes(q);
            }),
        };
    }, [query, articles, courses, tools, videos]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
    };
    const clearSearch = () => {
        setQuery("");
    };

    const toggleFilter = (filter: string) => {
        setActiveFilters(prev =>
            prev.includes(filter)
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        );
    };
    return (
        <>
            <section className="text-center">
                <h2 className="text-2xl font-bold mt-6 mb-3 inline-block">
                    {t("title")}
                </h2>
                <LineComponent className="mb-6" />
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-wrap gap-3 mb-4 justify-center items-center relative w-full">

                        <form
                            onSubmit={handleSearch}
                            className="relative flex items-center justify-center w-full sm:w-3/4"
                        >
                            <input
                                type="text"
                                placeholder={locale === "fa" ? "جستجو کنید..." : "Search..."}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className={`w-full rounded-3xl bg-tag-bg/50 backdrop-blur-md py-2.5 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-custom-red/70 transition-all duration-300 shadow-sm
          ${locale === "fa" ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left"}`}
                            />

                            {query && (
                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    className={`absolute p-1 text-gray-400 hover:text-gray-600 transition-colors
            ${locale === "fa" ? "left-12" : "right-12"}`}
                                >
                                    <IoClose size={16} />
                                </button>
                            )}

                            <button
                                type="submit"
                                className={`absolute p-2.5 rounded-full bg-gradient-to-br from-custom-red to-custom-brown text-white hover:opacity-90 shadow-md transition-all duration-200
          ${locale === "fa" ? "right-2" : "left-2"}`}
                            >
                                <IoSearch size={18} />
                            </button>
                        </form>

                        {/* <button
                            className={`px-3 py-2 rounded-xl text-sm transition-all ${true
                                ? 'bg-custom-red text-white'
                                : 'bg-custom-text  hover:bg-custom-text'
                                }`}
                        >
                            {locale === "fa" ? "جستجوی هوشمند" : "Smart Search"}

                        </button> */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="px-4 py-2 rounded-2xl text-sm font-medium  text-custom-red border border-custom-red transition-all flex items-center gap-2"
                        >
                            <IoFilter size={16} />
                            {locale === "fa" ? "فیلتر" : "Filter"}
                        </button>
                    </div>

                    {showFilters && (

                        <div
                            className={`absolute z-10 top-[13.29rem]  w-36 bg-[#FFF2EF] rounded-2xl ${locale === "fa" ? "right-1/6" : "left-1/4"
                                }`}
                        >
                            <div className="flex flex-col gap-2 p-3">
                                {[
                                    { key: "articles", label: locale === "fa" ? "مقالات" : "Articles" },
                                    { key: "courses", label: locale === "fa" ? "دوره‌ها" : "Courses" },
                                    { key: "tools", label: locale === "fa" ? "ابزارها" : "Tools" },
                                    { key: "videos", label: locale === "fa" ? "ویدیوها" : "Videos" },
                                ].map((filter) => (
                                    <button
                                        key={filter.key}
                                        onClick={() => toggleFilter(filter.key)}
                                        className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
                                            ${activeFilters.includes(filter.key)
                                                ? "text-custom-red after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-custom-red after:to-custom-brown"
                                                : "text-gray-600 hover:text-custom-red after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-custom-red hover:after:w-full"
                                            }
                                          `}
                                    >
                                        {filter.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
                    {activeFilters.includes('articles') && (
                        <LibrarySection
                            title={`${t("articles.title")}`}
                            items={filtered.articles}
                            getTitle={(item) => item.title}
                            getSubtitle={(item) => item.author}
                            getLink={(item) => item.link}
                        />
                    )}

                    {activeFilters.includes('courses') && (
                        <LibrarySection
                            title={`${t("courses.title")} `}
                            items={filtered.courses}
                            getTitle={(item) => item.title}
                            getSubtitle={(item) => item.platform}
                            getLink={(item) => item.link}
                        />
                    )}

                    {activeFilters.includes('tools') && (
                        <LibrarySection
                            title={`${t("tools.title")}`}
                            items={filtered.tools}
                            getTitle={(item) => item.name}
                            getSubtitle={(item) => item.description}
                            getLink={(item) => item.link}
                        />
                    )}

                    {activeFilters.includes('videos') && (
                        <LibrarySection
                            title={`${t("videos.title")}`}
                            items={filtered.videos}
                            getTitle={(item) => item.title}
                            getSubtitle={(item) => item.channel}
                            getLink={(item) => item.link}
                        />
                    )}
                </div>
            </section>
        </>
    )
}

export default PersonalLibraryPage


