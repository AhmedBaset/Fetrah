import { useEffect, useState } from "react";
import { getCookie } from "../../../actions/auth";
import { getUsersReports } from "../../../actions/user";
const Reports = (props) => {
  const [reports, setReports] = useState();
  const token = getCookie("token");
  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = () => {
    getUsersReports(token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setReports(data.reports);
      }
    });
  };

  if (!reports) {
    return <>جاري التحميل</>;
  }

  return <>{JSON.stringify(reports)}</>;
};

export default Reports;
