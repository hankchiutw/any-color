import React from 'react';
import styled from 'styled-components';
import { useColorContextDefault, ColorContext } from '../color-context';
import { kMainWidth } from '../constants';
import { CirclePicker } from './circle-picker';
import { HueSlider } from './hue-slider';
import { SaturationCanvas } from './saturation-canvas';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${kMainWidth}px;
`;

const ControlSection = styled.div`
  display: flex;
  align-items: center;
  padding: 14px;
`;

const SliderBlock = styled.div`
  flex: 1;
  margin-left: 10px;
`;

export function App() {
  return (
    <Wrapper>
      <ColorContext.Provider value={useColorContextDefault()}>
        <SaturationCanvas></SaturationCanvas>
        <ControlSection>
          <CirclePicker />
          <SliderBlock>
            <HueSlider />
          </SliderBlock>
        </ControlSection>
      </ColorContext.Provider>
    </Wrapper>
  );
}
