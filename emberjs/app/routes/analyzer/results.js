import Ember from 'ember';

export default Ember.Route.extend({
    
    actions: {

        restart() {
            this.transitionTo('analyzer.steps.1');
        }

    }

});