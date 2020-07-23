import css from 'styled-jsx/css';

export default css`
  .octo-arm {
    transform-origin: 130px 106px;
  }

  .host:hover .octo-arm {
    animation: wave 560ms ease-in-out;
  }

  svg {
    fill: #efa589;
    color: #fff;
    position: absolute;
    z-index: 2;
    top: 0;
    border: 0;
    right: 0;
  }

  @media (max-width: 767px) {
    .host:hover .octo-arm {
      animation: none;
    }
    .octo-arm {
      animation: wave 560ms ease-in-out;
    }
  }

  @keyframes wave {
    0%,
    100% {
      transform: rotate(0);
    }
    20%,
    60% {
      transform: rotate(-25deg);
    }
    40%,
    80% {
      transform: rotate(10deg);
    }
  }
`;
