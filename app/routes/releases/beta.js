import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ReleasesBetaRoute extends Route {
  @service store;

  model() {
    return hash({
      ember: this.store.find('project', 'ember/beta'),
      emberData: this.store.find('project', 'emberData/beta'),
    });
  }
}
