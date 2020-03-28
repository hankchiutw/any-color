import chroma from 'chroma-js';
import paper from 'paper';
import React from 'react';
import styled from 'styled-components';
import { ColorContext } from '../color-context';

interface WrapperProps {
  color: chroma.Color;
}

const Wrapper = styled.canvas.attrs((props: WrapperProps) => ({
  style: {
    background: `linear-gradient(to top, #000, rgba(0, 0, 0, 0)),
    linear-gradient(to right, #fff, rgba(255, 255, 255, 0)),
    ${chroma.hsv(props.color.get('hsv.h'), 1, 1).css()}`,
  },
}))``;

export class SaturationCanvas extends React.Component {
  static contextType = ColorContext;
  private project: paper.Project;
  private pointer: paper.Path;
  private width: number;
  private height: number;

  private initCanvas = (element: HTMLCanvasElement) => {
    this.project = new paper.Project(element);
    this.pointer = new paper.Path.Circle({
      center: this.project.view.center,
      radius: 5,
      strokeColor: 'white',
    });

    const { width, height } = this.project.view.viewSize;
    this.width = width;
    this.height = height;

    this.project.view.onMouseDrag = this.updateColor;
    this.project.view.onMouseDown = this.updateColor;
  };

  private updateColor = (event: paper.MouseEvent) => {
    const { color, setColor } = this.context;

    this.pointer.position = event.point;
    const { x, y } = this.pointer.position;

    setColor(
      color.set('hsv.s', x / this.width).set('hsv.v', 1 - y / this.height)
    );
  };

  render() {
    return (
      <Wrapper
        as="canvas"
        ref={this.initCanvas}
        color={this.context.color}
      ></Wrapper>
    );
  }
}
