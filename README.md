# pelse-site

Site vitrine public de **Pelse** — [pelse.fr](https://pelse.fr).

Totalement indépendant de l'application : dépôt distinct, projet Vercel
distinct, export statique. Le seul lien avec l'app est une URL. Le site ne peut
donc rien casser côté application, et il reste en ligne même si l'application,
elle, tombe.

## Ce qu'il n'y a pas

Aucun traceur, aucun cookie, aucun script d'un autre domaine, aucune mesure
d'audience. Il n'y a donc **pas de bandeau cookies** : il n'y a rien à
consentir. La police est auto-hébergée — extraite de la maquette, donc
identique — ce qui évite l'appel à Google Fonts.

## Développer

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # écrit le site statique dans out/
npm start          # sert out/ pour vérifier le résultat réel
```

## Les captures d'écran

Elles viennent du dépôt de l'application, où elles se produisent en une
commande sur un jeu de démonstration **entièrement fictif** (entreprise,
clients et numéros de téléphone inventés, ces derniers pris dans les tranches
réservées à la fiction par l'ARCEP).

```bash
# dans le dépôt de l'app
npm run db:vitrine && npm run dev   # puis, dans un autre terminal :
npm run captures
```

Puis ici, pour les convertir en WebP aux bonnes largeurs :

```bash
npm run images
```

Le résultat est versionné : personne n'a besoin de regénérer quoi que ce soit
pour déployer.

## Mise en ligne — à faire à la main

Le code est prêt ; ces trois étapes demandent un accès aux comptes.

### 1. Projet Vercel

1. Vercel → **Add New… → Project** → importer le dépôt `Pelse-Inter/pelse-site`.
2. Framework : Next.js (détecté). Aucune variable d'environnement à créer.
3. Déployer, puis vérifier l'URL de préversion.

⚠ **Ne pas toucher au projet Vercel de l'application.** Ce sont deux projets
séparés, c'est voulu.

### 2. Domaines

Vercel → projet `pelse-site` → **Settings → Domains** :

- ajouter `pelse.fr` — domaine principal ;
- ajouter `www.pelse.fr` — le configurer en **redirection vers `pelse.fr`**
  (Vercel propose une 308, c'est la bonne).

### 3. DNS chez OVH

Zone DNS de `pelse.fr` → créer **exactement** les enregistrements que Vercel
affiche à l'étape précédente. Typiquement :

| Type  | Nom | Cible                    |
|-------|-----|--------------------------|
| A     | `@` | l'IP indiquée par Vercel |
| CNAME | `www` | `cname.vercel-dns.com` |

⚠ **Ne toucher à rien d'autre.** En particulier, laisser en place :

- `app` — c'est l'application, elle pointe déjà ailleurs ;
- les enregistrements **MX** et tout ce qui concerne la messagerie ;
- `send` — utilisé par Resend pour l'envoi des courriels.

La propagation prend de quelques minutes à quelques heures. Vercel émet le
certificat tout seul une fois les enregistrements vus.

## À compléter avant l'ouverture au public

Les trois pages légales sont des **gabarits**. Elles portent la structure
attendue et des marqueurs `TODO Simon`, mais aucun contenu juridique n'a été
inventé : une mention légale fausse engage davantage qu'une mention absente.

- `/mentions-legales` — éditeur, hébergeur, propriété intellectuelle ;
- `/cgv` — prix, essai, résiliation, responsabilité ;
- `/confidentialite` — traitements, sous-traitants, droits.

## Vérifier avant de publier

```bash
npm run build && npm start
node scripts/comparer.mjs   # compare le rendu à la maquette en 380 / 768 / 1280
```
