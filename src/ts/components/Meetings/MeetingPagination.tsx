import Pagination from 'react-bootstrap/Pagination';
import React from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import './MeetingPagination.css';

interface IPagination {
  meetingsPerPage: number;
  totalMeetings: number;
  paginate: Function;
  nextPage: Function;
  prevPage: Function;
  className: any;
}
const MeetingPagination = (pagination: IPagination) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(pagination.totalMeetings / pagination.meetingsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginationItems = pageNumbers.map((number: number) => {
    return (
      <li
        key={number}
        onClick={() => pagination.paginate(number)}
        className={pagination.className(number)}
      >
        {number}
      </li>
    );
  });

  return (
    <Pagination className="text-center mt-5 col-3 mx-auto">
      <li
        key={-1}
        onClick={() => pagination.prevPage()}
        className="text-center paginationItem mx-auto"
      >
        {<AiOutlineArrowLeft />}
      </li>
      {paginationItems}
      <li
        key={+1}
        onClick={() => pagination.nextPage()}
        className="text-center paginationItem mx-auto"
      >
        {<AiOutlineArrowRight />}
      </li>
    </Pagination>
  );
};

export default MeetingPagination;
