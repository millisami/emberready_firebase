import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'header',
  classNames: ["bar bar-nav"],
  actions: {
    logout: function () {
      this.sendAction('logout');
    }
  }

});
