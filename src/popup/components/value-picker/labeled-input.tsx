import React from 'react';
import styled from 'styled-components';
import {
  kActiveColor,
  kInputBorderColor,
  kInputLabelColor,
} from '~popup/constants';

const Wrapper = styled.div`
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

interface Props {
  label: string;
  defaultValue?: number | string;
  value?: number | string;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
}

export function LabeledInput(props: Props) {
  const { label, value, onChange } = props;
  return (
    <Wrapper>
      <input value={value} onChange={onChange} />
      <span>{label}</span>
    </Wrapper>
  );
}
