import { useTranslation } from "react-i18next";
import AreaCard from "./AreaCard";
import "./AreaCards.scss";

const AreaCards = () => {
  const { t } = useTranslation();

  return (
    <section className="content-area-cards">
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={80}
        cardInfo={{
          title: t("area_active_onboardings_title"),
          value: "12",
          text: t("area_active_onboardings_text"),
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={87}
        cardInfo={{
          title: t("area_task_completion_title"),
          value: "87%",
          text: t("area_task_completion_text"),
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={40}
        cardInfo={{
          title: t("area_overdue_tasks_title"),
          value: "5",
          text: t("area_overdue_tasks_text"),
        }}
      />
    </section>
  );
};

export default AreaCards;
