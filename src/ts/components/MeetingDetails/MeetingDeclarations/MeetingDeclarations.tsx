import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Collapse } from 'react-collapse';
import {
  loadMeetingDeclarations,
  saveDeclaration,
} from '../../../API/declarations/declarationsService';
import { DeclarationDetails } from '../../../model/declaration/Declaration';
import { minSings, maxSings, required } from '../../../tools/validator';
import Popup from '../../common/Popup/Popup';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';
import LineWithHeader from '../LineWithHeader';
import Declaration from './Declaration/Declaration';
import styles from './MeetingDeclarations.module.css';
import TextArea from '../../common/forms/TextArea/TextArea';
import SingleValueInput from '../../common/forms/Input/SingleValueInput';
import { UserSummary } from '../../../model/user/ProUser';

export type MeetingDeclarationsProps = {
  meetingId: number;
  user: UserSummary;
  isOrganizer: boolean;
  open: boolean;
};

const MeetingDeclarations = ({ meetingId, user, isOrganizer, open }: MeetingDeclarationsProps) => {
  const [opened, setOpened] = useState<boolean>(true);
  const [declarations, setDeclarations] = useState<DeclarationDetails[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [invalidTitleOrDesc, setInvalidTitleOrDesc] = useState(true);
  const [showAddDeclarationModal, setShowAddDeclarationModal] = useState<boolean>(false);

  useEffect(() => {
    if (meetingId) {
      loadMeetingDeclarations(meetingId, setDeclarations, () => {});
    }
  }, [meetingId]);

  const addDeclaration = () => {
    saveDeclaration(
      {
        title: title,
        description: description,
        meetingId: meetingId,
      },
      (dec: DeclarationDetails) => {
        setDeclarations([...declarations, dec]);
      }
    );
    setShowAddDeclarationModal(false);
    setTitle('');
    setDescription('');
  };

  return (
    <Row className="justify-content my-5">
      <LineWithHeader header={'Declarations'} collapseAction={setOpened} />
      <Col>
        <Collapse isOpened={opened}>
          <div className={styles.declarationsContainer}>
            {declarations.map((dec, i) => (
              <Declaration
                user={user}
                defaultDeclaration={dec}
                isMeetingOrganizer={isOrganizer}
                removeDeclaration={(id: number) => {
                  setDeclarations(declarations.filter((d) => d.id !== id));
                }}
                key={i}
                disabled={!open}
              />
            ))}
          </div>
          {open && (
            <div className={styles.buttonContainer}>
              <ActionButton
                onclick={() => {
                  setShowAddDeclarationModal(true);
                }}
                text="Add new declaration"
                className={styles.addNewButton}
              />
            </div>
          )}
        </Collapse>
        <Popup
          show={showAddDeclarationModal}
          title="Add new declaration"
          onClose={() => setShowAddDeclarationModal(false)}
        >
          <div className={styles.addDeclarationForm}>
            <p className={styles.titleLabel}>Declaration title</p>
            <SingleValueInput
              value={title}
              valueHandler={setTitle}
              setInvalid={setInvalidTitleOrDesc}
              validation={[
                { validation: required, message: 'This field is required' },
                { validation: minSings(5), message: 'Min 5 signs' },
                { validation: maxSings(255), message: 'Max 255 signs' },
              ]}
              placeholder="Please type declaration title ..."
            />
            <p className={styles.formLabel}>Declaration description</p>
            <TextArea
              defaultValue={description}
              valueHandler={setDescription}
              setInvalid={setInvalidTitleOrDesc}
              validation={[{ validation: maxSings(512), message: 'Max 512 signs' }]}
              placeholder="Please type declaration description ..."
            />
            {open && (
              <div className={styles.buttonContainer}>
                <ActionButton
                  onclick={() => {
                    addDeclaration();
                  }}
                  disabled={invalidTitleOrDesc}
                  text="Save declaration"
                />
              </div>
            )}
          </div>
        </Popup>
      </Col>
    </Row>
  );
};
export default MeetingDeclarations;
