import React, { useState, useContext } from 'react';
import { HSVColor } from './models';

const kDefaultColor = HSVColor.create(0, 1, 1);

export const ColorContext = React.createContext({
  color: kDefaultColor,
  setColor: null,
});

export function useColorContextDefault() {
  const [color, setColor] = useState(kDefaultColor);
  return { color, setColor };
}

export function useColorContext() {
  return useContext(ColorContext);
}
