import React from 'react';
import { LabeledInput } from './labeled-input';
import { ColorContext } from '~popup/color-context';
import { HSVColor } from '~popup/models';

export class HEXInput extends React.Component {
  static contextType = ColorContext;

  /**
   * Update the Input value but may not update the context color.
   */
  updateHEX = (hex: string) => {
    const { setColor } = this.context;
    const color = HSVColor.fromHEX(hex);
    color && setColor(color);
  };

  render() {
    const hex = this.context.color.hex;

    return (
      <LabeledInput key={0} label="HEX" value={hex} onChange={this.updateHEX} />
    );
  }
}
