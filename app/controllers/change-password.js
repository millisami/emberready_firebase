import Ember from 'ember';
var computed = Ember.computed;

export default Ember.Controller.extend({
  needs: ['application'],
  currentUser: computed.alias('controllers.application.currentUser'),

  actions: {
    change: function () {
      this.set('model.email', this.get('currentUser.auth.password.email'));
      var self = this;
      self.set('errors', null);
      this.firebase.changePassword(this.get('model'), function (err) {
        if (err) {
          switch (err.code) {
            case 'INVALID_PASSWORD':
              self.set('errors', { message: "Incorrect password." });
              break;
            case 'INVALID_USER':
              self.set('errors', { message: "User does not exist." });
              break;
            default:
              self.set('errors', { message: "Error changing password.  Try again." });
          }
        } else {
        // self.growl.info('Password changed successfully.');
        self.transitionToRoute('index');
      }
    });
    }
  }
});
