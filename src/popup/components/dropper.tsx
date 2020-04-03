import React, { useState } from 'react';
import styled from 'styled-components';
import { kDropperColor, kDropperActiveColor } from '../constants';

interface WrapperProps {
  active: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  width: 16px;
  height: 16px;
  margin-right: 14px;
  color: ${(props) => (props.active ? kDropperActiveColor : kDropperColor)};
`;

export function Dropper() {
  const [active, setActive] = useState(false);
  const toggleActive = () => {
    setActive(!active);
  };

  return (
    <Wrapper
      className="icon-dropper"
      active={active}
      onClick={toggleActive}
    ></Wrapper>
  );
}
