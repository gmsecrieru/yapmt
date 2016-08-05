import React from 'react';

class ProjectPage extends React.Component {

  render() {
    const { project } = this.props;
    const { tasks } = this.props;

    return (
      <div className="project-page">
        <h1>{ project.name }</h1>
        <div className="project-page__tasks">
        {
          this.props.tasks.map((item, index) => {
            return <div key={ index }>{ JSON.stringify(item) } </div>
          })
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
