import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['application'],
  currentUser: Ember.computed.alias('controllers.application.currentUser'),
  actions: {
    register: function () {
      var self = this;
      self.set('errors', null);
      self.firebase.createUser(self.get('model'), function (error) {
        if (error === null) {
          console.log("User created successfully");
          self.firebase.authWithPassword(self.get('model'), function (error, authData) {
            if (error === null) {
              self.firebase.child('users').child(authData.uid).once('value', function (snap){
                if (snap.val() == null) {
                  authData.name = self.get('model.name');
                  self.firebase.child('users').child(authData.uid).set(authData);
                }
                self.store.find('user', authData.uid).then(function (user) {
                  self.get('flashes').success('Account created successfully');
                  user.set('auth',authData);
                  self.set('currentUser',user);
                  self.transitionToRoute('application');
                });
              });
            } else {
              console.log("Account created but failed to login: ", error);
              self.get('flashes').danger('Account created successfully. Please login.');
              self.transitionToRoute('login');
            }
          });
        } else {
          console.log("Error creating user:", error);
          self.set('errors', error);
        }
      });
    }
  }
});
