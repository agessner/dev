import Ember from 'ember';
import abilities from '../../../lib/abilities';
import config from '../../../config/environment';

export default Ember.Route.extend({

    setupController(controller, model) {
        this._super(controller, model);
        this.controller.set('abilities', abilities);
        this.controller.set('isProcessing', false);
    },  

    actions: {
        
        save() {
            
            this.controller.set('isProcessing', true);    

            var record = this.controller.get('model');
            
            this.controller.get('abilities').forEach(ability => {
                record.set(ability.id, parseInt(ability.value) || null);
            });

            console.log(record);
            
            Ember.$.ajax({
                url 		: config.API_HOST+'/tests',
                type 		: 'POST',
                contentType : 'application/json',
                dataType 	: 'json',
                data 		: JSON.stringify(record),
            }).then(() => {
                
                this.controller.set('model', this.controller.get('model'));

                this.transitionTo('analyzer.results');
                this.controller.set('isProcessing', false);   
            }).catch(err => {
                Ember.get(this, 'flashMessages').danger('Ops, algo deu errado! Nossa equipe foi notificada e está corrigindo o problema.');
                console.error(err);
                this.controller.set('isProcessing', false);   
            });

             
        },
    }

});
