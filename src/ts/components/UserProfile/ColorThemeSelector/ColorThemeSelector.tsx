import Card from '../../common/Card/Card';
// eslint-disable-next-line
import styles from './ColorThemeSelector.module.css';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { ColorResult, TwitterPicker } from 'react-color';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';

const defaultColros = {
  primary: '#7067cf',
  secondary: '#4FE379',
};
export type ColorPalete = {
  primary: string;
  secondary: string;
};

export const getColorTheme = () => {
  let colorTheme = Cookies.get('proscheduler_color_theme');
  if (!colorTheme) {
    Cookies.set('proscheduler_color_theme', defaultColros);
  }
  return Cookies.get('proscheduler_color_theme');
};

export const setColors = (colors: ColorPalete) => {
  Cookies.set('proscheduler_color_theme', colors);
};

export const refreshTheme = () => {
  let currnetColors = getColorTheme();
  let theme = currnetColors ? JSON.parse(currnetColors) : defaultColros;
  document.documentElement.style.setProperty('--primary', theme.primary);
  document.documentElement.style.setProperty('--secondary', theme.secondary);
};

const ColorThemeSelector = () => {
  // eslint-disable-next-line
  const [selectedColros, setSelectedColors] = useState<ColorPalete>(defaultColros);
  const colorsToSelection = [
    '#7067cf',
    '#4FE379',
    '#FF6900',
    '#FCB900',
    '#7BDCB5',
    '#00D084',
    '#8ED1FC',
    '#0693E3',
    '#EB144C',
    '#F78DA7',
  ];
  useEffect(() => {
    let currnetColors = getColorTheme();
    setSelectedColors(currnetColors ? JSON.parse(currnetColors) : defaultColros);
  }, []);

  const refreshColors = (colors: ColorPalete) => {
    setColors(colors);
    let currnetColors = getColorTheme();
    setSelectedColors(currnetColors ? JSON.parse(currnetColors) : defaultColros);
    refreshTheme();
  };

  const backToDefault = () => {
    refreshColors({
      primary: colorsToSelection[0],
      secondary: colorsToSelection[1],
    });
  };

  return (
    <Card
      title="Change yout theme"
      footer={<ActionButton text="Back to default" onclick={backToDefault} />}
    >
      <div className={styles.colorPickersContainer}>
        Primary:
        <div className={styles.primaryContainer}>
          <TwitterPicker
            colors={colorsToSelection}
            color={selectedColros.primary}
            onChange={(color: ColorResult) => {
              refreshColors({
                ...selectedColros,
                primary: color.hex,
              });
            }}
          />
          <div
            className={styles.colorSkeleton}
            style={{ backgroundColor: selectedColros.primary }}
          />
        </div>
        Secondary:
        <div className={styles.secondaryContainer}>
          <TwitterPicker
            colors={colorsToSelection}
            color={selectedColros.secondary}
            onChange={(color: ColorResult) => {
              refreshColors({
                ...selectedColros,
                secondary: color.hex,
              });
            }}
          />
          <div
            className={styles.colorSkeleton}
            style={{ backgroundColor: selectedColros.secondary }}
          />
        </div>
      </div>
    </Card>
  );
};

export default ColorThemeSelector;
