import chroma from 'chroma-js';
import React, { useState, useContext } from 'react';

const kDefaultColor = chroma('red');

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
