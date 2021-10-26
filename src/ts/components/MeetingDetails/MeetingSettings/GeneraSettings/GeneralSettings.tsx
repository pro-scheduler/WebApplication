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

export type GeneralSettingsProps = {
  meetingId: number;
};

const GeneralSettings = ({ meetingId }: GeneralSettingsProps) => {
  const [settings, setSettings] = useState<MeetingSettings>({
    onlyOrganizerCanInviteNewPeople: true,
  });
  const [newSettings, setNewSettings] = useState<MeetingSettings>({
    onlyOrganizerCanInviteNewPeople: true,
  });

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
                checked={newSettings.onlyOrganizerCanInviteNewPeople}
                setChecked={(value: boolean) => {
                  setNewSettings({
                    ...newSettings,
                    onlyOrganizerCanInviteNewPeople: value,
                  });
                }}
                label={'Only organizer can invaite new people'}
              />
              <ActionButton
                onclick={saveSettings}
                text={'Modify general settings'}
                disabled={JSON.stringify(settings) === JSON.stringify(newSettings)}
              />
            </Card>
          </Collapse>
        </Col>
      </Row>
    </>
  );
};

export default GeneralSettings;