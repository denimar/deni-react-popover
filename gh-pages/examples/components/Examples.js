import React from 'react'
import './Examples.scss'
import DeniReactPopover from '../../../src/deni-react-popover/deni-react-popover'

class Examples extends React.Component {

  constructor(props) {
    super(props);
  }

  deniReactPopoverLeftButtonClick() {
    this.refs.DeniReactPopoverLeft.toggle();
  }

  deniReactPopoverCenterButtonClick() {
    this.refs.DeniReactPopoverCenter.toggle();
  }

  deniReactPopoverRightButtonClick() {
    this.refs.DeniReactPopoverRight.toggle();
  }

  render() {
    const self = this;
    const innerHTML = (<span>Florianópolis - Santa Catarina - Brasil</span>);

    return (
      <div className="examples-container">

        <div className="title">deni-react-popover - Examples</div>

        <div className="buttons-container">

            <button id="buttonPositionLeft" onClick={ this.deniReactPopoverLeftButtonClick.bind(this) }>Click to show a popover (horizontalPosition='left')</button>
            <DeniReactPopover ref="DeniReactPopoverLeft" target="buttonPositionLeft" horizontalPosition="left">{ innerHTML }</DeniReactPopover>

            <button id="buttonPositionCenter" onClick={ this.deniReactPopoverCenterButtonClick.bind(this) }>Click to show a popover (horizontalPosition='center')</button>
            <DeniReactPopover ref="DeniReactPopoverCenter" target="buttonPositionCenter" horizontalPosition="center">{ innerHTML }</DeniReactPopover>

            <button id="buttonPositionRight" onClick={ this.deniReactPopoverRightButtonClick.bind(this) }>Click to show a popover (horizontalPosition='right')</button>
            <DeniReactPopover ref="DeniReactPopoverRight" target="buttonPositionRight" horizontalPosition="right">{ innerHTML }</DeniReactPopover>

        </div>

      </div>
    )

  }

}

export default Examples
