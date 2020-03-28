import chroma from 'chroma-js';
import React from 'react';
import styled from 'styled-components';
import { ColorContext } from '../color-context';

interface WrapperProps {
  color: chroma.Color;
}

const Wrapper = styled.div.attrs((props: WrapperProps) => ({
  style: {
    backgroundColor: props.color.css(),
  },
}))`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export class CirclePicker extends React.Component {
  static contextType = ColorContext;

  render() {
    return <Wrapper color={this.context.color}></Wrapper>;
  }
}
