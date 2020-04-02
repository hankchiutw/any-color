import React from 'react';
import styled from 'styled-components';
import { useColorContext } from '../color-context';
import { kSliderThumbSize, kSliderHeight } from '../constants';
import { StyledSlider } from './styled-slider';

const Wrapper = styled.div`
  height: ${kSliderHeight}px;
`;

const hueGradientCss = `linear-gradient(
    to right,
    rgb(255, 0, 0) 0%,
    rgb(255, 0, 255) 17%,
    rgb(0, 0, 255) 33%,
    rgb(0, 255, 255) 50%,
    rgb(0, 255, 0) 67%,
    rgb(255, 255, 0) 83%,
    rgb(255, 0, 0) 100%
  )`;

export function HueSlider() {
  const { color, setColor } = useColorContext();
  const updateColor = (event: React.FormEvent<HTMLInputElement>) => {
    const alpha = color.alpha();
    const hue = 360 - parseFloat((event.target as HTMLInputElement).value);
    setColor(color.set('hsv.h', hue).alpha(alpha));
  };
  return (
    <Wrapper>
      <StyledSlider
        max={360}
        min={0}
        defaultValue={color.get('hsv.h')}
        onChange={updateColor}
        primaryBackground={hueGradientCss}
        thumbSize={kSliderThumbSize}
      />
    </Wrapper>
  );
}
