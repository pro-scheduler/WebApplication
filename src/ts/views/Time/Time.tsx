import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import TimeGrid from '../../components/TimeGrid/TimeGrid';
import UserTimeGrid from '../../components/UserTimeGrid/UserTimeGrid';
import MeetingTime from '../../components/MeetingDetails/MeetingTime/MeetingTime';
import { TimeRangeDTO } from '../../model/TimeRangeDTO';

const Time = () => {
  let now = new Date().getTime();
  let tomorow = new Date().getTime() + 1000 * 60 * 60 * 24;
  let timeRanges: TimeRangeDTO[] = [
    {
      timeStart: new Date(now - 1000 * 60 * 60 * 24 * 3 - 1000 * 60 * 60 * 14),
      timeEnd: new Date(now - 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 60 * 3),
    },
    { timeStart: new Date(now - 1000 * 60 * 60), timeEnd: new Date(now) },
    { timeStart: new Date(now - 5000 * 60 * 60), timeEnd: new Date(now - 3000 * 60 * 60) },
    { timeStart: new Date(now - 10000 * 60 * 60), timeEnd: new Date(now - 8500 * 60 * 60) },
    { timeStart: new Date(tomorow - 1000 * 60 * 60), timeEnd: new Date(tomorow) },
    {
      timeStart: new Date(tomorow - 5000 * 60 * 60),
      timeEnd: new Date(tomorow - 3000 * 60 * 60),
    },
    {
      timeStart: new Date(tomorow - 10000 * 60 * 60),
      timeEnd: new Date(tomorow - 8500 * 60 * 60),
    },
  ];
  let timeAnswers: TimeRangeDTO[] = [
    {
      timeStart: new Date(now - 1000 * 60 * 60 * 24 * 3 - 1000 * 60 * 60 * 14),
      timeEnd: new Date(now - 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 60 * 3),
    },
    {
      timeStart: new Date(now - 1000 * 60 * 60 * 24 * 3 - 1000 * 60 * 60 * 14),
      timeEnd: new Date(now - 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 60 * 3),
    },
    {
      timeStart: new Date(now - 1000 * 60 * 60 * 24 * 3 - 1000 * 60 * 60 * 14),
      timeEnd: new Date(now - 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 60 * 3),
    },
    {
      timeStart: new Date(now - 1000 * 60 * 60 * 24 * 3 - 1000 * 60 * 60 * 14),
      timeEnd: new Date(now - 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 60 * 3),
    },
    {
      timeStart: new Date(now - 1000 * 60 * 60 * 24 * 3 - 1000 * 60 * 60 * 14),
      timeEnd: new Date(now - 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 60 * 3),
    },
    {
      timeStart: new Date(now - 1000 * 60 * 60 * 24 * 3 - 1000 * 60 * 60 * 14),
      timeEnd: new Date(now - 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 60 * 3),
    },
    {
      timeStart: new Date(now - 1000 * 60 * 60 * 24 * 3 - 1000 * 60 * 60 * 14),
      timeEnd: new Date(now - 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 60 * 3),
    },
    {
      timeStart: new Date(now - 1000 * 60 * 60 * 24 * 3 - 1000 * 60 * 60 * 14),
      timeEnd: new Date(now - 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 60 * 3),
    },
    {
      timeStart: new Date(now - 1000 * 60 * 60 * 24 * 3 - 1000 * 60 * 60 * 14),
      timeEnd: new Date(now - 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 60 * 3),
    },
    {
      timeStart: new Date(now - 1000 * 60 * 60 * 24 * 3 - 1000 * 60 * 60 * 14),
      timeEnd: new Date(now - 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 60 * 3),
    },
    {
      timeStart: new Date(now - 1000 * 60 * 60 * 24 * 3 - 1000 * 60 * 60 * 14),
      timeEnd: new Date(now - 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 60 * 3),
    },
    { timeStart: new Date(now - 500 * 60 * 60), timeEnd: new Date(now) },
    { timeStart: new Date(now - 500 * 60 * 60), timeEnd: new Date(now) },
    { timeStart: new Date(now - 4500 * 60 * 60), timeEnd: new Date(now - 3500 * 60 * 60) },
    { timeStart: new Date(now - 10000 * 60 * 60), timeEnd: new Date(now - 9000 * 60 * 60) },
    { timeStart: new Date(now - 400 * 60 * 60), timeEnd: new Date(now) },
    { timeStart: new Date(now - 4500 * 60 * 60), timeEnd: new Date(now - 3500 * 60 * 60) },
    { timeStart: new Date(now - 10000 * 60 * 60), timeEnd: new Date(now - 9000 * 60 * 60) },
    { timeStart: new Date(tomorow - 500 * 60 * 60), timeEnd: new Date(tomorow) },
    {
      timeStart: new Date(tomorow - 4500 * 60 * 60),
      timeEnd: new Date(tomorow - 3500 * 60 * 60),
    },
    {
      timeStart: new Date(tomorow - 10000 * 60 * 60),
      timeEnd: new Date(tomorow - 9000 * 60 * 60),
    },
  ];
  return (
    <Container fluid className="ml-5 ml-sm-auto">
      <Row className="justify-content-center mt-4">
        <Col>
          <TimeGrid
            primaryLabel="23.04"
            secondaryLabel="Thursday"
            boxSizes={36}
            addRanges={() => {}}
          />
        </Col>
        <Col>
          <TimeGrid
            primaryLabel="24.04"
            secondaryLabel="Friday"
            boxSizes={36}
            addRanges={() => {}}
          />
        </Col>
        <Col>
          <TimeGrid
            primaryLabel="25.04"
            secondaryLabel="Saturday"
            boxSizes={36}
            addRanges={() => {}}
          />
        </Col>
        <Col>
          <TimeGrid
            primaryLabel="26.04"
            secondaryLabel="Sunday"
            boxSizes={36}
            addRanges={() => {}}
          />
        </Col>
        <Col>
          <TimeGrid
            primaryLabel="27.04"
            secondaryLabel="Monday"
            boxSizes={36}
            addRanges={() => {}}
          />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col>
          <UserTimeGrid
            primaryLabel="23.04"
            disabled={false}
            secondaryLabel="Thursday"
            boxSizes={36}
            addRanges={() => {}}
            lockedRanges={[
              {
                from: '00:00',
                to: '23:50',
              },
            ]}
          />
        </Col>
        <Col>
          <UserTimeGrid
            disabled={false}
            primaryLabel="24.04"
            secondaryLabel="Friday"
            boxSizes={36}
            addRanges={() => {}}
            lockedRanges={[
              {
                from: '00:00',
                to: '02:50',
              },
              {
                from: '12:00',
                to: '13:50',
              },
              {
                from: '16:00',
                to: '18:00',
              },
            ]}
          />
        </Col>
        <Col>
          <UserTimeGrid
            disabled={false}
            primaryLabel="24.04"
            secondaryLabel="Friday"
            boxSizes={36}
            addRanges={() => {}}
            lockedRanges={[
              {
                from: '01:00',
                to: '14:00',
              },
              {
                from: '15:00',
                to: '19:30',
              },
            ]}
          />
        </Col>
        <Col>
          <UserTimeGrid
            disabled={false}
            primaryLabel="24.04"
            secondaryLabel="Friday"
            boxSizes={36}
            addRanges={() => {}}
            lockedRanges={[
              {
                from: '01:00',
                to: '01:15',
              },
              {
                from: '01:45',
                to: '01:55',
              },
              {
                from: '14:15',
                to: '14:45',
              },
            ]}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <MeetingTime
            meetingId={0}
            attendeeId={0}
            timeRanges={timeRanges}
            answers={timeAnswers}
            numberOfParticipants={10}
            isOrganizer={true}
          />
        </Col>
      </Row>
      <h3>Disabled</h3>
      <Row>
        <Col>
          <MeetingTime
            meetingId={0}
            attendeeId={0}
            timeRanges={timeRanges}
            answers={timeAnswers}
            disabled={true}
            numberOfParticipants={10}
            isOrganizer={true}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Time;
