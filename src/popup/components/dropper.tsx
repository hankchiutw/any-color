import React from 'react';
import styled from 'styled-components';
import { ColorContext } from '../color-context';
import { kDropperCss } from '../constants';

const Wrapper = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 14px;
  background: ${kDropperCss};
  background-size: contain;
`;

export class Dropper extends React.Component {
  static contextType = ColorContext;

  render() {
    return <Wrapper></Wrapper>;
  }
}
