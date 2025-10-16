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
                <div className="max-w-2xl mx-auto mb-6">
                    <div className="flex gap-2 mb-4 justify-center relative">
                        <button
                            className={`px-3 py-2 rounded-lg text-sm transition-all ${true
                                ? 'bg-[#AF3E3E] text-white'
                                : 'bg-gray-200  hover:bg-gray-300'
                                }`}
                        >
                            {locale === "fa" ? "جستجوی هوشمند" : "Smart Search"}

                        </button>

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="px-4 py-2 rounded-lg text-sm bg-[#D6A99D] text-gray-700 hover:bg-[#AF3E3E] hover:text-white transition-all flex items-center gap-2"
                        >
                            <IoFilter size={16} />
                            {locale === "fa" ? "فیلتر" : "Filter"}
                        </button>


                    </div>
                    {showFilters && (

                        <div
                            className={`absolute z-10 top-1/5  w-36 bg-[#FFF2EF] rounded-2xl ${locale === "fa" ? "right-[30rem]" : "left-1/4"
                                }`}
                        >
                            <div className="flex flex-col gap-2 p-3 ">
                                {[
                                    { key: "articles", label: locale === "fa" ? "مقالات" : "Articles" },
                                    { key: "courses", label: locale === "fa" ? "دوره‌ها" : "Courses" },
                                    { key: "tools", label: locale === "fa" ? "ابزارها" : "Tools" },
                                    { key: "videos", label: locale === "fa" ? "ویدیوها" : "Videos" },
                                ].map((filter) => (
                                    <button
                                        key={filter.key}
                                        onClick={() => toggleFilter(filter.key)}
                                        className={`px-3 py-1.5 text-sm rounded-lg text-center transition-all ${activeFilters.includes(filter.key)
                                            ? "bg-gradient-to-r from-[#DA6C6C] to-[#AF3E3E] text-white shadow-sm"
                                            : "text-gray-700 hover:bg-gray-100/80"
                                            }`}
                                    >
                                        {filter.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    <form
                        onSubmit={handleSearch}
                        className="relative flex items-center justify-center max-w-md mx-auto mb-4"
                    >
                        <input
                            type="text"
                            placeholder={(locale === "fa" ? "  ...جستجو کنید" : ".....Search")}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}

                            className={`w-full rounded-3xl border border-[#C2B0B0]/40 bg-white/60 backdrop-blur-md py-2.5 text-sm text-[#3B2F2F] placeholder:text-[#A48E8E] focus:outline-none focus:ring-2 focus:ring-[#AF3E3E]/60 transition-all duration-300 shadow-sm ${locale === "fa" ? "px-12 pl-5 text-right" : "px-12 pl-4 text-left"
                                }`}
                        />

                        {query && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className={`absolute p-1 text-gray-400 hover:text-gray-600 ${locale === "fa" ? "left-12" : "right-12"
                                    }`}
                            >
                                <IoClose size={16} />
                            </button>
                        )}

                        <button
                            type="submit"
                            className={`absolute p-2 rounded-3xl bg-[#AF3E3E] text-white hover:bg-[#AF3E3E]/90 transition-colors ${locale === "fa" ? "right-2.5" : "left-2.5"
                                }`}
                        >
                            <IoSearch size={18} />
                        </button>

                    </form>
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


