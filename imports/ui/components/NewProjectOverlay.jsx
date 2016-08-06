import React from 'react';
import ReactDOM from 'react-dom';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
import _s from 'underscore.string';

import { Project } from '/imports/api/project/collections';

export default class NewProjectOverlay extends React.Component {
  constructor() {
    super();

    this.handleOverlayClick = this.handleOverlayClick.bind(this);
    this.tearDownOverlay = this.tearDownOverlay.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    this.domContainer = document.getElementById('new-project-overlay-container');
    this.domContainer.classList.add('open');

    ReactDOM.findDOMNode(this.refs.nameInput).focus();
  }

  componentWillUnmount() {
    this.domContainer.classList.remove('open');
  }

  render() {
    return (
      <div className="new-project-overlay__inner" onClick={ this.handleOverlayClick }>
        <h3>Create new project</h3>
        <input type="text" name="name" placeholder="project name + [enter]" ref="nameInput" onKeyDown={ this.handleKeyDown } />
      </div>
    )
  }

  handleOverlayClick(e) {
    if (!e.target.matches('input[name="name"]')) {
      this.tearDownOverlay();
    }
  }

  tearDownOverlay() {
    ReactDOM.unmountComponentAtNode(this.domContainer);
  }

  handleKeyDown(e) {
    const { keyCode } = e;
    const { value } = e.target;

    // escape key
    if (keyCode === 27) {
      return this.tearDownOverlay();
    } else if (keyCode === 13 && value) { // enter key
      return this.createNewProject(value)
    }
  }

  createNewProject(value = '') {
    const name = _s.stripTags(value);
    if (!name) {
      return;
    }

    let id;
    try {
      id = Project.insert({ name });
    } catch (e) {
      toastr.error('There was a problem saving your project!');
    }

    if (id) {
      FlowRouter.go('project-by-id', { id })
      return this.tearDownOverlay();
    } else {
      toastr.error('There was a problem saving your project!');
    }
  }

}
