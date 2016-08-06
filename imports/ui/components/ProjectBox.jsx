import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';

class ProjectBox extends React.Component {

  constructor() {
    super();

    this.handleBoxClick = this.handleBoxClick.bind(this);
  }

  render() {
    const { project } = this.props;
    const { tasks = [] } = project;

    return (
      <div className='project-box' onClick={ this.handleBoxClick }>
        <div className='project-box__content'>
          <h3>{ project.name }</h3>
          <small>{ `${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'}` }</small>
        </div>
        <div className='project-box__actions'>
          <i className='project-box__actions__remove' title="Remove">&times;</i>
        </div>
      </div>
    );
  }

  handleBoxClick(e) {
    if (!e.target.matches('.project-box__actions i')) {
      return FlowRouter.go('project-by-id', { id: this.props.project._id });
    }

    const [matchTerm, action = ''] = e.target.classList.toString().match(/project-box__actions__(\S+)/) || [];
    switch (action) {
      case 'remove':
        swal({
          type: 'warning',
          title: 'Serious warning below',
          text: 'This is good-bye for good, proceed?',
          confirmButtonText: 'Yes, do it!',
          showCancelButton: true,
          closeOnConfirm: false
        }, () => {
          Meteor.call('project:remove', this.props.project._id, (err) => {
            if (err) {
              swal('Something went wrong...', 'Please try again.', 'error');
            } else {
              swal({ type: 'success', timer: 800, showConfirmButton: false });
            }
          });
        });
        break;

      default:
        break;
    }
  }

}

ProjectBox.propTypes = {
  project: React.PropTypes.object.isRequired
}

export default ProjectBox;
