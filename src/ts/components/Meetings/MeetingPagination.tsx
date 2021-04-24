import Pagination from 'react-bootstrap/Pagination';
import React, { useState } from 'react';
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineDoubleRight,
  AiOutlineDoubleLeft,
} from 'react-icons/ai';
import './MeetingPagination.css';

interface IPagination {
  meetingsPerPage: number;
  totalMeetings: number;
  paginate: Function;
  nextPage: Function;
  prevPage: Function;
  firstPage: Function;
  lastPage: Function;
  className: any;
}
const MeetingPagination = (pagination: IPagination) => {
  const pageNumbers = [];
  const [currentPage, setCurrentPage] = useState(1);

  for (let i = 1; i <= Math.ceil(pagination.totalMeetings / pagination.meetingsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginationItems = pageNumbers
    .slice(currentPage - 3 < 0 ? 0 : currentPage - 3, currentPage + 2)
    .map((number: number) => {
      return (
        <li
          key={number}
          onClick={() => {
            setCurrentPage(number);
            pagination.paginate(number);
          }}
          className={pagination.className(number)}
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
          pagination.firstPage();
          setCurrentPage(1);
        }}
        className="text-center paginationItem mx-auto"
      >
        {<AiOutlineDoubleLeft />}
      </li>
      <li
        key={'prev'}
        onClick={() => {
          pagination.prevPage();
          setCurrentPage(currentPage - 1 < 1 ? currentPage : currentPage - 1);
          console.log(currentPage);
        }}
        className="text-center paginationItem mx-auto"
      >
        {<AiOutlineArrowLeft />}
      </li>
      {paginationItems}
      <li
        key={'next'}
        onClick={() => {
          pagination.nextPage();
          setCurrentPage(
            currentPage + 1 > Math.ceil(pagination.totalMeetings / pagination.meetingsPerPage)
              ? currentPage
              : currentPage + 1
          );
          console.log(currentPage);
        }}
        className="text-center paginationItem mx-auto"
      >
        {<AiOutlineArrowRight />}
      </li>
      <li
        key={'last'}
        onClick={() => {
          pagination.lastPage();
          setCurrentPage(Math.ceil(pagination.totalMeetings / pagination.meetingsPerPage));
        }}
        className="text-center paginationItem mx-auto"
      >
        {<AiOutlineDoubleRight />}
      </li>
    </Pagination>
  );
};

export default MeetingPagination;
