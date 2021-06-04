import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TimeRangeDTO } from '../../../model/TimeRangeDTO';
import LineWithHeader from '../LineWithHeader';
import UserTimePicker from '../../UserTimeGrid/UserTimePicker';
import { useEffect, useState } from 'react';
import useWindowDimensions from '../../common/window/WindowDimension';
export type MeetingTimeProps = {
  meetingId: number;
  timeRanges: TimeRangeDTO[];
};

interface RangesWithDay {
  [key: string]: { ranges: Array<{ from: string; to: string }>; date: Date };
}

const MeetingTime = ({ meetingId, timeRanges }: MeetingTimeProps) => {
  const [selectedRanges, setSelectedRanges] = useState<RangesWithDay>({});
  const [avaiableRanges, setAvaiableRanges] = useState<RangesWithDay>({});
  // eslint-disable-next-line
  const { height, width } = useWindowDimensions();

  const setRanges = (date: string, ranges: Array<{ from: string; to: string }>, day: Date) => {
    let ran: RangesWithDay = {
      ...selectedRanges,
    };
    ran[date] = { ranges: ranges, date: day };
    setSelectedRanges({ ...ran });
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
    setAvaiableRanges(ranges);
  }, [timeRanges, setAvaiableRanges]);

  return (
    <Row className="justify-content mt-5 ml-5 mb-5 pl-5">
      <Col>
        <LineWithHeader header={'When'} />
        <div style={{ marginRight: width < 576 ? 45 : 0 }}>
          <UserTimePicker
            availableRanegs={avaiableRanges}
            count={width > 1290 ? 4 : width > 991 ? 3 : width > 768 ? 2 : 1}
            setRanges={setRanges}
          />
        </div>
      </Col>
    </Row>
  );
};
export default MeetingTime;
