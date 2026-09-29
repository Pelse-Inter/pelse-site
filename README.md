# pelse-site

Site vitrine public de **Pelse** — [pelse.fr](https://pelse.fr).

Totalement indépendant de l'application : dépôt distinct, projet Vercel
distinct, export statique. Le seul lien avec l'app est une URL. Le site ne peut
donc rien casser côté application, et il reste en ligne même si l'application,
elle, tombe.

## Ce qu'il n'y a pas

Aucun traceur, aucun cookie, aucun script d'un autre domaine, aucune mesure
d'audience. Il n'y a donc **pas de bandeau cookies** : il n'y a rien à
consentir. La police (Inter, la même que dans l'application) est
auto-hébergée, ce qui évite l'appel à Google Fonts.

## Développer

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # écrit le site statique dans out/
npm start          # sert out/ pour vérifier le résultat réel
```

## Les pages

- `/` — l'accueil : l'accroche, puis le **parcours d'une intervention** en
  cinq étapes, avec les couleurs qu'elles portent dans l'app.
- `/visite/` — **l'application écran par écran**, à envoyer à un prospect
  (« pelse.fr/visite ») : ordinateur, téléphone, documents, thèmes.
- `/faq/` — les questions fréquentes, vers lesquelles l'app renvoie.
- `/mentions-legales/`, `/cgv/`, `/confidentialite/` — renvoient vers les
  pages de l'application, qui font foi (une seule version des textes).

## Les captures d'écran

Elles viennent du dépôt de l'application, où elles se produisent en une
commande sur un jeu de démonstration **entièrement fictif** (« Moreau Élec » :
entreprise, clients et numéros de téléphone inventés, ces derniers pris dans
les tranches réservées à la fiction par l'ARCEP).

```bash
# dans le dépôt de l'app (base LOCALE — le script refuse la production)
node scripts/demo/seed.ts
npm run build && npx next start -p 3100     # puis, dans un autre terminal :
node scripts/demo/captures.mjs captures-site
```

Puis ici, pour les convertir en WebP aux bonnes largeurs, et refaire l'image
de partage (celle qu'affichent WhatsApp et les SMS) :

```bash
CAPTURES_SRC=../pelse/captures-site npm run images
npm run og        # CHROME=/chemin/vers/chrome hors macOS
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

**État relevé le 19/08/2026** — à vérifier avant d'agir, ça a pu bouger :

| Nom | Type | Valeur actuelle | Quoi en faire |
|---|---|---|---|
| `@` | A | `216.198.79.1` | **garder** — c'est déjà Vercel |
| `@` | A | `213.186.33.5` | **supprimer** — parking OVH |
| `www` | A | `213.186.33.5` | **remplacer** par un CNAME vers Vercel |
| `app` | CNAME | `…vercel-dns-017.com` | **ne pas toucher** — c'est l'application |
| `@` | MX | `mail.protonmail.ch`, `mailsec…` | **ne pas toucher** — votre messagerie |
| `@` | TXT | `protonmail-verification=…`, `v=spf1…` | **ne pas toucher** |

Deux enregistrements A sur `@`, c'est un tirage au sort : un visiteur sur deux
tombe sur la page de parking d'OVH. D'où la suppression du `213.186.33.5`.

`pelse.fr` répond aujourd'hui **404** : l'adresse pointe bien vers Vercel, mais
aucun projet Vercel ne réclame encore ce domaine. C'est l'étape 2 qui le règle.

`send.pelse.fr` ne résout rien pour l'instant : si Resend doit s'en servir, ce
sera à configurer séparément — sans rapport avec le site.

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
