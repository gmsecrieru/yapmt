import React from 'react';

import ProjectBox from '/imports/ui/components/ProjectBox.jsx';

export default class IndexPage extends React.Component {

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
}
