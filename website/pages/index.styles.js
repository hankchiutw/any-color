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

  .crxAnchor {
    display: block;
    height: 50px;
    border-radius: 25px;
    background-color: rgba(64, 110, 113, 0.7);
    line-height: 50px;
    color: white;
    font-family: Roboto;
    margin: 40px auto 0;
    padding: 0 20px;
    text-align: center;
    font-weight: 300;
  }

  .footer {
    display: flex;
    justify-content: center;
    margin: 40px 0 20px;
  }

  .footer a[data-icon] {
    color: rgba(64, 110, 113);
    margin: 0 4px;
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
