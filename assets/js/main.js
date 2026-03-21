/**
 * assets/js/main.js
 * TSSR Notes — Script principal
 * ─────────────────────────────
 * 1.  Schéma de données & clés localStorage
 * 2.  Couche persistance (lecture / écriture)
 * 3.  Données par défaut des modules
 * 4.  Calcul des statistiques globales
 * 5.  Rendu de la page d'accueil
 *     5a. Hero & barre de progression globale
 *     5b. Dashboard stats
 *     5c. Grille des modules
 *     5d. Activité récente
 *     5e. Prochaine révision
 * 6.  Utilitaires partagés (toast, formatDate, etc.)
 * 7.  Navigation & burger mobile
 * 8.  Initialisation
 */

'use strict';

/* ═══════════════════════════════════════════════════════════
   1. SCHÉMA DE DONNÉES & CLÉS LOCALSTORAGE
   ═══════════════════════════════════════════════════════════

   tssr_modules    → Array<Module>
   tssr_quiz       → QuizStats
   tssr_checklist  → ChecklistStats
   tssr_activity   → Array<Activity>  (max 50 entrées)

   Module {
     id:         string,          // ex: "reseau"
     progress:   number,          // 0–100
     status:     "todo"|"wip"|"done",
     lastVisit:  string|null,     // ISO date
     quizScores: Array<number>    // scores en %
   }

   QuizStats {
     totalAnswered: number,
     totalCorrect:  number,
     sessions:      number
   }

   ChecklistStats {
     totalItems:     number,
     completedItems: number
   }

   Activity {
     type:      "quiz"|"cours"|"checklist"|"glossaire",
     label:     string,
     moduleId:  string|null,
     date:      string            // ISO date
   }
   ═══════════════════════════════════════════════════════════ */

/** Retourne la clé localStorage préfixée par userId si connecté */
function _key(name) {
  if (typeof TSSRAuth !== 'undefined') {
    const s = TSSRAuth.getSession();
    if (s) return `tssr_${s.userId}_${name}`;
  }
  return `tssr_${name}`;
}

const KEYS = {
  get modules()   { return _key('modules');   },
  get quiz()      { return _key('quiz');      },
  get checklist() { return _key('checklist'); },
  get activity()  { return _key('activity');  },
};

/* ═══════════════════════════════════════════════════════════
   2. COUCHE PERSISTANCE
   ═══════════════════════════════════════════════════════════ */

const Store = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('[TSSR] localStorage write failed:', e);
    }
  },

  /** Fusionne un objet partiel dans une valeur existante */
  patch(key, partial, fallback = {}) {
    const current = this.get(key, fallback);
    this.set(key, { ...current, ...partial });
  },

  /** Ajoute une activité (garde les 50 dernières) */
  addActivity(activity) {
    const list = this.get(KEYS.activity, []);
    list.unshift({ ...activity, date: new Date().toISOString() });
    this.set(KEYS.activity, list.slice(0, 50));
  },

  /** Met à jour la progression d'un module par son id */
  updateModule(id, patch) {
    const modules = this.get(KEYS.modules, DEFAULT_MODULES);
    const idx = modules.findIndex(m => m.id === id);
    if (idx !== -1) {
      modules[idx] = { ...modules[idx], ...patch };
      this.set(KEYS.modules, modules);
    }
  },
};

/* ═══════════════════════════════════════════════════════════
   3. DONNÉES PAR DÉFAUT DES MODULES
   ═══════════════════════════════════════════════════════════ */

// Raccourci pour créer une entrée module (valeurs par défaut)
function _mod(id, label, icon, domain, description) {
  return { id, label, icon, domain, description, progress: 0, status: 'todo', lastVisit: null, quizScores: [] };
}

