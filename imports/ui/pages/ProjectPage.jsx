import React from 'react';

import ProjectStatus from '/imports/ui/components/ProjectStatus.jsx';
import ProjectTask from '/imports/ui/components/ProjectTask.jsx';
import NewProjectTask from '/imports/ui/components/NewProjectTask.jsx';

class ProjectPage extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    if (!this.props.tasks.length) {
      Session.set('addNewTask', true);
    }
  }

  componentWillUnmount() {
    Session.set('addNewTask', false);
  }

  render() {
    const { project, tasks, addNewTask } = this.props;

    return (
      <div className="project-page">
        <h1>{ project.name }</h1>
        <ProjectStatus tasks={ tasks } />
        <div className="project-page__tasks">
          {
            this.props.tasks.map((item, index) => {
              return <ProjectTask key={ index } task={ item } />
            })
          }
          {
            addNewTask
            ? <NewProjectTask project_id={ project._id } />
            : null
          }
        </div>
      </div>
    );
  }
}

ProjectPage.defaultProps = {
  project: {},
  tasks: []
};

export default ProjectPage;
