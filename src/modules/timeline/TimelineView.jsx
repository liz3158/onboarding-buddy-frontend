import React from "react";
import { useTranslation } from "react-i18next";
import { MdPlayArrow, MdFlag, MdOutlineTimeline } from "react-icons/md";
import { useTimeline } from "./useTimeline";
import TimelineBackground from "./TimelineBackground";
import "./TimelineView.scss";

const TimelineView = () => {
  const { timeline, setTimeline } = useTimeline();
  const { t } = useTranslation();

  const markDone = (id) =>
    setTimeline((prev) =>
      prev.map((m) => (m.id === id && !m.done ? { ...m, done: true } : m))
    );

  return (
    <div className="timeline-page">
      <TimelineBackground />
      
      <div className="milestone intro-card">
        <MdPlayArrow size={24} />
        <span>{t("start_here")}</span>
      </div>

      <div className="timeline-line" />

      <ul className="timeline">
        {timeline.map((item, idx) => (
          <li
            key={item.id}
            className={`timeline-item ${idx % 2 === 0 ? "left" : "right"}`}
          >
            <div className="timeline-card">
              <div
                className="year"
                style={{ backgroundColor: item.statusColor }}
              >
                {item.year}
              </div>

              <div className="title">
                <MdOutlineTimeline size={18} />
                &nbsp;{t(item.title)}
              </div>

              <p className="desc">{t(item.description)}</p>

              <div className="actions">
                <button
                  className={`status-btn ${item.done ? "done" : "undone"}`}
                  disabled={item.done}
                  onClick={() => markDone(item.id)}
                >
                  {item.done ? t("done") : t("mark_done")}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="milestone success-card">
        <MdFlag size={24} />
        <span>{t("mastered")}</span>
      </div>
    </div>
  );
};

export default TimelineView;