const DEFAULT_MODULES = [
  // ── Administration GNU Linux (linux) ──
  _mod('admin-linux-installation',    'Installation',                        '💿', 'linux',        'Installation d\'une distribution GNU/Linux.'),
  _mod('admin-linux-demarrage',       'Démarrage',                           '🚀', 'linux',        'Séquence de démarrage Linux : BIOS/UEFI, GRUB, systemd.'),
  _mod('admin-linux-droits',          'Droits sur les fichiers',             '🔐', 'linux',        'Permissions Unix : chmod, chown, SUID/SGID/sticky bit.'),
  _mod('admin-linux-users-groupes',   'Gestion utilisateurs et groupes',     '👥', 'linux',        'Création, modification et suppression d\'utilisateurs et groupes.'),
  _mod('admin-linux-paquets',         'Gestion des paquets',                 '📦', 'linux',        'apt, dpkg, dépôts, mise à jour et gestion des paquets Debian.'),
  _mod('admin-linux-reseau',          'Gestion du réseau',                   '🌐', 'linux',        'Configuration réseau Linux : ip, nmcli, interfaces, routing.'),
  _mod('admin-linux-gestion-stockage','Gestion du stockage',                 '💾', 'linux',        'Partitionnement, systèmes de fichiers, montage.'),
  _mod('admin-linux-stockage-fs',     'Gestion Stockage — File System',      '🗂️', 'linux',        'Systèmes de fichiers Linux : ext4, xfs, btrfs, montage persistant.'),
  _mod('admin-linux-lvm',             'LVM — Gestion avancée du stockage',   '🔧', 'linux',        'Logical Volume Manager : PV, VG, LV, redimensionnement à chaud.'),
  _mod('admin-linux-maintenance-prod','Maintenance en production',           '🛠️', 'linux',        'Surveillance, journaux, mises à jour et maintenance Linux.'),
  _mod('admin-linux-mode-maintenance','Mode Maintenance',                    '🔴', 'linux',        'Rescue mode, single user, récupération de mot de passe root.'),
  // ── Base des Réseaux (reseau) ──
  _mod('base-reseaux-m01',            'Modèle OSI',                          '📊', 'reseau',       'Les 7 couches du modèle OSI et leurs protocoles associés.'),
  _mod('base-reseaux-m02',            'Les Unités Informatiques',            '🔢', 'reseau',       'Bit, octet, kilo, méga, giga : unités et conversions.'),
  _mod('base-reseaux-m03',            'Adressage IPv4',                      '🌐', 'reseau',       'Classes, CIDR, sous-réseaux, calcul d\'adresses réseau.'),
  _mod('base-reseaux-m04',            'Communication Réseau',                '📡', 'reseau',       'Protocoles TCP, UDP, ARP, ICMP, encapsulation, flux.'),
  _mod('base-reseaux-m05',            'Premières Commandes',                 '💻', 'reseau',       'ping, traceroute, ipconfig/ip addr, netstat, premiers diagnostics.'),
  // ── GLPI (itil) ──
  _mod('glpi-m01',                    'Présentation et installation GLPI',   '🎫', 'itil',         'Découverte de GLPI, prérequis, installation et configuration initiale.'),
  _mod('glpi-m02',                    'Authentification AD & Habilitations', '🔑', 'itil',         'Intégration LDAP/AD dans GLPI, profils et habilitations.'),
  _mod('glpi-m03',                    'Gestion de parc & Inventaire',        '🖥️', 'itil',         'CMDB GLPI, gestion du parc matériel et logiciel, inventaire.'),
  _mod('glpi-m04',                    'Assistance & Traitements Automatisés','🤖', 'itil',         'Tickets, SLA, règles métier, automatisation des traitements.'),
  _mod('glpi-m05',                    'Bases de MySQL et MariaDB',           '🗄️', 'itil',         'SQL fondamentaux, gestion de la base GLPI, sauvegardes.'),
  _mod('glpi-m06',                    'Plugins & FusionInventory',           '🔌', 'itil',         'Installation de plugins GLPI et déploiement de FusionInventory.'),
  // ── ITIL et gestion de parc (itil) ──
  _mod('itil-m01',                    'La gestion des services',             '📋', 'itil',         'Introduction à l\'ITSM, valeur des services, SVS ITIL v4.'),
  _mod('itil-m02',                    'Stratégie et Conception des services','🎯', 'itil',         'Stratégie : portefeuille, finances. Conception : catalogue, SLA.'),
  _mod('itil-m03',                    'Transition des services',             '🔄', 'itil',         'Gestion du changement, release, déploiement, CMDB.'),
  _mod('itil-m04',                    'Exploitation des services',           '⚙️', 'itil',         'Gestion des incidents, problèmes, événements, accès.'),
  _mod('itil-m05',                    'Amélioration continue des services',  '📈', 'itil',         'CSI : roue de Deming, métriques, plans d\'amélioration.'),
  _mod('itil-m06',                    'Savoir, Savoir-faire, Savoir-être',   '🎓', 'itil',         'Compétences comportementales et relationnelles du technicien TSSR.'),
  // ── Scripting Bash (scripting) ──
  _mod('bash-m01',                    'Analyse',                             '🔍', 'scripting',    'Méthodologie d\'analyse avant l\'écriture d\'un script Bash.'),
  _mod('bash-m02',                    'Écriture des scripts',                '✍️', 'scripting',    'Structure d\'un script Bash : shebang, commentaires, exécution.'),
  _mod('bash-m03',                    'Premières commandes utiles',          '💻', 'scripting',    'Commandes essentielles pour les scripts : echo, read, test, expr.'),
  _mod('bash-m04',                    'Les variables dans les scripts',      '📦', 'scripting',    'Déclaration, affectation, portée et types de variables Bash.'),
  _mod('bash-m05',                    'Les caractères spéciaux du Shell',    '✨', 'scripting',    'Métacaractères, redirection, pipes, substitution de commandes.'),
  _mod('bash-m06',                    'Exécution conditionnelle',            '🔀', 'scripting',    'if/elif/else, case, tests de fichiers, de chaînes et numériques.'),
  _mod('bash-m07',                    'Les structures de boucle',            '🔁', 'scripting',    'for, while, until : itérations et boucles dans les scripts Bash.'),
  _mod('bash-m08',                    'Les fonctions',                       '🧩', 'scripting',    'Définition, paramètres, valeur de retour et portée des fonctions Bash.'),
  // ── Initiation scripting PowerShell (scripting) ──
  _mod('ps-init-m01',                 'Introduction à PowerShell',           '💠', 'scripting',    'Présentation de PowerShell, console, ISE et premiers cmdlets.'),
  _mod('ps-init-m02',                 'PowerShell — langage objet',          '📦', 'scripting',    'Nature objet de PowerShell, pipeline et manipulation de types.'),
  _mod('ps-init-m03',                 'Manipulation des objets PS',          '🔧', 'scripting',    'Where-Object, Sort-Object, Select-Object, Format et export.'),
  _mod('ps-init-m04',                 'Structures et variables PS',          '🔀', 'scripting',    'Variables, conditions if/switch, boucles foreach/for/while.'),
  _mod('ps-init-m05',                 'Réalisation d\'un script PS',         '📝', 'scripting',    'Structure d\'un script PowerShell, param(), Try/Catch, bonnes pratiques.'),
  // ── Initiation à PowerShell (scripting) ──
  _mod('ps-m01',                      'Présentation du langage PowerShell',  '💡', 'scripting',    'Histoire, versions, environnements (console, ISE, VS Code).'),
  _mod('ps-m02',                      'PowerShell, langage objet',           '📦', 'scripting',    'Objets .NET, propriétés, méthodes, Get-Member, pipeline.'),
  _mod('ps-m03',                      'Manipulation des objets',             '🔧', 'scripting',    'Filtrage, tri, sélection et formatage des objets PowerShell.'),
  _mod('ps-m04',                      'Les structures et variables',         '🔀', 'scripting',    'Types de données, conditions, boucles et gestion des erreurs.'),
  _mod('ps-m05',                      'Réalisation d\'un script',            '📝', 'scripting',    'Script structuré avec param(), fonctions, Try/Catch et journalisation.'),
  _mod('ps-m06',                      'Pour aller plus loin',                '🚀', 'scripting',    'Modules, Remoting, DSC, scheduled jobs et bonnes pratiques avancées.'),
  // ── Introduction à Linux (linux) ──
  _mod('intro-linux-vi',              'Éditeur de Texte VI/Vim',             '📝', 'linux',        'Modes VI, commandes de navigation, édition et sauvegarde.'),
  _mod('intro-linux-regex',           'Expressions régulières',              '🔍', 'linux',        'Syntaxe des regex, classes de caractères, quantificateurs, groupes.'),
  _mod('intro-linux-fichiers',        'Manipulation de fichiers',            '📁', 'linux',        'ls, cp, mv, rm, find, tar, compression et archivage.'),
  _mod('intro-linux-mecanismes',      'Mécanismes avancés Linux & Bash',     '⚙️', 'linux',        'Redirections, pipes, processus, signaux, alias et variables d\'environnement.'),
  _mod('intro-linux-bash',            'Spécificités du shell Bash',          '🖥️', 'linux',        'Historique, complétion, raccourcis, .bashrc et personnalisation.'),
  // ── Les infrastructures réseau (reseau) ──
  _mod('infra-m01',                   'Configuration initiale des périphériques','🔌','reseau',    'Premier accès console, configuration de base Cisco IOS, SSH.'),
  _mod('infra-m02',                   'La commutation Ethernet',             '🔀', 'reseau',       'Switch, VLAN, Trunk 802.1Q, STP/RSTP, EtherChannel.'),
  _mod('infra-m03',                   'Le routage',                          '🗺️', 'reseau',       'Routes statiques, OSPF, EIGRP, redistribution de routes.'),
  _mod('infra-m04',                   'Les réseaux sans fil',                '📶', 'reseau',       'Standards Wi-Fi 802.11, sécurité WPA2/WPA3, contrôleurs WLAN.'),
  _mod('infra-m05',                   'ACL — Liste de contrôle d\'accès',   '🔒', 'reseau',       'ACL standard et étendue Cisco, nommées, application sur interfaces.'),
  _mod('infra-m06',                   'NAT & NAPT',                          '🔄', 'reseau',       'NAT statique, dynamique et PAT (overload) sur routeur Cisco.'),
  _mod('infra-m07',                   'Sauvegarde et maintenance Cisco',     '💾', 'reseau',       'Sauvegarde IOS, TFTP, mise à jour firmware, CDP/LLDP.'),
  // ── M365 Outils collaboratifs (windows) ──
  _mod('m365-m01',                    'Découverte Microsoft 365',            '🌐', 'windows',      'Présentation de l\'écosystème M365, licences, portail admin.'),
  _mod('m365-m02',                    'Notions de base sur Word',            '📄', 'windows',      'Mise en forme, styles, tableaux, publipostage et collaboration dans Word.'),
  _mod('m365-m03',                    'Notions de base sur Excel',           '📊', 'windows',      'Formules, fonctions, tableaux croisés, graphiques et partage.'),
  _mod('m365-m04',                    'Outlook et dépannage',                '📧', 'windows',      'Configuration d\'Outlook, profils, calendrier, règles et résolution de problèmes.'),
  _mod('m365-m05',                    'Teams, SharePoint, OneDrive',         '🤝', 'windows',      'Collaboration d\'équipe : canaux Teams, bibliothèques SharePoint, sync OneDrive.'),
  // ── Messagerie Cloud et 365 (windows) ──
  _mod('cloud365-m01',                'Composantes du Cloud et M365',        '☁️', 'windows',      'IaaS/PaaS/SaaS, architecture M365, Azure AD, licences.'),
  _mod('cloud365-m02',                'Administration de Microsoft 365',     '🔑', 'windows',      'Portail admin M365, gestion des utilisateurs, groupes, domaines.'),
  _mod('cloud365-m03',                'Sécurité et conformité M365',         '🔒', 'windows',      'MFA, Defender, DLP, purview, conformité RGPD dans M365.'),
  _mod('cloud365-m04',                'Services complémentaires M365',       '➕', 'windows',      'Intune, Azure AD Connect, Power Platform, services additionnels M365.'),
  // ── Microsoft Services transverses (windows) ──
  _mod('ms-transv-m01',               'Mise en place de l\'infrastructure',  '🏗️', 'windows',      'Infrastructure Windows Server : rôles, fonctionnalités, planification.'),
  _mod('ms-transv-m02',               'Remote Desktop Services (RDS)',       '🖥️', 'windows',      'Architecture RDS, serveurs de sessions, licences TS CAL.'),
  _mod('ms-transv-m03',               'Publication RemoteApp',               '📱', 'windows',      'Publication d\'applications via RemoteApp, Remote Desktop Web Access.'),
  _mod('ms-transv-m04',               'Déploiement d\'un système d\'exploitation','💿','windows', 'Stratégies de déploiement : image, séquence de tâches, automatisation.'),
  _mod('ms-transv-m05',               'Windows Deployment Services (WDS)',   '📡', 'windows',      'WDS : démarrage PXE, images WIM, déploiement réseau.'),
  _mod('ms-transv-m06',               'Microsoft Deployment Toolkit (MDT)',  '🛠️', 'windows',      'MDT : séquences de tâches, drivers, applications, déploiement automatisé.'),
  // ── Réseau et sécurité (securite) ──
  _mod('sec-m01',                     'Rappel et pare-feu',                  '🔥', 'securite',     'Révisions réseau, principes du firewall, règles iptables/nftables.'),
  _mod('sec-m02',                     'Le NAT',                              '🔄', 'securite',     'NAT source, destination, masquerade et DNAT sous Linux.'),
  _mod('sec-m03',                     'Exposer les services vers l\'extérieur','🌍','securite',    'DMZ, port forwarding, reverse proxy, sécurisation des services exposés.'),
  _mod('sec-m04',                     'Sécuriser le surf Internet',          '🛡️', 'securite',     'Proxy Squid, filtrage URL, inspection SSL, politiques de navigation.'),
  _mod('sec-m05',                     'Gestion des certificats',             '🔏', 'securite',     'PKI, AC interne, certificats X.509, TLS, Let\'s Encrypt, révocation.'),
  _mod('sec-m06',                     'VPN Télétravail & Site-à-Site',       '🛡️', 'securite',     'OpenVPN, WireGuard (accès distant) et IPSec/IKEv2 (site-à-site).'),
  _mod('sec-m07',                     'Connecter les collaborateurs par sites','🔗','securite',    'Interconnexion de sites, routage inter-sites, MPLS, SD-WAN basique.'),
  // ── Sauvegarde et restauration (itil) ──
  _mod('sauv-m01',                    'Sauvegarde, Restauration, Disponibilité','🔄','itil',       'Concepts clés : RTO, RPO, PRA/PCA, disponibilité et tests de restauration.'),
  _mod('sauv-m02',                    'Types de sauvegarde',                 '📦', 'itil',         'Sauvegarde complète, différentielle, incrémentale : avantages et stratégies.'),
  _mod('sauv-m03',                    'Gestion du Stockage',                 '🗄️', 'itil',         'SAN, NAS, DAS, iSCSI, fibres channel et stratégies de stockage.'),
  _mod('sauv-m04',                    'La Redondance de Données — RAID',     '🔁', 'itil',         'RAID 0, 1, 5, 6, 10 : fonctionnement, tolérance aux pannes, performances.'),
  // ── Services réseau Linux (linux) ──
  _mod('srvlinux-m01',                'Adressage réseau',                    '🌐', 'linux',        'Configuration IP statique/dynamique, interfaces, NetworkManager.'),
  _mod('srvlinux-m02',                'Routage et traduction d\'adresses',   '🔀', 'linux',        'ip route, iptables masquerade, activation du forwarding IP.'),
  _mod('srvlinux-m03',                'Administration à distance',           '🔐', 'linux',        'SSH : configuration serveur, clés, tunneling, X11 forwarding.'),
  _mod('srvlinux-m04',                'DNS Résolveur',                       '🌍', 'linux',        'Unbound, systemd-resolved, configuration DNS résolveur cache.'),
  _mod('srvlinux-m05',                'Le DHCP Linux',                      '📡', 'linux',        'isc-dhcp-server : étendues, options, réservations MAC, relais.'),
  _mod('srvlinux-m06',                'DNS autoritaire sur zone',            '🗺️', 'linux',        'Bind9 : zones, enregistrements A/AAAA/MX/CNAME/PTR, DNSSEC.'),
  // ── Services réseau Microsoft (windows) ──
  _mod('srvms-m01',                   'Administration Windows',              '🪟', 'windows',      'Console MMC, outils d\'administration, PowerShell, WinRM.'),
  _mod('srvms-m02',                   'Active Directory',                    '🏢', 'windows',      'ADDS : domaine, forêt, FSMO, réplication, objets AD.'),
  _mod('srvms-m03',                   'Les Stratégies de Groupe (GPO)',      '⚙️', 'windows',      'GPMC, création, liaison, filtrages, héritage et débogage de GPO.'),
  _mod('srvms-m04',                   'Le routage Windows Server',           '🗺️', 'windows',      'RRAS : routage statique, RIP, NAT Windows Server.'),
  _mod('srvms-m05',                   'Le service DHCP Windows Server',      '📡', 'windows',      'Rôle DHCP : étendues, options, réservations, failover DHCP.'),
  _mod('srvms-m06',                   'Le service DNS Windows Server',       '🌍', 'windows',      'DNS Windows : zones intégrées AD, enregistrements, transferts, sécurité.'),
  // ── Système Client Microsoft (windows) ──
  _mod('winclient-m01',               'Interagir avec Windows 10',          '🖥️', 'windows',      'Interface, outils d\'administration, invite de commandes et PowerShell.'),
  _mod('winclient-m02',               'Gestion du stockage client Microsoft','💾', 'windows',      'Disques, partitions, volumes dynamiques, BitLocker.'),
  _mod('winclient-m03',               'Les utilisateurs et groupes locaux',  '👥', 'windows',      'Comptes locaux, groupes intégrés, profils et politiques de mots de passe.'),
  _mod('winclient-m04',               'Sécurité NTFS et ACLs',               '🔐', 'windows',      'Permissions NTFS, héritage, propriété, icacls et audit.'),
  _mod('winclient-m05',               'Réseau et pare-feu Windows',          '🔥', 'windows',      'Configuration IP, Windows Defender Firewall, règles entrantes/sortantes.'),
  _mod('winclient-m06',               'Le partage de ressources',            '🤝', 'windows',      'Partages SMB, permissions de partage, DFS, partage d\'imprimantes.'),
  _mod('winclient-m07',               'Pilotes et imprimantes',              '🖨️', 'windows',      'Gestion des pilotes, spouleur, impression réseau et résolution de problèmes.'),
  _mod('winclient-m08',               'Maintenance du système',              '🛠️', 'windows',      'Mises à jour, DISM, SFC, WinRE, journaux d\'événements.'),
  _mod('winclient-m09',               'Plus loin avec PowerShell',           '💠', 'windows',      'PowerShell avancé appliqué à l\'administration du client Windows.'),
  _mod('winclient-m10',               'Capture et déploiement d\'image',     '💿', 'windows',      'Sysprep, WIM, capture d\'image, DISM et déploiement.'),
  _mod('winclient-m11',               'Stratégies de groupe local',          '⚙️', 'windows',      'Éditeur de stratégies locales (gpedit.msc), paramètres sécurité et restriction.'),
  // ── Virtualisation de serveur (virtualisation) ──
  _mod('virt-m01',                    'Virtualisation sur poste de travail', '💻', 'virtualisation','VirtualBox, VMware Workstation, types d\'hyperviseurs, création de VMs.'),
  _mod('virt-m02',                    'Virtualisation des serveurs',         '🖥️', 'virtualisation','Concepts avancés : Type 1 vs Type 2, ressources, haute disponibilité.'),
  _mod('virt-m03',                    'Découverte d\'Hyper-V',               '🪟', 'virtualisation','Hyper-V Windows Server : installation, VMs, vSwitch, snapshots.'),
  _mod('virt-m04',                    'Infrastructure vSphere',              '☁️', 'virtualisation','ESXi, vCenter, vSphere Client, clusters, vMotion, HA.'),
  _mod('virt-m05',                    'Gestion du réseau vSphere/ESXi',      '🌐', 'virtualisation','vSwitch standard, dvSwitch, groupes de ports, VLAN dans vSphere.'),
  _mod('virt-m07',                    'Gestion du stockage vSphere/ESXi',    '💾', 'virtualisation','Datastores, VMFS, iSCSI, NFS, vSAN dans une infrastructure ESXi.'),
  _mod('virt-m08',                    'Gestion d\'un datacenter',            '🏢', 'virtualisation','Organisation d\'un datacenter vSphere : pools de ressources, DRS, lifecycle.'),
];

