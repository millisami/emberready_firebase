import Ember from 'ember';

export default Ember.Controller.extend({
  init:function(){
    console.log('ApplicationController.init');
    var self = this;

    this.firebase.onAuth(function (authData) {
      if (authData) {
        console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
      } else {
        self.set('currentUser',null);
        console.log('User is logged out');
      }
    });
  }
});
