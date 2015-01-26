import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return Ember.Object.create({email: ''});
  },
  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set('errors', null);
  }
});
