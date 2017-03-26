import DS from 'ember-data';

export default DS.Model.extend({
    userName: DS.attr(),
    userEmail: DS.attr(),
    html: DS.attr(),
    css: DS.attr(),
    js: DS.attr(),
    python: DS.attr(),
    django: DS.attr(),
    ios: DS.attr(),
    android: DS.attr()
});