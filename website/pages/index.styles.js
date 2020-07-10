import css from 'styled-jsx/css';

export default css`
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  header {
    text-align: center;
  }

  .fake-browser {
    padding: 0 10%;
  }

  @media screen and (min-width: 480px) {
    .fake-browser {
      padding: 0 15%;
    }
  }

  @media screen and (min-width: 992px) {
    .fake-browser {
      padding: 0 18%;
    }
  }

  @media screen and (min-width: 1200px) {
    .fake-browser {
      padding: 0 22%;
    }
  }
`;
