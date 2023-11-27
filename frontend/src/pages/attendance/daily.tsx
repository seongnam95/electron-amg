import { useLocation } from 'react-router-dom';

const DailyTablePage = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  return <>daily</>;
};

export default DailyTablePage;
