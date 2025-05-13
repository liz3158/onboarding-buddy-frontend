import { useState, useContext } from "react";
import { MdOutlineEdit, MdOutlineCheck, MdOutlineClose } from "react-icons/md";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { LIGHT_THEME, DARK_THEME } from "../../../constants/themeConstants";
import { useTranslation } from "react-i18next";
import "./UserSettings.css";

const UserSettings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("profile");
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState("John Doe");
  const [editingEmail, setEditingEmail] = useState(false);
  const [email, setEmail] = useState("john.doe@company.com");
  const [editingRole, setEditingRole] = useState(false);
  const [role, setRole] = useState("Junior Software Engineer");
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    taskReminders: true,
    weeklyDigest: false,
    teamUpdates: true
  });
  const [preferences, setPreferences] = useState({
    language: "English",
    startPage: "Dashboard"
  });

  const handleNameEdit = () => setEditingName(true);
  const handleNameSave = () => setEditingName(false);
  const handleNameCancel = () => setEditingName(false);

  const handleEmailEdit = () => setEditingEmail(true);
  const handleEmailSave = () => setEditingEmail(false);
  const handleEmailCancel = () => setEditingEmail(false);

  const handleRoleEdit = () => setEditingRole(true);
  const handleRoleSave = () => setEditingRole(false);
  const handleRoleCancel = () => setEditingRole(false);

  const handleToggleNotification = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  const handlePreferenceChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="user-settings-page">
      <div className="user-settings-container">
        <h1 className="user-settings-title">{t("settings")}</h1>

        <div className="user-settings-tabs">
          <button className={`user-settings-tab-button ${activeTab === "profile" ? "active" : ""}`} onClick={() => setActiveTab("profile")}>
            {t("profile")}
          </button>
          <button className={`user-settings-tab-button ${activeTab === "preferences" ? "active" : ""}`} onClick={() => setActiveTab("preferences")}>
            {t("preferences")}
          </button>
          <button className={`user-settings-tab-button ${activeTab === "notifications" ? "active" : ""}`} onClick={() => setActiveTab("notifications")}>
            {t("notifications")}
          </button>
        </div>

        <div className="user-settings-content">
          {activeTab === "profile" && (
            <div className="user-settings-profile-section">
              <div className="user-settings-profile-header">
                <div className="user-settings-avatar">
                  <img src="https://i.pravatar.cc/150?img=12" alt="Profile" />
                  <button className="user-settings-avatar-edit-btn">{t("change_photo")}</button>
                </div>
                <div className="user-settings-profile-info">
                  {editingName ? (
                    <div className="user-settings-edit-name-container">
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="user-settings-name-input" />
                      <div className="user-settings-edit-actions">
                        <button onClick={handleNameSave} className="user-settings-save-btn"><MdOutlineCheck /></button>
                        <button onClick={handleNameCancel} className="user-settings-cancel-btn"><MdOutlineClose /></button>
                      </div>
                    </div>
                  ) : (
                    <div className="user-settings-name-container">
                      <h2>{name}</h2>
                      <button onClick={handleNameEdit} className="user-settings-edit-btn"><MdOutlineEdit /></button>
                    </div>
                  )}

                  {editingRole ? (
                    <div className="user-settings-edit-role-container">
                      <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="user-settings-role-input" />
                      <div className="user-settings-edit-actions">
                        <button onClick={handleRoleSave} className="user-settings-save-btn"><MdOutlineCheck /></button>
                        <button onClick={handleRoleCancel} className="user-settings-cancel-btn"><MdOutlineClose /></button>
                      </div>
                    </div>
                  ) : (
                    <div className="user-settings-role-container">
                      <p className="user-settings-profile-role">{role}</p>
                      <button onClick={handleRoleEdit} className="user-settings-edit-btn"><MdOutlineEdit size={16} /></button>
                    </div>
                  )}

                  {editingEmail ? (
                    <div className="user-settings-edit-email-container">
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="user-settings-email-input" />
                      <div className="user-settings-edit-actions">
                        <button onClick={handleEmailSave} className="user-settings-save-btn"><MdOutlineCheck /></button>
                        <button onClick={handleEmailCancel} className="user-settings-cancel-btn"><MdOutlineClose /></button>
                      </div>
                    </div>
                  ) : (
                    <div className="user-settings-email-container">
                      <p className="user-settings-profile-email">{email}</p>
                      <button onClick={handleEmailEdit} className="user-settings-edit-btn"><MdOutlineEdit size={16} /></button>
                    </div>
                  )}
                </div>
              </div>

              <div className="user-settings-profile-details">
                <h3>{t("account_information")}</h3>
                <div className="user-settings-info-group">
                  <label>{t("department")}</label>
                  <p>{t("engineering")}</p>
                </div>
                <div className="user-settings-info-group">
                  <label>{t("team")}</label>
                  <p>{t("frontend_dev")}</p>
                </div>
                <div className="user-settings-info-group">
                  <label>{t("location")}</label>
                  <p>{t("new_york")}</p>
                </div>
                <div className="user-settings-info-group">
                  <label>{t("joined")}</label>
                  <p>Jan 15, 2023</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="user-settings-preferences-section">
              <div className="user-settings-preference-group">
                <h3>{t("display_settings")}</h3>

                <div className="user-settings-theme-toggle-container">
                  <span>{t("theme")}</span>
                  <div className="user-settings-theme-toggle">
                    <span className={theme === LIGHT_THEME ? "active" : ""}>{t("light")}</span>
                    <label className="user-settings-switch">
                      <input type="checkbox" checked={theme === DARK_THEME} onChange={toggleTheme} />
                      <span className="user-settings-slider round"></span>
                    </label>
                    <span className={theme === DARK_THEME ? "active" : ""}>{t("dark")}</span>
                  </div>
                </div>

                {/* <div className="user-settings-select-group">
                  <label htmlFor="language">{t("language")}</label>
                  <select id="language" name="language" value={preferences.language} onChange={handlePreferenceChange}>
                    <option value="English">{t("english")}</option>
                    <option value="Spanish">{t("spanish")}</option>
                    <option value="French">{t("french")}</option>
                    <option value="German">{t("german")}</option>
                  </select>
                </div> */}

                <div className="user-settings-select-group">
                  <label htmlFor="startPage">{t("start_page")}</label>
                  <select id="startPage" name="startPage" value={preferences.startPage} onChange={handlePreferenceChange}>
                    <option value="Dashboard">{t("dashboard")}</option>
                    <option value="Tasks">{t("tasks")}</option>
                    <option value="Calendar">{t("calendar")}</option>
                  </select>
                </div>

                <button className="user-settings-save-btn">{t("save_preferences")}</button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="user-settings-notifications-section">
              <h3>{t("notification_preferences")}</h3>
              <p>{t("select_notifications")}</p>

              <div className="user-settings-notification-settings">
                <div className="user-settings-notification-item">
                  <div>
                    <h4>{t("email_notifications")}</h4>
                    <p>{t("email_notifications_desc")}</p>
                  </div>
                  <label className="user-settings-switch">
                    <input type="checkbox" checked={notifications.emailNotifications} onChange={() => handleToggleNotification("emailNotifications")} />
                    <span className="user-settings-slider round"></span>
                  </label>
                </div>

                <div className="user-settings-notification-item">
                  <div>
                    <h4>{t("task_reminders")}</h4>
                    <p>{t("task_reminders_desc")}</p>
                  </div>
                  <label className="user-settings-switch">
                    <input type="checkbox" checked={notifications.taskReminders} onChange={() => handleToggleNotification("taskReminders")} />
                    <span className="user-settings-slider round"></span>
                  </label>
                </div>

                <div className="user-settings-notification-item">
                  <div>
                    <h4>{t("weekly_digest")}</h4>
                    <p>{t("weekly_digest_desc")}</p>
                  </div>
                  <label className="user-settings-switch">
                    <input type="checkbox" checked={notifications.weeklyDigest} onChange={() => handleToggleNotification("weeklyDigest")} />
                    <span className="user-settings-slider round"></span>
                  </label>
                </div>

                <div className="user-settings-notification-item">
                  <div>
                    <h4>{t("team_updates")}</h4>
                    <p>{t("team_updates_desc")}</p>
                  </div>
                  <label className="user-settings-switch">
                    <input type="checkbox" checked={notifications.teamUpdates} onChange={() => handleToggleNotification("teamUpdates")} />
                    <span className="user-settings-slider round"></span>
                  </label>
                </div>
              </div>

              <button className="user-settings-save-btn">{t("save_notification_settings")}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
