import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Project, Task } from '/imports/api/project/collections';
import ProjectPage from '/imports/ui/pages/ProjectPage.jsx';

const ProjectPageContainer = createContainer((props) => {
  const { id } = props;
  const projectHandler = Meteor.subscribe('projectById', id);
  const taskHandler = Meteor.subscribe('tasksByProjectId', id);

  const loading = !projectHandler.ready() && !taskHandler.ready();

  const project = Project.findOne({ _id: id });
  const tasks = Task.find({ project_id: id }, { sort: { due_date: 1 } }).fetch();

  return {
    loading,
    project,
    tasks
  };
}, ProjectPage);

export default ProjectPageContainer;
