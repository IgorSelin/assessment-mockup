import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { mockSchools } from "../../mockData/schools";
import StatisticsTable from "../../components/StaticsticsTable";

const SchoolStatistics = () => {
  const { id } = useParams();
  const currentSchool = mockSchools.find((e) => e.id === +id!)!;
  return (
    <Layout>
      <StatisticsTable
        title={
          currentSchool?.schoolNameTranslation.nameTranslation.textValueKaz!
        }
        data={[currentSchool, currentSchool, currentSchool]}
        isSingleSchool
      />
    </Layout>
  );
};

export default SchoolStatistics;
