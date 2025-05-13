import { useState, useContext } from "react";
import { MdOutlineEdit, MdOutlineCheck, MdOutlineClose } from "react-icons/md";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { LIGHT_THEME, DARK_THEME } from "../../../constants/themeConstants";
import { useTranslation } from "react-i18next";
import "./AdminSettings.css";

const AdminSettings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("profile");
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState("Admin User");
  const [editingEmail, setEditingEmail] = useState(false);
  const [email, setEmail] = useState("admin@company.com");
  const [editingRole, setEditingRole] = useState(false);
  const [role, setRole] = useState("System Administrator");
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    taskReminders: true,
    weeklyDigest: true,
    teamUpdates: true,
    systemAlerts: true
  });
  const [preferences, setPreferences] = useState({
    language: "English",
    startPage: "Dashboard",
    defaultView: "Admin"
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
    <div className="admin-settings-page">
      <div className="admin-settings-container">
        <h1 className="admin-settings-title">{t("admin_settings")}</h1>

        <div className="admin-settings-tabs">
          <button className={`admin-settings-tab-button ${activeTab === "profile" ? "active" : ""}`} onClick={() => setActiveTab("profile")}>
            {t("profile")}
          </button>
          <button className={`admin-settings-tab-button ${activeTab === "preferences" ? "active" : ""}`} onClick={() => setActiveTab("preferences")}>
            {t("preferences")}
          </button>
          <button className={`admin-settings-tab-button ${activeTab === "notifications" ? "active" : ""}`} onClick={() => setActiveTab("notifications")}>
            {t("notifications")}
          </button>
        </div>

        <div className="admin-settings-content">
          {activeTab === "profile" && (
            <div className="admin-settings-profile-section">
              <div className="admin-settings-profile-header">
                <div className="admin-settings-avatar">
                  <img src="https://i.pravatar.cc/150?img=3" alt="Profile" />
                  <button className="admin-settings-avatar-edit-btn">{t("change_photo")}</button>
                </div>
                <div className="admin-settings-profile-info">
                  {editingName ? (
                    <div className="admin-settings-edit-name-container">
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="admin-settings-name-input" />
                      <div className="admin-settings-edit-actions">
                        <button onClick={handleNameSave} className="admin-settings-save-btn"><MdOutlineCheck /></button>
                        <button onClick={handleNameCancel} className="admin-settings-cancel-btn"><MdOutlineClose /></button>
                      </div>
                    </div>
                  ) : (
                    <div className="admin-settings-name-container">
                      <h2>{name}</h2>
                      <button onClick={handleNameEdit} className="admin-settings-edit-btn"><MdOutlineEdit /></button>
                    </div>
                  )}

                  {editingRole ? (
                    <div className="admin-settings-edit-role-container">
                      <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="admin-settings-role-input" />
                      <div className="admin-settings-edit-actions">
                        <button onClick={handleRoleSave} className="admin-settings-save-btn"><MdOutlineCheck /></button>
                        <button onClick={handleRoleCancel} className="admin-settings-cancel-btn"><MdOutlineClose /></button>
                      </div>
                    </div>
                  ) : (
                    <div className="admin-settings-role-container">
                      <p className="admin-settings-profile-role">{role}</p>
                      <button onClick={handleRoleEdit} className="admin-settings-edit-btn"><MdOutlineEdit size={16} /></button>
                    </div>
                  )}

                  {editingEmail ? (
                    <div className="admin-settings-edit-email-container">
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="admin-settings-email-input" />
                      <div className="admin-settings-edit-actions">
                        <button onClick={handleEmailSave} className="admin-settings-save-btn"><MdOutlineCheck /></button>
                        <button onClick={handleEmailCancel} className="admin-settings-cancel-btn"><MdOutlineClose /></button>
                      </div>
                    </div>
                  ) : (
                    <div className="admin-settings-email-container">
                      <p className="admin-settings-profile-email">{email}</p>
                      <button onClick={handleEmailEdit} className="admin-settings-edit-btn"><MdOutlineEdit size={16} /></button>
                    </div>
                  )}
                </div>
              </div>

              <div className="admin-settings-profile-details">
                <h3>{t("account_information")}</h3>
                <div className="admin-settings-info-group">
                  <label>{t("department")}</label>
                  <p>{t("administration")}</p>
                </div>
                <div className="admin-settings-info-group">
                  <label>{t("team")}</label>
                  <p>{t("system_administration")}</p>
                </div>
                <div className="admin-settings-info-group">
                  <label>{t("location")}</label>
                  <p>{t("headquarters")}</p>
                </div>
                <div className="admin-settings-info-group">
                  <label>{t("joined")}</label>
                  <p>Jan 1, 2023</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="admin-settings-preferences-section">
              <div className="admin-settings-preference-group">
                <h3>{t("display_settings")}</h3>

                <div className="admin-settings-theme-toggle-container">
                  <span>{t("theme")}</span>
                  <div className="admin-settings-theme-toggle">
                    <span className={theme === LIGHT_THEME ? "active" : ""}>{t("light")}</span>
                    <label className="admin-settings-switch">
                      <input type="checkbox" checked={theme === DARK_THEME} onChange={toggleTheme} />
                      <span className="admin-settings-slider round"></span>
                    </label>
                    <span className={theme === DARK_THEME ? "active" : ""}>{t("dark")}</span>
                  </div>
                </div>

                <div className="admin-settings-select-group">
                  <label htmlFor="language">{t("language")}</label>
                  <select id="language" name="language" value={preferences.language} onChange={handlePreferenceChange}>
                    <option value="English">{t("english")}</option>
                    <option value="Spanish">{t("spanish")}</option>
                    <option value="French">{t("french")}</option>
                    <option value="German">{t("german")}</option>
                  </select>
                </div>

                <div className="admin-settings-select-group">
                  <label htmlFor="startPage">{t("start_page")}</label>
                  <select id="startPage" name="startPage" value={preferences.startPage} onChange={handlePreferenceChange}>
                    <option value="Dashboard">{t("dashboard")}</option>
                    <option value="Tasks">{t("tasks")}</option>
                    <option value="Calendar">{t("calendar")}</option>
                    <option value="Reports">{t("reports")}</option>
                  </select>
                </div>

                <div className="admin-settings-select-group">
                  <label htmlFor="defaultView">{t("default_view")}</label>
                  <select id="defaultView" name="defaultView" value={preferences.defaultView} onChange={handlePreferenceChange}>
                    <option value="Admin">{t("admin_view")}</option>
                    <option value="User">{t("user_view")}</option>
                  </select>
                </div>

                <button className="admin-settings-save-btn">{t("save_preferences")}</button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="admin-settings-notifications-section">
              <h3>{t("notification_preferences")}</h3>
              <p>{t("select_notifications")}</p>

              <div className="admin-settings-notification-settings">
                <div className="admin-settings-notification-item">
                  <div>
                    <h4>{t("email_notifications")}</h4>
                    <p>{t("email_notifications_desc")}</p>
                  </div>
                  <label className="admin-settings-switch">
                    <input type="checkbox" checked={notifications.emailNotifications} onChange={() => handleToggleNotification("emailNotifications")} />
                    <span className="admin-settings-slider round"></span>
                  </label>
                </div>

                <div className="admin-settings-notification-item">
                  <div>
                    <h4>{t("task_reminders")}</h4>
                    <p>{t("task_reminders_desc")}</p>
                  </div>
                  <label className="admin-settings-switch">
                    <input type="checkbox" checked={notifications.taskReminders} onChange={() => handleToggleNotification("taskReminders")} />
                    <span className="admin-settings-slider round"></span>
                  </label>
                </div>

                <div className="admin-settings-notification-item">
                  <div>
                    <h4>{t("weekly_digest")}</h4>
                    <p>{t("weekly_digest_desc")}</p>
                  </div>
                  <label className="admin-settings-switch">
                    <input type="checkbox" checked={notifications.weeklyDigest} onChange={() => handleToggleNotification("weeklyDigest")} />
                    <span className="admin-settings-slider round"></span>
                  </label>
                </div>

                <div className="admin-settings-notification-item">
                  <div>
                    <h4>{t("team_updates")}</h4>
                    <p>{t("team_updates_desc")}</p>
                  </div>
                  <label className="admin-settings-switch">
                    <input type="checkbox" checked={notifications.teamUpdates} onChange={() => handleToggleNotification("teamUpdates")} />
                    <span className="admin-settings-slider round"></span>
                  </label>
                </div>

                <div className="admin-settings-notification-item">
                  <div>
                    <h4>{t("system_alerts")}</h4>
                    <p>{t("system_alerts_desc")}</p>
                  </div>
                  <label className="admin-settings-switch">
                    <input type="checkbox" checked={notifications.systemAlerts} onChange={() => handleToggleNotification("systemAlerts")} />
                    <span className="admin-settings-slider round"></span>
                  </label>
                </div>
              </div>

              <button className="admin-settings-save-btn">{t("save_notification_settings")}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;