import i18n from "../../i18n"; 
import { useState, useRef, useEffect } from "react";
import "./LanguageToggle.scss";

export const LanguageToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ms", name: "Melayu", flag: "🇲🇾" },
    { code: "cn", name: "中文", flag: "🇨🇳" },
    { code: "id", name: "भारतीय", flag: "🇨🇮" },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentLang = languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <div className="language-dropdown" ref={dropdownRef}>
      <button className="language-button" onClick={() => setIsOpen(!isOpen)}>
        <span className="flag">{currentLang.flag}</span>
        <span className="language-name">{currentLang.name}</span>
      </button>
      {isOpen && (
        <div className="language-options">
          {languages.map((language) => (
            <button
              key={language.code}
              className="language-option"
              onClick={() => changeLanguage(language.code)}
            >
              <span className="flag">{language.flag}</span>
              <span className="language-name">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
