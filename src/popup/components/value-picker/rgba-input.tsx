import React from 'react';
import { LabeledInput } from './labeled-input';
import { useColorContext } from '~popup/color-context';

export function RGBAInput() {
  const { color, setColor } = useColorContext();
  const { r, g, b } = color.rgb;

  const updateColor = (rgbaKey: string, value: string) => {
    const numValue = parseFloat(value);
    !isNaN(numValue) && setColor(color.cloneRGB({ [rgbaKey]: numValue }));
  };

  return (
    <>
      <LabeledInput
        maxLength={3}
        label="R"
        value={r.toString()}
        onChange={(value) => updateColor('r', value)}
      />
      <LabeledInput
        maxLength={3}
        label="G"
        value={g.toString()}
        onChange={(value) => updateColor('g', value)}
      />
      <LabeledInput
        maxLength={3}
        label="B"
        value={b.toString()}
        onChange={(value) => updateColor('b', value)}
      />
      <LabeledInput
        maxLength={4}
        label="A"
        value={color.alpha.toString()}
        onChange={(value) => updateColor('a', value)}
      />
    </>
  );
}
