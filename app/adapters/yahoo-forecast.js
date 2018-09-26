import DS from 'ember-data';
import fetch from 'fetch';


export default DS.Adapter.extend({
    query(store, type, query){
        const id = query.q;
        const url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + escape(id) + "%22)&format=json"
        return fetch(url).then(result => {
            return result.json();
        })
    }
});
