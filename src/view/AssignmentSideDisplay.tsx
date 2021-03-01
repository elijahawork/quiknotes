import React from 'react';
import { AssignmentModel } from '../models/AssignmentModel';

type AssignmentSideDisplayProps = {
  assignmentModel: AssignmentModel
};
type AssignmentSideDisplayState = {

};

const MS_IN_A_DAY = 86400000;

class AssignmentSideDisplay extends React.Component<AssignmentSideDisplayProps, AssignmentSideDisplayState> {
  constructor(props: AssignmentSideDisplayProps) {
    super(props);
  }
  render() {
    return (<li>
      <h1 className="assignment-side-name">{this.props.assignmentModel.assignmentName}</h1>
      <h2 className="duein">Assignment due in { this.getDueIn() } days</h2>
    </li>);
  }
  getDueIn() {
    const diffInMs = ((this.props.assignmentModel.dueDate.getTime() - new Date().getTime()));
    const days = diffInMs / MS_IN_A_DAY;
    return days < 0 ? Math.ceil(days) : Math.round(days);
    
  }
}
export default AssignmentSideDisplay;