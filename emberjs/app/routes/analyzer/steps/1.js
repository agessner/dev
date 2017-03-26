import Ember from 'ember';

export default Ember.Route.extend({


    actions: {

        start() {
            this._start();
        }

    },

    _start() {
        this.transitionTo('analyzer.steps.2');
    }


});
