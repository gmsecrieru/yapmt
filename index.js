import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
import { mount } from 'react-mounter';

import App from '/imports/ui/App.jsx';

// these routes work both client and server-side (SSR)
FlowRouter.route('/', {
  name: 'index',
  action() {
    mount(App, { view: require('/imports/ui/pages/IndexPage.jsx').default });
  }
});
