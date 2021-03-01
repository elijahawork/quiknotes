import React from 'react';
import { ClassModel } from '../models/ClassModel';
import { AppState, AppProps } from './App';

type ClassButtonProps = {
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
  cModel: ClassModel
};
type ClassButtonState = {

};

class ClassButton extends React.Component<ClassButtonProps, ClassButtonState> {
  constructor(props: ClassButtonProps) {
    super(props);
  }
  render() {
    return <button
      onClick={() => {
        this.props.setState({ modelOpen: this.props.cModel });
      }}
    >
      {this.props.cModel.name}
    </button>

  }
}
export default ClassButton;