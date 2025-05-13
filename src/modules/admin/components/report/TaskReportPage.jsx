import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./TaskReportPage.scss";

const initTasks = [
  { id: 1, name: "Shaw", section: "Frontend", type: "Promo", date: "2025‑04‑17", progress: "In‑Progress" },
  { id: 2, name: "Root", section: "Backend", type: "Promo", date: "2025‑04‑15", progress: "Done" },
  { id: 3, name: "Ali", section: "QA", type: "New", date: "2025‑04‑12", progress: "Blocked" },
  { id: 4, name: "Alex Denvers", section: "FBI", type: "New", date: "2025‑04‑12", progress: "Blocked" },
  { id: 5, name: "Kara Denvers", section: "PM", type: "New", date: "2025‑04‑12", progress: "Blocked" },
  { id: 6, name: "Eve", section: "Design", type: "Promo", date: "2025‑04‑10", progress: "In‑Progress" },
  { id: 7, name: "John", section: "Ops", type: "Bug", date: "2025‑04‑09", progress: "Done" },
  { id: 8, name: "Lena", section: "Marketing", type: "Promo", date: "2025‑04‑09", progress: "Blocked" },
  { id: 9, name: "Winn", section: "Support", type: "Bug", date: "2025‑04‑08", progress: "In‑Progress" },
  { id: 10, name: "James", section: "Sales", type: "New", date: "2025‑04‑06", progress: "Done" },
  { id: 11, name: "Kelly", section: "QA", type: "Bug", date: "2025‑04‑05", progress: "Blocked" },
  { id: 12, name: "Maggie", section: "Legal", type: "Promo", date: "2025‑04‑03", progress: "Done" },
];

const COLORS = { "Done": "#2ecc71", "In‑Progress": "#f1c40f", "Blocked": "#e74c3c" };
const perPage = 10;

export default function TaskReportPage() {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState(initTasks);
  const [page, setPage] = useState(1);
  const [toDel, setToDel] = useState(null);

  const pageCount = Math.ceil(tasks.length / perPage);
  const sliceFrom = (page - 1) * perPage;
  const view = tasks.slice(sliceFrom, sliceFrom + perPage);

  const confirmDelete = () => {
    setTasks((currentTasks) => currentTasks.filter((row) => row.id !== toDel));
    setToDel(null);
    if (page > 1 && (tasks.length - 1) <= (page - 1) * perPage) setPage(page - 1);
  };

  const getStatusTranslation = (status) => {
    const statusKey = status.toLowerCase().replace("‑", "_");
    return t(`task_status_${statusKey}`);
  };

  return (
    <section className="report-page">
      <h2 className="title">{t("task_report_title")}</h2>

      <table className="report-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{t("task_report_name")}</th>
            <th>{t("task_report_section")}</th>
            <th>{t("task_report_type")}</th>
            <th>{t("task_report_date")}</th>
            <th>{t("task_report_progress")}</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {view.map((task, idx) => (
            <tr key={task.id}>
              <td>{sliceFrom + idx + 1}</td>
              <td>{task.name}</td>
              <td>{task.section}</td>
              <td>{task.type}</td>
              <td>{task.date}</td>
              <td>
                <span className="badge" style={{ background: COLORS[task.progress] }}>
                  {getStatusTranslation(task.progress)}
                </span>
              </td>
              <td>
                <button className="del-btn" onClick={() => setToDel(task.id)}>
                  {t("task_report_delete")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {pageCount > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>{t("pagination_prev")}</button>
          <span>{page} / {pageCount}</span>
          <button disabled={page === pageCount} onClick={() => setPage(page + 1)}>{t("pagination_next")}</button>
        </div>
      )}

      {toDel && (
        <div className="confirm-backdrop" onClick={() => setToDel(null)}>
          <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <p>{t("confirm_delete_prompt")}</p>
            <div className="actions">
              <button onClick={confirmDelete}>{t("confirm_yes")}</button>
              <button className="ghost" onClick={() => setToDel(null)}>{t("confirm_no")}</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
