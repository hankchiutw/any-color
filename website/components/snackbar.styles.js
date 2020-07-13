import css from 'styled-jsx/css';

export default css`
  .host {
    position: fixed;
    top: 10px;
    right: 10px;
    background: #323232;
    padding: 6px 16px;
    border-radius: 4px;
    z-index: ${Number.MAX_SAFE_INTEGER};
    box-sizing: border-box;
    height: 48px;
    color: white;
    opacity: 0;
    transition: opacity 0.15s;
    pointer-events: none;
  }

  .host.visible {
    opacity: 1;
  }

  .spot {
    box-sizing: border-box;
    display: block;
    border-radius: 3px;
    width: 20px;
    height: 20px;
    margin-right: 6px;
  }

  .content {
    display: flex;
    align-items: center;
    height: 100%;
  }
`;
