import React, { createRef } from 'react';
import { ClassModel } from '../models/ClassModel';
import { AppProps, AppState } from './App';

type Pane1Props = {
  classes: ClassModel[];
  setState: <K extends keyof AppState>(
    state:
      | AppState
      | ((
          prevState: Readonly<AppState>,
          props: Readonly<AppProps>
        ) => AppState | Pick<AppState, K> | null)
      | Pick<AppState, K>
      | null,
    callback?: (() => void) | undefined
  ) => void;
};
type Pane1State = { classes: ClassModel[] };

class Pane1 extends React.Component<Pane1Props, Pane1State> {
  constructor(props: Pane1Props) {
    super(props);
    this.state = { ...props };
  }

  render() {
    const inp = createRef<HTMLInputElement>();

    return (
      <div className={'pane'}>
        <header>
          <input type="text" ref={inp} />
          <button
            onClick={() => {
              if (!inp.current?.value) alert('no');
              this.setState((prevState) => ({
                classes: [
                  ...prevState.classes,
                  new ClassModel(inp.current!.value, [], ''),
                ]
              }));
            }}
          >
            +
          </button>
        </header>
        <ul>
          {this.state.classes.map((cModel, key) => {
            return (
              <li key = { key }>
                <button key = { key + 1 }
                  onClick={() => {
                    this.props.setState({ modelOpen: cModel });
                  }}
                >
                  {cModel.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Pane1;
