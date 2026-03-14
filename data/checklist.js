// Données embarquées — généré depuis data/checklist.json
const CHECKLIST_DATA = {
  "_comment": "TSSR Notes — Référentiel de compétences. Formulées en mode 'Je suis capable de...'",
  "modules": [

    {
      "id": "reseau",
      "titre": "Réseaux",
      "emoji": "🌐",
      "domain": "reseau",
      "competences": [
        { "id": "res-01", "texte": "Je suis capable de décrire les 7 couches du modèle OSI et d'associer chaque couche à ses protocoles" },
        { "id": "res-02", "texte": "Je suis capable de calculer un sous-réseau IPv4 : adresse réseau, masque, broadcast et nombre d'hôtes utilisables" },
        { "id": "res-03", "texte": "Je suis capable de configurer un VLAN et un port Trunk (802.1Q) sur un switch Cisco" },
        { "id": "res-04", "texte": "Je suis capable de distinguer TCP et UDP, d'expliquer le 3-way handshake et de choisir le protocole adapté" },
        { "id": "res-05", "texte": "Je suis capable de configurer une route statique et une route par défaut sur un routeur" },
        { "id": "res-06", "texte": "Je suis capable d'expliquer le fonctionnement d'OSPF (aires, coût, élection DR/BDR, convergence)" },
        { "id": "res-07", "texte": "Je suis capable de diagnostiquer une panne réseau avec ping, traceroute, ip addr et ss -tulnp" },
        { "id": "res-08", "texte": "Je suis capable de citer les ports standards des principaux services (HTTP 80, HTTPS 443, SSH 22, DNS 53, DHCP 67/68, RDP 3389, SMB 445...)" }
      ]
    },

    {
      "id": "linux",
      "titre": "Systèmes Linux",
      "emoji": "🐧",
      "domain": "linux",
      "competences": [
        { "id": "lin-01", "texte": "Je suis capable de naviguer dans l'arborescence Linux (FHS) et de manipuler fichiers et répertoires (ls, cd, cp, mv, rm, find)" },
        { "id": "lin-02", "texte": "Je suis capable de gérer les droits Unix avec chmod (octale et symbolique) et chown, et d'expliquer SUID/SGID/sticky bit" },
        { "id": "lin-03", "texte": "Je suis capable de créer, modifier et supprimer des utilisateurs et groupes (useradd, usermod, passwd, groupadd)" },
        { "id": "lin-04", "texte": "Je suis capable de gérer les services avec systemd : start, stop, enable, status, et analyser les logs avec journalctl" },
        { "id": "lin-05", "texte": "Je suis capable de rechercher des fichiers avec find et filtrer du contenu avec grep, sed et awk" },
        { "id": "lin-06", "texte": "Je suis capable de configurer et diagnostiquer le réseau sous Linux (ip addr, ip route, ss, ping, traceroute)" },
        { "id": "lin-07", "texte": "Je suis capable d'analyser les journaux système avec journalctl et les fichiers dans /var/log" },
        { "id": "lin-08", "texte": "Je suis capable d'installer et gérer des paquets avec apt (Debian/Ubuntu) ou yum/dnf (RHEL/CentOS/Rocky)" }
      ]
    },

    {
      "id": "windows",
      "titre": "Windows Server",
      "emoji": "🪟",
      "domain": "windows",
      "competences": [
        { "id": "win-01", "texte": "Je suis capable d'installer Windows Server et de réaliser la configuration post-installation (réseau, nom, pare-feu) via PowerShell" },
        { "id": "win-02", "texte": "Je suis capable d'ajouter et configurer des rôles Windows Server (ADDS, DNS, DHCP, IIS) avec Install-WindowsFeature" },
        { "id": "win-03", "texte": "Je suis capable de configurer une adresse IP statique, les règles de pare-feu et les mises à jour via PowerShell" },
        { "id": "win-04", "texte": "Je suis capable de déployer le rôle DNS, de créer des zones et des enregistrements (A, PTR, CNAME, MX)" },
        { "id": "win-05", "texte": "Je suis capable de déployer le rôle DHCP, de créer des étendues avec options et des réservations MAC" },
        { "id": "win-06", "texte": "Je suis capable de diagnostiquer les problèmes Windows Server avec l'Observateur d'événements (Event Viewer)" },
        { "id": "win-07", "texte": "Je suis capable d'administrer un serveur Windows à distance via PowerShell Remoting (WinRM / Invoke-Command)" }
      ]
    },

    {
      "id": "securite",
      "titre": "Sécurité",
      "emoji": "🔒",
      "domain": "securite",
      "competences": [
        { "id": "sec-01", "texte": "Je suis capable d'expliquer la triade CIA et d'associer des mesures de protection concrètes à chaque pilier" },
        { "id": "sec-02", "texte": "Je suis capable d'identifier et de décrire les principales menaces : phishing, ransomware, DoS, MITM, injection SQL, XSS" },
        { "id": "sec-03", "texte": "Je suis capable de configurer des règles de pare-feu avec iptables, ufw ou firewalld en appliquant le principe deny-all" },
        { "id": "sec-04", "texte": "Je suis capable de mettre en œuvre une politique de mots de passe sécurisée conforme aux recommandations ANSSI" },
        { "id": "sec-05", "texte": "Je suis capable d'expliquer les mécanismes de PKI, les certificats X.509 et le fonctionnement de TLS 1.3" },
        { "id": "sec-06", "texte": "Je suis capable d'appliquer les 42 mesures du Guide d'hygiène informatique de l'ANSSI dans un contexte d'entreprise" },
        { "id": "sec-07", "texte": "Je suis capable de définir un PRA/PCA avec les notions de RTO (durée de rétablissement) et RPO (perte de données acceptable)" }
      ]
    },

    {
      "id": "virtualisation",
      "titre": "Virtualisation / Cloud",
      "emoji": "☁️",
      "domain": "virtualisation",
      "competences": [
        { "id": "virt-01", "texte": "Je suis capable de créer, configurer et gérer une machine virtuelle sous VMware ESXi/Workstation ou VirtualBox" },
        { "id": "virt-02", "texte": "Je suis capable d'expliquer la différence entre hyperviseur Type 1 (bare-metal) et Type 2 (hosted) avec des exemples" },
        { "id": "virt-03", "texte": "Je suis capable de distinguer VM et conteneur Docker (isolation, performance, portabilité) et de choisir la solution adaptée" },
        { "id": "virt-04", "texte": "Je suis capable de créer, démarrer, arrêter, inspecter et supprimer des conteneurs Docker (run, exec, logs, rm)" },
        { "id": "virt-05", "texte": "Je suis capable d'écrire un Dockerfile pour construire une image Docker personnalisée et la publier" },
        { "id": "virt-06", "texte": "Je suis capable d'utiliser Docker Compose pour orchestrer plusieurs conteneurs avec réseaux et volumes partagés" },
        { "id": "virt-07", "texte": "Je suis capable de distinguer IaaS, PaaS et SaaS, d'expliquer la matrice de responsabilité et de citer des exemples AWS/Azure/GCP" }
      ]
    },

    {
      "id": "bash",
      "titre": "Scripting Bash",
      "emoji": "⚙️",
      "domain": "scripting",
      "competences": [
        { "id": "bash-01", "texte": "Je suis capable d'écrire un script Bash structuré avec shebang, set -euo pipefail, variables et commentaires" },
        { "id": "bash-02", "texte": "Je suis capable d'utiliser les conditions (if/elif/else, [[ ]]) avec tests de fichiers, chaînes et nombres" },
        { "id": "bash-03", "texte": "Je suis capable d'écrire des boucles for, while et until pour automatiser des traitements répétitifs" },
        { "id": "bash-04", "texte": "Je suis capable d'écrire des fonctions Bash avec paramètres, variables locales et code de retour" },
        { "id": "bash-05", "texte": "Je suis capable de gérer les erreurs dans un script avec set -euo pipefail, trap et les codes de retour $?" },
        { "id": "bash-06", "texte": "Je suis capable de planifier l'exécution automatique d'un script avec cron (crontab, /etc/cron.d)" },
        { "id": "bash-07", "texte": "Je suis capable de déboguer un script Bash avec set -x, d'analyser les codes de retour et de gérer les logs" }
      ]
    },

    {
      "id": "powershell",
      "titre": "PowerShell",
      "emoji": "💠",
      "domain": "scripting",
      "competences": [
        { "id": "ps-01", "texte": "Je suis capable d'utiliser les cmdlets PowerShell fondamentaux (Get-*, Set-*, New-*, Remove-*, Start-*, Stop-*)" },
        { "id": "ps-02", "texte": "Je suis capable d'utiliser le pipeline pour filtrer (Where-Object), trier (Sort-Object) et sélectionner (Select-Object) des objets" },
        { "id": "ps-03", "texte": "Je suis capable d'écrire un script PowerShell avec param(), conditions, boucles, fonctions et Try/Catch" },
        { "id": "ps-04", "texte": "Je suis capable de gérer les erreurs PowerShell avec Try/Catch/Finally et -ErrorAction Stop" },
        { "id": "ps-05", "texte": "Je suis capable d'exécuter des commandes sur des machines distantes avec Invoke-Command et Enter-PSSession" },
        { "id": "ps-06", "texte": "Je suis capable d'utiliser Get-Help, Get-Command et Get-Member pour découvrir et explorer les cmdlets" },
        { "id": "ps-07", "texte": "Je suis capable d'automatiser des tâches Windows courantes (services, processus, fichiers, registre, exports CSV)" }
      ]
    },

    {
      "id": "ad",
      "titre": "Active Directory",
      "emoji": "🏢",
      "domain": "windows",
      "competences": [
        { "id": "ad-01", "texte": "Je suis capable d'installer le rôle ADDS et de promouvoir un serveur en contrôleur de domaine (nouveau domaine)" },
        { "id": "ad-02", "texte": "Je suis capable de créer et gérer des utilisateurs, groupes et OUs avec les cmdlets du module ActiveDirectory" },
        { "id": "ad-03", "texte": "Je suis capable de créer une GPO, de la lier à une OU et de diagnostiquer son application avec gpresult" },
        { "id": "ad-04", "texte": "Je suis capable d'expliquer les 5 rôles FSMO (Schema Master, Domain Naming, PDC Emulator, RID Master, Infrastructure Master)" },
        { "id": "ad-05", "texte": "Je suis capable de vérifier et diagnostiquer la réplication AD entre contrôleurs de domaine (repadmin, dcdiag)" },
        { "id": "ad-06", "texte": "Je suis capable d'intégrer les services DNS et DHCP dans une infrastructure Active Directory" },
        { "id": "ad-07", "texte": "Je suis capable de déléguer l'administration d'une OU à un compte ou groupe sans droits domain admin" }
      ]
    },

    {
      "id": "cisco",
      "titre": "Cisco avancé",
      "emoji": "🔧",
      "domain": "reseau",
      "competences": [
        { "id": "csc-01", "texte": "Je suis capable de naviguer dans les modes IOS Cisco (User EXEC, Privileged EXEC, Global Config, Interface Config)" },
        { "id": "csc-02", "texte": "Je suis capable de sécuriser l'accès à un équipement Cisco (enable secret, SSH v2, login local, exec-timeout)" },
        { "id": "csc-03", "texte": "Je suis capable de configurer des VLANs, des ports Access et des ports Trunk sur un switch Cisco IOS" },
        { "id": "csc-04", "texte": "Je suis capable de configurer OSPF sur un routeur Cisco, de vérifier les voisins et les routes apprises" },
        { "id": "csc-05", "texte": "Je suis capable de créer et d'appliquer des ACL standard et étendues nommées sur les interfaces d'un routeur" },
        { "id": "csc-06", "texte": "Je suis capable de configurer le NAT statique, dynamique et le PAT (NAT Overload) sur un routeur Cisco" },
        { "id": "csc-07", "texte": "Je suis capable de diagnostiquer des problèmes réseau avec show ip route, show interfaces, show ip ospf neighbor" }
      ]
    },

    {
      "id": "itil",
      "titre": "ITIL / GLPI",
      "emoji": "📋",
      "domain": "stockage",
      "competences": [
        { "id": "itil-01", "texte": "Je suis capable d'expliquer les principaux processus ITIL v4 et leur contribution à la chaîne de valeur des services" },
        { "id": "itil-02", "texte": "Je suis capable de gérer le cycle de vie complet d'un incident : détection, classification, escalade, résolution, clôture" },
        { "id": "itil-03", "texte": "Je suis capable de distinguer un incident, un problème et une demande de service et de les traiter selon le processus ITIL" },
        { "id": "itil-04", "texte": "Je suis capable de définir et d'appliquer les priorités P1 à P5 en fonction de l'impact et de l'urgence (matrice SLA)" },
        { "id": "itil-05", "texte": "Je suis capable d'utiliser GLPI pour créer, qualifier, affecter, escalader et clôturer des tickets d'incidents et de demandes" },
        { "id": "itil-06", "texte": "Je suis capable de rédiger un post-mortem (Root Cause Analysis) après un incident majeur en mode blame-free" }
      ]
    }

  ]
};
