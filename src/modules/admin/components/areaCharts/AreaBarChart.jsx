import { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import { FaArrowUpLong } from "react-icons/fa6";
import { LIGHT_THEME } from "../../../../constants/themeConstants";
import { useTranslation } from "react-i18next";
import "./AreaCharts.scss";

const data = [
  { month: "Jan", started: 15, completed: 12 },
  { month: "Feb", started: 18, completed: 15 },
  { month: "Mar", started: 12, completed: 7 },
  { month: "April", started: 20, completed: 16 },
  { month: "May", started: 16, completed: 13 },
  { month: "Jun", started: 14, completed: 11 },
  { month: "Jul", started: 17, completed: 14 },
  { month: "Aug", started: 19, completed: 15 },
  { month: "Sep", started: 22, completed: 18 },
];

const AreaBarChart = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const formatTooltipValue = (value) => {
    return value;
  };

  const formatYAxisLabel = (value) => {
    return value;
  };

  const formatLegendValue = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  // Calculate percentage increase from last month
  const lastMonth = data[data.length - 1];
  const previousMonth = data[data.length - 2];
  const percentageIncrease = Math.round(
    ((lastMonth.completed - previousMonth.completed) / previousMonth.completed) * 100
  );

  return (
    <div className="bar-chart">
      <div className="bar-chart-info">
        <div className="info-header">
          <h5 className="bar-chart-title">{t("bar_chart_title")}</h5>
          <div className="info-data-value">
            <span className="value-label">{t("bar_chart_new_hires")}</span>
            <span className="value-number">{lastMonth.completed}</span>
          </div>
        </div>
        <div className="chart-info-data">
          <div className="info-data-text">
            <FaArrowUpLong className="arrow-icon" />
            <p>{percentageIncrease}% {t("bar_chart_increase_last_month")}</p>
          </div>
        </div>
      </div>

      <div className="bar-chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={200}
            data={data}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <XAxis
              dataKey="month"
              padding={{ left: 10 }}
              tickSize={0}
              axisLine={false}
              tick={{
                fill: `${theme === LIGHT_THEME ? "#676767" : "#f3f3f3"}`,
                fontSize: 14,
              }}
            />
            <YAxis
              padding={{ bottom: 10, top: 10 }}
              tickFormatter={formatYAxisLabel}
              tickCount={6}
              axisLine={false}
              tickSize={0}
              tick={{
                fill: `${theme === LIGHT_THEME ? "#676767" : "#f3f3f3"}`,
              }}
            />
            <Tooltip
              formatter={formatTooltipValue}
              cursor={{ fill: "transparent" }}
              labelFormatter={(label) => `${label}`}
              contentStyle={{
                backgroundColor: theme === LIGHT_THEME ? "#fff" : "#2e2e48",
                border: "none",
                borderRadius: "4px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            />
            <Legend
              iconType="circle"
              iconSize={10}
              verticalAlign="top"
              align="right"
              formatter={formatLegendValue}
            />
            <Bar
              name={t("bar_legend_started")}
              dataKey="started"
              fill="#475be8"
              activeBar={false}
              isAnimationActive={false}
              barSize={24}
              radius={[4, 4, 4, 4]}
            />
            <Bar
              name={t("bar_legend_completed")}
              dataKey="completed"
              fill="#e3e7fc"
              activeBar={false}
              isAnimationActive={false}
              barSize={24}
              radius={[4, 4, 4, 4]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaBarChart;
