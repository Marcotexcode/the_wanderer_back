import { commandCreateModel } from './create-model';
import { commandCreateRoute } from './create-route';
import { commandCreateMiddleware } from './create-middleweare';

const args = process.argv.slice(2);

(async () => {
  switch (args[0]) {
    case 'createRoute':
      await commandCreateRoute();
      break;
    case 'createModel':
      await commandCreateModel();
      break;
    case 'createMiddleware':
      await commandCreateMiddleware();
      break;
    default:
      console.error('Comando non valido.');
      break;
  }
})();
