import React from 'react';
import { LabeledInput } from './labeled-input';

export function RGBAInput() {
  return (
    <>
      <LabeledInput label="R" />
      <LabeledInput label="G" />
      <LabeledInput label="B" />
      <LabeledInput label="A" />
    </>
  );
}
