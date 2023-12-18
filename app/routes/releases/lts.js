import { hash } from 'rsvp';
import Route from '@ember/routing/route';

export default class ReleasesLtsRoute extends Route {
  model() {
    return hash({
      ember: this.store.find('project', 'ember/lts'),
      emberData: this.store.find('project', 'emberData/lts'),
    });
  }
}
