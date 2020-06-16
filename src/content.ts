import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import 'regenerator-runtime/runtime';
import {
  PaperProject,
  Project,
  paperProjectFactory,
  Inspector,
  Snackbar,
  store,
  Store,
  APP_STORE,
} from './core';
import { container } from '~/common';
import { App } from '~/elements';

const dom = document.createElement('ac-root');
document.body.insertAdjacentElement('afterbegin', dom);

const canvas = document.createElement('canvas');
dom.injectCanvas(canvas).then(() => {
  container.bind<App>(App).toConstantValue(dom);
  container
    .bind<PaperProject>(PaperProject)
    .toConstantValue(paperProjectFactory(canvas));
  container.bind<Store>(APP_STORE).toConstantValue(store);
  container.bind<Project>(Project).toSelf();
  container.bind<Inspector>(Inspector).toSelf();
  container.bind<Snackbar>(Snackbar).toSelf();
  container.resolve(Project);
});
