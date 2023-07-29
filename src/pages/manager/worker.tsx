import LayoutConfig from '~/components/layouts/LayoutConfig/LayoutConfig';
import WorkerTable from '~/components/worker/WorkerTable/WorkerTable';
import { WorkerPageStyled } from '~/styles/pageStyled/workerPageStyled';

const Worker = () => {
  return (
    <WorkerPageStyled>
      <LayoutConfig breadcrumbs={[' 매니저', '직원 관리']} />
      <WorkerTable />
    </WorkerPageStyled>
  );
};

export default Worker;
