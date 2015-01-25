import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    var self = this;
    var auth = this.firebase.getAuth();
    var currentUser = self.controllerFor('application').get('currentUser');
    if (currentUser) { return; }
    if (auth && auth.uid) {
      var promise = this.store.find('user', auth.uid);
      promise.then(function (user) {
        console.log('User found');
        user.set('auth', auth);
        self.controllerFor('application').set('currentUser', user);
      });
      return promise;
    }
  },

  actions: {
    register: function () {
      this.transitionTo('register');
    },

    logout: function () {
      this.firebase.unauth();
      this.transitionTo('application');
    }
  }
});
