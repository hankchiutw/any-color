import React from 'react';
import styled from 'styled-components';
import { ColorContext } from '../color-context';
import { kCirclePickerSize } from '../constants';
import { ChromaColor } from '../models';

interface WrapperProps {
  color: ChromaColor;
}

const Wrapper = styled.div.attrs((props: WrapperProps) => ({
  style: {
    backgroundColor: props.color.css(),
  },
}))`
  width: ${kCirclePickerSize}px;
  height: ${kCirclePickerSize}px;
  border-radius: 50%;
`;

export class CirclePicker extends React.Component {
  static contextType = ColorContext;

  render() {
    return <Wrapper color={this.context.color}></Wrapper>;
  }
}
