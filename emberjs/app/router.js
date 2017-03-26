import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
	location: config.locationType,
	rootURL: config.rootURL
});

Router.map(function () {

	this.route('analyzer', function () {
		this.route('steps', function() {
			this.route('1');
			this.route('2');
			this.route('3');
		});
		this.route('results');
	});
});

export default Router;
