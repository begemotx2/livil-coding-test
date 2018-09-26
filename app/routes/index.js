import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';


export default Route.extend({
    queryParams: {
        search: {
            refreshModel: true,
            replace: true
        }
    },

    mergeForecastItem(mergedForecasts, forecast, propertyName){
        const DATE_THRESHOLD = 1000 * 60 * 60 * 12; //12 hours diff is the same date
        
        let m = mergedForecasts.find(m => Math.abs(forecast.get('date') - m.date) < DATE_THRESHOLD);
        if (!m) {
            m = {
                date: forecast.get('date')
            };
            mergedForecasts.pushObject(m);
        }
        m[propertyName] = forecast;
    },

    model(params){
        const {search} = params;

        if (search) {
            return RSVP.hash({
                yahoo: this.store.query('yahoo-forecast', {q: search}),
                owm: this.store.query('owm-forecast', {q: search})
            }).then(model => {

                let mergedForecasts = A([]);
                model.yahoo.forEach(forecast => this.mergeForecastItem(mergedForecasts, forecast, 'yahoo'))
                model.owm.forEach(forecast => this.mergeForecastItem(mergedForecasts, forecast, 'owm'))
                
                model.merged = mergedForecasts;

                return model;
            })
        }
    }
});
