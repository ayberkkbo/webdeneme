import { visit } from '@ember/test-helpers';
import percySnapshot from '@percy/ember';
import { a11yAudit } from 'ember-a11y-testing/test-support';

import { setupApplicationTest } from 'ember-qunit';

import { setupPageTitleTest } from 'ember-website/tests/helpers/page-title';
import { module, test } from 'qunit';

module('Acceptance | community/meetups', function (hooks) {
  setupApplicationTest(hooks);

  setupPageTitleTest(hooks);

  test('Percy snapshot', async function (assert) {
    await visit('/community/meetups');
    await percySnapshot(assert);

    assert.ok(true);
  });

  test('Accessibility audit', async function (assert) {
    await visit('/community/meetups');
    await a11yAudit();

    assert.hasPageTitle('Meetups - Community - Ember.js');
  });
});
