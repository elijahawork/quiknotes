import React, { createRef, useState } from 'react';
import Calendar from 'react-calendar';
import { AssignmentModel } from '../models/AssignmentModel';
import { AppState, AppProps } from './App';
import AssignmentSideDisplay from './AssignmentSideDisplay';

type Pane3Props = {
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
  state: AppState;
};
type Pane3State = {} & Pane3Props;

class Pane3 extends React.Component<Pane3Props, Pane3State> {
  constructor(props: Pane3Props) {
    super(props);
    this.state = { ...props };
  }
  render() {
    const assignmentName = createRef<HTMLInputElement>();
    let dueDate: Date | null = null;
    return (
      <div className={'pane'}>
        <header className="add-assignment-header">
          <input
            type="text"
            ref={assignmentName}
            placeholder="English III Midterm"
          />
          <Calendar
            onChange={(date: Date | Date[]) => {
              if (date instanceof Array) {
                return;
              }
              dueDate = date;
            }}
          />

          <button
            onClick={() => {
              console.log('clicked');
              console.log(this.props.state.modelOpen);
              
              if (!this.props.state.modelOpen) return;
              if (!dueDate) return;
              if (!assignmentName.current) return;
              if (!assignmentName.current.value) return;
              console.log('gunna build a new assignment');
              
              const newAssignment = new AssignmentModel(
                assignmentName.current.value,
                dueDate
              );
              this.props.state.modelOpen.addAssignment(newAssignment);
              this.props.setState((prevState) => prevState);
            }}
          >
            +
          </button>
        </header>
        <ul>
          {this.props.state.modelOpen ? (
            this.props.state.modelOpen.assignments.map((assignmentId, key) => {
              const assignmentModel = AssignmentModel.getById(assignmentId);
              if (assignmentModel instanceof AssignmentModel)
                return (
                  <AssignmentSideDisplay
                    key={key}
                    assignmentModel={assignmentModel}
                  />
                );
            })
          ) : (
              <>
                Choose A Class
            </>
          )}
        </ul>
      </div>
    );
  }
}

export default Pane3;
