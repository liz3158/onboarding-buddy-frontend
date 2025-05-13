import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./SchedulePage.scss";

const lanes = ["draft", "in", "edit", "done"];
const laneLabel = {
  draft: "status_draft",
  in:    "status_in_progress",
  edit:  "status_editing",
  done:  "status_done",
};

const palette = ["#509CFF", "#8258FF", "#EB5BC9", "#F2C156"];

const seed = [
  { id: 1, letter: "A", title: "Kick‑off call",  start: "2025-05-28", end: "2025-05-31", pct: 55, lane: "draft", color: palette[0]},
  { id: 2, letter: "B", title: "Wireframe rev.", start: "2025-05-29", end: "2025-06-03", pct: 80, lane: "in",    color: palette[1]},
  { id: 3, letter: "C", title: "Deploy build",   start: "2025-05-30", end: "2025-06-04", pct: 65, lane: "edit",  color: palette[2]},
  { id: 4, letter: "D", title: "UX testing",     start: "2025-05-28", end: "2025-06-01", pct: 75, lane: "done",  color: palette[3]},
];

export default function SchedulePage() {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState(seed);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [draft, setDraft] = useState({
    title: "",
    start: "",
    end: "",
    pct: 50,
    lane: "draft",
    color: palette[0],
  });
  const [month, setMonth] = useState(new Date("2025-05-01")); 

  const yyyy = month.getFullYear();
  const mm   = month.getMonth();
  const days = new Date(yyyy, mm + 1, 0).getDate();
  const monthLabel = month.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const visibleBars = tasks.filter((t) => {
    const s = new Date(t.start);
    return t.lane !== "done" && s.getFullYear() === yyyy && s.getMonth() === mm;
  });

  const dayIndex = (d) => new Date(d).getDate() - 1;
  const leftPct = (d) => (dayIndex(d) / days) * 100;
  const widthPct = (s, e) => ((dayIndex(e) - dayIndex(s) + 1) / days) * 100;

  const handleDrag = (e, id) => e.dataTransfer.setData("id", id);
  const handleDrop = (lane, e) => {
    e.preventDefault();
    const id = +e.dataTransfer.getData("id");
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, lane } : t)));
  };

  const openDialog = () => {
    setDraft({
      title: "",
      start: `${yyyy}-${String(mm + 1).padStart(2, "0")}-01`,
      end: `${yyyy}-${String(mm + 1).padStart(2, "0")}-01`,
      pct: 50,
      lane: "draft",
      color: palette[tasks.length % palette.length],
    });
    setDialogOpen(true);
  };

  const saveTask = () => {
    if (!draft.title || !draft.start || !draft.end) return;
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        letter: String.fromCharCode(65 + (prev.length % 26)),
        ...draft,
      },
    ]);
    setDialogOpen(false);
  };

  return (
    <section className="sched">
      <header className="bar">
        <button onClick={() => setMonth(new Date(yyyy, mm - 1, 1))}>◀</button>
        <h2>{monthLabel}</h2>
        <button onClick={() => setMonth(new Date(yyyy, mm + 1, 1))}>▶</button>
        <span className="spacer" />
        <button className="add-btn" onClick={openDialog}>
          {t("add_task")}
        </button>
      </header>

      <div className="grid-top">
        <ul className="pill">
          {tasks
            .filter((t) => t.lane !== "done")
            .map((t) => (
              <li key={t.id}>
                <span className="disc" style={{ background: t.color }}>
                  {t.letter}
                </span>
                <div className="pill-text">
                  <strong>{t.title}</strong>
                  <small>{t.start} – {t.end}</small>
                </div>
                <button className="dots">⋯</button>
              </li>
            ))}
        </ul>

        <div className="gantt">
          <div className="dates">
            {Array.from({ length: days }).map((_, i) => (
              <span key={i}>{String(i + 1).padStart(2, "0")}</span>
            ))}
          </div>

          {visibleBars.map((t, i) => (
            <div
              key={t.id}
              className="bar"
              style={{
                transform: `translateY(${i * 60}px)`,
                left: `${leftPct(t.start)}%`,
                width: `${widthPct(t.start, t.end)}%`,
                background: `linear-gradient(90deg, ${t.color} 0%, ${
                  t.color
                } 75%, ${t.color}30 100%)`,
              }}
            >
              <span className="knob" />
              <span className="pct">{t.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="lanes">
        {lanes.map((laneKey) => (
          <div
            key={laneKey}
            className="lane"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(laneKey, e)}
          >
            <h4>{t(laneLabel[laneKey])}</h4>
            <div className="card">
              {tasks
                .filter((t) => t.lane === laneKey)
                .map((t) => (
                  <div
                    key={t.id}
                    className="row"
                    draggable
                    onDragStart={(e) => handleDrag(e, t.id)}
                  >
                    <span className="dot" style={{ background: t.color }} />
                    <span>{t.title}</span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {dialogOpen && (
        <div className="back" onClick={() => setDialogOpen(false)}>
          <form
            className="dlg"
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => e.preventDefault()}
          >
            <h3>{t("add_task")}</h3>

            <input
              placeholder={t("title_label")}
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            />

            <label>{t("start_label")}</label>
            <input
              type="date"
              value={draft.start}
              onChange={(e) => setDraft({ ...draft, start: e.target.value })}
            />

            <label>{t("end_label")}</label>
            <input
              type="date"
              value={draft.end}
              onChange={(e) => setDraft({ ...draft, end: e.target.value })}
            />

            <label>{t("progress_label")}</label>
            <input
              type="number"
              min="0"
              max="100"
              value={draft.pct}
              onChange={(e) => setDraft({ ...draft, pct: +e.target.value })}
            />

            <label>{t("status_label")}</label>
            <select
              value={draft.lane}
              onChange={(e) => setDraft({ ...draft, lane: e.target.value })}
            >
              {lanes.map((k) => (
                <option key={k} value={k}>
                  {t(laneLabel[k])}
                </option>
              ))}
            </select>

            <div className="actions">
              <button type="button" onClick={saveTask}>
                {t("save_btn")}
              </button>
              <button
                type="button"
                className="ghost"
                onClick={() => setDialogOpen(false)}
              >
                {t("cancel_btn")}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
