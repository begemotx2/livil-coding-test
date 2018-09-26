import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Serializer | yahoo forecast', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('yahoo-forecast');

    assert.ok(serializer);
  });

  test('it serializes records', function(assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('yahoo-forecast', {});

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
