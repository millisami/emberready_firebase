import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  currentUser: Ember.computed.alias('controllers.application.currentUser'),
  actions: {
    login: function () {
      var self = this;
      self.set('errors', null);
      this.firebase.authWithPassword(this.get('model'), function (error, authData) {
        if (error === null) {
          self.flashMessage('success', 'Success Login');
          self.firebase.child('users').child(authData.uid).once('value', function (snap){
            if (snap.val() == null) {
              self.firebase.child('users').child(authData.uid).set(authData);
            }
            self.store.find('user', authData.uid).then(function (user){
              user.set('auth', authData);
              self.set('currentUser', user);
              if(authData.password.isTemporaryPassword){
                self.transitionToRoute('changePassword');
              }
              else{
                self.transitionToRoute('application');
              }
            });
          });
        } else {
          console.log("Error authenticating user:", error);
          self.set('errors', error);
        }
      });
    }
  }
});