/** Retourne les modules depuis le localStorage, initialisés si absents */
function getModules() {
  const saved = Store.get(KEYS.modules);
  if (!saved) {
    Store.set(KEYS.modules, DEFAULT_MODULES);
    return DEFAULT_MODULES;
  }
  // Fusionne les nouveaux modules potentiellement absents du localStorage
  const ids = new Set(saved.map(m => m.id));
  const merged = [
    ...saved,
    ...DEFAULT_MODULES.filter(m => !ids.has(m.id)),
  ];
  return merged;
}

/* ═══════════════════════════════════════════════════════════
   4. CALCUL DES STATISTIQUES GLOBALES
   ═══════════════════════════════════════════════════════════ */

function computeStats() {
  const modules   = getModules();
  const quiz      = Store.get(KEYS.quiz,      { totalAnswered: 0, totalCorrect: 0, sessions: 0 });
  const checklist = Store.get(KEYS.checklist, { totalItems: 100, completedItems: 0 });

  const total          = modules.length;
  const modulesStudied = modules.filter(m => m.status !== 'todo').length;
  const globalProgress = Math.round(modules.reduce((acc, m) => acc + m.progress, 0) / total);

  const avgScore = quiz.totalAnswered > 0
    ? Math.round((quiz.totalCorrect / quiz.totalAnswered) * 100)
    : null;

  const checklistPct = checklist.totalItems > 0
    ? Math.round((checklist.completedItems / checklist.totalItems) * 100)
    : 0;

  // Module avec le pire score (pour la suggestion de révision)
  const worstModule = modules
    .filter(m => m.quizScores.length > 0)
    .sort((a, b) => avg(a.quizScores) - avg(b.quizScores))[0]
    || modules.find(m => m.status === 'todo')
    || modules[0];

  return {
    modules, total, modulesStudied, globalProgress,
    quiz, avgScore, checklist, checklistPct, worstModule,
  };
}

