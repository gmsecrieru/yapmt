import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import { Project, Task } from '/imports/api/project/collections';
import ProjectPage from '/imports/ui/pages/ProjectPage.jsx';

const ProjectPageContainer = createContainer((props) => {
  const { id } = props;
  const projectHandler = Meteor.subscribe('projectById', id);
  const taskHandler = Meteor.subscribe('tasksByProjectId', id);

  const loading = !projectHandler.ready() && !taskHandler.ready();

  const project = Project.findOne({ _id: id });
  const tasks = Task.find({ project_id: id }, { sort: { due_date: 1 } }).fetch();

  let addNewTask = false;
  if (Meteor.isClient) {
    addNewTask = Session.get('addNewTask');
  }

  return {
    loading,
    project,
    tasks,
    addNewTask
  };
}, ProjectPage);

export default ProjectPageContainer;
