import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

import { Button } from 'antd';

import { PaginationStyled } from './styled';

export interface PaginationProps {
  page?: number;
  nextPage?: number;
  hasMore?: boolean;
  count?: boolean;
  total?: number;
}

const Pagination = ({ page, nextPage, hasMore, count, total }: PaginationProps) => {
  return (
    <PaginationStyled className="Pagination">
      <Button type="text" size="small" icon={<MdOutlineKeyboardArrowLeft />} />
      <Button type="text" size="small" icon={<MdOutlineKeyboardArrowRight />} />
    </PaginationStyled>
  );
};

export default Pagination;
