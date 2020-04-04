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
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  maxLength?: number;
}

interface State {
  // To make user be able to freely input something
  transientValue: number | string;
}

/**
 * @remarks
 * The internal <input> element is not only tracking the Props.value,
 * but also the internal state `transientValue`.
 */
export class LabeledInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      transientValue: props.value,
    };
  }

  shouldComponentUpdate(nextProps: Props) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        transientValue: nextProps.value,
      });
    }
    return true;
  }

  onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    this.props.onChange && this.props.onChange(value);
    this.setState({
      transientValue: value,
    });
  };

  render() {
    const { maxLength } = this.props;
    const inputProps = { maxLength };
    return (
      <Wrapper>
        <input
          value={this.state.transientValue}
          onChange={this.onChange}
          {...inputProps}
        />
        <span>{this.props.label}</span>
      </Wrapper>
    );
  }
}
