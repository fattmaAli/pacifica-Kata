import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { GestionProduitModule } from './gestion-produit/gestion-produit.module';




platformBrowserDynamic().bootstrapModule(GestionProduitModule)
  .catch(err => console.error(err));
