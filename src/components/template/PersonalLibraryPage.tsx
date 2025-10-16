"use client"
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import LineComponent from "../elements/LineComponent";
import LibrarySection from "../elements/LibrarySection";


interface Article {
    title: string;
    author: string;
}

interface Course {
    title: string;
    platform: string;
}

interface Tool {
    name: string;
    description: string;
}

interface Video {
    title: string;
    channel: string;
}

const PersonalLibraryPage = () => {
    const locale = useLocale();
    const t = useTranslations("personalLibrary");
    const articles: Article[] = t.raw("articles.items");
    const courses: Course[] = t.raw("courses.items");
    const tools: Tool[] = t.raw("tools.items");
    const videos: Video[] = t.raw("videos.items");

    const [query, setQuery] = useState<string>("");

    const filtered = useMemo(() => {
        if (!query.trim()) {
            return { articles, courses, tools, videos };
        }

        const q = query.toLowerCase();
        return {
            articles: articles.filter((item: Article) =>
                item.title.toLowerCase().includes(q) ||
                item.author.toLowerCase().includes(q)
            ),
            courses: courses.filter((item: Course) =>
                item.title.toLowerCase().includes(q) ||
                item.platform.toLowerCase().includes(q)
            ),
            tools: tools.filter((item: Tool) =>
                item.name.toLowerCase().includes(q) ||
                item.description.toLowerCase().includes(q)
            ),
            videos: videos.filter((item: Video) =>
                item.title.toLowerCase().includes(q) ||
                item.channel.toLowerCase().includes(q)
            ),
        };
    }, [query, articles, courses, tools, videos]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <>
            <section className="text-center">
                <h2 className="text-2xl font-bold mt-6 mb-3 inline-block">
                    {t("title")}
                </h2>
                <LineComponent className="mb-6" />
                <form
                    onSubmit={handleSearch}
                    className="relative flex items-center justify-center max-w-md mx-auto mb-10"
                >
                    <input
                        type="text"
                        placeholder={(locale === "fa" ? "  ...جستجو کنید" : "Search...")}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className={`w-full rounded-3xl border border-[#C2B0B0]/40 bg-white/60 backdrop-blur-md py-2.5 text-sm text-[#3B2F2F] placeholder:text-[#A48E8E] focus:outline-none focus:ring-2 focus:ring-[#AF3E3E]/60 transition-all duration-300 shadow-sm ${locale === "fa" ? "px-12 pl-5 text-right" : "px-12 pl-4 text-right"
                            }`}
                    />
                    <button
                        type="submit"
                        className={`absolute p-2 rounded-3xl bg-[#AF3E3E] text-white ${locale === "fa" ? " right-2.5 " : "left-2.5"
                            }`}
                    >
                        <IoSearch size={18} />
                    </button>
                </form>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
                    {/* مقالات */}
                    <LibrarySection
                        title={t("articles.title")}
                        items={filtered.articles}
                        getTitle={(item) => item.title}
                        getSubtitle={(item) => item.author}
                    />

                    {/* دوره‌ها */}
                    <LibrarySection
                        title={t("courses.title")}
                        items={filtered.courses}
                        getTitle={(item) => item.title}
                        getSubtitle={(item) => item.platform}
                    />

                    {/* ابزارها */}
                    <LibrarySection
                        title={t("tools.title")}
                        items={filtered.tools}
                        getTitle={(item) => item.name}
                        getSubtitle={(item) => item.description}
                    />

                    {/* ویدیوها */}
                    <LibrarySection
                        title={t("videos.title")}
                        items={filtered.videos}
                        getTitle={(item) => item.title}
                        getSubtitle={(item) => item.channel}
                    />
                </div>
            </section>
        </>
    )
}

export default PersonalLibraryPage


