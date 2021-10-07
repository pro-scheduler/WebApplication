import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import { UserSummary } from '../../model/user/ProUser';
import ModuleCard from '../../components/HomePage/ModuleCard';
import { BsEnvelope, BsPencil } from 'react-icons/bs';
import { FaRegClipboard } from 'react-icons/fa';
import { HomeInfo, MeetingSummary } from '../../model/meeting/Meeting';
import { getHomeInfo } from '../../API/meeting/meetingService';
import UpcomingMeeting from '../../components/HomePage/UpcomingMeeting';
import Carousel from 'react-bootstrap/Carousel';
import RightArrowButton from '../../components/common/NextButton/RightArrowButton';
import LeftArrowButton from '../../components/common/NextButton/LeftArrowButton';
import useWindowDimensions from '../../components/common/window/WindowDimension';

const HomePage = ({ user }: { user: UserSummary }) => {
  const [homeInfo, setHomeInfo] = useState<HomeInfo>();
  // eslint-disable-next-line
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    getHomeInfo(setHomeInfo);
  }, []);

  return (
    <Container fluid>
      <Row className="justify-content mt-5 ml-3">
        <Col lg={12} className={styles.welcomeHeader}>
          Welcome back, {user.username}!
        </Col>
      </Row>
      {homeInfo && (
        <Row className="justify-content-center mt-4 mb-5">
          <Col lg={12} className="text-center mt-5">
            <Carousel
              interval={null}
              nextIcon={<RightArrowButton onclick={() => void 0} disabled={false} />}
              prevIcon={<LeftArrowButton onclick={() => void 0} disabled={false} />}
              controls={width > 1100}
            >
              {homeInfo.upcomingMeetings.map((meeting: MeetingSummary) => (
                <Carousel.Item key={meeting.id}>
                  <UpcomingMeeting meeting={meeting} />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      )}
      <Row className="justify-content-center mt-4 mb-5">
        <Col lg={4} className="text-center mt-5">
          <ModuleCard
            icon={<BsPencil />}
            number={homeInfo ? homeInfo.declarations : 0}
            name={'Declarations'}
            redirectTo={'/declarations'}
          />
        </Col>
        <Col lg={4} className="text-center mt-5">
          <ModuleCard
            icon={<BsEnvelope />}
            number={homeInfo ? homeInfo.invitations : 0}
            name={'Invitations'}
            redirectTo={'/invitations'}
          />
        </Col>
        <Col lg={4} className="text-center mt-5">
          <ModuleCard
            icon={<FaRegClipboard />}
            number={homeInfo ? homeInfo.surveys : 0}
            name={'Surveys'}
            redirectTo={'surveys'}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
