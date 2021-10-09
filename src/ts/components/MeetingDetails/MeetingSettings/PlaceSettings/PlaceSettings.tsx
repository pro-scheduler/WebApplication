import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import { Collapse } from 'react-collapse';
import LineWithHeader from '../../LineWithHeader';
import { PlacesSettings } from '../../../../model/geo/Geo';
import { getPlacesSettings, savePlacesSettings } from '../../../../API/geo/geo';
import Checkbox from '../../../common/forms/Checkbox/Checkbox';
import ActionButton from '../../../common/SubmitButton/ActionButton/ActionButton';
import Card from '../../../common/Card/Card';

export type PlaceSettingsProps = {
  meetingId: number;
};

const PlaceSettings = ({ meetingId }: PlaceSettingsProps) => {
  const [settings, setSettings] = useState<PlacesSettings>({
    onlyOrganizerCanAddPlaceToMeeting: true,
  });
  const [newSettings, setNewSettings] = useState<PlacesSettings>({
    onlyOrganizerCanAddPlaceToMeeting: true,
  });

  const [opened, setOpened] = useState<boolean>(true);

  useEffect(() => {
    getPlacesSettings(meetingId, (settings: PlacesSettings) => {
      setSettings(settings);
      setNewSettings(settings);
    });
    // eslint-disable-next-line
  }, []);

  const saveSettings = () => {
    savePlacesSettings(meetingId, newSettings, () => {
      setSettings(newSettings);
    });
  };

  return (
    <>
      <Row className="justify-content mt-5">
        <LineWithHeader header={'Places'} collapseAction={setOpened} />
      </Row>
      <Row className="justify-content-center mb-5">
        <Col sm={12}>
          <Collapse isOpened={opened}>
            <Card title={'Adding place settings'}>
              <Checkbox
                checked={newSettings.onlyOrganizerCanAddPlaceToMeeting}
                setChecked={(value: boolean) => {
                  setNewSettings({
                    ...newSettings,
                    onlyOrganizerCanAddPlaceToMeeting: value,
                  });
                }}
                label={'Only organizer can add new place to the meetings'}
              />
              <ActionButton
                onclick={saveSettings}
                text={'Modify palces settings'}
                disabled={JSON.stringify(settings) === JSON.stringify(newSettings)}
              />
            </Card>
          </Collapse>
        </Col>
      </Row>
    </>
  );
};

export default PlaceSettings;
