import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TimeRangeDTO } from '../../../model/TimeRangeDTO';
import UserTimePicker from '../../UserTimeGrid/UserTimePicker';
import { useEffect, useState } from 'react';
import useWindowDimensions from '../../common/window/WindowDimension';
import SwitchButton from '../../common/SwitchButton/SwitchButton';
import AnswersTimePicker from '../../UserTimeGrid/AnswersTimePicker';
import styles from './MeetingTime.module.css';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';
import { saveUserTimeRanges } from '../../../API/meeting/meetingService';
import { RiPencilFill } from 'react-icons/ri';
import { BsFillPieChartFill } from 'react-icons/bs';
import { MeetingAttendeeDetails, MeetingState } from '../../../model/meeting/Meeting';
import EditDeadline from './EditDeadline/EditDeadline';

export type MeetingTimeProps = {
  meetingId: number;
  attendeeId: number;
  timeRanges: TimeRangeDTO[];
  timeDeadline?: Date;
  answers?: TimeRangeDTO[];
  userRanges?: TimeRangeDTO[];
  setUser?: Function;
  numberOfParticipants: number;
  isOrganizer: boolean;
  state: MeetingState;
  setNewDeadline: Function;
  canSeeVotingResults?: boolean;
};

interface RangesWithDay {
  [key: string]: { ranges: Array<{ from: string; to: string }>; date: Date };
}

