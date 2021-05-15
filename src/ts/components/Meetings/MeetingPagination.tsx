import Pagination from 'react-bootstrap/Pagination';
import React, { useState } from 'react';
import styles from './MeetingPagination.module.css';
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineDoubleRight,
  AiOutlineDoubleLeft,
} from 'react-icons/ai';

export type PaginationProps = {
  meetingsPerPage: number;
  totalMeetings: number;
  paginate: Function;
  nextPage: Function;
  prevPage: Function;
  firstPage: Function;
  lastPage: Function;
  className: (number: number) => 'paginationCurrentItem' | 'paginationItem';
};

const MeetingPagination = ({
  meetingsPerPage,
  totalMeetings,
  paginate,
  nextPage,
  prevPage,
  firstPage,
  lastPage,
  className,
}: PaginationProps) => {
  const pageNumbers = [];
  const [currentPage, setCurrentPage] = useState(1);

  for (let i = 1; i <= Math.ceil(totalMeetings / meetingsPerPage); i++) {
    pageNumbers.push(i);
  }

  const getStyle = (name: string) => {
    return name === 'paginationCurrentItem' ? styles.paginationCurrentItem : styles.paginationItem;
  };

  const paginationItems = pageNumbers
    .slice(currentPage - 3 < 0 ? 0 : currentPage - 3, currentPage + 2)
    .map((number: number) => {
      return (
        <li
          key={number}
          onClick={() => {
            setCurrentPage(number);
            paginate(number);
          }}
          className={getStyle(className(number))}
        >
          {number}
        </li>
      );
    });

  return (
    <Pagination className="text-center my-5 col-3 mx-auto">
      <li
        key={'first'}
        onClick={() => {
          firstPage();
          setCurrentPage(1);
        }}
        className={styles.paginationItem}
      >
        {<AiOutlineDoubleLeft />}
      </li>
      <li
        key={'prev'}
        onClick={() => {
          prevPage();
          setCurrentPage(currentPage - 1 < 1 ? currentPage : currentPage - 1);
          console.log(currentPage);
        }}
        className={styles.paginationItem}
      >
        {<AiOutlineArrowLeft />}
      </li>
      {paginationItems}
      <li
        key={'next'}
        onClick={() => {
          nextPage();
          setCurrentPage(
            currentPage + 1 > Math.ceil(totalMeetings / meetingsPerPage)
              ? currentPage
              : currentPage + 1
          );
          console.log(currentPage);
        }}
        className={styles.paginationItem}
      >
        {<AiOutlineArrowRight />}
      </li>
      <li
        key={'last'}
        onClick={() => {
          lastPage();
          setCurrentPage(Math.ceil(totalMeetings / meetingsPerPage));
        }}
        className={styles.paginationItem}
      >
        {<AiOutlineDoubleRight />}
      </li>
    </Pagination>
  );
};

export default MeetingPagination;
