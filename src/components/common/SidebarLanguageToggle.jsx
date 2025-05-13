import React, { useState } from "react";
import { MdOutlineLanguage } from "react-icons/md";
import i18n from "../../i18n"; 

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ms", name: "Melayu", flag: "🇲🇾" },
  { code: "cn", name: "中文", flag: "🇨🇳" },
  { code: "id", name: "भारतीय", flag: "🇨🇮" },
];

const SidebarLanguageToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const current = languages.find((l) => l.code === i18n.language) || languages[0];

  const handleChange = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    setIsOpen(false);
  };

  return (
    <li className={`menu-item ${isOpen ? "open" : ""}`}>
      <div className={`menu-link`} onClick={() => setIsOpen(!isOpen)} style={{ cursor: "pointer" }}>
        <span className="menu-link-icon">
          <MdOutlineLanguage size={20} />
        </span>
        <span className="menu-link-text">Language</span>
        <span className="menu-link-badge">{current.flag}</span>
      </div>
      {isOpen && (
        <ul className="language-submenu">
          {languages.map((lang) => (
            <li key={lang.code} className="language-subitem" onClick={() => handleChange(lang.code)}>
              <span className="flag">{lang.flag}</span>
              <span className="label">{lang.name}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarLanguageToggle;
