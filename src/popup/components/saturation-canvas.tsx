import paper from 'paper';
import React from 'react';
import styled from 'styled-components';
import { ColorContext } from '../color-context';
import { kSaturationCanvasHeight } from '../constants';
import { HSVColor } from '../models';

interface WrapperProps {
  color: HSVColor;
}

const Wrapper = styled.canvas.attrs((props: WrapperProps) => ({
  style: {
    background: `linear-gradient(to top, #000, rgba(0, 0, 0, 0)),
    linear-gradient(to right, #fff, rgba(255, 255, 255, 0)),
    ${props.color.hueCss()}`,
  },
}))`
  height: ${kSaturationCanvasHeight}px;
`;

export class SaturationCanvas extends React.Component {
  static contextType = ColorContext;
  private project: paper.Project;
  private pointer: paper.Path;
  private width: number;
  private height: number;

  private initCanvas = (element: HTMLCanvasElement) => {
    this.project = new paper.Project(element);

    const { width, height } = this.project.view.viewSize;
    this.width = width;
    this.height = height;

    // located at top-right corner
    this.pointer = new paper.Path.Circle({
      center: [this.width, 0],
      radius: 6,
      strokeColor: 'white',
    });

    this.project.view.onMouseDrag = this.updateColor;
    this.project.view.onMouseDown = this.updateColor;
  };

  private updateColor = (event: paper.MouseEvent) => {
   this.context.setColor(this.getPointColor(event.point));
  };

  private getPointColor(point: paper.Point): HSVColor {
    const { x, y } = point;
    const px = Math.max(0, Math.min(x, this.width));
    const py = Math.max(0, Math.min(y, this.height));
    this.pointer.position = new paper.Point(px, py);

    return this.context.color.clone({
      s: px / this.width,
      v: 1 - py / this.height,
    });
  }

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
