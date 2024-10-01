import { Pagination } from "react-pagination-bar";
import 'react-pagination-bar/dist/index.css';
import { useState, useEffect } from "react";
import queryString from "query-string";

const posts = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
  { id: 3, title: 'Post 3' },
  { id: 4, title: 'Post 4' },
  { id: 5, title: 'Post 5' },
  { id: 6, title: 'Post 6' },
  { id: 7, title: 'Post 7' },
  { id: 8, title: 'Post 8' },
  { id: 9, title: 'Post 9' },
  { id: 10, title: 'Post 10' },
  { id: 11, title: 'Post 11' },
  { id: 12, title: 'Post 12' },
];

export const PaginationBar = ({ total }) => {
  const q_string = queryString.parse(window.location.search);
  const initialPage = parseInt(q_string.page, 10) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    q_string.page = pageNumber;
    const stringified = queryString.stringify(q_string);
    window.history.pushState(null, '', `?${stringified}`);
    window.location.reload();
  };

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={24}
        onPageChange={handlePageChange}
        totalItems={99}
        pageNeighbours={3}
      />
    </div>
  );
};
