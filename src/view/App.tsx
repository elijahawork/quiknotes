import React, { createRef } from 'react';
import { ClassModel } from '../models/ClassModel';
import Pane1 from './Pane1';
import Pane3 from './Pane3';

export type AppProps = {
  classes: ClassModel[];
};
export type AppState = {
  modelOpen: null | ClassModel;
} & AppProps;

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { ...props, modelOpen: null };
    // making the state of the app's context bound
    this.setState = this.setState.bind(this);
  }
  render() {
    const textarea = createRef<HTMLTextAreaElement>();
    return (
      <div id={'app'}>
        <Pane1 classes={this.state.classes} setState={this.setState} />
        <div className="pane">
          {this.state.modelOpen ? (
            <textarea
              ref={textarea}
              onKeyPress={() => {
                if (!this.state.modelOpen) return;
                this.setState(
                  (prevState) => (
                    (prevState.modelOpen!.content = textarea.current!.value),
                    { modelOpen: prevState.modelOpen }
                  )
                );
              }}
            >
              {this.state.modelOpen.content}
            </textarea>
          ) : (
            <> </>
          )}
        </div>
        <Pane3 />
      </div>
    );
  }
}

export default App;
