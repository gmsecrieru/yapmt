import { createContainer } from 'meteor/react-meteor-data';

import { Task } from '/imports/api/project/collections';
import ProjectTotalTasks from '/imports/ui/components/ProjectTotalTasks.jsx';

const ProjectTotalTasksContainer = createContainer((props) => {
  const { project_id: projectId } = props;
  const handler = Meteor.subscribe('tasksByProjectId', projectId);
  const loading = !handler.ready();

  return {
    total: Task.find({ project_id: projectId }).count()
  }
}, ProjectTotalTasks);

export default ProjectTotalTasksContainer;
