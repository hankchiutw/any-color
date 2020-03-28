import React from 'react';
import styled from 'styled-components';
import { useColorContext } from '../color-context';

const kSliderHeight = '10px';
const kThumbSize = '16px';

const Wrapper = styled.input`
  appearance: none;
  outline: none;
  background: linear-gradient(
    to right,
    rgb(255, 0, 0) 0%,
    rgb(255, 0, 255) 17%,
    rgb(0, 0, 255) 33%,
    rgb(0, 255, 255) 50%,
    rgb(0, 255, 0) 67%,
    rgb(255, 255, 0) 83%,
    rgb(255, 0, 0) 100%
  );
  border: none;
  height: ${kSliderHeight};
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: ${kThumbSize};
    height: ${kThumbSize};
    background: white;
    border-radius: 50%;
    border: solid 1px grey;
  }
`;

export function HueSlider() {
  const { color, setColor } = useColorContext();
  const updateColor = (event: React.FormEvent<HTMLInputElement>) => {
    setColor(color.set('hsv.h', (event.target as HTMLInputElement).value));
  };
  return (
    <Wrapper
      as="input"
      type="range"
      max="360"
      min="0"
      defaultValue={360 - color.get('hsv.h')}
      onInput={updateColor}
    ></Wrapper>
  );
}
