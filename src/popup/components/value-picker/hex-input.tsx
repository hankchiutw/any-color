import React from 'react';
import { LabeledInput } from './labeled-input';
import { ColorContext } from '~popup/color-context';
import { HSVColor } from '~popup/models';

interface State {
  // To make user be able to freely input something
  transientHEX: string;
}

export class HEXInput extends React.Component<{}, State> {
  static contextType = ColorContext;

  constructor(props: null) {
    super(props);
    this.state = {
      transientHEX: '',
    };
  }

  shouldComponentUpdate(_prevProps: {}, nextState: State) {
    return !!nextState.transientHEX;
  }

  /**
   * Clear transientHEX since it's transient.
   */
  componentDidUpdate() {
    this.setState({
      transientHEX: '',
    });
  }

  /**
   * Update the Input value but may not update the context color.
   */
  updateHEX = (event: React.FormEvent<HTMLInputElement>) => {
    const { setColor } = this.context;
    const hex = (event.target as HTMLInputElement).value;
    const color = HSVColor.fromHEX(hex);
    color && setColor(color);
    this.setState({
      transientHEX: hex,
    });
  };

  render() {
    const hex = this.state.transientHEX || this.context.color.hex;

    return (
      <LabeledInput key={0} label="HEX" value={hex} onChange={this.updateHEX} />
    );
  }
}
