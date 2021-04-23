import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CalendarIcon from '../common/Icons/CalendarIcon';
import RedirectButton from '../common/SubmitButton/RedirectButton/RedirectButton';
import MeetingPagination from './MeetingPagination';
import React, { useState } from 'react';
import Meeting from '../../model/Meeting';
import MeetingCard from './MeetingCard';
import './MeetingList.css';

interface IMeetingList {
  header: string;
  noMeetingsInfo: string;
  meetings: Meeting[];
}

const MeetingList = (iMeetingList: IMeetingList) => {
  const [currentPage, setCurrentPage] = useState(1);

  const onNextPageClick = () => {
    if (currentPage < Math.ceil(iMeetingList.meetings.length / 4)) setCurrentPage(currentPage + 1);
  };

  const onPrevPageClick = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const getClassName = (number: number) => {
    if (currentPage === number) return 'paginationCurrentItem';
    return 'paginationItem';
  };

  const meetingCards = iMeetingList.meetings
    .slice(currentPage * 4 - 4, currentPage * 4)
    .map((meeting: Meeting) => {
      return <MeetingCard key={meeting.name} {...meeting} />;
    });

  return (
    <Row className="justify-content-center mt-4 mr-5 row">
      <Col lg={12} className="text-center mt-5">
        <CalendarIcon className="meetingsIcon" />
      </Col>
      <Col lg={12} className="text-center my-3 meetingHeader">
        {iMeetingList.header}
      </Col>
      {iMeetingList.meetings.length > 0 ? (
        <>
          {meetingCards}
          <Col lg={12} />
          <Col xs={12} md={6} lg={6} className="text-center">
            <div className="text-center">
              <MeetingPagination
                meetingsPerPage={4}
                totalMeetings={iMeetingList.meetings.length}
                paginate={(number: number) => setCurrentPage(number)}
                nextPage={onNextPageClick}
                prevPage={onPrevPageClick}
                className={(number: number) => getClassName(number)}
              />
            </div>
          </Col>
        </>
      ) : (
        <div className="text-center mt-3">
          <div>{iMeetingList.noMeetingsInfo}</div>
          <RedirectButton className="mt-4" redirectTO="/create" text="Add new meeting" />
        </div>
      )}
    </Row>
  );
};

export default MeetingList;
