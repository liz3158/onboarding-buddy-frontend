import { useState } from "react";

export const useTimeline = () => {
  const [timeline, setTimeline] = useState([
    {
      id: "1",
      year: "2022",
      title: "offer_accepted",
      description: "offer_accepted_desc",
      statusColor: "#00c853",
      done: true,
    },
    {
      id: "2",
      year: "2022",
      title: "laptop_delivered",
      description: "laptop_delivered_desc",
      statusColor: "#fbc02d",
      done: false,
    },
    {
      id: "3",
      year: "2023",
      title: "first_day_orientation",
      description: "first_day_orientation_desc",
      statusColor: "#e53935",
      done: false,
    },
    {
      id: "4",
      year: "2023",
      title: "first_project_assigned",
      description: "first_project_assigned_desc",
      statusColor: "#1e88e5",
      done: true,
    },
    {
      id: "5",
      year: "2023",
      title: "mentor_check_in",
      description: "mentor_check_in_desc",
      statusColor: "#26a69a",
      done: false,
    },
  ]);

  return { timeline, setTimeline };
};
