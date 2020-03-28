import React, { useState } from 'react';
import styled from 'styled-components';
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
  const [color, setColor] = useState('');

  return (
    <>
      <SaturationCanvas color="yellow" onChange={setColor}></SaturationCanvas>
      <Circle color={color} />
      {color}
    </>
  );
}
