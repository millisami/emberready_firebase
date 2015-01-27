import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel:function () {
    var self = this;
    var auth = this.firebase.getAuth();
    var currentUser = self.controllerFor('application').get('currentUser');
    if (currentUser) { return; }
    if(auth && auth.uid) {
      var promise = this.store.find('user', auth.uid);
      promise.then(function (user) {
        console.log('User found - SecureRoute');
        user.set('auth', auth);
        var appController = self.controllerFor('application');
        appController.set('currentUser', user);
        appController.get('currentUser').get('projects').then(function (projects) {
          console.log('retrieved remote projects');
          appController.set('projects', projects);
        }).catch(function(error){
          console.log('Error: ' + error);
        });
      });
      return promise;
    }
    this.transitionTo('login');
  }
});
