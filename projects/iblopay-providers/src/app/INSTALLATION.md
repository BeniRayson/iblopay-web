# Intégration BusGestion — Véhicules

Copier les trois fichiers du dossier `transport/vehicules/` dans :
`projects/iblopay-providers/src/app/transport/vehicules/`
(Si les composants transport sont dans un autre dossier, ajuster uniquement ce chemin et l'import de routes.)

Remplacer les trois fichiers `core/layout/layout.component.{ts,html,scss}` dans :
`projects/iblopay-providers/src/app/core/layout/`
La seule modification fonctionnelle du Layout est la route Véhicules : `/transport/vehicules`; le menu Chauffeurs garde temporairement `/transport/flotte`. Le lien de notification panne dirige aussi vers `/transport/vehicules`.

Dans `projects/iblopay-providers/src/app/app.routes.ts`, importer :
```ts
import { TransportVehiculesComponent } from './transport/vehicules/transport-vehicules.component';
```
Dans la propriété `children` de la route parent transport, ajouter :
```ts
{ path: 'vehicules', component: TransportVehiculesComponent },
```
Si votre routeur utilise des routes absolues à plat (pas de `children` transport), ajouter :
```ts
{ path: 'transport/vehicules', component: TransportVehiculesComponent },
```
N'ajoutez PAS les deux variantes simultanément. Ne remplacez pas tout `app.routes.ts` : son contenu complet n'a pas été fourni.

Image facultative utilisée dans le détail :
`projects/iblopay-providers/src/assets/images/bus1.jpg`
Si l'image n'existe pas, une icône de bus remplace son affichage.

IMPORTANT : les 10 véhicules et toutes les statistiques sont des DONNÉES DE DÉMONSTRATION en mémoire. Les commandes ajouter, modifier, supprimer, assigner, changer statut et synchroniser sont des simulations locales sans persistance serveur ; la page ne prétend pas utiliser TransportService. Branchez le véritable modèle et les méthodes API après validation du design.

Le Layout conserve l'identité BusGestion, la photo de sidebar existante et l'absence d'entrée Transactions dans le menu. La page Véhicules n'inclut ni sidebar ni topbar.
