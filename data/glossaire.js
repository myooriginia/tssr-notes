// Données Glossaire TSSR — généré depuis "Glossaire Général TSSR.md" + cours "Services transverses"
// Source : ENI École Informatique — copie stricte, aucune modification
// 14 catégories, 992 termes

const GLOSSAIRE_DATA = {
  "categories": [
    {
      "id": "bases-reseaux",
      "titre": "Bases des Réseaux & Protocoles",
      "emoji": "🌐",
      "termes": [
        {
          "terme": "AND bit à bit",
          "definition": "Opération logique pour calculer l'adresse réseau : IP AND Masque = Réseau"
        },
        {
          "terme": "APIPA",
          "definition": "Automatic Private IP Addressing — IP auto `169.254.x.x` attribuée par Windows si aucun DHCP n'est disponible"
        },
        {
          "terme": "ARP",
          "definition": "Address Resolution Protocol — résout une adresse IP en adresse MAC sur le réseau local"
        },
        {
          "terme": "ASCII",
          "definition": "American Standard Code for Information Interchange — encodage texte sur 7/8 bits. Ex : 'A' = 65 décimal"
        },
        {
          "terme": "Base",
          "definition": "Nombre de symboles d'un système de numération. Base 2 = binaire, Base 16 = hexadécimal"
        },
        {
          "terme": "Bit",
          "definition": "Unité élémentaire d'information : 0 ou 1"
        },
        {
          "terme": "Broadcast",
          "definition": "Envoi à toutes les machines d'un réseau. Adresse MAC `FF:FF:FF:FF:FF:FF`"
        },
        {
          "terme": "Cache ARP",
          "definition": "Table locale mémorisant les correspondances IP/MAC récemment résolues. Consultable avec `arp -a`"
        },
        {
          "terme": "CIDR",
          "definition": "Classless Inter-Domain Routing — notation compacte du masque. Ex : `192.168.1.0/24`"
        },
        {
          "terme": "DHCP",
          "definition": "Dynamic Host Configuration Protocol — attribution automatique d'adresses IP et paramètres réseau"
        },
        {
          "terme": "DNS",
          "definition": "Domain Name System — traduit un nom de domaine en adresse IP"
        },
        {
          "terme": "Domaine de diffusion",
          "definition": "Zone où le broadcast se propage — tout un VLAN ou réseau sans routeur"
        },
        {
          "terme": "3-way handshake",
          "definition": "Établissement d'une connexion TCP en 3 étapes : SYN → SYN-ACK → ACK"
        },
        {
          "terme": "Encapsulation",
          "definition": "Ajout d'un en-tête à chaque couche OSI lors de l'envoi des données"
        },
        {
          "terme": "Hub",
          "definition": "Équipement de couche 1 répétant le signal sur tous les ports (obsolète, remplacé par les switches)"
        },
        {
          "terme": "ICMP",
          "definition": "Internet Control Message Protocol — messages d'erreur et de contrôle réseau. Utilisé par `ping`"
        },
        {
          "terme": "IEC",
          "definition": "International Electrotechnical Commission — préfixes binaires (puissances de 2). Ex : 1 Kio = 1 024 octets"
        },
        {
          "terme": "Incrément",
          "definition": "Taille d'un bloc de sous-réseau = 256 - valeur octet du masque. Ex : /26 → 256-192 = 64"
        },
        {
          "terme": "IPv4",
          "definition": "Internet Protocol version 4 — adressage sur 32 bits. Ex : `192.168.1.10`"
        },
        {
          "terme": "LISTENING",
          "definition": "État d'un port TCP ouvert en attente de connexion"
        },
        {
          "terme": "Loopback",
          "definition": "Adresse `127.0.0.1` — interface virtuelle locale testant la pile réseau sans trafic"
        },
        {
          "terme": "LSB",
          "definition": "Least Significant Bit — bit de poids faible (bit le plus à droite)"
        },
        {
          "terme": "MAC",
          "definition": "Media Access Control — adresse physique unique d'une carte réseau (48 bits, hexadécimal)"
        },
        {
          "terme": "Masque",
          "definition": "Suite de bits définissant la partie réseau et la partie hôte d'une adresse IP"
        },
        {
          "terme": "Métrique",
          "definition": "Coût d'une route utilisé par un protocole de routage pour déterminer le meilleur chemin"
        },
        {
          "terme": "MSB",
          "definition": "Most Significant Bit — bit de poids fort (bit le plus à gauche)"
        },
        {
          "terme": "Multicast",
          "definition": "Envoi à un groupe d'abonnés identifiés"
        },
        {
          "terme": "NAT",
          "definition": "Network Address Translation — traduit une IP privée en IP publique"
        },
        {
          "terme": "Next-hop",
          "definition": "Adresse IP du prochain routeur sur le chemin vers une destination"
        },
        {
          "terme": "Nibble",
          "definition": "Groupe de 4 bits — correspond à un chiffre hexadécimal"
        },
        {
          "terme": "Octet",
          "definition": "Groupe de 8 bits. Ex : `01000001` = lettre 'A' en ASCII"
        },
        {
          "terme": "OSI",
          "definition": "Open Systems Interconnection — modèle de référence en 7 couches pour les réseaux"
        },
        {
          "terme": "Passerelle (Gateway)",
          "definition": "Routeur local par lequel transitent tous les paquets à destination de réseaux distants"
        },
        {
          "terme": "PDU",
          "definition": "Protocol Data Unit — nom donné aux données à chaque couche du modèle OSI"
        },
        {
          "terme": "Poids faible",
          "definition": "Bit le plus à droite, de valeur la plus petite"
        },
        {
          "terme": "Poids fort",
          "definition": "Bit le plus à gauche, de valeur la plus grande"
        },
        {
          "terme": "Plus long préfixe",
          "definition": "Règle de sélection de la route la plus spécifique. Ex : /28 prioritaire sur /24"
        },
        {
          "terme": "RFC 1918",
          "definition": "Standard définissant les plages d'adresses IPv4 privées : 10.x, 172.16-31.x, 192.168.x"
        },
        {
          "terme": "Route par défaut",
          "definition": "Route `0.0.0.0/0` utilisée quand aucune route spécifique ne correspond"
        },
        {
          "terme": "Routeur",
          "definition": "Équipement de couche 3 acheminant les paquets entre réseaux différents"
        },
        {
          "terme": "RTT",
          "definition": "Round Trip Time — temps aller-retour d'un paquet ping"
        },
        {
          "terme": "SI",
          "definition": "Système International — préfixes décimaux (puissances de 10). Ex : 1 Ko = 1 000 octets"
        },
        {
          "terme": "Socket",
          "definition": "Combinaison IP:Port identifiant un point de communication. Ex : `192.168.1.10:52341`"
        },
        {
          "terme": "Sous-réseau",
          "definition": "Subdivision d'un réseau IP en blocs plus petits via emprunt de bits hôtes"
        },
        {
          "terme": "Subnetting",
          "definition": "Découpage d'un réseau en sous-réseaux. Ex : /24 → 4× /26"
        },
        {
          "terme": "Supernetting",
          "definition": "Agrégation de plusieurs réseaux en un seul plus grand. Ex : 4× /24 → 1× /22"
        },
        {
          "terme": "Switch",
          "definition": "Équipement de couche 2 commutant les trames selon les adresses MAC"
        },
        {
          "terme": "Table de routage",
          "definition": "Base de données listant les réseaux connus et les chemins pour les atteindre"
        },
        {
          "terme": "TCP",
          "definition": "Transmission Control Protocol — transport fiable avec accusé de réception"
        },
        {
          "terme": "TTL",
          "definition": "Time To Live — compteur de sauts décrémenté à chaque routeur pour éviter les boucles"
        },
        {
          "terme": "UDP",
          "definition": "User Datagram Protocol — transport rapide sans garantie de livraison"
        },
        {
          "terme": "Unicast",
          "definition": "Envoi à une seule machine identifiée"
        },
        {
          "terme": "VLAN",
          "definition": "Virtual LAN — segmentation logique d'un réseau en domaines de diffusion isolés"
        },
        {
          "terme": "ip",
          "definition": "Commande Linux remplaçant `ifconfig`, `route` et `arp`. Ex : `ip a`, `ip route`"
        },
        {
          "terme": "ss",
          "definition": "Socket Statistics — remplaçant moderne de `netstat` sous Linux. Ex : `ss -tuln`"
        }
      ]
    },
    {
      "id": "infra-cisco",
      "titre": "Infrastructures Réseau (Cisco IOS)",
      "emoji": "🔧",
      "termes": [
        {
          "terme": "802.1Q",
          "definition": "Standard IEEE de trunking — étiquette de 4 octets ajoutée aux trames pour identifier les VLAN"
        },
        {
          "terme": "access-class",
          "definition": "Commande Cisco appliquant une ACL sur les lignes VTY (Telnet/SSH)"
        },
        {
          "terme": "ACL étendue",
          "definition": "Access Control List filtrant sur plusieurs critères (numérotées 100-199)"
        },
        {
          "terme": "ACL nommée",
          "definition": "ACL Cisco identifiée par un nom textuel plutôt qu'un numéro"
        },
        {
          "terme": "ACL standard",
          "definition": "Access Control List filtrant uniquement sur l'IP source (numérotées 1-99)"
        },
        {
          "terme": "AD (Distance Administrative)",
          "definition": "Valeur de confiance d'un protocole de routage. Plus elle est basse, plus il est prioritaire"
        },
        {
          "terme": "AP",
          "definition": "Access Point — point d'accès Wi-Fi"
        },
        {
          "terme": "Area OSPF",
          "definition": "Zone logique OSPF permettant de segmenter un domaine de routage"
        },
        {
          "terme": "banner motd",
          "definition": "Message d'avertissement affiché à la connexion sur un équipement Cisco"
        },
        {
          "terme": "boot system",
          "definition": "Commande Cisco spécifiant l'image IOS à charger au démarrage"
        },
        {
          "terme": "Bootstrap",
          "definition": "Programme minimal chargeant l'IOS au démarrage d'un équipement Cisco"
        },
        {
          "terme": "BSSID",
          "definition": "Adresse MAC d'un point d'accès Wi-Fi"
        },
        {
          "terme": "CBAC",
          "definition": "Context-Based Access Control — inspection stateful sur routeurs Cisco IOS"
        },
        {
          "terme": "CLI",
          "definition": "Command Line Interface — interface en ligne de commande"
        },
        {
          "terme": "confreg",
          "definition": "Commande ROMMON modifiant le registre de configuration Cisco"
        },
        {
          "terme": "copy run start",
          "definition": "Sauvegarde de la configuration active (RAM) vers la NVRAM"
        },
        {
          "terme": "crypto key generate rsa",
          "definition": "Génère une paire de clés RSA pour activer SSH sur un équipement Cisco"
        },
        {
          "terme": "dot1Q",
          "definition": "Terme Cisco pour le standard IEEE 802.1Q de trunking VLAN"
        },
        {
          "terme": "DR/BDR",
          "definition": "Designated Router / Backup Designated Router — rôles OSPF élus sur les segments multi-accès"
        },
        {
          "terme": "EAP",
          "definition": "Extensible Authentication Protocol — protocole d'authentification extensible pour le Wi-Fi 802.1X"
        },
        {
          "terme": "enable secret",
          "definition": "Mot de passe mode privilégié chiffré MD5 sur équipements Cisco"
        },
        {
          "terme": "err-disabled",
          "definition": "État d'un port Cisco désactivé automatiquement suite à une violation de sécurité"
        },
        {
          "terme": "established",
          "definition": "Mot-clé ACL Cisco autorisant le trafic de retour TCP"
        },
        {
          "terme": "evaluate",
          "definition": "Mot-clé ACL Cisco évaluant les entrées réflexives"
        },
        {
          "terme": "Flash",
          "definition": "Mémoire persistante d'un équipement Cisco stockant l'image IOS"
        },
        {
          "terme": "Global Config",
          "definition": "Mode de configuration globale Cisco (`conf t`)"
        },
        {
          "terme": "Implicit deny",
          "definition": "Règle invisible en fin d'ACL refusant silencieusement tout trafic non autorisé"
        },
        {
          "terme": "IOS",
          "definition": "Internetwork Operating System — système d'exploitation des équipements Cisco"
        },
        {
          "terme": "ip access-group",
          "definition": "Commande Cisco appliquant une ACL sur une interface"
        },
        {
          "terme": "ip nat inside",
          "definition": "Commande Cisco désignant l'interface côté réseau privé pour le NAT"
        },
        {
          "terme": "ip nat outside",
          "definition": "Commande Cisco désignant l'interface côté réseau public pour le NAT"
        },
        {
          "terme": "LSDB / LSA",
          "definition": "Link State Database / Link State Advertisement — base et annonces OSPF"
        },
        {
          "terme": "login local",
          "definition": "Authentification Cisco via les comptes locaux configurés"
        },
        {
          "terme": "MAC sticky",
          "definition": "Apprentissage dynamique mémorisé d'adresses MAC sur un port sécurisé"
        },
        {
          "terme": "Masquerade",
          "definition": "Terme Linux pour NAT overload (translation d'adresses dynamique avec port)"
        },
        {
          "terme": "MIMO",
          "definition": "Multiple Input Multiple Output — technologie Wi-Fi utilisant plusieurs antennes"
        },
        {
          "terme": "NAT overload",
          "definition": "Terme Cisco pour NAPT dynamique (plusieurs clients partagent une IP publique)"
        },
        {
          "terme": "NAPT",
          "definition": "Network Address and Port Translation — NAT avec translation de port"
        },
        {
          "terme": "no",
          "definition": "Préfixe Cisco annulant une commande précédemment configurée"
        },
        {
          "terme": "NVRAM",
          "definition": "Non-Volatile RAM — stocke la startup-config sur un équipement Cisco"
        },
        {
          "terme": "OWE",
          "definition": "Opportunistic Wireless Encryption — chiffrement Wi-Fi sans authentification (WPA3)"
        },
        {
          "terme": "passive-interface",
          "definition": "Commande OSPF empêchant l'envoi de mises à jour sur une interface"
        },
        {
          "terme": "PAT",
          "definition": "Port Address Translation — synonyme de NAPT"
        },
        {
          "terme": "PEAP",
          "definition": "Protected EAP — variante sécurisée de EAP pour l'authentification Wi-Fi"
        },
        {
          "terme": "Pool NAT",
          "definition": "Plage d'adresses publiques utilisées pour la translation NAT"
        },
        {
          "terme": "Port Access",
          "definition": "Port switch configuré pour un seul VLAN"
        },
        {
          "terme": "Port Security",
          "definition": "Mécanisme Cisco limitant les adresses MAC autorisées sur un port"
        },
        {
          "terme": "Port Trunk",
          "definition": "Port switch transportant plusieurs VLANs avec leur tag 802.1Q"
        },
        {
          "terme": "POST",
          "definition": "Power-On Self Test — auto-test au démarrage d'un équipement"
        },
        {
          "terme": "Privileged EXEC",
          "definition": "Mode privilégié Cisco (`enable`) donnant accès aux commandes de configuration"
        },
        {
          "terme": "Process-ID OSPF",
          "definition": "Identifiant local du processus OSPF, significatif uniquement sur le routeur local"
        },
        {
          "terme": "PSK",
          "definition": "Pre-Shared Key — clé partagée pour l'authentification Wi-Fi WPA/WPA2"
        },
        {
          "terme": "RADIUS",
          "definition": "Remote Authentication Dial-In User Service — serveur d'authentification centralisée pour 802.1X"
        },
        {
          "terme": "Reflexive ACL",
          "definition": "ACL Cisco créant dynamiquement des règles de retour pour le trafic autorisé"
        },
        {
          "terme": "reflect",
          "definition": "Mot-clé ACL Cisco créant une entrée réflexive"
        },
        {
          "terme": "Registre de config",
          "definition": "Valeur hexadécimale contrôlant le comportement au démarrage d'un équipement Cisco"
        },
        {
          "terme": "Roaming",
          "definition": "Itinérance Wi-Fi transparente entre plusieurs points d'accès"
        },
        {
          "terme": "ROM",
          "definition": "Read-Only Memory — contient le bootstrap et le ROMMON sur les équipements Cisco"
        },
        {
          "terme": "ROMMON",
          "definition": "ROM Monitor — mode de récupération minimal d'un équipement Cisco"
        },
        {
          "terme": "Rogue AP",
          "definition": "Point d'accès non autorisé sur un réseau Wi-Fi"
        },
        {
          "terme": "Rogue traffic",
          "definition": "Trafic réseau non autorisé"
        },
        {
          "terme": "Route flottante",
          "definition": "Route statique de secours avec une AD élevée, utilisée si la route principale tombe"
        },
        {
          "terme": "Route statique",
          "definition": "Route configurée manuellement sur un équipement réseau"
        },
        {
          "terme": "Router on a Stick",
          "definition": "Routage inter-VLAN via sous-interfaces sur un seul lien trunk vers un switch"
        },
        {
          "terme": "running-config",
          "definition": "Configuration active d'un équipement Cisco, stockée en RAM (perdue au reboot)"
        },
        {
          "terme": "SAE",
          "definition": "Simultaneous Authentication of Equals — mécanisme d'authentification WPA3"
        },
        {
          "terme": "service password-encryption",
          "definition": "Commande Cisco chiffrant les mots de passe en clair dans la configuration (type 7)"
        },
        {
          "terme": "SPF (Dijkstra)",
          "definition": "Algorithme du plus court chemin utilisé par OSPF"
        },
        {
          "terme": "SSID",
          "definition": "Service Set Identifier — nom d'un réseau Wi-Fi"
        },
        {
          "terme": "startup-config",
          "definition": "Configuration sauvegardée en NVRAM, chargée au démarrage"
        },
        {
          "terme": "SVI",
          "definition": "Switched Virtual Interface — interface virtuelle d'un VLAN sur un switch L3"
        },
        {
          "terme": "Table MAC (CAM)",
          "definition": "Table associant adresses MAC ↔ ports sur un switch"
        },
        {
          "terme": "TFTP",
          "definition": "Trivial File Transfer Protocol — protocole de transfert de fichiers simple"
        },
        {
          "terme": "TKIP",
          "definition": "Temporal Key Integrity Protocol — protocole de chiffrement Wi-Fi WPA (deprecated)"
        },
        {
          "terme": "User EXEC",
          "definition": "Mode utilisateur basique Cisco (invite `>`)"
        },
        {
          "terme": "VLAN 1",
          "definition": "VLAN natif par défaut sur les équipements Cisco"
        },
        {
          "terme": "VLAN hopping",
          "definition": "Attaque exploitant le VLAN natif pour accéder à d'autres VLANs"
        },
        {
          "terme": "VLAN natif",
          "definition": "VLAN dont les trames circulent sans étiquette 802.1Q sur un trunk"
        },
        {
          "terme": "vlan.dat",
          "definition": "Fichier Flash Cisco stockant la base de données des VLANs"
        },
        {
          "terme": "WEP",
          "definition": "Wired Equivalent Privacy — protocole de chiffrement Wi-Fi obsolète et vulnérable"
        },
        {
          "terme": "Wildcard",
          "definition": "Masque inversé utilisé dans les ACL et OSPF Cisco"
        },
        {
          "terme": "WIDS",
          "definition": "Wireless Intrusion Detection System — système de détection d'intrusions Wi-Fi"
        },
        {
          "terme": "WLC",
          "definition": "Wireless LAN Controller — contrôleur centralisant la gestion des points d'accès Wi-Fi"
        },
        {
          "terme": "WPA / WPA2 / WPA3",
          "definition": "Wi-Fi Protected Access — standards successifs de sécurité Wi-Fi"
        },
        {
          "terme": "WPS",
          "definition": "Wi-Fi Protected Setup — mécanisme d'association Wi-Fi simplifié (vulnérable)"
        },
        {
          "terme": "write erase",
          "definition": "Commande Cisco effaçant la startup-config (synonyme de `erase startup-config`)"
        },
        {
          "terme": "ZBF",
          "definition": "Zone-Based Firewall — pare-feu basé sur des zones dans IOS Cisco"
        },
        {
          "terme": "802.1X",
          "definition": "Standard IEEE d'authentification réseau par port"
        }
      ]
    },
    {
      "id": "securite",
      "titre": "Sécurité Réseau",
      "emoji": "🔒",
      "termes": [
        {
          "terme": "ANSSI",
          "definition": "Agence Nationale de la Sécurité des Systèmes d'Information"
        },
        {
          "terme": "ATP",
          "definition": "Advanced Threat Protection — protection avancée contre les menaces dans Microsoft 365"
        },
        {
          "terme": "Bastion",
          "definition": "Serveur de rebond permettant d'accéder de façon sécurisée aux ressources internes"
        },
        {
          "terme": "Block",
          "definition": "Action pare-feu bloquant silencieusement un paquet sans notification"
        },
        {
          "terme": "CA / AC",
          "definition": "Certificate Authority / Autorité de Certification — entité émettant les certificats numériques"
        },
        {
          "terme": "CARP",
          "definition": "Common Address Redundancy Protocol — protocole de redondance d'adresse IP (pfSense)"
        },
        {
          "terme": "CRL",
          "definition": "Certificate Revocation List — liste des certificats révoqués"
        },
        {
          "terme": "CSR",
          "definition": "Certificate Signing Request — demande de signature de certificat"
        },
        {
          "terme": "DDoS",
          "definition": "Distributed Denial of Service — attaque par déni de service distribué"
        },
        {
          "terme": "DMZ",
          "definition": "DeMilitarized Zone — zone réseau intermédiaire entre Internet et le réseau interne"
        },
        {
          "terme": "DNAT",
          "definition": "Destination NAT — translation d'adresse en entrée (IP publique → IP privée)"
        },
        {
          "terme": "EDR",
          "definition": "Endpoint Detection & Response — solution de détection et réponse sur les postes"
        },
        {
          "terme": "EOP",
          "definition": "Exchange Online Protection — filtre anti-spam/malware Microsoft 365"
        },
        {
          "terme": "ESP",
          "definition": "Encapsulating Security Payload — protocole IPSec chiffrant et authentifiant les données"
        },
        {
          "terme": "GTR",
          "definition": "Garantie de Temps de Rétablissement — délai contractuel de remise en service"
        },
        {
          "terme": "Hairpinning",
          "definition": "Accès à un serveur interne via son IP publique depuis le réseau interne"
        },
        {
          "terme": "IDS",
          "definition": "Intrusion Detection System — système de détection d'intrusions"
        },
        {
          "terme": "IKE / IKEv2",
          "definition": "Internet Key Exchange — protocole de négociation des paramètres IPSec (Phase 1)"
        },
        {
          "terme": "IPSec",
          "definition": "Suite de protocoles sécurisant les communications IP au niveau réseau"
        },
        {
          "terme": "Let's Encrypt",
          "definition": "Autorité de certification gratuite et automatisée"
        },
        {
          "terme": "MITM / MitM",
          "definition": "Man-in-the-Middle — attaque d'interception entre deux parties"
        },
        {
          "terme": "Matrice de flux",
          "definition": "Document recensant tous les flux réseau autorisés entre zones"
        },
        {
          "terme": "MDR",
          "definition": "Managed Detection & Response — service managé de détection et réponse"
        },
        {
          "terme": "MFA / 2FA",
          "definition": "Multi-Factor Authentication — authentification à plusieurs facteurs"
        },
        {
          "terme": "NAT 1:1",
          "definition": "Translation NAT avec correspondance complète entre une IP privée et une IP publique"
        },
        {
          "terme": "NAT-T",
          "definition": "NAT Traversal — mécanisme permettant à IPSec de traverser un NAT"
        },
        {
          "terme": "nmap",
          "definition": "Network Mapper — outil de scan de ports et découverte réseau"
        },
        {
          "terme": "OpenSSL",
          "definition": "Boîte à outils open source pour les protocoles SSL/TLS et PKI"
        },
        {
          "terme": "OpenVPN",
          "definition": "Solution VPN open source basée sur SSL/TLS"
        },
        {
          "terme": "OTP",
          "definition": "One-Time Password — mot de passe à usage unique"
        },
        {
          "terme": "pfSense",
          "definition": "Distribution pare-feu/routeur open source basée sur FreeBSD"
        },
        {
          "terme": "Phase 1 (IKE)",
          "definition": "Négociation du tunnel de contrôle IPSec — établissement de la SA ISAKMP"
        },
        {
          "terme": "Phase 2 (IPSec)",
          "definition": "Négociation des SAs de données pour le tunnel IPSec"
        },
        {
          "terme": "Phishing",
          "definition": "Technique d'hameçonnage par usurpation d'identité"
        },
        {
          "terme": "PKI",
          "definition": "Public Key Infrastructure — infrastructure de gestion des clés et certificats"
        },
        {
          "terme": "Port Forwarding",
          "definition": "Redirection de port — NAPT statique vers un serveur interne"
        },
        {
          "terme": "Proxy",
          "definition": "Serveur intermédiaire entre les clients et Internet"
        },
        {
          "terme": "Proxy transparent",
          "definition": "Proxy interceptant le trafic sans configuration cliente"
        },
        {
          "terme": "QoS",
          "definition": "Quality of Service — priorisation des flux réseau"
        },
        {
          "terme": "Quarantaine",
          "definition": "Zone d'isolement des messages suspects"
        },
        {
          "terme": "Ransomware",
          "definition": "Malware chiffrant les données et demandant une rançon"
        },
        {
          "terme": "Reject",
          "definition": "Action pare-feu bloquant un paquet avec envoi d'un message d'erreur à l'émetteur"
        },
        {
          "terme": "Reverse Proxy",
          "definition": "Proxy protégeant les serveurs en filtrant les requêtes entrantes"
        },
        {
          "terme": "SA",
          "definition": "Security Association — ensemble des paramètres d'un tunnel IPSec"
        },
        {
          "terme": "SAN",
          "definition": "Subject Alternative Name — extension X.509 pour les certificats multi-domaines"
        },
        {
          "terme": "SOC",
          "definition": "Security Operations Center — centre opérationnel de surveillance de la sécurité"
        },
        {
          "terme": "Spear Phishing",
          "definition": "Phishing ciblé vers une personne ou organisation spécifique"
        },
        {
          "terme": "Split tunneling",
          "definition": "VPN ne chiffrant que le trafic destiné au réseau d'entreprise"
        },
        {
          "terme": "Squid",
          "definition": "Serveur proxy open source"
        },
        {
          "terme": "SquidGuard",
          "definition": "Plugin de filtrage de contenu pour Squid"
        },
        {
          "terme": "SSL Interception / MITM SSL",
          "definition": "Déchiffrement du trafic HTTPS par le proxy pour inspection"
        },
        {
          "terme": "SSL / TLS",
          "definition": "Protocoles de chiffrement des communications réseau"
        },
        {
          "terme": "SNAT",
          "definition": "Source NAT — translation d'adresse en sortie (IP privée → IP publique)"
        },
        {
          "terme": "Table de suivi NAT",
          "definition": "Table mémorisant les correspondances IP:port pour la translation"
        },
        {
          "terme": "Tracert / Traceroute",
          "definition": "Commande traçant le chemin des paquets jusqu'à une destination"
        },
        {
          "terme": "VPN",
          "definition": "Virtual Private Network — tunnel chiffré entre deux points sur Internet"
        },
        {
          "terme": "WAF",
          "definition": "Web Application Firewall — pare-feu applicatif protégeant les applications web"
        },
        {
          "terme": "WireGuard",
          "definition": "Protocol VPN moderne, performant et simple à configurer"
        },
        {
          "terme": "X.509",
          "definition": "Standard définissant le format des certificats numériques"
        },
        {
          "terme": "XDR",
          "definition": "Extended Detection & Response — plateforme de détection étendue multi-sources"
        },
        {
          "terme": "Zero-day",
          "definition": "Vulnérabilité exploitée avant qu'un correctif ne soit disponible"
        },
        {
          "terme": "ZTNA",
          "definition": "Zero Trust Network Access — accès réseau basé sur le principe de zéro confiance"
        }
      ]
    },
    {
      "id": "services-linux",
      "titre": "Services Réseau Linux",
      "emoji": "🐧",
      "termes": [
        {
          "terme": "$ORIGIN",
          "definition": "Directive de fichier de zone DNS définissant le nom de domaine de base"
        },
        {
          "terme": "$TTL",
          "definition": "Directive de fichier de zone DNS définissant le TTL par défaut"
        },
        {
          "terme": "A / AAAA",
          "definition": "Enregistrements DNS hôte IPv4 / IPv6"
        },
        {
          "terme": "allow-transfer",
          "definition": "Directive bind9 autorisant les transferts de zone vers des serveurs secondaires"
        },
        {
          "terme": "authoritative",
          "definition": "Directive ISC DHCP indiquant que ce serveur fait autorité sur le réseau"
        },
        {
          "terme": "authorized_keys",
          "definition": "Fichier SSH listant les clés publiques autorisées à se connecter"
        },
        {
          "terme": "AXFR",
          "definition": "Transfert de zone DNS complet"
        },
        {
          "terme": "Bail (Lease) DHCP",
          "definition": "Ensemble des paramètres réseau attribués temporairement à un client DHCP"
        },
        {
          "terme": "bind9",
          "definition": "Implémentation open source du service DNS la plus répandue sous Linux"
        },
        {
          "terme": "CNAME",
          "definition": "Canonical Name — enregistrement DNS alias pointant vers un nom existant"
        },
        {
          "terme": "CIDR",
          "definition": "Classless Inter-Domain Routing — notation compacte du masque réseau"
        },
        {
          "terme": "Clé privée",
          "definition": "Partie secrète d'une paire de clés SSH, à ne jamais partager"
        },
        {
          "terme": "Clé publique",
          "definition": "Partie publique d'une paire de clés SSH, déposée sur les serveurs distants"
        },
        {
          "terme": "CNAME",
          "definition": "Alias DNS pointant vers un enregistrement A existant"
        },
        {
          "terme": "Cryptographie asymétrique",
          "definition": "Chiffrement utilisant une paire de clés (publique/privée)"
        },
        {
          "terme": "ddns-update-style",
          "definition": "Directive ISC DHCP configurant la mise à jour dynamique du DNS"
        },
        {
          "terme": "DHCP",
          "definition": "Dynamic Host Configuration Protocol — attribution automatique d'adresses IP"
        },
        {
          "terme": "dhcpd.leases",
          "definition": "Fichier de base de données des baux DHCP actifs"
        },
        {
          "terme": "DNS faisant autorité",
          "definition": "Serveur DNS possédant les enregistrements officiels d'une zone"
        },
        {
          "terme": "DNSSEC",
          "definition": "Extension de sécurité DNS — signature cryptographique des enregistrements"
        },
        {
          "terme": "DORA",
          "definition": "Discover / Offer / Request / Acknowledge — les 4 messages du protocole DHCP"
        },
        {
          "terme": "FQDN",
          "definition": "Fully Qualified Domain Name — nom d'hôte complet. Ex : `srv.domaine.local.`"
        },
        {
          "terme": "Forwarder",
          "definition": "Serveur DNS vers lequel les requêtes non locales sont redirigées"
        },
        {
          "terme": "IANA",
          "definition": "Internet Assigned Numbers Authority — organisme gérant les espaces de noms DNS"
        },
        {
          "terme": "in-addr.arpa",
          "definition": "Domaine spécial pour la résolution DNS inverse (IP → nom)"
        },
        {
          "terme": "Interface réseau",
          "definition": "Adaptateur réseau physique ou virtuel d'un système Linux"
        },
        {
          "terme": "IP Forwarding",
          "definition": "Option du noyau Linux activant le routage de paquets entre interfaces"
        },
        {
          "terme": "iptables",
          "definition": "Outil Linux de filtrage et de NAT au niveau du noyau"
        },
        {
          "terme": "iSCSI",
          "definition": "Internet SCSI — protocole de stockage bloc sur réseau IP"
        },
        {
          "terme": "ISC",
          "definition": "Internet Systems Consortium — éditeur de dhcpd et BIND"
        },
        {
          "terme": "IXFR",
          "definition": "Transfert de zone DNS incrémental"
        },
        {
          "terme": "kea",
          "definition": "Serveur DHCP moderne de l'ISC, successeur de dhcpd"
        },
        {
          "terme": "known_hosts",
          "definition": "Fichier SSH stockant les empreintes des serveurs déjà contactés"
        },
        {
          "terme": "LCEN",
          "definition": "Loi pour la Confiance dans l'Économie Numérique — encadre la responsabilité des hébergeurs"
        },
        {
          "terme": "Loopback (lo)",
          "definition": "Interface virtuelle Linux `127.0.0.1` — toujours active, teste la pile réseau"
        },
        {
          "terme": "mDNS",
          "definition": "Multicast DNS — résolution de noms locale sans serveur DNS"
        },
        {
          "terme": "MobaXterm",
          "definition": "Terminal SSH avancé pour Windows avec interface graphique"
        },
        {
          "terme": "MTU",
          "definition": "Maximum Transmission Unit — taille maximale d'une trame réseau"
        },
        {
          "terme": "MX",
          "definition": "Mail eXchanger — enregistrement DNS indiquant le serveur de messagerie du domaine"
        },
        {
          "terme": "named",
          "definition": "Démon Linux du service DNS bind9"
        },
        {
          "terme": "NetworkManager",
          "definition": "Service Linux de gestion des connexions réseau"
        },
        {
          "terme": "nmcli",
          "definition": "Outil CLI de gestion des connexions NetworkManager"
        },
        {
          "terme": "nmtui",
          "definition": "Interface textuelle interactive de NetworkManager"
        },
        {
          "terme": "NS",
          "definition": "Name Server — enregistrement DNS désignant les serveurs faisant autorité"
        },
        {
          "terme": "Notify",
          "definition": "Message DNS du maître vers l'esclave signalant une modification de zone"
        },
        {
          "terme": "OpenSSH",
          "definition": "Implémentation open source du protocole SSH"
        },
        {
          "terme": "Passphrase",
          "definition": "Mot de passe protégeant une clé SSH privée"
        },
        {
          "terme": "pfSense",
          "definition": "Pare-feu/routeur open source utilisé pour le NAT et le routage"
        },
        {
          "terme": "Pool DHCP",
          "definition": "Plage d'adresses IP qu'un serveur DHCP peut distribuer"
        },
        {
          "terme": "PTR",
          "definition": "Pointer — enregistrement DNS de zone inverse (IP → nom)"
        },
        {
          "terme": "PuTTY",
          "definition": "Client SSH/Telnet pour Windows"
        },
        {
          "terme": "Rélay DHCP",
          "definition": "Équipement retransmettant les broadcasts DHCP vers un serveur distant"
        },
        {
          "terme": "Relai DHCP",
          "definition": "Agent qui retransmet les requêtes DHCP entre sous-réseaux"
        },
        {
          "terme": "Requête itérative",
          "definition": "Requête DNS acceptant une réponse partielle (renvoi vers un autre serveur)"
        },
        {
          "terme": "Requête récursive",
          "definition": "Requête DNS exigeant une réponse complète du serveur"
        },
        {
          "terme": "Résolution directe",
          "definition": "DNS : résout un nom vers une adresse IP"
        },
        {
          "terme": "Résolution inverse",
          "definition": "DNS : résout une adresse IP vers un nom"
        },
        {
          "terme": "Résolveur complet",
          "definition": "Serveur DNS résolvant les requêtes en interrogeant l'arborescence DNS"
        },
        {
          "terme": "rndc",
          "definition": "Outil d'administration du démon named (bind9)"
        },
        {
          "terme": "rsync",
          "definition": "Outil de synchronisation de fichiers à distance"
        },
        {
          "terme": "scp",
          "definition": "Secure Copy — copie de fichiers sécurisée via SSH"
        },
        {
          "terme": "Shorewall",
          "definition": "Outil de configuration simplifié d'iptables"
        },
        {
          "terme": "SOA",
          "definition": "Start Of Authority — enregistrement DNS identifiant le serveur maître d'une zone"
        },
        {
          "terme": "Split DNS",
          "definition": "Configuration DNS retournant des réponses différentes selon la source de la requête"
        },
        {
          "terme": "SRV",
          "definition": "Service — enregistrement DNS localisant un service réseau par son nom"
        },
        {
          "terme": "SSH",
          "definition": "Secure Shell — protocole de connexion distante chiffrée"
        },
        {
          "terme": "ssh-copy-id",
          "definition": "Commande déposant automatiquement une clé publique SSH sur un serveur"
        },
        {
          "terme": "ssh-keygen",
          "definition": "Commande générant une paire de clés SSH"
        },
        {
          "terme": "sysctl",
          "definition": "Outil Linux modifiant les paramètres du noyau. Ex : activer `ip_forward`"
        },
        {
          "terme": "systemd",
          "definition": "Système d'initialisation Linux gérant les services et le réseau"
        },
        {
          "terme": "TLD",
          "definition": "Top Level Domain — domaine de premier niveau. Ex : `.fr`, `.com`"
        },
        {
          "terme": "Transfert de zone",
          "definition": "Mécanisme de synchronisation entre serveur DNS maître et esclave"
        },
        {
          "terme": "TTL",
          "definition": "Time To Live — durée de validité d'un enregistrement DNS en cache"
        },
        {
          "terme": "Zone directe",
          "definition": "Zone DNS résolvant les noms en adresses IP"
        },
        {
          "terme": "Zone DNS",
          "definition": "Conteneur regroupant tous les enregistrements d'un espace de noms"
        },
        {
          "terme": "Zone inverse",
          "definition": "Zone DNS résolvant les adresses IP en noms"
        }
      ]
    },
    {
      "id": "services-ms",
      "titre": "Services Réseau Microsoft (Windows Server)",
      "emoji": "🖥️",
      "termes": [
        {
          "terme": "AD / Active Directory",
          "definition": "Service d'annuaire Microsoft permettant la gestion centralisée des identités et ressources d'un réseau"
        },
        {
          "terme": "AD CS",
          "definition": "Active Directory Certificate Services — rôle Windows Server d'autorité de certification"
        },
        {
          "terme": "ADDS",
          "definition": "Active Directory Domain Services — rôle Windows Server hébergeant l'annuaire AD"
        },
        {
          "terme": "AGDLP",
          "definition": "Méthode Microsoft : Account → Global Group → Domain Local Group → Permission"
        },
        {
          "terme": "Autorisation AD (DHCP)",
          "definition": "Mécanisme empêchant les serveurs DHCP non approuvés de distribuer des adresses"
        },
        {
          "terme": "AXFR / IXFR",
          "definition": "Transfert de zone DNS complet / incrémental"
        },
        {
          "terme": "Bail (Lease)",
          "definition": "Paramètres réseau attribués temporairement par un serveur DHCP"
        },
        {
          "terme": "Blocage d'héritage GPO",
          "definition": "Option empêchant les GPO parentes de s'appliquer à une UO"
        },
        {
          "terme": "CAL",
          "definition": "Client Access License — licence d'accès client pour Windows Server"
        },
        {
          "terme": "CD / DC (Contrôleur de Domaine)",
          "definition": "Serveur hébergeant l'AD et gérant l'authentification Kerberos"
        },
        {
          "terme": "certsrv",
          "definition": "Interface web du rôle AD CS pour les demandes de certificats"
        },
        {
          "terme": "CSE",
          "definition": "Client-Side Extension — composant traitant les paramètres GPO côté client"
        },
        {
          "terme": "Default Domain Policy",
          "definition": "GPO par défaut liée au domaine AD, s'appliquant à tous les objets"
        },
        {
          "terme": "Délégation de zone",
          "definition": "Transfert d'autorité sur un sous-domaine vers un autre serveur DNS"
        },
        {
          "terme": "DHCP Failover",
          "definition": "Haute disponibilité DHCP avec réplication des baux entre deux serveurs"
        },
        {
          "terme": "DNS",
          "definition": "Domain Name System — service de résolution de noms indispensable à Active Directory"
        },
        {
          "terme": "Exclusion DHCP",
          "definition": "Plage d'adresses dans une étendue que le serveur ne distribuera jamais"
        },
        {
          "terme": "Étendue (Scope)",
          "definition": "Plage d'adresses IP qu'un serveur DHCP Windows peut distribuer"
        },
        {
          "terme": "Filtre de sécurité GPO",
          "definition": "Restriction d'une GPO à un sous-ensemble d'utilisateurs ou ordinateurs"
        },
        {
          "terme": "Filtre WMI",
          "definition": "Condition WMI conditionnant l'application d'une GPO"
        },
        {
          "terme": "Forêt",
          "definition": "Ensemble de domaines AD partageant un schéma commun, reliés par des approbations transitives"
        },
        {
          "terme": "Fractionnement d'étendues",
          "definition": "Partage d'une plage DHCP entre deux serveurs pour la tolérance aux pannes"
        },
        {
          "terme": "FSMO",
          "definition": "Flexible Single Master Operations — 5 rôles AD à responsabilité unique"
        },
        {
          "terme": "GPMC",
          "definition": "Group Policy Management Console — console de gestion centralisée des GPO"
        },
        {
          "terme": "GPO",
          "definition": "Group Policy Object — objet de stratégie de groupe appliquant des configurations automatiquement"
        },
        {
          "terme": "gpresult",
          "definition": "Commande affichant les GPO appliquées à un utilisateur/ordinateur"
        },
        {
          "terme": "gpupdate /force",
          "definition": "Force l'application immédiate de toutes les GPO"
        },
        {
          "terme": "Héritage GPO",
          "definition": "Mécanisme par lequel les GPO parentes s'appliquent aux UO enfants"
        },
        {
          "terme": "Héritage NTFS",
          "definition": "Mécanisme de propagation des autorisations d'un dossier parent vers les enfants"
        },
        {
          "terme": "Hyper-V",
          "definition": "Rôle de virtualisation Microsoft inclus dans Windows Server"
        },
        {
          "terme": "Kerberos",
          "definition": "Protocole d'authentification par tickets utilisé dans les domaines AD"
        },
        {
          "terme": "LDAP",
          "definition": "Lightweight Directory Access Protocol — protocole d'accès aux annuaires"
        },
        {
          "terme": "NF (Niveau Fonctionnel)",
          "definition": "Version fonctionnelle d'un domaine/forêt AD déterminant les fonctionnalités disponibles"
        },
        {
          "terme": "NS / SOA",
          "definition": "Enregistrements DNS Name Server et Start of Authority"
        },
        {
          "terme": "NTFS",
          "definition": "New Technology File System — système de fichiers supportant les autorisations granulaires"
        },
        {
          "terme": "Option DHCP",
          "definition": "Paramètre réseau supplémentaire transmis avec le bail. Ex : Option 3 = routeur"
        },
        {
          "terme": "OU / UO",
          "definition": "Organizational Unit — conteneur AD pour organiser les objets et appliquer les GPO"
        },
        {
          "terme": "Paramètre \"Appliqué\" (Enforced)",
          "definition": "Option GPO forçant l'application même en cas de blocage d'héritage"
        },
        {
          "terme": "Profil itinérant",
          "definition": "Profil utilisateur stocké sur un serveur, synchronisé à chaque ouverture de session"
        },
        {
          "terme": "Redirecteur conditionnel",
          "definition": "DNS : redirecteur ciblant un espace de noms précis"
        },
        {
          "terme": "Redirection de dossiers GPO",
          "definition": "Politique redirigeant les dossiers utilisateurs vers un espace réseau"
        },
        {
          "terme": "Réservation DHCP",
          "definition": "Association permanente entre une adresse MAC et une adresse IP"
        },
        {
          "terme": "RID",
          "definition": "Relative Identifier — partie variable du SID garantissant l'unicité des objets AD"
        },
        {
          "terme": "Rogue DHCP",
          "definition": "Serveur DHCP non autorisé sur le réseau"
        },
        {
          "terme": "RSoP",
          "definition": "Resultant Set of Policy — outil affichant les stratégies effectivement appliquées"
        },
        {
          "terme": "SAM",
          "definition": "Security Account Manager — base locale d'authentification des postes Windows"
        },
        {
          "terme": "SID",
          "definition": "Security Identifier — identifiant unique attribué à chaque objet de l'annuaire AD"
        },
        {
          "terme": "Site AD",
          "definition": "Composante logique basée sur des sous-réseaux TCP/IP pour optimiser la réplication"
        },
        {
          "terme": "SYSVOL",
          "definition": "Partage réseau sur les DC contenant les scripts et modèles de GPO"
        },
        {
          "terme": "WDS",
          "definition": "Windows Deployment Services — rôle Windows Server pour le déploiement d'images via PXE"
        },
        {
          "terme": "WSUS",
          "definition": "Windows Server Update Services — rôle centralisant la gestion des mises à jour"
        },
        {
          "terme": "Zone principale DNS",
          "definition": "Copie de zone en lecture/écriture sur le serveur DNS maître"
        },
        {
          "terme": "Zone secondaire DNS",
          "definition": "Copie de zone en lecture seule obtenue par transfert depuis le serveur maître"
        }
      ]
    },
    {
      "id": "systeme-client",
      "titre": "Système Client Microsoft (Windows 10)",
      "emoji": "💻",
      "termes": [
        {
          "terme": "2FA",
          "definition": "Authentification à deux facteurs — combine deux méthodes de vérification"
        },
        {
          "terme": "ACE",
          "definition": "Access Control Entry — une entrée individuelle dans une DACL. Ex : \"Groupe X → Autoriser Lecture\""
        },
        {
          "terme": "ACL",
          "definition": "Access Control List — liste de contrôle d'accès associée à un objet NTFS"
        },
        {
          "terme": "APIPA",
          "definition": "Automatic Private IP Addressing — IP `169.254.x.x` auto-attribuée si DHCP absent"
        },
        {
          "terme": "BCD",
          "definition": "Boot Configuration Data — base de données de configuration du démarrage Windows"
        },
        {
          "terme": "CLI",
          "definition": "Command Line Interface — interface en ligne de commande (`cmd.exe`, `powershell.exe`)"
        },
        {
          "terme": "compmgmt.msc",
          "definition": "Console de gestion de l'ordinateur Windows"
        },
        {
          "terme": "Contrôle total",
          "definition": "Niveau maximal de permission NTFS incluant la modification des ACL"
        },
        {
          "terme": "DACL",
          "definition": "Discretionary Access Control List — liste définissant les droits d'accès à une ressource"
        },
        {
          "terme": "DISM",
          "definition": "Deployment Image Servicing and Management — outil de maintenance et réparation d'images Windows"
        },
        {
          "terme": "diskpart",
          "definition": "Outil CLI Windows de gestion des disques, partitions et volumes"
        },
        {
          "terme": "diskmgmt.msc",
          "definition": "Console graphique de gestion des disques"
        },
        {
          "terme": "Disque de base",
          "definition": "Mode disque Windows par défaut avec partitions simples"
        },
        {
          "terme": "Disque dynamique",
          "definition": "Mode disque Windows avancé permettant volumes extensibles et RAID logiciel"
        },
        {
          "terme": "Double jeton (admin)",
          "definition": "Mécanisme UAC donnant aux admins deux jetons : standard et élevé"
        },
        {
          "terme": "EFS",
          "definition": "Encrypting File System — chiffrement de fichiers intégré à NTFS"
        },
        {
          "terme": "Élévation de privilèges",
          "definition": "Demande temporaire de droits administrateur pour une opération (bouclier bleu)"
        },
        {
          "terme": "eventvwr.msc",
          "definition": "Observateur d'événements — console centralisant les journaux Windows"
        },
        {
          "terme": "FAT32",
          "definition": "File Allocation Table 32 bits — système de fichiers simple limité à 4 Go par fichier"
        },
        {
          "terme": "FIFO",
          "definition": "First In, First Out — méthode de gestion de l'espace des points de restauration"
        },
        {
          "terme": "filewall.cpl",
          "definition": "Commande d'accès aux paramètres du pare-feu Windows Defender"
        },
        {
          "terme": "fsmgmt.msc",
          "definition": "Console MMC Dossiers partagés"
        },
        {
          "terme": "GPT",
          "definition": "GUID Partition Table — table de partitions moderne lue par l'UEFI, supporte 128 partitions"
        },
        {
          "terme": "GUI",
          "definition": "Graphical User Interface — interface graphique Windows"
        },
        {
          "terme": "Héritage NTFS",
          "definition": "Propagation automatique des autorisations d'un dossier parent vers ses enfants"
        },
        {
          "terme": "icacls",
          "definition": "Outil CLI Windows de gestion des ACL NTFS"
        },
        {
          "terme": "ICMP",
          "definition": "Internet Control Message Protocol — bloqué par défaut par le pare-feu Windows"
        },
        {
          "terme": "Index WIM",
          "definition": "Numéro identifiant une image spécifique dans un fichier WIM"
        },
        {
          "terme": "Jeton d'accès",
          "definition": "Structure système contenant le SID de l'utilisateur et de ses groupes"
        },
        {
          "terme": "LBA",
          "definition": "Logical Block Addressing — méthode d'adressage des secteurs d'un disque"
        },
        {
          "terme": "Lecteur logique",
          "definition": "Sous-division d'une partition étendue MBR"
        },
        {
          "terme": "LGPO",
          "definition": "Local Group Policy Object — stratégie de groupe locale"
        },
        {
          "terme": "lusrmgr.msc",
          "definition": "Console de gestion des utilisateurs et groupes locaux"
        },
        {
          "terme": "Master / Image de référence",
          "definition": "Poste modèle configuré et prêt à être cloné"
        },
        {
          "terme": "MBR",
          "definition": "Master Boot Record — premier secteur du disque, lu par le BIOS legacy"
        },
        {
          "terme": "mdsched",
          "definition": "Diagnostic de mémoire Windows — teste la RAM au redémarrage"
        },
        {
          "terme": "MMC",
          "definition": "Microsoft Management Console — conteneur d'outils d'administration graphiques"
        },
        {
          "terme": "Mode sans échec",
          "definition": "Démarrage minimal Windows pour diagnostiquer les problèmes"
        },
        {
          "terme": "mstsc",
          "definition": "Commande lançant l'outil Connexion Bureau à distance"
        },
        {
          "terme": "ncpa.cpl",
          "definition": "Commande d'accès direct aux connexions réseau"
        },
        {
          "terme": "netsh",
          "definition": "Outil CLI de configuration réseau avancée Windows"
        },
        {
          "terme": "NLA",
          "definition": "Network Level Authentication — authentification RDP avant établissement de la session graphique"
        },
        {
          "terme": "NTFS",
          "definition": "New Technology File System — système de fichiers Windows standard supportant les ACL"
        },
        {
          "terme": "NTLM",
          "definition": "NT LAN Manager — protocole d'authentification pour comptes locaux hors domaine"
        },
        {
          "terme": "OOBE",
          "definition": "Out-of-Box Experience — assistant de configuration au premier démarrage"
        },
        {
          "terme": "Partition étendue",
          "definition": "Partition MBR servant de conteneur pour des lecteurs logiques"
        },
        {
          "terme": "perfmon",
          "definition": "Analyseur de performances Windows"
        },
        {
          "terme": "Pilote (driver)",
          "definition": "Logiciel faisant l'interface entre l'OS et le matériel"
        },
        {
          "terme": "Pilote signé",
          "definition": "Pilote certifié par Microsoft — obligatoire en Windows 64 bits"
        },
        {
          "terme": "Plug and Play (PnP)",
          "definition": "Capacité de Windows à détecter et installer automatiquement un périphérique"
        },
        {
          "terme": "Point de restauration",
          "definition": "Instantané de l'état du registre et des fichiers système à un instant T"
        },
        {
          "terme": "Pool d'impression",
          "definition": "Imprimante logique connectée à plusieurs périphériques physiques"
        },
        {
          "terme": "pnputil",
          "definition": "Outil CLI de gestion du magasin de pilotes Windows"
        },
        {
          "terme": "Profil Default",
          "definition": "Modèle caché utilisé pour générer le profil de tout nouvel utilisateur"
        },
        {
          "terme": "Profil Public",
          "definition": "Profil partagé entre tous les utilisateurs d'une machine"
        },
        {
          "terme": "Profil utilisateur",
          "definition": "Ensemble des paramètres et données personnels stockés dans `C:\\Users\\<nom>`"
        },
        {
          "terme": "RDP",
          "definition": "Remote Desktop Protocol — protocole de bureau à distance Windows (port 3389)"
        },
        {
          "terme": "ReFS",
          "definition": "Resilient File System — successeur de NTFS pour le stockage serveur"
        },
        {
          "terme": "Refus explicite",
          "definition": "ACE \"Refuser\" dans la DACL — prioritaire sur toute autorisation"
        },
        {
          "terme": "Refus implicite",
          "definition": "Absence d'ACE → accès refusé automatiquement sans règle explicite"
        },
        {
          "terme": "resmon",
          "definition": "Moniteur de ressources Windows"
        },
        {
          "terme": "Route print",
          "definition": "Commande Windows affichant la table de routage locale"
        },
        {
          "terme": "SAM",
          "definition": "Security Account Manager — base locale des comptes utilisateurs Windows"
        },
        {
          "terme": "SACL",
          "definition": "System Access Control List — liste d'audit des accès à un objet NTFS"
        },
        {
          "terme": "secpol.msc",
          "definition": "Console de stratégie de sécurité locale"
        },
        {
          "terme": "sfc /scannow",
          "definition": "System File Checker — analyse et répare les fichiers système Windows corrompus"
        },
        {
          "terme": "SID",
          "definition": "Security Identifier — identifiant unique et permanent de chaque utilisateur/groupe"
        },
        {
          "terme": "SMB",
          "definition": "Server Message Block — protocole de partage de fichiers Windows (port 445)"
        },
        {
          "terme": "Snap-in",
          "definition": "Composant logiciel enfichable dans une console MMC"
        },
        {
          "terme": "Spouleur (Print Spooler)",
          "definition": "Service Windows gérant la file d'attente d'impression"
        },
        {
          "terme": "sysdm.cpl",
          "definition": "Panneau Propriétés système — gestion des profils utilisateurs"
        },
        {
          "terme": "Sysprep",
          "definition": "System Preparation Tool — dépersonnalise un master Windows avant capture"
        },
        {
          "terme": "UAC",
          "definition": "User Account Control — mécanisme limitant les privilèges par défaut sous Windows"
        },
        {
          "terme": "UEFI",
          "definition": "Unified Extensible Firmware Interface — remplaçant moderne du BIOS"
        },
        {
          "terme": "UNC",
          "definition": "Universal Naming Convention — chemin réseau. Ex : `\\\\Serveur\\Partage`"
        },
        {
          "terme": "VHD/VHDX",
          "definition": "Virtual Hard Disk — fichier émulant un disque dur (utilisé par Hyper-V)"
        },
        {
          "terme": "Volume",
          "definition": "Partition formatée avec un système de fichiers"
        },
        {
          "terme": "WIM",
          "definition": "Windows Imaging Format — format de fichier image Microsoft"
        },
        {
          "terme": "WinPE",
          "definition": "Windows Preinstallation Environment — OS minimal amorçable pour le déploiement"
        },
        {
          "terme": "WinRE",
          "definition": "Windows Recovery Environment — OS de récupération intégré à Windows"
        },
        {
          "terme": "Windows Hello",
          "definition": "Solution d'authentification biométrique Microsoft"
        },
        {
          "terme": "whoami",
          "definition": "Commande affichant l'identité de l'utilisateur courant"
        }
      ]
    },
    {
      "id": "powershell",
      "titre": "PowerShell",
      "emoji": "⚡",
      "termes": [
        {
          "terme": "$_ / $PSItem",
          "definition": "Variable automatique représentant l'objet courant dans un bloc de pipeline"
        },
        {
          "terme": "$Error",
          "definition": "Variable tableau stockant toutes les erreurs de la session. `$Error[0]` = dernière erreur"
        },
        {
          "terme": "$ErrorActionPreference",
          "definition": "Variable globale définissant le comportement par défaut face aux erreurs"
        },
        {
          "terme": "$null",
          "definition": "Valeur nulle PowerShell — envoi des erreurs avec `2>$null`"
        },
        {
          "terme": "$PSVersionTable",
          "definition": "Variable affichant la version et les informations de compatibilité PowerShell"
        },
        {
          "terme": "$Using:",
          "definition": "Préfixe référençant une variable locale dans un bloc de commandes distant"
        },
        {
          "terme": "#",
          "definition": "Symbole de commentaire sur une ligne en PowerShell"
        },
        {
          "terme": "<# #>",
          "definition": "Délimiteurs de commentaire multiligne PowerShell"
        },
        {
          "terme": "about_*",
          "definition": "Articles d'aide conceptuels PowerShell sur les fonctionnalités du langage"
        },
        {
          "terme": "Alias",
          "definition": "Raccourci d'une cmdlet. Ex : `ls` = `dir` = `Get-ChildItem`"
        },
        {
          "terme": "ArrayList",
          "definition": "Tableau à taille variable (`System.Collections.ArrayList`) avec `.Add()` et `.Remove()`"
        },
        {
          "terme": "Array",
          "definition": "Tableau de valeurs indexé à partir de 0"
        },
        {
          "terme": "Argument",
          "definition": "Valeur fournie à un paramètre de cmdlet"
        },
        {
          "terme": "Backtick `  ``",
          "definition": "Caractère de continuation de ligne PowerShell"
        },
        {
          "terme": "BOOL",
          "definition": "Type booléen PowerShell : `$TRUE`, `$FALSE`, `$NULL`"
        },
        {
          "terme": "Break",
          "definition": "Interrompt immédiatement une boucle ou un Switch"
        },
        {
          "terme": "CIM",
          "definition": "Common Information Model — successeur de WMI, compatible PS Core. Ex : `Get-CimInstance`"
        },
        {
          "terme": "Cmdlet",
          "definition": "Commande native PowerShell au format `Verbe-Nom`. Ex : `Get-Process`"
        },
        {
          "terme": "CLIXML",
          "definition": "Format XML spécifique à PowerShell pour l'export/import fidèle d'objets"
        },
        {
          "terme": "ConvertFrom-SecureString",
          "definition": "Convertit un SecureString en chaîne chiffrée exportable dans un fichier"
        },
        {
          "terme": "ConvertTo-Html",
          "definition": "Convertit des objets PowerShell en tableau HTML"
        },
        {
          "terme": "ConvertTo-SecureString",
          "definition": "Reconvertit une chaîne chiffrée en objet SecureString"
        },
        {
          "terme": "Continue",
          "definition": "Abandonne l'itération courante et passe à la suivante dans une boucle"
        },
        {
          "terme": "Do Until",
          "definition": "Boucle PowerShell s'arrêtant quand la condition devient vraie"
        },
        {
          "terme": "Do While",
          "definition": "Boucle PowerShell exécutant au moins une fois avant de tester la condition"
        },
        {
          "terme": "Enter-PSSession",
          "definition": "Ouvre une session interactive distante PowerShell"
        },
        {
          "terme": "ExecutionPolicy",
          "definition": "Politique de sécurité contrôlant quels scripts PS peuvent s'exécuter"
        },
        {
          "terme": "Export-CSV",
          "definition": "Exporte des objets PowerShell dans un fichier CSV"
        },
        {
          "terme": "ForEach",
          "definition": "Boucle itérant sur chaque élément d'un tableau"
        },
        {
          "terme": "Format-List (FL)",
          "definition": "Affichage vertical des propriétés d'un objet (une propriété par ligne)"
        },
        {
          "terme": "Format-Table (FT)",
          "definition": "Affichage en tableau avec colonnes"
        },
        {
          "terme": "Format-Wide (FW)",
          "definition": "Affichage condensé d'une propriété sur plusieurs colonnes"
        },
        {
          "terme": "Fonction",
          "definition": "Bloc de code nommé et réutilisable déclaré avec `Function`"
        },
        {
          "terme": "Get-Content",
          "definition": "Cmdlet lisant le contenu d'un fichier texte"
        },
        {
          "terme": "Get-Credential",
          "definition": "Cmdlet affichant une fenêtre sécurisée de saisie de login/mot de passe"
        },
        {
          "terme": "Get-Member",
          "definition": "Cmdlet révélant le TypeName, les propriétés et méthodes d'un objet"
        },
        {
          "terme": "Get-Variable",
          "definition": "Cmdlet listant toutes les variables en mémoire dans la session"
        },
        {
          "terme": "If / ElseIf / Else",
          "definition": "Structure conditionnelle PowerShell"
        },
        {
          "terme": "Import-CSV",
          "definition": "Importe un fichier CSV et crée des objets manipulables dans PowerShell"
        },
        {
          "terme": "INT",
          "definition": "Type entier signé 32 bits PowerShell (-2 147 483 648 à 2 147 483 647)"
        },
        {
          "terme": "IntelliSense",
          "definition": "Système de complétion automatique dans ISE et VS Code"
        },
        {
          "terme": "Invoke-Command",
          "definition": "Exécute un bloc de commandes sur une ou plusieurs machines distantes"
        },
        {
          "terme": "ISE",
          "definition": "Integrated Scripting Environment — IDE PowerShell natif Windows"
        },
        {
          "terme": "Mandatory=$True",
          "definition": "Option de paramètre forçant l'utilisateur à fournir une valeur"
        },
        {
          "terme": "Measure-Object",
          "definition": "Cmdlet de calcul statistique (comptage, moyenne, min, max)"
        },
        {
          "terme": "Méthode",
          "definition": "Action applicable sur un objet PowerShell. Ex : `.AddDays(3)`"
        },
        {
          "terme": "Moindre privilège",
          "definition": "Principe de sécurité n'accordant que les droits strictement nécessaires"
        },
        {
          "terme": "Module",
          "definition": "Ensemble de cmdlets regroupées dans un fichier `.PSM1`"
        },
        {
          "terme": "MultiHop",
          "definition": "Technique de rebond à travers plusieurs machines en Remoting PS"
        },
        {
          "terme": "Objet",
          "definition": "Entité retournée par une cmdlet, composée de propriétés et méthodes"
        },
        {
          "terme": "Out-File",
          "definition": "Redirige la sortie PowerShell vers un fichier texte"
        },
        {
          "terme": "param()",
          "definition": "Bloc de déclaration des paramètres d'une fonction ou d'un script PS"
        },
        {
          "terme": "Paramètre",
          "definition": "Option nommée d'une cmdlet précédée d'un tiret. Ex : `-Name`"
        },
        {
          "terme": "Pipeline",
          "definition": "Mécanisme chaînant des cmdlets via `"
        },
        {
          "terme": "Point de concaténation",
          "definition": "Le `.` accédant à une propriété ou méthode d'un objet. Ex : `(Get-Date).Year`"
        },
        {
          "terme": "Profil PS",
          "definition": "Fichier `.ps1` exécuté automatiquement à l'ouverture de la console"
        },
        {
          "terme": "Propriété",
          "definition": "Attribut descriptif d'un objet. Ex : `Status = Running` d'un service"
        },
        {
          "terme": "Propriété calculée",
          "definition": "Nouvelle propriété créée à la volée via `@{ n='label'; e={ expression } }`"
        },
        {
          "terme": "PS Core",
          "definition": "Version multiplateforme et open source de PowerShell (v6+)"
        },
        {
          "terme": "PSCredential",
          "definition": "Objet .NET contenant un nom d'utilisateur et un mot de passe chiffré"
        },
        {
          "terme": "PSSession",
          "definition": "Session PowerShell distante persistante stockable dans une variable"
        },
        {
          "terme": "Read-Host",
          "definition": "Cmdlet affichant un message et attendant une saisie utilisateur"
        },
        {
          "terme": "Redirection",
          "definition": "Détournement d'un flux (stdout/stderr) vers un fichier"
        },
        {
          "terme": "Remoting",
          "definition": "Fonctionnalité PS permettant l'exécution de commandes sur des machines distantes"
        },
        {
          "terme": "return",
          "definition": "Mot-clé renvoyant une valeur depuis une fonction vers l'appelant"
        },
        {
          "terme": "Script block {}",
          "definition": "Bloc de code PowerShell entre accolades"
        },
        {
          "terme": "SecureString",
          "definition": "Type .NET stockant une chaîne chiffrée en mémoire"
        },
        {
          "terme": "Select-Object",
          "definition": "Cmdlet sélectionnant les propriétés à conserver dans le pipeline"
        },
        {
          "terme": "Snippet",
          "definition": "Modèle de syntaxe préécrit dans ISE/VS Code pour insérer des structures"
        },
        {
          "terme": "Sort-Object",
          "definition": "Cmdlet triant les objets selon la valeur d'une propriété"
        },
        {
          "terme": "stderr (2)",
          "definition": "Flux d'erreur standard d'une cmdlet"
        },
        {
          "terme": "stdin (0)",
          "definition": "Flux d'entrée standard d'une cmdlet"
        },
        {
          "terme": "stdout (1)",
          "definition": "Flux de sortie standard d'une cmdlet"
        },
        {
          "terme": "STRING",
          "definition": "Type de données texte PowerShell"
        },
        {
          "terme": "Switch",
          "definition": "Structure testant une valeur contre plusieurs cas"
        },
        {
          "terme": "System.DateTime",
          "definition": "Type .NET représentant une date et une heure"
        },
        {
          "terme": "Try/Catch/Finally",
          "definition": "Structure de gestion d'erreurs PowerShell"
        },
        {
          "terme": "TypeName",
          "definition": "Identifiant .NET du type d'un objet. Ex : `System.ServiceProcess.ServiceController`"
        },
        {
          "terme": "Variable",
          "definition": "Zone mémoire nommée (préfixe `$`) stockant une valeur ou un objet"
        },
        {
          "terme": "VS Code",
          "definition": "Visual Studio Code — IDE open source multiplateforme de Microsoft"
        },
        {
          "terme": "Where-Object",
          "definition": "Cmdlet de filtrage conditionnel des objets dans le pipeline"
        },
        {
          "terme": "While",
          "definition": "Boucle répétant tant que la condition est vraie"
        },
        {
          "terme": "Wildcard *",
          "definition": "Caractère de substitution dans une recherche. Ex : `Get-Command -Name *User*`"
        },
        {
          "terme": "WMI",
          "definition": "Windows Management Instrumentation — interface d'accès aux données système Windows"
        },
        {
          "terme": "WinRM",
          "definition": "Windows Remote Management — service gérant les connexions Remoting PS"
        },
        {
          "terme": "Write-Host",
          "definition": "Cmdlet affichant du texte dans la console PowerShell"
        }
      ]
    },
    {
      "id": "bash",
      "titre": "Scripting Bash",
      "emoji": "📜",
      "termes": [
        {
          "terme": "$?",
          "definition": "Variable spéciale contenant le code retour de la dernière commande (0 = succès)"
        },
        {
          "terme": "$$",
          "definition": "Variable spéciale contenant le PID du script en cours"
        },
        {
          "terme": "&&",
          "definition": "ET logique : la commande suivante ne s'exécute que si la précédente a réussi (`$?=0`)"
        },
        {
          "terme": "**`",
          "definition": "`**"
        },
        {
          "terme": "2>/dev/null",
          "definition": "Redirige les erreurs vers `/dev/null` pour les supprimer silencieusement"
        },
        {
          "terme": "[[ ]]",
          "definition": "Commande de test interne Bash recommandée — supporte `&&`, `"
        },
        {
          "terme": "(( ))",
          "definition": "Test arithmétique Bash permettant les opérateurs `>`, `<`, `==`"
        },
        {
          "terme": ";;",
          "definition": "Séparateur de blocs dans `case` — sort de la structure après exécution"
        },
        {
          "terme": "-d",
          "definition": "Test Bash : vérifie si un répertoire existe. Ex : `[[ -d /tmp ]]`"
        },
        {
          "terme": "-eq",
          "definition": "Opérateur de test numérique \"égal\". Ex : `[[ $n -eq 0 ]]`"
        },
        {
          "terme": "-f",
          "definition": "Test Bash : vérifie si un fichier ordinaire existe. Ex : `[[ -f /etc/passwd ]]`"
        },
        {
          "terme": "-z",
          "definition": "Test Bash : vérifie si une chaîne/variable est vide"
        },
        {
          "terme": "/dev/tty",
          "definition": "Périphérique terminal (clavier) — permet `read </dev/tty` dans une boucle avec pipe"
        },
        {
          "terme": "Algorithme",
          "definition": "Suite ordonnée d'instructions conduisant à un résultat précis"
        },
        {
          "terme": "Appel (fonction)",
          "definition": "Invocation d'une fonction par son nom. Ex : `func_verif \"$1\"`"
        },
        {
          "terme": "Bash",
          "definition": "Bourne Again SHell — interpréteur Shell le plus répandu sous Linux (`/bin/bash`)"
        },
        {
          "terme": "Bibliothèque de fonctions",
          "definition": "Fichier contenant uniquement des déclarations de fonctions, chargé par `source`"
        },
        {
          "terme": "Boucle infinie",
          "definition": "`while true` — boucle sans condition d'arrêt naturelle, sortie par `exit` ou `break`"
        },
        {
          "terme": "Cahier des charges (CDC)",
          "definition": "Document formalisant les besoins et contraintes d'un projet de script"
        },
        {
          "terme": "case",
          "definition": "Structure de branchement multiple sur les valeurs d'une variable"
        },
        {
          "terme": "chmod",
          "definition": "Commande modifiant les permissions d'un fichier. `+x` ajoute l'exécution"
        },
        {
          "terme": "Code ANSI",
          "definition": "Séquence de contrôle terminal pour couleur/formatage. Ex : `\\033[0m` = reset"
        },
        {
          "terme": "Code retour (exit code)",
          "definition": "Valeur numérique (0–255) indiquant le statut de fin d'une commande. `0` = succès"
        },
        {
          "terme": "Commentaire",
          "definition": "Texte précédé de `#`, ignoré par l'interpréteur"
        },
        {
          "terme": "Commande externe",
          "definition": "Programme indépendant sur le disque. Ex : `/bin/ls`, `/usr/bin/grep`"
        },
        {
          "terme": "Commande interne (built-in)",
          "definition": "Commande faisant partie du Shell, sans binaire. Ex : `exit`, `echo`, `cd`, `read`"
        },
        {
          "terme": "Constante",
          "definition": "Variable en lecture seule déclarée avec `declare -r`. Ex : `declare -r MAX=100`"
        },
        {
          "terme": "Déclaration (fonction)",
          "definition": "Définition d'une fonction et de son contenu — doit précéder tout appel"
        },
        {
          "terme": "declare -r",
          "definition": "Option déclarant une variable en lecture seule"
        },
        {
          "terme": "do",
          "definition": "Mot-clé ouvrant le bloc d'actions d'une boucle"
        },
        {
          "terme": "done",
          "definition": "Mot-clé fermant le bloc d'actions d'une boucle"
        },
        {
          "terme": "echo -e",
          "definition": "Option activant l'interprétation des séquences d'échappement dans `echo`"
        },
        {
          "terme": "elif",
          "definition": "Condition alternative dans une structure `if` sans `fi` supplémentaire"
        },
        {
          "terme": "else",
          "definition": "Bloc d'actions exécuté si la condition `if` est fausse"
        },
        {
          "terme": "Enchaînement conditionnel",
          "definition": "Exécution soumise au code retour de la commande précédente (`&&` ou `"
        },
        {
          "terme": "Enchaînement inconditionnel",
          "definition": "Exécution séquentielle sans condition via `;`"
        },
        {
          "terme": "esac",
          "definition": "Fermeture obligatoire de la structure `case`"
        },
        {
          "terme": "export",
          "definition": "Commande rendant une variable disponible dans les sous-Shell"
        },
        {
          "terme": "expr",
          "definition": "Calcul arithmétique externe. Ex : `nb=$(expr $nb + 1)`"
        },
        {
          "terme": "extglob",
          "definition": "Option Bash activant les facteurs d'occurrence avancés dans les tests"
        },
        {
          "terme": "false",
          "definition": "Commande retournant toujours `1` — utilisée avec `until` pour les boucles infinies"
        },
        {
          "terme": "fi",
          "definition": "Fermeture obligatoire de toute structure `if`"
        },
        {
          "terme": "for",
          "definition": "Boucle itérant sur une liste. Ex : `for f in *.log ; do cat \"$f\" ; done`"
        },
        {
          "terme": "Fonction",
          "definition": "Bloc de commandes nommé et réutilisable. Ex : `func_verif() { … }`"
        },
        {
          "terme": "func_ / function_",
          "definition": "Préfixe de nommage recommandé pour les fonctions Bash"
        },
        {
          "terme": "IFS",
          "definition": "Internal Field Separator — variable définissant les séparateurs de champs"
        },
        {
          "terme": "if",
          "definition": "Structure conditionnelle de base Bash"
        },
        {
          "terme": "local",
          "definition": "Mot-clé limitant la portée d'une variable à la fonction"
        },
        {
          "terme": "Mode trace",
          "definition": "Option `bash -x` affichant chaque commande avant son exécution"
        },
        {
          "terme": "Organigramme",
          "definition": "Schéma visuel d'un algorithme avec symboles normalisés"
        },
        {
          "terme": "Paramètres de fonction",
          "definition": "Valeurs passées à la fonction, accessibles via `$1`, `$2`…"
        },
        {
          "terme": "PID",
          "definition": "Process IDentifier — numéro unique identifiant un processus"
        },
        {
          "terme": "Process substitution",
          "definition": "Syntaxe `< <(cmd)` alimentant `while read` sans créer de sous-Shell"
        },
        {
          "terme": "Pseudo-code",
          "definition": "Représentation textuelle en langage naturel d'un algorithme"
        },
        {
          "terme": "read",
          "definition": "Commande lisant une entrée clavier et la stockant dans une variable"
        },
        {
          "terme": "read -p",
          "definition": "Option affichant un message d'invite intégré à `read`"
        },
        {
          "terme": "Regroupement {}",
          "definition": "Exécution dans le Shell courant — les variables restent accessibles après"
        },
        {
          "terme": "Script Shell",
          "definition": "Fichier texte contenant des commandes interprétées par le Shell"
        },
        {
          "terme": "set",
          "definition": "Commande affichant toutes les variables ou affectant les variables positionnelles"
        },
        {
          "terme": "Shebang",
          "definition": "Ligne `#!/bin/bash` en tête de script indiquant l'interpréteur"
        },
        {
          "terme": "Shell enfant",
          "definition": "Sous-Shell créé pour exécuter un script — `exit` retourne au Shell parent"
        },
        {
          "terme": "Shell père",
          "definition": "Shell ayant lancé le script"
        },
        {
          "terme": "source / .",
          "definition": "Charge un fichier dans l'environnement courant. Ex : `source ~/mesfonctions`"
        },
        {
          "terme": "Sous-Shell",
          "definition": "Processus enfant créé par `()` — les modifications de variables ne remontent pas"
        },
        {
          "terme": "then",
          "definition": "Mot-clé introduisant le bloc d'actions si la condition est vraie"
        },
        {
          "terme": "true",
          "definition": "Commande retournant toujours `0` — utilisée pour les boucles infinies"
        },
        {
          "terme": "typeset -i",
          "definition": "Déclare une variable de type entier en Bash"
        },
        {
          "terme": "until",
          "definition": "\"Jusqu'à\" — boucle si `$?≠0`. Contraire du `while`"
        },
        {
          "terme": "unset",
          "definition": "Commande supprimant une variable de la mémoire"
        },
        {
          "terme": "Variable d'environnement",
          "definition": "Variable exportée, héritée par tous les sous-Shell. Ex : `HOME`, `PATH`"
        },
        {
          "terme": "Variable globale",
          "definition": "Variable visible dans tout le script y compris les fonctions"
        },
        {
          "terme": "Variable locale",
          "definition": "Variable visible uniquement dans le Shell courant"
        },
        {
          "terme": "Variable positionnelle",
          "definition": "Arguments passés à un script, accessibles via `$1`, `$2`… `$9`"
        },
        {
          "terme": "Variable réservée",
          "definition": "Variable dont le nom est réservé par Bash. Ex : `$?`, `$$`, `$0`"
        },
        {
          "terme": "Variable tampon",
          "definition": "Variable supplémentaire pour absorber le surplus de saisie dans `read`"
        },
        {
          "terme": "vim",
          "definition": "Éditeur de texte en ligne de commande pour l'écriture des scripts"
        },
        {
          "terme": "while",
          "definition": "\"Tant que\" — boucle si `$?=0`"
        },
        {
          "terme": "while read",
          "definition": "Lecture ligne par ligne d'un fichier. Ex : `while read ligne ; do … done < fic`"
        }
      ]
    },
    {
      "id": "virtualisation",
      "titre": "Virtualisation",
      "emoji": "☁️",
      "termes": [
        {
          "terme": "AMD-V",
          "definition": "Extension AMD permettant la virtualisation matérielle assistée par le processeur"
        },
        {
          "terme": "Blade / Lame",
          "definition": "Format de serveur ultra-compact inséré dans un châssis commun"
        },
        {
          "terme": "BSS / ESS",
          "definition": "Basic/Extended Service Set — topologies réseau Wi-Fi"
        },
        {
          "terme": "CARP",
          "definition": "Common Address Redundancy Protocol — redondance d'IP dans pfSense"
        },
        {
          "terme": "Checkpoint",
          "definition": "Capture instantanée de l'état d'une VM Hyper-V (équivalent Snapshot VMware)"
        },
        {
          "terme": "Cluster vSphere",
          "definition": "Regroupement logique d'hôtes ESXi géré par vCenter"
        },
        {
          "terme": "Commutateur virtuel",
          "definition": "Switch logiciel Hyper-V interconnectant les VM"
        },
        {
          "terme": "Datastore / Banque de données",
          "definition": "Conteneur logique vSphere stockant les fichiers des VM"
        },
        {
          "terme": "DAS",
          "definition": "Direct Attached Storage — disques physiquement connectés au serveur"
        },
        {
          "terme": "DPM",
          "definition": "Distributed Power Management — mise en veille des hôtes sous-chargés vSphere"
        },
        {
          "terme": "DRS",
          "definition": "Distributed Resource Scheduler — équilibre automatique de charge entre hôtes vSphere"
        },
        {
          "terme": "EPC / EPT",
          "definition": "Extended Page Tables — implémentation Intel de SLAT"
        },
        {
          "terme": "ESX",
          "definition": "Ancien hyperviseur VMware avec Service Console Linux (abandonné depuis vSphere 5)"
        },
        {
          "terme": "ESXi",
          "definition": "Hyperviseur VMware de type 1 (bare-metal), installé directement sur le matériel"
        },
        {
          "terme": "EVC",
          "definition": "Enhanced vMotion Compatibility — masque les différences CPU pour le vMotion"
        },
        {
          "terme": "Export / Import VM",
          "definition": "Mécanisme Hyper-V pour déplacer ou dupliquer une VM"
        },
        {
          "terme": "FC (Fibre Channel)",
          "definition": "Protocole SAN haut débit sur fibre optique"
        },
        {
          "terme": "FCoE",
          "definition": "Fibre Channel over Ethernet — FC sur réseau Ethernet 10G"
        },
        {
          "terme": "FT",
          "definition": "Fault Tolerance vSphere — VM miroir synchronisée en temps réel (zéro interruption)"
        },
        {
          "terme": "Génération 1 / Gen 1",
          "definition": "VM Hyper-V utilisant un BIOS classique, compatible tous OS"
        },
        {
          "terme": "Génération 2 / Gen 2",
          "definition": "VM Hyper-V utilisant UEFI, plus performante, réservée aux OS 64 bits"
        },
        {
          "terme": "Gestionnaire Hyper-V",
          "definition": "Console MMC de gestion locale des VM Hyper-V"
        },
        {
          "terme": "HA",
          "definition": "High Availability vSphere — redémarre les VM sur d'autres hôtes en cas de panne"
        },
        {
          "terme": "HBA",
          "definition": "Host Bus Adapter — carte réseau pour connexion SAN"
        },
        {
          "terme": "Héritage de permissions vSphere",
          "definition": "Propagation des droits vCenter d'un objet parent vers ses enfants"
        },
        {
          "terme": "Host-only",
          "definition": "Mode réseau VMware isolé entre l'hôte et les VM, sans accès externe"
        },
        {
          "terme": "Hôte (Host)",
          "definition": "Machine physique hébergeant un hyperviseur et ses VM"
        },
        {
          "terme": "Hyper-V",
          "definition": "Rôle de virtualisation Microsoft de type 1 inclus dans Windows Server"
        },
        {
          "terme": "Hyperviseur",
          "definition": "Couche logicielle abstrayant le matériel pour héberger plusieurs OS simultanément"
        },
        {
          "terme": "iSCSI Initiator",
          "definition": "Composant ESXi envoyant les requêtes d'accès au stockage iSCSI"
        },
        {
          "terme": "iSCSI Target",
          "definition": "Composant baie répondant aux requêtes iSCSI et exposant les LUN"
        },
        {
          "terme": "KVM",
          "definition": "Kernel-based Virtual Machine — module noyau Linux pour la virtualisation type 1"
        },
        {
          "terme": "LAN Segment (VMware)",
          "definition": "Réseau entièrement virtuel et isolé dans VMware Workstation"
        },
        {
          "terme": "Library (VMware)",
          "definition": "Panneau listant toutes les VM enregistrées dans VMware Workstation"
        },
        {
          "terme": "Limite vSphere",
          "definition": "Plafond maximum de ressources consommables par une VM ou pool"
        },
        {
          "terme": "LUN",
          "definition": "Logical Unit Number — unité de stockage logique exposée par une baie SAN"
        },
        {
          "terme": "MDT",
          "definition": "Microsoft Deployment Toolkit — outil de déploiement automatisé de Windows"
        },
        {
          "terme": "Mémoire dynamique",
          "definition": "Fonctionnalité Hyper-V allouant la RAM d'une VM de façon flexible"
        },
        {
          "terme": "Mode bloc",
          "definition": "Accès aux données par blocs identifiés individuellement (SCSI, SAN)"
        },
        {
          "terme": "Mode fichier",
          "definition": "Accès aux données via un système de fichiers réseau (NFS, CIFS)"
        },
        {
          "terme": "Mode natif Hyper-V",
          "definition": "Après installation du rôle, Windows devient lui-même une VM privilégiée"
        },
        {
          "terme": "NAS",
          "definition": "Network Attached Storage — serveur de fichiers réseau (NFS, CIFS/SMB)"
        },
        {
          "terme": "NPT / RVI",
          "definition": "Nested Page Tables — implémentation AMD de SLAT"
        },
        {
          "terme": "OVA",
          "definition": "Archive compressée contenant tous les fichiers d'un OVF en un seul fichier"
        },
        {
          "terme": "OVF",
          "definition": "Open Virtual machine Format — format standard d'échange de VM entre plateformes"
        },
        {
          "terme": "Parts (Shares) vSphere",
          "definition": "Valeur déterminant la priorité relative entre VM en cas de contention"
        },
        {
          "terme": "pNIC / VMNIC",
          "definition": "Carte réseau physique d'un hôte ESXi"
        },
        {
          "terme": "Pool de ressources",
          "definition": "Conteneur logique alloué une fraction des ressources CPU/RAM d'un hôte"
        },
        {
          "terme": "Port Group",
          "definition": "Groupement de ports sur un vSwitch définissant le type d'usage réseau"
        },
        {
          "terme": "PXE",
          "definition": "Preboot eXecution Environment — démarrage réseau sans support physique"
        },
        {
          "terme": "RDM",
          "definition": "Raw Device Mapping — accès direct d'une VM à un LUN SAN sans VMFS"
        },
        {
          "terme": "Réservation vSphere",
          "definition": "Quantité minimale de CPU/RAM garantie à une VM ou pool"
        },
        {
          "terme": "SAN",
          "definition": "Storage Area Network — réseau dédié au stockage bloc"
        },
        {
          "terme": "SCSI",
          "definition": "Small Computer System Interface — protocole de stockage bloc"
        },
        {
          "terme": "Service Console",
          "definition": "Interface CLI Linux de l'ancien ESX, supprimée dans ESXi"
        },
        {
          "terme": "Services d'intégration",
          "definition": "Pilotes installés dans la VM invitée pour améliorer les interactions avec Hyper-V"
        },
        {
          "terme": "Shared Folder (VMware)",
          "definition": "Dossier partagé entre l'hôte et la VM"
        },
        {
          "terme": "SID",
          "definition": "Security Identifier — régénéré par sysprep sur chaque clone Windows"
        },
        {
          "terme": "SLAT",
          "definition": "Second Level Address Translation — requis pour Hyper-V, accélère l'accès mémoire des VM"
        },
        {
          "terme": "Snapshot",
          "definition": "Capture instantanée de l'état d'une VM (RAM + disque) — retour arrière rapide"
        },
        {
          "terme": "SSO",
          "definition": "Single Sign-On — authentification sur vCenter via les comptes Active Directory"
        },
        {
          "terme": "Storage vMotion",
          "definition": "Déplacement à chaud des disques d'une VM d'un datastore vers un autre"
        },
        {
          "terme": "Surallocation",
          "definition": "Somme des tailles max des disques Thin dépassant la capacité réelle du datastore"
        },
        {
          "terme": "Teaming",
          "definition": "Regroupement de VMNIC sur un vSwitch pour débit cumulé ou tolérance aux pannes"
        },
        {
          "terme": "Thick Provision",
          "definition": "Disque VMDK dont l'espace total est réservé immédiatement"
        },
        {
          "terme": "Thin Provision",
          "definition": "Disque VMDK dont l'espace est alloué dynamiquement"
        },
        {
          "terme": "TPID",
          "definition": "Tag Protocol Identifier — valeur `0x8100` signalant qu'une trame Ethernet est taguée"
        },
        {
          "terme": "Type 1 (bare-metal)",
          "definition": "Hyperviseur installé directement sur le matériel, sans OS intermédiaire"
        },
        {
          "terme": "Type 2 (hosted)",
          "definition": "Hyperviseur installé sur un OS existant. Ex : VMware Workstation"
        },
        {
          "terme": "VAMI",
          "definition": "vCenter Appliance Management Interface — interface web d'admin VCSA (port 5480)"
        },
        {
          "terme": "vCenter Server",
          "definition": "Serveur d'administration centralisée pour plusieurs hôtes ESXi"
        },
        {
          "terme": "VCSA",
          "definition": "vCenter Server Appliance — vCenter packagé sous forme de VM Linux préconfigurée"
        },
        {
          "terme": "VDS (vSwitch Distribué)",
          "definition": "Commutateur virtuel partagé entre plusieurs hôtes ESXi, géré depuis vCenter"
        },
        {
          "terme": "VHDX",
          "definition": "Virtual Hard Disk eXtended — format de disque virtuel Hyper-V (jusqu'à 64 To)"
        },
        {
          "terme": "vim (vi improved)",
          "definition": "Éditeur de texte disponible dans la console des équipements VMware"
        },
        {
          "terme": "VM (Machine Virtuelle)",
          "definition": "Environnement informatique émulé, isolé, fonctionnant sur une machine physique"
        },
        {
          "terme": "VMkernel",
          "definition": "Interface réseau logique de l'hôte ESXi pour ses propres flux"
        },
        {
          "terme": "VMDK",
          "definition": "VMware Disk — format de fichier du disque dur virtuel d'une VM VMware"
        },
        {
          "terme": "VMFS",
          "definition": "VMware File System — système de fichiers VMware pour l'accès concurrent multi-hôtes"
        },
        {
          "terme": "VMM",
          "definition": "Virtual Machine Manager — composant de gestion intégré à l'hyperviseur"
        },
        {
          "terme": "vMotion",
          "definition": "Migration à chaud d'une VM d'un hôte ESXi vers un autre, sans interruption"
        },
        {
          "terme": "vmtools",
          "definition": "VMware Tools — paquet installé dans le SE invité améliorant les performances"
        },
        {
          "terme": "VMX",
          "definition": "Fichier texte de configuration d'une VM VMware"
        },
        {
          "terme": "vNIC",
          "definition": "Carte réseau virtuelle présentée à une VM"
        },
        {
          "terme": "vSphere",
          "definition": "Suite logicielle VMware pour la virtualisation en datacenter (ESXi + vCenter)"
        },
        {
          "terme": "VT-x",
          "definition": "Extension Intel permettant la virtualisation matérielle assistée"
        },
        {
          "terme": "VSS (vSphere Standard Switch)",
          "definition": "Commutateur virtuel local à un hôte ESXi, géré hôte par hôte"
        },
        {
          "terme": "WDS",
          "definition": "Windows Deployment Services — déploiement d'images Windows via PXE"
        },
        {
          "terme": "Xen",
          "definition": "Hyperviseur open source de type 1, historiquement utilisé par AWS"
        }
      ]
    },
    {
      "id": "sauvegarde",
      "titre": "Sauvegarde & Stockage",
      "emoji": "💾",
      "termes": [
        {
          "terme": "Backup Repository",
          "definition": "Espace de stockage dédié à la conservation des sauvegardes"
        },
        {
          "terme": "BCM",
          "definition": "Business Continuity Management — gestion globale de la continuité d'activité"
        },
        {
          "terme": "BCP / PCA",
          "definition": "Business Continuity Plan / Plan de Continuité d'Activité"
        },
        {
          "terme": "BIA",
          "definition": "Business Impact Analysis — évaluation des pertes potentielles en cas de sinistre"
        },
        {
          "terme": "Bit d'archivage",
          "definition": "Attribut de fichier indiquant s'il a été modifié depuis la dernière sauvegarde complète"
        },
        {
          "terme": "BMR (Bare-Metal Recovery)",
          "definition": "Restauration complète d'un système sur un matériel nu"
        },
        {
          "terme": "CIFS / SMB",
          "definition": "Protocole de partage de fichiers Windows utilisé pour les sauvegardes réseau"
        },
        {
          "terme": "Clustering",
          "definition": "Regroupement de serveurs pour la tolérance aux pannes et la haute disponibilité"
        },
        {
          "terme": "DAS",
          "definition": "Direct Attached Storage — stockage directement attaché au serveur"
        },
        {
          "terme": "DDS / DAT",
          "definition": "Digital Data Storage — format de bande magnétique de sauvegarde"
        },
        {
          "terme": "Delta",
          "definition": "Sauvegarde ne conservant que les blocs modifiés depuis la dernière sauvegarde"
        },
        {
          "terme": "DLT / SDLT",
          "definition": "Digital Linear Tape — format de bande magnétique de haute capacité"
        },
        {
          "terme": "DRP / PRA",
          "definition": "Disaster Recovery Plan / Plan de Reprise d'Activité"
        },
        {
          "terme": "DUMP (.sql)",
          "definition": "Sauvegarde d'une base de données SQL en fichier texte"
        },
        {
          "terme": "Failover",
          "definition": "Basculement automatique vers un système de secours"
        },
        {
          "terme": "Fibre Channel",
          "definition": "Protocole SAN haut débit sur fibre optique"
        },
        {
          "terme": "Granulaire (restauration)",
          "definition": "Restauration d'éléments précis (fichier, boîte mail) sans restaurer l'intégralité"
        },
        {
          "terme": "GPF / GFS",
          "definition": "Grand-Père / Fils — stratégie de rotation des sauvegardes"
        },
        {
          "terme": "Hot spare",
          "definition": "Disque de rechange pré-installé, activé automatiquement en cas de défaillance RAID"
        },
        {
          "terme": "iSCSI",
          "definition": "Internet SCSI — protocole de stockage bloc sur réseau IP"
        },
        {
          "terme": "Job",
          "definition": "Tâche de sauvegarde planifiée dans un logiciel de backup"
        },
        {
          "terme": "LTO",
          "definition": "Linear Tape-Open — standard de bande magnétique de sauvegarde"
        },
        {
          "terme": "LUN",
          "definition": "Logical Unit Number — unité logique de stockage exposée par une baie SAN"
        },
        {
          "terme": "Merge",
          "definition": "Opération fusionnant des points de restauration pour libérer de l'espace"
        },
        {
          "terme": "Mirroring",
          "definition": "Duplication à l'identique des données sur un disque miroir (RAID 1)"
        },
        {
          "terme": "NAS",
          "definition": "Network Attached Storage — serveur de fichiers réseau (NFS, CIFS)"
        },
        {
          "terme": "NFS",
          "definition": "Network File System — protocole de partage de fichiers Linux/Unix"
        },
        {
          "terme": "Opérateurs de sauvegarde",
          "definition": "Groupe Windows disposant des droits pour effectuer les sauvegardes"
        },
        {
          "terme": "Parité",
          "definition": "Données calculées permettant la reconstruction d'un disque défaillant (RAID 5/6)"
        },
        {
          "terme": "RAID",
          "definition": "Redundant Array of Independent Disks — technologie de redondance de disques"
        },
        {
          "terme": "RAID logiciel",
          "definition": "RAID géré par le système d'exploitation"
        },
        {
          "terme": "RAID matériel",
          "definition": "RAID géré par un contrôleur dédié"
        },
        {
          "terme": "Rebuild",
          "definition": "Reconstruction d'un disque RAID après remplacement d'un disque défaillant"
        },
        {
          "terme": "Redondance multisite",
          "definition": "Sauvegarde sur sites géographiquement distincts"
        },
        {
          "terme": "Rémanence",
          "definition": "Persistance résiduelle des données sur un support après suppression"
        },
        {
          "terme": "Réplica",
          "definition": "Copie synchronisée d'une VM ou d'un serveur sur un site secondaire"
        },
        {
          "terme": "Rétention",
          "definition": "Durée pendant laquelle les sauvegardes sont conservées"
        },
        {
          "terme": "RMAN",
          "definition": "Recovery Manager — outil de sauvegarde Oracle"
        },
        {
          "terme": "Robotique de sauvegarde",
          "definition": "Système automatisé de gestion physique des bandes magnétiques"
        },
        {
          "terme": "RPO",
          "definition": "Recovery Point Objective — perte de données maximale acceptable (en temps)"
        },
        {
          "terme": "RTO",
          "definition": "Recovery Time Objective — durée maximale acceptable d'interruption de service"
        },
        {
          "terme": "SAN",
          "definition": "Storage Area Network — réseau dédié au stockage bloc"
        },
        {
          "terme": "Sauvegarde complète",
          "definition": "Copie intégrale de toutes les données à un instant T"
        },
        {
          "terme": "Sauvegarde cumulative",
          "definition": "Sauvegarde de toutes les données modifiées depuis la dernière sauvegarde complète"
        },
        {
          "terme": "Sauvegarde différentielle",
          "definition": "Copie des données modifiées depuis la dernière sauvegarde complète"
        },
        {
          "terme": "Sauvegarde externalisée",
          "definition": "Sauvegarde stockée hors site (cloud, coffre-fort, centre externe)"
        },
        {
          "terme": "Sauvegarde incrémentale",
          "definition": "Copie uniquement des données modifiées depuis la dernière sauvegarde (complète ou incrémentale)"
        },
        {
          "terme": "Sauvegarde locale",
          "definition": "Sauvegarde stockée sur un support physique proche du serveur source"
        },
        {
          "terme": "SGBD",
          "definition": "Système de Gestion de Base de Données"
        },
        {
          "terme": "Striping",
          "definition": "Répartition des données en blocs sur plusieurs disques (RAID 0) pour la performance"
        },
        {
          "terme": "Versionning",
          "definition": "Conservation de plusieurs versions successives d'un fichier ou d'une VM"
        },
        {
          "terme": "VSS",
          "definition": "Volume Shadow Copy Service — service Windows permettant les sauvegardes à chaud"
        }
      ]
    },
    {
      "id": "glpi",
      "titre": "GLPI & Gestion de Parc",
      "emoji": "📋",
      "termes": [
        {
          "terme": "Agent FusionInventory",
          "definition": "Logiciel client installé sur les postes pour l'inventaire automatique"
        },
        {
          "terme": "Alias SQL",
          "definition": "Renommage d'une colonne à l'affichage. Ex : `Prénom AS Firstname`"
        },
        {
          "terme": "Arbre de résolution",
          "definition": "Guide de dépannage structuré pour les incidents"
        },
        {
          "terme": "Attribut SQL",
          "definition": "En-tête d'une table (champ). Ex : `ID`, `Prénom`, `Age`"
        },
        {
          "terme": "Baie",
          "definition": "Armoire rack accueillant les équipements serveur"
        },
        {
          "terme": "Base DN",
          "definition": "Point d'entrée de la recherche dans un annuaire LDAP"
        },
        {
          "terme": "Bibliothèque GLPI",
          "definition": "Référentiel de solutions aux incidents connus"
        },
        {
          "terme": "Cartographie réseau",
          "definition": "Représentation des connexions physiques entre équipements dans GLPI"
        },
        {
          "terme": "Champ de liaison",
          "definition": "Colonne CSV servant d'identifiant unique pour éviter les doublons à l'import"
        },
        {
          "terme": "Champ masqué",
          "definition": "Champ non affiché à l'utilisateur dans un formulaire de ticket"
        },
        {
          "terme": "Champ obligatoire",
          "definition": "Champ dont la saisie bloque la soumission si vide"
        },
        {
          "terme": "Champ prédéfini",
          "definition": "Champ pré-rempli automatiquement, modifiable par l'utilisateur"
        },
        {
          "terme": "CI",
          "definition": "Configuration Item — élément de l'inventaire associé à un ticket"
        },
        {
          "terme": "Clé étrangère SQL",
          "definition": "Référence à la clé primaire d'une autre table"
        },
        {
          "terme": "Clé primaire SQL",
          "definition": "Identifiant unique de chaque ligne d'une table, non NULL"
        },
        {
          "terme": "Collecteur mail",
          "definition": "Module GLPI récupérant les e-mails pour créer des tickets automatiquement"
        },
        {
          "terme": "Composant",
          "definition": "Élément matériel interne d'un équipement (RAM, SSD, carte réseau)"
        },
        {
          "terme": "Contrainte SQL",
          "definition": "Règle d'intégrité imposée par le SGBD"
        },
        {
          "terme": "Convention de nommage",
          "definition": "Règle définissant le format des noms d'éléments dans GLPI"
        },
        {
          "terme": "CSV",
          "definition": "Comma Separated Values — format de fichier tabulaire pour l'import/export"
        },
        {
          "terme": "Cycle de vie",
          "definition": "Succession des statuts d'un matériel ou d'un ticket de l'ouverture à la clôture"
        },
        {
          "terme": "Data Injection",
          "definition": "Plugin GLPI permettant l'import en masse depuis un fichier CSV"
        },
        {
          "terme": "Dictionnaire FusionInventory",
          "definition": "Table de correspondance normalisant les valeurs reçues"
        },
        {
          "terme": "DN",
          "definition": "Distinguished Name — chemin unique d'un objet dans l'annuaire LDAP"
        },
        {
          "terme": "Doublon",
          "definition": "Même équipement créé plusieurs fois dans l'inventaire"
        },
        {
          "terme": "Entité",
          "definition": "Unité de segmentation administrative dans GLPI"
        },
        {
          "terme": "Escalade ticket",
          "definition": "Action automatique déclenchée avant/après la date butoir du SLA"
        },
        {
          "terme": "Flux d'entrée ticket",
          "definition": "Moyen par lequel un ticket est créé (interface, mail, téléphone)"
        },
        {
          "terme": "FusionInventory",
          "definition": "Plugin d'inventaire automatique par agents client/serveur pour GLPI"
        },
        {
          "terme": "Gabarit de ticket",
          "definition": "Masque de saisie personnalisant les champs affichés et obligatoires"
        },
        {
          "terme": "Gabarit GLPI",
          "definition": "Modèle pré-rempli réutilisable pour créer des éléments similaires"
        },
        {
          "terme": "Gestion globale",
          "definition": "Un seul enregistrement pour plusieurs unités identiques non individualisées"
        },
        {
          "terme": "Gestion unitaire",
          "definition": "Un enregistrement par unité physique avec numéro de série unique"
        },
        {
          "terme": "GLPI",
          "definition": "Gestion Libre de Parc Informatique — logiciel ITSM open source"
        },
        {
          "terme": "GPL",
          "definition": "General Public License — licence libre sous laquelle GLPI est distribué (v2)"
        },
        {
          "terme": "grant all privileges",
          "definition": "Commande SQL accordant tous les droits sur une base à un utilisateur"
        },
        {
          "terme": "Habilitation dynamique",
          "definition": "Droits GLPI attribués automatiquement via règles à chaque connexion"
        },
        {
          "terme": "Habilitation statique",
          "definition": "Droits GLPI attribués manuellement par utilisateur"
        },
        {
          "terme": "Habilitation",
          "definition": "Combinaison d'un profil et d'une entité pour un utilisateur GLPI"
        },
        {
          "terme": "INNER JOIN",
          "definition": "Jointure SQL interne — intersection des deux tables"
        },
        {
          "terme": "install.php",
          "definition": "Fichier d'installation GLPI — à supprimer après usage (faille de sécurité)"
        },
        {
          "terme": "Interface anonyme",
          "definition": "Formulaire de ticket sans authentification"
        },
        {
          "terme": "Intitulé",
          "definition": "Liste de valeurs paramétrables pour qualifier les objets GLPI"
        },
        {
          "terme": "Inventaire",
          "definition": "Recensement et suivi de tous les éléments du parc informatique"
        },
        {
          "terme": "ITSM",
          "definition": "IT Service Management — gestion des services IT selon des référentiels"
        },
        {
          "terme": "Jointure SQL",
          "definition": "Requête SQL combinant plusieurs tables"
        },
        {
          "terme": "LAMP",
          "definition": "Linux + Apache + MySQL/MariaDB + PHP — pile logicielle pour GLPI"
        },
        {
          "terme": "LDAP",
          "definition": "Lightweight Directory Access Protocol — protocole d'accès aux annuaires (port 389)"
        },
        {
          "terme": "Lieu GLPI",
          "definition": "Localisation géographique arborescente d'un objet ou utilisateur"
        },
        {
          "terme": "MariaDB",
          "definition": "Fork open source de MySQL — SGBD recommandé pour GLPI"
        },
        {
          "terme": "Marketplace GLPI",
          "definition": "Boutique intégrée pour installer des plugins (v9.5+)"
        },
        {
          "terme": "MCD",
          "definition": "Modèle Conceptuel de Données — conception des tables avant création"
        },
        {
          "terme": "MemberOf",
          "definition": "Attribut LDAP listant les groupes AD d'un utilisateur"
        },
        {
          "terme": "mysqldump",
          "definition": "Outil de sauvegarde de base MariaDB/MySQL"
        },
        {
          "terme": "mysql_secure_installation",
          "definition": "Script de sécurisation post-installation de MariaDB"
        },
        {
          "terme": "NULL SQL",
          "definition": "Absence de valeur dans une table SQL (≠ 0, ≠ vide)"
        },
        {
          "terme": "objectguid",
          "definition": "Identifiant unique et immuable d'un objet dans l'AD, utilisé pour la sync GLPI"
        },
        {
          "terme": "PDU",
          "definition": "Power Distribution Unit — onduleur/multiprise de salle serveur"
        },
        {
          "terme": "Plan de nommage",
          "definition": "Convention définissant le format des noms d'éléments dans l'inventaire"
        },
        {
          "terme": "Plugin GLPI",
          "definition": "Extension ajoutant des fonctionnalités à GLPI sans modifier le core"
        },
        {
          "terme": "Port réseau GLPI",
          "definition": "Interface réseau d'un équipement modélisée dans GLPI"
        },
        {
          "terme": "Prise réseau GLPI",
          "definition": "Point de raccordement mural modélisé dans GLPI"
        },
        {
          "terme": "Profil GLPI",
          "definition": "Ensemble de droits + type d'interface attribué à un utilisateur"
        },
        {
          "terme": "Pull (déploiement)",
          "definition": "Mode où le client télécharge la mise à jour depuis le serveur"
        },
        {
          "terme": "Push (déploiement)",
          "definition": "Mode où le serveur envoie une mise à jour ou logiciel vers le client"
        },
        {
          "terme": "Récursivité",
          "definition": "Propagation de la visibilité d'un objet vers les sous-entités GLPI"
        },
        {
          "terme": "Règle FusionInventory",
          "definition": "Règle automatique traitant les données à l'import dans GLPI"
        },
        {
          "terme": "Règle métier ticket",
          "definition": "Règle automatique configurant un ticket à sa création selon des critères"
        },
        {
          "terme": "samaccountname",
          "definition": "Attribut AD contenant le login Windows d'un utilisateur"
        },
        {
          "terme": "Self-Service",
          "definition": "Profil GLPI utilisateur final — interface simplifiée pour soumettre des tickets"
        },
        {
          "terme": "SGBDR",
          "definition": "SGBD Relationnel — données en tables liées par des clés"
        },
        {
          "terme": "SLA ticket",
          "definition": "Service Level Agreement — délais de traitement des tickets"
        },
        {
          "terme": "SNMP",
          "definition": "Protocole d'inventaire des équipements réseau sans agent"
        },
        {
          "terme": "SQL",
          "definition": "Structured Query Language — langage d'interrogation des bases de données"
        },
        {
          "terme": "Super-Admin",
          "definition": "Profil GLPI avec tous les droits — ne jamais supprimer"
        },
        {
          "terme": "Table SQL",
          "definition": "Structure de stockage des données en lignes et colonnes"
        },
        {
          "terme": "Ticket",
          "definition": "Unité de suivi d'une demande ou d'un incident IT dans GLPI"
        },
        {
          "terme": "UTF-8 / ISO8859-1",
          "definition": "Encodages de caractères pour les fichiers texte"
        },
        {
          "terme": "Wake-on-LAN",
          "definition": "Réveil à distance d'un poste éteint depuis GLPI"
        },
        {
          "terme": "www-data",
          "definition": "Utilisateur Linux sous lequel Apache2 s'exécute"
        }
      ]
    },
    {
      "id": "itil",
      "titre": "ITIL — Gestion des Services IT",
      "emoji": "⚙️",
      "termes": [
        {
          "terme": "ACS / CSI",
          "definition": "Amélioration Continue des Services / Continual Service Improvement"
        },
        {
          "terme": "Arbre de résolution",
          "definition": "Guide de dépannage structuré utilisé par les équipes support"
        },
        {
          "terme": "ASP",
          "definition": "Application Service Provision — externalisation d'applications"
        },
        {
          "terme": "Baseline",
          "definition": "Mesure ou état de référence à un instant T, utilisé pour mesurer l'amélioration"
        },
        {
          "terme": "Big Bang (déploiement)",
          "definition": "Déploiement total simultané à 100% de la population cible"
        },
        {
          "terme": "BPO",
          "definition": "Business Process Outsourcing — externalisation de processus métier"
        },
        {
          "terme": "CAB",
          "definition": "Change Advisory Board — comité consultatif des changements normaux"
        },
        {
          "terme": "Centre de services",
          "definition": "Point de contact unique utilisateurs-DSI (SPOC)"
        },
        {
          "terme": "CI",
          "definition": "Configuration Item — tout composant du Système d'Information"
        },
        {
          "terme": "CMDB",
          "definition": "Configuration Management Data Base — BDD centralisant tous les CI"
        },
        {
          "terme": "CMS",
          "definition": "Configuration Management System — système fédérant plusieurs CMDB"
        },
        {
          "terme": "CSF",
          "definition": "Critical Success Factor — condition indispensable à la réussite"
        },
        {
          "terme": "Cycle de vie ITIL",
          "definition": "Stratégie → Conception → Transition → Exploitation → Amélioration continue"
        },
        {
          "terme": "Déculpabilisation",
          "definition": "Technique exonérant l'utilisateur pour faciliter la communication"
        },
        {
          "terme": "DML",
          "definition": "Definitive Media Library — stockage sécurisé des logiciels de référence"
        },
        {
          "terme": "DSI",
          "definition": "Direction des Systèmes d'Information"
        },
        {
          "terme": "ECAB",
          "definition": "Emergency Change Advisory Board — comité d'urgence pour les changements critiques"
        },
        {
          "terme": "Efficacité",
          "definition": "Mesure de l'atteinte des objectifs fixés"
        },
        {
          "terme": "Efficience",
          "definition": "Atteindre les objectifs en optimisant les ressources utilisées"
        },
        {
          "terme": "Erreur connue",
          "definition": "Problème avec cause ET solution identifiées"
        },
        {
          "terme": "Escalade fonctionnelle",
          "definition": "Transfert d'un incident vers un niveau supérieur ou domaine d'expertise"
        },
        {
          "terme": "Escalade hiérarchique",
          "definition": "Remontée vers la direction en cas d'incident majeur"
        },
        {
          "terme": "FMD",
          "definition": "Fiabilité / Maintenabilité / Disponibilité — critères de qualité des services"
        },
        {
          "terme": "Garantie",
          "definition": "Dimension \"fit for use\" — conditions d'utilisation assurées"
        },
        {
          "terme": "Helpdesk",
          "definition": "Point de contact unique utilisateurs-DSI pour la gestion des incidents"
        },
        {
          "terme": "Incident",
          "definition": "Évènement non planifié dégradant ou interrompant un service"
        },
        {
          "terme": "Incident majeur",
          "definition": "Incident à fort impact client nécessitant une procédure spécifique"
        },
        {
          "terme": "ISO 20000",
          "definition": "Norme internationale de management des services IT"
        },
        {
          "terme": "ITIL",
          "definition": "Information Technology Infrastructure Library — référentiel de bonnes pratiques ITSM"
        },
        {
          "terme": "KEDB",
          "definition": "Known Error Data Base — base des erreurs connues avec leurs solutions"
        },
        {
          "terme": "KPI",
          "definition": "Key Performance Indicator — indicateur clé de performance"
        },
        {
          "terme": "KPO",
          "definition": "Knowledge Process Outsourcing — externalisation de processus basés sur la connaissance"
        },
        {
          "terme": "MEP",
          "definition": "Mise En Production"
        },
        {
          "terme": "Métriques de services",
          "definition": "Données orientées client mesurant la qualité des services"
        },
        {
          "terme": "Métriques techniques",
          "definition": "Données internes mesurant les performances des composants (CPU, réseau)"
        },
        {
          "terme": "N1 / N2 / N3",
          "definition": "Niveaux de support : N1 = premier contact, N2 = expertise, N3 = éditeur/constructeur"
        },
        {
          "terme": "OLA",
          "definition": "Operational Level Agreement — accord interne entre équipes IT"
        },
        {
          "terme": "PDCA",
          "definition": "Plan-Do-Check-Act — cycle itératif d'amélioration continue"
        },
        {
          "terme": "PIR",
          "definition": "Post Implementation Review — revue post-déploiement d'un changement"
        },
        {
          "terme": "Post-Mortem",
          "definition": "Analyse rétrospective après une crise pour éviter la récidive"
        },
        {
          "terme": "Problème",
          "definition": "Cause inconnue d'un ou plusieurs incidents récurrents"
        },
        {
          "terme": "Pull (déploiement)",
          "definition": "Mode où l'utilisateur déclenche lui-même l'installation"
        },
        {
          "terme": "Push (déploiement)",
          "definition": "Mode de déploiement initié par la DSI vers les postes"
        },
        {
          "terme": "RACI",
          "definition": "Matrice définissant les rôles : Responsible, Accountable, Consulted, Informed"
        },
        {
          "terme": "Requête",
          "definition": "Demande de service ne constituant pas un incident"
        },
        {
          "terme": "RFC",
          "definition": "Request For Change — document formel déclenchant le processus de changement"
        },
        {
          "terme": "ROI",
          "definition": "Return On Investment — retour sur investissement"
        },
        {
          "terme": "Roue de Deming",
          "definition": "Représentation graphique du cycle PDCA"
        },
        {
          "terme": "Savoir",
          "definition": "Ensemble des connaissances théoriques acquises"
        },
        {
          "terme": "Savoir-être",
          "definition": "Aptitudes comportementales et relationnelles"
        },
        {
          "terme": "Savoir-faire",
          "definition": "Compétence opérationnelle acquise par la pratique"
        },
        {
          "terme": "Service",
          "definition": "Ensemble de moyens délivrant de la valeur à un client sans qu'il en supporte les risques"
        },
        {
          "terme": "SIP",
          "definition": "Service Improvement Program — programme structuré d'amélioration continue"
        },
        {
          "terme": "SKMS",
          "definition": "Service Knowledge Management System — système de gestion de la connaissance"
        },
        {
          "terme": "SLA",
          "definition": "Service Level Agreement — contrat définissant les niveaux de qualité de service"
        },
        {
          "terme": "SLM",
          "definition": "Service Level Manager — responsable de la gestion des niveaux de service"
        },
        {
          "terme": "SLR",
          "definition": "Service Level Requirement — expression des besoins du client"
        },
        {
          "terme": "SPOF",
          "definition": "Single Point Of Failure — composant unique dont la défaillance arrête tout le service"
        },
        {
          "terme": "SVI (vocal)",
          "definition": "Serveur Vocal Interactif — menu téléphonique automatisé du helpdesk"
        },
        {
          "terme": "TCO",
          "definition": "Total Cost of Ownership — coût total de possession"
        },
        {
          "terme": "TMA",
          "definition": "Tierce Maintenance Applicative — externalisation de la maintenance d'applications"
        },
        {
          "terme": "UC",
          "definition": "Underpinning Contract — contrat avec un sous-traitant externe"
        },
        {
          "terme": "Utilité",
          "definition": "Dimension \"fit for purpose\" — ce qu'apporte fonctionnellement le service"
        },
        {
          "terme": "Veille technologique",
          "definition": "Surveillance continue des évolutions IT"
        }
      ]
    },
    {
      "id": "m365",
      "titre": "Microsoft 365 & Cloud",
      "emoji": "☁️",
      "termes": [
        {
          "terme": "AccountSkuId",
          "definition": "Identifiant unique d'un plan de licence Microsoft 365"
        },
        {
          "terme": "ActiveSync",
          "definition": "Protocole de synchronisation mobile pour Exchange"
        },
        {
          "terme": "Autodiscover",
          "definition": "Mécanisme d'autoconfiguration automatique du profil Outlook/Exchange"
        },
        {
          "terme": "Azure AD / Microsoft Entra ID",
          "definition": "Service d'annuaire et d'authentification cloud de Microsoft"
        },
        {
          "terme": "Azure AD Connect",
          "definition": "Outil de synchronisation entre l'AD on-premises et Azure AD"
        },
        {
          "terme": "BCS",
          "definition": "Business Connectivity Services — service SharePoint d'accès aux données externes"
        },
        {
          "terme": "BYOD",
          "definition": "Bring Your Own Device — utilisation de l'équipement personnel au travail"
        },
        {
          "terme": "Canal mensuel",
          "definition": "Canal de mises à jour mensuelles de Microsoft 365 Apps"
        },
        {
          "terme": "Canal semi-annuel ciblé",
          "definition": "Canal de mises à jour M365 pour les groupes pilotes"
        },
        {
          "terme": "CDN",
          "definition": "Content Delivery Network — réseau de distribution de contenu"
        },
        {
          "terme": "Cloud",
          "definition": "Infrastructure informatique (calcul, stockage, apps) accessible via Internet"
        },
        {
          "terme": "Co-authoring",
          "definition": "Coédition simultanée d'un document par plusieurs utilisateurs"
        },
        {
          "terme": "Connecteur Teams",
          "definition": "Intégration d'une application tierce dans Microsoft Teams"
        },
        {
          "terme": "COPE",
          "definition": "Corporate Owned Personally Enabled — appareil pro avec usage personnel autorisé"
        },
        {
          "terme": "CYOD",
          "definition": "Choose Your Own Device — choix de l'appareil dans un catalogue d'entreprise"
        },
        {
          "terme": "DAG",
          "definition": "Database Availability Group — groupe de haute disponibilité Exchange"
        },
        {
          "terme": "Delta Sync",
          "definition": "Synchronisation différentielle Azure AD Connect"
        },
        {
          "terme": "DKIM",
          "definition": "DomainKeys Identified Mail — signature cryptographique des emails sortants"
        },
        {
          "terme": "DLP",
          "definition": "Data Loss Prevention — prévention des fuites de données"
        },
        {
          "terme": "DMARC",
          "definition": "Domain-based Message Authentication — politique d'authentification email"
        },
        {
          "terme": "ECP",
          "definition": "Exchange Control Panel — interface d'administration Exchange"
        },
        {
          "terme": "EMM",
          "definition": "Enterprise Mobile Management — gestion des appareils mobiles d'entreprise"
        },
        {
          "terme": "EOP",
          "definition": "Exchange Online Protection — protection anti-spam/malware de Microsoft"
        },
        {
          "terme": "Exchange Online",
          "definition": "Service de messagerie Microsoft 365 (version cloud d'Exchange Server)"
        },
        {
          "terme": "GPO M365",
          "definition": "Group Policy Object — utilisée pour déployer/configurer Microsoft 365 Apps"
        },
        {
          "terme": "Groupe Microsoft 365",
          "definition": "Objet Azure AD créé avec chaque équipe Teams"
        },
        {
          "terme": "HDS",
          "definition": "Hébergement de Données de Santé — certification obligatoire en France"
        },
        {
          "terme": "IaaS",
          "definition": "Infrastructure as a Service — VM et ressources réseau/stockage louées à la demande"
        },
        {
          "terme": "IMAP4",
          "definition": "Internet Message Access Protocol v4 — accès aux emails sur le serveur"
        },
        {
          "terme": "Litigation Hold",
          "definition": "Conservation des données pour des besoins légaux (Exchange)"
        },
        {
          "terme": "MAPI",
          "definition": "Messaging Application Programming Interface — protocole Outlook/Exchange"
        },
        {
          "terme": "MDA",
          "definition": "Mail Delivery Agent — service stockant les mails dans la boîte du destinataire"
        },
        {
          "terme": "MDM",
          "definition": "Mobile Device Management — gestion des appareils mobiles"
        },
        {
          "terme": "MFA / 2FA",
          "definition": "Multi-Factor Authentication — authentification à plusieurs facteurs"
        },
        {
          "terme": "MSA",
          "definition": "Mail Submission Agent — service transmettant les mails de l'utilisateur vers le MTA"
        },
        {
          "terme": "MTA",
          "definition": "Mail Transfer Agent — service de transport SMTP acheminant les mails entre serveurs"
        },
        {
          "terme": "MUA",
          "definition": "Mail User Agent — client de messagerie côté utilisateur (Outlook, Thunderbird)"
        },
        {
          "terme": "MX",
          "definition": "Mail eXchange — enregistrement DNS indiquant le serveur de réception des mails"
        },
        {
          "terme": "ODT",
          "definition": "Office Deployment Tool — outil de déploiement de Microsoft 365 Apps"
        },
        {
          "terme": "on-premises",
          "definition": "Infrastructure hébergée physiquement sur le site de l'entreprise"
        },
        {
          "terme": "onmicrosoft.com",
          "definition": "Domaine par défaut d'un tenant Microsoft 365"
        },
        {
          "terme": "OTP",
          "definition": "One-Time Password — mot de passe à usage unique"
        },
        {
          "terme": "OWA",
          "definition": "Outlook Web App — interface web d'accès à la messagerie Exchange"
        },
        {
          "terme": "PaaS",
          "definition": "Platform as a Service — plateforme de développement et d'exécution hébergée"
        },
        {
          "terme": "Password Hash Sync",
          "definition": "Synchronisation des hachages de mots de passe AD vers Azure AD"
        },
        {
          "terme": "Phishing",
          "definition": "Technique d'hameçonnage par email"
        },
        {
          "terme": "POP3",
          "definition": "Post Office Protocol v3 — téléchargement des emails depuis le serveur"
        },
        {
          "terme": "RBAC",
          "definition": "Role Based Access Control — contrôle d'accès basé sur les rôles"
        },
        {
          "terme": "Registrar",
          "definition": "Société louant des noms de domaine"
        },
        {
          "terme": "RGPD",
          "definition": "Règlement Général sur la Protection des Données"
        },
        {
          "terme": "ROI",
          "definition": "Return on Investment — retour sur investissement"
        },
        {
          "terme": "SaaS",
          "definition": "Software as a Service — application directement utilisable en ligne sans installation"
        },
        {
          "terme": "SCANPST.EXE",
          "definition": "Outil Microsoft de réparation des fichiers .pst Outlook"
        },
        {
          "terme": "SharePoint Designer",
          "definition": "Outil de personnalisation et gestion des flux SharePoint"
        },
        {
          "terme": "SharePoint Online",
          "definition": "Plateforme collaborative hébergée dans Microsoft 365"
        },
        {
          "terme": "SharePoint Server",
          "definition": "Version installée en local de SharePoint"
        },
        {
          "terme": "SMTP",
          "definition": "Simple Mail Transfer Protocol — protocole d'envoi de mails"
        },
        {
          "terme": "SPF",
          "definition": "Sender Policy Framework — enregistrement DNS listant les IP autorisées à envoyer des mails"
        },
        {
          "terme": "Spear Phishing",
          "definition": "Phishing ciblé vers une personne ou organisation spécifique"
        },
        {
          "terme": "Stream",
          "definition": "Service Microsoft 365 de stockage et diffusion de vidéos"
        },
        {
          "terme": "Tenant",
          "definition": "Instance dédiée d'un service cloud pour une organisation"
        },
        {
          "terme": "UPN",
          "definition": "User Principal Name — identifiant de connexion sous la forme `user@domaine.com`"
        },
        {
          "terme": "Versioning SharePoint",
          "definition": "Historique des versions des fichiers dans SharePoint/OneDrive"
        },
        {
          "terme": "Voisinage DNS",
          "definition": "Achat de domaines similaires pour des attaques de phishing"
        },
        {
          "terme": "Writeback",
          "definition": "Synchronisation bidirectionnelle Azure AD Connect"
        },
        {
          "terme": ".ost",
          "definition": "Offline Storage Table — cache local Outlook de la boîte Exchange"
        },
        {
          "terme": ".pst",
          "definition": "Personal Storage Table — fichier d'archive Outlook local"
        }
      ]
    },
    {
      "id": "services-transverses-ms",
      "titre": "Microsoft — Services transverses",
      "emoji": "🪟",
      "termes": [
        {
          "terme": "ADK",
          "definition": "Assessment and Deployment Kit — suite d'outils Microsoft pour le déploiement (inclut WSIM, DISM, WinPE…). Téléchargeable gratuitement"
        },
        {
          "terme": "Bail",
          "definition": "Paramètres IP attribués pour une durée limitée. Ex : IP `192.168.0.50` pendant 2 jours"
        },
        {
          "terme": "Bare-Metal",
          "definition": "Déploiement sur disque vide (poste neuf ou remis à zéro) sans conservation des données existantes"
        },
        {
          "terme": "BDD.log",
          "definition": "Journal principal MDT — référence pour le diagnostic des erreurs de déploiement"
        },
        {
          "terme": "boot.wim",
          "definition": "Fichier WIM contenant WinPE — image de démarrage distribuée par WDS en phase 1"
        },
        {
          "terme": "Bootstrap.ini",
          "definition": "Fichier INI lu au chargement de WinPE — contient les informations de connexion au partage MDT"
        },
        {
          "terme": "CAL RDS",
          "definition": "Client Access License — licence par utilisateur ou par périphérique obligatoire pour utiliser RDS en production"
        },
        {
          "terme": "Client léger",
          "definition": "Terminal ne faisant que l'affichage et la saisie, toute la puissance vient du serveur. Ex : un Raspberry Pi connecté à un serveur RDS"
        },
        {
          "terme": "Client lourd",
          "definition": "Poste de travail classique exécutant les applications localement"
        },
        {
          "terme": "Collection",
          "definition": "Regroupement de serveurs RD Session Host fournissant un service homogène. Obligatoire pour publier bureaux et apps"
        },
        {
          "terme": "ConfigMgr / SCCM",
          "definition": "Configuration Manager — solution complète de gestion du cycle de vie des équipements (déploiement, mises à jour, inventaire)"
        },
        {
          "terme": "CustomSettings.ini",
          "definition": "Fichier INI lu pendant le déploiement — contient toutes les règles d'automatisation (Skip, nommage, domaine, région…)"
        },
        {
          "terme": "DC",
          "definition": "Domain Controller (Contrôleur de domaine) — serveur qui héberge l'AD et authentifie. Ex : `SRV-DC01`"
        },
        {
          "terme": "Délégation d'informations d'identification",
          "definition": "Mécanisme Windows (Kerberos CredSSP) permettant de transmettre automatiquement les identifiants de l'utilisateur au serveur RDS. Activé via GPO"
        },
        {
          "terme": "Deployment Share",
          "definition": "Partage réseau MDT contenant OS, séquences, apps, pilotes. Ex : `\\\\SRV-MDT\\DeploymentShare$`"
        },
        {
          "terme": "Deployment Workbench",
          "definition": "Console graphique de gestion MDT. Point d'entrée pour toute configuration du partage de déploiement"
        },
        {
          "terme": "Étendue",
          "definition": "Plage d'adresses qu'un serveur DHCP peut distribuer sur un sous-réseau donné"
        },
        {
          "terme": "EventService",
          "definition": "Directive CustomSettings.ini activant le monitoring MDT. Ex : `EventService=http://W19-MDT1:9800`"
        },
        {
          "terme": "Exclusion",
          "definition": "Adresses de l'étendue jamais distribuées automatiquement (réservées aux équipements à IP fixe)"
        },
        {
          "terme": "Groupe d'images",
          "definition": "Conteneur logique dans WDS regroupant des images d'installation. Ex : groupe \"Windows10\" contenant les éditions Pro et Education"
        },
        {
          "terme": "GUID",
          "definition": "Identifiant unique d'une application dans MDT — visible dans les propriétés de l'application"
        },
        {
          "terme": "IIS",
          "definition": "Internet Information Services — serveur web Microsoft. Requis par RD Web Access pour servir le portail `/RDWeb`"
        },
        {
          "terme": "Image de capture",
          "definition": "Image de boot spéciale permettant de capturer le système d'un poste de référence pour créer une image WIM personnalisée"
        },
        {
          "terme": "Image de partition",
          "definition": "Clone secteur par secteur d'un disque ou d'une partition — dépendant du matériel source"
        },
        {
          "terme": "In-place Upgrade",
          "definition": "Mise à niveau de version Windows sur le poste en service, avec conservation de l'environnement complet"
        },
        {
          "terme": "install.wim",
          "definition": "Fichier WIM contenant le ou les systèmes d'exploitation à installer — image d'installation distribuée en phase 2"
        },
        {
          "terme": "Installation silencieuse",
          "definition": "Installation sans interface graphique. Paramètres courants : `/qn` (MSI), `/quiet /norestart` (EXE)"
        },
        {
          "terme": "LiteTouch",
          "definition": "Mode de déploiement MDT avec interaction utilisateur minimale (vs ZeroTouch qui est totalement automatisé via ConfigMgr)"
        },
        {
          "terme": "LiteTouchPE.wim",
          "definition": "Image WinPE générée par MDT, distribuée par WDS aux postes clients PXE pour initier le déploiement MDT"
        },
        {
          "terme": "MandatoryApplications",
          "definition": "Paramètre CustomSettings.ini forçant l'installation d'une app via son GUID. Ex : `MandatoryApplications001={GUID}`"
        },
        {
          "terme": "mstsc.exe",
          "definition": "Exécutable du client \"Connexion Bureau à distance\" intégré à Windows"
        },
        {
          "terme": "NBP",
          "definition": "Network Boot Program — premier fichier chargé par le client PXE depuis le serveur TFTP. Ex : `wdsnbp.com`"
        },
        {
          "terme": "Option DHCP 66",
          "definition": "Indique au client PXE le nom ou l'IP du serveur TFTP (= serveur WDS)"
        },
        {
          "terme": "Option DHCP 66/67",
          "definition": "Options DHCP indiquant au client PXE l'adresse du serveur de démarrage (66) et le nom du fichier d'amorçage (67)"
        },
        {
          "terme": "Option DHCP 67",
          "definition": "Indique au client PXE le nom du fichier d'amorçage à télécharger via TFTP"
        },
        {
          "terme": "OU",
          "definition": "Organizational Unit — conteneur AD pour organiser objets et appliquer des GPO ciblées"
        },
        {
          "terme": "Out-of-Box Drivers",
          "definition": "Dossier MDT pour les pilotes matériels à déployer automatiquement"
        },
        {
          "terme": "RD Connection Broker",
          "definition": "Composant qui dirige les connexions entrantes vers le bon serveur Session Host et reconnecte les sessions déconnectées"
        },
        {
          "terme": "RD Gateway",
          "definition": "Composant permettant l'accès RDS sécurisé depuis Internet via HTTPS/443 (évite d'exposer le port 3389)"
        },
        {
          "terme": "RD Licensing",
          "definition": "Service de gestion des licences CAL RDS (Client Access License)"
        },
        {
          "terme": "RD Session Host",
          "definition": "Serveur hébergeant les sessions utilisateurs et les applications publiées"
        },
        {
          "terme": "RD Web Access",
          "definition": "Portail web (HTTPS) permettant l'accès aux ressources RDS depuis un navigateur"
        },
        {
          "terme": "RDS",
          "definition": "Remote Desktop Services — service d'accès bureau à distance (prérequis : socle ADDS/DNS/DHCP)"
        },
        {
          "terme": "RemoteApp",
          "definition": "Application publiée via RDS qui s'affiche sur le poste client comme si elle y était installée. Ex : Word hébergé sur le serveur, fenêtré sur le bureau local"
        },
        {
          "terme": "Replace",
          "definition": "Remplacement d'un poste physique par un autre avec migration des données via USMT"
        },
        {
          "terme": "Réservation",
          "definition": "Adresse DHCP toujours attribuée à la même machine via son adresse MAC"
        },
        {
          "terme": "Session multisession",
          "definition": "Capacité de RDS à accueillir plusieurs utilisateurs simultanément sur le même serveur OS"
        },
        {
          "terme": "Shadow / Cliché instantané",
          "definition": "Fonctionnalité permettant à un admin de voir ou contrôler la session d'un utilisateur en temps réel"
        },
        {
          "terme": "Skip parameter",
          "definition": "Paramètre CustomSettings.ini commençant par `Skip` permettant de passer une étape interactive. Ex : `SkipComputerName=YES`"
        },
        {
          "terme": "Task Sequence",
          "definition": "Séquence de tâches MDT — ensemble ordonné d'opérations automatisées exécutées lors du déploiement (partitionnement, application WIM, installation apps, jonction domaine…)"
        },
        {
          "terme": "unattend.xml",
          "definition": "Fichier de réponse XML automatisant les réponses aux questions du processus d'installation Windows"
        },
        {
          "terme": "UPD",
          "definition": "User Profile Disk — disque virtuel (`.vhdx`) par utilisateur stocké sur un partage réseau, permettant de conserver le profil entre les sessions sur différents Session Hosts"
        },
        {
          "terme": "USMT",
          "definition": "User State Migration Tool — outil Microsoft pour migrer les profils et données utilisateurs d'un poste à un autre (scénario Replace)"
        },
        {
          "terme": "VDI",
          "definition": "Virtual Desktop Infrastructure — chaque utilisateur dispose d'une VM dédiée accessible via RDS"
        },
        {
          "terme": "WDS/MDT",
          "definition": "Windows Deployment Services / Microsoft Deployment Toolkit — déploiement automatisé de systèmes"
        },
        {
          "terme": "Webfeed",
          "definition": "Flux RSS applicatif fourni par RD Web Access, permettant au client Windows d'énumérer et synchroniser automatiquement les RemoteApp disponibles"
        },
        {
          "terme": "Wipe-and-Load",
          "definition": "Réinstallation complète de l'OS avec conservation des données utilisateurs (sauvegarde avant, restauration après)"
        },
        {
          "terme": "Work Resources",
          "definition": "Dossier créé dans le menu Démarrer du client après abonnement au flux RemoteApp, contenant les raccourcis vers les applications publiées"
        },
        {
          "terme": "Workgroup",
          "definition": "Mode de fonctionnement sans domaine, gestion locale uniquement — pas d'AD"
        },
        {
          "terme": "WSIM",
          "definition": "Windows System Image Manager — outil graphique de l'ADK pour créer et modifier les fichiers de réponse unattend.xml"
        }
      ]
    }
  ]
};
