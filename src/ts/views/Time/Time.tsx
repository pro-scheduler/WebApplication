import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import TimeGrid from '../../components/TimeGrid/TimeGrid';
const Time = () => {
  return (
    <Container fluid className="ml-5 ml-sm-auto">
      <Row className="justify-content-center mt-4">
        <Col>
          <TimeGrid primaryLabel="23.04" secondaryLabel="Thursday" boxSizes={36} />
        </Col>
        <Col>
          <TimeGrid primaryLabel="24.04" secondaryLabel="Friday" boxSizes={36} />
        </Col>
        <Col>
          <TimeGrid primaryLabel="25.04" secondaryLabel="Saturday" boxSizes={36} />
        </Col>
        <Col>
          <TimeGrid primaryLabel="26.04" secondaryLabel="Sunday" boxSizes={36} />
        </Col>
        <Col>
          <TimeGrid primaryLabel="27.04" secondaryLabel="Monday" boxSizes={36} />
        </Col>
      </Row>
    </Container>
  );
};

export default Time;
