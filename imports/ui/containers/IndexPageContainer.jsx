import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Project } from '/imports/api/project/collections';
import IndexPage from '/imports/ui/pages/IndexPage.jsx';

const IndexPageContainer = createContainer((props) => {
  const handler = Meteor.subscribe('projectList');
  const loading = !handler.ready();
  const projects = Project.find().fetch();

  return {
    loading,
    projects
  }
}, IndexPage);

export default IndexPageContainer;
