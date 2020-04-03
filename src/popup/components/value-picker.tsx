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

function Input(props: { label: string }) {
  return (
    <InputWrapper>
      <input />
      <span>{props.label}</span>
    </InputWrapper>
  );
}

export class ValuePicker extends React.Component {
  static contextType = ColorContext;

  render() {
    return (
      <Wrapper>
        <Input label="HEX" />
        <UpDownArrow />
      </Wrapper>
    );
  }
}
