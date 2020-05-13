import React from 'react';
import styled from 'styled-components';
import { kDropperColor, kActiveColor } from '../constants';
import { lazyInject, MessageService } from '~/common';

interface WrapperProps {
  active: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  width: 16px;
  height: 16px;
  margin-right: 14px;
  color: ${(props) => (props.active ? kActiveColor : kDropperColor)};
`;

interface State {
  active: boolean;
}

export class Dropper extends React.Component<{}, State> {
  @lazyInject(MessageService)
  private messageService: MessageService;

  constructor(props: {}) {
    super(props);
    this.state = {
      active: false,
    };
  }

  private toggleActive = () => {
    this.setState({
      active: !this.state.active,
    });
  };

  componentDidUpdate() {
    if (this.state.active) {
      this.messageService.send('requestCapture').then(() => {
        window.close();
      });
    }
  }

  render() {
    return (
      <Wrapper
        className="icon-dropper"
        active={this.state.active}
        onClick={this.toggleActive}
      ></Wrapper>
    );
  }
}
