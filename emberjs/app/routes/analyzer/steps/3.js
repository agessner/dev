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

            let record = this.controller.get('model');
            let errror = false;

            this.controller.get('abilities').forEach(ability => {

                //Prevent the user for typing values that are not between 0 and 10
                if (parseInt(ability.value) && (
                    parseInt(ability.value) > 10 || parseInt(ability.value) < 0)) {
                    errror=true;
                    return Ember.get(this, 'flashMessages').danger(`Valor incorreto para a habilidade ${ability.name}. Defina apenas valores entre 0 e 10.`);
                }

                record.set(ability.id, parseInt(ability.value) || null);
                
            });

            if (errror) {
                this.controller.set('isProcessing', false);   
                return;
            }
            
            Ember.$.ajax({
                url 		: config.API_HOST+'/tests',
                type 		: 'POST',
                contentType : 'application/json',
                dataType 	: 'json',
                data 		: JSON.stringify(record),
            }).then(() => {
                
                this.controller.set('model', this.controller.get('model'));
                this.controller.set('abilities', abilities);
                
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
