import paper from 'paper';
import React, { useCallback } from 'react';
import styled from 'styled-components';

const Wrapper = styled.canvas`
  background: linear-gradient(to top, #000, rgba(0, 0, 0, 0)),
    linear-gradient(to right, #fff, rgba(255, 255, 255, 0)),
    ${props => props.color};
`;

function createCanvas(
  element: HTMLCanvasElement,
  props: SaturationCanvasProps
) {
  const project = new paper.Project(element);
  const fillColor = new paper.Color(props.color);
  fillColor.alpha = 0.01;
  const path = new paper.Path.Circle({
    center: project.view.center,
    radius: 5,
    strokeColor: 'white',
    fillColor,
  });
  path.onMouseDrag = function(event: paper.MouseEvent) {
    path.position = path.position.add(event.delta);
  };
}

interface SaturationCanvasProps {
  color?: string;
  onChange?: (color: string) => void;
}

export function SaturationCanvas(props: SaturationCanvasProps) {
  const refCallback = useCallback(element => {
    createCanvas(element, props);
  }, []);
  return <Wrapper as="canvas" ref={refCallback} color={props.color}></Wrapper>;
}
