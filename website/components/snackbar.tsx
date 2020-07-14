import React, { createContext, RefObject } from 'react';
import styles from './snackbar.styles';

const DURATION = 2000;

export const SnackbarContext = createContext<RefObject<Snackbar>>(null);

interface State {
  hex: string;
  visible: boolean;
}

export default class Snackbar extends React.Component<{}, State> {
  private _timerId: number;

  constructor(props: {}) {
    super(props);
    this.state = {
      hex: '',
      visible: false,
    };
  }

  public open(hex: string) {
    window.clearTimeout(this._timerId);
    this.setState({ hex, visible: true });
    this._timerId = window.setTimeout(() => {
      this.setState({ visible: false });
    }, DURATION);
  }

  render() {
    const visibleStyle = this.state.visible ? 'visible' : '';
    return (
      <>
        <style jsx>{styles}</style>
        <div className={`host ${visibleStyle}`}>
          <div className="content">
            <div
              className="spot"
              style={{ backgroundColor: this.state.hex }}
            ></div>
            <div>{this.state.hex} copied!</div>
          </div>
        </div>
      </>
    );
  }
}
