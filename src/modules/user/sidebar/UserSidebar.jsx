import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { LIGHT_THEME } from "../../../constants/themeConstants";
import LogoBlue from "../../../assets/images/logo_blue.svg";
import LogoWhite from "../../../assets/images/logo_white.svg";
import { useTranslation } from "react-i18next";
import {
  MdOutlineClose,
  MdOutlineLogout,
  MdOutlineSettings,
  MdOutlinePeople,
  MdOutlineTask,
  MdOutlineBook,
  MdOutlineCalendarMonth,
  MdOutlinePersonOutline,
  MdOutlineQuestionAnswer,
  MdOutlineInfo,
  MdOutlineArticle,
  MdOutlineDashboard,
  MdOutlineSmartToy,
  MdTask,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { SidebarContext } from "../../../contexts/SidebarContext";

const UserSidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const location = useLocation();
  const { t } = useTranslation();

  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-oepn-btn"
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`} ref={navbarRef}>
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img src={theme === LIGHT_THEME ? LogoBlue : LogoWhite} alt="" />
          <span className="sidebar-brand-text">{t("onboarding_buddy")}</span>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>

      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/user/dashboard" className={`menu-link ${location.pathname.endsWith('/dashboard') ? 'active' : ''}`}>
                <span className="menu-link-icon"><MdOutlineDashboard size={20} /></span>
                <span className="menu-link-text">{t("dashboard")}</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu">
          <div className="menu-title">{t("onboarding")}</div>
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/user/tasks" className={`menu-link ${location.pathname.endsWith('/tasks') ? 'active' : ''}`}>
                <span className="menu-link-icon"><MdOutlineTask size={20} /></span>
                <span className="menu-link-text">{t("my_tasks")}</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/user/schedule" className={`menu-link ${location.pathname.endsWith('/schedule') ? 'active' : ''}`}>
                <span className="menu-link-icon"><MdOutlineCalendarMonth size={20} /></span>
                <span className="menu-link-text">{t("task_progress")}</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/user/timeline" className={`menu-link ${location.pathname.endsWith('/timeline') ? 'active' : ''}`}>
                <span className="menu-link-icon"><MdOutlineCalendarMonth size={20} /></span>
                <span className="menu-link-text">{t("timeline")}</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/user/about-me" className={`menu-link ${location.pathname.endsWith('/about-me') ? 'active' : ''}`}>
                <span className="menu-link-icon"><MdOutlinePersonOutline size={20} /></span>
                <span className="menu-link-text">{t("about_me")}</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/user/project-directory" className={`menu-link ${location.pathname.endsWith('/project-directory') ? 'active' : ''}`}>
                <span className="menu-link-icon"><MdTask size={20} /></span>
                <span className="menu-link-text">{t("project_directory")}</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/user/team-directory" className={`menu-link ${location.pathname.endsWith('/team-directory') ? 'active' : ''}`}>
                <span className="menu-link-icon"><MdOutlinePeople size={20} /></span>
                <span className="menu-link-text">{t("team_directory")}</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu">
          <div className="menu-title">{t("resources")}</div>
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/user/guidebook" className={`menu-link ${location.pathname.endsWith('/guidebook') ? 'active' : ''}`}>
                <span className="menu-link-icon"><MdOutlineBook size={20} /></span>
                <span className="menu-link-text">{t("guidebook")}</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/user/coding-challenges" className={`menu-link ${location.pathname.endsWith('/coding-challenges') ? 'active' : ''}`}>
                <span className="menu-link-icon"><MdOutlineQuestionAnswer size={20} /></span>
                <span className="menu-link-text">{t("coding_challenges")}</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/user/faq" className={`menu-link ${location.pathname.endsWith('/faq') ? 'active' : ''}`}>
                <span className="menu-link-icon"><MdOutlineInfo size={20} /></span>
                <span className="menu-link-text">{t("faq")}</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/user/blog" className={`menu-link ${location.pathname.endsWith('/blog') ? 'active' : ''}`}>
                <span className="menu-link-icon"><MdOutlineArticle size={20} /></span>
                <span className="menu-link-text">{t("blog")}</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu">
          <div className="menu-title">{t("support")}</div>
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/user/virtual-mentor" className={`menu-link ${location.pathname.endsWith('/virtual-mentor') ? 'active' : ''}`}>
                <span className="menu-link-icon"><MdOutlineSmartToy size={20} /></span>
                <span className="menu-link-text">{t("virtual_mentor")}</span>
                <span className="menu-link-badge">AI</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/user/help-center" className={`menu-link ${location.pathname.endsWith('/help-center') ? 'active' : ''}`}>
                <span className="menu-link-icon"><MdOutlineQuestionAnswer size={20} /></span>
                <span className="menu-link-text">{t("help_center")}</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/user/settings" className={`menu-link ${location.pathname.endsWith('/settings') ? 'active' : ''}`}>
                <span className="menu-link-icon"><MdOutlineSettings size={20} /></span>
                <span className="menu-link-text">{t("settings")}</span>
              </Link>
            </li>

            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon"><MdOutlineLogout size={20} /></span>
                <span className="menu-link-text">{t("logout")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default UserSidebar;