function avg(arr) {
  return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
}

/* ═══════════════════════════════════════════════════════════
   5. RENDU DE LA PAGE D'ACCUEIL
   ═══════════════════════════════════════════════════════════ */

function renderHomePage() {
  const stats = computeStats();
  renderHero(stats);
  renderDashboard(stats);
  renderModuleGrid(stats.modules);
  renderActivity();
  renderNextRevision(stats.worstModule);
}

/* ── 5a. Hero ── */
function renderHero(stats) {
  const bar   = document.getElementById('hero-progress-bar');
  const pct   = document.getElementById('hero-progress-pct');
  const label = document.getElementById('hero-progress-label');
  if (!bar) return;

  const p = stats.globalProgress;
  bar.style.width = p + '%';
  if (pct)   pct.textContent   = p + '%';
  if (label) label.textContent =
    p === 0   ? 'Formation non démarrée'
    : p < 30  ? 'Début de formation'
    : p < 60  ? 'En bonne progression'
    : p < 90  ? 'Bientôt au bout !'
    : 'Formation quasi complète 🎉';
}

/* ── 5b. Dashboard stats ── */
function renderDashboard(stats) {
  setText('stat-modules',    `${stats.modulesStudied} / ${stats.total}`);
  setText('stat-quiz',       stats.quiz.totalAnswered.toString());
  setText('stat-score',      stats.avgScore !== null ? stats.avgScore + '%' : '—');
  setText('stat-checklist',  stats.checklistPct + '%');

  // Barres sous chaque stat
  setBar('stat-modules-bar',   Math.round((stats.modulesStudied / stats.total) * 100));
  setBar('stat-score-bar',     stats.avgScore ?? 0);
  setBar('stat-checklist-bar', stats.checklistPct);
}

