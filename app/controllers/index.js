import Controller from '@ember/controller'
import { oneWay } from '@ember/object/computed'
import { debounce } from '@ember/runloop'
import { observer} from '@ember/object'


export default Controller.extend({
  queryParams: ['search'],
  search: 'Voronezh',

  inputValue: oneWay('search'),

  inputValueChanged: observer('inputValue', function () {
    debounce(this, this.updateQuery, 500, false)
  }),

  updateQuery() {
    this.set('search', this.get('inputValue'))
  }
})
