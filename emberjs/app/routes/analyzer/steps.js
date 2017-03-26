import Ember from 'ember';
import abilities from '../../lib/abilities';

export default Ember.Route.extend({

    model() {
        return this.store.createRecord('test');
    }
});