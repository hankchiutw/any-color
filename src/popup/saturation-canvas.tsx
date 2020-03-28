import chroma from 'chroma-js';
import paper from 'paper';
import React, { useCallback } from 'react';
import styled from 'styled-components';

const Wrapper = styled.canvas`
  background: linear-gradient(to top, #000, rgba(0, 0, 0, 0)),
    linear-gradient(to right, #fff, rgba(255, 255, 255, 0)),
    ${props => props.color};
`;

function initCanvas(
  element: HTMLCanvasElement,
  props: SaturationCanvasProps
) {
  const project = new paper.Project(element);
  const path = new paper.Path.Circle({
    center: project.view.center,
    radius: 5,
    strokeColor: 'white',
  });

  const { width, height } = project.view.viewSize;
  const chromaColor = chroma(props.color);
  const emitChange = (event: paper.MouseEvent) => {
    path.position = event.point;
    const { x, y } = path.position;

    const css = chromaColor
      .set('hsv.s', x / width)
      .set('hsv.v', 1 - y / height)
      .css();
    props.onChange(css);
  };
  project.view.onMouseDrag = emitChange;
  project.view.onMouseDown = emitChange;
}

interface SaturationCanvasProps {
  color?: string;
  onChange?: (color: string) => void;
}

export function SaturationCanvas(props: SaturationCanvasProps) {
  const refCallback = useCallback(element => {
    initCanvas(element, props);
  }, []);
  return <Wrapper as="canvas" ref={refCallback} color={props.color}></Wrapper>;
}
