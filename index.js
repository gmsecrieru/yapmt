import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
import { mount } from 'react-mounter';

import '/imports/startup';
import App from '/imports/ui/App.jsx';

// these routes work both client and server-side (SSR)
FlowRouter.route('/', {
  name: 'index',
  action() {
    mount(App, { view: require('/imports/ui/containers/IndexPageContainer.jsx').default });
  }
});

FlowRouter.route('/project/:id', {
  name: 'project-by-id',
  action(params) {
    const { id } = params;

    mount(App, { view: require('/imports/ui/containers/ProjectPageContainer.jsx').default, viewProps: { id } });
  }
});
