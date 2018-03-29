import React from 'react';
import './deni-react-popover.scss'
import deniReactPopoverHelper from './deni-react-popover.helper'
import deniReactPopoverProps from './deni-react-popover.props'
import deniReactPopoverApi from './deni-react-popover.api'
import { HORIZONTAL_POSITION } from './deni-react-popover.enum'

const MARGIN_ARROW = 20;
const ARROW_HEIGHT = 8;

class DeniReactPopover extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showing: false
    };

    this.mousedownFn = () => {
      if (!this._clickedInsideElement(event.target)) {
        if (this.props.onBeforeHide) {
          this.props.onBeforeHide(this.element);
        }
        this.hide();
      }
    }
    document.addEventListener('mousedown', this.mousedownFn);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.mousedownFn);
  }

  isShowing() {
    return this.state.showing;
  }

  onBeforeShow(element, targetElement) {
    //implement it on child component
  }

  show() {
    this.setState({
      showing: true
    });

    setTimeout(() => {
      this._adjustPopoverArrowPosition();

      if (this.props.onBeforeShow) {
        this.props.onBeforeShow(this.element, this._getTargetElement());
      }
    });
  }

  hide() {
    this.setState({
      showing: false
    });
  }

  toggle() {
    if (this.state.showing) {
      this.hide();
    } else {
      this.show();
    }
  }

  _adjustPopoverArrowPosition() {
    let elementArrow1 = this.element.querySelector('.deni-react-popover-arrow1');
    let elementArrow2 = this.element.querySelector('.deni-react-popover-arrow2');

    let targetElemCoordinates = this._getTargetElementCoordinates();
    this.element.style.top = targetElemCoordinates.bottom + ARROW_HEIGHT + 2 + 'px';
    this.element.style.left = this._getElementLeftPosition() + 'px';
    elementArrow1.style.left = this._getElementArrowLeftPosition() + 'px';
    elementArrow2.style.left = elementArrow1.style.left;
  }

  _getElementLeftPosition() {
    let targetElementHorizontalMiddle = this._getTargetElementHorizontalMiddle();
    let popOverElement = this._getPopOverElement();

    if (this.props.horizontalPosition === 'left') {
      return targetElementHorizontalMiddle - MARGIN_ARROW;
    } else if (this.props.horizontalPosition === 'right') {
      return targetElementHorizontalMiddle - popOverElement.clientWidth + MARGIN_ARROW;
    }
    return targetElementHorizontalMiddle - (popOverElement.clientWidth / 2); // 'center'
  }

  _getElementArrowLeftPosition() {
    let popOverElement = this._getPopOverElement();

    if (this.props.horizontalPosition === 'left') {
      return MARGIN_ARROW - (ARROW_HEIGHT / 2);
    } else if (this.props.horizontalPosition === 'right') {
      return popOverElement.clientWidth - MARGIN_ARROW - ARROW_HEIGHT;
    }
    return (popOverElement.clientWidth / 2) - (ARROW_HEIGHT / 2); //'center'
  }


  _getPopOverElement() {
    let element = this.element;
    return document.querySelector('.deni-react-popover');
  }

  _generateElementId() {
    let date = new Date();
    return 'DeniReactPopover-' + date.getTime();
  }

  _isSameElement(element1, element2) {
    return ((element1.parentElement === element2.parentElement) && (element1.className === element2.className));
  }

  _clickedInsideElement(clickedElement) {
    let newClickedElement = clickedElement;
    while (newClickedElement) {
      if (this._isSameElement(newClickedElement, this.element) || (newClickedElement === this._getTargetElement())) {
        return true;
      }
      newClickedElement = newClickedElement.parentElement;
    }
    return false;
  }

  _getTargetElement() {
    return document.getElementById(this.props.target);
  }

  _getTargetElementCoordinates() {
    return this._getTargetElement().getBoundingClientRect();
  }

  _getTargetElementHorizontalMiddle() {
    let targetElemCoordinates = this._getTargetElementCoordinates();
    return targetElemCoordinates.left + ((targetElemCoordinates.right - targetElemCoordinates.left) / 2);
  }

  render() {
    return (
      <div
        ref={
          (elem) => {
            this.element = elem
          }
        }
        className="deni-react-popover-container"
      >
      {
        this.state.showing ? (
          <div className="deni-react-popover">
            <div className="deni-react-popover-arrow deni-react-popover-arrow1" />
            <div className="deni-react-popover-arrow deni-react-popover-arrow2" />
            <div className="deni-react-popover-body">
              { this.props.children }
            </div>
          </div>
        ) : null
      }
      </div>
    )
  }

}

export default DeniReactPopover;
