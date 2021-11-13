import React, { useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NameAndDescription from '../../components/CreateMeeting/NameAndDescription';
import CreateSurvey from '../../components/CreateSurvey/CreateSurvey';
import CreateInvitations from '../../components/CreateMeeting/CreateInvitations';
import ChooseTime from '../../components/CreateMeeting/ChooseTime';
import ActionButton from '../../components/common/SubmitButton/ActionButton/ActionButton';
import { ValueLabelPair } from '../../model/utils/ValueLabelPair';
import OnlineDetails from '../../components/CreateMeeting/OnlineDetails';
import { required } from '../../tools/validator';
import { TimeRangeDTO } from '../../model/TimeRangeDTO';
import { SurveyWithQuestionsDTO } from '../../model/survey/Survey';
import MeetingNavbar from '../../components/CreateMeeting/MeetingNavbar';
import styles from './CreateMeeting.module.css';
import { saveMeeting } from '../../API/meeting/meetingService';
import { ApiCall } from '../../API/genericApiCalls';
import { createInvitations } from '../../API/invitation/invitationService';
import { createSurvey } from '../../API/survey/surveyService';
import LoadingSpinner from '../../components/common/Spinner/LoadingSpinner';
import { useHistory } from 'react-router';
import ChooseModules from '../../components/CreateMeeting/ChooseModules';
import { CreateMeetingRequest, MeetingModuleType, MeetingType } from '../../model/meeting/Meeting';
import ChoosePlace from '../../components/CreateMeeting/ChoosePlace/ChoosePlace';
import { PlaceDTO } from '../../model/geo/Geo';
import { savePlaces } from '../../API/geo/geo';
import ChooseRealOnlinePlace from '../../components/CreateMeeting/ChooseRealOnlinePlace';
import ScrollUpIcon from '../../components/common/Icons/ScrollUpIcon';
import {
  CreateInvitationsResponse,
  FailedInvitationDetails,
  InvitationDetails,
} from '../../model/invitation/Invitation';
import { toastError, toastSuccess } from '../../tools/messagesInvocator';

enum CreateMeetingState {
  CHOOSE_MEETING_TYPE,
  CHOOSE_MEETING_MODULES,
  CONFIGURE_MEETING,
}

export enum MeetingConfigurationSection {
  ABOUT = 0,
  INVITATIONS = 1,
  TIME = 2,
  PLACE = 3,
  SURVEY = 4,
  SUMMARY = 5,
}

const REAL_MEETING_AVAILABLE_MODULES: MeetingModuleType[] = [
  MeetingModuleType.TIME_VOTING,
  MeetingModuleType.PLACE_VOTING,
  MeetingModuleType.SURVEY,
  MeetingModuleType.DECLARATIONS,
];

const ONLINE_MEETING_AVAILABLE_MODULES: MeetingModuleType[] = [
  MeetingModuleType.TIME_VOTING,
  MeetingModuleType.SURVEY,
  MeetingModuleType.DECLARATIONS,
];

const DEFAULT_AVAILABLE_SECTIONS: MeetingConfigurationSection[] = [
  MeetingConfigurationSection.ABOUT,
  MeetingConfigurationSection.INVITATIONS,
  // MeetingConfigurationSection.TIME, TODO: uncomment when final time support added
  // MeetingConfigurationSection.PLACE, TODO: uncomment when final place support added
  MeetingConfigurationSection.SUMMARY,
];

const CreateMeeting = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [emails, setEmails] = useState<ValueLabelPair[]>([]);
  const [invitationMessage, setInvitationMessage] = useState<string>('');
  const [onlineLink, setOnlineLink] = useState<string>('');
  const [onlinePassword, setOnlinePassword] = useState<string>('');
  const [invalidNameDesc, setInvalidNameDesc] = useState(false);
  const [timeRanges, setTimeRanges] = useState<TimeRangeDTO[]>([]);
  const [deadlineDate, setDeadlineDate] = useState<Date | undefined>(undefined);
  const history = useHistory();
  const [meetingId, setMeetingId] = useState<{ id: number | undefined }>({ id: undefined });
  const [saveMeetingResponse, setSaveMeetingResponse] = useState<ApiCall>(new ApiCall());
  const [saveInvitationsResponse, setSaveInvitationsResponse] = useState<ApiCall>(new ApiCall());
  const [invitationsResponse, setInvitationsResponse] = useState<CreateInvitationsResponse>();
  const [saveSurveyResponse, setSaveSurveyResponse] = useState<ApiCall>(new ApiCall());
  const [savePlacesResponse, setSavePlacesResponse] = useState<ApiCall>(new ApiCall());
  const [selectedPlaces, setSelectedPlaces] = useState<PlaceDTO[]>([]);
  const [survey, setSurvey] = useState<SurveyWithQuestionsDTO>({
    description: '',
    meetingId: -1,
    questions: [],
  });

  const [chosenMeetingType, setChosenMeetingType] = useState<MeetingType>(MeetingType.REAL);
  const [availableModules, setAvailableModules] = useState<MeetingModuleType[]>(
    REAL_MEETING_AVAILABLE_MODULES
  );
  const [chosenModules, setChosenModules] = useState<MeetingModuleType[]>([]);
  const [
    availableMeetingConfigurationSections,
    setAvailableMeetingConfigurationSections,
  ] = useState<MeetingConfigurationSection[]>(DEFAULT_AVAILABLE_SECTIONS);
  const [
    currentMeetingConfigurationSection,
    setCurrentMeetingConfigurationSection,
  ] = useState<MeetingConfigurationSection>(availableMeetingConfigurationSections[0]);
  const [currentCreateMeetingState, setCurrentMeetingState] = useState<CreateMeetingState>(
    CreateMeetingState.CHOOSE_MEETING_TYPE
  );
  const container = useRef<HTMLDivElement>(null);
  const navbar = useRef<HTMLDivElement>(null);
  const getCreatedMeetingType = () => {
    return onlineLink === '' ? MeetingType.REAL : MeetingType.ONLINE;
  };

  const switchChosenMeetingType = (meetingType: MeetingType) => {
    setChosenMeetingType(meetingType);
    setAvailableModules(
      meetingType === MeetingType.REAL
        ? REAL_MEETING_AVAILABLE_MODULES
        : ONLINE_MEETING_AVAILABLE_MODULES
    );
  };

  const switchChosenModule = (module: MeetingModuleType) => {
    if (chosenModules.includes(module)) {
      setChosenModules(chosenModules.filter((m) => m !== module));
    } else {
      setChosenModules(chosenModules.concat(module));
    }
  };

  const isSectionChosen = (section: MeetingConfigurationSection) =>
    currentMeetingConfigurationSection === section ||
    (currentMeetingConfigurationSection === MeetingConfigurationSection.SUMMARY &&
      availableMeetingConfigurationSections.includes(section));

  const saveThisMeeting = () => {
    const createRequest: CreateMeetingRequest = {
      name: name,
      description: description,
      type: getCreatedMeetingType(),
      availableTimeRanges: timeRanges,
      markTimeRangeDeadline: deadlineDate,
      link: onlineLink,
      password: onlinePassword,
      availableModules: chosenModules,
    };
    saveMeeting(
      createRequest,
      setMeetingId,
      setSaveMeetingResponse,
      'Meeting created successfully'
    );
  };

  // eslint-disable
  const toAvailableMeetingConfigurationSections = (chosenModules: MeetingModuleType[]) => {
    const availableSections: MeetingConfigurationSection[] = ([] as MeetingConfigurationSection[]).concat(
      DEFAULT_AVAILABLE_SECTIONS
    );

    if (chosenModules.includes(MeetingModuleType.SURVEY)) {
      availableSections.push(MeetingConfigurationSection.SURVEY);
    }

    if (chosenModules.includes(MeetingModuleType.TIME_VOTING)) {
      availableSections.push(MeetingConfigurationSection.TIME);
    }

    if (chosenModules.includes(MeetingModuleType.PLACE_VOTING)) {
      availableSections.push(MeetingConfigurationSection.PLACE);
    }

    return availableSections.sort((a, b) => a - b);
  };

  useEffect(() => {
    if (
      currentCreateMeetingState === CreateMeetingState.CONFIGURE_MEETING &&
      currentMeetingConfigurationSection === MeetingConfigurationSection.SUMMARY &&
      container &&
      container.current
    ) {
      container.current.scrollIntoView();
    }
    // eslint-disable-next-line
  }, [currentMeetingConfigurationSection]);

  useEffect(() => {
    if (
      meetingId.id !== undefined &&
      (emails.length === 0 ||
        saveInvitationsResponse.isSuccess ||
        saveInvitationsResponse.isFailed) &&
      (survey.questions.length === 0 ||
        saveSurveyResponse.isSuccess ||
        saveSurveyResponse.isFailed) &&
      (chosenMeetingType === MeetingType.ONLINE ||
        selectedPlaces.length === 0 ||
        savePlacesResponse.isSuccess ||
        savePlacesResponse.isFailed)
    ) {
      history.push('/meetings/' + meetingId.id);
    }
    // eslint-disable-next-line
  }, [meetingId, saveInvitationsResponse, saveSurveyResponse, savePlacesResponse]);

  useEffect(() => {
    if (meetingId.id !== undefined && saveMeetingResponse.isSuccess) {
      const createInvitationsRequest = {
        meetingId: meetingId.id,
        emails: emails.map((valueLabelPair: ValueLabelPair) => valueLabelPair.label.toString()),
        message: invitationMessage,
      };
      if (createInvitationsRequest.emails.length > 0) {
        createInvitations(
          createInvitationsRequest,
          setSaveInvitationsResponse,
          setInvitationsResponse
        );
      }
      if (survey.questions.length > 0) {
        createSurvey(meetingId.id, survey, setSaveSurveyResponse);
      }
      if (chosenMeetingType === MeetingType.REAL && selectedPlaces.length > 0) {
        savePlaces(selectedPlaces, meetingId.id, setSavePlacesResponse);
      }
      setSaveMeetingResponse({ ...saveMeetingResponse, isSuccess: false });
    }
    // eslint-disable-next-line
  }, [meetingId.id]);

  useEffect(() => {
    if (invitationsResponse) {
      if (invitationsResponse.createdInvitations.length > 0) {
        const createdInvitationsEmails: string = invitationsResponse.createdInvitations
          .map((invitationDetails: InvitationDetails) => invitationDetails.user.email)
          .reduce((result: string, value: string) => result + ' ' + value);
        toastSuccess(
          'Invitations for ' + createdInvitationsEmails + ' have been send successfully'
        );
      }
      invitationsResponse.failedInvitationDetails.forEach(
        (failedInvitation: FailedInvitationDetails) => toastError(failedInvitation.cause)
      );
    }
  }, [invitationsResponse]);

  const setPreviousMeetingConfigurationSection = () => {
    const index: number = availableMeetingConfigurationSections.indexOf(
      currentMeetingConfigurationSection
    );

    const previousSectionIdx = Math.max(index - 1, 0);
    setCurrentMeetingConfigurationSection(
      availableMeetingConfigurationSections[previousSectionIdx]
    );
  };

  const setNextConfigurationSection = () => {
    const index: number = availableMeetingConfigurationSections.indexOf(
      currentMeetingConfigurationSection
    );

    const nextSectionIdx = Math.min(index + 1, availableMeetingConfigurationSections.length - 1);
    setCurrentMeetingConfigurationSection(availableMeetingConfigurationSections[nextSectionIdx]);
  };

  const scrollToNavbar = () => {
    if (navbar && navbar.current) {
      navbar.current.scrollIntoView();
    }
  };

  return (
    <Container>
      {currentCreateMeetingState === CreateMeetingState.CHOOSE_MEETING_TYPE && (
        <ChooseRealOnlinePlace
          onNavigateToNextSection={() =>
            setCurrentMeetingState(CreateMeetingState.CHOOSE_MEETING_MODULES)
          }
          chosenMeetingType={chosenMeetingType}
          setChosenMeetingType={switchChosenMeetingType}
        />
      )}
      {currentCreateMeetingState === CreateMeetingState.CHOOSE_MEETING_MODULES && (
        <ChooseModules
          onNavigateToNextSection={() => {
            setAvailableMeetingConfigurationSections(
              toAvailableMeetingConfigurationSections(chosenModules)
            );
            setCurrentMeetingState(CreateMeetingState.CONFIGURE_MEETING);
          }}
          availableModules={availableModules}
          chosenModules={chosenModules}
          onModuleChosen={switchChosenModule}
        />
      )}
      {currentCreateMeetingState === CreateMeetingState.CONFIGURE_MEETING && (
        <>
          <div ref={navbar}>
            <MeetingNavbar
              nameFilled={name.length >= 5}
              participantsFilled={emails.length > 0}
              surveyFilled={survey.questions.length > 0}
              timeFilled={timeRanges.length > 0}
              placeFilled={onlineLink !== '' || selectedPlaces.length > 0}
              onLeftClick={setPreviousMeetingConfigurationSection}
              onRightClick={setNextConfigurationSection}
              availableSections={availableMeetingConfigurationSections}
              currentSection={currentMeetingConfigurationSection}
              onSectionChosen={setCurrentMeetingConfigurationSection}
            />
          </div>
          <NameAndDescription
            visible={isSectionChosen(MeetingConfigurationSection.ABOUT)}
            setName={setName}
            setDescription={setDescription}
            setInvalidNameDesc={setInvalidNameDesc}
          />
          <ChooseTime
            visible={isSectionChosen(MeetingConfigurationSection.TIME)}
            setSelectedRanges={setTimeRanges}
            setDeadlineDate={setDeadlineDate}
          />
          <CreateInvitations
            visible={isSectionChosen(MeetingConfigurationSection.INVITATIONS)}
            showIcon={true}
            emails={emails}
            setEmails={setEmails}
            setInvitationMessage={setInvitationMessage}
          />
          <OnlineDetails
            visible={
              isSectionChosen(MeetingConfigurationSection.PLACE) &&
              chosenMeetingType === MeetingType.ONLINE
            }
            setOnlineLink={setOnlineLink}
            setOnlinePassword={setOnlinePassword}
          />
          <ChoosePlace
            visible={
              isSectionChosen(MeetingConfigurationSection.PLACE) &&
              chosenMeetingType !== MeetingType.ONLINE
            }
            setSelectedPlaces={setSelectedPlaces}
          />
          <CreateSurvey
            visible={isSectionChosen(MeetingConfigurationSection.SURVEY)}
            survey={survey}
            setSurvey={setSurvey}
          />
          {isSectionChosen(MeetingConfigurationSection.SUMMARY) && (
            <>
              <Row className="justify-content-center">
                <Col>
                  <hr className={styles.hrLine} />
                </Col>
              </Row>

              <Row className="justify-content-center mt-5 mb-4">
                <Col lg={12} className="text-center">
                  <div ref={container}>
                    <ActionButton
                      text="Create meeting"
                      onclick={saveThisMeeting}
                      disabled={invalidNameDesc || !required()(name)}
                      className={styles.saveMeetingButton}
                    />
                  </div>
                </Col>
              </Row>
            </>
          )}
        </>
      )}
      <Row className="justify-content-center mt-4">
        <Col className="text-center mt-5">
          <LoadingSpinner
            active={
              saveMeetingResponse.isLoading ||
              saveInvitationsResponse.isLoading ||
              saveSurveyResponse.isLoading ||
              savePlacesResponse.isLoading
            }
          />
          {currentCreateMeetingState === CreateMeetingState.CONFIGURE_MEETING && (
            <div className={styles.scrollButton} onClick={scrollToNavbar}>
              <ScrollUpIcon />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CreateMeeting;
