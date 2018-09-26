import DS from 'ember-data';

export default DS.Serializer.extend({
    normalizeResponse(store, primaryModelClass, payload){
        const info = payload.query.results ? payload.query.results.channel : {};
        
        const baseId = info.location ? info.location.country + '/' + info.location.city : '';

        const forecast = info && info.item && info.item.forecast ? info.item.forecast : []

        return {
            data: forecast.map(f => {
                return {
                    id: baseId + '/' + f.date,
                    type: 'yahoo-forecast',
                    attributes: {
                        text: f.text,
                        date: new Date(f.date),
                        high: f.high,
                        low: f.low,
                    }
                }
            })
        }
    }
});
