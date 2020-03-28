import React from 'react';
import styled from 'styled-components';
import { useColorContextDefault, ColorContext } from '../color-context';
import { HueSlider } from './hue-slider';
import { SaturationCanvas } from './saturation-canvas';

const Circle = styled.div.attrs(props => ({
  style: {
    backgroundColor: props.color,
  },
}))`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export function App() {
  return (
    <ColorContext.Provider value={useColorContextDefault()}>
      <SaturationCanvas></SaturationCanvas>
      <HueSlider />
      <Circle />
    </ColorContext.Provider>
  );
}
