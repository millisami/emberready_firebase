import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    reset: function () {
      var self = this;
      if (!this.get('model.email')){
        self.set('errors', {message: 'Email is required.'});
        return;
      }
      self.set('errors', null);
      this.firebase.resetPassword(this.get('model'), function (error) {
        if (error === null) {
        self.get('flashes').success('We have sent you an email with password reset instructions.');
        self.transitionToRoute('login');
        } else {
          console.log("Error authenticating user:", error);
          self.set('errors', error);
        }
      });
    }
  }
});
