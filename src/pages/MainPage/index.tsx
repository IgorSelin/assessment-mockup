import StatisticsTable from "../../components/StaticsticsTable";
import { mockSchools } from "../../mockData/schools";

const MainPage = () => {
  return (
    <StatisticsTable data={mockSchools} title="Assessment tool statistics" />
  );
};

export default MainPage;