const MeetingTime = ({
  meetingId,
  attendeeId,
  answers,
  timeRanges,
  userRanges = [],
  setUser = () => {},
  timeDeadline,
  numberOfParticipants,
  isOrganizer,
  state,
  setNewDeadline,
  canSeeVotingResults = false,
}: MeetingTimeProps) => {
  const [selectedRanges, setSelectedRanges] = useState<RangesWithDay>({});
  const [userDefaultAnswers, setUserDefaultAnswers] = useState<RangesWithDay>({});
  const [availableRanges, setAvailableRanges] = useState<RangesWithDay>({});
  const [userAnswers, setUserAnswers] = useState<RangesWithDay>({});
  const [preferencesChanged, setPreferencesChanged] = useState<Boolean>(false);
  const [deadlineExceeded, setDeadlineExceeded] = useState<Boolean>(true);
  // eslint-disable-next-line
  const [openedDeadlineEditing, setOpenedDeadlineEditing] = useState<boolean>(false);
  // eslint-disable-next-line
  const { height, width } = useWindowDimensions();
  const [displayAnswers, setDisplayAnswers] = useState<Boolean>(false);
  const setRanges = (date: string, ranges: Array<{ from: string; to: string }>, day: Date) => {
    let ran: RangesWithDay = {
      ...selectedRanges,
    };
    ran[date] = { ranges: ranges, date: day };
    setSelectedRanges({ ...ran });
  };

  useEffect(() => {
    if (timeDeadline)
      setDeadlineExceeded(new Date().getTime() - new Date(timeDeadline).getTime() > 0);
    else setDeadlineExceeded(false);
  }, [timeDeadline]);

  const saveTime = () => {
    let rangesFiltered: TimeRangeDTO[] = [];
    for (let key in selectedRanges) {
      if (selectedRanges[key].ranges.length > 0) {
        selectedRanges[key].ranges.forEach((range) => {
          let from: Date = new Date(selectedRanges[key].date);
          let to: Date = new Date(selectedRanges[key].date);
          from.setHours(parseInt(range.from.split(':')[0]), parseInt(range.from.split(':')[1]));
          to.setHours(parseInt(range.to.split(':')[0]), parseInt(range.to.split(':')[1]));
          rangesFiltered.push({ timeStart: from, timeEnd: to });
        });
      }
    }
    saveUserTimeRanges(meetingId, attendeeId, rangesFiltered, (user: MeetingAttendeeDetails) => {
      setUser(user);
      setPreferencesChanged(false);
    });
  };
  useEffect(() => {
    let ranges: RangesWithDay = {};
    timeRanges.sort((range1: TimeRangeDTO, range2: TimeRangeDTO) => {
      return new Date(range1.timeStart).getTime() - new Date(range2.timeStart).getTime();
    });
    timeRanges
      .map((range) => {
        const start = new Date(range.timeStart);
        const end = new Date(range.timeEnd);
        const day =
          ('0' + start.getDate()).slice(-2) +
          '.' +
          ('0' + start.getMonth()).slice(-2) +
          '.' +
          start.getFullYear();
        ranges[day] = { ranges: [], date: start };
        const from = start.getHours() + ':' + start.getMinutes();
        const to = end.getHours() + ':' + end.getMinutes();
        return { day: day, from: from, to: to };
      })
      .forEach((range) => {
        ranges[range.day].ranges.push({ from: range.from, to: range.to });
      });
    setAvailableRanges(ranges);
  }, [timeRanges, setAvailableRanges]);

  useEffect(() => {
    let ranges: RangesWithDay = {};
    if (answers) {
      answers
        .map((range) => {
          const start = new Date(range.timeStart);
          const end = new Date(range.timeEnd);
          const day =
            ('0' + start.getDate()).slice(-2) +
            '.' +
            ('0' + start.getMonth()).slice(-2) +
            '.' +
            start.getFullYear();
          ranges[day] = { ranges: [], date: start };
          const from = start.getHours() + ':' + start.getMinutes();
          const to = end.getHours() + ':' + end.getMinutes();
          return { day: day, from: from, to: to };
        })
        .forEach((range) => {
          ranges[range.day].ranges.push({ from: range.from, to: range.to });
        });
      setUserAnswers(ranges);
    }
  }, [answers, setUserAnswers]);

  useEffect(() => {
    let ranges: RangesWithDay = {};
    if (userRanges) {
      userRanges
        .map((range) => {
          const start = new Date(range.timeStart);
          const end = new Date(range.timeEnd);
          const day =
            ('0' + start.getDate()).slice(-2) +
            '.' +
            ('0' + start.getMonth()).slice(-2) +
            '.' +
            start.getFullYear();
          ranges[day] = { ranges: [], date: start };
          const from = start.getHours() + ':' + start.getMinutes();
          const to = end.getHours() + ':' + end.getMinutes();
          return { day: day, from: from, to: to };
        })
        .forEach((range) => {
          ranges[range.day].ranges.push({ from: range.from, to: range.to });
        });
      setUserDefaultAnswers(ranges);
      setSelectedRanges(ranges);
    }
  }, [userRanges, setUserDefaultAnswers]);

  return (
    <Row className="justify-content">
      <Col>
        <EditDeadline
          timeDeadline={timeDeadline}
          meetingId={meetingId}
          setDeadline={setNewDeadline}
          isOrganizer={isOrganizer}
          isMeetingOpen={state === MeetingState.OPEN}
        />
        <Col lg={12} className="text-center mx-auto">
          {canSeeVotingResults && (
            <div className={styles.switchTime}>
              <SwitchButton
                onChange={() => setDisplayAnswers(!displayAnswers)}
                checkedIcon={<RiPencilFill className={styles.switchIcon} />}
                unCheckedIcon={<BsFillPieChartFill className={styles.switchIcon} />}
                labels={['show others votes', 'show your votes']}
              />
            </div>
          )}
        </Col>
        <div style={{ marginRight: width < 576 ? 45 : 0 }}>
          {displayAnswers ? (
            <AnswersTimePicker
              availableRanges={availableRanges}
              count={width > 1290 ? 4 : width > 991 ? 3 : width > 768 ? 2 : 1}
              setRanges={setRanges}
              answers={canSeeVotingResults ? userAnswers : {}}
              disabled={true}
              numberOfParticipants={numberOfParticipants}
            />
          ) : (
            <UserTimePicker
              disabled={deadlineExceeded}
              availableRanges={availableRanges}
              selectedRanges={userDefaultAnswers}
              count={width > 1290 ? 4 : width > 991 ? 3 : width > 768 ? 2 : 1}
              setRanges={setRanges}
              setPreferencesChanged={setPreferencesChanged}
            />
          )}
        </div>
      </Col>
      {!displayAnswers && !deadlineExceeded && state === MeetingState.OPEN && (
        <Col lg={12} className="text-center mx-auto">
          <ActionButton
            text={
              userRanges && userRanges.length === 0
                ? 'Save my time preferences'
                : 'Edit my time preferences'
            }
            onclick={saveTime}
            className={styles.saveButton}
            disabled={!preferencesChanged}
          />
        </Col>
      )}
    </Row>
  );
};
export default MeetingTime;
