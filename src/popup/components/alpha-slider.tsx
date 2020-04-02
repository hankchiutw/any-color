import React from 'react';
import styled from 'styled-components';
import { useColorContext } from '../color-context';
import { kSliderHeight, kSliderThumbSize } from '../constants';
import { StyledSlider } from './styled-slider';

const Wrapper = styled.div`
  height: ${kSliderHeight}px;
`;

const alphaGridCss =
  'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAALUlEQVQokWM8c+bMfwYswNjYGJswAxNWUTxgOGhg/P//P9ZQOnv2LHVsGA4aADluCnZeMIMKAAAAAElFTkSuQmCC")';

export function AlphaSlider() {
  const { color, setColor } = useColorContext();
  const updateColor = (event: React.FormEvent<HTMLInputElement>) => {
    setColor(color.alpha(parseFloat((event.target as HTMLInputElement).value)));
  };
  return (
    <Wrapper>
      <StyledSlider
        max={1}
        min={0}
        defaultValue={color.alpha()}
        onChange={updateColor}
        primaryBackground={`linear-gradient(to right, rgba(0, 0, 0, 0) 0%, ${color.css()} 100%)`}
        secondaryBackground={alphaGridCss}
        thumbSize={kSliderThumbSize}
      />
    </Wrapper>
  );
}
