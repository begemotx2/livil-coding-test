import DS from 'ember-data';
import WeatherInfo from './weather-info'

export default WeatherInfo.extend({
    date: DS.attr('date')
});
