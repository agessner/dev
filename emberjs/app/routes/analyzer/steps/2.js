import Ember from 'ember';

export default Ember.Route.extend({

    actions: {

        foward() {
            
            this.transitionTo('analyzer.steps.3');

        }

    }

});
