import Ember from 'ember';
import abilities from '../../lib/abilities';

export default Ember.Route.extend({

    templateName: 'analyzer/form',
    
    setupController(controller, model) {
        this._super(controller, model);
        this.controller.set('abilities', abilities);
    },  

    model() {
        return this.store.createRecord('test');
    },

    actions: {
        save() {
            const record = this.controller.get('model');
            console.log('OI');
            console.log(record);
            console.log(this.controller.get('abilities'));
            record.save().then(newRecord => {
                console.log(newRecord);
            });
        },
        habilityChanged() {
            console.log(this);
        }
    }
});