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
import UserTimeGrid from '../../components/UserTimeGrid/UserTimeGrid';

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const HomePage = ({
  user,
  setInvitationsCount,
  setSurveyCount,
}: {
  user: UserSummary;
  setInvitationsCount: Function;
  setSurveyCount: Function;
}) => {
  const [homeInfo, setHomeInfo] = useState<UserHomePageDetails>();
  const [surveys, setSurveys] = useState<BasicUserSurveyInfo[]>([]);
  const [declarations, setDeclarations] = useState<DeclarationDetails[]>([]);
  // eslint-disable-next-line
  const { width, height } = useWindowDimensions();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  useEffect(() => {
    getUserHomePageDetails(setHomeInfo);
    getUserSurveys(setSurveys);
    loadUserDeclarations(setDeclarations);
  }, []);
  useEffect(() => {
    setInvitationsCount(homeInfo ? homeInfo.invitationCount : 0);
  }, [homeInfo, setInvitationsCount]);
  useEffect(() => {
    setSurveyCount(surveys.length);
  }, [surveys, setSurveyCount]);

  const events = homeInfo
    ? homeInfo.meetings
        .filter(
          (meeting: MeetingDetails) =>
            new Date(meeting.finalDate.timeStart).getDate() === new Date().getDate()
        )
        .map((meeting: MeetingDetails) => {
          return {
            from:
              new Date(meeting.finalDate.timeStart).getHours() +
              ':' +
              new Date(meeting.finalDate.timeStart).getMinutes(),
            to:
              new Date(meeting.finalDate.timeEnd).getHours() +
              ':' +
              new Date(meeting.finalDate.timeEnd).getMinutes(),
            label: meeting.name,
            meetingId: meeting.id,
            key: meeting.id,
          };
        })
    : [];

  return (
    <Container fluid>
      <Row className="justify-content mt-5 ml-3">
        <Col lg={12} className={styles.welcomeHeader}>
          Welcome back, {' ' + user.username}!
        </Col>
      </Row>
      <Row className="justify-content-center mt-0 mb-5">
        <Col lg={12} className={styles.homePageContainer}>
          <div className={styles.upcomingMeetings}>
            {homeInfo && homeInfo.upcomingMeetings.length > 0 ? (
              <Carousel
                activeIndex={currentSlide}
                interval={null}
                controls={width > 1100}
                keyboard={true}
                touch={true}
              >
                {homeInfo.upcomingMeetings.map((meeting: MeetingDetails) => (
                  <Carousel.Item key={meeting.id}>
                    <UpcomingMeeting meeting={meeting} />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <div className={styles.noMeetingsInfoContainer}>
                <div className={styles.noMeetingsInfo}>You don't have any upcoming meetings</div>
              </div>
            )}
            {homeInfo && (
              <div className={styles.arrowSet}>
                <div
                  hidden={homeInfo ? homeInfo.upcomingMeetings.length < 2 : false}
                  className={styles.arrowLeft}
                >
                  <LeftArrowButton
                    style={{ backgroundColor: 'white' }}
                    onclick={() =>
                      setCurrentSlide(
                        currentSlide - 1 < 0
                          ? homeInfo
                            ? homeInfo.upcomingMeetings.length - 1
                            : 0
                          : currentSlide - 1
                      )
                    }
                    disabled={false}
                  />
                </div>
                <div
                  hidden={homeInfo ? homeInfo.upcomingMeetings.length < 2 : false}
                  className={styles.arrowRight}
                >
                  <RightArrowButton
                    style={{ backgroundColor: 'white' }}
                    onclick={() =>
                      setCurrentSlide(
                        (currentSlide + 1) % (homeInfo ? homeInfo.upcomingMeetings.length : 1)
                      )
                    }
                    disabled={false}
                  />
                </div>
              </div>
            )}
          </div>
          <div className={styles.moduleCards}>
            <ModuleCard
              icon={<BsPencil />}
              number={declarations.length}
              name={declarations.length === 1 ? 'Declaration' : 'Declarations'}
              redirectTo={'/declarations'}
            />
            <ModuleCard
              icon={<BsEnvelope />}
              number={homeInfo ? homeInfo.invitationCount : 0}
              name={homeInfo?.invitationCount === 1 ? 'Invitation' : 'Invitations'}
              redirectTo={'/invitations'}
            />
            <ModuleCard
              icon={<FaRegClipboard />}
              number={surveys.length}
              name={surveys.length === 1 ? 'Survey' : 'Surveys'}
              redirectTo={'surveys'}
            />
          </div>
          <div className={styles.todayMeetings}>
            <UserTimeGrid
              primaryLabel={
                ('0' + new Date().getDate()).slice(-2) +
                '.' +
                ('0' + (new Date().getMonth() + 1)).slice(-2)
              }
              disabled={true}
              secondaryLabel={weekDays[new Date().getDay()]}
              boxSizes={36}
              addRanges={() => {}}
              lockedRanges={events}
              fixedHeight={true}
              fixedHeightValue={630}
              showCurrentTime={true}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
