// Données embarquées — généré depuis data/quiz.json
const QUIZ_DATA = {
  "_comment": "TSSR Notes — Banque de questions. 50 questions squelettes, 5 par module. À enrichir.",
  "questions": [

    {
      "id": "q001", "module": "reseau", "difficulte": "facile",
      "question": "Combien de couches comporte le modèle OSI ?",
      "choix": ["4 couches", "5 couches", "7 couches", "9 couches"],
      "reponse": 2,
      "explication": "Le modèle OSI comporte 7 couches : Physique (1), Liaison (2), Réseau (3), Transport (4), Session (5), Présentation (6) et Application (7). Moyen mnémotechnique : « Please Do Not Throw Sausage Pizza Away »."
    },
    {
      "id": "q002", "module": "reseau", "difficulte": "facile",
      "question": "Quel protocole de la couche Transport est orienté connexion et garantit la fiabilité par accusés de réception ?",
      "choix": ["UDP", "ICMP", "TCP", "ARP"],
      "reponse": 2,
      "explication": "TCP (Transmission Control Protocol) établit une connexion via un 3-way handshake (SYN → SYN-ACK → ACK), garantit l'ordre de livraison et retransmet les paquets perdus. UDP est sans connexion et plus rapide mais sans garantie."
    },
    {
      "id": "q003", "module": "reseau", "difficulte": "moyen",
      "question": "Quelle est la plage d'adresses privées de classe B selon la RFC 1918 ?",
      "choix": ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16", "169.254.0.0/16"],
      "reponse": 1,
      "explication": "Les 3 plages privées RFC 1918 sont : 10.0.0.0/8 (classe A), 172.16.0.0/12 (classe B — de 172.16.0.0 à 172.31.255.255) et 192.168.0.0/16 (classe C). 169.254.0.0/16 est l'APIPA (adresse auto-configurée quand le DHCP est absent)."
    },
    {
      "id": "q004", "module": "reseau", "difficulte": "moyen",
      "question": "Quel protocole de routage dynamique utilise l'algorithme de Dijkstra (Shortest Path First) ?",
      "choix": ["RIP v2", "EIGRP", "BGP", "OSPF"],
      "reponse": 3,
      "explication": "OSPF (Open Shortest Path First) est un protocole IGP Link-State qui calcule le meilleur chemin avec l'algorithme de Dijkstra. Il utilise le coût (basé sur la bande passante) comme métrique. BGP est EGP/Path-Vector, EIGRP est hybride Cisco, RIP utilise Bellman-Ford."
    },
    {
      "id": "q005", "module": "reseau", "difficulte": "difficile",
      "question": "Combien d'adresses hôtes utilisables contient un sous-réseau /27 ?",
      "choix": ["14 hôtes", "30 hôtes", "62 hôtes", "126 hôtes"],
      "reponse": 1,
      "explication": "Un masque /27 laisse 5 bits pour les hôtes : 2^5 = 32 adresses totales. En retirant l'adresse réseau et le broadcast, il reste 30 hôtes utilisables. Formule générale : 2^(32-préfixe) - 2."
    },

    {
      "id": "q006", "module": "linux", "difficulte": "facile",
      "question": "Quelle commande Linux affiche tous les processus en cours d'exécution avec leurs détails ?",
      "choix": ["top -a", "ls -proc", "jobs -l", "ps aux"],
      "reponse": 3,
      "explication": "ps aux affiche tous les processus (a = tous les utilisateurs, u = format orienté utilisateur, x = processus sans terminal). top et htop sont des moniteurs interactifs en temps réel, mais ps aux est la commande instantanée de référence."
    },
    {
      "id": "q007", "module": "linux", "difficulte": "moyen",
      "question": "Dans quel fichier Linux sont stockés les mots de passe hashés des utilisateurs ?",
      "choix": ["/etc/passwd", "/etc/group", "/etc/shadow", "/etc/security"],
      "reponse": 2,
      "explication": "/etc/shadow contient les mots de passe hashés (bcrypt, SHA-512) et est lisible uniquement par root. /etc/passwd contient les informations publiques des comptes (UID, GID, répertoire, shell) mais pas les mots de passe réels (remplacés par 'x')."
    },
    {
      "id": "q008", "module": "linux", "difficulte": "moyen",
      "question": "Quelle notation octale correspond aux permissions rwxr-xr-- ?",
      "choix": ["754", "755", "744", "645"],
      "reponse": 0,
      "explication": "rwxr-xr-- se décompose en : r(4)+w(2)+x(1)=7 pour le propriétaire, r(4)+x(1)=5 pour le groupe, r(4)=4 pour les autres. Ce qui donne 754. chmod 754 fichier.sh applique ces permissions."
    },
    {
      "id": "q009", "module": "linux", "difficulte": "moyen",
      "question": "Quelle commande remplace netstat pour afficher les ports TCP/UDP en écoute avec le PID associé ?",
      "choix": ["nmap -sT", "ss -tulnp", "ip link show", "lsof -net"],
      "reponse": 1,
      "explication": "ss (Socket Statistics) est le remplaçant moderne de netstat. ss -tulnp affiche : t=TCP, u=UDP, l=en écoute (listening), n=numérique (pas de résolution), p=processus. Intégré à iproute2, installé par défaut sur toutes les distributions modernes."
    },
    {
      "id": "q010", "module": "linux", "difficulte": "difficile",
      "question": "Qu'est-ce que le bit SUID (Set User ID) sur un fichier exécutable ?",
      "choix": [
        "Le fichier s'exécute uniquement en root",
        "Le fichier hérite des permissions du répertoire parent",
        "Le fichier s'exécute avec les droits du propriétaire du fichier, pas de celui qui le lance",
        "Le fichier est protégé contre la suppression"
      ],
      "reponse": 2,
      "explication": "Le SUID (chmod 4xxx ou chmod u+s) permet à un exécutable de tourner avec les droits de son propriétaire, indépendamment de qui le lance. Exemple classique : /usr/bin/passwd est SUID root, ce qui permet à n'importe quel utilisateur de changer son propre mot de passe sans être root."
    },

    {
      "id": "q011", "module": "windows", "difficulte": "facile",
      "question": "Quel rôle Windows Server fournit l'annuaire centralisé pour l'authentification des utilisateurs du domaine ?",
      "choix": ["ADDS (Active Directory Domain Services)", "DNS Server", "DHCP Server", "IIS (Web Server)"],
      "reponse": 0,
      "explication": "ADDS (Active Directory Domain Services) est le rôle qui implémente l'annuaire LDAP et le service d'authentification Kerberos. Il est le cœur de l'infrastructure Windows en entreprise, gérant utilisateurs, ordinateurs, groupes et stratégies de groupe (GPO)."
    },
    {
      "id": "q012", "module": "windows", "difficulte": "moyen",
      "question": "Sur quel port communique le protocole LDAP (non chiffré) utilisé par Active Directory ?",
      "choix": ["88", "139", "389", "445"],
      "reponse": 2,
      "explication": "LDAP utilise le port 389 (TCP/UDP). LDAPS (LDAP sécurisé via TLS) utilise le port 636. Le port 88 est Kerberos, 139/445 sont SMB (partages de fichiers Windows), 445 est aussi utilisé pour les GPO."
    },
    {
      "id": "q013", "module": "windows", "difficulte": "moyen",
      "question": "Quelle commande PowerShell active la gestion à distance (PSRemoting) sur un serveur Windows ?",
      "choix": ["Start-PSRemoting -Force", "Enable-PSRemoting -Force", "Set-PSRemoting -Enable", "Install-PSRemoting"],
      "reponse": 1,
      "explication": "Enable-PSRemoting -Force configure WinRM (Windows Remote Management), crée les règles de pare-feu nécessaires et active le service. WinRM écoute sur le port 5985 (HTTP) et 5986 (HTTPS). Cette commande est nécessaire pour utiliser Invoke-Command ou Enter-PSSession."
    },
    {
      "id": "q014", "module": "windows", "difficulte": "moyen",
      "question": "Quel protocole d'authentification est utilisé par défaut dans un domaine Active Directory ?",
      "choix": ["NTLM v2", "NTLMv1", "Digest", "Kerberos"],
      "reponse": 3,
      "explication": "Kerberos est le protocole d'authentification par défaut dans AD depuis Windows 2000. Il repose sur des tickets (TGT et TGS) émis par le KDC (Key Distribution Center). NTLM est utilisé en fallback pour les machines hors domaine ou les accès par IP. NTLMv1 est obsolète et doit être désactivé."
    },
    {
      "id": "q015", "module": "windows", "difficulte": "difficile",
      "question": "Quel est le rôle principal de l'outil sysprep dans le déploiement Windows ?",
      "choix": [
        "Généralise l'image en supprimant le SID unique et les informations spécifiques à la machine",
        "Installe automatiquement les drivers manquants après un déploiement",
        "Clone une partition disque vers un serveur de déploiement",
        "Crée un point de restauration système avant toute mise à jour"
      ],
      "reponse": 0,
      "explication": "sysprep (System Preparation Tool) généralise une image Windows en supprimant le SID (Security Identifier) unique de la machine, le nom de l'ordinateur, les informations d'activation et les pilotes spécifiques. Sans sysprep, le clonage d'une VM produirait des conflits de SID dans le domaine."
    },

    {
      "id": "q016", "module": "securite", "difficulte": "facile",
      "question": "Que signifie la triade CIA en sécurité des systèmes d'information ?",
      "choix": [
        "Contrôle, Identification, Accès",
        "Confidentialité, Intégrité, Disponibilité",
        "Chiffrement, Isolation, Authentification",
        "Continuité, Infrastructure, Accès"
      ],
      "reponse": 1,
      "explication": "La triade CIA est le fondement de la sécurité de l'information : Confidentialité (seuls les utilisateurs autorisés accèdent aux données), Intégrité (les données ne sont pas altérées de façon non autorisée) et Disponibilité (le système est accessible quand nécessaire). Toute mesure de sécurité vise à protéger un ou plusieurs de ces piliers."
    },
    {
      "id": "q017", "module": "securite", "difficulte": "facile",
      "question": "Sur quel port le protocole HTTPS écoute-t-il par défaut ?",
      "choix": ["443", "80", "8443", "8080"],
      "reponse": 0,
      "explication": "HTTPS (HTTP Secure = HTTP sur TLS) écoute par défaut sur le port 443/TCP. HTTP non chiffré utilise le port 80. Les ports 8080 et 8443 sont des alternatives communes pour les environnements de développement ou quand les ports standards sont déjà utilisés."
    },
    {
      "id": "q018", "module": "securite", "difficulte": "moyen",
      "question": "Quel algorithme de hachage est recommandé pour les signatures numériques en 2024 ?",
      "choix": ["MD5 (128 bits)", "SHA-1 (160 bits)", "SHA-256 (256 bits)", "DES (56 bits)"],
      "reponse": 2,
      "explication": "SHA-256 (famille SHA-2) est l'algorithme de hachage recommandé pour les signatures. MD5 et SHA-1 sont considérés comme brisés cryptographiquement (collisions connues) et ne doivent plus être utilisés pour les signatures. Pour les mots de passe, on préfère bcrypt ou Argon2 qui sont conçus pour être lents."
    },
    {
      "id": "q019", "module": "securite", "difficulte": "moyen",
      "question": "Quel est le principe de moindre privilège (least privilege) en sécurité informatique ?",
      "choix": [
        "Chiffrer toutes les communications avec le niveau de chiffrement minimum suffisant",
        "Limiter l'accès Internet aux seuls employés seniors",
        "Désactiver tous les services réseau non essentiels",
        "N'accorder à chaque compte que les droits strictement nécessaires à ses fonctions"
      ],
      "reponse": 3,
      "explication": "Le principe de moindre privilège consiste à n'accorder à chaque utilisateur, service ou processus que les permissions minimales nécessaires à l'accomplissement de ses tâches. Exemple : un service web n'a pas besoin des droits root pour servir des fichiers statiques — il doit tourner avec un compte dédié à faibles privilèges."
    },
    {
      "id": "q020", "module": "securite", "difficulte": "difficile",
      "question": "En quoi consiste une attaque « Pass-the-Hash » ?",
      "choix": [
        "Intercepter et rejouer un token JWT expiré pour usurper une session",
        "Utiliser le hash NTLM d'un mot de passe capturé pour s'authentifier sans connaître le mot de passe en clair",
        "Injecter du code malveillant dans un cookie de session HTTP",
        "Forcer la dégradation TLS pour capturer des identifiants en clair"
      ],
      "reponse": 1,
      "explication": "Pass-the-Hash exploite le fait que Windows peut authentifier un utilisateur avec son hash NTLM sans jamais demander le mot de passe en clair. L'attaquant capture le hash (via Mimikatz par exemple) et l'utilise directement. Contre-mesures : Credential Guard, LAPS, passer à Kerberos, désactiver NTLM."
    },

    {
      "id": "q021", "module": "virtualisation", "difficulte": "facile",
      "question": "Quelle est la caractéristique principale d'un hyperviseur de Type 1 ?",
      "choix": [
        "Il s'installe comme une application sur Windows ou macOS",
        "Il nécessite un accès Internet pour fonctionner",
        "Il s'exécute directement sur le matériel (bare-metal) sans OS hôte",
        "Il ne peut gérer qu'une seule machine virtuelle à la fois"
      ],
      "reponse": 2,
      "explication": "Un hyperviseur Type 1 (bare-metal) s'exécute directement sur le matériel physique sans OS intermédiaire, offrant de meilleures performances et isolation. Exemples : VMware ESXi, Microsoft Hyper-V, KVM. Un hyperviseur Type 2 (VMware Workstation, VirtualBox) tourne comme une application sur un OS hôte."
    },
    {
      "id": "q022", "module": "virtualisation", "difficulte": "facile",
      "question": "Quelle commande Docker affiche uniquement les conteneurs actuellement en cours d'exécution ?",
      "choix": ["docker ps", "docker ls -a", "docker images", "docker status"],
      "reponse": 0,
      "explication": "docker ps liste les conteneurs actifs (en cours d'exécution). Pour voir tous les conteneurs y compris ceux arrêtés, on ajoute le flag -a (docker ps -a). docker images liste les images locales disponibles."
    },
    {
      "id": "q023", "module": "virtualisation", "difficulte": "facile",
      "question": "Dans un modèle cloud IaaS, qu'est-ce que le fournisseur met à disposition du client ?",
      "choix": [
        "L'application complète prête à l'emploi (SaaS)",
        "L'infrastructure (serveurs, réseau, stockage) virtualisée",
        "La plateforme de développement et le middleware (PaaS)",
        "Uniquement le stockage objet"
      ],
      "reponse": 1,
      "explication": "IaaS (Infrastructure as a Service) fournit les ressources d'infrastructure virtualisées : serveurs (VMs), réseau, stockage. Le client gère l'OS, le middleware et les applications. Exemples : AWS EC2, Azure Virtual Machines, GCP Compute Engine. IaaS < PaaS < SaaS en termes de responsabilité client."
    },
    {
      "id": "q024", "module": "virtualisation", "difficulte": "moyen",
      "question": "Quel fichier décrit la configuration d'une application multi-conteneurs pour Docker Compose ?",
      "choix": ["Dockerfile", "docker-compose.yml (ou compose.yml)", ".dockerignore", "container.json"],
      "reponse": 1,
      "explication": "docker-compose.yml (ou compose.yml depuis Docker Compose V2) définit les services, réseaux et volumes d'une application multi-conteneurs. Le Dockerfile définit comment construire une seule image. Docker Compose orchestre le démarrage/arrêt coordonné de plusieurs conteneurs avec docker compose up."
    },
    {
      "id": "q025", "module": "virtualisation", "difficulte": "difficile",
      "question": "Que permet la technologie VMware vMotion ?",
      "choix": [
        "Sauvegarder une VM vers un stockage distant sans l'éteindre",
        "Cloner une VM en moins de 60 secondes",
        "Migrer une VM d'un hôte physique à un autre à chaud, sans interruption de service",
        "Fusionner deux VMs en une seule avec leurs données"
      ],
      "reponse": 2,
      "explication": "vMotion (VMware) permet la migration à chaud (live migration) d'une VM entre hôtes ESXi sans interruption de service ni perte de connexions réseau. L'équivalent Microsoft s'appelle Live Migration (Hyper-V). Cela nécessite un stockage partagé (SAN/NAS) ou vSAN entre les hôtes."
    },

    {
      "id": "q026", "module": "bash", "difficulte": "facile",
      "question": "Comment capturer la sortie d'une commande dans une variable en Bash ?",
      "choix": [
        "variable = `commande`  (backticks)",
        "variable=$(commande)",
        "variable=<(commande)",
        "variable={commande}"
      ],
      "reponse": 1,
      "explication": "La substitution de commande $(commande) est la méthode recommandée. Les backticks `commande` sont l'ancienne syntaxe, toujours valide mais moins lisible et non nestable. Exemple : date=$(date +%Y-%m-%d) capture la date du jour. nb=$(wc -l < fichier.txt) compte les lignes."
    },
    {
      "id": "q027", "module": "bash", "difficulte": "moyen",
      "question": "Que contient la variable spéciale $? en Bash ?",
      "choix": [
        "Le code de retour (exit code) de la dernière commande exécutée",
        "L'identifiant du processus en cours (PID)",
        "Le nombre de paramètres passés au script",
        "La liste de tous les paramètres positionnels"
      ],
      "reponse": 0,
      "explication": "$? contient le code de retour de la dernière commande : 0 = succès, toute valeur non nulle = échec. C'est la base des tests de condition : if command; then ... est équivalent à command; if [[ $? -eq 0 ]]; then ... mais la première forme est préférable. $$ = PID, $# = nombre de paramètres, $@ = tous les paramètres."
    },
    {
      "id": "q028", "module": "bash", "difficulte": "moyen",
      "question": "Que fait l'option set -e dans un script Bash ?",
      "choix": [
        "Active l'affichage de chaque commande avant son exécution (debug)",
        "Rend toutes les variables en lecture seule (readonly)",
        "Arrête immédiatement le script si une commande retourne un code non nul",
        "Active le mode interactif pour les confirmations utilisateur"
      ],
      "reponse": 2,
      "explication": "set -e (errexit) arrête le script dès qu'une commande échoue (code retour ≠ 0), évitant l'exécution en cascade sur une erreur. En combinaison : set -euo pipefail — -u = erreur si variable non définie, -o pipefail = le code de retour d'un pipeline est celui de la dernière commande qui a échoué. set -x active le debug (affiche chaque commande)."
    },
    {
      "id": "q029", "module": "bash", "difficulte": "moyen",
      "question": "Quel shebang est recommandé pour qu'un script Bash soit portable sur différents systèmes ?",
      "choix": [
        "#!/bin/bash",
        "#!/usr/bin/bash",
        "#!/bin/sh",
        "#!/usr/bin/env bash"
      ],
      "reponse": 3,
      "explication": "#!/usr/bin/env bash est le shebang portable recommandé car il recherche bash dans le PATH, quelle que soit son emplacement exact (/bin/bash sur Linux, /usr/local/bin/bash sur macOS avec Homebrew, etc.). #!/bin/bash est courant sur Linux mais peut échouer sur d'autres Unix où bash est ailleurs."
    },
    {
      "id": "q030", "module": "bash", "difficulte": "difficile",
      "question": "Que fait la commande trap cleanup EXIT dans un script Bash ?",
      "choix": [
        "Elle exécute la fonction cleanup si le script reçoit le signal SIGKILL",
        "Elle empêche le script de se terminer sans confirmation de l'utilisateur",
        "Elle enregistre un gestionnaire qui appellera cleanup à la fin du script, quelle qu'en soit la cause",
        "Elle crée un alias nommé EXIT qui pointe vers la fonction cleanup"
      ],
      "reponse": 2,
      "explication": "trap commande SIGNAL enregistre un gestionnaire de signal. EXIT est un pseudo-signal déclenché à toute sortie du script (normale, erreur, ou signal). C'est le pattern standard pour garantir le nettoyage : trap 'rm -f /tmp/lock.*; echo Nettoyage...' EXIT. Attention : SIGKILL (kill -9) ne peut pas être intercepté."
    },

    {
      "id": "q031", "module": "powershell", "difficulte": "facile",
      "question": "Quel cmdlet PowerShell liste les services Windows et leur état (Running/Stopped) ?",
      "choix": ["List-Services", "Show-Service -All", "Get-Process -Services", "Get-Service"],
      "reponse": 3,
      "explication": "Get-Service liste tous les services Windows avec leur nom, DisplayName et Status. On peut filtrer avec Where-Object : Get-Service | Where-Object Status -eq 'Running'. Pour un service spécifique : Get-Service -Name 'W3SVC'. La convention PowerShell est Verbe-Nom, avec des verbes approuvés (Get, Set, New, Remove, Start, Stop…)."
    },
    {
      "id": "q032", "module": "powershell", "difficulte": "moyen",
      "question": "Quelle est la spécificité fondamentale du pipeline PowerShell par rapport au pipe Bash ?",
      "choix": [
        "Il est 10 fois plus rapide car il utilise des threads parallèles",
        "Il transmet des objets .NET structurés et non du texte brut",
        "Il ne peut connecter que 2 commandes maximum",
        "Il fonctionne uniquement avec les cmdlets Microsoft"
      ],
      "reponse": 1,
      "explication": "Le pipeline PowerShell transmet des objets .NET avec leurs propriétés et méthodes, pas du texte. Exemple : Get-Service | Where-Object Status -eq 'Running' filtre les objets ServiceController sans parsing de texte. En Bash, le pipe transmet du texte et nécessite awk/grep/sed pour l'analyser. C'est la différence architecturale fondamentale."
    },
    {
      "id": "q033", "module": "powershell", "difficulte": "moyen",
      "question": "Quel cmdlet PowerShell crée un nouvel utilisateur dans Active Directory ?",
      "choix": ["Add-ADUser", "Create-ADAccount", "New-ADUser", "Set-ADUser -Create"],
      "reponse": 2,
      "explication": "New-ADUser crée un compte utilisateur AD. Paramètres essentiels : -Name, -SamAccountName, -UserPrincipalName, -Path (OU de destination), -AccountPassword, -Enabled. Nécessite le module ActiveDirectory (Import-Module ActiveDirectory ou automatiquement sur un DC). Set-ADUser modifie un utilisateur existant."
    },
    {
      "id": "q034", "module": "powershell", "difficulte": "moyen",
      "question": "Quel cmdlet PowerShell exécute un bloc de script sur un ou plusieurs ordinateurs distants ?",
      "choix": ["Invoke-Command", "Run-Remote", "Send-Script", "Start-PSSession"],
      "reponse": 0,
      "explication": "Invoke-Command -ComputerName SRV01 -ScriptBlock { Get-Service W3SVC } exécute le bloc sur SRV01 via WinRM. Pour plusieurs machines : -ComputerName SRV01,SRV02,SRV03 (exécution parallèle). Enter-PSSession ouvre une session interactive. New-PSSession crée une session réutilisable (plus efficace pour plusieurs appels)."
    },
    {
      "id": "q035", "module": "powershell", "difficulte": "difficile",
      "question": "Que fait le paramètre -ErrorAction Stop dans un cmdlet PowerShell ?",
      "choix": [
        "Il arrête définitivement le service Windows en cas d'erreur",
        "Il transforme les erreurs non-terminantes en erreurs terminantes, interceptables par try/catch",
        "Il affiche un message d'erreur détaillé puis continue l'exécution",
        "Il ignore toutes les erreurs et continue le script normalement"
      ],
      "reponse": 1,
      "explication": "Par défaut, beaucoup de cmdlets génèrent des erreurs non-terminantes (le script continue). -ErrorAction Stop les transforme en erreurs terminantes, interceptables par un bloc try/catch. Sans cela, catch ne capturera pas ces erreurs. $ErrorActionPreference = 'Stop' applique ce comportement globalement au script."
    },

    {
      "id": "q036", "module": "ad", "difficulte": "moyen",
      "question": "Combien de rôles FSMO existent au total dans une forêt AD contenant un seul domaine ?",
      "choix": ["3 rôles", "4 rôles", "5 rôles", "7 rôles"],
      "reponse": 2,
      "explication": "Il y a 5 rôles FSMO (Flexible Single Master Operations) : 2 par forêt (Schema Master et Domain Naming Master) et 3 par domaine (PDC Emulator, RID Master et Infrastructure Master). Pour une forêt avec 1 domaine = 5 rôles. Commande : netdom query fsmo ou Get-ADDomain + Get-ADForest."
    },
    {
      "id": "q037", "module": "ad", "difficulte": "facile",
      "question": "Que signifie OU dans le contexte d'Active Directory ?",
      "choix": ["Organizational Unit (Unité d'Organisation)", "Operating User", "Object Unique", "Operational Utility"],
      "reponse": 0,
      "explication": "Une OU (Organizational Unit) est un conteneur logique dans AD permettant d'organiser les objets (utilisateurs, ordinateurs, groupes) de façon hiérarchique. Les OU permettent la délégation d'administration et l'application ciblée des GPO. Ex : OU=Informatique,OU=Paris,DC=tssr,DC=local."
    },
    {
      "id": "q038", "module": "ad", "difficulte": "facile",
      "question": "Quel protocole Active Directory utilise-t-il par défaut pour l'authentification dans un domaine ?",
      "choix": ["NTLMv2", "Kerberos", "RADIUS", "LDAP"],
      "reponse": 1,
      "explication": "Kerberos est le protocole d'authentification par défaut dans AD depuis Windows 2000. Il repose sur des tickets (TGT émis par le KDC). NTLM est utilisé en fallback (accès par IP, machines hors domaine). LDAP est le protocole d'annuaire (requêtes), pas d'authentification directe. RADIUS est pour l'accès réseau (Wi-Fi, VPN)."
    },
    {
      "id": "q039", "module": "ad", "difficulte": "difficile",
      "question": "Quelle est la durée de vie par défaut d'un objet dans la corbeille Active Directory (Tombstone Lifetime) ?",
      "choix": ["30 jours", "90 jours", "120 jours", "180 jours"],
      "reponse": 3,
      "explication": "Le Tombstone Lifetime est de 180 jours par défaut depuis Windows Server 2003 SP1 (60 jours auparavant). C'est le délai maximum pour restaurer un objet AD supprimé via la corbeille AD (AD Recycle Bin, activée via Enable-ADOptionalFeature). Après ce délai, l'objet est purgé définitivement."
    },
    {
      "id": "q040", "module": "ad", "difficulte": "difficile",
      "question": "Quel rôle FSMO est responsable de la synchronisation de l'heure et de la gestion des verrouillages de comptes ?",
      "choix": ["Schema Master", "PDC Emulator", "RID Master", "Infrastructure Master"],
      "reponse": 1,
      "explication": "Le PDC Emulator est le rôle FSMO le plus critique : il synchronise l'heure pour tout le domaine (Kerberos exige une heure synchronisée à ±5 min), gère les verrouillages de comptes en temps réel, reçoit en priorité les changements de mots de passe et gère les GPO. En cas de panne du PDC Emulator, les effets se ressentent immédiatement."
    },

    {
      "id": "q041", "module": "cisco", "difficulte": "facile",
      "question": "Quelle commande Cisco IOS sauvegarde la configuration active (RAM) vers la configuration de démarrage (NVRAM) ?",
      "choix": [
        "save configuration startup",
        "write memory (ou copy running-config startup-config)",
        "backup config nvram",
        "commit running-config"
      ],
      "reponse": 1,
      "explication": "copy running-config startup-config (ou son alias write memory) sauvegarde la configuration active en RAM vers la NVRAM (qui persiste après redémarrage). Sans cette commande, toute modification est perdue au prochain reboot. Toujours sauvegarder après chaque modification en production !"
    },
    {
      "id": "q042", "module": "cisco", "difficulte": "facile",
      "question": "Quel type de port de switch Cisco permet de transporter le trafic de plusieurs VLANs simultanément ?",
      "choix": ["Port Access", "Port Trunk (802.1Q)", "Port Monitor (SPAN)", "Port Routed"],
      "reponse": 1,
      "explication": "Un port Trunk (standard 802.1Q) encapsule chaque trame avec un tag VLAN (4 octets ajoutés à l'en-tête Ethernet). Il transporte plusieurs VLANs sur un seul lien physique. Utilisé pour les liaisons inter-switch et les uplinks vers les routeurs. Le port Access n'appartient qu'à un seul VLAN (sans tag pour les équipements terminaux)."
    },
    {
      "id": "q043", "module": "cisco", "difficulte": "facile",
      "question": "Sur quel port TCP SSH (Secure Shell) écoute-t-il par défaut ?",
      "choix": ["21", "22", "23", "443"],
      "reponse": 1,
      "explication": "SSH écoute sur le port 22/TCP par défaut. Il remplace Telnet (port 23) car il chiffre toutes les communications. Sur les équipements Cisco, SSH est activé avec : ip ssh version 2, crypto key generate rsa modulus 2048, et line vty transport input ssh. Changer SSH vers un port non standard est une bonne pratique de sécurité."
    },
    {
      "id": "q044", "module": "cisco", "difficulte": "moyen",
      "question": "Qu'est-ce que le PAT (Port Address Translation), aussi appelé NAT Overload ?",
      "choix": [
        "Une table qui associe des adresses MAC à des adresses IP",
        "Un protocole de redondance de routeur (comme HSRP)",
        "Une technique de QoS pour prioriser certains flux réseau",
        "La traduction de plusieurs adresses IP privées vers une seule IP publique, différenciées par le port source"
      ],
      "reponse": 3,
      "explication": "Le PAT (NAT Overload) permet à tous les hôtes du réseau privé de partager une seule adresse IP publique. Le routeur différencie les connexions par le numéro de port source (modifié si nécessaire). C'est le NAT utilisé dans presque toutes les box Internet grand public. Commande Cisco : ip nat inside source list 1 interface Gi0/1 overload."
    },
    {
      "id": "q045", "module": "cisco", "difficulte": "moyen",
      "question": "Quel protocole de routage dynamique est propriétaire Cisco et utilise l'algorithme DUAL ?",
      "choix": ["OSPF", "RIPv2", "EIGRP", "IS-IS"],
      "reponse": 2,
      "explication": "EIGRP (Enhanced Interior Gateway Routing Protocol) est développé par Cisco et utilise l'algorithme DUAL (Diffusing Update ALgorithm) pour calculer les meilleures routes et les routes de secours (Feasible Successor). Sa métrique composite utilise la bande passante et le délai par défaut. Disponible uniquement sur équipements Cisco (ou avec licence sur certains OS ouverts)."
    },

    {
      "id": "q046", "module": "itil", "difficulte": "facile",
      "question": "Que signifie l'acronyme ITIL ?",
      "choix": [
        "IT Infrastructure Library",
        "Integrated Technology and Information Logistics",
        "Information Technology Implementation Lifecycle",
        "IT International Liaison"
      ],
      "reponse": 0,
      "explication": "ITIL (IT Infrastructure Library) est un référentiel de bonnes pratiques pour la gestion des services IT, développé à l'origine par l'OGC (UK). La version actuelle est ITIL v4 (2019), qui introduit la Chaîne de Valeur des Services (SVS) et intègre des concepts Agile, DevOps et Lean. ITIL est la certification de gestion des services IT la plus reconnue mondialement."
    },
    {
      "id": "q047", "module": "itil", "difficulte": "moyen",
      "question": "Quelle est la distinction fondamentale entre un incident et un problème dans le cadre ITIL ?",
      "choix": [
        "Un incident est grave, un problème est mineur",
        "Un incident est rapporté par un utilisateur, un problème est détecté par la DSI",
        "Un incident = interruption de service à restaurer rapidement ; un problème = identification et élimination de la cause racine",
        "Un incident a un SLA, un problème n'en a pas"
      ],
      "reponse": 2,
      "explication": "ITIL distingue clairement : l'Incident Management vise à restaurer le service normal le plus vite possible (contournement acceptable). La Problem Management identifie et élimine la cause racine pour éviter la récurrence. Un seul problème peut être à l'origine de nombreux incidents. Les erreurs connues (Known Errors) documentent les problèmes identifiés avec leurs contournements."
    },
    {
      "id": "q048", "module": "itil", "difficulte": "facile",
      "question": "Que signifie SLA dans le contexte de la gestion des services IT ?",
      "choix": [
        "System Lifecycle Architecture",
        "Service Level Agreement (Accord sur les niveaux de service)",
        "Software Licensing Authority",
        "Secure Link Access"
      ],
      "reponse": 1,
      "explication": "Un SLA (Service Level Agreement) est un accord formel entre un prestataire de services IT et ses clients/utilisateurs, définissant les niveaux de service attendus (disponibilité, temps de réponse, délai de résolution par priorité). Il est accompagné d'un OLA (Operational Level Agreement) entre équipes internes et d'un UC (Underpinning Contract) avec les fournisseurs externes."
    },
    {
      "id": "q049", "module": "itil", "difficulte": "moyen",
      "question": "Que mesure le MTTR (Mean Time To Repair) ?",
      "choix": [
        "Le temps moyen entre deux pannes successives",
        "Le taux de satisfaction moyen des utilisateurs",
        "La durée moyenne de traitement d'une demande de service",
        "Le temps moyen nécessaire pour restaurer un service après une panne"
      ],
      "reponse": 3,
      "explication": "MTTR (Mean Time To Repair ou Mean Time To Recovery) mesure le temps moyen pour remettre un service en état de fonctionnement après une panne. MTBF (Mean Time Between Failures) mesure la durée moyenne entre deux pannes. La disponibilité se calcule : Disponibilité = MTBF / (MTBF + MTTR). Un bon MTTR faible indique une équipe réactive et des procédures efficaces."
    },
    {
      "id": "q050", "module": "itil", "difficulte": "difficile",
      "question": "Que signifie CAB dans le processus de gestion des changements ITIL ?",
      "choix": [
        "Change Advisory Board — comité qui évalue et valide les changements normaux avant déploiement",
        "Configuration Audit Board — équipe qui audite la CMDB",
        "Continuous Availability Baseline — indicateur de disponibilité cible",
        "Critical Assets Backup — procédure de sauvegarde des actifs critiques"
      ],
      "reponse": 0,
      "explication": "Le CAB (Change Advisory Board) est le comité qui évalue les changements normaux (non standards) avant leur approbation. Il regroupe les représentants IT, métier, sécurité et fournisseurs. Le ECAB (Emergency CAB) est convoqué en urgence pour les changements d'urgence. Les changements standards (pré-approuvés, faible risque) ne passent pas par le CAB."
    }

  ]
};
