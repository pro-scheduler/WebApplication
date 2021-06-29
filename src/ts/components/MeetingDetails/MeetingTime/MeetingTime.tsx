import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TimeRangeDTO } from '../../../model/TimeRangeDTO';
import LineWithHeader from '../LineWithHeader';
import UserTimePicker from '../../UserTimeGrid/UserTimePicker';
import { useEffect, useState } from 'react';
import useWindowDimensions from '../../common/window/WindowDimension';
import SwitchButton from '../../common/SwitchButton/SwitchButton';
import AnswersTimePicker from '../../UserTimeGrid/AnswersTimePicker';
import styles from './MeetingTime.module.css';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';
import { saveUserTimeRanges } from '../../../API/meeting/meetingService';
export type MeetingTimeProps = {
  meetingId: number;
  timeRanges: TimeRangeDTO[];
  answers?: TimeRangeDTO[];
  disabled?: Boolean;
};

interface RangesWithDay {
  [key: string]: { ranges: Array<{ from: string; to: string }>; date: Date };
}

const MeetingTime = ({ meetingId, answers, timeRanges, disabled }: MeetingTimeProps) => {
  const [selectedRanges, setSelectedRanges] = useState<RangesWithDay>({});
  const [availableRanges, setAvailableRanges] = useState<RangesWithDay>({});
  const [userAnswers, setUserAnswers] = useState<RangesWithDay>({});
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

  const saveTime = () => {
    let rangesFiltered: TimeRangeDTO[] = [];
    for (let key in selectedRanges) {
      if (selectedRanges[key].ranges.length > 0) {
        selectedRanges[key].ranges.forEach((range) => {
          let from: Date = new Date(selectedRanges[key].date);
          let to: Date = new Date(selectedRanges[key].date);
          from.setHours(parseInt(range.from.split(':')[0]), parseInt(range.from.split(':')[1]));
          to.setHours(parseInt(range.to.split(':')[0]), parseInt(range.to.split(':')[1]));
          from.setTime(from.getTime() - from.getTimezoneOffset() * 60 * 1000);
          to.setTime(to.getTime() - to.getTimezoneOffset() * 60 * 1000);
          rangesFiltered.push({ startDateTime: from, endDateTime: to });
        });
      }
    }
    saveUserTimeRanges(meetingId, rangesFiltered);
  };
  useEffect(() => {
    let ranges: RangesWithDay = {};
    timeRanges
      .map((range) => {
        const start = new Date(range.startDateTime);
        const end = new Date(range.endDateTime);
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
          const start = new Date(range.startDateTime);
          const end = new Date(range.endDateTime);
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

  return (
    <Row className="justify-content mt-5 ml-5 mb-5 pl-5">
      <Col>
        <LineWithHeader header={'When'} />
        <Col lg={12} className="text-center mx-auto">
          <div className={styles.switchTime}>
            <SwitchButton
              title="Current answers"
              onChange={() => setDisplayAnswers(!displayAnswers)}
            />
          </div>
        </Col>
        <div style={{ marginRight: width < 576 ? 45 : 0 }}>
          {displayAnswers ? (
            <UserTimePicker
              disabled={disabled ? disabled : false}
              availableRanges={availableRanges}
              count={width > 1290 ? 4 : width > 991 ? 3 : width > 768 ? 2 : 1}
              setRanges={setRanges}
            />
          ) : (
            <AnswersTimePicker
              availableRanges={availableRanges}
              count={width > 1290 ? 4 : width > 991 ? 3 : width > 768 ? 2 : 1}
              setRanges={setRanges}
              answers={userAnswers}
              disabled={disabled ? disabled : false}
            />
          )}
        </div>
      </Col>
      <Col lg={12} className="text-center mx-auto">
        <ActionButton
          text="Save time preferences"
          onclick={saveTime}
          className={styles.saveButton}
        />
      </Col>
    </Row>
  );
};
export default MeetingTime;
