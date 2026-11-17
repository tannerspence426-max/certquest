CONTENT.certs.sp = {
id:'sp', short:'Security+', name:'CompTIA Security+', code:'SY0-701', color:'#3b82f6', pass:'750 / 900', minutes:90, maxQ:90, group:'Security+',
domains:[{id:'1',t:'General Security Concepts',w:12},{id:'2',t:'Threats, Vulnerabilities & Mitigations',w:22},{id:'3',t:'Security Architecture',w:18},{id:'4',t:'Security Operations',w:28},{id:'5',t:'Security Program Management & Oversight',w:20}],
lessons:[
{id:'sp-1',d:'1',t:'Security controls, CIA, AAA & Zero Trust',md:`
## Control categories (WHO/WHAT implements it)
| Category | Example |
|---|---|
| **Technical** | Firewall, encryption, MFA |
| **Managerial** | Policies, risk assessments |
| **Operational** | Guards, awareness training, procedures carried out by people |
| **Physical** | Fences, locks, bollards |

## Control types (WHAT it does)
| Type | Example |
|---|---|
| **Preventive** | Firewall rule, lock |
| **Deterrent** | Warning sign, lighting |
| **Detective** | IDS, log review, camera footage review |
| **Corrective** | Restore from backup, patch after incident |
| **Compensating** | Alternative control when the ideal one isn't possible |
| **Directive** | Policy telling people what to do |

!mnem Types: "**P**lease **D**on't **D**rop **C**ats, **C**ats **D**islike it" – Preventive, Deterrent, Detective, Corrective, Compensating, Directive.

## Fundamental concepts
- **CIA triad**: **Confidentiality** (only authorized see it – encryption), **Integrity** (not altered – hashing, signatures), **Availability** (accessible when needed – redundancy, backups).
- **Non‑repudiation** – can't deny you did it (digital signatures).
- **AAA**: **Authentication** (prove who you are), **Authorization** (what you may do), **Accounting** (log what you did). Authenticating **people** and **systems**.
- **Gap analysis** – compare current state to desired framework.
- **Zero Trust**: **control plane** (adaptive identity, threat scope reduction, policy‑driven access control, **Policy Engine**, **Policy Administrator**) and **data plane** (implicit trust zones, subject/system, **Policy Enforcement Point**).
- **Physical security**: bollards, access control vestibule, fencing, video surveillance, guards, access badges, lighting, sensors (infrared, pressure, microwave, ultrasonic).
- **Deception & disruption**: **honeypot**, **honeynet**, **honeyfile**, **honeytoken** (fake credential/data that alerts when used).
`},
{id:'sp-2',d:'1',t:'Change management',md:`
Changes break things – and attackers love unmanaged systems. Security+ expects you to know the process and its technical side.

## Business processes
- **Approval process** and **ownership** (who owns the system/change).
- **Stakeholders** – who is affected.
- **Impact analysis** – what could go wrong.
- **Test results** – sandbox first.
- **Backout plan** – how to undo.
- **Maintenance window** – scheduled low‑impact time.
- **Standard operating procedure** – repeatable change steps.

## Technical implications
- **Allow lists / deny lists** may need updates.
- **Restricted activities**, **downtime**, **service/application restarts**, **legacy applications**, **dependencies**.

## Documentation & version control
Update diagrams, policies/procedures, and track versions of code and configs.

[[vis:change]]
!exam If a question asks what should exist BEFORE a change is implemented: approval, impact analysis, testing, and a **backout plan**.
`},
{id:'sp-3',d:'1',t:'Cryptography & PKI',md:`
## Encryption basics
- **Symmetric** – one shared key (fast): **AES** (current standard), 3DES (old), ChaCha20. Problem: key distribution.
- **Asymmetric** – key **pair**: public key encrypts, private key decrypts; private key signs, public key verifies. **RSA**, **ECC** (smaller keys, mobile/IoT), **Diffie‑Hellman** (key exchange).
- **Hashing** – one‑way fingerprint: **SHA‑256**, (MD5/SHA‑1 are weak). Used for integrity & password storage.
- **Salting** – random value added before hashing so identical passwords have different hashes (defeats rainbow tables). **Key stretching** (PBKDF2, bcrypt) slows brute force.
- **Digital signature** = hash of message encrypted with sender's **private** key → integrity + authentication + non‑repudiation.
- **Key length** matters; **key exchange** and **key escrow** (third party holds keys).

!mnem "**Encrypt with THEIR public, Sign with YOUR private.**"

## Where it's applied
- Encryption levels: **full disk**, **partition**, **file**, **volume**, **database**, **record**; **transport/communication** (TLS, IPsec VPN).
- Tools: **TPM**, **HSM**, **key management system**, **secure enclave**.
- **Obfuscation**: **steganography** (hide data in images), **tokenization** (replace card number with a token), **data masking** (show ****1234).
- **Blockchain** / **open public ledger**.

## Public Key Infrastructure
[[vis:pki]]
- **CA** issues certificates; **root of trust** → **intermediate CA** → **leaf** certificate.
- **CSR** – request you generate with your public key.
- **CRL** (list of revoked certs) and **OCSP** (real‑time status check; **OCSP stapling** has the server attach it).
- **Self‑signed** (not trusted by default) vs **third‑party** certs. **Wildcard** (*.example.com) and **SAN** (multiple names) certificates.
- **Certificate pinning**, **key escrow**.
`},
{id:'sp-4',d:'2',t:'Threat actors, motivations & vectors',md:`
## Threat actors
| Actor | Resources / skill | Typical motive |
|---|---|---|
| **Nation‑state** | Very high; **APT** | Espionage, war, disruption |
| **Unskilled attacker** (script kiddie) | Low | Thrills, notoriety |
| **Hacktivist** | Varies | Ideology, causes |
| **Insider threat** | Has legitimate access | Revenge, money |
| **Organized crime** | High | **Financial gain** |
| **Shadow IT** | Employees using unapproved tech | Convenience (unintentional risk) |

Attributes: **internal vs external**, **resources/funding**, **level of sophistication**. Motivations: data exfiltration, espionage, service disruption, blackmail, financial gain, philosophical/political beliefs, ethical, revenge, disruption/chaos, war.

## Threat vectors & attack surfaces
- **Message‑based**: email, SMS, IM. **Image‑based**, **file‑based**, **voice call**, **removable devices**.
- **Vulnerable software** (client‑based vs agentless), **unsupported systems**.
- **Unsecure networks**: wireless, wired, Bluetooth.
- **Open service ports**, **default credentials**.
- **Supply chain**: MSPs, vendors, suppliers.
- **Human vectors/social engineering**: phishing, vishing, smishing, **misinformation/disinformation**, **impersonation**, **business email compromise**, **pretexting**, **watering hole**, **brand impersonation**, **typosquatting**.
`},
{id:'sp-5',d:'2',t:'Vulnerability types',md:`
| Category | Examples |
|---|---|
| **Application** | **Memory injection**, **buffer overflow**, **race conditions** (TOC/TOU), **malicious update** |
| **OS‑based** | Unpatched kernels, privilege escalation |
| **Web‑based** | **SQL injection (SQLi)**, **cross‑site scripting (XSS)** |
| **Hardware** | **Firmware** flaws, **end‑of‑life**, **legacy** |
| **Virtualization** | **VM escape**, **resource reuse** |
| **Cloud‑specific** | Misconfigured storage buckets, exposed APIs |
| **Supply chain** | Service provider, hardware provider, software provider |
| **Cryptographic** | Weak algorithms, poor key management |
| **Misconfiguration** | Open permissions, default settings |
| **Mobile device** | **Side loading**, **jailbreaking** |
| **Zero‑day** | Unknown to vendor, no patch yet |

!key Race condition / TOCTOU: the system checks something (time of check) and then uses it (time of use); an attacker changes it in between.

!key Buffer overflow: writing more data than a memory buffer holds, overwriting adjacent memory, possibly running attacker code. Fix: input validation, bounds checking, memory‑safe languages, ASLR/DEP.
`},
{id:'sp-6',d:'2',t:'Malicious activity & attack indicators',md:`
## Malware
Ransomware, Trojan, worm, spyware, bloatware, virus, keylogger, logic bomb, rootkit (see the A+ list too).

## Physical & network attacks
- **Physical**: brute force (forcing doors), **RFID cloning**, environmental.
- **Network**: **DDoS** (amplified, reflected), **DNS attacks**, **wireless** (evil twin, deauth), **on‑path**, **credential replay**, **malicious code**.

## Application attacks
**Injection**, **buffer overflow**, **replay**, **privilege escalation**, **forgery** (CSRF/SSRF), **directory traversal**.

## Cryptographic & password attacks
**Downgrade** (force weaker protocol), **collision** (two inputs same hash), **birthday** attack. **Password spraying** (one password, many accounts) vs **brute force** (many passwords, one account).

[[vis:attackflow]]
## Indicators of compromise
- **Account lockout**, **concurrent session usage**, **blocked content**, **impossible travel** (logins from two distant places minutes apart), **resource consumption**, **resource inaccessibility**, **out‑of‑cycle logging**, **published/documented** (data leaked online), **missing logs**.
`},
{id:'sp-7',d:'2',t:'Mitigation techniques',md:`
- **Segmentation** – separate networks to limit spread.
- **Access control**: **ACLs**, **permissions**.
- **Application allow list** – only approved software runs.
- **Isolation** – quarantine compromised systems.
- **Patching** – the #1 fix for known vulnerabilities.
- **Encryption**.
- **Monitoring**.
- **Least privilege**.
- **Configuration enforcement** (baselines, GPOs, MDM).
- **Decommissioning** unused systems.
- **Hardening techniques**: encryption, install **endpoint protection** (EDR), **host‑based firewall**, **HIPS**, **disable ports/protocols**, **default password changes**, **removal of unnecessary software**.

!exam "Which BEST mitigates a known vulnerability with an available fix?" → **patch**. "No patch exists yet" → **compensating control** (segment/isolate, WAF rule, disable feature).
`},
{id:'sp-8',d:'3',t:'Architecture models',md:`
## Cloud & infrastructure concepts
- **Responsibility matrix** (shared responsibility): provider secures the cloud; customer secures what they put in it. More responsibility shifts to the provider going IaaS → PaaS → SaaS.
- **Hybrid considerations**, **third‑party vendors**.
- **Infrastructure as Code (IaC)**, **serverless** (functions, no servers to manage), **microservices** (small independent services via APIs).
- **Network infrastructure**: **physical isolation (air gap)**, **logical segmentation**, **SDN**.
- **On‑premises**, **centralized vs decentralized**, **containerization**, **virtualization**.
- **IoT**, **ICS/SCADA** (industrial control), **RTOS** (real‑time OS), **embedded systems**, **high availability**.

## Considerations
Availability, resilience, cost, responsiveness, scalability, ease of deployment, risk transference, ease of recovery, **patch availability**, **inability to patch** (embedded/ICS!), power, compute.

!exam ICS/SCADA and embedded devices often **can't be patched** → isolate/segment them and monitor.
`},
{id:'sp-9',d:'3',t:'Securing enterprise infrastructure & data',md:`
## Infrastructure considerations
- **Device placement**, **security zones**, **attack surface**, **connectivity**.
- **Failure modes**: **fail‑open** (keeps traffic flowing – availability) vs **fail‑closed** (blocks – security).
- **Device attribute**: **active vs passive**, **inline vs tap/monitor**.
- **Network appliances**: **jump server**, **proxy server**, **IPS/IDS**, **load balancer**, **sensors**.
- **Port security** (802.1X, **EAP**), **firewall types**: **WAF**, **UTM**, **NGFW**, **Layer 4 vs Layer 7**.
- **Secure communication**: **VPN**, **remote access**, **tunneling** (TLS, IPsec), **SD‑WAN**, **SASE**.

[[vis:vpn]]

## Data protection
- **Data types**: regulated, trade secret, intellectual property, legal, financial, human‑ and non‑human‑readable.
- **Classifications**: sensitive, confidential, public, restricted, private, critical.
- **Data states**: **at rest** (disk), **in transit** (network), **in use** (memory/CPU).
- **Data sovereignty** (laws of the country where data is stored), **geolocation**.
- Methods: **geographic restrictions**, **encryption**, **hashing**, **masking**, **tokenization**, **obfuscation**, **segmentation**, **permission restrictions**.
`},
{id:'sp-10',d:'3',t:'Resilience & recovery',md:`
- **High availability**: **load balancing vs clustering**.
- **Site considerations**: **hot** (ready immediately), **warm**, **cold** sites; **geographic dispersion**.
- **Platform diversity**, **multi‑cloud** systems.
- **Continuity of operations (COOP)**, **capacity planning** (people, technology, infrastructure).
- **Testing**: **tabletop exercises** (discussion), **failover**, **simulation**, **parallel processing**.
- **Backups**: **on‑site/off‑site**, **frequency**, **encryption**, **snapshots**, **recovery**, **replication**, **journaling**.
- **Power**: **generators** (long outages), **UPS** (short bridge).

| Metric | Meaning |
|---|---|
| **RTO** | How fast you must be back up |
| **RPO** | How much data (time) you can lose |
| **MTTR** | Average time to repair |
| **MTBF** | Average time between failures |

!mnem RP**O** = **O**ops, how much data did we lose? RT**O** = **T**ime until we're back **O**nline.
`},
{id:'sp-11',d:'4',t:'Hardening, wireless, mobile & application security',md:`
## Secure baselines
**Establish → deploy → maintain** baselines. Harden targets: **mobile devices, workstations, switches, routers, cloud infrastructure, servers, ICS/SCADA, embedded systems, RTOS, IoT**.

## Wireless
- **Installation**: site surveys, **heat maps**.
- **WPA3**, **AAA/RADIUS**, cryptographic protocols, authentication protocols (EAP variants).

## Mobile solutions
**MDM**; deployment models **BYOD**, **COPE** (corporate‑owned, personally enabled), **CYOD** (choose your own device); connection methods: **cellular, Wi‑Fi, Bluetooth**.

## Application security
- **Input validation**, **secure cookies**, **static code analysis (SAST)**, **code signing**.
- **Sandboxing**, **monitoring**.

[[vis:firewall]]
`},
{id:'sp-12',d:'4',t:'Asset & vulnerability management',md:`
## Asset management
**Acquisition/procurement** → **assignment/accounting** (ownership, classification) → **monitoring/asset tracking** (inventory, enumeration) → **disposal/decommissioning** (sanitization, destruction, **certification**, **data retention**).

## Vulnerability management
- **Identification**: **vulnerability scan**, **application security** (static/dynamic analysis, **package monitoring**), **threat feed** (OSINT, proprietary, information‑sharing organizations, **dark web**), **penetration testing**, **responsible disclosure / bug bounty**, **system/process audit**.
- **Analysis**: confirm (**false positive** vs **false negative**), **prioritize**, **CVSS** (score 0–10) and **CVE** (ID for a specific vulnerability), classification, exposure factor, environmental variables, industry/organizational impact, risk tolerance.
- **Response/remediation**: **patching**, **insurance**, **segmentation**, **compensating controls**, **exceptions and exemptions**.
- **Validation**: **rescanning**, **audit**, **verification**. **Reporting**.

[[vis:nmap]]
!key False positive: scanner reports a vulnerability that isn't really there. False negative: a real vulnerability the scanner missed (worse!).
`},
{id:'sp-13',d:'4',t:'Monitoring & security tools',md:`
## Monitoring computing resources
Systems, applications, infrastructure. Activities: **log aggregation**, **alerting**, **scanning**, **reporting**, **archiving**, **alert response/remediation** (quarantine, **alert tuning**).

## Tools
[[vis:siem]]
| Tool | What it does |
|---|---|
| **SIEM** | Collects & correlates logs; alerts |
| **SCAP** | Standard for automated configuration/vuln checking |
| **Benchmarks** (e.g., CIS) | Hardening baselines |
| **Agents / agentless** | How data is collected |
| **Antivirus**, **DLP** | Stop malware / stop data leaving |
| **SNMP traps**, **NetFlow** | Device alerts / traffic flows |
| **Vulnerability scanners** | Find weaknesses |

## Enterprise capabilities
- **Firewall** (rules, access lists, ports/protocols, screened subnets), **IDS/IPS** (trends, **signatures**), **web filter** (agent‑based, **centralized proxy**, **URL scanning**, **content categorization**, **block rules**, **reputation**), **OS security** (Group Policy, **SELinux**).
- **Secure protocols** (replace Telnet→SSH, HTTP→HTTPS, FTP→SFTP), **DNS filtering**, **email security**: **DMARC**, **DKIM**, **SPF**, **gateway**.
- **File integrity monitoring (FIM)**, **DLP**, **NAC**, **EDR/XDR**, **user behavior analytics (UBA)**.

!mnem Email auth: **SPF** = **S**ender **P**ermitted **F**rom (which servers can send). **DKIM** = **K**ey signature on the mail. **DMARC** = what to do if they fail (policy + reports).
`},
{id:'sp-14',d:'4',t:'Identity & access management',md:`
- **Provisioning/de‑provisioning** user accounts, **permission assignments**, **identity proofing**.
- **Federation** (trust between organizations), **SSO** via **LDAP**, **OAuth** (authorization delegation), **SAML** (XML assertions for web SSO), **OpenID Connect**.
- **Interoperability**, **attestation**.

## Access control models
| Model | How access is decided |
|---|---|
| **Mandatory (MAC)** | Labels/clearances set by admins (military) |
| **Discretionary (DAC)** | Owner decides (NTFS file owner) |
| **Role‑based (RBAC)** | Job role |
| **Rule‑based** | Rules like time or IP (firewall) |
| **Attribute‑based (ABAC)** | Many attributes (dept, location, device) |
| **Time‑of‑day restrictions**, **least privilege** | |

## MFA
- Factors: **something you know** (PIN), **have** (token, phone), **are** (biometrics), **somewhere you are** (location).
- Implementations: **biometrics**, **hard/soft authentication tokens**, **security keys** (FIDO2), **passkeys**.

## Password concepts
Length, complexity, reuse, expiration, age; **password managers**; **passwordless**.

## Privileged access management (PAM)
**Just‑in‑time permissions**, **password vaulting**, **ephemeral credentials**.
[[vis:aduc]]
`},
{id:'sp-15',d:'4',t:'Automation, incident response & forensics',md:`
## Automation & orchestration
Use cases: user provisioning, resource provisioning, **guard rails**, **security groups**, **ticket creation/escalation**, enabling/disabling services, **CI/CD testing**, **APIs**. Benefits: efficiency, baseline enforcement, standard configs, secure scaling, employee retention, reaction time, **workforce multiplier**. Concerns: complexity, cost, **single point of failure**, **technical debt**, ongoing supportability. **SOAR** automates response playbooks.

## Incident response process
[[vis:ir]]
1. **Preparation** 2. **Detection** 3. **Analysis** 4. **Containment** 5. **Eradication** 6. **Recovery** 7. **Lessons learned**
!mnem "**P**lease **D**on't **A**llow **C**ats **E**ver **R**un **L**oose".
- **Training**, **testing** (tabletop, simulation), **root cause analysis**, **threat hunting**.

## Digital forensics
- **Legal hold**, **chain of custody**, **acquisition**, **reporting**, **preservation**, **e‑discovery**.
- **Order of volatility**: CPU registers/cache → RAM → swap/temp → disk → remote logs → archives.

## Data sources for investigations
**Log data**: firewall, application, endpoint, OS security logs, IPS/IDS, network logs, **metadata**. Plus **vulnerability scans**, **automated reports**, **dashboards**, **packet captures**.
`},
{id:'sp-16',d:'5',t:'Governance & risk management',md:`
## Governance
- **Guidelines**, **policies** (AUP, information security, business continuity, disaster recovery, incident response, SDLC, change management), **standards** (password, access control, physical security, encryption), **procedures** (change management, onboarding/offboarding, playbooks).
- **External considerations**: regulatory, legal, industry, local/regional/national/global.
- **Governance structures**: boards, committees, government entities, centralized/decentralized.
- **Roles**: **owner** (accountable), **controller** (decides why/how data is processed), **processor** (processes on behalf of controller), **custodian/steward** (day‑to‑day care).

## Risk management
- **Identification**, **assessment** (ad hoc, recurring, one‑time, continuous), **analysis**: **qualitative** (high/med/low) vs **quantitative**:
  - **SLE** = Asset value × Exposure factor
  - **ARO** = how many times per year
  - **ALE** = SLE × ARO
- **Probability/likelihood**, **impact**, **risk register** (KRIs, risk owners, **risk threshold**), **risk tolerance**, **risk appetite** (expansionary, conservative, neutral).
- **Strategies**: **transfer** (insurance), **accept** (exemption/exception), **avoid** (stop the activity), **mitigate** (add controls).
- **Business impact analysis**: RTO, RPO, MTTR, MTBF.

!exam Example: A $10,000 server with 40% exposure factor → SLE $4,000. Expected 3 times a year → ALE $12,000.
`},
{id:'sp-17',d:'5',t:'Third parties, compliance, audits & pen testing',md:`
## Third‑party risk
**Vendor assessment** (penetration testing, **right‑to‑audit clause**, evidence of internal audits, **independent assessments**, **supply chain analysis**), **vendor selection** (due diligence, conflict of interest), **vendor monitoring**, **questionnaires**, **rules of engagement**.

## Agreement types
| Agreement | Purpose |
|---|---|
| **SLA** | Service‑level agreement (uptime, response times) |
| **MOA / MOU** | Memorandum of agreement/understanding – intent to work together |
| **MSA** | Master service agreement – overall terms |
| **WO / SOW** | Work order / statement of work – specific project tasks |
| **NDA** | Non‑disclosure agreement |
| **BPA** | Business partners agreement |

## Compliance
Internal & external **reporting**, consequences of non‑compliance (**fines, sanctions, reputational damage, loss of license, contractual impacts**), **compliance monitoring** (due diligence/care, attestation, automation), **privacy** (legal implications, **data subject**, controller vs processor, ownership, **data inventory and retention**, **right to be forgotten**).

## Audits & assessments
**Attestation**, **internal** (compliance, audit committee, self‑assessments), **external** (regulatory, examinations, assessment, independent third‑party audit).

## Penetration testing
- **Physical**, **offensive** (red team), **defensive** (blue team), **integrated** (purple team).
- Environment knowledge: **known** (white box), **partially known** (gray), **unknown** (black box).
- **Reconnaissance**: **passive** (OSINT, no touching target) vs **active** (scans).
`},
{id:'sp-18',d:'5',t:'Security awareness',md:`
## Phishing awareness
**Campaigns**, **recognizing a phishing attempt** (urgency, mismatched links, unusual requests), **responding to reported suspicious messages**.

## Anomalous behavior recognition
**Risky**, **unexpected**, **unintentional** behavior.

## User guidance & training
**Policy/handbooks**, **situational awareness**, **insider threat**, **password management**, **removable media and cables**, **social engineering**, **operational security**, **hybrid/remote work environments**.

## Reporting & monitoring
**Initial** and **recurring** training, **development** and **execution** of the program, measuring effectiveness (phish click rates, report rates).

!tip The best answer for reducing successful phishing is usually **user awareness training + simulated phishing campaigns**, backed by technical controls (email filtering, MFA).
`},
{id:'sp-19',d:'5',t:'Bonus: AI security & what\'s new in SY0‑801',md:`
CompTIA launched **Security+ V8 (SY0‑801)** on **November 17, 2026**. **SY0‑701 stays bookable until June 11, 2027 (English)**. This app targets SY0‑701 because an 8‑week plan lands well before that retirement date, and the two versions share the same five domains and format (max 90 questions, 90 minutes, 750 to pass).

## Weight changes V7 → V8
| Domain | V7 | V8 |
|---|---|---|
| General Security Concepts | 12% | 16% |
| Threats, Vulnerabilities & Mitigations → Attacks | 22% | 24% |
| Security Architecture | 18% | 19% |
| Security Operations | 28% | 27% |
| Program Management & Oversight | 20% | 14% |

## AI security risks (new explicit objective in V8)
- **Prompt injection** – hidden instructions in input/data make an AI tool ignore its rules or leak data.
- **Data poisoning** – tampering with training data to change model behavior.
- **Model theft / inversion** – stealing a model or reconstructing training data.
- **Data leakage** – users pasting sensitive data into public AI tools.
- **Hallucinations** – confident, wrong output; verify before acting.
- **AI‑enhanced attacks** – deepfake voice/video for vishing/BEC, AI‑written phishing.
- **Controls**: approved/private AI tools, data classification & DLP, input/output filtering, least privilege for AI agents, human review, logging.

!tip If you'll test after about May 2027, switch to SY0‑801 material. Almost everything here still applies; add AI security and re‑check the V8 objectives PDF on comptia.org.
`},
],
qs:[
['sp-1','A company installs a warning sign stating "Area under video surveillance". Which control type is this?',['Deterrent','Detective','Corrective','Compensating'],'Signs discourage attackers – deterrent.'],
['sp-1','Which control category describes a written security policy?',['Managerial','Technical','Physical','Operational'],'Policies are managerial (administrative) controls.'],
['sp-1','Restoring data from backup after a ransomware attack is which control type?',['Corrective','Preventive','Deterrent','Directive'],'Corrective controls fix after an incident.'],
['sp-1','Which part of the CIA triad does hashing primarily protect?',['Integrity','Confidentiality','Availability','Non‑repudiation'],'Hashes detect changes.'],
['sp-1','A digital signature provides which property that prevents a sender from denying they sent a message?',['Non‑repudiation','Availability','Obfuscation','Elasticity'],'Only the private key holder could have signed.'],
['sp-1','In a Zero Trust model, which component makes the decision to grant or deny access?',['Policy Engine','Policy Enforcement Point','Implicit trust zone','Subject'],'The Policy Engine decides; the PEP enforces.'],
['sp-1','A fake credential is planted in a database; any use of it triggers an alert. What is this?',['Honeytoken','Honeypot','Honeynet','Sinkhole'],'Honeytokens are fake data items that alert when used.'],
['sp-1','Which AAA component records what a user did?',['Accounting','Authentication','Authorization','Attestation'],'Accounting logs activity.'],
['sp-1','A security guard checking badges at the lobby is which control category?',['Operational','Technical','Managerial','Directive'],'Controls implemented by people are operational (guards are also physical).'],
['sp-1','A required control can\'t be implemented on a legacy system, so the company isolates it on a separate VLAN. This is a:',['Compensating control','Deterrent control','Directive control','Detective control'],'An alternative control that reduces risk when the primary one can\'t be used.'],
['sp-1','Comparing current security posture against a framework to find missing controls is a:',['Gap analysis','Penetration test','Tabletop exercise','Risk transfer'],'Gap analysis identifies differences.'],
['sp-2','Which element of change management describes how to restore the system if a change fails?',['Backout plan','Impact analysis','Maintenance window','Stakeholder list'],'Backout plans undo changes.'],
['sp-2','Why are changes scheduled during a maintenance window?',['To minimize impact on users and operations','To bypass approvals','To avoid documentation','To speed up patch downloads'],'Low‑usage times reduce business impact.'],
['sp-2','A patch requires a service restart that affects a dependent application. What should the change request document?',['Dependencies and expected downtime','The CEO\'s approval only','The admin\'s password','Nothing; restarts are routine'],'Technical implications include dependencies and downtime.'],
['sp-2','Which process ensures previous configurations can be tracked and restored?',['Version control','Data masking','Steganography','Tokenization'],'Version control tracks changes to code and configs.'],
['sp-3','Which algorithm is a symmetric block cipher widely used today?',['AES','RSA','ECC','Diffie‑Hellman'],'AES is symmetric; the others are asymmetric.'],
['sp-3','Alice wants only Bob to read her message. Which key does she encrypt with?',['Bob\'s public key','Bob\'s private key','Alice\'s private key','Alice\'s public key'],'Encrypt with the recipient\'s public key; only their private key decrypts.','pki'],
['sp-3','What does adding a salt to passwords before hashing defend against?',['Rainbow table attacks','Phishing','DDoS','Shoulder surfing'],'Unique salts make precomputed tables useless.'],
['sp-3','Which method checks a certificate\'s revocation status in real time?',['OCSP','CRL','CSR','PEM'],'Online Certificate Status Protocol.'],
['sp-3','Replacing a credit card number with a random value that maps back to it in a secure vault is:',['Tokenization','Masking','Hashing','Steganography'],'Tokens have no mathematical relation to the original.'],
['sp-3','Hiding a message inside an image file is called:',['Steganography','Tokenization','Key stretching','Salting'],'Steganography conceals data within other data.'],
['sp-3','Which hardware device stores keys for many servers and performs crypto operations in a data center?',['HSM','TPM','TOTP token','Smart card'],'Hardware Security Modules are dedicated appliances.'],
['sp-3','A certificate for *.example.com is a:',['Wildcard certificate','SAN certificate','Self‑signed certificate','Root certificate'],'Wildcards cover all first‑level subdomains.'],
['sp-3','Which asymmetric algorithm offers equivalent strength with smaller keys, ideal for mobile devices?',['ECC','RSA','3DES','AES'],'Elliptic Curve Cryptography.'],
['sp-3','What do you submit to a CA to obtain a certificate?',['CSR','CRL','OCSP response','Private key'],'A Certificate Signing Request contains your public key and details – never the private key.'],
{t:'order',l:'sp-3',q:'Order the certificate chain of trust from the top down.',items:['Root CA','Intermediate CA','Server (leaf) certificate'],e:'Root signs intermediate, intermediate signs leaf.',v:'pki'},
['sp-3','Which encryption protects data while it travels across a network?',['Transport encryption (TLS/IPsec)','Full‑disk encryption','Database encryption','Steganography'],'Data in transit = TLS/IPsec.'],
['sp-4','Which threat actor is most likely motivated by financial gain and uses ransomware?',['Organized crime','Hacktivist','Nation‑state','Shadow IT'],'Organized crime seeks money.'],
['sp-4','An attacker with little skill uses downloaded tools to deface a website. Which actor?',['Unskilled attacker','Nation‑state','APT','Insider'],'Script kiddie / unskilled attacker.'],
['sp-4','Employees use an unapproved file‑sharing app to collaborate. What is this?',['Shadow IT','Insider threat','Hacktivism','Supply chain attack'],'Unapproved technology use = shadow IT.'],
['sp-4','An attacker compromises a software vendor\'s update server to distribute malware to customers. What vector is this?',['Supply chain','Watering hole','Typosquatting','Removable media'],'Attacking through a supplier = supply chain.'],
['sp-4','A group publishes stolen documents to protest a company\'s environmental record. Which actor?',['Hacktivist','Organized crime','Unskilled attacker','Shadow IT'],'Ideological motivation = hacktivist.'],
['sp-4','An attacker registers "paypa1.com" to catch mistyped URLs. What is this?',['Typosquatting','Pretexting','Watering hole','Vishing'],'Typosquatting relies on typos.'],
['sp-4','An attacker invents a story about being an auditor to get information. What is this?',['Pretexting','Tailgating','Smishing','Spraying'],'Pretexting uses a fabricated scenario.'],
['sp-4','Which actor typically has the most resources and conducts long‑term stealthy intrusions?',['Nation‑state (APT)','Unskilled attacker','Hacktivist','Shadow IT'],'APTs are often state‑sponsored.'],
['sp-5','An attacker changes a file between when the program checks permissions and when it opens it. What vulnerability?',['Race condition (TOCTOU)','SQL injection','XSS','Memory leak'],'Time‑of‑check to time‑of‑use.'],
['sp-5','Installing apps on a phone from outside the official store is called:',['Side loading','Jailbreaking','Tethering','Sandboxing'],'Side loading bypasses store vetting.'],
['sp-5','A vulnerability unknown to the vendor with no available patch is a:',['Zero‑day','Legacy flaw','Misconfiguration','Known CVE'],'Zero‑day = no time to patch.'],
['sp-5','A web form returns all user records when given "\' OR 1=1 --". What is the vulnerability?',['SQL injection','XSS','CSRF','Directory traversal'],'Classic SQLi tautology.'],
['sp-5','Which TWO defenses help prevent buffer overflow attacks? (Choose two.)',['Input validation / bounds checking','Memory protections like ASLR/DEP','Longer passwords','Disabling DNS','Larger monitors'],'Validate input size and use memory protection.',[0,1]],
['sp-5','A cloud storage bucket is set to public by mistake. Which vulnerability type?',['Misconfiguration','Zero‑day','Race condition','Firmware'],'Wrong settings = misconfiguration.'],
['sp-5','Malware breaks out of a VM to attack the hypervisor. Which vulnerability?',['VM escape','Resource reuse','Side loading','Memory injection'],'VM escape crosses isolation.'],
['sp-5','A router model is past end‑of‑life and no longer receives firmware. What is the BEST action?',['Replace it, or isolate it with compensating controls until replaced','Ignore it','Disable logging','Reset to factory defaults'],'EOL hardware can\'t be patched.'],
['sp-6','A user logs in from New York and 10 minutes later from Singapore. What indicator is this?',['Impossible travel','Account lockout','Resource consumption','Out‑of‑cycle logging'],'Physically impossible location change.','siem'],
['sp-6','An attacker tries "Winter2026!" against every account in the company. What attack?',['Password spraying','Brute force','Rainbow table','Credential stuffing'],'One password, many accounts.'],
['sp-6','An attacker forces a client and server to negotiate an older, weaker TLS version. What attack?',['Downgrade','Collision','Birthday','Replay'],'Downgrade attacks force weaker crypto.'],
['sp-6','Small DNS queries with a spoofed source IP cause large responses to hit a victim. What attack?',['Amplified/reflected DDoS','On‑path','DNS tunneling','ARP spoofing'],'Reflection + amplification.'],
['sp-6','A web app fetches a URL supplied by the user and is tricked into querying internal metadata services. What is this?',['Server‑side request forgery (SSRF)','CSRF','XSS','SQLi'],'SSRF abuses the server to make requests.'],
['sp-6','Logs for a critical server are missing for a two‑hour window. What could this indicate?',['An attacker covering tracks','Normal behavior','A patch','A DNS change'],'Missing logs are an indicator of compromise.'],
['sp-6','An attacker captures a valid authentication exchange and resends it to gain access. What attack?',['Replay','Collision','Downgrade','Spraying'],'Replay attacks reuse captured data.'],
['sp-6','Two different inputs produce the same hash value. What is this called?',['Collision','Salting','Key stretching','Downgrade'],'Hash collisions break integrity guarantees.'],
['sp-6','An attacker copies an employee\'s badge signal using a reader hidden in a bag. What attack?',['RFID cloning','Bluejacking','Jamming','Evil twin'],'Cloning RFID credentials.'],
['sp-6','Which attack tricks a logged‑in user\'s browser into submitting an unwanted request to a site they trust?',['CSRF','SSRF','SQLi','Buffer overflow'],'Cross‑site request forgery.'],
['sp-7','A new critical vulnerability has a vendor patch. What is the BEST mitigation?',['Apply the patch','Add a warning banner','Increase logging only','Accept the risk'],'Patching removes the vulnerability.'],
['sp-7','Only approved executables should be allowed to run on kiosks. What should be implemented?',['Application allow list','Deny list','DLP','Sandbox'],'Allow lists block everything not approved.'],
['sp-7','A compromised workstation should be removed from the network while investigation continues. Which technique?',['Isolation','Decommissioning','Patching','Encryption'],'Isolation contains threats.'],
['sp-7','Which hardening step reduces attack surface on a new server?',['Remove unnecessary software and disable unused services','Enable Telnet','Keep default passwords','Disable logging'],'Fewer services = fewer vulnerabilities.'],
['sp-7','Placing IoT devices on their own network separate from finance systems is:',['Segmentation','Encryption','Least privilege','Monitoring'],'Segmentation limits lateral movement.'],
['sp-8','In IaaS, who is responsible for patching the guest operating system?',['The customer','The cloud provider','Both equally','Nobody'],'In IaaS the customer manages OS and above.'],
['sp-8','Which architecture runs code as functions without managing servers?',['Serverless','Microservices on VMs','On‑premises','Air‑gapped'],'Serverless abstracts server management.'],
['sp-8','A plant\'s SCADA controllers cannot be patched. What is the BEST protection?',['Segment/isolate them and monitor traffic','Connect them directly to the internet','Install consumer antivirus','Disable logging'],'Isolation compensates for inability to patch.'],
['sp-8','A network completely physically separated from all other networks is:',['Air‑gapped','Segmented by VLAN','SD‑WAN','Hybrid'],'Physical isolation = air gap.'],
['sp-8','An app built as many small independent services communicating via APIs is using:',['Microservices','Monolithic architecture','Serverless only','RTOS'],'Microservices architecture.'],
['sp-8','Which operating system type is used where tasks must complete within strict timing, like medical devices?',['RTOS','Linux desktop','ChromeOS','Windows Home'],'Real‑Time Operating Systems guarantee timing.'],
['sp-9','A firewall must keep passing traffic even if its inspection engine fails, because uptime matters more. Which failure mode?',['Fail‑open','Fail‑closed','Fail‑secure','Fail‑safe lock'],'Fail‑open prioritizes availability.'],
['sp-9','Which firewall type protects web apps from attacks like SQLi and XSS?',['WAF','Packet filter','NAT router','UTM antivirus only'],'Web Application Firewalls inspect HTTP.'],
['sp-9','Admins must connect to servers in a secure zone through a single hardened system. What is it called?',['Jump server','Proxy server','Load balancer','Honeypot'],'A jump server/bastion host.'],
['sp-9','Data stored in RAM while being processed is in which state?',['In use','At rest','In transit','Archived'],'Data in use.'],
['sp-9','Laws requiring data to remain under the jurisdiction where it\'s stored relate to:',['Data sovereignty','Data masking','Tokenization','Elasticity'],'Data sovereignty.'],
['sp-9','Which device placement monitors a copy of traffic without being able to block it?',['Passive tap/monitor (IDS)','Inline IPS','Inline firewall','Proxy'],'Passive/tap devices only observe.'],
['sp-9','Which classification is typically the lowest sensitivity?',['Public','Confidential','Restricted','Critical'],'Public data can be freely shared.'],
['sp-9','Showing only the last four digits of an SSN on a screen is:',['Data masking','Encryption','Hashing','Steganography'],'Masking hides part of the data.'],
['sp-10','How long the business can tolerate a system being down is the:',['RTO','RPO','MTBF','SLE'],'Recovery Time Objective.'],
['sp-10','A backup site with fully configured, live systems ready immediately is a:',['Hot site','Cold site','Warm site','Mobile site'],'Hot sites are ready to go.'],
['sp-10','Team members discuss how they would respond to a simulated scenario in a conference room. This is a:',['Tabletop exercise','Failover test','Parallel processing test','Penetration test'],'Discussion‑based = tabletop.'],
['sp-10','Which provides power for days during an extended outage?',['Generator','UPS','Surge protector','PDU'],'UPS bridges short gaps; generators run long.'],
['sp-10','Using both AWS and Azure to avoid dependence on one provider is:',['Multi‑cloud','Hybrid cloud','Private cloud','Cold site'],'Multi‑cloud / platform diversity.'],
['sp-10','Backups are taken every 4 hours. What is the maximum RPO?',['4 hours','24 hours','Zero','1 hour'],'You could lose up to 4 hours of data.'],
['sp-11','Which deployment model lets a company own the phone but allow personal use?',['COPE','BYOD','CYOD','VDI'],'Corporate‑Owned, Personally Enabled.'],
['sp-11','Which application security practice verifies software came from a trusted developer and wasn\'t altered?',['Code signing','Input validation','Sandboxing','Fuzzing'],'Digital signatures on code.'],
['sp-11','Analyzing source code for flaws without running it is:',['Static analysis (SAST)','Dynamic analysis','Fuzzing','Penetration testing'],'Static = no execution.'],
['sp-11','Which practice prevents injection by checking all user input for expected format?',['Input validation','Secure cookies','Code signing','Load balancing'],'Validate input server‑side.'],
['sp-11','Running an untrusted program in a restricted environment where it can\'t affect the host is:',['Sandboxing','Tokenization','Clustering','Escrow'],'Sandboxes isolate execution.'],
['sp-11','Which cookie attribute ensures cookies are only sent over HTTPS?',['Secure','HttpOnly','SameSite=None','Expires'],'The Secure flag restricts cookies to HTTPS.'],
['sp-12','A vulnerability scanner flags a flaw that doesn\'t actually exist on the system. This is a:',['False positive','False negative','True positive','True negative'],'Reported but not real.','nmap'],
['sp-12','Which system provides a severity score from 0 to 10 for vulnerabilities?',['CVSS','CVE','SCAP','STIX'],'Common Vulnerability Scoring System.'],
['sp-12','After patching, what should be done to confirm remediation?',['Rescan','Delete the logs','Re‑image all systems','Accept the risk'],'Validation via rescanning.'],
['sp-12','A company pays outside researchers who report flaws in its website. What is this?',['Bug bounty program','Penetration test','Threat feed','Audit'],'Bug bounties reward responsible disclosure.'],
['sp-12','Which is the FIRST step of the asset life cycle?',['Acquisition/procurement','Disposal','Monitoring','Assignment'],'Assets start with procurement.'],
['sp-12','Intelligence gathered from public sources such as social media and websites is called:',['OSINT','Dark web feed','Proprietary feed','SCAP'],'Open‑Source Intelligence.'],
{t:'order',l:'sp-12',q:'Order the vulnerability management steps.',items:['Identify (scan, pen test, threat feeds)','Analyze (confirm, prioritize with CVSS)','Respond / remediate (patch, compensate, accept)','Validate (rescan, audit)','Report'],e:'Identify → analyze → respond → validate → report.'},
['sp-13','Which email authentication record lists servers allowed to send mail for a domain?',['SPF','DKIM','DMARC','MX'],'Sender Policy Framework.'],
['sp-13','Which tool collects logs from many sources and correlates events into alerts?',['SIEM','DLP','FIM','NAC'],'Security Information and Event Management.','siem'],
['sp-13','Which tool detects unauthorized changes to critical system files?',['File integrity monitoring','DNS filtering','Web filter','NetFlow'],'FIM hashes files and alerts on changes.'],
['sp-13','A user tries to email a spreadsheet of customer SSNs externally and it is blocked. Which tool?',['DLP','IDS','SIEM','WAF'],'Data Loss Prevention.'],
['sp-13','Which email mechanism tells receiving servers what to do with mail failing SPF/DKIM and sends reports?',['DMARC','SPF','DKIM','S/MIME'],'DMARC defines policy and reporting.'],
['sp-13','The SIEM generates too many alerts on harmless events. What should the analyst do?',['Tune the alert rules','Disable the SIEM','Delete the logs','Ignore all alerts'],'Alert tuning reduces false positives.','siem'],
['sp-13','Which Linux feature enforces mandatory access control policies?',['SELinux','sudo','chmod','cron'],'SELinux provides MAC.'],
['sp-13','Which tool watches endpoints for suspicious behavior and can respond automatically?',['EDR','NetFlow','SNMP','DNS sinkhole'],'Endpoint Detection and Response.'],
['sp-13','Which protocol should replace Telnet for managing network devices?',['SSH','HTTP','FTP','SNMPv1'],'SSH encrypts remote management.'],
['sp-14','Which access control model grants permissions based on job function?',['RBAC','MAC','DAC','ABAC'],'Role‑Based Access Control.','aduc'],
['sp-14','In which model does the resource owner decide who gets access?',['DAC','MAC','RBAC','Rule‑based'],'Discretionary Access Control.'],
['sp-14','Which model uses labels like Secret and Top Secret?',['MAC','DAC','RBAC','ABAC'],'Mandatory Access Control.'],
['sp-14','Which standard uses XML assertions to provide web SSO between an identity provider and a service?',['SAML','OAuth','LDAP','RADIUS'],'Security Assertion Markup Language.'],
['sp-14','Admin rights granted only for the duration of a task and then removed is called:',['Just‑in‑time permissions','Password vaulting','Federation','Attestation'],'JIT access reduces standing privilege.'],
['sp-14','A fingerprint scan is which authentication factor?',['Something you are','Something you know','Something you have','Somewhere you are'],'Biometrics = something you are.'],
['sp-14','Which framework lets an app access your data on another service without sharing your password?',['OAuth','SAML','Kerberos','TACACS+'],'OAuth is authorization delegation.'],
['sp-14','Access decisions based on department, device health, location and time combined is:',['ABAC','RBAC','DAC','MAC'],'Attribute‑Based Access Control.'],
['sp-14','When an employee leaves, what should happen to their account first?',['Disable/de‑provision it promptly','Leave it active for 90 days','Give it to their manager','Reset to a default password'],'Prompt deprovisioning prevents misuse.'],
{t:'order',l:'sp-15',q:'Order the incident response process.',items:['Preparation','Detection','Analysis','Containment','Eradication','Recovery','Lessons learned'],e:'Please Don\'t Allow Cats Ever Run Loose.',v:'ir'},
{t:'order',l:'sp-15',q:'Order evidence collection from MOST to LEAST volatile.',items:['CPU registers & cache','RAM / routing & ARP tables','Swap / page file & temp files','Disk (HDD/SSD)','Remote logs & monitoring data','Archived media / backups'],e:'Collect volatile data first.'},
['sp-15','Which document tracks every person who handled evidence?',['Chain of custody','Legal hold','SOW','Risk register'],'Chain of custody maintains integrity.'],
['sp-15','A court orders a company to preserve all email related to a lawsuit. This is a:',['Legal hold','E‑discovery','Acquisition','Eradication'],'Legal hold preserves data.'],
['sp-15','During which IR phase is malware removed from affected systems?',['Eradication','Containment','Recovery','Preparation'],'Eradication removes the cause.','ir'],
['sp-15','Which platform automates security response playbooks across tools?',['SOAR','SIEM only','DLP','CASB'],'Security Orchestration, Automation, and Response.'],
['sp-15','Proactively searching for threats that evaded existing controls is:',['Threat hunting','Root cause analysis','Tabletop exercise','Legal hold'],'Threat hunting assumes compromise.'],
['sp-15','What is a risk of heavy automation?',['It can create a single point of failure and technical debt','It always lowers security','It removes the need for logs','It prevents scaling'],'Automation has complexity and SPOF concerns.'],
['sp-15','Which IR phase includes isolating an infected host from the network?',['Containment','Detection','Lessons learned','Preparation'],'Containment limits spread.'],
['sp-16','An asset is worth $50,000 and a fire would destroy 20% of it. What is the SLE?',['$10,000','$50,000','$2,500','$40,000'],'SLE = AV × EF = 50,000 × 0.2.'],
['sp-16','SLE is $10,000 and the event is expected once every 4 years. What is the ALE?',['$2,500','$40,000','$10,000','$4,000'],'ARO = 0.25 → ALE = 10,000 × 0.25.'],
['sp-16','Buying cyber insurance is which risk strategy?',['Transfer','Accept','Avoid','Mitigate'],'Shifting financial impact = transfer.'],
['sp-16','A company stops offering a risky service entirely. Which strategy?',['Avoid','Transfer','Mitigate','Accept'],'Avoidance eliminates the activity.'],
['sp-16','Which document lists identified risks, owners, and status?',['Risk register','SLA','AUP','MOU'],'The risk register tracks risks.'],
['sp-16','Which data role is responsible for day‑to‑day handling and protection of data per policy?',['Custodian/steward','Owner','Controller','Data subject'],'Custodians implement controls.'],
['sp-16','Which data role determines the purposes and means of processing personal data (GDPR)?',['Controller','Processor','Custodian','Subject'],'The controller decides why/how.'],
['sp-16','Rating risks as High/Medium/Low without dollar figures is:',['Qualitative analysis','Quantitative analysis','ALE','BIA'],'Qualitative uses categories.'],
['sp-16','Which document type specifies mandatory settings like minimum password length of 14?',['Standard','Guideline','Procedure','Policy statement of intent'],'Standards set specific mandatory requirements; guidelines are recommendations.'],
['sp-17','Which agreement defines the specific tasks, deliverables and timeline for a project?',['SOW','MOU','NDA','MSA'],'Statement of Work.'],
['sp-17','Which contract clause allows a company to inspect a vendor\'s security controls?',['Right‑to‑audit','NDA','SLA','BPA'],'Right‑to‑audit clauses enable assessments.'],
['sp-17','A pen tester is given no information about the target. What type of test?',['Unknown environment (black box)','Known environment','Partially known','Purple team'],'No knowledge = unknown environment.'],
['sp-17','Searching public websites and social media about a target before testing is:',['Passive reconnaissance','Active reconnaissance','Exploitation','Pivoting'],'Passive recon doesn\'t touch the target directly.'],
['sp-17','Red and blue teams working together to improve defenses is a:',['Purple team','White team','Black team','Green team'],'Purple = red + blue.'],
['sp-17','Which agreement guarantees 99.9% uptime with penalties?',['SLA','MOU','NDA','WO'],'Service‑Level Agreement.'],
['sp-17','A GDPR request that a company delete a person\'s data is the:',['Right to be forgotten','Legal hold','Data sovereignty','Attestation'],'Right to erasure.'],
['sp-17','Which is a consequence of non‑compliance? (Choose two.)',['Fines','Reputational damage','Higher CPU speed','Automatic certification','Free audits'],'Fines, sanctions, reputational damage, license loss.',[0,1]],
['sp-18','Which is the BEST way to reduce successful phishing over time?',['Recurring awareness training with simulated phishing','Disable email','Longer passwords only','Larger mail quotas'],'Training plus simulations changes behavior.'],
['sp-18','A user finds a USB drive in the parking lot. What should training tell them?',['Turn it in to IT/security; don\'t plug it in','Plug it in to find the owner','Format it and keep it','Throw it in the trash'],'Unknown removable media may be malicious.'],
['sp-18','An email has urgent language, a mismatched link URL, and asks for credentials. What should the user do?',['Report it using the phishing reporting process','Click to verify','Reply asking if real','Forward to coworkers'],'Report suspicious messages.'],
['sp-18','Which metric best shows phishing training effectiveness?',['Click rate and report rate on simulated phishing','Number of emails sent','Mailbox size','CPU utilization'],'Measure behavior changes.'],
['sp-19','An attacker hides instructions in a document so an AI assistant that reads it leaks confidential data. What is this?',['Prompt injection','Data poisoning','Model inversion','Hallucination'],'Prompt injection manipulates AI via crafted input.'],
['sp-19','Tampering with the data used to train a model to change its behavior is:',['Data poisoning','Prompt injection','Tokenization','Steganography'],'Poisoned training data corrupts the model.'],
['sp-19','A deepfake voice of the CFO calls finance to approve a wire. What type of attack is this?',['AI‑enhanced vishing / BEC','SQL injection','RFID cloning','Downgrade'],'AI makes impersonation more convincing.'],
['sp-19','Which control BEST reduces the risk of employees leaking sensitive data into public AI chatbots?',['Approved private AI tools plus DLP and policy','Bigger monitors','Disabling MFA','Allowing all AI sites'],'Policy, approved tools and DLP.'],
]};
