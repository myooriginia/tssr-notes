'use strict';
const DIAGNOSTICS_DATA = {
  cours: [
    {
      id: 'admin-gnu-linux',
      titre: 'Administration GNU Linux',
      emoji: '🐧',
      modules: [
        {
          id: 'admin-linux-m01',
          titre: 'Historique, valeurs & versions',
          cas: [
            {
              id: 'cas-alx-001',
              titre: 'Identifier la distribution installée',
              difficulte: 'facile',
              format: 'terminal',
              objectif: 'Utiliser les commandes pour identifier la distribution et la version du noyau.',
              contexte: 'Vous venez de vous connecter à un serveur inconnu. Vous devez identifier le système d\'exploitation et la version du noyau installés.',
              contenu: {
                prompt: 'admin@srv:~$',
                commandes: {
                  'cat /etc/os-release': 'PRETTY_NAME="Debian GNU/Linux 12 (bookworm)"\nNAME="Debian GNU/Linux"\nVERSION_ID="12"\nVERSION="12 (bookworm)"\nID=debian\nHOME_URL="https://www.debian.org/"',
                  'uname -r': '6.1.0-18-amd64',
                  'uname -a': 'Linux srv 6.1.0-18-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.76-1 x86_64 GNU/Linux',
                  'lsb_release -a': 'Distributor ID:\tDebian\nDescription:\tDebian GNU/Linux 12 (bookworm)\nRelease:\t12\nCodename:\tbookworm',
                  'hostnamectl': 'Static hostname: srv\n   Operating System: Debian GNU/Linux 12 (bookworm)\n             Kernel: Linux 6.1.0-18-amd64\n       Architecture: x86-64',
                  'help': 'Commandes : cat /etc/os-release, uname -r, uname -a, lsb_release -a, hostnamectl'
                },
                validation: ['cat /etc/os-release', 'uname -r'],
                indices: [
                  'Le fichier /etc/os-release contient les infos de la distribution.',
                  'uname avec l\'option -r affiche uniquement la version du noyau.'
                ],
                solution: ['cat /etc/os-release', 'uname -r', 'hostnamectl']
              }
            },
            {
              id: 'cas-alx-002',
              titre: 'Choisir la bonne distribution selon le besoin',
              difficulte: 'facile',
              format: 'arbre',
              objectif: 'Recommander la distribution Linux la plus adaptée selon le contexte.',
              contexte: 'En tant que technicien TSSR, un client vous demande conseil pour choisir une distribution Linux.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Quel est l\'usage principal du système ?', choix: [{ texte: 'Serveur de production en entreprise', suite: 'n2' }, { texte: 'Poste de travail développeur', suite: 'n3' }, { texte: 'Système embarqué / faibles ressources', suite: 'n4' }] },
                  n2: { question: 'Quelle est la priorité ?', choix: [{ texte: 'Stabilité maximale long terme (LTS)', suite: 'n5' }, { texte: 'Compatibilité écosystème Red Hat (RHEL)', suite: 'n6' }] },
                  n3: { solution: true, correct: true, texte: 'Ubuntu Desktop LTS', explication: 'Ubuntu LTS offre paquets récents, support 5 ans, large communauté et bonne compatibilité avec les outils de développement.' },
                  n4: { solution: true, correct: true, texte: 'Debian Lite / Raspberry Pi OS', explication: 'Pour les systèmes à faibles ressources, Debian minimal est optimal : empreinte réduite, stabilité éprouvée.' },
                  n5: { solution: true, correct: true, texte: 'Debian Stable', explication: 'Debian Stable est la référence serveur : cycles longs, paquets éprouvés, support LTS. Idéal pour la production.' },
                  n6: { solution: true, correct: true, texte: 'Rocky Linux / AlmaLinux', explication: 'Ces distributions sont des remplaçants communautaires de CentOS, compatibles RHEL, adaptés aux environnements d\'entreprise Red Hat.' }
                }
              }
            }
          ]
        },
        {
          id: 'admin-linux-m02',
          titre: 'Installation de Debian',
          cas: [
            {
              id: 'cas-alx-003',
              titre: 'Configurer le partitionnement à l\'installation',
              difficulte: 'moyen',
              format: 'scenario',
              objectif: 'Choisir le schéma de partitionnement adapté lors de l\'installation d\'un serveur Debian.',
              contexte: 'Vous installez Debian sur un serveur de 100 Go destiné à héberger un serveur web avec base de données. La RAM disponible est de 4 Go.',
              contenu: {
                etapes: [
                  {
                    description: 'L\'installateur vous propose le partitionnement du disque de 100 Go. Quelle approche choisissez-vous ?',
                    choix: [
                      { texte: 'Tout dans une seule partition / (root)', correct: false, feedback: 'Mauvais choix : si /var ou /home se remplit, tout le système peut être bloqué. Non recommandé en production.' },
                      { texte: 'Partitions séparées : /, /var, /home, swap', correct: true, feedback: 'Correct ! Cloisonner /var (logs/données) et /home protège le système root. En cas de saturation d\'une partition, le reste du système reste stable.' },
                      { texte: 'Une seule partition LVM sans séparation logique', correct: false, feedback: 'LVM est utile mais sans séparation des points de montage, vous perdez le cloisonnement. Il faut combiner LVM ET des volumes logiques distincts.' }
                    ]
                  },
                  {
                    description: 'Quelle taille attribuer à la partition swap pour ce serveur avec 4 Go de RAM ?',
                    choix: [
                      { texte: '512 Mo', correct: false, feedback: 'Insuffisant. Le swap peut être épuisé rapidement en cas de pic mémoire, risquant un OOM Killer.' },
                      { texte: '4 Go (= taille de la RAM)', correct: true, feedback: 'Correct ! La règle classique est swap = RAM pour les serveurs. Permet la hibernation et absorbe les pics mémoire.' },
                      { texte: '16 Go', correct: false, feedback: 'Surdimensionné pour 4 Go de RAM. Gaspillage d\'espace disque. 16 Go n\'apporte aucun bénéfice ici.' }
                    ]
                  },
                  {
                    description: 'Quel système de fichiers choisir pour la partition racine / ?',
                    choix: [
                      { texte: 'ext4', correct: true, feedback: 'Parfait. ext4 est le FS par défaut de Debian : stable, performant, journalisé, excellent support long terme.' },
                      { texte: 'FAT32', correct: false, feedback: 'FAT32 ne supporte pas les permissions Unix, les liens symboliques ni les fichiers > 4 Go. Incompatible avec Linux comme FS racine.' },
                      { texte: 'NTFS', correct: false, feedback: 'NTFS est le système de fichiers Windows. Bien que lisible sous Linux via ntfs-3g, il n\'est absolument pas adapté comme FS racine Debian.' }
                    ]
                  }
                ]
              }
            },
            {
              id: 'cas-alx-004',
              titre: 'Diagnostiquer un échec d\'installation',
              difficulte: 'moyen',
              format: 'arbre',
              objectif: 'Identifier et résoudre la cause d\'un échec lors de l\'installation de Debian.',
              contexte: 'L\'installation de Debian s\'est interrompue avec une erreur. Vous devez diagnostiquer le problème.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'À quelle étape l\'installation a-t-elle échoué ?', choix: [{ texte: 'Chargement des paquets depuis le réseau', suite: 'n2' }, { texte: 'Partitionnement du disque', suite: 'n3' }, { texte: 'Installation du chargeur de démarrage GRUB', suite: 'n4' }] },
                  n2: { question: 'Le serveur a-t-il accès à Internet ?', choix: [{ texte: 'Oui, ping fonctionne depuis l\'installateur', suite: 'n5' }, { texte: 'Non, pas de réseau disponible', suite: 'n6' }] },
                  n3: { solution: true, correct: true, texte: 'Vérifier l\'état du disque dur', explication: 'Échec au partitionnement = disque HS, table corrompue ou disque non reconnu. Depuis le shell de l\'installateur : fdisk -l pour lister les disques détectés.' },
                  n4: { solution: true, correct: true, texte: 'Sélectionner le bon disque pour GRUB', explication: 'GRUB échoue si vous installez sur /dev/sdb mais que le BIOS démarre sur /dev/sda. Dans les options avancées, sélectionnez le disque principal comme cible GRUB.' },
                  n5: { solution: true, correct: true, texte: 'Changer de miroir de dépôt Debian', explication: 'Le miroir Debian choisi peut être hors ligne ou lent. Revenez en arrière dans l\'installateur et sélectionnez un autre miroir (ex: deb.debian.org).' },
                  n6: { solution: true, correct: true, texte: 'Utiliser l\'image ISO DVD complète', explication: 'L\'image netinst nécessite Internet. Téléchargez et utilisez l\'image DVD complète qui embarque tous les paquets nécessaires à l\'installation.' }
                }
              }
            }
          ]
        },
        {
          id: 'admin-linux-m03',
          titre: 'Démarrage, GRUB, Systemd et Arrêt système',
          cas: [
            {
              id: 'cas-alx-005',
              titre: 'Gérer les services avec systemctl',
              difficulte: 'moyen',
              format: 'terminal',
              objectif: 'Démarrer, activer et vérifier l\'état de services avec systemd.',
              contexte: 'Le service SSH a été arrêté sur le serveur et n\'est pas configuré pour démarrer au boot. Remettez-le en service de façon permanente.',
              contenu: {
                prompt: 'root@srv:~#',
                commandes: {
                  'systemctl status ssh': '● ssh.service - OpenBSD Secure Shell server\n   Loaded: loaded (/lib/systemd/system/ssh.service; disabled)\n   Active: inactive (dead)\nMar 02 10:10:01 srv systemd[1]: ssh.service: Succeeded.',
                  'systemctl start ssh': '',
                  'systemctl enable ssh': 'Created symlink /etc/systemd/system/multi-user.target.wants/ssh.service → /lib/systemd/system/ssh.service.',
                  'systemctl status ssh': '● ssh.service - OpenBSD Secure Shell server\n   Loaded: loaded (/lib/systemd/system/ssh.service; enabled; vendor preset: enabled)\n   Active: active (running) since Sat 2024-03-02 10:15:22 UTC; 3s ago\n Main PID: 1284 (sshd)',
                  'systemctl is-enabled ssh': 'enabled',
                  'systemctl restart ssh': '',
                  'systemctl list-units --type=service --state=running': 'UNIT             LOAD   ACTIVE SUB     DESCRIPTION\ncron.service     loaded active running Task Scheduler\nssh.service      loaded active running OpenBSD Secure Shell server\nsyslog.service   loaded active running System Logging Service\n\nLEGEND: LOAD=Reflects whether the unit definition was properly loaded.',
                  'help': 'Commandes : systemctl status ssh, systemctl start ssh, systemctl enable ssh, systemctl restart ssh, systemctl is-enabled ssh, systemctl list-units --type=service --state=running'
                },
                validation: ['systemctl start ssh', 'systemctl enable ssh'],
                indices: [
                  'start démarre le service immédiatement ; enable le rend persistant au démarrage. Les deux sont nécessaires.',
                  'Vérifiez avec systemctl status que le service est bien "active (running)" ET "enabled".'
                ],
                solution: ['systemctl status ssh', 'systemctl start ssh', 'systemctl enable ssh', 'systemctl status ssh']
              }
            },
            {
              id: 'cas-alx-006',
              titre: 'Le système ne démarre plus après mise à jour',
              difficulte: 'difficile',
              format: 'arbre',
              objectif: 'Diagnostiquer et résoudre un problème de démarrage GRUB/systemd.',
              contexte: 'Après une mise à jour du noyau, le serveur ne démarre plus et affiche des erreurs. Vous avez accès physique à la machine.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Où le démarrage se bloque-t-il ?', choix: [{ texte: 'Écran noir — le menu GRUB n\'apparaît pas', suite: 'n2' }, { texte: 'Menu GRUB visible mais le noyau ne charge pas', suite: 'n3' }, { texte: 'Le noyau charge mais systemd échoue (panic)', suite: 'n4' }] },
                  n2: { solution: true, correct: true, texte: 'Réinstaller GRUB depuis un live USB', explication: 'Bootloader corrompu. Démarrez sur un live USB Debian, montez la partition root (/dev/sda1), entrez en chroot et réinstallez : grub-install /dev/sda && update-grub.' },
                  n3: { question: 'Quel message d\'erreur GRUB affiche-t-il ?', choix: [{ texte: 'error: file not found (impossible de trouver vmlinuz)', suite: 'n5' }, { texte: 'error: unknown filesystem', suite: 'n6' }] },
                  n4: { question: 'Quel type d\'erreur systemd affiche-t-il ?', choix: [{ texte: 'Failed to mount /home ou /var', suite: 'n7' }, { texte: 'A start job for a specific service is running for long time', suite: 'n8' }] },
                  n5: { solution: true, correct: true, texte: 'Noyau manquant — réinstaller linux-image', explication: 'Le fichier vmlinuz est manquant ou corrompu. En mode rescue, montez root et réinstallez : apt install --reinstall linux-image-amd64 puis update-grub.' },
                  n6: { solution: true, correct: true, texte: 'Partition corrompue — lancer fsck', explication: 'GRUB ne reconnaît pas le FS. Démarrez sur live USB et lancez fsck /dev/sda1 -y pour réparer automatiquement la partition.' },
                  n7: { solution: true, correct: true, texte: 'UUID incorrect dans /etc/fstab', explication: 'Après remplacement de disque, l\'UUID a changé. En mode maintenance (appui sur "e" dans GRUB → init=/bin/bash), éditez /etc/fstab et corrigez les UUID avec blkid.' },
                  n8: { solution: true, correct: true, texte: 'Service bloquant au démarrage — désactiver et investiguer', explication: 'Passez en urgency.target (ajoutez systemd.unit=emergency.target dans GRUB), désactivez le service bloquant : systemctl disable <service>, puis analysez journalctl -xe.' }
                }
              }
            }
          ]
        },
        {
          id: 'admin-linux-m04',
          titre: 'Mode maintenance et récupération système',
          cas: [
            {
              id: 'cas-alx-007',
              titre: 'Réinitialiser le mot de passe root perdu',
              difficulte: 'moyen',
              format: 'scenario',
              objectif: 'Récupérer l\'accès root via le mode single user ou rescue.',
              contexte: 'Le mot de passe root d\'un serveur Debian a été perdu. Vous avez accès physique à la machine et devez récupérer l\'accès.',
              contenu: {
                etapes: [
                  {
                    description: 'Comment accéder au mode de récupération pour réinitialiser le mot de passe root ?',
                    choix: [
                      { texte: 'Redémarrer et éditer la ligne GRUB pour ajouter "init=/bin/bash"', correct: true, feedback: 'Correct ! En ajoutant init=/bin/bash dans les paramètres du noyau (touche "e" sur l\'entrée GRUB), vous obtenez un shell root direct sans authentification.' },
                      { texte: 'Utiliser le compte sudo d\'un autre utilisateur pour changer le mot de passe root', correct: false, feedback: 'Non applicable : si le mot de passe root est perdu, il n\'y a probablement pas d\'autre compte sudo disponible. Et sudo passwd root nécessite de connaître son propre mot de passe.' },
                      { texte: 'Reformater le serveur et réinstaller Debian', correct: false, feedback: 'Solution disproportionnée ! La récupération via GRUB est précisément prévue pour ce cas et ne nécessite pas de réinstallation.' }
                    ]
                  },
                  {
                    description: 'Vous êtes dans le shell de récupération (init=/bin/bash). La partition root est montée en lecture seule. Quelle commande exécutez-vous pour pouvoir modifier les fichiers ?',
                    choix: [
                      { texte: 'mount -o remount,rw /', correct: true, feedback: 'Exact ! Cette commande remonte la partition root en lecture-écriture, ce qui est nécessaire pour modifier /etc/shadow (qui stocke les mots de passe).' },
                      { texte: 'chmod 777 /etc/shadow', correct: false, feedback: 'Mauvaise idée ! Modifier les permissions de /etc/shadow de cette façon crée une faille de sécurité majeure et ne résout pas le problème de montage en lecture seule.' },
                      { texte: 'mount /dev/sda1 /mnt', correct: false, feedback: 'La partition root est déjà montée sur /. La remonter en lecture-écriture avec remount,rw est la bonne approche.' }
                    ]
                  },
                  {
                    description: 'La partition est remontée en rw. Quelle commande utilisez-vous pour définir le nouveau mot de passe root ?',
                    choix: [
                      { texte: 'passwd root', correct: true, feedback: 'Parfait ! passwd root permet de définir un nouveau mot de passe root. Après modification, redémarrez proprement avec exec /sbin/init ou reboot -f.' },
                      { texte: 'echo "root:motdepasse" > /etc/shadow', correct: false, feedback: 'Dangereux ! Écrire directement dans /etc/shadow sans hasher le mot de passe corrompt le fichier. Utilisez toujours passwd.' },
                      { texte: 'useradd -p motdepasse root', correct: false, feedback: 'useradd sert à créer de nouveaux utilisateurs, pas à modifier le mot de passe d\'un utilisateur existant. Utilisez passwd.' }
                    ]
                  }
                ]
              }
            },
            {
              id: 'cas-alx-008',
              titre: 'Choisir le bon mode de récupération',
              difficulte: 'moyen',
              format: 'arbre',
              objectif: 'Sélectionner le mode de récupération approprié selon la panne rencontrée.',
              contexte: 'Différentes pannes nécessitent différentes approches de récupération. Vous devez identifier la méthode adaptée.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Quel est le problème principal ?', choix: [{ texte: 'Mot de passe root perdu, système démarre', suite: 'n2' }, { texte: 'Fichier système corrompu, système ne démarre plus', suite: 'n3' }, { texte: 'Erreur dans /etc/fstab, blocage au montage', suite: 'n4' }] },
                  n2: { question: 'Le GRUB est-il accessible ?', choix: [{ texte: 'Oui, je vois le menu GRUB', suite: 'n5' }, { texte: 'Non, GRUB passe directement', suite: 'n6' }] },
                  n3: { solution: true, correct: true, texte: 'Live USB + chroot pour réparer', explication: 'Démarrez sur live USB, montez la partition root sur /mnt, puis chroot /mnt. Vous aurez un environnement complet pour réinstaller des paquets ou réparer le FS avec fsck.' },
                  n4: { solution: true, correct: true, texte: 'Mode urgency.target — éditer /etc/fstab', explication: 'Ajoutez systemd.unit=emergency.target dans GRUB. Vous obtenez un shell root minimal. Corrigez /etc/fstab puis rebootez. Attention à vérifier les UUID avec blkid.' },
                  n5: { solution: true, correct: true, texte: 'Éditer GRUB — ajouter init=/bin/bash', explication: 'Appuyez sur "e" sur l\'entrée GRUB. Trouvez la ligne "linux" et ajoutez "init=/bin/bash" à la fin. Puis Ctrl+X pour démarrer avec un shell root direct.' },
                  n6: { solution: true, correct: true, texte: 'Maintenir Shift au démarrage pour afficher GRUB', explication: 'Sur Debian avec GRUB_TIMEOUT=0, maintenez la touche Shift au BIOS POST pour forcer l\'affichage du menu GRUB.' }
                }
              }
            }
          ]
        },
        {
          id: 'admin-linux-m05',
          titre: 'Configuration réseau',
          cas: [
            {
              id: 'cas-alx-009',
              titre: 'Configurer une adresse IP statique',
              difficulte: 'moyen',
              format: 'terminal',
              objectif: 'Configurer une interface réseau avec une IP statique via /etc/network/interfaces.',
              contexte: 'Le serveur obtient son IP en DHCP. Vous devez le configurer en IP statique : 192.168.1.10/24, passerelle 192.168.1.1, DNS 8.8.8.8.',
              contenu: {
                prompt: 'root@srv:~#',
                commandes: {
                  'ip a': '2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP\n    inet 192.168.1.50/24 brd 192.168.1.255 scope global dynamic ens33\n       valid_lft 85430sec preferred_lft 85430sec',
                  'cat /etc/network/interfaces': '# This file describes the network interfaces available on your system\nauto lo\niface lo inet loopback\n\nauto ens33\niface ens33 inet dhcp',
                  'nano /etc/network/interfaces': '[Ouverture de l\'éditeur nano...]\n[Modifiez le fichier pour configurer l\'IP statique]\n[Sauvegardez avec Ctrl+O puis quittez avec Ctrl+X]',
                  'systemctl restart networking': '',
                  'ip a show ens33': '2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP\n    inet 192.168.1.10/24 brd 192.168.1.255 scope global ens33',
                  'ping -c 2 192.168.1.1': 'PING 192.168.1.1 (192.168.1.1) 56(84) bytes of data.\n64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.456 ms\n64 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=0.412 ms\n--- 192.168.1.1 ping statistics ---\n2 packets transmitted, 2 received, 0% packet loss',
                  'cat /etc/resolv.conf': 'nameserver 8.8.8.8\nnameserver 8.8.4.4',
                  'help': 'Commandes : ip a, cat /etc/network/interfaces, nano /etc/network/interfaces, systemctl restart networking, ip a show ens33, ping -c 2 192.168.1.1, cat /etc/resolv.conf'
                },
                validation: ['nano /etc/network/interfaces', 'systemctl restart networking', 'ip a show ens33'],
                indices: [
                  'Dans /etc/network/interfaces, remplacez "dhcp" par "static" et ajoutez les lignes address, netmask, gateway.',
                  'Après modification, redémarrez le service networking pour appliquer. Vérifiez avec ip a.'
                ],
                solution: ['ip a', 'nano /etc/network/interfaces', 'systemctl restart networking', 'ip a show ens33', 'ping -c 2 192.168.1.1']
              }
            },
            {
              id: 'cas-alx-010',
              titre: 'Diagnostiquer une panne de connectivité réseau',
              difficulte: 'moyen',
              format: 'arbre',
              objectif: 'Identifier la couche réseau défaillante par élimination méthodique.',
              contexte: 'Un serveur Linux ne peut plus accéder à Internet. Vous devez identifier la cause de la panne.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'L\'interface réseau est-elle active ? (ip a)', choix: [{ texte: 'Oui, elle est UP avec une adresse IP', suite: 'n2' }, { texte: 'Non, elle est DOWN ou sans adresse', suite: 'n3' }] },
                  n2: { question: 'Peut-on pinguer la passerelle locale ? (ping 192.168.1.1)', choix: [{ texte: 'Oui, la passerelle répond', suite: 'n4' }, { texte: 'Non, timeout ou destination unreachable', suite: 'n5' }] },
                  n3: { solution: true, correct: true, texte: 'Activer l\'interface et vérifier la config', explication: 'L\'interface est DOWN. Activez-la : ip link set ens33 up. Si pas d\'IP : vérifiez /etc/network/interfaces ou relancez le DHCP : dhclient ens33.' },
                  n4: { question: 'La résolution DNS fonctionne-t-elle ? (ping google.com)', choix: [{ texte: 'Oui, google.com répond', suite: 'n6' }, { texte: 'Non, mais ping 8.8.8.8 fonctionne', suite: 'n7' }] },
                  n5: { solution: true, correct: true, texte: 'Problème de câble/switch ou VLAN incorrect', explication: 'L\'interface est UP avec une IP mais la passerelle ne répond pas : vérifiez le câble physique, le switch, et que le VLAN configuré est le bon.' },
                  n6: { solution: true, correct: true, texte: 'Connectivité OK — vérifier l\'application ciblée', explication: 'La connectivité réseau est parfaite. Le problème vient de l\'application ou du service ciblé (pare-feu, proxy, service distant hors ligne).' },
                  n7: { solution: true, correct: true, texte: 'Problème DNS — corriger /etc/resolv.conf', explication: 'Le routage fonctionne (ping IP OK) mais la résolution DNS échoue. Vérifiez /etc/resolv.conf et ajoutez : nameserver 8.8.8.8' }
                }
              }
            }
          ]
        },
        {
          id: 'admin-linux-m06',
          titre: 'Gestion des paquets et dépôt APT',
          cas: [
            {
              id: 'cas-alx-011',
              titre: 'Installer et gérer des paquets avec APT',
              difficulte: 'facile',
              format: 'terminal',
              objectif: 'Mettre à jour la liste des paquets, installer, supprimer et rechercher des paquets avec apt.',
              contexte: 'Vous devez installer le serveur web Apache sur un serveur Debian fraîchement installé, puis vérifier son état.',
              contenu: {
                prompt: 'root@srv:~#',
                commandes: {
                  'apt update': 'Atteint :1 http://deb.debian.org/debian bookworm InRelease\nAtteint :2 http://security.debian.org bookworm-security InRelease\nLecture des listes de paquets... Fait\nConstruction de l\'arbre des dépendances... Fait\n0 paquet peut être mis à jour.',
                  'apt search apache': 'Tri... Fait\nRecherche en texte intégral... Fait\napache2/stable 2.4.57-2 amd64\n  Apache HTTP Server\nlibapache2-mod-php/stable 2:8.2+93+debian12+1 all\n  server-side, HTML-embedded scripting language (Apache 2 module)',
                  'apt install apache2': 'Lecture des listes de paquets... Fait\nConstruction de l\'arbre des dépendances... Fait\nLes paquets supplémentaires suivants seront installés : apache2-data apache2-utils\n0 mis à jour, 3 nouvellement installés.\nAprès cette opération, 6 483 ko d\'espace disque supplémentaires seront utilisés.\nSouhaitez-vous continuer ? [O/n] O\n... installation ...\nProcessing triggers for systemd...',
                  'apt list --installed | grep apache': 'apache2/stable,now 2.4.57-2 amd64 [installé]\napache2-data/stable,now 2.4.57-2 all [installé, automatique]',
                  'apt remove apache2': 'Lecture des listes de paquets... Fait\nLes paquets suivants seront ENLEVÉS : apache2\n0 mis à jour, 0 nouvellement installés, 1 à enlever.\nSouhaitez-vous continuer ? [O/n]',
                  'apt autoremove': 'Lecture des listes de paquets... Fait\nLes paquets suivants seront ENLEVÉS : apache2-data apache2-utils\nSouhaitez-vous continuer ? [O/n] O',
                  'help': 'Commandes : apt update, apt search apache, apt install apache2, apt list --installed | grep apache, apt remove apache2, apt autoremove'
                },
                validation: ['apt update', 'apt install apache2'],
                indices: [
                  'Toujours faire apt update avant apt install pour s\'assurer d\'avoir la liste des paquets à jour.',
                  'apt search permet de trouver le nom exact du paquet avant de l\'installer.'
                ],
                solution: ['apt update', 'apt search apache', 'apt install apache2', 'apt list --installed | grep apache']
              }
            },
            {
              id: 'cas-alx-012',
              titre: 'Résoudre une erreur apt',
              difficulte: 'moyen',
              format: 'arbre',
              objectif: 'Diagnostiquer et corriger les erreurs courantes lors de l\'utilisation d\'apt.',
              contexte: 'La commande apt update génère des erreurs. Vous devez identifier la cause et la corriger.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Quel type d\'erreur apt update affiche-t-il ?', choix: [{ texte: 'Err: ... Could not connect / Connection refused', suite: 'n2' }, { texte: 'E: The repository ... is not signed / NO_PUBKEY', suite: 'n3' }, { texte: 'E: Could not get lock /var/lib/dpkg/lock', suite: 'n4' }] },
                  n2: { question: 'Le serveur a-t-il accès à Internet ?', choix: [{ texte: 'Non, aucune connectivité', suite: 'n5' }, { texte: 'Oui, Internet fonctionne', suite: 'n6' }] },
                  n3: { solution: true, correct: true, texte: 'Importer la clé GPG manquante', explication: 'Le dépôt tiers n\'a pas de clé de signature connue. Importez la clé : apt-key adv --keyserver keyserver.ubuntu.com --recv-keys <ID>. Ou utilisez le fichier .gpg fourni par l\'éditeur.' },
                  n4: { solution: true, correct: true, texte: 'Supprimer le fichier de verrou dpkg', explication: 'Un autre processus apt tourne ou s\'est terminé anormalement. Vérifiez : ps aux | grep apt. Si aucun processus, supprimez le verrou : rm /var/lib/dpkg/lock /var/lib/dpkg/lock-frontend puis dpkg --configure -a.' },
                  n5: { solution: true, correct: true, texte: 'Configurer le réseau avant d\'utiliser apt', explication: 'Sans Internet, apt ne peut pas contacter les miroirs. Configurez d\'abord le réseau (IP, passerelle, DNS) ou utilisez un dépôt local/miroir interne.' },
                  n6: { solution: true, correct: true, texte: 'Changer le miroir dans /etc/apt/sources.list', explication: 'Le miroir configured est hors ligne. Éditez /etc/apt/sources.list et remplacez le miroir par deb.debian.org (miroir officiel et stable) puis relancez apt update.' }
                }
              }
            }
          ]
        },
        {
          id: 'admin-linux-m07',
          titre: 'Partitionnement des disques avec fdisk',
          cas: [
            {
              id: 'cas-alx-013',
              titre: 'Partitionner un nouveau disque avec fdisk',
              difficulte: 'moyen',
              format: 'terminal',
              objectif: 'Créer une partition sur un nouveau disque, la formater et la monter.',
              contexte: 'Un nouveau disque de 20 Go (/dev/sdb) a été ajouté au serveur. Vous devez créer une partition, la formater en ext4 et la monter sur /data.',
              contenu: {
                prompt: 'root@srv:~#',
                commandes: {
                  'lsblk': 'NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS\nsda      8:0    0   50G  0 disk\n└─sda1   8:1    0   50G  0 part /\nsdb      8:16   0   20G  0 disk',
                  'fdisk /dev/sdb': 'Bienvenue dans fdisk (util-linux 2.38.1).\nLe périphérique ne contient pas une table de partitions reconnue.\n\nCommandes : n (nouvelle partition), p (afficher), w (écrire), q (quitter)\n[Utilisez les sous-commandes : n → p → 1 → Entrée → Entrée → w]',
                  'n': 'Type de partition :\n   p   primaire (0 primaire, 0 étendue, 4 libre)\n   e   étendue\nSélectionnez (p par défaut) :',
                  'p': 'Numéro de partition (1-4, 1 par défaut) :',
                  'w': 'La table de partitions a été altérée.\nSyncing disks.',
                  'lsblk': 'NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS\nsda      8:0    0   50G  0 disk\n└─sda1   8:1    0   50G  0 part /\nsdb      8:16   0   20G  0 disk\n└─sdb1   8:17   0   20G  0 part',
                  'mkfs.ext4 /dev/sdb1': 'mke2fs 1.47.0 (5-Feb-2023)\nCreating filesystem with 5242880 4k blocks and 1310720 inodes\nFilesystem UUID: a1b2c3d4-e5f6-7890-abcd-ef1234567890\nAllocating group tables: done\nWriting inode tables: done\nCreating journal (32768 blocks): done\nWriting superblocks and filesystem accounting information: done',
                  'mkdir /data': '',
                  'mount /dev/sdb1 /data': '',
                  'df -h /data': 'Sys. de fichiers Taille Utilisé Dispo Uti% Monté sur\n/dev/sdb1         20G    24K   19G   1% /data',
                  'help': 'Commandes : lsblk, fdisk /dev/sdb, mkfs.ext4 /dev/sdb1, mkdir /data, mount /dev/sdb1 /data, df -h /data'
                },
                validation: ['fdisk /dev/sdb', 'mkfs.ext4 /dev/sdb1', 'mount /dev/sdb1 /data'],
                indices: [
                  'Dans fdisk : n pour créer une partition, p pour primaire, acceptez les valeurs par défaut, puis w pour écrire et quitter.',
                  'Après création de la partition, formatez avec mkfs.ext4 avant de monter.'
                ],
                solution: ['lsblk', 'fdisk /dev/sdb', 'mkfs.ext4 /dev/sdb1', 'mkdir /data', 'mount /dev/sdb1 /data', 'df -h /data']
              }
            },
            {
              id: 'cas-alx-014',
              titre: 'Diagnostiquer un disque saturé',
              difficulte: 'moyen',
              format: 'arbre',
              objectif: 'Identifier la source de la saturation d\'un disque et libérer de l\'espace.',
              contexte: 'Des alertes indiquent que le disque du serveur est saturé à 100%. Des services commencent à échouer.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Quelle partition est saturée ? (df -h)', choix: [{ texte: 'La partition / (root) est à 100%', suite: 'n2' }, { texte: 'La partition /var est à 100%', suite: 'n3' }, { texte: 'La partition /home est à 100%', suite: 'n4' }] },
                  n2: { question: 'Quel type de fichiers occupe l\'espace ? (du -sh /* 2>/dev/null)', choix: [{ texte: 'Le répertoire /tmp est très volumineux', suite: 'n5' }, { texte: 'Le répertoire /var/log est volumineux', suite: 'n6' }] },
                  n3: { question: 'Qu\'est-ce qui remplit /var ?', choix: [{ texte: '/var/log occupe tout l\'espace', suite: 'n7' }, { texte: '/var/cache/apt est volumineux', suite: 'n8' }] },
                  n4: { solution: true, correct: true, texte: 'Identifier et supprimer les gros fichiers utilisateurs', explication: 'Utilisez : du -sh /home/* pour identifier quel utilisateur occupe l\'espace. Discutez avec l\'utilisateur ou déplacez les données vers un stockage externe.' },
                  n5: { solution: true, correct: true, texte: 'Nettoyer /tmp', explication: '/tmp doit être nettoyé régulièrement. Commande sécurisée : find /tmp -mtime +7 -delete. Ou configurez systemd-tmpfiles pour un nettoyage automatique.' },
                  n6: { solution: true, correct: false, texte: 'Attention : /var/log sous / est anormal', explication: 'Si /var/log est sous /, c\'est une erreur de partitionnement. En urgence : journalctl --vacuum-size=200M. À terme, séparez /var dans sa propre partition.' },
                  n7: { solution: true, correct: true, texte: 'Faire tourner logrotate et purger les vieux logs', explication: 'Forcez logrotate : logrotate -f /etc/logrotate.conf. Supprimez les vieux logs compressés : find /var/log -name "*.gz" -mtime +30 -delete. Vérifiez journald : journalctl --vacuum-time=30d.' },
                  n8: { solution: true, correct: true, texte: 'Nettoyer le cache APT', explication: '/var/cache/apt peut devenir très volumineux. Nettoyez avec : apt clean (supprime les .deb) ou apt autoclean (supprime les .deb obsolètes). Libération typique : plusieurs Go.' }
                }
              }
            }
          ]
        },
        {
          id: 'admin-linux-m08',
          titre: 'LVM — Gestion des volumes logiques',
          cas: [
            {
              id: 'cas-alx-015',
              titre: 'Créer un volume logique LVM',
              difficulte: 'difficile',
              format: 'terminal',
              objectif: 'Créer un Physical Volume, un Volume Group et un Logical Volume, puis le formater et le monter.',
              contexte: 'Deux nouveaux disques de 10 Go (/dev/sdb et /dev/sdc) ont été ajoutés. Vous devez les regrouper dans LVM et créer un volume logique de 15 Go monté sur /data.',
              contenu: {
                prompt: 'root@srv:~#',
                commandes: {
                  'lsblk': 'NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS\nsda      8:0    0   50G  0 disk\n└─sda1   8:1    0   50G  0 part /\nsdb      8:16   0   10G  0 disk\nsdc      8:32   0   10G  0 disk',
                  'pvcreate /dev/sdb /dev/sdc': '  Physical volume "/dev/sdb" successfully created.\n  Physical volume "/dev/sdc" successfully created.',
                  'pvs': '  PV         VG    Fmt  Attr PSize  PFree\n  /dev/sdb         lvm2 ---  10.00g 10.00g\n  /dev/sdc         lvm2 ---  10.00g 10.00g',
                  'vgcreate vg_data /dev/sdb /dev/sdc': '  Volume group "vg_data" successfully created',
                  'vgs': '  VG      #PV #LV #SN Attr   VSize  VFree\n  vg_data   2   0   0 wz--n- 19.99g 19.99g',
                  'lvcreate -L 15G -n lv_data vg_data': '  Logical volume "lv_data" created.',
                  'lvs': '  LV      VG      Attr       LSize  Pool Origin\n  lv_data vg_data -wi-a----- 15.00g',
                  'mkfs.ext4 /dev/vg_data/lv_data': 'Creating filesystem with 3932160 4k blocks...\nFilesystem UUID: b2c3d4e5-f6a7-8901-bcde-f12345678901\nWriting superblocks... done',
                  'mkdir /data': '',
                  'mount /dev/vg_data/lv_data /data': '',
                  'df -h /data': 'Sys. de fichiers             Taille Utilisé Dispo Uti% Monté sur\n/dev/mapper/vg_data-lv_data    15G    24K   14G   1% /data',
                  'help': 'Commandes : lsblk, pvcreate /dev/sdb /dev/sdc, pvs, vgcreate vg_data /dev/sdb /dev/sdc, vgs, lvcreate -L 15G -n lv_data vg_data, lvs, mkfs.ext4 /dev/vg_data/lv_data, mkdir /data, mount /dev/vg_data/lv_data /data, df -h /data'
                },
                validation: ['pvcreate /dev/sdb /dev/sdc', 'vgcreate vg_data /dev/sdb /dev/sdc', 'lvcreate -L 15G -n lv_data vg_data', 'mount /dev/vg_data/lv_data /data'],
                indices: [
                  'L\'ordre LVM est toujours : pvcreate → vgcreate → lvcreate. Chaque étape est obligatoire.',
                  'Après lvcreate, le volume doit être formaté (mkfs) avant d\'être monté.'
                ],
                solution: ['pvcreate /dev/sdb /dev/sdc', 'vgcreate vg_data /dev/sdb /dev/sdc', 'lvcreate -L 15G -n lv_data vg_data', 'mkfs.ext4 /dev/vg_data/lv_data', 'mkdir /data', 'mount /dev/vg_data/lv_data /data']
              }
            },
            {
              id: 'cas-alx-016',
              titre: 'Étendre un volume logique existant',
              difficulte: 'difficile',
              format: 'scenario',
              objectif: 'Étendre un Volume Group avec un nouveau disque, puis agrandir un Logical Volume en ligne.',
              contexte: 'Le LV /dev/vg_data/lv_data est plein à 90%. Un nouveau disque de 10 Go (/dev/sdd) est disponible. Étendez le LV sans interruption de service.',
              contenu: {
                etapes: [
                  {
                    description: 'Un nouveau disque /dev/sdd de 10 Go est disponible. Quelle est la première étape pour l\'intégrer dans LVM ?',
                    choix: [
                      { texte: 'pvcreate /dev/sdd — initialiser le disque comme PV LVM', correct: true, feedback: 'Correct ! Avant toute chose, le disque doit être initialisé comme Physical Volume LVM avec pvcreate. Il pourra ensuite être ajouté à un VG.' },
                      { texte: 'vgextend vg_data /dev/sdd — l\'ajouter directement au VG', correct: false, feedback: 'Impossible ! Le disque n\'est pas encore un PV LVM. vgextend échouera avec "Device /dev/sdd not found (or ignored by filtering)".' },
                      { texte: 'fdisk /dev/sdd — créer une partition d\'abord', correct: false, feedback: 'Non obligatoire avec LVM. On peut utiliser le disque entier comme PV sans partitionner. pvcreate /dev/sdd suffit.' }
                    ]
                  },
                  {
                    description: 'Le disque est initialisé en PV. Comment l\'ajouter au Volume Group vg_data ?',
                    choix: [
                      { texte: 'vgextend vg_data /dev/sdd', correct: true, feedback: 'Parfait ! vgextend ajoute le nouveau PV au VG existant. L\'espace disponible dans vg_data passe de ~5G à ~15G.' },
                      { texte: 'vgcreate vg_data2 /dev/sdd', correct: false, feedback: 'Créer un nouveau VG isole l\'espace. On ne peut pas étendre directement lv_data vers un autre VG. Utilisez vgextend pour ajouter au VG existant.' },
                      { texte: 'pvcreate vg_data /dev/sdd', correct: false, feedback: 'pvcreate sert à initialiser un PV, pas à l\'ajouter à un VG. Utilisez vgextend pour l\'ajout.' }
                    ]
                  },
                  {
                    description: 'L\'espace est disponible dans vg_data. Comment étendre lv_data de 8 Go supplémentaires ET redimensionner le FS en une seule commande ?',
                    choix: [
                      { texte: 'lvextend -L +8G --resizefs /dev/vg_data/lv_data', correct: true, feedback: 'Parfait ! --resizefs (ou -r) étend le LV ET redimensionne le système de fichiers en ligne sans démonter. C\'est la méthode recommandée sur ext4.' },
                      { texte: 'lvextend -L +8G /dev/vg_data/lv_data', correct: false, feedback: 'Correct pour étendre le LV, mais sans --resizefs, le FS n\'est pas redimensionné. Vous devez aussi lancer resize2fs /dev/vg_data/lv_data manuellement.' },
                      { texte: 'lvcreate -L 8G vg_data', correct: false, feedback: 'lvcreate crée un nouveau LV vide, il n\'étend pas un LV existant. Pour agrandir, utilisez lvextend.' }
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'admin-linux-m09',
          titre: 'Systèmes de fichiers, montage & fstab',
          cas: [
            {
              id: 'cas-alx-017',
              titre: 'Configurer un montage persistant avec fstab',
              difficulte: 'moyen',
              format: 'terminal',
              objectif: 'Récupérer l\'UUID d\'une partition et la configurer dans /etc/fstab pour un montage automatique.',
              contexte: 'La partition /dev/sdb1 est montée manuellement sur /data. Elle disparaît au reboot. Vous devez configurer son montage automatique via /etc/fstab.',
              contenu: {
                prompt: 'root@srv:~#',
                commandes: {
                  'blkid /dev/sdb1': '/dev/sdb1: UUID="a1b2c3d4-e5f6-7890-abcd-ef1234567890" BLOCK_SIZE="4096" TYPE="ext4" PARTUUID="12345678-01"',
                  'cat /etc/fstab': '# /etc/fstab: static file system information.\n# <file system>  <mount point>  <type>  <options>  <dump>  <pass>\nUUID=xxxx-root   /              ext4    defaults   0       1\ntmpfs            /tmp           tmpfs   defaults   0       0',
                  'nano /etc/fstab': '[Ajoutez la ligne pour /dev/sdb1 avec son UUID]\n[UUID=a1b2c3d4-e5f6-7890-abcd-ef1234567890  /data  ext4  defaults  0  2]',
                  'mount -a': '',
                  'df -h /data': 'Sys. de fichiers Taille Utilisé Dispo Uti% Monté sur\n/dev/sdb1         20G   1.2G   18G   7% /data',
                  'findmnt /data': 'TARGET SOURCE    FSTYPE OPTIONS\n/data  /dev/sdb1 ext4   rw,relatime',
                  'help': 'Commandes : blkid /dev/sdb1, cat /etc/fstab, nano /etc/fstab, mount -a, df -h /data, findmnt /data'
                },
                validation: ['blkid /dev/sdb1', 'nano /etc/fstab', 'mount -a'],
                indices: [
                  'Utilisez toujours l\'UUID dans fstab (jamais /dev/sdb1 qui peut changer). Récupérez l\'UUID avec blkid.',
                  'Le dernier champ (pass) : 0 = pas de vérification, 1 = root en premier, 2 = autres partitions.'
                ],
                solution: ['blkid /dev/sdb1', 'nano /etc/fstab', 'mount -a', 'df -h /data']
              }
            },
            {
              id: 'cas-alx-018',
              titre: 'Le serveur ne démarre plus après modification de fstab',
              difficulte: 'difficile',
              format: 'arbre',
              objectif: 'Récupérer un système dont le démarrage est bloqué par une erreur dans /etc/fstab.',
              contexte: 'Après avoir ajouté une entrée dans /etc/fstab, le serveur ne démarre plus. Il reste bloqué en "Emergency mode".',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Quel message s\'affiche dans l\'Emergency mode ?', choix: [{ texte: 'Failed to mount /data: can\'t find UUID=...', suite: 'n2' }, { texte: 'Failed to mount /data: wrong fs type', suite: 'n3' }, { texte: 'mount: special device /dev/sdb1 does not exist', suite: 'n4' }] },
                  n2: { question: 'Le disque physique est-il bien connecté ?', choix: [{ texte: 'Oui, lsblk montre le disque', suite: 'n5' }, { texte: 'Non, lsblk ne montre pas le disque', suite: 'n6' }] },
                  n3: { solution: true, correct: true, texte: 'Corriger le type de FS dans fstab', explication: 'Le type de système de fichiers dans fstab ne correspond pas au FS réel. Vérifiez avec blkid le vrai type (ext4, xfs, etc.) et corrigez la 3e colonne de /etc/fstab.' },
                  n4: { solution: true, correct: true, texte: 'Disque absent ou renommé — utiliser UUID', explication: 'Le nom de device (/dev/sdb1) a changé. C\'est pourquoi on préfère toujours l\'UUID. Remplacez /dev/sdb1 par UUID=... (obtenez l\'UUID avec blkid depuis l\'emergency shell).' },
                  n5: { solution: true, correct: true, texte: 'UUID incorrect dans fstab — copier le bon UUID', explication: 'Le disque est là mais l\'UUID ne correspond pas. Depuis l\'emergency shell : blkid pour voir le vrai UUID, nano /etc/fstab pour corriger, puis exit pour relancer le démarrage.' },
                  n6: { solution: true, correct: true, texte: 'Ajouter "nofail" ou supprimer l\'entrée fstab', explication: 'Si le disque est optionnel, ajoutez l\'option "nofail" dans fstab pour que son absence ne bloque pas le boot. Sinon, supprimez temporairement la ligne problématique.' }
                }
              }
            }
          ]
        },
        {
          id: 'admin-linux-m10',
          titre: 'Gestion des utilisateurs & groupes',
          cas: [
            {
              id: 'cas-alx-019',
              titre: 'Créer et configurer utilisateurs et groupes',
              difficulte: 'facile',
              format: 'terminal',
              objectif: 'Créer des utilisateurs, des groupes et gérer les appartenances.',
              contexte: 'Vous devez créer un utilisateur "alice" membre du groupe "webmasters", avec un répertoire home et un shell bash.',
              contenu: {
                prompt: 'root@srv:~#',
                commandes: {
                  'groupadd webmasters': '',
                  'useradd -m -s /bin/bash -G webmasters alice': '',
                  'id alice': 'uid=1001(alice) gid=1001(alice) groups=1001(alice),1002(webmasters)',
                  'passwd alice': 'Nouveau mot de passe :\nRetapez le nouveau mot de passe :\npasswd : mot de passe mis à jour avec succès',
                  'cat /etc/passwd | grep alice': 'alice:x:1001:1001::/home/alice:/bin/bash',
                  'ls /home': 'alice  admin',
                  'usermod -aG sudo alice': '',
                  'id alice': 'uid=1001(alice) gid=1001(alice) groups=1001(alice),1002(webmasters),27(sudo)',
                  'userdel -r alice': 'userdel: le répertoire de connexion /home/alice a été supprimé',
                  'help': 'Commandes : groupadd webmasters, useradd -m -s /bin/bash -G webmasters alice, id alice, passwd alice, cat /etc/passwd | grep alice, ls /home, usermod -aG sudo alice, userdel -r alice'
                },
                validation: ['groupadd webmasters', 'useradd -m -s /bin/bash -G webmasters alice', 'passwd alice'],
                indices: [
                  '-m crée le répertoire home, -s définit le shell, -G ajoute des groupes supplémentaires.',
                  'N\'oubliez pas de définir un mot de passe avec passwd après la création du compte.'
                ],
                solution: ['groupadd webmasters', 'useradd -m -s /bin/bash -G webmasters alice', 'passwd alice', 'id alice']
              }
            },
            {
              id: 'cas-alx-020',
              titre: 'Diagnostiquer un problème d\'accès utilisateur',
              difficulte: 'moyen',
              format: 'arbre',
              objectif: 'Identifier pourquoi un utilisateur ne peut pas accéder à une ressource.',
              contexte: 'L\'utilisateur "bob" ne peut pas lire les fichiers dans /var/www/html malgré ses droits apparents.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Quel message d\'erreur bob reçoit-il ?', choix: [{ texte: 'Permission denied lors de l\'accès au répertoire', suite: 'n2' }, { texte: 'Le compte est verrouillé / authentication failure', suite: 'n3' }, { texte: 'bash: command not found après su bob', suite: 'n4' }] },
                  n2: { question: 'Bob est-il membre du bon groupe ? (id bob)', choix: [{ texte: 'Non, il n\'est pas dans le groupe www-data', suite: 'n5' }, { texte: 'Oui, il est dans www-data mais accès refusé', suite: 'n6' }] },
                  n3: { solution: true, correct: true, texte: 'Déverrouiller le compte avec passwd -u bob', explication: 'Le compte peut être verrouillé par passwd -l. Déverrouillez avec : passwd -u bob. Vérifiez aussi /etc/shadow : si le hash commence par !, le compte est bloqué.' },
                  n4: { solution: true, correct: true, texte: 'Le shell de bob est /sbin/nologin ou /bin/false', explication: 'Vérifiez cat /etc/passwd | grep bob. Si le shell est /usr/sbin/nologin, changez-le : usermod -s /bin/bash bob.' },
                  n5: { solution: true, correct: true, texte: 'Ajouter bob au groupe www-data', explication: 'usermod -aG www-data bob. Attention : le changement ne prend effet qu\'à la prochaine connexion de bob. Pour appliquer immédiatement : newgrp www-data.' },
                  n6: { solution: true, correct: true, texte: 'Vérifier les permissions du répertoire /var/www/html', explication: 'Même membre du groupe, si la permission group (g) ne permet pas la lecture : ls -la /var/www/html. Si nécessaire : chmod g+rx /var/www/html.' }
                }
              }
            }
          ]
        },
        {
          id: 'admin-linux-m11',
          titre: 'Droits, permissions & droits spéciaux',
          cas: [
            {
              id: 'cas-alx-021',
              titre: 'Configurer les permissions et le sticky bit',
              difficulte: 'moyen',
              format: 'terminal',
              objectif: 'Appliquer des permissions classiques, utiliser chmod octal, et configurer le sticky bit sur un répertoire partagé.',
              contexte: 'Vous créez un répertoire partagé /shared où plusieurs utilisateurs peuvent créer des fichiers, mais ne doivent pas pouvoir supprimer les fichiers des autres.',
              contenu: {
                prompt: 'root@srv:~#',
                commandes: {
                  'mkdir /shared': '',
                  'ls -ld /shared': 'drwxr-xr-x 2 root root 4096 Mar  2 10:00 /shared',
                  'chmod 1777 /shared': '',
                  'ls -ld /shared': 'drwxrwxrwt 2 root root 4096 Mar  2 10:00 /shared',
                  'chmod 750 /var/www/html': '',
                  'ls -ld /var/www/html': 'drwxr-x--- 2 www-data www-data 4096 Mar  2 09:00 /var/www/html',
                  'chmod u+s /usr/bin/script': '',
                  'ls -l /usr/bin/script': '-rwsr-xr-x 1 root root 12345 Mar  2 09:00 /usr/bin/script',
                  'chmod 4755 /usr/bin/script': '',
                  'find /var/www -perm /o+w': '/var/www/html/upload\n(fichiers avec droits en écriture pour other)',
                  'help': 'Commandes : mkdir /shared, ls -ld /shared, chmod 1777 /shared, chmod 750 /var/www/html, chmod u+s /usr/bin/script, chmod 4755 /usr/bin/script, find /var/www -perm /o+w'
                },
                validation: ['chmod 1777 /shared', 'ls -ld /shared'],
                indices: [
                  'Le sticky bit (1 en octal, t dans ls) sur un répertoire permet à chaque user de supprimer uniquement ses propres fichiers.',
                  'chmod 1777 = rwxrwxrwt. Le "t" final indique le sticky bit actif.'
                ],
                solution: ['mkdir /shared', 'chmod 1777 /shared', 'ls -ld /shared']
              }
            },
            {
              id: 'cas-alx-022',
              titre: 'Diagnostiquer une erreur "Permission denied"',
              difficulte: 'moyen',
              format: 'arbre',
              objectif: 'Analyser les permissions d\'un fichier ou répertoire pour comprendre un refus d\'accès.',
              contexte: 'L\'utilisateur "alice" (groupe www-data) reçoit "Permission denied" en tentant d\'écrire dans /var/www/html.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Quelles sont les permissions de /var/www/html ? (ls -ld /var/www/html)', choix: [{ texte: 'drwxr-xr-x root root (écriture uniquement pour root)', suite: 'n2' }, { texte: 'drwxrwsr-x root www-data (écriture pour le groupe www-data)', suite: 'n3' }, { texte: 'drwx------ root root (accès uniquement pour root)', suite: 'n4' }] },
                  n2: { question: 'Alice est-elle propriétaire ou membre du groupe propriétaire ?', choix: [{ texte: 'Alice est dans le groupe www-data', suite: 'n5' }, { texte: 'Alice n\'est ni propriétaire ni dans le groupe', suite: 'n6' }] },
                  n3: { solution: true, correct: true, texte: 'Alice doit être dans le groupe www-data', explication: 'Les permissions de groupe permettent l\'écriture (w). Vérifiez : id alice. Si elle n\'est pas dans www-data, ajoutez-la : usermod -aG www-data alice.' },
                  n4: { solution: true, correct: true, texte: 'Modifier les permissions ou changer le propriétaire', explication: 'Seul root peut accéder. Solutions : chown www-data:www-data /var/www/html puis chmod 775 /var/www/html, ou chown alice /var/www/html si c\'est son espace.' },
                  n5: { solution: true, correct: true, texte: 'Ajouter la permission d\'écriture au groupe', explication: 'Alice est dans www-data mais le groupe n\'a pas la permission w. Ajoutez-la : chmod g+w /var/www/html.' },
                  n6: { solution: true, correct: true, texte: 'Ajouter alice au groupe propriétaire ou ajuster les permissions "other"', explication: 'Option 1 : usermod -aG www-data alice (recommandé). Option 2 : chmod o+w /var/www/html (déconseillé en production, ouvre à tous les utilisateurs).' }
                }
              }
            }
          ]
        },
        {
          id: 'admin-linux-m12',
          titre: 'Logs, planification & analyse système',
          cas: [
            {
              id: 'cas-alx-023',
              titre: 'Analyser les logs et configurer une tâche cron',
              difficulte: 'moyen',
              format: 'terminal',
              objectif: 'Lire les journaux système avec journalctl et configurer une tâche planifiée avec cron.',
              contexte: 'Un service a planté la nuit dernière. Vous devez analyser les logs pour identifier la cause, puis planifier un script de sauvegarde quotidien à 2h du matin.',
              contenu: {
                prompt: 'root@srv:~#',
                commandes: {
                  'journalctl -b': '-- Journal begins at Fri 2024-03-01 08:00:00 UTC --\nMar 02 02:15:03 srv kernel: Out of memory: Killed process 1847 (apache2)\nMar 02 02:15:04 srv systemd[1]: apache2.service: Main process exited, code=killed\nMar 02 02:15:05 srv systemd[1]: apache2.service: Failed with result out-of-memory.',
                  'journalctl -u apache2 --since "2024-03-02" --until "2024-03-02 03:00"': 'Mar 02 02:14:55 srv apache2[1847]: [mpm_prefork:error] server reached MaxRequestWorkers\nMar 02 02:15:03 srv kernel: Out of memory: Killed process 1847 (apache2)\nMar 02 02:15:04 srv systemd[1]: apache2.service: Failed.',
                  'journalctl -p err -n 20': 'Mar 02 02:15:03 srv kernel: Out of memory: Killed process 1847 (apache2)\nMar 02 02:15:04 srv systemd[1]: apache2.service: Failed with result out-of-memory.\nMar 02 06:00:01 srv CRON[2145]: (root) CMD ([ -x /usr/lib/php/sessionclean ])',
                  'crontab -e': '[Ouverture de l\'éditeur cron]\n[Ajoutez : 0 2 * * * /opt/scripts/backup.sh >> /var/log/backup.log 2>&1]',
                  'crontab -l': '0 2 * * * /opt/scripts/backup.sh >> /var/log/backup.log 2>&1',
                  'tail -f /var/log/syslog': 'Mar 02 10:30:01 srv CRON[3421]: (root) CMD (/opt/scripts/backup.sh)\nMar 02 10:30:02 srv backup: Sauvegarde démarrée...\nMar 02 10:30:15 srv backup: Sauvegarde terminée avec succès.',
                  'help': 'Commandes : journalctl -b, journalctl -u apache2 --since "2024-03-02" --until "2024-03-02 03:00", journalctl -p err -n 20, crontab -e, crontab -l, tail -f /var/log/syslog'
                },
                validation: ['journalctl -u apache2 --since "2024-03-02" --until "2024-03-02 03:00"', 'crontab -e', 'crontab -l'],
                indices: [
                  'journalctl -u <service> filtre par unité systemd. --since et --until permettent de cibler une période précise.',
                  'La syntaxe cron : minute heure jour mois jour-semaine commande. "0 2 * * *" = tous les jours à 2h00.'
                ],
                solution: ['journalctl -b', 'journalctl -u apache2 --since "2024-03-02" --until "2024-03-02 03:00"', 'crontab -e', 'crontab -l']
              }
            },
            {
              id: 'cas-alx-024',
              titre: 'Identifier la cause d\'un problème via les logs',
              difficulte: 'difficile',
              format: 'arbre',
              objectif: 'Utiliser les logs système pour diagnostiquer la cause d\'une panne récurrente.',
              contexte: 'Le serveur redémarre spontanément chaque nuit vers 2h. Vous devez identifier la cause via les journaux.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Que révèle journalctl -b -1 (boot précédent) avant le redémarrage ?', choix: [{ texte: 'Messages "Out of memory: Killed process..."', suite: 'n2' }, { texte: 'Messages "kernel: BUG:" ou "kernel panic"', suite: 'n3' }, { texte: 'Aucun message d\'erreur, redémarrage propre', suite: 'n4' }] },
                  n2: { question: 'Quel processus est tué par l\'OOM Killer ?', choix: [{ texte: 'Un service applicatif (apache2, mysql...)', suite: 'n5' }, { texte: 'Le processus init/systemd lui-même', suite: 'n6' }] },
                  n3: { solution: true, correct: true, texte: 'Problème matériel ou pilote — vérifier la RAM et les pilotes', explication: 'Kernel panic indique un problème grave : RAM défaillante (lancez memtest86+), pilote buggé (vérifiez les logs pour identifier le module), ou noyau corrompu (réinstaller linux-image).' },
                  n4: { question: 'Y a-t-il une tâche planifiée à cette heure-là ?', choix: [{ texte: 'Oui, un script cron tourne vers 2h', suite: 'n7' }, { texte: 'Non, aucune tâche planifiée', suite: 'n8' }] },
                  n5: { solution: true, correct: true, texte: 'Fuite mémoire dans l\'application — ajuster la config ou la RAM', explication: 'L\'application consomme trop de mémoire. Solutions immédiates : limiter avec ulimit ou les options MaxRequestWorkers (Apache), augmenter la RAM, ou configurer un swap. À terme : investigation de la fuite mémoire.' },
                  n6: { solution: true, correct: true, texte: 'RAM physique insuffisante pour la charge système de base', explication: 'Si systemd est tué par l\'OOM, la RAM est insuffisante pour le système de base. Ajoutez de la RAM ou réduisez le nombre de services démarrés.' },
                  n7: { solution: true, correct: true, texte: 'Le script cron provoque un redémarrage ou consomme toutes les ressources', explication: 'Analysez le script : contient-il un reboot ? Consomme-t-il toute la RAM/CPU ? Vérifiez : crontab -l -u root et examinez le script indiqué.' },
                  n8: { solution: true, correct: true, texte: 'Problème matériel — vérifier la température et l\'alimentation', explication: 'Redémarrage silencieux sans cause logicielle = suspect matériel. Vérifiez : journalctl -k pour les messages noyau, sensors pour la température CPU, et les logs BIOS/IPMI si disponibles.' }
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: 'base-reseaux',
      titre: 'Base des Réseaux',
      emoji: '🌐',
      modules: [
        {
          id: 'base-reseaux-m01',
          titre: 'Modèle OSI',
          cas: [
            {
              id: 'cas-br-001',
              titre: 'Associer protocoles et couches OSI',
              difficulte: 'facile',
              format: 'scenario',
              objectif: 'Identifier à quelle couche du modèle OSI appartient chaque protocole ou équipement.',
              contexte: 'Lors d\'un audit réseau, vous devez classer des éléments du réseau selon le modèle OSI en 7 couches.',
              contenu: {
                etapes: [
                  {
                    description: 'À quelle couche OSI appartient le protocole IP (Internet Protocol) ?',
                    choix: [
                      { texte: 'Couche 2 — Liaison de données', correct: false, feedback: 'Non. La couche 2 gère l\'adressage MAC et la trame Ethernet (commutateurs, cartes réseau).' },
                      { texte: 'Couche 3 — Réseau', correct: true, feedback: 'Correct ! IP est un protocole de couche 3. Il gère l\'adressage logique (adresses IP) et le routage des paquets entre réseaux.' },
                      { texte: 'Couche 4 — Transport', correct: false, feedback: 'Non. La couche 4 gère TCP et UDP — le transport de bout en bout, les ports, la segmentation.' }
                    ]
                  },
                  {
                    description: 'Un commutateur (switch) non manageable opère à quelle couche OSI ?',
                    choix: [
                      { texte: 'Couche 1 — Physique', correct: false, feedback: 'Non. La couche 1 concerne le signal électrique, les câbles, les répéteurs et les hubs.' },
                      { texte: 'Couche 2 — Liaison de données', correct: true, feedback: 'Correct ! Un switch opère en couche 2 : il apprend les adresses MAC et commute les trames entre les ports du même réseau local.' },
                      { texte: 'Couche 3 — Réseau', correct: false, feedback: 'Non, un switch basique est couche 2. Un switch de couche 3 (switch routant) existe mais c\'est un cas particulier.' }
                    ]
                  },
                  {
                    description: 'Le protocole HTTPS opère à quelle couche OSI ?',
                    choix: [
                      { texte: 'Couche 5 — Session', correct: false, feedback: 'Non. La couche 5 gère l\'établissement et la fin des sessions de communication (ex: NetBIOS, RPC).' },
                      { texte: 'Couche 6 — Présentation', correct: false, feedback: 'La couche 6 gère le chiffrement et l\'encodage des données, mais HTTPS est classé en couche 7.' },
                      { texte: 'Couche 7 — Application', correct: true, feedback: 'Correct ! HTTPS (comme HTTP, FTP, DNS, SMTP) est un protocole de couche 7 — la couche applicative qui interagit directement avec les logiciels utilisateurs.' }
                    ]
                  }
                ]
              }
            },
            {
              id: 'cas-br-002',
              titre: 'Identifier la couche OSI défaillante',
              difficulte: 'moyen',
              format: 'arbre',
              objectif: 'Déterminer à quelle couche OSI se situe la panne réseau observée.',
              contexte: 'Un poste de travail rencontre des problèmes réseau. Utilisez le modèle OSI pour cibler la couche défaillante.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Quel est le symptôme principal observé ?', choix: [{ texte: 'Le câble est branché mais aucun voyant ne s\'allume sur la carte réseau', suite: 'n2' }, { texte: 'Ping en IP local fonctionne mais pas de navigation web', suite: 'n3' }, { texte: 'Le ping fonctionne mais un transfert de fichier échoue en cours', suite: 'n4' }] },
                  n2: { question: 'En changeant le câble, le voyant s\'allume-t-il ?', choix: [{ texte: 'Oui, avec un autre câble ça marche', suite: 'n5' }, { texte: 'Non, toujours aucun signal', suite: 'n6' }] },
                  n3: { question: 'La résolution DNS fonctionne-t-elle ? (ping google.com vs ping 8.8.8.8)', choix: [{ texte: 'ping 8.8.8.8 OK mais ping google.com échoue', suite: 'n7' }, { texte: 'Les deux échouent, mais ping 192.168.1.1 fonctionne', suite: 'n8' }] },
                  n4: { solution: true, correct: true, texte: 'Couche 4 (Transport) — problème TCP/segments perdus', explication: 'La connectivité IP est OK (ping fonctionne) mais le transfert échoue. Le problème est en couche 4 : perte de paquets TCP, MTU trop élevé, ou pare-feu bloquant certains ports.' },
                  n5: { solution: true, correct: true, texte: 'Couche 1 (Physique) — câble défectueux', explication: 'Le câble était le coupable. Problème de couche 1 physique. Remplacez le câble et vérifiez les connecteurs RJ45 qui peuvent être mal sertis.' },
                  n6: { solution: true, correct: true, texte: 'Couche 1 (Physique) — carte réseau ou port switch HS', explication: 'Si le câble n\'est pas en cause, vérifiez le port du switch (essayez un autre port) et la carte réseau (pilote, état dans le gestionnaire de périphériques).' },
                  n7: { solution: true, correct: true, texte: 'Couche 7 (Application) — problème DNS', explication: 'La connectivité IP est OK. C\'est la résolution de noms (DNS) qui est défaillante — une fonction de couche 7. Vérifiez /etc/resolv.conf ou les serveurs DNS configurés.' },
                  n8: { solution: true, correct: true, texte: 'Couche 3 (Réseau) — problème de routage vers Internet', explication: 'Le LAN fonctionne (ping passerelle OK) mais pas Internet : problème de routage en couche 3. Vérifiez la route par défaut : ip route show. La passerelle doit pointer vers Internet.' }
                }
              }
            }
          ]
        },
        {
          id: 'base-reseaux-m02',
          titre: 'Les Unités Informatiques',
          cas: [
            {
              id: 'cas-br-003',
              titre: 'Conversions binaire, décimal et hexadécimal',
              difficulte: 'moyen',
              format: 'scenario',
              objectif: 'Effectuer des conversions entre les différentes bases numériques utilisées en informatique.',
              contexte: 'En analysant une capture réseau, vous rencontrez des valeurs en binaire et hexadécimal qu\'il faut interpréter.',
              contenu: {
                etapes: [
                  {
                    description: 'Quelle est la valeur décimale de l\'octet binaire 11000000 ?',
                    choix: [
                      { texte: '128', correct: false, feedback: '128 correspond à 10000000 en binaire. 11000000 = 128 + 64 = 192.' },
                      { texte: '192', correct: true, feedback: 'Correct ! 11000000 : bit 7 (128) + bit 6 (64) = 192. C\'est le premier octet des adresses IP de classe C (ex: 192.168.x.x).' },
                      { texte: '224', correct: false, feedback: '224 correspond à 11100000. 11000000 ne comporte que les deux bits de poids fort à 1 : 128+64=192.' }
                    ]
                  },
                  {
                    description: 'Combien de bits comporte un octet ? Et combien d\'octets dans une adresse IPv4 ?',
                    choix: [
                      { texte: '8 bits par octet, 4 octets dans une IPv4 (32 bits au total)', correct: true, feedback: 'Parfait ! 1 octet = 8 bits. Une IPv4 = 4 octets = 32 bits. Exemple : 192.168.1.10 → 4 valeurs décimales de 0 à 255.' },
                      { texte: '8 bits par octet, 6 octets dans une IPv4 (48 bits)', correct: false, feedback: '6 octets / 48 bits correspond à une adresse MAC, pas IPv4. IPv4 = 4 octets = 32 bits.' },
                      { texte: '16 bits par octet, 4 octets dans une IPv4', correct: false, feedback: 'Un octet est toujours 8 bits, par définition. 16 bits = 2 octets = 1 mot (word).' }
                    ]
                  },
                  {
                    description: 'Quelle est la valeur hexadécimale de 255 (valeur maximale d\'un octet) ?',
                    choix: [
                      { texte: 'FF', correct: true, feedback: 'Correct ! 255 en hex = FF. C\'est pourquoi un masque 255.255.255.0 s\'écrit FF:FF:FF:00 en hexadécimal. F = 15 en décimal, FF = 15×16 + 15 = 255.' },
                      { texte: 'FE', correct: false, feedback: 'FE = 254 en décimal. La valeur maximale d\'un octet (255) correspond à FF en hexadécimal.' },
                      { texte: '100', correct: false, feedback: '0x100 en hexadécimal = 256 en décimal, soit 1 de plus que la valeur max d\'un octet. 255 = 0xFF.' }
                    ]
                  }
                ]
              }
            },
            {
              id: 'cas-br-004',
              titre: 'Choisir la bonne unité de mesure',
              difficulte: 'facile',
              format: 'arbre',
              objectif: 'Distinguer les unités de stockage (octets) des unités de débit (bits/s) et faire les bons calculs.',
              contexte: 'Un client vous pose des questions sur les capacités de son réseau et de son stockage. Vous devez répondre avec les bonnes unités.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'On parle de quelle grandeur ?', choix: [{ texte: 'Vitesse de connexion Internet (débit)', suite: 'n2' }, { texte: 'Capacité d\'un disque dur ou clé USB (stockage)', suite: 'n3' }] },
                  n2: { question: 'L\'offre Internet annonce "100 Mbit/s". Combien de Mo/s peut-on télécharger au maximum ?', choix: [{ texte: '100 Mo/s', correct: false, suite: 'n4' }, { texte: '12,5 Mo/s', correct: true, suite: 'n5' }, { texte: '800 Mo/s', correct: false, suite: 'n6' }] },
                  n3: { question: 'Un disque de 1 To contient environ combien de Go ?', choix: [{ texte: '100 Go', suite: 'n7' }, { texte: '1 000 Go', suite: 'n8' }, { texte: '1 024 Go', suite: 'n9' }] },
                  n4: { solution: true, correct: false, texte: 'Non — confusion bits et octets', explication: '100 Mbit/s ne donne pas 100 Mo/s. 1 octet = 8 bits. Pour convertir le débit en octets : 100 Mbit/s ÷ 8 = 12,5 Mo/s maximum.' },
                  n5: { solution: true, correct: true, texte: 'Correct — 100 Mbit/s ÷ 8 = 12,5 Mo/s', explication: 'Le débit réseau s\'exprime en bits/s, le stockage en octets. Pour convertir : débit (bits/s) ÷ 8 = vitesse de transfert effective en octets/s.' },
                  n6: { solution: true, correct: false, texte: 'Non — la multiplication est dans le mauvais sens', explication: 'On ne multiplie pas par 8 pour passer de bits à octets : on divise. 100 Mbit/s ÷ 8 = 12,5 Mo/s.' },
                  n7: { solution: true, correct: false, texte: 'Non — 1 To = 1 000 Go (ou 1 024 Gio selon la convention)', explication: 'Les préfixes SI : 1 To (téraoctet) = 1 000 Go. Les préfixes binaires : 1 Tio (tébioctet) = 1 024 Gio. Les fabricants utilisent SI, les OS affichent souvent en binaire.' },
                  n8: { solution: true, correct: true, texte: 'Correct (convention SI utilisée par les fabricants)', explication: '1 To = 1 000 Go selon la norme SI (International). Les fabricants de disques utilisent cette convention. C\'est pourquoi un disque "1 To" affiche 931 Gio sous Windows (qui utilise la convention binaire).' },
                  n9: { solution: true, correct: false, texte: 'C\'est la convention binaire (Tio)', explication: '1 Tio (tébioctet) = 1 024 Gio. C\'est la convention binaire utilisée par les OS. Les fabricants, eux, utilisent 1 To = 1 000 Go. D\'où la différence de taille affichée.' }
                }
              }
            }
          ]
        },
        {
          id: 'base-reseaux-m03',
          titre: 'Adressage IPv4',
          cas: [
            {
              id: 'cas-br-005',
              titre: 'Calculer les paramètres d\'un sous-réseau',
              difficulte: 'moyen',
              format: 'terminal',
              objectif: 'Utiliser ipcalc pour déterminer l\'adresse réseau, le broadcast, la plage d\'hôtes et le masque.',
              contexte: 'Vous devez configurer un sous-réseau 192.168.10.0/26 et identifier toutes ses caractéristiques avant d\'assigner des adresses IP.',
              contenu: {
                prompt: 'admin@srv:~$',
                commandes: {
                  'ipcalc 192.168.10.0/26': 'Address:   192.168.10.0          11000000.10101000.00001010.00 000000\nNetmask:   255.255.255.192 = 26  11111111.11111111.11111111.11 000000\nWildcard:  0.0.0.63             00000000.00000000.00000000.00 111111\n=>\nNetwork:   192.168.10.0/26      11000000.10101000.00001010.00 000000\nHostMin:   192.168.10.1         11000000.10101000.00001010.00 000001\nHostMax:   192.168.10.62        11000000.10101000.00001010.00 111110\nBroadcast: 192.168.10.63        11000000.10101000.00001010.00 111111\nHosts/Net: 62',
                  'ipcalc 10.0.0.0/8': 'Address:   10.0.0.0\nNetmask:   255.0.0.0 = 8\nNetwork:   10.0.0.0/8\nHostMin:   10.0.0.1\nHostMax:   10.255.255.254\nBroadcast: 10.255.255.255\nHosts/Net: 16777214',
                  'ipcalc 192.168.1.100/24': 'Address:   192.168.1.100\nNetmask:   255.255.255.0 = 24\nNetwork:   192.168.1.0/24\nHostMin:   192.168.1.1\nHostMax:   192.168.1.254\nBroadcast: 192.168.1.255\nHosts/Net: 254',
                  'ipcalc -s 50 30 10 192.168.1.0/24': 'Subnets after transition from 192.168.1.0/24\n1. 192.168.1.0/26    — 62 hosts (pour 50)\n2. 192.168.1.64/27   — 30 hosts (pour 30)\n3. 192.168.1.96/28   — 14 hosts (pour 10)',
                  'help': 'Commandes : ipcalc 192.168.10.0/26, ipcalc 10.0.0.0/8, ipcalc 192.168.1.100/24, ipcalc -s 50 30 10 192.168.1.0/24'
                },
                validation: ['ipcalc 192.168.10.0/26'],
                indices: [
                  'ipcalc calcule automatiquement le masque, l\'adresse réseau, le broadcast et la plage d\'hôtes à partir d\'une notation CIDR.',
                  '/26 = masque 255.255.255.192 = 64 adresses = 62 hôtes utilisables (réseau et broadcast exclus).'
                ],
                solution: ['ipcalc 192.168.10.0/26', 'ipcalc 192.168.1.100/24']
              }
            },
            {
              id: 'cas-br-006',
              titre: 'Diagnostiquer un problème d\'adressage IP',
              difficulte: 'moyen',
              format: 'arbre',
              objectif: 'Identifier une erreur de configuration IP (adresse hors réseau, conflit, masque incorrect).',
              contexte: 'Deux postes sur le même switch ne communiquent pas. Poste A : 192.168.1.10/24. Poste B : 192.168.2.20/24. Vous devez diagnostiquer.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Les deux postes sont sur le même réseau physique (même switch). Peuvent-ils communiquer directement ?', choix: [{ texte: 'Oui, même switch = même réseau, ils peuvent communiquer', suite: 'n2' }, { texte: 'Non, leurs adresses IP sont sur des réseaux différents', suite: 'n3' }] },
                  n2: { solution: true, correct: false, texte: 'Erreur — le réseau physique ≠ le réseau logique (IP)', explication: 'Être sur le même switch (couche 2) ne suffit pas. L\'adressage IP (couche 3) doit aussi être cohérent. 192.168.1.x/24 et 192.168.2.x/24 sont deux réseaux IP distincts.' },
                  n3: { question: 'Quelle est la bonne correction à apporter ?', choix: [{ texte: 'Mettre A et B dans le même réseau IP (ex: tous les deux en 192.168.1.x/24)', suite: 'n4' }, { texte: 'Brancher les deux postes sur des switches différents', suite: 'n5' }, { texte: 'Ajouter un routeur entre les deux postes', suite: 'n6' }] },
                  n4: { solution: true, correct: true, texte: 'Correction IP — même sous-réseau pour les deux postes', explication: 'Changez l\'IP du poste B en 192.168.1.20/24 (ou toute adresse 192.168.1.x/24 non utilisée). Les deux postes seront alors dans le même réseau IP et pourront communiquer directement.' },
                  n5: { solution: true, correct: false, texte: 'Mauvaise idée — le problème est logiciel (IP), pas physique', explication: 'Les séparer sur des switches différents n\'arrange rien. Le problème vient de la configuration IP. Corrigez l\'adresse de l\'un des postes pour qu\'ils soient dans le même sous-réseau.' },
                  n6: { solution: true, correct: false, texte: 'Possible mais disproportionné', explication: 'Un routeur permettrait de relier les deux sous-réseaux, mais c\'est une solution coûteuse pour un simple problème de configuration. Il est bien plus simple de corriger l\'IP d\'un poste.' }
                }
              }
            }
          ]
        },
        {
          id: 'base-reseaux-m04',
          titre: 'Communication Réseau',
          cas: [
            {
              id: 'cas-br-007',
              titre: 'Comprendre ARP et la communication locale',
              difficulte: 'moyen',
              format: 'scenario',
              objectif: 'Comprendre le rôle d\'ARP dans la communication entre deux hôtes du même réseau.',
              contexte: 'Le poste A (192.168.1.10) veut envoyer un paquet au poste B (192.168.1.20) pour la première fois. Analysez le mécanisme de communication.',
              contenu: {
                etapes: [
                  {
                    description: 'Le poste A connaît l\'IP de B mais pas son adresse MAC. Quelle est la première action de A ?',
                    choix: [
                      { texte: 'Envoyer le paquet directement à la passerelle par défaut', correct: false, feedback: 'Non. B est sur le même réseau que A (même /24). A n\'a pas besoin de passer par la passerelle pour joindre B. Il peut communiquer directement en couche 2.' },
                      { texte: 'Envoyer une requête ARP en broadcast pour demander "qui a l\'IP 192.168.1.20 ?"', correct: true, feedback: 'Correct ! ARP (Address Resolution Protocol) permet de découvrir l\'adresse MAC correspondant à une IP. A envoie un broadcast (FF:FF:FF:FF:FF:FF) sur le réseau local.' },
                      { texte: 'Contacter le serveur DNS pour obtenir l\'adresse MAC de B', correct: false, feedback: 'Non. DNS résout des noms en adresses IP, pas des IP en adresses MAC. C\'est le rôle d\'ARP de résoudre les IP en adresses MAC sur un réseau local.' }
                    ]
                  },
                  {
                    description: 'B reçoit la requête ARP et répond. Que se passe-t-il ensuite côté poste A ?',
                    choix: [
                      { texte: 'A stocke le couple IP/MAC de B dans son cache ARP et envoie le paquet', correct: true, feedback: 'Exact ! A met en cache l\'entrée ARP (IP 192.168.1.20 → MAC de B) pour éviter de refaire une requête ARP à chaque paquet. Ce cache a une durée de vie limitée (quelques minutes).' },
                      { texte: 'A doit refaire une requête ARP à chaque paquet envoyé', correct: false, feedback: 'Non, ce serait très inefficace. Le cache ARP évite de répéter la résolution. Vous pouvez le consulter avec : arp -n ou ip neigh show.' },
                      { texte: 'A envoie le paquet en broadcast car il n\'est pas sûr de l\'adresse MAC', correct: false, feedback: 'Non. Une fois la réponse ARP reçue, A connaît le MAC de B et envoie les paquets en unicast directement à ce MAC.' }
                    ]
                  },
                  {
                    description: 'A veut maintenant joindre un serveur sur Internet (203.0.113.5). Vers quelle adresse MAC A envoie-t-il la trame Ethernet ?',
                    choix: [
                      { texte: 'Directement vers l\'adresse MAC du serveur distant 203.0.113.5', correct: false, feedback: 'Impossible. Les adresses MAC ne traversent pas les routeurs. Pour joindre une IP hors du réseau local, la trame est adressée au MAC de la passerelle par défaut.' },
                      { texte: 'Vers l\'adresse MAC de la passerelle par défaut (routeur)', correct: true, feedback: 'Correct ! Pour toute destination hors du réseau local, A envoie la trame au MAC de sa passerelle (routeur). C\'est le routeur qui se charge d\'acheminer ensuite le paquet IP vers Internet.' },
                      { texte: 'En broadcast (FF:FF:FF:FF:FF:FF) vers tout le réseau', correct: false, feedback: 'Non. Le broadcast est utilisé uniquement pour ARP. Une fois le MAC de la passerelle connu, la trame est envoyée en unicast au MAC du routeur.' }
                    ]
                  }
                ]
              }
            },
            {
              id: 'cas-br-008',
              titre: 'Identifier le type de communication réseau',
              difficulte: 'facile',
              format: 'arbre',
              objectif: 'Distinguer unicast, broadcast et multicast et identifier leur usage dans un réseau.',
              contexte: 'Lors de l\'analyse d\'une capture réseau, vous observez différents types de trames. Vous devez les classer.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Une trame est envoyée à l\'adresse MAC FF:FF:FF:FF:FF:FF. Quel est son type ?', choix: [{ texte: 'Unicast — vers un seul destinataire', suite: 'n2' }, { texte: 'Broadcast — vers tous les hôtes du réseau local', suite: 'n3' }, { texte: 'Multicast — vers un groupe d\'abonnés', suite: 'n4' }] },
                  n2: { solution: true, correct: false, texte: 'Non — FF:FF:FF:FF:FF:FF est l\'adresse broadcast', explication: 'L\'adresse MAC FF:FF:FF:FF:FF:FF signifie "tous les hôtes du réseau local". C\'est une trame broadcast, reçue et traitée par toutes les machines du segment.' },
                  n3: { solution: true, correct: true, texte: 'Correct — c\'est un broadcast Ethernet', explication: 'FF:FF:FF:FF:FF:FF = broadcast Ethernet. Tous les équipements du réseau local reçoivent et traitent cette trame. Exemples d\'usage : requêtes ARP, DHCP Discover.' },
                  n4: { solution: true, correct: false, texte: 'Non — le multicast a des adresses spécifiques', explication: 'Le multicast utilise des adresses MAC commençant par 01:00:5E (IPv4) ou 33:33 (IPv6). Exemples : protocoles de routage OSPF (01:00:5E:00:00:05), protocoles vidéo.' }
                }
              }
            }
          ]
        },
        {
          id: 'base-reseaux-m05',
          titre: 'Premières Commandes',
          cas: [
            {
              id: 'cas-br-009',
              titre: 'Diagnostiquer la connectivité avec les commandes réseau',
              difficulte: 'facile',
              format: 'terminal',
              objectif: 'Utiliser ping, traceroute, ip a et ip route pour analyser la connectivité réseau.',
              contexte: 'Un poste Linux ne peut pas accéder au site web de l\'entreprise. Vous utilisez les commandes réseau pour diagnostiquer.',
              contenu: {
                prompt: 'admin@poste:~$',
                commandes: {
                  'ip a': '1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536\n    inet 127.0.0.1/8 scope host lo\n2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500\n    inet 192.168.1.50/24 brd 192.168.1.255 scope global ens33',
                  'ip route show': 'default via 192.168.1.1 dev ens33 proto dhcp\n192.168.1.0/24 dev ens33 proto kernel scope link src 192.168.1.50',
                  'ping -c 3 192.168.1.1': 'PING 192.168.1.1 56(84) bytes of data.\n64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.5ms\n64 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=0.4ms\n--- 192.168.1.1 ping statistics ---\n3 packets transmitted, 3 received, 0% packet loss',
                  'ping -c 3 8.8.8.8': 'PING 8.8.8.8 56(84) bytes of data.\n64 bytes from 8.8.8.8: icmp_seq=1 ttl=118 time=12ms\n--- 8.8.8.8 ping statistics ---\n3 packets transmitted, 3 received, 0% packet loss',
                  'ping -c 3 www.entreprise.fr': 'ping: www.entreprise.fr: Temporary failure in name resolution',
                  'cat /etc/resolv.conf': '# Generated by NetworkManager\n# Aucun serveur DNS configuré',
                  'traceroute 8.8.8.8': 'traceroute to 8.8.8.8, 30 hops max\n 1  192.168.1.1  0.543ms\n 2  10.0.0.1  8.234ms\n 3  8.8.8.8  12.1ms',
                  'ss -tuln': 'Netid  State  Recv-Q  Send-Q  Local Address:Port\ntcp    LISTEN 0       128     0.0.0.0:22\ntcp    LISTEN 0       128     0.0.0.0:80',
                  'help': 'Commandes : ip a, ip route show, ping -c 3 192.168.1.1, ping -c 3 8.8.8.8, ping -c 3 www.entreprise.fr, cat /etc/resolv.conf, traceroute 8.8.8.8, ss -tuln'
                },
                validation: ['ping -c 3 8.8.8.8', 'ping -c 3 www.entreprise.fr', 'cat /etc/resolv.conf'],
                indices: [
                  'Méthode : testez d\'abord la passerelle locale, puis une IP Internet, puis un nom de domaine. Cela permet de cibler la couche défaillante.',
                  'Si ping IP fonctionne mais ping nom échoue → problème DNS. Vérifiez /etc/resolv.conf.'
                ],
                solution: ['ip a', 'ping -c 3 192.168.1.1', 'ping -c 3 8.8.8.8', 'ping -c 3 www.entreprise.fr', 'cat /etc/resolv.conf']
              }
            },
            {
              id: 'cas-br-010',
              titre: 'Choisir la bonne commande réseau',
              difficulte: 'facile',
              format: 'arbre',
              objectif: 'Identifier quelle commande réseau utiliser selon l\'information recherchée.',
              contexte: 'En tant que technicien, vous devez rapidement trouver l\'outil approprié pour chaque besoin de diagnostic réseau.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Quelle information recherchez-vous ?', choix: [{ texte: 'Voir les adresses IP configurées sur les interfaces', suite: 'n2' }, { texte: 'Tester la connectivité vers un hôte distant', suite: 'n3' }, { texte: 'Connaître le chemin emprunté par les paquets vers une destination', suite: 'n4' }] },
                  n2: { question: 'Quel OS utilisez-vous ?', choix: [{ texte: 'Linux', suite: 'n5' }, { texte: 'Windows', suite: 'n6' }] },
                  n3: { solution: true, correct: true, texte: 'ping <adresse>', explication: 'ping envoie des requêtes ICMP Echo Request. Si la cible répond, la connectivité IP est confirmée. Options utiles : -c 4 (Linux, limite à 4 paquets), -n (Windows, 4 paquets par défaut).' },
                  n4: { solution: true, correct: true, texte: 'traceroute (Linux) / tracert (Windows)', explication: 'traceroute affiche tous les routeurs traversés jusqu\'à la destination. Utile pour localiser où un paquet est bloqué. Chaque ligne = un saut (hop) avec sa latence.' },
                  n5: { solution: true, correct: true, texte: 'ip a (ou ip addr show)', explication: 'Sur Linux, ip a affiche toutes les interfaces et leurs adresses IP/MAC. La commande ifconfig est dépréciée mais encore disponible. ip a est la commande moderne recommandée.' },
                  n6: { solution: true, correct: true, texte: 'ipconfig (ou ipconfig /all pour plus de détails)', explication: 'Sur Windows, ipconfig affiche les adresses IP. ipconfig /all ajoute les adresses MAC, serveurs DNS, DHCP. ipconfig /release et /renew permettent de renouveler un bail DHCP.' }
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: 'glpi',
      titre: 'GLPI',
      emoji: '🎫',
      modules: [
        {
          id: 'glpi-m01',
          titre: 'Présentation et installation GLPI',
          cas: [
            {
              id: 'cas-glpi-001',
              titre: 'Installer GLPI sur un serveur LAMP',
              difficulte: 'moyen',
              format: 'scenario',
              objectif: 'Identifier les prérequis et les étapes correctes d\'installation de GLPI.',
              contexte: 'Vous devez installer GLPI sur un serveur Debian fraîchement installé. Vous devez effectuer les étapes dans le bon ordre.',
              contenu: {
                etapes: [
                  {
                    description: 'Quels sont les prérequis logiciels à installer avant de déployer GLPI ?',
                    choix: [
                      { texte: 'Apache, PHP (avec extensions), MariaDB', correct: true, feedback: 'Correct ! GLPI requiert une pile LAMP : Apache (ou Nginx), PHP avec les extensions php-mysql, php-xml, php-gd, php-curl, php-mbstring, et MariaDB/MySQL comme base de données.' },
                      { texte: 'IIS, ASP.NET, SQL Server', correct: false, feedback: 'Non. GLPI est une application PHP/MySQL. IIS et ASP.NET sont des technologies Microsoft. GLPI fonctionne sur une pile LAMP (Linux, Apache, MySQL/MariaDB, PHP).' },
                      { texte: 'Apache, Python, PostgreSQL', correct: false, feedback: 'Non. GLPI nécessite PHP (pas Python) et MariaDB/MySQL (pas PostgreSQL, même si un support expérimental existe). Installez la pile LAMP classique.' }
                    ]
                  },
                  {
                    description: 'Après téléchargement de l\'archive GLPI et extraction dans /var/www/html/glpi, quelle permission est essentielle ?',
                    choix: [
                      { texte: 'chmod 777 -R /var/www/html/glpi', correct: false, feedback: 'Dangereux ! 777 donne les droits en écriture à tous les utilisateurs du système. C\'est une faille de sécurité majeure.' },
                      { texte: 'chown -R www-data:www-data /var/www/html/glpi', correct: true, feedback: 'Correct ! Le répertoire GLPI doit appartenir à l\'utilisateur du serveur web (www-data sur Debian/Ubuntu). Cela lui permet d\'écrire les fichiers de config, logs et sessions.' },
                      { texte: 'chmod 400 -R /var/www/html/glpi', correct: false, feedback: '400 (lecture seule pour le propriétaire) empêcherait GLPI d\'écrire ses fichiers de configuration et logs. L\'installation échouerait.' }
                    ]
                  },
                  {
                    description: 'Lors de l\'assistant d\'installation web GLPI, une étape "Vérification de la compatibilité" affiche une extension PHP manquante. Que faire ?',
                    choix: [
                      { texte: 'Ignorer l\'avertissement et continuer l\'installation', correct: false, feedback: 'Mauvaise idée. Les extensions manquantes peuvent provoquer des erreurs au runtime. Certaines sont obligatoires (php-mysqli) et bloquent réellement le fonctionnement de GLPI.' },
                      { texte: 'Installer l\'extension manquante (apt install php-xxx) puis redémarrer Apache', correct: true, feedback: 'Correct ! Installez l\'extension indiquée (ex: apt install php-gd), puis redémarrez Apache : systemctl restart apache2. Rechargez la page de l\'assistant pour valider.' },
                      { texte: 'Réinstaller PHP entièrement depuis le début', correct: false, feedback: 'Disproportionné. Il suffit d\'installer l\'extension manquante avec apt. Une réinstallation complète de PHP n\'est pas nécessaire.' }
                    ]
                  }
                ]
              }
            },
            {
              id: 'cas-glpi-002',
              titre: 'Diagnostiquer un échec d\'accès à l\'interface GLPI',
              difficulte: 'moyen',
              format: 'arbre',
              objectif: 'Identifier pourquoi l\'interface web GLPI est inaccessible après installation.',
              contexte: 'Après installation, le navigateur affiche une erreur en accédant à http://serveur/glpi. Vous devez diagnostiquer.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Quelle erreur le navigateur affiche-t-il ?', choix: [{ texte: '"This site can\'t be reached" / ERR_CONNECTION_REFUSED', suite: 'n2' }, { texte: 'Erreur 403 Forbidden', suite: 'n3' }, { texte: 'Page blanche ou erreur PHP', suite: 'n4' }] },
                  n2: { question: 'Le service Apache est-il démarré ?', choix: [{ texte: 'Non, systemctl status apache2 → inactive', suite: 'n5' }, { texte: 'Oui, Apache tourne mais la page est injoignable', suite: 'n6' }] },
                  n3: { solution: true, correct: true, texte: 'Problème de permissions sur le répertoire GLPI', explication: 'Erreur 403 = Apache ne peut pas lire les fichiers. Corrigez le propriétaire : chown -R www-data:www-data /var/www/html/glpi et les permissions : chmod -R 755 /var/www/html/glpi.' },
                  n4: { question: 'L\'erreur mentionne-t-elle une extension PHP ?', choix: [{ texte: 'Oui, "Call to undefined function" ou extension manquante', suite: 'n7' }, { texte: 'Non, page totalement blanche', suite: 'n8' }] },
                  n5: { solution: true, correct: true, texte: 'Démarrer Apache et l\'activer au boot', explication: 'Apache n\'est pas démarré. Lancez : systemctl start apache2 && systemctl enable apache2. Vérifiez ensuite : systemctl status apache2.' },
                  n6: { solution: true, correct: true, texte: 'Vérifier le VirtualHost ou le pare-feu', explication: 'Apache tourne mais n\'écoute peut-être pas sur la bonne IP/port, ou un pare-feu bloque le port 80. Vérifiez : ufw status, netstat -tlnp | grep 80, et la config Apache dans /etc/apache2/sites-enabled/.' },
                  n7: { solution: true, correct: true, texte: 'Installer l\'extension PHP manquante', explication: 'Identifiez l\'extension dans l\'erreur PHP et installez-la : apt install php-<extension>. Redémarrez Apache : systemctl restart apache2.' },
                  n8: { solution: true, correct: true, texte: 'Activer l\'affichage des erreurs PHP pour diagnostiquer', explication: 'Page blanche = erreur PHP silencieuse. Dans /etc/php/*/apache2/php.ini, mettez display_errors = On temporairement. Rechargez et lisez l\'erreur affichée.' }
                }
              }
            }
          ]
        },
        {
          id: 'glpi-m02',
          titre: 'Authentification AD & Habilitations',
          cas: [
            {
              id: 'cas-glpi-003',
              titre: 'Configurer l\'authentification LDAP/Active Directory',
              difficulte: 'difficile',
              format: 'scenario',
              objectif: 'Paramétrer la connexion LDAP de GLPI vers un Active Directory et tester l\'authentification.',
              contexte: 'Votre entreprise dispose d\'un Active Directory (domaine entreprise.local). Vous devez permettre aux utilisateurs AD de se connecter à GLPI avec leurs identifiants Windows.',
              contenu: {
                etapes: [
                  {
                    description: 'Dans GLPI (Configuration → Authentification → Annuaires LDAP), quelle est l\'adresse du serveur à renseigner ?',
                    choix: [
                      { texte: 'L\'adresse IP ou le nom DNS du contrôleur de domaine Active Directory', correct: true, feedback: 'Correct ! Il faut pointer vers le contrôleur de domaine AD qui expose le service LDAP (port 389 ou 636 pour LDAPS). Ex: 192.168.1.10 ou dc01.entreprise.local.' },
                      { texte: 'L\'adresse du serveur GLPI lui-même (localhost)', correct: false, feedback: 'Non. GLPI doit se connecter au contrôleur de domaine Active Directory, pas à lui-même. Le LDAP est exposé par le DC, pas par GLPI.' },
                      { texte: 'L\'adresse du serveur DNS de l\'entreprise', correct: false, feedback: 'Non. Le serveur DNS résout les noms, mais le service LDAP/AD est hébergé sur le contrôleur de domaine. Ces deux services peuvent être sur la même machine mais ce n\'est pas toujours le cas.' }
                    ]
                  },
                  {
                    description: 'Quel format utiliser pour le champ "DN de connexion" (compte de service LDAP pour parcourir l\'annuaire) ?',
                    choix: [
                      { texte: 'CN=glpi-service,OU=Services,DC=entreprise,DC=local', correct: true, feedback: 'Correct ! Le Distinguished Name (DN) est le format LDAP complet pour identifier un compte. CN = nom du compte, OU = unité organisationnelle, DC = composants du domaine.' },
                      { texte: 'glpi-service@entreprise.local', correct: false, feedback: 'Ce format UPN (User Principal Name) est utilisé pour la connexion Windows, pas pour le bind LDAP dans GLPI. Le champ DN attend la notation LDAP complète (CN=...).' },
                      { texte: 'ENTREPRISE\\glpi-service', correct: false, feedback: 'Ce format NetBIOS est utilisé pour l\'authentification Windows classique. Pour la configuration LDAP dans GLPI, le format DN (CN=...,DC=...) est requis.' }
                    ]
                  },
                  {
                    description: 'Après configuration, le test de connexion réussit mais les utilisateurs AD n\'apparaissent pas dans GLPI. Quelle est la cause probable ?',
                    choix: [
                      { texte: 'Le filtre de recherche LDAP est incorrect ou trop restrictif', correct: true, feedback: 'Correct ! GLPI utilise un filtre LDAP pour récupérer les utilisateurs (ex: (objectClass=user)). Si le filtre exclut certains objets ou que le BaseDN ne couvre pas toutes les OU, les utilisateurs ne sont pas importés. Vérifiez le filtre et le BaseDN dans la config LDAP.' },
                      { texte: 'Il faut redémarrer le service GLPI après chaque modification', correct: false, feedback: 'GLPI est une application web sans service à redémarrer. Les modifications de configuration sont prises en compte immédiatement. Le problème vient du filtre LDAP ou du BaseDN.' },
                      { texte: 'Le mot de passe du compte de service a expiré', correct: false, feedback: 'Si le mot de passe était expiré, le test de connexion lui-même échouerait. Puisque la connexion réussit, le problème est dans les paramètres de recherche (BaseDN, filtre).' }
                    ]
                  }
                ]
              }
            },
            {
              id: 'cas-glpi-004',
              titre: 'Diagnostiquer un échec de connexion utilisateur AD',
              difficulte: 'moyen',
              format: 'arbre',
              objectif: 'Identifier pourquoi un utilisateur AD ne peut pas se connecter à GLPI.',
              contexte: 'L\'utilisateur jean.dupont ne peut pas se connecter à GLPI avec ses identifiants AD, alors que d\'autres utilisateurs y accèdent sans problème.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Quel message d\'erreur jean.dupont reçoit-il ?', choix: [{ texte: '"Identifiants incorrects" malgré un mot de passe correct', suite: 'n2' }, { texte: '"Votre compte n\'a pas accès à cette interface"', suite: 'n3' }, { texte: 'La connexion fonctionne mais GLPI affiche un profil vide/restreint', suite: 'n4' }] },
                  n2: { question: 'Le compte jean.dupont existe-t-il dans GLPI (Administration → Utilisateurs) ?', choix: [{ texte: 'Non, il n\'apparaît pas dans GLPI', suite: 'n5' }, { texte: 'Oui, il existe dans GLPI', suite: 'n6' }] },
                  n3: { solution: true, correct: true, texte: 'L\'utilisateur n\'a pas de profil GLPI associé', explication: 'GLPI sépare l\'authentification (via AD) et les habilitations (profils GLPI). Même si jean.dupont peut s\'authentifier, il doit avoir un profil GLPI (Self-Service, Technicien, etc.) assigné dans Administration → Utilisateurs.' },
                  n4: { solution: true, correct: true, texte: 'Le profil par défaut est trop restrictif', explication: 'Le profil "Self-Service" est souvent attribué par défaut. Si jean.dupont a besoin d\'accès technicien, modifiez son profil dans GLPI : Administration → Utilisateurs → jean.dupont → Habilitations.' },
                  n5: { solution: true, correct: true, texte: 'Importer l\'utilisateur depuis l\'annuaire LDAP', explication: 'L\'utilisateur n\'a pas encore été importé dans GLPI. Deux options : importer manuellement (Administration → Utilisateurs → Lier des annuaires LDAP) ou activer l\'import automatique à la première connexion dans la config LDAP.' },
                  n6: { solution: true, correct: true, texte: 'Vérifier la source d\'authentification du compte GLPI', explication: 'Si jean.dupont existe en GLPI avec "Source : GLPI" (compte local), il ne sera pas authentifié par AD. Modifiez la source d\'authentification en "LDAP" dans la fiche de l\'utilisateur.' }
                }
              }
            }
          ]
        },
        {
          id: 'glpi-m03',
          titre: 'Gestion de parc & Inventaire',
          cas: [
            {
              id: 'cas-glpi-005',
              titre: 'Ajouter et configurer un ordinateur dans le parc',
              difficulte: 'facile',
              format: 'scenario',
              objectif: 'Créer une fiche d\'ordinateur dans GLPI avec toutes les informations pertinentes.',
              contexte: 'Un nouveau poste de travail vient d\'être livré. Vous devez l\'enregistrer dans GLPI avec ses caractéristiques matérielles et son affectation.',
              contenu: {
                etapes: [
                  {
                    description: 'Dans GLPI, où créer la fiche d\'un nouvel ordinateur ?',
                    choix: [
                      { texte: 'Parc → Ordinateurs → Ajouter', correct: true, feedback: 'Correct ! Le menu Parc regroupe tous les types d\'éléments d\'inventaire : Ordinateurs, Moniteurs, Logiciels, Matériels réseau, Imprimantes, etc.' },
                      { texte: 'Assistance → Tickets → Créer un ticket', correct: false, feedback: 'Non. Les tickets concernent les demandes d\'assistance. L\'inventaire matériel se gère dans le menu Parc.' },
                      { texte: 'Administration → Utilisateurs → Ajouter', correct: false, feedback: 'Non. Ce menu gère les comptes utilisateurs GLPI. Pour les équipements physiques, utilisez le menu Parc.' }
                    ]
                  },
                  {
                    description: 'Quelles informations sont essentielles à renseigner lors de la création d\'une fiche ordinateur ?',
                    choix: [
                      { texte: 'Nom, lieu, utilisateur affecté, groupe, statut et date d\'achat', correct: true, feedback: 'Correct ! Ces champs permettent de localiser l\'équipement (lieu), de l\'attribuer (utilisateur/groupe), de suivre son cycle de vie (statut : en stock, en production, en réparation) et sa durée d\'amortissement (date d\'achat).' },
                      { texte: 'Uniquement le nom et le numéro de série', correct: false, feedback: 'Le minimum vital mais insuffisant pour une gestion de parc efficace. Sans lieu ni affectation, retrouver un équipement devient difficile. Renseignez au minimum : nom, lieu, utilisateur, statut.' },
                      { texte: 'Le mot de passe administrateur local du poste', correct: false, feedback: 'Ne jamais stocker des mots de passe en clair dans GLPI. GLPI gère l\'inventaire et les tickets, pas les secrets. Utilisez un gestionnaire de mots de passe sécurisé pour cela.' }
                    ]
                  },
                  {
                    description: 'Comment lier un logiciel (ex: Microsoft Office) à cet ordinateur dans GLPI ?',
                    choix: [
                      { texte: 'Onglet "Logiciels" dans la fiche de l\'ordinateur → Ajouter un logiciel', correct: true, feedback: 'Correct ! Chaque fiche d\'équipement a un onglet "Logiciels" qui liste les logiciels installés. On peut y ajouter manuellement la version installée ou lier une licence.' },
                      { texte: 'Créer un ticket d\'installation de logiciel', correct: false, feedback: 'Un ticket peut être créé pour la demande d\'installation, mais l\'inventaire logiciel se fait dans la fiche de l\'équipement, onglet Logiciels. Ces deux aspects sont complémentaires.' },
                      { texte: 'Aller dans Parc → Logiciels et ajouter l\'ordinateur à la liste des licences', correct: false, feedback: 'C\'est une approche inverse mais fonctionnelle. La méthode la plus directe : depuis la fiche ordinateur, onglet Logiciels. On peut aussi gérer via Parc → Logiciels pour une vue globale des licences.' }
                    ]
                  }
                ]
              }
            },
            {
              id: 'cas-glpi-006',
              titre: 'Diagnostiquer un équipement absent de l\'inventaire',
              difficulte: 'moyen',
              format: 'arbre',
              objectif: 'Identifier pourquoi un équipement n\'apparaît pas dans l\'inventaire GLPI.',
              contexte: 'Un technicien signale qu\'un nouveau serveur installé la semaine dernière n\'apparaît pas dans GLPI malgré l\'agent FusionInventory installé.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'L\'agent FusionInventory sur le serveur est-il en cours d\'exécution ?', choix: [{ texte: 'Non, le service est arrêté', suite: 'n2' }, { texte: 'Oui, le service tourne', suite: 'n3' }] },
                  n2: { solution: true, correct: true, texte: 'Démarrer l\'agent et l\'activer au boot', explication: 'Sur Linux : systemctl start fusioninventory-agent && systemctl enable fusioninventory-agent. Sur Windows : démarrez le service "FusionInventory Agent" dans les services Windows. Forcez ensuite un inventaire immédiat.' },
                  n3: { question: 'L\'agent peut-il joindre le serveur GLPI ? (logs de l\'agent)', choix: [{ texte: 'Non, erreur de connexion dans les logs', suite: 'n4' }, { texte: 'Oui, l\'agent contacte GLPI mais l\'équipement n\'apparaît pas', suite: 'n5' }] },
                  n4: { question: 'Quelle est l\'erreur de connexion ?', choix: [{ texte: 'Cannot connect to http://glpi/plugins/fusioninventory/', suite: 'n6' }, { texte: '401 Unauthorized ou token invalide', suite: 'n7' }] },
                  n5: { solution: true, correct: true, texte: 'Vérifier les règles d\'import dans le plugin FusionInventory', explication: 'L\'inventaire est bien envoyé mais ignoré. Vérifiez dans GLPI : Plugins → FusionInventory → Règles → Règles d\'import des équipements. Une règle peut rediriger ou refuser l\'import selon des critères.' },
                  n6: { solution: true, correct: true, texte: 'URL du serveur GLPI incorrecte dans la config de l\'agent', explication: 'Vérifiez le fichier de config de l\'agent (/etc/fusioninventory/agent.cfg sur Linux). L\'URL doit pointer exactement vers : http://<ip-glpi>/plugins/fusioninventory/. Corrigez puis redémarrez l\'agent.' },
                  n7: { solution: true, correct: true, texte: 'Token d\'authentification expiré ou invalide', explication: 'Dans GLPI : Plugins → FusionInventory → Configuration générale, régénérez le token de l\'agent. Mettez à jour le token dans le fichier de configuration de l\'agent concerné.' }
                }
              }
            }
          ]
        },
        {
          id: 'glpi-m04',
          titre: 'Assistance & Traitements Automatisés',
          cas: [
            {
              id: 'cas-glpi-007',
              titre: 'Créer et gérer un ticket d\'assistance',
              difficulte: 'facile',
              format: 'scenario',
              objectif: 'Ouvrir un ticket, l\'assigner correctement et suivre son cycle de vie dans GLPI.',
              contexte: 'Un utilisateur signale que son imprimante ne fonctionne plus. Vous devez créer et traiter ce ticket dans GLPI.',
              contenu: {
                etapes: [
                  {
                    description: 'Lors de la création du ticket, quel type choisir pour "mon imprimante ne fonctionne plus" ?',
                    choix: [
                      { texte: 'Incident', correct: true, feedback: 'Correct ! Un incident est une interruption non planifiée d\'un service (ITIL). L\'imprimante qui tombe en panne = incident. Une demande de nouvelle imprimante = demande de service.' },
                      { texte: 'Demande', correct: false, feedback: 'Une demande est une sollicitation formelle pour un nouveau service ou changement (ex: installer un nouveau logiciel, créer un compte). Une panne = incident.' },
                      { texte: 'Problème', correct: false, feedback: 'Un problème (ITIL) est la cause racine d\'un ou plusieurs incidents récurrents. Pour une panne isolée, créez un incident. Si cette panne se répète souvent, ouvrez alors un problème.' }
                    ]
                  },
                  {
                    description: 'Le ticket est créé. À qui l\'assigner en priorité ?',
                    choix: [
                      { texte: 'Au groupe technique responsable des imprimantes', correct: true, feedback: 'Bonne pratique ! Assigner à un groupe garantit que le ticket sera pris en charge même si un technicien est absent. GLPI permet l\'assignation à un groupe et/ou à un technicien individuel.' },
                      { texte: 'À aucun technicien — laisser quelqu\'un le prendre spontanément', correct: false, feedback: 'Risqué : un ticket non assigné peut rester en attente indéfiniment. Les règles de gestion recommandent d\'assigner au bon groupe dès la création ou via des règles automatiques.' },
                      { texte: 'Au directeur informatique pour validation', correct: false, feedback: 'Le directeur IT n\'a pas vocation à traiter les tickets techniques de niveau 1. Assignez au groupe technique compétent. La hiérarchie intervient uniquement pour les escalades.' }
                    ]
                  },
                  {
                    description: 'Le technicien a résolu le problème (papier coincé). Comment clôturer correctement le ticket ?',
                    choix: [
                      { texte: 'Ajouter un suivi décrivant la solution, valider avec l\'utilisateur, puis passer le statut à "Résolu" ou "Clos"', correct: true, feedback: 'Parfait ! La bonne pratique ITIL : documenter la solution (suivi), confirmer avec l\'utilisateur que le problème est résolu, puis clôturer. Cela alimente la base de connaissances et les statistiques.' },
                      { texte: 'Supprimer le ticket — il n\'est plus nécessaire', correct: false, feedback: 'Ne jamais supprimer des tickets. Ils constituent l\'historique d\'assistance. Passez le statut à "Clos" et documentez la solution dans les suivis.' },
                      { texte: 'Passer directement à "Clos" sans commentaire', correct: false, feedback: 'Possible techniquement mais mauvaise pratique. Sans documentation de la solution, l\'historique est incomplet. Si la panne se réproduit, le prochain technicien n\'aura pas d\'informations utiles.' }
                    ]
                  }
                ]
              }
            },
            {
              id: 'cas-glpi-008',
              titre: 'Les tickets ne sont pas assignés automatiquement',
              difficulte: 'difficile',
              format: 'arbre',
              objectif: 'Diagnostiquer pourquoi les règles d\'assignation automatique de GLPI ne fonctionnent pas.',
              contexte: 'Des tickets créés par email pour la catégorie "Réseau" devraient être automatiquement assignés au groupe "Support Réseau" mais restent sans assignation.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Les règles de gestion des tickets sont-elles activées dans GLPI ?', choix: [{ texte: 'Je ne sais pas où vérifier', suite: 'n2' }, { texte: 'Oui, elles sont activées (Configuration → Règles)', suite: 'n3' }] },
                  n2: { solution: true, correct: false, texte: 'Accéder aux règles : Configuration → Règles → Règles des tickets', explication: 'Les règles d\'assignation se trouvent dans Configuration → Règles → Règles des tickets. Vérifiez qu\'il existe bien une règle pour la catégorie "Réseau" et qu\'elle est activée (statut "Actif").' },
                  n3: { question: 'La règle pour la catégorie "Réseau" est-elle en tête de liste ?', choix: [{ texte: 'Non, elle est en bas de la liste des règles', suite: 'n4' }, { texte: 'Oui, elle est en haut mais ne s\'applique toujours pas', suite: 'n5' }] },
                  n4: { solution: true, correct: true, texte: 'Réorganiser les règles — l\'ordre est prioritaire', explication: 'Dans GLPI, les règles sont évaluées dans l\'ordre de la liste. Si une règle plus haute matche en premier et stop l\'évaluation, les règles suivantes ne sont jamais évaluées. Montez la règle "Réseau" en haut de la liste.' },
                  n5: { question: 'Les critères de la règle correspondent-ils exactement aux tickets entrants ?', choix: [{ texte: 'Le critère est "Catégorie = Réseau" mais les tickets ont "Catégorie = réseau" (minuscule)', suite: 'n6' }, { texte: 'Les critères semblent corrects mais ça ne matche pas', suite: 'n7' }] },
                  n6: { solution: true, correct: true, texte: 'Casse exacte requise dans les critères GLPI', explication: 'GLPI effectue des comparaisons sensibles à la casse dans certaines versions. Vérifiez l\'orthographe exacte de la catégorie dans la règle et dans les tickets entrants. Unifiez la nomenclature.' },
                  n7: { solution: true, correct: true, texte: 'Activer le mode debug des règles pour voir pourquoi elles ne matchent pas', explication: 'Dans Configuration → Règles, activez le mode "Debug" (si disponible) ou consultez les logs GLPI. Créez un ticket test et observez quelle règle est évaluée. Ajustez les critères en conséquence.' }
                }
              }
            }
          ]
        },
        {
          id: 'glpi-m05',
          titre: 'Bases de MySQL et MariaDB',
          cas: [
            {
              id: 'cas-glpi-009',
              titre: 'Interroger la base de données GLPI avec SQL',
              difficulte: 'moyen',
              format: 'terminal',
              objectif: 'Effectuer des requêtes SQL de base sur la base de données GLPI.',
              contexte: 'Vous devez extraire des informations de la base GLPI directement en SQL : lister les tickets ouverts et les ordinateurs d\'un site.',
              contenu: {
                prompt: 'root@srv:~#',
                commandes: {
                  'mysql -u glpi -p glpi': 'Enter password:\nWelcome to the MariaDB monitor.\nMariaDB [glpi]>',
                  'SHOW TABLES;': '+-------------------------------+\n| Tables_in_glpi                |\n+-------------------------------+\n| glpi_computers                |\n| glpi_tickets                  |\n| glpi_users                    |\n| glpi_locations                |\n| glpi_softwares                |\n+-------------------------------+\n(et 200+ autres tables)',
                  'SELECT id, name, status FROM glpi_tickets WHERE status = 1 LIMIT 5;': '+----+----------------------------+--------+\n| id | name                       | status |\n+----+----------------------------+--------+\n|  1 | Imprimante en panne        |      1 |\n|  3 | Problème VPN               |      1 |\n|  7 | Écran noir sur poste admin |      1 |\n+----+----------------------------+--------+\n(status 1 = Nouveau, 2 = En cours, 5 = Résolu, 6 = Clos)',
                  'SELECT name, serial, locations_id FROM glpi_computers WHERE is_deleted = 0 LIMIT 5;': '+------------------+----------+--------------+\n| name             | serial   | locations_id |\n+------------------+----------+--------------+\n| PC-COMPTA-01     | SN123456 |            2 |\n| SRV-FILE-01      | SRV78901 |            1 |\n| LAPTOP-DUPONT    | LP456789 |            3 |\n+------------------+----------+--------------+',
                  'SELECT COUNT(*) AS total_tickets FROM glpi_tickets;': '+---------------+\n| total_tickets |\n+---------------+\n|           347 |\n+---------------+',
                  'mysqldump -u root -p glpi > /backup/glpi_backup.sql': 'Enter password:\n(Dump créé dans /backup/glpi_backup.sql)',
                  'EXIT;': 'Bye',
                  'help': 'Commandes : mysql -u glpi -p glpi, SHOW TABLES;, SELECT ... FROM glpi_tickets ..., SELECT ... FROM glpi_computers ..., SELECT COUNT(*) ..., mysqldump ..., EXIT;'
                },
                validation: ['mysql -u glpi -p glpi', 'SELECT id, name, status FROM glpi_tickets WHERE status = 1 LIMIT 5;'],
                indices: [
                  'Connectez-vous d\'abord à MariaDB avec mysql -u glpi -p puis sélectionnez la base avec USE glpi; ou passez-la en argument.',
                  'Les statuts de ticket GLPI : 1=Nouveau, 2=En cours (assigné), 3=En cours (planifié), 4=En attente, 5=Résolu, 6=Clos.'
                ],
                solution: ['mysql -u glpi -p glpi', 'SHOW TABLES;', 'SELECT id, name, status FROM glpi_tickets WHERE status = 1 LIMIT 5;', 'SELECT COUNT(*) AS total_tickets FROM glpi_tickets;', 'EXIT;']
              }
            },
            {
              id: 'cas-glpi-010',
              titre: 'GLPI ne peut plus se connecter à la base de données',
              difficulte: 'difficile',
              format: 'arbre',
              objectif: 'Diagnostiquer et résoudre une erreur de connexion entre GLPI et MariaDB.',
              contexte: 'GLPI affiche "Erreur de connexion à la base de données" au chargement de la page. Le serveur a été redémarré cette nuit.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Le service MariaDB est-il démarré ?', choix: [{ texte: 'Non, systemctl status mariadb → inactive', suite: 'n2' }, { texte: 'Oui, MariaDB tourne', suite: 'n3' }] },
                  n2: { solution: true, correct: true, texte: 'Démarrer MariaDB et l\'activer au boot', explication: 'Après un redémarrage serveur, MariaDB n\'est peut-être pas configuré pour démarrer automatiquement. Lancez : systemctl start mariadb && systemctl enable mariadb. Vérifiez aussi les logs : journalctl -u mariadb -n 20.' },
                  n3: { question: 'Peut-on se connecter manuellement à la base GLPI ?', choix: [{ texte: 'Non : mysql -u glpi -p glpi → Access denied', suite: 'n4' }, { texte: 'Oui, la connexion SQL fonctionne', suite: 'n5' }] },
                  n4: { question: 'Le mot de passe du compte glpi a-t-il changé ?', choix: [{ texte: 'Oui, après une réinitialisation de sécurité', suite: 'n6' }, { texte: 'Non, pas de changement de mot de passe', suite: 'n7' }] },
                  n5: { solution: true, correct: true, texte: 'Vérifier les paramètres de connexion dans config_db.php', explication: 'Si SQL fonctionne manuellement, le problème vient de la config GLPI. Vérifiez : /var/www/html/glpi/config/config_db.php. Les paramètres host, user, password et DBname doivent être corrects.' },
                  n6: { solution: true, correct: true, texte: 'Mettre à jour le mot de passe dans config_db.php', explication: 'Modifiez /var/www/html/glpi/config/config_db.php et mettez à jour le champ password avec le nouveau mot de passe du compte glpi. Redonnez les droits au compte si nécessaire : GRANT ALL ON glpi.* TO \'glpi\'@\'localhost\' IDENTIFIED BY \'nouveau_mdp\';' },
                  n7: { solution: true, correct: true, texte: 'Réinitialiser le mot de passe du compte SQL glpi', explication: 'Connectez-vous en root MySQL : mysql -u root -p. Réinitialisez : ALTER USER \'glpi\'@\'localhost\' IDENTIFIED BY \'nouveau_mdp\'; FLUSH PRIVILEGES; Puis mettez à jour config_db.php.' }
                }
              }
            }
          ]
        },
        {
          id: 'glpi-m06',
          titre: 'Plugins & FusionInventory',
          cas: [
            {
              id: 'cas-glpi-011',
              titre: 'Installer et configurer le plugin FusionInventory',
              difficulte: 'moyen',
              format: 'scenario',
              objectif: 'Déployer le plugin FusionInventory dans GLPI et préparer la collecte d\'inventaire.',
              contexte: 'Vous devez mettre en place l\'inventaire automatique du parc via FusionInventory. Le plugin n\'est pas encore installé.',
              contenu: {
                etapes: [
                  {
                    description: 'Quelle est la première étape pour installer le plugin FusionInventory dans GLPI ?',
                    choix: [
                      { texte: 'Télécharger l\'archive du plugin compatible avec la version GLPI et l\'extraire dans /var/www/html/glpi/plugins/', correct: true, feedback: 'Correct ! Les plugins GLPI s\'installent en copiant leur dossier dans le répertoire plugins/ de GLPI. La compatibilité de version est cruciale — vérifiez le tableau de compatibilité sur le site officiel.' },
                      { texte: 'Utiliser apt install glpi-fusioninventory directement', correct: false, feedback: 'Il n\'existe pas de paquet apt pour les plugins GLPI. L\'installation se fait manuellement en téléchargeant l\'archive depuis le site du plugin ou GitHub, puis en l\'extrayant dans plugins/.' },
                      { texte: 'Modifier le fichier config_db.php pour ajouter le plugin', correct: false, feedback: 'config_db.php ne concerne que la connexion à la base de données. Les plugins s\'installent physiquement dans le répertoire plugins/ puis s\'activent depuis l\'interface web GLPI.' }
                    ]
                  },
                  {
                    description: 'Après extraction dans plugins/, quelle est l\'étape suivante dans GLPI ?',
                    choix: [
                      { texte: 'Configuration → Plugins → FusionInventory → Installer puis Activer', correct: true, feedback: 'Exact ! Après avoir copié le dossier, allez dans l\'interface GLPI : Configuration → Plugins. GLPI détecte le plugin. Cliquez sur "Installer" (crée les tables DB) puis "Activer".' },
                      { texte: 'Redémarrer Apache pour que le plugin soit chargé', correct: false, feedback: 'Un redémarrage Apache n\'est pas nécessaire. PHP et GLPI détectent automatiquement les plugins présents dans le dossier plugins/. L\'activation se fait depuis l\'interface web.' },
                      { texte: 'Modifier manuellement la base de données pour ajouter le plugin', correct: false, feedback: 'Inutile et risqué. Le bouton "Installer" dans Configuration → Plugins crée automatiquement toutes les tables nécessaires dans la base de données GLPI.' }
                    ]
                  },
                  {
                    description: 'Comment forcer un inventaire immédiat depuis un poste client Windows où l\'agent est installé ?',
                    choix: [
                      { texte: 'Accéder à http://localhost:62354 dans le navigateur et cliquer sur "Force an inventory"', correct: true, feedback: 'Correct ! L\'agent FusionInventory expose une interface web locale sur le port 62354 (par défaut). On peut déclencher un inventaire immédiat depuis cette interface ou via la ligne de commande.' },
                      { texte: 'Redémarrer le poste client', correct: false, feedback: 'Un redémarrage déclenchera l\'inventaire au prochain cycle planifié, mais ce n\'est pas la méthode recommandée pour un inventaire immédiat. Utilisez l\'interface web de l\'agent (port 62354).' },
                      { texte: 'Désinstaller et réinstaller l\'agent FusionInventory', correct: false, feedback: 'Disproportionné. Pour déclencher un inventaire immédiat, utilisez l\'interface web de l\'agent sur http://localhost:62354 ou la commande : fusioninventory-agent --server=http://<glpi>/plugins/fusioninventory/' }
                    ]
                  }
                ]
              }
            },
            {
              id: 'cas-glpi-012',
              titre: 'Les agents FusionInventory ne remontent pas d\'inventaire',
              difficulte: 'difficile',
              format: 'arbre',
              objectif: 'Diagnostiquer pourquoi des postes clients n\'envoient pas leur inventaire à GLPI.',
              contexte: 'Plusieurs postes Windows ont l\'agent FusionInventory installé mais n\'apparaissent pas dans l\'inventaire GLPI depuis une semaine.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Le service FusionInventory Agent tourne-t-il sur les postes clients ?', choix: [{ texte: 'Non, le service est arrêté dans les services Windows', suite: 'n2' }, { texte: 'Oui, le service est démarré', suite: 'n3' }] },
                  n2: { solution: true, correct: true, texte: 'Démarrer le service et vérifier son type de démarrage', explication: 'Dans les Services Windows (services.msc), démarrez "FusionInventory Agent" et passez le type de démarrage en "Automatique". Vérifiez aussi que le service ne plante pas au démarrage (Observateur d\'événements).' },
                  n3: { question: 'L\'agent peut-il joindre l\'URL du serveur GLPI configurée ?', choix: [{ texte: 'Non, erreur réseau dans les logs de l\'agent', suite: 'n4' }, { texte: 'Oui, mais l\'inventaire n\'arrive pas dans GLPI', suite: 'n5' }] },
                  n4: { question: 'Les postes peuvent-ils joindre le serveur GLPI en HTTP ?', choix: [{ texte: 'Non, le pare-feu bloque le port 80/443 vers GLPI', suite: 'n6' }, { texte: 'Oui, mais l\'URL configurée dans l\'agent est incorrecte', suite: 'n7' }] },
                  n5: { solution: true, correct: true, texte: 'Vérifier les règles d\'import et les doublons dans GLPI', explication: 'L\'inventaire arrive bien (vérifiable dans Plugins → FusionInventory → Gestion des agents) mais est peut-être refusé par une règle. Vérifiez : Configuration → Règles → Règles d\'import des équipements. Aussi : l\'équipement est peut-être créé dans une entité différente de celle attendue.' },
                  n6: { solution: true, correct: true, texte: 'Ouvrir le port HTTP/HTTPS vers le serveur GLPI dans le pare-feu', explication: 'Ajoutez une règle de pare-feu (Windows Defender Firewall ou pare-feu réseau) autorisant le trafic sortant des postes vers l\'IP du serveur GLPI sur le port 80 (HTTP) ou 443 (HTTPS).' },
                  n7: { solution: true, correct: true, texte: 'Corriger l\'URL dans la configuration de l\'agent', explication: 'Dans la config de l\'agent (agent.cfg ou via l\'interface http://localhost:62354 → Configuration), vérifiez que l\'URL pointe exactement vers : http://<ip-glpi>/plugins/fusioninventory/ (avec le slash final).' }
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: 'itil-gestion-parc',
      titre: 'ITIL et gestion de parc',
      emoji: '📋',
      modules: [
        {
          id: 'itil-m01',
          titre: 'La gestion des services',
          cas: [
            {
              id: 'cas-itil-001',
              titre: 'Classifier les éléments de la gestion des services',
              difficulte: 'facile',
              format: 'scenario',
              objectif: 'Distinguer les concepts fondamentaux d\'ITIL : services, valeur, parties prenantes.',
              contexte: 'Vous intégrez une DSI qui met en place ITIL. Votre responsable vous pose des questions pour évaluer votre compréhension.',
              contenu: {
                etapes: [
                  {
                    description: 'Quelle est la définition ITIL d\'un "service" ?',
                    choix: [
                      { texte: 'Un moyen de fournir de la valeur aux clients en facilitant les résultats qu\'ils veulent obtenir', correct: true, feedback: 'Correct ! ITIL définit un service comme un moyen de co-créer de la valeur en facilitant les résultats que les clients veulent obtenir, sans qu\'ils aient à gérer les coûts et risques spécifiques.' },
                      { texte: 'Un logiciel ou une application informatique déployée en production', correct: false, feedback: 'Trop restrictif. Un service ITIL peut être un logiciel, mais aussi la messagerie, l\'accès Internet, le support téléphonique — tout ce qui apporte de la valeur à un utilisateur ou client.' },
                      { texte: 'Un contrat signé entre la DSI et un département métier', correct: false, feedback: 'Un contrat (ou SLA) formalise un service, mais n\'est pas le service lui-même. Le service est la valeur délivrée ; le SLA en définit les niveaux attendus.' }
                    ]
                  },
                  {
                    description: 'Quelle est la différence entre un client et un utilisateur dans ITIL ?',
                    choix: [
                      { texte: 'Le client définit et paie le service ; l\'utilisateur l\'utilise au quotidien', correct: true, feedback: 'Correct ! Exemple : le directeur financier (client) commande et finance le service de messagerie ; les comptables (utilisateurs) l\'utilisent pour travailler. Ils ont des besoins et attentes différents.' },
                      { texte: 'Client et utilisateur sont des synonymes dans ITIL', correct: false, feedback: 'Non. ITIL distingue clairement les deux. Le client s\'engage sur les exigences et le budget ; l\'utilisateur interagit avec le service. Cette distinction est importante pour la gestion des niveaux de service.' },
                      { texte: 'Le client est externe à l\'entreprise, l\'utilisateur est interne', correct: false, feedback: 'Pas nécessairement. Dans une DSI, le client peut être un directeur de département interne. La distinction client/utilisateur est fonctionnelle (qui commande vs qui utilise), pas géographique.' }
                    ]
                  },
                  {
                    description: 'Qu\'est-ce qu\'un SLA (Service Level Agreement) ?',
                    choix: [
                      { texte: 'Un accord documenté entre un fournisseur de services et un client définissant les niveaux de service attendus', correct: true, feedback: 'Exact ! Le SLA définit des objectifs mesurables : disponibilité (99,9%), temps de réponse, plages horaires de support. Il sert de référence pour évaluer la qualité du service délivré.' },
                      { texte: 'Un logiciel de supervision réseau qui alerte en cas de panne', correct: false, feedback: 'Non, SLA n\'est pas un outil logiciel. C\'est un document contractuel. Les outils de supervision (Nagios, Zabbix) peuvent aider à mesurer l\'atteinte des objectifs du SLA, mais ne sont pas le SLA.' },
                      { texte: 'Le schéma d\'architecture de l\'infrastructure informatique', correct: false, feedback: 'Un schéma d\'architecture est un document technique différent. Le SLA est un accord de niveau de service entre le prestataire IT et son client, focalisé sur la qualité et la disponibilité.' }
                    ]
                  }
                ]
              }
            },
            {
              id: 'cas-itil-002',
              titre: 'Identifier le bon processus ITIL selon l\'événement',
              difficulte: 'moyen',
              format: 'arbre',
              objectif: 'Déterminer quel processus ITIL déclencher selon la nature de l\'événement signalé.',
              contexte: 'En tant que technicien support ITIL, vous recevez différentes situations. Vous devez activer le bon processus.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Quelle est la nature de la situation ?', choix: [{ texte: 'Le serveur de messagerie est tombé en panne', suite: 'n2' }, { texte: 'Un utilisateur demande l\'installation d\'un nouveau logiciel', suite: 'n3' }, { texte: 'La messagerie tombe en panne tous les lundis matin sans raison identifiée', suite: 'n4' }] },
                  n2: { question: 'Est-ce la première occurrence ou un problème récurrent ?', choix: [{ texte: 'Première occurrence — panne isolée', suite: 'n5' }, { texte: 'Panne récurrente — c\'est la 4e fois ce mois', suite: 'n6' }] },
                  n3: { solution: true, correct: true, texte: 'Gestion des demandes de service', explication: 'Une demande formelle d\'accès à un service ou à une fonctionnalité = demande de service. Elle suit un workflow prédéfini (approbation, déploiement, fermeture) distinct du processus incident.' },
                  n4: { solution: true, correct: true, texte: 'Gestion des problèmes', explication: 'Une panne récurrente sans cause identifiée = problème (ITIL). L\'objectif est de trouver la cause racine (root cause analysis). Un problème peut générer une erreur connue et un contournement documenté.' },
                  n5: { solution: true, correct: true, texte: 'Gestion des incidents', explication: 'Une interruption non planifiée d\'un service = incident. L\'objectif de la gestion des incidents est de rétablir le service le plus rapidement possible, pas nécessairement de trouver la cause racine.' },
                  n6: { solution: true, correct: true, texte: 'Gestion des incidents ET ouverture d\'un problème', explication: 'Traitez l\'incident immédiat (rétablir le service), puis ouvrez un problème pour investiguer la cause racine des occurrences répétées. Les deux processus sont complémentaires.' }
                }
              }
            }
          ]
        },
        {
          id: 'itil-m02',
          titre: 'Stratégie et Conception des services',
          cas: [
            {
              id: 'cas-itil-003',
              titre: 'Élaborer un catalogue de services',
              difficulte: 'moyen',
              format: 'scenario',
              objectif: 'Comprendre le rôle du catalogue de services et savoir le structurer.',
              contexte: 'La DSI souhaite créer un catalogue de services pour ses utilisateurs. Vous participez à sa construction.',
              contenu: {
                etapes: [
                  {
                    description: 'Quel est le principal objectif d\'un catalogue de services ?',
                    choix: [
                      { texte: 'Lister tous les services IT disponibles avec leurs caractéristiques et modalités d\'accès', correct: true, feedback: 'Correct ! Le catalogue de services est la vitrine de la DSI. Il décrit chaque service disponible, ses conditions d\'accès, les niveaux de service (SLA), le coût éventuel et les contacts.' },
                      { texte: 'Documenter tous les incidents survenus dans l\'année', correct: false, feedback: 'Non, c\'est le rôle d\'un registre d\'incidents ou d\'un rapport d\'activité. Le catalogue de services liste ce que la DSI peut OFFRIR, pas ce qui a dysfonctionné.' },
                      { texte: 'Lister les équipements physiques de l\'entreprise', correct: false, feedback: 'C\'est le rôle de la base CMDB (Configuration Management Database) ou de l\'inventaire de parc. Le catalogue de services liste les services métier fournis par la DSI.' }
                    ]
                  },
                  {
                    description: 'Le catalogue de services comprend généralement deux vues. Laquelle est présentée aux utilisateurs métier ?',
                    choix: [
                      { texte: 'La vue métier (business catalogue) — services en langage non technique', correct: true, feedback: 'Exact ! La vue métier décrit les services en termes compréhensibles : "Accès à la messagerie", "Service d\'impression", "Accès VPN". La vue technique (support catalogue) décrit les composants sous-jacents, réservée à l\'IT.' },
                      { texte: 'La vue technique (support catalogue) — détail des infrastructures', correct: false, feedback: 'La vue technique est réservée à l\'équipe IT. Elle liste les composants techniques qui supportent chaque service (serveurs, applications, configurations). Les utilisateurs n\'ont pas besoin de ces détails.' },
                      { texte: 'Les deux vues sont présentées à tous les utilisateurs', correct: false, feedback: 'Non. Présenter la vue technique à des utilisateurs métier serait contre-productif. ITIL recommande de séparer les deux vues selon les audiences.' }
                    ]
                  },
                  {
                    description: 'Qu\'est-ce qu\'un OLA (Operational Level Agreement) ?',
                    choix: [
                      { texte: 'Un accord interne entre deux équipes IT définissant leurs engagements mutuels pour supporter un SLA', correct: true, feedback: 'Correct ! L\'OLA est interne à l\'IT. Exemple : le SLA garantit 4h de résolution. L\'OLA entre le support N1 et N2 garantit que N2 répond en 1h. Les OLA supportent les SLA.' },
                      { texte: 'Un contrat externe avec un fournisseur tiers (ex: hébergeur)', correct: false, feedback: 'Un contrat avec un fournisseur externe s\'appelle un UC (Underpinning Contract). L\'OLA est strictement interne à l\'organisation IT.' },
                      { texte: 'Un accord entre la DSI et la direction générale sur le budget informatique', correct: false, feedback: 'Cela ressemble davantage à un SLA interne ou un accord de gouvernance. L\'OLA est spécifiquement un accord opérationnel entre équipes techniques au sein de la DSI.' }
                    ]
                  }
                ]
              }
            },
            {
              id: 'cas-itil-004',
              titre: 'Choisir le bon niveau de service à proposer',
              difficulte: 'moyen',
              format: 'arbre',
              objectif: 'Définir des niveaux de service adaptés selon la criticité des services métier.',
              contexte: 'Vous devez proposer des SLA pour différents services de l\'entreprise. Aidez-vous de la criticité métier pour choisir.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Quel est le service à qualifier ?', choix: [{ texte: 'ERP de gestion commerciale utilisé en continu par 200 vendeurs', suite: 'n2' }, { texte: 'Imprimante de la salle de pause du siège', suite: 'n3' }, { texte: 'Serveur de messagerie de toute l\'entreprise', suite: 'n4' }] },
                  n2: { question: 'L\'entreprise peut-elle fonctionner sans l\'ERP ?', choix: [{ texte: 'Non, une panne bloque immédiatement les ventes', suite: 'n5' }, { texte: 'Oui, des processus manuels peuvent prendre le relais quelques heures', suite: 'n6' }] },
                  n3: { solution: true, correct: true, texte: 'SLA Bronze — disponibilité standard, délai 8h ouvrées', explication: 'Une imprimante de salle de pause est non critique. Un SLA standard (disponibilité 95%, résolution sous 8h ouvrées) est approprié. Pas besoin d\'une astreinte 24/7 pour ce type d\'équipement.' },
                  n4: { solution: true, correct: true, texte: 'SLA Or — haute disponibilité 99,9%, astreinte 24/7', explication: 'La messagerie est critique pour toute l\'entreprise. Un SLA élevé s\'impose : disponibilité 99,9%, temps de réponse incident < 1h, résolution < 4h, surveillance 24/7.' },
                  n5: { solution: true, correct: true, texte: 'SLA Platine — 99,99% de disponibilité, RPO/RTO contractualisés', explication: 'Service critique avec impact financier direct : SLA maximal. Définissez RPO (perte de données max tolérée), RTO (durée max de restauration), et mettez en place de la redondance et un PRA.' },
                  n6: { solution: true, correct: true, texte: 'SLA Or — haute disponibilité avec tolérance de quelques heures', explication: 'Service important mais avec un fallback manuel possible : SLA Or (99,9%, résolution < 4h). La tolérance de quelques heures ne justifie pas le coût d\'un SLA Platine mais le service reste prioritaire.' }
                }
              }
            }
          ]
        },
        {
          id: 'itil-m03',
          titre: 'Transition des services',
          cas: [
            {
              id: 'cas-itil-005',
              titre: 'Gérer une demande de changement (RFC)',
              difficulte: 'moyen',
              format: 'scenario',
              objectif: 'Appliquer le processus de gestion des changements ITIL pour une mise en production.',
              contexte: 'Un développeur demande le déploiement d\'une nouvelle version de l\'application RH en production ce vendredi soir.',
              contenu: {
                etapes: [
                  {
                    description: 'Quelle est la première étape formelle pour ce déploiement ?',
                    choix: [
                      { texte: 'Soumettre une RFC (Request For Change) décrivant le changement, les risques et le plan de retour arrière', correct: true, feedback: 'Correct ! Toute modification en production doit passer par une RFC. Elle documente : quoi, pourquoi, qui, quand, les risques, le plan de test et le plan de retour arrière (rollback). Sans RFC approuvée, pas de changement.' },
                      { texte: 'Déployer directement vendredi soir pour minimiser l\'impact sur les utilisateurs', correct: false, feedback: 'Non, même en dehors des heures ouvrées. Un déploiement sans RFC et sans validation est une violation du processus de gestion des changements. En cas d\'incident, la traçabilité sera impossible.' },
                      { texte: 'Envoyer un email à tous les utilisateurs pour les prévenir de la maintenance', correct: false, feedback: 'La communication aux utilisateurs est une étape mais pas la première. Il faut d\'abord formaliser et faire approuver le changement via une RFC avant d\'organiser la communication.' }
                    ]
                  },
                  {
                    description: 'La RFC est soumise au CAB (Change Advisory Board). Quel est son rôle ?',
                    choix: [
                      { texte: 'Évaluer le risque du changement et autoriser ou refuser son déploiement', correct: true, feedback: 'Correct ! Le CAB est un comité qui réunit les parties prenantes (IT, métier, sécurité) pour évaluer l\'impact et les risques des changements. Seuls les changements approuvés par le CAB peuvent être déployés.' },
                      { texte: 'Effectuer techniquement le déploiement en production', correct: false, feedback: 'Non. Le CAB est un comité de gouvernance, pas une équipe technique. Il évalue et autorise ; ce sont les équipes techniques qui déploient ensuite, conformément à la RFC approuvée.' },
                      { texte: 'Rédiger le plan de test de la nouvelle application', correct: false, feedback: 'Le plan de test doit être inclus dans la RFC soumise au CAB, pas rédigé par le CAB. Le demandeur (ou l\'équipe projet) est responsable de préparer les éléments de la RFC.' }
                    ]
                  },
                  {
                    description: 'Après déploiement, un bug critique est découvert. Le plan de retour arrière doit être activé. Que faire en premier ?',
                    choix: [
                      { texte: 'Ouvrir un incident, informer les parties prenantes et activer le rollback selon le plan documenté dans la RFC', correct: true, feedback: 'Parfait ! L\'ordre : 1) Ouvrir un incident pour tracer, 2) Informer rapidement (responsables, utilisateurs), 3) Exécuter le rollback tel que documenté dans la RFC. Le plan de rollback a été validé justement pour ce scénario.' },
                      { texte: 'Appeler le développeur pour corriger le bug en urgence en production', correct: false, feedback: 'Trop risqué : corriger un bug directement en production peut aggraver la situation. Si un plan de rollback existe, activez-le. Une correction à chaud sans tests peut créer de nouveaux problèmes.' },
                      { texte: 'Attendre le lendemain matin pour analyser le bug avec toute l\'équipe', correct: false, feedback: 'Inacceptable si le bug est critique et impacte les utilisateurs. Le rollback doit être activé rapidement pour rétablir le service. L\'analyse de la cause racine peut attendre, pas le rétablissement du service.' }
                    ]
                  }
                ]
              }
            },
            {
              id: 'cas-itil-006',
              titre: 'Classifier le type de changement',
              difficulte: 'moyen',
              format: 'arbre',
              objectif: 'Déterminer si un changement est standard, normal ou urgent selon ITIL.',
              contexte: 'Vous recevez plusieurs demandes de changements. Vous devez les classifier pour appliquer le bon workflow.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Quel est le changement à classifier ?', choix: [{ texte: 'Créer un nouveau compte utilisateur AD (procédure identique faite 50 fois)', suite: 'n2' }, { texte: 'Migrer le serveur de fichiers vers une nouvelle infrastructure', suite: 'n3' }, { texte: 'Appliquer un patch de sécurité critique en urgence (CVE 10/10)', suite: 'n4' }] },
                  n2: { solution: true, correct: true, texte: 'Changement standard', explication: 'Un changement standard est pré-approuvé, à faible risque et suit une procédure documentée répétée. Pas besoin de passer par le CAB. Exemple : création de compte, installation de logiciel standard, ajout de RAM.' },
                  n3: { question: 'L\'impact potentiel est-il important ?', choix: [{ texte: 'Oui, des centaines d\'utilisateurs seraient affectés en cas d\'échec', suite: 'n5' }, { texte: 'Non, seulement 5 utilisateurs utilisent ce serveur', suite: 'n6' }] },
                  n4: { solution: true, correct: true, texte: 'Changement urgent — ECAB (Emergency CAB)', explication: 'Un patch de sécurité critique nécessite un traitement d\'urgence. Un ECAB (Emergency CAB) réduit est convoqué rapidement pour approuver le changement. La RFC est remplie mais le processus est accéléré.' },
                  n5: { solution: true, correct: true, texte: 'Changement normal à risque élevé — CAB complet requis', explication: 'Impact large = changement normal avec évaluation complète par le CAB. Planification détaillée, tests en pré-production, plan de rollback, communication aux utilisateurs et fenêtre de maintenance définie.' },
                  n6: { solution: true, correct: true, texte: 'Changement normal à faible risque — validation simplifiée', explication: 'Impact limité (5 users) = changement normal mais à faible risque. La RFC peut être approuvée par le Change Manager seul sans CAB complet. Plan de rollback requis mais processus allégé.' }
                }
              }
            }
          ]
        },
        {
          id: 'itil-m04',
          titre: 'Exploitation des services',
          cas: [
            {
              id: 'cas-itil-007',
              titre: 'Gérer l\'escalade d\'un incident',
              difficulte: 'moyen',
              format: 'scenario',
              objectif: 'Appliquer le processus d\'escalade fonctionnelle et hiérarchique lors d\'un incident.',
              contexte: 'Un incident impactant l\'accès à l\'ERP est signalé à 9h. Le SLA impose une résolution en 4h. Le technicien N1 ne trouve pas la solution.',
              contenu: {
                etapes: [
                  {
                    description: 'À 9h30, le technicien N1 n\'a pas résolu l\'incident. Que doit-il faire ?',
                    choix: [
                      { texte: 'Escalader en N2 : transférer le ticket avec toutes les informations collectées', correct: true, feedback: 'Correct ! L\'escalade fonctionnelle (N1 → N2) se fait quand les compétences ou les accès du niveau actuel sont insuffisants. Le ticket doit contenir : symptômes, actions déjà réalisées, impact mesuré.' },
                      { texte: 'Continuer seul jusqu\'à la résolution pour ne pas paraître incompétent', correct: false, feedback: 'C\'est une mauvaise pratique qui met en danger le SLA. L\'escalade est un processus normal, pas un aveu d\'échec. Un incident non escaladé à temps peut dépasser les délais contractuels.' },
                      { texte: 'Informer l\'utilisateur que le problème sera résolu demain', correct: false, feedback: 'Inacceptable sans valider que le SLA le permet. Promettre une résolution différée sans avoir escaladé et informé le management est une faute de processus.' }
                    ]
                  },
                  {
                    description: 'À 12h, l\'incident n\'est toujours pas résolu et l\'impact s\'étend à 500 utilisateurs. Quelle escalade déclencher ?',
                    choix: [
                      { texte: 'Escalade hiérarchique — informer le management et activer la cellule de crise', correct: true, feedback: 'Correct ! L\'escalade hiérarchique informe le management quand un incident devient majeur (impact étendu, SLA en danger). Le Responsable du support et éventuellement la direction IT doivent être informés pour décider des ressources à mobiliser.' },
                      { texte: 'Continuer l\'escalade fonctionnelle vers un expert N3', correct: false, feedback: 'L\'escalade technique est bien sûr nécessaire, mais insuffisante seule. L\'escalade hiérarchique doit être déclenchée en parallèle car l\'impact est majeur et le SLA est compromis.' },
                      { texte: 'Fermer le ticket et en ouvrir un nouveau pour repartir de zéro', correct: false, feedback: 'Mauvaise idée ! Fermer et rouvrir un ticket fait perdre l\'historique et réinitialise les compteurs SLA. Continuez sur le même ticket et escaladez.' }
                    ]
                  },
                  {
                    description: 'L\'incident est résolu à 14h. Quelle est la dernière étape obligatoire selon ITIL ?',
                    choix: [
                      { texte: 'Confirmer la résolution avec l\'utilisateur, documenter la solution et clôturer le ticket', correct: true, feedback: 'Parfait ! Selon ITIL, un incident n\'est clos qu\'après confirmation de l\'utilisateur. La documentation de la solution alimente la base de connaissances pour les futurs incidents similaires.' },
                      { texte: 'Supprimer le ticket — l\'incident est terminé', correct: false, feedback: 'Jamais ! Les tickets doivent être conservés pour les statistiques, le respect du SLA, l\'analyse des tendances et la base de connaissances. La suppression d\'un ticket est une mauvaise pratique.' },
                      { texte: 'Envoyer un rapport d\'incident au directeur général', correct: false, feedback: 'Un rapport de direction est parfois demandé pour les incidents majeurs, mais la clôture du ticket via confirmation utilisateur est l\'étape standard obligatoire pour tout incident, quelle que soit sa criticité.' }
                    ]
                  }
                ]
              }
            },
            {
              id: 'cas-itil-008',
              titre: 'Distinguer incident, problème et erreur connue',
              difficulte: 'moyen',
              format: 'arbre',
              objectif: 'Classifier correctement les situations selon les concepts ITIL d\'incident, problème et erreur connue.',
              contexte: 'Vous analysez les événements de la semaine pour les enregistrer correctement dans l\'outil ITSM.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Quelle est la situation à classifier ?', choix: [{ texte: 'Un serveur est tombé en panne — les utilisateurs ne peuvent pas travailler', suite: 'n2' }, { texte: 'Ce même serveur tombe régulièrement en panne tous les 15 jours depuis 2 mois', suite: 'n3' }, { texte: 'La cause de ces pannes répétées est identifiée mais la correction sera faite dans 6 semaines', suite: 'n4' }] },
                  n2: { solution: true, correct: true, texte: 'Incident', explication: 'Un incident = interruption non planifiée d\'un service. Objectif : rétablir le service rapidement (workaround acceptable). Ne pas confondre avec le problème (recherche de cause racine).' },
                  n3: { question: 'La cause racine est-elle connue ?', choix: [{ texte: 'Non, les techniciens ne comprennent pas pourquoi ça se produit', suite: 'n5' }, { texte: 'Oui, on sait que c\'est une fuite mémoire dans l\'application', suite: 'n6' }] },
                  n4: { solution: true, correct: true, texte: 'Erreur connue (Known Error)', explication: 'Quand la cause racine est identifiée mais que la solution définitive n\'est pas encore implémentée, on parle d\'erreur connue. Elle est enregistrée dans la KEDB (Known Error Database) avec le contournement disponible.' },
                  n5: { solution: true, correct: true, texte: 'Problème (avec cause inconnue)', explication: 'Des pannes récurrentes sans cause connue = problème. Ouvrez un enregistrement de problème et lancez une analyse de cause racine (RCA). Techniques : 5 Pourquoi, diagramme Ishikawa.' },
                  n6: { solution: true, correct: true, texte: 'Problème avec cause racine identifiée — proche de l\'erreur connue', explication: 'Connaître la cause (fuite mémoire) sans avoir la correction définitive correspond à une erreur connue. Documentez le contournement (redémarrer le service toutes les nuits avec cron) en attendant le correctif.' }
                }
              }
            }
          ]
        },
        {
          id: 'itil-m05',
          titre: 'Amélioration continue des services',
          cas: [
            {
              id: 'cas-itil-009',
              titre: 'Mettre en place un plan d\'amélioration continue',
              difficulte: 'moyen',
              format: 'scenario',
              objectif: 'Appliquer le cycle CSI (Continual Service Improvement) d\'ITIL pour améliorer un service.',
              contexte: 'Les utilisateurs se plaignent de lenteur sur l\'application de gestion RH. Vous devez structurer l\'amélioration selon ITIL CSI.',
              contenu: {
                etapes: [
                  {
                    description: 'Première étape du CSI : quelle question poser en premier ?',
                    choix: [
                      { texte: '"Quelle est la vision et les objectifs métier ?" — comprendre ce qui est attendu', correct: true, feedback: 'Correct ! Le modèle CSI en 7 étapes commence par : Quelle est la vision ? Sans comprendre les objectifs métier, toute amélioration technique risque de manquer sa cible. Ex : "les RH veulent traiter les paies en moins de 2h".' },
                      { texte: '"Quel serveur acheter pour améliorer les performances ?"', correct: false, feedback: 'Aller directement à la solution technique est une erreur classique. On risque d\'améliorer le mauvais aspect. Commencez par comprendre l\'objectif métier, puis mesurez la situation actuelle avant de proposer des solutions.' },
                      { texte: '"Qui est responsable de cette mauvaise performance ?"', correct: false, feedback: 'Chercher un coupable n\'est pas l\'approche ITIL. Le CSI est constructif : mesurer, comprendre, améliorer. La recherche de responsabilité individuelle nuit à la culture d\'amélioration continue.' }
                    ]
                  },
                  {
                    description: 'Pour mesurer l\'amélioration, quels indicateurs (KPIs) choisir pour ce service RH ?',
                    choix: [
                      { texte: 'Temps de réponse moyen de l\'application, taux de disponibilité, nombre de tickets d\'incident liés', correct: true, feedback: 'Correct ! Des KPIs pertinents et mesurables. Le temps de réponse mesure la performance perçue ; la disponibilité mesure la fiabilité ; les tickets mesurent l\'insatisfaction. Ces 3 axes couvrent la qualité du service.' },
                      { texte: 'Le nombre d\'employés dans l\'équipe IT', correct: false, feedback: 'Le nombre de personnes dans l\'équipe n\'est pas un KPI de qualité de service. Un bon KPI mesure le service rendu à l\'utilisateur, pas les ressources internes de l\'IT.' },
                      { texte: 'Le coût mensuel du serveur hébergeant l\'application', correct: false, feedback: 'Le coût est un indicateur financier, pas un KPI de performance de service. Il peut être utilisé dans une analyse coût/bénéfice, mais ne mesure pas la qualité ressentie par les utilisateurs.' }
                    ]
                  },
                  {
                    description: 'Après amélioration, les KPIs montrent que le temps de réponse est passé de 8s à 2s. Que faire ensuite selon le CSI ?',
                    choix: [
                      { texte: 'Documenter les résultats, partager les succès et définir le nouveau niveau de référence (baseline)', correct: true, feedback: 'Exactement ! Le cycle CSI est continu. Après amélioration : documenter, communiquer les succès, mettre à jour la baseline. Cette nouvelle performance devient la référence pour le prochain cycle d\'amélioration.' },
                      { texte: 'Clôturer le projet et ne plus surveiller — l\'objectif est atteint', correct: false, feedback: 'CSI = Amélioration CONTINUE. L\'objectif n\'est pas ponctuel mais permanent. Après une amélioration, on fixe une nouvelle baseline et on continue à surveiller pour maintenir et encore améliorer.' },
                      { texte: 'Remplacer toute l\'infrastructure pour viser 0,5s de temps de réponse', correct: false, feedback: 'Disproportionné sans analyse préalable. Si 2s satisfait l\'objectif métier fixé, un investissement supplémentaire n\'est peut-être pas justifié. L\'amélioration doit être alignée sur la valeur métier, pas sur la performance maximale théorique.' }
                    ]
                  }
                ]
              }
            },
            {
              id: 'cas-itil-010',
              titre: 'Identifier une opportunité d\'amélioration',
              difficulte: 'facile',
              format: 'arbre',
              objectif: 'Repérer des signaux d\'amélioration dans les données de support et les retours utilisateurs.',
              contexte: 'En analysant les statistiques de support du mois, vous cherchez des opportunités d\'amélioration à prioriser.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Que révèlent les statistiques de support ?', choix: [{ texte: '35% des tickets concernent la réinitialisation de mots de passe', suite: 'n2' }, { texte: 'Le temps moyen de résolution est passé de 2h à 6h ce mois', suite: 'n3' }, { texte: 'La satisfaction utilisateur (CSAT) est tombée à 2,5/5', suite: 'n4' }] },
                  n2: { question: 'Comment réduire ce volume de tickets ?', choix: [{ texte: 'Mettre en place un portail de self-service pour réinitialisation automatique', suite: 'n5' }, { texte: 'Former davantage les techniciens à réinitialiser les mots de passe plus vite', suite: 'n6' }] },
                  n3: { solution: true, correct: true, texte: 'Analyser les tickets du mois pour identifier la cause de la dégradation', explication: 'Dégradation du temps de résolution = signal d\'alerte. Causes possibles : surcharge de l\'équipe, nouvelle application complexe, départ d\'un expert. Croisez avec le volume de tickets et les catégories pour identifier la cause.' },
                  n4: { solution: true, correct: true, texte: 'Enquêter auprès des utilisateurs insatisfaits pour comprendre leurs attentes', explication: 'Un CSAT bas est un signal fort. Analysez les commentaires négatifs, identifiez les services/incidents les plus mal notés, et organisez des entretiens courts avec des utilisateurs pour comprendre leurs frustrations.' },
                  n5: { solution: true, correct: true, texte: 'Self-service : automatisation à haute valeur ajoutée', explication: 'Un portail de self-service pour reset de mot de passe (ex: via SSPR Azure AD) peut éliminer 90% de ces tickets. ROI immédiat : les techniciens se concentrent sur des incidents à plus haute valeur ajoutée.' },
                  n6: { solution: true, correct: false, texte: 'Former plus vite n\'élimine pas le volume — chercher une solution systémique', explication: 'Former les techniciens à être plus rapides traite le symptôme mais pas la cause. Si 35% des tickets sont des resets de MDP, la bonne amélioration est d\'éliminer le besoin : self-service, SSO, politique de complexité adaptée.' }
                }
              }
            }
          ]
        },
        {
          id: 'itil-m06',
          titre: 'Savoir, Savoir-faire, Savoir-être',
          cas: [
            {
              id: 'cas-itil-011',
              titre: 'Adapter sa communication selon l\'interlocuteur',
              difficulte: 'facile',
              format: 'scenario',
              objectif: 'Identifier le bon niveau de communication technique selon l\'interlocuteur.',
              contexte: 'Vous devez expliquer une panne réseau à différentes personnes. Adaptez votre discours selon l\'audience.',
              contenu: {
                etapes: [
                  {
                    description: 'Un utilisateur non-technique appelle pour signaler qu\'il ne peut pas accéder à son application. Comment lui répondez-vous ?',
                    choix: [
                      { texte: '"Votre PC ne trouve pas le serveur DNS, probablement un problème de routage BGP entre les VLANs"', correct: false, feedback: 'Trop technique pour un utilisateur non-technique. Ces termes (DNS, BGP, VLAN) sont incompréhensibles pour un non-initié et créent de l\'anxiété sans apporter d\'information utile.' },
                      { texte: '"Nous avons un problème sur le réseau, vos collègues sont également concernés. Nos équipes travaillent à la résolution. Nous vous tenons informé dans 30 minutes."', correct: true, feedback: 'Parfait ! Langage clair, rassurant, sans jargon technique. Les 3 éléments essentiels : 1) confirmation que le problème est connu, 2) que vous y travaillez, 3) une échéance de retour d\'information.' },
                      { texte: '"Je ne sais pas ce qui se passe, appelez le service informatique"', correct: false, feedback: 'Inacceptable en tant que technicien support. Vous êtes le service informatique. Ne jamais renvoyer un utilisateur vers "le service informatique" sans lui avoir fourni une information minimale et créé un ticket.' }
                    ]
                  },
                  {
                    description: 'Lors d\'une réunion avec le DSI pour présenter une panne, quel niveau d\'information privilégier ?',
                    choix: [
                      { texte: 'Impact métier (utilisateurs affectés, durée, coût estimé) et plan d\'action avec délais', correct: true, feedback: 'Correct ! La direction s\'intéresse aux impacts et aux solutions, pas aux détails techniques. Format idéal : X utilisateurs impactés, Y heures d\'indisponibilité, Z$ de perte estimée, plan d\'action en 3 points avec responsable et date.' },
                      { texte: 'Tous les détails techniques : logs, traces, commandes exécutées', correct: false, feedback: 'Les logs et traces techniques n\'intéressent pas la direction. Ce niveau de détail est utile pour les équipes techniques, pas pour un comité de direction. Synthétisez en impacts business.' },
                      { texte: 'Minimiser l\'information pour ne pas alarmer la direction', correct: false, feedback: 'Mauvaise pratique. La transparence est essentielle. La direction doit disposer d\'informations exactes pour prendre de bonnes décisions. Minimiser peut aggraver la situation si des ressources supplémentaires étaient nécessaires.' }
                    ]
                  },
                  {
                    description: 'Un utilisateur se montre agressif au téléphone à cause d\'une panne prolongée. Comment gérez-vous la situation ?',
                    choix: [
                      { texte: 'Laisser l\'utilisateur s\'exprimer, reconnaître sa frustration, puis expliquer calmement les actions en cours', correct: true, feedback: 'Bonne approche ! La technique d\'écoute active : 1) Laisser parler, 2) Reformuler et reconnaître ("Je comprends que cette situation est très gênante"), 3) Recentrer sur les actions concrètes. Ne jamais contre-attaquer.' },
                      { texte: 'Couper court et expliquer que ce n\'est pas de votre faute', correct: false, feedback: 'Se défausser aggrave la situation. L\'utilisateur ne cherche pas un coupable mais une solution. "Ce n\'est pas ma faute" est une réponse défensive qui ne résout rien et détériore la relation.' },
                      { texte: 'Raccrocher et noter que l\'utilisateur est difficile', correct: false, feedback: 'Absolument inacceptable en contexte professionnel. Raccrocher sur un utilisateur est une faute grave. Même si l\'utilisateur est agressif, la règle est de rester professionnel et de trouver une sortie positive.' }
                    ]
                  }
                ]
              }
            },
            {
              id: 'cas-itil-012',
              titre: 'Identifier les compétences requises du technicien ITIL',
              difficulte: 'facile',
              format: 'arbre',
              objectif: 'Distinguer les savoir (connaissances), savoir-faire (compétences techniques) et savoir-être (comportements) attendus.',
              contexte: 'Votre responsable vous demande d\'auto-évaluer vos compétences selon le référentiel ITIL. Classifiez les éléments suivants.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Quelle compétence évaluez-vous ?', choix: [{ texte: 'Connaître les 5 étapes du cycle de vie ITIL', suite: 'n2' }, { texte: 'Savoir utiliser l\'outil GLPI pour traiter un ticket', suite: 'n3' }, { texte: 'Rester calme et professionnel lors d\'un incident critique', suite: 'n4' }] },
                  n2: { solution: true, correct: true, texte: 'SAVOIR — connaissance théorique', explication: 'Le savoir regroupe les connaissances théoriques et conceptuelles : comprendre ITIL, connaître les processus, les définitions, les concepts. Cela s\'acquiert par la formation et l\'étude.' },
                  n3: { solution: true, correct: true, texte: 'SAVOIR-FAIRE — compétence technique pratique', explication: 'Le savoir-faire est la capacité à réaliser une action concrète : utiliser un outil, configurer un équipement, rédiger une RFC. Cela s\'acquiert par la pratique et l\'expérience terrain.' },
                  n4: { solution: true, correct: true, texte: 'SAVOIR-ÊTRE — comportement et attitude professionnelle', explication: 'Le savoir-être regroupe les qualités comportementales : sang-froid, sens du service, empathie, communication, ponctualité. Ces compétences sont souvent déterminantes dans la relation client et l\'efficacité en équipe.' }
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: 'scripting-bash',
      titre: 'Initiation scripting Bash',
      emoji: '🖥️',
      modules: [
        {
          id: 'bash-m01',
          titre: 'Analyse',
          cas: [
            {
              id: 'cas-bash-001',
              titre: 'Analyser un script Bash existant',
              difficulte: 'facile',
              format: 'scenario',
              objectif: 'Lire un script Bash et identifier sa structure, son rôle et ses points d\'amélioration.',
              contexte: 'Vous héritez d\'un script de sauvegarde écrit par un collègue. Vous devez l\'analyser avant de le modifier.',
              contenu: {
                etapes: [
                  {
                    description: 'La première ligne du script est : #!/bin/bash. Quel est son rôle ?',
                    choix: [
                      { texte: 'C\'est le shebang — indique au système quel interpréteur utiliser pour exécuter le script', correct: true, feedback: 'Correct ! Le shebang (#!) suivi du chemin de l\'interpréteur est obligatoire pour que le script soit exécuté directement. Sans shebang, le shell courant est utilisé, ce qui peut donner des résultats imprévisibles selon l\'environnement.' },
                      { texte: 'C\'est un commentaire qui décrit l\'auteur du script', correct: false, feedback: 'Non. Les commentaires commencent par # seul. Le shebang commence par #! (hash-bang) en première ligne uniquement. C\'est une directive interprétée par le noyau, pas un commentaire.' },
                      { texte: 'C\'est la déclaration de la variable PATH pour trouver bash', correct: false, feedback: 'Non. Le shebang #!/bin/bash indique le chemin absolu de l\'interpréteur bash. Le PATH est une variable d\'environnement différente qui liste les répertoires où chercher les commandes.' }
                    ]
                  },
                  {
                    description: 'Le script contient : echo "Sauvegarde du $(date +%Y-%m-%d)". Que produit cette ligne ?',
                    choix: [
                      { texte: 'Affiche "Sauvegarde du 2024-03-02" avec la date du jour', correct: true, feedback: 'Correct ! $(date +%Y-%m-%d) est une substitution de commande : bash exécute date +%Y-%m-%d et remplace $(...) par son résultat. %Y=année, %m=mois, %d=jour.' },
                      { texte: 'Affiche littéralement "Sauvegarde du $(date +%Y-%m-%d)"', correct: false, feedback: 'Non. Les doubles guillemets permettent la substitution de variables et de commandes. Pour afficher littéralement $(...), il faudrait des guillemets simples : echo \'Sauvegarde du $(date +%Y-%m-%d)\'.' },
                      { texte: 'Génère une erreur car date n\'est pas une commande bash', correct: false, feedback: 'Non. date est une commande externe standard disponible sur tous les systèmes Unix/Linux. La syntaxe $(commande) exécute n\'importe quelle commande et capture sa sortie.' }
                    ]
                  },
                  {
                    description: 'Le script n\'est pas exécutable. Quelle commande corriger cette situation ?',
                    choix: [
                      { texte: 'chmod +x backup.sh', correct: true, feedback: 'Correct ! chmod +x ajoute le droit d\'exécution pour tous (user, group, other). Sans ce droit, bash retourne "Permission denied". Après chmod +x, le script peut être lancé avec ./backup.sh.' },
                      { texte: 'chown root backup.sh', correct: false, feedback: 'chown change le propriétaire du fichier, pas ses permissions. Pour rendre un script exécutable, il faut modifier les permissions avec chmod +x.' },
                      { texte: 'mv backup.sh /bin/backup', correct: false, feedback: 'Déplacer le script dans /bin ne lui donne pas de droit d\'exécution. Il faut d\'abord chmod +x backup.sh, le déplacement dans /bin permet ensuite de l\'appeler sans chemin complet.' }
                    ]
                  }
                ]
              }
            },
            {
              id: 'cas-bash-002',
              titre: 'Diagnostiquer pourquoi un script refuse de s\'exécuter',
              difficulte: 'facile',
              format: 'arbre',
              objectif: 'Identifier la cause d\'un refus d\'exécution d\'un script Bash.',
              contexte: 'Vous tentez de lancer un script et obtenez une erreur. Diagnostiquez la cause.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Quel message d\'erreur obtenez-vous ?', choix: [{ texte: 'bash: ./script.sh: Permission denied', suite: 'n2' }, { texte: 'bash: ./script.sh: No such file or directory', suite: 'n3' }, { texte: 'Le script se lance mais affiche "bad interpreter"', suite: 'n4' }] },
                  n2: { question: 'Que montre ls -l script.sh ?', choix: [{ texte: '-rw-r--r-- (pas de bit x)', suite: 'n5' }, { texte: '-rwxr-xr-x (bit x présent)', suite: 'n6' }] },
                  n3: { question: 'Le fichier existe-t-il ? (ls script.sh)', choix: [{ texte: 'Oui, ls le montre', suite: 'n7' }, { texte: 'Non, ls: cannot access', suite: 'n8' }] },
                  n4: { solution: true, correct: true, texte: 'Shebang incorrect ou fin de ligne Windows (\\r\\n)', explication: 'Deux causes : 1) Le shebang pointe vers un interpréteur inexistant (ex: #!/usr/local/bash au lieu de #!/bin/bash). 2) Le fichier a des fins de ligne Windows (\\r\\n) — corrigez avec : dos2unix script.sh.' },
                  n5: { solution: true, correct: true, texte: 'chmod +x script.sh — ajouter le droit d\'exécution', explication: 'Le script n\'est pas exécutable. chmod +x script.sh règle le problème. Vous pouvez aussi contourner avec : bash script.sh (exécute via bash sans nécessiter le bit x).' },
                  n6: { solution: true, correct: true, texte: 'Problème de propriétaire — vous n\'êtes pas le propriétaire', explication: 'Le bit x est présent mais vous n\'avez peut-être pas la permission (ex: -rwx------ et vous n\'êtes pas propriétaire). Vérifiez avec ls -l et id. Demandez au propriétaire ou utilisez sudo.' },
                  n7: { solution: true, correct: true, texte: 'Problème de chemin — utilisez ./script.sh ou le chemin absolu', explication: 'Le fichier existe mais bash ne le trouve pas. Assurez-vous d\'être dans le bon répertoire (pwd) et utilisez ./ pour lancer depuis le répertoire courant : ./script.sh.' },
                  n8: { solution: true, correct: true, texte: 'Le fichier n\'existe pas — vérifiez le nom et le répertoire', explication: 'Vérifiez le nom exact (ls *.sh), le répertoire courant (pwd) et la casse (Linux est sensible à la casse). Peut-être que le fichier s\'appelle Script.sh ou script.SH.' }
                }
              }
            }
          ]
        },
        {
          id: 'bash-m02',
          titre: 'Écriture des scripts',
          cas: [
            {
              id: 'cas-bash-003',
              titre: 'Écrire un script de rapport système',
              difficulte: 'moyen',
              format: 'terminal',
              objectif: 'Créer un script bash structuré qui génère un rapport sur l\'état du système.',
              contexte: 'Vous devez écrire un script qui affiche : la date, le nom d\'hôte, l\'utilisation disque et les 5 processus les plus gourmands en CPU.',
              contenu: {
                prompt: 'admin@srv:~$',
                commandes: {
                  'cat > rapport.sh': '#!/bin/bash\n# Rapport système — auteur: admin\n# Usage: ./rapport.sh\n\necho "=== RAPPORT SYSTÈME ==="\necho "Date    : $(date)"\necho "Hôte    : $(hostname)"\necho ""\necho "--- DISQUE ---"\ndf -h | grep -v tmpfs\necho ""\necho "--- TOP 5 PROCESSUS (CPU) ---"\nps aux --sort=-%cpu | head -6\n[Ctrl+D pour sauvegarder]',
                  'chmod +x rapport.sh': '',
                  './rapport.sh': '=== RAPPORT SYSTÈME ===\nDate    : Sat Mar  2 10:30:00 UTC 2024\nHôte    : srv\n\n--- DISQUE ---\nSys. de fichiers  Taille Utilisé Dispo Uti% Monté sur\n/dev/sda1           50G    12G   36G  25% /\n\n--- TOP 5 PROCESSUS (CPU) ---\nUSER  PID %CPU %MEM COMMAND\nwww-data 1284  8.2  2.1 apache2\nroot      891  2.1  0.8 mysqld\nadmin     456  0.5  0.3 bash',
                  'bash -n rapport.sh': '(aucune erreur de syntaxe)',
                  './rapport.sh > /tmp/rapport_$(date +%Y%m%d).txt': '',
                  'cat /tmp/rapport_20240302.txt': '=== RAPPORT SYSTÈME ===\nDate    : Sat Mar  2 10:30:00 UTC 2024\n...',
                  'help': 'Commandes : cat > rapport.sh, chmod +x rapport.sh, ./rapport.sh, bash -n rapport.sh, ./rapport.sh > /tmp/rapport_$(date +%Y%m%d).txt'
                },
                validation: ['chmod +x rapport.sh', './rapport.sh'],
                indices: [
                  'bash -n script.sh vérifie la syntaxe sans exécuter le script — utile pour détecter les erreurs avant la mise en production.',
                  'La redirection > redirige la sortie standard vers un fichier. Combinez avec $(date) pour créer des rapports datés.'
                ],
                solution: ['cat > rapport.sh', 'chmod +x rapport.sh', 'bash -n rapport.sh', './rapport.sh', './rapport.sh > /tmp/rapport_$(date +%Y%m%d).txt']
              }
            },
            {
              id: 'cas-bash-004',
              titre: 'Appliquer les bonnes pratiques d\'écriture',
              difficulte: 'moyen',
              format: 'scenario',
              objectif: 'Identifier et appliquer les bonnes pratiques pour écrire des scripts Bash robustes.',
              contexte: 'Vous relisez un script de déploiement avant de le mettre en production. Plusieurs pratiques doivent être améliorées.',
              contenu: {
                etapes: [
                  {
                    description: 'Le script commence par #!/bin/sh au lieu de #!/bin/bash. Est-ce un problème ?',
                    choix: [
                      { texte: 'Oui si le script utilise des fonctionnalités spécifiques à bash (tableaux, [[ ]], etc.)', correct: true, feedback: 'Correct ! /bin/sh peut être dash ou un autre shell POSIX, qui ne supporte pas toutes les extensions bash ([[ ]], tableaux, process substitution). Si vous utilisez du bash spécifique, mettez #!/bin/bash.' },
                      { texte: 'Non, sh et bash sont identiques', correct: false, feedback: 'Faux. /bin/sh est souvent dash sur les systèmes Debian/Ubuntu (plus rapide que bash). dash ne supporte pas [[ ]], les tableaux bash, ni ${var,,}. Utilisez #!/bin/bash si vous utilisez ces fonctionnalités.' },
                      { texte: 'Oui, /bin/sh n\'existe pas sur Linux', correct: false, feedback: '/bin/sh existe sur tous les systèmes Unix/Linux — c\'est un lien symbolique vers le shell POSIX du système. Le problème est de compatibilité de syntaxe, pas d\'existence.' }
                    ]
                  },
                  {
                    description: 'Le script ne contient pas "set -e". Pourquoi est-ce important de l\'ajouter en production ?',
                    choix: [
                      { texte: 'set -e arrête le script immédiatement si une commande retourne une erreur (code ≠ 0)', correct: true, feedback: 'Exact ! Sans set -e, un script continue même si une commande échoue. En production, cela peut provoquer des catastrophes (ex: rm -rf $dossier/ continue même si $dossier est vide). set -e + set -u + set -o pipefail = trio recommandé.' },
                      { texte: 'set -e active le mode debug et affiche chaque commande exécutée', correct: false, feedback: 'C\'est set -x qui active le mode debug (affiche chaque commande avec un +). set -e s\'arrête sur erreur. set -v affiche les lignes avant exécution.' },
                      { texte: 'set -e est requis pour utiliser les fonctions bash', correct: false, feedback: 'Non. Les fonctions bash fonctionnent indépendamment de set -e. set -e est une option de robustesse qui arrête le script sur toute commande retournant un code d\'erreur non nul.' }
                    ]
                  },
                  {
                    description: 'Le script utilise des chemins relatifs : rm backup/*. Quel risque cela comporte-t-il ?',
                    choix: [
                      { texte: 'Si le répertoire courant n\'est pas celui attendu, la suppression peut toucher de mauvais fichiers', correct: true, feedback: 'Risque réel ! Si le script est lancé depuis / au lieu de /home/admin, rm backup/* supprime /backup/* au lieu de /home/admin/backup/*. Utilisez toujours des chemins absolus en production : rm /home/admin/backup/*.' },
                      { texte: 'Les chemins relatifs sont plus rapides — aucun risque', correct: false, feedback: 'Performance négligeable. Le vrai risque est comportemental : un script avec des chemins relatifs dépend du répertoire courant au moment de son exécution (via cron, le répertoire courant peut être /).' },
                      { texte: 'rm ne fonctionne qu\'avec des chemins absolus', correct: false, feedback: 'Faux, rm fonctionne avec les deux. Le problème est de fiabilité : avec des chemins relatifs, le comportement dépend du répertoire courant, ce qui est une source d\'erreurs en production.' }
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'bash-m03',
          titre: 'Premières commandes utiles',
          cas: [
            {
              id: 'cas-bash-005',
              titre: 'Filtrer et analyser des fichiers de logs',
              difficulte: 'moyen',
              format: 'terminal',
              objectif: 'Utiliser grep, wc, sort et uniq pour extraire des informations d\'un fichier de logs.',
              contexte: 'Vous analysez /var/log/auth.log pour détecter des tentatives de connexion SSH suspectes.',
              contenu: {
                prompt: 'admin@srv:~$',
                commandes: {
                  'grep "Failed password" /var/log/auth.log | head -5': 'Mar  2 02:11:01 srv sshd[1234]: Failed password for root from 185.224.x.x port 42301 ssh2\nMar  2 02:11:05 srv sshd[1235]: Failed password for root from 185.224.x.x port 42302 ssh2\nMar  2 02:11:09 srv sshd[1236]: Failed password for admin from 91.108.x.x port 55201 ssh2',
                  'grep "Failed password" /var/log/auth.log | wc -l': '1847',
                  'grep "Failed password" /var/log/auth.log | awk \'{print $11}\' | sort | uniq -c | sort -rn | head -5': '   892 185.224.x.x\n   445 91.108.x.x\n   312 203.0.x.x\n   108 45.155.x.x\n    90 194.165.x.x',
                  'grep "Accepted password" /var/log/auth.log | wc -l': '23',
                  'grep "Accepted password" /var/log/auth.log': 'Mar  2 08:15:22 srv sshd[2100]: Accepted password for admin from 192.168.1.10 port 52341 ssh2\nMar  2 09:02:11 srv sshd[2145]: Accepted password for admin from 192.168.1.10 port 52890 ssh2',
                  'grep -c "Invalid user" /var/log/auth.log': '934',
                  'help': 'Commandes : grep "Failed password" /var/log/auth.log | head -5, grep "Failed password" /var/log/auth.log | wc -l, grep "Failed password" /var/log/auth.log | awk \'{print $11}\' | sort | uniq -c | sort -rn | head -5, grep "Accepted password" /var/log/auth.log | wc -l, grep -c "Invalid user" /var/log/auth.log'
                },
                validation: ['grep "Failed password" /var/log/auth.log | wc -l', 'grep "Failed password" /var/log/auth.log | awk \'{print $11}\' | sort | uniq -c | sort -rn | head -5'],
                indices: [
                  'Enchaînez grep, awk, sort et uniq avec des pipes (|) pour extraire les IPs et compter leurs occurrences.',
                  'uniq -c compte les occurrences ; sort -rn trie du plus grand au plus petit (reverse numeric).'
                ],
                solution: ['grep "Failed password" /var/log/auth.log | wc -l', 'grep "Failed password" /var/log/auth.log | awk \'{print $11}\' | sort | uniq -c | sort -rn | head -5', 'grep "Accepted password" /var/log/auth.log | wc -l']
              }
            },
            {
              id: 'cas-bash-006',
              titre: 'Choisir la bonne commande de filtrage',
              difficulte: 'moyen',
              format: 'arbre',
              objectif: 'Sélectionner grep, sed, awk ou cut selon le besoin de traitement du texte.',
              contexte: 'Vous devez traiter différents fichiers texte. Choisissez la commande la plus adaptée à chaque besoin.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Quel est votre besoin ?', choix: [{ texte: 'Trouver toutes les lignes contenant le mot "ERROR" dans un fichier', suite: 'n2' }, { texte: 'Extraire uniquement le 3e champ d\'un fichier CSV séparé par des virgules', suite: 'n3' }, { texte: 'Remplacer toutes les occurrences de "http://" par "https://" dans un fichier', suite: 'n4' }] },
                  n2: { solution: true, correct: true, texte: 'grep "ERROR" fichier.log', explication: 'grep est la commande de recherche de motifs. grep "ERROR" affiche les lignes correspondantes. Options utiles : -i (insensible à la casse), -n (affiche le numéro de ligne), -c (compte les occurrences).' },
                  n3: { question: 'Le séparateur est-il toujours le même caractère ?', choix: [{ texte: 'Oui, toujours une virgule (CSV propre)', suite: 'n5' }, { texte: 'Variable : espaces, tabulations ou virgules', suite: 'n6' }] },
                  n4: { solution: true, correct: true, texte: 'sed \'s|http://|https://|g\' fichier', explication: 'sed (stream editor) est idéal pour les substitutions. s|ancien|nouveau|g remplace toutes les occurrences. Ajoutez -i pour modifier le fichier directement (attention : sans backup avec sed -i.bak).' },
                  n5: { solution: true, correct: true, texte: 'cut -d\',\' -f3 fichier.csv', explication: 'cut découpe les lignes par délimiteur (-d) et extrait les champs (-f). Simple, rapide et efficace pour des CSV uniformes. Exemple : cut -d\',\' -f3 données.csv extrait la 3e colonne.' },
                  n6: { solution: true, correct: true, texte: 'awk \'{print $3}\' fichier', explication: 'awk gère les séparateurs variables. Par défaut, il découpe sur les espaces/tabulations. Pour un CSV : awk -F\',\' \'{print $3}\'. awk est plus puissant que cut pour les formats irréguliers.' }
                }
              }
            }
          ]
        },
        {
          id: 'bash-m04',
          titre: 'Les variables dans les scripts',
          cas: [
            {
              id: 'cas-bash-007',
              titre: 'Utiliser les variables et la substitution de commande',
              difficulte: 'moyen',
              format: 'terminal',
              objectif: 'Déclarer des variables, utiliser la substitution de commande et protéger les variables avec des guillemets.',
              contexte: 'Vous écrivez un script de sauvegarde qui utilise des variables pour gérer les chemins et la date.',
              contenu: {
                prompt: 'admin@srv:~$',
                commandes: {
                  'BACKUP_DIR="/var/backups"': '',
                  'DATE=$(date +%Y%m%d)': '',
                  'FILENAME="backup_${DATE}.tar.gz"': '',
                  'echo $FILENAME': 'backup_20240302.tar.gz',
                  'echo "Sauvegarde vers : ${BACKUP_DIR}/${FILENAME}"': 'Sauvegarde vers : /var/backups/backup_20240302.tar.gz',
                  'FICHIERS=$(ls /etc/*.conf 2>/dev/null | wc -l)': '',
                  'echo "Nombre de fichiers .conf : $FICHIERS"': 'Nombre de fichiers .conf : 47',
                  'NOM="Alice Martin"': '',
                  'echo "Bonjour $NOM"': 'Bonjour Alice Martin',
                  'echo "Bonjour $NOMtest"': 'Bonjour (variable $NOMtest vide — erreur !)',
                  'echo "Bonjour ${NOM}test"': 'Bonjour Alice Martintest (guillemets {} pour délimiter)',
                  'help': 'Commandes : BACKUP_DIR="/var/backups", DATE=$(date +%Y%m%d), FILENAME="backup_${DATE}.tar.gz", echo $FILENAME, echo "Sauvegarde vers : ${BACKUP_DIR}/${FILENAME}", FICHIERS=$(ls /etc/*.conf 2>/dev/null | wc -l), echo "Bonjour $NOM", echo "Bonjour ${NOM}test"'
                },
                validation: ['DATE=$(date +%Y%m%d)', 'echo $FILENAME'],
                indices: [
                  'Utilisez ${VAR} avec accolades quand la variable est suivie immédiatement d\'autres caractères pour éviter l\'ambiguïté.',
                  'La substitution de commande $(commande) exécute la commande et remplace l\'expression par sa sortie.'
                ],
                solution: ['BACKUP_DIR="/var/backups"', 'DATE=$(date +%Y%m%d)', 'FILENAME="backup_${DATE}.tar.gz"', 'echo $FILENAME', 'echo "Sauvegarde vers : ${BACKUP_DIR}/${FILENAME}"']
              }
            },
            {
              id: 'cas-bash-008',
              titre: 'Comprendre les guillemets et la portée des variables',
              difficulte: 'moyen',
              format: 'scenario',
              objectif: 'Distinguer les guillemets simples, doubles et la portée locale/globale des variables.',
              contexte: 'Des comportements inattendus apparaissent dans un script à cause d\'une mauvaise utilisation des guillemets et de la portée des variables.',
              contenu: {
                etapes: [
                  {
                    description: 'Quelle est la différence entre echo \'$HOME\' et echo "$HOME" ?',
                    choix: [
                      { texte: 'echo \'$HOME\' affiche littéralement "$HOME" ; echo "$HOME" affiche le contenu de la variable (ex: /home/admin)', correct: true, feedback: 'Correct ! Les guillemets simples inhibent toute interprétation (variables, $(), \\). Les guillemets doubles permettent l\'expansion des variables et des substitutions de commande $(). Règle : simples = littéral, doubles = interprété.' },
                      { texte: 'Les deux sont identiques — les guillemets n\'ont aucun effet sur $', correct: false, feedback: 'Faux. Les guillemets simples protègent complètement contre l\'interprétation. echo \'$HOME\' affiche vraiment le texte $HOME ; echo "$HOME" affiche /home/admin.' },
                      { texte: 'echo \'$HOME\' génère une erreur car les guillemets simples sont invalides en bash', correct: false, feedback: 'Faux. Les guillemets simples sont parfaitement valides en bash. Ils créent une chaîne littérale où rien n\'est interprété, ni variables, ni substitutions, ni backslash.' }
                    ]
                  },
                  {
                    description: 'Une variable $COMPTEUR définie dans une fonction est-elle accessible hors de la fonction ?',
                    choix: [
                      { texte: 'Oui, toutes les variables bash sont globales par défaut', correct: true, feedback: 'Correct (et c\'est un piège courant !). En bash, les variables sont globales par défaut, même définies dans une fonction. Pour limiter la portée à la fonction, il faut déclarer : local COMPTEUR=0.' },
                      { texte: 'Non, les variables de fonction sont toujours locales', correct: false, feedback: 'En bash, c\'est l\'inverse ! Les variables sont globales par défaut. Pour les rendre locales à une fonction, il faut explicitement utiliser le mot-clé local : local COMPTEUR=0.' },
                      { texte: 'Cela dépend du type de la variable (entier, chaîne, tableau)', correct: false, feedback: 'Non. En bash, la portée ne dépend pas du type. Toutes les variables sont globales par défaut. Seul le mot-clé local (à l\'intérieur d\'une fonction) crée une portée locale.' }
                    ]
                  },
                  {
                    description: 'Le script utilise rm $DOSSIER/* mais $DOSSIER est vide. Que se passe-t-il ?',
                    choix: [
                      { texte: 'rm /*  — suppression potentiellement catastrophique de la racine !', correct: true, feedback: 'Danger réel ! Si $DOSSIER est vide, la commande devient rm /* ce qui tente de supprimer tout le contenu de /. Protection : 1) set -u (erreur si variable vide), 2) tester la variable avant : [ -n "$DOSSIER" ] || exit 1, 3) toujours mettre entre guillemets : rm "$DOSSIER"/*.' },
                      { texte: 'bash affiche une erreur "variable not set" et s\'arrête', correct: false, feedback: 'Par défaut, bash ne génère pas d\'erreur sur une variable vide. Il exécute la commande avec la variable remplacée par rien. Utilisez set -u pour activer l\'erreur sur variable non définie.' },
                      { texte: 'rm ignore les variables vides et ne supprime rien', correct: false, feedback: 'rm ne "sait" pas que la variable était vide. Il reçoit juste la commande rm /* après expansion. Il tente de supprimer /* avec les conséquences catastrophiques qui s\'ensuivent.' }
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'bash-m05',
          titre: 'Les caractères spéciaux du Shell',
          cas: [
            {
              id: 'cas-bash-009',
              titre: 'Maîtriser les redirections et les pipes',
              difficulte: 'moyen',
              format: 'terminal',
              objectif: 'Utiliser les redirections (>, >>, 2>, 2>&1) et les pipes (|) pour gérer les flux.',
              contexte: 'Vous devez configurer un script qui journalise ses sorties et erreurs dans des fichiers séparés.',
              contenu: {
                prompt: 'admin@srv:~$',
                commandes: {
                  'ls /etc > /tmp/liste.txt': '',
                  'ls /inexistant 2> /tmp/erreurs.txt': '',
                  'cat /tmp/erreurs.txt': 'ls: cannot access \'/inexistant\': No such file or directory',
                  'ls /etc /inexistant > /tmp/tout.txt 2>&1': '',
                  'cat /tmp/tout.txt': 'ls: cannot access \'/inexistant\': No such file or directory\nhosts\npasswd\nresolv.conf\n...',
                  'echo "Début sauvegarde" >> /var/log/backup.log': '',
                  'echo "Fin sauvegarde" >> /var/log/backup.log': '',
                  'cat /var/log/backup.log': 'Début sauvegarde\nFin sauvegarde',
                  'cat /etc/passwd | grep bash | cut -d: -f1': 'root\nadmin',
                  'help': 'Commandes : ls /etc > /tmp/liste.txt, ls /inexistant 2> /tmp/erreurs.txt, ls /etc /inexistant > /tmp/tout.txt 2>&1, echo "msg" >> /var/log/backup.log, cat /etc/passwd | grep bash | cut -d: -f1'
                },
                validation: ['ls /inexistant 2> /tmp/erreurs.txt', 'ls /etc /inexistant > /tmp/tout.txt 2>&1'],
                indices: [
                  '> écrase le fichier. >> ajoute à la fin. 2> redirige stderr. 2>&1 fusionne stderr dans stdout.',
                  'Pour capturer stdout ET stderr ensemble : commande > fichier 2>&1 (l\'ordre est important).'
                ],
                solution: ['ls /etc > /tmp/liste.txt', 'ls /inexistant 2> /tmp/erreurs.txt', 'ls /etc /inexistant > /tmp/tout.txt 2>&1', 'echo "Début sauvegarde" >> /var/log/backup.log']
              }
            },
            {
              id: 'cas-bash-010',
              titre: 'Interpréter un comportement inattendu des caractères spéciaux',
              difficulte: 'moyen',
              format: 'arbre',
              objectif: 'Diagnostiquer les erreurs causées par une mauvaise interprétation des métacaractères bash.',
              contexte: 'Un script produit des résultats inattendus à cause de caractères spéciaux mal gérés.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Quel comportement inattendu observez-vous ?', choix: [{ texte: 'grep "error|warning" fichier ne trouve rien', suite: 'n2' }, { texte: 'rm *.bak a supprimé des fichiers inattendus', suite: 'n3' }, { texte: 'Une commande avec un chemin contenant des espaces échoue', suite: 'n4' }] },
                  n2: { solution: true, correct: true, texte: 'grep utilise des regex basiques — | n\'est pas alternatif par défaut', explication: 'En grep standard, | n\'est pas une alternance. Utilisez grep -E (ERE) ou egrep : grep -E "error|warning" fichier. Ou utilisez deux greps chaînés : grep "error" fichier ; grep "warning" fichier.' },
                  n3: { question: 'Des fichiers .bak mais aussi d\'autres fichiers ont été supprimés ?', choix: [{ texte: 'Le glob *.bak a matché plus que prévu dans le répertoire', suite: 'n5' }, { texte: 'Le script a été lancé depuis un mauvais répertoire', suite: 'n6' }] },
                  n4: { solution: true, correct: true, texte: 'Mettre le chemin entre guillemets doubles', explication: 'Les espaces séparent les arguments en bash. Un chemin comme /home/mon dossier/fichier est interprété comme deux arguments. Solution : toujours mettre entre guillemets : "/home/mon dossier/fichier" ou échapper l\'espace : /home/mon\ dossier/fichier.' },
                  n5: { solution: true, correct: true, texte: 'Tester les globs avec echo avant rm', explication: 'Avant tout rm avec wildcard, testez avec echo : echo *.bak affiche les fichiers qui seraient supprimés. Activez nullglob (shopt -s nullglob) pour que le glob vide ne matche rien au lieu de rester littéral.' },
                  n6: { solution: true, correct: true, texte: 'Utiliser des chemins absolus dans les scripts', explication: 'Si le script est lancé depuis un répertoire différent, les chemins relatifs et les globs s\'appliquent au répertoire courant au moment de l\'exécution. Utilisez des chemins absolus : rm /var/backups/*.bak.' }
                }
              }
            }
          ]
        },
        {
          id: 'bash-m06',
          titre: 'Exécution conditionnelle',
          cas: [
            {
              id: 'cas-bash-011',
              titre: 'Écrire des conditions avec if et test',
              difficulte: 'moyen',
              format: 'terminal',
              objectif: 'Utiliser if/then/else et les opérateurs de test pour créer des scripts conditionnels.',
              contexte: 'Vous écrivez un script qui vérifie l\'espace disque et alerte si l\'utilisation dépasse 80%.',
              contenu: {
                prompt: 'admin@srv:~$',
                commandes: {
                  'cat > check_disk.sh': '#!/bin/bash\nset -euo pipefail\n\nUSAGE=$(df / | awk \'NR==2 {print $5}\' | tr -d \'%\')\nSEUIL=80\n\nif [ "$USAGE" -ge "$SEUIL" ]; then\n    echo "ALERTE : disque à ${USAGE}% — seuil ${SEUIL}% dépassé !"\n    exit 1\nelif [ "$USAGE" -ge 70 ]; then\n    echo "AVERTISSEMENT : disque à ${USAGE}%"\nelse\n    echo "OK : disque à ${USAGE}%"\nfi\n[Ctrl+D]',
                  'chmod +x check_disk.sh': '',
                  './check_disk.sh': 'OK : disque à 25%',
                  '[ -f /etc/passwd ] && echo "fichier existe" || echo "absent"': 'fichier existe',
                  '[ -d /tmp ] && echo "répertoire existe"': 'répertoire existe',
                  '[ -z "" ] && echo "chaîne vide" || echo "chaîne non vide"': 'chaîne vide',
                  '[ 10 -gt 5 ] && echo "10 > 5"': '10 > 5',
                  'help': 'Commandes : cat > check_disk.sh, chmod +x check_disk.sh, ./check_disk.sh, [ -f /etc/passwd ] && echo "fichier existe", [ -d /tmp ] && echo "répertoire existe", [ -z "" ] && echo "chaîne vide", [ 10 -gt 5 ] && echo "10 > 5"'
                },
                validation: ['chmod +x check_disk.sh', './check_disk.sh'],
                indices: [
                  'Opérateurs numériques : -eq (égal), -ne (différent), -gt (supérieur), -lt (inférieur), -ge (≥), -le (≤).',
                  'Opérateurs fichiers : -f (fichier), -d (répertoire), -e (existe), -r (lisible), -x (exécutable). Chaînes : -z (vide), -n (non vide).'
                ],
                solution: ['cat > check_disk.sh', 'chmod +x check_disk.sh', './check_disk.sh', '[ -f /etc/passwd ] && echo "fichier existe" || echo "absent"']
              }
            },
            {
              id: 'cas-bash-012',
              titre: 'Choisir le bon opérateur de test',
              difficulte: 'moyen',
              format: 'scenario',
              objectif: 'Identifier l\'opérateur de test approprié selon la condition à vérifier.',
              contexte: 'Vous écrivez un script et devez choisir les bons opérateurs pour différentes conditions.',
              contenu: {
                etapes: [
                  {
                    description: 'Vous voulez vérifier si un fichier de config existe avant de le lire. Quelle condition utiliser ?',
                    choix: [
                      { texte: 'if [ -f "/etc/monapp/config.conf" ]; then', correct: true, feedback: 'Correct ! -f teste si le chemin est un fichier régulier (et qu\'il existe). Plus précis que -e qui teste simplement l\'existence sans vérifier le type (fichier ou répertoire).' },
                      { texte: 'if [ "/etc/monapp/config.conf" == "true" ]; then', correct: false, feedback: 'Cette condition compare le chemin à la chaîne "true", ce qui n\'a pas de sens. Pour tester l\'existence d\'un fichier, utilisez l\'opérateur -f ou -e.' },
                      { texte: 'if [ -d "/etc/monapp/config.conf" ]; then', correct: false, feedback: '-d teste si c\'est un répertoire, pas un fichier. Un fichier .conf n\'est pas un répertoire. Utilisez -f pour les fichiers réguliers.' }
                    ]
                  },
                  {
                    description: 'Vous comparez deux chaînes de caractères en bash. Quelle syntaxe est la plus robuste ?',
                    choix: [
                      { texte: 'if [[ "$VAR" == "valeur" ]]; then (double crochets)', correct: true, feedback: 'Correct ! [[ ]] est la forme étendue de bash. Plus robuste que [ ] : pas besoin de guillemets pour les variables (évite les erreurs si $VAR est vide), supporte les wildcards, pas de problème avec les caractères spéciaux.' },
                      { texte: 'if [ $VAR == "valeur" ]; then (sans guillemets)', correct: false, feedback: 'Risqué ! Si $VAR est vide ou contient des espaces, la commande devient if [ == "valeur" ] qui génère une erreur de syntaxe. Toujours mettre les variables entre guillemets : [ "$VAR" == "valeur" ].' },
                      { texte: 'if ( $VAR == "valeur" ); then (parenthèses simples)', correct: false, feedback: 'Les parenthèses simples lancent un sous-shell, pas une évaluation conditionnelle. Pour des tests en bash : utilisez [ ] (test POSIX) ou [[ ]] (test bash étendu).' }
                    ]
                  },
                  {
                    description: 'Le script doit s\'arrêter si deux conditions sont fausses simultanément. Quel opérateur logique utiliser ?',
                    choix: [
                      { texte: 'if [[ ! $COND1 && ! $COND2 ]]; then exit 1; fi', correct: true, feedback: 'Correct ! && est l\'opérateur ET logique (les deux doivent être vrais). ! est la négation. [[ ! $COND1 && ! $COND2 ]] est vrai si les deux conditions sont fausses simultanément.' },
                      { texte: 'if [[ $COND1 || $COND2 ]]; then exit 1; fi', correct: false, feedback: '|| est l\'opérateur OU (au moins une vraie). Cette condition est vraie si au moins une condition est vraie, ce qui est l\'opposé de la demande (s\'arrêter si les deux sont fausses).' },
                      { texte: 'if [[ $COND1 -and $COND2 ]]; then exit 1; fi', correct: false, feedback: '-and n\'est pas un opérateur valide dans [[ ]]. Utilisez && pour ET et || pour OU dans les doubles crochets bash. -a et -o sont les formes POSIX pour [ ] mais déconseillées.' }
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'bash-m07',
          titre: 'Les structures de boucle',
          cas: [
            {
              id: 'cas-bash-013',
              titre: 'Automatiser des tâches répétitives avec les boucles',
              difficulte: 'moyen',
              format: 'terminal',
              objectif: 'Utiliser for et while pour automatiser des traitements sur plusieurs éléments.',
              contexte: 'Vous devez créer 5 comptes utilisateurs en masse et attendre qu\'un service soit disponible avant de continuer.',
              contenu: {
                prompt: 'admin@srv:~$',
                commandes: {
                  'for USER in alice bob charlie dave eve; do useradd -m $USER && echo "Créé : $USER"; done': 'Créé : alice\nCréé : bob\nCréé : charlie\nCréé : dave\nCréé : eve',
                  'for i in $(seq 1 5); do echo "Utilisateur user$i"; done': 'Utilisateur user1\nUtilisateur user2\nUtilisateur user3\nUtilisateur user4\nUtilisateur user5',
                  'for f in /etc/*.conf; do echo "Config : $f"; done': 'Config : /etc/adduser.conf\nConfig : /etc/debconf.conf\nConfig : /etc/deluser.conf\n... (et tous les *.conf)',
                  'cat > wait_service.sh': '#!/bin/bash\nMAX=30\nCOMPTEUR=0\nwhile ! systemctl is-active --quiet apache2; do\n    echo "Attente d\'Apache... ($COMPTEUR/$MAX)"\n    sleep 2\n    COMPTEUR=$((COMPTEUR + 1))\n    [ $COMPTEUR -ge $MAX ] && { echo "Timeout !"; exit 1; }\ndone\necho "Apache est prêt !"\n[Ctrl+D]',
                  'chmod +x wait_service.sh && ./wait_service.sh': 'Apache est prêt !',
                  'help': 'Commandes : for USER in alice bob charlie dave eve; do useradd -m $USER && echo "Créé : $USER"; done, for i in $(seq 1 5); do echo "Utilisateur user$i"; done, for f in /etc/*.conf; do echo "Config : $f"; done, cat > wait_service.sh'
                },
                validation: ['for USER in alice bob charlie dave eve; do useradd -m $USER && echo "Créé : $USER"; done', 'for f in /etc/*.conf; do echo "Config : $f"; done'],
                indices: [
                  'for VARIABLE in liste; do ... done — la liste peut être une énumération, une séquence $(seq), ou des fichiers via glob.',
                  'while CONDITION; do ... done — continue tant que la condition est vraie. Utilisez ! pour inverser (while ! condition).'
                ],
                solution: ['for USER in alice bob charlie dave eve; do useradd -m $USER && echo "Créé : $USER"; done', 'for i in $(seq 1 5); do echo "Utilisateur user$i"; done', 'for f in /etc/*.conf; do echo "Config : $f"; done']
              }
            },
            {
              id: 'cas-bash-014',
              titre: 'Choisir entre for, while et until',
              difficulte: 'moyen',
              format: 'scenario',
              objectif: 'Sélectionner la structure de boucle la plus adaptée selon le contexte.',
              contexte: 'Vous écrivez différentes parties d\'un script. Pour chaque cas, choisissez la boucle appropriée.',
              contenu: {
                etapes: [
                  {
                    description: 'Vous devez traiter chaque fichier .log d\'un répertoire. Quelle boucle utiliser ?',
                    choix: [
                      { texte: 'for f in /var/log/*.log; do traiter "$f"; done', correct: true, feedback: 'Correct ! La boucle for est idéale pour itérer sur une liste finie et connue (fichiers, utilisateurs, éléments). Le glob *.log génère automatiquement la liste des fichiers.' },
                      { texte: 'while [ -f /var/log/*.log ]; do traiter; done', correct: false, feedback: 'Incorrect. while teste une condition booléenne, pas une liste. Cette syntaxe ne parcourt pas les fichiers. Pour des listes, utilisez for.' },
                      { texte: 'until ls /var/log/*.log; do sleep 1; done', correct: false, feedback: 'until boucle JUSQU\'À ce que la condition soit vraie (inverse de while). Ce n\'est pas le bon outil pour parcourir une liste de fichiers. Utilisez for.' }
                    ]
                  },
                  {
                    description: 'Vous attendez que le port 3306 (MySQL) soit ouvert avant de continuer. Quelle boucle utiliser ?',
                    choix: [
                      { texte: 'while ! nc -z localhost 3306; do sleep 1; done', correct: true, feedback: 'Parfait ! while tourne TANT QUE la condition est vraie. Avec !, on boucle tant que le port n\'est pas disponible. nc -z teste si le port est ouvert sans envoyer de données.' },
                      { texte: 'for i in $(seq 1 60); do sleep 1; done (attendre 60 secondes fixe)', correct: false, feedback: 'Cette approche attend toujours 60 secondes même si MySQL démarre en 5s. La boucle while avec test de port est plus intelligente : elle s\'arrête dès que MySQL est prêt.' },
                      { texte: 'until nc -z localhost 3306; do sleep 1; done', correct: true, feedback: 'Correct aussi ! until boucle JUSQU\'À ce que la condition soit vraie — c\'est l\'inverse de while. until nc -z localhost 3306 est équivalent à while ! nc -z localhost 3306. Les deux fonctionnent.' }
                    ]
                  },
                  {
                    description: 'Un script doit présenter un menu à l\'utilisateur et recommencer jusqu\'à ce qu\'il choisisse "Quitter". Quelle structure utiliser ?',
                    choix: [
                      { texte: 'while true; do afficher_menu; lire_choix; [ "$choix" == "q" ] && break; done', correct: true, feedback: 'Exact ! while true crée une boucle infinie. break sort de la boucle quand l\'utilisateur choisit de quitter. C\'est le pattern classique pour les menus interactifs en bash.' },
                      { texte: 'for choix in 1 2 3 q; do afficher_menu; done', correct: false, feedback: 'Incorret pour un menu interactif. La boucle for parcourt une liste prédéfinie, pas les choix réels de l\'utilisateur. Le menu devrait réagir aux entrées de l\'utilisateur en temps réel.' },
                      { texte: 'until [ "$choix" == "q" ]; do afficher_menu; lire_choix; done', correct: true, feedback: 'Fonctionne aussi ! until boucle jusqu\'à ce que la condition soit vraie ($choix == "q"). Attention : à la première itération, $choix est vide, donc la condition est fausse et le menu s\'affiche bien.' }
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'bash-m08',
          titre: 'Les fonctions',
          cas: [
            {
              id: 'cas-bash-015',
              titre: 'Structurer un script avec des fonctions',
              difficulte: 'difficile',
              format: 'terminal',
              objectif: 'Créer des fonctions réutilisables avec paramètres, valeur de retour et variables locales.',
              contexte: 'Vous refactorisez un script de sauvegarde en le structurant avec des fonctions pour améliorer sa lisibilité et sa maintenabilité.',
              contenu: {
                prompt: 'admin@srv:~$',
                commandes: {
                  'cat > backup_v2.sh': '#!/bin/bash\nset -euo pipefail\n\n# --- Fonctions ---\nlog() {\n    local NIVEAU="$1"\n    local MESSAGE="$2"\n    echo "[$(date +%H:%M:%S)] [$NIVEAU] $MESSAGE"\n}\n\nverifier_espace() {\n    local SEUIL="${1:-80}"\n    local USAGE=$(df / | awk \'NR==2{print $5}\' | tr -d \'%\')\n    if [ "$USAGE" -ge "$SEUIL" ]; then\n        log "ERREUR" "Espace disque insuffisant : ${USAGE}%"\n        return 1\n    fi\n    log "INFO" "Espace disque OK : ${USAGE}%"\n    return 0\n}\n\ncreer_archive() {\n    local SOURCE="$1"\n    local DEST="$2"\n    tar -czf "$DEST" "$SOURCE" && log "INFO" "Archive créée : $DEST"\n}\n\n# --- Programme principal ---\nlog "INFO" "Démarrage de la sauvegarde"\nverifier_espace 85\ncreer_archive "/etc" "/tmp/backup_$(date +%Y%m%d).tar.gz"\nlog "INFO" "Sauvegarde terminée"\n[Ctrl+D]',
                  'chmod +x backup_v2.sh && ./backup_v2.sh': '[10:30:00] [INFO] Démarrage de la sauvegarde\n[10:30:00] [INFO] Espace disque OK : 25%\n[10:30:01] [INFO] Archive créée : /tmp/backup_20240302.tar.gz\n[10:30:01] [INFO] Sauvegarde terminée',
                  'verifier_espace() { echo "test"; }': '',
                  'verifier_espace': 'test',
                  'help': 'Commandes : cat > backup_v2.sh, chmod +x backup_v2.sh && ./backup_v2.sh'
                },
                validation: ['chmod +x backup_v2.sh && ./backup_v2.sh'],
                indices: [
                  'Les paramètres d\'une fonction sont accessibles via $1, $2, etc. Utilisez local pour les variables internes.',
                  'Une fonction retourne un code de sortie (0 = succès, 1 = erreur) avec return. Pour retourner une valeur, utilisez echo et capturez avec $().'
                ],
                solution: ['cat > backup_v2.sh', 'chmod +x backup_v2.sh && ./backup_v2.sh']
              }
            },
            {
              id: 'cas-bash-016',
              titre: 'Identifier les avantages des fonctions dans un script',
              difficulte: 'facile',
              format: 'scenario',
              objectif: 'Comprendre pourquoi et quand utiliser des fonctions pour structurer un script Bash.',
              contexte: 'Vous conseillez un collègue débutant sur la structuration de ses scripts bash.',
              contenu: {
                etapes: [
                  {
                    description: 'Votre collègue copie-colle le même bloc de code de vérification d\'erreur à 5 endroits différents du script. Que lui conseillez-vous ?',
                    choix: [
                      { texte: 'Créer une fonction verifier_erreur() et l\'appeler aux 5 endroits', correct: true, feedback: 'Exactement ! Le principe DRY (Don\'t Repeat Yourself). Une fonction centralise le code : si vous devez modifier la vérification, vous ne modifiez qu\'un seul endroit. Moins de bugs, meilleure maintenabilité.' },
                      { texte: 'Laisser le code dupliqué — c\'est plus lisible', correct: false, feedback: 'Le code dupliqué est un anti-pattern. Si vous devez corriger un bug dans ce bloc, vous devez le corriger à 5 endroits et risquez d\'en oublier un. Les fonctions évitent cette dette technique.' },
                      { texte: 'Créer 5 scripts séparés, un par vérification', correct: false, feedback: '5 scripts séparés pour une seule vérification est une sur-ingénierie. Une fonction dans le même script est la solution simple et efficace.' }
                    ]
                  },
                  {
                    description: 'La fonction de votre collègue modifie une variable $ERREUR globale pour signaler une erreur. Quel problème cela peut-il causer ?',
                    choix: [
                      { texte: 'Des effets de bord : la variable globale peut être modifiée de façon inattendue par différents appels de fonctions', correct: true, feedback: 'Correct ! Les variables globales dans les fonctions créent des couplages implicites. Préférez : 1) retourner un code de sortie (return 1), 2) utiliser local pour les variables internes, 3) capturer la sortie avec $().' },
                      { texte: 'Aucun problème — bash gère automatiquement les conflits de variables', correct: false, feedback: 'Non. Bash ne gère pas les conflits : si deux fonctions modifient la même variable globale, elles s\'écrasent mutuellement. C\'est la source de bugs difficiles à tracer.' },
                      { texte: 'La variable sera détruite après l\'appel de la fonction', correct: false, feedback: 'Non, c\'est l\'inverse. En bash, les variables définies dans une fonction sont GLOBALES par défaut. C\'est pourquoi il faut explicitement utiliser local pour isoler les variables de la fonction.' }
                    ]
                  },
                  {
                    description: 'Comment une fonction bash peut-elle "retourner" une valeur utilisable par le reste du script ?',
                    choix: [
                      { texte: 'RESULTAT=$(ma_fonction) — capturer la sortie standard de la fonction', correct: true, feedback: 'Correct ! La technique standard : la fonction fait echo de sa valeur, et l\'appelant capture avec $(). Exemple : TAILLE=$(calculer_taille "/data"). Le return de bash est réservé aux codes de sortie (0/1).' },
                      { texte: 'return "valeur_texte" — retourner une chaîne', correct: false, feedback: 'En bash, return ne peut retourner qu\'un entier (code de sortie, 0-255). Pour retourner une valeur textuelle, la fonction doit faire echo de la valeur et l\'appelant la capture avec $().' },
                      { texte: 'Les fonctions bash ne peuvent pas retourner de valeurs', correct: false, feedback: 'Elles peuvent "retourner" des valeurs via echo + $(), ou via une variable globale. return est limité aux codes entiers. La technique $(ma_fonction) est la plus propre.' }
                    ]
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 'scripting-ps-initiation',
      titre: 'Initiation scripting PowerShell',
      emoji: '⚡',
      modules: [
        {
          id: 'ps-init-m01',
          titre: 'Introduction à PowerShell',
          cas: [
            {
              id: 'cas-psinit-001',
              titre: 'Découvrir les commandes PowerShell fondamentales',
              difficulte: 'facile',
              format: 'terminal',
              objectif: 'Utiliser les cmdlets de base pour naviguer, lister et obtenir de l\'aide dans PowerShell.',
              contexte: 'Vous ouvrez PowerShell pour la première fois sur un serveur Windows. Explorez les commandes essentielles.',
              contenu: {
                prompt: 'PS C:\\Users\\Admin>',
                commandes: {
                  'Get-Command': 'CommandType  Name                     Version  Source\n-----------  ----                     -------  ------\nCmdlet       Add-Content              7.0.0.0  Microsoft.PowerShell.Management\nCmdlet       Clear-Content            7.0.0.0  Microsoft.PowerShell.Management\nCmdlet       Get-ChildItem            7.0.0.0  Microsoft.PowerShell.Management\n... (des centaines de cmdlets)',
                  'Get-Command -Verb Get': 'CommandType  Name                    \nCmdlet       Get-Acl                 \nCmdlet       Get-Alias               \nCmdlet       Get-ChildItem           \nCmdlet       Get-Content             \nCmdlet       Get-Date                \nCmdlet       Get-Help                \nCmdlet       Get-Process             \nCmdlet       Get-Service             ',
                  'Get-Help Get-Service': 'NAME\n    Get-Service\nSYNOPSIS\n    Gets the services on a local or remote computer.\nSYNTAX\n    Get-Service [[-Name] <String[]>] [-ComputerName <String[]>] [-DependentServices] [-RequiredServices]\nDESCRIPTION\n    The Get-Service cmdlet gets objects that represent the services on a local computer...',
                  'Get-Help Get-Service -Examples': 'EXAMPLE 1: Get all services\n    Get-Service\nEXAMPLE 2: Get a specific service\n    Get-Service -Name WinRM\nEXAMPLE 3: Get services that start with "win"\n    Get-Service -Name win*',
                  'Get-Alias ls': 'CommandType  Name  Version  Definition\n-----------  ----  -------  ----------\nAlias        ls    -> Get-ChildItem',
                  'Get-Date': 'samedi 2 mars 2024 10:30:00',
                  'Get-Process | Measure-Object': 'Count    : 87\nAverage  :\nSum      :\nMaximum  :\nMinimum  :\nProperty :',
                  'help': 'Commandes : Get-Command, Get-Command -Verb Get, Get-Help Get-Service, Get-Help Get-Service -Examples, Get-Alias ls, Get-Date, Get-Process | Measure-Object'
                },
                validation: ['Get-Help Get-Service', 'Get-Help Get-Service -Examples'],
                indices: [
                  'Les cmdlets PowerShell suivent la convention Verbe-Nom (Get-Service, Set-Item, New-Object). Get-Command liste toutes les commandes disponibles.',
                  'Get-Help est votre meilleur ami : -Examples montre des exemples concrets, -Full donne la documentation complète.'
                ],
                solution: ['Get-Command', 'Get-Command -Verb Get', 'Get-Help Get-Service', 'Get-Help Get-Service -Examples', 'Get-Alias ls']
              }
            },
            {
              id: 'cas-psinit-002',
              titre: 'PowerShell vs CMD — comprendre les différences',
              difficulte: 'facile',
              format: 'scenario',
              objectif: 'Identifier les différences fondamentales entre PowerShell et l\'invite de commandes CMD.',
              contexte: 'Un collègue hésite à passer de CMD à PowerShell pour ses scripts d\'administration. Vous l\'aidez à comprendre les avantages.',
              contenu: {
                etapes: [
                  {
                    description: 'Quelle est la différence fondamentale entre la sortie de PowerShell et celle de CMD ?',
                    choix: [
                      { texte: 'PowerShell retourne des objets .NET structurés ; CMD retourne du texte brut', correct: true, feedback: 'Correct ! C\'est la différence clé. CMD retourne des chaînes de caractères qu\'il faut parser manuellement. PowerShell retourne des objets avec des propriétés et méthodes : Get-Process retourne des objets Process avec .CPU, .Name, .Id, etc.' },
                      { texte: 'PowerShell est plus rapide que CMD pour toutes les opérations', correct: false, feedback: 'Pas nécessairement. PowerShell charge l\'environnement .NET au démarrage, ce qui le rend plus lent à initialiser. Pour des tâches simples, CMD peut être plus rapide. L\'avantage de PS est la puissance de manipulation des données, pas la vitesse brute.' },
                      { texte: 'PowerShell ne peut pas exécuter les commandes CMD classiques', correct: false, feedback: 'Faux. PowerShell peut exécuter la plupart des commandes CMD (ipconfig, ping, dir...). Il dispose aussi d\'alias : ls = Get-ChildItem, cd = Set-Location, dir = Get-ChildItem.' }
                    ]
                  },
                  {
                    description: 'Pourquoi la politique d\'exécution (ExecutionPolicy) est-elle importante en PowerShell ?',
                    choix: [
                      { texte: 'Elle contrôle si des scripts .ps1 peuvent être exécutés et sous quelles conditions de signature', correct: true, feedback: 'Correct ! Par défaut, Windows bloque l\'exécution des scripts PS (Restricted). Pour les scripts internes : Set-ExecutionPolicy RemoteSigned (scripts locaux sans signature OK, scripts distants doivent être signés).' },
                      { texte: 'Elle détermine qui peut ouvrir la console PowerShell', correct: false, feedback: 'Non. L\'ExecutionPolicy contrôle l\'exécution des scripts .ps1, pas l\'accès à la console. N\'importe quel utilisateur autorisé peut ouvrir PowerShell, mais l\'ExecutionPolicy détermine s\'il peut exécuter des scripts.' },
                      { texte: 'Elle empêche PowerShell d\'accéder à Internet', correct: false, feedback: 'Non. L\'ExecutionPolicy contrôle uniquement l\'exécution de scripts .ps1. L\'accès réseau de PowerShell est géré par le pare-feu et les politiques réseau, pas par l\'ExecutionPolicy.' }
                    ]
                  },
                  {
                    description: 'Comment vérifier et modifier l\'ExecutionPolicy pour permettre les scripts locaux non signés ?',
                    choix: [
                      { texte: 'Get-ExecutionPolicy pour voir ; Set-ExecutionPolicy RemoteSigned pour modifier', correct: true, feedback: 'Exact ! RemoteSigned est le bon compromis en production : scripts locaux exécutables sans signature, scripts téléchargés doivent être signés par une autorité de confiance. À éviter en prod : Unrestricted et Bypass.' },
                      { texte: 'Modifier le registre HKLM\\Software\\PowerShell\\Policy', correct: false, feedback: 'L\'ExecutionPolicy peut être dans le registre mais la méthode recommandée est Set-ExecutionPolicy. Modifier le registre directement est risqué et contourne les mécanismes de gestion PowerShell.' },
                      { texte: 'Renommer le fichier .ps1 en .bat pour contourner la restriction', correct: false, feedback: 'Mauvaise pratique et inefficace. Un .bat ne peut pas exécuter du code PowerShell natif (sans appeler powershell.exe). La bonne approche est de configurer correctement l\'ExecutionPolicy.' }
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'ps-init-m02',
          titre: 'PowerShell — langage objet',
          cas: [
            {
              id: 'cas-psinit-003',
              titre: 'Explorer les objets et leurs propriétés',
              difficulte: 'moyen',
              format: 'terminal',
              objectif: 'Utiliser Get-Member pour explorer les propriétés et méthodes d\'un objet PowerShell.',
              contexte: 'Vous devez extraire des informations précises sur les processus en cours. Explorez l\'objet retourné par Get-Process.',
              contenu: {
                prompt: 'PS C:\\> ',
                commandes: {
                  'Get-Process | Get-Member': 'TypeName: System.Diagnostics.Process\n\nName        MemberType    Definition\n----        ----------    ----------\nKill        Method        void Kill()\nStart       Method        static System.Diagnostics.Process Start(string...)\nCPU         Property      double CPU {get;}\nId          Property      int Id {get;}\nName        Property      string Name {get;}\nWorkingSet  Property      long WorkingSet64 {get;}\n... (70+ membres)',
                  'Get-Process | Select-Object Name, Id, CPU, WorkingSet': 'Name             Id     CPU WorkingSet\n----             --     --- ----------\nChrome          1234  45.23  524288000\nexplorer         892   2.10   98304000\npowershell      4567   1.05   65536000\nwinlogon         512   0.01   12345678',
                  'Get-Process -Name chrome | Select-Object -ExpandProperty CPU': '45.23',
                  '(Get-Date).DayOfWeek': 'Saturday',
                  '(Get-Date).AddDays(30)': 'lundi 1 avril 2024 10:30:00',
                  '"Bonjour".ToUpper()': 'BONJOUR',
                  '"  texte avec espaces  ".Trim()': 'texte avec espaces',
                  'help': 'Commandes : Get-Process | Get-Member, Get-Process | Select-Object Name, Id, CPU, WorkingSet, Get-Process -Name chrome | Select-Object -ExpandProperty CPU, (Get-Date).DayOfWeek, (Get-Date).AddDays(30), "Bonjour".ToUpper(), "  texte avec espaces  ".Trim()'
                },
                validation: ['Get-Process | Get-Member', 'Get-Process | Select-Object Name, Id, CPU, WorkingSet'],
                indices: [
                  'Get-Member (alias gm) révèle toutes les propriétés et méthodes disponibles sur un objet. C\'est le réflexe n°1 pour explorer un objet inconnu.',
                  'Accédez aux méthodes avec des parenthèses : "texte".ToUpper(). Accédez aux propriétés avec un point : (Get-Date).Year.'
                ],
                solution: ['Get-Process | Get-Member', 'Get-Process | Select-Object Name, Id, CPU, WorkingSet', '(Get-Date).DayOfWeek', '"Bonjour".ToUpper()']
              }
            },
            {
              id: 'cas-psinit-004',
              titre: 'Comprendre le pipeline d\'objets',
              difficulte: 'moyen',
              format: 'arbre',
              objectif: 'Identifier comment les objets transitent dans le pipeline PowerShell et pourquoi cela diffère de bash.',
              contexte: 'Un administrateur venant de Linux a du mal à comprendre le pipeline PowerShell. Vous l\'aidez à clarifier les concepts.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Il exécute : Get-Process | grep "chrome". Quelle erreur obtient-il ?', choix: [{ texte: 'grep n\'est pas reconnu comme commande PowerShell', suite: 'n2' }, { texte: 'La commande fonctionne car PowerShell supporte les commandes Linux', suite: 'n3' }, { texte: 'grep filtre bien les processus mais affiche du texte brut', suite: 'n4' }] },
                  n2: { question: 'Quelle est l\'équivalent PowerShell de grep pour filtrer des objets ?', choix: [{ texte: 'Where-Object (alias where ou ?) — filtre les objets par propriété', suite: 'n5' }, { texte: 'Select-Object — sélectionne des colonnes', suite: 'n6' }] },
                  n3: { solution: true, correct: false, texte: 'grep n\'existe pas nativement dans PowerShell Windows', explication: 'grep est une commande Unix/Linux. Dans PowerShell standard, elle n\'existe pas. L\'équivalent est Where-Object ou Select-String. PowerShell Core sur Linux peut coexister avec les outils Unix, mais pas dans PowerShell Windows standard.' },
                  n4: { solution: true, correct: false, texte: 'grep filtre du texte, pas des objets — résultat inattendu', explication: 'Même si grep existait, il traiterait la représentation texte de l\'objet, pas ses propriétés. PowerShell travaille avec des objets : utilisez Where-Object {$_.Name -like "*chrome*"} pour filtrer par propriété.' },
                  n5: { solution: true, correct: true, texte: 'Where-Object {$_.Name -like "*chrome*"}', explication: 'Where-Object filtre les objets selon leurs propriétés. $_ représente l\'objet courant dans le pipeline. -like fait une comparaison avec wildcards. Exemple complet : Get-Process | Where-Object {$_.CPU -gt 10}.' },
                  n6: { solution: true, correct: false, texte: 'Select-Object choisit des propriétés, ne filtre pas les lignes', explication: 'Select-Object est l\'équivalent de cut/awk — il choisit quelles colonnes/propriétés afficher. Pour filtrer des lignes (comme grep), utilisez Where-Object. Les deux se combinent souvent : Get-Process | Where-Object {$_.CPU -gt 5} | Select-Object Name, CPU.' }
                }
              }
            }
          ]
        },
        {
          id: 'ps-init-m03',
          titre: 'Manipulation des objets',
          cas: [
            {
              id: 'cas-psinit-005',
              titre: 'Filtrer, trier et exporter des objets',
              difficulte: 'moyen',
              format: 'terminal',
              objectif: 'Utiliser Where-Object, Sort-Object, Group-Object et Export-Csv pour manipuler des collections d\'objets.',
              contexte: 'Vous devez générer un rapport sur les services Windows : lister les services arrêtés, les trier et les exporter en CSV.',
              contenu: {
                prompt: 'PS C:\\> ',
                commandes: {
                  'Get-Service | Where-Object {$_.Status -eq "Stopped"} | Select-Object Name, Status | Sort-Object Name': 'Name                    Status\n----                    ------\nAJRouter               Stopped\nALG                    Stopped\nAppIDSvc               Stopped\nbthserv                Stopped\n... (nombreux services arrêtés)',
                  'Get-Service | Group-Object Status': 'Count Name     Group\n----- ----     -----\n  186 Stopped  {AJRouter, ALG, AppIDSvc...}\n   72 Running  {AudioEndpointBuilder, BFE...}',
                  'Get-Service | Where-Object {$_.Status -eq "Stopped"} | Export-Csv C:\\Temp\\services_stopped.csv -NoTypeInformation': '',
                  'Import-Csv C:\\Temp\\services_stopped.csv | Select-Object -First 3': 'Name      Status\n----      ------\nAJRouter  Stopped\nALG       Stopped\nAppIDSvc  Stopped',
                  'Get-Process | Sort-Object CPU -Descending | Select-Object -First 5 Name, CPU, Id': 'Name          CPU    Id\n----          ---    --\nChrome      145.2  1234\nFirefox      52.1  2345\npowershell   12.3  4567\nExplorer      8.9   892\nTeams         6.1  3456',
                  'help': 'Commandes : Get-Service | Where-Object {$_.Status -eq "Stopped"} | Select-Object Name, Status | Sort-Object Name, Get-Service | Group-Object Status, Get-Service | Where-Object {$_.Status -eq "Stopped"} | Export-Csv C:\\Temp\\services_stopped.csv -NoTypeInformation, Get-Process | Sort-Object CPU -Descending | Select-Object -First 5 Name, CPU, Id'
                },
                validation: ['Get-Service | Where-Object {$_.Status -eq "Stopped"} | Select-Object Name, Status | Sort-Object Name', 'Get-Service | Where-Object {$_.Status -eq "Stopped"} | Export-Csv C:\\Temp\\services_stopped.csv -NoTypeInformation'],
                indices: [
                  'Le pipeline PS enchaîne : Where-Object (filtre) → Select-Object (colonnes) → Sort-Object (tri) → Export-Csv (export).',
                  'Dans Where-Object, $_ représente l\'objet courant. Les opérateurs de comparaison PS : -eq, -ne, -gt, -lt, -like, -match.'
                ],
                solution: ['Get-Service | Where-Object {$_.Status -eq "Stopped"} | Select-Object Name, Status | Sort-Object Name', 'Get-Service | Group-Object Status', 'Get-Service | Where-Object {$_.Status -eq "Stopped"} | Export-Csv C:\\Temp\\services_stopped.csv -NoTypeInformation']
              }
            },
            {
              id: 'cas-psinit-006',
              titre: 'Choisir la bonne cmdlet de manipulation d\'objets',
              difficulte: 'moyen',
              format: 'scenario',
              objectif: 'Sélectionner Where-Object, Select-Object, Sort-Object ou Group-Object selon le besoin.',
              contexte: 'Vous construisez une commande PowerShell pour analyser les journaux d\'événements. Choisissez les bonnes cmdlets.',
              contenu: {
                etapes: [
                  {
                    description: 'Vous voulez n\'afficher que les propriétés TimeCreated, Id et Message des événements. Quelle cmdlet utiliser ?',
                    choix: [
                      { texte: 'Select-Object TimeCreated, Id, Message', correct: true, feedback: 'Correct ! Select-Object choisit quelles propriétés (colonnes) afficher. Analogue à SELECT en SQL ou cut/awk en bash. Il peut aussi créer des propriétés calculées avec @{Name="..."; Expression={...}}.' },
                      { texte: 'Where-Object {$_.TimeCreated, $_.Id, $_.Message}', correct: false, feedback: 'Where-Object filtre les objets (lignes), il ne sélectionne pas des propriétés (colonnes). Utilisez Select-Object pour choisir les colonnes à afficher.' },
                      { texte: 'Sort-Object TimeCreated, Id, Message', correct: false, feedback: 'Sort-Object trie les objets selon les propriétés indiquées. Pour afficher uniquement certaines propriétés, utilisez Select-Object.' }
                    ]
                  },
                  {
                    description: 'Vous voulez connaître le nombre d\'événements par niveau (Error, Warning, Information). Quelle cmdlet utiliser ?',
                    choix: [
                      { texte: 'Group-Object LevelDisplayName', correct: true, feedback: 'Parfait ! Group-Object regroupe les objets par la valeur d\'une propriété et compte les occurrences. Résultat : Count + Name + Group. Analogue à GROUP BY en SQL.' },
                      { texte: 'Sort-Object LevelDisplayName', correct: false, feedback: 'Sort-Object trie les objets mais ne les regroupe pas. Vous obtiendrez la liste triée mais pas les comptages par niveau. Utilisez Group-Object pour obtenir des totaux par catégorie.' },
                      { texte: 'Where-Object {$_.LevelDisplayName}', correct: false, feedback: 'Where-Object filtre les objets selon une condition. Pour compter par catégorie, utilisez Group-Object LevelDisplayName. Le résultat donnera : 15 Error, 42 Warning, 1823 Information.' }
                    ]
                  },
                  {
                    description: 'Comment afficher uniquement les 10 événements les plus récents, triés du plus récent au plus ancien ?',
                    choix: [
                      { texte: 'Sort-Object TimeCreated -Descending | Select-Object -First 10', correct: true, feedback: 'Correct ! Sort-Object ... -Descending trie du plus grand au plus petit (ici du plus récent au plus ancien). Select-Object -First 10 garde uniquement les 10 premiers résultats.' },
                      { texte: 'Select-Object -Last 10 | Sort-Object TimeCreated', correct: false, feedback: 'Problème d\'ordre : Select-Object -Last 10 prend les 10 derniers de la liste non triée. Triez d\'abord (-Descending), puis prenez les -First 10 pour avoir les 10 plus récents.' },
                      { texte: 'Where-Object {$_.Count -le 10}', correct: false, feedback: 'Incorrecte. Les événements n\'ont pas de propriété Count pour se limiter aux 10 premiers. Utilisez Sort-Object -Descending puis Select-Object -First 10.' }
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'ps-init-m04',
          titre: 'Structures et variables',
          cas: [
            {
              id: 'cas-psinit-007',
              titre: 'Variables, types et structures de contrôle',
              difficulte: 'moyen',
              format: 'terminal',
              objectif: 'Déclarer des variables typées, utiliser if/else et foreach en PowerShell.',
              contexte: 'Vous écrivez un script qui vérifie l\'espace disque de plusieurs lecteurs et affiche une alerte selon le niveau d\'utilisation.',
              contenu: {
                prompt: 'PS C:\\> ',
                commandes: {
                  '$seuil = 80': '',
                  '$lecteur = "C:"': '',
                  '[int]$annee = 2024': '',
                  '[string]$message = "Bonjour"': '',
                  '$disque = Get-PSDrive C | Select-Object -ExpandProperty Used': '',
                  '$disques = Get-PSDrive -PSProvider FileSystem': '',
                  'foreach ($d in $disques) { Write-Host "$($d.Name): $($d.Used) octets utilisés" }': 'C: 42949672960 octets utilisés\nD: 107374182400 octets utilisés',
                  'if ($seuil -gt 75) { Write-Host "Seuil élevé : $seuil%" } elseif ($seuil -gt 50) { Write-Host "Seuil modéré" } else { Write-Host "Seuil bas" }': 'Seuil élevé : 80%',
                  '$liste = @("alice", "bob", "charlie")': '',
                  'foreach ($user in $liste) { Write-Host "Utilisateur : $user" }': 'Utilisateur : alice\nUtilisateur : bob\nUtilisateur : charlie',
                  'help': 'Commandes : $seuil = 80, [int]$annee = 2024, $disques = Get-PSDrive -PSProvider FileSystem, foreach ($d in $disques) { Write-Host "$($d.Name): $($d.Used) octets utilisés" }, if ($seuil -gt 75) { ... }, $liste = @("alice","bob","charlie"), foreach ($user in $liste) { ... }'
                },
                validation: ['$seuil = 80', 'foreach ($d in $disques) { Write-Host "$($d.Name): $($d.Used) octets utilisés" }'],
                indices: [
                  'En PowerShell, les variables commencent par $. Vous pouvez typer : [int]$var, [string]$var, [bool]$var. Les tableaux : $liste = @("a","b","c").',
                  'Dans les chaînes avec "", utilisez $() pour les expressions : "Valeur : $($obj.Propriete)".'
                ],
                solution: ['$seuil = 80', '$disques = Get-PSDrive -PSProvider FileSystem', 'foreach ($d in $disques) { Write-Host "$($d.Name): $($d.Used) octets utilisés" }', 'if ($seuil -gt 75) { Write-Host "Seuil élevé : $seuil%" } elseif ($seuil -gt 50) { Write-Host "Seuil modéré" } else { Write-Host "Seuil bas" }']
              }
            },
            {
              id: 'cas-psinit-008',
              titre: 'Diagnostiquer des erreurs de typage et de portée',
              difficulte: 'moyen',
              format: 'arbre',
              objectif: 'Identifier les erreurs courantes liées aux variables et types en PowerShell.',
              contexte: 'Un script PowerShell produit des résultats inattendus à cause de problèmes de types ou de portée de variables.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Quel comportement inattendu observez-vous ?', choix: [{ texte: '"10" + 5 donne 105 au lieu de 15', suite: 'n2' }, { texte: 'Une variable modifiée dans une fonction n\'est pas modifiée hors de la fonction', suite: 'n3' }, { texte: '$null -eq 0 retourne True de façon inattendue', suite: 'n4' }] },
                  n2: { solution: true, correct: true, texte: 'Concaténation de chaînes au lieu d\'addition numérique', explication: '"10" est une chaîne string. L\'opérateur + avec une chaîne en premier opérande fait de la concaténation. Corrigez : [int]"10" + 5 = 15, ou [int]$var + 5. PowerShell fait de la coercition de type selon le type du premier opérande.' },
                  n3: { question: 'La variable a-t-elle été déclarée avec $script: ou $global: ?', choix: [{ texte: 'Non, juste $maVariable sans préfixe de portée', suite: 'n5' }, { texte: 'Oui, $script:maVariable', suite: 'n6' }] },
                  n4: { solution: true, correct: true, texte: 'En PS, $null -eq 0 est False — vérifiez l\'ordre de comparaison', explication: 'En PowerShell, l\'ordre compte : $null -eq 0 est False, mais 0 -eq $null est aussi False. Par contre, $null -eq "" est False. Attention : [bool]$null vaut $False et [int]$null vaut 0, ce qui peut créer des confusions dans les conditions.' },
                  n5: { solution: true, correct: true, texte: 'Portée locale par défaut — utiliser $script: ou return', explication: 'Dans une fonction PS, les variables sont locales par défaut (contrairement à bash). Pour partager : utilisez $script:variable (portée script), $global:variable (portée globale), ou retournez la valeur avec return $maVariable.' },
                  n6: { solution: true, correct: true, texte: 'Vérifier si la fonction modifie bien la portée $script:', explication: 'Si $script:maVariable est utilisé correctement, la variable devrait être visible à la portée script. Vérifiez que vous lisez bien $script:maVariable hors de la fonction et non $maVariable (qui serait une variable locale différente).' }
                }
              }
            }
          ]
        },
        {
          id: 'ps-init-m05',
          titre: 'Réalisation d\'un script',
          cas: [
            {
              id: 'cas-psinit-009',
              titre: 'Écrire un script PowerShell complet avec paramètres',
              difficulte: 'difficile',
              format: 'terminal',
              objectif: 'Créer un script .ps1 avec un bloc param(), la gestion d\'erreurs et la journalisation.',
              contexte: 'Vous créez un script de vérification de connectivité réseau qui accepte une liste de serveurs en paramètre et génère un rapport.',
              contenu: {
                prompt: 'PS C:\\Scripts> ',
                commandes: {
                  'New-Item -Path "C:\\Scripts\\Test-Connectivity.ps1" -ItemType File': '    Répertoire : C:\\Scripts\nMode  LastWriteTime    Length Name\n----  -------------    ------ ----\n-a---  02/03/2024 10:30      0 Test-Connectivity.ps1',
                  'notepad C:\\Scripts\\Test-Connectivity.ps1': '[Ouverture de Notepad]\n[Contenu à écrire dans le script :]',
                  'Get-Content C:\\Scripts\\Test-Connectivity.ps1': '[param block]\nparam(\n    [Parameter(Mandatory=$true)]\n    [string[]]$Serveurs,\n    [int]$Timeout = 1000\n)\n\nforeach ($serveur in $Serveurs) {\n    $result = Test-Connection -ComputerName $serveur -Count 1 -Quiet -TimeoutSeconds 1\n    if ($result) {\n        Write-Host "[OK] $serveur est joignable" -ForegroundColor Green\n    } else {\n        Write-Host "[FAIL] $serveur est injoignable" -ForegroundColor Red\n    }\n}',
                  '.\\Test-Connectivity.ps1 -Serveurs "192.168.1.1","8.8.8.8","10.0.0.99"': '[OK] 192.168.1.1 est joignable\n[OK] 8.8.8.8 est joignable\n[FAIL] 10.0.0.99 est injoignable',
                  'Get-Help .\\Test-Connectivity.ps1': 'NAME\n    C:\\Scripts\\Test-Connectivity.ps1\nPARAMETERS\n    -Serveurs <String[]> (obligatoire)\n    -Timeout <Int32> (défaut : 1000)',
                  '.\\Test-Connectivity.ps1': 'cmdlet Test-Connectivity.ps1 at command pipeline position 1\nSupply values for the following parameters:\nServeurs[0]:',
                  'help': 'Commandes : New-Item -Path "C:\\Scripts\\Test-Connectivity.ps1" -ItemType File, Get-Content C:\\Scripts\\Test-Connectivity.ps1, .\\Test-Connectivity.ps1 -Serveurs "192.168.1.1","8.8.8.8","10.0.0.99", Get-Help .\\Test-Connectivity.ps1, .\\Test-Connectivity.ps1'
                },
                validation: ['.\\Test-Connectivity.ps1 -Serveurs "192.168.1.1","8.8.8.8","10.0.0.99"'],
                indices: [
                  'Le bloc param() en haut du script déclare les paramètres. [Parameter(Mandatory=$true)] rend un paramètre obligatoire — PS demandera la valeur si absente.',
                  'Appelez le script avec les paramètres nommés : .\\Script.ps1 -NomParam valeur. Les tableaux : -Param "val1","val2".'
                ],
                solution: ['Get-Content C:\\Scripts\\Test-Connectivity.ps1', '.\\Test-Connectivity.ps1 -Serveurs "192.168.1.1","8.8.8.8","10.0.0.99"', 'Get-Help .\\Test-Connectivity.ps1']
              }
            },
            {
              id: 'cas-psinit-010',
              titre: 'Appliquer les bonnes pratiques PowerShell',
              difficulte: 'moyen',
              format: 'scenario',
              objectif: 'Identifier et appliquer les bonnes pratiques pour écrire des scripts PS robustes et maintenables.',
              contexte: 'Vous révisez un script PowerShell avant de le déployer en production. Plusieurs points méritent attention.',
              contenu: {
                etapes: [
                  {
                    description: 'Le script utilise Write-Host pour tous les messages. Quel est l\'inconvénient de Write-Host ?',
                    choix: [
                      { texte: 'Write-Host écrit directement dans la console et ne peut pas être redirigé ou capturé dans un pipeline', correct: true, feedback: 'Correct ! Write-Host court-circuite le pipeline PowerShell. Préférez Write-Output pour les données (redirigeable), Write-Verbose pour les messages de debug (contrôlable avec -Verbose), Write-Error pour les erreurs.' },
                      { texte: 'Write-Host ne fonctionne pas dans PowerShell 5 et versions récentes', correct: false, feedback: 'Faux. Write-Host fonctionne dans toutes les versions de PowerShell. Le problème est qu\'il écrit dans le flux "information" qui ne peut pas être redirigé avec > ou capturé dans une variable.' },
                      { texte: 'Write-Host est plus lent que Write-Output', correct: false, feedback: 'La performance est négligeable. Le vrai problème est fonctionnel : Write-Host ne peut pas être redirigé, ce qui brise la philosophie du pipeline PowerShell.' }
                    ]
                  },
                  {
                    description: 'Le script contient : $fichiers = Get-ChildItem C:\\Data. Que se passe-t-il si C:\\Data n\'existe pas ?',
                    choix: [
                      { texte: 'PowerShell génère une erreur non fatale et $fichiers vaut $null — le script continue silencieusement', correct: false, feedback: 'Par défaut, Get-ChildItem génère une erreur (Get-ChildItem : Cannot find path) mais le script continue. Selon $ErrorActionPreference (défaut: Continue), l\'erreur est affichée mais non fatale.' },
                      { texte: 'Selon $ErrorActionPreference, l\'erreur peut être silencieuse, affichée ou fatale', correct: true, feedback: 'Exact ! $ErrorActionPreference contrôle le comportement : Continue (affiche et continue), Stop (arrête le script), SilentlyContinue (ignore silencieusement). En production : utilisez -ErrorAction Stop ou testez avec Test-Path avant.' },
                      { texte: 'PowerShell crée automatiquement C:\\Data s\'il n\'existe pas', correct: false, feedback: 'Non. Get-ChildItem ne crée pas de répertoire. Pour créer un répertoire s\'il n\'existe pas, utilisez New-Item -ItemType Directory ou (conditionnellement) : if (!(Test-Path C:\\Data)) { New-Item... }' }
                    ]
                  },
                  {
                    description: 'Comment tester un script PowerShell sans l\'exécuter réellement (simulation) ?',
                    choix: [
                      { texte: 'Ajouter le paramètre -WhatIf aux cmdlets qui modifient le système', correct: true, feedback: 'Excellent ! -WhatIf est un paramètre standard des cmdlets qui modifient des données (Remove-Item, Stop-Service, etc.). Il affiche ce qui se passerait sans effectuer de modification. À activer lors du développement : $WhatIfPreference = $true.' },
                      { texte: 'Exécuter le script dans un VM dédiée aux tests', correct: false, feedback: 'Bonne pratique de sécurité mais ce n\'est pas ce que permet -WhatIf. -WhatIf permet de simuler l\'exécution dans le même environnement, sur les mêmes objets cibles, sans modifier quoi que ce soit.' },
                      { texte: 'Renommer le script en .txt pour qu\'il ne s\'exécute pas', correct: false, feedback: 'Non. Renommer en .txt empêche l\'exécution mais ne permet pas de tester le comportement. Utilisez -WhatIf pour simuler l\'exécution avec les vraies données sans les modifier.' }
                    ]
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 'initiation-powershell',
      titre: 'Initiation à PowerShell',
      emoji: '💻',
      modules: [
        {
          id: 'ps-m01',
          titre: 'Présentation du langage PowerShell',
          cas: [
            {
              id: 'cas-ps-001',
              titre: 'Administrer Windows Server avec PowerShell',
              difficulte: 'facile',
              format: 'terminal',
              objectif: 'Utiliser PowerShell pour obtenir des informations système sur un serveur Windows.',
              contexte: 'Vous devez collecter des informations sur un serveur Windows Server 2022 : version OS, RAM, disques et services actifs.',
              contenu: {
                prompt: 'PS C:\\> ',
                commandes: {
                  'Get-ComputerInfo | Select-Object CsName, OsName, OsVersion, CsTotalPhysicalMemory': 'CsName                 : SRV-AD01\nOsName                 : Microsoft Windows Server 2022 Standard\nOsVersion              : 10.0.20348\nCsTotalPhysicalMemory  : 8589934592',
                  'Get-PSDrive -PSProvider FileSystem | Select-Object Name, Used, Free': 'Name  Used          Free\n----  ----          ----\nC     42949672960   64424509440\nD     107374182400  429496729600',
                  'Get-Service | Where-Object {$_.Status -eq "Running"} | Measure-Object': 'Count    : 72\nAverage  :\nSum      :\nMaximum  :\nMinimum  :',
                  'Get-WindowsFeature | Where-Object {$_.Installed -eq $true} | Select-Object Name, DisplayName': 'Name                          DisplayName\n----                          -----------\nAD-Domain-Services            Services AD DS\nDNS                           Serveur DNS\nFile-Services                 Services de fichiers\nRSAT-AD-Tools                 Outils AD',
                  'Get-EventLog -LogName System -Newest 5 -EntryType Error': 'Index Time          EntryType  Source       Message\n----- ----          ---------  ------       -------\n 1842 03/02 02:15   Error      Disk         Le périphérique \\Device\\Harddisk0 a un...\n 1839 03/02 01:02   Error      Service Ctrl Le service Print Spooler s\'est arrêté de manière',
                  'help': 'Commandes : Get-ComputerInfo | Select-Object CsName,OsName,OsVersion,CsTotalPhysicalMemory, Get-PSDrive -PSProvider FileSystem | Select-Object Name,Used,Free, Get-Service | Where-Object {$_.Status -eq "Running"} | Measure-Object, Get-WindowsFeature | Where-Object {$_.Installed -eq $true} | Select-Object Name,DisplayName, Get-EventLog -LogName System -Newest 5 -EntryType Error'
                },
                validation: ['Get-ComputerInfo | Select-Object CsName, OsName, OsVersion, CsTotalPhysicalMemory', 'Get-WindowsFeature | Where-Object {$_.Installed -eq $true} | Select-Object Name, DisplayName'],
                indices: [
                  'Get-ComputerInfo retourne un objet riche sur le système. Get-WindowsFeature liste les rôles/fonctionnalités Windows Server.',
                  'Get-EventLog -LogName System -Newest N -EntryType Error filtre les erreurs récentes du journal système.'
                ],
                solution: ['Get-ComputerInfo | Select-Object CsName, OsName, OsVersion, CsTotalPhysicalMemory', 'Get-PSDrive -PSProvider FileSystem | Select-Object Name, Used, Free', 'Get-WindowsFeature | Where-Object {$_.Installed -eq $true} | Select-Object Name, DisplayName']
              }
            },
            {
              id: 'cas-ps-002',
              titre: 'Choisir entre PowerShell et GUI pour une tâche d\'administration',
              difficulte: 'facile',
              format: 'scenario',
              objectif: 'Identifier dans quels cas PowerShell est préférable à l\'interface graphique pour l\'administration Windows.',
              contexte: 'Vous êtes administrateur système. Pour chaque tâche, déterminez si PowerShell ou l\'interface graphique (GUI) est plus adapté.',
              contenu: {
                etapes: [
                  {
                    description: 'Vous devez créer 200 comptes utilisateurs dans Active Directory pour les nouveaux employés. Quelle approche choisir ?',
                    choix: [
                      { texte: 'PowerShell avec Import-Csv et New-ADUser en boucle foreach', correct: true, feedback: 'Correct ! PowerShell est incontournable pour les tâches répétitives en masse. Un script lit un CSV et crée les 200 comptes en quelques secondes. Via l\'interface graphique, cela prendrait des heures avec un risque élevé d\'erreurs.' },
                      { texte: 'Interface graphique ADUC (Active Directory Users and Computers) — créer chaque compte manuellement', correct: false, feedback: 'Impraticable pour 200 comptes. Chaque compte nécessite plusieurs clics et saisies. Risque élevé d\'erreurs de frappe. PowerShell avec un CSV est la seule approche raisonnable à cette échelle.' },
                      { texte: 'Demander à chaque employé de créer son propre compte', correct: false, feedback: 'Impossible et non sécurisé. La création de comptes AD est réservée aux administrateurs. C\'est justement pour automatiser ce type de tâche que PowerShell (avec New-ADUser) est précieux.' }
                    ]
                  },
                  {
                    description: 'Vous installez un nouveau rôle Windows Server pour la première fois et souhaitez voir toutes les options disponibles. Quelle approche est la plus efficace ?',
                    choix: [
                      { texte: 'Gestionnaire de serveur (GUI) — l\'assistant d\'installation est plus clair pour une première fois', correct: true, feedback: 'Pour une première installation avec exploration des options, le gestionnaire graphique est plus intuitif : il explique chaque option et guide pas à pas. Une fois maîtrisé, reproductibilisez avec Install-WindowsFeature.' },
                      { texte: 'PowerShell Install-WindowsFeature sans lire la documentation', correct: false, feedback: 'Sur un serveur de production, installer un rôle sans comprendre les options peut avoir des conséquences imprévues. Pour une première fois, la GUI guide mieux. Ensuite : scriptez avec Install-WindowsFeature pour la reproductibilité.' },
                      { texte: 'Contacter le support Microsoft pour chaque installation', correct: false, feedback: 'Inutile pour des tâches standard. La GUI et la documentation PowerShell (Get-Help Install-WindowsFeature -Full) sont suffisantes. Le support est réservé aux problèmes techniques non résolus.' }
                    ]
                  },
                  {
                    description: 'Vous devez appliquer la même configuration de pare-feu sur 50 serveurs identiques. Quelle approche choisir ?',
                    choix: [
                      { texte: 'PowerShell Remoting : Invoke-Command -ComputerName (liste) -ScriptBlock { New-NetFirewallRule... }', correct: true, feedback: 'Parfait ! PowerShell Remoting permet d\'exécuter des commandes sur plusieurs machines simultanément. Une seule commande configure les 50 serveurs en parallèle. Réproductible et auditable.' },
                      { texte: 'Se connecter manuellement en RDP sur chacun des 50 serveurs', correct: false, feedback: '50 connexions RDP manuelles = plusieurs heures de travail avec risque d\'oubli ou d\'erreur. PowerShell Remoting (ou des outils comme Ansible/GPO) est la bonne réponse pour l\'administration en masse.' },
                      { texte: 'Configurer un serveur manuellement puis cloner son image 50 fois', correct: false, feedback: 'Le clonage peut fonctionner pour les nouveaux déploiements, mais ne s\'applique pas à des serveurs déjà en production. PowerShell Remoting est la solution pour configurer des serveurs existants en masse.' }
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'ps-m02',
          titre: 'PowerShell, langage objet',
          cas: [
            {
              id: 'cas-ps-003',
              titre: 'Manipuler des objets Active Directory',
              difficulte: 'moyen',
              format: 'terminal',
              objectif: 'Utiliser le module ActiveDirectory pour lire et modifier des objets AD via PowerShell.',
              contexte: 'Vous administrez un domaine Active Directory. Vous devez lister les utilisateurs inactifs et les désactiver via PowerShell.',
              contenu: {
                prompt: 'PS C:\\> ',
                commandes: {
                  'Import-Module ActiveDirectory': '',
                  'Get-ADUser -Filter * | Select-Object Name, Enabled, LastLogonDate | Sort-Object LastLogonDate | Select-Object -First 5': 'Name              Enabled LastLogonDate\n----              ------- -------------\ntest.compte       True    01/01/2023 09:15\nancien.user       True    15/03/2023 14:22\nstagiaire2023     True    30/06/2023 08:00\nalice.martin      True    15/01/2024 09:30\nbob.dupont        True    01/02/2024 10:00',
                  'Get-ADUser -Filter {Enabled -eq $true} -Properties LastLogonDate | Where-Object {$_.LastLogonDate -lt (Get-Date).AddDays(-90)} | Select-Object Name, LastLogonDate': 'Name           LastLogonDate\n----           -------------\ntest.compte    01/01/2023 09:15:22\nancien.user    15/03/2023 14:22:00\nstagiaire2023  30/06/2023 08:00:00',
                  'Get-ADUser "alice.martin" | Get-Member | Where-Object {$_.MemberType -eq "Property"} | Select-Object Name': 'Name\n----\nDistinguishedName\nEnabled\nGivenName\nName\nObjectClass\nSamAccountName\nSurname\nUserPrincipalName\n...',
                  'Disable-ADAccount -Identity "test.compte" -WhatIf': 'Opération : "Disable" sur la cible "CN=test.compte,OU=Users,DC=entreprise,DC=local".',
                  'Get-ADUser -Filter {Enabled -eq $true} -Properties LastLogonDate | Where-Object {$_.LastLogonDate -lt (Get-Date).AddDays(-90)} | Disable-ADAccount -WhatIf': 'Opération : "Disable" sur la cible "CN=test.compte..."\nOpération : "Disable" sur la cible "CN=ancien.user..."\nOpération : "Disable" sur la cible "CN=stagiaire2023..."',
                  'help': 'Commandes : Import-Module ActiveDirectory, Get-ADUser -Filter * | Select-Object Name,Enabled,LastLogonDate | Sort-Object LastLogonDate | Select-Object -First 5, Get-ADUser -Filter {Enabled -eq $true} -Properties LastLogonDate | Where-Object {$_.LastLogonDate -lt (Get-Date).AddDays(-90)} | Select-Object Name,LastLogonDate, Get-ADUser "alice.martin" | Get-Member | Where-Object {$_.MemberType -eq "Property"} | Select-Object Name, Disable-ADAccount -Identity "test.compte" -WhatIf'
                },
                validation: ['Get-ADUser -Filter {Enabled -eq $true} -Properties LastLogonDate | Where-Object {$_.LastLogonDate -lt (Get-Date).AddDays(-90)} | Select-Object Name, LastLogonDate', 'Disable-ADAccount -Identity "test.compte" -WhatIf'],
                indices: [
                  'Le module ActiveDirectory s\'importe avec Import-Module ActiveDirectory. Les propriétés comme LastLogonDate ne sont pas retournées par défaut : utilisez -Properties LastLogonDate.',
                  'Testez toujours les commandes destructives avec -WhatIf avant de les exécuter réellement.'
                ],
                solution: ['Import-Module ActiveDirectory', 'Get-ADUser -Filter {Enabled -eq $true} -Properties LastLogonDate | Where-Object {$_.LastLogonDate -lt (Get-Date).AddDays(-90)} | Select-Object Name, LastLogonDate', 'Disable-ADAccount -Identity "test.compte" -WhatIf']
              }
            },
            {
              id: 'cas-ps-004',
              titre: 'Comprendre les objets personnalisés et PSCustomObject',
              difficulte: 'moyen',
              format: 'arbre',
              objectif: 'Identifier quand et comment créer des objets personnalisés pour structurer des données.',
              contexte: 'Vous devez créer un rapport combinant des données de plusieurs sources. PowerShell permet de créer des objets sur mesure.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Vous combinez des infos de Get-ADUser et Get-Process. Comment créer un objet structuré ?', choix: [{ texte: '[PSCustomObject]@{Nom="alice"; CPU=45.2; Statut="Actif"}', suite: 'n2' }, { texte: 'Write-Output "alice,45.2,Actif" et parser le texte ensuite', suite: 'n3' }, { texte: 'Créer un fichier CSV manuellement puis Import-Csv', suite: 'n4' }] },
                  n2: { question: 'Comment ajouter une propriété calculée à un objet existant ?', choix: [{ texte: 'Select-Object *, @{Name="TailleGo"; Expression={$_.Size/1GB}}', suite: 'n5' }, { texte: 'Modifier directement la classe .NET de l\'objet', suite: 'n6' }] },
                  n3: { solution: true, correct: false, texte: 'Écriture en texte brut — perd les avantages des objets PS', explication: 'Stocker les données en texte brut oblige à les re-parser pour chaque utilisation. [PSCustomObject] crée un objet structuré avec des propriétés directement accessibles : $obj.Nom, $obj.CPU. Le résultat peut être pipeliné, filtré, exporté en CSV.' },
                  n4: { solution: true, correct: false, texte: 'Contournement valide mais moins efficace qu\'un PSCustomObject', explication: 'Créer un CSV manuellement puis l\'importer fonctionne mais ajoute une étape inutile. [PSCustomObject] crée directement un objet en mémoire, sans écriture de fichier intermédiaire.' },
                  n5: { solution: true, correct: true, texte: 'Propriété calculée avec @{Name; Expression} dans Select-Object', explication: 'La hashtable @{Name="NomColonne"; Expression={$_ calcul}} crée une propriété calculée à la volée. Exemple : Get-ChildItem | Select-Object Name, @{Name="TailleMo"; Expression={[math]::Round($_.Length/1MB,2)}}.' },
                  n6: { solution: true, correct: false, texte: 'Modifier une classe .NET est complexe et déconseillé', explication: 'Les objets .NET retournés par PS ont des types fixes. Pour ajouter des propriétés, utilisez Select-Object avec des propriétés calculées ou Add-Member : $obj | Add-Member -NotePropertyName "Extra" -NotePropertyValue "valeur".' }
                }
              }
            }
          ]
        },
        {
          id: 'ps-m03',
          titre: 'Manipulation des objets',
          cas: [
            {
              id: 'cas-ps-005',
              titre: 'Traitement en masse d\'objets Active Directory',
              difficulte: 'difficile',
              format: 'terminal',
              objectif: 'Utiliser ForEach-Object et les cmdlets AD pour effectuer des modifications en masse.',
              contexte: 'Vous devez réinitialiser le mot de passe de 3 comptes tests et forcer le changement à la prochaine connexion.',
              contenu: {
                prompt: 'PS C:\\> ',
                commandes: {
                  '$comptes = @("test.user1", "test.user2", "test.user3")': '',
                  '$motdepasse = ConvertTo-SecureString "TSSRpass2024!" -AsPlainText -Force': '',
                  '$comptes | ForEach-Object { Set-ADAccountPassword -Identity $_ -NewPassword $motdepasse -Reset; Set-ADUser -Identity $_ -ChangePasswordAtLogon $true; Write-Host "Réinitialisé : $_" }': 'Réinitialisé : test.user1\nRéinitialisé : test.user2\nRéinitialisé : test.user3',
                  'Get-ADGroupMember "Stagiaires" | Select-Object Name, SamAccountName': 'Name           SamAccountName\n----           --------------\nMartin Alice   alice.martin\nDupont Bob     bob.dupont\nLeger Charlie  charlie.leger',
                  'Get-ADGroupMember "Stagiaires" | ForEach-Object { Disable-ADAccount -Identity $_.SamAccountName -WhatIf }': 'Opération : "Disable" sur "CN=Martin Alice,OU=Stagiaires..."\nOpération : "Disable" sur "CN=Dupont Bob,OU=Stagiaires..."\nOpération : "Disable" sur "CN=Leger Charlie,OU=Stagiaires..."',
                  'Get-ADUser -Filter * -SearchBase "OU=Stagiaires,DC=entreprise,DC=local" | Select-Object Name | Export-Csv C:\\Temp\\stagiaires.csv -NoTypeInformation': '',
                  'help': 'Commandes : $comptes = @(...), $motdepasse = ConvertTo-SecureString ... -AsPlainText -Force, $comptes | ForEach-Object { Set-ADAccountPassword ... }, Get-ADGroupMember "Stagiaires" | Select-Object Name,SamAccountName, Get-ADGroupMember "Stagiaires" | ForEach-Object { Disable-ADAccount ... -WhatIf }'
                },
                validation: ['$comptes | ForEach-Object { Set-ADAccountPassword -Identity $_ -NewPassword $motdepasse -Reset; Set-ADUser -Identity $_ -ChangePasswordAtLogon $true; Write-Host "Réinitialisé : $_" }', 'Get-ADGroupMember "Stagiaires" | ForEach-Object { Disable-ADAccount -Identity $_.SamAccountName -WhatIf }'],
                indices: [
                  'ForEach-Object traite chaque objet du pipeline. $_ représente l\'objet courant. Enchaînez plusieurs commandes avec ; dans le bloc {}.',
                  'ConvertTo-SecureString est obligatoire pour passer un mot de passe en texte clair à Set-ADAccountPassword.'
                ],
                solution: ['$comptes = @("test.user1", "test.user2", "test.user3")', '$motdepasse = ConvertTo-SecureString "TSSRpass2024!" -AsPlainText -Force', '$comptes | ForEach-Object { Set-ADAccountPassword -Identity $_ -NewPassword $motdepasse -Reset; Set-ADUser -Identity $_ -ChangePasswordAtLogon $true; Write-Host "Réinitialisé : $_" }']
              }
            },
            {
              id: 'cas-ps-006',
              titre: 'Diagnostiquer un pipeline cassé',
              difficulte: 'moyen',
              format: 'scenario',
              objectif: 'Identifier pourquoi une chaîne de commandes PowerShell ne produit pas le résultat attendu.',
              contexte: 'Un collègue a écrit une commande PowerShell qui devrait lister les utilisateurs AD désactivés, mais le résultat est vide ou incorrect.',
              contenu: {
                etapes: [
                  {
                    description: 'La commande Get-ADUser -Filter {Enabled -eq "False"} retourne des résultats vides. Pourquoi ?',
                    choix: [
                      { texte: '"False" est une chaîne, pas un booléen — utiliser $false', correct: true, feedback: 'Correct ! Dans le filtre AD, les booléens doivent être $true/$false (sans guillemets). "False" est interprété comme une chaîne ce qui cause un résultat vide ou une erreur. Correct : Get-ADUser -Filter {Enabled -eq $false}.' },
                      { texte: 'Il n\'y a vraiment aucun utilisateur désactivé dans l\'AD', correct: false, feedback: 'Possible mais peu probable. Avant de conclure, vérifiez la syntaxe du filtre. "False" entre guillemets est une chaîne, pas un booléen. Testez avec Get-ADUser -Filter {Enabled -eq $false}.' },
                      { texte: 'Get-ADUser ne peut pas filtrer sur la propriété Enabled', correct: false, feedback: 'Faux. Enabled est une propriété standard filtrable d\'ADUser. Le problème est le type de la valeur : utiliser le booléen $false au lieu de la chaîne "False".' }
                    ]
                  },
                  {
                    description: 'La commande Get-ADUser -Filter * -Properties * est très lente. Comment l\'optimiser ?',
                    choix: [
                      { texte: 'Spécifier uniquement les propriétés nécessaires : -Properties LastLogonDate,Department', correct: true, feedback: 'Correct ! -Properties * charge toutes les propriétés AD pour chaque objet — très coûteux sur un grand annuaire. Spécifiez uniquement ce dont vous avez besoin. Gain de performance significatif sur des domaines avec des milliers d\'utilisateurs.' },
                      { texte: 'Ajouter -ResultSetSize 1000 pour limiter les résultats', correct: false, feedback: 'Limiter les résultats aide, mais le vrai problème est -Properties * qui charge des dizaines de propriétés inutiles par objet. Spécifiez les propriétés requises pour optimiser la requête LDAP envoyée à l\'AD.' },
                      { texte: 'Exécuter la commande sur le contrôleur de domaine directement', correct: false, feedback: 'L\'exécution locale ou distante a peu d\'impact sur ce problème. La cause est la requête LDAP trop large (-Properties *). Spécifiez les propriétés dont vous avez besoin pour réduire le volume de données.' }
                    ]
                  },
                  {
                    description: 'Le pipeline Get-ADUser | Where-Object {$_.LastLogonDate -lt ...} ne filtre pas correctement. Quelle est la cause probable ?',
                    choix: [
                      { texte: 'LastLogonDate n\'est pas chargée par défaut — il faut ajouter -Properties LastLogonDate', correct: true, feedback: 'Exact ! Get-ADUser ne charge que les propriétés de base par défaut. LastLogonDate (comme beaucoup d\'attributs AD) doit être demandée explicitement : Get-ADUser -Filter * -Properties LastLogonDate. Sans ça, $_.LastLogonDate est $null pour tous les objets.' },
                      { texte: 'Where-Object ne peut pas comparer des dates', correct: false, feedback: 'Faux. Where-Object compare parfaitement les dates PowerShell. Le problème est plus probable dans le chargement de la propriété : Get-ADUser ne charge pas LastLogonDate par défaut.' },
                      { texte: 'Il faut utiliser -Filter plutôt que Where-Object pour les dates', correct: false, feedback: '-Filter côté serveur est plus performant mais Where-Object côté client fonctionne aussi. Le vrai problème est que LastLogonDate vaut $null si elle n\'est pas spécifiée dans -Properties.' }
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'ps-m04',
          titre: 'Les structures et variables',
          cas: [
            {
              id: 'cas-ps-007',
              titre: 'Hashtables, tableaux et switch en PowerShell',
              difficulte: 'moyen',
              format: 'terminal',
              objectif: 'Utiliser les hashtables et l\'instruction switch pour structurer des données et des décisions.',
              contexte: 'Vous créez un script qui associe des noms de serveurs à des rôles, et qui affiche un message selon le type de serveur.',
              contenu: {
                prompt: 'PS C:\\> ',
                commandes: {
                  '$serveurs = @{ "SRV-AD01" = "DC"; "SRV-FILE" = "FileServer"; "SRV-WEB" = "IIS" }': '',
                  '$serveurs["SRV-AD01"]': 'DC',
                  '$serveurs.Keys': 'SRV-AD01\nSRV-FILE\nSRV-WEB',
                  '$serveurs.GetEnumerator() | ForEach-Object { Write-Host "$($_.Key) : $($_.Value)" }': 'SRV-AD01 : DC\nSRV-FILE : FileServer\nSRV-WEB : IIS',
                  '$role = "DC"': '',
                  'switch ($role) { "DC" { Write-Host "Contrôleur de domaine" } "FileServer" { Write-Host "Serveur de fichiers" } "IIS" { Write-Host "Serveur web IIS" } default { Write-Host "Rôle inconnu" } }': 'Contrôleur de domaine',
                  '$ports = @(80, 443, 3389, 22)': '',
                  '$ports | ForEach-Object { if ($_ -eq 3389) { Write-Host "Port RDP : $_" } elseif ($_ -in @(80,443)) { Write-Host "Port Web : $_" } }': 'Port Web : 80\nPort Web : 443\nPort RDP : 3389',
                  'help': 'Commandes : $serveurs = @{ "SRV-AD01" = "DC"; ... }, $serveurs["SRV-AD01"], $serveurs.Keys, $serveurs.GetEnumerator() | ForEach-Object { ... }, switch ($role) { ... }, $ports = @(80,443,3389,22), $ports | ForEach-Object { ... }'
                },
                validation: ['$serveurs.GetEnumerator() | ForEach-Object { Write-Host "$($_.Key) : $($_.Value)" }', 'switch ($role) { "DC" { Write-Host "Contrôleur de domaine" } "FileServer" { Write-Host "Serveur de fichiers" } "IIS" { Write-Host "Serveur web IIS" } default { Write-Host "Rôle inconnu" } }'],
                indices: [
                  'Une hashtable @{clé=valeur} permet d\'associer des données. Accès : $ht["clé"] ou $ht.clé. Itération : $ht.GetEnumerator() ou foreach.',
                  'switch est plus lisible qu\'une série de if/elseif pour plusieurs cas possibles d\'une même variable.'
                ],
                solution: ['$serveurs = @{ "SRV-AD01" = "DC"; "SRV-FILE" = "FileServer"; "SRV-WEB" = "IIS" }', '$serveurs.GetEnumerator() | ForEach-Object { Write-Host "$($_.Key) : $($_.Value)" }', 'switch ($role) { "DC" { Write-Host "Contrôleur de domaine" } "FileServer" { Write-Host "Serveur de fichiers" } "IIS" { Write-Host "Serveur web IIS" } default { Write-Host "Rôle inconnu" } }']
              }
            },
            {
              id: 'cas-ps-008',
              titre: 'Choisir la bonne structure de données',
              difficulte: 'moyen',
              format: 'arbre',
              objectif: 'Sélectionner entre tableau, hashtable ou PSCustomObject selon le besoin.',
              contexte: 'Vous structurez les données d\'un script d\'audit. Pour chaque besoin, choisissez la structure adaptée.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Quel type de données devez-vous stocker ?', choix: [{ texte: 'Une liste ordonnée de noms de serveurs à traiter', suite: 'n2' }, { texte: 'Une association clé-valeur : serveur → IP', suite: 'n3' }, { texte: 'Un enregistrement structuré : nom, IP, rôle, statut d\'un serveur', suite: 'n4' }] },
                  n2: { solution: true, correct: true, texte: 'Tableau @() ou ArrayList', explication: 'Pour une liste ordonnée d\'éléments du même type : $serveurs = @("SRV01","SRV02","SRV03"). Pour ajouter dynamiquement : utilisez [System.Collections.ArrayList]. Les tableaux @() sont de taille fixe en PS.' },
                  n3: { solution: true, correct: true, texte: 'Hashtable @{clé = valeur}', explication: 'Pour des associations clé-valeur : $ips = @{"SRV01"="192.168.1.10"; "SRV02"="192.168.1.11"}. Accès rapide par clé : $ips["SRV01"]. Idéal pour les lookup tables et les dictionnaires.' },
                  n4: { question: 'Avez-vous besoin d\'exporter ces données en CSV ou de les pipeliner ?', choix: [{ texte: 'Oui, export CSV et pipeline vers d\'autres cmdlets requis', suite: 'n5' }, { texte: 'Non, usage interne au script uniquement', suite: 'n6' }] },
                  n5: { solution: true, correct: true, texte: '[PSCustomObject] — s\'intègre parfaitement dans le pipeline PS', explication: '[PSCustomObject]@{Nom="SRV01"; IP="192.168.1.10"; Role="DC"; Statut="OK"} crée un objet structuré. Une collection de PSCustomObjects se pipeline vers Export-Csv, Format-Table, Where-Object exactement comme les objets natifs PS.' },
                  n6: { solution: true, correct: true, texte: 'Hashtable ou PSCustomObject selon la complexité', explication: 'Pour un usage purement interne simple : hashtable @{Nom="SRV01"; IP="192.168.1.10"} est suffisant. Pour des données complexes ou si vous pensez les exporter ultérieurement : PSCustomObject est plus flexible.' }
                }
              }
            }
          ]
        },
        {
          id: 'ps-m05',
          titre: 'Réalisation d\'un script',
          cas: [
            {
              id: 'cas-ps-009',
              titre: 'Script de rapport avec gestion d\'erreurs try/catch',
              difficulte: 'difficile',
              format: 'terminal',
              objectif: 'Implémenter la gestion d\'erreurs avec try/catch/finally dans un script PowerShell robuste.',
              contexte: 'Vous créez un script qui interroge plusieurs serveurs et doit gérer proprement les erreurs de connexion.',
              contenu: {
                prompt: 'PS C:\\Scripts> ',
                commandes: {
                  'Get-Content Rapport-Serveurs.ps1': '#Requires -Modules ActiveDirectory\nparam([string[]]$Serveurs = @("SRV01","SRV02","SRV-INEXISTANT"))\n\n$rapport = @()\n\nforeach ($srv in $Serveurs) {\n    try {\n        $info = Get-WmiObject Win32_OperatingSystem -ComputerName $srv -ErrorAction Stop\n        $rapport += [PSCustomObject]@{\n            Serveur = $srv\n            OS      = $info.Caption\n            Statut  = "OK"\n            Erreur  = $null\n        }\n    }\n    catch {\n        $rapport += [PSCustomObject]@{\n            Serveur = $srv\n            OS      = $null\n            Statut  = "ERREUR"\n            Erreur  = $_.Exception.Message\n        }\n        Write-Warning "Impossible de joindre $srv : $($_.Exception.Message)"\n    }\n    finally {\n        Write-Verbose "Traitement terminé pour $srv"\n    }\n}\n\n$rapport | Export-Csv C:\\Temp\\rapport_serveurs.csv -NoTypeInformation\n$rapport | Format-Table -AutoSize',
                  '.\\Rapport-Serveurs.ps1 -Verbose': 'AVERTISSEMENT : Impossible de joindre SRV-INEXISTANT : Le RPC est indisponible.\nVERBOSE: Traitement terminé pour SRV01\nVERBOSE: Traitement terminé pour SRV02\nVERBOSE: Traitement terminé pour SRV-INEXISTANT\n\nServeur        OS                           Statut  Erreur\n-------        --                           ------  ------\nSRV01          Windows Server 2022 Standard OK\nSRV02          Windows Server 2022 Standard OK\nSRV-INEXISTANT                              ERREUR  Le RPC est indisponible.',
                  'help': 'Commandes : Get-Content Rapport-Serveurs.ps1, .\\Rapport-Serveurs.ps1 -Verbose'
                },
                validation: ['.\\Rapport-Serveurs.ps1 -Verbose'],
                indices: [
                  'try { } catch { } finally { } gère les erreurs. $_ dans catch contient l\'objet erreur. $_.Exception.Message donne le message d\'erreur lisible.',
                  '-ErrorAction Stop est nécessaire pour que les erreurs de cmdlet soient capturées par try/catch (sinon elles sont "non-terminantes").'
                ],
                solution: ['Get-Content Rapport-Serveurs.ps1', '.\\Rapport-Serveurs.ps1 -Verbose']
              }
            },
            {
              id: 'cas-ps-010',
              titre: 'Planifier l\'exécution d\'un script PowerShell',
              difficulte: 'moyen',
              format: 'scenario',
              objectif: 'Configurer l\'exécution automatique d\'un script PowerShell via le Planificateur de tâches.',
              contexte: 'Vous devez planifier un script de rapport PowerShell pour qu\'il s\'exécute chaque nuit à 2h et envoie un mail si des erreurs sont détectées.',
              contenu: {
                etapes: [
                  {
                    description: 'Comment planifier un script PS via PowerShell (sans ouvrir l\'interface graphique) ?',
                    choix: [
                      { texte: 'New-ScheduledTaskAction, New-ScheduledTaskTrigger et Register-ScheduledTask', correct: true, feedback: 'Correct ! C\'est la méthode PowerShell native : $action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-File C:\\Scripts\\rapport.ps1" ; $trigger = New-ScheduledTaskTrigger -Daily -At "02:00" ; Register-ScheduledTask -TaskName "Rapport" -Action $action -Trigger $trigger -RunLevel Highest.' },
                      { texte: 'Ajouter une ligne dans C:\\Windows\\System32\\schedule.ini', correct: false, feedback: 'Ce fichier n\'existe pas. Le Planificateur de tâches Windows utilise le service Task Scheduler et des fichiers XML dans C:\\Windows\\System32\\Tasks. Gérez-le avec les cmdlets ScheduledTask* de PowerShell.' },
                      { texte: 'Utiliser at.exe comme sous Windows XP', correct: false, feedback: 'at.exe est déprécié depuis Windows 8/Server 2012. Utilisez les cmdlets PowerShell (Register-ScheduledTask) ou l\'interface Planificateur de tâches. at.exe peut être absent sur les versions récentes.' }
                    ]
                  },
                  {
                    description: 'Le script s\'exécute mais rien ne se passe. Comment vérifier que la tâche planifiée s\'est exécutée et examiner ses erreurs ?',
                    choix: [
                      { texte: 'Get-ScheduledTaskInfo -TaskName "Rapport" et vérifier l\'Observateur d\'événements (Microsoft\\Windows\\TaskScheduler)', correct: true, feedback: 'Exact ! Get-ScheduledTaskInfo donne LastRunTime, LastTaskResult (0 = succès). L\'Observateur d\'événements > Journaux Windows & Applications et services > Microsoft > Windows > TaskScheduler > Operational liste toutes les exécutions avec les détails d\'erreur.' },
                      { texte: 'Attendre le lendemain et voir si le rapport est généré', correct: false, feedback: 'Trop passif. Get-ScheduledTaskInfo donne immédiatement LastRunTime et LastTaskResult. Vous pouvez aussi forcer l\'exécution : Start-ScheduledTask -TaskName "Rapport" pour tester sans attendre.' },
                      { texte: 'Désinstaller et réinstaller la tâche', correct: false, feedback: 'Inutile sans diagnostic préalable. Vérifiez d\'abord Get-ScheduledTaskInfo et l\'Observateur d\'événements. Les causes communes : compte d\'exécution sans droits suffisants, ExecutionPolicy bloquante, chemin du script incorrect.' }
                    ]
                  },
                  {
                    description: 'Le script doit s\'exécuter avec les droits d\'un compte de service (pas l\'utilisateur connecté). Comment configurer ça ?',
                    choix: [
                      { texte: 'Register-ScheduledTask avec -User "DOMAINE\\svc_rapport" -Password "..." et -RunLevel Highest', correct: true, feedback: 'Correct ! En spécifiant -User et -Password, la tâche s\'exécute sous ce compte même si personne n\'est connecté. -RunLevel Highest donne les droits élevés (administrateur). Assurez-vous que le compte de service a les droits nécessaires.' },
                      { texte: 'Configurer la tâche pour "Exécuter uniquement si l\'utilisateur est connecté"', correct: false, feedback: 'C\'est l\'opposé du besoin. "Exécuter uniquement si l\'utilisateur est connecté" empêche l\'exécution la nuit quand personne n\'est connecté. Choisissez "Exécuter même si l\'utilisateur n\'est pas connecté".' },
                      { texte: 'Ajouter le script au démarrage Windows avec New-ItemProperty sur HKCU\\Run', correct: false, feedback: 'HKCU\\Run s\'exécute au démarrage de session, pas à heure fixe. Pour une planification à 2h du matin, utilisez Register-ScheduledTask avec un trigger -Daily -At "02:00".' }
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'ps-m06',
          titre: 'Pour aller plus loin',
          cas: [
            {
              id: 'cas-ps-011',
              titre: 'Utiliser PowerShell Remoting pour l\'administration à distance',
              difficulte: 'difficile',
              format: 'terminal',
              objectif: 'Configurer WinRM et utiliser Invoke-Command et Enter-PSSession pour administrer des serveurs à distance.',
              contexte: 'Vous devez administrer 3 serveurs Windows à distance sans ouvrir une session RDP sur chacun.',
              contenu: {
                prompt: 'PS C:\\> ',
                commandes: {
                  'Test-WSMan -ComputerName SRV-FILE': 'wsmid         : http://schemas.dmtf.org/wbem/wsman/identity/1/wsmanidentity.xsd\nProtocolVersion: http://schemas.dmtf.org/wbem/wsman/1/wsman.xsd\nProductVendor  : Microsoft Corporation\nProductVersion : OS: 0.0.0 SP: 0.0 Stack: 3.0',
                  'Invoke-Command -ComputerName SRV-FILE -ScriptBlock { Get-Service -Name "LanmanServer" | Select-Object Name, Status }': 'Name         Status\n----         ------\nLanmanServer Running\n\nPSComputerName : SRV-FILE',
                  'Invoke-Command -ComputerName SRV-AD01, SRV-FILE, SRV-WEB -ScriptBlock { hostname }': 'SRV-AD01\nPSComputerName : SRV-AD01\nSRV-FILE\nPSComputerName : SRV-FILE\nSRV-WEB\nPSComputerName : SRV-WEB',
                  'Enter-PSSession -ComputerName SRV-FILE': '[SRV-FILE]: PS C:\\Users\\Admin\\Documents>',
                  'Get-Disk': 'Number FriendlyName           OperationalStatus TotalSize\n------ ------------           ----------------- ---------\n     0 VMware Virtual disk S/N Ready             50 GB\n     1 VMware Virtual disk S/N Ready            500 GB',
                  'Exit-PSSession': 'PS C:\\>',
                  'Enable-PSRemoting -Force': 'WinRM a été mis à jour pour recevoir des demandes.\nLe service WinRM a démarré.\nWinRM a été mis à jour pour la gestion à distance.',
                  'help': 'Commandes : Test-WSMan -ComputerName SRV-FILE, Invoke-Command -ComputerName SRV-FILE -ScriptBlock { Get-Service ... }, Invoke-Command -ComputerName SRV-AD01,SRV-FILE,SRV-WEB -ScriptBlock { hostname }, Enter-PSSession -ComputerName SRV-FILE, Get-Disk, Exit-PSSession, Enable-PSRemoting -Force'
                },
                validation: ['Invoke-Command -ComputerName SRV-FILE -ScriptBlock { Get-Service -Name "LanmanServer" | Select-Object Name, Status }', 'Invoke-Command -ComputerName SRV-AD01, SRV-FILE, SRV-WEB -ScriptBlock { hostname }'],
                indices: [
                  'Invoke-Command -ComputerName srv1,srv2 exécute un ScriptBlock sur plusieurs machines en parallèle. PSComputerName dans les résultats indique quelle machine a retourné chaque résultat.',
                  'Enter-PSSession ouvre une session interactive sur une machine distante (comme SSH). Exit-PSSession pour revenir. Test-WSMan vérifie que WinRM est actif sur la cible.'
                ],
                solution: ['Test-WSMan -ComputerName SRV-FILE', 'Invoke-Command -ComputerName SRV-FILE -ScriptBlock { Get-Service -Name "LanmanServer" | Select-Object Name, Status }', 'Invoke-Command -ComputerName SRV-AD01, SRV-FILE, SRV-WEB -ScriptBlock { hostname }', 'Enter-PSSession -ComputerName SRV-FILE']
              }
            },
            {
              id: 'cas-ps-012',
              titre: 'Utiliser les modules PowerShell et le dépôt PSGallery',
              difficulte: 'moyen',
              format: 'scenario',
              objectif: 'Trouver, installer et utiliser des modules PowerShell depuis PSGallery.',
              contexte: 'Vous devez installer un module supplémentaire pour administrer un composant spécifique et comprendre la gestion des modules PS.',
              contenu: {
                etapes: [
                  {
                    description: 'Comment trouver un module PowerShell pour administrer VMware vSphere ?',
                    choix: [
                      { texte: 'Find-Module -Name "*VMware*" ou Find-Module -Tag "VMware" dans PSGallery', correct: true, feedback: 'Correct ! PSGallery est le dépôt officiel de modules PS. Find-Module recherche dans PSGallery. Pour VMware, c\'est le module "VMware.PowerCLI". Installez avec : Install-Module VMware.PowerCLI -Scope CurrentUser.' },
                      { texte: 'Télécharger un .exe depuis le site VMware et l\'installer comme une application', correct: false, feedback: 'VMware PowerCLI est disponible sur PSGallery. Certes, une version installable existe aussi, mais la méthode moderne est Install-Module VMware.PowerCLI, plus simple à mettre à jour et gérer.' },
                      { texte: 'Les modules VMware ne sont pas disponibles pour PowerShell', correct: false, feedback: 'Faux. VMware PowerCLI est l\'un des modules PS les plus utilisés en entreprise. Il est sur PSGallery et permet d\'administrer vSphere, ESXi, vCenter entièrement en PowerShell.' }
                    ]
                  },
                  {
                    description: 'Install-Module échoue avec "Unable to resolve package source". Quelle est la cause probable ?',
                    choix: [
                      { texte: 'Le serveur n\'a pas accès à Internet ou PSGallery est bloqué par le proxy', correct: true, feedback: 'Cause la plus fréquente en entreprise. Vérifiez la connectivité : Test-NetConnection -ComputerName www.powershellgallery.com -Port 443. Si un proxy est utilisé : [System.Net.WebRequest]::DefaultWebProxy = New-Object System.Net.WebProxy("http://proxy:port").' },
                      { texte: 'PowerShell n\'est pas à jour et doit être réinstallé', correct: false, feedback: 'La version de PS n\'est généralement pas la cause de ce problème spécifique. L\'erreur "Unable to resolve package source" pointe vers un problème réseau : proxy, pare-feu, ou PSGallery inaccessible.' },
                      { texte: 'Le module n\'existe pas dans PSGallery', correct: false, feedback: 'Si le module n\'existe pas, l\'erreur serait différente ("No match was found for the specified search criteria"). "Unable to resolve package source" indique un problème d\'accès réseau à PSGallery.' }
                    ]
                  },
                  {
                    description: 'Après installation d\'un module, ses cmdlets ne sont pas disponibles dans une nouvelle session PS. Pourquoi ?',
                    choix: [
                      { texte: 'Le module est installé mais pas importé dans la session courante — utiliser Import-Module', correct: false, feedback: 'Partiellement vrai pour PowerShell 2. Depuis PS 3.0, les modules sont chargés automatiquement à l\'utilisation (auto-loading). Si les cmdlets ne sont pas disponibles même après avoir tapé une commande du module, le problème est ailleurs.' },
                      { texte: 'Le module a été installé avec -Scope CurrentUser mais la session tourne sous un autre compte', correct: true, feedback: 'Problème courant ! -Scope CurrentUser installe dans %USERPROFILE%\\Documents\\PowerShell\\Modules et n\'est disponible que pour cet utilisateur. Si la tâche planifiée ou le service PS tourne sous un compte différent, utilisez -Scope AllUsers (requiert droits admin).' },
                      { texte: 'Redémarrer le serveur pour appliquer l\'installation du module', correct: false, feedback: 'Un redémarrage n\'est pas nécessaire pour les modules PS. L\'installation est immédiate. Le problème vient de la portée (-Scope) ou du compte utilisateur, pas d\'un redémarrage manquant.' }
                    ]
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 'intro-linux',
      titre: 'Introduction à Linux',
      emoji: '🐧',
      modules: [
        {
          id: 'intro-linux-m01',
          titre: 'Linux & Unix — Fondamentaux TSSR',
          cas: [
            {
              id: 'cas-il-001',
              titre: 'Distinguer Unix, Linux et les distributions',
              difficulte: 'facile',
              format: 'scenario',
              objectif: 'Comprendre les relations entre Unix, le noyau Linux et les distributions.',
              contexte: 'En entretien d\'embauche pour un poste TSSR, le recruteur vous pose des questions sur Linux.',
              contenu: {
                etapes: [
                  {
                    description: 'Quelle est la relation entre Unix et Linux ?',
                    choix: [
                      { texte: 'Linux est un noyau inspiré d\'Unix, développé par Linus Torvalds en 1991, sous licence libre (GPL)', correct: true, feedback: 'Correct ! Linux est un noyau (kernel) compatible POSIX, inspiré philosophiquement d\'Unix mais réécrit de zéro. Il est open source sous licence GPL. Une distribution Linux = noyau Linux + outils GNU + logiciels supplémentaires.' },
                      { texte: 'Linux est une version gratuite d\'Unix, développée par AT&T', correct: false, feedback: 'Non. Unix a été développé par AT&T Bell Labs dans les années 1970. Linux a été créé indépendamment par Linus Torvalds (étudiant finlandais) en 1991. Ce sont deux familles distinctes, même si Linux s\'en est inspiré philosophiquement.' },
                      { texte: 'Linux et Unix sont identiques, seul le nom diffère selon l\'éditeur', correct: false, feedback: 'Non. Unix (AIX, HP-UX, Solaris) et Linux sont différents : code source distinct, licences différentes (Unix propriétaire, Linux GPL). Ils respectent tous deux POSIX, ce qui les rend compatibles dans l\'usage.' }
                    ]
                  },
                  {
                    description: 'Quelle est la différence entre un noyau (kernel) et une distribution Linux ?',
                    choix: [
                      { texte: 'Le noyau gère le matériel ; la distribution = noyau + outils GNU + gestionnaire de paquets + logiciels', correct: true, feedback: 'Exact ! Le noyau seul est inutilisable. Une distribution l\'habille avec : les outils GNU (bash, ls, grep...), un init system (systemd), un gestionnaire de paquets (apt, yum...) et une interface. Exemples : Debian, Ubuntu, Fedora, Arch.' },
                      { texte: 'Le noyau est la partie graphique ; la distribution gère le matériel', correct: false, feedback: 'C\'est l\'inverse. Le noyau (kernel) gère le matériel (pilotes, mémoire, processeur). L\'interface graphique (GNOME, KDE...) est une couche applicative bien au-dessus du noyau.' },
                      { texte: 'Noyau et distribution sont synonymes', correct: false, feedback: 'Non. Le noyau Linux est le cœur du système. Une distribution (Ubuntu, Fedora...) est un système complet bâti autour du noyau. On peut changer de distribution sans changer de version de noyau.' }
                    ]
                  },
                  {
                    description: 'Pourquoi Linux est-il très utilisé pour les serveurs en entreprise ?',
                    choix: [
                      { texte: 'Stabilité, sécurité, gratuité (licences), performances et large communauté de support', correct: true, feedback: 'Correct ! Linux domine les serveurs (~80% du cloud, ~100% des supercalculateurs) pour ces raisons : stabilité (uptime de plusieurs années), sécurité (modèle de permissions Unix), coût (GPL = gratuit), performances et écosystème d\'outils puissants.' },
                      { texte: 'Parce que Windows Server est trop difficile à administrer', correct: false, feedback: 'La difficulté n\'est pas la raison principale. Linux est choisi pour ses qualités intrinsèques (performances, stabilité, coût, open source) et non par défaut face à Windows.' },
                      { texte: 'Linux est obligatoire pour les serveurs selon la loi française', correct: false, feedback: 'Il n\'existe aucune obligation légale. Linux est choisi pour ses qualités techniques et économiques. Windows Server est très utilisé dans les environnements Microsoft (AD, Exchange). Le choix dépend des besoins.' }
                    ]
                  }
                ]
              }
            },
            {
              id: 'cas-il-002',
              titre: 'Identifier la distribution adaptée au contexte',
              difficulte: 'facile',
              format: 'arbre',
              objectif: 'Choisir la distribution Linux la plus adaptée selon le contexte d\'utilisation.',
              contexte: 'Des clients vous demandent conseil pour choisir une distribution Linux selon leurs besoins.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Quel est le contexte d\'utilisation ?', choix: [{ texte: 'Serveur web en production — priorité stabilité', suite: 'n2' }, { texte: 'Poste de travail pour un débutant Linux', suite: 'n3' }, { texte: 'Formation TSSR en lab virtuel', suite: 'n4' }] },
                  n2: { question: 'Y a-t-il un contrat de support commercial requis ?', choix: [{ texte: 'Oui, le client exige un support officiel payant', suite: 'n5' }, { texte: 'Non, la communauté et le LTS suffisent', suite: 'n6' }] },
                  n3: { solution: true, correct: true, texte: 'Ubuntu Desktop LTS ou Linux Mint', explication: 'Pour les débutants : Ubuntu LTS (support 5 ans, grande communauté, documentation abondante) ou Linux Mint (encore plus proche de Windows graphiquement). Les deux ont une installation simple et un vaste catalogue logiciel.' },
                  n4: { solution: true, correct: true, texte: 'Debian Stable ou Rocky Linux', explication: 'Pour une formation TSSR, Debian Stable est idéale : représentative des environnements serveur, gratuite, très documentée. Rocky Linux permet d\'apprendre l\'environnement RHEL utilisé en entreprise.' },
                  n5: { solution: true, correct: true, texte: 'Red Hat Enterprise Linux (RHEL)', explication: 'RHEL offre un support officiel Red Hat avec SLA. Idéal pour les environnements qui nécessitent une responsabilité contractuelle. Coûteux mais justifié en production critique.' },
                  n6: { solution: true, correct: true, texte: 'Debian Stable ou Ubuntu Server LTS', explication: 'Sans besoin de support commercial : Debian Stable (3 ans + LTS, très stable) ou Ubuntu Server LTS (5 ans de support, plus de paquets récents, meilleur support cloud). Les deux sont excellents pour les serveurs web.' }
                }
              }
            }
          ]
        },
        {
          id: 'intro-linux-m02',
          titre: 'Virtualisation & VMware Workstation',
          cas: [
            {
              id: 'cas-il-003',
              titre: 'Créer et configurer une machine virtuelle Linux',
              difficulte: 'facile',
              format: 'scenario',
              objectif: 'Paramétrer correctement une VM Linux dans VMware Workstation pour un lab TSSR.',
              contexte: 'Vous créez une VM Debian pour vos travaux pratiques TSSR dans VMware Workstation.',
              contenu: {
                etapes: [
                  {
                    description: 'Quelle quantité de RAM allouer à une VM Debian pour les TPs TSSR ?',
                    choix: [
                      { texte: '1 à 2 Go — suffisant pour un serveur Debian sans interface graphique', correct: true, feedback: 'Correct ! Une VM Debian en mode serveur (sans GUI) fonctionne très bien avec 1-2 Go de RAM. Inutile d\'allouer plus pour les TPs basiques. Économisez la RAM de votre machine hôte pour pouvoir faire tourner plusieurs VMs simultanément.' },
                      { texte: '8 Go minimum — Linux est gourmand en mémoire', correct: false, feedback: 'Non. Linux (surtout en mode serveur) est réputé pour sa faible consommation mémoire. 8 Go pour une VM de TP serait un gaspillage. Avec 8 Go de RAM hôte, vous ne pourriez faire tourner qu\'une seule VM.' },
                      { texte: '256 Mo — Linux fonctionne sur n\'importe quelle configuration', correct: false, feedback: 'Trop juste pour les TPs. Avec 256 Mo, apt et les outils modernes seraient très lents. Un minimum de 512 Mo est recommandé, 1 Go étant confortable pour les TPs TSSR.' }
                    ]
                  },
                  {
                    description: 'Pour que la VM puisse accéder à Internet ET être accessible depuis votre réseau physique, quel mode réseau VMware choisir ?',
                    choix: [
                      { texte: 'Bridged (ponté) — la VM obtient une IP du même réseau que l\'hôte', correct: true, feedback: 'Correct ! En mode Bridged, la VM est directement sur le réseau physique avec sa propre IP. Elle peut accéder à Internet et être accédée depuis d\'autres machines. Idéal pour simuler un vrai serveur réseau.' },
                      { texte: 'NAT — la VM partage l\'IP de l\'hôte', correct: false, feedback: 'NAT donne accès à Internet à la VM mais la cache derrière l\'IP de l\'hôte. Les autres machines du réseau ne peuvent pas joindre la VM directement. Pratique pour l\'accès Internet seul, pas pour être accessible depuis le réseau.' },
                      { texte: 'Host-only — la VM est isolée sur un réseau virtuel', correct: false, feedback: 'Host-only isole la VM dans un réseau privé entre l\'hôte et les VMs. Pas d\'accès Internet, pas d\'accès depuis le réseau physique. Utile pour des labs isolés, pas pour un accès Internet et réseau simultané.' }
                    ]
                  },
                  {
                    description: 'Les VMware Tools ne sont pas installés dans la VM. Quel impact cela a-t-il ?',
                    choix: [
                      { texte: 'Résolution d\'écran fixe, pas de copier-coller hôte/VM, performances dégradées', correct: true, feedback: 'Exact ! Les VMware Tools améliorent significativement l\'expérience : résolution dynamique, copier-coller bidirectionnel, drag & drop, synchronisation de l\'heure, et pilotes optimisés pour meilleures performances I/O. Installation : apt install open-vm-tools.' },
                      { texte: 'La VM ne démarrera pas sans VMware Tools', correct: false, feedback: 'Non. VMware Tools sont optionnels. La VM démarre et fonctionne sans eux, mais avec moins de confort : résolution fixe 800×600, pas de copier-coller avec l\'hôte, performances I/O sous-optimales.' },
                      { texte: 'Aucun impact — VMware Tools ne servent qu\'à la sauvegarde de snapshots', correct: false, feedback: 'Faux. VMware Tools ont de nombreux bénéfices (résolution, copier-coller, performances). Les snapshots fonctionnent sans eux, mais VMware Tools permettent des snapshots plus cohérents (quiescence du système de fichiers).' }
                    ]
                  }
                ]
              }
            },
            {
              id: 'cas-il-004',
              titre: 'Diagnostiquer un problème de VM VMware',
              difficulte: 'moyen',
              format: 'arbre',
              objectif: 'Identifier et résoudre les problèmes courants avec une VM VMware Workstation.',
              contexte: 'Votre VM Debian ne démarre plus après une session de TP. Vous devez diagnostiquer.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Quel symptôme observez-vous ?', choix: [{ texte: 'Message "Cannot open the disk" ou "file is locked"', suite: 'n2' }, { texte: 'La VM démarre mais l\'écran reste noir', suite: 'n3' }, { texte: 'VMware affiche "The virtual machine is in use"', suite: 'n4' }] },
                  n2: { solution: true, correct: true, texte: 'Fichier de verrouillage (.lck) présent — supprimer le dossier .lck', explication: 'VMware crée des fichiers .lck (lock) pendant qu\'une VM tourne. S\'ils ne sont pas supprimés proprement (crash), la VM ne redémarre pas. Trouvez et supprimez le dossier .lck dans le répertoire de la VM. Ne supprimez pas les .vmdk !' },
                  n3: { question: 'La VM a-t-elle démarré sur le bon périphérique ?', choix: [{ texte: 'L\'ISO est encore montée comme premier périphérique de boot', suite: 'n5' }, { texte: 'L\'écran est noir dès le démarrage sans message BIOS', suite: 'n6' }] },
                  n4: { solution: true, correct: true, texte: 'Une autre instance de VMware utilise la VM — fermer ou redémarrer VMware', explication: 'Ce message signifie que la VM est déjà ouverte ailleurs (autre instance VMware, Remote Display). Fermez toutes les instances de VMware Workstation, ou forcez l\'ouverture en répondant "Take Ownership" si demandé.' },
                  n5: { solution: true, correct: true, texte: 'Démonter l\'ISO et changer l\'ordre de boot', explication: 'L\'ISO d\'installation est encore montée et la VM tente de redémarrer dessus. Dans VMware : Edit Virtual Machine Settings → CD/DVD → décochez "Connected". Ou changez l\'ordre de boot (F2 au démarrage de la VM) pour mettre le disque dur en premier.' },
                  n6: { solution: true, correct: true, texte: 'Problème de pilote graphique — essayer en mode recovery', explication: 'Écran noir au boot peut indiquer un problème de pilote graphique (après mise à jour du noyau). Tentez le mode recovery depuis GRUB (touche Shift au démarrage), ou reinstallez les VMware Tools : apt install --reinstall open-vm-tools.' }
                }
              }
            }
          ]
        },
        {
          id: 'intro-linux-m03',
          titre: 'Shell Linux, Connexion & Environnement de travail',
          cas: [
            {
              id: 'cas-il-005',
              titre: 'Se connecter et naviguer dans le shell Linux',
              difficulte: 'facile',
              format: 'terminal',
              objectif: 'Utiliser les commandes de base de navigation et comprendre le prompt shell.',
              contexte: 'Vous venez de vous connecter en SSH sur un serveur Linux. Vous devez identifier votre environnement et naviguer dans l\'arborescence.',
              contenu: {
                prompt: 'admin@srv:~$',
                commandes: {
                  'whoami': 'admin',
                  'id': 'uid=1001(admin) gid=1001(admin) groupes=1001(admin),27(sudo)',
                  'pwd': '/home/admin',
                  'echo $HOME': '/home/admin',
                  'echo $SHELL': '/bin/bash',
                  'echo $PATH': '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
                  'ls': 'Bureau  Documents  Images  Modèles  Musique  Téléchargements  Vidéos',
                  'ls -la': 'total 40\ndrwxr-xr-x 8 admin admin 4096 Mar  2 10:00 .\ndrwxr-xr-x 3 root  root  4096 Jan 15 09:00 ..\n-rw------- 1 admin admin  156 Mar  2 08:00 .bash_history\n-rw-r--r-- 1 admin admin  220 Jan 15 09:00 .bash_logout\n-rw-r--r-- 1 admin admin 3526 Jan 15 09:00 .bashrc\ndrwxr-xr-x 2 admin admin 4096 Jan 15 09:00 Bureau\ndrwxr-xr-x 2 admin admin 4096 Jan 15 09:00 Documents',
                  'cd /etc': '',
                  'pwd': '/etc',
                  'cd -': '/home/admin',
                  'help': 'Commandes : whoami, id, pwd, echo $HOME, echo $SHELL, echo $PATH, ls, ls -la, cd /etc, cd -'
                },
                validation: ['whoami', 'pwd', 'ls -la'],
                indices: [
                  'Le prompt admin@srv:~$ indique : utilisateur@machine:répertoire_courant$. ~ est l\'alias du répertoire home.',
                  'cd - revient au répertoire précédent. ls -la affiche les fichiers cachés (commençant par .) avec les permissions détaillées.'
                ],
                solution: ['whoami', 'id', 'pwd', 'ls -la', 'cd /etc', 'pwd', 'cd -']
              }
            },
            {
              id: 'cas-il-006',
              titre: 'Résoudre un problème de connexion SSH',
              difficulte: 'moyen',
              format: 'arbre',
              objectif: 'Diagnostiquer pourquoi une connexion SSH à un serveur Linux échoue.',
              contexte: 'Vous ne pouvez pas vous connecter en SSH à un serveur Linux. Diagnostiquez la cause.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Quel message d\'erreur obtenez-vous lors de la tentative SSH ?', choix: [{ texte: '"Connection refused" ou "No route to host"', suite: 'n2' }, { texte: '"Permission denied (publickey,password)"', suite: 'n3' }, { texte: '"Host key verification failed"', suite: 'n4' }] },
                  n2: { question: 'Le serveur est-il joignable en ping ?', choix: [{ texte: 'Non, ping timeout', suite: 'n5' }, { texte: 'Oui, ping répond mais SSH refusé', suite: 'n6' }] },
                  n3: { question: 'Utilisez-vous une authentification par mot de passe ou clé ?', choix: [{ texte: 'Mot de passe — sûr du mot de passe', suite: 'n7' }, { texte: 'Clé SSH', suite: 'n8' }] },
                  n4: { solution: true, correct: true, texte: 'La clé hôte du serveur a changé — mettre à jour known_hosts', explication: 'Si le serveur a été réinstallé, sa clé hôte a changé. SSH refuse la connexion par sécurité (protection anti-MITM). Supprimez l\'ancienne entrée : ssh-keygen -R <ip_serveur>. Reconnectez-vous et acceptez la nouvelle clé.' },
                  n5: { solution: true, correct: true, texte: 'Problème réseau — vérifier IP, câble, VLAN', explication: 'Si le ping ne répond pas, le problème est en couche 3 : mauvaise IP, interface réseau désactivée, câble débranché, VLAN incorrect. Accédez physiquement ou via console pour vérifier ip a et ping depuis la machine.' },
                  n6: { solution: true, correct: true, texte: 'Service SSH arrêté ou pare-feu bloque le port 22', explication: 'Ping OK mais SSH refusé : soit le service sshd n\'est pas démarré (systemctl start ssh), soit un pare-feu bloque le port 22 (ufw allow ssh ou iptables -A INPUT -p tcp --dport 22 -j ACCEPT).' },
                  n7: { solution: true, correct: true, texte: 'Vérifier PasswordAuthentication dans sshd_config', explication: 'L\'authentification par mot de passe peut être désactivée dans /etc/ssh/sshd_config (PasswordAuthentication no). Vérifiez aussi que le compte n\'est pas verrouillé : passwd -S <user>. Si PasswordAuthentication est off, utilisez une clé SSH.' },
                  n8: { solution: true, correct: true, texte: 'Vérifier les permissions de la clé et ~/.ssh/authorized_keys', explication: 'Permissions critiques pour SSH par clé : ~/.ssh doit être 700, authorized_keys doit être 600, le répertoire home 755 max. Si les permissions sont trop ouvertes, SSH refuse la clé par sécurité. Vérifiez : ls -la ~/.ssh.' }
                }
              }
            }
          ]
        },
        {
          id: 'intro-linux-m04',
          titre: 'Premières commandes Bash, Variables et Aide',
          cas: [
            {
              id: 'cas-il-007',
              titre: 'Obtenir de l\'aide et utiliser les commandes essentielles',
              difficulte: 'facile',
              format: 'terminal',
              objectif: 'Utiliser man, --help et type pour s\'auto-documenter et maîtriser les commandes de base.',
              contexte: 'Vous découvrez un serveur Linux et utilisez les outils d\'aide pour comprendre les commandes disponibles.',
              contenu: {
                prompt: 'admin@srv:~$',
                commandes: {
                  'man ls': 'LS(1)                    User Commands                   LS(1)\n\nNAME\n    ls - list directory contents\n\nSYNOPSIS\n    ls [OPTION]... [FILE]...\n\nDESCRIPTION\n    List information about the FILEs (the current directory by default).\n    Sort entries alphabetically if none of -cftuvSUX nor --sort is specified.\n\n    -a, --all\n        do not ignore entries starting with .\n    -l\n        use a long listing format\n[q pour quitter]',
                  'ls --help | head -10': 'Usage: ls [OPTION]... [FILE]...\nList information about the FILEs (the current directory by default).\n  -a, --all           do not ignore entries starting with .\n  -A, --almost-all    do not list implied . and ..\n  -l                  use long listing format\n  -h, --human-readable  print human readable sizes (e.g., 1K 234M 2G)',
                  'type ls': 'ls est un alias de « ls --color=auto »',
                  'type cd': 'cd est une primitive du shell',
                  'type python3': 'python3 est /usr/bin/python3',
                  'which python3': '/usr/bin/python3',
                  'apropos password': 'chage (1)        - change user password expiry information\nchpasswd (8)     - update passwords in batch mode\npasswd (1)       - change user password\nopenssl-passwd (1ssl) - compute password hashes',
                  'help': 'Commandes : man ls, ls --help | head -10, type ls, type cd, type python3, which python3, apropos password'
                },
                validation: ['man ls', 'type ls', 'apropos password'],
                indices: [
                  'man <commande> = manuel complet. <commande> --help = aide rapide. apropos <mot-clé> cherche dans les manuels.',
                  'type révèle si une commande est un alias, une primitive shell (built-in) ou un programme externe. which donne le chemin d\'un exécutable.'
                ],
                solution: ['man ls', 'ls --help | head -10', 'type ls', 'type cd', 'apropos password']
              }
            },
            {
              id: 'cas-il-008',
              titre: 'Variables d\'environnement et personnalisation du shell',
              difficulte: 'moyen',
              format: 'scenario',
              objectif: 'Comprendre les variables d\'environnement Linux et leur rôle dans le fonctionnement du shell.',
              contexte: 'Vous configurez l\'environnement de travail d\'un nouveau serveur Linux.',
              contenu: {
                etapes: [
                  {
                    description: 'Un programme ne se lance pas avec "command not found" même s\'il est installé. Quelle variable vérifier ?',
                    choix: [
                      { texte: '$PATH — liste des répertoires où bash cherche les exécutables', correct: true, feedback: 'Correct ! $PATH contient les répertoires séparés par : où bash cherche les commandes. Si un programme est dans /usr/local/bin mais que ce répertoire n\'est pas dans $PATH, bash ne le trouve pas. Ajoutez-le : export PATH="$PATH:/usr/local/bin".' },
                      { texte: '$HOME — répertoire de l\'utilisateur', correct: false, feedback: '$HOME pointe vers le répertoire personnel de l\'utilisateur (/home/admin). Il n\'influence pas la recherche des commandes. Vérifiez $PATH pour les problèmes de "command not found".' },
                      { texte: '$SHELL — shell utilisé par défaut', correct: false, feedback: '$SHELL indique quel shell est configuré par défaut pour l\'utilisateur (/bin/bash). Il ne détermine pas où chercher les commandes. Vérifiez $PATH pour résoudre "command not found".' }
                    ]
                  },
                  {
                    description: 'Vous exportez une variable dans un script : export MON_VAR="test". Est-elle disponible après la fin du script ?',
                    choix: [
                      { texte: 'Non — un script enfant ne peut pas modifier l\'environnement du shell parent', correct: true, feedback: 'Correct ! Un script est exécuté dans un sous-shell. export dans le script exporte vers les enfants du script, mais le shell parent (votre terminal) reste inchangé. Pour persister : ajoutez la ligne dans ~/.bashrc ou sourcez le script : source script.sh (ou . script.sh).' },
                      { texte: 'Oui — export rend la variable permanente dans tout le système', correct: false, feedback: 'Non. export ne rend la variable disponible que pour les processus enfants du shell courant, pas de façon permanente ni globale. Pour la persistance, ajoutez dans ~/.bashrc (user) ou /etc/environment (système).' },
                      { texte: 'Cela dépend du contenu de /etc/environment', correct: false, feedback: '/etc/environment est chargé au démarrage de session et affecte toutes les sessions. Mais export dans un script ne modifie pas /etc/environment. La portée d\'export est limitée au processus courant et ses enfants.' }
                    ]
                  },
                  {
                    description: 'Quelle est la différence entre ~/.bashrc et ~/.bash_profile ?',
                    choix: [
                      { texte: '.bash_profile est chargé à la connexion (login shell) ; .bashrc à chaque nouveau terminal interactif', correct: true, feedback: 'Exact ! .bash_profile (ou .profile) : chargé une fois lors de la connexion (SSH, console). .bashrc : chargé à chaque ouverture d\'un terminal bash interactif. Bonne pratique : mettez les variables dans .bash_profile et sourcez .bashrc depuis .bash_profile.' },
                      { texte: '.bashrc est plus important que .bash_profile et remplace toujours .bash_profile', correct: false, feedback: 'Non. Les deux sont complémentaires et chargés dans des contextes différents. .bash_profile au login, .bashrc pour les shells interactifs non-login. En SSH, seul .bash_profile est chargé automatiquement.' },
                      { texte: 'Les deux sont strictement identiques, seul le nom diffère selon la distribution', correct: false, feedback: 'Non. Ils ont des contextes de chargement différents. .bash_profile = login shell (connexion SSH). .bashrc = shell interactif (nouveau terminal dans une session graphique). Cette distinction est importante pour la persistance des variables.' }
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'intro-linux-m05',
          titre: 'Arborescence Linux, Manipulation de Fichiers & Métacaractères',
          cas: [
            {
              id: 'cas-il-009',
              titre: 'Naviguer dans l\'arborescence et manipuler les fichiers',
              difficulte: 'facile',
              format: 'terminal',
              objectif: 'Utiliser mkdir, cp, mv, rm et les chemins absolus/relatifs pour gérer les fichiers.',
              contexte: 'Vous organisez des fichiers de configuration sur un serveur Linux en créant une arborescence structurée.',
              contenu: {
                prompt: 'admin@srv:~$',
                commandes: {
                  'mkdir -p projets/tssr/configs': '',
                  'ls -R projets': 'projets:\ntssr\n\nprojets/tssr:\nconfigs',
                  'cp /etc/hosts projets/tssr/configs/': '',
                  'ls projets/tssr/configs/': 'hosts',
                  'cp -r /etc/apt projets/tssr/configs/': '',
                  'ls projets/tssr/configs/': 'apt  hosts',
                  'mv projets/tssr/configs/hosts projets/tssr/configs/hosts.bak': '',
                  'ls projets/tssr/configs/': 'apt  hosts.bak',
                  'rm projets/tssr/configs/hosts.bak': '',
                  'rm -r projets/tssr/configs/apt': '',
                  'ls projets/tssr/configs/': '(vide)',
                  'ls /usr/bin/py*': '/usr/bin/py3clean  /usr/bin/py3compile  /usr/bin/python3',
                  'help': 'Commandes : mkdir -p projets/tssr/configs, ls -R projets, cp /etc/hosts projets/tssr/configs/, ls projets/tssr/configs/, cp -r /etc/apt projets/tssr/configs/, mv projets/tssr/configs/hosts projets/tssr/configs/hosts.bak, rm projets/tssr/configs/hosts.bak, rm -r projets/tssr/configs/apt, ls /usr/bin/py*'
                },
                validation: ['mkdir -p projets/tssr/configs', 'cp /etc/hosts projets/tssr/configs/', 'mv projets/tssr/configs/hosts projets/tssr/configs/hosts.bak'],
                indices: [
                  'mkdir -p crée l\'arborescence complète même si les répertoires parents n\'existent pas. cp -r copie récursivement un répertoire.',
                  'Les métacaractères : * (tout), ? (un caractère), [abc] (un parmi abc). ls /etc/*.conf liste tous les .conf.'
                ],
                solution: ['mkdir -p projets/tssr/configs', 'cp /etc/hosts projets/tssr/configs/', 'cp -r /etc/apt projets/tssr/configs/', 'mv projets/tssr/configs/hosts projets/tssr/configs/hosts.bak', 'rm projets/tssr/configs/hosts.bak']
              }
            },
            {
              id: 'cas-il-010',
              titre: 'Connaître les répertoires clés de l\'arborescence Linux',
              difficulte: 'facile',
              format: 'arbre',
              objectif: 'Identifier le rôle de chaque répertoire principal de l\'arborescence FHS Linux.',
              contexte: 'En déboguant un problème, vous devez savoir où chercher les fichiers selon leur type.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Où chercher le fichier de configuration d\'un service (ex: Apache) ?', choix: [{ texte: '/etc — fichiers de configuration système', suite: 'n2' }, { texte: '/var — données variables', suite: 'n3' }, { texte: '/usr — programmes utilisateurs', suite: 'n4' }] },
                  n2: { solution: true, correct: true, texte: '/etc/apache2/ — répertoire de configuration d\'Apache', explication: '/etc contient tous les fichiers de configuration statiques du système et des services. Exemples : /etc/network/interfaces, /etc/ssh/sshd_config, /etc/apache2/apache2.conf. Standard FHS (Filesystem Hierarchy Standard).' },
                  n3: { solution: true, correct: false, texte: '/var contient les données variables, pas les configs', explication: '/var stocke les données qui changent au runtime : logs (/var/log), spool (/var/spool), bases de données (/var/lib), caches (/var/cache). Les configurations sont dans /etc.' },
                  n4: { solution: true, correct: false, texte: '/usr contient les binaires et bibliothèques, pas les configs', explication: '/usr contient les programmes installés (/usr/bin, /usr/sbin), les bibliothèques (/usr/lib) et la documentation (/usr/share/doc). Les configurations sont dans /etc.' }
                }
              }
            }
          ]
        },
        {
          id: 'intro-linux-m06',
          titre: 'Lecture de Fichiers, Types, Inodes & Liens',
          cas: [
            {
              id: 'cas-il-011',
              titre: 'Lire des fichiers et comprendre les types et inodes',
              difficulte: 'moyen',
              format: 'terminal',
              objectif: 'Utiliser cat, less, head, tail, file et stat pour lire et analyser des fichiers Linux.',
              contexte: 'Vous analysez des fichiers système pour comprendre leur nature et contenu.',
              contenu: {
                prompt: 'admin@srv:~$',
                commandes: {
                  'file /etc/passwd': '/etc/passwd: ASCII text',
                  'file /bin/ls': '/bin/ls: ELF 64-bit LSB pie executable, x86-64',
                  'file /etc/alternatives/python3': '/etc/alternatives/python3: symbolic link to /usr/bin/python3.11',
                  'stat /etc/passwd': '  Fichier : /etc/passwd\n   Taille : 1842\t Blocs : 8          Bloc d\'E/S : 4096   fichier\nPéri : 08h/00d  Inœud : 917505      Liens : 1\nAccès : (0644/-rw-r--r--)  Uid : (0/root)   Gid : (0/root)\nAccès : 2024-03-02 10:15:30\nModif : 2024-02-15 09:00:12\nChang : 2024-02-15 09:00:12',
                  'head -5 /etc/passwd': 'root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin\nsys:x:3:3:sys:/dev:/usr/sbin/nologin\nsync:x:4:65534:sync:/bin:/bin/sync',
                  'tail -f /var/log/syslog': 'Mar  2 10:30:01 srv CRON[1234]: (root) CMD (run-parts /etc/cron.hourly)\nMar  2 10:30:02 srv rsyslogd: -- MARK --\n[Ctrl+C pour arrêter]',
                  'wc -l /etc/passwd': '35 /etc/passwd',
                  'help': 'Commandes : file /etc/passwd, file /bin/ls, file /etc/alternatives/python3, stat /etc/passwd, head -5 /etc/passwd, tail -f /var/log/syslog, wc -l /etc/passwd'
                },
                validation: ['file /etc/passwd', 'stat /etc/passwd', 'head -5 /etc/passwd'],
                indices: [
                  'file détermine le type réel d\'un fichier (texte, binaire, lien symbolique) indépendamment de son extension.',
                  'tail -f suit un fichier en temps réel (utile pour les logs). stat affiche les métadonnées complètes dont le numéro d\'inode.'
                ],
                solution: ['file /etc/passwd', 'file /bin/ls', 'stat /etc/passwd', 'head -5 /etc/passwd', 'tail -f /var/log/syslog']
              }
            },
            {
              id: 'cas-il-012',
              titre: 'Comprendre et créer des liens symboliques et physiques',
              difficulte: 'moyen',
              format: 'scenario',
              objectif: 'Distinguer les liens symboliques (soft links) des liens physiques (hard links) et savoir les utiliser.',
              contexte: 'Vous devez créer des raccourcis vers des fichiers de configuration pour simplifier leur accès.',
              contenu: {
                etapes: [
                  {
                    description: 'Quelle est la différence fondamentale entre un lien symbolique et un lien physique ?',
                    choix: [
                      { texte: 'Lien symbolique = raccourci vers le chemin ; lien physique = référence directe au même inode', correct: true, feedback: 'Exact ! Un lien symbolique pointe vers un chemin (peut être cassé si le fichier source est supprimé). Un lien dur partage le même inode que l\'original — supprimer l\'un ne supprime pas les données tant qu\'il reste un lien. Vérifiez avec ls -li (même numéro d\'inode).' },
                      { texte: 'Les deux sont identiques — seule la commande de création diffère', correct: false, feedback: 'Non. Ils ont des comportements très différents. Lien symbolique : peut traverser les systèmes de fichiers, peut pointer vers des répertoires, devient cassé si la cible disparaît. Lien physique : même partition obligatoire, ne peut pas pointer vers des répertoires, survit à la suppression de l\'original.' },
                      { texte: 'Un lien symbolique copie le fichier ; un lien physique crée juste un alias', correct: false, feedback: 'Non. Ni l\'un ni l\'autre ne copie les données. Le lien symbolique crée un nouveau fichier contenant le chemin de la cible. Le lien physique crée une nouvelle entrée de répertoire pointant vers le même inode (mêmes données sur disque).' }
                    ]
                  },
                  {
                    description: 'Vous voulez créer un lien symbolique /etc/nginx vers /etc/nginx-2.4/. Quelle commande ?',
                    choix: [
                      { texte: 'ln -s /etc/nginx-2.4 /etc/nginx', correct: true, feedback: 'Correct ! ln -s crée un lien symbolique. Syntaxe : ln -s CIBLE NOM_DU_LIEN. Ainsi /etc/nginx → /etc/nginx-2.4. Les liens symboliques peuvent pointer vers des répertoires, contrairement aux liens physiques.' },
                      { texte: 'ln /etc/nginx-2.4 /etc/nginx', correct: false, feedback: 'Sans -s, ln crée un lien physique (hard link). Les liens physiques ne peuvent pas pointer vers des répertoires. Cette commande échouerait avec "hard link not allowed for directory". Ajoutez -s pour créer un lien symbolique.' },
                      { texte: 'cp -l /etc/nginx-2.4 /etc/nginx', correct: false, feedback: 'cp -l crée des liens physiques pour les fichiers lors d\'une copie, pas pour des répertoires. Pour créer un lien symbolique vers un répertoire, utilisez ln -s.' }
                    ]
                  },
                  {
                    description: 'Vous supprimez le fichier original. Que se passe-t-il pour le lien symbolique et le lien physique qui pointaient vers lui ?',
                    choix: [
                      { texte: 'Le lien symbolique devient cassé (dangling link) ; le lien physique continue de fonctionner normalement', correct: true, feedback: 'Correct ! Le lien symbolique pointe vers un chemin qui n\'existe plus — il devient un "dangling symlink" (lien mort), identifiable par ls -la en rouge ou ls -la | grep "->". Le lien physique partage le même inode : les données existent encore tant qu\'au moins un lien physique pointe vers elles.' },
                      { texte: 'Les deux sont détruits automatiquement avec le fichier original', correct: false, feedback: 'Non. Les liens survivent à la suppression de l\'original. Le lien physique continue de fonctionner (même inode, données intactes). Le lien symbolique existe toujours mais pointe vers un chemin qui n\'existe plus.' },
                      { texte: 'Linux refuse de supprimer un fichier ayant des liens', correct: false, feedback: 'Linux permet la suppression même avec des liens. rm supprime une entrée de répertoire (décrémente le compteur de liens de l\'inode). Les données sont effacées uniquement quand le compteur de liens atteint 0.' }
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'intro-linux-m07',
          titre: 'Recherches avancées : find, locate, grep et regex',
          cas: [
            {
              id: 'cas-il-013',
              titre: 'Rechercher des fichiers et du contenu avec find et grep',
              difficulte: 'moyen',
              format: 'terminal',
              objectif: 'Utiliser find pour rechercher des fichiers et grep avec des expressions régulières.',
              contexte: 'Vous devez trouver des fichiers de configuration modifiés récemment et des lignes contenant des erreurs dans les logs.',
              contenu: {
                prompt: 'admin@srv:~$',
                commandes: {
                  'find /etc -name "*.conf" -mtime -7': '/etc/apache2/apache2.conf\n/etc/ssh/sshd_config\n/etc/apt/apt.conf.d/70debconf',
                  'find /var/log -size +1M -type f': '/var/log/syslog\n/var/log/auth.log\n/var/log/dpkg.log',
                  'find /home -user alice -type f -name "*.sh"': '/home/alice/scripts/backup.sh\n/home/alice/scripts/monitor.sh',
                  'find /tmp -mtime +30 -delete': '(supprime les fichiers vieux de plus de 30 jours dans /tmp)',
                  'grep -r "error" /var/log/apache2/ --include="*.log" -l': '/var/log/apache2/error.log\n/var/log/apache2/access.log',
                  'grep -E "^[0-9]{1,3}\\.[0-9]{1,3}" /var/log/apache2/access.log | head -3': '192.168.1.10 - - [02/Mar/2024:10:15:22 +0000] "GET /index.html HTTP/1.1" 200 1234\n10.0.0.5 - - [02/Mar/2024:10:15:25 +0000] "GET /api/data HTTP/1.1" 200 567',
                  'grep -c "404" /var/log/apache2/access.log': '47',
                  'help': 'Commandes : find /etc -name "*.conf" -mtime -7, find /var/log -size +1M -type f, find /home -user alice -type f -name "*.sh", find /tmp -mtime +30 -delete, grep -r "error" /var/log/apache2/ --include="*.log" -l, grep -E "^[0-9]{1,3}\\.[0-9]{1,3}" /var/log/apache2/access.log | head -3, grep -c "404" /var/log/apache2/access.log'
                },
                validation: ['find /etc -name "*.conf" -mtime -7', 'grep -r "error" /var/log/apache2/ --include="*.log" -l'],
                indices: [
                  'find options clés : -name (nom), -type f/d (fichier/répertoire), -mtime -N (modifié il y a moins de N jours), -size +N (plus grand que N), -user (propriétaire), -delete (supprimer).',
                  'grep -E active les expressions régulières étendues. -r parcourt récursivement. -l liste uniquement les fichiers. -c compte les occurrences.'
                ],
                solution: ['find /etc -name "*.conf" -mtime -7', 'find /var/log -size +1M -type f', 'grep -r "error" /var/log/apache2/ --include="*.log" -l', 'grep -c "404" /var/log/apache2/access.log']
              }
            },
            {
              id: 'cas-il-014',
              titre: 'Choisir entre find, locate et grep',
              difficulte: 'facile',
              format: 'arbre',
              objectif: 'Sélectionner le bon outil de recherche selon le type de recherche à effectuer.',
              contexte: 'Vous avez besoin de rechercher différentes informations sur un serveur Linux. Choisissez le bon outil.',
              contenu: {
                noeud_depart: 'n1',
                noeuds: {
                  n1: { question: 'Que recherchez-vous ?', choix: [{ texte: 'Un fichier dont vous connaissez le nom mais pas l\'emplacement', suite: 'n2' }, { texte: 'Toutes les lignes contenant une erreur dans des fichiers de logs', suite: 'n3' }, { texte: 'Des fichiers modifiés dans les dernières 24h dans /etc', suite: 'n4' }] },
                  n2: { question: 'La vitesse ou la précision est-elle prioritaire ?', choix: [{ texte: 'Vitesse — je veux un résultat immédiat', suite: 'n5' }, { texte: 'Précision — je veux inclure les fichiers très récents', suite: 'n6' }] },
                  n3: { solution: true, correct: true, texte: 'grep — recherche dans le contenu des fichiers', explication: 'grep cherche des motifs DANS les fichiers. grep -r "ERROR" /var/log/ parcourt récursivement tous les logs. Pour les expressions complexes : grep -E (ERE) ou grep -P (Perl regex). find et locate ne cherchent que par nom de fichier.' },
                  n4: { solution: true, correct: true, texte: 'find /etc -mtime -1', explication: 'find est l\'outil pour les recherches basées sur les métadonnées : date de modification (-mtime), taille (-size), propriétaire (-user), permissions (-perm). -mtime -1 = modifié il y a moins d\'1 jour (moins de 24h).' },
                  n5: { solution: true, correct: true, texte: 'locate — cherche dans une base de données indexée (ultra-rapide)', explication: 'locate cherche dans une base de données mise à jour périodiquement (updatedb). Très rapide mais peut manquer les fichiers très récents. Commande : locate nom_fichier. Mettez à jour la base : sudo updatedb.' },
                  n6: { solution: true, correct: true, texte: 'find / -name "nom_fichier" — cherche en temps réel', explication: 'find parcourt le système de fichiers en temps réel, donc inclut les fichiers créés à l\'instant. Plus lent que locate mais toujours à jour. Combinez : find / -name "*.log" -mtime -1 pour les logs récents.' }
                }
              }
            }
          ]
        },
        {
          id: 'intro-linux-m08',
          titre: 'Éditeurs de Texte Linux : Nano, Vim',
          cas: [
            {
              id: 'cas-il-015',
              titre: 'Éditer des fichiers avec Vim',
              difficulte: 'moyen',
              format: 'terminal',
              objectif: 'Naviguer dans Vim, passer en mode insertion, sauvegarder et quitter.',
              contexte: 'Vous devez modifier le fichier /etc/ssh/sshd_config pour désactiver l\'authentification root via SSH.',
              contenu: {
                prompt: 'root@srv:~#',
                commandes: {
                  'vim /etc/ssh/sshd_config': '[Ouverture de Vim en mode Normal]\n# This is the sshd server system-wide configuration file.\n\nPort 22\nAddressFamily any\nListenAddress 0.0.0.0\n\n#PermitRootLogin prohibit-password\nPermitRootLogin yes\n\nPubkeyAuthentication yes\n[Mode Normal — utilisez les commandes Vim]',
                  '/PermitRootLogin': '[Recherche et positionnement sur la ligne PermitRootLogin]',
                  'i': '[Passage en mode INSERT]\n-- INSERT --',
                  ':set number': '[Affiche les numéros de ligne]',
                  ':42': '[Saut à la ligne 42]',
                  'dd': '[Supprime la ligne courante]',
                  'u': '[Annule la dernière action]',
                  ':wq': '[Sauvegarde et quitte Vim]',
                  ':q!': '[Quitte sans sauvegarder — abandonne les modifications]',
                  'Esc': '[Retour en mode Normal depuis le mode INSERT]',
                  'help': 'Commandes Vim : vim /etc/ssh/sshd_config, /PermitRootLogin (recherche), i (mode insert), Esc (mode normal), :set number, :42 (aller ligne 42), dd (supprimer ligne), u (annuler), :wq (sauver+quitter), :q! (quitter sans sauver)'
                },
                validation: ['vim /etc/ssh/sshd_config', '/PermitRootLogin', ':wq'],
                indices: [
                  'Vim a 3 modes : Normal (navigation/commandes), Insert (saisie de texte, touche i), Ligne de commande (actions, touche :). Toujours Esc pour revenir en Normal.',
                  ':wq = write + quit (sauvegarder et quitter). :q! = quit forcé sans sauvegarder. /motif = recherche dans le fichier.'
                ],
                solution: ['vim /etc/ssh/sshd_config', '/PermitRootLogin', 'i', 'Esc', ':wq']
              }
            },
            {
              id: 'cas-il-016',
              titre: 'Choisir entre Nano et Vim selon le contexte',
              difficulte: 'facile',
              format: 'scenario',
              objectif: 'Identifier dans quels cas utiliser Nano ou Vim pour l\'édition de fichiers.',
              contexte: 'Vous aidez un collègue débutant à choisir l\'éditeur approprié selon les situations.',
              contenu: {
                etapes: [
                  {
                    description: 'Un débutant doit modifier rapidement un fichier de config. Quel éditeur recommandez-vous ?',
                    choix: [
                      { texte: 'Nano — interface simple, raccourcis affichés en bas, pas de modes à gérer', correct: true, feedback: 'Correct pour un débutant ! Nano affiche les raccourcis en bas de l\'écran (^X=Ctrl+X pour quitter, ^O=Ctrl+O pour sauver). Pas de mode INSERT/NORMAL à gérer. Idéal pour des modifications rapides par des non-spécialistes.' },
                      { texte: 'Vim — plus puissant donc plus efficace même pour un débutant', correct: false, feedback: 'La courbe d\'apprentissage de Vim est steep. Un débutant pourrait rester bloqué (incapable de quitter !). Vim est excellent mais nécessite un apprentissage dédié. Pour une modification rapide et ponctuelle, Nano est plus adapté.' },
                      { texte: 'Transférer le fichier en SFTP, l\'éditer sur Windows et le renvoyer', correct: false, feedback: 'Fonctionnel mais lourd pour une modification mineure. Nano est disponible sur pratiquement toutes les distributions Linux et permet l\'édition directe. SFTP est utile pour des modifications extensives sur un poste local.' }
                    ]
                  },
                  {
                    description: 'Vous devez remplacer toutes les occurrences de "http://" par "https://" dans un fichier de 500 lignes. Quel outil est le plus efficace ?',
                    choix: [
                      { texte: 'Vim avec la commande :%s/http:\\/\\//https:\\/\\//g', correct: true, feedback: 'Exact ! La commande de substitution Vim :%s/ancien/nouveau/g remplace toutes les occurrences en une seule commande. Beaucoup plus rapide que de les chercher manuellement. sed hors de Vim ferait la même chose : sed -i \'s|http://|https://|g\' fichier.' },
                      { texte: 'Nano — Ctrl+\\ pour chercher-remplacer', correct: false, feedback: 'Nano a bien une fonction chercher-remplacer (Ctrl+\\) mais elle ne remplace pas toutes les occurrences en une fois sur 500 lignes de façon aussi efficace que la substitution Vim (:%s///g). Pour des remplacements globaux, Vim ou sed sont supérieurs.' },
                      { texte: 'Ouvrir le fichier dans un navigateur web et utiliser Ctrl+H', correct: false, feedback: 'Impossible directement depuis un navigateur web pour un fichier serveur. Pour des remplacements globaux sur des fichiers texte Linux, utilisez Vim (:%s///g) ou sed (-i \'s///g\').' }
                    ]
                  },
                  {
                    description: 'Vous êtes coincé dans Vim et ne savez pas comment quitter. Quelle séquence utiliser ?',
                    choix: [
                      { texte: 'Esc puis :q! (quitter sans sauvegarder) ou :wq (quitter en sauvegardant)', correct: true, feedback: 'La solution universelle ! Esc pour revenir en mode Normal (peu importe le mode courant), puis :q! pour quitter sans sauvegarder (si vous ne voulez pas garder les modifications). C\'est la FAQ n°1 de Vim sur Internet !' },
                      { texte: 'Ctrl+C pour interrompre le processus vim', correct: false, feedback: 'Ctrl+C en mode Normal dans Vim affiche juste un message d\'information. En mode Insert, il retourne en Normal mais ne quitte pas. Pour vraiment quitter : Esc puis :q! ou :wq.' },
                      { texte: 'Fermer le terminal et en ouvrir un nouveau', correct: false, feedback: 'Cela fonctionne (Vim sauvegarde un fichier .swp pour récupération) mais c\'est une solution brutale. La bonne approche : Esc puis :q! Apprendre cette séquence est essentiel avant d\'utiliser Vim.' }
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'intro-linux-m09',
          titre: 'Processus, Redirections, TAR, Alias & Variables avancées',
          cas: [
            {
              id: 'cas-il-017',
              titre: 'Gérer les processus et créer des archives TAR',
              difficulte: 'moyen',
              format: 'terminal',
              objectif: 'Utiliser ps, kill, jobs, bg/fg et tar pour gérer les processus et les archives.',
              contexte: 'Vous gérez des processus sur un serveur et devez créer des archives compressées pour la sauvegarde.',
              contenu: {
                prompt: 'admin@srv:~$',
                commandes: {
                  'ps aux | grep apache2': 'www-data  1284  8.2  2.1 1234567  87654 ?  S   10:00   0:45 /usr/sbin/apache2 -k start\nwww-data  1285  0.1  1.8  987654  73456 ?  S   10:00   0:02 /usr/sbin/apache2 -k start',
                  'ps -ef | head -8': 'UID        PID  PPID  C STIME TTY          TIME CMD\nroot         1     0  0 08:00 ?        00:00:02 /sbin/init\nroot         2     0  0 08:00 ?        00:00:00 [kthreadd]\nroot       456     1  0 08:00 ?        00:00:01 /usr/sbin/cron',
                  'sleep 300 &': '[1] 4567',
                  'jobs': '[1]+  En cours d\'exécution   sleep 300 &',
                  'kill %1': '[1]+  Complété              sleep 300',
                  'kill -9 1284': '(Force la terminaison du processus 1284)',
                  'tar -czf /backup/etc_$(date +%Y%m%d).tar.gz /etc': 'tar : Suppression du / initial des noms de membres\n(archive créée)',
                  'tar -tzf /backup/etc_20240302.tar.gz | head -5': 'etc/\netc/passwd\netc/group\netc/shadow\netc/hosts',
                  'tar -xzf /backup/etc_20240302.tar.gz -C /tmp/restore/': '(extraction vers /tmp/restore/)',
                  'help': 'Commandes : ps aux | grep apache2, ps -ef | head -8, sleep 300 &, jobs, kill %1, kill -9 1284, tar -czf /backup/etc_$(date +%Y%m%d).tar.gz /etc, tar -tzf /backup/etc_20240302.tar.gz | head -5, tar -xzf ... -C /tmp/restore/'
                },
                validation: ['ps aux | grep apache2', 'tar -czf /backup/etc_$(date +%Y%m%d).tar.gz /etc', 'tar -tzf /backup/etc_20240302.tar.gz | head -5'],
                indices: [
                  'tar options : -c (créer), -x (extraire), -z (gzip), -j (bzip2), -f (fichier), -t (lister), -C (répertoire destination). Mnémotechnique : c(réer)z(ip)f(ichier).',
                  'kill envoie des signaux : -15 (SIGTERM, arrêt propre, défaut), -9 (SIGKILL, force). kill %1 tue le job n°1 en arrière-plan.'
                ],
                solution: ['ps aux | grep apache2', 'sleep 300 &', 'jobs', 'kill %1', 'tar -czf /backup/etc_$(date +%Y%m%d).tar.gz /etc', 'tar -tzf /backup/etc_20240302.tar.gz | head -5']
              }
            },
            {
              id: 'cas-il-018',
              titre: 'Créer des alias et personnaliser son environnement bash',
              difficulte: 'facile',
              format: 'scenario',
              objectif: 'Créer des alias utiles et les rendre persistants dans ~/.bashrc.',
              contexte: 'Vous configurez votre environnement bash pour gagner en productivité au quotidien.',
              contenu: {
                etapes: [
                  {
                    description: 'Vous tapez souvent "ls -lah" et voulez raccourcir en "ll". Comment créer cet alias de façon permanente ?',
                    choix: [
                      { texte: 'Ajouter alias ll=\'ls -lah\' dans ~/.bashrc puis source ~/.bashrc', correct: true, feedback: 'Correct ! La ligne alias ll=\'ls -lah\' dans ~/.bashrc est chargée à chaque démarrage du shell. source ~/.bashrc (ou . ~/.bashrc) applique immédiatement les changements sans avoir à se reconnecter.' },
                      { texte: 'Taper alias ll=\'ls -lah\' directement dans le terminal', correct: false, feedback: 'Taper l\'alias directement dans le terminal le crée pour la session courante uniquement. À la prochaine connexion, il n\'existera plus. Ajoutez-le dans ~/.bashrc pour la persistance.' },
                      { texte: 'Créer un fichier /usr/local/bin/ll contenant la commande', correct: false, feedback: 'Fonctionnel mais lourd pour un simple raccourci. Un alias dans ~/.bashrc est plus simple, plus propre. Les scripts dans /usr/local/bin sont utiles pour des programmes plus complexes, pas pour de simples alias de commandes.' }
                    ]
                  },
                  {
                    description: 'Vous voulez que chaque commande rm soit confirmée automatiquement. Quel alias utiliser ?',
                    choix: [
                      { texte: 'alias rm=\'rm -i\' dans ~/.bashrc', correct: true, feedback: 'Correct ! rm -i demande confirmation avant chaque suppression. C\'est une protection utile contre les suppressions accidentelles. Cependant, notez que dans les scripts, cet alias n\'est pas actif par défaut (les aliases ne s\'appliquent pas dans les scripts sauf avec shopt -s expand_aliases).' },
                      { texte: 'alias rm=\'echo "Suppression interdite"\'', correct: false, feedback: 'Cela désactiverait complètement rm, ce qui bloquerait de nombreuses opérations légitimes. L\'objectif est la confirmation, pas l\'interdiction. Utilisez rm -i pour avoir une confirmation interactive.' },
                      { texte: 'chmod 000 /bin/rm pour empêcher son utilisation', correct: false, feedback: 'Très mauvaise idée ! Supprimer les droits de /bin/rm casserait de nombreux scripts système et outils qui utilisent rm en interne. Utilisez l\'alias rm -i qui est une protection douce et réversible.' }
                    ]
                  },
                  {
                    description: 'Comment lister tous les alias actuellement définis dans votre shell ?',
                    choix: [
                      { texte: 'La commande alias sans argument', correct: true, feedback: 'Exact ! alias seul liste tous les aliases définis dans la session courante. Vous y verrez les aliases pré-définis de Debian/Ubuntu (ll, ls --color=auto, etc.) et ceux que vous avez ajoutés.' },
                      { texte: 'cat ~/.bashrc | grep alias', correct: false, feedback: 'cat ~/.bashrc | grep alias liste les aliases définis dans votre .bashrc, mais pas nécessairement ceux actifs dans la session (certains peuvent venir d\'autres fichiers : /etc/bash.bashrc, ~/.bash_aliases). La commande alias est plus complète.' },
                      { texte: 'ls /etc/aliases', correct: false, feedback: '/etc/aliases est le fichier d\'alias de messagerie (mail aliases pour sendmail/postfix), pas les aliases du shell bash. Pour les aliases bash, utilisez la commande alias sans argument.' }
                    ]
                  }
                ]
              }
            }
          ]
        }
      ]
    },
  {
    id: 'infra-reseau',
    titre: 'Les infrastructures réseau',
    emoji: '🔌',
    modules: [
      {
        id: 'infra-m01',
        titre: 'Configuration initiale des périphériques',
        cas: [
          {
            id: 'cas-infra-001',
            titre: 'Configurer un switch Cisco depuis zéro',
            difficulte: 'facile',
            format: 'terminal',
            objectif: 'Réaliser la configuration de base d\'un switch Cisco : hostname, mot de passe, bannière, accès console et Telnet',
            contexte: 'Vous venez de sortir un nouveau switch Cisco Catalyst de la boîte. Vous le connectez via le câble console. Il faut le configurer avant de le déployer.',
            contenu: {
              prompt: 'Switch>',
              commandes: {
                'help': 'Commandes disponibles : enable, conf t, hostname, enable secret, line console 0, line vty 0 4, banner motd, service password-encryption, copy running-config startup-config, show running-config',
                'enable': 'Switch#',
                'conf t': 'Enter configuration commands, one per line. End with CNTL/Z.\nSwitch(config)#',
                'hostname SW-PARIS': 'SW-PARIS(config)#',
                'enable secret Cisco123!': 'SW-PARIS(config)#',
                'line console 0': 'SW-PARIS(config-line)#',
                'password Console123': 'SW-PARIS(config-line)#',
                'login': 'SW-PARIS(config-line)#',
                'exit': 'SW-PARIS(config)#',
                'line vty 0 4': 'SW-PARIS(config-line)#',
                'password Telnet123': 'SW-PARIS(config-line)#',
                'service password-encryption': 'SW-PARIS(config)#',
                'banner motd #Acces reserve aux administrateurs autorisés#': 'SW-PARIS(config)#',
                'end': 'SW-PARIS#\n%SYS-5-CONFIG_I: Configured from console by console',
                'copy running-config startup-config': 'Destination filename [startup-config]? \nBuilding configuration...\n[OK]',
                'show running-config': 'Building configuration...\n\nCurrent configuration : 1248 bytes\n!\nhostname SW-PARIS\n!\nenable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0\n!\nservice password-encryption\n!\nbanner motd ^CAcces reserve aux administrateurs autorisés^C\n!\nline con 0\n password 7 070C285F4D06\n login\n!\nline vty 0 4\n password 7 13061E010803\n login\n!'
              },
              validation: ['enable', 'conf t', 'hostname', 'enable secret', 'service password-encryption', 'copy running-config startup-config'],
              indices: [
                'Passez d\'abord en mode privilégié avec enable, puis en mode configuration avec conf t',
                'Configurez le hostname, puis l\'enable secret pour sécuriser le mode privilégié',
                'N\'oubliez pas service password-encryption pour chiffrer les mots de passe en clair',
                'Sauvegardez avec copy running-config startup-config'
              ],
              solution: [
                'enable',
                'conf t',
                'hostname SW-PARIS',
                'enable secret Cisco123!',
                'line console 0',
                'password Console123',
                'login',
                'exit',
                'line vty 0 4',
                'password Telnet123',
                'login',
                'exit',
                'service password-encryption',
                'banner motd #Acces reserve aux administrateurs autorisés#',
                'end',
                'copy running-config startup-config'
              ]
            }
          },
          {
            id: 'cas-infra-002',
            titre: 'Diagnostic : switch injoignable',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Diagnostiquer pourquoi un switch Cisco n\'est plus accessible via Telnet/SSH et rétablir l\'accès',
            contexte: 'Le switch SW-BUREAU n\'est plus accessible en Telnet depuis la supervision. Le switch est alimenté (LED verte) et les ports sont actifs. Dernier accès il y a 3 jours.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Le switch est alimenté et les ports sont actifs. Quelle est votre première vérification ?',
                  choix: [
                    { texte: 'Vérifier la configuration IP de l\'interface VLAN de gestion via câble console', suite: 'n2' },
                    { texte: 'Rebooter le switch immédiatement', suite: 'n_bad1' },
                    { texte: 'Remplacer le switch', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'Vous accédez via le câble console. show interface vlan 1 montre "Vlan1 is administratively down". Que faites-vous ?',
                  choix: [
                    { texte: 'interface vlan 1 → no shutdown → vérifier l\'adresse IP', suite: 'n3' },
                    { texte: 'Supprimer et recréer le VLAN 1', suite: 'n_bad3' },
                    { texte: 'Changer de VLAN de gestion sans configurer l\'IP', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'L\'interface VLAN 1 est maintenant up/up avec une IP. show ip default-gateway est vide. Le Telnet depuis la supervision distante reste impossible. Quelle est la cause ?',
                  choix: [
                    { texte: 'La passerelle par défaut n\'est pas configurée → ip default-gateway x.x.x.x', suite: 'n4' },
                    { texte: 'Le protocole Telnet est désactivé globalement', suite: 'n_bad5' },
                    { texte: 'Le mot de passe VTY a expiré', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'Passerelle configurée — accès Telnet rétabli',
                  explication: 'Sans passerelle par défaut (ip default-gateway), le switch ne sait pas comment atteindre les machines hors de son sous-réseau, rendant le Telnet impossible depuis la supervision distante. La séquence correcte : console → vérifier interface VLAN → no shutdown + IP → configurer gateway → sauvegarder.'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'Reboot non justifié',
                  explication: 'Rebooter sans diagnostic est destructeur : on perd la running-config si elle n\'est pas sauvegardée, et le problème (interface down, IP manquante, gateway absente) restera après redémarrage. Toujours diagnostiquer via console avant toute action irréversible.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'Remplacement prématuré',
                  explication: 'Remplacer un switch fonctionnel pour un problème de configuration est une erreur coûteuse. LED verte + ports actifs = switch OK. Le problème est logiciel (configuration IP ou gateway manquante).'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'Suppression VLAN inutile',
                  explication: 'Supprimer le VLAN 1 sur un switch Cisco est risqué et inutile ici. La commande no shutdown sur l\'interface VLAN 1 suffit. La suppression du VLAN couperait tous les ports non tagués.'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'VLAN sans IP = inutile',
                  explication: 'Changer de VLAN de gestion sans lui attribuer une adresse IP ne résout rien. Il faut obligatoirement : créer l\'interface VLAN, lui donner une IP, faire no shutdown, et configurer la gateway.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'Telnet ne se désactive pas spontanément',
                  explication: 'Telnet ne se désactive pas tout seul sur un Cisco. Si show running-config montre les lignes VTY avec login et password, Telnet est actif. Le problème ici est l\'absence de gateway pour atteindre le switch depuis un réseau distant.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'Les mots de passe Cisco n\'expirent pas',
                  explication: 'Les mots de passe configurés sur les lignes VTY d\'un switch Cisco IOS n\'ont pas de durée d\'expiration par défaut. L\'absence de connexion possible vient d\'un problème réseau (IP ou gateway), pas d\'un mot de passe expiré.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'infra-m02',
        titre: 'La commutation Ethernet',
        cas: [
          {
            id: 'cas-infra-003',
            titre: 'Configurer des VLANs sur un switch',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Créer des VLANs, les nommer, et assigner des ports en mode access sur un switch Cisco',
            contexte: 'L\'entreprise veut segmenter son réseau : VLAN 10 (RH), VLAN 20 (Compta), VLAN 30 (IT). Vous devez créer ces VLANs et assigner les ports Fa0/1-5 au VLAN 10, Fa0/6-10 au VLAN 20, Fa0/11-15 au VLAN 30.',
            contenu: {
              prompt: 'SW-SITE(config)#',
              commandes: {
                'help': 'Commandes disponibles : vlan, name, interface, interface range, switchport mode, switchport access vlan, show vlan brief',
                'vlan 10': 'SW-SITE(config-vlan)#',
                'name RH': 'SW-SITE(config-vlan)#',
                'vlan 20': 'SW-SITE(config-vlan)#',
                'name COMPTA': 'SW-SITE(config-vlan)#',
                'vlan 30': 'SW-SITE(config-vlan)#',
                'name IT': 'SW-SITE(config-vlan)#',
                'exit': 'SW-SITE(config)#',
                'interface range fa0/1-5': 'SW-SITE(config-if-range)#',
                'switchport mode access': 'SW-SITE(config-if-range)#',
                'switchport access vlan 10': 'SW-SITE(config-if-range)#',
                'interface range fa0/6-10': 'SW-SITE(config-if-range)#',
                'switchport access vlan 20': 'SW-SITE(config-if-range)#',
                'interface range fa0/11-15': 'SW-SITE(config-if-range)#',
                'switchport access vlan 30': 'SW-SITE(config-if-range)#',
                'show vlan brief': 'VLAN Name                             Status    Ports\n---- -------------------------------- --------- -------------------------------\n1    default                          active    Fa0/16, Fa0/17, Fa0/18, Fa0/19\n10   RH                               active    Fa0/1, Fa0/2, Fa0/3, Fa0/4, Fa0/5\n20   COMPTA                           active    Fa0/6, Fa0/7, Fa0/8, Fa0/9, Fa0/10\n30   IT                               active    Fa0/11, Fa0/12, Fa0/13, Fa0/14, Fa0/15\n1002 fddi-default                     act/unsup \n1003 token-ring-default               act/unsup'
              },
              validation: ['vlan 10', 'name RH', 'vlan 20', 'vlan 30', 'interface range', 'switchport access vlan', 'show vlan brief'],
              indices: [
                'Créez les VLANs en mode config : vlan 10, puis name RH',
                'Utilisez interface range fa0/1-5 pour configurer plusieurs ports en une fois',
                'Sur chaque range : switchport mode access puis switchport access vlan X',
                'Vérifiez avec show vlan brief'
              ],
              solution: [
                'vlan 10',
                'name RH',
                'exit',
                'vlan 20',
                'name COMPTA',
                'exit',
                'vlan 30',
                'name IT',
                'exit',
                'interface range fa0/1-5',
                'switchport mode access',
                'switchport access vlan 10',
                'exit',
                'interface range fa0/6-10',
                'switchport mode access',
                'switchport access vlan 20',
                'exit',
                'interface range fa0/11-15',
                'switchport mode access',
                'switchport access vlan 30',
                'exit',
                'show vlan brief'
              ]
            }
          },
          {
            id: 'cas-infra-004',
            titre: 'Configurer un port trunk entre deux switches',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Configurer un lien trunk 802.1Q entre deux switches pour propager les VLANs 10, 20 et 30',
            contexte: 'Deux switches (SW-A et SW-B) sont reliés via Gi0/1. Les VLANs 10, 20 et 30 existent sur SW-A. Vous devez configurer le trunk sur SW-A pour que ces VLANs traversent le lien.',
            contenu: {
              prompt: 'SW-A(config)#',
              commandes: {
                'help': 'Commandes : interface, switchport mode trunk, switchport trunk encapsulation, switchport trunk allowed vlan, show interfaces trunk',
                'interface gi0/1': 'SW-A(config-if)#',
                'switchport trunk encapsulation dot1q': 'SW-A(config-if)#',
                'switchport mode trunk': 'SW-A(config-if)#',
                'switchport trunk allowed vlan 10,20,30': 'SW-A(config-if)#',
                'end': 'SW-A#',
                'show interfaces trunk': 'Port        Mode             Encapsulation  Status        Native vlan\nGi0/1       on               802.1q         trunking      1\n\nPort        Vlans allowed on trunk\nGi0/1       10,20,30\n\nPort        Vlans allowed and active in management domain\nGi0/1       10,20,30\n\nPort        Vlans in spanning tree forwarding state and not pruned\nGi0/1       10,20,30'
              },
              validation: ['interface gi0/1', 'switchport mode trunk', 'switchport trunk allowed vlan', 'show interfaces trunk'],
              indices: [
                'Sur les switches Catalyst plus anciens, précisez l\'encapsulation : switchport trunk encapsulation dot1q',
                'switchport mode trunk force le port en mode trunk permanent (pas de négociation DTP)',
                'Limitez les VLANs autorisés sur le trunk avec switchport trunk allowed vlan 10,20,30',
                'Vérifiez avec show interfaces trunk'
              ],
              solution: [
                'interface gi0/1',
                'switchport trunk encapsulation dot1q',
                'switchport mode trunk',
                'switchport trunk allowed vlan 10,20,30',
                'end',
                'show interfaces trunk'
              ]
            }
          }
        ]
      },
      {
        id: 'infra-m03',
        titre: 'Le routage',
        cas: [
          {
            id: 'cas-infra-005',
            titre: 'Configurer des routes statiques sur un routeur Cisco',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Configurer les interfaces et les routes statiques sur un routeur Cisco pour interconnecter trois réseaux',
            contexte: 'Routeur R1 connecte trois réseaux : 192.168.1.0/24 (LAN A sur Gi0/0), 192.168.2.0/24 (LAN B sur Gi0/1), 10.0.0.0/30 (WAN vers R2 sur Se0/0). R2 gère le réseau 192.168.3.0/24. Configurez R1 pour atteindre ce réseau distant.',
            contenu: {
              prompt: 'R1(config)#',
              commandes: {
                'help': 'Commandes : interface, ip address, no shutdown, ip route, show ip route, show ip interface brief',
                'interface gi0/0': 'R1(config-if)#',
                'ip address 192.168.1.1 255.255.255.0': 'R1(config-if)#',
                'no shutdown': 'R1(config-if)#\n%LINK-5-CHANGED: Interface GigabitEthernet0/0, changed state to up',
                'interface gi0/1': 'R1(config-if)#',
                'ip address 192.168.2.1 255.255.255.0': 'R1(config-if)#',
                'interface se0/0': 'R1(config-if)#',
                'ip address 10.0.0.1 255.255.255.252': 'R1(config-if)#',
                'exit': 'R1(config)#',
                'ip route 192.168.3.0 255.255.255.0 10.0.0.2': 'R1(config)#',
                'show ip route': 'Codes: C - connected, S - static, R - RIP\n\nC    10.0.0.0/30 is directly connected, Serial0/0\nC    192.168.1.0/24 is directly connected, GigabitEthernet0/0\nC    192.168.2.0/24 is directly connected, GigabitEthernet0/1\nS    192.168.3.0/24 [1/0] via 10.0.0.2',
                'show ip interface brief': 'Interface              IP-Address      OK? Method Status                Protocol\nGigabitEthernet0/0     192.168.1.1     YES manual up                    up\nGigabitEthernet0/1     192.168.2.1     YES manual up                    up\nSerial0/0              10.0.0.1        YES manual up                    up'
              },
              validation: ['ip address', 'no shutdown', 'ip route', 'show ip route'],
              indices: [
                'Configurez chaque interface avec ip address, puis no shutdown pour l\'activer',
                'La route statique : ip route <réseau_dest> <masque> <next-hop>',
                'Next-hop = adresse IP du routeur suivant (ici 10.0.0.2, l\'interface de R2 côté WAN)',
                'Vérifiez avec show ip route — les routes statiques apparaissent avec S'
              ],
              solution: [
                'interface gi0/0',
                'ip address 192.168.1.1 255.255.255.0',
                'no shutdown',
                'exit',
                'interface gi0/1',
                'ip address 192.168.2.1 255.255.255.0',
                'no shutdown',
                'exit',
                'interface se0/0',
                'ip address 10.0.0.1 255.255.255.252',
                'no shutdown',
                'exit',
                'ip route 192.168.3.0 255.255.255.0 10.0.0.2',
                'show ip route'
              ]
            }
          },
          {
            id: 'cas-infra-006',
            titre: 'Diagnostic de panne de routage',
            difficulte: 'difficile',
            format: 'arbre',
            objectif: 'Identifier et corriger une panne de routage entre deux réseaux interconnectés par un routeur Cisco',
            contexte: 'Les postes du réseau 192.168.10.0/24 ne peuvent plus joindre le réseau 192.168.20.0/24. Les deux réseaux sont sur le même routeur R1. Les switches locaux fonctionnent.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Les deux réseaux sont sur R1 mais ne communiquent plus. Quelle est votre première commande de diagnostic ?',
                  choix: [
                    { texte: 'show ip interface brief pour voir l\'état des interfaces', suite: 'n2' },
                    { texte: 'ping 192.168.20.1 depuis R1 directement', suite: 'n_bad1' },
                    { texte: 'Redémarrer le routeur', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'show ip interface brief montre : Gi0/0 (192.168.10.1) administratively down / down. Gi0/1 (192.168.20.1) up / up. Que faites-vous ?',
                  choix: [
                    { texte: 'interface gi0/0 → no shutdown pour réactiver l\'interface', suite: 'n3' },
                    { texte: 'Supprimer et reconfigurer complètement l\'interface Gi0/0', suite: 'n_bad3' },
                    { texte: 'Changer l\'adresse IP de Gi0/0', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'Gi0/0 est maintenant up/up. Mais les postes du réseau .10 ne pinguent toujours pas le réseau .20. show ip route est correct. Quelle autre cause possible ?',
                  choix: [
                    { texte: 'Vérifier la passerelle par défaut configurée sur les postes du réseau .10', suite: 'n4' },
                    { texte: 'Ajouter une route statique entre les deux réseaux directement connectés', suite: 'n_bad5' },
                    { texte: 'Installer un deuxième routeur', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'Passerelle incorrecte sur les postes — corrigée',
                  explication: 'Excellente démarche : interface down → no shutdown → interface up → ping toujours KO → vérifier les postes. Les postes du réseau .10 avaient une ancienne passerelle (ex. 192.168.10.254 inexistante) au lieu de 192.168.10.1 (l\'interface Gi0/0 du routeur). Corriger la passerelle sur les postes résout le problème.'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'Ping depuis R1 trompeur',
                  explication: 'Un ping depuis R1 lui-même utilise ses propres interfaces actives et peut réussir même si les postes ne peuvent pas communiquer. La première étape doit être show ip interface brief pour identifier un problème d\'interface.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'Redémarrage non justifié',
                  explication: 'Redémarrer sans diagnostic fait perdre la running-config non sauvegardée et ne résout pas les pannes de configuration (interface shutdown, route manquante, passerelle incorrecte). Toujours diagnostiquer en premier.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'Reconfiguration excessive',
                  explication: 'Si l\'interface est en "administratively down", il suffit de faire no shutdown. Supprimer et recréer la configuration risque d\'introduire des erreurs et est inutilement long.'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'L\'IP n\'est pas le problème',
                  explication: '"Administratively down" signifie que l\'interface a été désactivée avec shutdown. L\'IP peut être parfaitement correcte. Changer l\'IP sans faire no shutdown ne résoudrait pas la panne.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'Routes statiques inutiles ici',
                  explication: 'Les réseaux 192.168.10.0/24 et 192.168.20.0/24 sont directement connectés au même routeur. Un routeur route automatiquement entre ses réseaux directement connectés. Pas besoin de routes statiques entre eux.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'Deuxième routeur superflu',
                  explication: 'Un seul routeur suffit pour interconnecter plusieurs réseaux. Le problème est une interface désactivée et/ou une mauvaise passerelle sur les postes — problème de configuration, pas de capacité matérielle.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'infra-m04',
        titre: 'Les réseaux sans fil',
        cas: [
          {
            id: 'cas-infra-007',
            titre: 'Choisir le bon standard WiFi pour un déploiement',
            difficulte: 'facile',
            format: 'scenario',
            objectif: 'Savoir choisir le standard WiFi adapté à un besoin (fréquence, débit, portée, interférences)',
            contexte: 'Vous conseillez trois clients sur leur infrastructure WiFi. Chaque situation a des contraintes différentes.',
            contenu: {
              etapes: [
                {
                  description: 'Client 1 : PME de 50 personnes dans un open-space de 500m². Beaucoup d\'appareils mobiles, besoin de débits élevés. Des micro-ondes sont présents en salle de pause. Quel standard WiFi recommandez-vous ?',
                  choix: [
                    { texte: 'WiFi 802.11n (WiFi 4) sur 2,4 GHz', correct: false, feedback: 'Le 2,4 GHz est plus sujet aux interférences (micro-ondes, Bluetooth) et plus encombré dans un environnement dense. Avec 50 utilisateurs, les débits seront limités. Pas le meilleur choix ici.' },
                    { texte: 'WiFi 802.11ac (WiFi 5) sur 5 GHz', correct: true, feedback: 'Excellent ! Le WiFi 5 (802.11ac) sur 5 GHz offre des débits élevés (jusqu\'à 3,5 Gbps théoriques), une meilleure gestion de la densité d\'utilisateurs (MU-MIMO), et évite les interférences 2,4 GHz des micro-ondes. Idéal pour une PME dense.' },
                    { texte: 'WiFi 802.11a sur 5 GHz', correct: false, feedback: '802.11a est un standard très ancien (1999, 54 Mbps max). Bien qu\'en 5 GHz, ses débits sont très limités pour 50 utilisateurs modernes. Préférez 802.11ac ou 802.11ax (WiFi 6).' }
                  ]
                },
                {
                  description: 'Client 2 : Entrepôt logistique de 2000m² avec grandes hauteurs de plafond et peu de murs. Priorité à la portée maximale. Les débits peuvent être modestes.',
                  choix: [
                    { texte: '802.11ac sur 5 GHz — haute densité', correct: false, feedback: 'Le 5 GHz offre de bons débits mais une portée réduite (les hautes fréquences s\'atténuent plus vite). Pour un grand entrepôt où la portée prime, ce n\'est pas le meilleur choix sans de nombreux points d\'accès.' },
                    { texte: '802.11n (WiFi 4) sur 2,4 GHz — longue portée', correct: true, feedback: 'Correct ! Le 2,4 GHz a une meilleure propagation et portée que le 5 GHz, surtout dans les grands espaces ouverts. 802.11n offre des débits suffisants pour des terminaux de scan de codes-barres. Moins de points d\'accès nécessaires.' },
                    { texte: 'Ethernet filaire uniquement', correct: false, feedback: 'Dans un entrepôt avec chariots et scanners mobiles, le WiFi est indispensable pour la mobilité. L\'Ethernet filaire serait impossible pour les équipements mobiles.' }
                  ]
                },
                {
                  description: 'Client 3 : Hôpital équipant 300 chambres. Besoin de fiabilité maximale et cohabitation avec de nombreux appareils WiFi. Quelle solution ?',
                  choix: [
                    { texte: 'WiFi 802.11ax (WiFi 6) avec contrôleur centralisé (WLC)', correct: true, feedback: 'Parfait ! WiFi 6 (802.11ax) est conçu pour les environnements denses avec OFDMA, TWT, et meilleure gestion des interférences. Un contrôleur WiFi centralisé permet la gestion centralisée, le roaming transparent et la QoS pour les équipements médicaux.' },
                    { texte: 'Points d\'accès WiFi 5 autonomes sans contrôleur', correct: false, feedback: 'Sans contrôleur, chaque AP est géré indépendamment : le roaming entre chambres est saccadé et la cohérence de configuration est difficile. Pour 300 chambres, un contrôleur est indispensable.' },
                    { texte: 'WiFi 4 sur 2,4 GHz pour la compatibilité maximale', correct: false, feedback: 'La compatibilité n\'est pas la priorité dans un hôpital moderne. Déployer du WiFi 4 sacrifierait les performances et la gestion des interférences dans un environnement à très forte densité d\'appareils RF.' }
                  ]
                }
              ]
            }
          },
          {
            id: 'cas-infra-008',
            titre: 'Sécuriser un réseau WiFi d\'entreprise',
            difficulte: 'moyen',
            format: 'scenario',
            objectif: 'Comprendre et appliquer les bonnes pratiques de sécurité WiFi : WPA3, SSID, isolation, authentification 802.1X',
            contexte: 'Vous auditez la sécurité WiFi d\'une TPE. Actuellement : SSID "Entreprise-WiFi" visible, WPA2-Personal avec mot de passe "Paris2024", un seul réseau pour employés et visiteurs.',
            contenu: {
              etapes: [
                {
                  description: 'Quel est le premier problème de sécurité le plus critique dans cette configuration ?',
                  choix: [
                    { texte: 'Le SSID est trop visible — il faut le masquer', correct: false, feedback: 'Masquer le SSID est une sécurité par l\'obscurité très faible : les outils de scan WiFi détectent les réseaux cachés facilement via les probe requests. Ce n\'est pas le problème critique.' },
                    { texte: 'Employés et visiteurs sur le même réseau WiFi', correct: true, feedback: 'Critique ! Un visiteur malveillant sur le même réseau peut scanner les postes des employés, accéder aux partages réseau, ou lancer des attaques man-in-the-middle. Il faut séparer les deux populations avec un réseau invité isolé.' },
                    { texte: 'Le nom du SSID révèle le nom de l\'entreprise', correct: false, feedback: 'Bien que ce soit une bonne pratique de ne pas révéler d\'informations dans le SSID, la promiscuité employés/visiteurs est bien plus dangereuse.' }
                  ]
                },
                {
                  description: 'Pour le réseau employés, quelle méthode d\'authentification est la plus adaptée à une PME de 20 personnes ?',
                  choix: [
                    { texte: 'WPA2-Personal avec un mot de passe complexe changé tous les 3 mois', correct: false, feedback: 'WPA2-Personal a un problème majeur : tous les employés partagent le même mot de passe. Quand un employé part, il faut changer le mot de passe et reconfigurer tous les appareils. Peu scalable.' },
                    { texte: 'WPA2/WPA3-Enterprise avec authentification 802.1X via serveur RADIUS', correct: true, feedback: 'Excellent ! 802.1X avec RADIUS permet l\'authentification individuelle (login/mot de passe AD ou certificat). Quand un employé part, il suffit de désactiver son compte AD. C\'est la solution professionnelle standard.' },
                    { texte: 'Filtrage MAC uniquement', correct: false, feedback: 'Le filtrage MAC est facilement contournable : les adresses MAC sont transmises en clair et peuvent être spoofées en quelques secondes. Cette méthode n\'offre aucune sécurité réelle.' }
                  ]
                },
                {
                  description: 'Pour le réseau invité, quelle configuration est recommandée ?',
                  choix: [
                    { texte: 'SSID invité séparé, VLAN dédié, isolation client-à-client, accès Internet uniquement', correct: true, feedback: 'Configuration idéale ! SSID séparé + VLAN dédié = segmentation réseau. L\'isolation client-à-client empêche les visiteurs de se scanner entre eux. L\'accès limité à Internet bloque l\'accès au LAN interne.' },
                    { texte: 'Même SSID que les employés mais avec un mot de passe différent', correct: false, feedback: 'Même SSID = même réseau = même problème de promiscuité. Il faut obligatoirement un SSID distinct mappé sur un VLAN différent.' },
                    { texte: 'SSID invité ouvert (sans mot de passe) pour faciliter l\'accès', correct: false, feedback: 'Un réseau ouvert expose tous les visiteurs aux attaques man-in-the-middle d\'autres visiteurs malveillants. Au minimum, utiliser WPA2-Personal avec un mot de passe simple, ou un portail captif.' }
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        id: 'infra-m05',
        titre: 'Listes de contrôle d\'accès (ACL)',
        cas: [
          {
            id: 'cas-infra-009',
            titre: 'Créer une ACL standard pour restreindre l\'accès',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Créer une ACL standard Cisco pour bloquer un réseau et autoriser le reste, puis l\'appliquer sur une interface',
            contexte: 'Sur le routeur R1, vous devez empêcher le réseau 192.168.50.0/24 d\'accéder aux serveurs sur l\'interface Gi0/1 (réseau 192.168.10.0/24), tout en autorisant les autres réseaux.',
            contenu: {
              prompt: 'R1(config)#',
              commandes: {
                'help': 'Commandes : access-list, permit, deny, any, interface, ip access-group, show access-lists',
                'access-list 10 deny 192.168.50.0 0.0.0.255': 'R1(config)#',
                'access-list 10 permit any': 'R1(config)#',
                'interface gi0/1': 'R1(config-if)#',
                'ip access-group 10 out': 'R1(config-if)#',
                'end': 'R1#',
                'show access-lists': 'Standard IP access list 10\n    10 deny   192.168.50.0 0.0.0.255 (42 matches)\n    20 permit any (1205 matches)',
                'show ip interface gi0/1': 'GigabitEthernet0/1 is up, line protocol is up\n  Internet address is 192.168.10.1/24\n  Outgoing access list is 10\n  Inbound  access list is not set'
              },
              validation: ['access-list 10 deny', 'access-list 10 permit any', 'ip access-group 10 out', 'show access-lists'],
              indices: [
                'Les ACL standard filtrent uniquement sur l\'IP source (numéros 1-99)',
                'L\'ordre des règles est crucial : deny spécifique d\'abord, puis permit any',
                'Le masque générique (wildcard) est l\'inverse du masque : 0.0.0.255 pour un /24',
                'Il y a un "deny any" implicite à la fin — sans permit any, tout serait bloqué !',
                'Appliquez l\'ACL sur l\'interface la plus proche de la destination (out) pour une ACL standard'
              ],
              solution: [
                'access-list 10 deny 192.168.50.0 0.0.0.255',
                'access-list 10 permit any',
                'interface gi0/1',
                'ip access-group 10 out',
                'end',
                'show access-lists'
              ]
            }
          },
          {
            id: 'cas-infra-010',
            titre: 'Diagnostic : ACL qui bloque trop',
            difficulte: 'difficile',
            format: 'arbre',
            objectif: 'Identifier une ACL mal configurée qui bloque du trafic légitime et la corriger',
            contexte: 'Après une maintenance, les serveurs web du DMZ 172.16.1.0/24 sont inaccessibles depuis Internet. Les serveurs fonctionnent. Une ACL étendue 100 a été modifiée hier.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Les serveurs web sont inaccessibles après modification d\'ACL. Quelle est votre première action ?',
                  choix: [
                    { texte: 'show access-lists 100 pour voir les règles et les compteurs de correspondances', suite: 'n2' },
                    { texte: 'Supprimer complètement l\'ACL 100 pour rétablir l\'accès immédiatement', suite: 'n_bad1' },
                    { texte: 'Redémarrer les serveurs web', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'show access-lists 100 montre :\n  10 permit tcp 172.16.1.0 0.0.0.255 any eq 80 (0 matches)\n  20 permit tcp 172.16.1.0 0.0.0.255 any eq 443 (0 matches)\n  30 deny ip any any (15000 matches)\nQu\'est-ce que cela révèle ?',
                  choix: [
                    { texte: 'Les règles permit ont source et destination inversées : elles autorisent le trafic sortant des serveurs, pas entrant vers eux', suite: 'n3' },
                    { texte: 'Il manque une règle pour le port 8080', suite: 'n_bad3' },
                    { texte: 'Le deny any any final est le problème — il faut le supprimer', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'L\'ACL autorise le trafic SOURCE 172.16.1.0/24 (les serveurs) vers n\'importe où, mais pas le trafic entrant VERS les serveurs. Comment corriger ?',
                  choix: [
                    { texte: 'Remplacer par : permit tcp any 172.16.1.0 0.0.0.255 eq 80 + eq 443, puis deny ip any any', suite: 'n4' },
                    { texte: 'Inverser le sens d\'application de l\'ACL sur l\'interface (in ↔ out)', suite: 'n_bad5' },
                    { texte: 'Changer les numéros de séquence des règles', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'ACL corrigée — serveurs web accessibles',
                  explication: 'Problème classique des ACL : confondre source et destination. L\'ACL d\'origine autorisait le trafic généré PAR les serveurs vers Internet, mais pas le trafic entrant depuis Internet VERS les serveurs. La correction : "permit tcp any 172.16.1.0/24 eq 80/443" autorise n\'importe quelle source à atteindre les serveurs sur les ports web.'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'Suppression ACL = brèche sécurité',
                  explication: 'Supprimer l\'ACL rétablit l\'accès mais expose complètement le DMZ. En production, on ne supprime jamais une ACL de sécurité sans remplaçant prêt. Il faut d\'abord analyser, corriger, tester, puis déployer.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'Les serveurs ne sont pas le problème',
                  explication: 'L\'énoncé précise que les serveurs fonctionnent. Le problème est réseau/ACL puisque la panne a commencé après la modification d\'une ACL.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'Le port 8080 n\'est pas la cause',
                  explication: 'Les compteurs "0 matches" sur les règles permit (80 et 443) et "15000 matches" sur deny any any montrent que tout le trafic est bloqué. Ce n\'est pas une question de port manquant, mais d\'une mauvaise direction dans les règles permit.'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'Le deny any any final est normal',
                  explication: 'Le "deny ip any any" explicite est une bonne pratique : il rend le deny implicite visible dans les logs. Le supprimer ne résoudrait rien si les règles permit sont incorrectes. Le problème est dans la logique source/destination.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'Inverser in/out ne corrige pas la logique',
                  explication: 'Inverser le sens d\'application modifie le point de filtrage mais pas la logique des règles. Si les règles autorisent le mauvais sens de trafic, inverser in/out ne les corrige pas.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'Les numéros de séquence ne sont pas le problème',
                  explication: 'Les numéros de séquence définissent l\'ordre d\'évaluation. Ici l\'ordre est correct (permits avant deny). Le problème est la logique des règles elles-mêmes (mauvaise source/destination).'
                }
              }
            }
          }
        ]
      },
      {
        id: 'infra-m06',
        titre: 'NAT & NAPT',
        cas: [
          {
            id: 'cas-infra-011',
            titre: 'Configurer le PAT (NAPT) sur un routeur Cisco',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Configurer le PAT (Port Address Translation) pour permettre à un réseau privé d\'accéder à Internet via une seule IP publique',
            contexte: 'Routeur R1 : interface Gi0/0 côté LAN (192.168.1.0/24), interface Se0/0 côté Internet (IP publique 203.0.113.1). Configurez le PAT pour que tout le réseau interne puisse naviguer sur Internet.',
            contenu: {
              prompt: 'R1(config)#',
              commandes: {
                'help': 'Commandes : access-list, ip nat inside source list, interface, ip nat inside, ip nat outside, show ip nat translations, show ip nat statistics',
                'access-list 1 permit 192.168.1.0 0.0.0.255': 'R1(config)#',
                'ip nat inside source list 1 interface se0/0 overload': 'R1(config)#',
                'interface gi0/0': 'R1(config-if)#',
                'ip nat inside': 'R1(config-if)#',
                'exit': 'R1(config)#',
                'interface se0/0': 'R1(config-if)#',
                'ip nat outside': 'R1(config-if)#',
                'end': 'R1#',
                'show ip nat translations': 'Pro Inside global      Inside local       Outside local      Outside global\ntcp 203.0.113.1:1024  192.168.1.10:49152  8.8.8.8:53         8.8.8.8:53\ntcp 203.0.113.1:1025  192.168.1.11:49153  142.250.74.46:443  142.250.74.46:443',
                'show ip nat statistics': 'Total active translations: 2 (0 static, 2 dynamic; 2 extended)\nOutside interfaces: Serial0/0\nInside interfaces: GigabitEthernet0/0\nHits: 1547  Misses: 3'
              },
              validation: ['access-list 1 permit', 'ip nat inside source list', 'overload', 'ip nat inside', 'ip nat outside', 'show ip nat translations'],
              indices: [
                'Créez d\'abord une ACL standard qui identifie les adresses internes à traduire',
                'ip nat inside source list <ACL> interface <outside> overload — "overload" active le PAT',
                'Marquez chaque interface : ip nat inside côté LAN, ip nat outside côté Internet',
                'Vérifiez avec show ip nat translations après quelques connexions'
              ],
              solution: [
                'access-list 1 permit 192.168.1.0 0.0.0.255',
                'ip nat inside source list 1 interface se0/0 overload',
                'interface gi0/0',
                'ip nat inside',
                'exit',
                'interface se0/0',
                'ip nat outside',
                'end',
                'show ip nat translations'
              ]
            }
          },
          {
            id: 'cas-infra-012',
            titre: 'Diagnostic : NAT ne fonctionne pas',
            difficulte: 'difficile',
            format: 'arbre',
            objectif: 'Identifier pourquoi le NAT/PAT ne traduit pas le trafic et corriger la configuration',
            contexte: 'Les postes du réseau 192.168.1.0/24 n\'ont plus accès à Internet. show ip nat translations est vide. La configuration NAT existait et fonctionnait hier.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'show ip nat translations est vide — aucune traduction. Quelle commande vérifier en premier ?',
                  choix: [
                    { texte: 'show ip nat statistics pour voir si les interfaces inside/outside sont correctement définies', suite: 'n2' },
                    { texte: 'Supprimer et recréer toute la configuration NAT', suite: 'n_bad1' },
                    { texte: 'Vérifier la connexion physique côté Internet', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'show ip nat statistics montre :\n  Outside interfaces: (aucune)\n  Inside interfaces: GigabitEthernet0/0\n  Hits: 0  Misses: 0\nQu\'est-ce que cela indique ?',
                  choix: [
                    { texte: 'L\'interface outside n\'est pas marquée ip nat outside — c\'est la cause principale', suite: 'n3' },
                    { texte: 'L\'ACL du NAT est incorrecte', suite: 'n_bad3' },
                    { texte: 'Le mot-clé overload a été retiré de la commande NAT', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'Vous faites interface se0/0 → ip nat outside. show ip nat statistics montre maintenant les deux interfaces. Mais les translations restent vides. Que vérifiez-vous ensuite ?',
                  choix: [
                    { texte: 'show access-lists pour vérifier que l\'ACL matche bien le réseau 192.168.1.0/24', suite: 'n4' },
                    { texte: 'Rebooter le routeur pour recharger la configuration NAT', suite: 'n_bad5' },
                    { texte: 'Changer l\'IP de l\'interface Se0/0', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'ACL NAT incorrecte — corrigée',
                  explication: 'show access-lists aurait montré : "access-list 1 permit 192.168.2.0 0.0.0.255" — l\'ACL autorisait un mauvais réseau (192.168.2.0 au lieu de 192.168.1.0). Aucun trafic du réseau .1 ne matchait l\'ACL, donc aucune traduction NAT. Méthode : outside interface → ACL → route default. Corriger l\'ACL résout le problème.'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'Reconfiguration sans diagnostic',
                  explication: 'Supprimer et recréer toute la configuration NAT sans avoir identifié le problème peut recréer la même erreur. De plus, cela coupe les connexions actives. Diagnostiquer d\'abord avec show ip nat statistics.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'Connexion physique OK mais pas la cause',
                  explication: 'Si la connexion physique était coupée, show ip interface brief montrerait l\'interface Se0/0 down. show ip nat translations vide avec l\'interface up indique un problème de configuration NAT, pas de connectivité physique.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'Possible mais pas la première piste',
                  explication: 'L\'ACL peut être incorrecte, mais show ip nat statistics révèle d\'abord le problème d\'interface outside manquante. Il faut résoudre dans l\'ordre : interfaces → ACL → route default.'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'overload probablement toujours présent',
                  explication: 'show running-config | include ip nat inside source montrerait si overload est présent. Mais le symptôme "Outside interfaces: aucune" est plus immédiatement visible. Sans interface outside, même une commande NAT correcte ne fonctionnerait pas.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'Reboot inutile',
                  explication: 'Le NAT Cisco ne nécessite pas de reboot — les changements de configuration sont immédiats. Rebooter ferait perdre la running-config non sauvegardée et ne résoudrait pas le problème d\'ACL incorrecte.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'L\'IP publique n\'est pas la cause',
                  explication: 'L\'IP de Se0/0 est fournie par le FAI. Le problème identifié est logiciel (ACL NAT incorrecte). Changer l\'IP sans accord du FAI romprait la connectivité Internet.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'infra-m07',
        titre: 'Sauvegarde et maintenance Cisco',
        cas: [
          {
            id: 'cas-infra-013',
            titre: 'Sauvegarder et restaurer la configuration Cisco via TFTP',
            difficulte: 'facile',
            format: 'terminal',
            objectif: 'Sauvegarder la running-config d\'un routeur sur un serveur TFTP et restaurer une configuration depuis ce serveur',
            contexte: 'Avant une mise à jour importante du routeur R1, vous devez sauvegarder sa configuration sur le serveur TFTP (192.168.1.100).',
            contenu: {
              prompt: 'R1#',
              commandes: {
                'help': 'Commandes : copy running-config, copy startup-config, tftp, show flash, show version, copy tftp running-config',
                'show running-config': 'Building configuration...\n[sortie de la configuration courante]',
                'copy running-config tftp': 'Address or name of remote host []? 192.168.1.100\nDestination filename [r1-confg]? R1-backup-20260321.cfg\n!!\n1248 bytes copied in 0.952 secs (1311 bytes/sec)',
                'copy running-config startup-config': 'Destination filename [startup-config]? \nBuilding configuration...\n[OK]',
                'show flash': 'System flash directory:\nFile  Length   Name/status\n  1   15998976 c2900-universalk9-mz.SPA.155-3.M4a.bin\n[15998976 bytes used, 248455168 available, 264454144 total]\n264192K bytes of processor board System flash (Read/Write)',
                'copy tftp running-config': 'Address or name of remote host []? 192.168.1.100\nSource filename []? R1-backup-20260321.cfg\nDestination filename [running-config]? \nAccessing tftp://192.168.1.100/R1-backup-20260321.cfg...\nLoading R1-backup-20260321.cfg from 192.168.1.100 (via GigabitEthernet0/0): !\n[OK - 1248 bytes]\n1248 bytes copied in 0.648 secs (1926 bytes/sec)',
                'show version': 'Cisco IOS Software, Version 15.5(3)M4a\nROMMON Version 15.0(1r)M16\nCisco CISCO2901/K9 (2 GE, 2 Serial)\nConfiguration register is 0x2102'
              },
              validation: ['copy running-config tftp', 'copy running-config startup-config'],
              indices: [
                'copy running-config tftp : sauvegarde la config en cours sur le serveur TFTP',
                'Donnez un nom explicite avec la date : R1-backup-20260321.cfg',
                'copy running-config startup-config : sauvegarde aussi localement (NVRAM) avant toute intervention',
                'Pour restaurer : copy tftp running-config (charge dans la RAM, pas la NVRAM)'
              ],
              solution: [
                'copy running-config startup-config',
                'copy running-config tftp',
                '192.168.1.100',
                'R1-backup-20260321.cfg'
              ]
            }
          },
          {
            id: 'cas-infra-014',
            titre: 'Mettre à jour l\'IOS Cisco via TFTP',
            difficulte: 'difficile',
            format: 'scenario',
            objectif: 'Comprendre la procédure complète de mise à jour de l\'IOS Cisco : vérification, transfert, validation, activation',
            contexte: 'Un routeur Cisco 2901 tourne sous IOS 15.4. Une CVE critique a été publiée. Vous devez le mettre à jour vers IOS 15.5(3)M. Le nouveau fichier est disponible sur le TFTP 192.168.1.100.',
            contenu: {
              etapes: [
                {
                  description: 'Avant de transférer le nouvel IOS, quelle vérification est indispensable ?',
                  choix: [
                    { texte: 'Vérifier l\'espace disponible dans la flash avec show flash', correct: true, feedback: 'Indispensable ! Un IOS Cisco peut peser 15-50 MB. Si la flash est pleine, le transfert échouera en cours de route et pourrait corrompre l\'IOS existant. show flash indique la taille du fichier IOS actuel et l\'espace libre disponible.' },
                    { texte: 'Rebooter le routeur pour libérer de la mémoire RAM', correct: false, feedback: 'La RAM est différente de la flash. Le transfert TFTP utilise la flash, pas la RAM. Rebooter ne libère pas d\'espace flash et fait perdre la session de maintenance.' },
                    { texte: 'Désactiver toutes les interfaces pour libérer de la bande passante', correct: false, feedback: 'Les interfaces n\'ont aucun impact sur l\'espace flash. Désactiver les interfaces couperait la connectivité TFTP et empêcherait le transfert !' }
                  ]
                },
                {
                  description: 'show flash montre 264 MB libres. Vous transférez l\'IOS avec copy tftp flash. Après le transfert, quelle est l\'étape suivante AVANT de rebooter ?',
                  choix: [
                    { texte: 'Vérifier l\'intégrité du fichier avec verify /md5 flash:nouveau-ios.bin', correct: true, feedback: 'Critique ! Cisco fournit un hash MD5 avec chaque IOS. verify /md5 recalcule le hash du fichier téléchargé et le compare. Un transfert corrompu avec un mauvais hash rendrait le routeur non-démarrable. Vérifiez toujours avant de rebooter.' },
                    { texte: 'Rebooter immédiatement pour tester le nouvel IOS', correct: false, feedback: 'Rebooter sans vérification d\'intégrité est risqué : si le fichier est corrompu, le routeur ne démarrera pas et sera en ROMMON. Il faudra une intervention physique pour récupérer.' },
                    { texte: 'Supprimer l\'ancien IOS de la flash pour libérer de l\'espace', correct: false, feedback: 'Ne jamais supprimer l\'ancien IOS AVANT d\'avoir validé que le nouveau fonctionne. Si le nouveau IOS est corrompu, vous n\'aurez plus rien pour démarrer.' }
                  ]
                },
                {
                  description: 'Le MD5 est validé. Vous configurez boot system flash:nouveau-ios.bin. Après le reboot, le routeur démarre sur le nouvel IOS. Quelle est la dernière étape ?',
                  choix: [
                    { texte: 'Tester les fonctionnalités critiques, puis supprimer l\'ancien IOS si tout est OK', correct: true, feedback: 'Bonne pratique ! Après validation complète (routes, NAT, ACL, accès distant), vous pouvez supprimer l\'ancien IOS pour libérer de l\'espace flash. Gardez-le quelques jours en période d\'observation avant suppression.' },
                    { texte: 'Supprimer l\'ancien IOS immédiatement', correct: false, feedback: 'Trop précipité. Gardez l\'ancien IOS quelques heures/jours. Si un bug subtil du nouvel IOS apparaît, vous pourrez revenir rapidement avec boot system flash:ancien-ios.bin + reboot.' },
                    { texte: 'Aucune action nécessaire — la mise à jour est terminée', correct: false, feedback: 'La mise à jour n\'est pas terminée sans validation fonctionnelle. En entreprise, il faut tester les services critiques après chaque mise à jour IOS et documenter la maintenance.' }
                  ]
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'm365-outils-collab',
    titre: 'M365 — Outils collaboratifs',
    emoji: '☁️',
    modules: [
      {
        id: 'm365-m01',
        titre: 'Découverte Microsoft 365',
        cas: [
          {
            id: 'cas-m365-001',
            titre: 'Choisir le bon abonnement Microsoft 365',
            difficulte: 'facile',
            format: 'scenario',
            objectif: 'Comprendre les différences entre les plans Microsoft 365 et choisir celui adapté aux besoins d\'une organisation',
            contexte: 'Vous conseillez trois organisations sur leur abonnement Microsoft 365. Chacune a des besoins différents.',
            contenu: {
              etapes: [
                {
                  description: 'Organisation 1 : PME de 15 employés, besoins bureautique basiques (Word, Excel, Outlook), budget limité, pas de besoin de conformité avancée. Quel plan recommandez-vous ?',
                  choix: [
                    { texte: 'Microsoft 365 Business Basic', correct: true, feedback: 'Correct ! M365 Business Basic couvre les applications web Office, Exchange, Teams et OneDrive à faible coût. Pour 15 employés avec des besoins basiques, c\'est le plan le plus économique et suffisant. Les apps de bureau ne sont pas incluses mais les versions web suffisent pour des tâches courantes.' },
                    { texte: 'Microsoft 365 E5', correct: false, feedback: 'M365 E5 est le plan enterprise haut de gamme avec Defender, Purview, Power BI Pro... bien trop coûteux et sur-dimensionné pour une PME de 15 personnes aux besoins basiques.' },
                    { texte: 'Microsoft 365 Apps for Business', correct: false, feedback: 'M365 Apps for Business inclut les apps de bureau (Word, Excel installés), ce qui est bien mais pas nécessaire si les versions web suffisent. Pour des besoins basiques et un budget limité, Business Basic est plus adapté.' }
                  ]
                },
                {
                  description: 'Organisation 2 : Cabinet d\'avocats de 50 personnes, besoin d\'applications de bureau installées, de conformité (archivage légal des emails), et de protection avancée des données.',
                  choix: [
                    { texte: 'Microsoft 365 Business Standard', correct: false, feedback: 'Business Standard inclut les apps de bureau et Teams, mais manque des fonctions de conformité avancées (archivage In-Place, eDiscovery, DLP avancé) nécessaires pour un cabinet d\'avocats soumis à des obligations légales d\'archivage.' },
                    { texte: 'Microsoft 365 Business Premium', correct: true, feedback: 'Excellent ! Business Premium ajoute Azure AD P1, Intune, Defender for Business, et des fonctions de conformité (Information Protection). C\'est le plan SMB le plus complet, adapté aux professionnels avec obligations réglementaires, jusqu\'à 300 utilisateurs.' },
                    { texte: 'Microsoft 365 F1 (Firstline Workers)', correct: false, feedback: 'F1 est conçu pour les travailleurs de terrain (sans poste fixe), avec accès limité aux apps web uniquement. Absolument pas adapté à un cabinet d\'avocats qui a besoin d\'apps de bureau et de conformité avancée.' }
                  ]
                },
                {
                  description: 'Organisation 3 : Multinationale de 5000 employés, besoin de conformité maximale (eDiscovery, audit, DLP), SIEM intégré, analyse comportementale des utilisateurs (UEBA).',
                  choix: [
                    { texte: 'Microsoft 365 E3', correct: false, feedback: 'E3 couvre la conformité de base et les apps de bureau, mais manque les capacités SIEM (Sentinel), UEBA (Defender for Identity avancé), et l\'analyse comportementale incluses dans E5. Pour une multinationale avec ces besoins, E3 est insuffisant.' },
                    { texte: 'Microsoft 365 E5', correct: true, feedback: 'Parfait ! E5 est le plan enterprise complet avec Microsoft Purview (compliance maximale, eDiscovery avancé), Microsoft Defender XDR (SIEM/SOAR intégré), Microsoft Sentinel, et Entra ID P2 (UEBA, Privileged Identity Management). La solution pour les grandes organisations avec des exigences de sécurité et conformité maximales.' },
                    { texte: 'Microsoft 365 Business Premium × plusieurs tenants', correct: false, feedback: 'Business Premium est limité à 300 utilisateurs par tenant et n\'a pas les capacités enterprise (eDiscovery avancé, Sentinel, UEBA) nécessaires. Multiplier les tenants créerait une complexité de gestion ingérable. E5 est la solution.' }
                  ]
                }
              ]
            }
          },
          {
            id: 'cas-m365-002',
            titre: 'Gérer les licences M365 dans le centre d\'administration',
            difficulte: 'moyen',
            format: 'scenario',
            objectif: 'Savoir attribuer, retirer et surveiller les licences Microsoft 365 via le centre d\'administration',
            contexte: 'Vous administrez un tenant Microsoft 365 Business Premium pour une PME de 80 utilisateurs. Trois situations de gestion de licences se présentent.',
            contenu: {
              etapes: [
                {
                  description: 'Un nouvel employé (Marie Dupont) vient d\'arriver. Comment lui attribuer une licence M365 ?',
                  choix: [
                    { texte: 'admin.microsoft.com → Utilisateurs → Utilisateurs actifs → Marie Dupont → Licences et applications → cocher M365 Business Premium → Enregistrer', correct: true, feedback: 'Bonne procédure ! Le centre d\'administration Microsoft 365 (admin.microsoft.com) est l\'interface principale pour la gestion des licences individuelles. Vous pouvez aussi le faire via PowerShell (Set-MgUserLicense) ou via des groupes de licences Azure AD pour une gestion automatisée à grande échelle.' },
                    { texte: 'Créer un nouveau compte sur le portail Azure et attribuer la licence depuis Azure AD', correct: false, feedback: 'Bien que faisable depuis Entra ID (Azure AD), passer par admin.microsoft.com est plus direct pour les tâches courantes. De plus, si le compte n\'existe pas encore dans M365, il faut d\'abord le créer via admin.microsoft.com ou synchronisation AD, pas Azure AD seul.' },
                    { texte: 'Envoyer un email à Microsoft pour ajouter un utilisateur', correct: false, feedback: 'Microsoft ne gère pas individuellement les utilisateurs de vos tenants. L\'administration se fait entièrement via les portails (admin.microsoft.com, Entra ID) ou PowerShell. Aucun contact avec le support Microsoft n\'est nécessaire pour attribuer des licences.' }
                  ]
                },
                {
                  description: 'Un employé est parti. Sa licence doit être récupérée pour un remplaçant. Quelle est la bonne procédure ?',
                  choix: [
                    { texte: 'Supprimer immédiatement le compte et réattribuer la licence au remplaçant', correct: false, feedback: 'Supprimer immédiatement le compte supprime aussi la boîte mail et les données OneDrive après 30 jours ! Il faut d\'abord : bloquer la connexion, sauvegarder/transférer les données importantes, puis désattribuer la licence et supprimer le compte (ou le conserver en boîte mail partagée).' },
                    { texte: 'Bloquer la connexion → désattribuer la licence → gérer les données → supprimer ou convertir le compte', correct: true, feedback: 'Procédure correcte ! 1) Bloquer la connexion (sécurité immédiate), 2) Désattribuer la licence (récupère la licence pour le remplaçant), 3) Transférer les emails/OneDrive si nécessaire, 4) Décider du sort du compte (suppression ou conversion en boîte partagée sans licence). Les données sont conservées 30 jours après suppression.' },
                    { texte: 'Changer le mot de passe et laisser le compte actif avec la licence', correct: false, feedback: 'Laisser un compte d\'ancien employé actif (même avec un mot de passe changé) est une mauvaise pratique de sécurité. La licence reste bloquée et n\'est pas récupérée. Il faut bloquer la connexion et désattribuer la licence.' }
                  ]
                },
                {
                  description: 'Vous constatez que vous avez 80 licences M365 achetées mais seulement 65 utilisateurs actifs. Comment optimiser ?',
                  choix: [
                    { texte: 'Vérifier dans admin.microsoft.com → Facturation → Licences → identifier les licences non attribuées et ajuster le nombre d\'abonnements', correct: true, feedback: 'Bonne démarche ! Le tableau de bord de licences montre les licences achetées vs attribuées. Vous pouvez réduire le nombre de licences achetées (attention aux conditions contractuelles, notamment pour les abonnements annuels). Économie : 15 licences × coût mensuel.' },
                    { texte: 'Créer des comptes fictifs pour utiliser toutes les licences', correct: false, feedback: 'Créer des comptes fictifs pour "utiliser" des licences est une violation des CGU Microsoft et représente un risque sécuritaire (comptes dormants potentiellement compromissibles). Réduisez le nombre de licences ou attendez les prochains recrutements.' },
                    { texte: 'Ne rien faire — les licences inutilisées sont incluses dans le prix', correct: false, feedback: 'Les licences Microsoft 365 sont facturées par abonnement et par siège, qu\'elles soient utilisées ou non. 15 licences non utilisées représentent un coût mensuel inutile. Il faut ajuster le nombre d\'abonnements (selon les conditions contractuelles).' }
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        id: 'm365-m02',
        titre: 'Notions de base sur Word',
        cas: [
          {
            id: 'cas-m365-003',
            titre: 'Résoudre les problèmes courants de mise en forme Word',
            difficulte: 'facile',
            format: 'arbre',
            objectif: 'Diagnostiquer et résoudre les problèmes de mise en forme les plus fréquents dans Microsoft Word',
            contexte: 'Un utilisateur vous appelle : "Mon document Word a des sauts de page qui apparaissent n\'importe où, les titres ne sont pas dans la table des matières, et le document s\'imprime avec des marges trop grandes."',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Trois problèmes à diagnostiquer. Par lequel commencez-vous pour identifier la cause racine commune ?',
                  choix: [
                    { texte: 'Vérifier si l\'utilisateur utilise des styles Word (Titre 1, Titre 2) ou une mise en forme manuelle', suite: 'n2' },
                    { texte: 'Réinstaller Microsoft Office', suite: 'n_bad1' },
                    { texte: 'Changer les marges d\'abord car c\'est le problème d\'impression', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'L\'utilisateur confirme qu\'il a mis ses titres en gras et en grand manuellement (pas via les styles Titre 1/2). Quelle est la conséquence directe ?',
                  choix: [
                    { texte: 'La table des matières ne peut pas détecter les titres formatés manuellement — elle n\'utilise que les styles Word', suite: 'n3' },
                    { texte: 'Word interdit la mise en forme manuelle des titres', suite: 'n_bad3' },
                    { texte: 'La mise en forme manuelle est identique aux styles pour la table des matières', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'La table des matières est liée aux styles. Pour les sauts de page intempestifs, que vérifiez-vous en priorité ?',
                  choix: [
                    { texte: 'Afficher les caractères non imprimables (¶) pour voir les sauts de page manuels et les paragraphes vides', suite: 'n4' },
                    { texte: 'Désactiver la correction automatique', suite: 'n_bad5' },
                    { texte: 'Convertir le document en PDF', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'Diagnostic complet — solutions identifiées',
                  explication: 'Solution globale : 1) Appliquer les styles Titre 1/Titre 2 aux titres (Accueil → Styles) → la table des matières se mettra à jour automatiquement. 2) Afficher ¶ (Ctrl+Maj+8) pour voir et supprimer les sauts de page manuels (Ctrl+Entrée) et paragraphes vides. 3) Pour les marges : Mise en page → Marges. En utilisant les styles, la mise en forme devient cohérente et la table des matières fonctionnelle.'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'Réinstallation non justifiée',
                  explication: 'Ces problèmes (table des matières manquante, sauts de page, marges) sont des problèmes d\'utilisation, pas de logiciel défaillant. Réinstaller Office n\'aidera pas. La cause racine est l\'utilisation de mise en forme manuelle au lieu des styles Word.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'Les marges ne sont pas la cause racine',
                  explication: 'Les marges trop grandes sont symptomatiques mais indépendantes des deux autres problèmes. Commencer par identifier la cause racine commune (absence de styles) est plus efficace. Les marges se règlent en 2 clics après avoir compris l\'ensemble du problème.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'Word n\'interdit pas la mise en forme manuelle',
                  explication: 'Word autorise la mise en forme manuelle, mais celle-ci n\'est pas "intelligente" : elle ne communique pas avec la table des matières, le plan, ou la navigation. Les styles sont la façon correcte de structurer un document Word.'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'Mise en forme manuelle ≠ styles',
                  explication: 'Pour la table des matières, Word ne regarde que les styles appliqués (Titre 1, Titre 2, etc.), pas la taille de police ou le gras. Un texte mis en gras 18pt manuellement n\'apparaîtra jamais dans la table des matières.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'La correction automatique n\'est pas la cause',
                  explication: 'La correction automatique corrige l\'orthographe et la ponctuation, mais ne génère pas de sauts de page. Les sauts de page intempestifs viennent généralement de sauts manuels (Ctrl+Entrée) ou de l\'option "Saut de page avant" dans les paramètres de paragraphe.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'Convertir en PDF ne résout pas les problèmes',
                  explication: 'La conversion en PDF fige le document dans son état actuel, problèmes compris. Ce n\'est pas une solution mais une fuite. Il faut corriger la source Word.'
                }
              }
            }
          },
          {
            id: 'cas-m365-004',
            titre: 'Expliquer les fonctions de collaboration Word en ligne',
            difficulte: 'facile',
            format: 'scenario',
            objectif: 'Comprendre et utiliser les fonctions de collaboration Word Online : coédition, commentaires, suivi des modifications',
            contexte: 'Une équipe de 4 rédacteurs doit collaborer sur un rapport commun. Ils utilisent Word Online via Microsoft 365. Trois questions de collaboration se posent.',
            contenu: {
              etapes: [
                {
                  description: 'Les 4 rédacteurs veulent modifier le document simultanément. Quelle fonctionnalité utiliser et comment y accéder ?',
                  choix: [
                    { texte: 'La coédition en temps réel : ouvrir le document depuis SharePoint/OneDrive dans Word Online, partager le lien, et chaque rédacteur voit les modifications des autres en direct', correct: true, feedback: 'Exact ! La coédition (co-authoring) est la fonctionnalité phare de Word Online et Word Desktop connecté. Chaque auteur est identifié par une couleur. Les modifications apparaissent en temps réel. Prérequis : le fichier doit être sur SharePoint ou OneDrive (pas en pièce jointe email).' },
                    { texte: 'Envoyer le document en pièce jointe à chaque rédacteur et fusionner les versions à la fin', correct: false, feedback: 'C\'est l\'ancienne méthode qui génère des conflits de version, des pertes de modifications et un travail de fusion fastidieux. Avec Microsoft 365, la coédition en temps réel sur SharePoint/OneDrive est bien plus efficace.' },
                    { texte: 'Utiliser Google Docs à la place de Word pour la collaboration', correct: false, feedback: 'Google Docs est une alternative valide pour la collaboration, mais l\'objectif ici est d\'utiliser Microsoft 365 / Word Online qui offre les mêmes capacités de coédition. Pas besoin de quitter l\'écosystème M365.' }
                  ]
                },
                {
                  description: 'Un rédacteur veut suggérer des modifications sans les imposer, pour que le responsable puisse les accepter ou refuser. Quelle fonction utiliser ?',
                  choix: [
                    { texte: 'Le suivi des modifications (Révision → Suivi des modifications)', correct: true, feedback: 'Parfait ! Le suivi des modifications (Track Changes) marque chaque ajout, suppression ou mise en forme modifiée. Les modifications apparaissent en couleur et le destinataire peut les accepter (Accepter) ou refuser (Rejeter) une par une ou toutes ensemble. Indispensable pour la relecture professionnelle.' },
                    { texte: 'Écrire les suggestions dans un email séparé', correct: false, feedback: 'Envoyer les suggestions par email déconnecte les commentaires du contexte du document. Avec le suivi des modifications dans Word, chaque suggestion est directement liée au texte concerné et facilement applicable.' },
                    { texte: 'Créer une copie du document avec les modifications', correct: false, feedback: 'Créer des copies génère des problèmes de version. Le suivi des modifications dans Word permet de voir exactement ce qui a changé et de décider modification par modification, sans avoir à comparer manuellement deux versions.' }
                  ]
                },
                {
                  description: 'Le responsable veut annoter certains passages pour expliquer pourquoi il refuse une modification, sans altérer le texte. Comment faire ?',
                  choix: [
                    { texte: 'Insérer un commentaire (Révision → Nouveau commentaire) lié au passage concerné', correct: true, feedback: 'Les commentaires Word sont parfaits pour les annotations contextuelles : ils apparaissent dans la marge, sont liés au texte sélectionné, peuvent être répondus (fil de discussion), et résolus quand la question est traitée. Ils n\'altèrent pas le texte principal.' },
                    { texte: 'Écrire les explications en rouge dans le texte', correct: false, feedback: 'Écrire dans le texte principal mélange le contenu et les annotations, rendant difficile la distinction entre le texte final et les commentaires. Les commentaires Word (dans la marge) sont conçus exactement pour ce cas d\'usage.' },
                    { texte: 'Utiliser des notes de bas de page pour les annotations', correct: false, feedback: 'Les notes de bas de page sont pour les références et compléments d\'information dans le document final. Les commentaires (Révision) sont l\'outil approprié pour les annotations de relecture qui seront supprimées avant la version finale.' }
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        id: 'm365-m03',
        titre: 'Notions de base sur Excel',
        cas: [
          {
            id: 'cas-m365-005',
            titre: 'Résoudre les erreurs courantes dans Excel',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Identifier et corriger les erreurs Excel les plus fréquentes : #REF!, #VALEUR!, #DIV/0!, formules circulaires',
            contexte: 'Un utilisateur vous envoie un fichier Excel avec plusieurs cellules en erreur et vous demande de l\'aider à comprendre et corriger.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Cellule A1 affiche #DIV/0!. La formule est =B1/C1. Que signifie cette erreur et comment la corriger ?',
                  choix: [
                    { texte: 'Division par zéro — C1 est vide ou égal à 0. Corriger avec =SI(C1=0;"";B1/C1)', suite: 'n2' },
                    { texte: 'La formule est incorrecte — Excel ne peut pas diviser', suite: 'n_bad1' },
                    { texte: 'Il faut réinstaller Excel', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'Cellule B5 affiche #REF!. L\'utilisateur a supprimé la colonne D. Que s\'est-il passé et comment corriger ?',
                  choix: [
                    { texte: '#REF! = référence invalide. La formule pointait vers la colonne D supprimée. Corriger la formule pour qu\'elle pointe vers les bonnes cellules', suite: 'n3' },
                    { texte: 'Ajouter une nouvelle colonne D vide pour résoudre l\'erreur', suite: 'n_bad3' },
                    { texte: '#REF! est une erreur d\'impression — changer l\'imprimante', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'Excel affiche "Référence circulaire" en bas de la fenêtre. La cellule C3 contient =C3+1. Que faire ?',
                  choix: [
                    { texte: 'Identifier la cellule impliquée dans la référence circulaire et corriger la formule pour qu\'elle ne se référence pas elle-même', suite: 'n4' },
                    { texte: 'Activer le calcul itératif dans les options Excel', suite: 'n_bad5' },
                    { texte: 'Fermer et rouvrir le fichier', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'Toutes les erreurs identifiées et corrigées',
                  explication: 'Synthèse des erreurs Excel courantes : #DIV/0! = division par zéro → utiliser SI() pour gérer le cas. #REF! = référence supprimée ou déplacée → corriger en pointant vers les bonnes cellules. #VALEUR! = type incompatible (ex: texte dans formule numérique) → vérifier les données sources. Référence circulaire = une cellule se réfère à elle-même → corriger la logique de la formule. Formules → Vérification des erreurs pour localiser toutes les erreurs.'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'Excel peut diviser — c\'est le diviseur qui est nul',
                  explication: '#DIV/0! n\'indique pas une limitation d\'Excel mais une division mathématiquement impossible (tout nombre / 0 = indéfini). Excel détecte que la cellule diviseur est vide (traité comme 0) ou contient 0. La solution est de gérer ce cas avec la fonction SI().'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'Réinstallation non justifiée',
                  explication: '#DIV/0! est une erreur de données, pas un bug logiciel. Réinstaller Excel ne changera pas le fait que C1 est vide ou nul. Les erreurs # sont des messages informatifs d\'Excel, pas des crashs.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'Ajouter une colonne D vide ne résout pas #REF!',
                  explication: '#REF! signifie que la référence originale (la colonne D supprimée) n\'existe plus. Ajouter une nouvelle colonne D vide ne restaure pas les données perdues. Il faut corriger la formule pour pointer vers les bonnes données actuelles.'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: '#REF! n\'a rien à voir avec l\'impression',
                  explication: '#REF! (Reference Error) est une erreur de formule Excel — elle indique une référence de cellule invalide. Elle n\'a aucun lien avec les paramètres d\'impression ou l\'imprimante.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'Le calcul itératif masque le problème sans le résoudre',
                  explication: 'Le calcul itératif permet les références circulaires intentionnelles (rare, cas avancés). Ici, =C3+1 est clairement une erreur de logique (la cellule ne peut pas être égale à elle-même + 1). Activer l\'itératif masquerait l\'erreur sans corriger la formule, donnant des résultats imprévisibles.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'Fermer/rouvrir ne corrige pas une référence circulaire',
                  explication: 'Une référence circulaire est dans la formule elle-même. Rouvrir le fichier ne change pas la formule. Excel rouvrira avec le même avertissement. Il faut corriger la formule.'
                }
              }
            }
          },
          {
            id: 'cas-m365-006',
            titre: 'Utiliser les tableaux croisés dynamiques pour l\'analyse',
            difficulte: 'moyen',
            format: 'scenario',
            objectif: 'Comprendre comment créer et utiliser un tableau croisé dynamique pour analyser des données dans Excel',
            contexte: 'Un responsable commercial vous demande d\'analyser un fichier Excel avec 500 lignes de ventes (colonnes : Date, Vendeur, Région, Produit, Montant). Il veut voir les ventes par vendeur et par région.',
            contenu: {
              etapes: [
                {
                  description: 'Comment créer un tableau croisé dynamique à partir de ces données ?',
                  choix: [
                    { texte: 'Sélectionner une cellule dans les données → Insertion → Tableau croisé dynamique → choisir la plage et l\'emplacement → OK', correct: true, feedback: 'Bonne procédure ! Excel détecte automatiquement la plage de données. Le TCD s\'ouvre avec le volet "Champs de tableau croisé dynamique" où vous faites glisser les champs dans les zones (Lignes, Colonnes, Valeurs, Filtres). Astuce : convertir d\'abord les données en Tableau Excel (Ctrl+T) pour que le TCD se mette à jour automatiquement lors d\'ajouts.' },
                    { texte: 'Utiliser des formules SOMME.SI pour calculer manuellement les totaux par vendeur', correct: false, feedback: 'SOMME.SI fonctionne mais est bien plus laborieux : une formule par combinaison vendeur/région. Si de nouveaux vendeurs ou régions s\'ajoutent, il faut ajouter des formules. Un tableau croisé dynamique fait tout ça automatiquement et est plus flexible pour l\'exploration.' },
                    { texte: 'Trier les données par vendeur et additionner manuellement', correct: false, feedback: 'Tri + addition manuelle est la méthode la plus fastidieuse et sujette aux erreurs sur 500 lignes. Le tableau croisé dynamique analyse les 500 lignes en quelques secondes sans risque d\'erreur de comptage.' }
                  ]
                },
                {
                  description: 'Le TCD est créé. Comment afficher les ventes par Vendeur en lignes et par Région en colonnes, avec le total des montants ?',
                  choix: [
                    { texte: 'Glisser "Vendeur" dans Lignes, "Région" dans Colonnes, "Montant" dans Valeurs (Somme)', correct: true, feedback: 'Configuration correcte ! Le TCD affichera automatiquement une matrice : lignes = chaque vendeur, colonnes = chaque région, cellules = somme des ventes correspondantes. Les totaux ligne et colonne sont calculés automatiquement. Vous pouvez changer l\'agrégation (Somme → Moyenne, Nombre...) en cliquant sur le champ dans Valeurs.' },
                    { texte: 'Glisser tout dans Valeurs pour avoir tous les calculs à la fois', correct: false, feedback: 'Mettre tous les champs dans Valeurs créerait un TCD illisible avec des comptages de texte (Vendeur, Région, Produit) et des sommes numériques mélangées. La structure Lignes/Colonnes/Valeurs est conçue pour organiser l\'analyse clairement.' },
                    { texte: 'Créer un graphique croisé dynamique à la place du TCD', correct: false, feedback: 'Un graphique croisé dynamique est un complément visuel du TCD, pas un substitut. Vous devez d\'abord créer le TCD avec la structure souhaitée, puis optionnellement créer un graphique à partir du TCD.' }
                  ]
                },
                {
                  description: 'Les données sources ont été mises à jour (nouvelles ventes ajoutées). Le TCD n\'affiche pas les nouvelles données. Que faire ?',
                  choix: [
                    { texte: 'Clic droit dans le TCD → Actualiser (ou Analyse → Actualiser)', correct: true, feedback: 'Correct ! Les TCD ne se mettent pas à jour automatiquement (sauf configuration spécifique). Il faut Actualiser manuellement. Si les données étaient dans un Tableau Excel (Ctrl+T), le TCD inclut automatiquement les nouvelles lignes lors de l\'actualisation. Sans Tableau, vérifiez aussi que la plage source englobe les nouvelles données.' },
                    { texte: 'Supprimer et recréer le TCD', correct: false, feedback: 'Recréer le TCD à chaque mise à jour est inutile. La fonction Actualiser (clic droit → Actualiser) suffit. Si vous avez correctement défini la source (idéalement un Tableau Excel), l\'actualisation prend en compte toutes les nouvelles données.' },
                    { texte: 'Fermer et rouvrir Excel', correct: false, feedback: 'Rouvrir Excel ne déclenche pas automatiquement l\'actualisation du TCD. Il faut l\'Actualiser explicitement. Vous pouvez configurer l\'actualisation automatique à l\'ouverture dans les options du TCD (Analyse → Options → Actualiser les données lors de l\'ouverture du fichier).' }
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        id: 'm365-m04',
        titre: 'Outlook et dépannage',
        cas: [
          {
            id: 'cas-m365-007',
            titre: 'Configurer Outlook et résoudre les problèmes courants',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Diagnostiquer et résoudre les problèmes Outlook les plus fréquents : profil corrompu, synchronisation, règles',
            contexte: 'Un utilisateur appelle : "Outlook ne démarre plus, il reste bloqué sur l\'écran de chargement. J\'ai des réunions importantes aujourd\'hui."',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Outlook bloqué au démarrage. Quelle est la première action à tenter ?',
                  choix: [
                    { texte: 'Démarrer Outlook en mode sans échec : outlook.exe /safe dans Exécuter (Win+R)', suite: 'n2' },
                    { texte: 'Désinstaller et réinstaller Office', suite: 'n_bad1' },
                    { texte: 'Supprimer le profil Outlook et recréer depuis zéro', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'Outlook démarre en mode sans échec. Cela signifie que le problème vient probablement d\'un complément (add-in). Que faire ?',
                  choix: [
                    { texte: 'Fichier → Options → Compléments → Gérer les compléments COM → désactiver les compléments suspects un par un', suite: 'n3' },
                    { texte: 'Supprimer tous les compléments sans vérifier lequel pose problème', suite: 'n_bad3' },
                    { texte: 'Laisser Outlook en mode sans échec définitivement', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'Vous désactivez les compléments, mais Outlook plante toujours en mode normal. L\'outil de diagnostic signale un profil Outlook potentiellement corrompu. Quelle est la prochaine étape ?',
                  choix: [
                    { texte: 'Panneau de configuration → Courrier → Afficher les profils → Ajouter un nouveau profil → configurer le compte Exchange → tester', suite: 'n4' },
                    { texte: 'Réinitialiser le PC aux paramètres d\'usine', suite: 'n_bad5' },
                    { texte: 'Utiliser Outlook sur le web (OWA) en attendant — ne pas toucher au profil', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'Nouveau profil Outlook créé — problème résolu',
                  explication: 'Procédure complète de dépannage Outlook : 1) Mode sans échec (/safe) → identifie les problèmes de compléments. 2) Désactiver les compléments → isolation du complément fautif. 3) Nouveau profil Outlook → résout les profils corrompus (fichier .ost ou .pst endommagé). Le nouveau profil retélécharge les emails depuis Exchange. En urgence, OWA (Outlook sur le web) permet d\'accéder aux emails sans client lourd.'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'Désinstallation prématurée',
                  explication: 'Désinstaller Office est une procédure longue et souvent inutile pour un problème de démarrage Outlook. Le mode sans échec (/safe) permet d\'identifier rapidement si c\'est un complément ou un profil. Commencez toujours par le diagnostic minimal.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'Supprimer le profil sans diagnostic d\'abord',
                  explication: 'Supprimer le profil est une solution valide mais destructrice si elle n\'est pas nécessaire (reconfiguration complète). Commencez par le mode sans échec pour identifier si c\'est un complément (plus rapide à résoudre) avant de toucher au profil.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'Supprimer tous les compléments est excessif',
                  explication: 'Supprimer tous les compléments peut désactiver des fonctionnalités métier importantes (signature électronique, CRM, archivage). Désactivez-les un par un pour identifier le coupable, puis ne supprimez que celui-là.'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'Mode sans échec n\'est pas une solution durable',
                  explication: 'Le mode sans échec désactive les compléments ET certaines fonctionnalités (aperçu des pièces jointes, accélération graphique). Ce n\'est qu\'un outil de diagnostic. L\'utilisateur doit revenir en mode normal après correction.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'Réinitialisation PC totalement disproportionnée',
                  explication: 'Réinitialiser un PC pour un problème Outlook est une réponse totalement disproportionnée qui détruirait toutes les données et configurations de l\'utilisateur. Un problème de profil Outlook se résout en quelques minutes sans toucher au reste du PC.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'OWA est un contournement, pas une solution',
                  explication: 'OWA (Outlook Web Access) est utile en urgence pour accéder aux emails, mais ne résout pas le problème du client Outlook. L\'utilisateur a besoin d\'Outlook pour ses calendriers, contacts, règles locales, et intégrations. Il faut résoudre le problème du client.'
                }
              }
            }
          },
          {
            id: 'cas-m365-008',
            titre: 'Configurer les règles Outlook et le calendrier partagé',
            difficulte: 'facile',
            format: 'scenario',
            objectif: 'Créer des règles de messagerie Outlook et partager un calendrier avec des collègues',
            contexte: 'Une responsable RH vous demande de l\'aider à organiser sa boîte mail et son calendrier dans Outlook.',
            contenu: {
              etapes: [
                {
                  description: 'Elle reçoit des emails de 5 chefs de service avec comme objet "RAPPORT-[NomService]". Elle veut les classer automatiquement dans un dossier "Rapports". Comment faire ?',
                  choix: [
                    { texte: 'Accueil → Règles → Gérer les règles et alertes → Nouvelle règle → "L\'objet contient RAPPORT" → "Déplacer vers le dossier Rapports"', correct: true, feedback: 'Bonne procédure ! Les règles Outlook permettent d\'automatiser le tri. La règle "L\'objet contient [mot-clé]" est la plus adaptée ici. Vous pouvez aussi créer une règle sur l\'expéditeur (si les 5 chefs sont dans un groupe de distribution). Les règles s\'appliquent aux emails entrants et/ou sortants.' },
                    { texte: 'Déplacer manuellement chaque email dans le dossier Rapports', correct: false, feedback: 'Le tri manuel est chronophage et sera oublié lors des journées chargées. Une règle automatique est plus fiable et s\'applique même quand Outlook est fermé (si les règles serveur sont activées via Exchange).' },
                    { texte: 'Créer un dossier public partagé pour que les chefs y déposent directement les rapports', correct: false, feedback: 'Un dossier public changerait le workflow de tous les chefs de service, qui doivent maintenant apprendre à utiliser les dossiers publics. Une règle Outlook locale ne perturbe pas les expéditeurs et est plus simple à mettre en place.' }
                  ]
                },
                {
                  description: 'Elle veut partager son calendrier avec son assistante (lecture seule) et son directeur (peut modifier). Comment procéder dans Outlook ?',
                  choix: [
                    { texte: 'Calendrier → clic droit sur le calendrier → Partager → Partager le calendrier → saisir l\'email de l\'assistante → Peut afficher ; répéter pour le directeur → Peut modifier', correct: true, feedback: 'Procédure correcte ! Le partage de calendrier Outlook (Exchange/M365) envoie une invitation. Les niveaux de permission disponibles : "Peut afficher" (lecture seule), "Peut modifier" (ajout/modification), "Délégué" (gestion complète au nom de). Le destinataire accepte l\'invitation et voit le calendrier dans Outlook.' },
                    { texte: 'Exporter le calendrier en fichier .ics et l\'envoyer par email', correct: false, feedback: 'L\'export .ics crée une copie statique du calendrier à un instant T — pas un partage en temps réel. L\'assistante et le directeur ne verront pas les mises à jour. Le partage Exchange/M365 est synchronisé en temps réel.' },
                    { texte: 'Donner son mot de passe Outlook à l\'assistante pour qu\'elle consulte le calendrier', correct: false, feedback: 'Partager son mot de passe est une grave violation des règles de sécurité et de la politique d\'utilisation informatique. Le partage de calendrier M365 permet exactement ce besoin (accès délégué) sans compromettre les identifiants.' }
                  ]
                },
                {
                  description: 'La boîte mail est pleine (quota Exchange atteint). Elle ne peut plus envoyer/recevoir. Que faire en priorité ?',
                  choix: [
                    { texte: 'Supprimer ou archiver les anciens emails volumineux (surtout ceux avec pièces jointes), vider la corbeille et les éléments envoyés', correct: true, feedback: 'Actions immédiates : 1) Trier par taille (Vue → Ajouter des colonnes → Taille) pour identifier les gros emails. 2) Supprimer ou archiver localement (Fichier → Outils de nettoyage → Archivage). 3) Vider Corbeille ET Éléments supprimés. 4) Contacter l\'admin pour augmenter le quota si nécessaire. En M365, l\'archivage en ligne (In-Place Archive) est souvent disponible.' },
                    { texte: 'Supprimer le compte Outlook et en créer un nouveau', correct: false, feedback: 'Supprimer le compte mail pour libérer de l\'espace supprime TOUS les emails. C\'est totalement disproportionné. L\'archivage et le nettoyage ciblé des gros emails suffit dans la plupart des cas.' },
                    { texte: 'Désactiver les notifications de quota dans les options', correct: false, feedback: 'Désactiver les notifications n\'augmente pas le quota et ne libère pas d\'espace. C\'est ignorer le problème : la boîte sera toujours pleine et les emails continueront d\'être refusés.' }
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        id: 'm365-m05',
        titre: 'Teams, SharePoint, OneDrive',
        cas: [
          {
            id: 'cas-m365-009',
            titre: 'Configurer Teams pour une équipe projet',
            difficulte: 'moyen',
            format: 'scenario',
            objectif: 'Créer et organiser une équipe Teams avec les canaux, permissions et intégrations appropriés',
            contexte: 'Vous devez créer une équipe Teams pour un projet de déploiement réseau impliquant 8 techniciens et 2 chefs de projet. Le projet dure 6 mois.',
            contenu: {
              etapes: [
                {
                  description: 'Comment créer l\'équipe Teams et quelle visibilité choisir ?',
                  choix: [
                    { texte: 'Teams → Rejoindre ou créer une équipe → Créer une équipe → Créer depuis zéro → Privée (seuls les membres invités peuvent rejoindre)', correct: true, feedback: 'Configuration appropriée pour un projet interne : type "Privée" limite l\'accès aux membres invités (techniciens + chefs de projet). Les équipes "Publiques" sont visibles et rejoignables par tous dans l\'organisation — pas adapté pour un projet technique avec des accès contrôlés. Nommez l\'équipe clairement (ex: "Projet-Deploy-Réseau-2026").' },
                    { texte: 'Créer une équipe "Publique" pour que toute l\'entreprise puisse suivre l\'avancement', correct: false, feedback: 'Une équipe publique permet à n\'importe qui dans l\'organisation de rejoindre et poster des messages. Pour un projet technique, cela créerait du bruit et des risques de fuites d\'informations techniques. L\'équipe privée avec membres invités est plus appropriée.' },
                    { texte: 'Utiliser uniquement un groupe WhatsApp pour la communication de projet', correct: false, feedback: 'WhatsApp est une application personnelle non sécurisée pour des échanges professionnels. Les données ne sont pas sous contrôle de l\'entreprise, il n\'y a pas d\'intégration avec Microsoft 365 (fichiers, calendrier, tâches), et c\'est souvent interdit par la politique SI.' }
                  ]
                },
                {
                  description: 'Quels canaux créer pour organiser les échanges du projet ?',
                  choix: [
                    { texte: 'Canal Général (défaut) + canaux dédiés : "Planification", "Technique-Réseau", "Suivi-Incidents", "Documents-Projet"', correct: true, feedback: 'Organisation pertinente ! Chaque canal a un fil de discussion et un espace de fichiers propres. "Général" pour les annonces globales, "Technique-Réseau" pour les échanges techniques, "Suivi-Incidents" pour le tracking des problèmes, "Documents-Projet" pour centraliser les fichiers. Évitez les canaux trop nombreux (>10) qui fragmentent les discussions.' },
                    { texte: 'Un seul canal "Général" pour tout mettre au même endroit', correct: false, feedback: 'Un canal unique pour 10 personnes sur 6 mois créera un flux de messages difficile à suivre, avec des sujets mélangés (planification, incidents techniques, documents). Les canaux thématiques permettent de retrouver rapidement les informations par contexte.' },
                    { texte: 'Créer un canal par technicien pour les communications individuelles', correct: false, feedback: 'Les canaux par personne sont inutiles : Teams a déjà les chats privés (1:1 et de groupe) pour les échanges individuels. Les canaux sont conçus pour les échanges collectifs thématiques. 8 canaux personnels seraient une mauvaise organisation.' }
                  ]
                },
                {
                  description: 'Les techniciens ont besoin d\'accéder à la documentation de projet stockée sur SharePoint. Comment intégrer ça dans Teams ?',
                  choix: [
                    { texte: 'Dans le canal "Documents-Projet" → + (Ajouter un onglet) → SharePoint → sélectionner la bibliothèque SharePoint du projet', correct: true, feedback: 'L\'intégration SharePoint comme onglet dans un canal Teams est la meilleure pratique ! Les fichiers sont accessibles directement dans Teams sans quitter l\'interface. De plus, tous les fichiers partagés dans un canal sont automatiquement stockés dans SharePoint. Les modifications sont synchronisées en temps réel et versionnées.' },
                    { texte: 'Envoyer les liens SharePoint par email à chaque technicien', correct: false, feedback: 'Envoyer des liens par email génère de la fragmentation : certains perdront le lien, d\'autres auront des versions en cache. L\'intégration SharePoint directement dans Teams centralise l\'accès et évite de jongler entre les applications.' },
                    { texte: 'Copier tous les fichiers SharePoint dans OneDrive personnel de chaque technicien', correct: false, feedback: 'Copier les fichiers dans des OneDrive individuels crée des versions multiples non synchronisées. Si quelqu\'un modifie sa copie, les autres ne voient pas la mise à jour. SharePoint + Teams est conçu pour le travail collaboratif sur des fichiers uniques et partagés.' }
                  ]
                }
              ]
            }
          },
          {
            id: 'cas-m365-010',
            titre: 'Résoudre les problèmes de synchronisation OneDrive',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Diagnostiquer et résoudre les problèmes courants de synchronisation OneDrive for Business',
            contexte: 'Un utilisateur vous signale que l\'icône OneDrive dans la barre des tâches est rouge avec une croix. Ses fichiers ne se synchronisent plus depuis ce matin.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Icône OneDrive rouge = erreur de synchronisation. Quelle est votre première action ?',
                  choix: [
                    { texte: 'Cliquer sur l\'icône OneDrive → voir les messages d\'erreur spécifiques dans le panneau de synchronisation', suite: 'n2' },
                    { texte: 'Déconnecter et reconnecter immédiatement le compte OneDrive', suite: 'n_bad1' },
                    { texte: 'Désinstaller OneDrive et le réinstaller', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'Le message indique "Votre OneDrive est plein (quota dépassé) — 5,1 GB sur 5 GB utilisés". Que faire ?',
                  choix: [
                    { texte: 'Supprimer ou déplacer des fichiers hors du dossier OneDrive pour libérer de l\'espace, OU demander à l\'admin d\'augmenter le quota', suite: 'n3' },
                    { texte: 'Vider la corbeille de Windows pour libérer de l\'espace', suite: 'n_bad3' },
                    { texte: 'Compresser tous les fichiers OneDrive en ZIP', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'L\'utilisateur a libéré 500 MB mais la synchronisation ne reprend pas automatiquement. Que faire ?',
                  choix: [
                    { texte: 'Clic droit sur l\'icône OneDrive → Reprendre la synchronisation, ou redémarrer OneDrive via le menu', suite: 'n4' },
                    { texte: 'Redémarrer le PC complet', suite: 'n_bad5' },
                    { texte: 'Attendre 24h que OneDrive reprenne automatiquement', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'Synchronisation reprise — problème résolu',
                  explication: 'Séquence de dépannage OneDrive : 1) Lire le message d\'erreur (quota, fichier verrouillé, nom invalide, conflit). 2) Résoudre la cause (libérer espace, fermer le fichier, renommer). 3) Reprendre la sync manuellement si elle ne reprend pas seule. Autres erreurs courantes : nom de fichier avec caractères spéciaux (: * ? " < > |), fichier ouvert exclusivement par une application, problème réseau/proxy.'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'Déconnexion sans diagnostic',
                  explication: 'Déconnecter le compte OneDrive sans savoir pourquoi il y a une erreur peut aggraver la situation : la reconnexion re-téléchargera potentiellement tous les fichiers. Le message d\'erreur dans le panneau OneDrive indique exactement la cause (quota, fichier verrouillé, etc.).'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'Réinstallation disproportionnée',
                  explication: 'OneDrive en erreur indique généralement un problème de données (quota, fichier invalide), pas un bug logiciel. Réinstaller ne changera pas le quota ou le nom de fichier problématique. Lisez d\'abord le message d\'erreur.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'La corbeille Windows n\'affecte pas le quota OneDrive',
                  explication: 'Le quota OneDrive est calculé par Microsoft sur le cloud. La corbeille Windows locale (fichiers supprimés du PC) n\'a pas d\'impact sur l\'espace OneDrive. Il faut supprimer des fichiers du dossier OneDrive (ou de la corbeille OneDrive sur le web).'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'Compresser ne libère pas de quota OneDrive',
                  explication: 'Compresser les fichiers en ZIP les duplique (original + ZIP) avant de supprimer les originaux. De plus, les fichiers ZIP dans OneDrive occupent toujours du quota. OneDrive compresse déjà certains types de fichiers. La solution est de supprimer ou déplacer les fichiers volumineux hors du dossier OneDrive.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'Redémarrage PC souvent inutile',
                  explication: 'Redémarrer le PC est une option valide en dernier recours mais pas la première action après avoir libéré de l\'espace. OneDrive peut être relancé directement depuis l\'icône système sans redémarrer le PC entier.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'OneDrive ne reprend pas automatiquement après 24h',
                  explication: 'Une fois la cause résolue (espace libéré), OneDrive peut reprendre la sync mais parfois pas automatiquement selon la raison de l\'arrêt. Il faut la relancer manuellement via le menu OneDrive. 24h d\'attente laisse l\'utilisateur sans sync pendant toute sa journée de travail.'
                }
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: 'messagerie-cloud-365',
    titre: 'Messagerie Cloud et 365',
    emoji: '📧',
    modules: [
      {
        id: 'cloud365-m01',
        titre: 'Composantes du Cloud et M365',
        cas: [
          {
            id: 'cas-cloud-001',
            titre: 'Identifier les modèles de service Cloud (IaaS, PaaS, SaaS)',
            difficulte: 'facile',
            format: 'scenario',
            objectif: 'Distinguer IaaS, PaaS et SaaS et identifier le bon modèle selon les besoins d\'une organisation',
            contexte: 'En tant que technicien TSSR, vous conseillez des clients sur leur migration cloud. Trois situations se présentent.',
            contenu: {
              etapes: [
                {
                  description: 'Client A : PME qui veut héberger ses serveurs Windows (Active Directory, serveur de fichiers) dans le cloud, sans gérer le matériel physique, mais en gardant le contrôle total du système d\'exploitation et des configurations. Quel modèle cloud ?',
                  choix: [
                    { texte: 'IaaS (Infrastructure as a Service) — Azure Virtual Machines par exemple', correct: true, feedback: 'Correct ! IaaS fournit des VM dans le cloud : le client gère l\'OS, les applications et les données. Le fournisseur gère le matériel, la virtualisation et le réseau physique. Azure VM, AWS EC2, Google Compute Engine sont des exemples typiques. Idéal pour "lift and shift" de serveurs existants.' },
                    { texte: 'SaaS (Software as a Service) — Microsoft 365', correct: false, feedback: 'SaaS fournit des applications clés en main directement utilisables (Outlook, Teams, Salesforce). Aucune gestion d\'OS ou de serveur. Le client A veut héberger ses propres serveurs Windows avec contrôle total — c\'est de l\'IaaS, pas du SaaS.' },
                    { texte: 'PaaS (Platform as a Service) — Azure App Service', correct: false, feedback: 'PaaS fournit une plateforme pour développer et déployer des applications (bases de données managées, environnements d\'exécution). Le client A veut héberger des serveurs Windows existants (AD, fichiers), pas développer des applications — c\'est de l\'IaaS.' }
                  ]
                },
                {
                  description: 'Client B : Startup qui développe une application web Node.js. Elle veut déployer son code sans gérer de serveurs, OS ou middleware. Quel modèle cloud ?',
                  choix: [
                    { texte: 'PaaS — Azure App Service, Heroku, ou Google App Engine', correct: true, feedback: 'Parfait ! PaaS permet aux développeurs de déployer leur code sans gérer l\'OS, le serveur web, les mises à jour de sécurité ou la mise à l\'échelle. Azure App Service gère automatiquement l\'infrastructure sous-jacente. La startup se concentre uniquement sur son code Node.js.' },
                    { texte: 'IaaS — louer des VM et installer Node.js dessus', correct: false, feedback: 'IaaS est possible mais demande plus de travail : installer Node.js, configurer nginx/Apache, gérer les mises à jour OS, configurer la mise à l\'échelle manuellement. PaaS automatise tout ça pour une startup qui veut juste déployer du code.' },
                    { texte: 'SaaS — utiliser une application existante', correct: false, feedback: 'SaaS fournit des applications existantes prêtes à l\'emploi. La startup développe SA PROPRE application — elle a besoin d\'un environnement pour la déployer (PaaS), pas d\'une application tierce.' }
                  ]
                },
                {
                  description: 'Client C : Grande école qui veut offrir à ses étudiants et enseignants une messagerie, un stockage de fichiers et des outils de collaboration sans infrastructure à gérer. Quel modèle cloud ?',
                  choix: [
                    { texte: 'SaaS — Microsoft 365 Education ou Google Workspace for Education', correct: true, feedback: 'SaaS est idéal ici ! Microsoft 365 Education fournit Exchange Online (messagerie), OneDrive (stockage), Teams (collaboration) et les apps Office — tout clés en main, sans aucune infrastructure à gérer. L\'école administre uniquement les comptes utilisateurs via le portail admin, pas les serveurs.' },
                    { texte: 'IaaS — louer des serveurs virtuels pour héberger Exchange et SharePoint', correct: false, feedback: 'Héberger Exchange sur IaaS demande des compétences avancées d\'administration Exchange (DAG, CAS, certificats, mises à jour), un investissement en licences importantes, et une équipe dédiée. Pour une école, SaaS M365 Education est bien plus économique et simple.' },
                    { texte: 'PaaS — développer une messagerie sur mesure', correct: false, feedback: 'Développer une messagerie from scratch sur PaaS pour une école serait un projet de plusieurs années, très coûteux, et sans garantie de fonctionnalité. Les solutions SaaS existantes (M365, Google Workspace) sont largement suffisantes.' }
                  ]
                }
              ]
            }
          },
          {
            id: 'cas-cloud-002',
            titre: 'Comprendre Exchange Online vs Exchange On-Premise',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Conseiller une organisation sur le choix entre Exchange Online (cloud) et Exchange On-Premise (serveur local)',
            contexte: 'Une entreprise de 200 employés doit renouveler son infrastructure de messagerie. Son Exchange 2013 est en fin de vie. Elle hésite entre migrer vers Exchange Online (M365) ou installer Exchange Server 2019.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Quels critères analyser en premier pour orienter le choix Exchange Online vs On-Premise ?',
                  choix: [
                    { texte: 'Analyser les contraintes de conformité/souveraineté des données et les ressources IT disponibles', suite: 'n2' },
                    { texte: 'Recommander automatiquement Exchange Online car c\'est plus moderne', suite: 'n_bad1' },
                    { texte: 'Recommander Exchange On-Premise pour garder le contrôle total', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'L\'entreprise traite des données clients sensibles (secteur médical). Elle doit garantir que les données restent en France. Exchange Online peut-il satisfaire cette exigence ?',
                  choix: [
                    { texte: 'Oui, avec M365 Multi-Geo ou les data centers Microsoft France (région France Centre/Sud) — vérifier avec Microsoft les garanties de résidence des données', suite: 'n3' },
                    { texte: 'Non, Exchange Online stocke toujours les données aux États-Unis', suite: 'n_bad3' },
                    { texte: 'Oui, toutes les données Microsoft sont automatiquement en France pour les entreprises françaises', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'La résidence des données peut être garantie. L\'équipe IT a 2 personnes. Quel argument final privilégie Exchange Online pour cette configuration ?',
                  choix: [
                    { texte: 'Exchange Online transfère la maintenance (mises à jour, haute disponibilité, sécurité) à Microsoft, libérant l\'équipe IT des 2 personnes pour d\'autres tâches', suite: 'n4' },
                    { texte: 'Exchange Online est gratuit donc économique', suite: 'n_bad5' },
                    { texte: 'Exchange On-Premise est plus simple à administrer pour une petite équipe IT', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'Recommandation : Exchange Online avec M365',
                  explication: 'Pour une PME de 200 personnes avec une petite équipe IT : Exchange Online est recommandé. Avantages : pas de serveur à gérer, mises à jour automatiques par Microsoft, haute disponibilité garantie par SLA (99,9%), sécurité gérée (anti-spam, anti-malware). Contraintes résolues : résidence des données en France possible (data centers Microsoft France). Coût : abonnement mensuel prévisible vs investissement CAPEX serveur + licences Exchange + maintenance.'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'Recommandation automatique sans analyse',
                  explication: 'Recommander Exchange Online sans analyser les contraintes peut être une erreur : certaines organisations ont des exigences de conformité strictes (données classifiées, secteurs réglementés) qui nécessitent le On-Premise. Toujours analyser les besoins avant de recommander.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'On-Premise n\'est pas automatiquement la meilleure option',
                  explication: 'Exchange On-Premise demande des serveurs, des licences CAL, des mises à jour régulières, et des administrateurs Exchange qualifiés. Pour une PME avec une petite équipe IT, la charge d\'administration peut être disproportionnée par rapport aux bénéfices.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'Microsoft a des data centers en France',
                  explication: 'Microsoft dispose de data centers en France (France Centre = Paris, France Sud = Marseille) depuis 2017. Les clients M365 peuvent demander la résidence des données en France via les paramètres de géo-résidence. Il ne faut pas confondre les data centers US d\'il y a 10 ans avec l\'infrastructure actuelle.'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'La résidence en France n\'est pas automatique',
                  explication: 'La résidence des données en France doit être explicitement configurée et vérifiée dans le Centre d\'administration M365. Par défaut, Microsoft peut distribuer les données entre plusieurs régions pour la résilience. Il faut vérifier le "Résumé de résidence des données" dans les paramètres d\'organisation.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'Exchange Online n\'est pas gratuit',
                  explication: 'Exchange Online fait partie des abonnements M365/Office 365 payants (de quelques euros/mois par utilisateur pour Exchange Online Plan 1 à plus pour les plans Enterprise). Ce n\'est pas gratuit — mais le modèle OPEX (dépense mensuelle) est souvent préférable au CAPEX (investissement serveur) pour les PME.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'Exchange On-Premise est plus complexe à administrer',
                  explication: 'Exchange Server On-Premise est notoirement complexe : gestion des certificats, des connecteurs, des bases de données, de la haute disponibilité (DAG), des mises à jour cumulatives. Une petite équipe IT de 2 personnes aura du mal à maintenir un Exchange On-Premise de qualité tout en gérant le reste de l\'infrastructure.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'cloud365-m02',
        titre: 'Administration de Microsoft 365',
        cas: [
          {
            id: 'cas-cloud-003',
            titre: 'Gérer les utilisateurs et groupes dans le centre d\'admin M365',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Administrer les utilisateurs M365 via PowerShell et le centre d\'administration : création, groupes, licences',
            contexte: 'Vous administrez un tenant M365. Vous devez créer 3 utilisateurs, les ajouter à un groupe, et attribuer des licences via PowerShell (Microsoft Graph).',
            contenu: {
              prompt: 'PS C:\\> ',
              commandes: {
                'help': 'Commandes disponibles : Connect-MgGraph, New-MgUser, New-MgGroup, Add-MgGroupMember, Get-MgSubscribedSku, Set-MgUserLicense, Get-MgUser',
                'Connect-MgGraph -Scopes "User.ReadWrite.All","Group.ReadWrite.All","Directory.ReadWrite.All"': 'Welcome To Microsoft Graph!\nAuthentication successful.',
                'New-MgUser -DisplayName "Alice Martin" -UserPrincipalName "alice.martin@contoso.com" -MailNickname "alice.martin" -AccountEnabled -PasswordProfile @{Password="TempPass123!"; ForceChangePasswordNextSignIn=$true}': 'Id                                   DisplayName  UserPrincipalName\n----                                 -----------  -----------------\na1b2c3d4-1234-5678-abcd-ef0123456789 Alice Martin alice.martin@contoso.com',
                'New-MgUser -DisplayName "Bob Dupont" -UserPrincipalName "bob.dupont@contoso.com" -MailNickname "bob.dupont" -AccountEnabled -PasswordProfile @{Password="TempPass123!"; ForceChangePasswordNextSignIn=$true}': 'Id                                   DisplayName  UserPrincipalName\n----                                 -----------  -----------------\nb2c3d4e5-2345-6789-bcde-f01234567890 Bob Dupont   bob.dupont@contoso.com',
                'New-MgGroup -DisplayName "Equipe-IT" -MailNickname "equipe-it" -GroupTypes @("Unified") -MailEnabled -SecurityEnabled': 'Id                                   DisplayName  MailNickname\n----                                 -----------  ------------\nc3d4e5f6-3456-789a-cdef-012345678901 Equipe-IT    equipe-it',
                'Add-MgGroupMember -GroupId "c3d4e5f6-3456-789a-cdef-012345678901" -DirectoryObjectId "a1b2c3d4-1234-5678-abcd-ef0123456789"': '',
                'Get-MgSubscribedSku | Select SkuPartNumber, ConsumedUnits, @{N="Available";E={$_.PrepaidUnits.Enabled - $_.ConsumedUnits}}': 'SkuPartNumber          ConsumedUnits Available\n-------------          ------------- ---------\nSPB                    47            3\nEXCHANGE_S_STANDARD   12            8',
                'Get-MgUser -UserId "alice.martin@contoso.com" | Select Id': 'Id\n--\na1b2c3d4-1234-5678-abcd-ef0123456789',
                'Set-MgUserLicense -UserId "alice.martin@contoso.com" -AddLicenses @{SkuId="<sku-id-SPB>"} -RemoveLicenses @()': 'Id                                   DisplayName  UserPrincipalName\n----                                 -----------  -----------------\na1b2c3d4-1234-5678-abcd-ef0123456789 Alice Martin alice.martin@contoso.com',
                'Get-MgUser -UserId "alice.martin@contoso.com" -Property "assignedLicenses"': 'AssignedLicenses : {@{DisabledPlans=System.Object[]; SkuId=guid-spb}}'
              },
              validation: ['Connect-MgGraph', 'New-MgUser', 'New-MgGroup', 'Add-MgGroupMember', 'Set-MgUserLicense'],
              indices: [
                'Commencez par Connect-MgGraph avec les scopes nécessaires',
                'New-MgUser requiert au minimum : DisplayName, UserPrincipalName, MailNickname, AccountEnabled, PasswordProfile',
                'Récupérez l\'SkuId avec Get-MgSubscribedSku avant d\'attribuer une licence',
                'Add-MgGroupMember prend les GUIDs du groupe et de l\'utilisateur'
              ],
              solution: [
                'Connect-MgGraph -Scopes "User.ReadWrite.All","Group.ReadWrite.All","Directory.ReadWrite.All"',
                'New-MgUser -DisplayName "Alice Martin" -UserPrincipalName "alice.martin@contoso.com" -MailNickname "alice.martin" -AccountEnabled -PasswordProfile @{Password="TempPass123!"; ForceChangePasswordNextSignIn=$true}',
                'New-MgUser -DisplayName "Bob Dupont" -UserPrincipalName "bob.dupont@contoso.com" -MailNickname "bob.dupont" -AccountEnabled -PasswordProfile @{Password="TempPass123!"; ForceChangePasswordNextSignIn=$true}',
                'New-MgGroup -DisplayName "Equipe-IT" -MailNickname "equipe-it" -GroupTypes @("Unified") -MailEnabled -SecurityEnabled',
                'Add-MgGroupMember -GroupId "<group-id>" -DirectoryObjectId "<user-id>"',
                'Get-MgSubscribedSku | Select SkuPartNumber, ConsumedUnits',
                'Set-MgUserLicense -UserId "alice.martin@contoso.com" -AddLicenses @{SkuId="<sku-id>"} -RemoveLicenses @()'
              ]
            }
          },
          {
            id: 'cas-cloud-004',
            titre: 'Diagnostic : utilisateur bloqué à la connexion M365',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Diagnostiquer pourquoi un utilisateur ne peut pas se connecter à Microsoft 365 et rétablir l\'accès',
            contexte: 'Un utilisateur appelle : "Je n\'arrive plus à me connecter à Outlook, Teams et le portail M365 depuis ce matin. Hier tout fonctionnait."',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Connexion M365 impossible depuis ce matin. Quelle est la première vérification dans le centre d\'administration ?',
                  choix: [
                    { texte: 'Vérifier dans admin.microsoft.com → Utilisateurs → si le compte est bloqué ou si la connexion est désactivée', suite: 'n2' },
                    { texte: 'Réinitialiser immédiatement le mot de passe', suite: 'n_bad1' },
                    { texte: 'Vérifier l\'état du service M365 sur status.office.com', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'Le compte est actif (connexion autorisée). Mais les journaux de connexion Entra ID montrent "Connexion bloquée — Accès conditionnel : MFA requis". Que s\'est-il passé ?',
                  choix: [
                    { texte: 'Une stratégie d\'accès conditionnel exige maintenant le MFA et l\'utilisateur ne l\'a pas encore configuré', suite: 'n3' },
                    { texte: 'Le mot de passe de l\'utilisateur a expiré', suite: 'n_bad3' },
                    { texte: 'La licence M365 de l\'utilisateur a été retirée', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'L\'utilisateur doit configurer le MFA mais ne peut pas accéder à M365 pour le faire. Comment débloquer la situation ?',
                  choix: [
                    { texte: 'Exclure temporairement l\'utilisateur de la stratégie d\'accès conditionnel, le guider pour configurer le MFA (aka.ms/mfasetup), puis réactiver la stratégie', suite: 'n4' },
                    { texte: 'Désactiver définitivement la stratégie d\'accès conditionnel pour cet utilisateur', suite: 'n_bad5' },
                    { texte: 'Créer un nouveau compte utilisateur sans MFA', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'MFA configuré — accès rétabli',
                  explication: 'Procédure correcte : 1) Exclure temporairement l\'utilisateur de la CA policy (Entra ID → Protection → Accès conditionnel → éditer la stratégie → Exclusions → ajouter l\'utilisateur). 2) L\'utilisateur se connecte et configure le MFA sur aka.ms/mfasetup (authenticator app, SMS, ou appel). 3) Retirer l\'exclusion de la CA policy. L\'utilisateur est maintenant conforme. Important : documenter l\'exclusion temporaire et la durée.'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'Réinitialisation de mot de passe sans diagnostic',
                  explication: 'Réinitialiser le mot de passe sans vérifier la cause peut être inutile. Si le compte est bloqué par l\'accès conditionnel (MFA requis) ou si la connexion est désactivée, un nouveau mot de passe ne changera rien. Vérifiez d\'abord l\'état du compte et les journaux.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'status.office.com est utile mais pas la priorité ici',
                  explication: 'Vérifier l\'état du service est pertinent si PLUSIEURS utilisateurs sont affectés simultanément, suggérant une panne globale. Ici, un seul utilisateur est impacté — c\'est un problème de compte individuel, pas une panne de service. Commencez par le compte de l\'utilisateur.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'L\'expiration du mot de passe donne un message différent',
                  explication: 'Un mot de passe expiré donne le message "Votre mot de passe a expiré" lors de la connexion — M365 propose de le changer immédiatement. Le message "Accès conditionnel : MFA requis" est spécifique à une règle CA non satisfaite, pas à un mot de passe expiré.'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'La perte de licence donne un message différent',
                  explication: 'Sans licence, l\'utilisateur peut se connecter à l\'interface M365 mais les apps (Outlook, Teams) affichent "Votre abonnement ne comprend pas ce service". Le message "Accès conditionnel" est lié aux règles de sécurité Entra ID, pas aux licences.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'Désactiver la stratégie CA crée une faille de sécurité',
                  explication: 'Désactiver définitivement la stratégie d\'accès conditionnel pour un utilisateur supprime une protection de sécurité importante. Le MFA est une exigence légale dans certains secteurs et une best practice universelle. La bonne approche est une exclusion TEMPORAIRE le temps de la configuration.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'Créer un nouveau compte contourne la sécurité',
                  explication: 'Créer un compte sans MFA crée une faille de sécurité et un doublon dans l\'annuaire. Les emails et données de l\'ancien compte ne seraient pas accessibles. La bonne solution est de débloquer l\'accès au compte existant pour permettre la configuration du MFA.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'cloud365-m03',
        titre: 'Sécurité et conformité',
        cas: [
          {
            id: 'cas-cloud-005',
            titre: 'Configurer les politiques de prévention des pertes de données (DLP)',
            difficulte: 'difficile',
            format: 'scenario',
            objectif: 'Comprendre et configurer une politique DLP Microsoft Purview pour protéger les données sensibles',
            contexte: 'L\'entreprise a détecté que des employés envoient parfois des numéros de carte bancaire par email à des partenaires non autorisés. Le RSSI vous demande de configurer une règle DLP pour bloquer ce type de fuite.',
            contenu: {
              etapes: [
                {
                  description: 'Dans quel portail Microsoft configurez-vous les politiques DLP et quel est le premier paramètre à définir ?',
                  choix: [
                    { texte: 'Microsoft Purview (purview.microsoft.com) → Solutions → Prévention des pertes de données → Stratégies → Créer une stratégie — choisir le type de données sensibles (numéros de carte bancaire)', correct: true, feedback: 'Correct ! Microsoft Purview est le portail de conformité unifié. Les types d\'informations sensibles (SIT) préconfigurés incluent les numéros de carte bancaire (Credit Card Number) pour les principales émetteurs mondiaux. DLP peut analyser Exchange Online, SharePoint, OneDrive, Teams et les endpoints Windows.' },
                    { texte: 'Centre de sécurité Microsoft 365 (security.microsoft.com) → Stratégies', correct: false, feedback: 'security.microsoft.com gère Defender (antivirus, XDR, gestion des appareils). Les politiques DLP et conformité sont dans Microsoft Purview (purview.microsoft.com), anciennement le Centre de conformité M365.' },
                    { texte: 'Créer une règle de flux de messagerie Exchange (règle de transport) pour bloquer les emails contenant "4xxx xxxx xxxx xxxx"', correct: false, feedback: 'Les règles de transport Exchange peuvent filtrer du texte basique, mais elles ne reconnaissent pas les patterns de cartes bancaires de façon fiable (validation de Luhn, formats variés). DLP Microsoft Purview utilise des SIT (Sensitive Information Types) avec des algorithmes de détection bien plus précis.' }
                  ]
                },
                {
                  description: 'La stratégie DLP est créée. Quel mode de déploiement choisir en premier pour ne pas perturber les utilisateurs ?',
                  choix: [
                    { texte: 'Mode simulation (test) : détecter et journaliser les correspondances sans bloquer, pendant 1-2 semaines pour mesurer les faux positifs', correct: true, feedback: 'Bonne pratique ! Le mode simulation permet de mesurer l\'impact réel avant d\'appliquer les règles. Si le taux de faux positifs est élevé (emails légitimes bloqués), affinez les conditions (expéditeurs exclus, domaines de partenaires autorisés, seuil de détection). Déployer directement en mode blocage peut interrompre des processus métier légitimes.' },
                    { texte: 'Mode blocage immédiat pour une protection maximale dès le déploiement', correct: false, feedback: 'Bloquer immédiatement sans simulation peut bloquer des emails légitimes (factures, comptabilité, e-commerce) qui contiennent des numéros de carte dans un contexte normal. Les faux positifs peuvent perturber l\'activité. Le mode simulation d\'abord permet de calibrer la règle.' },
                    { texte: 'Notifier uniquement l\'utilisateur (conseil de conformité) sans aucune journalisation', correct: false, feedback: 'Notifier sans journaliser empêche de mesurer l\'efficacité de la politique et de détecter les contournements. Les journaux DLP sont essentiels pour les audits de conformité et l\'analyse des incidents. Toujours activer la journalisation.' }
                  ]
                },
                {
                  description: 'Après 2 semaines de simulation, 95% des correspondances sont des vraies cartes bancaires dans des emails non autorisés. Quelle action configurer pour les correspondances réelles ?',
                  choix: [
                    { texte: 'Bloquer l\'envoi + notifier l\'utilisateur avec un conseil de conformité + alerter le responsable sécurité + journaliser dans les rapports DLP', correct: true, feedback: 'Configuration optimale ! Bloquer + notifier l\'utilisateur (il comprend pourquoi son email est bloqué et peut demander une exception légitime). Alerter le RSSI pour les cas suspects. Journaliser pour les audits. Vous pouvez aussi permettre à l\'utilisateur de "remplacer" le blocage avec une justification (override avec approbation) pour les cas légitimes.' },
                    { texte: 'Supprimer l\'email sans notifier l\'utilisateur ni le RSSI', correct: false, feedback: 'Supprimer silencieusement les emails sans notification est problématique : l\'utilisateur pense que l\'email est parti, le destinataire ne le reçoit pas, et personne ne sait qu\'un incident DLP a eu lieu. La notification est essentielle pour la transparence et la conformité.' },
                    { texte: 'Mettre en quarantaine tous les emails sortants pour révision manuelle', correct: false, feedback: 'Mettre en quarantaine TOUS les emails sortants créerait un engorgement ingérable (des centaines d\'emails à réviser manuellement). La quarantaine est une option valide pour les cas très sensibles (données classifiées), mais bloquer + notifier est suffisant pour les cartes bancaires.' }
                  ]
                }
              ]
            }
          },
          {
            id: 'cas-cloud-006',
            titre: 'Gérer l\'accès conditionnel et le MFA dans Entra ID',
            difficulte: 'moyen',
            format: 'scenario',
            objectif: 'Configurer des stratégies d\'accès conditionnel Entra ID pour sécuriser l\'accès à Microsoft 365',
            contexte: 'Suite à un incident de sécurité (compte compromis depuis une adresse IP étrangère), le RSSI vous demande de renforcer la sécurité des connexions M365 avec des stratégies d\'accès conditionnel.',
            contenu: {
              etapes: [
                {
                  description: 'Première stratégie : exiger le MFA pour tous les utilisateurs accédant à M365 depuis l\'extérieur du réseau d\'entreprise. Comment la configurer ?',
                  choix: [
                    { texte: 'Entra ID → Protection → Accès conditionnel → Nouvelle stratégie → Utilisateurs : Tous → Applications : Microsoft 365 → Conditions : Emplacements réseau = hors réseau approuvé → Contrôles d\'accès : Exiger MFA', correct: true, feedback: 'Configuration correcte ! Les "Emplacements réseau approuvés" dans Entra ID correspondent aux plages IP de l\'entreprise (configurées dans Entra ID → Emplacements nommés). Hors de ces IPs = réseau externe → MFA obligatoire. En interne = connexion directe sans MFA supplémentaire. Équilibre entre sécurité et confort utilisateur.' },
                    { texte: 'Activer le MFA pour tous les utilisateurs sans condition d\'emplacement', correct: false, feedback: 'Exiger le MFA même sur le réseau interne peut être justifié (Zero Trust), mais crée des frictions pour les utilisateurs au bureau qui se reconnectent fréquemment. Commencer par MFA hors réseau est un bon compromis. Vous pouvez durcir vers le Zero Trust complet progressivement.' },
                    { texte: 'Bloquer toutes les connexions depuis des pays étrangers', correct: false, feedback: 'Bloquer tous les pays étrangers bloquerait aussi les employés en déplacement professionnel (salons, conférences, voyages d\'affaires). Une stratégie d\'accès conditionnel avec MFA renforcé pour les emplacements à risque est plus flexible qu\'un blocage géographique total.' }
                  ]
                },
                {
                  description: 'Deuxième stratégie : bloquer l\'accès depuis les appareils non conformes (non gérés par Intune). Comment procéder ?',
                  choix: [
                    { texte: 'Accès conditionnel → Conditions : Appareils filtrés → Conformité appareil = non conforme → Bloquer l\'accès (nécessite Intune et Azure AD Join)', correct: true, feedback: 'Correct ! Cette stratégie "Device Compliance" vérifie si l\'appareil est inscrit dans Intune et conforme aux politiques (antivirus à jour, chiffrement BitLocker, PIN). Un BYOD non géré sera bloqué. Pré-requis : les appareils des employés doivent être inscrits dans Intune (M365 Business Premium ou E3+ requis).' },
                    { texte: 'Demander aux utilisateurs de signer une charte d\'utilisation pour les appareils personnels', correct: false, feedback: 'Une charte n\'est qu\'un engagement formel sans contrôle technique. Un utilisateur peut signer la charte et accéder depuis un appareil infecté ou non sécurisé. Le contrôle de conformité Intune est un contrôle technique réel.' },
                    { texte: 'Désactiver l\'accès mobile à M365 pour tous les utilisateurs', correct: false, feedback: 'Désactiver totalement l\'accès mobile empêcherait les utilisateurs de travailler en mobilité (télétravail, déplacements). La stratégie de conformité des appareils (Intune) permet l\'accès mobile sécurisé aux appareils gérés, pas un blocage total.' }
                  ]
                },
                {
                  description: 'Un dirigeant se plaint que le MFA le ralentit trop. Il demande une exception permanente. Comment gérer cette situation ?',
                  choix: [
                    { texte: 'Expliquer les risques, proposer l\'application Microsoft Authenticator (notification push en 1 seconde), et éventuellement configurer des sessions persistantes pour les appareils de confiance', correct: true, feedback: 'Bonne approche diplomatique ! L\'app Authenticator avec notifications push est la méthode MFA la plus rapide (1 tap). Les sessions persistantes (session permanente sur appareil connu) réduisent la fréquence des demandes MFA. Si le dirigeant insiste pour une exception totale, documenter formellement le refus de MFA et le faire signer comme acceptation de risque.' },
                    { texte: 'Créer une exception permanente dans l\'accès conditionnel pour le compte du dirigeant', correct: false, feedback: 'Les comptes de dirigeants sont les plus ciblés par les attaques (whaling, spear phishing). Exclure un CEO ou CFO du MFA crée une faille de sécurité majeure. Si son compte est compromis, les dégâts peuvent être catastrophiques (virement frauduleux, données stratégiques). C\'est exactement l\'opposé de la bonne pratique.' },
                    { texte: 'Désactiver la stratégie d\'accès conditionnel complète pour ne pas gêner les dirigeants', correct: false, feedback: 'Désactiver la stratégie globale pour l\'ensemble des utilisateurs à cause d\'un seul dirigeant récalcitrant est une décision de sécurité catastrophique. L\'accès conditionnel protège tous les comptes. Si le dirigeant refuse, documentez et escaladez à la Direction Générale — c\'est un choix de gouvernance, pas technique.' }
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        id: 'cloud365-m04',
        titre: 'Services complémentaires',
        cas: [
          {
            id: 'cas-cloud-007',
            titre: 'Configurer Microsoft Intune pour la gestion des appareils',
            difficulte: 'moyen',
            format: 'scenario',
            objectif: 'Comprendre les étapes de base pour inscrire des appareils dans Intune et déployer des politiques de conformité',
            contexte: 'L\'entreprise déploie Microsoft Intune pour gérer ses 50 PC Windows 10/11 d\'entreprise. Vous êtes chargé de l\'onboarding des appareils et du déploiement des premières politiques.',
            contenu: {
              etapes: [
                {
                  description: 'Comment inscrire automatiquement les PC Windows 10/11 dans Intune lors de leur jonction Azure AD ?',
                  choix: [
                    { texte: 'Entra ID → Appareils → Inscription automatique MDM → configurer la portée MDM (Tous ou groupes sélectionnés) → les PC joints à Azure AD s\'inscrivent automatiquement dans Intune', correct: true, feedback: 'L\'inscription automatique MDM est la méthode standard ! Dès qu\'un appareil est joint à Azure AD (Azure AD Join ou Hybrid Azure AD Join), et que l\'inscription MDM automatique est configurée, l\'appareil s\'inscrit dans Intune sans action supplémentaire. Utilisez Windows Autopilot pour automatiser entièrement le provisioning des nouveaux appareils.' },
                    { texte: 'Installer manuellement le client Intune depuis le site Microsoft sur chaque PC', correct: false, feedback: 'Il n\'y a pas de "client Intune" à installer manuellement sur Windows 10/11 — la gestion MDM est intégrée à Windows. L\'inscription se fait via les Paramètres Windows (Accès professionnel ou scolaire) ou automatiquement via Azure AD Join avec inscription MDM configurée.' },
                    { texte: 'Créer un script PowerShell et l\'exécuter sur chaque PC pour l\'inscrire', correct: false, feedback: 'Bien qu\'il existe des commandes PowerShell pour forcer l\'inscription MDM (deviceenroller.exe /c /AutoEnrollMDM), c\'est une méthode manuelle pour des cas particuliers. L\'inscription automatique via Azure AD Join est la méthode recommandée et scalable pour un déploiement en masse.' }
                  ]
                },
                {
                  description: 'Les PC sont inscrits. Vous créez une politique de conformité. Quels paramètres inclure en priorité pour un niveau de sécurité de base ?',
                  choix: [
                    { texte: 'BitLocker activé (chiffrement disque), Antivirus Windows Defender actif et à jour, Pare-feu Windows activé, PIN/mot de passe requis pour la session', correct: true, feedback: 'Ce sont les 4 paramètres de conformité fondamentaux recommandés par Microsoft pour un profil de sécurité de base. BitLocker protège les données en cas de vol physique. Defender protège contre les malwares. Pare-feu bloque les connexions non sollicitées. PIN/mot de passe protège l\'accès physique. Ces paramètres s\'appliquent via Intune sans action manuelle sur chaque PC.' },
                    { texte: 'Bloquer l\'accès USB sur tous les PC', correct: false, feedback: 'Bloquer les USB est une mesure de sécurité valide mais souvent trop restrictive pour un déploiement initial — elle bloque aussi les claviers, souris et écrans USB. Commencez par les paramètres de conformité de base, puis affinez avec des politiques de restriction des périphériques selon les besoins métier.' },
                    { texte: 'Exiger Windows 11 comme version minimale', correct: false, feedback: 'Exiger Windows 11 immédiatement bloquerait les PC encore sous Windows 10 (supporté jusqu\'en octobre 2025). La politique de conformité doit être progressive : définir une version minimale compatible avec votre parc actuel et planifier la migration vers Windows 11.' }
                  ]
                },
                {
                  description: 'Un PC est marqué "Non conforme" dans Intune (BitLocker non activé). Quelle action automatique Intune peut-il déclencher ?',
                  choix: [
                    { texte: 'Déclencher une période de grâce (ex: 3 jours pour se mettre en conformité), puis bloquer l\'accès aux ressources M365 via l\'accès conditionnel si toujours non conforme', correct: true, feedback: 'Mécanisme idéal ! La période de grâce laisse le temps à l\'utilisateur ou à l\'IT de corriger le problème sans blocage immédiat. Après la période, l\'accès conditionnel Entra ID bloque automatiquement l\'accès à M365 pour les appareils non conformes. Vous pouvez aussi configurer Intune pour activer BitLocker automatiquement via un profil de configuration (Endpoint Security → Chiffrement de disque).' },
                    { texte: 'Supprimer automatiquement toutes les données de l\'appareil (wipe)', correct: false, feedback: 'Le wipe automatique pour non-conformité est une mesure extrême et destructrice. Elle effacerait les données de travail d\'un utilisateur dont le BitLocker n\'est pas activé — peut-être par un simple bug de configuration. La non-conformité doit d\'abord déclencher une alerte et une période de remédiation, pas un effacement.' },
                    { texte: 'Envoyer un email d\'avertissement à l\'utilisateur et ne rien faire d\'autre', correct: false, feedback: 'L\'email seul sans conséquence n\'incite pas à la remédiation. Si l\'utilisateur ignore l\'email, l\'appareil reste non conforme indéfiniment. La combinaison alerte + période de grâce + blocage conditionnel est bien plus efficace pour garantir la conformité.' }
                  ]
                }
              ]
            }
          },
          {
            id: 'cas-cloud-008',
            titre: 'Résoudre une panne de synchronisation Azure AD Connect',
            difficulte: 'difficile',
            format: 'arbre',
            objectif: 'Diagnostiquer et résoudre les problèmes de synchronisation entre Active Directory On-Premise et Entra ID via Azure AD Connect',
            contexte: 'Vous gérez un environnement hybride AD + M365. Un admin vous signale que des modifications faites dans l\'AD On-Premise (nouveau compte, changement de mot de passe) ne se synchronisent plus vers Entra ID depuis 3 heures.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'La synchronisation AD Connect est en panne depuis 3 heures. Quelle est votre première vérification ?',
                  choix: [
                    { texte: 'Sur le serveur AD Connect : vérifier l\'état du service Azure AD Sync et les journaux d\'événements', suite: 'n2' },
                    { texte: 'Redémarrer le serveur AD Connect sans diagnostic', suite: 'n_bad1' },
                    { texte: 'Vérifier directement dans le portail Entra ID l\'état de la synchronisation', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'Services → ADSync : le service est arrêté. Vous le démarrez mais il s\'arrête à nouveau après 30 secondes. Les journaux montrent "AADSTS70011: The provided value for the input parameter \'scope\' is not valid. Le compte de service ADSync a un mot de passe expiré." Que faire ?',
                  choix: [
                    { texte: 'Réinitialiser le mot de passe du compte de service ADSync dans l\'AD, puis le mettre à jour dans la configuration d\'AD Connect', suite: 'n3' },
                    { texte: 'Désinstaller et réinstaller Azure AD Connect', suite: 'n_bad3' },
                    { texte: 'Changer le compte de service pour le compte Administrateur du domaine', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'Le mot de passe est mis à jour et le service ADSync démarre. La sync ne se lance pas immédiatement. Comment forcer une synchronisation ?',
                  choix: [
                    { texte: 'PowerShell sur le serveur AD Connect : Start-ADSyncSyncCycle -PolicyType Delta (ou Initial pour une synchro complète)', suite: 'n4' },
                    { texte: 'Attendre le prochain cycle automatique (30 minutes)', suite: 'n_bad5' },
                    { texte: 'Redémarrer le serveur AD complet pour forcer la réplication', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'Synchronisation AD Connect rétablie',
                  explication: 'Séquence de résolution : 1) Service ADSync arrêté → identifier la cause dans les journaux. 2) Mot de passe expiré → réinitialiser dans l\'AD (ADUC) puis mettre à jour dans AD Connect (wizard ou Set-ADSyncScheduler). 3) Forcer une sync delta (Start-ADSyncSyncCycle -PolicyType Delta) pour rattraper les 3h de modifications en attente. 4) Vérifier dans Entra ID → Surveillance → Journaux de provisionnement que les objets sont bien synchronisés. Bonne pratique : désactiver l\'expiration du mot de passe pour les comptes de service.'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'Redémarrage sans diagnostic',
                  explication: 'Redémarrer le serveur sans vérifier les services et les journaux masque les symptômes sans résoudre la cause. Si le service ADSync plante à cause d\'un mot de passe expiré, le redémarrage du serveur ne changera pas le fait que le compte de service ne peut plus s\'authentifier.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'Le portail Entra ID confirme la panne mais n\'en donne pas la cause',
                  explication: 'Entra ID → Surveillance → Intégrité de la synchronisation montre que la sync est en échec, mais la cause racine (service arrêté, mot de passe expiré, erreurs de schéma) est dans les journaux du serveur AD Connect. Commencez l\'investigation sur le serveur.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'Désinstallation/réinstallation trop radicale',
                  explication: 'Réinstaller AD Connect est une procédure longue et risquée : reconfiguration complète, risques d\'erreur de mapping, potentielle resynchronisation complète de tous les objets. Un mot de passe de compte de service expiré se résout en 5 minutes sans toucher à l\'installation.'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'Utiliser un compte admin de domaine est une mauvaise pratique',
                  explication: 'Utiliser le compte Administrateur du domaine pour le service ADSync est une violation du principe de moindre privilège. Si AD Connect est compromis, l\'attaquant aurait les droits admin du domaine. Il faut utiliser un compte de service dédié avec uniquement les droits nécessaires, et désactiver l\'expiration de son mot de passe.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'Attendre 30 minutes n\'est pas optimal',
                  explication: '3h de modifications AD non synchronisées (nouveaux comptes, changements de mots de passe, modifications de groupes) peuvent bloquer des utilisateurs. Start-ADSyncSyncCycle -PolicyType Delta force immédiatement la synchronisation des changements depuis le dernier cycle réussi, sans attendre 30 minutes.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'Redémarrer l\'AD pour une panne AD Connect est disproportionné',
                  explication: 'AD Connect et Active Directory sont deux services distincts sur deux serveurs différents (généralement). La panne d\'AD Connect n\'est pas liée à l\'AD lui-même. Redémarrer le contrôleur de domaine interromprait l\'authentification de tous les utilisateurs du réseau — une interruption de service majeure pour rien.'
                }
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: 'services-transverses-ms',
    titre: 'Microsoft — Services transverses',
    emoji: '🖥️',
    modules: [
      {
        id: 'ms-transv-m01',
        titre: 'Mise en place de l\'infrastructure',
        cas: [
          {
            id: 'cas-mstv-001',
            titre: 'Déployer un contrôleur de domaine Active Directory',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Installer et configurer Active Directory Domain Services (AD DS) sur Windows Server via PowerShell',
            contexte: 'Vous devez promouvoir un serveur Windows Server 2022 (SRV-DC01) en premier contrôleur de domaine pour le nouveau domaine contoso.local.',
            contenu: {
              prompt: 'PS C:\\Windows\\system32> ',
              commandes: {
                'help': 'Commandes disponibles : Install-WindowsFeature, Install-ADDSForest, Get-ADDomain, Get-ADForest, Test-ADDSInstallation, netdom query fsmo',
                'Install-WindowsFeature AD-Domain-Services -IncludeManagementTools': 'Success Restart Needed Exit Code Feature Result\n------- -------------- --------- --------------\nTrue    No             Success   {Active Directory Domain Services, Group P...}',
                'Install-ADDSForest -DomainName "contoso.local" -DomainNetbiosName "CONTOSO" -ForestMode "WinThreshold" -DomainMode "WinThreshold" -InstallDns -Force': 'The target server will be configured as a domain controller and restarted when this operation is complete.\nPerforming the operation "Install" on target "SRV-DC01"...\nDéploiement d\'Active Directory Domain Services...\n...\nSRV-DC01 se redémarre...\n[Après redémarrage]',
                'Get-ADDomain': 'AllowedDNSSuffixes                 : {}\nChildDomains                      : {}\nComputersContainer                : CN=Computers,DC=contoso,DC=local\nDNSRoot                           : contoso.local\nDomainMode                        : Windows2016Domain\nForest                            : contoso.local\nInfrastructureMaster              : SRV-DC01.contoso.local\nNetBIOSName                       : CONTOSO\nPDCEmulator                       : SRV-DC01.contoso.local\nRIDMaster                         : SRV-DC01.contoso.local',
                'Get-ADForest': 'ApplicationPartitions : {DC=ForestDnsZones,DC=contoso,DC=local}\nDomains               : {contoso.local}\nForestMode            : Windows2016Forest\nName                  : contoso.local\nRootDomain            : contoso.local\nSchemaMaster          : SRV-DC01.contoso.local\nDomainNamingMaster    : SRV-DC01.contoso.local',
                'netdom query fsmo': 'Maître de schéma        SRV-DC01.contoso.local\nMaître d\'attribution de noms de domaine SRV-DC01.contoso.local\nMaître RID              SRV-DC01.contoso.local\nEmulateur PDC           SRV-DC01.contoso.local\nMaître d\'infrastructure SRV-DC01.contoso.local\nLa commande s\'est terminée correctement.'
              },
              validation: ['Install-WindowsFeature AD-Domain-Services', 'Install-ADDSForest', 'Get-ADDomain'],
              indices: [
                'Installez d\'abord le rôle AD DS : Install-WindowsFeature AD-Domain-Services -IncludeManagementTools',
                'Pour le premier DC d\'une forêt : Install-ADDSForest (pas Install-ADDSDomainController)',
                'Spécifiez DomainName, ForestMode, DomainMode et -InstallDns pour le DNS intégré',
                'Le serveur redémarre automatiquement après la promotion'
              ],
              solution: [
                'Install-WindowsFeature AD-Domain-Services -IncludeManagementTools',
                'Install-ADDSForest -DomainName "contoso.local" -DomainNetbiosName "CONTOSO" -ForestMode "WinThreshold" -DomainMode "WinThreshold" -InstallDns -Force',
                'Get-ADDomain',
                'netdom query fsmo'
              ]
            }
          },
          {
            id: 'cas-mstv-002',
            titre: 'Diagnostic : utilisateurs ne peuvent pas se connecter au domaine',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Identifier et résoudre les causes d\'échec d\'ouverture de session sur un domaine Active Directory',
            contexte: 'Lundi matin, plusieurs utilisateurs appellent : "Je ne peux pas me connecter, il affiche Mon domaine n\'est pas disponible ou Le service de connexion a échoué." Le réseau physique fonctionne.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Plusieurs utilisateurs ne peuvent plus se connecter au domaine. Quelle est la première vérification ?',
                  choix: [
                    { texte: 'Vérifier si le contrôleur de domaine (DC) est accessible : ping dc01.contoso.local et vérifier le service Netlogon', suite: 'n2' },
                    { texte: 'Réinitialiser tous les mots de passe des utilisateurs concernés', suite: 'n_bad1' },
                    { texte: 'Rejoindre les postes au domaine depuis zéro', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'Le ping vers le DC répond. Mais sur le DC : Get-Service Netlogon affiche Status = Stopped. Que faites-vous ?',
                  choix: [
                    { texte: 'Start-Service Netlogon sur le DC, puis vérifier que les utilisateurs peuvent se reconnecter', suite: 'n3' },
                    { texte: 'Redémarrer complètement le DC en urgence', suite: 'n_bad3' },
                    { texte: 'Désjoindre tous les postes du domaine et les rejoindre', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'Le service Netlogon est redémarré. Certains utilisateurs peuvent se connecter, d\'autres reçoivent "Ce compte a été désactivé". Que vérifier ?',
                  choix: [
                    { texte: 'Dans ADUC ou Get-ADUser : vérifier si les comptes concernés sont désactivés (Enabled = False) et les réactiver si nécessaire', suite: 'n4' },
                    { texte: 'Supprimer et recréer les comptes utilisateurs désactivés', suite: 'n_bad5' },
                    { texte: 'Désactiver la stratégie de verrouillage de compte dans la GPO', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'Problèmes identifiés et résolus',
                  explication: 'Deux causes distinctes : 1) Service Netlogon arrêté → toutes les ouvertures de session échouent (le DC ne peut pas authentifier). Solution : Start-Service Netlogon. Vérifier le démarrage automatique : Set-Service Netlogon -StartupType Automatic. 2) Comptes désactivés → message spécifique "compte désactivé". Solution : Enable-ADAccount -Identity <user>. Vérifier la cause (script de désactivation automatique, politique de sécurité, action d\'un admin).'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'Réinitialisation de mots de passe sans diagnostic',
                  explication: 'Si le service Netlogon est arrêté, même des mots de passe corrects ne fonctionneront pas. Réinitialiser des mots de passe sur un problème d\'infrastructure est inefficace et perturbe les utilisateurs qui avaient pourtant les bons mots de passe.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'Rejoindre le domaine ne résout pas une panne DC',
                  explication: 'Si le DC est inaccessible ou si Netlogon est arrêté, rejoindre le domaine depuis les postes échouera aussi. Il faut d\'abord résoudre le problème côté serveur (DC) avant de toucher aux postes clients.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'Redémarrage DC interrompt tous les services',
                  explication: 'Redémarrer le DC arrête temporairement tous les services AD (DNS, LDAP, Kerberos, Netlogon). Si c\'est le seul DC, cela rend toute l\'infrastructure indisponible pendant le redémarrage. Démarrer uniquement le service Netlogon est moins perturbateur et suffit ici.'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'Déjoindre/rejoindre les postes est disproportionné',
                  explication: 'La désjonction/jonction de domaine est une opération lourde (redémarrage requis, perte des GPO locales, nouveau SID machine). Si le problème est côté DC (Netlogon arrêté), les postes n\'ont rien à voir. C\'est une opération à éviter sauf si la relation de confiance machine-domaine est réellement cassée.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'Recréer les comptes efface l\'historique et les groupes',
                  explication: 'Recréer un compte AD crée un nouveau SID : l\'utilisateur perd l\'appartenance à tous ses groupes, les permissions sur les ressources, et son profil itinérant. Enable-ADAccount réactive le compte existant en conservant tout. Ne recréez un compte que s\'il est supprimé et non récupérable.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'Désactiver la politique de verrouillage est dangereux',
                  explication: 'Le message "compte désactivé" est différent du message "compte verrouillé". Un compte désactivé est désactivé administrativement (Enabled = False), pas verrouillé après trop de tentatives. Désactiver la politique de verrouillage ne résoudrait rien ici et créerait une vulnérabilité aux attaques par force brute.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'ms-transv-m02',
        titre: 'Remote Desktop Services (RDS)',
        cas: [
          {
            id: 'cas-mstv-003',
            titre: 'Déployer et configurer les rôles RDS',
            difficulte: 'moyen',
            format: 'scenario',
            objectif: 'Comprendre l\'architecture RDS et déployer les rôles nécessaires pour une infrastructure de bureau à distance',
            contexte: 'L\'entreprise veut déployer Remote Desktop Services pour permettre à 30 employés d\'accéder à leurs applications depuis n\'importe où. Vous planifiez l\'infrastructure sur 3 serveurs Windows Server 2022.',
            contenu: {
              etapes: [
                {
                  description: 'Quels sont les rôles RDS minimaux nécessaires pour un déploiement fonctionnel et sur quels serveurs les répartir ?',
                  choix: [
                    { texte: 'RD Session Host (SRV-RDSH) : héberge les sessions des utilisateurs | RD Connection Broker (SRV-CB) : gère les connexions et l\'équilibrage | RD Web Access (SRV-WEB) : portail web pour accéder aux apps', correct: true, feedback: 'Architecture correcte pour 30 utilisateurs ! RD Session Host est le serveur où les applications s\'exécutent. RD Connection Broker est le "chef d\'orchestre" qui distribue les connexions entre les RDSH et gère la reconnexion aux sessions existantes. RD Web Access publie les RemoteApps et le bureau à distance via un navigateur web.' },
                    { texte: 'Installer tous les rôles RDS sur un seul serveur pour simplifier', correct: false, feedback: 'Installer tous les rôles sur un seul serveur est possible en lab mais déconseillé en production : si le serveur tombe, tout tombe. De plus, certains rôles (notamment RD Licensing) consomment des ressources importantes. La répartition sur 3 serveurs offre la résilience et la scalabilité.' },
                    { texte: 'RD Session Host seul suffit pour 30 utilisateurs', correct: false, feedback: 'Un RDSH seul peut héberger des sessions, mais sans Connection Broker, la reconnexion aux sessions déconnectées est aléatoire et l\'équilibrage entre plusieurs RDSH est impossible. Sans Web Access, les utilisateurs doivent configurer manuellement le client RDP. Pour un déploiement professionnel, les 3 rôles sont nécessaires.' }
                  ]
                },
                {
                  description: 'Les licences RDS : qu\'est-ce que le rôle RD Licensing et pourquoi est-il obligatoire après 120 jours ?',
                  choix: [
                    { texte: 'RD Licensing gère les licences CAL RDS (Client Access License). Sans serveur de licences configuré, RDS fonctionne 120 jours en mode grâce, puis refuse toute connexion utilisateur', correct: true, feedback: 'Exact ! Les licences CAL RDS sont obligatoires légalement (par utilisateur ou par appareil). Le serveur RD Licensing émet des tokens CAL aux clients qui se connectent. Sans licences valides, après 120 jours, les utilisateurs reçoivent "La licence de ce serveur Remote Desktop Services a expiré" et ne peuvent plus se connecter. Deux types de CAL : RDS CAL "Par utilisateur" ou "Par appareil".' },
                    { texte: 'RD Licensing est optionnel, c\'est uniquement pour les statistiques de connexion', correct: false, feedback: 'RD Licensing n\'est pas optionnel légalement ni techniquement. Sans licences CAL RDS valides (et sans serveur RD Licensing configuré), les connexions sont refusées après la période de grâce de 120 jours. C\'est une obligation légale Microsoft.' },
                    { texte: 'Windows Server Standard inclut automatiquement des licences CAL RDS illimitées', correct: false, feedback: 'Windows Server Standard et Datacenter n\'incluent PAS de licences CAL RDS. Ces licences sont achetées séparément. Windows Server inclut seulement 2 connexions administrateur (mode /admin) pour la gestion, pas pour les utilisateurs finaux.' }
                  ]
                },
                {
                  description: 'Un utilisateur se connecte en RDS et retrouve un bureau vide à chaque connexion (son profil ne persiste pas). Quelle fonctionnalité manque ?',
                  choix: [
                    { texte: 'Les profils itinérants (Roaming Profiles) ou les disques de profil utilisateur (User Profile Disks — UPD) ne sont pas configurés', correct: true, feedback: 'Sans profil persistant, chaque connexion RDS crée un profil temporaire qui est supprimé à la déconnexion. Solutions : 1) Profils itinérants AD (dossier réseau partagé) : classique mais parfois lent. 2) User Profile Disks (UPD) : disques VHD par utilisateur montés lors de la connexion — plus performant. 3) FSLogix Profile Containers (recommandé Microsoft) : solution moderne pour les environnements RDS et AVD.' },
                    { texte: 'Le serveur RDS n\'a pas assez de RAM', correct: false, feedback: 'La RAM insuffisante causerait des performances dégradées ou des erreurs "Mémoire insuffisante", pas la perte du profil utilisateur. La perte du profil à chaque connexion est spécifiquement un problème de configuration de profils persistants.' },
                    { texte: 'L\'utilisateur doit cocher "Se souvenir de moi" dans le client RDP', correct: false, feedback: '"Se souvenir de moi" dans le client RDP sauvegarde les identifiants de connexion (nom d\'utilisateur/mot de passe) pour éviter de les retaper. Cela n\'a aucun rapport avec la persistance du profil utilisateur côté serveur.' }
                  ]
                }
              ]
            }
          },
          {
            id: 'cas-mstv-004',
            titre: 'Résoudre les problèmes de connexion RDS',
            difficulte: 'difficile',
            format: 'arbre',
            objectif: 'Diagnostiquer les erreurs RDS courantes : connexions refusées, sessions fantômes, performances dégradées',
            contexte: 'Plusieurs utilisateurs signalent des problèmes différents avec l\'infrastructure RDS : certains ne peuvent plus se connecter, d\'autres ont des sessions figées.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Un utilisateur reçoit "Le Bureau à distance ne peut pas se connecter à l\'ordinateur distant". Le serveur RDSH est accessible en ping. Quelle vérification en priorité ?',
                  choix: [
                    { texte: 'Vérifier que le service "Remote Desktop Services" (TermService) est démarré sur le RDSH et que le port 3389 est ouvert dans le pare-feu', suite: 'n2' },
                    { texte: 'Désactiver le pare-feu Windows sur le serveur RDSH', suite: 'n_bad1' },
                    { texte: 'Réinstaller le rôle RDS complet', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'Le service TermService est démarré et le port 3389 est ouvert. Mais le nombre maximum de connexions simultanées est atteint (le RDSH affiche 50/50 sessions). Que faire ?',
                  choix: [
                    { texte: 'Identifier les sessions déconnectées (Gestionnaire de serveur RDS ou quser) et les terminer, ou ajouter un second serveur RDSH et équilibrer via le Connection Broker', suite: 'n3' },
                    { texte: 'Redémarrer le serveur RDSH pour libérer toutes les sessions', suite: 'n_bad3' },
                    { texte: 'Augmenter la limite de sessions dans la stratégie de groupe à 200', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'Après libération des sessions fantômes, un utilisateur se connecte mais sa session est très lente (clavier/souris avec latence de 3-4 secondes). Quelle est la cause probable ?',
                  choix: [
                    { texte: 'Ressources RDSH saturées (CPU/RAM) — vérifier avec le Gestionnaire des tâches ou Get-Counter et réduire la charge, ou migrer vers un RDSH plus puissant', suite: 'n4' },
                    { texte: 'La résolution d\'écran du client RDP est trop haute', suite: 'n_bad5' },
                    { texte: 'Le câble réseau du client est défectueux', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'Problèmes RDS diagnostiqués et résolus',
                  explication: 'Séquence de dépannage RDS : 1) Service TermService + port 3389 → connexion de base possible. 2) Sessions fantômes/disconnectées → quser /server:RDSH pour lister, rwinsta <ID session> pour terminer. 3) Ressources saturées → Get-Counter "\\Processor(_Total)\\% Processor Time" et vérifier la RAM. Solution durable : ajouter un RDSH et configurer l\'équilibrage dans le Connection Broker, ou limiter les sessions simultanées par utilisateur via GPO.'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'Désactiver le pare-feu crée une faille de sécurité',
                  explication: 'Désactiver le pare-feu Windows expose le serveur RDSH à toutes les connexions sans filtrage. La bonne approche est de vérifier les règles du pare-feu et de s\'assurer que la règle "Bureau à distance" est activée pour le bon profil réseau (Domaine). Désactiver complètement le pare-feu n\'est jamais une solution acceptable en production.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'Réinstaller RDS est disproportionné',
                  explication: 'Un service arrêté ou un port fermé sont des problèmes de configuration simples à corriger (Start-Service TermService, règle pare-feu). Réinstaller le rôle RDS complet est une opération longue qui remet à zéro toute la configuration (RemoteApps, certificats, profils). Toujours vérifier la cause avant de réinstaller.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'Redémarrer le RDSH déconnecte tous les utilisateurs',
                  explication: 'Redémarrer le RDSH coupe brutalement toutes les sessions actives (50 utilisateurs). Si les profils ne sont pas sauvegardés, des données peuvent être perdues. La gestion ciblée des sessions déconnectées (quser / rwinsta) est bien moins perturbatrice.'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'Augmenter la limite sans ressources supplémentaires aggrave le problème',
                  explication: 'Porter la limite à 200 sessions sur un serveur dimensionné pour 50 surchargerait les ressources (CPU, RAM) et dégraderait les performances pour tous. La limite de sessions doit être calée sur la capacité réelle du serveur. La bonne solution est d\'ajouter un RDSH supplémentaire et de répartir la charge.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'La résolution d\'écran n\'explique pas une latence clavier/souris',
                  explication: 'Une résolution élevée peut consommer de la bande passante réseau mais n\'explique pas une latence de 3-4 secondes sur les entrées clavier/souris. Cette latence caractéristique est le signe de ressources serveur saturées (CPU à 100% ou RAM pleine avec swap) ou d\'un problème réseau sévère.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'Le câble client n\'affecte pas les performances côté serveur',
                  explication: 'Un câble défectueux côté client causerait des déconnexions ou une bande passante réduite, mais la latence clavier/souris de 3-4 secondes sur une session RDS indique clairement un problème de ressources côté serveur (le traitement des entrées est mis en file d\'attente car le CPU est saturé).'
                }
              }
            }
          }
        ]
      },
      {
        id: 'ms-transv-m03',
        titre: 'Publication RemoteApp',
        cas: [
          {
            id: 'cas-mstv-005',
            titre: 'Publier une application via RemoteApp',
            difficulte: 'facile',
            format: 'scenario',
            objectif: 'Publier une application métier via RemoteApp RDS et la rendre accessible aux utilisateurs via RD Web Access',
            contexte: 'L\'entreprise veut publier son ERP (erp.exe installé sur le RDSH) via RemoteApp pour que les utilisateurs y accèdent depuis leur navigateur web sans installer de client.',
            contenu: {
              etapes: [
                {
                  description: 'Comment publier l\'application ERP en RemoteApp via le Gestionnaire de serveur RDS ?',
                  choix: [
                    { texte: 'Gestionnaire de serveur → Services Bureau à distance → Collections → sélectionner la collection → Tâches → Publier des programmes RemoteApp → parcourir vers erp.exe → Publier', correct: true, feedback: 'Procédure correcte ! Dans une infrastructure RDS avec Connection Broker, les RemoteApps se gèrent dans les "Collections" de sessions. Après publication, l\'application apparaît automatiquement dans le portail RD Web Access. Les utilisateurs voient une icône et lancent l\'ERP comme si c\'était une application locale.' },
                    { texte: 'Créer un raccourci vers \\\\RDSH\\C$\\Program Files\\ERP\\erp.exe sur les postes clients', correct: false, feedback: 'Un raccourci réseau vers l\'exécutable sur le RDSH ne crée pas une session RemoteApp — l\'application s\'exécuterait localement sur le poste client si erp.exe est copié, ou échouerait si le partage n\'est pas accessible. RemoteApp doit être configuré côté serveur via le Gestionnaire de serveur RDS.' },
                    { texte: 'Copier erp.exe sur chaque poste client et l\'installer localement', correct: false, feedback: 'Copier et installer l\'ERP localement est l\'opposé de l\'objectif RemoteApp. RemoteApp est conçu précisément pour éviter d\'installer l\'application sur chaque poste : l\'ERP s\'exécute sur le serveur RDSH, seule l\'interface graphique est transmise au client.' }
                  ]
                },
                {
                  description: 'L\'ERP est publié. Comment les utilisateurs y accèdent-ils via RD Web Access ?',
                  choix: [
                    { texte: 'Naviguer vers https://rdweb.contoso.local/RDWeb → s\'authentifier avec leurs identifiants AD → cliquer sur l\'icône ERP → le fichier .rdp se télécharge et l\'application s\'ouvre', correct: true, feedback: 'C\'est le flux normal RD Web Access ! Le portail web (HTTPS recommandé avec un certificat valide) liste toutes les RemoteApps publiées auxquelles l\'utilisateur a accès selon ses groupes AD. Le fichier .rdp téléchargé contient les paramètres de connexion et lance automatiquement la session RemoteApp via le client RDP natif Windows.' },
                    { texte: 'Télécharger et installer un client RDS spécifique depuis le site de l\'entreprise', correct: false, feedback: 'Le client RDP (mstsc.exe) est intégré à Windows — pas besoin d\'installer un client supplémentaire pour les RemoteApps publiées via RD Web Access. Sur macOS ou mobile, des clients RDP tiers (Microsoft Remote Desktop) sont nécessaires, mais pas un client propriétaire de l\'entreprise.' },
                    { texte: 'L\'ERP s\'exécute directement dans le navigateur web sans fichier .rdp', correct: false, feedback: 'RemoteApp RDS utilise le protocole RDP, pas le web. RD Web Access est le portail pour découvrir les apps disponibles, mais l\'exécution se fait via le client RDP natif (fichier .rdp ou lancement direct avec ActiveX en mode IE — obsolète). Microsoft Remote Desktop HTML5 (via Gateway) permet un accès web pur, mais c\'est une configuration différente.' }
                  ]
                },
                {
                  description: 'Vous voulez restreindre l\'accès à l\'ERP RemoteApp uniquement aux membres du groupe AD "GRP-ERP-Users". Comment ?',
                  choix: [
                    { texte: 'Dans la collection RDS → Propriétés → Groupes d\'utilisateurs → ajouter uniquement "GRP-ERP-Users" (retirer "Utilisateurs du domaine" si présent)', correct: true, feedback: 'Configuration correcte ! Les groupes d\'utilisateurs dans les propriétés de la collection définissent qui peut accéder aux RemoteApps publiées dans cette collection. Si vous avez plusieurs apps avec des accès différents, créez plusieurs collections (ex: Collection-ERP pour GRP-ERP-Users, Collection-RH pour GRP-RH-Users).' },
                    { texte: 'Configurer des permissions NTFS sur le fichier erp.exe côté serveur', correct: false, feedback: 'Bien que les permissions NTFS sur erp.exe puissent empêcher l\'exécution, c\'est une méthode brutale qui peut casser l\'application si d\'autres comptes système ont besoin de lire l\'exécutable. La gestion des accès RemoteApp doit se faire via les groupes dans la collection RDS.' },
                    { texte: 'Créer une GPO qui désactive l\'accès RD Web pour les non-membres du groupe', correct: false, feedback: 'Il n\'existe pas de GPO standard pour désactiver l\'accès à des RemoteApps spécifiques. La gestion des accès RemoteApp se fait dans les propriétés des collections RDS dans le Gestionnaire de serveur. Les GPO peuvent être utilisées pour déployer les raccourcis RemoteApp sur les postes, mais pas pour filtrer l\'accès.' }
                  ]
                }
              ]
            }
          },
          {
            id: 'cas-mstv-006',
            titre: 'Résoudre une erreur de certificat RemoteApp',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Diagnostiquer et corriger une erreur de certificat SSL dans une infrastructure RDS/RemoteApp',
            contexte: 'Les utilisateurs reçoivent un avertissement "Le serveur distant n\'a pas pu être authentifié" ou "Le nom du certificat ne correspond pas" lorsqu\'ils lancent une RemoteApp depuis RD Web Access.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Les utilisateurs reçoivent des avertissements de certificat pour les RemoteApps. Quelle est votre première vérification ?',
                  choix: [
                    { texte: 'Vérifier le certificat SSL configuré sur chaque rôle RDS dans le Gestionnaire de serveur → Propriétés du déploiement → Certificats', suite: 'n2' },
                    { texte: 'Demander aux utilisateurs de cliquer "Se connecter quand même" à chaque connexion', suite: 'n_bad1' },
                    { texte: 'Désactiver la vérification des certificats dans les stratégies de groupe', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'Le Gestionnaire de serveur montre que les rôles RD Connection Broker et RD Session Host utilisent un certificat auto-signé généré par Windows (non approuvé par les clients). Quelle est la solution ?',
                  choix: [
                    { texte: 'Remplacer le certificat auto-signé par un certificat émis par l\'autorité de certification interne (PKI d\'entreprise) ou un certificat public, et l\'assigner aux rôles RDS via Gestionnaire de serveur → Certificats', suite: 'n3' },
                    { texte: 'Exporter le certificat auto-signé et l\'importer manuellement dans le magasin "Autorités de certification racines de confiance" de chaque poste client', suite: 'n_bad3' },
                    { texte: 'Changer le nom du serveur RDS pour qu\'il corresponde au certificat', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'Un certificat PKI interne est assigné aux rôles RDS. Mais les machines hors domaine reçoivent toujours l\'avertissement. Pourquoi ?',
                  choix: [
                    { texte: 'Les machines hors domaine ne font pas confiance à l\'AC interne. Il faut soit déployer le certificat racine de l\'AC sur ces machines, soit utiliser un certificat d\'une AC publique (Let\'s Encrypt, DigiCert)', suite: 'n4' },
                    { texte: 'Il faut rejoindre ces machines au domaine pour résoudre le problème', suite: 'n_bad5' },
                    { texte: 'Désactiver le HTTPS sur le portail RD Web Access', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'Certificats RDS correctement configurés',
                  explication: 'Solution pour les machines hors domaine : utiliser un certificat d\'une AC publique reconnue (DigiCert, Let\'s Encrypt) sur le RD Gateway et RD Web Access. Ces certificats sont automatiquement approuvés par tous les OS modernes sans configuration supplémentaire. Pour les machines du domaine, un certificat PKI interne suffit (l\'AC racine est déployée via GPO). Bonne pratique : utiliser un wildcard certificate (*.contoso.com) ou un SAN certificate pour couvrir tous les noms RDS.'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'Ignorer les avertissements de certificat est une mauvaise pratique',
                  explication: 'Les utilisateurs qui cliquent systématiquement "Se connecter quand même" sont conditionnés à ignorer les alertes de sécurité — ce qui les rend vulnérables aux vraies attaques man-in-the-middle. Les avertissements de certificat doivent être résolus, pas contournés.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'Désactiver la vérification des certificats est dangereux',
                  explication: 'Désactiver la vérification des certificats via GPO (Ordinateur → Modèles admin → Composants Windows → Services Bureau à distance) supprime une protection essentielle contre les attaques MITM. N\'importe quel serveur malveillant pourrait alors intercepter les sessions RDP. C\'est une vulnérabilité critique en production.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'Import manuel non scalable',
                  explication: 'Importer manuellement le certificat auto-signé sur chaque poste est fastidieux (et impossible sur les postes hors domaine non gérés). Si le certificat auto-signé expire, il faut recommencer sur tous les postes. La solution scalable est d\'utiliser une PKI d\'entreprise avec déploiement automatique via GPO, ou un certificat d\'AC publique.'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'Changer le nom du serveur est une opération lourde',
                  explication: 'Changer le nom d\'un serveur RDS en production est une opération complexe : reconfiguration du Connection Broker, mise à jour des DNS, des GPO, des raccourcis RemoteApp. Et si le nouveau certificat ne correspond toujours pas, le problème revient. La solution est de reconfigurer le certificat pour qu\'il corresponde au nom existant.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'Rejoindre le domaine n\'est pas toujours possible',
                  explication: 'Les appareils personnels (BYOD) des télétravailleurs ne peuvent pas être joints au domaine. L\'accès RDS externe doit fonctionner sans jonction de domaine. Un certificat d\'AC publique résout le problème sur tous les appareils, domaine ou non.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'Désactiver HTTPS est une faille de sécurité majeure',
                  explication: 'Désactiver HTTPS sur RD Web Access exposerait les identifiants AD des utilisateurs en clair sur le réseau. C\'est une vulnérabilité critique absolument inacceptable. Le HTTPS est obligatoire — le problème de certificat doit être résolu, pas le HTTPS supprimé.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'ms-transv-m04',
        titre: 'Déploiement d\'un système d\'exploitation',
        cas: [
          {
            id: 'cas-mstv-007',
            titre: 'Planifier une stratégie de déploiement Windows en entreprise',
            difficulte: 'moyen',
            format: 'scenario',
            objectif: 'Comparer les méthodes de déploiement Windows (manuel, WDS, MDT, Autopilot) et choisir la plus adaptée',
            contexte: 'L\'entreprise doit déployer Windows 11 sur 200 nouveaux postes. Vous devez proposer la méthode la plus efficace selon trois contraintes.',
            contenu: {
              etapes: [
                {
                  description: 'Contexte 1 : 200 postes identiques (même matériel Dell), réseau 1 Gbps, un serveur disponible en local, équipe IT de 3 personnes. Quel outil recommandez-vous ?',
                  choix: [
                    { texte: 'MDT (Microsoft Deployment Toolkit) avec WDS pour le boot PXE — déploiement d\'une image maîtresse personnalisée sur tout le parc via le réseau', correct: true, feedback: 'MDT + WDS est la solution idéale pour ce cas : matériel homogène, réseau local rapide, serveur disponible. MDT crée une image WIM customisée (applications pré-installées, paramètres, pilotes) et WDS assure le boot PXE réseau. Un technicien peut démarrer plusieurs déploiements simultanément. 200 postes = environ 1-2 jours de déploiement avec un processus automatisé.' },
                    { texte: 'Clé USB bootable Windows 11 + installation manuelle sur chaque poste', correct: false, feedback: 'L\'installation manuelle sur 200 postes est un travail considérable (30-60 min par poste × 200 = 100-200 heures homme). Sans automatisation, chaque technicien doit configurer manuellement le nom de poste, rejoindre le domaine, installer les applications. Avec MDT, tout ça est automatisé.' },
                    { texte: 'Windows Autopilot via Microsoft 365/Intune', correct: false, feedback: 'Autopilot est excellent mais nécessite que Microsoft 365/Intune soit déjà configuré et que les postes soient enregistrés chez le fabricant (hash matériel dans Intune). Pour 200 postes à déployer rapidement en environnement local avec un serveur disponible, MDT+WDS est plus rapide à mettre en place.' }
                  ]
                },
                {
                  description: 'Contexte 2 : 50 postes pour des commerciaux itinérants (jamais au bureau, connexion Internet via 4G/WiFi public). Ils reçoivent leurs PC neufs directement de chez eux. Quel outil ?',
                  choix: [
                    { texte: 'Windows Autopilot : les commerciaux démarrent le PC neuf, se connectent avec leur compte M365, et le PC se configure automatiquement (nom, domaine Azure AD, applications Intune)', correct: true, feedback: 'Autopilot est précisément conçu pour ce cas ! Les PC sont enregistrés par le fabricant (Dell, HP) avant livraison. Le commercial débranche le PC de sa boîte, se connecte au WiFi, saisit ses identifiants M365, et en 30-60 minutes, le poste est configuré. Zéro intervention IT sur site. C\'est la méthode "zero touch provisioning".' },
                    { texte: 'Envoyer un technicien chez chaque commercial pour déployer via WDS', correct: false, feedback: 'Envoyer un technicien chez 50 commerciaux dispersés géographiquement (et en déplacement) est logistiquement impossible et très coûteux. WDS nécessite un accès réseau local au serveur WDS. Autopilot est conçu exactement pour les déploiements distants sans technicien sur site.' },
                    { texte: 'Demander aux commerciaux d\'installer Windows depuis une clé USB et rejoindre le domaine manuellement', correct: false, feedback: 'Des utilisateurs non-techniciens ne peuvent pas rejeter le domaine AD manuellement de façon fiable. Autopilot simplifie l\'expérience : le commercial fait juste "se connecter avec son compte M365" et tout le reste est automatique (jointure Azure AD, inscription Intune, déploiement des apps).' }
                  ]
                },
                {
                  description: 'Lors du déploiement MDT, un poste affiche "PXE-E53 : No boot filename received". Quelle est la cause la plus probable ?',
                  choix: [
                    { texte: 'Le serveur DHCP n\'a pas les options 066 (Boot Server) et 067 (Bootfile Name) configurées pour pointer vers le serveur WDS', correct: true, feedback: 'C\'est l\'erreur la plus fréquente avec WDS ! Pour le boot PXE, le client DHCP doit recevoir l\'IP du serveur WDS (option 066) et le nom du fichier de boot (option 067 = boot\\x64\\wdsnbp.com pour du UEFI 64 bits). Sans ces options DHCP, le client PXE ne sait pas où télécharger le bootloader. Configurer ces options dans la console DHCP résout le problème.' },
                    { texte: 'Le câble réseau du poste est défectueux', correct: false, feedback: 'Si le câble était défectueux, le poste n\'obtiendrait pas d\'adresse DHCP du tout (erreur PXE-E16 "No offer received"). L\'erreur PXE-E53 "No boot filename received" signifie que le DHCP a répondu mais sans les options WDS (066/067). Problème de configuration DHCP, pas câble.' },
                    { texte: 'Windows 11 ne supporte pas le déploiement PXE', correct: false, feedback: 'Windows 11 supporte parfaitement le boot PXE et le déploiement via WDS/MDT. L\'erreur PXE-E53 est une erreur de configuration réseau (DHCP), pas une incompatibilité Windows 11.' }
                  ]
                }
              ]
            }
          },
          {
            id: 'cas-mstv-008',
            titre: 'Créer une image de déploiement avec DISM',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Utiliser DISM pour capturer, monter et personnaliser une image Windows WIM pour le déploiement',
            contexte: 'Vous préparez une image maîtresse Windows 11 pour votre déploiement MDT. Vous devez capturer l\'image, ajouter un pilote, et vérifier le contenu.',
            contenu: {
              prompt: 'DISM>',
              commandes: {
                'help': 'Commandes disponibles : dism /capture-image, dism /mount-image, dism /unmount-image, dism /add-driver, dism /get-drivers, dism /get-imageinfo',
                'dism /capture-image /imagefile:D:\\Images\\Win11-Master.wim /capturedir:C:\\ /name:"Win11-Master" /description:"Image maîtresse Windows 11 v1.0"': '[============================100.0%============================]\nL\'image a été capturée avec succès.\nL\'opération a réussi.',
                'dism /get-imageinfo /imagefile:D:\\Images\\Win11-Master.wim': 'Informations sur l\'image de déploiement et gestion\n\nVersion : 10.0.22621.1\n\nDétails d\'image : D:\\Images\\Win11-Master.wim\n\nIndex : 1\nNom : Win11-Master\nDescription : Image maîtresse Windows 11 v1.0\nTaille : 16 412 452 628 octets',
                'mkdir D:\\Mount': '',
                'dism /mount-image /imagefile:D:\\Images\\Win11-Master.wim /index:1 /mountdir:D:\\Mount': '[============================100.0%============================]\nL\'image a été montée avec succès.',
                'dism /add-driver /image:D:\\Mount /driver:C:\\Drivers\\Dell-NIC\\e1d68x64.inf': 'Ajout du pilote en cours.\nL\'opération a réussi.',
                'dism /get-drivers /image:D:\\Mount': 'Récupération des pilotes de l\'image de déploiement et gestion\n\nPublié  : Oui  Classe : Net        Driver Package : oem1.inf\n          Pilote : Dell 1GbE NIC\nPublié  : Oui  Classe : Net        Driver Package : oem2.inf\n          Pilote : e1d68x64\nL\'opération a réussi.',
                'dism /unmount-image /mountdir:D:\\Mount /commit': '[============================100.0%============================]\nL\'image a été démontée et validée avec succès.'
              },
              validation: ['dism /capture-image', 'dism /mount-image', 'dism /add-driver', 'dism /unmount-image /commit'],
              indices: [
                'Capturez l\'image depuis la partition source : dism /capture-image /imagefile:<dest.wim> /capturedir:<source>',
                'Montez l\'image pour la modifier : dism /mount-image ... /mountdir:<dossier vide>',
                'Ajoutez des pilotes avec /add-driver en pointant vers le fichier .inf',
                'Validez les changements au démontage : /unmount-image /commit (ou /discard pour annuler)'
              ],
              solution: [
                'dism /capture-image /imagefile:D:\\Images\\Win11-Master.wim /capturedir:C:\\ /name:"Win11-Master" /description:"Image maîtresse Windows 11 v1.0"',
                'dism /get-imageinfo /imagefile:D:\\Images\\Win11-Master.wim',
                'mkdir D:\\Mount',
                'dism /mount-image /imagefile:D:\\Images\\Win11-Master.wim /index:1 /mountdir:D:\\Mount',
                'dism /add-driver /image:D:\\Mount /driver:C:\\Drivers\\Dell-NIC\\e1d68x64.inf',
                'dism /get-drivers /image:D:\\Mount',
                'dism /unmount-image /mountdir:D:\\Mount /commit'
              ]
            }
          }
        ]
      },
      {
        id: 'ms-transv-m05',
        titre: 'Windows Deployment Services (WDS)',
        cas: [
          {
            id: 'cas-mstv-009',
            titre: 'Installer et configurer WDS pour le déploiement PXE',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Installer le rôle WDS, configurer le serveur et ajouter des images de boot et d\'installation',
            contexte: 'Vous installez WDS sur SRV-DEPLOY (Windows Server 2022) pour permettre le déploiement de Windows 11 par le réseau via PXE. Le serveur DHCP est sur un autre serveur.',
            contenu: {
              prompt: 'PS C:\\> ',
              commandes: {
                'help': 'Commandes : Install-WindowsFeature, wdsutil, wdsutil /initialize-server, wdsutil /add-image, wdsutil /get-server, Import-WdsBootImage, Import-WdsInstallImage',
                'Install-WindowsFeature WDS -IncludeManagementTools': 'Success Restart Needed Exit Code Feature Result\n------- -------------- --------- --------------\nTrue    No             Success   {Windows Deployment Services}',
                'wdsutil /initialize-server /remInst:"D:\\RemoteInstall" /standalone': 'Initialisation du serveur Windows Deployment Services...\nLe serveur a été correctement initialisé.',
                'wdsutil /set-server /answerclients:all': 'Définition des propriétés du serveur...\nL\'opération a réussi.',
                'wdsutil /add-image /imagefile:"D:\\Sources\\boot.wim" /imagetype:boot': 'Ajout de l\'image...\nNom d\'image : Microsoft Windows Setup (x64)\nType d\'image : Boot\nL\'opération a réussi.',
                'wdsutil /add-image /imagefile:"D:\\Sources\\install.wim" /imagetype:install /imagegroup:"Windows 11"': 'Ajout de l\'image...\nNom d\'image : Windows 11 Pro\nType d\'image : Install\nGroupe d\'images : Windows 11\nL\'opération a réussi.',
                'wdsutil /get-server /show:images': 'Serveur : SRV-DEPLOY\n\nImages de démarrage :\n  Nom d\'image : Microsoft Windows Setup (x64)\n  Architecture : x64\n\nGroupes d\'images :\n  Groupe : Windows 11\n    Image : Windows 11 Pro\n    Architecture : x64',
                'wdsutil /start-server': 'Le service WDS est démarré.'
              },
              validation: ['Install-WindowsFeature WDS', 'wdsutil /initialize-server', 'wdsutil /add-image', 'wdsutil /set-server /answerclients:all'],
              indices: [
                'Installez d\'abord le rôle : Install-WindowsFeature WDS -IncludeManagementTools',
                'Initialisez avec wdsutil /initialize-server en spécifiant le dossier RemoteInstall',
                'Ajoutez l\'image de boot (boot.wim) depuis le DVD/ISO Windows',
                'Ajoutez l\'image d\'installation (install.wim) dans un groupe d\'images',
                'Configurez /answerclients:all pour répondre à tous les clients PXE'
              ],
              solution: [
                'Install-WindowsFeature WDS -IncludeManagementTools',
                'wdsutil /initialize-server /remInst:"D:\\RemoteInstall" /standalone',
                'wdsutil /set-server /answerclients:all',
                'wdsutil /add-image /imagefile:"D:\\Sources\\boot.wim" /imagetype:boot',
                'wdsutil /add-image /imagefile:"D:\\Sources\\install.wim" /imagetype:install /imagegroup:"Windows 11"',
                'wdsutil /get-server /show:images'
              ]
            }
          },
          {
            id: 'cas-mstv-010',
            titre: 'Diagnostiquer un échec de boot PXE',
            difficulte: 'difficile',
            format: 'arbre',
            objectif: 'Identifier et résoudre les causes d\'échec de boot PXE dans un environnement WDS',
            contexte: 'Les techniciens signalent que les nouveaux postes ne démarrent pas en PXE depuis l\'ajout du rôle WDS sur SRV-DEPLOY. Avant, un autre serveur WDS fonctionnait. SRV-DEPLOY et le serveur DHCP sont différents.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Les postes ne bootent plus en PXE depuis l\'installation du nouveau WDS. Quelle est la cause la plus probable quand WDS et DHCP sont sur des serveurs séparés ?',
                  choix: [
                    { texte: 'Les options DHCP 066 et 067 pointent encore vers l\'ancien serveur WDS — les mettre à jour avec l\'IP du nouveau SRV-DEPLOY', suite: 'n2' },
                    { texte: 'Le service WDS est arrêté sur SRV-DEPLOY', suite: 'n_bad1' },
                    { texte: 'Les postes ne supportent pas PXE — activer l\'option dans le BIOS', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'Les options DHCP sont mises à jour. Les postes reçoivent maintenant l\'IP de SRV-DEPLOY mais affichent "PXE-E32: TFTP open timeout". Que vérifier ?',
                  choix: [
                    { texte: 'Le service TFTP de WDS et le port UDP 69 sont-ils ouverts dans le pare-feu de SRV-DEPLOY ?', suite: 'n3' },
                    { texte: 'Redémarrer SRV-DEPLOY en urgence', suite: 'n_bad3' },
                    { texte: 'Réinstaller Windows Server sur SRV-DEPLOY', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'Le pare-feu est correct et le TFTP fonctionne. Mais certains postes en UEFI téléchargent le fichier de boot mais redémarrent immédiatement sans afficher le menu WDS. Quelle est la cause ?',
                  choix: [
                    { texte: 'Le fichier de boot UEFI (wdsmgfw.efi ou bootmgfw.efi) n\'est pas configuré dans l\'option DHCP 067 — en UEFI, le fichier de boot est différent du Legacy BIOS (wdsnbp.com)', suite: 'n4' },
                    { texte: 'Désactiver le Secure Boot sur tous les postes UEFI', suite: 'n_bad5' },
                    { texte: 'Convertir tous les postes de UEFI à Legacy BIOS', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'Boot PXE WDS fonctionnel en Legacy et UEFI',
                  explication: 'Configuration complète PXE avec WDS : 1) Option DHCP 066 = IP du serveur WDS, Option 067 dépend du mode : Legacy BIOS → boot\\x86\\wdsnbp.com, UEFI 64 bits → boot\\x64\\wdsmgfw.efi. 2) WDS supporte le mode "détection automatique" : configurer WDS pour détecter l\'architecture du client et envoyer le bon fichier de boot. Dans wdsutil /set-server /architecture:all. 3) Pare-feu : ports UDP 67 (DHCP), 69 (TFTP), 4011 (PXE WDS) ouverts.'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'Service WDS arrêté donnerait un timeout réseau, pas DHCP',
                  explication: 'Si le service WDS était arrêté, les postes n\'obtiendraient aucune réponse TFTP après avoir reçu les options DHCP. Mais la description indique que les postes ne bootent pas en PXE du tout — ce qui pointe vers les options DHCP 066/067 incorrectes, pas un service arrêté.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'PXE fonctionnait avant avec l\'ancien WDS',
                  explication: 'L\'énoncé précise qu\'un ancien serveur WDS fonctionnait. Si PXE était activé dans le BIOS des postes, il l\'est toujours. Les postes supportent PXE — le problème est dans la configuration réseau (DHCP) qui pointe vers le mauvais serveur WDS.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'PXE-E32 TFTP timeout indique un problème réseau/pare-feu, pas serveur',
                  explication: 'PXE-E32 "TFTP open timeout" signifie que le client a trouvé le serveur WDS (options DHCP OK) mais ne peut pas ouvrir une session TFTP. C\'est typiquement un problème de pare-feu (port 69/UDP bloqué) ou de service TFTP arrêté — pas un problème qui se résout en redémarrant le serveur.'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'Réinstallation disproportionnée pour un problème de pare-feu',
                  explication: 'PXE-E32 est une erreur de connectivité TFTP — un problème de configuration (pare-feu, service TFTP) résolu en quelques minutes. Réinstaller le serveur entier est une procédure de plusieurs heures inutile pour ce cas.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'Secure Boot n\'est pas la cause ici',
                  explication: 'Secure Boot peut bloquer le démarrage de bootloaders non signés, mais WDS signe ses fichiers de boot pour UEFI. De plus, si Secure Boot était le problème, les postes afficheraient une erreur Secure Boot spécifique, pas un redémarrage silencieux. La cause est le mauvais fichier de boot dans l\'option DHCP 067.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'Convertir en Legacy BIOS est une régression',
                  explication: 'Convertir des postes UEFI en Legacy BIOS (CSM) est une régression : on perd le Secure Boot, le démarrage plus rapide, et la compatibilité avec les disques GPT > 2 TB. La bonne solution est de configurer WDS pour gérer correctement le boot UEFI (fichier wdsmgfw.efi dans l\'option DHCP 067).'
                }
              }
            }
          }
        ]
      },
      {
        id: 'ms-transv-m06',
        titre: 'Microsoft Deployment Toolkit (MDT)',
        cas: [
          {
            id: 'cas-mstv-011',
            titre: 'Créer une séquence de tâches MDT pour le déploiement automatisé',
            difficulte: 'difficile',
            format: 'scenario',
            objectif: 'Configurer MDT pour créer une séquence de tâches qui automatise le déploiement Windows 11 avec personnalisation',
            contexte: 'Vous utilisez MDT pour déployer Windows 11 sur 150 postes. La séquence de tâches doit : installer Windows 11 Pro, joindre le domaine contoso.local, installer Office 365, configurer les paramètres régionaux français.',
            contenu: {
              etapes: [
                {
                  description: 'Dans MDT, quelle est la première étape pour créer une séquence de tâches de déploiement client standard ?',
                  choix: [
                    { texte: 'Deployment Workbench → Deployment Shares → Task Sequences → New Task Sequence → choisir le template "Standard Client Task Sequence" → lier à l\'image Windows 11 importée', correct: true, feedback: 'Procédure correcte ! Le template "Standard Client Task Sequence" inclut déjà toutes les étapes standard : partitionnement du disque, application de l\'image Windows, injection des pilotes, installation des applications, jonction au domaine. C\'est le point de départ recommandé pour les déploiements clients.' },
                    { texte: 'Créer manuellement un script PowerShell qui exécute DISM et netdom join', correct: false, feedback: 'Réécrire ce que MDT fait déjà serait un travail considérable et source d\'erreurs. MDT inclut des centaines de tâches préconfigurées (partitionnement, Sysprep, jonction domaine, gestion des pilotes) testées par Microsoft. Utilisez MDT et personnalisez-le plutôt que de tout recoder.' },
                    { texte: 'Importer directement l\'image WIM dans WDS sans passer par MDT', correct: false, feedback: 'WDS seul déploie des images brutes sans personnalisation (pas de jonction domaine automatique, pas d\'installation d\'applications). MDT ajoute la couche d\'automatisation qui permet de personnaliser le déploiement (séquences de tâches, règles, variables).' }
                  ]
                },
                {
                  description: 'Comment configurer la jonction automatique au domaine dans la séquence de tâches MDT ?',
                  choix: [
                    { texte: 'Dans les propriétés du Deployment Share → Rules (CustomSettings.ini) : JoinDomain=contoso.local, DomainAdmin=svc-mdt, DomainAdminPassword=<pwd>, MachineObjectOU=OU=Postes,DC=contoso,DC=local', correct: true, feedback: 'Bonne configuration ! Le fichier CustomSettings.ini est le cœur de la personnalisation MDT. Ces variables configurent la jonction de domaine automatique : quel domaine rejoindre, avec quel compte (compte de service dédié, pas l\'admin du domaine), dans quelle OU créer l\'objet ordinateur. Stockez le mot de passe dans le fichier Bootstrap.ini chiffré ou utilisez un compte de service avec permissions limitées.' },
                    { texte: 'Modifier manuellement le registre de chaque poste après déploiement pour configurer la jonction domaine', correct: false, feedback: 'Modifier le registre manuellement sur 150 postes est exactement ce que MDT évite. La jonction de domaine via CustomSettings.ini est entièrement automatisée et se produit pendant la séquence de tâches, sans intervention après déploiement.' },
                    { texte: 'Utiliser une GPO de démarrage qui joint les postes au domaine au premier démarrage', correct: false, feedback: 'Les GPO s\'appliquent après la jonction au domaine — elles ne peuvent pas être utilisées pour rejoindre le domaine (car les GPO de domaine nécessitent que le poste soit déjà dans le domaine). La jonction se configure dans MDT (CustomSettings.ini) pendant le déploiement.' }
                  ]
                },
                {
                  description: 'Comment ajouter l\'installation de Microsoft 365 Apps dans la séquence de tâches MDT ?',
                  choix: [
                    { texte: 'Deployment Workbench → Applications → Import Application → spécifier le chemin vers setup.exe M365 et la commande silencieuse setup.exe /configure configuration.xml → ajouter l\'application dans la séquence de tâches à l\'étape "Install Applications"', correct: true, feedback: 'Méthode correcte ! MDT gère les applications avec leurs commandes d\'installation silencieuse. Pour M365 Apps, le setup.exe avec /configure configuration.xml permet de spécifier les applications à installer, la langue, les mises à jour, etc. L\'application est ensuite disponible dans toutes les séquences de tâches du Deployment Share.' },
                    { texte: 'Inclure le répertoire d\'installation de M365 dans l\'image WIM capturée', correct: false, feedback: 'Inclure M365 dans l\'image WIM (via Sysprep+Capture) est déconseillé : l\'image WIM deviendra vite obsolète (mises à jour Office), elle sera volumineuse, et les licences M365 sont liées au compte utilisateur pas à l\'image. La méthode MDT "Applications" permet d\'installer la version à jour à chaque déploiement.' },
                    { texte: 'Créer un partage réseau avec le setup M365 et envoyer le lien aux utilisateurs après déploiement', correct: false, feedback: 'Envoyer un lien aux utilisateurs pour qu\'ils installent Office eux-mêmes n\'est pas une solution de déploiement automatisé. L\'objectif de MDT est précisément que le poste soit prêt à l\'emploi (Office installé, domaine joint) à la fin de la séquence de tâches, sans action utilisateur.' }
                  ]
                }
              ]
            }
          },
          {
            id: 'cas-mstv-012',
            titre: 'Optimiser un déploiement MDT lent',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Identifier les causes d\'un déploiement MDT lent et appliquer les optimisations appropriées',
            contexte: 'Le déploiement de Windows 11 via MDT prend 3 heures par poste (image 25 GB + Office + applications). L\'objectif est de descendre à moins d\'1 heure. Le réseau est en 1 Gbps.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Première analyse : 3 heures pour un déploiement sur 1 Gbps semble anormal. Quel élément vérifier en premier ?',
                  choix: [
                    { texte: 'Mesurer le débit réel de transfert de l\'image WIM depuis le serveur MDT vers les postes clients', suite: 'n2' },
                    { texte: 'Acheter un réseau 10 Gbps', suite: 'n_bad1' },
                    { texte: 'Réduire la taille de l\'image WIM en désinstallant des composants Windows', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'Le débit mesuré est de 100 Mbps seulement au lieu de 1000 Mbps attendus. Les switches sont en Gigabit. Quelle est la cause probable ?',
                  choix: [
                    { texte: 'Les NIC des postes clients ou du serveur MDT négocient en 100 Mbps au lieu de 1 Gbps — vérifier la négociation auto et forcer 1 Gbps si nécessaire', suite: 'n3' },
                    { texte: 'Le serveur MDT n\'est pas assez puissant (CPU)', correct: false, suite: 'n_bad3' },
                    { texte: 'Le protocole SMB est trop lent — passer en FTP', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'Le réseau est maintenant à 1 Gbps (125 MB/s). L\'image de 25 GB prendrait théoriquement 3 minutes mais le déploiement reste à 45 minutes. Quelle est la prochaine optimisation ?',
                  choix: [
                    { texte: 'Activer la compression multicast dans WDS pour diffuser l\'image simultanément à plusieurs postes, réduisant la charge réseau totale', suite: 'n4' },
                    { texte: 'Installer les applications (Office, etc.) avant de capturer l\'image WIM pour tout inclure dans l\'image', correct: false, suite: 'n_bad5' },
                    { texte: 'Déployer les postes un par un pour ne pas saturer le réseau', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'Déploiement optimisé à moins d\'1 heure',
                  explication: 'Optimisations MDT/WDS pour accélérer le déploiement : 1) Réseau 1 Gbps vérifié (NIC/switch). 2) Multicast WDS : au lieu d\'envoyer l\'image X fois (une par poste), WDS l\'envoie une seule fois en multicast à tous les postes simultanément. Économie énorme pour les déploiements de masse. 3) Pré-démarrage léger : utiliser un WinPE minimal. 4) Séquence de tâches optimisée : regrouper les applications en un seul package. Résultat attendu : déploiement de 20-40 minutes.'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'Investissement non justifié avant diagnostic',
                  explication: 'Acheter du matériel réseau 10 Gbps sans avoir diagnostiqué pourquoi le 1 Gbps existant n\'est pas utilisé à plein (et n\'atteint que 100 Mbps) est un gaspillage. Le problème de négociation réseau coûte 0€ à résoudre.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'Désinstaller des composants Windows est risqué',
                  explication: 'Réduire l\'image WIM en supprimant des fonctionnalités Windows peut casser des dépendances applicatives. Sans avoir mesuré le débit réseau réel, on ne sait pas si l\'image de 25 GB est le problème. Si le réseau ne tourne qu\'à 100 Mbps, l\'image mettra quand même 33 minutes (25 GB / 12,5 MB/s).'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'Le CPU serveur n\'est pas le goulot d\'étranglement du transfert réseau',
                  explication: 'Le transfert d\'une image WIM est une opération I/O (disque vers réseau). Un serveur moderne lit et envoie des données bien plus vite que 100 Mbps — même un processeur modeste. La limitation à 100 Mbps vient de la couche réseau (NIC, câble, switch), pas du CPU.'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'SMB est parfaitement adapté et sécurisé pour MDT',
                  explication: 'SMB (partages réseau Windows) est le protocole standard de MDT, optimisé pour les transferts de fichiers volumineux en réseau local. FTP est un protocole plus ancien, non chiffré, et moins performant que SMB v3 sur un réseau local. Le problème est la négociation réseau à 100 Mbps, pas le protocole.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'Applications dans l\'image WIM = mauvaise pratique',
                  explication: 'Inclure les applications (Office, logiciels métier) dans l\'image WIM crée une image massive qui doit être recapturée à chaque mise à jour de l\'application. La séparation image OS + applications MDT permet de mettre à jour indépendamment. L\'optimisation passe par le multicast, pas par une image monolithique.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'Déployer un par un multiplie le temps total',
                  explication: 'Déployer les postes un par un sur un réseau 1 Gbps ne sature pas le réseau : 1 poste à 1 Gbps × 1 = 1 Gbps utilisé sur 1 Gbps disponible. Mais 10 postes simultanément en unicast = 10 Gbps demandés sur 1 Gbps disponible → saturation. La solution est le multicast (1 flux pour N postes) qui résout exactement ce problème.'
                }
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: 'reseau-securite',
    titre: 'Réseau et sécurité',
    emoji: '🔒',
    modules: [
      {
        id: 'sec-m01',
        titre: 'Rappel et pare-feu',
        cas: [
          {
            id: 'cas-sec-001',
            titre: 'Configurer les règles de pare-feu Windows Defender',
            difficulte: 'facile',
            format: 'terminal',
            objectif: 'Créer, modifier et tester des règles de pare-feu Windows via PowerShell pour contrôler le trafic entrant et sortant',
            contexte: 'Un serveur Windows Server 2022 héberge un service web sur le port 8080 et une API sur le port 8443. Vous devez ouvrir ces ports dans le pare-feu Windows et bloquer RDP (3389) depuis Internet.',
            contenu: {
              prompt: 'PS C:\\> ',
              commandes: {
                'help': 'Commandes : New-NetFirewallRule, Get-NetFirewallRule, Set-NetFirewallRule, Remove-NetFirewallRule, Test-NetConnection',
                'New-NetFirewallRule -DisplayName "Web App 8080" -Direction Inbound -Protocol TCP -LocalPort 8080 -Action Allow -Profile Domain,Private': 'Name                  : {guid}\nDisplayName           : Web App 8080\nDescription           :\nDisplayGroup          :\nGroup                 :\nEnabled               : True\nProfile               : Domain, Private\nPlatform              : {}\nDirection             : Inbound\nAction                : Allow\nEdgeTraversalPolicy   : Block\nLooseSourceMapping    : False\nLocalOnlyMapping      : False\nPrimaryStatus         : OK',
                'New-NetFirewallRule -DisplayName "API HTTPS 8443" -Direction Inbound -Protocol TCP -LocalPort 8443 -Action Allow -Profile Domain,Private': 'Name                  : {guid}\nDisplayName           : API HTTPS 8443\nEnabled               : True\nProfile               : Domain, Private\nDirection             : Inbound\nAction                : Allow\nPrimaryStatus         : OK',
                'New-NetFirewallRule -DisplayName "Bloquer RDP Public" -Direction Inbound -Protocol TCP -LocalPort 3389 -Action Block -Profile Public': 'Name                  : {guid}\nDisplayName           : Bloquer RDP Public\nEnabled               : True\nProfile               : Public\nDirection             : Inbound\nAction                : Block\nPrimaryStatus         : OK',
                'Get-NetFirewallRule -DisplayName "Web App 8080" | Get-NetFirewallPortFilter': 'InstanceID   : {guid}\nProtocol     : TCP\nLocalPort    : 8080\nRemotePort   : Any\nIcmpType     : Any\nDynamicTarget: Any',
                'Test-NetConnection -ComputerName localhost -Port 8080': 'ComputerName     : localhost\nRemoteAddress    : ::1\nRemotePort       : 8080\nInterfaceAlias   : Loopback Pseudo-Interface 1\nSourceAddress    : ::1\nTcpTestSucceeded : True',
                'Get-NetFirewallRule | Where-Object {$_.Enabled -eq "True" -and $_.Direction -eq "Inbound"} | Select DisplayName,Action,Profile | Sort DisplayName': 'DisplayName          Action  Profile\n-----------          ------  -------\nAPI HTTPS 8443       Allow   Domain, Private\nBloquer RDP Public   Block   Public\nWeb App 8080         Allow   Domain, Private'
              },
              validation: ['New-NetFirewallRule', '-LocalPort 8080', '-LocalPort 3389', '-Action Block', 'Get-NetFirewallRule'],
              indices: [
                'New-NetFirewallRule crée une règle : spécifiez Direction (Inbound/Outbound), Protocol, LocalPort, Action (Allow/Block)',
                'Le paramètre -Profile définit le profil réseau : Domain, Private, Public (ou une combinaison)',
                'Pour bloquer RDP depuis Internet : -Profile Public -Action Block -LocalPort 3389',
                'Vérifiez avec Get-NetFirewallRule et Test-NetConnection'
              ],
              solution: [
                'New-NetFirewallRule -DisplayName "Web App 8080" -Direction Inbound -Protocol TCP -LocalPort 8080 -Action Allow -Profile Domain,Private',
                'New-NetFirewallRule -DisplayName "API HTTPS 8443" -Direction Inbound -Protocol TCP -LocalPort 8443 -Action Allow -Profile Domain,Private',
                'New-NetFirewallRule -DisplayName "Bloquer RDP Public" -Direction Inbound -Protocol TCP -LocalPort 3389 -Action Block -Profile Public',
                'Get-NetFirewallRule | Where-Object {$_.Enabled -eq "True" -and $_.Direction -eq "Inbound"} | Select DisplayName,Action,Profile'
              ]
            }
          },
          {
            id: 'cas-sec-002',
            titre: 'Diagnostiquer une panne de connectivité liée au pare-feu',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Identifier si un pare-feu est responsable d\'une coupure de service et corriger les règles',
            contexte: 'Après une mise à jour de sécurité Windows Server, un service de supervision (port TCP 161 SNMP et port TCP 445 SMB) ne répond plus depuis le serveur de monitoring. Les services eux-mêmes sont actifs.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Les services SNMP et SMB sont actifs mais injoignables depuis le monitoring. Quelle commande pour tester rapidement la connectivité réseau sur ces ports ?',
                  choix: [
                    { texte: 'Test-NetConnection -ComputerName <serveur> -Port 161 et -Port 445 depuis le serveur de monitoring', suite: 'n2' },
                    { texte: 'Redémarrer les services SNMP et SMB', suite: 'n_bad1' },
                    { texte: 'Désinstaller la mise à jour de sécurité', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'Test-NetConnection retourne TcpTestSucceeded : False pour les deux ports. Mais depuis le serveur lui-même, Test-NetConnection -ComputerName localhost -Port 445 retourne True. Quelle est la conclusion ?',
                  choix: [
                    { texte: 'Le service écoute bien localement mais le pare-feu bloque le trafic entrant depuis l\'extérieur — vérifier les règles de pare-feu', suite: 'n3' },
                    { texte: 'Il y a un problème de routage réseau entre les deux serveurs', suite: 'n_bad3' },
                    { texte: 'Le service SMB est corrompu et doit être réinstallé', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'Get-NetFirewallRule pour SMB montre que la règle "Partage de fichiers et d\'imprimantes (SMB-In)" est désactivée. La mise à jour a réinitialisé certaines règles. Comment corriger ?',
                  choix: [
                    { texte: 'Enable-NetFirewallRule -DisplayName "Partage de fichiers et d\'imprimantes (SMB-In)" pour réactiver la règle existante', suite: 'n4' },
                    { texte: 'Désactiver entièrement le pare-feu Windows pour éviter de futurs blocages', suite: 'n_bad5' },
                    { texte: 'Changer le port SMB de 445 à un port non standard', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'Règles pare-feu réactivées — connectivité rétablie',
                  explication: 'Diagnostic correct : service OK localement + Test-NetConnection False depuis l\'extérieur = règle de pare-feu bloquante. Solution : Enable-NetFirewallRule réactive la règle sans la recréer (conserve toutes les configurations). Pour éviter ce problème lors des futures mises à jour, vérifiez l\'état des règles critiques après chaque patch Tuesday (Get-NetFirewallRule | Where Enabled -eq False | Select DisplayName).'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'Les services sont déjà actifs — redémarrage inutile',
                  explication: 'L\'énoncé précise que les services sont actifs. Test-NetConnection depuis le serveur lui-même confirme que les services écoutent correctement. Redémarrer des services qui fonctionnent est inutile et perturbateur.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'Désinstaller les mises à jour de sécurité crée des vulnérabilités',
                  explication: 'Désinstaller des patches de sécurité expose le serveur aux vulnérabilités corrigées. La bonne approche est d\'identifier l\'impact de la mise à jour (règles pare-feu réinitialisées) et de corriger spécifiquement ce qui a changé, pas de revenir en arrière sur la sécurité.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'Un problème de routage bloquerait tous les ports, pas seulement deux',
                  explication: 'Si c\'était un problème de routage, aucune connexion ne fonctionnerait entre les deux serveurs — ni ping, ni aucun autre port. Le fait que seuls les ports 161 et 445 soient bloqués alors que le service répond en local indique clairement un pare-feu, pas un problème de routage.'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'Le service SMB répond localement — il n\'est pas corrompu',
                  explication: 'Test-NetConnection localhost:445 = True prouve que SMB fonctionne parfaitement. Un service corrompu ne répondrait même pas localement. Le problème est au niveau du filtrage réseau (pare-feu), pas du service lui-même.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'Désactiver le pare-feu est une faille de sécurité critique',
                  explication: 'Désactiver le pare-feu Windows expose le serveur à toutes les connexions sans filtrage. C\'est une mesure de dépannage temporaire acceptable en lab mais absolument pas en production. La bonne solution est de corriger la règle spécifique (Enable-NetFirewallRule).'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'Changer le port SMB casse la compatibilité',
                  explication: 'SMB utilise le port 445 par standard — tous les clients Windows utilisent ce port pour les partages réseau. Changer le port nécessiterait de reconfigurer tous les clients et pourrait casser des applications qui accèdent aux partages. La solution est de corriger la règle de pare-feu.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'sec-m02',
        titre: 'Le NAT',
        cas: [
          {
            id: 'cas-sec-003',
            titre: 'Configurer le NAT sur pfSense',
            difficulte: 'moyen',
            format: 'scenario',
            objectif: 'Configurer le NAT sortant (masquerading) et entrant (port forwarding) sur pfSense pour une infrastructure PME',
            contexte: 'Vous administrez un pare-feu pfSense avec deux interfaces : WAN (IP publique 91.200.100.50) et LAN (192.168.1.0/24). Vous devez configurer le NAT pour permettre l\'accès Internet au LAN et exposer un serveur web interne (192.168.1.10).',
            contenu: {
              etapes: [
                {
                  description: 'Le NAT sortant (pour que le LAN accède à Internet) est-il configuré par défaut sur pfSense ?',
                  choix: [
                    { texte: 'Oui, pfSense configure automatiquement le NAT sortant (Outbound NAT en mode automatique) pour les interfaces LAN détectées lors de l\'assistant de configuration', correct: true, feedback: 'Correct ! pfSense crée automatiquement des règles NAT sortant pour les réseaux LAN configurés lors de l\'assistant. Mode "Automatic Outbound NAT" : pfSense gère les règles automatiquement. Si vous avez besoin de contrôle fin (exclure certaines IPs, utiliser une IP spécifique), passez en mode "Manual Outbound NAT" (Firewall → NAT → Outbound).' },
                    { texte: 'Non, il faut configurer manuellement une règle iptables sur la ligne de commande', correct: false, feedback: 'pfSense dispose d\'une interface web complète pour configurer le NAT — pas besoin de ligne de commande ni d\'iptables (pfSense utilise pf, pas iptables). Le NAT sortant de base est configuré automatiquement par l\'assistant d\'installation.' },
                    { texte: 'Non, il faut acheter une licence pfSense Plus pour activer le NAT', correct: false, feedback: 'Le NAT est une fonctionnalité de base de pfSense Community Edition (gratuite). pfSense Plus ajoute des fonctionnalités avancées (HA, support) mais le NAT standard est disponible dans toutes les versions.' }
                  ]
                },
                {
                  description: 'Comment configurer un Port Forward pour exposer le serveur web interne (192.168.1.10:80) sur l\'IP publique (91.200.100.50:80) ?',
                  choix: [
                    { texte: 'Firewall → NAT → Port Forward → Add → Interface WAN → Protocol TCP → Destination 91.200.100.50 Port 80 → Redirect to 192.168.1.10 Port 80 → Save', correct: true, feedback: 'Procédure correcte ! Le Port Forward pfSense crée automatiquement une règle de pare-feu correspondante (option "Add associated filter rule"). Tout trafic arrivant sur 91.200.100.50:80 est redirigé vers 192.168.1.10:80. Pensez aussi à configurer le "NAT Reflection" si les clients du LAN doivent accéder au serveur via l\'IP publique.' },
                    { texte: 'Configurer un reverse proxy Apache sur la machine pfSense', correct: false, feedback: 'pfSense n\'est pas conçu pour héberger des reverse proxy directement (bien que des packages comme HAProxy existent). Le Port Forward est la solution native et standard pour rediriger des ports entrants vers des serveurs internes sur pfSense.' },
                    { texte: 'Ajouter une route statique sur le routeur du FAI', correct: false, feedback: 'Vous n\'avez pas accès au routeur du FAI. La redirection de port se configure sur votre pare-feu pfSense côté WAN. Le FAI envoie le trafic destiné à votre IP publique à votre interface WAN — c\'est pfSense qui doit le rediriger en interne.' }
                  ]
                },
                {
                  description: 'Après configuration, les clients externes accèdent bien au serveur web. Mais les clients du LAN ne peuvent pas accéder au serveur via 91.200.100.50:80 (ils voient un timeout). Quelle est la cause ?',
                  choix: [
                    { texte: 'NAT Reflection (NAT loopback) n\'est pas activé — les clients LAN doivent utiliser l\'IP locale (192.168.1.10) ou NAT Reflection doit être activé dans pfSense', correct: true, feedback: 'C\'est le problème classique du "hairpin NAT" ! Les clients LAN qui tentent d\'atteindre 91.200.100.50:80 envoient le paquet vers pfSense WAN. Sans NAT Reflection, pfSense ne renvoie pas le trafic vers le LAN. Solutions : 1) Activer NAT Reflection (System → Advanced → Firewall & NAT → NAT Reflection : Enable). 2) Configurer un DNS interne qui résout le domaine vers 192.168.1.10 (split DNS). La solution DNS est généralement préférée.' },
                    { texte: 'Le serveur 192.168.1.10 refuse les connexions du LAN', correct: false, feedback: 'Si le serveur refusait les connexions LAN, les clients ne pourraient pas non plus accéder directement à 192.168.1.10:80. Le problème est spécifique aux accès via l\'IP publique depuis le LAN — c\'est le problème de NAT Reflection, pas un problème serveur.' },
                    { texte: 'La règle de pare-feu LAN→WAN est manquante', correct: false, feedback: 'Les clients LAN peuvent accéder à Internet (NAT sortant fonctionne), donc la règle LAN→WAN existe. Le problème n\'est pas le pare-feu outbound mais le NAT Reflection : le trafic revient sur la même interface (LAN→WAN→LAN) sans la règle de loopback.'
                    }
                  ]
                }
              ]
            }
          },
          {
            id: 'cas-sec-004',
            titre: 'Diagnostiquer un problème de NAT asymétrique',
            difficulte: 'difficile',
            format: 'arbre',
            objectif: 'Identifier et corriger un problème de routage asymétrique qui empêche le NAT de fonctionner correctement',
            contexte: 'Des connexions TCP depuis Internet vers un serveur interne (publié via NAT) s\'établissent mais se coupent après quelques secondes. Le ping fonctionne mais le HTTP/HTTPS est instable.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Les connexions TCP s\'établissent puis se coupent rapidement. Quelle caractéristique de ce comportement oriente vers un problème de routage asymétrique ?',
                  choix: [
                    { texte: 'Le SYN et SYN-ACK passent (connexion établie) mais les paquets de données retour prennent un chemin différent qui ne passe pas par le firewall NAT, qui alors drop les paquets hors état (stateful inspection)', suite: 'n2' },
                    { texte: 'Le serveur interne est surchargé et ferme les connexions', suite: 'n_bad1' },
                    { texte: 'Le certificat SSL du serveur est expiré', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'Vous capturez le trafic sur le pare-feu NAT : les paquets SYN entrent sur WAN, le SYN-ACK sort bien. Mais aucun ACK retour n\'arrive sur le pare-feu — la table de connexions montre les sessions en ESTABLISHED puis TIME_WAIT immédiatement. Où regarder ?',
                  choix: [
                    { texte: 'Vérifier la passerelle par défaut du serveur interne — elle pointe peut-être directement vers le routeur FAI au lieu du pare-feu NAT', suite: 'n3' },
                    { texte: 'Augmenter le timeout des connexions NAT sur le pare-feu', suite: 'n_bad3' },
                    { texte: 'Désactiver le stateful inspection sur le pare-feu', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'La passerelle du serveur interne pointe vers 192.168.1.254 (routeur FAI directement) au lieu de 192.168.1.1 (pare-feu pfSense). Les paquets retour contournent pfSense. Comment corriger ?',
                  choix: [
                    { texte: 'Changer la passerelle par défaut du serveur interne pour pointer vers 192.168.1.1 (pfSense) afin que tout le trafic retour passe par le NAT', suite: 'n4' },
                    { texte: 'Ajouter une route statique sur le routeur FAI pour forcer le retour via pfSense', suite: 'n_bad5' },
                    { texte: 'Désactiver pfSense et utiliser uniquement le routeur FAI pour le NAT', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'Routage symétrique rétabli — NAT fonctionnel',
                  explication: 'Le NAT stateful exige que les paquets aller ET retour d\'une connexion passent par le même dispositif NAT. Avec le routage asymétrique : 1) Client→Internet→pfSense(NAT)→Serveur : pfSense crée une entrée dans sa table NAT. 2) Serveur→RouterFAI→Internet→Client : pfSense ne voit pas le retour, la connexion expire. Solution : passerelle du serveur = pfSense (192.168.1.1). Règle générale : tous les serveurs publiés via NAT doivent avoir comme passerelle le pare-feu NAT.'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'Un serveur surchargé ne crée pas ce pattern',
                  explication: 'Un serveur surchargé ralentirait les réponses ou retournerait des erreurs HTTP (503, 504), mais les connexions TCP resteraient établies. Des connexions TCP établies puis immédiatement terminées sans échange de données sont caractéristiques d\'un problème de chemin réseau (routage asymétrique) côté infrastructure.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'Un certificat expiré donne une erreur SSL spécifique',
                  explication: 'Un certificat SSL expiré donne une erreur de handshake TLS visible dans les logs (et dans le navigateur). De plus, le problème affecte HTTP (non chiffré) aussi, selon l\'énoncé. Le pattern connexion-établie-puis-coupée immédiatement est un problème de transport (TCP/réseau), pas de certificat.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'Augmenter les timeouts n\'aide pas si les paquets ne reviennent pas',
                  explication: 'Si les paquets retour ne passent pas par pfSense (routage asymétrique), augmenter les timeouts ne changera rien : pfSense n\'attend pas que les timeouts expirent, il reçoit simplement des paquets qui n\'ont pas d\'état correspondant dans sa table et les drop immédiatement.'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'Désactiver le stateful inspection est une faille critique',
                  explication: 'Le stateful inspection est le mécanisme fondamental de sécurité d\'un pare-feu moderne. Le désactiver permettrait à n\'importe quel paquet de traverser sans contrôle d\'état. C\'est inacceptable en production. Le problème de routage asymétrique doit être corrigé à la source.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'Vous n\'avez pas accès à la configuration du routeur FAI',
                  explication: 'Le routeur FAI est géré par le fournisseur d\'accès — vous n\'avez généralement pas accès à sa configuration de routage. De plus, forcer le retour via pfSense depuis le côté FAI est complexe et dépend de la topologie. La solution simple et dans votre périmètre est de corriger la passerelle du serveur interne.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'Remplacer pfSense par le routeur FAI réduit la sécurité',
                  explication: 'Le routeur FAI fourni par le provider est un équipement basique avec peu de fonctionnalités de sécurité. pfSense offre pare-feu stateful, IDS/IPS, VPN, filtrage URL, etc. Supprimer pfSense pour résoudre un problème de configuration de passerelle est une décision de régression sécuritaire majeure.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'sec-m03',
        titre: 'Exposer les services vers l\'extérieur',
        cas: [
          {
            id: 'cas-sec-005',
            titre: 'Mettre en place une DMZ pour sécuriser les serveurs exposés',
            difficulte: 'moyen',
            format: 'scenario',
            objectif: 'Concevoir et configurer une architecture DMZ pour isoler les serveurs accessibles depuis Internet du réseau interne',
            contexte: 'L\'entreprise veut exposer un serveur web public (nginx) et un serveur de messagerie (Exchange) sur Internet, sans mettre ces serveurs sur le même réseau que les postes de travail internes.',
            contenu: {
              etapes: [
                {
                  description: 'Quelle architecture réseau implémentez-vous pour créer une DMZ sécurisée ?',
                  choix: [
                    { texte: 'Pare-feu avec 3 interfaces : WAN (Internet), DMZ (serveurs publics 172.16.0.0/24), LAN (réseau interne 192.168.1.0/24) — les serveurs DMZ sont isolés des deux côtés par des règles de pare-feu', correct: true, feedback: 'Architecture correcte ! La DMZ est un réseau intermédiaire : le trafic Internet accède aux serveurs DMZ (règles pare-feu WAN→DMZ ouvertes sur les ports nécessaires). Les serveurs DMZ ne peuvent PAS accéder librement au LAN (règles DMZ→LAN strictes). Si un serveur DMZ est compromis, l\'attaquant ne peut pas rebondir vers le LAN. C\'est le principe de segmentation par zones de sécurité.' },
                    { texte: 'Placer les serveurs web et messagerie directement sur le LAN interne avec des règles de pare-feu entrantes', correct: false, feedback: 'Placer les serveurs exposés sur le LAN rompt l\'isolation : si le serveur web est compromis, l\'attaquant est directement sur le réseau interne avec accès aux postes de travail, serveurs de fichiers, AD. La DMZ crée une zone tampon qui limite l\'impact d\'une compromission.' },
                    { texte: 'Utiliser deux pare-feux en série : un pare-feu entre Internet et la DMZ, un second entre la DMZ et le LAN', correct: false, feedback: 'L\'architecture avec deux pare-feux est plus sécurisée (défense en profondeur, idéalement avec des vendeurs différents) mais aussi plus complexe et coûteuse. Pour une PME, un pare-feu à 3 interfaces offre une DMZ adéquate. L\'architecture deux pare-feux est utilisée dans les environnements haute sécurité.' }
                  ]
                },
                {
                  description: 'Quelles règles de pare-feu configurez-vous pour la DMZ ? (flux Internet→DMZ, DMZ→LAN)',
                  choix: [
                    { texte: 'WAN→DMZ : Allow TCP 80,443 vers serveur web ; Allow TCP 25,443 vers serveur Exchange. DMZ→LAN : Allow TCP 389,636 vers AD (LDAP/LDAPS) uniquement. Tout le reste : Deny.', correct: true, feedback: 'Règles minimales et correctes ! Les serveurs DMZ n\'ont besoin que des accès strictement nécessaires vers le LAN : Exchange a besoin de LDAP/LDAPS pour l\'authentification AD. Tout autre accès DMZ→LAN est bloqué. Cette politique "moindre privilège" limite drastiquement la surface d\'attaque en cas de compromission d\'un serveur DMZ.' },
                    { texte: 'WAN→DMZ : Allow ALL. DMZ→LAN : Allow ALL. Laisser le pare-feu gérer automatiquement.', correct: false, feedback: 'Allow ALL entre toutes les zones supprime totalement l\'intérêt de la DMZ. L\'isolation entre zones repose précisément sur des règles restrictives qui n\'autorisent que les flux nécessaires.' },
                    { texte: 'WAN→DMZ : Allow ALL ports. DMZ→LAN : Deny ALL.', correct: false, feedback: 'Allow ALL depuis WAN est trop permissif — seuls les ports des services exposés (80, 443, 25) doivent être ouverts. Deny ALL DMZ→LAN bloque Exchange qui a besoin de LDAP vers l\'AD pour authentifier les utilisateurs. Les règles doivent être ni trop ouvertes ni trop restrictives.' }
                  ]
                },
                {
                  description: 'Le serveur Exchange en DMZ doit s\'authentifier auprès de l\'Active Directory dans le LAN. Quel port/protocole autoriser dans la règle DMZ→LAN ?',
                  choix: [
                    { texte: 'TCP 636 (LDAPS — LDAP over SSL) vers les contrôleurs de domaine, en évitant LDAP non chiffré (port 389)', correct: true, feedback: 'Bonne pratique ! LDAPS (port 636) chiffre les communications entre Exchange et l\'AD — les identifiants et données d\'annuaire sont protégés. LDAP non chiffré (389) expose les mots de passe en clair sur le réseau. Microsoft recommande de désactiver LDAP non signé. Pour Exchange, configurer LDAPS nécessite que l\'AD ait un certificat SSL valide.' },
                    { texte: 'Ouvrir tous les ports AD nécessaires (88, 135, 389, 445, 636, 3268, 49152-65535)', correct: false, feedback: 'Ouvrir tous ces ports (dont RPC dynamique 49152-65535) entre la DMZ et le LAN crée une brèche importante. Une version compromise d\'Exchange en DMZ pourrait alors se déplacer latéralement vers le LAN via RPC/SMB. Minimisez les ports ouverts à ce qui est strictement nécessaire.' },
                    { texte: 'Pas besoin d\'ouvrir de ports — Exchange en DMZ peut fonctionner sans accès AD', correct: false, feedback: 'Exchange Server nécessite absolument Active Directory pour fonctionner : configuration, comptes utilisateurs, politique de messagerie, authentification. Sans accès LDAP/LDAPS vers l\'AD, Exchange ne peut pas démarrer. La DMZ doit permettre ce flux minimal.'
                    }
                  ]
                }
              ]
            }
          },
          {
            id: 'cas-sec-006',
            titre: 'Sécuriser un service exposé sur Internet',
            difficulte: 'difficile',
            format: 'arbre',
            objectif: 'Identifier les mesures de sécurité nécessaires pour exposer un service web en toute sécurité',
            contexte: 'Vous venez d\'exposer un portail web RH sur Internet (HTTPS sur port 443). Après 48h, les logs montrent des milliers de tentatives de connexion avec des couples login/mot de passe différents, toutes depuis des IP étrangères.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Des milliers de tentatives login/password depuis des IPs étrangères — c\'est une attaque par force brute. Quelle est la mesure immédiate la plus efficace ?',
                  choix: [
                    { texte: 'Activer le blocage automatique après X tentatives échouées (fail2ban, ModSecurity, ou règle pare-feu) et mettre en place le MFA obligatoire', suite: 'n2' },
                    { texte: 'Changer l\'URL du portail en quelque chose de moins évident', suite: 'n_bad1' },
                    { texte: 'Bloquer tous les pays étrangers via géo-blocage', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'Le blocage automatique est en place (5 échecs = ban 1h). Des tentatives continues passent quand même en utilisant des IPs différentes (botnet). Quelle mesure supplémentaire ?',
                  choix: [
                    { texte: 'Mettre en place un CAPTCHA sur le formulaire de connexion et imposer le MFA (TOTP ou notification push) pour tous les comptes', suite: 'n3' },
                    { texte: 'Désactiver le portail pendant 24h pour calmer les attaquants', suite: 'n_bad3' },
                    { texte: 'Augmenter la taille des mots de passe requis à 30 caractères minimum', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'MFA et CAPTCHA sont en place. Un compte RH a quand même été compromis (l\'utilisateur avait réutilisé un mot de passe présent dans une fuite de données). Quelle mesure aurait prévenu cela ?',
                  choix: [
                    { texte: 'Vérifier les mots de passe contre des bases de données de fuites connues lors de la connexion ou du changement (ex : Have I Been Pwned API, Entra ID Password Protection)', suite: 'n4' },
                    { texte: 'Interdire aux employés RH d\'utiliser Internet', suite: 'n_bad5' },
                    { texte: 'Chiffrer la base de données des mots de passe avec AES-256', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'Sécurité multicouche en place',
                  explication: 'Stratégie de défense en profondeur pour les portails exposés : 1) Fail2ban/blocage IP après échecs → ralentit les attaques simples. 2) CAPTCHA → bloque les bots automatisés. 3) MFA → même avec le bon mot de passe, l\'attaquant est bloqué. 4) Vérification mots de passe compromis (HIBP API) → détecte les passwords réutilisés de fuites. 5) En complément : WAF (Web Application Firewall), logs d\'alerte en temps réel, politique de renouvellement des mots de passe.'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'Obscurité inefficace contre les scanners',
                  explication: 'Les attaquants utilisent des scanners automatisés (Shodan, masscan) qui découvrent tous les services exposés indépendamment de leur URL. Changer l\'URL n\'arrête pas une attaque ciblée et ne résout pas le problème de force brute. C\'est de la sécurité par obscurité — inefficace seule.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'Le géo-blocage perturbe les employés en déplacement',
                  explication: 'Bloquer tous les pays étrangers empêcherait les employés RH en déplacement professionnel à l\'étranger d\'accéder au portail. De plus, les attaquants utilisent des VPN et des proxy pour paraître situés en France. Le géo-blocage seul est insuffisant et pénalisant pour les utilisateurs légitimes.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'Désactiver le portail n\'arrête pas les attaquants',
                  explication: 'Les botnets d\'attaque sont automatisés et réessaieront dès le retour en ligne. Désactiver 24h n\'a aucun effet dissuasif et prive les employés RH du portail. La solution est de mettre en place des défenses techniques, pas de fuir.'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'Les mots de passe de 30 caractères n\'empêchent pas la réutilisation',
                  explication: 'Imposer 30 caractères ne résout pas le problème si les utilisateurs réutilisent des mots de passe de fuites (ex: "MonMotDePasse2019!" est long mais compromis). La vérification contre les bases de fuites (HIBP) et le MFA sont bien plus efficaces que la longueur minimale seule.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'Interdire Internet aux employés est irréaliste',
                  explication: 'L\'interdiction d\'Internet n\'empêche pas la réutilisation de mots de passe — le problème vient de comptes personnels compromis (sites tiers) dont le même mot de passe est réutilisé professionnellement. La sensibilisation aux gestionnaires de mots de passe et la vérification HIBP sont les solutions appropriées.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'Le chiffrement de la BDD ne détecte pas les réutilisations',
                  explication: 'Chiffrer la base de données des mots de passe (avec bcrypt, Argon2) est une bonne pratique mais protège contre le vol de la BDD, pas contre l\'utilisation d\'un mot de passe qui a été compromis ailleurs. La vérification contre HIBP détecte les mots de passe déjà exposés AVANT qu\'ils soient acceptés.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'sec-m04',
        titre: 'Sécuriser le surf Internet',
        cas: [
          {
            id: 'cas-sec-007',
            titre: 'Configurer un proxy filtrant avec pfSense + Squid',
            difficulte: 'moyen',
            format: 'scenario',
            objectif: 'Mettre en place un proxy Squid sur pfSense pour filtrer les accès web des utilisateurs internes',
            contexte: 'La direction demande de bloquer les réseaux sociaux et les sites de streaming pendant les heures de travail, tout en autorisant l\'accès aux sites professionnels. Vous utilisez pfSense avec le package Squid + SquidGuard.',
            contenu: {
              etapes: [
                {
                  description: 'Comment configurer le proxy Squid en mode transparent sur pfSense pour intercepter le trafic HTTP sans configuration sur les postes clients ?',
                  choix: [
                    { texte: 'Services → Proxy Server (Squid) → cocher "Transparent HTTP Proxy" → interface LAN → Save. Squid intercepte automatiquement le port 80 sur l\'interface LAN', correct: true, feedback: 'Mode transparent correct ! En mode transparent, pfSense redirige automatiquement le trafic HTTP (port 80) du LAN vers Squid sans que les postes clients aient besoin d\'être configurés. Pour HTTPS (port 443), le SSL Bump (interception SSL) est nécessaire mais requiert de déployer le certificat CA de pfSense sur tous les postes.' },
                    { texte: 'Configurer manuellement l\'adresse du proxy (192.168.1.1:3128) dans les paramètres de chaque navigateur', correct: false, feedback: 'La configuration manuelle du proxy sur chaque poste est laborieuse et contournable (l\'utilisateur peut désactiver le proxy dans les paramètres navigateur). Le mode transparent force l\'utilisation du proxy sans configuration côté client et sans possibilité de contournement simple.' },
                    { texte: 'Installer Squid directement sur les postes clients', correct: false, feedback: 'Squid est un proxy serveur — il s\'installe sur un serveur centralisé (ici pfSense). Installer Squid sur chaque poste client n\'a pas de sens : ce serait un proxy local sans filtrage centralisé.' }
                  ]
                },
                {
                  description: 'Comment configurer SquidGuard pour bloquer les catégories "Réseaux sociaux" et "Streaming" pendant les heures de bureau (8h-18h) ?',
                  choix: [
                    { texte: 'Services → Proxy Filter (SquidGuard) → Times → créer une plage "Heures-Bureau" (8h-18h, Lun-Ven) → Target Categories → blacklist réseaux sociaux et streaming → ACL → créer une règle qui bloque ces catégories pendant "Heures-Bureau"', correct: true, feedback: 'Procédure correcte ! SquidGuard utilise des listes noires (Shallalist, Université de Toulouse) téléchargeables. La combinaison Time + Target Categories + ACL permet de bloquer par plage horaire. En dehors des heures de bureau, l\'accès aux réseaux sociaux serait permis selon la politique de l\'entreprise.' },
                    { texte: 'Créer des règles de pare-feu pfSense qui bloquent les IP de Facebook, YouTube, etc.', correct: false, feedback: 'Bloquer par IP est inefficace : Facebook, YouTube, Netflix utilisent des centaines de milliers d\'IPs (CDN, anycast) qui changent fréquemment. Une liste de blocage IP serait incomplète et devrait être mise à jour en permanence. Le filtrage par catégories URL de SquidGuard est bien plus efficace.' },
                    { texte: 'Installer une extension de navigateur de filtrage sur chaque poste', correct: false, feedback: 'Les extensions navigateur sont contournables (navigateur différent, mode privé, désinstallation). Un proxy filtrant centralisé sur l\'infrastructure réseau est bien plus robuste car tout le trafic doit passer par lui.' }
                  ]
                },
                {
                  description: 'Un utilisateur contourne le filtrage en utilisant un VPN sur son téléphone (hotspot 4G) depuis son PC professionnel. Comment adresser ce contournement ?',
                  choix: [
                    { texte: 'Combinaison de mesures : politique IT signée par l\'utilisateur + bloquer les protocoles VPN connus (UDP 1194, UDP 51820) sur le pare-feu sortant + DNS filtering (Cisco Umbrella, NextDNS) + sensibilisation', correct: true, feedback: 'Il n\'existe pas de solution technique unique contre tous les contournements. La défense en profondeur : 1) Bloquer les ports VPN courants (OpenVPN 1194, WireGuard 51820, L2TP 1701) sur le pare-feu sortant. 2) DNS filtrant (intercepter le DNS et filtrer les requêtes). 3) Politique RH avec sanctions disciplinaires documentées. 4) Agent de sécurité sur les postes (Umbrella Roaming Client) qui filtre même hors réseau entreprise.' },
                    { texte: 'Interdire les téléphones personnels dans les bureaux', correct: false, feedback: 'Interdire les téléphones est difficile à faire respecter et disproportionné. L\'utilisateur peut utiliser un hotspot depuis l\'extérieur du bureau aussi. Une politique IT claire avec des conséquences disciplinaires couplée à des mesures techniques est plus efficace.' },
                    { texte: 'Ne rien faire — si l\'utilisateur utilise son téléphone, c\'est hors du réseau entreprise', correct: false, feedback: 'Le problème n\'est pas l\'usage du téléphone mais le fait que le PC professionnel contourne les politiques de sécurité de l\'entreprise. Les données de l\'entreprise transitent par un VPN non contrôlé, créant des risques de fuite et de conformité. Ce n\'est pas acceptable.' }
                  ]
                }
              ]
            }
          },
          {
            id: 'cas-sec-008',
            titre: 'Analyser une alerte de sécurité liée au surf Internet',
            difficulte: 'difficile',
            format: 'arbre',
            objectif: 'Investiguer une alerte de sécurité liée à un accès web suspect et prendre les mesures appropriées',
            contexte: 'Le système IDS/IPS (Suricata sur pfSense) génère une alerte critique : "Possible C2 communication detected" pour un poste interne (192.168.1.45) qui contacte régulièrement une IP externe non catégorisée toutes les 30 minutes.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Une alerte C2 (Command & Control) pour un poste interne — potentiellement un malware qui communique avec son serveur. Quelle est l\'action immédiate ?',
                  choix: [
                    { texte: 'Isoler immédiatement le poste 192.168.1.45 du réseau (le déplacer dans un VLAN de quarantaine ou débrancher le câble) tout en conservant son état pour investigation forensique', suite: 'n2' },
                    { texte: 'Bloquer l\'IP externe sur le pare-feu et attendre de voir si les alertes continuent', suite: 'n_bad1' },
                    { texte: 'Redémarrer le poste pour interrompre la communication malveillante', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'Le poste est isolé. Sur le poste, vous constatez un processus inconnu (srv32host.exe) qui consomme peu de CPU mais génère du trafic réseau régulier. Quelle investigation mener ?',
                  choix: [
                    { texte: 'Analyser le hash du processus sur VirusTotal, vérifier ses connexions réseau actives (netstat -ano), l\'entrée de démarrage automatique, et les logs Windows (Sysmon si disponible)', suite: 'n3' },
                    { texte: 'Formater immédiatement le poste et réinstaller Windows', suite: 'n_bad3' },
                    { texte: 'Demander à l\'utilisateur s\'il a installé quelque chose de récent', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'VirusTotal confirme que srv32host.exe est un RAT (Remote Access Trojan). L\'analyse montre qu\'il est arrivé via une pièce jointe email il y a 3 jours. Quelles sont les prochaines actions après la remédiation du poste ?',
                  choix: [
                    { texte: 'Analyser les logs réseau des 3 derniers jours pour identifier les données potentiellement exfiltrées, vérifier si d\'autres postes ont été atteints (propagation latérale), notifier le RSSI et appliquer les obligations RGPD si des données personnelles sont concernées', suite: 'n4' },
                    { texte: 'Formater le poste et considérer l\'incident clos', suite: 'n_bad5' },
                    { texte: 'Changer le mot de passe de l\'utilisateur et reprendre le travail', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'Incident géré avec bonne pratique forensique',
                  explication: 'Réponse à incident complète : 1) Isolation immédiate (contenir). 2) Investigation forensique (identifier le malware, vecteur d\'attaque, données exposées). 3) Remédiation (nettoyage ou réinstallation). 4) Analyse d\'impact (3 jours d\'exfiltration potentielle → quelles données ? combien ?). 5) Propagation latérale (vérifier tous les postes du même VLAN dans les logs). 6) Obligations légales : si données personnelles potentiellement exposées → notification CNIL sous 72h (RGPD Art. 33). 7) Plan de remédiation (patch email, filtrage pièces jointes, sensibilisation).'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'Bloquer l\'IP sans isoler le poste est insuffisant',
                  explication: 'Bloquer l\'IP C2 sur le pare-feu est une mesure utile mais le malware peut utiliser des IPs de remplacement ou du Domain Fronting pour contourner. De plus, le poste infecté reste sur le réseau interne et peut se propager à d\'autres postes (mouvement latéral). L\'isolation du poste est prioritaire.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'Le redémarrage détruit les preuves forensiques',
                  explication: 'Redémarrer le poste efface la mémoire RAM qui peut contenir des artefacts précieux (clés de chiffrement, processus malveillants en mémoire, connexions actives). Le malware peut aussi survivre au redémarrage via les entrées de démarrage automatique. L\'isolation + investigation avant tout redémarrage.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'Formatage sans investigation = perte de preuves',
                  explication: 'Formater immédiatement détruit toutes les preuves forensiques : logs, fichiers du malware, historique de navigation, journaux d\'événements Windows. Sans investigation, vous ne saurez jamais quelles données ont été exfiltrées, si d\'autres postes sont infectés, ou comment améliorer les défenses. Investiguer d\'abord, formater ensuite.'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'L\'enquête utilisateur est complémentaire, pas prioritaire',
                  explication: 'Demander à l\'utilisateur est utile pour comprendre le vecteur d\'attaque mais pas en priorité. L\'investigation technique (VirusTotal, netstat, logs) donne des réponses fiables que l\'utilisateur peut ne pas avoir (il peut ne pas savoir qu\'il a cliqué sur quelque chose de malveillant). Faites l\'analyse technique en parallèle.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'Formater sans analyse d\'impact est une gestion d\'incident incomplète',
                  explication: 'Formater remédie au poste mais ne répond pas aux questions critiques : Quelles données ont été exfiltrées ? D\'autres postes sont-ils infectés ? Y a-t-il une obligation RGPD de notification ? Sans analyse d\'impact, vous ne pouvez pas savoir si l\'incident est vraiment contenu.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'Changer le mot de passe n\'est qu\'une micro-mesure',
                  explication: 'Un RAT (Remote Access Trojan) a probablement déjà capturé tous les mots de passe tapés sur le poste (keylogger). Changer un seul mot de passe ne suffit pas — tous les identifiants utilisés sur ce poste (email, VPN, AD, applications métier) doivent être considérés comme compromis et réinitialisés.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'sec-m05',
        titre: 'Gestion des certificats',
        cas: [
          {
            id: 'cas-sec-009',
            titre: 'Déployer une PKI interne avec Active Directory Certificate Services',
            difficulte: 'difficile',
            format: 'scenario',
            objectif: 'Comprendre l\'architecture PKI et déployer une autorité de certification interne avec AD CS pour émettre des certificats d\'entreprise',
            contexte: 'L\'entreprise veut déployer une PKI interne pour : sécuriser les communications internes (LDAPS, RDS, intranet HTTPS), authentification par certificat sur le WiFi (802.1X), et signature de code.',
            contenu: {
              etapes: [
                {
                  description: 'Quelle architecture PKI à deux niveaux déployez-vous et pourquoi ne pas mettre la Root CA en ligne en permanence ?',
                  choix: [
                    { texte: 'Root CA hors ligne (offline) → délivre uniquement le certificat de la Subordinate CA → mise hors tension après. Subordinate CA en ligne → délivre les certificats aux serveurs et utilisateurs', correct: true, feedback: 'Architecture correcte et recommandée par Microsoft ! La Root CA hors ligne est protégée contre les compromissions réseau : si elle est éteinte, elle ne peut pas être attaquée. Si la Subordinate CA est compromise, on peut la révoquer avec la Root CA et en déployer une nouvelle. La Root CA sert uniquement lors des rares occasions de renouvellement de la Subordinate CA (tous les 5-10 ans).' },
                    { texte: 'Une seule CA en ligne qui émet tous les certificats (Root CA = Issuing CA)', correct: false, feedback: 'Une Root CA à usage unique directement en ligne est plus simple mais moins sécurisée : si elle est compromise, toute la chaîne de confiance est cassée et il faut tout reconstruire. La séparation Root CA offline / Subordinate CA online est la bonne pratique universelle pour les PKI d\'entreprise.' },
                    { texte: 'Utiliser Let\'s Encrypt pour tous les certificats internes', correct: false, feedback: 'Let\'s Encrypt est pour les certificats publics (validation de domaine externe). Pour les serveurs internes (LDAPS, intranet), Let\'s Encrypt ne peut pas émettre de certificats (il ne valide que les domaines publics). Une PKI interne est nécessaire pour les noms internes (.local, noms courts, IPs privées).' }
                  ]
                },
                {
                  description: 'Comment déployer automatiquement le certificat de la Root CA sur tous les postes du domaine pour qu\'ils fassent confiance à la PKI interne ?',
                  choix: [
                    { texte: 'GPO : Ordinateur → Paramètres Windows → Paramètres de sécurité → Stratégies de clés publiques → Autorités de certification racines de confiance → importer le certificat Root CA', correct: true, feedback: 'Méthode standard et automatique ! La GPO déploie le certificat racine sur tous les postes du domaine lors du prochain renouvellement de GPO (gpupdate /force ou au redémarrage). Les navigateurs (IE/Edge) et Windows utilisent le magasin de certificats Windows — Chrome et Firefox aussi dans un environnement d\'entreprise avec les GPO appropriées.' },
                    { texte: 'Envoyer un email à tous les utilisateurs avec le certificat Root CA en pièce jointe pour qu\'ils l\'importent manuellement', correct: false, feedback: 'L\'import manuel est non scalable (200 postes × import manuel = risque d\'erreur, refus de certains utilisateurs) et non sécurisé (les utilisateurs ne doivent pas être habitués à importer des certificats reçus par email — c\'est exactement le vecteur d\'attaque des certificats malveillants). La GPO est la méthode sécurisée et automatique.' },
                    { texte: 'Les navigateurs font automatiquement confiance aux CA internes dès qu\'elles sont créées', correct: false, feedback: 'Les navigateurs ne font confiance qu\'aux CA incluses dans leurs listes de confiance (Mozilla NSS, Microsoft Root Store, etc.). Une CA interne privée n\'est pas dans ces listes — elle doit être explicitement déployée via GPO (Windows) ou configuration (Firefox) pour être approuvée.' }
                  ]
                },
                {
                  description: 'Un certificat de serveur émis par la PKI interne expire demain. Quelle procédure de renouvellement suivre ?',
                  choix: [
                    { texte: 'Sur le serveur : générer une nouvelle CSR (Certificate Signing Request) → soumettre à la Subordinate CA → télécharger et installer le nouveau certificat → vérifier la chaîne de confiance → supprimer l\'ancien certificat une fois le nouveau actif', correct: true, feedback: 'Procédure correcte ! Le renouvellement génère une nouvelle paire de clés (recommandé) ou réutilise les clés existantes. Via MMC → Certificats → Demander un nouveau certificat (auto-enrollment si configuré via GPO) ou via la console web de l\'AD CS (http://CA/certsrv). Testez le nouveau certificat avant de supprimer l\'ancien. Activez les alertes d\'expiration (AD CS → Properties → Auditing + alertes email ou script) pour éviter les surprises.' },
                    { texte: 'Étendre la date d\'expiration du certificat actuel de 1 an dans les propriétés', correct: false, feedback: 'Il est impossible de modifier la date d\'expiration d\'un certificat déjà émis et signé — cela invaliderait la signature numérique de la CA. Un certificat est immuable après émission. La seule option est d\'en émettre un nouveau.' },
                    { texte: 'Supprimer le certificat expiré et les utilisateurs n\'auront plus d\'avertissement', correct: false, feedback: 'Supprimer le certificat expiré du serveur rend le service inaccessible (le service n\'a plus de certificat à présenter). Un certificat expiré doit être remplacé par un nouveau certificat valide, pas simplement supprimé.' }
                  ]
                }
              ]
            }
          },
          {
            id: 'cas-sec-010',
            titre: 'Résoudre une erreur de certificat SSL',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Diagnostiquer les erreurs de certificat SSL les plus courantes et appliquer les corrections',
            contexte: 'Les utilisateurs reçoivent des erreurs de certificat en accédant à l\'intranet HTTPS de l\'entreprise. Trois types d\'erreurs différentes sont signalées selon les postes.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Erreur 1 : "NET::ERR_CERT_AUTHORITY_INVALID" sur tous les postes d\'un nouveau site distant. Quelle est la cause la plus probable ?',
                  choix: [
                    { texte: 'Les postes du site distant n\'ont pas reçu le certificat Root CA de la PKI interne (GPO non appliquée ou hors domaine)', suite: 'n2' },
                    { texte: 'Le certificat du serveur intranet est expiré', suite: 'n_bad1' },
                    { texte: 'Le serveur intranet utilise HTTP au lieu de HTTPS', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'Erreur 2 : "NET::ERR_CERT_DATE_INVALID" sur certains postes seulement. Quelle vérification d\'abord ?',
                  choix: [
                    { texte: 'Vérifier la date et l\'heure système des postes concernés — une date incorrecte rend les certificats valides invalides (et les certificats expirés valides)', suite: 'n3' },
                    { texte: 'Renouveler immédiatement le certificat du serveur intranet', suite: 'n_bad3' },
                    { texte: 'Désactiver la vérification de date dans les paramètres SSL du navigateur', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'Erreur 3 : "NET::ERR_CERT_COMMON_NAME_INVALID" — le certificat est signé pour "intranet.contoso.local" mais les utilisateurs accèdent via "portail.contoso.local". Comment corriger ?',
                  choix: [
                    { texte: 'Émettre un nouveau certificat avec les deux noms dans les Subject Alternative Names (SAN) : intranet.contoso.local et portail.contoso.local', suite: 'n4' },
                    { texte: 'Demander aux utilisateurs d\'accéder via "intranet.contoso.local" au lieu de "portail.contoso.local"', suite: 'n_bad5' },
                    { texte: 'Créer un certificat wildcard *.contoso.local pour couvrir tous les sous-domaines', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'Toutes les erreurs SSL diagnostiquées et corrigées',
                  explication: 'Les trois erreurs SSL courantes : 1) ERR_CERT_AUTHORITY_INVALID → CA racine non approuvée sur les clients (déployer via GPO ou import manuel). 2) ERR_CERT_DATE_INVALID → heure système incorrecte sur le client OU certificat réellement expiré (vérifier l\'heure d\'abord, puis la date du certificat). 3) ERR_CERT_COMMON_NAME_INVALID → le nom DNS dans le certificat ne correspond pas à l\'URL utilisée (corriger avec un SAN multi-noms ou un wildcard). Les SAN (Subject Alternative Names) sont la méthode moderne — le CN seul n\'est plus suffisant pour les navigateurs modernes.'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'Un certificat expiré donne ERR_CERT_DATE_INVALID, pas AUTHORITY_INVALID',
                  explication: 'ERR_CERT_AUTHORITY_INVALID signifie que la CA qui a signé le certificat n\'est pas dans le magasin de confiance du client. ERR_CERT_DATE_INVALID signifie que la date du certificat est invalide (expiré ou pas encore valide). Ce sont deux erreurs distinctes avec des causes différentes.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'HTTP ne génère pas d\'erreur de certificat',
                  explication: 'HTTP ne chiffre pas et n\'utilise pas de certificats. Une erreur "CERT_AUTHORITY_INVALID" apparaît uniquement quand un certificat est présenté (HTTPS). Si le serveur était en HTTP, les utilisateurs verraient soit la page (non chiffrée), soit une erreur de connexion HTTP — pas une erreur de certificat.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'Renouveler le certificat ne résout pas une heure système incorrecte',
                  explication: 'Si l\'heure système d\'un poste est incorrecte (exemple : 5 ans dans le passé ou le futur), même un certificat tout juste renouvelé sera invalide. La vérification de l\'heure système est systématiquement la première vérification pour ERR_CERT_DATE_INVALID quand seulement certains postes sont affectés.'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'Désactiver la vérification de date est une faille de sécurité',
                  explication: 'La vérification des dates de certificat protège contre l\'utilisation de certificats expirés (potentiellement compromis). La désactiver permettrait d\'utiliser des certificats périmés de plusieurs années sans avertissement. Corrigez l\'heure système ou renouvelez le certificat.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'Changer l\'habitude des utilisateurs est une mauvaise solution',
                  explication: 'Si l\'alias DNS "portail.contoso.local" est déjà documenté, communiqué, et mis en favoris, demander aux utilisateurs de changer est une source de confusion. La bonne solution est d\'émettre un certificat qui couvre les deux noms via SAN, permettant d\'accéder indifféremment par les deux URL.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'Un wildcard *.contoso.local est valide mais excessif ici',
                  explication: 'Un certificat wildcard couvre *.contoso.local (tous les sous-domaines au niveau 1). C\'est une solution fonctionnelle mais potentiellement trop large : si une application avec ce certificat est compromise, tous les sous-domaines sont affectés. Pour deux noms spécifiques, un certificat SAN multi-noms est plus précis et moins risqué.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'sec-m06',
        titre: 'VPN Télétravail & Site-à-Site',
        cas: [
          {
            id: 'cas-sec-011',
            titre: 'Configurer un VPN SSL (OpenVPN) pour les télétravailleurs',
            difficulte: 'moyen',
            format: 'scenario',
            objectif: 'Déployer et configurer OpenVPN sur pfSense pour permettre aux télétravailleurs d\'accéder au réseau interne de manière sécurisée',
            contexte: 'L\'entreprise veut permettre à 20 télétravailleurs d\'accéder au réseau interne (192.168.1.0/24) depuis Internet de manière sécurisée. Vous utilisez pfSense avec le wizard OpenVPN.',
            contenu: {
              etapes: [
                {
                  description: 'Quel type de VPN est recommandé pour les télétravailleurs et pourquoi préférer SSL/TLS (OpenVPN/WireGuard) à IPSec ?',
                  choix: [
                    { texte: 'SSL/TLS (OpenVPN port 443 ou 1194, WireGuard 51820) : traverse facilement les firewalls et NAT des réseaux publics (hôtels, 4G), contrairement à IPSec qui nécessite souvent des ports spéciaux ou l\'UDP 500/4500 bloqués', correct: true, feedback: 'Analyse correcte ! OpenVPN sur TCP 443 est particulièrement adapté : il se comporte comme du HTTPS et traverse presque tous les firewalls restrictifs (réseaux d\'entreprise clients, hôtels, pays avec censure). WireGuard (UDP 51820) est plus performant et moderne. IPSec est excellent pour les VPN site-à-site (routers dédiés) mais plus problématique pour les clients distants derrière des NAT/firewalls stricts.' },
                    { texte: 'IPSec IKEv2 : le plus sécurisé car standard IETF, à utiliser pour tous les télétravailleurs', correct: false, feedback: 'IKEv2/IPSec est effectivement sécurisé et intégré nativement à Windows/iOS/Android. Mais il utilise UDP 500 et 4500 qui sont souvent bloqués dans les réseaux d\'entreprise clients ou les hôtels. Pour les télétravailleurs avec des connexions variées, OpenVPN TCP 443 ou WireGuard sont plus fiables.' },
                    { texte: 'L2TP/PPPoE : protocoles simples et compatibles avec tous les équipements', correct: false, feedback: 'L2TP seul n\'est pas chiffré — il nécessite IPSec pour la sécurité (L2TP/IPSec). De plus, les mêmes limitations de pare-feu qu\'IPSec s\'appliquent. PPPoE est un protocole de couche 2 pour les connexions DSL, pas pour les VPN de télétravail.' }
                  ]
                },
                {
                  description: 'Lors de la configuration OpenVPN sur pfSense, quel mode d\'authentification est le plus sécurisé pour les télétravailleurs ?',
                  choix: [
                    { texte: 'Certificats clients (PKI) + authentification Active Directory (username/password) — double facteur : "ce que j\'ai" (certificat) + "ce que je sais" (mot de passe AD)', correct: true, feedback: 'Double authentification recommandée ! Certificat client (stocké sur le poste ou token hardware) + mot de passe AD. Un attaquant qui vole le mot de passe ne peut pas se connecter sans le certificat client. Avec AD Authentication (via RADIUS ou LDAP dans pfSense), les comptes désactivés dans l\'AD coupent automatiquement l\'accès VPN.' },
                    { texte: 'Clé partagée (PSK) commune à tous les télétravailleurs', correct: false, feedback: 'Une PSK partagée est la méthode la moins sécurisée : si un seul télétravailleur est compromis ou part de l\'entreprise, il faut changer la clé pour TOUS. De plus, une PSK ne permet pas d\'identifier quel utilisateur est connecté. Les certificats individuels + AD sont bien supérieurs.' },
                    { texte: 'Mot de passe local OpenVPN uniquement (sans certificat ni AD)', correct: false, feedback: 'Un mot de passe local OpenVPN seul sans certificat est vulnérable aux attaques par force brute et au vol de mot de passe. Sans intégration AD, la révocation d\'un compte (employé qui part) nécessite une intervention manuelle dans pfSense. L\'intégration AD + certificats client offre gestion centralisée et sécurité renforcée.' }
                  ]
                },
                {
                  description: 'Un télétravailleur se connecte en VPN mais ne peut pas accéder aux ressources internes. Il peut pinguer la passerelle VPN (10.8.0.1) mais pas les serveurs internes (192.168.1.0/24). Quelle est la cause probable ?',
                  choix: [
                    { texte: 'Les règles de pare-feu pfSense sur l\'interface VPN (OpenVPN) ne permettent pas le trafic vers le LAN — ajouter une règle Allow depuis le réseau VPN (10.8.0.0/24) vers le LAN (192.168.1.0/24)', correct: true, feedback: 'Cause classique ! pfSense bloque par défaut tout trafic entre les interfaces. Après création du VPN, il faut explicitement créer une règle de pare-feu sur l\'interface OpenVPN : Firewall → Rules → OpenVPN → Add → Source: 10.8.0.0/24 → Destination: 192.168.1.0/24 → Action: Allow. Sans cette règle, le tunnel VPN est établi mais le trafic vers le LAN est bloqué.' },
                    { texte: 'Le client VPN du télétravailleur est mal configuré', correct: false, feedback: 'Si le client VPN était mal configuré, la connexion ne s\'établirait pas du tout. Le fait que le télétravailleur peut pinguer la passerelle VPN (10.8.0.1) prouve que le tunnel est établi et que le client est correctement configuré. Le problème est une règle de pare-feu manquante côté serveur.' },
                    { texte: 'Le split tunneling doit être désactivé pour accéder au LAN', correct: false, feedback: 'Le split tunneling détermine si tout le trafic (full tunnel) ou seulement le trafic LAN (split) passe par le VPN. Même en split tunnel, si les routes vers 192.168.1.0/24 sont bien poussées au client, il peut accéder au LAN. Le problème ici est la règle de pare-feu pfSense, pas la configuration du tunneling.' }
                  ]
                }
              ]
            }
          },
          {
            id: 'cas-sec-012',
            titre: 'Configurer un VPN IPSec site-à-site',
            difficulte: 'difficile',
            format: 'terminal',
            objectif: 'Configurer un tunnel VPN IPSec entre deux sites (deux pfSense) pour interconnecter les réseaux locaux',
            contexte: 'Site A (pfSense-A, IP WAN 91.200.100.50, LAN 192.168.1.0/24) et Site B (pfSense-B, IP WAN 85.30.20.10, LAN 192.168.2.0/24) doivent être interconnectés via un VPN IPSec.',
            contenu: {
              prompt: 'pfSense-A> ',
              commandes: {
                'help': 'Navigation pfSense CLI / config résumée. Commandes : ipsec up, ipsec status, ping, route, swanctl --list-sas',
                'ipsec up Site-B': 'initiating IKE_SA Site-B[1] to 85.30.20.10\nIKE_SA Site-B[1] established between 91.200.100.50[91.200.100.50]...85.30.20.10[85.30.20.10]\nIKESA_SITE_B #1: ESTABLISHED 0 seconds ago, 91.200.100.50[%any]...85.30.20.10[%any]\nIPSEC_SITE_B{1}: INSTALLED, TUNNEL, reqid 1, ESP SPIs: c1a2b3d4_i e5f6a7b8_o\nIPSEC_SITE_B{1}: 192.168.1.0/24 === 192.168.2.0/24',
                'ipsec status': 'Security Associations (1 up, 0 connecting):\n      Site-B[1]: ESTABLISHED 15 seconds ago, 91.200.100.50[91.200.100.50]...85.30.20.10[85.30.20.10]\n      Site-B{1}:  INSTALLED, TUNNEL, reqid 1, ESP in UDP SPIs: ...\n      Site-B{1}:   192.168.1.0/24 === 192.168.2.0/24',
                'ping -S 192.168.1.1 192.168.2.1': 'PING 192.168.2.1 (192.168.2.1) from 192.168.1.1: 56(84) bytes of data.\n64 bytes from 192.168.2.1: icmp_seq=1 ttl=64 time=28.3 ms\n64 bytes from 192.168.2.1: icmp_seq=2 ttl=64 time=26.1 ms',
                'swanctl --list-sas': 'Site-B: #1, ESTABLISHED, IKEv2, ...\n  remote \'85.30.20.10\' [85.30.20.10]\n  Site-B: #1, reqid 1, INSTALLED, TUNNEL-in-UDP, ESP:AES_CBC-256/HMAC_SHA2_256_128\n    installed 47s ago, rekeying in 3512s\n    in  c1a2b3d4,  received 4244 bytes,     29 packets\n    out e5f6a7b8,  sent 4244 bytes,     29 packets\n    local  192.168.1.0/24\n    remote 192.168.2.0/24',
                'route -n': 'Kernel IP routing table\nDestination     Gateway         Genmask         Flags Metric Ref    Use Iface\n0.0.0.0         91.200.100.1    0.0.0.0         UG    0      0        0 em0\n192.168.1.0     0.0.0.0         255.255.255.0   U     0      0        0 em1\n192.168.2.0     0.0.0.0         255.255.255.0   U     0      0        0 enc0'
              },
              validation: ['ipsec up', 'ipsec status', 'ping', 'swanctl --list-sas'],
              indices: [
                'La configuration IPSec site-à-site sur pfSense se fait via VPN → IPSec → Tunnels',
                'Phase 1 (IKE) : authentification des deux passerelles (PSK ou certificats)',
                'Phase 2 (ESP) : paramètres de chiffrement du tunnel (AES, SHA)',
                'Vérifiez avec ipsec status que le tunnel est ESTABLISHED',
                'Testez la connectivité avec ping depuis chaque sous-réseau'
              ],
              solution: [
                'ipsec up Site-B',
                'ipsec status',
                'ping -S 192.168.1.1 192.168.2.1',
                'swanctl --list-sas'
              ]
            }
          }
        ]
      },
      {
        id: 'sec-m07',
        titre: 'Connecter les collaborateurs par sites',
        cas: [
          {
            id: 'cas-sec-013',
            titre: 'Diagnostiquer un VPN site-à-site instable',
            difficulte: 'difficile',
            format: 'arbre',
            objectif: 'Identifier et corriger les causes d\'instabilité d\'un tunnel VPN IPSec entre deux sites',
            contexte: 'Le VPN IPSec entre le siège (Site A) et une agence (Site B) se coupe toutes les 30-45 minutes et se rétablit automatiquement après 2-3 minutes. Les logs pfSense montrent "SA expired, rekeying failed".',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: '"SA expired, rekeying failed" lors du renouvellement IPSec. Quelle est la cause la plus fréquente de cet échec de rekeying ?',
                  choix: [
                    { texte: 'Asymétrie de configuration entre les deux pfSense : les paramètres de durée de vie (lifetime) Phase 1/Phase 2 ou les algorithmes de chiffrement ne sont pas identiques des deux côtés', suite: 'n2' },
                    { texte: 'Le lien Internet est trop lent pour le VPN', suite: 'n_bad1' },
                    { texte: 'Le tunnel VPN a besoin d\'être redémarré manuellement à chaque fois', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'Vous comparez les configs des deux pfSense : Site A a P2 Lifetime = 3600s, Site B a P2 Lifetime = 28800s. Les deux ont des algorithmes identiques. Quel est l\'impact de ce désalignement ?',
                  choix: [
                    { texte: 'À 3600s, Site A tente de renouveler la Phase 2. Site B attend jusqu\'à 28800s — la négociation échoue car les deux peers ne sont pas synchronisés sur le moment du rekeying', suite: 'n3' },
                    { texte: 'Le lifetime différent est normal et n\'affecte pas la stabilité du tunnel', suite: 'n_bad3' },
                    { texte: 'Il faut mettre le lifetime le plus court sur les deux sites', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'Après alignement des lifetimes (3600s sur les deux sites), le tunnel se coupe toujours mais moins fréquemment (toutes les 2-3 heures). Quelle autre cause investiguer ?',
                  choix: [
                    { texte: 'Vérifier si les IPs WAN sont statiques ou dynamiques (DHCP FAI) — un changement d\'IP coupe le tunnel et nécessite DynDNS ou BGP pour les IPs dynamiques', suite: 'n4' },
                    { texte: 'Augmenter le lifetime à 86400s (24h) pour réduire les renegociations', suite: 'n_bad5' },
                    { texte: 'Changer de type de VPN (OpenVPN au lieu d\'IPSec)', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'VPN IPSec stabilisé',
                  explication: 'Deux causes résolues : 1) Lifetime asymétrique → aligner P1/P2 lifetime identiques sur les deux sites (ex: P1=86400s, P2=3600s). 2) IP WAN dynamique → configurer DynDNS (No-IP, DuckDNS) et référencer le nom DNS au lieu de l\'IP dans la configuration du peer IPSec. pfSense supporte les noms DNS dans la configuration Phase 1. Activer aussi le DPD (Dead Peer Detection) pour détecter et re-établir rapidement le tunnel après une coupure réseau.'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'La bande passante n\'affecte pas la stabilité IPSec',
                  explication: 'IPSec IKE/ESP nécessite très peu de bande passante pour les échanges de contrôle. Même un lien ADSL 1 Mbps supporte des dizaines de tunnels IPSec. La coupure toutes les 30-45 minutes est caractéristique d\'un problème de lifetime ou de configuration, pas de bande passante insuffisante.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'Un VPN qui nécessite redémarrage manuel n\'est pas fonctionnel',
                  explication: 'Un tunnel VPN site-à-site professionnel doit être entièrement automatique, y compris le rekeying. Les équipes sur le site B ne peuvent pas appeler le support toutes les 30 minutes pour rétablir le VPN. Le problème doit être résolu à la racine.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'Le désalignement des lifetimes cause exactement cette instabilité',
                  explication: 'Quand les deux peers ont des lifetimes différents, le peer avec le lifetime le plus court initie le rekeying. Si l\'autre peer n\'est pas configuré pour accepter ce rekeying à ce moment-là, la négociation échoue. C\'est précisément ce que montrent les logs "rekeying failed".'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'Le plus court lifetime seul ne suffit pas — l\'alignement compte',
                  explication: 'Ce n\'est pas "le plus court" qui importe mais l\'alignement entre les deux sites. Mettre le plus court (3600s) sur les deux est correct, mais ça ne résoudra le problème que si les lifetimes sont identiques. Un lifetime court signifie plus de renegociations (toutes les heures) mais un tunnel plus frais cryptographiquement.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'Un lifetime long ne résout pas une IP dynamique',
                  explication: 'Si l\'IP WAN change (DHCP FAI) toutes les 2-3 heures, le tunnel se coupe à ce moment-là indépendamment du lifetime. Augmenter le lifetime à 24h ne ferait que masquer le problème de lifetime asymétrique initial sans résoudre la coupure liée à l\'IP dynamique.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'Changer de technologie VPN est disproportionné',
                  explication: 'IPSec site-à-site est la solution standard et robuste pour interconnecter des sites. Les problèmes identifiés (lifetime asymétrique, IP dynamique) sont des problèmes de configuration résolvables. Migrer vers OpenVPN nécessiterait de reconfigurer les deux sites et de changer l\'architecture sans garantie de résolution si les IPs restent dynamiques.'
                }
              }
            }
          },
          {
            id: 'cas-sec-014',
            titre: 'Choisir la bonne solution de connectivité inter-sites',
            difficulte: 'moyen',
            format: 'scenario',
            objectif: 'Choisir entre VPN, MPLS, et SD-WAN selon les besoins et contraintes d\'une organisation multi-sites',
            contexte: 'Une entreprise avec un siège et 5 agences régionales doit interconnecter ses sites. Trois besoins différents se présentent.',
            contenu: {
              etapes: [
                {
                  description: 'Agence 1 : petite agence de 5 personnes avec une connexion ADSL basique, budget très limité. Besoin : accès aux serveurs du siège (fichiers, ERP). Quelle solution ?',
                  choix: [
                    { texte: 'VPN IPSec ou OpenVPN site-à-site sur les routeurs/firewalls existants — solution économique sur Internet grand public', correct: true, feedback: 'Solution correcte pour une petite agence à budget limité ! Un VPN site-à-site sur une connexion Internet grand public coûte quasiment rien (juste le matériel pfSense ~200€ ou le routeur compatible). Les 5 personnes peuvent accéder aux serveurs du siège via le tunnel chiffré. Limitation : performances dépendent de la qualité d\'Internet, pas de SLA garanti.' },
                    { texte: 'Ligne MPLS dédiée du FAI pour garantir la qualité de service', correct: false, feedback: 'Une ligne MPLS est bien supérieure en termes de performances et SLA, mais son coût mensuel (plusieurs centaines à milliers d\'euros/mois) est disproportionné pour une petite agence de 5 personnes avec un budget limité. Le VPN sur Internet est la solution économique adaptée.' },
                    { texte: 'Demander aux 5 employés de se connecter individuellement en VPN telétravailleur', correct: false, feedback: 'Des VPN clients individuels plutôt qu\'un VPN site-à-site obligerait chaque employé à lancer son VPN manuellement, les imprimantes et ressources locales de l\'agence ne seraient pas partagées avec le siège. Un VPN site-à-site est transparent pour les utilisateurs de l\'agence.' }
                  ]
                },
                {
                  description: 'Agence 2 : centre de données secondaire avec 50 serveurs critiques. Besoin de haute disponibilité, faible latence (< 5ms), bande passante garantie 1 Gbps symétrique, SLA 99,99%.',
                  choix: [
                    { texte: 'Lien dédié (fibre noire ou MPLS/IPVPN) avec SLA garanti entre les deux datacenters', correct: true, feedback: 'Pour un datacenter secondaire avec des exigences critiques (SLA 99,99%, latence < 5ms, 1 Gbps garanti), un lien dédié est indispensable. MPLS/IPVPN ou fibre noire en colocation (DCI — Data Center Interconnect) offrent les garanties nécessaires. Le coût est élevé mais justifié par les besoins de haute disponibilité des systèmes critiques.' },
                    { texte: 'VPN IPSec sur une connexion fibre Internet grand public 1 Gbps', correct: false, feedback: 'Une fibre grand public peut atteindre 1 Gbps mais sans SLA : latence variable, disponibilité sans garantie. Pour des serveurs critiques avec SLA 99,99%, un lien Internet grand public est insuffisant. La moindre interruption Internet impact les systèmes critiques.' },
                    { texte: 'SD-WAN avec agrégation de plusieurs connexions Internet', correct: false, feedback: 'SD-WAN avec plusieurs liens Internet (fibre × 2, 4G) peut approcher une haute disponibilité mais rarement garantir < 5ms de latence ni 99,99% de SLA sur des liens grand public. Pour des exigences datacenter critiques, un lien dédié avec SLA contractuel reste la référence.' }
                  ]
                },
                {
                  description: 'Agence 3 : réseau de 20 agences commerciales avec des connexions ADSL/VDSL variables. Besoin de priorisation du trafic voix (VoIP) sur le trafic web, visibilité centralisée, gestion simplifiée depuis le siège.',
                  choix: [
                    { texte: 'SD-WAN (Software-Defined WAN) : gestion centralisée de la QoS, agrégation de liens, routage intelligent du trafic VoIP vs web sur les liens disponibles', correct: true, feedback: 'SD-WAN est la solution idéale pour ce cas ! Il permet : 1) Priorisation intelligente du trafic (VoIP sur le meilleur lien disponible). 2) Agrégation de liens (ADSL + 4G pour la résilience). 3) Gestion centralisée depuis le siège (une console pour les 20 agences). 4) Visibilité en temps réel sur les performances. Exemples : Cisco SD-WAN (Viptela), VMware SD-WAN (VeloCloud), Fortinet SD-WAN intégré dans FortiGate.' },
                    { texte: 'VPN IPSec standard sans QoS sur chaque agence', correct: false, feedback: 'Un VPN IPSec standard sans QoS ne priorise pas le trafic voix — les appels VoIP seront perturbés par le trafic web en cas de congestion ADSL. La gestion de 20 sites VPN individuels est aussi complexe sans outil centralisé. SD-WAN résout ces deux problèmes.' },
                    { texte: 'MPLS pour toutes les 20 agences', correct: false, feedback: 'MPLS pour 20 agences représenterait un coût mensuel très important (20 liens dédiés × plusieurs centaines d\'euros). SD-WAN utilise Internet grand public (moins cher) avec une intelligence applicative (QoS, routage) qui compense la variabilité d\'Internet. Meilleur rapport qualité/prix pour les agences commerciales.' }
                  ]
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'sauvegarde-restauration',
    titre: 'Sauvegarde et restauration',
    emoji: '💾',
    modules: [
      {
        id: 'sauv-m01',
        titre: 'Sauvegarde, Restauration, Disponibilité',
        cas: [
          {
            id: 'cas-sauv-001',
            titre: 'Définir une stratégie de sauvegarde 3-2-1',
            difficulte: 'facile',
            format: 'scenario',
            objectif: 'Comprendre et appliquer la règle 3-2-1 pour concevoir une stratégie de sauvegarde robuste',
            contexte: 'Une PME stocke ses données critiques sur un serveur de fichiers Windows. Le DSI vous demande de concevoir une stratégie de sauvegarde qui respecte les bonnes pratiques.',
            contenu: {
              etapes: [
                {
                  description: 'Qu\'est-ce que la règle 3-2-1 en matière de sauvegarde ?',
                  choix: [
                    { texte: '3 copies des données, sur 2 supports différents, dont 1 copie hors site (offsite)', correct: true, feedback: 'Exactement ! La règle 3-2-1 est la référence : 3 copies (production + 2 sauvegardes) évite les SPOF. 2 supports différents (ex: NAS + bande LTO) protège contre la défaillance d\'un type de média. 1 copie hors site (cloud, datacenter externe, coffre-fort) protège contre les catastrophes physiques (incendie, inondation, vol). Cette règle est recommandée par le NIST et tous les éditeurs de solutions de sauvegarde.' },
                    { texte: '3 sauvegardes par jour, 2 fois par semaine, 1 fois par mois', correct: false, feedback: 'Ce n\'est pas la définition de la règle 3-2-1. Vous décrivez ici une politique de rétention (fréquence des sauvegardes). La règle 3-2-1 concerne le nombre de copies, les types de supports, et la géographie des stockages.' },
                    { texte: '3 disques en RAID, 2 serveurs redondants, 1 datacenter de secours', correct: false, feedback: 'Le RAID n\'est pas une sauvegarde — c\'est de la redondance matérielle (haute disponibilité). La règle 3-2-1 s\'applique spécifiquement aux sauvegardes (copies des données à un instant T), pas à la redondance. Un RAID peut être corrompu par un ransomware simultanément sur tous les disques.' }
                  ]
                },
                {
                  description: 'L\'entreprise a ses données sur un serveur Windows. Quelle implémentation concrète de la règle 3-2-1 proposez-vous ?',
                  choix: [
                    { texte: 'Copie 1 : données en production sur le serveur. Copie 2 : sauvegarde quotidienne sur NAS local (réseau interne). Copie 3 : sauvegarde hebdomadaire sur cloud (Azure Backup, Veeam Cloud) ou disque externe stocké hors site', correct: true, feedback: 'Implémentation correcte ! Production (copie 1) + NAS local (copie 2, support différent) + cloud ou hors site (copie 3). En cas de ransomware : le NAS local peut être chiffré si connecté en permanence → préférez des sauvegardes avec rétention immuable (immutable backup) ou des sauvegardes sur bande physiquement déconnectée. Azure Backup avec "soft delete" offre une protection contre la suppression accidentelle pendant 14 jours.' },
                    { texte: 'Copie 1 : serveur principal. Copie 2 : miroir RAID 1 sur le même serveur. Copie 3 : sauvegarde sur un second disque du même serveur', correct: false, feedback: '3 copies sur le même serveur physique ne respectent pas la règle 3-2-1. Un incendie, une surtension ou un ransomware détruirait les 3 copies simultanément. Les "2 supports différents" et "1 hors site" sont indispensables.' },
                    { texte: 'Sauvegarder uniquement dans le cloud — c\'est suffisant car le cloud est redondant', correct: false, feedback: 'Le cloud seul ne respecte pas la règle 3-2-1 : il n\'y a qu\'un seul type de support (cloud). De plus, en cas de perte d\'accès Internet, de clôture du compte, ou d\'erreur de suppression dans le cloud, les données sont inaccessibles. La règle 3-2-1 exige la diversification des supports ET des emplacements.' }
                  ]
                },
                {
                  description: 'Le RTO (Recovery Time Objective) de l\'entreprise est de 4 heures. Qu\'est-ce que cela signifie concrètement pour votre stratégie de sauvegarde ?',
                  choix: [
                    { texte: 'En cas d\'incident, les données doivent être restaurées et les services opérationnels en moins de 4 heures — cela impose des sauvegardes testées régulièrement et un processus de restauration documenté et rapide', correct: true, feedback: 'Correct ! Le RTO (temps de reprise d\'activité) de 4h signifie que votre plan de restauration doit être compatible avec cette contrainte. Implications : tester la restauration régulièrement (pas seulement la sauvegarde), documenter les procédures, avoir les outils de restauration prêts, et potentiellement avoir une sauvegarde locale (NAS) pour éviter un téléchargement lent depuis le cloud.' },
                    { texte: 'Conserver les sauvegardes pendant 4 heures puis les supprimer', correct: false, feedback: 'Le RTO est une durée de reprise, pas une durée de rétention. La rétention (combien de temps garder les sauvegardes) est définie par le RPO et les exigences légales/métier. Le RTO concerne uniquement le temps maximum acceptable pour rétablir les services après un incident.' },
                    { texte: 'Faire une sauvegarde toutes les 4 heures', correct: false, feedback: 'La fréquence des sauvegardes est liée au RPO (Recovery Point Objective — perte de données maximale acceptable), pas au RTO. Si le RPO est de 4h, vous sauvegardez toutes les 4h. Le RTO de 4h signifie que la RESTAURATION doit se faire en moins de 4h.' }
                  ]
                }
              ]
            }
          },
          {
            id: 'cas-sauv-002',
            titre: 'Tester et valider une restauration',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Diagnostiquer pourquoi une restauration échoue et établir un processus de test de sauvegarde fiable',
            contexte: 'Suite à une panne de disque, l\'administrateur tente de restaurer les données depuis la sauvegarde Veeam. La restauration échoue avec l\'erreur "Backup file is corrupted or inaccessible".',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: '"Backup file corrupted or inaccessible" — comment diagnostiquer la cause ?',
                  choix: [
                    { texte: 'Vérifier l\'intégrité du fichier de sauvegarde avec l\'outil de vérification Veeam (SureBackup ou vérification du fichier .vbk)', suite: 'n2' },
                    { texte: 'Relancer immédiatement une nouvelle sauvegarde depuis la source endommagée', suite: 'n_bad1' },
                    { texte: 'Restaurer depuis une sauvegarde plus ancienne sans vérifier', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'La vérification Veeam confirme que le dernier fichier .vbk est corrompu. Les 3 fichiers d\'incrément (.vib) des jours précédents semblent intacts. Quelle option de restauration explorer ?',
                  choix: [
                    { texte: 'Restaurer depuis le point de restauration disponible le plus récent avant la corruption (le dernier .vib valide)', suite: 'n3' },
                    { texte: 'Considérer que toutes les sauvegardes sont corrompues et capituler', suite: 'n_bad3' },
                    { texte: 'Contacter le support Veeam pour réparer le fichier .vbk corrompu', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'La restauration depuis le dernier point valide réussit mais les données ont 2 jours de retard (RPO non respecté). Quelle mesure prendre pour éviter ce problème à l\'avenir ?',
                  choix: [
                    { texte: 'Activer la vérification automatique des sauvegardes (SureBackup / test de restauration automatisé) après chaque sauvegarde, et configurer des alertes en cas d\'échec de vérification', suite: 'n4' },
                    { texte: 'Faire des sauvegardes plus fréquentes (toutes les heures)', suite: 'n_bad5' },
                    { texte: 'Changer de logiciel de sauvegarde', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'Processus de sauvegarde amélioré',
                  explication: 'Leçon apprise : une sauvegarde non testée n\'est pas une sauvegarde fiable. Bonnes pratiques : 1) SureBackup (Veeam) ou équivalent : lance automatiquement une VM de test depuis la sauvegarde et vérifie qu\'elle démarre correctement. 2) Alertes en cas d\'échec : email/SMS immédiat si une sauvegarde échoue. 3) Test de restauration complet mensuel : restaurer sur un environnement de test et valider les données. 4) Rotation des supports : garder plusieurs générations (grand-père/père/fils) pour avoir le choix du point de restauration.'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'La source est endommagée — nouvelle sauvegarde impossible',
                  explication: 'Si le disque source est en panne, il est impossible de faire une nouvelle sauvegarde "propre". Forcer une sauvegarde depuis une source endommagée produirait une sauvegarde corrompue. L\'urgent est de restaurer depuis les sauvegardes existantes, pas d\'en créer de nouvelles.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'Restaurer sans vérifier peut reproduire la corruption',
                  explication: 'Si la corruption de la sauvegarde a une cause systématique (bug du logiciel, disque cible de sauvegarde défaillant), les fichiers plus anciens peuvent être également corrompus. Vérifiez l\'intégrité avant de lancer une restauration pour éviter de perdre du temps sur une tentative vouée à l\'échec.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'Les fichiers d\'incrément .vib peuvent être valides',
                  explication: 'La chaîne de sauvegarde Veeam est : .vbk (full) + .vib (incréments). Si le .vbk est corrompu mais les .vib sont valides, Veeam peut parfois restaurer depuis un point de restauration intermédiaire. De plus, d\'autres copies (NAS secondaire, cloud) peuvent exister si la règle 3-2-1 est respectée.'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'Le support ne peut généralement pas réparer les fichiers de sauvegarde corrompus',
                  explication: 'Les fichiers de sauvegarde corrompus (données perdues ou checksum invalide) sont rarement récupérables même par le support éditeur. C\'est pourquoi la règle 3-2-1 et la vérification automatique sont essentielles : prévenir la corruption plutôt que de tenter de la réparer après. Explorez d\'abord les points de restauration alternatifs.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'La fréquence ne résout pas la corruption',
                  explication: 'Faire des sauvegardes toutes les heures ne protège pas contre la corruption des fichiers de sauvegarde. Si le disque cible est défaillant ou si le logiciel a un bug, les sauvegardes horaires seront toutes corrompues. La vérification de l\'intégrité après chaque sauvegarde est la mesure corrective pertinente.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'Changer de logiciel sans comprendre la cause',
                  explication: 'La corruption peut venir du disque cible de sauvegarde (défaillant), du réseau, ou d\'une erreur de configuration — pas nécessairement du logiciel. Changer de logiciel sans identifier la cause racine reproduira probablement le même problème. La vérification automatique (SureBackup) est disponible dans Veeam — activez-la plutôt que de migrer vers un autre outil.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'sauv-m02',
        titre: 'Types de sauvegarde',
        cas: [
          {
            id: 'cas-sauv-003',
            titre: 'Choisir entre sauvegarde complète, incrémentielle et différentielle',
            difficulte: 'facile',
            format: 'scenario',
            objectif: 'Comprendre les différences entre les types de sauvegarde et choisir la stratégie adaptée selon les contraintes de temps et de stockage',
            contexte: 'Vous devez concevoir la politique de sauvegarde pour un serveur de fichiers de 500 GB. Les contraintes sont : fenêtre de sauvegarde nocturne de 2h, espace de stockage limité à 2 TB, restauration rapide souhaitée.',
            contenu: {
              etapes: [
                {
                  description: 'Quelles sont les différences fondamentales entre sauvegarde complète, incrémentielle et différentielle ?',
                  choix: [
                    { texte: 'Complète : toutes les données à chaque fois. Incrémentielle : seulement les changements depuis la DERNIÈRE sauvegarde (quelle que soit son type). Différentielle : seulement les changements depuis la DERNIÈRE SAUVEGARDE COMPLÈTE', correct: true, feedback: 'Définitions exactes ! Exemple avec 5 jours : Complète lundi. Incrémentielle mardi = changements depuis lundi, mercredi = changements depuis mardi, etc. (petite taille, mais restauration = complète + toutes les incréments). Différentielle mardi = changements depuis lundi, mercredi = changements depuis lundi aussi (taille croissante, mais restauration = complète + 1 seul différentiel).' },
                    { texte: 'Complète : copie de tous les fichiers. Incrémentielle : copie des fichiers modifiés cette semaine. Différentielle : copie des fichiers créés ce mois', correct: false, feedback: 'Les définitions sont incorrectes. L\'incrémentielle ne copie pas les fichiers "de la semaine" mais les modifications depuis la dernière sauvegarde (quel que soit son type). La différentielle ne copie pas les fichiers "du mois" mais tout ce qui a changé depuis la dernière complète.' },
                    { texte: 'Les trois types sauvegardent les mêmes données, la différence est uniquement le format du fichier de sauvegarde', correct: false, feedback: 'Non — la différence fondamentale est QUELLES données sont sauvegardées (toutes, ou seulement les modifications) et depuis QUAND (dernière sauvegarde ou dernière complète). Cela impacte directement la taille des sauvegardes et la procédure de restauration.' }
                  ]
                },
                {
                  description: 'Avec les contraintes données (2h de fenêtre, 2 TB de stockage, restauration rapide), quelle stratégie recommandez-vous ?',
                  choix: [
                    { texte: 'Sauvegarde complète le week-end (une fois) + sauvegardes différentielles en semaine (lundi-vendredi) : compromis entre espace utilisé et vitesse de restauration', correct: true, feedback: 'Bon choix ! Complète le dimanche (~500 GB) + différentielles quotidiennes (~croissantes de 10-50 GB/jour selon les modifications). Restauration : complète + 1 seul différentiel (rapide). Espace total sur 1 semaine : ~500 + 5×50 = 750 GB. La sauvegarde complète du week-end entre dans la fenêtre de 2h avec un lien réseau 1 Gbps (~70 min pour 500 GB).' },
                    { texte: 'Sauvegarde complète chaque nuit : le plus simple et restauration la plus rapide', correct: false, feedback: 'Une complète quotidienne de 500 GB × 7 jours = 3,5 TB > 2 TB disponibles. De plus, 500 GB en 2h nécessite un débit de 70 MB/s minimum — faisable mais tendu. Pour une restauration rapide, la différentielle hebdomadaire est un meilleur compromis espace/vitesse.' },
                    { texte: 'Sauvegardes incrémentielle chaque nuit uniquement, sans sauvegarde complète : minimum d\'espace', correct: false, feedback: 'Incrémentielle uniquement sans complète de base est impossible — les incrémentielle s\'appuient sur une référence (la complète). De plus, la restauration nécessite de rejouer toutes les incrémentielle depuis la complète, ce qui devient très long avec le temps. Une complète hebdomadaire reste nécessaire.' }
                  ]
                },
                {
                  description: 'Un ransomware a chiffré les données en production le mercredi à 14h. La dernière sauvegarde complète date de dimanche, et des différentielles ont été faites lundi, mardi, mercredi matin. Quel est le point de restauration optimal ?',
                  choix: [
                    { texte: 'Restaurer depuis la sauvegarde complète du dimanche + la différentielle du mercredi matin : récupère les données jusqu\'à cette nuit-là, avec une perte maximale de ~14h de données', correct: true, feedback: 'Correct ! La différentielle du mercredi matin est le point de restauration le plus récent avant l\'infection. RPO effectif = temps entre la sauvegarde du mercredi matin et 14h = ~6-10h de perte de données. Pour réduire ce RPO, des sauvegardes plus fréquentes (toutes les 4h) ou des solutions avec snapshot continu (VSS, Veeam CDP) seraient nécessaires.' },
                    { texte: 'Restaurer depuis la différentielle du mercredi uniquement', correct: false, feedback: 'Une différentielle seule est incomplète — elle ne contient que les changements depuis la dernière complète (dimanche). Pour restaurer, il faut obligatoirement : 1) Restaurer la complète du dimanche, 2) Appliquer la différentielle du mercredi. La différentielle seule ne donne pas un état cohérent des données.' },
                    { texte: 'Ne pas restaurer et tenter de déchiffrer les fichiers avec un outil anti-ransomware', correct: false, feedback: 'Le déchiffrement anti-ransomware n\'est possible que pour quelques familles de ransomwares avec des clés publiées (Europol No More Ransom). La majorité des ransomwares modernes utilisent un chiffrement robuste non cassable. La restauration depuis sauvegarde est la solution fiable.' }
                  ]
                }
              ]
            }
          },
          {
            id: 'cas-sauv-004',
            titre: 'Configurer Windows Server Backup',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Configurer et automatiser des sauvegardes avec Windows Server Backup via PowerShell',
            contexte: 'Vous devez configurer une sauvegarde automatique quotidienne du volume D:\\ (données) d\'un serveur Windows Server 2022 vers un partage réseau \\\\NAS01\\Backup, à 23h00 tous les soirs.',
            contenu: {
              prompt: 'PS C:\\> ',
              commandes: {
                'help': 'Commandes : Add-WindowsFeature, Get-WBPolicy, New-WBPolicy, Add-WBVolume, Add-WBBackupTarget, Set-WBSchedule, Start-WBBackup, Get-WBJob, Get-WBSummary',
                'Add-WindowsFeature Windows-Server-Backup': 'Success Restart Needed Exit Code Feature Result\n------- -------------- --------- --------------\nTrue    No             Success   {Windows Server Backup}',
                '$policy = New-WBPolicy': '',
                '$volume = Get-WBVolume -VolumePath "D:"': '',
                'Add-WBVolume -Policy $policy -Volume $volume': 'PSComputerName RunspaceId  PSShowComputerName\n-------------- ----------  ------------------',
                '$target = New-WBBackupTarget -NetworkPath "\\\\NAS01\\Backup" -Credential (Get-Credential)': 'Credentials pour \\\\NAS01\\Backup :\n[Fenêtre de saisie des identifiants]',
                'Add-WBBackupTarget -Policy $policy -Target $target': '',
                'Set-WBSchedule -Policy $policy -Schedule 23:00': '',
                'Set-WBPolicy -Policy $policy': 'Attention : La stratégie existante sera remplacée.\nVoulez-vous continuer ? [O] Oui  [N] Non  : O\nLa stratégie de sauvegarde a été définie avec succès.',
                'Get-WBPolicy': 'Schedule         : {23:00:00}\nBackupTargets    : {\\\\NAS01\\Backup}\nVolumesToBackup  : {D:\\}\nSystemState      : False\nBMR              : False',
                'Start-WBBackup -Policy (Get-WBPolicy)': 'Démarrage de la sauvegarde...\nSauvegarde du volume D:\\\nLa sauvegarde a réussi.',
                'Get-WBSummary': 'LastSuccessfulBackupTime  : 21/03/2026 23:01:15\nLastBackupResultHR        : 0\nNumberOfVersions          : 1\nOldestBackupTime          : 21/03/2026 23:01:15\nNextBackupTime            : 22/03/2026 23:00:00'
              },
              validation: ['New-WBPolicy', 'Add-WBVolume', 'Add-WBBackupTarget', 'Set-WBSchedule', 'Set-WBPolicy', 'Get-WBSummary'],
              indices: [
                'Installez d\'abord le rôle : Add-WindowsFeature Windows-Server-Backup',
                'Créez une policy vide avec New-WBPolicy, puis ajoutez les volumes, cibles et planification',
                'New-WBBackupTarget -NetworkPath pour une cible réseau (partage UNC)',
                'Set-WBSchedule -Schedule 23:00 pour planifier à 23h',
                'Appliquez la policy avec Set-WBPolicy, vérifiez avec Get-WBPolicy'
              ],
              solution: [
                'Add-WindowsFeature Windows-Server-Backup',
                '$policy = New-WBPolicy',
                '$volume = Get-WBVolume -VolumePath "D:"',
                'Add-WBVolume -Policy $policy -Volume $volume',
                '$target = New-WBBackupTarget -NetworkPath "\\\\NAS01\\Backup" -Credential (Get-Credential)',
                'Add-WBBackupTarget -Policy $policy -Target $target',
                'Set-WBSchedule -Policy $policy -Schedule 23:00',
                'Set-WBPolicy -Policy $policy',
                'Get-WBPolicy',
                'Get-WBSummary'
              ]
            }
          }
        ]
      },
      {
        id: 'sauv-m03',
        titre: 'Gestion du Stockage',
        cas: [
          {
            id: 'cas-sauv-005',
            titre: 'Choisir et dimensionner une solution de stockage pour les sauvegardes',
            difficulte: 'moyen',
            format: 'scenario',
            objectif: 'Comparer les solutions de stockage (NAS, SAN, bande, cloud) et choisir la plus adaptée selon les besoins',
            contexte: 'Une entreprise de 100 employés génère 2 TB de données critiques. Elle veut stocker 30 jours de sauvegardes (rétention). La politique prévoit une complète hebdomadaire + différentielles quotidiennes.',
            contenu: {
              etapes: [
                {
                  description: 'Calculez l\'espace de stockage nécessaire pour 30 jours de rétention avec cette politique (données : 2 TB, taux de modification journalier estimé à 5%).',
                  choix: [
                    { texte: '4 complètes × 2 TB + 26 différentielles × (5% × 2 TB croissant) ≈ 8 TB + ~4 TB = ~12 TB nécessaires pour 30 jours', correct: true, feedback: 'Bon calcul ! 4 complètes hebdomadaires = 4 × 2 TB = 8 TB. Les différentielles : semaine 1 : 1×5%=100 GB, puis 2×5%=200 GB... jusqu\'à ~35% à J7. En moyenne ~15% par différentielle × 26 jours ≈ 26 × 300 GB = ~8 TB. Total estimé : ~16 TB. Avec compression (~30-40%) : ~10-12 TB. Prévoyez une marge de 20% : commander 15 TB de stockage.' },
                    { texte: '30 jours × 2 TB = 60 TB nécessaires', correct: false, feedback: 'Ce calcul suppose une sauvegarde complète chaque jour, ce qui n\'est pas la politique décrite. Avec complète hebdomadaire + différentielles, l\'espace est bien inférieur car les différentielles ne contiennent que les changements (5% par jour), pas la totalité des 2 TB.' },
                    { texte: '2 TB suffisent — une seule sauvegarde est nécessaire', correct: false, feedback: '2 TB ne permettrait de stocker qu\'une seule sauvegarde complète, sans rétention ni point de restauration multiple. La rétention de 30 jours est essentielle pour pouvoir restaurer à différentes dates (par exemple si une corruption de données passe inaperçue plusieurs jours).' }
                  ]
                },
                {
                  description: 'Pour stocker ces ~12-15 TB de sauvegardes, quelle solution de stockage recommandez-vous pour une PME avec budget modéré ?',
                  choix: [
                    { texte: 'NAS (Network Attached Storage) avec disques en RAID 6 : bon rapport capacité/prix, accessible depuis le réseau, gestion simple via interface web', correct: true, feedback: 'Le NAS est la solution idéale pour une PME ! RAID 6 (2 disques de parité) protège contre 2 défaillances simultanées. Marques courantes : Synology, QNAP, TrueNAS. Pour 15 TB utiles en RAID 6 : ~4-6 disques de 6-8 TB. Prix : 600-1500€ pour le boîtier + disques. Connecté au réseau, toutes les sauvegardes automatiques y accèdent sans intervention manuelle.' },
                    { texte: 'SAN (Storage Area Network) avec Fibre Channel : le plus performant', correct: false, feedback: 'Un SAN Fibre Channel est surdimensionné pour une PME : coût (plusieurs milliers d\'euros pour le matériel FC), complexité de déploiement et d\'administration. Un SAN est justifié pour des environnements avec des dizaines de serveurs et des besoins de performances I/O extrêmes. Un NAS suffit largement pour des sauvegardes de PME.' },
                    { texte: 'Disques USB externes connectés au serveur : le moins cher', correct: false, feedback: 'Des disques USB sont trop limités : capacité réduite, USB 3.0 moins performant qu\'un réseau 1 Gbps pour les gros volumes, risque de débranchement accidentel, pas de redondance RAID. Acceptable pour des sauvegardes ponctuelles d\'appoint hors site, pas pour la politique principale d\'une entreprise.' }
                  ]
                },
                {
                  description: 'Le NAS est en production depuis 6 mois. Un disque du RAID 6 tombe en panne. Quelle est la procédure correcte ?',
                  choix: [
                    { texte: 'Identifier le disque défaillant (LED d\'alerte sur le NAS), le remplacer par un disque identique ou supérieur en capacité, démarrer la reconstruction RAID, surveiller la progression et vérifier la santé des autres disques', correct: true, feedback: 'Procédure correcte ! RAID 6 tolère 2 pannes simultanées — avec 1 disque en panne, vous êtes en mode dégradé mais les données sont intactes. Remplacez rapidement : pendant la reconstruction (~24h pour un disque de 8 TB), une seconde panne serait catastrophique. Vérifiez la santé des autres disques (SMART) : si un autre disque montre des signes de faiblesse, remplacez-le aussi pendant que vous y êtes.' },
                    { texte: 'Éteindre le NAS immédiatement pour éviter d\'aggraver les dégâts', correct: false, feedback: 'Éteindre le NAS coupe l\'accès aux sauvegardes et est inutile. En RAID 6 avec 1 disque en panne, le NAS continue de fonctionner en mode dégradé. L\'urgence est de remplacer le disque défaillant le plus vite possible, pas d\'éteindre le système.' },
                    { texte: 'Attendre qu\'un second disque tombe en panne pour remplacer les deux à la fois et économiser une intervention', correct: false, feedback: 'RAID 6 tolère 2 pannes mais une troisième panne serait catastrophique avec perte totale des données. De plus, la reconstruction RAID avec 1 disque en panne met les autres disques sous forte charge (lecture intensive), augmentant le risque de défaillance. Remplacez le disque défaillant immédiatement.' }
                  ]
                }
              ]
            }
          },
          {
            id: 'cas-sauv-006',
            titre: 'Diagnostic : espace de stockage NAS saturé',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Résoudre un problème de saturation d\'espace sur le NAS de sauvegarde avant que les prochaines sauvegardes échouent',
            contexte: 'Une alerte indique que le NAS de sauvegarde est rempli à 95%. Les sauvegardes de la nuit prochaine vont probablement échouer. Il reste 6h avant la prochaine fenêtre de sauvegarde.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'NAS à 95% — 6h pour résoudre avant l\'échec de sauvegarde. Quelle est la première action ?',
                  choix: [
                    { texte: 'Analyser quels répertoires/sauvegardes consomment le plus d\'espace pour identifier les suppressions prioritaires', suite: 'n2' },
                    { texte: 'Désactiver les sauvegardes de cette nuit pour gagner du temps', suite: 'n_bad1' },
                    { texte: 'Commander immédiatement un nouveau NAS', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'L\'analyse montre que 40% de l\'espace est occupé par des sauvegardes de VMs de test datant de 3 mois (non critiques). La politique de rétention de 30 jours n\'a pas été configurée sur ces jobs. Que faites-vous ?',
                  choix: [
                    { texte: 'Supprimer les sauvegardes de VMs de test > 30 jours et configurer immédiatement la rétention automatique (30 jours) sur ces jobs pour éviter la récurrence', suite: 'n3' },
                    { texte: 'Supprimer toutes les sauvegardes de plus de 7 jours pour maximiser l\'espace libéré', suite: 'n_bad3' },
                    { texte: 'Déplacer les vieilles sauvegardes vers un dossier "Archives" sur le même NAS', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'La suppression des sauvegardes de test libère 40% d\'espace (NAS à 55%). La rétention est configurée. Mais la croissance des données va saturer à nouveau dans 2 mois. Quelle mesure structurelle prendre ?',
                  choix: [
                    { texte: 'Revoir la politique de rétention globale, activer la déduplication/compression sur le NAS, et planifier l\'extension de la capacité ou le tiering vers le cloud pour les sauvegardes anciennes', suite: 'n4' },
                    { texte: 'Réduire la fréquence des sauvegardes à une fois par semaine pour économiser l\'espace', suite: 'n_bad5' },
                    { texte: 'Supprimer définitivement les données les moins utilisées de la production pour réduire la taille des sauvegardes', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'Crise résolue et mesures structurelles en place',
                  explication: 'Plan d\'action complet : 1) Immédiat : supprimer sauvegardes non critiques obsolètes. 2) Court terme : configurer la rétention automatique sur tous les jobs. 3) Moyen terme : activer la déduplication (Veeam, Synology) qui peut réduire l\'espace de 30-60%. 4) Long terme : tiering cloud (sauvegardes > 30j → S3/Azure Blob Storage, moins cher). 5) Surveillance : alertes à 70% et 80% pour anticiper les prochaines saturations.'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'Désactiver les sauvegardes aggrave le risque',
                  explication: 'Désactiver les sauvegardes laisse les données sans protection pendant la période de résolution. Si un incident se produit cette nuit-là (panne disque, ransomware), les données ne pourront pas être restaurées. La résolution du problème d\'espace doit permettre que les sauvegardes se fassent normalement.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'Un nouveau NAS ne sera pas livré en 6h',
                  explication: 'Commander un nouveau NAS peut prendre 2-10 jours ouvrés. Ce n\'est pas une solution immédiate pour un problème dans 6h. De plus, sans analyser la cause (politique de rétention non configurée), le même problème se reproduira sur le nouveau NAS. Résolvez la cause racine en premier.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'Supprimer les sauvegardes < 7 jours réduit la rétention à risque',
                  explication: 'Supprimer les sauvegardes de moins de 30 jours (hors les non-critiques de test) réduit la capacité à restaurer en cas d\'incident récent. Si une corruption de données est détectée sur un fichier vieux de 15 jours, vous n\'auriez plus de point de restauration avant cette date. Ciblez uniquement les sauvegardes clairement non nécessaires (VMs de test > 30j).'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'Déplacer dans un sous-dossier ne libère pas d\'espace',
                  explication: 'Déplacer des fichiers dans un autre dossier sur le même NAS occupe exactement le même espace disque physique. Seule la suppression réelle libère de l\'espace. Un dossier "Archives" sur le même volume ne résout rien.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'Réduire la fréquence augmente le RPO',
                  explication: 'Passer à une sauvegarde hebdomadaire pour économiser l\'espace augmente le RPO à 7 jours — en cas d\'incident, vous pouvez perdre jusqu\'à 7 jours de données. C\'est une dégradation inacceptable de la protection des données. L\'espace doit être géré, pas la fréquence réduite au détriment de la sécurité.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'Supprimer des données de production est irréversible',
                  explication: 'Supprimer des données de production pour réduire la taille des sauvegardes est une logique inversée et dangereuse. Les données de production ont une valeur métier — on ne les supprime pas pour économiser de l\'espace de stockage. On gère l\'espace de stockage des sauvegardes, pas la quantité de données à sauvegarder.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'sauv-m04',
        titre: 'La Redondance de Données — RAID',
        cas: [
          {
            id: 'cas-sauv-007',
            titre: 'Choisir le bon niveau RAID selon les besoins',
            difficulte: 'facile',
            format: 'scenario',
            objectif: 'Comprendre les différents niveaux RAID et choisir le plus adapté selon les besoins de performance, redondance et capacité',
            contexte: 'Vous dimensionnez le stockage pour trois serveurs avec des besoins différents. Vous disposez de disques de 4 TB identiques.',
            contenu: {
              etapes: [
                {
                  description: 'Serveur 1 : serveur de bases de données avec 4 disques disponibles. Priorité : performances maximales en lecture/écriture ET tolérance à la panne d\'un disque. Quel RAID ?',
                  choix: [
                    { texte: 'RAID 10 (1+0) : stripping de 2 miroirs — combine les performances du RAID 0 et la redondance du RAID 1. Tolère la panne de 1 disque par miroir', correct: true, feedback: 'RAID 10 est le choix optimal pour les bases de données ! Performances élevées (lecture parallèle sur 2 disques, écriture simultanée sur les miroirs) + redondance (chaque disque est mirroré). Avec 4 disques de 4 TB : capacité utile = 8 TB (50% d\'efficacité), tolère 1-2 pannes selon quels disques tombent. Inconvénient : coût élevé (50% d\'efficacité).' },
                    { texte: 'RAID 5 avec 4 disques : meilleur compromis performances/capacité/redondance', correct: false, feedback: 'RAID 5 est bon pour les usages généraux mais moins adapté aux bases de données : les écritures génèrent le problème du "write hole" (pénalité de parité) et les reconstructions sont longues et risquées sur les grosses bases. RAID 10 est préféré pour les charges I/O intensives comme les SGBD.' },
                    { texte: 'RAID 0 : performances maximales sans gaspillage d\'espace', correct: false, feedback: 'RAID 0 offre les meilleures performances mais AUCUNE redondance — une seule panne de disque perd TOUTES les données. Pour un serveur de bases de données, la tolérance aux pannes est indispensable. RAID 0 est à proscrire pour tout stockage de données importantes.' }
                  ]
                },
                {
                  description: 'Serveur 2 : serveur de fichiers avec 6 disques. Priorité : capacité utile maximale avec tolérance à la panne de 2 disques simultanément. Quel RAID ?',
                  choix: [
                    { texte: 'RAID 6 : parité double — tolère 2 pannes simultanées, capacité utile = (n-2) disques', correct: true, feedback: 'RAID 6 est idéal ! Avec 6 disques de 4 TB : capacité utile = 4 × 4 TB = 16 TB (66% d\'efficacité), tolère 2 pannes simultanées. Pendant la reconstruction d\'un premier disque (24-48h pour un disque de 4 TB), un second disque peut tomber sans perte de données. Recommandé pour les NAS/serveurs de fichiers avec des disques de grande capacité (les reconstructions longues augmentent le risque de double panne).' },
                    { texte: 'RAID 5 : plus efficace en espace qu\'un RAID 6', correct: false, feedback: 'RAID 5 tolère seulement 1 panne. Avec 6 disques, pendant la reconstruction (~48h pour un disque de 4 TB sous charge), une seconde panne serait catastrophique (perte totale). Pour un serveur de fichiers principal avec des disques de grande capacité, RAID 6 est fortement recommandé.' },
                    { texte: 'RAID 1 (miroir) : la redondance maximale', correct: false, feedback: 'RAID 1 sur 6 disques serait soit 3 miroirs (3 paires), donnant seulement 12 TB utiles au lieu de 16 TB avec RAID 6, soit une implémentation complexe. RAID 6 offre un meilleur équilibre capacité/redondance pour un serveur de fichiers à 6 disques.' }
                  ]
                },
                {
                  description: 'Serveur 3 : un disque RAID 5 (sur 4 disques) tombe en panne un vendredi soir. L\'administrateur décide d\'attendre lundi pour commander le disque de remplacement. Quel est le risque ?',
                  choix: [
                    { texte: 'Risque élevé : en mode dégradé tout le week-end, une seconde panne de disque détruirait toutes les données. De plus, le RAID dégradé subit une charge I/O plus élevée qui stresse les disques restants', correct: true, feedback: 'C\'est exactement le risque ! Un RAID 5 avec 1 disque en panne n\'a PLUS DE REDONDANCE. Chaque lecture doit recalculer les données manquantes (lecture des 3 disques restants + calcul de parité = charge 3× plus élevée). Cette charge augmente le risque de panne d\'un second disque pendant le week-end. Ayez toujours un ou deux disques de rechange en stock (hot spare) pour les disques critiques.' },
                    { texte: 'Aucun risque — RAID 5 tolère la panne d\'un disque, attendre est acceptable', correct: false, feedback: 'RAID 5 tolère la panne d\'UN disque mais plus d\'une seconde panne. Le mode dégradé n\'est pas un état "sûr" — c\'est un état d\'urgence. Plus le temps en mode dégradé est long, plus le risque de double panne augmente. Ne jamais laisser un RAID en mode dégradé sans remplacer le disque le plus vite possible.' },
                    { texte: 'Le RAID 5 peut fonctionner définitivement avec 3 disques sur 4', correct: false, feedback: 'RAID 5 avec 1 disque manquant fonctionne en "dégradé" mais recalcule chaque bloc de données à la volée — les performances sont dégradées et les disques restants sont sursollicités. Ce n\'est pas un état permanent acceptable. Remplacez le disque et reconstruisez le RAID.' }
                  ]
                }
              ]
            }
          },
          {
            id: 'cas-sauv-008',
            titre: 'Surveiller et reconstruire un RAID défaillant',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Utiliser les outils Linux pour surveiller l\'état d\'un RAID logiciel (mdadm) et gérer la reconstruction',
            contexte: 'Un serveur Linux utilise un RAID 5 logiciel mdadm avec 4 disques (/dev/sda, sdb, sdc, sdd). Une alerte indique qu\'un disque est en état "failed". Vous devez diagnostiquer et remplacer le disque.',
            contenu: {
              prompt: 'root@srv-backup:~# ',
              commandes: {
                'help': 'Commandes : mdadm --detail, mdadm --manage, mdadm --add, cat /proc/mdstat, smartctl',
                'cat /proc/mdstat': 'Personalities : [raid5]\nmd0 : active raid5 sda[0] sdb[1] sdd[3](F) sdc[2]\n      5860532224 blocks super 1.2 level 5, 512k chunk, algorithm 2 [4/3] [UUU_]\n      \nbitmap: 2/3 pages [8KB], 65536KB chunk',
                'mdadm --detail /dev/md0': '/dev/md0:\n           Version : 1.2\n     Creation Time : Mon Jan 6 09:15:22 2025\n        Raid Level : raid5\n        Array Size : 5860532224 (5.46 TiB)\n     Used Dev Size : 1953510912 (1.82 TiB)\n      Raid Devices : 4\n     Total Devices : 4\n       Persistence : Superblock is persistent\n\n     Update Time : Sat Mar 21 04:23:11 2026\n           State : clean, degraded\n  Active Devices : 3\n Working Devices : 3\n  Failed Devices : 1\n   Spare Devices : 0\n\n          Layout : left-symmetric\n      Chunk Size : 512K\n\nConsistency Policy : resync\n\n    Name : srv-backup:0\n    UUID : a1b2c3d4:e5f6a7b8:c9d0e1f2:a3b4c5d6\n    Events : 1247\n\n    Number   Major   Minor   RaidDevice State\n       0     8       0        0      active sync   /dev/sda\n       1     8       16       1      active sync   /dev/sdb\n       -     0       0        -      removed       \n       2     8       32       3      active sync   /dev/sdc\n\n       3     8       48       -      faulty   /dev/sdd',
                'smartctl -a /dev/sdd': 'smartctl 7.3 2022-02-28 r5338 [x86_64-linux-5.15.0] (local build)\nDevice Model:     ST2000DM008-2FR102\nSerial Number:    ZFL3ABCD\nFirmware Version: 0001\nUser Capacity:    2,000,398,934,016 bytes [2.00 TB]\nSMART overall-health self-assessment test result: FAILED!\nDrive failure expected in less than 24 hours. SAVE ALL DATA.\n197 Current_Pending_Sector  0x0032   100   100   000    Old_age   Always       -       47\n198 Offline_Uncorrectable   0x0030   100   100   000    Old_age   Offline      -       15',
                'mdadm --manage /dev/md0 --fail /dev/sdd': 'mdadm: set /dev/sdd faulty in /dev/md0',
                'mdadm --manage /dev/md0 --remove /dev/sdd': 'mdadm: hot removed /dev/sdd from /dev/md0',
                'mdadm --manage /dev/md0 --add /dev/sde': 'mdadm: added /dev/sde\nRecovery: 0% (0/1953510912) finish=187.3min speed=173694K/sec',
                'cat /proc/mdstat': 'Personalities : [raid5]\nmd0 : active raid5 sdb[1] sde[4] sda[0] sdc[2]\n      5860532224 blocks super 1.2 level 5, 512k chunk, algorithm 2 [4/3] [UUU_]\n      [==>..................]  recovery = 12.3% (240000/1953510) finish=45.2min speed=700000K/sec\n\nbitmap: 2/3 pages [8KB], 65536KB chunk'
              },
              validation: ['cat /proc/mdstat', 'mdadm --detail', 'smartctl', 'mdadm --manage --remove', 'mdadm --manage --add'],
              indices: [
                'cat /proc/mdstat donne l\'état global du RAID — cherchez [UUU_] pour un disque manquant',
                'mdadm --detail /dev/md0 donne les détails et identifie le disque "faulty"',
                'smartctl -a /dev/sdd vérifie la santé SMART du disque défaillant',
                'Séquence de remplacement : --fail → --remove → (physiquement changer le disque) → --add /dev/sde'
              ],
              solution: [
                'cat /proc/mdstat',
                'mdadm --detail /dev/md0',
                'smartctl -a /dev/sdd',
                'mdadm --manage /dev/md0 --fail /dev/sdd',
                'mdadm --manage /dev/md0 --remove /dev/sdd',
                'mdadm --manage /dev/md0 --add /dev/sde',
                'cat /proc/mdstat'
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'services-reseau-linux',
    titre: 'Services réseau Linux',
    emoji: '🐧',
    modules: [
      {
        id: 'srvlinux-m01',
        titre: 'Adressage réseau',
        cas: [
          {
            id: 'cas-srl-001',
            titre: 'Configurer une interface réseau statique sous Debian',
            difficulte: 'facile',
            format: 'terminal',
            objectif: 'Configurer une adresse IP statique, une passerelle et des serveurs DNS sur Debian/Ubuntu via les fichiers de configuration',
            contexte: 'Vous devez configurer une adresse IP statique sur le serveur Debian 12 (interface ens3) : IP 192.168.10.50/24, passerelle 192.168.10.1, DNS 8.8.8.8 et 1.1.1.1.',
            contenu: {
              prompt: 'root@debian:~# ',
              commandes: {
                'help': 'Commandes disponibles : ip addr, ip link, ip route, cat /etc/network/interfaces, nano /etc/network/interfaces, systemctl restart networking, ping',
                'ip addr show ens3': '2: ens3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000\n    link/ether 52:54:00:ab:cd:ef brd ff:ff:ff:ff:ff:ff\n    inet 192.168.10.100/24 brd 192.168.10.255 scope global dynamic ens3\n       valid_lft 85234sec preferred_lft 85234sec',
                'cat /etc/network/interfaces': '# This file describes the network interfaces available on your system\n# and how to activate them. For more information, see interfaces(5).\n\nsource /etc/network/interfaces.d/*\n\n# The loopback network interface\nauto lo\niface lo inet loopback\n\n# The primary network interface\nauto ens3\niface ens3 inet dhcp',
                'nano /etc/network/interfaces': '[Édition du fichier — contenu après sauvegarde :\nauto lo\niface lo inet loopback\n\nauto ens3\niface ens3 inet static\n    address 192.168.10.50\n    netmask 255.255.255.0\n    gateway 192.168.10.1\n    dns-nameservers 8.8.8.8 1.1.1.1]',
                'systemctl restart networking': '[  OK  ] Restarting networking...',
                'ip addr show ens3': '2: ens3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000\n    link/ether 52:54:00:ab:cd:ef brd ff:ff:ff:ff:ff:ff\n    inet 192.168.10.50/24 brd 192.168.10.255 scope global ens3\n       valid_lft forever preferred_lft forever',
                'ip route show': 'default via 192.168.10.1 dev ens3\n192.168.10.0/24 dev ens3 proto kernel scope link src 192.168.10.50',
                'ping -c 3 192.168.10.1': 'PING 192.168.10.1 (192.168.10.1) 56(84) bytes of data.\n64 bytes from 192.168.10.1: icmp_seq=1 ttl=64 time=0.8 ms\n64 bytes from 192.168.10.1: icmp_seq=2 ttl=64 time=0.7 ms\n64 bytes from 192.168.10.1: icmp_seq=3 ttl=64 time=0.9 ms\n--- 192.168.10.1 ping statistics ---\n3 packets transmitted, 3 received, 0% packet loss'
              },
              validation: ['nano /etc/network/interfaces', 'systemctl restart networking', 'ip addr show', 'ip route show', 'ping'],
              indices: [
                'Éditez /etc/network/interfaces : remplacez "inet dhcp" par "inet static"',
                'Ajoutez : address, netmask, gateway, dns-nameservers',
                'Redémarrez le réseau : systemctl restart networking',
                'Vérifiez avec ip addr show et ip route show'
              ],
              solution: [
                'nano /etc/network/interfaces',
                '# Modifier ens3 : dhcp → static, ajouter address/netmask/gateway/dns-nameservers',
                'systemctl restart networking',
                'ip addr show ens3',
                'ip route show',
                'ping -c 3 192.168.10.1'
              ]
            }
          },
          {
            id: 'cas-srl-002',
            titre: 'Diagnostiquer une perte de connectivité réseau Linux',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Utiliser les outils réseau Linux pour diagnostiquer méthodiquement une perte de connectivité',
            contexte: 'Un serveur Debian ne peut plus accéder à Internet après une mise à jour. Les services locaux fonctionnent mais le ping vers 8.8.8.8 échoue.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Ping vers 8.8.8.8 échoue. Quelle est la première vérification de la couche réseau ?',
                  choix: [
                    { texte: 'ip addr show — vérifier que l\'interface est UP et a bien une adresse IP', suite: 'n2' },
                    { texte: 'Redémarrer le serveur immédiatement', suite: 'n_bad1' },
                    { texte: 'Réinstaller le paquet iproute2', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'ip addr show montre ens3 UP avec l\'IP 192.168.10.50/24. Mais ip route show ne montre aucune route par défaut (default via ...). Que faire ?',
                  choix: [
                    { texte: 'Ajouter la route par défaut manquante : ip route add default via 192.168.10.1 — puis vérifier /etc/network/interfaces pour la persistance', suite: 'n3' },
                    { texte: 'Désactiver et réactiver l\'interface : ip link set ens3 down && ip link set ens3 up', suite: 'n_bad3' },
                    { texte: 'Changer l\'adresse IP du serveur', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'La route par défaut est ajoutée, le ping vers 8.8.8.8 fonctionne. Mais ping 8.8.8.8 fonctionne tandis que ping google.com échoue avec "Name or service not known". Quelle est la cause ?',
                  choix: [
                    { texte: 'La résolution DNS ne fonctionne pas — vérifier /etc/resolv.conf et s\'assurer qu\'un nameserver est configuré', suite: 'n4' },
                    { texte: 'Google.com est hors ligne', suite: 'n_bad5' },
                    { texte: 'Le protocole HTTP est bloqué par un pare-feu', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'Connectivité complète rétablie',
                  explication: 'Diagnostic en couches : 1) Couche 3 (IP) : ip addr → interface UP avec IP. 2) Routage : ip route → route par défaut manquante → ip route add default via 192.168.10.1 + ajouter gateway dans /etc/network/interfaces. 3) DNS : ping IP OK mais ping nom KO → /etc/resolv.conf vide ou incorrect → ajouter "nameserver 8.8.8.8". Cause probable : la mise à jour a réécrit /etc/resolv.conf. Sur Debian moderne avec systemd-resolved, vérifiez aussi resolvectl status.'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'Redémarrage sans diagnostic',
                  explication: 'Redémarrer sans avoir identifié la cause peut résoudre temporairement le problème si la route par défaut est dans /etc/network/interfaces, mais vous ne saurez pas ce qui a changé. De plus, si la mise à jour a modifié resolv.conf, le redémarrage ne corrigera pas nécessairement le DNS.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'iproute2 fonctionne — ip addr répond',
                  explication: 'Le fait que ip addr show fonctionne prouve que iproute2 est installé et opérationnel. Réinstaller un paquet fonctionnel est inutile et ne résout pas un problème de configuration réseau.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'Désactiver/réactiver l\'interface ne restaure pas une route manquante',
                  explication: 'ip link down/up redémarre l\'interface mais si /etc/network/interfaces ne contient pas de gateway, la route par défaut ne sera pas rajoutée. ip link ne modifie pas la table de routage. Il faut explicitement ajouter la route ou corriger la configuration.'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'L\'IP du serveur n\'est pas le problème',
                  explication: 'L\'IP est présente et correcte. La connexion locale fonctionne (services locaux OK). Le problème est la route par défaut manquante pour atteindre Internet — pas l\'adresse IP du serveur.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'Google.com n\'est pas hors ligne',
                  explication: 'Ping 8.8.8.8 (IP directe de Google DNS) fonctionne, prouvant que Google est joignable par IP. "Name or service not known" est une erreur de résolution DNS locale, pas une indisponibilité de Google.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'HTTP ne résout pas les noms — c\'est le DNS',
                  explication: '"Name or service not known" est une erreur de résolution de nom (DNS), pas un blocage HTTP. Le pare-feu qui bloque HTTP donnerait une erreur de connexion TCP (Connection refused ou timeout) après que le nom soit résolu. Ici le problème est en amont : la résolution DNS échoue.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'srvlinux-m02',
        titre: 'Routage et traduction d\'adresses',
        cas: [
          {
            id: 'cas-srl-003',
            titre: 'Configurer le NAT avec iptables sur Linux',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Configurer un routeur Linux avec iptables pour faire du masquerading (NAT) et permettre à un réseau privé d\'accéder à Internet',
            contexte: 'Un serveur Linux (SRV-GW) a deux interfaces : ens3 (WAN, IP publique 203.0.113.10) et ens4 (LAN, 192.168.1.1/24). Configurez-le comme passerelle NAT pour le réseau LAN.',
            contenu: {
              prompt: 'root@srv-gw:~# ',
              commandes: {
                'help': 'Commandes : sysctl, iptables, ip route, cat /proc/sys/net/ipv4/ip_forward, iptables-save, iptables-restore',
                'cat /proc/sys/net/ipv4/ip_forward': '0',
                'sysctl -w net.ipv4.ip_forward=1': 'net.ipv4.ip_forward = 1',
                'echo "net.ipv4.ip_forward=1" >> /etc/sysctl.conf': '',
                'iptables -t nat -A POSTROUTING -o ens3 -j MASQUERADE': '',
                'iptables -A FORWARD -i ens4 -o ens3 -j ACCEPT': '',
                'iptables -A FORWARD -i ens3 -o ens4 -m state --state RELATED,ESTABLISHED -j ACCEPT': '',
                'iptables -t nat -L POSTROUTING': 'Chain POSTROUTING (policy ACCEPT)\ntarget     prot opt source               destination\nMASQUERADE  all  --  anywhere             anywhere',
                'iptables -L FORWARD': 'Chain FORWARD (policy DROP)\ntarget     prot opt source               destination\nACCEPT     all  --  anywhere             anywhere\nACCEPT     all  --  anywhere             anywhere             state RELATED,ESTABLISHED',
                'iptables-save > /etc/iptables/rules.v4': '',
                'ping -c 2 -I ens4 8.8.8.8': 'PING 8.8.8.8 (8.8.8.8) from 192.168.1.1 ens4: 56(84) bytes of data.\n64 bytes from 8.8.8.8: icmp_seq=1 ttl=56 time=12.3 ms\n64 bytes from 8.8.8.8: icmp_seq=2 ttl=56 time=11.8 ms'
              },
              validation: ['sysctl -w net.ipv4.ip_forward=1', 'iptables -t nat -A POSTROUTING', 'MASQUERADE', 'iptables -A FORWARD', 'iptables-save'],
              indices: [
                'Activez le forwarding IP : sysctl -w net.ipv4.ip_forward=1 (et persistez dans /etc/sysctl.conf)',
                'Règle NAT masquerade : iptables -t nat -A POSTROUTING -o <iface_WAN> -j MASQUERADE',
                'Autorisez le forward LAN→WAN : iptables -A FORWARD -i ens4 -o ens3 -j ACCEPT',
                'Autorisez le retour WAN→LAN (connexions établies) : -m state --state RELATED,ESTABLISHED -j ACCEPT',
                'Sauvegardez avec iptables-save'
              ],
              solution: [
                'sysctl -w net.ipv4.ip_forward=1',
                'echo "net.ipv4.ip_forward=1" >> /etc/sysctl.conf',
                'iptables -t nat -A POSTROUTING -o ens3 -j MASQUERADE',
                'iptables -A FORWARD -i ens4 -o ens3 -j ACCEPT',
                'iptables -A FORWARD -i ens3 -o ens4 -m state --state RELATED,ESTABLISHED -j ACCEPT',
                'iptables -t nat -L POSTROUTING',
                'iptables-save > /etc/iptables/rules.v4'
              ]
            }
          },
          {
            id: 'cas-srl-004',
            titre: 'Diagnostiquer un problème de routage inter-VLAN',
            difficulte: 'difficile',
            format: 'arbre',
            objectif: 'Identifier pourquoi deux VLANs ne communiquent pas via un routeur Linux et corriger la configuration',
            contexte: 'Un serveur Linux fait le routage inter-VLAN entre VLAN 10 (192.168.10.0/24) et VLAN 20 (192.168.20.0/24) via des interfaces virtuelles (ens4.10 et ens4.20). Les postes des deux VLANs ne peuvent pas communiquer.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Les deux VLANs ne communiquent pas via le routeur Linux. Quelle vérification en priorité ?',
                  choix: [
                    { texte: 'ip addr show — vérifier que les interfaces VLAN (ens4.10 et ens4.20) existent et ont les bonnes IPs', suite: 'n2' },
                    { texte: 'Vérifier la configuration du switch en premier', suite: 'n_bad1' },
                    { texte: 'Redémarrer le service réseau', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'ip addr show montre ens4.10 (192.168.10.1/24) et ens4.20 (192.168.20.0/24) toutes deux UP. ip route show affiche les deux réseaux. Mais un poste VLAN 10 ne peut pas pinguer un poste VLAN 20. Que vérifier ?',
                  choix: [
                    { texte: 'cat /proc/sys/net/ipv4/ip_forward — vérifier que le forwarding IP est activé', suite: 'n3' },
                    { texte: 'Vérifier que les postes ont des IPs correctes dans leur VLAN', suite: 'n_bad3' },
                    { texte: 'Ajouter une route statique entre les deux VLANs', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'cat /proc/sys/net/ipv4/ip_forward retourne 0. Vous activez le forwarding. Maintenant le ping fonctionne depuis VLAN 10 vers VLAN 20 mais pas dans le sens inverse. Quelle est la cause ?',
                  choix: [
                    { texte: 'La passerelle par défaut des postes VLAN 20 ne pointe pas vers 192.168.20.1 (l\'interface VLAN 20 du routeur Linux)', suite: 'n4' },
                    { texte: 'Le firewall du routeur Linux bloque le sens VLAN 20→10', suite: 'n_bad5' },
                    { texte: 'Les postes VLAN 20 doivent utiliser une adresse IP différente', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'Routage inter-VLAN fonctionnel dans les deux sens',
                  explication: 'Deux problèmes résolus : 1) ip_forward=0 → le noyau Linux ne routait pas entre les interfaces malgré les routes correctes. Activation : sysctl -w net.ipv4.ip_forward=1 (persistance dans /etc/sysctl.conf). 2) Passerelle VLAN 20 incorrecte → les postes VLAN 20 envoyaient les réponses vers une passerelle inexistante ou incorrecte. Chaque VLAN doit avoir comme passerelle l\'IP de l\'interface VLAN correspondante du routeur Linux (VLAN 10 → 192.168.10.1, VLAN 20 → 192.168.20.1).'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'Le switch peut fonctionner correctement',
                  explication: 'Si les interfaces VLAN du routeur Linux sont UP et reçoivent le trafic, le switch envoie bien les trames taguées. Commencez par vérifier la configuration du routeur Linux avant de passer au switch.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'Redémarrer sans diagnostic ne résout pas ip_forward=0',
                  explication: 'Si ip_forward n\'est pas configuré dans /etc/sysctl.conf, il reste à 0 après chaque redémarrage. Redémarrer le service réseau ne modifie pas les paramètres sysctl.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'Les IPs des postes sont probablement correctes',
                  explication: 'Si le problème venait des IPs des postes, le ping depuis les postes vers leur passerelle locale échouerait aussi. Or l\'énoncé dit que la communication inter-VLAN échoue — les postes atteignent probablement leur passerelle locale. Le problème est côté routeur (ip_forward désactivé).'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'Routes déjà présentes dans ip route show',
                  explication: 'ip route show montre déjà les deux réseaux VLAN en routes connectées. Le problème n\'est pas les routes mais le forwarding IP désactivé (ip_forward=0). Ajouter des routes statiques ne changera rien si le noyau ne forward pas les paquets entre interfaces.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'Un firewall asymétrique est possible mais moins probable ici',
                  explication: 'Un firewall iptables asymétrique pourrait causer ce symptôme, mais c\'est moins fréquent qu\'une mauvaise passerelle. Vérifiez d\'abord la configuration réseau des postes VLAN 20 (passerelle) avant d\'investiguer les règles iptables.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'Les IPs VLAN 20 ne doivent pas changer',
                  explication: 'La plage 192.168.20.0/24 est correcte pour VLAN 20. Changer les IPs des postes ne résoudra pas un problème de passerelle incorrecte ou de ip_forward désactivé. La configuration IP est cohérente — c\'est la passerelle manquante qui bloque le retour.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'srvlinux-m03',
        titre: 'Administration à distance',
        cas: [
          {
            id: 'cas-srl-005',
            titre: 'Sécuriser l\'accès SSH à un serveur Linux',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Configurer SSH avec authentification par clé, désactiver l\'accès root, et renforcer la configuration sshd',
            contexte: 'Vous devez sécuriser l\'accès SSH d\'un serveur Debian exposé sur Internet : désactiver l\'authentification par mot de passe, imposer les clés SSH, désactiver la connexion root directe, et changer le port.',
            contenu: {
              prompt: 'root@srv-web:~# ',
              commandes: {
                'help': 'Commandes : ssh-keygen, ssh-copy-id, nano /etc/ssh/sshd_config, systemctl reload sshd, sshd -t, grep',
                'ssh-keygen -t ed25519 -C "admin@poste-admin"': 'Generating public/private ed25519 key pair.\nEnter file in which to save the key (/root/.ssh/id_ed25519): \nEnter passphrase (empty for no passphrase): ****\nEnter same passphrase again: ****\nYour identification has been saved in /root/.ssh/id_ed25519\nYour public key has been saved in /root/.ssh/id_ed25519.pub\nThe key fingerprint is:\nSHA256:aBcDeFgHiJkLmNoPqRsTuVwXyZ admin@poste-admin',
                'ssh-copy-id -i ~/.ssh/id_ed25519.pub admin@192.168.10.50': 'Number of key(s) added: 1\nNow try logging into the machine with: ssh \'admin@192.168.10.50\'',
                'grep -E "^(Port|PermitRootLogin|PasswordAuthentication|PubkeyAuthentication)" /etc/ssh/sshd_config': '#Port 22\n#PermitRootLogin prohibit-password\n#PasswordAuthentication yes\n#PubkeyAuthentication yes',
                'nano /etc/ssh/sshd_config': '[Modifications : Port 2222 / PermitRootLogin no / PasswordAuthentication no / PubkeyAuthentication yes]',
                'sshd -t': '[Pas d\'erreur — configuration valide]',
                'systemctl reload sshd': '',
                'grep -E "^(Port|PermitRootLogin|PasswordAuthentication|PubkeyAuthentication)" /etc/ssh/sshd_config': 'Port 2222\nPermitRootLogin no\nPasswordAuthentication no\nPubkeyAuthentication yes',
                'ss -tlnp | grep sshd': 'LISTEN 0      128          0.0.0.0:2222      0.0.0.0:*    users:((\"sshd\",pid=1234,fd=3))\nLISTEN 0      128             [::]:2222         [::]:*    users:((\"sshd\",pid=1234,fd=4))'
              },
              validation: ['ssh-keygen', 'nano /etc/ssh/sshd_config', 'PermitRootLogin no', 'PasswordAuthentication no', 'sshd -t', 'systemctl reload sshd'],
              indices: [
                'Générez une paire de clés ED25519 : ssh-keygen -t ed25519',
                'Copiez la clé publique sur le serveur : ssh-copy-id',
                'Modifiez /etc/ssh/sshd_config : Port 2222, PermitRootLogin no, PasswordAuthentication no',
                'Testez la config avant de recharger : sshd -t (ne rechargez jamais sans tester !)',
                'Rechargez : systemctl reload sshd'
              ],
              solution: [
                'ssh-keygen -t ed25519 -C "admin@poste-admin"',
                'ssh-copy-id -i ~/.ssh/id_ed25519.pub admin@192.168.10.50',
                'nano /etc/ssh/sshd_config',
                'sshd -t',
                'systemctl reload sshd',
                'ss -tlnp | grep sshd'
              ]
            }
          },
          {
            id: 'cas-srl-006',
            titre: 'Résoudre un échec de connexion SSH',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Diagnostiquer les causes courantes d\'échec SSH et les résoudre',
            contexte: 'Un administrateur ne peut plus se connecter en SSH à un serveur distant. La connexion tente de s\'établir puis retourne "Connection refused" ou "Permission denied (publickey)".',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: '"Connection refused" — quelle est la cause la plus probable ?',
                  choix: [
                    { texte: 'Le service sshd n\'est pas démarré ou écoute sur un port différent (ex: 2222 au lieu de 22)', suite: 'n2' },
                    { texte: 'Le mot de passe de l\'utilisateur est incorrect', suite: 'n_bad1' },
                    { texte: 'Le serveur est hors ligne', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'Via la console (accès hors bande), vous vérifiez : sshd est actif et écoute sur le port 2222. Votre commande ssh utilise le port 22 par défaut. Après correction du port, vous obtenez "Permission denied (publickey)". Que vérifier ?',
                  choix: [
                    { texte: 'Vérifier que la clé publique de l\'administrateur est bien dans ~/.ssh/authorized_keys sur le serveur ET que les permissions sont correctes (700 sur .ssh, 600 sur authorized_keys)', suite: 'n3' },
                    { texte: 'Réinstaller OpenSSH-server sur le serveur', suite: 'n_bad3' },
                    { texte: 'Désactiver temporairement l\'authentification par clé', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'La clé est présente dans authorized_keys mais les permissions du répertoire .ssh sont 755 (au lieu de 700). SSH refuse la connexion pour raison de sécurité. Comment corriger ?',
                  choix: [
                    { texte: 'chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys — SSH exige des permissions strictes sur ces fichiers', suite: 'n4' },
                    { texte: 'Désactiver la vérification des permissions dans sshd_config (StrictModes no)', suite: 'n_bad5' },
                    { texte: 'Supprimer et recréer le répertoire .ssh', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'Connexion SSH rétablie',
                  explication: 'Deux problèmes résolus : 1) Port non standard (2222) → toujours vérifier le port avec ss -tlnp | grep sshd avant de conclure à une panne. Utiliser ssh -p 2222. 2) Permissions .ssh incorrectes → SSH refuse par sécurité si .ssh est lisible par d\'autres (755 au lieu de 700). Permissions requises : .ssh = 700, authorized_keys = 600, id_rsa (clé privée) = 600. Commande de diagnostic utile : ssh -vvv user@host pour voir les détails de la négociation.'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: '"Connection refused" n\'est pas lié au mot de passe',
                  explication: '"Connection refused" signifie que la connexion TCP est rejetée par le serveur — sshd n\'écoute pas sur ce port, ou un pare-feu bloque. Un problème de mot de passe donnerait "Permission denied (password)" APRÈS que la connexion TCP soit établie.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'Si le serveur était hors ligne, ping échouerait aussi',
                  explication: 'Si le serveur était complètement hors ligne, tous les protocoles réseau échoueraient (ping, HTTP, etc.). "Connection refused" est une réponse active du serveur — il est en ligne mais sshd n\'écoute pas sur le port 22.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'SSH fonctionne — c\'est la clé ou les permissions',
                  explication: 'Le serveur répond et refuse la connexion avec un message spécifique (publickey). Cela prouve que SSH fonctionne correctement — le problème est dans la configuration de la clé ou les permissions, pas dans l\'installation d\'OpenSSH.'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'Désactiver la sécurité n\'est pas une solution',
                  explication: 'Si PasswordAuthentication est à "no" dans sshd_config (comme recommandé pour un serveur exposé), réactiver les mots de passe pour contourner un problème de clé crée une vulnérabilité. Résolvez le problème de clé (présence dans authorized_keys, permissions) plutôt que de dégrader la sécurité.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'StrictModes no est une désactivation de sécurité',
                  explication: 'StrictModes vérifie les permissions des fichiers SSH pour empêcher les connexions si les fichiers sont trop permissifs (risque d\'écriture par d\'autres utilisateurs). Désactiver StrictModes résout le symptôme mais laisse une vulnérabilité : un attaquant qui peut écrire dans ~/.ssh peut injecter sa propre clé. Corrigez les permissions avec chmod.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'Supprimer .ssh efface les clés autorisées',
                  explication: 'Supprimer ~/.ssh supprime authorized_keys — la connexion par clé sera impossible jusqu\'à ce que la clé publique soit de nouveau ajoutée. Un simple chmod 700 ~/.ssh corrige les permissions sans perdre les clés configurées.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'srvlinux-m04',
        titre: 'DNS Résolveur',
        cas: [
          {
            id: 'cas-srl-007',
            titre: 'Configurer un résolveur DNS avec BIND9',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Installer et configurer BIND9 comme résolveur DNS récursif pour un réseau local sous Debian',
            contexte: 'Vous devez configurer un serveur DNS résolveur sur SRV-DNS (192.168.1.2) pour le réseau interne 192.168.1.0/24. Il doit résoudre les noms publics en interrogeant les serveurs racine et répondre uniquement aux clients du LAN.',
            contenu: {
              prompt: 'root@srv-dns:~# ',
              commandes: {
                'help': 'Commandes : apt install, named-checkconf, named-checkzone, systemctl, dig, nslookup',
                'apt install -y bind9 bind9-utils bind9-doc': 'Lecture des listes de paquets... Fait\nConstruction de l\'arbre des dépendances... Fait\nbind9 est déjà la version la plus récente (1:9.18.24-1~deb12u1)\nTraitement des actions différées (« triggers ») pour man-db...',
                'nano /etc/bind/named.conf.options': '[Édition — contenu après sauvegarde :\noptions {\n    directory "/var/cache/bind";\n    recursion yes;\n    allow-query { 192.168.1.0/24; localhost; };\n    allow-recursion { 192.168.1.0/24; localhost; };\n    forwarders {\n        8.8.8.8;\n        1.1.1.1;\n    };\n    dnssec-validation auto;\n    listen-on { 192.168.1.2; localhost; };\n};\n]',
                'named-checkconf': '[Pas de sortie = configuration valide]',
                'systemctl restart bind9': '',
                'systemctl status bind9': '● bind9.service - BIND Domain Name Server\n     Loaded: loaded (/lib/systemd/system/bind9.service; enabled)\n     Active: active (running) since Sat 2026-03-21 14:30:00 CET; 3s ago\n   Main PID: 1234 (named)\n      Tasks: 5\n     Memory: 28.5M\n        CPU: 245ms',
                'dig @192.168.1.2 google.com': '; <<>> DiG 9.18.24 <<>> @192.168.1.2 google.com\n;; ANSWER SECTION:\ngoogle.com.             300     IN      A       142.250.74.46\n;; Query time: 45 msec\n;; SERVER: 192.168.1.2#53(192.168.1.2)',
                'dig @192.168.1.2 google.com +short': '142.250.74.46',
                'dig @192.168.1.2 google.com +short +time=2': '142.250.74.46\n;; Query time: 1 msec  [depuis le cache]'
              },
              validation: ['apt install bind9', 'nano /etc/bind/named.conf.options', 'allow-query', 'allow-recursion', 'named-checkconf', 'systemctl restart bind9', 'dig'],
              indices: [
                'Installez BIND9 : apt install -y bind9 bind9-utils',
                'Configurez /etc/bind/named.conf.options : recursion yes, allow-query, allow-recursion pour le LAN',
                'Ajoutez des forwarders (8.8.8.8) pour les requêtes externes',
                'Vérifiez la config : named-checkconf (aucune sortie = OK)',
                'Testez avec dig @192.168.1.2 google.com'
              ],
              solution: [
                'apt install -y bind9 bind9-utils bind9-doc',
                'nano /etc/bind/named.conf.options',
                'named-checkconf',
                'systemctl restart bind9',
                'systemctl status bind9',
                'dig @192.168.1.2 google.com +short'
              ]
            }
          },
          {
            id: 'cas-srl-008',
            titre: 'Diagnostiquer une panne de résolution DNS',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Utiliser dig et nslookup pour diagnostiquer les problèmes de résolution DNS courants',
            contexte: 'Les utilisateurs du réseau interne signalent que certains sites web ne se chargent plus (ERR_NAME_NOT_RESOLVED) depuis ce matin. D\'autres sites fonctionnent normalement.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Certains noms se résolvent, d\'autres non. Quelle commande pour tester la résolution DNS en détail ?',
                  choix: [
                    { texte: 'dig @192.168.1.2 <nom-problème> pour tester directement le serveur DNS interne et voir le détail de la réponse', suite: 'n2' },
                    { texte: 'Redémarrer le service bind9 directement', suite: 'n_bad1' },
                    { texte: 'Vider le cache DNS des navigateurs des postes clients', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'dig @192.168.1.2 google.com retourne SERVFAIL. dig @8.8.8.8 google.com fonctionne. Que cela indique-t-il ?',
                  choix: [
                    { texte: 'Le serveur DNS interne (BIND9) a un problème — il ne peut pas résoudre ou forwarder les requêtes. Vérifier les logs BIND9 et la connectivité vers les forwarders', suite: 'n3' },
                    { texte: 'google.com est en panne', suite: 'n_bad3' },
                    { texte: 'Le réseau interne est saturé', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'journalctl -u bind9 montre : "network unreachable resolving \'google.com/A/IN\'". Le serveur DNS ne peut pas joindre ses forwarders (8.8.8.8). Pourquoi ?',
                  choix: [
                    { texte: 'La connexion Internet du serveur DNS est coupée ou sa passerelle par défaut est incorrecte — vérifier ip route et ping 8.8.8.8 depuis le serveur DNS', suite: 'n4' },
                    { texte: 'BIND9 est mal configuré — réinstaller', suite: 'n_bad5' },
                    { texte: 'Les forwarders 8.8.8.8 et 1.1.1.1 sont tombés en panne', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'Panne DNS identifiée et résolue',
                  explication: 'Diagnostic en couches : 1) dig @DNS_interne → SERVFAIL : problème côté serveur DNS. 2) dig @8.8.8.8 → OK : les noms existent, Internet fonctionne depuis le poste de diagnostic. 3) "network unreachable" dans les logs BIND9 : le serveur DNS lui-même n\'a plus accès à Internet (route par défaut manquante après reboot, panne NIC, pare-feu modifié). 4) ip route sur le serveur DNS → route par défaut absente → ip route add default via 192.168.1.1 + corriger /etc/network/interfaces.'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'Redémarrer bind9 sans diagnostic',
                  explication: 'Si le problème est une route réseau manquante sur le serveur DNS, redémarrer bind9 ne changera rien — le service n\'a pas de route pour joindre ses forwarders. Diagnostiquez d\'abord avec dig pour confirmer que BIND9 est le problème.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'Vider le cache client ne résout pas un problème serveur',
                  explication: 'Vider le cache DNS des navigateurs est utile pour les problèmes de cache obsolète sur les postes clients, pas pour les pannes du serveur DNS. Si le serveur DNS retourne SERVFAIL, vider le cache client ne changera pas la réponse du serveur.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'dig @8.8.8.8 google.com fonctionne — google.com est en ligne',
                  explication: 'Le test dig @8.8.8.8 google.com prouve que google.com répond correctement quand on interroge directement Google DNS. Le problème est donc local (le serveur DNS interne ne peut pas joindre les forwarders), pas une panne de google.com.'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'La saturation réseau ne cause pas SERVFAIL',
                  explication: 'Un réseau saturé causerait des timeouts et délais, pas un SERVFAIL immédiat. SERVFAIL signifie que le serveur DNS a tenté de résoudre mais a rencontré une erreur de traitement (ici, il ne peut pas joindre ses forwarders). C\'est un problème de configuration ou connectivité du serveur DNS, pas de bande passante.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'BIND9 est bien configuré — c\'est la connectivité réseau',
                  explication: '"network unreachable" dans les logs BIND9 n\'est pas une erreur de configuration BIND9 — c\'est une erreur système indiquant qu\'il n\'y a pas de route réseau pour atteindre les forwarders. Réinstaller BIND9 ne changera pas l\'état de la table de routage du serveur.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: '8.8.8.8 et 1.1.1.1 sont disponibles depuis les postes clients',
                  explication: 'dig @8.8.8.8 google.com fonctionne depuis le poste de diagnostic — 8.8.8.8 est en ligne. Le problème est que le SERVEUR DNS interne ne peut pas joindre 8.8.8.8, pas les postes clients. Vérifiez la connectivité Internet du serveur DNS lui-même.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'srvlinux-m05',
        titre: 'Le DHCP',
        cas: [
          {
            id: 'cas-srl-009',
            titre: 'Installer et configurer le serveur DHCP ISC sous Linux',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Configurer isc-dhcp-server pour distribuer des adresses IP au réseau 192.168.1.0/24 avec des options DNS et passerelle',
            contexte: 'Vous déployez un serveur DHCP sur SRV-DHCP (192.168.1.2) pour le réseau 192.168.1.0/24. Plage : .100 à .200. Passerelle : .1. DNS : .2. Bail : 24h.',
            contenu: {
              prompt: 'root@srv-dhcp:~# ',
              commandes: {
                'help': 'Commandes : apt install, nano /etc/dhcp/dhcpd.conf, nano /etc/default/isc-dhcp-server, systemctl, dhcpd -t, journalctl',
                'apt install -y isc-dhcp-server': 'Lecture des listes de paquets... Fait\nLe paquet isc-dhcp-server est maintenant installé.',
                'nano /etc/default/isc-dhcp-server': '[Modification : INTERFACESv4="ens3"]',
                'nano /etc/dhcp/dhcpd.conf': '[Contenu après édition :\ndefault-lease-time 86400;\nmax-lease-time 86400;\nauthoritative;\n\nsubnet 192.168.1.0 netmask 255.255.255.0 {\n    range 192.168.1.100 192.168.1.200;\n    option routers 192.168.1.1;\n    option domain-name-servers 192.168.1.2, 8.8.8.8;\n    option domain-name "contoso.local";\n}]',
                'dhcpd -t -cf /etc/dhcp/dhcpd.conf': 'Internet Systems Consortium DHCP Server 4.4.3\nCopyright 2004-2022 Internet Systems Consortium.\nAll rights reserved.\nFor info, please visit https://www.isc.org/software/dhcp/\nConfig file: /etc/dhcp/dhcpd.conf\nDatabase file: /var/lib/dhcpd/dhcpd.leases\nPID file: /var/run/dhcpd.pid\nReading configuration file /etc/dhcp/dhcpd.conf\nSyntax OK',
                'systemctl restart isc-dhcp-server': '',
                'systemctl status isc-dhcp-server': '● isc-dhcp-server.service - ISC DHCP IPv4 server\n     Active: active (running) since Sat 2026-03-21 15:00:00 CET; 2s ago',
                'cat /var/lib/dhcpd/dhcpd.leases': 'lease 192.168.1.100 {\n  starts 6 2026/03/21 15:02:12;\n  ends 0 2026/03/22 15:02:12;\n  binding state active;\n  hardware ethernet 52:54:00:12:34:56;\n  client-hostname "PC-ALICE";\n}'
              },
              validation: ['apt install isc-dhcp-server', 'nano /etc/default/isc-dhcp-server', 'nano /etc/dhcp/dhcpd.conf', 'dhcpd -t', 'systemctl restart isc-dhcp-server'],
              indices: [
                'Installez : apt install -y isc-dhcp-server',
                'Déclarez l\'interface dans /etc/default/isc-dhcp-server : INTERFACESv4="ens3"',
                'Configurez /etc/dhcp/dhcpd.conf : subnet, range, option routers, option domain-name-servers',
                'Testez la syntaxe : dhcpd -t -cf /etc/dhcp/dhcpd.conf',
                'Démarrez : systemctl restart isc-dhcp-server'
              ],
              solution: [
                'apt install -y isc-dhcp-server',
                'nano /etc/default/isc-dhcp-server',
                'nano /etc/dhcp/dhcpd.conf',
                'dhcpd -t -cf /etc/dhcp/dhcpd.conf',
                'systemctl restart isc-dhcp-server',
                'systemctl status isc-dhcp-server',
                'cat /var/lib/dhcpd/dhcpd.leases'
              ]
            }
          },
          {
            id: 'cas-srl-010',
            titre: 'Diagnostiquer un client qui n\'obtient pas d\'adresse DHCP',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Identifier pourquoi un client n\'obtient pas d\'adresse DHCP et résoudre le problème',
            contexte: 'Un nouveau poste Windows rejoint le réseau mais obtient une adresse APIPA (169.254.x.x) au lieu d\'une adresse du serveur DHCP Linux. D\'autres postes obtiennent leur IP correctement.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Un seul poste obtient une APIPA. Les autres fonctionnent. Quelle est la première vérification sur le serveur DHCP ?',
                  choix: [
                    { texte: 'Vérifier les logs DHCP (journalctl -u isc-dhcp-server) pour voir si la demande du poste a été reçue et traitée', suite: 'n2' },
                    { texte: 'Redémarrer le serveur DHCP', suite: 'n_bad1' },
                    { texte: 'Vérifier la configuration réseau du poste Windows', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'Les logs montrent "DHCPDISCOVER from 52:54:00:ab:cd:ef via ens3" mais aucun "DHCPOFFER" ensuite. Le poste envoie bien sa découverte. Pourquoi DHCP ne répond-il pas ?',
                  choix: [
                    { texte: 'L\'adresse MAC est peut-être dans une liste de refus (deny), ou la plage DHCP est épuisée — vérifier dhcpd.leases et la configuration', suite: 'n3' },
                    { texte: 'Le câble réseau du poste est défectueux', suite: 'n_bad3' },
                    { texte: 'Windows est incompatible avec le serveur DHCP Linux', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'cat /var/lib/dhcpd/dhcpd.leases montre 101 baux actifs sur une plage .100-.200 (101 adresses). La plage est épuisée ! Comment résoudre rapidement ?',
                  choix: [
                    { texte: 'Libérer les baux expirés (réduire la durée de bail dans dhcpd.conf) et/ou étendre la plage DHCP vers .201-.250', suite: 'n4' },
                    { texte: 'Supprimer le fichier dhcpd.leases pour libérer toutes les adresses', suite: 'n_bad5' },
                    { texte: 'Configurer une adresse statique sur le poste en attendant', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'Plage DHCP étendue — nouveau poste obtient son IP',
                  explication: 'Plage épuisée : 101 postes pour 101 adresses (.100-.200). Solutions : 1) Court terme : étendre la plage (range 192.168.1.100 192.168.1.250 → 151 adresses) dans dhcpd.conf + dhcpd -t + systemctl restart. 2) Moyen terme : réduire la durée de bail (default-lease-time 28800 = 8h) pour libérer les adresses des machines déconnectées plus vite. 3) Long terme : si le réseau croît, envisager une plage plus large (/23 ou /16) ou des VLANs séparés.'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'Redémarrer sans diagnostic ne résout pas une plage épuisée',
                  explication: 'Si la plage DHCP est épuisée, redémarrer le service ne libérera pas les adresses allouées — les baux sont persistants dans dhcpd.leases et survivent aux redémarrages du service.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'Le poste envoie bien des DHCPDISCOVER — le client fonctionne',
                  explication: 'Le fait que les logs montrent "DHCPDISCOVER from 52:54:00:ab:cd:ef" prouve que le poste client envoie correctement sa demande DHCP. Le problème est côté serveur (il ne répond pas). La configuration réseau du poste Windows est correcte à ce stade.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: 'Un câble défectueux empêcherait le DHCPDISCOVER d\'arriver',
                  explication: 'Si le câble était défectueux, la trame DHCPDISCOVER n\'arriverait pas du tout au serveur. Or les logs montrent que le DHCPDISCOVER est bien reçu ("via ens3"). Le problème est que le serveur ne répond pas, pas que le réseau physique est coupé.'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'Windows est entièrement compatible avec isc-dhcp-server',
                  explication: 'isc-dhcp-server est le serveur DHCP le plus répandu sous Linux et est parfaitement compatible avec tous les clients Windows. Les autres postes Windows obtiennent leur IP sans problème. L\'incompatibilité n\'est pas la cause.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'Supprimer dhcpd.leases peut perturber tous les clients',
                  explication: 'Supprimer dhcpd.leases réinitialise la base de données des baux. Le serveur DHCP ne saura plus quelles adresses sont déjà attribuées et pourrait redistribuer des IPs déjà en use, causant des conflits d\'adresses sur tout le réseau. C\'est une intervention risquée qui affecte tous les clients.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'Une IP statique contourne le problème sans le résoudre',
                  explication: 'Configurer une IP statique sur ce poste résout son cas mais pas le problème de fond : la plage DHCP épuisée affectera le prochain nouveau poste. Et si des postes existants perdent leur bail, ils n\'auront pas non plus de nouvelle adresse. Étendez la plage pour résoudre structurellement.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'srvlinux-m06',
        titre: 'DNS autoritaire sur zone',
        cas: [
          {
            id: 'cas-srl-011',
            titre: 'Configurer une zone DNS autoritaire avec BIND9',
            difficulte: 'difficile',
            format: 'terminal',
            objectif: 'Créer une zone DNS directe et une zone inverse dans BIND9 pour le domaine contoso.local',
            contexte: 'Vous devez configurer BIND9 comme serveur DNS autoritaire pour contoso.local. Vous créez les enregistrements pour : le serveur DNS lui-même (ns1.contoso.local → 192.168.1.2), le serveur web (www → 192.168.1.10), le serveur mail (mail → 192.168.1.20, enregistrement MX).',
            contenu: {
              prompt: 'root@srv-dns:~# ',
              commandes: {
                'help': 'Commandes : nano, named-checkconf, named-checkzone, systemctl reload bind9, dig',
                'nano /etc/bind/named.conf.local': '[Contenu après édition :\nzone "contoso.local" {\n    type master;\n    file "/etc/bind/zones/db.contoso.local";\n};\n\nzone "1.168.192.in-addr.arpa" {\n    type master;\n    file "/etc/bind/zones/db.192.168.1";\n};\n]',
                'mkdir -p /etc/bind/zones': '',
                'nano /etc/bind/zones/db.contoso.local': '[Contenu :\n$TTL 86400\n@   IN  SOA ns1.contoso.local. admin.contoso.local. (\n                2026032101 ; Serial\n                3600       ; Refresh\n                1800       ; Retry\n                604800     ; Expire\n                86400 )    ; Minimum TTL\n;\n@       IN  NS  ns1.contoso.local.\n;\nns1     IN  A   192.168.1.2\nwww     IN  A   192.168.1.10\nmail    IN  A   192.168.1.20\n@       IN  MX  10 mail.contoso.local.\n]',
                'nano /etc/bind/zones/db.192.168.1': '[Contenu :\n$TTL 86400\n@   IN  SOA ns1.contoso.local. admin.contoso.local. (\n                2026032101 ; Serial\n                3600       ; Refresh\n                1800       ; Retry\n                604800     ; Expire\n                86400 )    ; Minimum TTL\n;\n@       IN  NS  ns1.contoso.local.\n;\n2       IN  PTR ns1.contoso.local.\n10      IN  PTR www.contoso.local.\n20      IN  PTR mail.contoso.local.\n]',
                'named-checkconf': '',
                'named-checkzone contoso.local /etc/bind/zones/db.contoso.local': 'zone contoso.local/IN: loaded serial 2026032101\nOK',
                'named-checkzone 1.168.192.in-addr.arpa /etc/bind/zones/db.192.168.1': 'zone 1.168.192.in-addr.arpa/IN: loaded serial 2026032101\nOK',
                'systemctl reload bind9': '',
                'dig @192.168.1.2 www.contoso.local': '; <<>> DiG 9.18.24 <<>> @192.168.1.2 www.contoso.local\n;; ANSWER SECTION:\nwww.contoso.local.      86400   IN      A       192.168.1.10\n;; Query time: 0 msec',
                'dig @192.168.1.2 -x 192.168.1.10': '; <<>> DiG 9.18.24 <<>> @192.168.1.2 -x 192.168.1.10\n;; ANSWER SECTION:\n10.1.168.192.in-addr.arpa. 86400 IN  PTR  www.contoso.local.\n;; Query time: 0 msec'
              },
              validation: ['named.conf.local', 'zone "contoso.local"', 'db.contoso.local', 'SOA', 'MX', 'named-checkzone', 'dig'],
              indices: [
                'Déclarez les zones dans /etc/bind/named.conf.local avec type master et le chemin du fichier de zone',
                'Le fichier de zone doit commencer par $TTL, puis l\'enregistrement SOA (Start of Authority)',
                'Ajoutez les enregistrements A (IPv4), MX (messagerie), NS (name server)',
                'La zone inverse s\'appelle X.Y.Z.in-addr.arpa (inversez le réseau)',
                'Vérifiez : named-checkconf (config) et named-checkzone (zone), puis systemctl reload bind9'
              ],
              solution: [
                'nano /etc/bind/named.conf.local',
                'mkdir -p /etc/bind/zones',
                'nano /etc/bind/zones/db.contoso.local',
                'nano /etc/bind/zones/db.192.168.1',
                'named-checkconf',
                'named-checkzone contoso.local /etc/bind/zones/db.contoso.local',
                'named-checkzone 1.168.192.in-addr.arpa /etc/bind/zones/db.192.168.1',
                'systemctl reload bind9',
                'dig @192.168.1.2 www.contoso.local',
                'dig @192.168.1.2 -x 192.168.1.10'
              ]
            }
          },
          {
            id: 'cas-srl-012',
            titre: 'Résoudre une erreur de zone BIND9',
            difficulte: 'difficile',
            format: 'arbre',
            objectif: 'Diagnostiquer et corriger les erreurs courantes dans les fichiers de zone BIND9',
            contexte: 'Après modification du fichier de zone contoso.local, named-checkzone retourne des erreurs et les enregistrements DNS ne se mettent plus à jour. Les clients obtiennent toujours les anciennes valeurs.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'named-checkzone retourne une erreur. Quelle est l\'étape de débogage ?',
                  choix: [
                    { texte: 'Lire attentivement le message d\'erreur de named-checkzone qui indique la ligne et le type d\'erreur précis', suite: 'n2' },
                    { texte: 'Supprimer le fichier de zone et le recréer depuis zéro', suite: 'n_bad1' },
                    { texte: 'Redémarrer bind9 et ignorer l\'erreur', suite: 'n_bad2' }
                  ]
                },
                n2: {
                  question: 'L\'erreur indique "dns_rdata_fromtext: db.contoso.local:15: near \'192.168.1.100\': no owner". Qu\'est-ce que cela signifie ?',
                  choix: [
                    { texte: 'Un enregistrement à la ligne 15 n\'a pas de nom (owner) — probablement une ligne qui commence directement par une IP sans nom d\'hôte ni @', suite: 'n3' },
                    { texte: 'L\'IP 192.168.1.100 est invalide', suite: 'n_bad3' },
                    { texte: 'BIND9 ne supporte pas les adresses 192.168.x.x', suite: 'n_bad4' }
                  ]
                },
                n3: {
                  question: 'La ligne est corrigée. named-checkzone réussit maintenant. Mais les clients obtiennent toujours les anciennes valeurs DNS. Pourquoi ?',
                  choix: [
                    { texte: 'Le numéro de série (Serial) dans le SOA n\'a pas été incrémenté — BIND9 et les autres serveurs DNS ignorent les fichiers de zone dont le serial n\'a pas changé', suite: 'n4' },
                    { texte: 'Il faut redémarrer tous les postes clients', suite: 'n_bad5' },
                    { texte: 'Le TTL des enregistrements est trop court', suite: 'n_bad6' }
                  ]
                },
                n4: {
                  solution: true,
                  correct: true,
                  texte: 'Zone DNS mise à jour et propagée',
                  explication: 'Deux problèmes résolus : 1) Erreur de syntaxe dans le fichier de zone (enregistrement sans owner) → toujours utiliser named-checkzone après toute modification. 2) Serial non incrémenté → le serial SOA est la version du fichier de zone. Si le serial ne change pas, les serveurs secondaires (et le cache de BIND9 lui-même) ne rechargent pas la zone. Convention : format YYYYMMDDNN (ex: 2026032102 pour la 2e modification du 21/03/2026). Après correction : systemctl reload bind9 pour charger la nouvelle version.'
                },
                n_bad1: {
                  solution: true,
                  correct: false,
                  texte: 'Supprimer le fichier de zone efface tous les enregistrements',
                  explication: 'Supprimer et recréer le fichier de zone vous oblige à ressaisir tous les enregistrements DNS manuellement — risque d\'en oublier. Le message d\'erreur de named-checkzone est très précis (numéro de ligne, type d\'erreur) — utilisez-le pour corriger exactement ce qui ne va pas.'
                },
                n_bad2: {
                  solution: true,
                  correct: false,
                  texte: 'BIND9 refusera de charger une zone avec erreur',
                  explication: 'Si named-checkzone retourne une erreur, BIND9 refusera de charger cette zone au redémarrage/reload — il continuera à servir la zone précédente (sans les nouvelles modifications) ou retournera SERVFAIL si c\'est une nouvelle zone. Corrigez toujours les erreurs avant de recharger.'
                },
                n_bad3: {
                  solution: true,
                  correct: false,
                  texte: '192.168.1.100 est une IP valide',
                  explication: 'Les adresses RFC 1918 (192.168.x.x, 10.x.x.x, 172.16.x.x) sont des adresses privées valides dans les fichiers de zone DNS interne. L\'erreur "no owner" signifie que l\'enregistrement n\'a pas de nom d\'hôte devant l\'IP, pas que l\'IP elle-même est invalide.'
                },
                n_bad4: {
                  solution: true,
                  correct: false,
                  texte: 'BIND9 supporte toutes les plages d\'adresses IP',
                  explication: 'BIND9 ne fait aucune distinction entre les adresses IP publiques et privées dans les fichiers de zone. Il supporte parfaitement les adresses RFC 1918 pour les zones DNS internes. L\'erreur est syntaxique (manque du nom d\'hôte/owner), pas liée à la plage d\'adresse.'
                },
                n_bad5: {
                  solution: true,
                  correct: false,
                  texte: 'Redémarrer les clients ne vide pas le cache du serveur DNS',
                  explication: 'Si le serveur DNS BIND9 n\'a pas rechargé la nouvelle version de la zone (à cause du serial non incrémenté), les clients recevront toujours les anciennes valeurs même après redémarrage. Le problème est côté serveur DNS, pas côté clients.'
                },
                n_bad6: {
                  solution: true,
                  correct: false,
                  texte: 'Un TTL court ferait expirer le cache plus vite, pas plus lentement',
                  explication: 'Si les clients obtiennent toujours les anciennes valeurs, c\'est que le serveur DNS lui-même sert toujours l\'ancienne version de la zone. Un TTL court ferait que les clients interrogent plus souvent le serveur — mais si le serveur retourne toujours l\'ancienne valeur (serial non incrémenté), le TTL n\'y change rien.'
                }
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: 'services-reseau-ms',
    titre: 'Services Réseau Microsoft',
    emoji: '🪟',
    modules: [
      {
        id: 'srvms-m01',
        titre: 'Administration Windows',
        cas: [
          {
            id: 'cas-srms-001',
            titre: 'Gestion des comptes locaux via PowerShell',
            difficulte: 'facile',
            format: 'terminal',
            objectif: 'Créer un utilisateur local, l\'ajouter à un groupe et vérifier la configuration',
            contexte: 'Un nouveau technicien rejoint l\'équipe. Vous devez créer son compte local sur un poste Windows Server et l\'ajouter au groupe Administrateurs locaux.',
            contenu: {
              prompt: 'PS C:\\> ',
              commandes: {
                'New-LocalUser -Name "jdupont" -Password (ConvertTo-SecureString "P@ssw0rd!" -AsPlainText -Force) -FullName "Jean Dupont" -Description "Technicien IT"': 'Name    Enabled Description\n----    ------- -----------\njdupont True    Technicien IT',
                'Add-LocalGroupMember -Group "Administrateurs" -Member "jdupont"': '',
                'Get-LocalGroupMember -Group "Administrateurs"': 'ObjectClass Name                    PrincipalSource\n----------- ----                    ---------------\nUser        DESKTOP-01\\Administrateur Local\nUser        DESKTOP-01\\jdupont      Local',
                'Get-LocalUser -Name "jdupont" | Select-Object Name, Enabled, LastLogon': 'Name    Enabled LastLogon\n----    ------- ---------\njdupont True',
                'Get-LocalGroup': 'Name\n----\nAdministrateurs\nUtilisateurs\nUtilisateurs du Bureau à distance\nOpérateurs de sauvegarde'
              },
              validation: [
                'Utilisateur créé avec New-LocalUser',
                'Ajouté au groupe Administrateurs avec Add-LocalGroupMember',
                'Vérification avec Get-LocalGroupMember'
              ],
              indices: [
                'ConvertTo-SecureString est nécessaire pour le mot de passe',
                'Le groupe s\'appelle "Administrateurs" (FR) ou "Administrators" (EN)'
              ],
              solution: [
                'New-LocalUser -Name "jdupont" -Password (ConvertTo-SecureString "P@ssw0rd!" -AsPlainText -Force) -FullName "Jean Dupont"',
                'Add-LocalGroupMember -Group "Administrateurs" -Member "jdupont"',
                'Get-LocalGroupMember -Group "Administrateurs"'
              ]
            }
          },
          {
            id: 'cas-srms-002',
            titre: 'Diagnostic accès refusé sur un partage',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Identifier et résoudre une erreur d\'accès refusé sur un dossier partagé Windows',
            contexte: 'Un utilisateur signale qu\'il ne peut pas accéder au partage \\\\SRV01\\Commun. L\'accès est refusé alors qu\'il devrait y avoir accès.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'L\'utilisateur peut-il pinguer \\\\SRV01 ?',
                  choix: [
                    { texte: 'Non, ping échoue', suite: 'n2' },
                    { texte: 'Oui, ping OK', suite: 'n3' }
                  ]
                },
                n2: {
                  question: 'Le pare-feu Windows est-il actif sur SRV01 ?',
                  choix: [
                    { texte: 'Oui, pare-feu actif', suite: 'n_fw' },
                    { texte: 'Non ou inconnu', suite: 'n_net' }
                  ]
                },
                n_fw: {
                  solution: true,
                  correct: true,
                  texte: 'Autoriser ICMP dans le pare-feu',
                  explication: 'Le pare-feu bloque les requêtes ICMP. Créer une règle entrante pour "Partage de fichiers et d\'imprimantes (Demande d\'écho - Trafic entrant ICMPv4)".'
                },
                n_net: {
                  solution: true,
                  correct: false,
                  texte: 'Problème réseau sous-jacent',
                  explication: 'Vérifier la connectivité réseau de base : câble, switch, adressage IP, passerelle. Le problème n\'est pas lié aux permissions.'
                },
                n3: {
                  question: 'Le partage \\\\SRV01\\Commun est-il accessible depuis un autre compte ?',
                  choix: [
                    { texte: 'Oui, autre compte OK', suite: 'n4' },
                    { texte: 'Non, personne n\'y accède', suite: 'n5' }
                  ]
                },
                n4: {
                  question: 'L\'utilisateur est-il dans le bon groupe de sécurité ?',
                  choix: [
                    { texte: 'Non, groupe manquant', suite: 'n_grp' },
                    { texte: 'Oui, groupe présent', suite: 'n6' }
                  ]
                },
                n_grp: {
                  solution: true,
                  correct: true,
                  texte: 'Ajouter l\'utilisateur au groupe de sécurité du partage',
                  explication: 'Ouvrir "Gestion de l\'ordinateur" > Utilisateurs et groupes locaux > Ajouter l\'utilisateur au groupe ayant accès au partage. Demander une nouvelle connexion pour actualiser le jeton Kerberos.'
                },
                n6: {
                  question: 'Les permissions NTFS du dossier autorisent-elles l\'utilisateur ?',
                  choix: [
                    { texte: 'Non, NTFS trop restrictif', suite: 'n_ntfs' },
                    { texte: 'Oui, NTFS OK', suite: 'n7' }
                  ]
                },
                n_ntfs: {
                  solution: true,
                  correct: true,
                  texte: 'Corriger les permissions NTFS',
                  explication: 'Clic droit sur le dossier > Propriétés > Sécurité > Modifier. Ajouter l\'utilisateur ou son groupe avec les droits appropriés (Lecture, Lecture/Écriture…). Les permissions de partage ET NTFS s\'appliquent cumulativement (le plus restrictif l\'emporte).'
                },
                n7: {
                  solution: true,
                  correct: true,
                  texte: 'Vérifier les permissions de partage (Share permissions)',
                  explication: 'Clic droit > Propriétés > Partage > Partage avancé > Autorisations. Vérifier que l\'utilisateur ou "Tout le monde" a au minimum "Lecture". Attention : les permissions de partage sont distinctes des permissions NTFS.'
                },
                n5: {
                  question: 'Le service "Serveur" (LanmanServer) est-il démarré sur SRV01 ?',
                  choix: [
                    { texte: 'Non, service arrêté', suite: 'n_svc' },
                    { texte: 'Oui, service actif', suite: 'n_share' }
                  ]
                },
                n_svc: {
                  solution: true,
                  correct: true,
                  texte: 'Démarrer le service Serveur (LanmanServer)',
                  explication: 'Dans services.msc, démarrer le service "Serveur" et le mettre en Automatique. Ce service est indispensable au partage de fichiers Windows.'
                },
                n_share: {
                  solution: true,
                  correct: false,
                  texte: 'Vérifier que le partage existe toujours',
                  explication: 'Dans "Gestion de l\'ordinateur" > Dossiers partagés > Partages, vérifier que \\\\SRV01\\Commun est bien listé. Le partage a peut-être été supprimé accidentellement.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'srvms-m02',
        titre: 'Active Directory',
        cas: [
          {
            id: 'cas-srms-003',
            titre: 'Création d\'une OU et d\'utilisateurs AD via PowerShell',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Créer une unité d\'organisation, des comptes utilisateurs AD et vérifier leur existence',
            contexte: 'Vous devez créer une OU "Comptabilité" dans le domaine tssr.local et y ajouter deux comptes utilisateurs pour le service.',
            contenu: {
              prompt: 'PS C:\\> ',
              commandes: {
                'Import-Module ActiveDirectory': '',
                'New-ADOrganizationalUnit -Name "Comptabilite" -Path "DC=tssr,DC=local" -Description "Service Comptabilité"': '',
                'Get-ADOrganizationalUnit -Filter {Name -eq "Comptabilite"}': 'DistinguishedName : OU=Comptabilite,DC=tssr,DC=local\nName              : Comptabilite\nObjectClass       : organizationalUnit',
                'New-ADUser -Name "Alice Martin" -SamAccountName "amartin" -UserPrincipalName "amartin@tssr.local" -Path "OU=Comptabilite,DC=tssr,DC=local" -AccountPassword (ConvertTo-SecureString "P@ssw0rd!" -AsPlainText -Force) -Enabled $true': '',
                'New-ADUser -Name "Bob Leroy" -SamAccountName "bleroy" -UserPrincipalName "bleroy@tssr.local" -Path "OU=Comptabilite,DC=tssr,DC=local" -AccountPassword (ConvertTo-SecureString "P@ssw0rd!" -AsPlainText -Force) -Enabled $true': '',
                'Get-ADUser -Filter * -SearchBase "OU=Comptabilite,DC=tssr,DC=local" | Select-Object Name, SamAccountName, Enabled': 'Name         SamAccountName Enabled\n----         -------------- -------\nAlice Martin amartin        True\nBob Leroy    bleroy         True'
              },
              validation: [
                'Module ActiveDirectory importé',
                'OU Comptabilite créée dans DC=tssr,DC=local',
                'Deux utilisateurs créés dans l\'OU avec -Enabled $true',
                'Vérification avec Get-ADUser -SearchBase'
              ],
              indices: [
                'Le chemin -Path doit utiliser la syntaxe Distinguished Name',
                '-Enabled $true active immédiatement le compte',
                'Import-Module ActiveDirectory requis sur les postes sans RSAT'
              ],
              solution: [
                'New-ADOrganizationalUnit -Name "Comptabilite" -Path "DC=tssr,DC=local"',
                'New-ADUser -Name "Alice Martin" -SamAccountName "amartin" -Path "OU=Comptabilite,DC=tssr,DC=local" -AccountPassword (...) -Enabled $true',
                'Get-ADUser -Filter * -SearchBase "OU=Comptabilite,DC=tssr,DC=local"'
              ]
            }
          },
          {
            id: 'cas-srms-004',
            titre: 'Diagnostic compte AD verrouillé',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Identifier la cause d\'un verrouillage de compte Active Directory et le résoudre',
            contexte: 'Un utilisateur ne peut plus se connecter au domaine. Son compte semble verrouillé. Vous devez diagnostiquer et résoudre le problème.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Le compte est-il bien verrouillé ? (Get-ADUser -Identity user -Properties LockedOut)',
                  choix: [
                    { texte: 'Oui, LockedOut = True', suite: 'n2' },
                    { texte: 'Non, LockedOut = False', suite: 'n_pwd' }
                  ]
                },
                n_pwd: {
                  question: 'Le compte est-il désactivé ? (Enabled = False)',
                  choix: [
                    { texte: 'Oui, Enabled = False', suite: 'n_dis' },
                    { texte: 'Non, compte actif', suite: 'n_exp' }
                  ]
                },
                n_dis: {
                  solution: true,
                  correct: true,
                  texte: 'Réactiver le compte avec Enable-ADAccount',
                  explication: 'Le compte est désactivé, pas verrouillé. Utiliser : Enable-ADAccount -Identity "nomutilisateur". Vérifier pourquoi il a été désactivé (départ, sécurité ?).'
                },
                n_exp: {
                  solution: true,
                  correct: false,
                  texte: 'Vérifier l\'expiration du mot de passe',
                  explication: 'Get-ADUser -Identity user -Properties PasswordExpired, PasswordLastSet. Si PasswordExpired = True, l\'utilisateur doit changer son mot de passe ou vous pouvez le réinitialiser avec Set-ADAccountPassword.'
                },
                n2: {
                  question: 'Sur quel contrôleur de domaine le verrouillage s\'est-il produit ?',
                  choix: [
                    { texte: 'Je ne sais pas encore', suite: 'n3' },
                    { texte: 'Identifié, je passe à la cause', suite: 'n4' }
                  ]
                },
                n3: {
                  solution: true,
                  correct: true,
                  texte: 'Utiliser Get-ADDomainController et l\'Observateur d\'événements',
                  explication: 'Sur le PDC Emulator (rôle FSMO), consulter l\'Observateur d\'événements > Journaux Windows > Sécurité. Filtrer sur l\'événement 4740 (compte verrouillé). Il indique le poste source du verrouillage.'
                },
                n4: {
                  question: 'Quel est le poste source des tentatives échouées ?',
                  choix: [
                    { texte: 'Un poste de travail connu', suite: 'n5' },
                    { texte: 'Source inconnue ou serveur', suite: 'n_brute' }
                  ]
                },
                n5: {
                  question: 'L\'utilisateur a-t-il des sessions ou credentials mémorisés sur ce poste ?',
                  choix: [
                    { texte: 'Oui, credentials en cache', suite: 'n_cred' },
                    { texte: 'Non, sessions normales', suite: 'n_unlock' }
                  ]
                },
                n_cred: {
                  solution: true,
                  correct: true,
                  texte: 'Supprimer les credentials mémorisés',
                  explication: 'Panneau de configuration > Gestionnaire d\'informations d\'identification > Informations d\'identification Windows. Supprimer les entrées obsolètes avec l\'ancien mot de passe. Puis déverrouiller : Unlock-ADAccount -Identity "nomutilisateur".'
                },
                n_unlock: {
                  solution: true,
                  correct: true,
                  texte: 'Déverrouiller et réinitialiser le mot de passe',
                  explication: 'Unlock-ADAccount -Identity "nomutilisateur" puis Set-ADAccountPassword -Identity "nomutilisateur" -Reset -NewPassword (ConvertTo-SecureString "NouveauMDP!" -AsPlainText -Force). Demander à l\'utilisateur de changer son mot de passe à la prochaine connexion.'
                },
                n_brute: {
                  solution: true,
                  correct: false,
                  texte: 'Possible attaque par force brute — escalader en sécurité',
                  explication: 'Si la source est inconnue ou un serveur externe, c\'est potentiellement une attaque. Déverrouiller temporairement, forcer un changement de mot de passe, puis analyser les logs. Envisager de bloquer la source au niveau du pare-feu.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'srvms-m03',
        titre: 'GPO',
        cas: [
          {
            id: 'cas-srms-005',
            titre: 'Création et liaison d\'une GPO de restriction',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Créer une GPO qui désactive le Panneau de configuration et la lier à une OU',
            contexte: 'La direction demande que les utilisateurs du service Comptabilité ne puissent pas accéder au Panneau de configuration. Vous devez créer et déployer une GPO.',
            contenu: {
              prompt: 'PS C:\\> ',
              commandes: {
                'Import-Module GroupPolicy': '',
                'New-GPO -Name "Restriction-PanneauConfig" -Comment "Bloque acces Panneau de configuration"': 'DisplayName      : Restriction-PanneauConfig\nDomainName       : tssr.local\nOwner            : TSSR\\Admins du domaine\nId               : {a1b2c3d4-...}\nGpoStatus        : AllSettingsEnabled',
                'Set-GPRegistryValue -Name "Restriction-PanneauConfig" -Key "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer" -ValueName "NoControlPanel" -Type DWord -Value 1': 'DisplayName      : Restriction-PanneauConfig\nDomainName       : tssr.local',
                'New-GPLink -Name "Restriction-PanneauConfig" -Target "OU=Comptabilite,DC=tssr,DC=local"': 'GpoId       : a1b2c3d4-...\nDisplayName : Restriction-PanneauConfig\nEnabled     : True\nEnforced    : False\nTarget      : OU=Comptabilite,DC=tssr,DC=local\nOrder       : 1',
                'Get-GPInheritance -Target "OU=Comptabilite,DC=tssr,DC=local"': 'ContainerName   : Comptabilite\nContainerType   : OU\nPath            : OU=Comptabilite,DC=tssr,DC=local\nGpoLinks        :\n  Restriction-PanneauConfig Enabled=True Enforced=False Order=1',
                'Invoke-GPUpdate -Computer "PC-COMPTA01" -Force': 'Updating policy...\nUser Policy update has completed successfully.\nComputer Policy update has completed successfully.'
              },
              validation: [
                'GPO créée avec New-GPO',
                'Paramètre de registre défini avec Set-GPRegistryValue (NoControlPanel = 1)',
                'GPO liée à l\'OU avec New-GPLink',
                'Mise à jour forcée avec Invoke-GPUpdate'
              ],
              indices: [
                'La clé est sous HKCU (User Configuration), pas HKLM',
                'NoControlPanel = 1 pour interdire, 0 pour autoriser',
                'Invoke-GPUpdate force l\'application immédiate sans attendre le cycle 90min'
              ],
              solution: [
                'New-GPO -Name "Restriction-PanneauConfig"',
                'Set-GPRegistryValue -Name "Restriction-PanneauConfig" -Key "HKCU\\...\\Policies\\Explorer" -ValueName "NoControlPanel" -Type DWord -Value 1',
                'New-GPLink -Name "Restriction-PanneauConfig" -Target "OU=Comptabilite,DC=tssr,DC=local"'
              ]
            }
          },
          {
            id: 'cas-srms-006',
            titre: 'Diagnostic GPO non appliquée',
            difficulte: 'difficile',
            format: 'arbre',
            objectif: 'Identifier pourquoi une GPO ne s\'applique pas sur un poste utilisateur',
            contexte: 'La GPO "Restriction-PanneauConfig" est liée à l\'OU Comptabilité mais un utilisateur peut toujours accéder au Panneau de configuration.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Avez-vous lancé gpresult /r sur le poste pour voir les GPO appliquées ?',
                  choix: [
                    { texte: 'Oui — la GPO n\'apparaît pas', suite: 'n2' },
                    { texte: 'Oui — la GPO apparaît mais le paramètre ne s\'applique pas', suite: 'n_rsop' }
                  ]
                },
                n_rsop: {
                  question: 'La GPO est en mode "User Configuration" ou "Computer Configuration" ?',
                  choix: [
                    { texte: 'User Configuration (HKCU)', suite: 'n_loopback' },
                    { texte: 'Computer Configuration (HKLM)', suite: 'n_hklm' }
                  ]
                },
                n_loopback: {
                  solution: true,
                  correct: true,
                  texte: 'Vérifier si le Loopback Processing est nécessaire',
                  explication: 'Si la GPO est en User Configuration mais l\'objet ordinateur n\'est pas dans la même OU, le Loopback Processing peut être nécessaire. Activer dans Computer Configuration > Stratégies > Modèles d\'administration > Système > Stratégie de groupe > Mode de traitement en boucle.'
                },
                n_hklm: {
                  solution: true,
                  correct: false,
                  texte: 'Vérifier le paramètre de registre manuellement',
                  explication: 'Ouvrir regedit sur le poste et vérifier la clé HKLM ou HKCU correspondante. Si la valeur n\'est pas là, la GPO n\'a pas écrit le paramètre. Utiliser gpupdate /force et revérifier.'
                },
                n2: {
                  question: 'L\'objet ordinateur est-il dans l\'OU Comptabilité ou une OU enfant ?',
                  choix: [
                    { texte: 'Non, poste dans une autre OU', suite: 'n_ou' },
                    { texte: 'Oui, poste dans la bonne OU', suite: 'n3' }
                  ]
                },
                n_ou: {
                  solution: true,
                  correct: true,
                  texte: 'Déplacer l\'objet ordinateur dans la bonne OU',
                  explication: 'La GPO est liée à OU=Comptabilite mais le compte ordinateur est ailleurs. Déplacer l\'objet dans l\'OU avec Move-ADObject ou via ADUC. Puis gpupdate /force. Attention : les GPOs s\'appliquent selon la position de l\'objet dans l\'AD, pas selon l\'utilisateur connecté (sauf Loopback).'
                },
                n3: {
                  question: 'L\'héritage GPO est-il bloqué sur l\'OU ?',
                  choix: [
                    { texte: 'Oui, héritage bloqué', suite: 'n_inh' },
                    { texte: 'Non, héritage normal', suite: 'n4' }
                  ]
                },
                n_inh: {
                  solution: true,
                  correct: true,
                  texte: 'Désactiver le blocage d\'héritage ou utiliser Enforced',
                  explication: 'Le blocage d\'héritage empêche les GPO des OU parentes de s\'appliquer. Soit désactiver le blocage (clic droit OU > Bloquer l\'héritage), soit marquer la GPO comme "Appliqué" (Enforced) pour qu\'elle s\'impose malgré le blocage.'
                },
                n4: {
                  question: 'La GPO a-t-elle un filtre de sécurité restrictif ?',
                  choix: [
                    { texte: 'Oui, filtre personnalisé', suite: 'n_filter' },
                    { texte: 'Non, filtre par défaut (Utilisateurs authentifiés)', suite: 'n_wmi' }
                  ]
                },
                n_filter: {
                  solution: true,
                  correct: true,
                  texte: 'Vérifier et corriger le filtre de sécurité',
                  explication: 'Dans la console GPMC, sélectionner la GPO > onglet Étendue > Filtrage de sécurité. L\'utilisateur ou son groupe doit y figurer avec "Lecture" et "Appliquer la stratégie de groupe". Ajouter l\'utilisateur ou son groupe si nécessaire.'
                },
                n_wmi: {
                  solution: true,
                  correct: false,
                  texte: 'Vérifier le filtre WMI associé',
                  explication: 'Un filtre WMI peut empêcher l\'application selon des conditions système (version Windows, RAM…). Dans GPMC > Filtres WMI, vérifier le filtre lié à la GPO. Tester avec : gpresult /h rapport.html pour voir pourquoi la GPO est filtrée.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'srvms-m04',
        titre: 'Routage Windows Server',
        cas: [
          {
            id: 'cas-srms-007',
            titre: 'Configuration du routage avec RRAS',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Activer et configurer le routage IP entre deux sous-réseaux via RRAS sur Windows Server',
            contexte: 'Vous avez un Windows Server avec deux cartes réseau : eth0 (192.168.1.1/24) et eth1 (10.0.0.1/24). Vous devez activer le routage pour permettre la communication entre les deux réseaux.',
            contenu: {
              prompt: 'PS C:\\> ',
              commandes: {
                'Install-WindowsFeature Routing -IncludeManagementTools': 'Success Restart Needed Exit Code Feature Result\n------- -------------- --------- --------------\nTrue    No             Success   {Routage et accès distant, Outils de gest...}',
                'Import-Module RemoteAccess': '',
                'Install-RemoteAccess -VpnType RoutingOnly': 'InstallationStatus : Installed',
                'Get-NetIPInterface | Select-Object InterfaceAlias, InterfaceIndex, Forwarding': 'InterfaceAlias InterfaceIndex Forwarding\n-------------- -------------- ----------\nEthernet0               4 Disabled\nEthernet1               5 Disabled',
                'Set-NetIPInterface -InterfaceIndex 4 -Forwarding Enabled': '',
                'Set-NetIPInterface -InterfaceIndex 5 -Forwarding Enabled': '',
                'Get-NetRoute -AddressFamily IPv4': 'ifIndex DestinationPrefix  NextHop    RouteMetric\n------- -----------------  -------    -----------\n      4 192.168.1.0/24     0.0.0.0              256\n      5 10.0.0.0/24        0.0.0.0              256\n      1 0.0.0.0/0          192.168.1.254         16'
              },
              validation: [
                'Rôle Routing installé avec Install-WindowsFeature',
                'RRAS configuré en RoutingOnly',
                'Forwarding activé sur les deux interfaces réseau',
                'Routes vérifiées avec Get-NetRoute'
              ],
              indices: [
                'Install-WindowsFeature installe le rôle, Install-RemoteAccess active le service',
                'Forwarding doit être activé sur CHAQUE interface concernée',
                'Utiliser Get-NetIPInterface pour connaître les InterfaceIndex'
              ],
              solution: [
                'Install-WindowsFeature Routing -IncludeManagementTools',
                'Install-RemoteAccess -VpnType RoutingOnly',
                'Set-NetIPInterface -InterfaceIndex <id> -Forwarding Enabled (sur les 2 interfaces)'
              ]
            }
          },
          {
            id: 'cas-srms-008',
            titre: 'Diagnostic perte de connectivité inter-réseau',
            difficulte: 'difficile',
            format: 'arbre',
            objectif: 'Diagnostiquer pourquoi deux sous-réseaux ne communiquent plus à travers un serveur Windows routeur',
            contexte: 'Depuis ce matin, les postes du réseau 10.0.0.0/24 ne peuvent plus joindre le réseau 192.168.1.0/24 via le serveur Windows qui fait office de routeur.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Le service RRAS est-il démarré sur le serveur ? (Get-Service RemoteAccess)',
                  choix: [
                    { texte: 'Non, service arrêté', suite: 'n_svc' },
                    { texte: 'Oui, service Running', suite: 'n2' }
                  ]
                },
                n_svc: {
                  solution: true,
                  correct: true,
                  texte: 'Démarrer le service RRAS',
                  explication: 'Start-Service RemoteAccess && Set-Service RemoteAccess -StartupType Automatic. RRAS peut s\'être arrêté suite à une mise à jour ou une erreur. Vérifier l\'Observateur d\'événements pour la cause.'
                },
                n2: {
                  question: 'Le Forwarding IP est-il toujours activé sur les interfaces ?',
                  choix: [
                    { texte: 'Non, Forwarding = Disabled', suite: 'n_fwd' },
                    { texte: 'Oui, Forwarding = Enabled', suite: 'n3' }
                  ]
                },
                n_fwd: {
                  solution: true,
                  correct: true,
                  texte: 'Réactiver le Forwarding sur les interfaces',
                  explication: 'Set-NetIPInterface -InterfaceIndex <id> -Forwarding Enabled sur chaque interface. Une mise à jour Windows peut parfois réinitialiser ces paramètres. Envisager un script de vérification au démarrage.'
                },
                n3: {
                  question: 'Les routes sont-elles correctes dans la table de routage ? (Get-NetRoute)',
                  choix: [
                    { texte: 'Routes manquantes ou incorrectes', suite: 'n_route' },
                    { texte: 'Routes présentes et correctes', suite: 'n4' }
                  ]
                },
                n_route: {
                  solution: true,
                  correct: true,
                  texte: 'Recréer les routes manquantes',
                  explication: 'New-NetRoute -InterfaceIndex <id> -DestinationPrefix "10.0.0.0/24" -NextHop "0.0.0.0" -RouteMetric 256. Si les routes des interfaces locales ont disparu, vérifier la configuration IP des interfaces (adresse peut avoir changé).'
                },
                n4: {
                  question: 'Le pare-feu Windows bloque-t-il le trafic entre les interfaces ?',
                  choix: [
                    { texte: 'Oui, règles trop restrictives', suite: 'n_fw' },
                    { texte: 'Non, pare-feu OK', suite: 'n5' }
                  ]
                },
                n_fw: {
                  solution: true,
                  correct: true,
                  texte: 'Créer des règles de pare-feu pour autoriser le trafic inter-réseau',
                  explication: 'Dans le pare-feu Windows avec fonctions avancées, créer des règles entrantes/sortantes autorisant le trafic entre les deux sous-réseaux. Ou temporairement désactiver le pare-feu pour tester : Set-NetFirewallProfile -Enabled False (à ne pas laisser en production).'
                },
                n5: {
                  solution: true,
                  correct: false,
                  texte: 'Vérifier la configuration IP des postes clients',
                  explication: 'Les postes du réseau 10.0.0.0/24 ont-ils bien la passerelle 10.0.0.1 (interface du routeur) configurée ? Sans passerelle correcte, les paquets destinés à d\'autres réseaux ne savent pas où aller. Vérifier avec ipconfig /all sur un poste client.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'srvms-m05',
        titre: 'DHCP Windows Server',
        cas: [
          {
            id: 'cas-srms-009',
            titre: 'Configuration d\'une étendue DHCP',
            difficulte: 'facile',
            format: 'terminal',
            objectif: 'Créer et activer une étendue DHCP sur Windows Server avec les options réseau',
            contexte: 'Vous devez configurer le serveur DHCP pour le réseau 192.168.10.0/24. Les clients doivent recevoir une IP entre .100 et .200, avec la passerelle 192.168.10.1 et le DNS 192.168.10.10.',
            contenu: {
              prompt: 'PS C:\\> ',
              commandes: {
                'Install-WindowsFeature DHCP -IncludeManagementTools': 'Success Restart Needed Exit Code Feature Result\n------- -------------- --------- --------------\nTrue    No             Success   {Serveur DHCP, Outils de gestion DHCP}',
                'Add-DhcpServerInDC -DnsName "SRV01.tssr.local" -IpAddress 192.168.10.10': '',
                'Add-DhcpServerv4Scope -Name "LAN-Bureau" -StartRange 192.168.10.100 -EndRange 192.168.10.200 -SubnetMask 255.255.255.0 -Description "Réseau bureaux"': '',
                'Set-DhcpServerv4OptionValue -ScopeId 192.168.10.0 -Router 192.168.10.1 -DnsServer 192.168.10.10 -DnsDomain "tssr.local"': '',
                'Add-DhcpServerv4ExclusionRange -ScopeId 192.168.10.0 -StartRange 192.168.10.100 -EndRange 192.168.10.110': '',
                'Get-DhcpServerv4Scope': 'ScopeId       SubnetMask    Name       State    StartRange      EndRange\n--------       ----------    ----       -----    ----------      --------\n192.168.10.0  255.255.255.0 LAN-Bureau Active   192.168.10.100  192.168.10.200',
                'Get-DhcpServerv4OptionValue -ScopeId 192.168.10.0': 'OptionId   Name            Type         Value\n--------   ----            ----         -----\n       3   Router          IPv4Address  {192.168.10.1}\n       6   DNS Servers     IPv4Address  {192.168.10.10}\n      15   DNS Domain Name String       {tssr.local}'
              },
              validation: [
                'Rôle DHCP installé et autorisé dans l\'AD avec Add-DhcpServerInDC',
                'Étendue créée avec la plage .100-.200',
                'Options 3 (passerelle), 6 (DNS) et 15 (domaine) configurées',
                'Plage d\'exclusion définie pour les adresses réservées aux équipements fixes'
              ],
              indices: [
                'Add-DhcpServerInDC est obligatoire pour autoriser le serveur DHCP dans le domaine AD',
                'L\'étendue est automatiquement Active après création',
                'Les exclusions servent à réserver des IPs pour les équipements avec IP fixe'
              ],
              solution: [
                'Install-WindowsFeature DHCP -IncludeManagementTools',
                'Add-DhcpServerInDC puis Add-DhcpServerv4Scope',
                'Set-DhcpServerv4OptionValue -ScopeId ... -Router ... -DnsServer ...'
              ]
            }
          },
          {
            id: 'cas-srms-010',
            titre: 'Diagnostic client sans adresse IP DHCP',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Identifier et résoudre pourquoi un client Windows ne reçoit pas d\'adresse DHCP',
            contexte: 'Un poste client affiche l\'adresse APIPA 169.254.x.x. Le serveur DHCP Windows Server est censé servir ce réseau mais le client n\'obtient pas d\'IP.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Le service DHCP Server est-il démarré ? (Get-Service DHCPServer)',
                  choix: [
                    { texte: 'Non, service arrêté', suite: 'n_svc' },
                    { texte: 'Oui, service Running', suite: 'n2' }
                  ]
                },
                n_svc: {
                  solution: true,
                  correct: true,
                  texte: 'Démarrer le service DHCPServer',
                  explication: 'Start-Service DHCPServer && Set-Service DHCPServer -StartupType Automatic. Sur le poste client, forcer un renouvellement : ipconfig /release puis ipconfig /renew.'
                },
                n2: {
                  question: 'L\'étendue DHCP couvrant ce réseau est-elle Active ?',
                  choix: [
                    { texte: 'Non, étendue Inactive ou inexistante', suite: 'n_scope' },
                    { texte: 'Oui, étendue Active', suite: 'n3' }
                  ]
                },
                n_scope: {
                  solution: true,
                  correct: true,
                  texte: 'Activer l\'étendue ou créer l\'étendue manquante',
                  explication: 'Get-DhcpServerv4Scope pour lister les étendues. Si elle existe mais est inactive : Set-DhcpServerv4Scope -ScopeId x.x.x.0 -State Active. Si elle n\'existe pas, la créer avec Add-DhcpServerv4Scope.'
                },
                n3: {
                  question: 'Des adresses sont-elles disponibles dans l\'étendue ?',
                  choix: [
                    { texte: 'Non, pool épuisé', suite: 'n_pool' },
                    { texte: 'Oui, adresses disponibles', suite: 'n4' }
                  ]
                },
                n_pool: {
                  solution: true,
                  correct: true,
                  texte: 'Étendre la plage ou libérer les baux expirés',
                  explication: 'Get-DhcpServerv4ScopeStatistics -ScopeId x.x.x.0 montre le taux d\'utilisation. Solutions : étendre la plage avec Set-DhcpServerv4Scope, supprimer les baux inactifs anciens, ou réduire la durée de bail.'
                },
                n4: {
                  question: 'Le serveur DHCP est-il autorisé dans Active Directory ?',
                  choix: [
                    { texte: 'Non, non autorisé', suite: 'n_auth' },
                    { texte: 'Oui, autorisé', suite: 'n5' }
                  ]
                },
                n_auth: {
                  solution: true,
                  correct: true,
                  texte: 'Autoriser le serveur DHCP dans l\'AD',
                  explication: 'Add-DhcpServerInDC -DnsName "SRV01.tssr.local" -IpAddress 192.168.10.10. Un serveur DHCP non autorisé dans un domaine AD sera automatiquement arrêté par les autres contrôleurs de domaine (protection contre les serveurs DHCP pirates).'
                },
                n5: {
                  solution: true,
                  correct: false,
                  texte: 'Vérifier le pare-feu et le réseau entre client et serveur',
                  explication: 'Le protocole DHCP utilise les ports UDP 67 (serveur) et 68 (client). Vérifier que le pare-feu Windows autorise ces ports. Si le client est sur un VLAN différent, un DHCP Relay Agent (ip helper-address) est nécessaire sur le routeur/switch L3.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'srvms-m06',
        titre: 'DNS Windows Server',
        cas: [
          {
            id: 'cas-srms-011',
            titre: 'Configuration d\'une zone DNS et enregistrements',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Créer une zone DNS principale, ajouter des enregistrements A et PTR, et tester la résolution',
            contexte: 'Vous devez configurer le serveur DNS pour le domaine tssr.local. Créer la zone, ajouter les enregistrements pour SRV01 (192.168.1.10) et configurer la zone inverse.',
            contenu: {
              prompt: 'PS C:\\> ',
              commandes: {
                'Install-WindowsFeature DNS -IncludeManagementTools': 'Success Restart Needed Exit Code Feature Result\n------- -------------- --------- --------------\nTrue    No             Success   {Serveur DNS, Outils de gestion DNS}',
                'Add-DnsServerPrimaryZone -Name "tssr.local" -ZoneFile "tssr.local.dns" -DynamicUpdate None': '',
                'Add-DnsServerPrimaryZone -NetworkId "192.168.1.0/24" -ZoneFile "1.168.192.in-addr.arpa.dns"': '',
                'Add-DnsServerResourceRecordA -ZoneName "tssr.local" -Name "SRV01" -IPv4Address "192.168.1.10" -CreatePtr': 'HostName   RecordType Timestamp  TimeToLive  RecordData\n--------   ---------- ---------  ----------  ----------\nSRV01      A          0          01:00:00    192.168.1.10',
                'Add-DnsServerResourceRecordA -ZoneName "tssr.local" -Name "PC-ADMIN" -IPv4Address "192.168.1.50" -CreatePtr': '',
                'Resolve-DnsName -Name "SRV01.tssr.local" -Server 127.0.0.1': 'Name                           Type   TTL   Section    IPAddress\n----                           ----   ---   -------    ---------\nSRV01.tssr.local               A      3600  Answer     192.168.1.10',
                'Resolve-DnsName -Name "10.1.168.192.in-addr.arpa" -Server 127.0.0.1': 'Name                              Type   TTL   Section   NameHost\n----                              ----   ---   -------   --------\n10.1.168.192.in-addr.arpa         PTR    3600  Answer    SRV01.tssr.local'
              },
              validation: [
                'Zone principale tssr.local créée',
                'Zone inverse 192.168.1.0/24 créée',
                'Enregistrement A pour SRV01 créé avec -CreatePtr (génère automatiquement le PTR)',
                'Résolution directe et inverse vérifiée avec Resolve-DnsName'
              ],
              indices: [
                '-CreatePtr crée automatiquement l\'enregistrement PTR dans la zone inverse',
                'La zone inverse se nomme selon le réseau inversé : 1.168.192.in-addr.arpa',
                'Resolve-DnsName -Server 127.0.0.1 teste directement ce serveur DNS'
              ],
              solution: [
                'Add-DnsServerPrimaryZone -Name "tssr.local"',
                'Add-DnsServerPrimaryZone -NetworkId "192.168.1.0/24"',
                'Add-DnsServerResourceRecordA -ZoneName "tssr.local" -Name "SRV01" -IPv4Address "192.168.1.10" -CreatePtr',
                'Resolve-DnsName pour vérifier'
              ]
            }
          },
          {
            id: 'cas-srms-012',
            titre: 'Diagnostic panne de résolution DNS',
            difficulte: 'difficile',
            format: 'arbre',
            objectif: 'Identifier et résoudre une panne de résolution DNS sur un réseau Windows',
            contexte: 'Les postes du domaine tssr.local ne peuvent plus résoudre les noms de domaine internes ni accéder à Internet par nom. La résolution par IP fonctionne encore.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Le service DNS Server est-il démarré sur le serveur ? (Get-Service DNS)',
                  choix: [
                    { texte: 'Non, service arrêté', suite: 'n_svc' },
                    { texte: 'Oui, service Running', suite: 'n2' }
                  ]
                },
                n_svc: {
                  solution: true,
                  correct: true,
                  texte: 'Démarrer le service DNS',
                  explication: 'Start-Service DNS && Set-Service DNS -StartupType Automatic. Vérifier l\'Observateur d\'événements (DNS Server logs) pour comprendre pourquoi il s\'est arrêté. Sur les clients, vider le cache : ipconfig /flushdns.'
                },
                n2: {
                  question: 'nslookup SRV01.tssr.local fonctionne-t-il depuis le serveur lui-même ?',
                  choix: [
                    { texte: 'Non, échec depuis le serveur', suite: 'n3' },
                    { texte: 'Oui, fonctionne depuis le serveur', suite: 'n4' }
                  ]
                },
                n3: {
                  question: 'La zone tssr.local existe-t-elle dans le serveur DNS ? (Get-DnsServerZone)',
                  choix: [
                    { texte: 'Non, zone absente', suite: 'n_zone' },
                    { texte: 'Oui, zone présente', suite: 'n_rec' }
                  ]
                },
                n_zone: {
                  solution: true,
                  correct: true,
                  texte: 'Recréer la zone DNS principale',
                  explication: 'La zone a peut-être été supprimée accidentellement. Add-DnsServerPrimaryZone -Name "tssr.local". Si le DNS est intégré à AD (Active Directory Integrated Zone), utiliser Add-DnsServerPrimaryZone -Name "tssr.local" -ReplicationScope "Domain" pour recréer et répliquer via AD.'
                },
                n_rec: {
                  solution: true,
                  correct: false,
                  texte: 'Vérifier les enregistrements SOA et NS',
                  explication: 'Get-DnsServerResourceRecord -ZoneName "tssr.local" -RRType SOA et NS. Si les enregistrements SOA/NS sont corrompus ou manquants, la zone ne peut pas répondre correctement. Supprimer et recréer la zone si nécessaire.'
                },
                n4: {
                  question: 'Les clients ont-ils bien l\'adresse du serveur DNS configurée ?',
                  choix: [
                    { texte: 'Non, mauvaise adresse DNS sur les clients', suite: 'n_client' },
                    { texte: 'Oui, adresse DNS correcte', suite: 'n5' }
                  ]
                },
                n_client: {
                  solution: true,
                  correct: true,
                  texte: 'Corriger l\'adresse DNS sur les clients (via DHCP ou manuellement)',
                  explication: 'Si les clients reçoivent leur config via DHCP, mettre à jour l\'option DNS : Set-DhcpServerv4OptionValue -ScopeId x.x.x.0 -DnsServer <IP-correcte>. Les clients doivent renouveler leur bail DHCP (ipconfig /renew) pour recevoir la nouvelle config.'
                },
                n5: {
                  question: 'La résolution externe (Internet) échoue-t-elle aussi ?',
                  choix: [
                    { texte: 'Oui, interne OK mais externe KO', suite: 'n_forwarder' },
                    { texte: 'Les deux échouent depuis les clients', suite: 'n_cache' }
                  ]
                },
                n_forwarder: {
                  solution: true,
                  correct: true,
                  texte: 'Configurer les forwarders DNS',
                  explication: 'Le serveur DNS interne doit transmettre les requêtes externes vers un résolveur public. Set-DnsServerForwarder -IPAddress "8.8.8.8","1.1.1.1". Vérifier aussi que le serveur a bien accès à Internet (pare-feu, passerelle).'
                },
                n_cache: {
                  solution: true,
                  correct: false,
                  texte: 'Vider le cache DNS des clients et vérifier la connectivité',
                  explication: 'ipconfig /flushdns sur les clients. Tester nslookup depuis un client avec le serveur explicite : nslookup google.com 192.168.1.10. Si ça fonctionne, le cache était corrompu. Sinon, vérifier la connectivité réseau entre clients et serveur DNS.'
                }
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: 'systeme-client-ms',
    titre: 'Système Client Microsoft',
    emoji: '💻',
    modules: [
      {
        id: 'winclient-m01',
        titre: 'Interagir avec Windows 10',
        cas: [
          {
            id: 'cas-wc-001',
            titre: 'Exploration et gestion du système via PowerShell',
            difficulte: 'facile',
            format: 'terminal',
            objectif: 'Utiliser PowerShell pour obtenir des informations système et gérer des processus',
            contexte: 'Vous devez auditer rapidement un poste Windows 10 : version OS, espace disque, processus gourmands et services actifs.',
            contenu: {
              prompt: 'PS C:\\> ',
              commandes: {
                'Get-ComputerInfo | Select-Object WindowsProductName, WindowsVersion, OsArchitecture': 'WindowsProductName : Windows 10 Pro\nWindowsVersion     : 2009\nOsArchitecture     : 64 bits',
                'Get-PSDrive -PSProvider FileSystem | Select-Object Name, Used, Free': 'Name Used(GB) Free(GB)\n---- -------- --------\nC       98.4     153.6\nD        0.0     465.8',
                'Get-Process | Sort-Object CPU -Descending | Select-Object -First 5 Name, CPU, WorkingSet': 'Name           CPU WorkingSet\n----           --- ----------\nchrome       245.3  412844032\nCode          89.1  312442880\nsvchost       12.4   45678912\nWindowsTerminal 8.2  98456320\nexplorer       4.1   67234816',
                'Get-Service | Where-Object {$_.Status -eq "Running"} | Measure-Object': 'Count    : 87\nAverage  :\nSum      :\nMaximum  :\nMinimum  :\nProperty :',
                'Get-EventLog -LogName System -Newest 5 -EntryType Error | Select-Object TimeGenerated, Source, Message': 'TimeGenerated        Source          Message\n-------------        ------          -------\n21/03/2026 08:12:33  disk            Le pilote a détecté une erreur...\n20/03/2026 23:44:11  Netlogon        ...'
              },
              validation: [
                'Info système récupérée avec Get-ComputerInfo',
                'Espace disque vérifié avec Get-PSDrive',
                'Processus triés par CPU avec Sort-Object',
                'Services Running comptés avec Measure-Object'
              ],
              indices: [
                'Select-Object -First 5 limite les résultats',
                'Where-Object filtre les objets selon une condition',
                'Get-EventLog nécessite des droits administrateur'
              ],
              solution: [
                'Get-ComputerInfo | Select-Object WindowsProductName, WindowsVersion',
                'Get-PSDrive -PSProvider FileSystem',
                'Get-Process | Sort-Object CPU -Descending | Select-Object -First 5'
              ]
            }
          },
          {
            id: 'cas-wc-002',
            titre: 'Diagnostic démarrage lent de Windows 10',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Identifier et résoudre les causes d\'un démarrage anormalement lent',
            contexte: 'Un utilisateur se plaint que son PC Windows 10 met plus de 5 minutes à démarrer depuis quelques jours. Avant, il démarrait en 30 secondes.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Le démarrage rapide (Fast Startup) est-il activé dans les options d\'alimentation ?',
                  choix: [
                    { texte: 'Non, désactivé', suite: 'n2' },
                    { texte: 'Oui, activé', suite: 'n_fast' }
                  ]
                },
                n_fast: {
                  solution: true,
                  correct: false,
                  texte: 'Le Fast Startup est actif — chercher ailleurs',
                  explication: 'Le Fast Startup accélère normalement le démarrage. Si le PC est quand même lent, le problème vient d\'ailleurs. Continuer le diagnostic.'
                },
                n2: {
                  question: 'Combien de programmes se lancent au démarrage ? (Gestionnaire des tâches > Démarrage)',
                  choix: [
                    { texte: 'Beaucoup, impact élevé', suite: 'n_startup' },
                    { texte: 'Peu, impact faible', suite: 'n3' }
                  ]
                },
                n_startup: {
                  solution: true,
                  correct: true,
                  texte: 'Désactiver les programmes au démarrage inutiles',
                  explication: 'Dans le Gestionnaire des tâches > onglet Démarrage, désactiver les applications non essentielles (impact Élevé). Ou via msconfig > onglet Démarrage. Les programmes Dropbox, OneDrive, Teams, etc. peuvent considérablement ralentir le boot.'
                },
                n3: {
                  question: 'L\'utilisation du disque atteint-elle 100% au démarrage ? (Gestionnaire des tâches)',
                  choix: [
                    { texte: 'Oui, disque à 100%', suite: 'n4' },
                    { texte: 'Non, disque normal', suite: 'n5' }
                  ]
                },
                n4: {
                  question: 'Le disque est-il un HDD mécanique ou un SSD ?',
                  choix: [
                    { texte: 'HDD mécanique', suite: 'n_hdd' },
                    { texte: 'SSD', suite: 'n_ssd100' }
                  ]
                },
                n_hdd: {
                  solution: true,
                  correct: true,
                  texte: 'Optimiser le HDD et envisager le remplacement par SSD',
                  explication: 'Exécuter chkdsk /f /r pour vérifier les secteurs défectueux. Défragmenter avec Optimize-Volume -DriveLetter C -Defrag. Le passage à un SSD réduirait le temps de boot de 5 min à 20s. Vérifier aussi que le service SysMain (SuperFetch) est actif.'
                },
                n_ssd100: {
                  solution: true,
                  correct: false,
                  texte: 'SSD à 100% : service Windows Update ou antivirus en cause',
                  explication: 'Sur SSD, 100% d\'utilisation au boot est souvent dû à Windows Update en cours ou un antivirus qui scanne. Vérifier dans le Gestionnaire des tâches quel processus utilise le disque. Attendre la fin des mises à jour ou exclure les dossiers système de l\'antivirus.'
                },
                n5: {
                  question: 'Des mises à jour Windows sont-elles en attente ou en cours d\'installation ?',
                  choix: [
                    { texte: 'Oui, mises à jour en cours', suite: 'n_wu' },
                    { texte: 'Non, système à jour', suite: 'n_driver' }
                  ]
                },
                n_wu: {
                  solution: true,
                  correct: true,
                  texte: 'Laisser les mises à jour se terminer',
                  explication: 'Les mises à jour de fonctionnalités Windows (Feature Updates) peuvent prendre plusieurs redémarrages. Vérifier dans Paramètres > Windows Update. Une fois terminées, le démarrage reviendra à la normale.'
                },
                n_driver: {
                  solution: true,
                  correct: false,
                  texte: 'Vérifier les pilotes défaillants',
                  explication: 'Un pilote défectueux peut bloquer le démarrage. Consulter l\'Observateur d\'événements > Journaux Windows > Système, filtrer sur les erreurs au moment du boot. Utiliser msinfo32 > Environnement logiciel > Pilotes pour identifier les pilotes en erreur.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'winclient-m02',
        titre: 'Gestion du stockage client Microsoft',
        cas: [
          {
            id: 'cas-wc-003',
            titre: 'Partitionnement et formatage avec diskpart',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Initialiser un nouveau disque, créer une partition et la formater via diskpart',
            contexte: 'Un nouveau disque dur de 500 Go a été ajouté à un poste Windows 10. Vous devez l\'initialiser, créer une partition principale et la formater en NTFS.',
            contenu: {
              prompt: 'DISKPART> ',
              commandes: {
                'list disk': 'Numéro disque  Statut         Taille    Libre   Dyn  GPT\n-------------  ----------     --------  ------  ---  ---\nDisque 0       En ligne       238 Go    0 o          *\nDisque 1       En ligne       465 Go    465 Go',
                'select disk 1': 'Le disque 1 est maintenant le disque sélectionné.',
                'clean': 'DiskPart a nettoyé le disque.',
                'convert gpt': 'DiskPart a converti le disque sélectionné au format GPT.',
                'create partition primary': 'DiskPart a créé la partition spécifiée.',
                'format fs=ntfs label="Données" quick': '  100 pourcent effectués\nDiskPart a formaté le volume.',
                'assign letter=D': 'DiskPart a correctement assigné la lettre de lecteur ou le point de montage.',
                'list volume': 'Numéro vol. Ltr  Étiquette  Fs     Type        Taille   Statut    Info\n----------  ---  ---------  -----  ----------  -------  --------  ----\nVolume 0    C    Windows    NTFS   Partition   238 Go   Sain      Système\nVolume 1    D    Données    NTFS   Partition   465 Go   Sain'
              },
              validation: [
                'Disque sélectionné avec select disk',
                'Nettoyé avec clean avant initialisation',
                'Converti en GPT (recommandé pour disques > 2 To)',
                'Partition créée, formatée NTFS et lettre assignée'
              ],
              indices: [
                'clean efface toutes les partitions existantes — irréversible',
                'GPT est préférable à MBR pour les disques modernes',
                'format quick fait un formatage rapide (sans vérification secteur)'
              ],
              solution: [
                'select disk 1 → clean → convert gpt',
                'create partition primary → format fs=ntfs quick',
                'assign letter=D'
              ]
            }
          },
          {
            id: 'cas-wc-004',
            titre: 'Diagnostic disque système presque plein',
            difficulte: 'facile',
            format: 'arbre',
            objectif: 'Identifier ce qui occupe l\'espace disque et libérer de la place sur C:\\',
            contexte: 'Le lecteur C:\\ d\'un poste Windows 10 est à 95% de capacité. Windows affiche des alertes d\'espace insuffisant.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Avez-vous exécuté le Nettoyage de disque (cleanmgr) pour voir ce qui est libérable ?',
                  choix: [
                    { texte: 'Non, pas encore', suite: 'n_clean' },
                    { texte: 'Oui, fait — peu libéré', suite: 'n2' }
                  ]
                },
                n_clean: {
                  solution: true,
                  correct: true,
                  texte: 'Lancer le Nettoyage de disque (Fichiers système inclus)',
                  explication: 'cleanmgr /sagerun:1 ou via l\'interface : clic droit sur C:\\ > Propriétés > Nettoyage de disque > Nettoyer les fichiers système. Cela peut libérer des Go de mises à jour Windows, fichiers temporaires, corbeille, etc.'
                },
                n2: {
                  question: 'Le dossier WinSxS ou Windows\\Installer est-il anormalement grand ?',
                  choix: [
                    { texte: 'Oui, WinSxS > 10 Go', suite: 'n_winsxs' },
                    { texte: 'Non, tailles normales', suite: 'n3' }
                  ]
                },
                n_winsxs: {
                  solution: true,
                  correct: true,
                  texte: 'Nettoyer WinSxS avec DISM',
                  explication: 'Dism /Online /Cleanup-Image /StartComponentCleanup /ResetBase supprime les anciennes versions de composants. Attention : après /ResetBase, impossible de désinstaller les mises à jour récentes. Peut libérer 3-8 Go.'
                },
                n3: {
                  question: 'Y a-t-il de gros dossiers utilisateur (Téléchargements, Vidéos, Musique) sur C:\\ ?',
                  choix: [
                    { texte: 'Oui, dossiers utilisateur volumineux', suite: 'n_user' },
                    { texte: 'Non, dossiers utilisateur normaux', suite: 'n4' }
                  ]
                },
                n_user: {
                  solution: true,
                  correct: true,
                  texte: 'Déplacer les dossiers utilisateur vers un autre lecteur',
                  explication: 'Clic droit sur le dossier (Téléchargements, Documents…) > Propriétés > Emplacement > Déplacer. Pointer vers D:\\ ou un autre lecteur. Alternativement, activer le Stockage à la demande OneDrive pour décharger les fichiers dans le cloud.'
                },
                n4: {
                  solution: true,
                  correct: false,
                  texte: 'Utiliser TreeSize ou WinDirStat pour identifier les gros fichiers',
                  explication: 'Des outils comme TreeSize Free ou WinDirStat visualisent l\'occupation disque par dossier. Cela permet d\'identifier des logs applicatifs volumineux, des dumps, des caches logiciels (antivirus, navigateurs) ou des anciennes sauvegardes.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'winclient-m03',
        titre: 'Les utilisateurs et groupes',
        cas: [
          {
            id: 'cas-wc-005',
            titre: 'Gestion des comptes et groupes locaux',
            difficulte: 'facile',
            format: 'terminal',
            objectif: 'Créer des comptes locaux, les affecter à des groupes et configurer les politiques de mot de passe',
            contexte: 'Sur un poste autonome Windows 10, vous devez créer un compte standard pour un stagiaire, limiter ses droits et configurer l\'expiration du mot de passe.',
            contenu: {
              prompt: 'PS C:\\> ',
              commandes: {
                'New-LocalUser -Name "stagiaire01" -Password (ConvertTo-SecureString "Stage2026!" -AsPlainText -Force) -FullName "Stagiaire 01" -PasswordNeverExpires $false': 'Name        Enabled\n----        -------\nstagiaire01 True',
                'Add-LocalGroupMember -Group "Utilisateurs" -Member "stagiaire01"': '',
                'Get-LocalGroupMember -Group "Utilisateurs" | Select-Object Name': 'Name\n----\nDESKTOP-01\\stagiaire01\nDESKTOP-01\\Utilisateurs du domaine',
                'Set-LocalUser -Name "stagiaire01" -AccountExpires (Get-Date).AddMonths(3)': '',
                'Get-LocalUser -Name "stagiaire01" | Select-Object Name, Enabled, AccountExpires, PasswordExpires': 'Name        Enabled AccountExpires       PasswordExpires\n----        ------- --------------       ---------------\nstagiaire01 True    21/06/2026 00:00:00',
                'Get-LocalGroup | Select-Object Name, Description': 'Name                             Description\n----                             -----------\nAdministrateurs                  Les membres du groupe...\nUtilisateurs                     Empêche les utilisateurs...\nInvités                          ...\nOpérateurs de sauvegarde         ...'
              },
              validation: [
                'Compte créé avec -PasswordNeverExpires $false',
                'Ajouté au groupe Utilisateurs (pas Administrateurs)',
                'Expiration du compte configurée avec -AccountExpires',
                'Vérification avec Get-LocalUser'
              ],
              indices: [
                'Le groupe "Utilisateurs" donne des droits limités (pas d\'install logiciel)',
                '(Get-Date).AddMonths(3) calcule la date dans 3 mois',
                '-PasswordNeverExpires $false force l\'expiration selon la politique'
              ],
              solution: [
                'New-LocalUser -Name "stagiaire01" -PasswordNeverExpires $false',
                'Add-LocalGroupMember -Group "Utilisateurs" -Member "stagiaire01"',
                'Set-LocalUser -Name "stagiaire01" -AccountExpires (Get-Date).AddMonths(3)'
              ]
            }
          },
          {
            id: 'cas-wc-006',
            titre: 'Diagnostic connexion utilisateur refusée',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Identifier pourquoi un utilisateur local ne peut pas ouvrir de session Windows 10',
            contexte: 'Un utilisateur tente de se connecter à un poste Windows 10 mais reçoit le message "Le nom d\'utilisateur ou le mot de passe est incorrect" ou "Votre compte a été désactivé".',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Quel message d\'erreur l\'utilisateur reçoit-il exactement ?',
                  choix: [
                    { texte: '"Nom d\'utilisateur ou mot de passe incorrect"', suite: 'n2' },
                    { texte: '"Votre compte a été désactivé"', suite: 'n_dis' },
                    { texte: '"Votre compte a expiré"', suite: 'n_exp' }
                  ]
                },
                n_dis: {
                  solution: true,
                  correct: true,
                  texte: 'Réactiver le compte avec Enable-LocalUser',
                  explication: 'Enable-LocalUser -Name "nomutilisateur". Le compte peut avoir été désactivé manuellement ou par une politique de sécurité. Vérifier l\'historique dans l\'Observateur d\'événements (événement 4722/4725).'
                },
                n_exp: {
                  solution: true,
                  correct: true,
                  texte: 'Mettre à jour la date d\'expiration du compte',
                  explication: 'Set-LocalUser -Name "nomutilisateur" -AccountExpires ([DateTime]::MaxValue) pour supprimer l\'expiration. Ou définir une nouvelle date : Set-LocalUser -Name "nom" -AccountExpires (Get-Date).AddYears(1).'
                },
                n2: {
                  question: 'L\'utilisateur se souvient-il de son dernier mot de passe correct ?',
                  choix: [
                    { texte: 'Non, mot de passe oublié', suite: 'n_reset' },
                    { texte: 'Oui mais ça ne marche plus', suite: 'n3' }
                  ]
                },
                n_reset: {
                  solution: true,
                  correct: true,
                  texte: 'Réinitialiser le mot de passe avec un compte admin',
                  explication: 'Depuis un compte administrateur : Set-LocalUser -Name "nomutilisateur" -Password (ConvertTo-SecureString "NouveauMDP!" -AsPlainText -Force). Ou via lusrmgr.msc > clic droit sur l\'utilisateur > Définir le mot de passe.'
                },
                n3: {
                  question: 'Le verrouillage des majuscules (Caps Lock) est-il activé ?',
                  choix: [
                    { texte: 'Oui, Caps Lock activé', suite: 'n_caps' },
                    { texte: 'Non, Caps Lock désactivé', suite: 'n4' }
                  ]
                },
                n_caps: {
                  solution: true,
                  correct: true,
                  texte: 'Désactiver Caps Lock et réessayer',
                  explication: 'Cause très fréquente ! Les mots de passe Windows sont sensibles à la casse. Appuyer sur Caps Lock pour le désactiver et retaper le mot de passe normalement.'
                },
                n4: {
                  question: 'Le compte est-il verrouillé après trop de tentatives ? (lusrmgr.msc)',
                  choix: [
                    { texte: 'Oui, compte verrouillé', suite: 'n_locked' },
                    { texte: 'Non, compte non verrouillé', suite: 'n_layout' }
                  ]
                },
                n_locked: {
                  solution: true,
                  correct: true,
                  texte: 'Déverrouiller le compte',
                  explication: 'Dans lusrmgr.msc > double-cliquer sur l\'utilisateur > décocher "Le compte est verrouillé". Ou en PowerShell : Unlock-LocalUser n\'existe pas nativement, mais décocher via l\'interface ou réinitialiser le mot de passe déverrouille aussi.'
                },
                n_layout: {
                  solution: true,
                  correct: false,
                  texte: 'Vérifier la disposition du clavier',
                  explication: 'La disposition du clavier à l\'écran de connexion peut différer de celle de la session. Vérifier l\'indicateur de langue en bas à droite de l\'écran de connexion. Un clavier en QWERTY au lieu d\'AZERTY explique les erreurs de saisie.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'winclient-m04',
        titre: 'Sécurité NTFS et ACLs',
        cas: [
          {
            id: 'cas-wc-007',
            titre: 'Configuration des permissions NTFS avec icacls',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Configurer des permissions NTFS précises sur un dossier avec icacls et vérifier les ACLs',
            contexte: 'Vous créez un dossier partagé C:\\Projets\\RH. Le groupe "GRP_RH" doit avoir Modification, les managers "Contrôle total", et les autres utilisateurs aucun accès.',
            contenu: {
              prompt: 'C:\\> ',
              commandes: {
                'mkdir C:\\Projets\\RH': '',
                'icacls "C:\\Projets\\RH" /inheritance:d': 'C:\\Projets\\RH : 1 fichier(s) traité(s)',
                'icacls "C:\\Projets\\RH" /remove "Utilisateurs"': 'C:\\Projets\\RH : 1 fichier(s) traité(s)',
                'icacls "C:\\Projets\\RH" /grant "GRP_RH:(OI)(CI)M"': 'C:\\Projets\\RH : 1 fichier(s) traité(s)',
                'icacls "C:\\Projets\\RH" /grant "GRP_Managers:(OI)(CI)F"': 'C:\\Projets\\RH : 1 fichier(s) traité(s)',
                'icacls "C:\\Projets\\RH"': 'C:\\Projets\\RH BUILTIN\\Administrateurs:(OI)(CI)(F)\n               DESKTOP-01\\GRP_RH:(OI)(CI)(M)\n               DESKTOP-01\\GRP_Managers:(OI)(CI)(F)\n               NT AUTHORITY\\SYSTEM:(OI)(CI)(F)'
              },
              validation: [
                '/inheritance:d désactive l\'héritage des permissions parent',
                '/remove "Utilisateurs" supprime l\'accès par défaut',
                '(OI)(CI) applique les permissions aux objets et conteneurs enfants',
                'M = Modification, F = Contrôle total'
              ],
              indices: [
                '/inheritance:d = disable inheritance (sans copier les ACL existantes)',
                '(OI) = Object Inherit, (CI) = Container Inherit',
                'F = Full control, M = Modify, R = Read, W = Write'
              ],
              solution: [
                'icacls "C:\\Projets\\RH" /inheritance:d',
                'icacls "C:\\Projets\\RH" /remove "Utilisateurs"',
                'icacls "C:\\Projets\\RH" /grant "GRP_RH:(OI)(CI)M"',
                'icacls "C:\\Projets\\RH" /grant "GRP_Managers:(OI)(CI)F"'
              ]
            }
          },
          {
            id: 'cas-wc-008',
            titre: 'Diagnostic accès refusé sur fichier NTFS',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Identifier pourquoi un utilisateur reçoit "Accès refusé" sur un fichier ou dossier NTFS',
            contexte: 'Un utilisateur du groupe GRP_RH reçoit "Accès refusé" en tentant de modifier un fichier dans C:\\Projets\\RH, alors qu\'il devrait avoir les droits de Modification.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Quel est le résultat de icacls "C:\\Projets\\RH" pour cet utilisateur ?',
                  choix: [
                    { texte: 'Son groupe n\'apparaît pas dans les ACLs', suite: 'n_noacl' },
                    { texte: 'Son groupe apparaît avec Modification (M)', suite: 'n2' }
                  ]
                },
                n_noacl: {
                  solution: true,
                  correct: true,
                  texte: 'Ajouter le groupe avec icacls /grant',
                  explication: 'icacls "C:\\Projets\\RH" /grant "GRP_RH:(OI)(CI)M". L\'utilisateur doit être membre du groupe GRP_RH (vérifier avec Get-LocalGroupMember). Les modifications de groupe nécessitent une déconnexion/reconnexion pour être prises en compte.'
                },
                n2: {
                  question: 'Y a-t-il une entrée "Deny" (Refus) pour l\'utilisateur ou un groupe auquel il appartient ?',
                  choix: [
                    { texte: 'Oui, une règle Deny est présente', suite: 'n_deny' },
                    { texte: 'Non, aucun Deny', suite: 'n3' }
                  ]
                },
                n_deny: {
                  solution: true,
                  correct: true,
                  texte: 'Supprimer la règle Deny',
                  explication: 'Les règles Deny ont priorité sur les règles Allow en NTFS. icacls "C:\\Projets\\RH" /remove:d "NomUtilisateurOuGroupe". Attention : vérifier QUEL groupe porte le Deny — souvent "Utilisateurs" ou un groupe dont l\'utilisateur est membre sans le savoir.'
                },
                n3: {
                  question: 'L\'héritage est-il désactivé sur le FICHIER spécifique (pas le dossier) ?',
                  choix: [
                    { texte: 'Oui, fichier avec permissions différentes', suite: 'n_file' },
                    { texte: 'Non, héritage normal', suite: 'n4' }
                  ]
                },
                n_file: {
                  solution: true,
                  correct: true,
                  texte: 'Réinitialiser les permissions du fichier pour hériter du dossier parent',
                  explication: 'icacls "C:\\Projets\\RH\\fichier.txt" /reset réinitialise les permissions pour qu\'elles héritent du dossier parent. Le fichier peut avoir été créé avec des permissions restrictives différentes.'
                },
                n4: {
                  solution: true,
                  correct: false,
                  texte: 'Vérifier l\'appartenance au groupe et relancer la session',
                  explication: 'L\'utilisateur est peut-être dans le groupe GRP_RH mais n\'a pas encore rechargé son jeton de sécurité. Demander une déconnexion complète (pas veille) et reconnexion. Vérifier avec whoami /groups dans cmd pour voir les groupes du jeton actuel.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'winclient-m05',
        titre: 'Réseau et pare-feu Windows',
        cas: [
          {
            id: 'cas-wc-009',
            titre: 'Configuration réseau et règles de pare-feu via PowerShell',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Configurer une adresse IP statique et créer des règles de pare-feu sur Windows 10',
            contexte: 'Vous devez configurer un poste Windows 10 avec une IP statique (192.168.5.50/24, GW 192.168.5.1, DNS 192.168.5.10) et autoriser les connexions RDP entrant.',
            contenu: {
              prompt: 'PS C:\\> ',
              commandes: {
                'Get-NetAdapter | Select-Object Name, InterfaceIndex, Status': 'Name       InterfaceIndex Status\n----       -------------- ------\nEthernet            4 Up',
                'New-NetIPAddress -InterfaceIndex 4 -IPAddress 192.168.5.50 -PrefixLength 24 -DefaultGateway 192.168.5.1': 'IPAddress         : 192.168.5.50\nInterfaceIndex    : 4\nPrefixLength      : 24',
                'Set-DnsClientServerAddress -InterfaceIndex 4 -ServerAddresses 192.168.5.10': '',
                'Test-Connection 192.168.5.1 -Count 2': 'Source  Destination Bytes Temps(ms)\n------  ----------- ----- ---------\nPC01    192.168.5.1    32         1\nPC01    192.168.5.1    32         1',
                'New-NetFirewallRule -DisplayName "Autoriser RDP" -Direction Inbound -Protocol TCP -LocalPort 3389 -Action Allow': 'Name                  : {a1b2-...}\nDisplayName           : Autoriser RDP\nEnabled               : True\nProfile               : Any\nDirection             : Inbound\nAction                : Allow',
                'Get-NetFirewallRule -DisplayName "Autoriser RDP" | Select-Object DisplayName, Enabled, Action': 'DisplayName  Enabled Action\n-----------  ------- ------\nAutoriser RDP True   Allow'
              },
              validation: [
                'InterfaceIndex récupéré avec Get-NetAdapter',
                'IP statique configurée avec New-NetIPAddress',
                'DNS configuré avec Set-DnsClientServerAddress',
                'Règle pare-feu RDP créée avec New-NetFirewallRule'
              ],
              indices: [
                'New-NetIPAddress nécessite l\'InterfaceIndex, pas le nom',
                '-PrefixLength 24 correspond au masque /24 (255.255.255.0)',
                '-Direction Inbound pour les connexions entrantes vers ce PC'
              ],
              solution: [
                'Get-NetAdapter pour obtenir InterfaceIndex',
                'New-NetIPAddress -InterfaceIndex 4 -IPAddress 192.168.5.50 -PrefixLength 24 -DefaultGateway 192.168.5.1',
                'New-NetFirewallRule -DisplayName "Autoriser RDP" -Direction Inbound -Protocol TCP -LocalPort 3389 -Action Allow'
              ]
            }
          },
          {
            id: 'cas-wc-010',
            titre: 'Diagnostic pas de réseau sur Windows 10',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Diagnostiquer l\'absence de connectivité réseau sur un poste Windows 10',
            contexte: 'Un poste Windows 10 n\'a plus accès au réseau. L\'icône réseau affiche un "X" rouge ou un point d\'exclamation jaune.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'L\'icône réseau affiche-t-elle un "X" rouge ou un "!" jaune ?',
                  choix: [
                    { texte: '"X" rouge — pas de connexion physique', suite: 'n2' },
                    { texte: '"!" jaune — connecté mais pas Internet', suite: 'n3' }
                  ]
                },
                n2: {
                  question: 'La carte réseau est-elle visible dans le Gestionnaire de périphériques ?',
                  choix: [
                    { texte: 'Non ou avec point d\'exclamation', suite: 'n_driver' },
                    { texte: 'Oui, carte visible et active', suite: 'n_cable' }
                  ]
                },
                n_driver: {
                  solution: true,
                  correct: true,
                  texte: 'Réinstaller le pilote de la carte réseau',
                  explication: 'Gestionnaire de périphériques > Cartes réseau > clic droit > Désinstaller le périphérique > cocher "Supprimer le pilote" > redémarrer. Windows réinstalle le pilote. Ou télécharger le pilote depuis le site du fabricant sur un autre PC et l\'installer via USB.'
                },
                n_cable: {
                  solution: true,
                  correct: true,
                  texte: 'Vérifier le câble et le port switch',
                  explication: 'Tester avec un câble différent. Vérifier les DEL sur le port switch (vert = lien actif). Tester sur un autre port switch. Get-NetAdapter montre "Disconnected" si le câble est débranché ou défectueux.'
                },
                n3: {
                  question: 'L\'adresse IP est-elle une adresse APIPA (169.254.x.x) ?',
                  choix: [
                    { texte: 'Oui, 169.254.x.x', suite: 'n_dhcp' },
                    { texte: 'Non, IP normale', suite: 'n4' }
                  ]
                },
                n_dhcp: {
                  solution: true,
                  correct: true,
                  texte: 'Problème DHCP — forcer le renouvellement',
                  explication: 'ipconfig /release && ipconfig /renew. Si toujours APIPA, le serveur DHCP est inaccessible. Vérifier le service DHCP sur le serveur. En attendant, configurer une IP statique temporaire dans la plage du réseau.'
                },
                n4: {
                  question: 'Pouvez-vous pinguer la passerelle ? (ping 192.168.x.1)',
                  choix: [
                    { texte: 'Non, ping passerelle échoue', suite: 'n_gw' },
                    { texte: 'Oui, passerelle répond', suite: 'n5' }
                  ]
                },
                n_gw: {
                  solution: true,
                  correct: false,
                  texte: 'Vérifier la configuration IP (masque, passerelle)',
                  explication: 'ipconfig /all pour afficher la config complète. Vérifier que l\'adresse IP, le masque et la passerelle sont cohérents avec le réseau. Une mauvaise passerelle empêche l\'accès aux autres réseaux mais pas au réseau local.'
                },
                n5: {
                  solution: true,
                  correct: true,
                  texte: 'Réinitialiser la pile TCP/IP et le cache DNS',
                  explication: 'netsh int ip reset && netsh winsock reset && ipconfig /flushdns puis redémarrer. Ces commandes réinitialisent la pile réseau Windows qui peut être corrompue. Après redémarrage, tester à nouveau la connectivité.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'winclient-m06',
        titre: 'Le partage de ressources',
        cas: [
          {
            id: 'cas-wc-011',
            titre: 'Création d\'un partage réseau avec net share',
            difficulte: 'facile',
            format: 'terminal',
            objectif: 'Créer un partage réseau, configurer les permissions de partage et vérifier l\'accès',
            contexte: 'Vous devez partager le dossier C:\\Partage\\Commun sous le nom "Commun" sur le réseau, avec accès en lecture pour "Tout le monde" et contrôle total pour les administrateurs.',
            contenu: {
              prompt: 'C:\\> ',
              commandes: {
                'mkdir C:\\Partage\\Commun': '',
                'net share Commun=C:\\Partage\\Commun /GRANT:Administrateurs,FULL /GRANT:"Tout le monde",READ /REMARK:"Dossier commun partagé"': 'Commun a été partagé.',
                'net share Commun': 'Nom du partage    Commun\nChemin            C:\\Partage\\Commun\nRemarque          Dossier commun partagé\nDroits max.       Illimité\nUtilisateurs      0\nCache             Manuel\nAutorisation      Administrateurs CONTRÔLE TOTAL\n                  Tout le monde  LECTURE',
                'net use \\\\localhost\\Commun': 'La commande a été exécutée correctement.',
                'net share': 'Nom du partage  Ressource                        Remarque\n---------------  ----                             -------\nC$               C:\\                               Partage admin par défaut\nIPC$                                               IPC distant\nCommun           C:\\Partage\\Commun                 Dossier commun partagé'
              },
              validation: [
                'Dossier créé avant le partage',
                'Partage créé avec net share incluant les permissions /GRANT',
                'Vérification avec net share NomPartage',
                'Test d\'accès avec net use'
              ],
              indices: [
                '/GRANT:Groupe,Permission — FULL, READ, ou CHANGE',
                'Les permissions de partage s\'ajoutent aux permissions NTFS',
                '"Tout le monde" entre guillemets car espace dans le nom'
              ],
              solution: [
                'net share Commun=C:\\Partage\\Commun /GRANT:Administrateurs,FULL /GRANT:"Tout le monde",READ',
                'net share Commun (pour vérifier)',
                'net use \\\\localhost\\Commun (pour tester)'
              ]
            }
          },
          {
            id: 'cas-wc-012',
            titre: 'Diagnostic partage réseau inaccessible',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Identifier pourquoi un partage réseau Windows n\'est pas accessible depuis un autre poste',
            contexte: 'Un utilisateur ne peut pas accéder au partage \\\\PC-BUREAU\\Commun depuis son poste. Il reçoit "Windows ne peut pas accéder à \\\\PC-BUREAU\\Commun".',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'PC-BUREAU répond-il au ping depuis le poste client ?',
                  choix: [
                    { texte: 'Non, ping échoue', suite: 'n_net' },
                    { texte: 'Oui, ping OK', suite: 'n2' }
                  ]
                },
                n_net: {
                  solution: true,
                  correct: false,
                  texte: 'Problème réseau avant le partage',
                  explication: 'Résoudre d\'abord la connectivité réseau. Vérifier adressage IP, câble, VLAN. Si le ping par IP fonctionne mais pas par nom, c\'est un problème DNS/NetBIOS : ipconfig /flushdns et vérifier la résolution avec nslookup PC-BUREAU.'
                },
                n2: {
                  question: 'Le partage "Commun" existe-t-il encore sur PC-BUREAU ?',
                  choix: [
                    { texte: 'Non, partage supprimé ou absent', suite: 'n_share' },
                    { texte: 'Oui, partage présent (net share)', suite: 'n3' }
                  ]
                },
                n_share: {
                  solution: true,
                  correct: true,
                  texte: 'Recréer le partage sur PC-BUREAU',
                  explication: 'Sur PC-BUREAU : net share Commun=C:\\Partage\\Commun /GRANT:"Tout le monde",READ. Le partage a peut-être été supprimé suite à un redémarrage (si créé sans être persistant) ou accidentellement.'
                },
                n3: {
                  question: 'Le partage de fichiers est-il activé dans le Centre Réseau et partage ?',
                  choix: [
                    { texte: 'Non, partage de fichiers désactivé', suite: 'n_fs' },
                    { texte: 'Oui, partage activé', suite: 'n4' }
                  ]
                },
                n_fs: {
                  solution: true,
                  correct: true,
                  texte: 'Activer la découverte réseau et le partage de fichiers',
                  explication: 'Panneau de configuration > Centre Réseau et partage > Modifier les paramètres de partage avancés > Activer la découverte réseau ET le partage de fichiers et d\'imprimantes. Cocher "Activer le partage de fichiers".'
                },
                n4: {
                  question: 'Le pare-feu Windows sur PC-BUREAU autorise-t-il le partage de fichiers ?',
                  choix: [
                    { texte: 'Non, règle bloquante', suite: 'n_fw' },
                    { texte: 'Oui, pare-feu OK', suite: 'n5' }
                  ]
                },
                n_fw: {
                  solution: true,
                  correct: true,
                  texte: 'Activer la règle "Partage de fichiers et d\'imprimantes" dans le pare-feu',
                  explication: 'Pare-feu Windows avec fonctions avancées > Règles de trafic entrant > activer "Partage de fichiers et d\'imprimantes (SMB entrant)". Ou via netsh : netsh advfirewall firewall set rule group="Partage de fichiers et d\'imprimantes" new enable=yes.'
                },
                n5: {
                  solution: true,
                  correct: false,
                  texte: 'Vérifier les permissions de partage et NTFS',
                  explication: 'net share Commun sur PC-BUREAU pour voir les permissions. L\'utilisateur doit être dans un groupe autorisé. Rappel : les permissions effectives = le plus restrictif entre permissions de partage et permissions NTFS.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'winclient-m07',
        titre: 'Pilotes et imprimantes',
        cas: [
          {
            id: 'cas-wc-013',
            titre: 'Gestion des imprimantes via PowerShell',
            difficulte: 'facile',
            format: 'terminal',
            objectif: 'Ajouter une imprimante réseau, définir l\'imprimante par défaut et gérer la file d\'attente',
            contexte: 'Vous devez connecter un poste à l\'imprimante réseau HP-RDC (port TCP/IP 192.168.1.200) et la définir comme imprimante par défaut.',
            contenu: {
              prompt: 'PS C:\\> ',
              commandes: {
                'Add-PrinterPort -Name "IP_192.168.1.200" -PrinterHostAddress "192.168.1.200"': '',
                'Add-PrinterDriver -Name "HP Universal Printing PCL 6"': '',
                'Add-Printer -Name "HP-RDC" -DriverName "HP Universal Printing PCL 6" -PortName "IP_192.168.1.200"': '',
                'Get-Printer | Select-Object Name, DriverName, PortName, Default': 'Name       DriverName                    PortName          Default\n----       ----------                    --------          -------\nHP-RDC     HP Universal Printing PCL 6  IP_192.168.1.200    False\nMicrosoft Print to PDF  ...              PORTPROMPT:         True',
                '(Get-Printer -Name "HP-RDC").Default = $true; Set-Printer -Name "HP-RDC" -Default $true': '',
                'Get-PrintJob -PrinterName "HP-RDC"': 'Id JobStatus    DocumentName\n-- ---------    ------------',
                'Restart-Service Spooler': ''
              },
              validation: [
                'Port TCP/IP créé avec Add-PrinterPort',
                'Pilote ajouté avec Add-PrinterDriver',
                'Imprimante créée avec Add-Printer',
                'Définie par défaut avec Set-Printer -Default $true'
              ],
              indices: [
                'Le port doit être créé AVANT l\'imprimante',
                'Le nom du pilote doit correspondre exactement au pilote installé',
                'Restart-Service Spooler redémarre le spouleur en cas de blocage'
              ],
              solution: [
                'Add-PrinterPort -Name "IP_192.168.1.200" -PrinterHostAddress "192.168.1.200"',
                'Add-Printer -Name "HP-RDC" -DriverName "HP Universal Printing PCL 6" -PortName "IP_192.168.1.200"',
                'Set-Printer -Name "HP-RDC" -Default $true'
              ]
            }
          },
          {
            id: 'cas-wc-014',
            titre: 'Diagnostic imprimante hors ligne ou file bloquée',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Résoudre une imprimante affichée "Hors ligne" ou une file d\'impression bloquée',
            contexte: 'L\'imprimante HP-RDC est affichée "Hors ligne" dans Windows ou les documents restent bloqués dans la file d\'attente sans s\'imprimer.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'L\'imprimante est-elle physiquement allumée et connectée au réseau ?',
                  choix: [
                    { texte: 'Non ou incertain', suite: 'n_phys' },
                    { texte: 'Oui, allumée et réseau OK', suite: 'n2' }
                  ]
                },
                n_phys: {
                  solution: true,
                  correct: true,
                  texte: 'Vérifier l\'état physique de l\'imprimante',
                  explication: 'Vérifier : alimentation, câble réseau/WiFi, papier, toner. Pinguer l\'IP de l\'imprimante : Test-Connection 192.168.1.200. Si pas de réponse, l\'imprimante est hors ligne physiquement ou son IP a changé.'
                },
                n2: {
                  question: 'La file d\'impression contient-elle des documents bloqués ?',
                  choix: [
                    { texte: 'Oui, documents bloqués', suite: 'n_queue' },
                    { texte: 'Non, file vide mais toujours hors ligne', suite: 'n3' }
                  ]
                },
                n_queue: {
                  solution: true,
                  correct: true,
                  texte: 'Vider la file manuellement en arrêtant le spouleur',
                  explication: 'Stop-Service Spooler, puis supprimer les fichiers dans C:\\Windows\\System32\\spool\\PRINTERS\\*, puis Start-Service Spooler. Les fichiers .SPL et .SHD dans ce dossier représentent les travaux en attente. Redémarrer le spouleur suffit souvent.'
                },
                n3: {
                  question: 'L\'imprimante est-elle définie en mode "Utiliser l\'imprimante hors connexion" ?',
                  choix: [
                    { texte: 'Oui, mode hors connexion activé', suite: 'n_offline' },
                    { texte: 'Non, mode normal', suite: 'n4' }
                  ]
                },
                n_offline: {
                  solution: true,
                  correct: true,
                  texte: 'Désactiver le mode "Utiliser l\'imprimante hors connexion"',
                  explication: 'Dans Périphériques et imprimantes, clic droit sur l\'imprimante > décocher "Utiliser l\'imprimante hors connexion". Ce mode a pu être activé accidentellement quand l\'imprimante était temporairement inaccessible.'
                },
                n4: {
                  question: 'Le service Spouler d\'impression (Print Spooler) est-il démarré ?',
                  choix: [
                    { texte: 'Non, service arrêté', suite: 'n_spool' },
                    { texte: 'Oui, service actif', suite: 'n_port' }
                  ]
                },
                n_spool: {
                  solution: true,
                  correct: true,
                  texte: 'Redémarrer le service Spooler',
                  explication: 'Restart-Service Spooler ou dans services.msc. Le spouleur peut planter à cause d\'un travail corrompu. Après redémarrage du service, vider la file si nécessaire (C:\\Windows\\System32\\spool\\PRINTERS\\).'
                },
                n_port: {
                  solution: true,
                  correct: false,
                  texte: 'Vérifier le port TCP/IP de l\'imprimante',
                  explication: 'Propriétés de l\'imprimante > onglet Ports > vérifier l\'adresse IP du port. Si l\'IP de l\'imprimante a changé (DHCP), mettre à jour le port. Ou créer un nouveau port avec la bonne IP et l\'assigner à l\'imprimante.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'winclient-m08',
        titre: 'Maintenance du système',
        cas: [
          {
            id: 'cas-wc-015',
            titre: 'Diagnostic et réparation des fichiers système',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Utiliser SFC, DISM et CHKDSK pour diagnostiquer et réparer un système Windows 10 instable',
            contexte: 'Un poste Windows 10 est instable : plantages aléatoires, erreurs d\'applications. Vous devez effectuer un diagnostic complet des fichiers système et du disque.',
            contenu: {
              prompt: 'C:\\> ',
              commandes: {
                'sfc /scannow': 'Début de la vérification du système.\nVérification Phase 1 : 100%\nLa protection des ressources Windows a trouvé des fichiers endommagés et les a réparés.',
                'Dism /Online /Cleanup-Image /CheckHealth': 'Vérification que l\'image peut être réparée.\nL\'opération s\'est terminée correctement.',
                'Dism /Online /Cleanup-Image /ScanHealth': 'Analyse de l\'image pour détecter des altérations.\nL\'image du composant magasin est réparable.\nL\'opération s\'est terminée correctement.',
                'Dism /Online /Cleanup-Image /RestoreHealth': 'Réparation de l\'image.\nLe source des fichiers de réparation a été trouvé.\n100% terminé\nL\'opération s\'est terminée correctement.',
                'chkdsk C: /f /r /x': 'Windows ne peut pas exécuter la vérification de disque sur ce volume car il est utilisé.\nVoulez-vous planifier pour le prochain redémarrage ? (O/N)',
                'echo O | chkdsk C: /f /r /x': 'La vérification de disque est planifiée pour le prochain démarrage du système.'
              },
              validation: [
                'sfc /scannow vérifie et répare les fichiers système protégés',
                'DISM CheckHealth > ScanHealth > RestoreHealth en escalade',
                'chkdsk /f /r /x planifié au redémarrage car C:\\ est en cours d\'utilisation',
                'Séquence correcte : SFC d\'abord, puis DISM si SFC échoue'
              ],
              indices: [
                'sfc /scannow doit être lancé en admin',
                'DISM RestoreHealth télécharge les fichiers depuis Windows Update si nécessaire',
                'chkdsk /f corrige les erreurs, /r localise les secteurs défectueux, /x démonte le volume'
              ],
              solution: [
                'sfc /scannow',
                'Dism /Online /Cleanup-Image /RestoreHealth (si SFC signale des erreurs non réparées)',
                'chkdsk C: /f /r /x (planifié au redémarrage)'
              ]
            }
          },
          {
            id: 'cas-wc-016',
            titre: 'Diagnostic système instable — BSOD récurrents',
            difficulte: 'difficile',
            format: 'arbre',
            objectif: 'Identifier la cause de Blue Screen of Death (BSOD) récurrents sur Windows 10',
            contexte: 'Un poste Windows 10 plante avec des écrans bleus (BSOD) plusieurs fois par semaine. Les codes d\'erreur varient.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Les BSOD ont-ils commencé après une action spécifique ?',
                  choix: [
                    { texte: 'Oui, après mise à jour Windows', suite: 'n_wu' },
                    { texte: 'Oui, après installation d\'un logiciel/pilote', suite: 'n_driver' },
                    { texte: 'Non, progressif sans raison apparente', suite: 'n2' }
                  ]
                },
                n_wu: {
                  solution: true,
                  correct: true,
                  texte: 'Désinstaller la mise à jour problématique',
                  explication: 'Paramètres > Windows Update > Afficher l\'historique des mises à jour > Désinstaller les mises à jour. Identifier la mise à jour installée avant les premiers BSOD et la désinstaller. Masquer la mise à jour pour éviter qu\'elle se réinstalle automatiquement.'
                },
                n_driver: {
                  solution: true,
                  correct: true,
                  texte: 'Revenir au pilote précédent ou désinstaller le logiciel',
                  explication: 'Gestionnaire de périphériques > clic droit sur le périphérique > Propriétés > Pilote > Revenir au pilote précédent. Si un logiciel est en cause, le désinstaller depuis Paramètres > Applications. Redémarrer et observer.'
                },
                n2: {
                  question: 'Quel code d\'erreur apparaît le plus fréquemment sur les BSOD ?',
                  choix: [
                    { texte: 'MEMORY_MANAGEMENT ou PAGE_FAULT', suite: 'n_ram' },
                    { texte: 'DRIVER_IRQL ou SYSTEM_SERVICE_EXCEPTION', suite: 'n_drv' },
                    { texte: 'Codes variés sans logique', suite: 'n3' }
                  ]
                },
                n_ram: {
                  solution: true,
                  correct: true,
                  texte: 'Tester la RAM avec Windows Memory Diagnostic',
                  explication: 'mdsched.exe > Redémarrer maintenant et rechercher les problèmes. Le test s\'exécute avant le démarrage de Windows. Des erreurs mémoire indiquent un module RAM défectueux à remplacer. Tester aussi avec MemTest86 pour un test plus approfondi.'
                },
                n_drv: {
                  solution: true,
                  correct: true,
                  texte: 'Analyser les mini-dumps avec WinDbg',
                  explication: 'Les fichiers de dump sont dans C:\\Windows\\Minidump. Ouvrir avec WinDbg (Windows Debugger) et la commande !analyze -v pour identifier le pilote fautif. Mettre à jour ou désinstaller ce pilote.'
                },
                n3: {
                  question: 'La temperature du CPU et GPU est-elle normale ?',
                  choix: [
                    { texte: 'Non, surchauffe détectée', suite: 'n_heat' },
                    { texte: 'Oui, températures normales', suite: 'n_disk' }
                  ]
                },
                n_heat: {
                  solution: true,
                  correct: true,
                  texte: 'Résoudre la surchauffe — nettoyage ventilateurs',
                  explication: 'Ouvrir le PC et nettoyer les ventilateurs et radiateurs à l\'air comprimé. Vérifier que le ventilateur CPU tourne. Remplacer la pâte thermique si le PC a plus de 3 ans. La surchauffe provoque des BSOD aléatoires avec codes d\'erreur variés.'
                },
                n_disk: {
                  solution: true,
                  correct: false,
                  texte: 'Vérifier la santé du disque avec S.M.A.R.T.',
                  explication: 'Get-PhysicalDisk | Get-StorageReliabilityCounter ou utiliser CrystalDiskInfo. Des secteurs défectueux ou un disque en fin de vie peuvent provoquer des BSOD aléatoires. Si l\'état est "Attention" ou "Mauvais", remplacer le disque en urgence.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'winclient-m09',
        titre: 'Plus loin avec PowerShell',
        cas: [
          {
            id: 'cas-wc-017',
            titre: 'Script d\'inventaire automatique des postes',
            difficulte: 'difficile',
            format: 'terminal',
            objectif: 'Créer un script PowerShell qui collecte les informations système et exporte en CSV',
            contexte: 'Vous devez créer un script qui collecte RAM, CPU, espace disque et version OS de tous les postes d\'un réseau et exporte le résultat en CSV.',
            contenu: {
              prompt: 'PS C:\\Scripts> ',
              commandes: {
                '$postes = @("PC-01", "PC-02", "SRV01")': '',
                '$inventaire = foreach ($pc in $postes) {\n  try {\n    $os = Get-CimInstance Win32_OperatingSystem -ComputerName $pc\n    $cpu = Get-CimInstance Win32_Processor -ComputerName $pc\n    $disk = Get-CimInstance Win32_LogicalDisk -ComputerName $pc -Filter "DeviceID=\'C:\'"\n    [PSCustomObject]@{\n      Poste = $pc\n      OS = $os.Caption\n      RAM_Go = [math]::Round($os.TotalVisibleMemorySize / 1MB, 1)\n      CPU = $cpu.Name\n      DisqueTotal_Go = [math]::Round($disk.Size / 1GB, 0)\n      DisqueLibre_Go = [math]::Round($disk.FreeSpace / 1GB, 0)\n    }\n  } catch { [PSCustomObject]@{ Poste = $pc; OS = "INACCESSIBLE" } }\n}': '',
                '$inventaire | Format-Table -AutoSize': 'Poste  OS                    RAM_Go CPU                     DisqueTotal_Go DisqueLibre_Go\n-----  --                    ------ ---                     -------------- --------------\nPC-01  Windows 10 Pro          16.0 Intel Core i5-10400           500            287\nPC-02  Windows 10 Pro           8.0 Intel Core i3-8100            256            143\nSRV01  Windows Server 2022     32.0 Intel Xeon E-2234             1000           654\nPC-03  INACCESSIBLE',
                '$inventaire | Export-Csv -Path "C:\\Scripts\\inventaire.csv" -NoTypeInformation -Encoding UTF8': '',
                'Import-Csv "C:\\Scripts\\inventaire.csv" | Select-Object -First 2': 'Poste : PC-01\nOS    : Windows 10 Pro\nRAM_Go: 16.0'
              },
              validation: [
                'Tableau $postes défini',
                'Get-CimInstance utilisé pour collecter OS, CPU, disque',
                '[PSCustomObject] crée des objets personnalisés',
                'Export-Csv avec -NoTypeInformation et -Encoding UTF8'
              ],
              indices: [
                'Get-CimInstance remplace Get-WmiObject (déprécié)',
                '[math]::Round() arrondit les valeurs numériques',
                'try/catch gère les postes inaccessibles sans planter le script',
                '-NoTypeInformation supprime la ligne de type en en-tête du CSV'
              ],
              solution: [
                '$inventaire = foreach ($pc in $postes) { Get-CimInstance ... [PSCustomObject]@{...} }',
                '$inventaire | Export-Csv -Path "inventaire.csv" -NoTypeInformation -Encoding UTF8'
              ]
            }
          },
          {
            id: 'cas-wc-018',
            titre: 'Choisir la bonne approche PowerShell pour l\'administration',
            difficulte: 'moyen',
            format: 'scenario',
            objectif: 'Sélectionner les commandes et approches PowerShell adaptées à des scénarios d\'administration courants',
            contexte: 'En tant qu\'administrateur système, vous devez gérer plusieurs tâches d\'administration via PowerShell. Choisissez la meilleure approche pour chaque situation.',
            contenu: {
              etapes: [
                {
                  description: 'Vous devez exécuter un script PowerShell (.ps1) sur un nouveau poste mais vous obtenez "L\'exécution de scripts est désactivée sur ce système". Que faire ?',
                  choix: [
                    { texte: 'Set-ExecutionPolicy Unrestricted -Scope LocalMachine', correct: false, feedback: 'Unrestricted est trop permissif et dangereux. Il autorise tous les scripts sans vérification.' },
                    { texte: 'Set-ExecutionPolicy RemoteSigned -Scope CurrentUser', correct: true, feedback: 'Correct ! RemoteSigned autorise les scripts locaux non signés et exige une signature pour les scripts téléchargés. -Scope CurrentUser évite de modifier la politique globale.' },
                    { texte: 'Renommer le fichier .ps1 en .bat', correct: false, feedback: 'Incorrect. Un .bat ne comprend pas la syntaxe PowerShell. Ce n\'est pas une solution valide.' },
                    { texte: 'Utiliser PowerShell -ExecutionPolicy Bypass -File script.ps1', correct: false, feedback: 'Fonctionnel pour une exécution ponctuelle mais pas une solution durable. De plus, Bypass désactive toutes les restrictions de sécurité.' }
                  ]
                },
                {
                  description: 'Vous devez filtrer les utilisateurs AD actifs dont le mot de passe expire dans moins de 7 jours. Quelle commande est la plus efficace ?',
                  choix: [
                    { texte: 'Get-ADUser -Filter * | Where-Object {$_.PasswordExpired -eq $false}', correct: false, feedback: 'Récupère tous les utilisateurs puis filtre en mémoire. Inefficace sur de grands annuaires. PasswordExpired ne donne pas la date d\'expiration future.' },
                    { texte: 'Search-ADAccount -AccountExpiring -TimeSpan 7.00:00:00', correct: true, feedback: 'Correct ! Search-ADAccount est optimisé pour ce type de requête. -AccountExpiring -TimeSpan 7.00:00:00 trouve directement les comptes expirant dans 7 jours.' },
                    { texte: 'Get-ADUser -Filter {Enabled -eq $true} -Properties PasswordLastSet', correct: false, feedback: 'Retourne PasswordLastSet mais pas l\'expiration calculée. Il faudrait du code supplémentaire pour calculer l\'expiration selon la politique de mot de passe.' },
                    { texte: 'Get-LocalUser | Where-Object {$_.PasswordExpires -lt (Get-Date).AddDays(7)}', correct: false, feedback: 'Get-LocalUser gère les comptes LOCAUX, pas Active Directory. Utiliser Get-ADUser pour les comptes de domaine.' }
                  ]
                },
                {
                  description: 'Votre script PowerShell doit s\'exécuter chaque nuit à 2h pour archiver des logs. Quelle est la bonne approche ?',
                  choix: [
                    { texte: 'Laisser une session PowerShell ouverte avec Start-Sleep', correct: false, feedback: 'Mauvaise pratique. Une session ouverte en permanence consomme des ressources et ne survivra pas à un redémarrage.' },
                    { texte: 'Créer une tâche planifiée avec Register-ScheduledTask', correct: true, feedback: 'Correct ! Register-ScheduledTask crée une tâche planifiée native Windows qui s\'exécute même après un redémarrage, sans session ouverte. C\'est la méthode standard pour planifier des scripts PS.' },
                    { texte: 'Configurer un cron job Linux', correct: false, feedback: 'Cron est spécifique à Linux/Unix. Sur Windows, utiliser le Planificateur de tâches (Task Scheduler).' },
                    { texte: 'Utiliser Set-Service avec un déclencheur horaire', correct: false, feedback: 'Set-Service configure les services Windows, pas les scripts planifiés. Un service nécessite une architecture différente d\'un simple script.' }
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        id: 'winclient-m10',
        titre: 'Capture et déploiement d\'image',
        cas: [
          {
            id: 'cas-wc-019',
            titre: 'Préparation d\'une image avec Sysprep',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Préparer un poste de référence avec Sysprep pour le déploiement via WDS ou MDT',
            contexte: 'Vous avez configuré un poste Windows 10 de référence (logiciels installés, paramètres définis). Vous devez le généraliser avec Sysprep avant de capturer l\'image.',
            contenu: {
              prompt: 'C:\\> ',
              commandes: {
                'cd C:\\Windows\\System32\\Sysprep': '',
                'sysprep /generalize /oobe /shutdown': 'Sysprep démarre...\nSysprep effectue la préparation du poste...\nSysprep est terminé. Le poste va s\'éteindre.',
                'dism /Capture-Image /ImageFile:"D:\\Images\\W10-Ref.wim" /CaptureDir:C:\\ /Name:"Windows10-Ref" /Description:"Image référence W10 Pro 2026"': 'Capture de l\'image...\n100% terminé\nL\'opération s\'est terminée correctement.',
                'dism /Get-WimInfo /WimFile:"D:\\Images\\W10-Ref.wim"': 'Index d\'image : 1\nNom : Windows10-Ref\nDescription : Image référence W10 Pro 2026\nTaille : 18 232 Mo',
                'dism /Mount-Image /ImageFile:"D:\\Images\\W10-Ref.wim" /Index:1 /MountDir:C:\\Mount': 'Montage de l\'image en cours...\n100% terminé\nL\'opération s\'est terminée correctement.',
                'dism /Unmount-Image /MountDir:C:\\Mount /Commit': 'Démontage de l\'image...\n100% terminé\nL\'opération s\'est terminée correctement.'
              },
              validation: [
                'sysprep /generalize supprime les identifiants uniques (SID, nom d\'ordinateur)',
                '/oobe déclenche l\'assistant de première utilisation au prochain démarrage',
                '/shutdown éteint le PC après Sysprep (ne pas redémarrer avant la capture)',
                'dism /Capture-Image crée le fichier .wim'
              ],
              indices: [
                '/generalize est OBLIGATOIRE pour le déploiement multi-postes (réinitialise le SID)',
                'Ne jamais démarrer le poste après Sysprep avant la capture — ça invalide la généralisation',
                'Le fichier .wim peut être déployé via WDS, MDT, ou dism /Apply-Image'
              ],
              solution: [
                'sysprep /generalize /oobe /shutdown',
                'dism /Capture-Image /ImageFile:"chemin.wim" /CaptureDir:C:\\ /Name:"Nom"',
                'dism /Get-WimInfo pour vérifier'
              ]
            }
          },
          {
            id: 'cas-wc-020',
            titre: 'Diagnostic déploiement WDS échoué',
            difficulte: 'difficile',
            format: 'arbre',
            objectif: 'Identifier pourquoi un déploiement d\'image via WDS (Windows Deployment Services) échoue',
            contexte: 'Le démarrage PXE d\'un poste client échoue lors du déploiement via WDS. Le poste ne démarre pas sur le réseau ou le déploiement s\'interrompt.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Le poste affiche-t-il "PXE-E61: Media test failure" ou ne démarre pas en PXE du tout ?',
                  choix: [
                    { texte: '"PXE-E61" ou pas de boot PXE', suite: 'n2' },
                    { texte: 'PXE démarre mais erreur pendant le déploiement', suite: 'n3' }
                  ]
                },
                n2: {
                  question: 'Le boot PXE est-il activé dans le BIOS/UEFI du poste ?',
                  choix: [
                    { texte: 'Non, désactivé dans le BIOS', suite: 'n_bios' },
                    { texte: 'Oui, activé mais toujours en échec', suite: 'n_dhcp' }
                  ]
                },
                n_bios: {
                  solution: true,
                  correct: true,
                  texte: 'Activer le boot réseau (PXE/Network Boot) dans le BIOS',
                  explication: 'Entrer dans le BIOS (F2, Del, F10 selon le fabricant) > Boot > activer "Network Boot" ou "PXE Boot". Placer le réseau en première position dans l\'ordre de démarrage. Sur UEFI, désactiver le Secure Boot peut être nécessaire selon la version WDS.'
                },
                n_dhcp: {
                  solution: true,
                  correct: true,
                  texte: 'Vérifier les options DHCP 66 et 67 pour PXE',
                  explication: 'Le DHCP doit fournir les options 66 (Boot Server Host Name = IP du serveur WDS) et 67 (Bootfile Name = boot\\x64\\wdsnbp.com). Sur Windows DHCP Server : Set-DhcpServerv4OptionValue -OptionId 66 -Value "IP-WDS" et -OptionId 67 -Value "boot\\x64\\wdsnbp.com".'
                },
                n3: {
                  question: 'Quelle erreur s\'affiche pendant le déploiement ?',
                  choix: [
                    { texte: '"Aucune image ne correspond à ce poste" ou erreur de sélection d\'image', suite: 'n_image' },
                    { texte: 'Erreur d\'accès réseau ou credentials', suite: 'n_auth' }
                  ]
                },
                n_image: {
                  solution: true,
                  correct: true,
                  texte: 'Vérifier les images de démarrage et d\'installation dans WDS',
                  explication: 'Dans la console WDS > Images de démarrage : au moins une image boot.wim doit être présente. Dans Images d\'installation : l\'image à déployer doit être ajoutée. Vérifier aussi que le groupe d\'images est activé et que l\'image est disponible pour ce type de poste (x64/x86).'
                },
                n_auth: {
                  solution: true,
                  correct: false,
                  texte: 'Vérifier les permissions et le compte de jonction au domaine',
                  explication: 'WDS peut nécessiter un compte de service pour joindre les postes au domaine. Vérifier dans les propriétés WDS > onglet AD DS les permissions. Le compte doit avoir les droits "Ajouter des stations de travail au domaine". Limité à 10 jointures par défaut pour les comptes standard.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'winclient-m11',
        titre: 'Stratégies de groupe local',
        cas: [
          {
            id: 'cas-wc-021',
            titre: 'Configuration de la stratégie de groupe locale avec secedit',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Exporter, modifier et appliquer la stratégie de sécurité locale via secedit',
            contexte: 'Sur un poste autonome (hors domaine), vous devez configurer la politique de mot de passe : longueur minimale 12 caractères, complexité activée, historique 5 mots de passe.',
            contenu: {
              prompt: 'C:\\> ',
              commandes: {
                'secedit /export /cfg C:\\secpol.cfg /quiet': '',
                'type C:\\secpol.cfg | findstr /i "password"': 'MinimumPasswordLength = 0\nPasswordComplexity = 0\nPasswordHistorySize = 0\nMaximumPasswordAge = 42\nMinimumPasswordAge = 0',
                'powershell -Command "(Get-Content C:\\secpol.cfg) -replace \'MinimumPasswordLength = 0\', \'MinimumPasswordLength = 12\' | Set-Content C:\\secpol.cfg"': '',
                'powershell -Command "(Get-Content C:\\secpol.cfg) -replace \'PasswordComplexity = 0\', \'PasswordComplexity = 1\' | Set-Content C:\\secpol.cfg"': '',
                'powershell -Command "(Get-Content C:\\secpol.cfg) -replace \'PasswordHistorySize = 0\', \'PasswordHistorySize = 5\' | Set-Content C:\\secpol.cfg"': '',
                'secedit /configure /db C:\\Windows\\security\\database\\secedit.sdb /cfg C:\\secpol.cfg /quiet': 'La tâche a été effectuée correctement.',
                'net accounts': 'Délai avant expiration des mots de passe (jours) :    42\nRetard minimum des mots de passe (jours) :           0\nLongueur minimum des mots de passe :                12\nHistorique des mots de passe :                       5\nVerrouillage après :                             Jamais'
              },
              validation: [
                'secedit /export exporte la politique actuelle',
                'Paramètres modifiés dans le fichier .cfg',
                'secedit /configure applique le fichier modifié',
                'net accounts vérifie les paramètres appliqués'
              ],
              indices: [
                'secedit /export puis /configure = export-modifier-importer',
                'PasswordComplexity = 1 active l\'exigence de complexité',
                'net accounts affiche un résumé de la politique de mot de passe'
              ],
              solution: [
                'secedit /export /cfg C:\\secpol.cfg',
                'Modifier MinimumPasswordLength, PasswordComplexity, PasswordHistorySize',
                'secedit /configure /db secedit.sdb /cfg C:\\secpol.cfg'
              ]
            }
          },
          {
            id: 'cas-wc-022',
            titre: 'Diagnostic stratégie de groupe locale non appliquée',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Identifier pourquoi un paramètre de la stratégie de groupe locale ne s\'applique pas',
            contexte: 'Vous avez configuré via gpedit.msc l\'interdiction d\'accès au Panneau de configuration pour les utilisateurs standard, mais le paramètre ne semble pas actif.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'L\'utilisateur concerné est-il administrateur local ou utilisateur standard ?',
                  choix: [
                    { texte: 'Administrateur local', suite: 'n_admin' },
                    { texte: 'Utilisateur standard', suite: 'n2' }
                  ]
                },
                n_admin: {
                  solution: true,
                  correct: false,
                  texte: 'Les GPO "User Configuration" ne s\'appliquent pas aux administrateurs locaux',
                  explication: 'Certains paramètres de restriction (Panneau de configuration, invite de commandes, etc.) ne s\'appliquent pas aux membres du groupe Administrateurs. C\'est voulu pour permettre l\'administration. Tester avec un compte utilisateur standard.'
                },
                n2: {
                  question: 'Le paramètre est-il dans "Configuration utilisateur" ou "Configuration ordinateur" dans gpedit.msc ?',
                  choix: [
                    { texte: 'Configuration utilisateur', suite: 'n3' },
                    { texte: 'Configuration ordinateur', suite: 'n_computer' }
                  ]
                },
                n_computer: {
                  solution: true,
                  correct: true,
                  texte: 'Les paramètres "Configuration ordinateur" s\'appliquent à tous les utilisateurs',
                  explication: 'Si le paramètre est dans Configuration ordinateur, il s\'applique à tous les utilisateurs qui se connectent à ce poste (y compris les admins pour certains paramètres). Faire gpupdate /force et reconnecter l\'utilisateur pour forcer l\'application.'
                },
                n3: {
                  question: 'Avez-vous forcé l\'actualisation avec gpupdate /force depuis la session utilisateur ?',
                  choix: [
                    { texte: 'Non, pas encore', suite: 'n_update' },
                    { texte: 'Oui, gpupdate fait mais toujours inactif', suite: 'n4' }
                  ]
                },
                n_update: {
                  solution: true,
                  correct: true,
                  texte: 'Forcer l\'actualisation avec gpupdate /force',
                  explication: 'Ouvrir cmd en tant qu\'utilisateur (pas admin) et taper gpupdate /force. Les GPO locales se rechargent. Se déconnecter et reconnecter pour que les paramètres de session soient pris en compte. Vérifier avec rsop.msc (Jeu de stratégie résultant).'
                },
                n4: {
                  question: 'rsop.msc montre-t-il le paramètre comme appliqué ou non ?',
                  choix: [
                    { texte: 'Non appliqué dans rsop.msc', suite: 'n_rsop' },
                    { texte: 'Appliqué dans rsop.msc mais sans effet', suite: 'n_reg' }
                  ]
                },
                n_rsop: {
                  solution: true,
                  correct: true,
                  texte: 'Vérifier le paramètre dans gpedit.msc — peut être "Non configuré"',
                  explication: 'Ouvrir gpedit.msc > Configuration utilisateur > Modèles d\'administration > Panneau de configuration > vérifier que le paramètre est bien sur "Activé" et non "Non configuré". Un paramètre "Non configuré" n\'apparaît pas dans rsop.msc.'
                },
                n_reg: {
                  solution: true,
                  correct: false,
                  texte: 'Vérifier la clé de registre correspondante',
                  explication: 'rsop.msc dit "appliqué" mais sans effet visuel. Vérifier dans regedit : HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer > NoControlPanel doit être à 1. Si la valeur est présente et correcte, redémarrer le processus explorer.exe (Gestionnaire des tâches > redémarrer Explorateur Windows).'
                }
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: 'virtualisation-serveur',
    titre: 'Virtualisation de serveur',
    emoji: '🖥️',
    modules: [
      {
        id: 'virt-m01',
        titre: 'Virtualisation sur poste de travail',
        cas: [
          {
            id: 'cas-virt-001',
            titre: 'Création et configuration d\'une VM avec Hyper-V sur poste',
            difficulte: 'facile',
            format: 'terminal',
            objectif: 'Créer une machine virtuelle Hyper-V sur un poste Windows 10/11 via PowerShell',
            contexte: 'Vous devez créer une VM de test Windows Server 2022 sur votre poste de développement Windows 10 Pro avec Hyper-V activé.',
            contenu: {
              prompt: 'PS C:\\> ',
              commandes: {
                'Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All': 'Path          :\nOnline        : True\nRestartNeeded : True',
                'Get-VMSwitch': 'Name            SwitchType NetAdapterInterfaceDescription\n----            ---------- ------------------------------\nDefault Switch  Internal',
                'New-VMSwitch -Name "vSwitch-LAN" -NetAdapterName "Ethernet" -AllowManagementOS $true': 'Name        SwitchType NetAdapterInterfaceDescription\n----        ---------- ----------------------------\nvSwitch-LAN External   Intel(R) Ethernet Connection',
                'New-VM -Name "SRV-TEST01" -MemoryStartupBytes 2GB -Generation 2 -NewVHDPath "C:\\VMs\\SRV-TEST01.vhdx" -NewVHDSizeBytes 60GB -SwitchName "vSwitch-LAN"': 'Name       State CPUUsage(%) MemoryAssigned(M) Uptime   Status\n----       ----- ----------- ----------------- ------   ------\nSRV-TEST01 Off   0           0                 00:00:00 En cours d\'exécution normale',
                'Set-VMDvdDrive -VMName "SRV-TEST01" -Path "C:\\ISO\\WS2022.iso"': '',
                'Set-VMFirmware -VMName "SRV-TEST01" -EnableSecureBoot Off': '',
                'Start-VM -Name "SRV-TEST01"': '',
                'Get-VM -Name "SRV-TEST01"': 'Name       State   CPUUsage(%) MemoryAssigned(M) Uptime\n----       -----   ----------- ----------------- ------\nSRV-TEST01 Running 12          2048              00:01:23'
              },
              validation: [
                'Hyper-V activé avec Enable-WindowsOptionalFeature',
                'vSwitch externe créé avec New-VMSwitch',
                'VM créée Generation 2 avec New-VM',
                'ISO montée avec Set-VMDvdDrive, Secure Boot désactivé pour Linux/non-signé'
              ],
              indices: [
                'Generation 2 = UEFI, nécessite Secure Boot désactivé pour certains OS',
                '-AllowManagementOS $true partage le vSwitch avec l\'hôte',
                'Hyper-V nécessite la virtualisation activée dans le BIOS'
              ],
              solution: [
                'New-VMSwitch -Name "vSwitch-LAN" -NetAdapterName "Ethernet"',
                'New-VM -Name "SRV-TEST01" -MemoryStartupBytes 2GB -Generation 2 -NewVHDPath "..." -SwitchName "vSwitch-LAN"',
                'Set-VMDvdDrive -VMName "SRV-TEST01" -Path "chemin.iso"',
                'Start-VM -Name "SRV-TEST01"'
              ]
            }
          },
          {
            id: 'cas-virt-002',
            titre: 'Diagnostic VM qui ne démarre pas',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Identifier pourquoi une machine virtuelle refuse de démarrer sur Hyper-V ou VMware Workstation',
            contexte: 'Une VM affiche une erreur au démarrage ou reste à l\'état "Off" sans message d\'erreur clair.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Quel hyperviseur est utilisé ?',
                  choix: [
                    { texte: 'Hyper-V (Windows)', suite: 'n2' },
                    { texte: 'VMware Workstation', suite: 'n3' }
                  ]
                },
                n2: {
                  question: 'Quel message d\'erreur Hyper-V affiche-t-il ?',
                  choix: [
                    { texte: '"Le fichier VHD/VHDX est introuvable"', suite: 'n_vhd' },
                    { texte: '"Mémoire insuffisante pour démarrer"', suite: 'n_mem' },
                    { texte: '"Erreur générale, impossible de démarrer"', suite: 'n_gen' }
                  ]
                },
                n_vhd: {
                  solution: true,
                  correct: true,
                  texte: 'Reconnecter le disque virtuel déplacé',
                  explication: 'Le fichier .vhdx a été déplacé ou supprimé. Dans Hyper-V Manager > clic droit sur la VM > Paramètres > Contrôleur SCSI > Disque dur > modifier le chemin vers l\'emplacement actuel du .vhdx. Si supprimé, restaurer depuis une sauvegarde.'
                },
                n_mem: {
                  solution: true,
                  correct: true,
                  texte: 'Réduire la mémoire allouée ou libérer de la RAM sur l\'hôte',
                  explication: 'La RAM physique de l\'hôte est insuffisante. Options : réduire la mémoire de démarrage de la VM (Set-VMMemory -VMName "nom" -StartupBytes 1GB), arrêter d\'autres VMs, ou activer la mémoire dynamique (Set-VMMemory -DynamicMemoryEnabled $true).'
                },
                n_gen: {
                  solution: true,
                  correct: false,
                  texte: 'Vérifier les logs Hyper-V dans l\'Observateur d\'événements',
                  explication: 'Observateur d\'événements > Journaux des applications et des services > Microsoft > Windows > Hyper-V-Worker. Les logs détaillés indiquent la cause exacte. Souvent : conflit de ressources, snapshot corrompu, ou pilote réseau virtuel défaillant.'
                },
                n3: {
                  question: 'L\'erreur VMware indique-t-elle un conflit avec Hyper-V ?',
                  choix: [
                    { texte: 'Oui, "VMware ne peut pas démarrer car Hyper-V est actif"', suite: 'n_conflict' },
                    { texte: 'Non, autre erreur VMware', suite: 'n_vmx' }
                  ]
                },
                n_conflict: {
                  solution: true,
                  correct: true,
                  texte: 'Désactiver Hyper-V pour utiliser VMware Workstation',
                  explication: 'Hyper-V et VMware Workstation (avant v15.5) ne coexistent pas bien. Options : bcdedit /set hypervisorlaunchtype off puis redémarrer (désactive Hyper-V), ou utiliser VMware Workstation 16+ qui supporte l\'exécution avec Hyper-V actif via la virtualisation imbriquée.'
                },
                n_vmx: {
                  solution: true,
                  correct: false,
                  texte: 'Vérifier le fichier .vmx de la VM',
                  explication: 'Le fichier .vmx est le fichier de configuration de la VM VMware. Ouvrir avec un éditeur texte. Chercher des lignes corrompues ou des chemins de disques invalides. Vérifier que les fichiers .vmdk référencés existent. Parfois, supprimer les fichiers .lck (lock) débloque la VM.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'virt-m02',
        titre: 'Virtualisation des serveurs',
        cas: [
          {
            id: 'cas-virt-003',
            titre: 'Choisir la bonne solution de virtualisation',
            difficulte: 'moyen',
            format: 'scenario',
            objectif: 'Sélectionner la solution de virtualisation adaptée selon le contexte technique et budgétaire',
            contexte: 'En tant qu\'administrateur, vous devez conseiller votre organisation sur les solutions de virtualisation selon différents scénarios.',
            contenu: {
              etapes: [
                {
                  description: 'Une PME de 20 salariés veut virtualiser 3 serveurs (AD, fichiers, messagerie) avec un budget limité et une compétence IT interne basique. Quelle solution recommandez-vous ?',
                  choix: [
                    { texte: 'VMware vSphere avec vCenter', correct: false, feedback: 'vSphere/vCenter est une solution enterprise avec des coûts de licence élevés et une complexité inadaptée à une PME de 20 personnes avec un IT basique.' },
                    { texte: 'Hyper-V inclus dans Windows Server', correct: true, feedback: 'Correct ! Hyper-V est inclus dans Windows Server sans surcoût de licence supplémentaire. Administration via Hyper-V Manager ou PowerShell, interface familière pour un IT Windows. Solution adaptée à une PME.' },
                    { texte: 'VMware Workstation sur un PC bureau', correct: false, feedback: 'VMware Workstation est un hyperviseur de type 2 (s\'exécute sur un OS hôte), non adapté à la production. Performances et stabilité insuffisantes pour des serveurs de production 24/7.' },
                    { texte: 'Conteneurs Docker uniquement', correct: false, feedback: 'Docker est adapté pour des applications conteneurisées, pas pour virtualiser des serveurs complets (AD, messagerie Exchange nécessitent des VMs complètes).' }
                  ]
                },
                {
                  description: 'Une grande entreprise veut déployer 50+ VMs avec haute disponibilité, migration à chaud, et gestion centralisée. Quelle fonctionnalité vSphere est indispensable ?',
                  choix: [
                    { texte: 'vSphere Standard seul, sans vCenter', correct: false, feedback: 'Sans vCenter, les hôtes ESXi sont gérés individuellement. Impossible d\'avoir vMotion (migration à chaud), HA (haute disponibilité) ou DRS (équilibrage de charge) sans vCenter.' },
                    { texte: 'vCenter Server avec cluster HA et vMotion', correct: true, feedback: 'Correct ! vCenter est le point de contrôle central. vMotion permet la migration à chaud sans interruption. HA redémarre automatiquement les VMs sur un autre hôte en cas de panne. Indispensable pour 50+ VMs en production.' },
                    { texte: 'ESXi Free (version gratuite) sur tous les hôtes', correct: false, feedback: 'ESXi Free a des limitations importantes : pas d\'API de management complète, pas de vCenter, pas de vMotion. Inadapté pour une infrastructure de production à grande échelle.' },
                    { texte: 'Hyper-V avec Windows Server Datacenter', correct: false, feedback: 'Hyper-V est une alternative valide mais la question porte sur vSphere. Dans un contexte vSphere, vCenter est la bonne réponse pour la gestion centralisée et la haute disponibilité.' }
                  ]
                },
                {
                  description: 'Lors d\'une panne d\'un hôte ESXi dans un cluster vSphere HA, que se passe-t-il automatiquement ?',
                  choix: [
                    { texte: 'Les VMs sont perdues, intervention manuelle requise', correct: false, feedback: 'Sans HA, oui. Mais avec vSphere HA activé dans le cluster, les VMs sont automatiquement redémarrées sur les hôtes survivants.' },
                    { texte: 'Les VMs migrent à chaud vers d\'autres hôtes sans interruption', correct: false, feedback: 'La migration à chaud sans interruption, c\'est vMotion. HA redémarre les VMs (avec une courte interruption) sur d\'autres hôtes après détection de la panne. Ce n\'est pas la même chose.' },
                    { texte: 'vSphere HA redémarre les VMs sur les hôtes survivants', correct: true, feedback: 'Correct ! HA (High Availability) surveille les hôtes. En cas de panne, les VMs sont redémarrées sur les hôtes encore actifs du cluster. Il y a une courte interruption (le temps du redémarrage), contrairement à vMotion qui est sans interruption.' },
                    { texte: 'vSphere DRS équilibre automatiquement les VMs', correct: false, feedback: 'DRS (Distributed Resource Scheduler) équilibre la charge CPU/RAM entre les hôtes en conditions normales. HA gère les pannes d\'hôtes. Ce sont deux fonctionnalités distinctes.' }
                  ]
                }
              ]
            }
          },
          {
            id: 'cas-virt-004',
            titre: 'Diagnostic hôte de virtualisation en surcharge',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Identifier et résoudre une surcharge de ressources sur un hôte de virtualisation',
            contexte: 'Les VMs hébergées sur un serveur Hyper-V sont lentes et non réactives. L\'hôte semble surchargé.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Quelle ressource est saturée sur l\'hôte ? (Gestionnaire des tâches ou Get-Counter)',
                  choix: [
                    { texte: 'CPU à 100%', suite: 'n_cpu' },
                    { texte: 'RAM saturée, paging actif', suite: 'n_ram' },
                    { texte: 'Disque à 100% d\'utilisation', suite: 'n_disk' }
                  ]
                },
                n_cpu: {
                  question: 'Quelle VM consomme le plus de CPU ?',
                  choix: [
                    { texte: 'Une seule VM monopolise le CPU', suite: 'n_vcpu' },
                    { texte: 'Plusieurs VMs contribuent à la saturation', suite: 'n_spread' }
                  ]
                },
                n_vcpu: {
                  solution: true,
                  correct: true,
                  texte: 'Limiter les vCPUs ou migrer la VM vers un hôte dédié',
                  explication: 'Dans Hyper-V : Set-VMProcessor -VMName "nom" -Maximum 50 limite à 50% du CPU hôte. Ou migrer la VM consommatrice sur un hôte avec plus de ressources. Vérifier aussi si un processus dans la VM est anormal (virus, boucle infinie).'
                },
                n_spread: {
                  solution: true,
                  correct: false,
                  texte: 'Répartir les VMs sur plusieurs hôtes',
                  explication: 'L\'hôte est en surcommit CPU. Options : migrer certaines VMs vers d\'autres hôtes (Export/Import VM ou Live Migration si cluster), réduire le nombre de vCPUs par VM (les VMs n\'utilisent pas forcément tous leurs vCPUs), ou ajouter un hôte au cluster.'
                },
                n_ram: {
                  question: 'La mémoire dynamique est-elle activée sur les VMs ?',
                  choix: [
                    { texte: 'Non, RAM fixe sur toutes les VMs', suite: 'n_dynmem' },
                    { texte: 'Oui, déjà activée', suite: 'n_addram' }
                  ]
                },
                n_dynmem: {
                  solution: true,
                  correct: true,
                  texte: 'Activer la mémoire dynamique Hyper-V',
                  explication: 'Set-VMMemory -VMName "nom" -DynamicMemoryEnabled $true -MinimumBytes 512MB -MaximumBytes 4GB -Buffer 20. La mémoire dynamique permet à Hyper-V de redistribuer la RAM inutilisée entre les VMs selon les besoins réels.'
                },
                n_addram: {
                  solution: true,
                  correct: false,
                  texte: 'Ajouter de la RAM physique à l\'hôte ou migrer des VMs',
                  explication: 'Si la mémoire dynamique est activée et que l\'hôte est toujours saturé, la RAM physique est insuffisante pour la charge de travail réelle. Solutions : ajouter des barrettes RAM à l\'hôte, ou migrer des VMs vers d\'autres hôtes.'
                },
                n_disk: {
                  solution: true,
                  correct: true,
                  texte: 'Migrer les VHD vers un stockage plus rapide (SSD)',
                  explication: 'Les fichiers VHD/VHDX sur un HDD lent créent un goulot d\'étranglement pour toutes les VMs. Migrer les disques virtuels vers un SSD ou un stockage partagé iSCSI/NFS rapide. Utiliser aussi des disques fixes (.vhdx fixe) plutôt que dynamiques pour de meilleures performances I/O.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'virt-m03',
        titre: 'Découverte d\'Hyper-V',
        cas: [
          {
            id: 'cas-virt-005',
            titre: 'Administration Hyper-V via PowerShell',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Gérer le cycle de vie des VMs Hyper-V, créer des snapshots et configurer le réseau virtuel',
            contexte: 'Vous administrez un hôte Hyper-V avec plusieurs VMs. Vous devez créer un checkpoint avant une mise à jour risquée, puis gérer les VMs via PowerShell.',
            contenu: {
              prompt: 'PS C:\\> ',
              commandes: {
                'Get-VM | Select-Object Name, State, CPUUsage, MemoryAssigned': 'Name         State   CPUUsage MemoryAssigned\n----         -----   -------- --------------\nSRV-AD01     Running        2        2147483648\nSRV-WEB01    Running        8        4294967296\nSRV-DB01     Off            0                 0',
                'Checkpoint-VM -Name "SRV-WEB01" -SnapshotName "Avant-MAJ-$(Get-Date -Format yyyyMMdd)"': '',
                'Get-VMCheckpoint -VMName "SRV-WEB01"': 'VMName    Name                    CreationTime         ParentCheckpointName\n------    ----                    ------------         --------------------\nSRV-WEB01 Avant-MAJ-20260321      21/03/2026 14:32:11',
                'Stop-VM -Name "SRV-DB01" -Force': '',
                'Set-VMMemory -VMName "SRV-DB01" -DynamicMemoryEnabled $true -MinimumBytes 1GB -MaximumBytes 8GB': '',
                'Start-VM -Name "SRV-DB01"': '',
                'Get-VMNetworkAdapter -VMName "SRV-WEB01"': 'VMName    Name           IsManagementOs SwitchName   MacAddress        Status\n------    ----           -------------- ----------   ----------        ------\nSRV-WEB01 Network Adapter False          vSwitch-LAN  00155D010101      Ok'
              },
              validation: [
                'Get-VM liste toutes les VMs avec leur état',
                'Checkpoint-VM crée un snapshot avant la mise à jour',
                'Stop-VM puis modification mémoire puis Start-VM',
                'Get-VMNetworkAdapter vérifie la connectivité réseau de la VM'
              ],
              indices: [
                'Checkpoint-VM = snapshot Hyper-V (pas Restore-VMCheckpoint qui restaure)',
                'La mémoire dynamique ne peut se configurer que VM éteinte',
                '-Force dans Stop-VM éteint sans attendre l\'arrêt propre du système invité'
              ],
              solution: [
                'Checkpoint-VM -Name "SRV-WEB01" -SnapshotName "Avant-MAJ"',
                'Stop-VM -Name "SRV-DB01" puis Set-VMMemory ... puis Start-VM',
                'Get-VMNetworkAdapter pour vérifier le réseau'
              ]
            }
          },
          {
            id: 'cas-virt-006',
            titre: 'Diagnostic VM Hyper-V en état critique',
            difficulte: 'difficile',
            format: 'arbre',
            objectif: 'Résoudre une VM Hyper-V affichant un état "Critique" ou "Sauvegardé" bloqué',
            contexte: 'Une VM Hyper-V est bloquée en état "Sauvegardé" ou affiche un état "Critique" et ne répond plus.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Quel est l\'état exact de la VM dans Get-VM ?',
                  choix: [
                    { texte: '"Saved" (Sauvegardé)', suite: 'n2' },
                    { texte: '"Critical" ou "Paused" forcé', suite: 'n3' }
                  ]
                },
                n2: {
                  question: 'Voulez-vous reprendre la VM depuis son état sauvegardé ou repartir proprement ?',
                  choix: [
                    { texte: 'Reprendre depuis l\'état sauvegardé', suite: 'n_resume' },
                    { texte: 'Ignorer l\'état et redémarrer proprement', suite: 'n_discard' }
                  ]
                },
                n_resume: {
                  solution: true,
                  correct: true,
                  texte: 'Démarrer la VM — elle reprend depuis l\'état sauvegardé',
                  explication: 'Start-VM -Name "nom". Une VM "Saved" reprend exactement là où elle s\'est arrêtée (comme une hibernation). L\'état sauvegardé peut être dû à un arrêt de l\'hôte alors que la VM était en marche. Vérifier que la RAM nécessaire est disponible avant de reprendre.'
                },
                n_discard: {
                  solution: true,
                  correct: true,
                  texte: 'Supprimer l\'état sauvegardé et redémarrer',
                  explication: 'Remove-VMSavedState -VMName "nom" supprime le fichier .vsv et .bin de l\'état sauvegardé. La VM redémarrera normalement (redémarrage à froid). Utiliser si l\'état sauvegardé est corrompu ou si les données en mémoire ne sont plus utiles.'
                },
                n3: {
                  question: 'La VM est-elle en "Critical" à cause de snapshots trop nombreux ?',
                  choix: [
                    { texte: 'Oui, chaîne de snapshots très longue', suite: 'n_snap' },
                    { texte: 'Non, pas de snapshots anormaux', suite: 'n4' }
                  ]
                },
                n_snap: {
                  solution: true,
                  correct: true,
                  texte: 'Fusionner ou supprimer les anciens checkpoints',
                  explication: 'Une longue chaîne de snapshots dégrade les performances et peut corrompre la VM. Dans Hyper-V Manager, supprimer les anciens checkpoints (clic droit > Supprimer le checkpoint). La fusion (merge) des .avhdx dans le .vhdx parent peut prendre du temps mais assainit la VM.'
                },
                n4: {
                  question: 'L\'espace disque de l\'hôte est-il suffisant pour les fichiers de la VM ?',
                  choix: [
                    { texte: 'Non, disque hôte plein', suite: 'n_disk' },
                    { texte: 'Oui, espace suffisant', suite: 'n_service' }
                  ]
                },
                n_disk: {
                  solution: true,
                  correct: true,
                  texte: 'Libérer de l\'espace sur le disque hôte',
                  explication: 'Hyper-V met en pause les VMs (état Paused/Critical) quand l\'espace disque tombe sous un seuil critique (par défaut 2 Go). Libérer de l\'espace : supprimer des VMs inutilisées, des ISO, des anciens checkpoints. La VM reprendra automatiquement une fois l\'espace restauré.'
                },
                n_service: {
                  solution: true,
                  correct: false,
                  texte: 'Redémarrer le service Hyper-V Virtual Machine Management',
                  explication: 'Stop-Service vmms -Force puis Start-Service vmms. Le service VMMS gère toutes les VMs. Un redémarrage du service peut résoudre des états incohérents. Attention : cela peut impacter les VMs en cours d\'exécution.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'virt-m04',
        titre: 'Infrastructure vSphere',
        cas: [
          {
            id: 'cas-virt-007',
            titre: 'Compréhension de l\'architecture vSphere',
            difficulte: 'moyen',
            format: 'scenario',
            objectif: 'Identifier les composants vSphere et leurs rôles dans une infrastructure de virtualisation d\'entreprise',
            contexte: 'Vous intégrez une équipe qui administre une infrastructure vSphere. Vous devez démontrer votre compréhension des composants et de leur interaction.',
            contenu: {
              etapes: [
                {
                  description: 'Un hôte ESXi vient d\'être ajouté au datacenter. Vous devez le joindre au cluster existant. Via quelle interface effectuez-vous cette opération ?',
                  choix: [
                    { texte: 'Directement sur la console DCUI (Direct Console User Interface) de l\'ESXi', correct: false, feedback: 'La DCUI permet la configuration initiale de l\'hôte (IP, hostname) mais pas l\'ajout à un cluster vCenter. L\'ajout au cluster se fait via vCenter.' },
                    { texte: 'Via vSphere Client (interface web vCenter)', correct: true, feedback: 'Correct ! L\'ajout d\'un hôte à un cluster se fait dans vSphere Client (anciennement vSphere Web Client) connecté à vCenter Server : Datacenter > Cluster > Actions > Ajouter un hôte.' },
                    { texte: 'Via PowerCLI sur l\'hôte ESXi directement', correct: false, feedback: 'PowerCLI peut ajouter un hôte à vCenter mais la connexion se fait vers vCenter, pas vers l\'ESXi. La commande serait Add-VMHost dans PowerCLI connecté à vCenter.' },
                    { texte: 'Via SSH sur l\'ESXi avec esxcli cluster add', correct: false, feedback: 'esxcli ne permet pas de joindre un cluster vCenter. L\'ajout au cluster est une opération gérée par vCenter, pas par l\'hôte lui-même.' }
                  ]
                },
                {
                  description: 'Quelle est la différence entre un datastore VMFS et un datastore NFS dans vSphere ?',
                  choix: [
                    { texte: 'VMFS est pour les VMs Linux, NFS pour les VMs Windows', correct: false, feedback: 'Faux. Les deux types de datastore peuvent héberger des VMs Windows ou Linux. La distinction est basée sur le protocole de stockage, pas le système d\'exploitation invité.' },
                    { texte: 'VMFS est sur stockage bloc (SAN/local), NFS est sur stockage fichier (NAS)', correct: true, feedback: 'Correct ! VMFS (VMware File System) s\'installe sur des LUN SAN (iSCSI, Fibre Channel) ou disques locaux. NFS est monté depuis un serveur NAS via le protocole réseau NFS. Les deux sont visibles comme datastores dans vCenter.' },
                    { texte: 'VMFS supporte vMotion, NFS ne le supporte pas', correct: false, feedback: 'Les deux types de datastores supportent vMotion. La condition pour vMotion est que les deux hôtes aient accès au même datastore — ce qui est possible avec VMFS partagé (SAN) ou NFS.' },
                    { texte: 'NFS a de meilleures performances que VMFS dans tous les cas', correct: false, feedback: 'Les performances dépendent de l\'infrastructure réseau et de stockage. Un SAN Fibre Channel avec VMFS surpasse généralement un NAS NFS sur réseau 1GbE. La comparaison dépend du contexte.' }
                  ]
                }
              ]
            }
          },
          {
            id: 'cas-virt-008',
            titre: 'Diagnostic hôte ESXi inaccessible dans vCenter',
            difficulte: 'difficile',
            format: 'arbre',
            objectif: 'Identifier pourquoi un hôte ESXi apparaît comme "Déconnecté" ou "Non répondant" dans vCenter',
            contexte: 'Un hôte ESXi dans votre cluster vCenter apparaît en état "Déconnecté" ou "Non répondant". Les VMs qu\'il héberge sont inaccessibles.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'L\'hôte ESXi est-il physiquement accessible (ping de l\'IP de management) ?',
                  choix: [
                    { texte: 'Non, pas de réponse au ping', suite: 'n2' },
                    { texte: 'Oui, ping OK mais déconnecté de vCenter', suite: 'n3' }
                  ]
                },
                n2: {
                  question: 'L\'hôte est-il physiquement allumé ? (voyants serveur, console IPMI/iLO)',
                  choix: [
                    { texte: 'Non ou incertain', suite: 'n_power' },
                    { texte: 'Oui, allumé mais inaccessible réseau', suite: 'n_net' }
                  ]
                },
                n_power: {
                  solution: true,
                  correct: true,
                  texte: 'Vérifier l\'alimentation et redémarrer via IPMI/iLO',
                  explication: 'Accéder à l\'interface de gestion out-of-band (Dell iDRAC, HP iLO, Cisco CIMC) pour vérifier l\'état du serveur et le redémarrer si nécessaire. Si pas d\'accès distant, intervention physique sur le datacenter.'
                },
                n_net: {
                  solution: true,
                  correct: false,
                  texte: 'Vérifier la connectivité réseau de management',
                  explication: 'Vérifier le câble réseau de la carte de management (vmk0). Vérifier le port switch (VLAN de management). Si accessible via DCUI, vérifier la configuration réseau : esxcli network ip interface list. Reconfigurer l\'IP si nécessaire.'
                },
                n3: {
                  question: 'Le service vpxa (vCenter Agent) est-il actif sur l\'ESXi ?',
                  choix: [
                    { texte: 'Non ou inconnu', suite: 'n_vpxa' },
                    { texte: 'Oui, vpxa actif', suite: 'n4' }
                  ]
                },
                n_vpxa: {
                  solution: true,
                  correct: true,
                  texte: 'Redémarrer l\'agent vCenter (vpxa) sur l\'ESXi',
                  explication: 'Via SSH sur l\'ESXi : /etc/init.d/vpxa restart. Le service vpxa est l\'agent qui communique avec vCenter. S\'il est planté, l\'hôte apparaît déconnecté alors qu\'il fonctionne normalement. Après redémarrage, reconnecter l\'hôte depuis vCenter.'
                },
                n4: {
                  question: 'Les certificats SSL de l\'hôte ESXi sont-ils expirés ?',
                  choix: [
                    { texte: 'Oui, certificats expirés', suite: 'n_cert' },
                    { texte: 'Non, certificats valides', suite: 'n_reconnect' }
                  ]
                },
                n_cert: {
                  solution: true,
                  correct: true,
                  texte: 'Renouveler les certificats ESXi',
                  explication: 'Via vCenter : sélectionner l\'hôte > Actions > Certificat > Renouveler le certificat. Ou en SSH sur l\'ESXi : /sbin/generate-certificates puis redémarrer les services hostd et vpxa. Les certificats expirés empêchent la communication sécurisée avec vCenter.'
                },
                n_reconnect: {
                  solution: true,
                  correct: false,
                  texte: 'Reconnecter manuellement l\'hôte depuis vCenter',
                  explication: 'Dans vSphere Client > clic droit sur l\'hôte > Connexion > Reconnecter. Cette action force vCenter à réinitialiser la connexion. Si ça échoue, vérifier les logs vCenter (vpxd.log) et ESXi (/var/log/vpxa.log) pour la cause exacte.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'virt-m05',
        titre: 'Gestion du réseau vSphere/ESXi',
        cas: [
          {
            id: 'cas-virt-009',
            titre: 'Configuration d\'un vSwitch et portgroups ESXi',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Créer un vSwitch standard, des portgroups et configurer la politique réseau via esxcli',
            contexte: 'Sur un hôte ESXi, vous devez créer un vSwitch dédié à la production avec deux portgroups : un pour les VMs (VLAN 100) et un pour les VMs de test (VLAN 200).',
            contenu: {
              prompt: '[root@ESXi01:~] ',
              commandes: {
                'esxcli network vswitch standard list': 'vSwitch0\n   Name: vSwitch0\n   Uplinks: vmnic0\n   Portgroups: VM Network, Management Network',
                'esxcli network vswitch standard add --vswitch-name=vSwitch1': '',
                'esxcli network vswitch standard uplink add --vswitch-name=vSwitch1 --uplink-name=vmnic1': '',
                'esxcli network vswitch standard portgroup add --vswitch-name=vSwitch1 --portgroup-name="PROD-VLAN100"': '',
                'esxcli network vswitch standard portgroup set --portgroup-name="PROD-VLAN100" --vlan-id=100': '',
                'esxcli network vswitch standard portgroup add --vswitch-name=vSwitch1 --portgroup-name="TEST-VLAN200"': '',
                'esxcli network vswitch standard portgroup set --portgroup-name="TEST-VLAN200" --vlan-id=200': '',
                'esxcli network vswitch standard portgroup list': 'Name              Virtual Switch  Active Clients  VLAN ID\n----------------  --------------  --------------  -------\nVM Network        vSwitch0                     2        0\nManagement Network vSwitch0                    1        0\nPROD-VLAN100      vSwitch1                     0      100\nTEST-VLAN200      vSwitch1                     0      200'
              },
              validation: [
                'vSwitch1 créé avec esxcli network vswitch standard add',
                'Uplink physique vmnic1 attaché au vSwitch1',
                'Deux portgroups créés avec VLAN ID 100 et 200',
                'Vérification avec portgroup list'
              ],
              indices: [
                'Un uplink (vmnic) connecte le vSwitch au réseau physique',
                'VLAN ID 0 = pas de VLAN tagging (trafic natif)',
                'Le switch physique doit être configuré en mode trunk pour les VLAN 100 et 200'
              ],
              solution: [
                'esxcli network vswitch standard add --vswitch-name=vSwitch1',
                'esxcli network vswitch standard uplink add --vswitch-name=vSwitch1 --uplink-name=vmnic1',
                'esxcli network vswitch standard portgroup add + set --vlan-id pour chaque portgroup'
              ]
            }
          },
          {
            id: 'cas-virt-010',
            titre: 'Diagnostic VM sans réseau sur ESXi',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Identifier pourquoi une VM n\'a pas de connectivité réseau sur un hôte ESXi',
            contexte: 'Une VM hébergée sur ESXi n\'a pas d\'accès réseau bien qu\'elle soit allumée. Les autres VMs sur le même hôte fonctionnent normalement.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'La VM est-elle connectée au bon portgroup dans ses paramètres réseau ?',
                  choix: [
                    { texte: 'Non ou portgroup incorrect', suite: 'n_pg' },
                    { texte: 'Oui, bon portgroup', suite: 'n2' }
                  ]
                },
                n_pg: {
                  solution: true,
                  correct: true,
                  texte: 'Corriger le portgroup dans les paramètres de la VM',
                  explication: 'Éteindre la VM > Modifier les paramètres > Carte réseau > changer le portgroup pour le correct. Le portgroup doit correspondre au VLAN du réseau auquel la VM doit appartenir. Une VM sur le mauvais portgroup est isolée réseau.'
                },
                n2: {
                  question: 'La carte réseau de la VM est-elle connectée ? (Statut "Connecté" dans les paramètres)',
                  choix: [
                    { texte: 'Non, déconnectée', suite: 'n_nic' },
                    { texte: 'Oui, connectée', suite: 'n3' }
                  ]
                },
                n_nic: {
                  solution: true,
                  correct: true,
                  texte: 'Activer la connexion de la carte réseau virtuelle',
                  explication: 'Modifier les paramètres de la VM > Carte réseau > cocher "Connecter au démarrage" et activer "Connecté". Une carte réseau peut être déconnectée accidentellement lors d\'une modification des paramètres VM.'
                },
                n3: {
                  question: 'Le portgroup a-t-il un VLAN ID configuré ? Le switch physique est-il en mode trunk pour ce VLAN ?',
                  choix: [
                    { texte: 'VLAN configuré mais trunk manquant côté switch physique', suite: 'n_trunk' },
                    { texte: 'Pas de VLAN, réseau plat', suite: 'n4' }
                  ]
                },
                n_trunk: {
                  solution: true,
                  correct: true,
                  texte: 'Configurer le port du switch physique en mode trunk',
                  explication: 'Le port switch physique connecté à l\'uplink ESXi doit être configuré en trunk pour laisser passer les VLANs. Sur Cisco : interface Gi0/1 > switchport mode trunk > switchport trunk allowed vlan add 100. Sans trunk, les paquets VLAN tagged sont ignorés.'
                },
                n4: {
                  solution: true,
                  correct: false,
                  texte: 'Vérifier la configuration IP dans la VM',
                  explication: 'Si le réseau ESXi est OK, le problème est peut-être dans la VM elle-même : mauvaise IP, masque, passerelle. Ouvrir la console VMware et vérifier ipconfig (Windows) ou ip addr (Linux). Tester ping vers la passerelle depuis la VM.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'virt-m07',
        titre: 'Gestion du stockage vSphere/ESXi',
        cas: [
          {
            id: 'cas-virt-011',
            titre: 'Gestion des datastores ESXi via esxcli',
            difficulte: 'moyen',
            format: 'terminal',
            objectif: 'Lister les datastores, vérifier l\'espace disponible et gérer les fichiers VMware via esxcli',
            contexte: 'Vous devez auditer l\'espace de stockage sur un hôte ESXi, identifier les datastores presque pleins et nettoyer les fichiers orphelins.',
            contenu: {
              prompt: '[root@ESXi01:~] ',
              commandes: {
                'esxcli storage filesystem list': 'Mount Point                     Volume Name  UUID                                 Mounted  Type  Size          Free\n-----------                     -----------  ----                                 -------  ----  ----          ----\n/vmfs/volumes/datastore1        datastore1   5a1b2c3d-...                         true     VMFS  1.09 TB       123.45 GB\n/vmfs/volumes/datastore2        datastore2   5a1b2c3e-...                         true     VMFS  2.18 TB       1.54 TB',
                'du -sh /vmfs/volumes/datastore1/*': '45.2G  /vmfs/volumes/datastore1/SRV-WEB01\n32.1G  /vmfs/volumes/datastore1/SRV-AD01\n12.3G  /vmfs/volumes/datastore1/ISO\n8.7G   /vmfs/volumes/datastore1/SRV-ANCIEN-SNAPSHOTS',
                'ls /vmfs/volumes/datastore1/SRV-ANCIEN-SNAPSHOTS/': 'SRV-ANCIEN.vmx\nSRV-ANCIEN-000001.vmdk\nSRV-ANCIEN-000001-delta.vmdk\nSRV-ANCIEN.vmsd',
                'esxcli vm process list': 'SRV-WEB01\n   World ID: 12345\n   Process ID: 0\n   VMX Cartel ID: 12344\n   UUID: 56 4d ...\n   Display Name: SRV-WEB01\n   Config File: /vmfs/volumes/datastore1/SRV-WEB01/SRV-WEB01.vmx',
                'vmkfstools -i /vmfs/volumes/datastore1/SRV-WEB01/SRV-WEB01.vmdk /vmfs/volumes/datastore2/SRV-WEB01/SRV-WEB01.vmdk -d thin': 'Destination disk format: VMFS thin-provisioned\nCloning disk ...\n100% done.'
              },
              validation: [
                'esxcli storage filesystem list liste les datastores avec espace libre',
                'du -sh permet de voir l\'occupation par VM',
                'esxcli vm process list identifie les VMs actives vs orphelines',
                'vmkfstools -i permet de cloner/migrer un disque vers un autre datastore'
              ],
              indices: [
                'Les fichiers -000001.vmdk sont des snapshots — à fusionner si la VM est supprimée',
                'vmkfstools -d thin crée un disque thin-provisionned (espace alloué à la demande)',
                'Les dossiers sans VM active dans process list sont potentiellement orphelins'
              ],
              solution: [
                'esxcli storage filesystem list pour voir l\'espace',
                'du -sh pour identifier les dossiers volumineux',
                'vmkfstools -i pour migrer un disque vers un datastore moins chargé'
              ]
            }
          },
          {
            id: 'cas-virt-012',
            titre: 'Diagnostic datastore ESXi plein',
            difficulte: 'moyen',
            format: 'arbre',
            objectif: 'Libérer de l\'espace sur un datastore VMFS ESXi saturé sans perdre de données',
            contexte: 'Une alerte indique que le datastore1 est à 95% de capacité. De nouvelles VMs ne peuvent plus être créées et certaines VMs existantes se retrouvent en état critique.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'Y a-t-il des snapshots (checkpoints) anciens sur les VMs du datastore ?',
                  choix: [
                    { texte: 'Oui, des snapshots anciens existent', suite: 'n_snap' },
                    { texte: 'Non, pas de snapshots', suite: 'n2' }
                  ]
                },
                n_snap: {
                  solution: true,
                  correct: true,
                  texte: 'Consolider et supprimer les snapshots anciens',
                  explication: 'Dans vSphere Client > clic droit sur la VM > Snapshots > Supprimer tous les snapshots (consolide les delta dans le disque de base). Les fichiers -delta.vmdk peuvent représenter des Go ou To selon leur ancienneté. C\'est souvent la cause principale d\'un datastore plein.'
                },
                n2: {
                  question: 'Y a-t-il des VMs supprimées dont les fichiers VMDK restent sur le datastore ?',
                  choix: [
                    { texte: 'Oui, dossiers orphelins présents', suite: 'n_orphan' },
                    { texte: 'Non, aucun dossier orphelin', suite: 'n3' }
                  ]
                },
                n_orphan: {
                  solution: true,
                  correct: true,
                  texte: 'Supprimer les dossiers de VMs orphelins',
                  explication: 'Via vSphere Client > Datastores > navigateur de fichiers, ou via SSH : ls /vmfs/volumes/datastore1/ et comparer avec esxcli vm process list. Supprimer les dossiers des VMs qui n\'existent plus dans l\'inventaire vCenter. Vérifier d\'abord qu\'aucune VM active ne les utilise !'
                },
                n3: {
                  question: 'Des fichiers ISO sont-ils stockés sur ce datastore ?',
                  choix: [
                    { texte: 'Oui, plusieurs ISO volumineux', suite: 'n_iso' },
                    { texte: 'Non, pas d\'ISO', suite: 'n4' }
                  ]
                },
                n_iso: {
                  solution: true,
                  correct: true,
                  texte: 'Déplacer les ISO vers un datastore dédié ou NAS',
                  explication: 'Les fichiers ISO (souvent 4-8 Go pièce) consomment de l\'espace précieux sur les datastores de VMs. Les déplacer vers un datastore NFS dédié au stockage d\'ISO, ou les supprimer s\'ils ne sont plus utiles. Vérifier d\'abord qu\'aucune VM ne monte l\'ISO actuellement.'
                },
                n4: {
                  solution: true,
                  correct: false,
                  texte: 'Migrer des VMs vers un autre datastore avec Storage vMotion',
                  explication: 'Storage vMotion migre les fichiers d\'une VM d\'un datastore à un autre sans interrompre la VM. Dans vSphere Client > clic droit sur la VM > Migrer > Modifier uniquement le stockage > sélectionner le datastore de destination. Requiert une licence vSphere avec Storage vMotion.'
                }
              }
            }
          }
        ]
      },
      {
        id: 'virt-m08',
        titre: 'Gestion d\'un datacenter',
        cas: [
          {
            id: 'cas-virt-013',
            titre: 'Planification et organisation d\'un datacenter virtuel',
            difficulte: 'difficile',
            format: 'scenario',
            objectif: 'Prendre les bonnes décisions d\'architecture pour organiser un datacenter virtuel vSphere',
            contexte: 'Vous êtes en charge de la conception d\'un nouveau datacenter virtuel pour une organisation avec 3 sites et 200 VMs au total.',
            contenu: {
              etapes: [
                {
                  description: 'Pour assurer la continuité de service, vous voulez que les VMs critiques redémarrent automatiquement sur un autre hôte en cas de panne. Quelle fonctionnalité activer dans le cluster vSphere ?',
                  choix: [
                    { texte: 'vSphere DRS (Distributed Resource Scheduler)', correct: false, feedback: 'DRS équilibre la charge entre les hôtes en conditions normales, mais ne gère pas les pannes. Il recommande ou effectue des migrations vMotion pour optimiser l\'utilisation des ressources.' },
                    { texte: 'vSphere HA (High Availability)', correct: true, feedback: 'Correct ! vSphere HA surveille les hôtes du cluster. En cas de panne d\'un hôte, HA redémarre automatiquement les VMs sur les hôtes survivants. C\'est la fonctionnalité de haute disponibilité de base pour les VMs critiques.' },
                    { texte: 'vSphere FT (Fault Tolerance)', correct: false, feedback: 'FT fournit une disponibilité sans interruption (zéro downtime) en maintenant une VM miroir sur un autre hôte, mais consomme beaucoup de ressources. Réservé aux applications les plus critiques, pas à l\'ensemble du parc.' },
                    { texte: 'vMotion automatique', correct: false, feedback: 'vMotion migre les VMs à chaud entre hôtes mais ne gère pas les pannes. En cas de panne, il n\'y a plus d\'hôte source pour initier la migration.' }
                  ]
                },
                {
                  description: 'Comment organiser les 200 VMs de 3 sites différents dans vCenter pour faciliter l\'administration et l\'application des politiques ?',
                  choix: [
                    { texte: 'Mettre toutes les VMs dans un seul cluster flat', correct: false, feedback: 'Un seul cluster flat sans organisation rend l\'administration très difficile à grande échelle. Aucune isolation, politiques globales impossibles à différencier par site.' },
                    { texte: 'Un datacenter vCenter par site, avec dossiers et clusters organisés par fonction', correct: true, feedback: 'Correct ! La hiérarchie vCenter recommandée : Datacenter (par site) > Clusters (par tier/fonction) > Dossiers (par service/application). Cela permet d\'appliquer des permissions et politiques précises à chaque niveau.' },
                    { texte: 'Un vCenter Server par VM', correct: false, feedback: 'Absurde. Un vCenter peut gérer des milliers de VMs et d\'hôtes. Multiplier les vCenter sans raison augmente la complexité et les coûts de licence.' },
                    { texte: 'Utiliser uniquement des tags vSphere sans organisation hiérarchique', correct: false, feedback: 'Les tags sont utiles pour le filtrage et les politiques, mais ne remplacent pas l\'organisation hiérarchique. Sans structure, la gestion des permissions et l\'isolation entre sites devient complexe.' }
                  ]
                }
              ]
            }
          },
          {
            id: 'cas-virt-014',
            titre: 'Diagnostic vCenter Server inaccessible',
            difficulte: 'difficile',
            format: 'arbre',
            objectif: 'Identifier et résoudre l\'inaccessibilité de vCenter Server Appliance (VCSA)',
            contexte: 'vCenter Server est inaccessible via l\'interface web (https://vcenter.tssr.local). Les administrateurs ne peuvent plus gérer le cluster vSphere.',
            contenu: {
              noeud_depart: 'n1',
              noeuds: {
                n1: {
                  question: 'La VM vCenter (VCSA) est-elle allumée et accessible par ping ?',
                  choix: [
                    { texte: 'Non, VM éteinte ou ping KO', suite: 'n2' },
                    { texte: 'Oui, ping OK mais interface web inaccessible', suite: 'n3' }
                  ]
                },
                n2: {
                  question: 'La VM VCSA peut-elle être démarrée directement depuis l\'hôte ESXi ?',
                  choix: [
                    { texte: 'Oui, démarrage possible depuis DCUI/SSH ESXi', suite: 'n_start' },
                    { texte: 'Non, l\'hôte ESXi hébergeant VCSA est aussi KO', suite: 'n_host' }
                  ]
                },
                n_start: {
                  solution: true,
                  correct: true,
                  texte: 'Démarrer la VCSA depuis l\'hôte ESXi directement',
                  explication: 'Via SSH sur l\'hôte ESXi hébergeant VCSA : vim-cmd vmsvc/getallvms pour lister les VMs, puis vim-cmd vmsvc/power.on <vmid> pour démarrer VCSA. L\'ESXi peut être géré directement sans vCenter pour les opérations basiques.'
                },
                n_host: {
                  solution: true,
                  correct: false,
                  texte: 'Résoudre d\'abord la panne de l\'hôte ESXi',
                  explication: 'Si l\'hôte hébergeant VCSA est en panne, vCenter ne peut pas démarrer. Restaurer l\'hôte en priorité (voir diagnostic hôte ESXi). En production, VCSA devrait être sur un cluster avec HA pour éviter ce scénario unique de défaillance (SPOF).'
                },
                n3: {
                  question: 'Le service web vSphere Client (vsphere-ui) est-il démarré sur la VCSA ?',
                  choix: [
                    { texte: 'Non ou inconnu', suite: 'n_svc' },
                    { texte: 'Oui, service actif', suite: 'n4' }
                  ]
                },
                n_svc: {
                  solution: true,
                  correct: true,
                  texte: 'Redémarrer les services vCenter depuis la VAMI',
                  explication: 'Accéder à la VAMI (vCenter Appliance Management Interface) sur https://vcenter:5480. Aller dans Services > redémarrer vsphere-ui et vmware-vpxd. Si VAMI aussi inaccessible, SSH sur VCSA : service-control --restart vsphere-ui.'
                },
                n4: {
                  question: 'Le certificat SSL de vCenter est-il expiré ?',
                  choix: [
                    { texte: 'Oui, certificat expiré', suite: 'n_cert' },
                    { texte: 'Non, certificat valide', suite: 'n_db' }
                  ]
                },
                n_cert: {
                  solution: true,
                  correct: true,
                  texte: 'Renouveler les certificats vCenter via VAMI',
                  explication: 'VAMI (port 5480) > Certificate Management > Renouveler le certificat. Ou via vSphere Client si accessible : Administration > Gestion des certificats. Les certificats VMCA (VMware CA) peuvent être renouvelés sans réinstallation de vCenter.'
                },
                n_db: {
                  solution: true,
                  correct: false,
                  texte: 'Vérifier l\'espace disque de la VCSA et la base de données',
                  explication: 'VCSA utilise une base PostgreSQL interne. Si le disque est plein, vCenter plante. Vérifier via VAMI > Surveillance > Disques. Augmenter la taille du disque ou archiver les logs anciens. Les logs dans /var/log/vmware/vpxd/ peuvent devenir très volumineux.'
                }
              }
            }
          }
        ]
      }
    ]
  }
]
};
