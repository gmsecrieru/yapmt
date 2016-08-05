import { createContainer } from 'meteor/react-meteor-data';

import IndexPage from '/imports/ui/pages/IndexPage.jsx';

const IndexPageContainer = createContainer((props) => {
  const loading = false;
  const projects = [
      {
        _id: 'xyz',
        name: 'Project One',
        tasks: [
          { description: 'Create base project', due_date: new Date('2016-09-10'), assignee: 'John', completed: false },
          { description: 'List projects', due_date: new Date('2016-09-12'), assignee: 'George', completed: false },
          { description: 'Define styles and other stuff', due_date: new Date('2016-09-15'), assignee: 'Jane', completed: false }
        ]
      },
      {
        _id: 'abc',
        name: 'New website',
        tasks: [
          { description: 'Hire designer', due_date: new Date('2016-10-10'), assignee: 'Harry', completed: true },
          { description: 'Implement front-end assets', due_date: new Date('2016-10-13'), assignee: 'Stan', completed: true },
          { description: 'Deploy final version', due_date: new Date('2016-10-20'), assignee: 'Donna', completed: false }
        ]
      }
    ]

  return {
    loading,
    projects
  }
}, IndexPage);

export default IndexPageContainer;
