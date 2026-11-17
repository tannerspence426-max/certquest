CONTENT.certs.np = {
id:'np', short:'Network+', name:'CompTIA Network+', code:'N10-009', color:'#22c55e', pass:'720 / 900', minutes:90, maxQ:90, group:'Network+',
domains:[{id:'1',t:'Networking Concepts',w:23},{id:'2',t:'Network Implementation',w:20},{id:'3',t:'Network Operations',w:19},{id:'4',t:'Network Security',w:14},{id:'5',t:'Network Troubleshooting',w:24}],
lessons:[
{id:'np-1',d:'1',t:'The OSI model & encapsulation',md:`
The **OSI model** splits networking into 7 layers so we can talk about where something happens.
[[vis:osi]]
!mnem Layer 1 → 7: "**P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way" (Physical, Data Link, Network, Transport, Session, Presentation, Application). Layer 7 → 1: "**A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing".

## What lives where
| Layer | Unit (PDU) | Examples | Devices |
|---|---|---|---|
| 7 Application | Data | HTTP, DNS, SMTP | Proxy, WAF |
| 6 Presentation | Data | TLS, JPEG, encoding | — |
| 5 Session | Data | RPC, NetBIOS | — |
| 4 Transport | Segment / datagram | TCP, UDP, ports | Firewall (L4) |
| 3 Network | Packet | IP, ICMP, routing | Router, L3 switch |
| 2 Data Link | Frame | Ethernet, MAC, ARP, VLAN | Switch, AP, bridge |
| 1 Physical | Bits | Cables, radio, voltages | Hub, repeater, transceiver |

## Encapsulation
When you send data, each layer **wraps** it with its own header: Data → **Segment** (adds ports) → **Packet** (adds IPs) → **Frame** (adds MACs + trailer FCS) → **Bits**. The receiver **de‑encapsulates** in reverse.
[[vis:tcpip]]
!key TCP flags: **SYN** (start), **ACK** (acknowledge), **FIN** (finish), **RST** (reset/abort), **PSH**, **URG**. The 3‑way handshake is SYN → SYN‑ACK → ACK.

!exam Troubleshooting "bottom‑up" starts at Layer 1 (is it plugged in?). "Top‑down" starts at the application.
`},
{id:'np-2',d:'1',t:'Appliances, topologies & cloud networking',md:`
## Appliances
Router, switch (L2/L3), **firewall** (NGFW does app‑aware L7 inspection), **IDS** (detects/alerts) / **IPS** (blocks inline), **load balancer** (spreads traffic across servers), **proxy** (forward proxy for users, reverse proxy in front of servers), **NAS** / **SAN**, **wireless AP & controller**, **CDN** (caches content close to users), **VPN concentrator**, **QoS** devices, **TTL** concept. Physical vs **virtual appliances** (NFV).

## Topologies
[[vis:topologies]]
| Topology | Notes |
|---|---|
| **Star / hub‑and‑spoke** | All to a central switch; most LANs. Central point of failure |
| **Mesh** | Every node to many/all others; redundant (WAN cores, wireless mesh) |
| **Hybrid** | Mix |
| **Point‑to‑point** | Two sites directly |
| **Spine and leaf** | Data centers: every leaf connects to every spine → predictable latency |
| **Three‑tier** | Core / distribution / access layers (campus networks) |
| **Collapsed core** | Core + distribution merged for smaller sites |

**North‑south traffic** enters/leaves the data center; **east‑west** moves between servers inside it.

## Cloud networking
- **VPC** (virtual private cloud), **subnets**, **security groups** (stateful, per instance) and **network security lists/ACLs** (stateless, per subnet), **internet gateway**, **NAT gateway**, **VPN / Direct Connect** to on‑prem.
- Service models **IaaS / PaaS / SaaS**; deployment **public / private / hybrid**; **scalability**, **elasticity**, **multitenancy**.
`},
{id:'np-3',d:'1',t:'Ports, protocols & traffic types',md:`
## Ports & protocols (Network+ list)
| Port | Protocol | | Port | Protocol |
|---|---|---|---|---|
| 20/21 | FTP | | 389 | LDAP |
| 22 | SSH/SFTP | | 443 | HTTPS |
| 23 | Telnet | | 445 | SMB |
| 25 | SMTP | | 514 | Syslog |
| 53 | DNS | | 587 | SMTP (TLS submission) |
| 67/68 | DHCP | | 636 | LDAPS |
| 69 | TFTP | | 1433 | MS SQL |
| 80 | HTTP | | 3306 | MySQL |
| 123 | NTP | | 3389 | RDP |
| 161/162 | SNMP | | 5060/5061 | SIP |

## IP protocol types (not ports!)
**ICMP** (ping, traceroute), **TCP**, **UDP**, **GRE** (generic tunneling), **IPsec**: **AH** (integrity/auth only) and **ESP** (encryption + integrity), **IKE** (UDP 500) negotiates keys.

## Traffic types
- **Unicast** – one to one.
- **Broadcast** – one to all in a subnet (IPv4 only, e.g., ARP, DHCP Discover).
- **Multicast** – one to a subscribed group (video streams, routing protocols; 224.0.0.0/4).
- **Anycast** – one to the nearest of many (DNS root servers, IPv6).

!tip IPv6 has **no broadcast**; it uses multicast instead.
`},
{id:'np-4',d:'1',t:'IPv4 addressing & subnetting',md:`
## Address classes (legacy but tested)
| Class | First octet | Default mask |
|---|---|---|
| A | 1–126 | /8 |
| B | 128–191 | /16 |
| C | 192–223 | /24 |
| D | 224–239 | Multicast |
| E | 240–255 | Experimental |
127 = loopback. **RFC1918 private**: 10/8, 172.16/12, 192.168/16. **APIPA**: 169.254/16. **CGNAT**: 100.64/10.

## Subnetting in 4 steps
[[vis:subnet]]
1. **Host bits** = 32 − prefix. Example /26 → 6 host bits.
2. **Block size** (the "magic number") = 256 − the mask's interesting octet. /26 → mask 255.255.255.**192** → 256−192 = **64**.
3. **Networks** start at multiples of the block: .0, .64, .128, .192.
4. **Usable hosts** = 2^hostbits − 2. /26 → 64 − 2 = **62**. The first address is the **network ID**, the last is **broadcast**.

| CIDR | Mask | Block | Usable hosts |
|---|---|---|---|
| /24 | 255.255.255.0 | 256 | 254 |
| /25 | .128 | 128 | 126 |
| /26 | .192 | 64 | 62 |
| /27 | .224 | 32 | 30 |
| /28 | .240 | 16 | 14 |
| /29 | .248 | 8 | 6 |
| /30 | .252 | 4 | 2 (point‑to‑point links) |
| /31 | .254 | 2 | 2 (RFC 3021 P2P) |

!mnem Mask octet values go **128, 192, 224, 240, 248, 252, 254, 255** – "**1 2 8 , 1 9 2 , 2 2 4 …**" add the next half each time (128 + 64 + 32 + 16 + 8 + 4 + 2 + 1).

**Example:** Which subnet is 192.168.10.77/27 in? Block = 32 → subnets .0, .32, **.64**, .96. So network 192.168.10.64, broadcast .95, hosts .65–.94.

**VLSM** lets you use different mask sizes in one network to avoid waste. **Supernetting/summarization** combines routes.

!tip Use the **Subnet Sprint** game for unlimited random practice.
`},
{id:'np-5',d:'1',t:'IPv6, media & modern network environments',md:`
## IPv6
- 128‑bit, 8 groups of hex. Shorten by dropping leading zeros and replacing one run of all‑zero groups with "::".
- **Global unicast** 2000::/3, **link‑local** fe80::/10, **unique local** fc00::/7, **multicast** ff00::/8, loopback ::1.
- **SLAAC** – hosts build their own address from router advertisements (**NDP** replaces ARP). **EUI‑64** builds the interface ID from the MAC.
- Transition: **dual stack** (run both), **tunneling** (6to4, Teredo), **NAT64**.

## Transmission media & transceivers
- Copper: **Cat 5e/6/6a/7/8**, **twinax** (short data‑center DAC), **coax**. Shielded (STP) vs unshielded.
- Fiber: **single‑mode** (km, laser, yellow jacket) vs **multimode** (hundreds of meters, aqua/orange).
- Transceivers: **SFP** (1G), **SFP+** (10G), **QSFP/QSFP28** (40/100G). **BiDi**.
- Connectors: RJ45, RJ11, F‑type, **LC, SC, ST, MPO**; **UPC vs APC** polish (APC is angled/green).
- Ethernet standards: 1000BASE‑T, 10GBASE‑T, 1000BASE‑SX/LX, 10GBASE‑SR (short, multimode)/LR (long, single‑mode).
- **Wireless**: 802.11, cellular, satellite. **Plenum vs riser** cable.

## Modern environments
- **SDN** – central controller programs the network. **SD‑WAN** – smart WAN over multiple links (broadband, LTE, MPLS), application‑aware routing, zero‑touch provisioning.
- **VXLAN** – stretches Layer 2 over Layer 3 (data center interconnect), 16 million segments.
- **Zero Trust Architecture (ZTA)** – policy‑based authentication, least privilege, no implicit trust.
- **SASE / SSE** – security delivered from the cloud (SWG, CASB, ZTNA, FWaaS) combined with SD‑WAN.
- **Infrastructure as Code (IaC)** – define networks in code (templates/playbooks), version control, avoid **configuration drift**.
`},
{id:'np-6',d:'2',t:'Routing & switching',md:`
## Routing
- **Static routes** – manually configured, predictable. **Default route** 0.0.0.0/0 = "gateway of last resort".
- **Dynamic routing protocols**:
| Protocol | Type | Notes |
|---|---|---|
| **OSPF** | Link state | Open standard, areas, cost based on bandwidth |
| **EIGRP** | Advanced distance vector | Cisco origin, fast convergence |
| **BGP** | Path vector | Routes the **internet** between autonomous systems |
| RIP | Distance vector | Old, max 15 hops |
- **Administrative distance** – how trusted a route source is (lower wins): connected 0, static 1, EIGRP 90, OSPF 110, RIP 120.
- **Prefix length** – longest (most specific) match wins first.
- **FHRP** – first‑hop redundancy (VRRP, HSRP) gives hosts a virtual gateway IP shared by two routers.
- **NAT / PAT** – translate private to public; PAT (overload) uses ports so many hosts share one IP.
- **Subinterfaces** (router‑on‑a‑stick) route between VLANs.

## Switching
- **VLANs** split broadcast domains. **Native VLAN** = untagged traffic on a trunk (change from VLAN 1). **Voice VLAN** for phones.
- **802.1Q trunking** tags frames with VLAN IDs between switches.
- **STP (802.1D) / RSTP** – prevents switching loops; blocks redundant links. **Root bridge** election.
- **Link aggregation (LACP / 802.3ad)** – bundles ports for bandwidth + redundancy.
- **Speed & duplex** – mismatch causes errors/slowness. **MTU** 1500 default; **jumbo frames** 9000 for storage.
- **Port mirroring (SPAN)** – copies traffic to a monitoring port.

!exam Broadcast storm + network crawling after someone plugged both ends of a cable into the same switch → loop → STP not enabled.
`},
{id:'np-7',d:'2',t:'Wireless & physical installations',md:`
## Wireless
- Bands **2.4 / 5 / 6 GHz**; channel width 20/40/80/160 MHz (wider = faster but fewer channels). **Non‑overlapping 2.4 GHz channels: 1, 6, 11**. **DFS** channels in 5 GHz must avoid radar.
- **SSID**, **BSSID** (AP's MAC), **ESSID** (same SSID across multiple APs for roaming).
- **Network types**: infrastructure, **ad hoc**, **mesh**, point‑to‑point.
- **Antennas**: **omnidirectional** (all around) vs **directional** (Yagi, parabolic – long point‑to‑point links).
- **Autonomous vs lightweight APs** (managed by a **wireless LAN controller**).
- Security: **WPA2/WPA3**, **PSK vs Enterprise (802.1X/EAP + RADIUS)**, **captive portal** for guests.
- **Site survey** and **heat maps** plan AP placement.

## Physical installation
- **Racks**: **U** = 1.75 inches; 42U common. **Port‑side intake vs exhaust**, **hot aisle/cold aisle** design.
- **MDF** (main distribution frame) vs **IDF** (intermediate distribution frames per floor).
- **Patch panels**, **fiber distribution panels**, **cable management**, **locking cabinets**.
- **Power**: **UPS**, **PDU** (power distribution unit), **power load**, **voltage**, generator.
- **Environment**: temperature, **humidity**, **fire suppression** (clean agent, pre‑action sprinklers), **HVAC**.
`},
{id:'np-8',d:'3',t:'Operations: documentation, monitoring & resilience',md:`
## Documentation
**Physical vs logical diagrams**, **rack diagrams**, **cable maps/labels**, **network layer diagrams (L1/L2/L3)**, **asset inventory**, **IPAM**, **SLAs**, **wireless survey/heat maps**, **baseline configurations**, **life‑cycle management** (EOL/EOS, software management, decommissioning), **change management**, **configuration management** (production config, backup config, baseline/golden config).

## Monitoring
[[vis:siem]]
- **SNMP** – v1/v2c use **community strings** (plain text); **v3** adds auth + encryption. **MIB** = database of OIDs; **traps** = device‑initiated alerts (UDP 162).
- **Flow data** (NetFlow/IPFIX) – who talks to whom, how much.
- **Packet capture** (Wireshark/tcpdump), **port mirroring**, **baseline metrics** and **anomaly alerting**.
- **Syslog** (UDP 514) collected in a **SIEM**; **log aggregation**; **API integrations**.
- Metrics: bandwidth, **latency**, **jitter**, **packet loss**, **CPU/memory**, **interface errors** (CRC, runts, giants), **uptime**.

## Disaster recovery & high availability
- **RPO** (max data loss, measured in time) and **RTO** (max downtime). **MTTR** (mean time to repair), **MTBF** (mean time between failures).
- Sites: **cold** (space/power only), **warm** (some equipment), **hot** (ready to go). **Active‑active** vs **active‑passive**.
- **Testing**: tabletop exercises, validation tests.

## Network services
- **DHCP**: scope, lease time, **reservations**, **exclusions**, options (gateway, DNS), **DHCP relay / IP helper** (forwards DHCP across subnets).
- **DNS**: records (A, AAAA, CNAME, MX, TXT, NS, SOA, PTR), **forward vs reverse zones**, **primary vs secondary**, **recursive vs authoritative**, **DNSSEC**, **DoH/DoT** (DNS over HTTPS/TLS), **hosts file**.
- **NTP / PTP** (precision time), **NTS** (secure NTP).

## Access & management
**Site‑to‑site VPN**, **client‑to‑site VPN** (full tunnel vs **split tunnel**), **clientless VPN** (browser), **SSH**, **GUI**, **API**, **console** (out‑of‑band via console server/modem), **jump box/bastion host**, **in‑band vs out‑of‑band management**.
`},
{id:'np-9',d:'4',t:'Network security: concepts, attacks & hardening',md:`
## Concepts
- **CIA triad**, **encryption in transit / at rest**, **PKI and certificates** (self‑signed vs CA‑signed), **IAM**: **authentication** (MFA, SSO, **RADIUS**, **LDAP**, **SAML**, **TACACS+**, time‑based auth), **authorization** (least privilege, **RBAC**), **geofencing**, **honeypots/honeynets**, **risk** terms (vulnerability, exploit, threat, risk).
- **Audits & compliance**: **PCI DSS**, **GDPR**, **data locality**.
- **Segmentation**: separate **IoT/IIoT**, **SCADA/ICS/OT**, **guest**, **BYOD** networks.

## Attacks
**DoS/DDoS**, **VLAN hopping** (double tagging, switch spoofing), **MAC flooding** (fills CAM table so switch floods like a hub), **ARP poisoning/spoofing**, **DNS poisoning/spoofing**, **rogue devices** (rogue DHCP server, **rogue AP**), **evil twin**, **on‑path**, **social engineering** (phishing, dumpster diving, shoulder surfing, tailgating), **malware**.

## Defenses
- **Device hardening**: disable unused ports/services, change default passwords, update firmware.
- **NAC**: **port security** (limit MAC addresses per port), **802.1X** (port‑based auth via RADIUS), **MAC filtering**.
- **Key management**, **security rules**: **ACLs** (implicit deny at the end!), **URL filtering**, **content filtering**.
- **Zones**: trusted vs untrusted, **screened subnet (DMZ)** for public‑facing servers.
[[vis:dmz]]
- **DHCP snooping** (blocks rogue DHCP), **Dynamic ARP Inspection**, **BPDU guard / root guard** (protect STP).

!exam ACL rules are processed **top‑down; first match wins**, and there's an **implicit deny all** at the end.
`},
{id:'np-10',d:'5',t:'Troubleshooting method & cabling/physical issues',md:`
## Methodology (same 6 steps as A+, with a few details)
1. **Identify the problem** – gather info, question users, identify symptoms, determine if anything changed, duplicate the problem, approach multiple problems individually.
2. **Establish a theory** – question the obvious; consider **top‑to‑bottom/bottom‑to‑top OSI** or **divide and conquer**.
3. **Test the theory** – if confirmed, next steps; if not, new theory or **escalate**.
4. **Plan of action** and identify potential effects → **implement** or escalate.
5. **Verify full system functionality** and implement preventive measures.
6. **Document** findings, actions, outcomes, lessons learned.

## Cabling & interface issues
| Issue | Clue |
|---|---|
| Incorrect cable type (crossover vs straight, single vs multimode) | No link |
| **Signal degradation**: crosstalk, interference, **attenuation** | Errors over long runs (>100 m copper) |
| Improper termination / bent pins | Intermittent link |
| **TX/RX transposed** (fiber) | No link on fiber – swap strands |
| Interface counters: **CRC errors**, **runts** (too small), **giants** (too large), **drops** | Bad cable, duplex mismatch, MTU |
| Port status: **error disabled**, **administratively down**, **suspended** | Port security violation or shut down |
| PoE: power budget exceeded, wrong standard | Device won't power on |
| Transceiver mismatch / signal strength | Wrong SFP type or dirty fiber |

## Hardware tools
**Cable tester**, **TDR** (copper) / **OTDR** (fiber) find break distance, **toner/probe**, **light meter** (fiber), **Wi‑Fi analyzer**, **spectrum analyzer**, **multimeter**, **visual fault locator**, **loopback adapter**, **network tap**, **punchdown tool**, **crimper**.
`},
{id:'np-11',d:'5',t:'Troubleshooting services, performance & software tools',md:`
## Common service issues
- **Switching**: STP issues (loops, root bridge placement), **incorrect VLAN assignment**, **ACLs**.
- **Routing**: **missing routes**, **routing loops**, **wrong default gateway**, **address pool exhaustion**, **incorrect subnet mask**, **duplicate IP/MAC**, **DNS misconfiguration**, **NTP issues**, **blocked services/ports**, **certificate issues**.

## Performance issues
**Congestion/contention**, **bottlenecking**, **bandwidth** vs **throughput** (theoretical vs actual), **latency**, **packet loss**, **jitter**. Wireless: **interference** (channel overlap), **signal degradation/loss**, **insufficient coverage**, **client disassociation**, **roaming misconfiguration**, **wrong antenna placement**.

## Software tools
[[vis:wireshark]]
[[vis:nmap]]
| Tool | Use |
|---|---|
| **Protocol analyzer** (Wireshark/tcpdump) | Capture & decode packets |
| **nmap** | Port and host discovery scans |
| **ping / traceroute (tracert) / mtr / pathping** | Reachability & path |
| **nslookup / dig** | DNS queries |
| **ipconfig / ifconfig / ip** | Interface config |
| **arp -a** | View MAC‑to‑IP cache |
| **netstat / ss** | Connections & listening ports |
| **tcpdump** | CLI capture on Linux |
| **LLDP / CDP** | Discover neighboring devices |
| **speed tester / iperf** | Throughput |
| **show** commands | show interface, show config, show route, show mac‑address‑table, show arp, show vlan, show power |

!exam "Users get 169.254 addresses on one VLAN only" → DHCP relay (IP helper) missing on that VLAN's router interface, or DHCP scope exhausted.
`},
],
qs:[
['np-1','At which OSI layer do routers operate?',['Layer 3 – Network','Layer 2 – Data Link','Layer 4 – Transport','Layer 1 – Physical'],'Routers forward packets using IP addresses at Layer 3.','osi'],
['np-1','Which PDU is used at the Data Link layer?',['Frame','Packet','Segment','Bit'],'Layer 2 PDU = frame.'],
['np-1','TLS encryption is most closely associated with which OSI layer?',['Presentation (6)','Session (5)','Transport (4)','Network (3)'],'Encryption/formatting is a Presentation layer function (in OSI terms).'],
['np-1','Which TCP flag immediately aborts a connection?',['RST','FIN','SYN','PSH'],'RST resets/aborts; FIN gracefully closes.'],
{t:'order',l:'np-1',q:'Order the OSI layers from Layer 1 to Layer 7.',items:['Physical','Data Link','Network','Transport','Session','Presentation','Application'],e:'Please Do Not Throw Sausage Pizza Away.',v:'osi'},
{t:'order',l:'np-1',q:'Order the TCP three‑way handshake.',items:['SYN','SYN-ACK','ACK'],e:'Client SYN, server SYN‑ACK, client ACK.'},
['np-1','Port numbers are part of which OSI layer?',['Transport','Network','Session','Data Link'],'TCP/UDP ports are Layer 4.'],
['np-1','A technician starts troubleshooting by checking cables and link lights. Which approach is this?',['Bottom‑up','Top‑down','Divide and conquer','Follow the path'],'Starting at Layer 1 = bottom‑up.'],
{t:'match',l:'np-1',q:'Match each device to its OSI layer.',pairs:[['Hub','Layer 1'],['Switch','Layer 2'],['Router','Layer 3'],['Stateful firewall (ports)','Layer 4'],['Web application firewall','Layer 7']],e:'Hubs repeat bits, switches use MACs, routers use IPs, L4 firewalls use ports, WAFs inspect HTTP.'},
['np-2','Which device distributes incoming web requests across several servers?',['Load balancer','Proxy server','IDS','Bridge'],'Load balancers spread traffic for performance and availability.'],
['np-2','What is the difference between an IDS and an IPS?',['An IPS sits inline and can block traffic; an IDS only detects and alerts','An IDS blocks; an IPS only logs','They are identical','An IPS works only on wireless'],'IPS = prevention (inline), IDS = detection (passive).'],
['np-2','Which data center topology connects every leaf switch to every spine switch?',['Spine and leaf','Three‑tier','Bus','Ring'],'Spine‑and‑leaf provides consistent hop counts.','topologies'],
['np-2','Traffic moving between servers inside a data center is called:',['East‑west','North‑south','Ingress','Egress'],'East‑west = lateral, inside the DC.'],
['np-2','Which topology provides the most redundancy but is the most expensive?',['Full mesh','Star','Bus','Point‑to‑point'],'Full mesh connects every node to every other.','topologies'],
['np-2','In a cloud VPC, which component lets private instances reach the internet without accepting inbound connections?',['NAT gateway','Internet gateway only','Security group','Direct Connect'],'NAT gateways allow outbound‑only access for private subnets.'],
['np-2','Which caches website content on servers geographically close to users?',['CDN','SAN','VPN','NAS'],'Content Delivery Networks reduce latency.'],
['np-2','A cloud security group is:',['A stateful firewall applied to instances','A stateless subnet ACL','An Active Directory group','A VLAN'],'Security groups are stateful and attach to instances/NICs.'],
['np-3','Which port does TFTP use?',['UDP 69','TCP 21','UDP 161','TCP 22'],'TFTP uses UDP 69.'],
['np-3','Which port is used by Syslog?',['UDP 514','TCP 445','UDP 123','TCP 636'],'Syslog uses UDP 514.'],
['np-3','Which IPsec protocol provides encryption?',['ESP','AH','GRE','IKE only'],'ESP encrypts; AH only authenticates.'],
['np-3','Which traffic type is delivered to the nearest of several servers sharing the same address?',['Anycast','Multicast','Broadcast','Unicast'],'Anycast routes to the topologically nearest node.'],
['np-3','Which port is used by LDAPS?',['636','389','443','3268'],'LDAP over TLS uses 636.'],
['np-3','Which protocol is used by ping?',['ICMP','UDP','TCP','GRE'],'Ping sends ICMP echo requests.'],
['np-3','IPv6 does not support which traffic type?',['Broadcast','Multicast','Anycast','Unicast'],'IPv6 replaced broadcast with multicast.'],
['np-3','Which ports are used by SIP? (Choose two.)',['5060','5061','3389','1433','69'],'SIP uses 5060 (clear) and 5061 (TLS).',[0,1]],
['np-3','Which protocol and port does Microsoft SQL Server use by default?',['TCP 1433','TCP 3306','TCP 5432','UDP 1434 only'],'MS SQL default: TCP 1433. MySQL is 3306.'],
['np-3','Which protocol encapsulates many protocols in a simple tunnel without encryption?',['GRE','ESP','TLS','SSH'],'GRE tunnels without encryption; often paired with IPsec.'],
['np-4','How many usable hosts are on a /27 network?',['30','32','62','14'],'2^5 − 2 = 30.','subnet'],
['np-4','What is the network address of 192.168.5.100/26?',['192.168.5.64','192.168.5.96','192.168.5.0','192.168.5.128'],'Block size 64: .0, .64, .128 → .100 is in .64.','subnet'],
['np-4','What is the broadcast address of 10.1.1.17/28?',['10.1.1.31','10.1.1.15','10.1.1.32','10.1.1.255'],'Block 16: .16–.31; broadcast .31.'],
['np-4','Which subnet mask provides exactly 2 usable hosts for a point‑to‑point link (classic method)?',['/30 (255.255.255.252)','/29','/28','/24'],'/30 = 4 addresses, 2 usable.'],
['np-4','Which address is in the CGNAT shared address range?',['100.64.10.5','172.15.0.1','192.0.2.1','169.254.1.1'],'100.64.0.0/10 is reserved for carrier‑grade NAT.'],
['np-4','A 172.20.0.0 address with no subnetting belongs to which class and default mask?',['Class B, /16','Class A, /8','Class C, /24','Class D, none'],'First octet 128–191 = Class B.'],
['np-4','What is the dotted‑decimal mask for /21?',['255.255.248.0','255.255.240.0','255.255.252.0','255.255.255.248'],'21 bits = 8+8+5 → third octet 248.'],
['np-4','Which prefix is the smallest that supports 100 hosts?',['/25','/26','/24','/27'],'/25 gives 126 usable; /26 only 62.'],
['np-5','Which is the correct shortened form of 2001:0db8:0000:0000:0000:0000:0000:0001?',['2001:db8::1','2001:db8:0:1','2001::db8::1','2001:db8:1::'],'Drop leading zeros and replace one run of zero groups with ::.'],
['np-5','Which IPv6 feature lets hosts configure their own address from router advertisements?',['SLAAC','DHCPv4','APIPA','NAT64'],'Stateless Address Autoconfiguration.'],
['np-5','Which IPv6 protocol replaces ARP?',['NDP','ICMPv4','RARP','DHCPv6'],'Neighbor Discovery Protocol (ICMPv6) resolves link‑layer addresses.'],
['np-5','Running IPv4 and IPv6 on the same interfaces at the same time is called:',['Dual stack','Tunneling','NAT64','Translation'],'Dual stack runs both protocols.'],
['np-5','Which fiber type is used for long distance runs of many kilometers?',['Single‑mode','Multimode OM3','Twinax','Cat 6a'],'Single‑mode carries a laser signal far.'],
['np-5','Which transceiver form factor supports 10 Gbps?',['SFP+','SFP','RJ11','GBIC'],'SFP+ = 10G; SFP = 1G; QSFP = 40/100G.'],
['np-5','Which technology extends Layer 2 networks over a Layer 3 underlay with up to 16 million segments?',['VXLAN','VLAN','STP','MPLS'],'VXLAN uses a 24‑bit VNI.'],
['np-5','Which architecture combines SD‑WAN with cloud‑delivered security such as SWG, CASB and ZTNA?',['SASE','SDN','NFV','VDI'],'Secure Access Service Edge.'],
['np-5','What is the main benefit of Infrastructure as Code?',['Repeatable, version‑controlled deployments that prevent configuration drift','Faster CPUs','Eliminates the need for routers','Replaces encryption'],'IaC defines infrastructure in code templates.'],
['np-5','Which fiber connector polish is angled and usually green?',['APC','UPC','PC','MPO'],'Angled Physical Contact connectors are green.'],
['np-6','Which routing protocol is used between ISPs on the internet?',['BGP','OSPF','EIGRP','RIP'],'BGP is the path‑vector protocol of the internet.'],
['np-6','A router learns the same network from OSPF and from a static route. Which is used?',['Static (AD 1)','OSPF (AD 110)','Both equally','Whichever is newer'],'Lower administrative distance wins.'],
['np-6','Which protocol prevents Layer 2 loops?',['Spanning Tree Protocol','OSPF','VRRP','LACP'],'STP blocks redundant paths to stop loops.'],
['np-6','Which standard tags Ethernet frames with VLAN IDs on trunk links?',['802.1Q','802.1X','802.3af','802.11ax'],'802.1Q = VLAN tagging.'],
['np-6','Which feature combines multiple physical switch ports into one logical link?',['LACP link aggregation','Port mirroring','STP','Port security'],'LACP (802.3ad) bundles links.'],
['np-6','Two routers share a virtual gateway IP so hosts keep working if one fails. What is this?',['First Hop Redundancy Protocol (VRRP/HSRP)','NAT','BGP','Subinterface'],'FHRPs provide gateway redundancy.'],
['np-6','Many internal hosts share a single public IP using port numbers. What is this called?',['PAT (NAT overload)','Static NAT','1:1 NAT','DNAT'],'PAT maps many to one with ports.'],
['np-6','Which link‑state routing protocol uses areas and cost based on bandwidth?',['OSPF','RIP','BGP','EIGRP'],'OSPF is link‑state.'],
['np-6','A storage network needs larger frames for efficiency. What should be configured?',['Jumbo frames (MTU 9000)','MTU 576','STP portfast','Half duplex'],'Jumbo frames reduce overhead.'],
['np-6','Which route is used when no more specific route matches?',['Default route 0.0.0.0/0','Host route /32','Loopback','Null route'],'Default route = gateway of last resort.'],
['np-7','How tall is one rack unit (1U)?',['1.75 inches','1 inch','2.5 inches','19 inches'],'1U = 1.75 in (44.45 mm). Rack width is 19 in.'],
['np-7','Which antenna type is best for a long point‑to‑point link between two buildings?',['Directional (Yagi/parabolic)','Omnidirectional','Dipole rubber duck','Internal PCB'],'Directional antennas focus energy.'],
['np-7','Multiple APs broadcast the same SSID so users can roam. This is an:',['ESS / ESSID','IBSS','BSSID','Ad hoc'],'Extended service set.'],
['np-7','A guest Wi‑Fi requires users to accept terms on a web page before access. What is this?',['Captive portal','WPA3‑Enterprise','MAC filtering','WPS'],'Captive portals intercept the first web request.'],
['np-7','Which data center design alternates server rack fronts facing each other?',['Hot aisle/cold aisle','Spine and leaf','Three‑tier','Raised floor only'],'Cold intake aisles face each other; hot exhaust aisles face each other.'],
['np-7','Which wiring closet is the central point where the building connects to the outside provider?',['MDF','IDF','DMZ','PDU'],'Main Distribution Frame.'],
['np-7','5 GHz channels that must avoid radar are called:',['DFS channels','Overlapping channels','ISM channels','UNII‑0'],'Dynamic Frequency Selection.'],
['np-7','A heat map is produced during which activity?',['Wireless site survey','Port scan','Packet capture','Change management'],'Site surveys map signal coverage.'],
['np-8','Which SNMP version adds authentication and encryption?',['SNMPv3','SNMPv1','SNMPv2c','SNMPv2 community'],'v3 supports auth and privacy.'],
['np-8','Which describes the maximum acceptable amount of data loss measured in time?',['RPO','RTO','MTTR','MTBF'],'Recovery Point Objective.'],
['np-8','A backup site that has power, cooling and racks but no equipment is a:',['Cold site','Warm site','Hot site','Mirror site'],'Cold sites are just facilities.'],
['np-8','Clients on VLAN 30 can\'t get DHCP addresses; the DHCP server is on VLAN 10. What is needed?',['DHCP relay / IP helper on VLAN 30\'s gateway','A second DNS server','STP','Port mirroring'],'Relay forwards DHCP broadcasts across subnets.'],
['np-8','Which DNS record maps an IP address back to a hostname?',['PTR','A','CNAME','NS'],'PTR records live in reverse lookup zones.'],
['np-8','Which tool collects and correlates logs from many devices and alerts on suspicious patterns?',['SIEM','NetFlow collector only','Wi‑Fi analyzer','TDR'],'Security Information and Event Management.','siem'],
['np-8','Which VPN type sends only corporate traffic through the tunnel and internet traffic directly?',['Split tunnel','Full tunnel','Clientless','Site‑to‑site'],'Split tunneling.'],
['np-8','Managing a switch through a dedicated console connection separate from production traffic is called:',['Out‑of‑band management','In‑band management','SNMP traps','Jump box'],'OOB uses a separate path.'],
['np-8','Which DNS feature digitally signs records to prevent spoofing?',['DNSSEC','DoH','Round robin','Recursive lookup'],'DNSSEC adds signatures to DNS data.'],
['np-8','Which data shows who talked to whom and how much, without full packet contents?',['NetFlow/IPFIX','Full packet capture','Syslog only','ARP table'],'Flow records summarize conversations.'],
['np-8','Which metric measures the average time between failures of a device?',['MTBF','MTTR','RTO','RPO'],'Mean Time Between Failures.'],
['np-9','An attacker floods a switch with fake MAC addresses so it forwards frames out all ports. What is this?',['MAC flooding','ARP poisoning','VLAN hopping','DNS spoofing'],'Filling the CAM table makes the switch act like a hub.'],
['np-9','Which feature prevents unauthorized DHCP servers on a switched network?',['DHCP snooping','Port mirroring','BPDU guard','LACP'],'DHCP snooping trusts only designated ports.'],
['np-9','Which standard provides port‑based network access control using RADIUS?',['802.1X','802.1Q','802.3ad','802.11i'],'802.1X authenticates devices before granting access.'],
['np-9','Where should a public web server be placed?',['Screened subnet (DMZ)','Internal LAN','Management VLAN','Guest Wi‑Fi'],'The DMZ isolates public services from the internal network.','dmz'],
['np-9','What happens to traffic that does not match any rule in an ACL?',['It is denied by the implicit deny','It is permitted','It is logged and permitted','It is forwarded to the default gateway'],'ACLs end with an implicit deny any.'],
['np-9','An attacker sends double‑tagged frames to reach another VLAN. What is this?',['VLAN hopping','MAC spoofing','Evil twin','Smurf attack'],'Double tagging abuses the native VLAN.'],
['np-9','Which feature limits the number of MAC addresses allowed on a switch port?',['Port security','STP','Trunking','QoS'],'Port security can shutdown or restrict on violation.'],
['np-9','Which authentication protocol encrypts the entire payload and separates AAA functions?',['TACACS+','RADIUS','LDAP','Kerberos'],'TACACS+ (TCP 49) encrypts the whole body.'],
['np-9','Industrial control systems should be placed:',['On a segmented network isolated from the corporate LAN','On the guest Wi‑Fi','Directly on the internet','On the same VLAN as users'],'Segment OT/ICS/SCADA for safety.'],
['np-9','A decoy system set up to attract attackers is a:',['Honeypot','Bastion host','Jump box','Proxy'],'Honeypots observe attacker behavior.'],
{t:'order',l:'np-10',q:'Put the network troubleshooting steps in order.',items:['Identify the problem','Establish a theory of probable cause','Test the theory to determine the cause','Establish a plan of action and implement the solution','Verify full system functionality and implement preventive measures','Document findings, actions, and outcomes'],e:'Same 6‑step CompTIA methodology.'},
['np-10','A new fiber link shows no light on either side after installation. What is a common cause?',['TX/RX strands transposed','Duplex mismatch','DNS misconfiguration','Wrong VLAN'],'Swap the transmit/receive strands.'],
['np-10','Which tool finds the distance to a break in a fiber cable?',['OTDR','TDR','Toner probe','Multimeter'],'Optical Time‑Domain Reflectometer.'],
['np-10','An interface shows many CRC errors. What is the most likely cause?',['Bad cable or interference','Wrong DNS server','Expired certificate','Missing default route'],'CRC errors indicate corrupted frames, often physical.'],
['np-10','A switch port shows "err‑disabled" after a user plugged in a personal switch. What likely happened?',['Port security or BPDU guard violation','DNS failure','PoE budget exceeded','Duplex mismatch'],'Security features error‑disable ports on violations.'],
['np-10','A copper run of 140 m has intermittent errors. What is the issue?',['Attenuation – exceeds 100 m limit','Crosstalk from fiber','Wrong VLAN','APIPA'],'Copper Ethernet is limited to 100 m.'],
['np-10','New PoE cameras on a switch won\'t power on after the 10th camera. Likely cause?',['PoE power budget exceeded','STP loop','Wrong SSID','DNS issue'],'Switches have a total PoE budget.'],
['np-10','Frames smaller than 64 bytes are called:',['Runts','Giants','Jumbo frames','CRCs'],'Runts are undersized frames, often from collisions.'],
['np-11','Users can reach servers by IP but not by name. Which tool confirms the issue?',['nslookup / dig','arp -a','tracert','iperf'],'DNS tools test name resolution.','cmd-nslookup'],
['np-11','Which tool discovers open ports and services on hosts?',['nmap','Wireshark','ping','LLDP'],'nmap scans ports/services.','nmap'],
['np-11','Which tool captures and decodes packets for analysis?',['Wireshark','nmap','iperf','TDR'],'Wireshark is a protocol analyzer.','wireshark'],
['np-11','Which command shows the IP‑to‑MAC mappings a host has learned?',['arp -a','netstat -r','ipconfig /displaydns','hostname'],'arp -a displays the ARP cache.'],
['np-11','Which protocol lets switches discover directly connected neighbors from multiple vendors?',['LLDP','CDP','STP','VTP'],'LLDP is vendor‑neutral; CDP is Cisco.'],
['np-11','Users in one subnet can reach each other but not other subnets. What is the most likely cause?',['Incorrect default gateway','Bad DNS','Wrong SSID','Duplex mismatch'],'Off‑subnet traffic needs the gateway.'],
['np-11','Theoretical link speed is 1 Gbps but file transfers achieve 300 Mbps. The 300 Mbps figure is the:',['Throughput','Bandwidth','Latency','Jitter'],'Throughput is actual achieved rate.'],
['np-11','New hosts on a subnet can\'t get addresses, while older hosts work fine. Likely cause?',['DHCP scope exhaustion','STP loop','Bad fiber','Expired SSL certificate'],'Address pool exhaustion.'],
['np-11','Which tool measures throughput between two hosts?',['iperf','nslookup','arp','LLDP'],'iperf tests bandwidth between endpoints.'],
['np-11','Two hosts on a LAN report "duplicate IP address". What should be done?',['Find the conflict (arp/IPAM) and assign a unique IP or reservation','Change the subnet mask on the router','Restart the DNS server','Disable STP'],'Resolve the conflict with IPAM/DHCP reservations.'],
['np-11','Which Linux tool captures packets from the command line?',['tcpdump','dig','ss','mtr'],'tcpdump is the CLI packet capture tool.'],
['np-11','In the traceroute output, a hop shows "* * *" but later hops respond. What does this usually mean?',['That router doesn\'t reply to probes; the path still works','The destination is down','DNS failed','The cable is unplugged'],'Many routers rate‑limit or drop ICMP/TTL‑exceeded replies.','cmd-tracert'],
]};
