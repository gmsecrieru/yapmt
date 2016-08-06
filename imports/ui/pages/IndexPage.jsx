import React from 'react';
import ReactDOM from 'react-dom';

import ProjectBox from '/imports/ui/components/ProjectBox.jsx';
import NewProjectOverlay from '/imports/ui/components/NewProjectOverlay.jsx';

class IndexPage extends React.Component {

  componentDidMount() {
    this.setUpNewProject();
  }

  componentDidUpdate() {
    this.setUpNewProject();
  }

  render() {
    return (
      <div className="index-page">
        <h1>Yet another PM tool!</h1>
        {
          this.props.projects.map((item, index) => {
            return <ProjectBox key={ index } project={ item } />
          })
        }
      </div>
    );
  }

  setUpNewProject() {
    if (!this.props.projects.length) {
      ReactDOM.render(
        <NewProjectOverlay />,
        document.getElementById('new-project-overlay-container')
      );
    }
  }
}

IndexPage.propTypes = {
  projects: React.PropTypes.array
}

IndexPage.defaultProps = {
  projects: []
}

export default IndexPage;
