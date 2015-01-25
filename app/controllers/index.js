import Ember from 'ember';
var computed = Ember.computed;

export default Ember.Controller.extend({
  needs: ['application'],
  currentUser: computed.alias('controllers.application.currentUser')
});
