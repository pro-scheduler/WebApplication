import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import { UserSummary } from '../../model/user/ProUser';
import ModuleCard from '../../components/HomePage/ModuleCard';
import { BsEnvelope, BsPencil } from 'react-icons/bs';
import { FaRegClipboard } from 'react-icons/fa';
import { UserHomePageDetails, MeetingDetails } from '../../model/meeting/Meeting';
import { getUserHomePageDetails } from '../../API/meeting/meetingService';
import UpcomingMeeting from '../../components/HomePage/UpcomingMeeting';
import Carousel from 'react-bootstrap/Carousel';
import RightArrowButton from '../../components/common/NextButton/RightArrowButton';
import LeftArrowButton from '../../components/common/NextButton/LeftArrowButton';
import useWindowDimensions from '../../components/common/window/WindowDimension';
import { getUserSurveys } from '../../API/survey/surveyService';
import { BasicUserSurveyInfo } from '../../model/survey/Survey';
import { DeclarationDetails } from '../../model/declaration/Declaration';
import { loadUserDeclarations } from '../../API/declarations/declarationsService';

const HomePage = ({ user }: { user: UserSummary }) => {
  const [homeInfo, setHomeInfo] = useState<UserHomePageDetails>();
  const [surveys, setSurveys] = useState<BasicUserSurveyInfo[]>([]);
  const [declarations, setDeclarations] = useState<DeclarationDetails[]>([]);
  // eslint-disable-next-line
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    getUserHomePageDetails(setHomeInfo);
    getUserSurveys(setSurveys);
    loadUserDeclarations(setDeclarations);
  }, []);

  return (
    <Container fluid>
      <Row className="justify-content mt-5 ml-3">
        <Col lg={12} className={styles.welcomeHeader}>
          Welcome back, {user.username}!
        </Col>
      </Row>
      <Row className="justify-content-center mt-4 mb-5">
        <Col lg={12} className="text-center mt-5">
          {homeInfo && homeInfo.upcomingMeetings.length > 0 ? (
            <Carousel
              interval={null}
              nextIcon={<RightArrowButton onclick={() => void 0} disabled={false} />}
              prevIcon={<LeftArrowButton onclick={() => void 0} disabled={false} />}
              controls={width > 1100}
            >
              {homeInfo.upcomingMeetings.map((meeting: MeetingDetails) => (
                <Carousel.Item key={meeting.id}>
                  <UpcomingMeeting meeting={meeting} />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <div className={styles.noMeetingsInfo}>You don't have any upcoming meetings</div>
          )}
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-5 mb-5">
        <Col xs lg={3} className="text-center mt-5">
          <ModuleCard
            icon={<BsPencil />}
            number={declarations.length}
            name={declarations.length === 1 ? 'Declaration' : 'Declarations'}
            redirectTo={'/declarations'}
          />
        </Col>
        <Col xs lg={3} className="text-center mt-5">
          <ModuleCard
            icon={<BsEnvelope />}
            number={homeInfo ? homeInfo.invitationCount : 0}
            name={homeInfo?.invitationCount === 1 ? 'Invitation' : 'Invitations'}
            redirectTo={'/invitations'}
          />
        </Col>
        <Col xs lg={3} className="text-center mt-5">
          <ModuleCard
            icon={<FaRegClipboard />}
            number={surveys.length}
            name={surveys.length === 1 ? 'Survey' : 'Surveys'}
            redirectTo={'surveys'}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
