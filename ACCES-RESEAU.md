# Accéder à l'application depuis le réseau (Wi-Fi/LAN)

## Le problème

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
