import Ember from 'ember';
import SecureRoute from './secure-route';

export default SecureRoute.extend({
  model: function () {
    return Ember.Object.create({email: '', oldPassword: '', newPassword: ''});
  }
});
