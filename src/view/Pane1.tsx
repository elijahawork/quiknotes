import React from 'react';
import { CLASS_LIST } from '..';
import { ClassModel } from '../models/ClassModel';
import { AppState, AppProps } from './App';

type Pane1Props = {
  classes: ClassModel[];
  setState: <K extends keyof AppState>(state: AppState | ((prevState: Readonly<AppState>, props: Readonly<AppProps>) => AppState | Pick<AppState, K> | null) | Pick<AppState, K> | null, callback?: (() => void) | undefined) => void
};
type Pane1State = {} & Pane1Props;

class Pane1 extends React.Component<Pane1Props, Pane1State> {
  constructor(props: Pane1Props) {
    super(props);
    this.state = { ...props };
  }

  render() {
    return (
      <div className={'pane'}>
        <header>
          <button
            onClick={() => {
              const className = prompt('Name this new class.');

              if (className) CLASS_LIST.push(new ClassModel(className, [], ''));
            }}
          >
            +
          </button>
        </header>
        <ul>
          {this.state.classes.map((cModel) => {
            return (
              <li>
                <button onClick={() => {
                  this.props.setState({ modelOpen: cModel });
                }}>{cModel.name}</button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Pane1;
