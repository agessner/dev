import Ember from 'ember';

export default Ember.Route.extend({

    setupController(controller, model) {
        this._super(controller, model);
        
    },  
    
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },

    actions: {

        foward() {
            
            if (!this.controller.get('model').get('userName') || !this.controller.get('model').get('userEmail')) {
                return Ember.get(this, 'flashMessages').danger('Nome e email devem ser informados!');
            }

            if (!this.validateEmail(this.controller.get('model').get('userEmail'))) {
                return Ember.get(this, 'flashMessages').danger('Email Inválido!');
            }

            this.transitionTo('analyzer.steps.3');

        }

    }

});
