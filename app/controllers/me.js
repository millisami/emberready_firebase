import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  currentUser: Ember.computed.alias('controllers.application.currentUser'),

  actions: {
    update: function () {
      var self = this;
      self.set('errors', null);
      this.get('currentUser').save().then(function () {
        self.get('flashes').success('Profile updated successfully.');
        self.transitionToRoute('index');
      }).catch(function(){
        self.set('errors', 'Error saving profile.  Please, try again.');
        self.get('flashes').danger('Error saving profile.  Please, try again.');
      });
    }
  }

});
