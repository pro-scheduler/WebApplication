import styles from './MapToolTip.module.css';
import Card from '../../../Card/Card';
import ActionButton from '../../../SubmitButton/ActionButton/ActionButton';
import { useEffect, useRef, useState } from 'react';
export type MapToolTipProps = {
  name: string;
  description: string;
  address: string;
  displayRemoveButton: boolean;
  mainButtonName: string;
  next: Function;
  mainButtonAction: Function;
  removeButtonAction: Function;
  closeAction: Function;
  displayNext: boolean;
  displayMainButton: boolean;
};

const MapToolTip = ({
  name,
  description,
  address,
  mainButtonName,
  next,
  mainButtonAction,
  removeButtonAction,
  closeAction,
  displayNext,
  displayRemoveButton,
  displayMainButton,
}: MapToolTipProps) => {
  const [height, setHeight] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line
  useEffect(() => {
    if (ref && ref.current) setHeight(ref.current.clientHeight);
  });

  return (
    <div
      className={styles.toolTipContainer}
      ref={ref}
      style={{
        position: 'relative',
        top: -1 * height - 70,
      }}
    >
      <Card
        title={name}
        onDelete={closeAction}
        miniCard={true}
        sharpLeftBottomBorder={true}
        footer={
          <div className={styles.buttonContainer}>
            <div>
              {displayMainButton && (
                <ActionButton
                  onclick={() => {
                    mainButtonAction();
                  }}
                  text={mainButtonName}
                  className={styles.button}
                />
              )}
              {displayRemoveButton && (
                <ActionButton
                  onclick={() => {
                    removeButtonAction();
                  }}
                  text={'Remove'}
                  className={styles.button}
                  color={'var(--red)'}
                />
              )}
            </div>
            {displayNext && (
              <ActionButton
                onclick={() => {
                  next();
                }}
                text="Next place"
                className={styles.button}
              />
            )}
          </div>
        }
      >
        <div className={styles.tooltipDescription}>
          {description}
          <br />
          {address !== '' && address && 'address: ' + address}
        </div>
      </Card>
    </div>
  );
};

export default MapToolTip;
