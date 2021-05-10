import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import CalendarIcon from '../common/Icons/CalendarIcon';
import style from './NameAndDesctiption.module.css';
import TimeGrid from '../TimeGrid/TimeGrid';

const ChooseTime = () => {
  return (
    <div>
      <Row className="justify-content-center mt-5">
        <Col xs="auto">
          <CalendarIcon />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <div className={style.createHeader}>Set the time of the meeting</div>
      </Row>
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
    </div>
  );
};

export default ChooseTime;
