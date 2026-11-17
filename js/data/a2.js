CONTENT.certs.a2 = {
id:'a2', short:'A+ Core 2', name:'CompTIA A+ Core 2', code:'220-1202', color:'#f97316', pass:'700 / 900', minutes:90, maxQ:90, group:'A+',
domains:[{id:'1',t:'Operating Systems',w:28},{id:'2',t:'Security',w:28},{id:'3',t:'Software Troubleshooting',w:23},{id:'4',t:'Operational Procedures',w:21}],
lessons:[
{id:'a2-1',d:'1',t:'Operating systems & file systems',md:`
An **operating system (OS)** manages hardware and runs your apps.
| OS | Where you see it |
|---|---|
| Windows 10/11 | Most business desktops/laptops |
| macOS | Apple computers |
| Linux (Ubuntu, Red Hat, Debian…) | Servers, developers, embedded |
| ChromeOS | Chromebooks (schools), mostly cloud apps |
| iOS / iPadOS | iPhone / iPad |
| Android | Most other phones/tablets |

## File systems
| File system | Used by | Notes |
|---|---|---|
| **NTFS** | Windows | Permissions, encryption (EFS), compression, journaling, large files |
| **ReFS** | Windows Server | Resilient, for storage spaces |
| **FAT32** | USB drives, everywhere | Max **4 GB file** size |
| **exFAT** | Large flash drives/SD cards | No 4 GB limit, cross‑platform |
| **ext4** | Linux | Journaling |
| **XFS** | Linux (RHEL default) | Large files |
| **APFS** | macOS | Snapshots, encryption |

!exam A user can't copy a 6 GB video to a USB stick → it's formatted **FAT32**. Reformat as **exFAT** (or NTFS for Windows‑only).

## Life cycle
Vendors stop patching old OS versions (**end of life / end of support**). Running EOL software is a security risk. Windows 10 reached end of support in October 2025.
`},
{id:'a2-2',d:'1',t:'Installing & upgrading Windows',md:`
## Windows editions
| Edition | Key extras |
|---|---|
| Home | Basic; cannot join a domain, no BitLocker (device encryption only), no Group Policy editor |
| Pro | **Domain join**, **BitLocker**, **gpedit.msc**, **Remote Desktop host**, Hyper‑V |
| Enterprise / Education | Volume licensing, AppLocker, extra security features |

!exam "User needs to join the corporate domain / use BitLocker / host RDP" → upgrade **Home → Pro**.

## Windows 11 requirements
64‑bit 1 GHz 2+ core CPU, **4 GB RAM**, **64 GB storage**, **UEFI with Secure Boot capable**, **TPM 2.0**.

## Installation types & boot methods
- **Clean install** (wipe), **in‑place upgrade** (keep apps/files), **image deployment**, **repair installation**, **recovery partition**, **zero‑touch** (Autopilot) deployments.
- Boot from **USB**, **network (PXE)**, internal drive, **ISO** (in VMs), solid‑state/flash, internet‑based.

## Partitions
- **MBR** – old, max 4 primary partitions, 2 TB disks, works with BIOS.
- **GPT** – modern, up to 128 partitions, huge disks, needs **UEFI**.
- **Format types**: quick vs full (full checks for bad sectors).

## Upgrade considerations
Back up files, check **hardware compatibility**, application/driver support, licensing, and feature updates vs. quality updates.
`},
{id:'a2-3',d:'1',t:'Windows tools: Task Manager & MMC snap‑ins',md:`
## Task Manager (Ctrl+Shift+Esc)
[[vis:taskmgr]]
Tabs: **Processes** (end hung apps), **Performance** (CPU/RAM/disk/network graphs), **App history**, **Startup apps** (disable slow startup programs), **Users**, **Details** (PIDs, priority), **Services**.

## Microsoft Management Console snap‑ins
| Tool | Command | What you do there |
|---|---|---|
| Event Viewer | eventvwr.msc | Read System/Application/Security logs |
| Disk Management | diskmgmt.msc | Partition, format, assign drive letters, extend volumes |
| Task Scheduler | taskschd.msc | Run tasks on a schedule/trigger |
| Device Manager | devmgmt.msc | Drivers, disabled/failed devices |
| Certificate Manager | certmgr.msc | View user certificates |
| Local Users and Groups | lusrmgr.msc | Create local users (Pro+) |
| Performance Monitor | perfmon.msc | Detailed counters/logs over time |
| Group Policy Editor | gpedit.msc | Local policies (Pro+) |
| Services | services.msc | Start/stop services, set startup type |

[[vis:devmgr]]
!key Device Manager icons: **yellow triangle "!"** = problem with the device/driver; **down arrow** = device disabled.

[[vis:diskmgmt]]
[[vis:eventvwr]]
[[vis:services]]

## Other tools
- **msconfig** – System Configuration: boot options (Safe Mode), services.
- **regedit** – Registry Editor (back up first!).
- **msinfo32** – System Information. **resmon** – Resource Monitor. **dxdiag** – DirectX diagnostics. **cleanmgr** – Disk Cleanup. **dfrgui** – Optimize Drives.
`},
{id:'a2-4',d:'1',t:'Windows command line',md:`
Open **Command Prompt** or **PowerShell / Terminal**. Some commands need **Run as administrator**.

## Navigation & files
| Command | Does |
|---|---|
| cd / dir | Change directory / list files |
| md (mkdir) / rmdir | Make / remove directories |
| copy / xcopy / robocopy | Copy files; robocopy is robust with retries & mirroring |
| [command] /? | Show help for any command |

## Disk & system
| Command | Does |
|---|---|
| chkdsk /f /r | Fix file system errors, find bad sectors |
| sfc /scannow | System File Checker – repairs protected OS files |
| DISM /Online /Cleanup-Image /RestoreHealth | Repairs the Windows image (run before sfc if sfc fails) |
| format / diskpart | Format / partition from command line |
| shutdown /r /t 0 | Restart now |
| winver | Show Windows version |
| gpupdate /force | Re‑apply Group Policy now |
| gpresult /r | Show which policies applied |
| net user / net use | Manage users / map network drives |
| whoami | Show current user |

## Networking
| Command | Does |
|---|---|
| ipconfig /all, /release, /renew, /flushdns | IP info, renew DHCP, clear DNS cache |
| ping | Test reachability |
| tracert / pathping | Show hops to destination |
| nslookup | Query DNS |
| netstat -an | Show connections & listening ports |
| hostname | Computer name |

[[vis:cmd-ipconfig]]
[[vis:cmd-tracert]]
[[vis:cmd-netstat]]
[[vis:cmd-nslookup]]
[[vis:cmd-sfc]]
[[vis:cmd-gpupdate]]
`},
{id:'a2-5',d:'1',t:'Settings, Control Panel & Windows networking',md:`
[[vis:settings]]
## Settings app vs Control Panel
Windows 11 moves most things into **Settings** (System, Bluetooth & devices, Network & internet, Personalization, Apps, Accounts, Time & language, Gaming, Accessibility, Privacy & security, Windows Update). The classic **Control Panel** still has: **Internet Options**, **Devices and Printers**, **Programs and Features**, **Network and Sharing Center**, **System**, **Windows Defender Firewall**, **Mail**, **Sound**, **User Accounts**, **Device Manager**, **Indexing Options**, **File Explorer Options** (show hidden files/extensions), **Power Options** (hibernate, sleep, fast startup, USB selective suspend), **Ease of Access**.

## Windows networking
- **Workgroup** (peer‑to‑peer, each PC has its own accounts) vs **Domain** (Active Directory, central logins).
- **Shared resources**: printers, file shares, **mapped drives** (net use Z: \\\\server\\share).
- **Network profiles**: **Public** (hidden, more firewall restrictions) vs **Private** (discoverable).
- **Static IP config**: IP, mask, gateway, DNS. **Proxy settings**, **metered connections**, **VPN** setup.
- **Windows Defender Firewall** – allow an app or port, create inbound/outbound rules.

[[vis:firewall]]
`},
{id:'a2-6',d:'1',t:'macOS & Linux',md:`
## macOS essentials
- **Finder** (file manager), **Dock**, **Spotlight** (Cmd+Space search), **Mission Control** (window overview), **Keychain** (passwords/certs), **iCloud**, **Time Machine** (backups), **Disk Utility** (repair/erase), **Terminal**, **FileVault** (full disk encryption), **Gatekeeper** (blocks untrusted apps), **Remote Disc**, **Force Quit** (Cmd+Option+Esc).
- Apps install via **.dmg** (drag into Applications), **.pkg** installer, or the **App Store**. Remove by dragging to Trash.
- **System Settings** has Privacy & Security, Displays, Accessibility, Network, Printers.

## Linux essentials
[[vis:linux]]
| Command | Does |
|---|---|
| ls / cd / pwd | List / change / print directory |
| cp / mv / rm | Copy / move‑rename / delete |
| chmod / chown | Change permissions / owner |
| sudo / su | Run as superuser / switch user |
| apt / dnf (yum) | Install packages (Debian / Red Hat) |
| ip / ifconfig | Network config |
| ping / dig / curl | Network tests / DNS / web |
| grep / find | Search text / files |
| ps / top | Processes |
| df / du | Disk free / usage |
| man | Manual pages |
| nano / vi | Text editors |
| cat | Print file contents |

!mnem Linux permissions **rwx** = **4+2+1**. ~chmod 755~ = owner rwx (7), group r‑x (5), others r‑x (5).

Important files: **/etc/passwd** (accounts), **/etc/shadow** (password hashes), **/etc/hosts**, **/etc/resolv.conf** (DNS servers), **/etc/fstab** (mounts). **Root** account = superuser.
`},
{id:'a2-7',d:'2',t:'Physical & logical security, Active Directory',md:`
## Physical security
**Bollards**, **access control vestibule** (mantrap – prevents tailgating), **badge readers**, **video surveillance**, **alarm systems**, **motion sensors**, **door locks**, **equipment locks** (cable locks), **security guards**, **fences**, **biometrics** (fingerprint, facial, retina, palm), **key fobs**, **smart cards**, **hard tokens**.

## Logical security
- **Principle of least privilege** – only the access needed.
- **Zero Trust** – never trust, always verify, every request.
- **ACLs**, **MFA** (something you **know**, **have**, **are**; somewhere you are), **email/SMS/TOTP/push codes**, **hardware tokens**, **passkeys**.
- **SSO**, **MDM**, **DLP**, **IAM**, **directory services**.

## Active Directory
[[vis:aduc]]
- **Domain** – group of computers/users managed centrally.
- **Organizational Units (OUs)** – folders to organize users/computers and apply policies.
- **Group Policy Objects (GPOs)** – push settings (password rules, mapped drives, login scripts).
- **Security groups** – give permissions to many users at once.
- **Home folder** and **folder redirection** – user data stored on a server.
- **Login script** – runs at sign‑in.

!exam User changed departments and can't access the new team share → add them to the right **security group**, then they must log off/on (or run ~gpupdate /force~ for policy changes).
`},
{id:'a2-8',d:'2',t:'Malware, social engineering & threats',md:`
## Malware types
| Type | What it does |
|---|---|
| **Virus** | Attaches to files, needs a user to run it |
| **Worm** | Spreads by itself over networks |
| **Trojan** | Pretends to be legit software |
| **Ransomware** | Encrypts files, demands payment |
| **Rootkit** | Hides deep in OS/firmware, hard to detect |
| **Keylogger** | Records keystrokes |
| **Spyware** | Secretly collects info |
| **Cryptominer** | Uses your CPU/GPU to mine crypto (slowness, heat) |
| **Boot sector virus** | Infects MBR/boot loader |
| **Stalkerware**, **PUPs**, **adware** | Unwanted monitoring/ads |

## Tools to fight malware
Anti‑virus/anti‑malware, **EDR/MDR/XDR**, **Recovery Console / WinRE**, **email security gateway**, **software firewalls**, **user education**, **OS reinstall** (for rootkits).

## Social engineering
**Phishing** (email), **vishing** (voice), **smishing** (SMS), **QR code phishing**, **spear phishing** (targeted), **whaling** (executives), **shoulder surfing**, **tailgating/piggybacking**, **impersonation**, **dumpster diving**, **evil twin** Wi‑Fi.

## Other threats
**DoS/DDoS**, **zero‑day**, **spoofing**, **on‑path**, **brute force**, **dictionary**, **insider threat**, **SQL injection**, **XSS**, **business email compromise (BEC)**, **supply chain attack**, **non‑compliant systems**, **unpatched/EOL systems**.

!tip Play **Attack Sorter** to drill these until you recognize them instantly.
`},
{id:'a2-9',d:'2',t:'Windows security settings & hardening',md:`
## Built‑in Windows security
- **Microsoft Defender Antivirus** – real‑time protection, definition updates.
- **Windows Defender Firewall** – per‑profile rules.
- **BitLocker** – full‑volume encryption (Pro+), uses **TPM**; store the **recovery key** safely. **BitLocker To Go** encrypts USB drives.
- **EFS** – encrypts individual files/folders (NTFS).
- **UAC** – prompts before admin changes.
- **Windows Hello** – PIN, fingerprint, face.
- **Local vs Microsoft account**, **Administrator** vs **Standard user** vs **Guest**.

## NTFS vs share permissions
- **Share permissions** apply only over the network. **NTFS permissions** apply locally AND over network.
- When both apply, the **most restrictive** wins.
- **Explicit** permissions override **inherited**. **Deny** beats allow.
- Moving a file within the same NTFS volume **keeps** permissions; copying (or moving to another volume) **inherits** the destination's.

!mnem "**M**oving **S**ame volume **K**eeps" (MSK). Everything else inherits.

## Workstation hardening
- Strong **password policies** (length, complexity, expiration per policy), **screensaver lock**, **BIOS/UEFI password**.
- Disable **AutoRun/AutoPlay**, disable **Guest** account, rename/disable default **admin** accounts.
- **Patch** OS and apps, use **anti‑malware**, **least privilege**, **account lockout** after failed attempts.
- **Login time restrictions**, **disable unused services**, **change default passwords**.
`},
{id:'a2-10',d:'2',t:'Wireless, mobile, SOHO & browser security, data destruction',md:`
## Wireless security
- Protocols: **WPA2** (AES/CCMP), **WPA3** (SAE replaces PSK handshake, stronger). Avoid WEP/WPA/TKIP.
- **Personal (PSK)** vs **Enterprise** (802.1X with **RADIUS** or **TACACS+** server, individual logins). **Kerberos** for AD auth.

## Mobile device security
Screen locks (PIN, biometric, pattern), **remote wipe**, **locator apps**, **OS updates**, **device encryption**, **anti‑malware**, **remote backup**, **failed login lockout**, **MDM policies**, **BYOD vs corporate‑owned**, **profile security requirements**.

## SOHO router hardening
Change default passwords, update firmware, disable **WPS** and unneeded **UPnP**, use **WPA3**, consider **content filtering**, **IP filtering**, **guest network isolation**, **disable unused ports**, and physical security for the router.

## Browser security
Install browsers/extensions only from **trusted sources** (verify hash). Use **pop‑up blockers**, **clear cache/cookies**, **private browsing**, **password managers**, check **TLS certificates** (padlock), keep **updates** on, manage **ad blockers**, **sync** carefully.

## Data destruction
| Method | Notes |
|---|---|
| **Shredding / drilling / incinerating** | Physical destruction, most certain |
| **Degaussing** | Strong magnet – works on HDDs/tapes, NOT SSDs |
| **Secure erase / ATA Secure Erase** | Firmware‑level wipe for SSDs |
| **Low‑level format / overwrite** | Write zeros/patterns |
| **Standard format** | Does NOT truly erase data |
| **Certificate of destruction** | Proof from third‑party vendor |
`},
{id:'a2-11',d:'3',t:'Troubleshooting Windows & applications',md:`
## Common Windows problems
| Symptom | Try |
|---|---|
| **BSOD** | Note stop code; recent driver/update; RAM test; roll back driver |
| **Slow performance** | Task Manager, disable startup apps, check disk space, malware scan |
| **Boot problems / services fail to start** | Safe Mode, Startup Repair (WinRE), msconfig, check Event Viewer |
| **Applications crashing** | Repair/reinstall app, update, check Event Viewer |
| **Low memory warnings** | Close apps, add RAM, check page file |
| **USB controller resource warnings** | Too many devices on one controller |
| **System instability** | Updates, drivers, hardware tests, sfc |
| **No OS found** | Boot order, boot files (bootrec), failed drive |
| **Slow profile load** | Large roaming profile, rebuild profile |
| **Time drift** | NTP sync / CMOS battery |

## Repair tools
- **Safe Mode** – loads minimal drivers.
- **System Restore** – roll back system files/registry to a restore point (does not touch personal files).
- **Roll back driver** (Device Manager).
- **Uninstall updates**, **repair/reinstall applications**.
- **Reset this PC** – reinstall Windows keeping or removing files.
- **Reimage**, **rebuild Windows profile**, **restart services**, **update OS**, **verify requirements**.

!exam Order matters: try the **least invasive** fix first (reboot → restart service → roll back → restore → reset → reimage).
`},
{id:'a2-12',d:'3',t:'Mobile issues, security symptoms & malware removal',md:`
## Mobile OS & app issues
App fails to launch/close/update, slow performance, battery drains fast, random reboots, no Bluetooth/Wi‑Fi, screen won't autorotate (check rotation lock). Fixes: force‑stop app, clear cache/storage, update, reinstall, restart, check storage, factory reset as last resort.

## Mobile security red flags
- **Sideloaded apps / APKs from unknown sources**, **developer mode**, **rooting/jailbreaking** (bypasses protections).
- **Unexpected data usage**, **high battery drain**, **unexpected app permissions**, **fake security warnings**, **leaked personal files**.

## PC security symptoms
Pop‑ups, browser redirects, **certificate warnings**, **missing/renamed files**, **altered system files**, **disabled antivirus**, **desktop alerts**, **random OS update failures**, **email from you that you didn't send**.

## Malware removal steps (memorize this order!)
1. **Investigate and verify** malware symptoms.
2. **Quarantine** infected systems (disconnect from network).
3. **Disable System Restore** in Windows (so infected restore points aren't kept).
4. **Remediate** – update anti‑malware software, then scan and remove (Safe Mode / pre‑boot environment).
5. **Schedule scans and run updates**.
6. **Enable System Restore** and **create a restore point**.
7. **Educate the end user**.

!mnem "**I Quietly Disable Really Sick Equipment Every time**" – Investigate, Quarantine, Disable restore, Remediate, Schedule, Enable restore, Educate.
`},
{id:'a2-13',d:'4',t:'Documentation, change management & backups',md:`
## Documentation & ticketing
- **Ticketing system**: user info, device info, **description**, **category**, **severity**, **escalation levels**, clear **progress notes** and **resolution**.
- **Asset management**: inventory lists, **asset tags**, **procurement life cycle**, warranty and licensing, assigned users, **database/CMDB**.
- **Knowledge base (KB)** articles, **incident reports**, **SOPs** (standard operating procedures), **new user / offboarding checklists**, **acceptable use policy (AUP)**, **regulatory compliance**, **network diagrams**, **splash screens**.

## Change management
Purpose and scope → risk analysis → **test/sandbox** → **rollback (backout) plan** → **change advisory board (CAB)** approval → implement during maintenance window → document. **Request forms**, **change type**, **affected systems**, **end‑user acceptance**.

## Backup and recovery
| Type | Backs up | Restore needs |
|---|---|---|
| **Full** | Everything | Just the full |
| **Incremental** | Changes since **last backup (any type)** | Full + every incremental |
| **Differential** | Changes since **last full** | Full + last differential |
| **Synthetic full** | Combines full + incrementals into a new full | That one file |

- **3‑2‑1 rule**: 3 copies, 2 different media, 1 offsite.
- **GFS** (Grandfather‑Father‑Son) rotation. **On‑site vs off‑site**, **cloud backups**.
- **Test your backups** – frequency of restore tests matters.

!mnem **I**ncremental = **I**nch by inch (small, since last backup). **D**ifferential = **D**rifts larger (since last full).
`},
{id:'a2-14',d:'4',t:'Safety, environment, privacy & professionalism',md:`
## Safety
- **ESD** straps/mats, **equipment grounding**, disconnect power, **lifting techniques** (bend knees, lift with legs), **electrical fire safety** (Class C extinguisher), **personal safety** (safety goggles, air filter masks), compliance with **government regulations**.
- **Toner** spills: use a toner vacuum, not a regular vacuum.

## Environment
- **MSDS / SDS** – safety data sheet: how to handle & dispose of chemicals and batteries.
- **Proper disposal** of batteries, toner, CRTs, **e‑waste recycling**.
- **Temperature, humidity** (low humidity → more ESD; high → condensation), **ventilation**, **UPS/surge protection**, dust cleanup.

## Privacy, licensing & policy
- **Incident response**: chain of custody, inform management, **copy of drive (integrity/preservation)**, **documentation**.
- **Licensing**: **DRM**, **EULA**, **personal vs corporate**, **open source**, **valid licenses**, **subscription**.
- **Regulated data**: **PII**, **PCI DSS** (credit cards), **GDPR** (EU privacy), **PHI/HIPAA** (health), **data retention** requirements.
- **Prohibited content found**: report through proper channels, preserve evidence, chain of custody.

## Professionalism
Be on time, dress appropriately, use proper language (no jargon), **active listening**, don't interrupt, positive attitude, don't argue or be dismissive, avoid distractions (personal calls/social media), **set and meet expectations**, follow up, handle **confidential materials** carefully, deal with difficult customers calmly.
`},
{id:'a2-15',d:'4',t:'Scripting, remote access & AI basics',md:`
## Script file types
| Extension | Language |
|---|---|
| .bat | Windows batch |
| .ps1 | PowerShell |
| .vbs | VBScript |
| .sh | Linux/Unix shell |
| .js | JavaScript |
| .py | Python |

Uses: basic automation, **restart machines**, **remap network drives**, **install apps**, **automated backups**, **gather information**, **initiate updates**.
Risks: introducing malware, **inadvertently changing system settings**, **crashing the browser/system** due to mishandled resources.

## Remote access
| Tool | Notes |
|---|---|
| **RDP** | Windows Remote Desktop, TCP 3389 |
| **VPN** | Encrypted tunnel into network |
| **SSH** | Secure command line (port 22) |
| **VNC** | Cross‑platform screen sharing |
| **RMM** | Remote monitoring & management for MSPs |
| **Remote assistance / desktop management tools / video conferencing / screen sharing / file transfer** | Help desk support |
Security: use MFA, least privilege, don't expose RDP directly to the internet, log sessions.

## AI basics in IT support
- **Appropriate use** – follow company policy; don't paste confidential/PII data into public AI tools.
- **Private vs public AI** – private (enterprise) models keep data inside the org; public ones may train on input.
- **Limitations**: **hallucinations** (confident but wrong answers), **bias**, **accuracy** – always verify AI output.
- Uses: drafting KB articles, summarizing tickets, writing scripts (review before running!).
`},
],
qs:[
['a2-1','A user cannot copy a 6 GB file to a USB flash drive though it has 30 GB free. What is the most likely cause?',['The drive is formatted FAT32','The drive is NTFS','The file is encrypted','The USB port is USB 2.0'],'FAT32 has a 4 GB maximum file size.'],
['a2-1','Which file system is the default for macOS?',['APFS','NTFS','ext4','exFAT'],'Apple File System (APFS) is the macOS default.'],
['a2-1','Which file system is best for a large SD card used by both Windows and macOS?',['exFAT','NTFS','ext4','APFS'],'exFAT is widely supported and lacks FAT32\'s 4 GB file limit.'],
['a2-1','Which file system supports file permissions, encryption, and journaling on Windows?',['NTFS','FAT32','exFAT','CDFS'],'NTFS supports ACLs, EFS and journaling.'],
['a2-1','Which file system is commonly used by Linux distributions?',['ext4','APFS','ReFS','FAT16'],'ext4 is a common Linux journaling file system.'],
['a2-1','Why is running an end‑of‑life OS a risk?',['It no longer receives security patches','It cannot connect to Wi‑Fi','It can\'t run any applications','It always runs slower'],'EOL systems stop receiving updates, leaving vulnerabilities open.'],
['a2-2','A user with Windows 11 Home needs to join the company domain. What should the technician do?',['Upgrade to Windows 11 Pro','Install a VPN client','Enable BitLocker','Create a local admin account'],'Home cannot join an Active Directory domain.'],
['a2-2','Which partition style is required to boot from a 4 TB drive in UEFI mode?',['GPT','MBR','FAT32','Extended'],'GPT supports disks over 2 TB and works with UEFI.'],
['a2-2','Which boot method installs an OS over the network?',['PXE','USB','Optical','Recovery partition'],'Preboot eXecution Environment boots from the network.'],
['a2-2','Which TWO are Windows 11 hardware requirements? (Choose two.)',['TPM 2.0','UEFI Secure Boot capable','Legacy BIOS only','2 GB RAM','32 GB HDD minimum'],'Windows 11 requires TPM 2.0, UEFI/Secure Boot capable firmware, 4 GB RAM and 64 GB storage.',[0,1]],
['a2-2','A user wants to keep their files and apps while moving to a newer Windows version. Which install type?',['In‑place upgrade','Clean install','Image deployment','Factory reset'],'An in‑place upgrade preserves apps, settings and data.'],
['a2-2','Which Windows edition feature lets a PC accept incoming Remote Desktop connections?',['Pro and above','Home only','All editions','Only Server'],'Home can initiate but cannot host RDP sessions.'],
['a2-3','Which tool shows Windows System, Application and Security logs?',['Event Viewer','Device Manager','Task Scheduler','Disk Management'],'Event Viewer (eventvwr.msc) displays logs.','eventvwr'],
['a2-3','In Device Manager, what does a yellow triangle with an exclamation point mean?',['There is a problem with the device or driver','The device is disabled','The device is working normally','The device is hidden'],'Yellow "!" = error; a down arrow = disabled.','devmgr'],
['a2-3','A computer takes 5 minutes to reach a usable desktop. Which Task Manager tab helps disable programs that launch at sign‑in?',['Startup apps','Performance','Users','Details'],'The Startup apps tab shows startup impact and lets you disable items.','taskmgr'],
['a2-3','A new drive was installed but doesn\'t show in File Explorer. Which tool should be used to initialize and format it?',['Disk Management','Device Manager','Event Viewer','Services'],'Disk Management initializes, partitions, formats and assigns letters.','diskmgmt'],
['a2-3','A tech needs to run a cleanup script every night at 2 a.m. Which tool should be used?',['Task Scheduler','Services','msconfig','Performance Monitor'],'Task Scheduler runs tasks on schedules or triggers.'],
['a2-3','Which tool is used to boot Windows into Safe Mode on the next restart via a checkbox?',['msconfig','regedit','diskmgmt.msc','certmgr.msc'],'System Configuration (msconfig) Boot tab has a Safe boot option.'],
['a2-3','A service must start automatically after reboot. Where is its startup type changed?',['services.msc','eventvwr.msc','devmgmt.msc','lusrmgr.msc'],'The Services console sets Automatic/Manual/Disabled startup types.','services'],
['a2-3','Which tool records performance counters over time to find a bottleneck?',['Performance Monitor','Task Manager Users tab','Disk Cleanup','winver'],'perfmon.msc logs counters over time.'],
['a2-3','Which Task Manager tab would you use to end a frozen application?',['Processes','Startup apps','App history','Performance'],'End task from the Processes tab.','taskmgr'],
['a2-4','Which command repairs corrupted Windows system files?',['sfc /scannow','chkdsk /f','ipconfig /flushdns','gpupdate /force'],'System File Checker restores protected system files.','cmd-sfc'],
['a2-4','sfc reports it could not repair some files. Which command should be run next to repair the Windows image?',['DISM /Online /Cleanup-Image /RestoreHealth','format C:','diskpart clean','netstat -an'],'DISM repairs the component store that sfc uses.'],
['a2-4','A new Group Policy should apply immediately on a PC. Which command?',['gpupdate /force','gpresult /r','net use','whoami'],'gpupdate /force reapplies all policies.','cmd-gpupdate'],
['a2-4','Which command shows which Group Policies were applied to a user?',['gpresult /r','gpupdate','sfc','tracert'],'gpresult shows the Resultant Set of Policy.'],
['a2-4','Which command maps a network drive?',['net use','net user','ipconfig','robocopy'],'net use Z: \\\\server\\share maps a drive.'],
['a2-4','Which command shows active connections and listening ports?',['netstat','nslookup','hostname','pathping'],'netstat -an lists connections and ports.','cmd-netstat'],
['a2-4','A website moved to a new IP but a PC still reaches the old one. Which command helps?',['ipconfig /flushdns','ipconfig /release','chkdsk','sfc /scannow'],'Flushing clears the cached DNS records.'],
['a2-4','Which command checks a drive for file system errors and bad sectors?',['chkdsk /r','sfc /scannow','format /q','diskpart list'],'chkdsk /r locates bad sectors and recovers readable data (implies /f).','cmd-sfc'],
['a2-4','Which command shows every router hop between a PC and a website?',['tracert','ping','netstat','hostname'],'tracert lists each hop.','cmd-tracert'],
['a2-4','Which command copies a folder tree with retries and can mirror a directory?',['robocopy','copy','md','dir'],'Robust File Copy supports /MIR and retries.'],
['a2-4','Which command shows which DNS server answered and what IP a name resolves to?',['nslookup','netstat','ping -t','winver'],'nslookup queries DNS directly.','cmd-nslookup'],
['a2-5','Where would you set a static IP address in Windows 11?',['Settings > Network & internet > adapter properties (or ncpa.cpl)','Device Manager','Disk Management','Task Scheduler'],'IP settings are in Network & internet or the adapter properties.','settings'],
['a2-5','A user wants to see file extensions like .exe in File Explorer. Where is this changed?',['File Explorer Options (View)','Internet Options','Programs and Features','Device Manager'],'File Explorer Options > View controls hidden files and extensions.'],
['a2-5','A laptop on coffee‑shop Wi‑Fi should be hidden from other devices. Which network profile?',['Public','Private','Domain','Metered'],'Public profile disables discovery and tightens firewall rules.'],
['a2-5','Which Control Panel utility changes what happens when a laptop lid closes?',['Power Options','Sound','Mail','Indexing Options'],'Power Options controls lid, sleep and hibernate behavior.'],
['a2-5','A tech must allow inbound TCP 8080 for an internal app. Where?',['Windows Defender Firewall with Advanced Security – new inbound rule','Device Manager','Internet Options > Privacy','Task Manager'],'Create an inbound port rule in Defender Firewall.','firewall'],
['a2-5','Which Windows network model has central accounts managed by a server?',['Domain','Workgroup','Homegroup','Ad hoc'],'Active Directory domains centralize authentication.'],
['a2-6','Which macOS feature provides automatic backups to an external drive?',['Time Machine','FileVault','Gatekeeper','Keychain'],'Time Machine is macOS\'s built‑in backup.'],
['a2-6','Which macOS feature provides full‑disk encryption?',['FileVault','Time Machine','Spotlight','Mission Control'],'FileVault encrypts the startup disk.'],
['a2-6','Which Linux command changes file permissions?',['chmod','chown','grep','pwd'],'chmod changes permission bits; chown changes ownership.','linux'],
['a2-6','On Ubuntu, which command installs a package?',['sudo apt install','sudo dnf install','sudo installpkg','brew install'],'Ubuntu/Debian use apt; Red Hat/Fedora use dnf.'],
['a2-6','What permissions does chmod 750 give?',['Owner rwx, group r‑x, others none','Owner rw‑, group r‑‑, others none','Everyone rwx','Owner r‑x, group rwx, others none'],'7 = rwx, 5 = r‑x, 0 = ‑‑‑.'],
['a2-6','Which Linux command searches text inside files for a pattern?',['grep','find','ls','df'],'grep searches text; find searches for files.'],
['a2-6','Which Linux file lists the DNS servers a system uses?',['/etc/resolv.conf','/etc/passwd','/etc/fstab','/etc/shadow'],'resolv.conf lists nameservers.'],
['a2-6','Which macOS tool stores saved passwords and certificates?',['Keychain Access','Finder','Dock','Boot Camp'],'Keychain stores credentials and certificates.'],
['a2-6','Which Linux command shows free disk space on mounted file systems?',['df -h','du -h','top','ps aux'],'df = disk free; du = disk usage of files/folders.'],
['a2-7','Which physical control prevents tailgating by allowing only one person through at a time?',['Access control vestibule','Bollards','Motion sensor','Cable lock'],'A vestibule (mantrap) has two interlocking doors.'],
['a2-7','Which security principle gives users only the access needed for their job?',['Least privilege','Zero Trust','Defense in depth','Separation of duties'],'Least privilege limits access to what is needed.'],
['a2-7','In Active Directory, what is used to organize users and computers so policies can be applied?',['Organizational Units','Workgroups','VLANs','Shares'],'OUs are AD containers for organization and GPO linking.','aduc'],
['a2-7','A password plus a fingerprint is an example of what?',['Multifactor authentication','Single sign‑on','Federation','Two passwords'],'Two different factor types (know + are) = MFA.'],
['a2-7','Which security model says "never trust, always verify" even inside the network?',['Zero Trust','Implicit trust','Perimeter defense only','Discretionary access'],'Zero Trust verifies every request.'],
['a2-7','Which feature redirects a user\'s Documents folder to a network server?',['Folder redirection','Login script','Home router','Mapped printer'],'Folder redirection stores user folders on a server.'],
['a2-7','A new hire\'s account must get the same file share access as their team. What is most efficient?',['Add the account to the team\'s security group','Assign permissions individually to each file','Give them Domain Admin','Copy another user\'s password'],'Group‑based permissions are easier and consistent.'],
['a2-8','Which malware spreads across a network without user interaction?',['Worm','Virus','Trojan','Spyware'],'Worms self‑replicate over networks.'],
['a2-8','A user\'s files are renamed with a ".locked" extension and a note demands payment. What is this?',['Ransomware','Adware','Rootkit','Keylogger'],'Ransomware encrypts files for ransom.'],
['a2-8','An attacker calls a user pretending to be IT support and asks for their password. What is this?',['Vishing','Smishing','Whaling','Tailgating'],'Voice phishing = vishing.'],
['a2-8','A PC is slow and the GPU runs at 100% even when idle. Which malware is likely?',['Cryptominer','Ransomware','Boot sector virus','Adware'],'Cryptominers consume CPU/GPU resources.'],
['a2-8','Malware that hides in the kernel and is hard to remove is best handled by what?',['Reimaging/reinstalling the OS','Clearing browser cache','Running Disk Cleanup','Restarting the spooler'],'Rootkits often require a clean OS reinstall.'],
['a2-8','A user receives an email from the "CEO" requesting an urgent wire transfer. What is this?',['Business email compromise / whaling‑style phishing','Smishing','Shoulder surfing','Evil twin'],'BEC impersonates executives to trick payments.'],
['a2-8','Which attack uses a rogue Wi‑Fi access point that mimics a legitimate network name?',['Evil twin','Bluejacking','DDoS','SQL injection'],'An evil twin copies a trusted SSID.'],
['a2-9','Which Windows feature encrypts an entire volume and can use the TPM?',['BitLocker','EFS','UAC','Windows Hello'],'BitLocker is full‑volume encryption.'],
['a2-9','A user has Full Control NTFS and Read share permissions on a folder. What access do they have over the network?',['Read','Full Control','Modify','No access'],'Over the network, the most restrictive of share and NTFS applies.'],
['a2-9','A file is MOVED to a different folder on the same NTFS volume. What happens to its permissions?',['They are kept','They inherit the destination','They are removed','They become Everyone: Full Control'],'Move within the same volume keeps permissions.'],
['a2-9','Which feature prompts a user before a program makes administrative changes?',['UAC','BitLocker','SmartScreen','Credential Guard'],'User Account Control prompts for elevation.'],
['a2-9','Which TWO are workstation hardening steps? (Choose two.)',['Disable AutoRun/AutoPlay','Disable the Guest account','Enable WPS','Share the C: drive','Disable screen lock'],'Disabling AutoRun and the guest account reduce risk.',[0,1]],
['a2-9','Which setting locks an account after several wrong password attempts?',['Account lockout policy','Password history','Login time restriction','UAC'],'Account lockout thwarts brute force.'],
['a2-9','Which feature encrypts individual files on NTFS for a single user?',['EFS','BitLocker To Go','FileVault','TPM'],'Encrypting File System works per file/folder.'],
['a2-10','Which Wi‑Fi security uses SAE to replace the PSK handshake?',['WPA3','WPA2','WEP','WPA‑TKIP'],'WPA3‑Personal uses Simultaneous Authentication of Equals.'],
['a2-10','An organization wants each employee to log into Wi‑Fi with their own credentials. What should be used?',['WPA2/WPA3‑Enterprise with RADIUS','WPA2‑Personal','Open network with captive portal','MAC filtering'],'Enterprise mode uses 802.1X with a RADIUS server.'],
['a2-10','Which data destruction method does NOT work on SSDs?',['Degaussing','Shredding','Secure Erase','Incineration'],'SSDs store data in flash, not magnetically.'],
['a2-10','A company outsources drive destruction. What should it obtain as proof?',['Certificate of destruction','Purchase order','EULA','SLA'],'A certificate documents destruction for compliance.'],
['a2-10','Which SOHO setting should be DISABLED because its PIN can be brute‑forced?',['WPS','WPA3','Firewall','DHCP'],'WPS PIN is vulnerable to brute force.'],
['a2-10','A user wants to install a browser extension. What is the safest practice?',['Install only from the official store/trusted source and review permissions','Download from any forum','Disable antivirus first','Use an admin account always'],'Trusted sources reduce malicious extensions.'],
['a2-10','A lost corporate phone contains sensitive email. What should be done FIRST?',['Remote wipe it via MDM','Change the Wi‑Fi password','Factory reset the PC','Wait 24 hours'],'Remote wipe protects data on lost devices.'],
['a2-11','A PC blue‑screens right after a new graphics driver was installed. What is the best first fix?',['Roll back the driver in Safe Mode','Replace the GPU','Reinstall Windows','Update BIOS'],'Rolling back the recent change is least invasive.'],
['a2-11','Which feature reverts system files and registry without affecting personal documents?',['System Restore','Reset this PC (remove everything)','Reimaging','Disk Cleanup'],'System Restore uses restore points.'],
['a2-11','A user\'s profile takes several minutes to load at logon and is corrupt. What could fix this?',['Rebuild the Windows user profile','Replace RAM','Disable the firewall','Flush DNS'],'Rebuilding the profile resolves corruption.'],
['a2-11','The clock on a domain PC drifts and Kerberos logins fail. What should be checked?',['Time sync (NTP) settings','Screen resolution','Printer drivers','Wi‑Fi channel'],'Kerberos needs clocks within ~5 minutes.'],
['a2-11','An application crashes on launch. Where should the tech look for error details?',['Event Viewer Application log','Disk Management','Devices and Printers','Power Options'],'Application errors are logged in Event Viewer.','eventvwr'],
['a2-11','Windows starts in a minimal driver mode for troubleshooting. What is this?',['Safe Mode','Kiosk mode','Airplane mode','Fast Startup'],'Safe Mode loads minimal drivers and services.'],
{t:'order',l:'a2-12',q:'Put the A+ malware removal steps in order.',items:['Investigate and verify malware symptoms','Quarantine the infected system','Disable System Restore (Windows)','Remediate: update anti-malware, scan and remove','Schedule scans and run updates','Re-enable System Restore and create a restore point','Educate the end user'],e:'I Quietly Disable Really Sick Equipment Every time.'},
['a2-12','During malware removal, why is System Restore disabled?',['To prevent infected restore points from reinfecting the PC','To speed up scanning','To free RAM','To enable Safe Mode'],'Restore points could contain the malware.'],
['a2-12','A user\'s browser keeps redirecting to unknown shopping sites. What is the most likely cause?',['Malware or a malicious extension','DNS server outage','Bad network cable','Low disk space'],'Redirects are a classic browser hijacker symptom.'],
['a2-12','A phone suddenly uses far more cellular data and battery. What should be suspected?',['Malicious app running in the background','Screen protector','Expired certificate','Weak Wi‑Fi password'],'Unexpected data/battery use is a malware red flag.'],
['a2-12','What is the risk of jailbreaking or rooting a phone?',['It bypasses built‑in security protections','It makes updates faster','It encrypts the device','It enables MDM'],'Rooting removes OS restrictions and protections.'],
['a2-12','A phone app keeps crashing. What is the BEST first step?',['Force stop and clear the app cache, then update it','Factory reset immediately','Replace the battery','Root the phone'],'Start with least invasive fixes.'],
['a2-12','What is the FIRST step of the malware removal process?',['Investigate and verify malware symptoms','Quarantine','Educate the user','Remediate'],'Verify it is actually malware first.'],
['a2-13','Which backup type copies all changes since the last FULL backup?',['Differential','Incremental','Synthetic','Copy'],'Differential = since last full.'],
['a2-13','Restoring from a full backup on Sunday and incrementals Monday–Thursday requires which sets?',['Sunday full + Mon, Tue, Wed and Thu incrementals','Sunday full + Thursday only','Thursday incremental only','Mon–Thu only'],'Incrementals each depend on the previous backup.'],
['a2-13','What does the 3‑2‑1 backup rule mean?',['3 copies, 2 media types, 1 offsite','3 backups per day, 2 full, 1 incremental','3 servers, 2 sites, 1 cloud','3 weeks retention, 2 tapes, 1 disk'],'3 copies of data, on 2 kinds of media, 1 offsite.'],
['a2-13','Which document describes how to undo a change if it fails?',['Rollback (backout) plan','Risk register','EULA','AUP'],'Change requests include a backout plan.'],
['a2-13','Which group reviews and approves major IT changes?',['Change advisory board','Help desk','Incident response team','Asset manager'],'The CAB approves changes.'],
['a2-13','What should a help desk ticket include? (Choose three.)',['Problem description','Severity/priority','Resolution notes','The user\'s password','Personal opinions'],'Never record passwords; be factual.',[0,1,2]],
['a2-13','Which document tells employees what they may and may not do with company IT resources?',['Acceptable use policy','SLA','MSDS','Network diagram'],'The AUP defines permitted use.'],
['a2-14','Where would you find how to safely dispose of a toner cartridge?',['Safety Data Sheet (SDS/MSDS)','EULA','AUP','SLA'],'SDS lists handling and disposal information.'],
['a2-14','Which fire extinguisher class is used for electrical fires?',['Class C','Class A','Class B','Class K'],'Class C is for energized electrical equipment (US).'],
['a2-14','Low humidity in a server room increases the risk of what?',['Electrostatic discharge','Condensation','Corrosion','Mold'],'Dry air increases static buildup.'],
['a2-14','A tech finds illegal content on a user\'s PC during repair. What should they do?',['Stop, preserve evidence, and report it through proper channels','Delete it','Ignore it','Confront the user'],'Follow incident response and chain of custody.'],
['a2-14','Which regulation protects credit card data?',['PCI DSS','HIPAA','GDPR','FERPA'],'Payment Card Industry Data Security Standard.'],
['a2-14','A customer is angry about a repeated issue. What should the technician do?',['Listen actively, stay calm, and avoid arguing','Interrupt with the fix','Tell them it is their fault','Transfer them immediately'],'Professionalism: listen and empathize.'],
['a2-14','What is the proper way to lift a heavy UPS?',['Bend at the knees and lift with the legs','Bend at the waist','Twist while lifting','Lift quickly with arms'],'Lift with legs, keep back straight.'],
['a2-14','Which document ensures evidence has been tracked and handled properly?',['Chain of custody','EULA','Change request','KB article'],'Chain of custody documents who handled evidence.'],
['a2-15','Which file extension is a PowerShell script?',['.ps1','.bat','.sh','.vbs'],'PowerShell scripts use .ps1.'],
['a2-15','Which remote access tool is used by MSPs to monitor and patch many client devices?',['RMM','RDP only','Telnet','FTP'],'Remote Monitoring and Management.'],
['a2-15','What is an AI "hallucination"?',['A confident but incorrect or fabricated answer','A GPU overheating','An encrypted prompt','A virus in the model'],'Always verify AI output.'],
['a2-15','An employee wants to paste customer PII into a public AI chatbot to summarize it. What is the concern?',['Data privacy – public AI may store or train on the data','The AI will be too slow','It violates the EULA of Windows','There is no concern'],'Use approved private AI tools and follow policy.'],
['a2-15','Which risk applies to running scripts found online?',['They may contain malware or change system settings unexpectedly','They always need Linux','They cannot automate tasks','They require a GPU'],'Review and test scripts before running.'],
['a2-15','Which protocol is cross‑platform screen‑sharing remote access?',['VNC','RDP','SSH','SFTP'],'VNC works across Windows, macOS and Linux.'],
['a2-15','Which file extension runs in Linux shell?',['.sh','.ps1','.bat','.vbs'],'.sh is a shell script.'],
]};
