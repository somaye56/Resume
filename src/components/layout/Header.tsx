"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  IoDownloadOutline,
  IoMenuOutline,
  IoCloseOutline,
} from "react-icons/io5";

interface HeaderProps {
  locale: string;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const Header = ({ locale }: HeaderProps) => {
  const profile = useTranslations("homePage");
  const Contact = useTranslations("contact");
  const Experience = useTranslations("experience");
  const Education = useTranslations("education");
  const PersonalLibrary = useTranslations("personalLibrary");
  const p = useTranslations("projects");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [currentLocale, setCurrentLocale] = useState<string>(locale);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const toggleLanguage = (): void => {
    const newLocale = currentLocale === "fa" ? "en" : "fa";
    setCurrentLocale(newLocale);

    let path = pathname;
    if (path.startsWith("/fa") || path.startsWith("/en")) {
      path = `/${newLocale}${path.slice(3)}`;
    } else {
      path = `/${newLocale}${path}`;
    }

    const query = searchParams.toString();
    const url = query ? `${path}?${query}` : path;
    router.push(url);
  };

  const handleNavClick = (item: NavItem): void => {
    setActiveSection(item.id);
    setIsMobileMenuOpen(false);

    if (item.href.startsWith("#")) {
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(item.href);
    }
  };

  const navItems: NavItem[] = [
    { id: "contact", label: Contact("title"), href: `/${currentLocale}/contact` },
    { id: "personalLibrary", label: PersonalLibrary("title"), href: `/${currentLocale}/personalLibrary` },
    { id: "projects", label: p("title"), href: `/${currentLocale}/project` },
    { id: "experience", label: Experience("title"), href: `/${currentLocale}/experience` },
    { id: "education", label: Education("title"), href: `/${currentLocale}/education` },
    { id: "home", label: profile("homePage"), href: `/${currentLocale}` },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 backdrop-blur-xl bg-gradient-to-r from-bg-from/70 to-[#F5F0E8]/70 shadow-md`}
    >
      <div className="max-w-6xl mx-auto text-nowrap ">
        <div className="flex items-center justify-between py-4 px-4">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold bg-gradient-to-r from-card-bg to-custom-red bg-clip-text text-transparent">
              Somayeh Baniasadi
            </h1>
          </div>

          <nav className="hidden lg:block">
            <ul className="flex items-center text-xl space-x-3 rtl:space-x-reverse">
              <li
                onClick={toggleLanguage}
                className="cursor-pointer ml-4 px-2 py-1  hover:bg-bg-via/50 transition-colors"
              >
                {currentLocale === "fa" ? "English" : "فارسی"}
              </li>
              {navItems.map((item) => (
                <li key={item.id} className="relative group ml-2">
                  <Link
                    href={item.href}
                    className={`relative px-3 py-2 text-sm transition-all duration-300 ${activeSection === item.id
                      ? "text-text-secondary"
                      : "text-text-secondary hover:text-card-bg"
                      }`}
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-custom-red to-custom-text] transition-all duration-300 ${activeSection === item.id
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                        }`}
                    />
                  </Link>
                </li>
              ))}


            </ul>
          </nav>

          <div className="hidden lg:block">
            <div className="flex items-center space-x-2 gap-1 rtl:space-x-reverse">
              <a
                download
                href="/Resume_SomayehBaniasadi.pdf"
                className="group text-custom-text relative overflow-hidden px-4 py-2.5 bg-gradient-to-r from-custom-red to-custom-brown hover:from-custom-orange] hover:to-custom-brown text-custom-text] font-semibold text-sm rounded-xl shadow-lg transition-all duration-300 transform hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center space-x-2 rtl:space-x-reverse gap-2">
                  <span>{profile("don")}</span>
                  <IoDownloadOutline />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-text-secondary text-2xl p-2 rounded-md hover:bg-[#EAEBD0]/60 transition-all"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
            </button>
          </div>
        </div>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
            } border-t border-gray-200/50 bg-white/80 backdrop-blur-lg shadow-inner`}
        >
          <nav className="px-6 py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`w-full text-start px-4 py-2 rounded-lg text-sm transition-all ${activeSection === item.id
                  ? "text-custom-red bg-custom-red/10"
                  : "hover:text-custom-brown"
                  }`}
              >
                {item.label}
              </button>
            ))}

            <hr className="my-2 border-gray-300/40" />

            <div className="flex justify-between items-center">
              <button
                onClick={toggleLanguage}
                className="text-sm text-custom-red font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors"
              >
                {currentLocale === "fa" ? "English" : "فارسی"}
              </button>

              <a
                download
                href="/Resume_SomayehBaniasadi.pdf"
                className="flex items-center text-custom-text gap-2 px-4 py-2 bg-gradient-to-r from-custom-red to-custom-brown text-custom-text] rounded-xl text-sm font-semibold hover:shadow-md transition-all"
              >
                {profile("don")} <IoDownloadOutline />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
