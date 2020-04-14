import React, { useState } from 'react';
import { LabeledInput } from './labeled-input';
import { useColorContext } from '~popup/color-context';

export function RGBAInput() {
  const [selectedOn, setSelectedOn] = useState('');
  const { color, setColor } = useColorContext();
  const { r, g, b } = color.rgb;

  const isSelected = (rgbaKey: string) => {
    return selectedOn === rgbaKey;
  };

  const updateColor = (rgbaKey: string, value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) {
      return;
    }
    setColor(color.cloneRGB({ [rgbaKey]: num }));
  };

  const doMath = (rgbaKey: string, value: string, delta: number) => {
    const num = parseFloat(value);
    if (isNaN(num)) {
      return;
    }
    updateColor(rgbaKey, (num + delta).toString());
    setSelectedOn(rgbaKey);
  };

  return (
    <>
      <LabeledInput
        maxLength={3}
        label="R"
        value={r.toString()}
        onChange={(value) => updateColor('r', value)}
        onArrowUp={(value) => doMath('r', value, 1)}
        onArrowDown={(value) => doMath('r', value, -1)}
        selected={isSelected('r')}
      />
      <LabeledInput
        maxLength={3}
        label="G"
        value={g.toString()}
        onChange={(value) => updateColor('g', value)}
        onArrowUp={(value) => doMath('g', value, 1)}
        onArrowDown={(value) => doMath('g', value, -1)}
        selected={isSelected('g')}
      />
      <LabeledInput
        maxLength={3}
        label="B"
        value={b.toString()}
        onChange={(value) => updateColor('b', value)}
        onArrowUp={(value) => doMath('b', value, 1)}
        onArrowDown={(value) => doMath('b', value, -1)}
        selected={isSelected('b')}
      />
      <LabeledInput
        maxLength={4}
        label="A"
        value={color.alpha.toString()}
        onChange={(value) => updateColor('a', value)}
        onArrowUp={(value) => doMath('a', value, 0.01)}
        onArrowDown={(value) => doMath('a', value, -0.01)}
        selected={isSelected('a')}
      />
    </>
  );
}
