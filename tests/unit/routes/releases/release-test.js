import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Route | releases/release', function (hooks) {
  setupTest(hooks);

  test('The model hook returns the stable projects', async function (assert) {
    const route = this.owner.lookup('route:releases/release');
    const model = await route.model();

    assert.strictEqual(
      model.ember?.id,
      'ember/release',
      'We found the Ember stable project.'
    );

    assert.strictEqual(
      model.emberData?.id,
      'emberData/release',
      'We found the Ember Data stable project.'
    );
  });
});
