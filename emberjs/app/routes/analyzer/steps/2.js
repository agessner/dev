import Ember from 'ember';

export default Ember.Route.extend({

    setupController(controller, model) {
        this._super(controller, model);
        
    },  

    actions: {

        foward() {
            
            if (!this.controller.get('model').get('userName') || !this.controller.get('model').get('userEmail')) {
                return Ember.get(this, 'flashMessages').danger('Nome e emai devem ser informados!');
            }

            this.transitionTo('analyzer.steps.3');

        }

    }

});
