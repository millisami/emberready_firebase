import config from '../config/environment';

export function initialize(container, application) {
  var fb = new window.Firebase(config.firebaseUrl);

  application.register('firebase:main', fb,  { instantiate: false });
  application.inject('route', 'firebase', 'firebase:main');
  application.inject('controller', 'firebase', 'firebase:main');
  application.inject('component', 'firebase', 'firebase:main');
}

export default {
  name: 'inject-firebase',
  initialize: initialize
};
