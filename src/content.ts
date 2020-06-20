import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import 'regenerator-runtime/runtime';
import {
  PaperProject,
  paperProjectFactory,
  Inspector,
  AppManager,
} from './core';
import { container } from '~/common';
import { App, Snackbar, snackbarFactory } from '~/elements';

const dom = document.createElement('ac-root');
document.body.insertAdjacentElement('afterbegin', dom);

const canvas = document.createElement('canvas');
dom.injectCanvas(canvas).then(() => {
  container.bind<App>(App).toConstantValue(dom);
  container
    .bind<PaperProject>(PaperProject)
    .toConstantValue(paperProjectFactory(canvas));
  container.bind<AppManager>(AppManager).toSelf();
  container.bind<Inspector>(Inspector).toSelf();
  container.bind<Snackbar>(Snackbar).toConstantValue(snackbarFactory(dom));
  container.resolve(AppManager);
});
