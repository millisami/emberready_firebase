import Ember from 'ember';

export default Ember.Controller.extend({
  isLoading: false,
  buttonText: 'Reset',

  actions: {
    reset: function () {
      var self = this;
      Ember.run.later(function () { self.set('isLoading', false); }, 1000);
      if (!this.get('model.email')){
        self.set('errors', {message: 'Email is required.'});
        return;
      }
      self.set('errors', null);
      this.firebase.resetPassword(this.get('model'), function (error) {
        if (error === null) {
        self.get('flashes').success('We have sent you an email with password reset instructions.', 4000);
        self.transitionToRoute('login');
        } else {
          console.log("Error authenticating user:", error);
          self.set('errors', error);
        }
      });
    }
  }
});
