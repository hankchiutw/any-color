import css from 'styled-jsx/css';

export default css`
  .host {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: -6px 0px 20px rgba(119, 119, 119, 0.4),
      6px 6px 20px rgba(119, 119, 119, 0.4);
  }

  .head {
    height: 64px;
    background-color: #e2e2e2;
    display: flex;
    align-items: center;
    padding: 0 12px;
  }

  .button {
    width: 16px;
    height: 16px;
    margin: 0 4px;
    border-radius: 50%;
  }

  .button--red {
    background: #e96e4c;
  }

  .button--yellow {
    background: #e6a935;
  }

  .button--green {
    background: #85c33d;
  }

  .search-bar {
    font-family: Roboto;
    font-weight: 500;
    letter-spacing: 0.65px;
    height: 32px;
    line-height: 32px;
    background: white;
    border-radius: 4px;
    color: #9b9b9b;
    flex: 1;
    text-align: center;
    margin-right: 4px;
    margin-left: 12px;
  }

  .content {
    background-color: #f8f8f8;
    position: relative;
  }

  .content img {
    width: 100%;
    display: block;
  }

  .content canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
`;
