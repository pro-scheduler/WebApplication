import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import TimeGrid from '../../components/TimeGrid/TimeGrid';
import UserTimeGrid from '../../components/UserTimeGrid/UserTimeGrid';
const Time = () => {
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
    </Container>
  );
};

export default Time;
