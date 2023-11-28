import { Navigate, useLocation } from 'react-router-dom';

const Index = () => {
  const location = useLocation();
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default Index;
