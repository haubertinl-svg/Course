# Foulée – installation (gratuite, ~15 min)

## 1. Héberger l'appli (GitHub Pages)
1. Crée un dépôt GitHub public, envoie-y `index.html`, `manifest.json`, `sw.js`, `icon.svg`.
2. Settings → Pages → Branch `main` → Save. Ton URL : `https://TONPSEUDO.github.io/NOMDUREPO/`

## 2. Créer l'app Strava
1. https://www.strava.com/settings/api → crée une application.
2. **Authorization Callback Domain** : `TONPSEUDO.github.io`
3. Note le **Client ID** et le **Client Secret**.

## 3. Déployer le Worker (Cloudflare, gratuit)
1. Compte sur https://dash.cloudflare.com → Workers & Pages → Create → Hello World.
2. Colle le contenu de `worker.js`, Deploy.
3. Settings → Variables : `CLIENT_ID`, `CLIENT_SECRET` (type Secret), `ALLOWED_ORIGIN` = `https://TONPSEUDO.github.io` (sans slash final ni chemin).
4. Note l'URL du Worker.

## 4. Clé Gemini (optionnel, gratuit)
https://aistudio.google.com/apikey → crée une clé.

## 5. Utiliser
Ouvre l'URL de l'appli sur ton téléphone → Réglages → colle Client ID, URL du Worker, clé Gemini → Connecter Strava.
Menu du navigateur → « Ajouter à l'écran d'accueil ».

## Montre Nothing / CMF
Nothing X n'a pas d'API publique. Dans l'appli Nothing X, active la synchro Strava (si disponible dans tes réglages), sinon passe par Health Connect ou exporte tes sorties vers Strava.
La cadence et la FC doivent être enregistrées pendant la course pour apparaître.
