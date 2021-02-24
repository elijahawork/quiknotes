import React from 'react';
import { ClassModel } from '../models/ClassModel';
import Pane1 from './Pane1';
import Pane2 from './Pane2';
import Pane3 from './Pane3';

export type AppProps = {
  classes: ClassModel[];
};
export type AppState = {
  modelOpen: null | ClassModel
} & AppProps;

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { ...props, modelOpen: null };
  }
  render() {
    return (
      <div id={'app'}>
        <Pane1 classes={this.state.classes} setState = { this.setState }/>
        <Pane2 />
        <Pane3 />
      </div>
    );
  }
}

export default App;
