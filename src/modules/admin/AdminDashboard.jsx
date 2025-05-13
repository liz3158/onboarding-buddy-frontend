import AreaCards from "./components/areaCards/AreaCards.jsx";
import AreaCharts from "./components/areaCharts/AreaCharts.jsx";
import AreaTable from "./components/TaskTracker/AreaTable.jsx";
import AreaTop from "./components/areaTop/AreaTop.jsx";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { DARK_THEME } from "../../constants/themeConstants";

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`content-area ${theme === DARK_THEME ? 'dark-mode' : 'light-mode'}`}>
      <AreaTop />
      <AreaCards />
      <AreaCharts />
      <AreaTable />
    </div>
  );
};

export default Dashboard;
