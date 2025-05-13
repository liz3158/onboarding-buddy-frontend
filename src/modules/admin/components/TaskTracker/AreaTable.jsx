import AreaTableAction from "./AreaTableAction";
import "./AreaTable.scss";
import { MdSearch } from "react-icons/md";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

const AreaTable = () => {
  const { t } = useTranslation();

  const TABLE_HEADS = [
    t("table_employee_name"),
    t("table_role"),
    t("table_department"),
    t("table_task_title"),
    t("table_status"),
    t("table_due_date"),
    t("table_assigned_by"),
    t("table_action"),
  ];

  const TABLE_DATA = [
    {
      id: 1,
      employee: "John Tan",
      role: "Backend Developer",
      department: "Engineering",
      task: "Setup GitHub Access",
      status: "completed",
      dueDate: "Apr 13, 2025",
      assignedBy: "Maria Wong",
    },
    {
      id: 2,
      employee: "Sarah Lee",
      role: "Frontend Developer",
      department: "Engineering",
      task: "Review Code Style Guide",
      status: "in-progress",
      dueDate: "Apr 15, 2025",
      assignedBy: "Maria Wong",
    },
    {
      id: 3,
      employee: "Michael Wong",
      role: "QA Engineer",
      department: "Engineering",
      task: "Setup Development Environment",
      status: "overdue",
      dueDate: "Apr 10, 2025",
      assignedBy: "Maria Wong",
    },
    {
      id: 4,
      employee: "Lisa Chen",
      role: "Product Manager",
      department: "Product",
      task: "Complete First Coding Challenge",
      status: "in-progress",
      dueDate: "Apr 18, 2025",
      assignedBy: "Maria Wong",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const filteredData = useMemo(() => {
    return TABLE_DATA.filter((item) => {
      const matchesSearch =
        item.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.department.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" || item.status === statusFilter.toLowerCase();
      const matchesDepartment = departmentFilter === "all" || item.department === departmentFilter;

      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [searchQuery, statusFilter, departmentFilter]);

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">{t("task_tracker_title")}</h4>
      </div>

      <div className="table-filters">
        <div className="search-container">
          <MdSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder={t("task_search_placeholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <span className="filter-label">{t("filter_status")}:</span>
          <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">{t("status_all")}</option>
            <option value="completed">{t("status_completed")}</option>
            <option value="in-progress">{t("status_in_progress")}</option>
            <option value="overdue">{t("status_overdue")}</option>
          </select>
        </div>

        <div className="filter-group">
          <span className="filter-label">{t("filter_department")}:</span>
          <select className="filter-select" value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
            <option value="all">{t("dept_all")}</option>
            <option value="Engineering">{t("dept_engineering")}</option>
            <option value="Product">{t("dept_product")}</option>
            <option value="Design">{t("dept_design")}</option>
            <option value="HR">{t("dept_hr")}</option>
          </select>
        </div>
      </div>

      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((dataItem) => (
              <tr key={dataItem.id}>
                <td>{dataItem.employee}</td>
                <td>{dataItem.role}</td>
                <td>{dataItem.department}</td>
                <td>{dataItem.task}</td>
                <td>
                  <div className={`dt-status status-${dataItem.status}`}>
                    <span className={`dt-status-dot dot-${dataItem.status}`}></span>
                    <span className="dt-status-text">
                      {t(`status_${dataItem.status.replace("-", "_")}`)}
                    </span>
                  </div>
                </td>
                <td>{dataItem.dueDate}</td>
                <td>{dataItem.assignedBy}</td>
                <td className="dt-cell-action">
                  <AreaTableAction />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaTable;