/* ── 5c. Grille des modules ── */
function renderModuleGrid(modules) {
  const grid = document.getElementById('module-grid');
  if (!grid) return;

  grid.innerHTML = modules.map(m => {
    const statusCfg = {
      todo: { label: 'À faire',   cls: 'badge--neutral' },
      wip:  { label: 'En cours',  cls: 'badge--info'    },
      done: { label: 'Maîtrisé',  cls: 'badge--success' },
    };
    const s       = statusCfg[m.status] || statusCfg.todo;
    const barCls  = m.status === 'done' ? 'progress__bar--success'
                  : m.status === 'wip'  ? ''
                  : 'progress__bar--neutral';
    const avgSc   = m.quizScores.length ? Math.round(avg(m.quizScores)) + '%' : null;

    return `
    <article class="module-card animate-fade-in-up" data-domain="${m.domain}"
             role="article" aria-label="Module ${m.label}">
      <div class="module-card__accent"></div>
      <div class="module-card__header">
        <div>
          <div class="module-card__title">${m.icon} ${m.label}</div>
          <span class="badge badge--${m.domain} badge--sm">${domainLabel(m.domain)}</span>
        </div>
        <span class="badge ${s.cls}">${s.label}</span>
      </div>
      <p class="module-card__desc">${m.description}</p>
      <div class="module-card__progress">
        <div class="module-card__progress-label">
          <span>Progression</span>
          <span>${m.progress}%${avgSc ? ' · Score moy. ' + avgSc : ''}</span>
        </div>
        <div class="progress">
          <div class="progress__bar ${barCls}"
               style="width:${m.progress}%"
               role="progressbar"
               aria-valuenow="${m.progress}"
               aria-valuemin="0"
               aria-valuemax="100">
          </div>
        </div>
      </div>
      <div class="module-card__meta">
        ${m.lastVisit
          ? '<span>Vu le ' + formatDate(m.lastVisit) + '</span>'
          : '<span>Pas encore consulté</span>'}
        <a class="btn btn--ghost btn--sm"
           href="pages/cours.html#${m.id}"
           onclick="Store.addActivity({type:'cours',label:'${m.label}',moduleId:'${m.id}'}); Store.updateModule('${m.id}', {lastVisit: new Date().toISOString(), status: '${m.status === 'todo' ? 'wip' : m.status}'})">
          Consulter →
        </a>
      </div>
    </article>`;
  }).join('');
}

