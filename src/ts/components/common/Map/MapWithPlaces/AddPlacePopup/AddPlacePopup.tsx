import { useEffect, useState } from 'react';
import { maxSings, minSings } from '../../../../../tools/validator';
import SingleValueInput from '../../../forms/Input/SingleValueInput';
import TextArea from '../../../forms/TextArea/TextArea';
import Popup from '../../../Popup/Popup';
import ActionButton from '../../../SubmitButton/ActionButton/ActionButton';
import styles from './AddPlacePopup.module.css';
export type AddPlacePopupProps = {
  defaultName: string;
  defaultAddress: string;
  defaultDescription: string;
  addNewPlace: Function;
  setShow: Function;
  display: boolean;
  onClose: Function;
};

const AddPlacePopup = ({
  defaultName,
  defaultAddress,
  defaultDescription,
  addNewPlace,
  setShow,
  display,
  onClose,
}: AddPlacePopupProps) => {
  const [description, setDescription] = useState<string>(defaultDescription);
  const [name, setName] = useState<string>(defaultName);
  const [address, setAddress] = useState<string>(defaultAddress);
  const [invalid, setInvalid] = useState<boolean>(true);

  useEffect(() => {
    setName(defaultName);
    setAddress(defaultAddress);
    setDescription(defaultDescription);
    setInvalid(defaultName.length < 5);
  }, [defaultName, defaultAddress, defaultDescription]);
  return (
    <Popup
      show={display}
      title="Fill place details"
      onClose={() => {
        setShow(false);
        onClose();
      }}
    >
      <div className={styles.addPlaceDetailsForm}>
        <p className={styles.titleLabel}>Place name*</p>
        <SingleValueInput
          value={name}
          valueHandler={setName}
          setInvalid={setInvalid}
          validation={[
            { validation: minSings(1), message: 'This field is required' },
            { validation: maxSings(255), message: 'Max 255 signs' },
          ]}
          placeholder="Please type palce name ..."
        />
        <p className={styles.formLabel}>Place description</p>
        <TextArea
          defaultValue={description}
          valueHandler={setDescription}
          setInvalid={setInvalid}
          validation={[{ validation: maxSings(512), message: 'Max 512 signs' }]}
          placeholder="Please type place description ..."
        />
        <p className={styles.addressLabel}>Address</p>
        <SingleValueInput
          value={address}
          valueHandler={setAddress}
          setInvalid={setInvalid}
          validation={[{ validation: maxSings(255), message: 'Max 255 signs' }]}
          placeholder="Please type palce address ..."
        />
        {display && (
          <div className={styles.buttonContainer}>
            <ActionButton
              onclick={() => {
                addNewPlace({
                  address,
                  description,
                  name,
                });
                setShow(false);
                setDescription('');
                setName('');
                setAddress('');
                setInvalid(true);
              }}
              disabled={invalid}
              text="Save place"
            />
          </div>
        )}
      </div>
    </Popup>
  );
};

export default AddPlacePopup;
