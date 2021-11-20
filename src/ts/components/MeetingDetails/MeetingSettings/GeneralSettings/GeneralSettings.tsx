import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import { Collapse } from 'react-collapse';
import LineWithHeader from '../../LineWithHeader';
import Checkbox from '../../../common/forms/Checkbox/Checkbox';
import ActionButton from '../../../common/SubmitButton/ActionButton/ActionButton';
import Card from '../../../common/Card/Card';
import { MeetingSettings } from '../../../../model/meeting/Meeting';
import { getMeetingSettings, saveMeetingSettings } from '../../../../API/meeting/meetingService';
import RemoveMeeting from '../RemoveMeeting/RemoveMeeting';
import styles from './GeneralSettings.module.css';

export type GeneralSettingsProps = {
  meetingId: number;
  meetingName: string;
};

const GeneralSettings = ({ meetingId, meetingName }: GeneralSettingsProps) => {
  const [settings, setSettings] = useState<MeetingSettings>({
    participantsCanInvitePeople: false,
    participantsCanSeeResults: false,
  });
  const [newSettings, setNewSettings] = useState<MeetingSettings>(settings);

  const [opened, setOpened] = useState<boolean>(true);

  useEffect(() => {
    getMeetingSettings(meetingId, (settings: MeetingSettings) => {
      setSettings(settings);
      setNewSettings(settings);
    });
    // eslint-disable-next-line
  }, []);

  const saveSettings = () => {
    saveMeetingSettings(meetingId, newSettings, () => {
      setSettings(newSettings);
    });
  };

  return (
    <>
      <Row className="justify-content mt-5">
        <LineWithHeader header={'General'} collapseAction={setOpened} />
      </Row>
      <Row className="justify-content-center mb-5">
        <Col sm={12}>
          <Collapse isOpened={opened}>
            <Card title={'General meeting settings'}>
              <Checkbox
                checked={newSettings.participantsCanInvitePeople}
                setChecked={(value: boolean) => {
                  setNewSettings({
                    ...newSettings,
                    participantsCanInvitePeople: value,
                  });
                }}
                label={'Participants can invite new people'}
              />
              <Checkbox
                checked={newSettings.participantsCanSeeResults}
                setChecked={(value: boolean) => {
                  setNewSettings({
                    ...newSettings,
                    participantsCanSeeResults: value,
                  });
                }}
                label={'Participants can see voting results'}
              />
              <ActionButton
                onclick={saveSettings}
                text={'Modify general settings'}
                disabled={JSON.stringify(settings) === JSON.stringify(newSettings)}
                className={styles.editButton}
              />
            </Card>
            <RemoveMeeting meetingName={meetingName} meetingId={meetingId} />
          </Collapse>
        </Col>
      </Row>
    </>
  );
};

export default GeneralSettings;
