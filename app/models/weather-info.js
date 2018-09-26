import DS from 'ember-data';

export default DS.Model.extend({
    high: DS.attr('number'),
    low: DS.attr('number'),
    text: DS.attr('string')
});
