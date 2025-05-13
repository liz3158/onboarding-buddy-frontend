import { useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import { 
  HiOutlineEye, 
  HiOutlinePencil, 
  HiOutlineTrash,
  HiOutlineChevronRight 
} from "react-icons/hi";

const AreaTableAction = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    { icon: <HiOutlineEye size={18} />, label: "View", path: "/view" },
    { icon: <HiOutlinePencil size={18} />, label: "Edit", path: "/edit" },
    { icon: <HiOutlineTrash size={18} />, label: "Delete", path: "/delete" },
  ];

  return (
    <div className="action-container">
      <button
        type="button"
        className="action-dropdown-btn"
        onClick={handleDropdown}
        aria-label="Open action menu"
      >
        <HiDotsHorizontal size={18} />
      </button>
      {showDropdown && (
        <div className="action-dropdown-menu" ref={dropdownRef}>
          <ul className="dropdown-menu-list">
            {menuItems.map((item, index) => (
              <li key={index} className="dropdown-menu-item">
                <Link to={item.path} className="dropdown-menu-link">
                  <span className="menu-item-icon">{item.icon}</span>
                  <span className="menu-item-label">{item.label}</span>
                  <HiOutlineChevronRight className="menu-item-arrow" size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AreaTableAction;