/* ── 5d. Activité récente ── */
function renderActivity() {
  const list = document.getElementById('activity-list');
  if (!list) return;

  const activities = Store.get(KEYS.activity, []).slice(0, 5);

  if (activities.length === 0) {
    list.innerHTML = `
      <li class="activity-empty">
        <span class="activity-empty__icon">📭</span>
        <span>Aucune activité pour l'instant. Lance-toi !</span>
      </li>`;
    return;
  }

  const icons = { quiz: '📝', cours: '📖', checklist: '✅', glossaire: '📚' };

  list.innerHTML = activities.map(a => `
    <li class="activity-item">
      <span class="activity-item__icon">${icons[a.type] || '📌'}</span>
      <div class="activity-item__body">
        <span class="activity-item__label">${a.label}</span>
        <span class="activity-item__date">${timeAgo(a.date)}</span>
      </div>
      <span class="badge badge--${a.type === 'quiz' ? 'info' : a.type === 'cours' ? 'neutral' : 'success'} badge--sm">
        ${capitalize(a.type)}
      </span>
    </li>`
  ).join('');
}

/* ── 5e. Prochaine révision ── */
function renderNextRevision(module) {
  const card    = document.getElementById('next-revision-card');
  const icon    = document.getElementById('next-revision-icon');
  const name    = document.getElementById('next-revision-name');
  const reason  = document.getElementById('next-revision-reason');
  const score   = document.getElementById('next-revision-score');
  const link    = document.getElementById('next-revision-link');
  const quizLink= document.getElementById('next-revision-quiz');
  if (!card || !module) return;

  if (icon)   icon.textContent  = module.icon;
  if (name)   name.textContent  = module.label;
  if (link)   link.href         = `pages/cours.html#${module.id}`;
  if (quizLink) quizLink.href   = `pages/quiz.html?module=${module.id}`;

  if (module.quizScores.length > 0) {
    const s = Math.round(avg(module.quizScores));
    if (score)  score.textContent = `Score moyen : ${s}%`;
    if (reason) reason.textContent =
      s < 50 ? 'Score faible — révision urgente recommandée.'
      : s < 75 ? 'Des lacunes à combler sur ce module.'
      : 'Bon score mais maintien conseillé.';
  } else {
    if (score)  score.textContent = 'Aucun quiz passé';
    if (reason) reason.textContent = 'Ce module n\'a pas encore été évalué.';
  }

  card.removeAttribute('hidden');
}

