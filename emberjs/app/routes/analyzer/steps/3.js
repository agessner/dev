import Ember from 'ember';
import abilities from '../../../lib/abilities';

export default Ember.Route.extend({

    setupController(controller, model) {
        this._super(controller, model);
        this.controller.set('abilities', abilities);
    },  

    actions: {
        save() {
            const record = this.controller.get('model');
            console.log('OI');
            console.log(record);
            console.log(this.controller.get('abilities'));
            record.save().then(newRecord => {
                this.transitionTo('analyzer.results');
            });
        },
        abilityChanged() {}
    }

});
