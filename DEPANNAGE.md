# Dépannage — accès à l'application

## 1. "ERR_CONNECTION_REFUSED" même sur http://localhost:11200/

Si la page ne s'affiche **ni** en local **ni** sur le réseau, ce n'est pas un problème
réseau : le serveur `ng serve` n'a tout simplement pas réussi à démarrer.

**Cause fréquente** : un fichier `package-lock.json` généré sur un autre système
d'exploitation peut faire échouer l'installation des dépendances "optionnelles"
de Rollup/Vite (bug connu de npm : https://github.com/npm/cli/issues/4828).
Le symptôme dans le terminal ressemble à :
```
Error: Cannot find module @rollup/rollup-linux-x64-gnu
```
ou une erreur similaire mentionnant `@rollup/rollup-win32-x64-msvc`,
`@esbuild/...`, etc.

**Solution** : réinstallez proprement les dépendances.

- **Windows (PowerShell ou cmd)** :
  ```
  rmdir /s /q node_modules
  del package-lock.json
  npm install
  npm run start:providers
  ```
- **Mac / Linux** :
  ```
  rm -rf node_modules package-lock.json
  npm install
  npm run start:providers
  ```

Vérifiez ensuite que le terminal affiche bien une ligne `Local: http://localhost:11200/`
**sans erreur juste avant** — c'est le signe que le serveur a démarré correctement.

## 2. Accéder à l'application depuis le réseau (Wi-Fi/LAN)


Quand vous lancez `npm run start:providers`, Angular affiche deux adresses :

```
Local:   http://localhost:11200/
Network: http://192.168.56.1:11200/
```

Si l'adresse "Network" commence par **192.168.56.x**, ce n'est presque toujours **pas**
votre vraie adresse Wi-Fi/Ethernet : c'est l'adresse de l'**adaptateur réseau virtuel
"VirtualBox Host-Only"**, installé automatiquement avec VirtualBox (souvent présent
si vous avez Docker Desktop, WSL2, Android Studio, ou une VM installée sur votre PC).

Cet adaptateur n'est **pas relié à votre vrai réseau Wi-Fi/Ethernet** : il n'est
accessible que depuis votre propre PC, jamais depuis un téléphone ou un autre
ordinateur sur le même Wi-Fi. C'est pourquoi la page reste bloquée en chargement
("tourne pendant une longue durée") quand vous essayez de l'ouvrir depuis un autre
appareil : la requête part vers une adresse qui n'existe pas sur votre vrai réseau,
et le navigateur attend une réponse qui ne viendra jamais.

## La solution

### 1. Si vous ouvrez l'app sur le même PC qui exécute `npm run start:providers`
Utilisez simplement :
```
http://localhost:11200/
```

### 2. Si vous voulez y accéder depuis un autre appareil (téléphone, autre PC) sur le même Wi-Fi
Trouvez votre **vraie** adresse IP locale (celle de votre carte Wi-Fi/Ethernet, pas
celle de VirtualBox) :

- **Windows** : ouvrez l'invite de commandes (`cmd`) et tapez :
  ```
  ipconfig
  ```
  Cherchez la section "Carte réseau sans fil Wi-Fi" (ou "Ethernet") et notez
  l'"Adresse IPv4". Elle ressemble généralement à `192.168.1.x` ou `192.168.0.x`
  (pas `192.168.56.x`, qui est VirtualBox).

- **Mac / Linux** :
  ```
  ifconfig
  ```
  ou
  ```
  ip addr
  ```
  Cherchez l'adresse IPv4 de l'interface `en0`/`wlan0` (Wi-Fi) ou `eth0` (Ethernet).

Ensuite, sur l'autre appareil, ouvrez :
```
http://<votre-vraie-IP>:11200/
```

### 3. Vérifiez le pare-feu Windows
Si ça ne marche toujours pas, le pare-feu Windows peut bloquer les connexions
entrantes vers Node.js sur le port 11200. Autorisez Node.js dans :
`Panneau de configuration → Pare-feu Windows Defender → Applications autorisées`
(cochez les réseaux "Privé" et "Public" si besoin), ou autorisez temporairement
le port 11200 en TCP entrant.

### 4. Astuce : désactiver l'adaptateur VirtualBox si vous ne l'utilisez pas
Si vous n'utilisez pas activement VirtualBox, vous pouvez désactiver l'adaptateur
"VirtualBox Host-Only Network" dans les paramètres réseau de Windows — Angular
n'affichera alors plus que votre vraie adresse réseau, ce qui évite la confusion
à l'avenir.
