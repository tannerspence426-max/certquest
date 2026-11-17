CONTENT.certs.a1 = {
id:'a1', short:'A+ Core 1', name:'CompTIA A+ Core 1', code:'220-1201', color:'#f59e0b', pass:'675 / 900', minutes:90, maxQ:90, group:'A+',
domains:[
 {id:'1',t:'Mobile Devices',w:13},{id:'2',t:'Networking',w:23},{id:'3',t:'Hardware',w:25},{id:'4',t:'Virtualization & Cloud Computing',w:11},{id:'5',t:'Hardware & Network Troubleshooting',w:28}],
lessons:[
{id:'a1-1',d:'1',t:'Laptop & mobile hardware',md:`
Laptops, tablets and phones are just PCs squeezed into a tiny case. On the exam you need to know **which parts can be replaced**, what they look like, and how to swap them safely.

## Replaceable laptop parts
- **Battery** – removable on older laptops, internal (screws) on most new ones. Lithium‑ion; swollen = replace immediately, never puncture.
- **Keyboard / touchpad** – usually held by clips or screws from the bottom; connects with a thin ribbon cable.
- **RAM** – laptops use **SODIMM** (Small Outline DIMM) modules, about half the length of desktop DIMMs.
- **Storage** – 2.5" SATA drives or **M.2** SSDs (SATA or NVMe).
- **Wireless card** – often M.2; antenna wires run up into the display lid.
- **Biometrics / NFC** – fingerprint readers and NFC chips for tap‑to‑pay or badge login.
- **Speakers, system board, CPU fan** – fans clog with dust → overheating.

!key SODIMM: Small Outline Dual In‑line Memory Module – the short RAM stick used in laptops and small form‑factor PCs.

## Mobile display parts
- **LCD** needs a **backlight** (LED today). If you can see a faint image with a flashlight, the backlight or **inverter** (old CCFL screens) failed.
- **OLED** – each pixel makes its own light, deep blacks, no backlight. Can suffer **burn‑in**.
- **Digitizer** – the touch layer on top of the screen. Cracked digitizer = touch doesn't work in spots.
- **Wi‑Fi antennas and webcam/microphone** usually live in the lid around the screen.

!tip If Wi‑Fi gets weaker after a screen replacement, an antenna wire was probably pinched or not reconnected.

## Safe disassembly habits
1. Power off, unplug, remove the battery if possible.
2. Use an **ESD strap** or touch grounded metal; work on an anti‑static mat.
3. Keep screws organized (magnetic mat or photo each step) – laptop screws are different lengths.
4. Check the manufacturer's service manual.

!exam When a question asks what to do FIRST before opening a device, the answer is almost always: back up data (if possible), power off, disconnect power, and follow ESD precautions.
`},
{id:'a1-2',d:'1',t:'Mobile accessories, connectivity & MDM',md:`
## Ports and accessories
- **USB‑C** – reversible; used for charging, data, video (DisplayPort Alt Mode) and Thunderbolt. Most modern phones (including iPhone 15+) use it.
- **Lightning** – Apple's older 8‑pin connector.
- **Docking stations / port replicators** – one connection gives a laptop extra monitors, Ethernet and USB.
- **Touch pens, headsets, speakers, webcams, trackpads** – often connect by **Bluetooth**.

## Wireless connections
| Tech | Range | Used for |
|---|---|---|
| Bluetooth | ~10 m | Headsets, keyboards, pairing needs a PIN/confirmation |
| NFC | ~4 cm | Tap‑to‑pay, badge access, quick pairing |
| Wi‑Fi | ~30–100 m | Internet access |
| Cellular (4G/5G) | km | Mobile data, hotspot |
| Hotspot / tethering | — | Share phone's cellular data with a laptop |

!mnem Bluetooth pairing steps: **E**nable → **D**iscover → **S**elect → **P**IN → **T**est ("Every Dog Sniffs Pizza Today").

## Mobile Device Management (MDM)
Companies manage phones with **MDM**: push Wi‑Fi/email settings, require a screen lock, install approved apps, and **remote wipe** a lost device.
- **BYOD** – employee‑owned devices; often split into a work profile and personal profile.
- **COPE** – Corporate‑Owned, Personally Enabled.
- **Two‑factor / MFA**, **location services**, and **sync** (email, calendar, contacts with Microsoft 365 / Google / iCloud) are configured here too.

!key MDM: Mobile Device Management – central console to enforce policies, deploy apps and wipe phones/tablets.

[[vis:phone]]
`},
{id:'a1-3',d:'2',t:'TCP, UDP, ports & protocols',md:`
Every network service listens on a **port number** (0‑65535). Think of the IP address as the building and the port as the apartment number.

## TCP vs UDP
| | TCP | UDP |
|---|---|---|
| Connection | Connection‑oriented (3‑way handshake) | Connectionless |
| Reliability | Acknowledges and resends lost data | Best effort, no resend |
| Speed | Slower, more overhead | Faster, low overhead |
| Used by | Web, email, file transfer, SSH | DNS lookups, DHCP, VoIP, streaming, TFTP, SNMP |

!mnem TCP is a **phone call** (you confirm the other side is there). UDP is a **postcard** (you just send it).

## Ports you MUST memorize for A+
| Port | Protocol | Purpose |
|---|---|---|
| 20/21 | FTP | File transfer (unencrypted) |
| 22 | SSH | Secure remote shell |
| 23 | Telnet | Insecure remote shell |
| 25 | SMTP | Send email |
| 53 | DNS | Name resolution |
| 67/68 | DHCP | Automatic IP addressing |
| 80 | HTTP | Web |
| 110 | POP3 | Download email |
| 137‑139 | NetBIOS | Legacy Windows naming |
| 143 | IMAP | Sync email |
| 161/162 | SNMP | Device monitoring |
| 389 | LDAP | Directory services |
| 443 | HTTPS | Secure web |
| 445 | SMB/CIFS | Windows file sharing |
| 3389 | RDP | Remote Desktop |

!mnem "**21** FTP, **22** SSH, **23** Telnet" count up: **F**ile, **S**ecure, **T**elnet – "Fast Secure Typing". **25** SMTP: "**S**end **M**ail **T**o **P**eople at age 25". **3389**: "RDP – 3 3 8 9, Remote Desktop's fine."

!tip Use the **Port Race** game daily until you can match all of these in under 60 seconds.
`},
{id:'a1-4',d:'2',t:'Wireless standards & SOHO setup',md:`
## 802.11 Wi‑Fi standards
| Standard | Name | Band | Max speed (theoretical) |
|---|---|---|---|
| 802.11a | — | 5 GHz | 54 Mbps |
| 802.11b | — | 2.4 GHz | 11 Mbps |
| 802.11g | — | 2.4 GHz | 54 Mbps |
| 802.11n | Wi‑Fi 4 | 2.4 / 5 GHz | 600 Mbps (MIMO) |
| 802.11ac | Wi‑Fi 5 | 5 GHz | ~6.9 Gbps (MU‑MIMO) |
| 802.11ax | Wi‑Fi 6 / 6E | 2.4 / 5 / **6 GHz (6E)** | ~9.6 Gbps |
| 802.11be | Wi‑Fi 7 | 2.4 / 5 / 6 GHz | ~46 Gbps |

!key 2.4 GHz vs 5/6 GHz: 2.4 GHz travels farther and through walls but is slower and crowded (only channels **1, 6, 11** don't overlap). 5 and 6 GHz are faster with more channels but shorter range.

## Other wireless
- **RFID** – tags read by radio (inventory, badges). **NFC** is a short‑range type of RFID.
- **Bluetooth** – personal area network (PAN).
- **Long‑range fixed wireless** – point‑to‑point links between buildings; may need licensing.

## Setting up a SOHO (small office/home office) router
[[vis:router]]
1. Change the **default admin password** first.
2. Update **firmware**.
3. Set the **SSID** and use **WPA3** (or WPA2‑AES) with a strong passphrase.
4. Configure **DHCP** scope and any **DHCP reservations** (always give the printer the same IP).
5. Set up **port forwarding** only for services you must expose; disable **UPnP** if not needed.
6. Consider a **guest network** isolated from the main LAN.
7. Optional: **content filtering**, **MAC filtering** (weak), disable **WPS**.

!exam "Port forwarding" maps an outside port on the router's public IP to an inside device (e.g., forward TCP 3389 → 192.168.1.50). A **screened subnet / DMZ host** exposes the whole device – much riskier.
`},
{id:'a1-5',d:'2',t:'IP addressing, DNS, DHCP, VLANs & VPNs',md:`
## IPv4
An IPv4 address is 32 bits written as four numbers 0‑255: **192.168.1.20**. The **subnet mask** (e.g., 255.255.255.0 or **/24**) shows which part is the network and which part is the host. The **default gateway** is the router that leads off your network.

**Private (RFC 1918) ranges** – not routed on the internet, used inside homes/businesses:
- 10.0.0.0/8
- 172.16.0.0 – 172.31.255.255 (172.16.0.0/12)
- 192.168.0.0/16

!key APIPA: 169.254.x.x – Windows gives itself this address when it can't reach a DHCP server. Seeing it means "DHCP failed".

**Loopback**: 127.0.0.1 (test your own network stack).

## IPv6
128 bits in hexadecimal: **2001:db8:85a3::8a2e:370:7334**. "::" replaces one run of zeros. **fe80::** = link‑local (IPv6's version of APIPA). **::1** = loopback.

## DHCP
DHCP hands out IP, mask, gateway and DNS servers. Terms: **scope** (pool of addresses), **exclusions**, **reservations** (fixed IP for a MAC), **lease time**.
!mnem DHCP is **DORA**: Discover, Offer, Request, Acknowledge.

## DNS
DNS turns names into IPs. Record types:
| Record | Meaning |
|---|---|
| A | Name → IPv4 |
| AAAA | Name → IPv6 |
| CNAME | Alias to another name |
| MX | Mail server for the domain |
| TXT | Text – used for **SPF, DKIM, DMARC** email anti‑spoofing |
| PTR | IP → name (reverse lookup) |

## VLANs and VPNs
- **VLAN** – splits one physical switch into separate logical networks (e.g., Staff vs. Guest vs. VoIP).
- **VPN** – encrypted tunnel across the internet so a remote worker acts like they're on the office LAN.

[[vis:cmd-ipconfig]]
`},
{id:'a1-6',d:'2',t:'Network hardware, internet types & tools',md:`
## Devices
- **Router** – connects different networks; routes by IP (Layer 3).
- **Switch** – connects devices in one LAN; forwards by MAC address (Layer 2). **Managed** switches support VLANs, port settings; **unmanaged** are plug‑and‑play.
- **Hub** – obsolete; repeats everything to every port.
- **Access point (AP)** – connects wireless clients to the wired LAN.
- **Firewall** – filters traffic by rules.
- **Patch panel** – organizes cable runs in a wiring closet.
- **PoE** – Power over Ethernet powers APs, cameras and phones through the network cable (802.3af ~15 W, 802.3at PoE+ ~30 W, 802.3bt up to 60–100 W). A **PoE injector** adds power when the switch can't.
- **Cable modem / DSL modem / ONT** (fiber) – connect you to the ISP.
- **SDN** – software‑defined networking separates the control plane (brains) from the data plane (forwarding) so networks are managed centrally in software.

## Internet connection types
| Type | Notes |
|---|---|
| Fiber | Fastest, most reliable |
| Cable | Coax from cable TV company, shared bandwidth |
| DSL | Over phone lines; speed drops with distance |
| Satellite | Wide coverage; **high latency** (LEO like Starlink is lower) |
| Cellular / 5G | Mobile and fixed wireless options |
| WISP | Wireless ISP using fixed antennas |

## Network types
**PAN** (Bluetooth) < **LAN** (one building) < **MAN** (city) < **WAN** (across regions). **SAN** = storage area network. **WLAN** = wireless LAN.

## Tools
- **Crimper** – attaches RJ45 connectors. **Cable stripper**.
- **Punchdown tool** – terminates wires into a patch panel or keystone jack (110 block).
- **Cable tester** – checks wiring/pinout. **Toner probe** – finds which cable in a bundle goes where.
- **Loopback plug** – tests a NIC port. **Wi‑Fi analyzer** – finds channel congestion and signal strength.
- **Network tap** – copies traffic for monitoring.
`},
{id:'a1-7',d:'3',t:'Cables & connectors',md:`
[[vis:connectors]]
## Network cables
- **Twisted pair (UTP/STP)** with **RJ45** connectors. Cat 5e (1 Gbps), **Cat 6** (1 Gbps; 10 Gbps up to 55 m), **Cat 6a** (10 Gbps to 100 m), Cat 8 (25/40 Gbps short runs). Max run for Ethernet over copper: **100 m**.
- **Plenum‑rated** cable has fire‑resistant jacket for air‑handling spaces above ceilings.
- **Coaxial** – RG6 with **F‑type** connector (cable modem/TV).
- **Fiber** – single‑mode (long distance, laser) vs multimode (shorter, LED/VCSEL). Connectors: **SC** (square, push‑pull), **LC** (small, latch), **ST** (round, twist‑lock).
!mnem Fiber connectors: **S**tick and **C**lick (SC), **L**ittle **C**onnector (LC), **S**tick and **T**wist (ST).

## T568A vs T568B
Both are pinouts for RJ45. Use the same standard on both ends for a **straight‑through** cable; A on one end and B on the other = **crossover** (rarely needed now thanks to auto‑MDIX).
[[vis:pinout]]

## Peripheral and video
| Connector | Use |
|---|---|
| USB‑A / USB‑C / micro‑USB | Peripherals, charging. USB 2.0 = 480 Mbps, USB 3.2 Gen 1 = 5 Gbps, Gen 2 = 10 Gbps, USB4 = 40 Gbps+ |
| Thunderbolt | 40–80 Gbps over USB‑C, daisy‑chain, video + data |
| HDMI | Video + audio, TVs and monitors |
| DisplayPort | Video + audio, high refresh monitors |
| DVI | Older digital (DVI‑D) / analog (DVI‑A) video |
| VGA | Old analog video, 15‑pin DE15 (blue) |
| SATA | Internal drive data cable (7‑pin); 15‑pin SATA power |
| Molex | Old 4‑pin power for drives/fans |
| eSATA | External SATA |
| Lightning | Older Apple mobile |
| DB9 (serial) | Console/serial devices (RS‑232) |

!exam A **USB‑to‑Ethernet adapter** or a **dongle** is the fix when a thin laptop lacks a port. **Adapters vs converters**: an adapter changes the plug shape; a converter changes the signal (e.g., HDMI to VGA needs a converter because digital → analog).
`},
{id:'a1-8',d:'3',t:'Motherboards, CPUs, BIOS/UEFI & expansion cards',md:`
[[vis:motherboard]]
## Form factors
- **ATX** – standard desktop, 7 expansion slots.
- **microATX (mATX)** – smaller, 4 slots, fits most ATX cases.
- **ITX / mini‑ITX** – tiny boards for small PCs, 1 slot.

## Key parts of a motherboard
- **CPU socket** – Intel uses **LGA** (pins in socket); AMD desktop now also LGA (AM5), older AMD used **PGA** (pins on CPU).
- **Chipset** – controls communication between CPU, memory and I/O.
- **DIMM slots** – RAM. Use matching slots (often color‑coded) for **dual‑channel**.
- **PCIe slots** – x1, x4, x8, x16 lanes. GPUs go in **x16**.
- **M.2 slots**, **SATA ports**, front‑panel headers, **24‑pin ATX** and **4/8‑pin CPU (EPS) power** connectors.
- **CMOS battery** (CR2032) – keeps firmware settings/clock. Clock resetting every boot = dead CMOS battery.

## CPUs
- **Cores** and **threads** (hyper‑threading/SMT). **Cache** (L1/L2/L3). **x86** vs **x64** vs **ARM** (efficient, used in phones and Apple Silicon/Snapdragon PCs).
- **Virtualization support** (Intel VT‑x / AMD‑V) must be enabled in firmware to run VMs.
- Cooling: **heat sink + fan**, **thermal paste** between CPU and heat sink, **liquid cooling**.

## BIOS / UEFI firmware
[[vis:bios]]
UEFI is the modern replacement for BIOS: graphical, mouse support, **Secure Boot**, booting from **GPT** disks over 2 TB.
Common settings: **boot order**, **Secure Boot**, **TPM** (security chip for BitLocker, required by Windows 11), **fan profiles**, **virtualization**, **USB permissions**, **BIOS/UEFI passwords**, enable/disable devices.

!key TPM: Trusted Platform Module – chip that securely stores encryption keys and measures the boot process. HSM = a much larger, dedicated hardware security module for servers.

## Expansion cards
Video card (GPU), sound card, NIC, capture card, storage controller. Install → driver → test.
`},
{id:'a1-9',d:'3',t:'RAM, storage & RAID',md:`
## RAM
- **DIMM** (desktop), **SODIMM** (laptop). Generations: **DDR4** and **DDR5** – keyed differently, NOT interchangeable.
- **Channels**: install in matched pairs for **dual‑channel**; some servers use quad‑channel.
- **ECC RAM** detects and corrects errors – servers. **Non‑ECC** – normal PCs.
- **Virtual memory** = page file on disk used when RAM is full (slow).

## Storage
| Type | Notes |
|---|---|
| HDD | Spinning platters; 5,400/7,200/10,000/15,000 RPM; 2.5" or 3.5" |
| SATA SSD | No moving parts, ~550 MB/s limit of SATA III (6 Gbps) |
| M.2 NVMe SSD | Uses PCIe lanes – several GB/s. M.2 sizes like 2280 (22 mm × 80 mm) |
| Flash drives / SD cards | Removable |
| Optical | CD/DVD/Blu‑ray |

!tip M.2 is a **form factor**, not a speed. An M.2 drive can be SATA (slower) or NVMe (much faster). Check which the slot supports – M‑key vs B‑key.

## RAID
[[vis:raid]]
| Level | Min drives | What it does | Survives |
|---|---|---|---|
| RAID 0 | 2 | Striping – speed only | **No** failures |
| RAID 1 | 2 | Mirroring | 1 drive |
| RAID 5 | 3 | Striping with parity | 1 drive |
| RAID 6 | 4 | Striping with double parity | 2 drives |
| RAID 10 | 4 | Mirror + stripe | 1 per mirror pair |

!mnem RAID **0** = **zero** redundancy. RAID **1** = **one** copy (mirror). RAID **5** needs at least **3** drives (5 > 3). RAID **10** = 1 + 0.
!warn RAID is NOT a backup. Deleting a file or ransomware happens on all mirrored disks instantly.
`},
{id:'a1-10',d:'3',t:'Power supplies & cooling',md:`
## Power supply unit (PSU)
- Converts wall **AC** to **DC** at **+3.3 V, +5 V, +12 V** for components.
- **Input voltage**: 110‑120 V (US) vs 220‑240 V. Most PSUs are **auto‑switching**; older ones have a manual switch – wrong setting can destroy it.
- **Wattage**: total load + headroom (GPUs are the biggest draw).
- **Modular** PSU – detachable cables (cleaner airflow). **Redundant** PSUs – servers, hot‑swappable.
- **80 PLUS** rating = efficiency.
- Connectors: 24‑pin ATX, 4/8‑pin CPU, 6/8‑pin (or 12V‑2x6) PCIe GPU, SATA power, Molex.

!warn Never open a PSU – capacitors hold dangerous charge even when unplugged. Replace, don't repair.

## Surge protection & UPS
- **Surge suppressor** – blocks voltage spikes (rated in joules).
- **UPS** – battery that keeps devices running during outages and lets them shut down safely.

## Cooling
Case fans (front intake, rear/top exhaust), heat sinks, thermal paste/pads, liquid coolers. Overheating symptoms: random shutdowns, loud fans, throttling.

!exam Symptom: PC is completely dead, no fans, no lights → check outlet, power cable, PSU switch, then test the PSU with a **PSU tester** or **multimeter**.
`},
{id:'a1-11',d:'3',t:'Printers & multifunction devices',md:`
## Setting up printers
- Connect by **USB**, **Ethernet**, or **Wi‑Fi**; install drivers (PCL or PostScript); configure **duplex**, **orientation**, **tray**, **quality**.
- Network printers should get a **DHCP reservation** or static IP.
- Security: **user authentication / badging**, **secured prints** (release at device with PIN), audit logs, disable unused services.
- **Scan to email / SMB / cloud** on multifunction devices (MFDs).

## Printer types
| Type | How it works | Maintenance |
|---|---|---|
| **Laser** | Toner fused to paper with heat & pressure | Replace toner, drum, fuser, transfer roller; maintenance kit |
| **Inkjet** | Sprays ink droplets | Replace cartridges, clean/align print heads |
| **Thermal** | Heat darkens special paper (receipts) | Replace paper, clean heating element |
| **Impact (dot matrix)** | Pins strike an ink ribbon – multipart forms | Replace ribbon, print head; tractor‑feed paper |
| **3D** | Builds objects from **filament** (FDM) or **resin** | Level bed, replace filament/resin |

## The laser printing process
[[vis:laser]]
!mnem **P**lease **C**harge **E**very **D**ay **T**o **F**ully **C**harge: Processing, Charging, Exposing, Developing, Transferring, Fusing, Cleaning.

!exam Toner smears / rubs off → **fuser** problem. Repeating mark at regular intervals → dirty/damaged **drum** or roller. Blank pages → toner empty, transfer roller, or no charge.
`},
{id:'a1-12',d:'4',t:'Virtualization',md:`
**Virtualization** runs multiple operating systems on one physical machine. Each OS is a **virtual machine (VM)** and the software that runs them is the **hypervisor**.

[[vis:hypervisor]]
| | Type 1 (bare‑metal) | Type 2 (hosted) |
|---|---|---|
| Runs on | Directly on hardware | On top of a normal OS |
| Examples | VMware ESXi, Microsoft Hyper‑V, Proxmox/KVM | VirtualBox, VMware Workstation, Parallels |
| Used for | Data centers, servers | Testing, labs, running old apps |

## Why virtualize?
- **Sandbox** testing malware or updates safely; **test development**; run **legacy software/OS**; **cross‑platform** (Linux on Windows).
- Take **snapshots** before risky changes and roll back.
- Need enough CPU (with **VT‑x/AMD‑V** enabled), RAM, storage, and a virtual NIC (bridged, NAT, internal).

## Containers
**Containers** (e.g., Docker) share the host's kernel and package just the app and its libraries – much lighter than a full VM.

## VDI
**Virtual Desktop Infrastructure** hosts desktops on servers; users connect from thin clients or any device.

!warn VM escape: malware breaking out of a VM into the hypervisor. **VM sprawl**: unmanaged VMs piling up unpatched.
`},
{id:'a1-13',d:'4',t:'Cloud computing',md:`
[[vis:cloud]]
## Service models
| Model | You manage | Example |
|---|---|---|
| **IaaS** | OS, apps, data (provider runs hardware & virtualization) | AWS EC2, Azure VMs |
| **PaaS** | Your app and data (provider runs OS & runtime) | Azure App Service, Heroku‑style platforms |
| **SaaS** | Just your data/users | Microsoft 365, Gmail, Salesforce |

!mnem **I**aaS = **I**nfrastructure – you get raw servers ("**I** build it"). **P**aaS = **P**latform ("**P**lug in my code"). **S**aaS = **S**oftware ("**S**ign in and use it").

## Deployment models
- **Public** – shared provider infrastructure (AWS, Azure, Google Cloud).
- **Private** – used by one organization.
- **Hybrid** – mix of private/on‑prem and public.
- **Community** – shared by organizations with common needs.

## Cloud characteristics
- **Rapid elasticity** – scale up/down automatically.
- **Measured service / metered** – pay for what you use.
- **On‑demand self‑service**, **resource pooling**, **shared vs dedicated resources**, **high availability**, **file synchronization** (OneDrive/Google Drive).
- **Multitenancy** – many customers on shared hardware, isolated logically.
`},
{id:'a1-14',d:'5',t:'Troubleshooting method & core hardware',md:`
## The CompTIA troubleshooting methodology
1. **Identify the problem** – ask the user, check recent changes, back up data, duplicate the problem.
2. **Establish a theory of probable cause** – question the obvious, research if needed.
3. **Test the theory** – if not confirmed, form a new theory or escalate.
4. **Establish a plan of action** and **implement the solution** – consider corporate policies and change management.
5. **Verify full system functionality** and implement **preventive measures**.
6. **Document** findings, actions and outcomes.
!mnem "**I**n **E**very **T**eam, **E**ach **V**ictory is **D**ocumented" – Identify, Establish theory, Test, Establish plan, Verify, Document.

## Motherboard, RAM, CPU, power symptoms
| Symptom | Likely cause |
|---|---|
| POST beep codes / no display | RAM not seated, GPU, motherboard. Check beep code chart |
| Blue screen (BSOD) / random crashes | Bad RAM, overheating, drivers |
| Clock resets, "CMOS checksum error" | Dead CMOS battery |
| Burning smell, smoke | Shut down immediately – failing PSU/capacitors |
| Swollen/bulging capacitors | Motherboard failing |
| Loud fans, shutdowns under load | Overheating – dust, dried thermal paste, failed fan |
| Intermittent shutdowns | PSU, overheating |
| Grinding noise | Failing fan or HDD bearings |

!exam Test with **known‑good parts**. Use a **multimeter** or PSU tester for power, **memory diagnostics** for RAM, and POST codes/LEDs on the board.
`},
{id:'a1-15',d:'5',t:'Troubleshooting storage, displays & mobile',md:`
## Storage & RAID
- **Clicking / grinding** HDD → mechanical failure, back up NOW.
- **S.M.A.R.T.** errors predict drive failure.
- **Bootable device not found** → wrong boot order, failed drive, loose cable.
- **Slow performance** → full drive, failing drive, (HDD) fragmentation.
- **RAID degraded** → replace failed member and let it rebuild.
- **LED status indicators** on drives/arrays show failure (often amber).

## Displays & projectors
- **No image** → input source, cable, power, brightness.
- **Dim image** → backlight failure or power‑saving mode.
- **Flickering** → loose cable, refresh rate, failing backlight/inverter.
- **Dead pixels** (always black) / **stuck pixels** (always one color).
- **Burn‑in** (OLED/plasma) – static images.
- **Incorrect color** → cable pins, color profile, failing GPU.
- **Fuzzy image** → not running at **native resolution**.
- Projector: overheating – clean filters; dim – replace bulb.

## Mobile devices
- **Poor battery health / swelling** → replace battery; swelling is a fire risk.
- **Broken screen / digitizer issues** → touch not working in areas.
- **Overheating** → heavy apps, case blocking heat, failing battery.
- **No connectivity** → airplane mode, Wi‑Fi/Bluetooth toggles, re‑pair, forget network.
- **Liquid damage** → indicator stickers turn red/pink.
- **Physically damaged ports**, **malware**, **cursor drift** (bad touch calibration).
`},
{id:'a1-16',d:'5',t:'Troubleshooting networks & printers',md:`
## Network problems
| Symptom | Think about |
|---|---|
| No connectivity, APIPA 169.254.x.x | DHCP server unreachable, cable, VLAN |
| Can ping IP but not names | DNS problem |
| Intermittent wireless | Interference, distance, channel overlap |
| Slow speeds | Congestion, duplex mismatch, bad cable, wrong Wi‑Fi band |
| Limited connectivity | IP config issues, gateway down |
| Jitter / latency / packet loss | VoIP quality issues – QoS, congestion |
| Port flapping | Bad cable / NIC / switch port going up and down |
| External interference | Microwaves, cordless phones on 2.4 GHz |

!exam Windows tools: ~ipconfig~ (see/renew IP), ~ping~ (reachability), ~tracert~ (route), ~nslookup~ (DNS), ~netstat~ (connections). See the visuals below.
[[vis:cmd-ping]]

## Printer problems
| Symptom | Cause / fix |
|---|---|
| Lines down the page | Dirty drum (laser), clogged heads (inkjet) |
| Faded prints | Low toner/ink, economy mode |
| Ghost images | Drum not cleaned / bad cleaning blade |
| Toner not fused (smears) | Fuser failure |
| Paper jams | Wrong paper, worn pickup rollers, obstruction |
| Creased paper | Bad paper path or rollers |
| Garbled output | Wrong/corrupt driver |
| Print queue stuck | Restart the **Print Spooler** service |
| Grinding noise | Gear/feed problem |
| Multipage misfeed | Humidity, worn separation pad |
`},
],
qs:[
['a1-1','A user\'s laptop screen shows a very faint image only when a flashlight is shined on it. Which component most likely failed?',['Backlight','Digitizer','GPU','Wi‑Fi antenna'],'A faint visible image means the LCD panel is producing an image but the backlight that lights it is dead (or its inverter on old CCFL screens).'],
['a1-1','What type of memory module do most laptops use?',['SODIMM','DIMM','ECC RDIMM','SIMM'],'SODIMMs are the shorter memory modules used in laptops and small form‑factor PCs.'],
['a1-1','After replacing a laptop display, the user reports weak Wi‑Fi. What should the technician check first?',['That the Wi‑Fi antenna leads were reconnected and not pinched','The RAM seating','The CMOS battery','The keyboard ribbon cable'],'Wi‑Fi antennas usually run through the display lid; display work commonly disturbs them.'],
['a1-1','Which display technology does NOT require a backlight because each pixel emits its own light?',['OLED','LCD IPS','LCD TN','CCFL LCD'],'OLED pixels generate their own light. LCDs (TN, IPS, VA) require a backlight.'],
['a1-1','Touch input works everywhere except a strip along the bottom of a tablet screen. Which part is most likely damaged?',['Digitizer','Backlight','Inverter','Battery'],'The digitizer is the touch‑sensing layer; partial touch failure points to it.'],
['a1-1','A phone\'s case is bulging and the screen is lifting. What is the safest action?',['Power it off and replace the swollen battery, handling it carefully','Press the screen back into place','Keep charging it to calibrate the battery','Puncture the battery to release pressure'],'A swollen lithium‑ion battery is a fire hazard. Never puncture or compress it; replace and dispose of it properly.'],
['a1-2','Which technology lets a user pay by tapping a phone on a terminal?',['NFC','Bluetooth','Infrared','Wi‑Fi Direct'],'NFC (Near‑Field Communication) works at a few centimeters and is used for tap‑to‑pay.'],
['a1-2','A company wants to remotely wipe lost phones and enforce screen locks. What does it need?',['MDM','VPN','SSO','DLP'],'Mobile Device Management pushes policies and can remote‑wipe devices.'],
['a1-2','A user wants their laptop to use their phone\'s cellular data. What feature should they enable on the phone?',['Hotspot (tethering)','NFC','Airplane mode','Bluetooth discovery only'],'A mobile hotspot shares the phone\'s cellular connection over Wi‑Fi, USB, or Bluetooth.'],
['a1-2','Which connector is reversible and can carry power, data, and DisplayPort video?',['USB‑C','Micro‑USB','Lightning','Mini‑USB'],'USB‑C is reversible and supports Alternate Modes like DisplayPort and Thunderbolt.'],
['a1-2','What is usually required to complete Bluetooth pairing?',['Confirming a PIN or passkey on both devices','Entering the Wi‑Fi password','Assigning a static IP','Installing an MDM profile'],'Bluetooth pairing typically requires entering or confirming a PIN/passkey.'],
['a1-2','Employees use personal phones for work email, and IT installs a separated work profile. This is an example of:',['BYOD','COPE','Kiosk mode','VDI'],'Bring Your Own Device programs let employees use personal devices under MDM policies.'],
['a1-3','Which port does SSH use?',['22','21','23','3389'],'SSH (and SFTP/SCP) use TCP 22.'],
['a1-3','A technician needs to allow Remote Desktop through a firewall. Which port should be opened?',['3389','443','22','445'],'RDP uses TCP (and UDP) 3389.'],
['a1-3','Which protocol uses port 25?',['SMTP','POP3','IMAP','SNMP'],'SMTP sends and relays email on TCP 25.'],
['a1-3','Which TWO protocols retrieve email from a mail server to a client? (Choose two.)',['IMAP','POP3','SMTP','SNMP','LDAP'],'POP3 (110) and IMAP (143) retrieve mail; SMTP sends it.',[0,1]],
['a1-3','Which transport protocol is connectionless and does not resend lost data?',['UDP','TCP','HTTPS','SMB'],'UDP is connectionless "best effort" delivery.'],
['a1-3','Windows file sharing to \\\\server\\share uses which port?',['445','139 only','80','3306'],'Modern SMB runs directly over TCP 445 (NetBIOS 137‑139 is legacy).'],
['a1-3','Which protocol and port provide encrypted web traffic?',['HTTPS 443','HTTP 80','HTTP 8080','FTP 21'],'HTTPS = HTTP over TLS on TCP 443.'],
['a1-3','Which protocol is used to query and manage a directory such as Active Directory, on port 389?',['LDAP','SNMP','DNS','Kerberos'],'LDAP (389) queries directory services.'],
['a1-3','A network administrator monitors switches for errors using port 161. Which protocol is this?',['SNMP','SMTP','SMB','SSH'],'SNMP uses UDP 161 for queries and 162 for traps.'],
['a1-3','Which protocol sends usernames and passwords in clear text and should be replaced with SSH?',['Telnet','HTTPS','SFTP','RDP'],'Telnet (23) is unencrypted.'],
['a1-4','Which Wi‑Fi standard introduced use of the 6 GHz band?',['802.11ax (Wi‑Fi 6E)','802.11ac (Wi‑Fi 5)','802.11n (Wi‑Fi 4)','802.11g'],'Wi‑Fi 6E is 802.11ax extended into 6 GHz.'],
['a1-4','Which 2.4 GHz channels do not overlap in North America?',['1, 6, 11','1, 5, 9','2, 7, 12','3, 6, 9'],'Channels 1, 6 and 11 are the non‑overlapping 2.4 GHz channels in the US.'],
['a1-4','What should be the FIRST step when setting up a new SOHO router?',['Change the default administrator password','Enable MAC filtering','Enable UPnP','Turn on WPS'],'Default credentials are publicly known; change them first.'],
['a1-4','A user wants a home security camera reachable from the internet on TCP 8443 without exposing other devices. What should be configured?',['Port forwarding','DMZ host','Disable the firewall','Static NAT for all ports'],'Port forwarding maps one external port to one internal device/port. A DMZ host exposes the whole device.'],
['a1-4','Which wireless security setting is the most secure for a new SOHO network?',['WPA3','WEP','WPA with TKIP','Open with MAC filtering'],'WPA3 is the strongest current Wi‑Fi security. WEP and TKIP are broken.'],
['a1-4','The office printer\'s IP keeps changing and users lose access. What is the BEST fix on the router?',['Create a DHCP reservation for the printer','Shorten the DHCP lease','Enable a guest network','Disable DHCP'],'A reservation always gives the printer\'s MAC the same IP.'],
['a1-4','Which frequency band generally has the longest range but the most interference?',['2.4 GHz','5 GHz','6 GHz','60 GHz'],'Lower frequencies travel farther and penetrate walls better, but 2.4 GHz is crowded.'],
['a1-5','A PC has the address 169.254.33.10. What does this most likely mean?',['It could not reach a DHCP server','It has a valid public IP','It is using IPv6','It is the loopback address'],'169.254.x.x is APIPA, self‑assigned when DHCP fails.','cmd-ipconfig'],
['a1-5','Which TWO are private IPv4 ranges? (Choose two.)',['10.0.0.0/8','192.168.0.0/16','172.32.0.0/16','8.8.8.0/24','169.254.0.0/16'],'RFC 1918 private ranges are 10/8, 172.16/12 (172.16‑172.31) and 192.168/16. 169.254 is APIPA, not RFC 1918.',[0,1]],
['a1-5','Which DNS record maps a hostname to an IPv6 address?',['AAAA','A','MX','PTR'],'AAAA ("quad A") records hold IPv6 addresses.'],
['a1-5','Which DNS record type is used for SPF and DMARC email anti‑spoofing policies?',['TXT','MX','CNAME','AAAA'],'SPF, DKIM and DMARC are published as TXT records.'],
['a1-5','Which DNS record identifies the mail server for a domain?',['MX','A','TXT','SOA'],'MX = mail exchanger.'],
['a1-5','What does a subnet mask of /24 equal in dotted decimal?',['255.255.255.0','255.255.0.0','255.255.255.128','255.0.0.0'],'/24 means 24 network bits: 255.255.255.0.'],
['a1-5','A remote employee needs a secure encrypted tunnel to the office network over the internet. What should be used?',['VPN','VLAN','DMZ','Proxy'],'A VPN creates an encrypted tunnel to the private network.'],
['a1-5','Which IPv6 prefix indicates a link‑local address?',['fe80::/10','2001::/16','::1/128','ff00::/8'],'fe80::/10 is link‑local; ::1 is loopback; ff00::/8 is multicast.'],
['a1-5','Which technology lets one physical switch carry separate logical networks for staff and guests?',['VLAN','VPN','NAT','PoE'],'VLANs logically separate broadcast domains on the same switch.'],
['a1-6','Which device forwards frames using MAC addresses within a LAN?',['Switch','Router','Hub','Modem'],'Switches learn MAC addresses and forward frames (Layer 2).'],
['a1-6','A technician needs to identify which unlabeled cable in a wiring closet goes to office 214. Which tool should be used?',['Toner probe','Crimper','Loopback plug','Punchdown tool'],'A toner generator and probe trace a specific cable.'],
['a1-6','Which tool terminates individual wires into a patch panel?',['Punchdown tool','Crimper','Cable stripper','Multimeter'],'A punchdown tool seats wires into 110/Krone blocks and keystones.'],
['a1-6','Which internet connection type typically has the HIGHEST latency?',['Geostationary satellite','Fiber','Cable','DSL'],'Signals travel ~36,000 km to geostationary satellites and back.'],
['a1-6','New wireless access points must be installed where there are no power outlets. What should be used?',['PoE switch or PoE injector','Longer Ethernet cables','Coax','A repeater hub'],'PoE delivers power over the Ethernet cable.'],
['a1-6','Which tool helps find the least congested Wi‑Fi channel?',['Wi‑Fi analyzer','Cable tester','Toner probe','Loopback plug'],'A Wi‑Fi analyzer shows nearby networks, channels and signal strength.'],
['a1-6','What does Software‑Defined Networking (SDN) separate?',['The control plane from the data plane','IPv4 from IPv6','Wired from wireless','LAN from WAN'],'SDN centralizes the control plane (decisions) apart from the forwarding data plane.'],
['a1-7','Which fiber connector is round and uses a bayonet twist‑lock?',['ST','SC','LC','RJ45'],'ST = "stick and twist".'],
['a1-7','What is the maximum recommended length for a Cat 6 copper Ethernet run at 1 Gbps?',['100 meters','50 meters','185 meters','500 meters'],'Twisted‑pair Ethernet runs are limited to 100 m.'],
['a1-7','Which connector is used for coaxial cable to a cable modem?',['F‑type','BNC only','RJ11','LC'],'F‑type connectors screw onto RG6 coax for cable internet/TV.'],
['a1-7','Cable must be run above a drop ceiling used for air return. What type is required?',['Plenum','PVC','Direct burial','Shielded only'],'Plenum‑rated cable produces less toxic smoke in air‑handling spaces.'],
['a1-7','A user needs to connect a new laptop with only HDMI output to an old projector with only VGA. What is needed?',['An active HDMI‑to‑VGA converter','A passive HDMI‑to‑VGA cable','A DVI‑D adapter','A DisplayPort cable'],'HDMI is digital and VGA is analog; a converter must change the signal.'],
['a1-7','Which connector is a 15‑pin analog video connector?',['VGA (DE15)','HDMI','DVI‑D','DisplayPort'],'VGA is the old blue 15‑pin analog connector.'],
['a1-7','Which interface can carry 40 Gbps over a USB‑C connector and daisy‑chain devices?',['Thunderbolt','USB 2.0','eSATA','FireWire'],'Thunderbolt 3/4 provides 40 Gbps over USB‑C.'],
{t:'order',l:'a1-7',q:'Put the T568B wire colors in pin order 1 → 8.',items:['White/Orange','Orange','White/Green','Blue','White/Blue','Green','White/Brown','Brown'],e:'T568B: WO, O, WG, B, WB, G, WBr, Br. T568A swaps the orange and green pairs.',v:'pinout'},
{t:'match',l:'a1-7',q:'Match each connector to its typical use.',pairs:[['RJ45','Ethernet'],['F‑type','Cable modem coax'],['LC','Fiber optic'],['SATA','Internal drive data'],['DE15 (VGA)','Analog video']],e:'Know connector shapes; see the connectors diagram.'},
['a1-8','A user can\'t start a virtual machine; the hypervisor says hardware virtualization is unavailable. What should be done?',['Enable VT‑x/AMD‑V in UEFI','Install more RAM','Replace the CMOS battery','Enable Secure Boot'],'Hardware virtualization extensions must be enabled in firmware.','bios'],
['a1-8','The date and time reset every time a PC is unplugged. What is the most likely cause?',['Failed CMOS battery','Bad PSU','Corrupt OS','Faulty RAM'],'The CR2032 CMOS battery maintains the RTC and settings.'],
['a1-8','Which motherboard form factor is the smallest?',['Mini‑ITX','ATX','microATX','E‑ATX'],'Mini‑ITX boards are 17 × 17 cm.'],
['a1-8','Which component does Windows 11 require for secure key storage and is configured in UEFI?',['TPM 2.0','HSM','NVMe','ECC RAM'],'Windows 11 requires TPM 2.0 and Secure Boot capability.'],
['a1-8','Which UEFI feature prevents unsigned boot loaders from running?',['Secure Boot','Fast Boot','CSM','Wake‑on‑LAN'],'Secure Boot checks signatures of boot components.'],
['a1-8','A new graphics card should be installed into which slot?',['PCIe x16','PCIe x1','M.2','DIMM'],'GPUs use the full‑length PCIe x16 slot.'],
['a1-8','What is applied between a CPU and its heat sink to improve heat transfer?',['Thermal paste','Dielectric grease','Silicone glue','Anti‑static spray'],'Thermal paste fills microscopic gaps.'],
['a1-9','A server must detect and correct single‑bit memory errors. Which RAM should be used?',['ECC','Non‑ECC','SODIMM','Virtual memory'],'ECC RAM corrects single‑bit errors.'],
['a1-9','Which RAID level provides mirroring with only two drives?',['RAID 1','RAID 0','RAID 5','RAID 10'],'RAID 1 mirrors data between two drives.','raid'],
['a1-9','What is the minimum number of drives for RAID 5?',['3','2','4','5'],'RAID 5 stripes data with parity across at least 3 drives.','raid'],
['a1-9','Which RAID level provides the best performance but NO fault tolerance?',['RAID 0','RAID 1','RAID 5','RAID 6'],'RAID 0 stripes with no redundancy.'],
['a1-9','An M.2 SSD reads at 3,500 MB/s. Which interface is it using?',['NVMe (PCIe)','SATA III','USB 2.0','IDE'],'SATA tops out ~600 MB/s; multi‑GB/s means NVMe over PCIe.'],
['a1-9','A user tries to install DDR5 RAM into a DDR4 board. What will happen?',['It won\'t fit; the notches are keyed differently','It works at DDR4 speed','It works only in dual‑channel','It needs a BIOS update'],'Each DDR generation is physically keyed differently.'],
['a1-9','Which RAID level survives TWO simultaneous drive failures?',['RAID 6','RAID 5','RAID 1','RAID 0'],'RAID 6 uses double parity.'],
['a1-10','A PC is moved from the US to Europe and the PSU has a manual voltage switch. What must be checked?',['Set the switch to 230 V','Set the switch to 115 V','Replace the CMOS battery','Nothing; PSUs are always auto‑switching'],'Manual‑switch PSUs must match local voltage.'],
['a1-10','Which device keeps a computer running briefly during a power outage?',['UPS','Surge suppressor','Line conditioner only','PDU'],'An uninterruptible power supply has batteries.'],
['a1-10','Which voltages does an ATX PSU supply? (Choose three.)',['+3.3 V','+5 V','+12 V','+24 V','+48 V'],'ATX rails: +3.3, +5, +12 V (plus −12 V and 5 V standby).',[0,1,2]],
['a1-10','A gamer adds a powerful GPU and the PC shuts down under load. What is the most likely cause?',['Insufficient PSU wattage','Bad CMOS battery','Wrong RAM slot','Fragmented drive'],'High GPU draw can exceed PSU capacity.'],
['a1-11','Toner smears when a printed page is touched. Which part is failing?',['Fuser','Drum','Pickup roller','Transfer belt'],'The fuser melts toner onto paper; smearing means it isn\'t hot enough.'],
['a1-11','Which printer type is used for receipts and requires heat‑sensitive paper?',['Thermal','Impact','Laser','Inkjet'],'Direct thermal printers darken special paper with heat.'],
['a1-11','Which printer type is best for multipart carbon forms?',['Impact (dot matrix)','Laser','Thermal','Inkjet'],'Impact printers physically strike through multiple layers.'],
{t:'order',l:'a1-11',q:'Put the laser printing steps in order.',items:['Processing','Charging','Exposing','Developing','Transferring','Fusing','Cleaning'],e:'Please Charge Every Day To Fully Charge.',v:'laser'},
['a1-11','A repeating defect appears every few inches on laser prints. What is the likely cause?',['A damaged drum or roller','Low toner','Wrong driver','Network latency'],'Repeating marks match the circumference of a roller or drum.'],
['a1-11','Which feature requires users to enter a PIN at the printer before a job prints?',['Secured print / print release','Duplexing','Spooling','Collation'],'Secured print holds jobs until the user authenticates at the device.'],
['a1-11','Which item is consumed by a 3D printer using FDM?',['Filament','Toner','Ribbon','Thermal paper'],'FDM printers melt plastic filament.'],
['a1-12','Which hypervisor type runs directly on the hardware?',['Type 1','Type 2','Container engine','Emulator'],'Type 1 (bare‑metal) hypervisors like ESXi and Hyper‑V run on hardware.','hypervisor'],
['a1-12','A tester wants to try a risky update and roll back if it fails. Which VM feature helps most?',['Snapshot','Thin provisioning','VM sprawl','Bridged networking'],'Snapshots capture state to revert to.'],
['a1-12','What is the main difference between a container and a VM?',['Containers share the host OS kernel','Containers include a full guest OS','Containers require a Type 1 hypervisor','Containers cannot be networked'],'Containers are lighter because they share the host kernel.'],
['a1-12','Malware breaks out of a virtual machine and attacks the host. This is called:',['VM escape','VM sprawl','Hyperjacking via DNS','Resource pooling'],'VM escape is breaking isolation between guest and hypervisor.'],
['a1-13','A company uses Microsoft 365 for email and documents. Which cloud model is this?',['SaaS','IaaS','PaaS','On‑premises'],'Fully managed software delivered over the internet = SaaS.','cloud'],
['a1-13','A developer deploys code to a platform where the provider manages the OS and runtime. Which model?',['PaaS','IaaS','SaaS','DaaS'],'PaaS provides a managed platform.'],
['a1-13','Which cloud characteristic means resources automatically scale up during peak demand?',['Rapid elasticity','Measured service','Multitenancy','Private cloud'],'Rapid elasticity = scaling up/down quickly.'],
['a1-13','An organization keeps sensitive databases on‑premises and runs web servers in AWS. Which deployment model?',['Hybrid','Public','Private','Community'],'Mixing on‑prem/private with public cloud = hybrid.'],
['a1-13','Which cloud characteristic is described as "pay only for what you use"?',['Measured (metered) service','Elasticity','High availability','Shared resources'],'Measured service tracks usage for billing.'],
{t:'order',l:'a1-14',q:'Put the CompTIA troubleshooting steps in order.',items:['Identify the problem','Establish a theory of probable cause','Test the theory to determine the cause','Establish a plan of action and implement the solution','Verify full system functionality and implement preventive measures','Document findings, actions, and outcomes'],e:'Identify, theory, test, plan/implement, verify, document.'},
['a1-14','A technician confirms a theory is wrong. What is the next step?',['Establish a new theory or escalate','Document findings','Implement the solution','Verify functionality'],'If the theory is not confirmed, re‑establish a new theory or escalate.'],
['a1-14','A PC emits a series of beeps at startup and shows nothing. What does this indicate?',['A POST error – check the beep code chart','The OS is corrupt','A dead CMOS battery only','The monitor is off'],'Beep codes are POST hardware error signals.'],
['a1-14','A computer randomly shuts off and the CPU fan is very loud. What is most likely?',['Overheating','Bad RAM','DNS failure','Corrupt driver'],'Thermal protection shuts down overheating systems.'],
['a1-14','What should a technician do BEFORE making changes during troubleshooting?',['Back up the user\'s data','Reinstall the OS','Replace the motherboard','Document the outcome'],'Identify step includes backing up data before changes.'],
['a1-14','A tech notices a burning smell coming from a desktop. What should be done first?',['Power off and unplug the system immediately','Run memory diagnostics','Update drivers','Check the event logs'],'Burning smell = safety risk; cut power first.'],
['a1-15','A hard drive is making clicking noises. What is the BEST first action?',['Back up the data immediately','Defragment the drive','Run chkdsk /r repeatedly','Update the BIOS'],'Clicking indicates mechanical failure; save data first.'],
['a1-15','Which technology reports drive health warnings before failure?',['S.M.A.R.T.','RAID','TPM','POST'],'Self‑Monitoring, Analysis and Reporting Technology.'],
['a1-15','Text on a monitor looks fuzzy. What is the most likely cause?',['It is not set to its native resolution','Backlight failure','Dead pixel','Bad CMOS battery'],'LCDs look sharpest at native resolution.'],
['a1-15','A single pixel is always bright green. What is this called?',['Stuck pixel','Dead pixel','Burn‑in','Ghosting'],'A stuck pixel stays one color; a dead pixel stays black.'],
['a1-15','The PC says "No bootable device" after a new drive was installed. What should be checked FIRST?',['Boot order in UEFI','The monitor cable','The printer driver','The Wi‑Fi password'],'The firmware may be trying to boot from the new, empty drive.'],
['a1-15','A phone shows a pink liquid contact indicator. What does this suggest?',['Liquid damage','Overheating','Swollen battery','Malware'],'LCI stickers change color when exposed to liquid.'],
['a1-16','A user can reach 8.8.8.8 by IP but not google.com. What is the likely problem?',['DNS','DHCP','Default gateway','Cable'],'IP works but names don\'t = name resolution issue.','cmd-ping'],
['a1-16','Several users\' print jobs are stuck in the queue. What should be done first?',['Restart the Print Spooler service','Replace the fuser','Reinstall Windows','Replace the network cable'],'Clearing/restarting the spooler resolves stuck queues.'],
['a1-16','Wireless drops every time the break room microwave runs. What is the cause?',['Interference on 2.4 GHz','DNS misconfiguration','Wrong subnet mask','Expired DHCP lease'],'Microwaves operate around 2.4 GHz.'],
['a1-16','Prints show the image from the previous page faintly. What is this called and what is the likely cause?',['Ghosting – drum/cleaning problem','Speckling – low toner','Smearing – network issue','Creasing – driver issue'],'Ghost images come from residual charge/toner on the drum.'],
['a1-16','A switch port\'s link LED goes up and down repeatedly. What is this called?',['Port flapping','Jitter','Latency','Duplexing'],'Port flapping is a link repeatedly changing state, often a bad cable or NIC.'],
['a1-16','Printed pages come out with random symbols and garbage text. What should be checked?',['Printer driver','Fuser','Toner level','Paper type'],'Garbled output usually means a wrong or corrupt driver.'],
['a1-16','VoIP calls sound choppy and words arrive out of order. Which TWO network issues are most likely? (Choose two.)',['Jitter','Packet loss','APIPA','DNS failure','Duplex auto‑negotiation success'],'Jitter (variable delay) and packet loss harm real‑time voice.',[0,1]],
]};
