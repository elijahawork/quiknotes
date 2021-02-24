import React from 'react';

type Pane3Props = {};
type Pane3State = {} & Pane3Props;

class Pane3 extends React.Component<Pane3Props, Pane3State> {
  constructor(props: Pane3Props) {
    super(props);
    this.state = { ...props };
  }
  render() {
    return <div className={'pane'}></div>;
  }
}

export default Pane3;