/* ═══════════════════════════════════════════════════════════
   6. UTILITAIRES PARTAGÉS
   ═══════════════════════════════════════════════════════════ */

/** Écrit un texte dans un élément par id (sans crash si absent) */
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

/** Anime une barre de progression par id */
function setBar(id, pct) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.width = Math.min(100, Math.max(0, pct)) + '%';
  el.setAttribute('aria-valuenow', pct);
}

/** Formate une date ISO en dd/mm/yyyy */
function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

/** Retourne un libellé relatif (il y a X minutes/heures/jours) */
function timeAgo(iso) {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const min  = Math.floor(diff / 60000);
  const hr   = Math.floor(diff / 3600000);
  const day  = Math.floor(diff / 86400000);
  if (min < 1)  return 'À l\'instant';
  if (min < 60) return `Il y a ${min} min`;
  if (hr < 24)  return `Il y a ${hr} h`;
  if (day < 7)  return `Il y a ${day} j`;
  return formatDate(iso);
}

function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

function domainLabel(domain) {
  const labels = {
    reseau:         'Réseau',
    linux:          'Linux',
    windows:        'Windows',
    securite:       'Sécurité',
    virtualisation: 'Virt./Cloud',
    scripting:      'Scripting',
    itil:           'ITIL/ITSM',
  };
  return labels[domain] || domain;
}

