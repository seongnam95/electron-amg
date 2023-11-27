import { useLocation } from 'react-router-dom';

const MonthlyTablePage = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  return <>monthly</>;
};

export default MonthlyTablePage;
