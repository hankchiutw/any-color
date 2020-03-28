import React from 'react';
import { useColorContextDefault, ColorContext } from '../color-context';
import { CirclePicker } from './circle-picker';
import { HueSlider } from './hue-slider';
import { SaturationCanvas } from './saturation-canvas';

export function App() {
  return (
    <ColorContext.Provider value={useColorContextDefault()}>
      <SaturationCanvas></SaturationCanvas>
      <HueSlider />
      <CirclePicker />
    </ColorContext.Provider>
  );
}
