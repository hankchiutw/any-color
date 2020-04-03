import React from 'react';
import styled from 'styled-components';
import { ColorContext } from '../color-context';
import {
  kActiveColor,
  kInputBorderColor,
  kUpDownArrowSize,
  kInputLabelColor,
  kUpDownArrowCss,
} from '../constants';
import { HSVColor } from '../models';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-family: Menlo;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  flex: 1;
  margin-right: 8px;

  & input {
    text-align: center;
    outline: none;
    padding: 2px 0;
    margin-bottom: 4px;
    font-family: Menlo;
    width: 100%;
    border: solid 1px ${kInputBorderColor};
  }

  & input:focus {
    border: solid 1px ${kActiveColor};
  }

  & span {
    color: ${kInputLabelColor};
  }
`;

const UpDownArrow = styled.div`
  background: ${kUpDownArrowCss};
  border-radius: 2px;
  width: ${kUpDownArrowSize}px;
  height: ${kUpDownArrowSize}px;
  background-size: contain;

  &:hover {
    background: ${kUpDownArrowCss}, #eeeeee;
    background-size: contain;
  }
`;

interface InputProps {
  label: string;
  defaultValue?: number | string;
  value?: number | string;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
}

function Input(props: InputProps) {
  const { label, value, onChange } = props;
  return (
    <InputWrapper>
      <input value={value} onChange={onChange} />
      <span>{label}</span>
    </InputWrapper>
  );
}

interface ValuePickerState {
  // To make user be able to freely input something
  transientHEX: string;
}

export class ValuePicker extends React.Component<null, ValuePickerState> {
  static contextType = ColorContext;

  constructor(props: null) {
    super(props);
    this.state = {
      transientHEX: '',
    };
  }

  shouldComponentUpdate(_prevProps: null, nextState: ValuePickerState) {
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
      <Wrapper>
        <Input label="HEX" value={hex} onChange={this.updateHEX} />
        <UpDownArrow />
      </Wrapper>
    );
  }
}