/** Toast de notification */
function showToast(message, type = 'default', duration = 3000) {
  const container = document.querySelector('.toast-container')
    || (() => {
      const el = document.createElement('div');
      el.className = 'toast-container';
      document.body.appendChild(el);
      return el;
    })();

  const toast = document.createElement('div');
  toast.className = `toast${type !== 'default' ? ' toast--' + type : ''}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hiding');
    toast.addEventListener('animationend', () => toast.remove());
  }, duration);
}

/** Copie du texte dans le presse-papier + feedback visuel */
function copyToClipboard(text, btnEl) {
  navigator.clipboard.writeText(text).then(() => {
    if (btnEl) {
      const original = btnEl.textContent;
      btnEl.textContent = '✓ Copié';
      btnEl.classList.add('copied');
      setTimeout(() => {
        btnEl.textContent = original;
        btnEl.classList.remove('copied');
      }, 2000);
    }
  }).catch(() => showToast('Copie impossible', 'danger'));
}

/** Barre de lecture de page (scroll progress) */
function initPageProgress() {
  const bar = document.querySelector('.page-progress');
  if (!bar) return;
  const update = () => {
    const scrolled = window.scrollY;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/** Tri et filtre de la grille des modules */
function initModuleFilters() {
  const chips = document.querySelectorAll('.filter-chip[data-filter]');
  const grid  = document.getElementById('module-grid');
  if (!chips.length || !grid) return;

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.dataset.filter;
      grid.querySelectorAll('.module-card').forEach(card => {
        const match = filter === 'all' || card.dataset.domain === filter
          || (filter === 'wip'  && card.querySelector('.badge--info'))
          || (filter === 'done' && card.querySelector('.badge--success'));
        card.style.display = match ? '' : 'none';
      });
    });
  });
}

/** Recherche en temps réel dans la grille */
function initModuleSearch() {
  const input = document.getElementById('module-search');
  const grid  = document.getElementById('module-grid');
  if (!input || !grid) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    grid.querySelectorAll('.module-card').forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = !q || text.includes(q) ? '' : 'none';
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   7. NAVIGATION & BURGER MOBILE
   ═══════════════════════════════════════════════════════════ */

function initNavigation() {
  // Burger menu
  const burger = document.querySelector('.navbar__burger');
  const menu   = document.querySelector('.navbar__mobile-menu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open);
    });
    // Ferme au clic extérieur
    document.addEventListener('click', e => {
      if (!burger.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Lien actif selon l'URL
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link, .navbar__mobile-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.endsWith(current) || (current === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Accordion sidebar (si présent)
  document.querySelectorAll('.accordion__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const body = trigger.nextElementSibling;
      const open = trigger.classList.toggle('open');
      if (body) body.classList.toggle('open', open);
    });
  });

  // Tabs génériques
  document.querySelectorAll('.tabs').forEach(tabsEl => {
    tabsEl.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        tabsEl.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.target;
        if (target) {
          document.querySelectorAll('.tab-panel').forEach(p => {
            p.classList.toggle('hidden', p.id !== target);
          });
        }
      });
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   8. INITIALISATION
   ═══════════════════════════════════════════════════════════ */

/* ── Thème clair/sombre ── */
function initTheme() {
  const saved = localStorage.getItem('tssr_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.textContent = saved === 'light' ? '🌙' : '☀️';
    btn.title = saved === 'light' ? 'Passer en mode sombre' : 'Passer en mode clair';
  });
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('tssr_theme', next);
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.textContent = next === 'light' ? '🌙' : '☀️';
    btn.title = next === 'light' ? 'Passer en mode sombre' : 'Passer en mode clair';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });
  initNavigation();
  initPageProgress();

  // Page d'accueil
  if (document.getElementById('module-grid')) {
    renderHomePage();
    initModuleFilters();
    initModuleSearch();
  }

  // Initialise les blocs "copier le code"
  document.querySelectorAll('.code-block__copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.closest('.code-block')?.querySelector('code');
      if (code) copyToClipboard(code.textContent, btn);
    });
  });
});

/* Export pour usage depuis les autres pages */
window.TSSR = { Store, KEYS, getModules, computeStats, showToast, copyToClipboard, formatDate, timeAgo, avg };
