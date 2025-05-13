import { useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { SidebarContext } from "../../../contexts/SidebarContext";
import { LIGHT_THEME } from "../../../constants/themeConstants";
import LogoBlue from "../../../assets/images/logo_blue.svg";
import LogoWhite from "../../../assets/images/logo_white.svg";
import {
  MdOutlineClose,
  MdOutlineLogout,
  MdOutlineSettings,
  MdOutlinePeople,
  MdOutlineTask,
  MdOutlineBook,
  MdOutlineCalendarMonth,
  MdOutlineCorporateFare,
  MdOutlineContentPaste,
  MdOutlineDashboard,
  MdOutlineBadge,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

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
          <span className="sidebar-brand-text">{t("sidebar_brand")}</span>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>

      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <Link 
                to={isAdminRoute ? "/admin/dashboard" : "/user/dashboard"} 
                className={`menu-link ${location.pathname.endsWith('/dashboard') ? 'active' : ''}`}
              >
                <span className="menu-link-icon"><MdOutlineDashboard size={20} /></span>
                <span className="menu-link-text">{t("sidebar_dashboard")}</span>
              </Link>
            </li>
          </ul>
        </div>

        {isAdminRoute && (
          <div className="sidebar-menu">
            <div className="menu-title">{t("sidebar_employee_mgmt")}</div>
            <ul className="menu-list">
              <li className="menu-item">
                <Link to="/admin/members" className={`menu-link ${location.pathname.endsWith('/members') ? 'active' : ''}`}>
                  <span className="menu-link-icon"><MdOutlinePeople size={20} /></span>
                  <span className="menu-link-text">{t("sidebar_members")}</span>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/admin/teams" className={`menu-link ${location.pathname.endsWith('/teams') ? 'active' : ''}`}>
                  <span className="menu-link-icon"><MdOutlineCorporateFare size={20} /></span>
                  <span className="menu-link-text">{t("sidebar_teams")}</span>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/admin/roles" className={`menu-link ${location.pathname.endsWith('/roles') ? 'active' : ''}`}>
                  <span className="menu-link-icon"><MdOutlineBadge size={20} /></span>
                  <span className="menu-link-text">{t("sidebar_roles")}</span>
                </Link>
              </li>
            </ul>
          </div>
        )}

        <div className="sidebar-menu">
          <div className="menu-title">{t("sidebar_tools")}</div>
          <ul className="menu-list">
            <li className="menu-item">
              <Link 
                to={`${isAdminRoute ? '/admin' : '/user'}/tasks`}
                className={`menu-link ${location.pathname.endsWith('/tasks') ? 'active' : ''}`}
              >
                <span className="menu-link-icon"><MdOutlineTask size={20} /></span>
                <span className="menu-link-text">{t("sidebar_tasks")}</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link 
                to={`${isAdminRoute ? '/admin' : '/user'}/guidebooks`}
                className={`menu-link ${location.pathname.endsWith('/guidebooks') ? 'active' : ''}`}
              >
                <span className="menu-link-icon"><MdOutlineBook size={20} /></span>
                <span className="menu-link-text">{t("sidebar_guidebooks")}</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link 
                to={`${isAdminRoute ? '/admin' : '/user'}/schedule`}
                className={`menu-link ${location.pathname.endsWith('/schedule') ? 'active' : ''}`}
              >
                <span className="menu-link-icon"><MdOutlineCalendarMonth size={20} /></span>
                <span className="menu-link-text">{t("sidebar_schedule")}</span>
              </Link>
            </li>
            {isAdminRoute && (
              <li className="menu-item">
                <Link 
                  to="/admin/reports"
                  className={`menu-link ${location.pathname.endsWith('/reports') ? 'active' : ''}`}
                >
                  <span className="menu-link-icon"><MdOutlineContentPaste size={20} /></span>
                  <span className="menu-link-text">{t("sidebar_reports")}</span>
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <Link 
                to={`${isAdminRoute ? '/admin' : '/user'}/settings`}
                className={`menu-link ${location.pathname.endsWith('/settings') ? 'active' : ''}`}
              >
                <span className="menu-link-icon"><MdOutlineSettings size={20} /></span>
                <span className="menu-link-text">{t("sidebar_settings")}</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon"><MdOutlineLogout size={20} /></span>
                <span className="menu-link-text">{t("sidebar_logout")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
