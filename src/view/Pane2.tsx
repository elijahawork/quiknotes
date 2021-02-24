import React from 'react';

type Pane2Props = {};
type Pane2State = {} & Pane2Props;

class Pane2 extends React.Component<Pane2Props, Pane2State> {
  constructor(props: Pane2Props) {
    super(props);
    this.state = { ...props };
  }
  render() {
    return <div className={'pane'}></div>;
  }
}

export default Pane2;
