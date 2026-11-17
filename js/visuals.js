/* Original HTML/CSS/SVG recreations of tools & diagrams. Tap any dashed/glowing element for an explanation. */
(function(){
const e = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const hs = (txt, tip, cls='') => `<span class="hs ${cls}" data-tip="${e(tip)}">${txt}</span>`;
const win = (title, body, cls='') => `<div class="win ${cls}"><div class="win-bar"><span class="win-title">${title}</span><span class="win-btns"><i>–</i><i>□</i><i class="x">✕</i></span></div><div class="win-body">${body}</div></div>`;
const term = (title, html, cls='') => `<div class="term ${cls}"><div class="win-bar"><span class="win-title">${title}</span><span class="win-btns"><i>–</i><i>□</i><i class="x">✕</i></span></div><pre>${html}</pre></div>`;
const P = 'C:\\Users\\alex&gt;';
const bar = (pct, color) => `<span class="mbar"><span style="width:${pct}%;background:${color}"></span></span>`;
const V = {};

V['taskmgr'] = {t:'Windows Task Manager', cap:'Ctrl+Shift+Esc opens it. Tap the highlighted areas.', h: win('Task Manager',
`<div class="tm"><div class="tm-side">
${hs('☰ Processes','Processes: every running app and background process with CPU/memory/disk/network use. Select one and click End task to kill a frozen app.','on')}
${hs('📈 Performance','Performance: live graphs for CPU, Memory, Disk, Ethernet/Wi‑Fi, GPU. Use it to spot a bottleneck (e.g., disk at 100%).')}
${hs('🕘 App history','App history: resource use by Store apps over time.')}
${hs('🚀 Startup apps','Startup apps: programs that launch at sign‑in, with "Startup impact". Disable high‑impact items to speed up boot.')}
${hs('👥 Users','Users: who is signed in and what they are using; you can sign a user out.')}
${hs('☷ Details','Details: process names, PIDs, status, priority, and affinity – the advanced view.')}
${hs('⚙ Services','Services: start/stop Windows services; links to services.msc.')}
</div><div class="tm-main"><div class="tm-head"><b>Processes</b><span class="btn-sm">${hs('End task','End task: force‑closes the selected process. Unsaved work in it is lost.')}</span></div>
<table class="tbl"><tr><th>Name</th><th>${hs('CPU','CPU column: percentage of total processor time. A process stuck near 100% may be hung or a cryptominer.')}</th><th>Memory</th><th>Disk</th></tr>
<tr><td>🌐 Browser (14)</td><td>6%</td><td>1,204 MB</td><td>0.2 MB/s</td></tr>
<tr class="warnrow"><td>${hs('📄 ReportTool (Not responding)','A hung app shows "Not responding". Select it and End task.')}</td><td>0%</td><td>410 MB</td><td>0 MB/s</td></tr>
<tr><td>📁 Windows Explorer</td><td>1%</td><td>96 MB</td><td>0 MB/s</td></tr>
<tr class="hot"><td>${hs('⚠ svch0st.exe','Suspicious: a misspelled system name using huge CPU could be malware such as a cryptominer. Investigate before ending it.')}</td><td>92%</td><td>58 MB</td><td>0.1 MB/s</td></tr>
<tr><td>🛡 Antimalware Service Executable</td><td>2%</td><td>180 MB</td><td>0.4 MB/s</td></tr></table></div></div>`)};

V['devmgr'] = {t:'Device Manager (devmgmt.msc)', cap:'Look for warning icons on device entries.', h: win('Device Manager',
`<div class="tree">
<div>🖥 DESKTOP‑7Q2</div>
<div class="i1">▸ 🔊 Audio inputs and outputs</div>
<div class="i1">▸ 🔋 Batteries</div>
<div class="i1">▾ 🖼 Display adapters</div><div class="i2">${hs('<span class="warnico">⚠</span> NVIDIA GeForce RTX','Yellow triangle with "!" = the device has a problem (missing/corrupt driver, resource conflict). Open Properties → Driver to update or Roll Back Driver.')}</div>
<div class="i1">▾ 🌐 Network adapters</div><div class="i2">${hs('<span class="downico">⬇</span> Intel(R) Ethernet I219‑V','Down arrow = device disabled. Right‑click → Enable device.')}</div><div class="i2">📶 Intel(R) Wi‑Fi 6E AX211</div>
<div class="i1">▾ ❓ Other devices</div><div class="i2">${hs('<span class="warnico">⚠</span> Unknown device','"Unknown device" under Other devices = Windows has no driver for it. Get the driver from the manufacturer.')}</div>
<div class="i1">▸ 💾 Disk drives</div><div class="i1">▸ ⌨ Keyboards</div><div class="i1">▸ 🖱 Mice and other pointing devices</div>
</div><div class="statusbar">${hs('Properties → Driver tab: Update Driver · Roll Back Driver · Disable · Uninstall','Driver tab actions. Roll Back Driver returns to the previous driver – the go‑to fix after a bad driver update.')}</div>`)};

V['diskmgmt'] = {t:'Disk Management (diskmgmt.msc)', cap:'Partitions, file systems and unallocated space.', h: win('Disk Management',
`<table class="tbl sm"><tr><th>Volume</th><th>Layout</th><th>File System</th><th>Status</th><th>Capacity</th></tr>
<tr><td>(C:)</td><td>Simple</td><td>NTFS</td><td>Healthy (Boot, Page File)</td><td>475 GB</td></tr>
<tr><td>Recovery</td><td>Simple</td><td></td><td>Healthy (Recovery)</td><td>750 MB</td></tr>
<tr><td>USB (E:)</td><td>Simple</td><td>${hs('FAT32','FAT32 = 4 GB max file size. Reformat as exFAT or NTFS for big files.')}</td><td>Healthy (Primary)</td><td>32 GB</td></tr></table>
<div class="disks">
<div class="disk"><div class="dlabel">Disk 0<br>Basic<br>476 GB<br>Online</div><div class="parts"><span class="part sys" style="flex:1">${hs('EFI 100 MB','EFI System Partition – holds UEFI boot files on GPT disks.')}</span><span class="part pri" style="flex:8">${hs('(C:) 475 GB NTFS','The Windows volume. Right‑click → Extend/Shrink Volume.')}</span><span class="part sys" style="flex:1">Recovery</span></div></div>
<div class="disk"><div class="dlabel">${hs('Disk 1<br>Unknown<br>1863 GB<br>Not Initialized','A brand‑new drive shows "Not Initialized". Right‑click → Initialize Disk and choose GPT (UEFI, >2 TB) or MBR.')}</div><div class="parts"><span class="part un" style="flex:1">${hs('1863 GB Unallocated','Unallocated = no partition. Right‑click → New Simple Volume to create, format and assign a drive letter.')}</span></div></div>
</div><div class="legend"><i class="un"></i>Unallocated <i class="pri"></i>Primary partition</div>`)};

V['eventvwr'] = {t:'Event Viewer (eventvwr.msc)', cap:'Windows Logs: Application, Security, Setup, System.', h: win('Event Viewer',
`<div class="tm"><div class="tm-side small">
<div>Event Viewer (Local)</div><div>▾ Windows Logs</div>
${hs('Application','Application log: app crashes and errors (e.g., Event ID 1000 Application Error).','on')}
${hs('Security','Security log: logon successes/failures (4624/4625), audit events. Key for security investigations.')}
${hs('Setup','Setup log: Windows installation/update events.')}
${hs('System','System log: drivers, services, unexpected shutdowns (Event 41 Kernel‑Power).')}
</div><div class="tm-main"><table class="tbl sm"><tr><th>Level</th><th>Date and Time</th><th>Source</th><th>Event ID</th></tr>
<tr><td>${hs('<span class="lv err">⛔ Error</span>','Error = significant problem (loss of function/data).')}</td><td>11/17/2026 7:02:11 AM</td><td>Application Error</td><td>1000</td></tr>
<tr><td>${hs('<span class="lv wrn">⚠ Warning</span>','Warning = not necessarily significant now but may indicate a future problem.')}</td><td>11/17/2026 6:58:40 AM</td><td>Disk</td><td>153</td></tr>
<tr><td>${hs('<span class="lv inf">ℹ Information</span>','Information = successful operation.')}</td><td>11/17/2026 6:55:03 AM</td><td>Service Control Manager</td><td>7036</td></tr>
<tr><td><span class="lv crit">✖ Critical</span></td><td>11/16/2026 9:14:27 PM</td><td>${hs('Kernel‑Power','Kernel‑Power 41 (Critical): the system rebooted without cleanly shutting down – power loss, PSU, or overheating.')}</td><td>41</td></tr></table>
<div class="detail">Faulting application name: ReportTool.exe, version 3.2.0.1 · Exception code: 0xc0000005</div></div></div>`)};

V['services'] = {t:'Services (services.msc)', cap:'Start/stop services and set Startup type.', h: win('Services',
`<table class="tbl sm"><tr><th>Name</th><th>Status</th><th>${hs('Startup Type','Startup type: Automatic (starts at boot), Automatic (Delayed Start), Manual (starts when needed), Disabled (cannot start).')}</th><th>Log On As</th></tr>
<tr><td>${hs('Print Spooler','Print Spooler manages the print queue. Stuck print jobs? Restart this service (and clear the spool folder if needed).')}</td><td>Running</td><td>Automatic</td><td>Local System</td></tr>
<tr><td>Windows Update</td><td></td><td>Manual (Trigger Start)</td><td>Local System</td></tr>
<tr><td>DHCP Client</td><td>Running</td><td>Automatic</td><td>Local Service</td></tr>
<tr><td>DNS Client</td><td>Running</td><td>Automatic (Trigger)</td><td>Network Service</td></tr>
<tr><td>${hs('Remote Registry','Disabled by default on modern Windows – a hardening best practice; leave it disabled unless needed.')}</td><td></td><td>Disabled</td><td>Local Service</td></tr>
<tr><td>Windows Defender Firewall</td><td>Running</td><td>Automatic</td><td>Local Service</td></tr></table>
<div class="statusbar">Right‑click a service: Start · Stop · Pause · ${hs('Restart','Restart = stop then start. Common fix for a hung service.')} · Properties (Recovery tab sets restart‑on‑failure)</div>`)};

V['settings'] = {t:'Windows 11 Settings', cap:'Most configuration now lives in Settings (Win+I).', h: win('Settings',
`<div class="tm"><div class="tm-side">
${hs('🖥 System','System: display, sound, notifications, power & battery, storage, about (PC name, Windows edition, rename PC).')}
${hs('🔵 Bluetooth & devices','Bluetooth & devices: pair devices, printers & scanners, mouse, touchpad.')}
${hs('🌐 Network & internet','Network & internet: Wi‑Fi, Ethernet (set static IP/DNS via Edit), VPN, proxy, mobile hotspot, metered connection.','on')}
${hs('🎨 Personalization','Personalization: background, themes, taskbar.')}
${hs('📦 Apps','Apps: installed apps (uninstall/modify), default apps, startup apps, optional features.')}
${hs('👤 Accounts','Accounts: your info, sign‑in options (Windows Hello PIN/face/fingerprint), family & other users, access work or school (join domain/Entra).')}
${hs('🕒 Time & language','Time & language: date/time, time zone, sync now.')}
${hs('♿ Accessibility','Accessibility: text size, magnifier, narrator, color filters.')}
${hs('🛡 Privacy & security','Privacy & security: Windows Security (Defender, firewall), Device encryption/BitLocker, app permissions (camera, mic, location).')}
${hs('🔄 Windows Update','Windows Update: check for updates, pause, update history, uninstall updates, advanced options.')}
</div><div class="tm-main"><h4>Network & internet › Ethernet</h4>
<div class="kv"><span>Network profile type</span><span>${hs('◉ Private  ○ Public','Public = device hidden from others, stricter firewall (use on public Wi‑Fi). Private = discoverable on trusted networks.')}</span></div>
<div class="kv"><span>IP assignment</span><span>${hs('Automatic (DHCP) <u>Edit</u>','Edit → Manual lets you set a static IPv4 address, subnet prefix length, gateway, and DNS.')}</span></div>
<div class="kv"><span>DNS server assignment</span><span>Automatic (DHCP)</span></div>
<div class="kv"><span>Metered connection</span><span>${hs('Off','Metered connection limits background data usage (updates, sync).')}</span></div>
<div class="kv"><span>IPv4 address</span><span>192.168.1.24</span></div></div></div>`)};

V['firewall'] = {t:'Windows Defender Firewall with Advanced Security', cap:'Inbound/outbound rules. Rules are allow or block by program, port, IP, and profile.', h: win('Windows Defender Firewall with Advanced Security',
`<div class="tm"><div class="tm-side small">${hs('Inbound Rules','Inbound rules control traffic coming INTO the PC (e.g., allow TCP 3389 for RDP).','on')}${hs('Outbound Rules','Outbound rules control traffic leaving the PC. Default is allow.')}<div>Connection Security Rules</div><div>Monitoring</div></div>
<div class="tm-main"><table class="tbl sm"><tr><th>Name</th><th>${hs('Profile','Profile: Domain, Private, Public – a rule may apply only on certain network types.')}</th><th>Enabled</th><th>${hs('Action','Allow or Block. Block rules win over allow rules.')}</th><th>Protocol</th><th>Local Port</th></tr>
<tr><td>Remote Desktop – User Mode (TCP‑In)</td><td>Domain</td><td>✔ Yes</td><td>Allow</td><td>TCP</td><td>${hs('3389','RDP port. Only allow on the Domain profile; never expose directly to the internet.')}</td></tr>
<tr><td>File and Printer Sharing (SMB‑In)</td><td>Private</td><td>✔ Yes</td><td>Allow</td><td>TCP</td><td>445</td></tr>
<tr class="hot"><td>${hs('Block Telnet','Custom block rule – Telnet (23) is insecure.')}</td><td>All</td><td>✔ Yes</td><td>Block</td><td>TCP</td><td>23</td></tr>
<tr><td>Inventory App (TCP‑In)</td><td>Domain, Private</td><td>✔ Yes</td><td>Allow</td><td>TCP</td><td>8080</td></tr></table>
<div class="statusbar">${hs('Actions › New Rule… → Program / Port / Predefined / Custom','New Rule wizard: choose rule type, protocol & port, action (allow/block), profile, and name.')}</div></div></div>`)};

V['aduc'] = {t:'Active Directory Users and Computers (dsa.msc)', cap:'Domain → OUs → users, groups, computers.', h: win('Active Directory Users and Computers',
`<div class="tm"><div class="tm-side small"><div>▾ ${hs('corp.example.com','The domain – a central security boundary managed by domain controllers.')}</div><div class="i1">▸ Builtin</div><div class="i1">▸ Computers</div><div class="i1">▾ ${hs('📁 Sales (OU)','Organizational Unit – a folder for users/computers. Link GPOs here to apply settings to everything inside.','on')}</div><div class="i2">📁 Laptops</div><div class="i1">▸ 📁 IT (OU)</div><div class="i1">▸ Users</div></div>
<div class="tm-main"><table class="tbl sm"><tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr><td>${hs('👤 Jordan Lee','User object. Right‑click → Reset Password, Disable Account, Add to a group, Move. Account tab: "Unlock account" for lockouts.')}</td><td>User</td><td>Account Exec</td></tr>
<tr><td>👤 Priya Shah</td><td>User</td><td>Sales Manager</td></tr>
<tr><td>${hs('<span class="downico">⬇</span> 👤 Sam Ortiz','Down‑arrow icon = disabled account (e.g., employee offboarded). Disable promptly when people leave.')}</td><td>User</td><td>Left 10/2026</td></tr>
<tr><td>${hs('👥 Sales‑Share‑RW','Security group. Grant permissions to the group, then add users – easier than per‑user permissions (RBAC).')}</td><td>Security Group – Global</td><td>Write access to \\\\fs01\\sales</td></tr>
<tr><td>💻 SALES‑LT‑014</td><td>Computer</td><td></td></tr></table></div></div>`)};

V['cmd-ipconfig'] = {t:'ipconfig /all', cap:'Shows IP settings. Tap the lines.', h: term('Command Prompt',
`${P}ipconfig /all

Ethernet adapter Ethernet:
   Description . . . . . . . . . . . : Intel(R) Ethernet I219-V
   ${hs('Physical Address. . . . . . . . . : 3C-52-82-1A-7F-09','MAC address – 48‑bit hardware address (Layer 2), shown in hex.')}
   ${hs('DHCP Enabled. . . . . . . . . . . : Yes','DHCP Enabled = Yes means this address came from a DHCP server.')}
   ${hs('IPv6 Address. . . . . . . . . . . : fe80::4c1:9a2e:72d1:5b3%12','fe80:: = IPv6 link‑local address, always present when IPv6 is on.')}
   ${hs('IPv4 Address. . . . . . . . . . . : 192.168.1.24(Preferred)','The PC\'s IPv4 address – private RFC1918 range 192.168.x.x.')}
   ${hs('Subnet Mask . . . . . . . . . . . : 255.255.255.0','255.255.255.0 = /24: 254 usable hosts on this network.')}
   Lease Obtained. . . . . . . . . . : Tuesday, November 17, 2026 6:41:02 AM
   ${hs('Default Gateway . . . . . . . . . : 192.168.1.1','Default gateway – the router used to reach other networks/the internet.')}
   DHCP Server . . . . . . . . . . . : 192.168.1.1
   ${hs('DNS Servers . . . . . . . . . . . : 192.168.1.1','DNS server used for name resolution. Wrong DNS = names fail but IPs work.')}

Wireless LAN adapter Wi-Fi:
   ${hs('Autoconfiguration IPv4 Address. . : 169.254.88.12(Preferred)','169.254.x.x = APIPA. The Wi‑Fi adapter could NOT reach a DHCP server. Try ipconfig /release then /renew, check the AP/VLAN/DHCP scope.','bad')}
   Subnet Mask . . . . . . . . . . . : 255.255.0.0
   Default Gateway . . . . . . . . . :
`)};

V['cmd-ping'] = {t:'ping', cap:'Tests reachability with ICMP echo.', h: term('Command Prompt',
`${P}ping 8.8.8.8

Pinging 8.8.8.8 with 32 bytes of data:
${hs('Reply from 8.8.8.8: bytes=32 time=14ms TTL=117','Reply = reachable. time = round‑trip latency. TTL = hops remaining.')}
Reply from 8.8.8.8: bytes=32 time=15ms TTL=117
${hs('Ping statistics for 8.8.8.8:\n    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)','Summary – packet loss % helps diagnose flaky links.')}

${P}ping www.example.com
${hs('Ping request could not find host www.example.com. Please check the name and try again.','IP works but the name fails → DNS problem. Check DNS server settings, then nslookup and ipconfig /flushdns.','bad')}

${P}ping 192.168.50.10
${hs('Request timed out.','Timed out = no reply: host down, firewall blocking ICMP, or routing problem.','bad')}
${hs('Reply from 192.168.1.1: Destination host unreachable.','The gateway says it has no route/ARP to that host.','bad')}
`)};

V['cmd-tracert'] = {t:'tracert', cap:'Lists each router hop to a destination.', h: term('Command Prompt',
`${P}tracert www.example.com

Tracing route to www.example.com [93.184.215.14]
over a maximum of 30 hops:

  ${hs('1     1 ms    1 ms    1 ms  192.168.1.1','Hop 1 is your default gateway. If tracert stops here, the problem is at/after your router or ISP link.')}
  2     9 ms    8 ms    9 ms  10.24.0.1
  3    11 ms   10 ms   12 ms  isp-core-1.example.net [203.0.113.9]
  ${hs('4     *        *        *     Request timed out.','* * * = that router didn\'t answer the probe (often ICMP rate limiting). If later hops answer, the path still works.')}
  5    14 ms   14 ms   15 ms  198.51.100.77
  ${hs('6    15 ms   14 ms   14 ms  93.184.215.14','Final hop = destination reached.')}

Trace complete.
`)};

V['cmd-netstat'] = {t:'netstat -ano', cap:'Shows connections, listening ports and owning process IDs.', h: term('Command Prompt (Admin)',
`${P}netstat -ano

  Proto  Local Address          Foreign Address        State           PID
  ${hs('TCP    0.0.0.0:135            0.0.0.0:0              LISTENING       1032','LISTENING = a service waiting for connections on that port (135 = RPC).')}
  TCP    0.0.0.0:445            0.0.0.0:0              LISTENING       4
  ${hs('TCP    0.0.0.0:3389           0.0.0.0:0              LISTENING       1260','Port 3389 listening = Remote Desktop is enabled on this PC.')}
  TCP    192.168.1.24:51522     142.250.72.110:443     ESTABLISHED     8812
  ${hs('TCP    192.168.1.24:51790     185.220.101.4:4444     ESTABLISHED     6620','Suspicious: an established connection to an unknown IP on port 4444 (common reverse‑shell port). Look up PID 6620 in Task Manager → Details.','bad')}
  UDP    0.0.0.0:5353           *:*                                    2140
`)};

V['cmd-nslookup'] = {t:'nslookup', cap:'Queries DNS servers directly.', h: term('Command Prompt',
`${P}nslookup www.example.com
${hs('Server:  dns.home.lan\nAddress:  192.168.1.1','Which DNS server answered the query.')}

${hs('Non-authoritative answer:','Non‑authoritative = answer came from a cache, not the domain\'s own authoritative server.')}
Name:    www.example.com
${hs('Addresses:  2606:2800:21f:cb07:6820:80da:af6b:8b2c\n          93.184.215.14','AAAA (IPv6) and A (IPv4) records returned.')}

${P}nslookup -type=mx example.com
${hs('example.com  MX preference = 10, mail exchanger = mail.example.com','MX record = mail server for the domain. Lower preference = tried first.')}
`)};

V['cmd-sfc'] = {t:'chkdsk & sfc', cap:'Repair the file system and protected Windows files (run as Administrator).', h: term('Administrator: Command Prompt',
`C:\\Windows\\system32&gt;${hs('chkdsk C: /f /r','chkdsk /f fixes file‑system errors; /r also finds bad sectors and recovers readable data. On C: it schedules for next reboot.')}
The type of the file system is NTFS.
Cannot lock current drive.
${hs('Would you like to schedule this volume to be checked the next time the system restarts? (Y/N) Y','The system drive is in use, so chkdsk runs at the next boot.')}

C:\\Windows\\system32&gt;${hs('sfc /scannow','System File Checker scans protected OS files and replaces corrupted ones from the component store.')}
Beginning system scan.  This process will take some time.
Verification 100% complete.
${hs('Windows Resource Protection found corrupt files but was unable to fix some of them.','If sfc can\'t fix files, run DISM /Online /Cleanup-Image /RestoreHealth to repair the image, then run sfc again.','bad')}

C:\\Windows\\system32&gt;DISM /Online /Cleanup-Image /RestoreHealth
[==========================100.0%==========================]
${hs('The restore operation completed successfully.','DISM repaired the component store; now re‑run sfc /scannow.')}
`)};

V['cmd-gpupdate'] = {t:'gpupdate & gpresult', cap:'Apply and verify Group Policy.', h: term('Command Prompt',
`${P}${hs('gpupdate /force','Forces all Group Policy settings to re‑apply now instead of waiting ~90 minutes.')}
Updating policy...

Computer Policy update has completed successfully.
${hs('User Policy update has completed successfully.','Some user settings (like folder redirection) need a log off/on to take effect.')}

${P}${hs('gpresult /r','Shows the Resultant Set of Policy: which GPOs applied to this computer and user.')}
USER SETTINGS
    CN=Jordan Lee,OU=Sales,DC=corp,DC=example,DC=com
    ${hs('Applied Group Policy Objects\n        Sales Drive Mapping\n        Default Domain Policy','GPOs that applied. If an expected GPO is missing, check OU placement, security filtering, or link status.')}
`)};

V['linux'] = {t:'Linux terminal', cap:'Common commands with output.', h: term('alex@ubuntu: ~',
`alex@ubuntu:~$ ${hs('pwd','Print working directory.')}
/home/alex
alex@ubuntu:~$ ${hs('ls -l','List files with permissions, owner, size, date.')}
${hs('-rwxr-x--- 1 alex staff  512 Nov 17 07:10 backup.sh','Permissions: owner rwx (7), group r‑x (5), others --- (0) → chmod 750.')}
-rw-r--r-- 1 alex staff 2048 Nov 16 18:22 notes.txt
alex@ubuntu:~$ ${hs('sudo apt update &amp;&amp; sudo apt install nmap','sudo = run as root. apt = package manager on Debian/Ubuntu (dnf on Red Hat/Fedora).')}
[sudo] password for alex:
alex@ubuntu:~$ ${hs('ip addr show eth0','Show interface IP config (modern replacement for ifconfig).')}
2: eth0: &lt;BROADCAST,MULTICAST,UP&gt; mtu 1500
    inet 10.0.0.15/24 brd 10.0.0.255 scope global eth0
alex@ubuntu:~$ ${hs('grep "Failed password" /var/log/auth.log | tail -3','grep searches text – here, failed SSH logins in the auth log (possible brute force).')}
Nov 17 06:58:01 sshd[2211]: Failed password for root from 203.0.113.50
alex@ubuntu:~$ ${hs('df -h','Disk free, human‑readable sizes.')}
/dev/sda1   98G   71G   22G  77% /
alex@ubuntu:~$ ${hs('chmod 755 backup.sh','Give owner rwx, group and others r‑x.')}
`)};

V['bios'] = {t:'UEFI firmware setup', cap:'Enter with Del/F2/F10 at boot (varies by vendor).', h: `<div class="uefi"><div class="uefi-top"><b>UEFI Setup Utility</b><span>CPU 42°C · Fan 1100 RPM</span></div>
<div class="uefi-tabs"><span>Main</span><span class="on">Advanced</span><span>Security</span><span>Boot</span><span>Exit</span></div>
<div class="uefi-body"><div class="kv"><span>${hs('Intel Virtualization Technology (VT‑x)','Must be Enabled to run 64‑bit virtual machines / Hyper‑V / WSL2.')}</span><span>[Enabled]</span></div>
<div class="kv"><span>${hs('Secure Boot','Only boot loaders signed with trusted keys can run – blocks bootkits. Required capability for Windows 11.')}</span><span>[Enabled]</span></div>
<div class="kv"><span>${hs('TPM Device (PTT/fTPM)','Firmware TPM 2.0 – stores BitLocker keys; Windows 11 requires it.')}</span><span>[Available]</span></div>
<div class="kv"><span>${hs('Boot Option #1','Boot order: which device the firmware tries first. "No bootable device" or booting the wrong drive → fix here.')}</span><span>[Windows Boot Manager (NVMe0)]</span></div>
<div class="kv"><span>Boot Option #2</span><span>[UEFI: USB Flash]</span></div>
<div class="kv"><span>${hs('Supervisor (Admin) Password','Firmware password stops people from changing boot order to boot their own OS.')}</span><span>[Not Installed]</span></div>
<div class="kv"><span>${hs('CSM (Legacy Boot)','Compatibility Support Module emulates old BIOS. Disable for GPT/Secure Boot.')}</span><span>[Disabled]</span></div>
<div class="kv"><span>${hs('USB Ports (Rear)','Can disable USB ports at firmware level for security.')}</span><span>[Enabled]</span></div></div>
<div class="uefi-foot">F10 Save &amp; Exit · Esc Discard · F9 Load Defaults</div></div>`};

V['wireshark'] = {t:'Wireshark packet capture', cap:'Packet list, details and bytes. Tap rows to learn what they show.', h: win('Wireshark · Ethernet',
`<div class="ws-filter">${hs('tcp.port == 80 || dns || tcp.flags.syn==1','Display filter bar – narrows the packets shown. Green = valid filter.')}</div>
<table class="tbl sm mono ws"><tr><th>No.</th><th>Time</th><th>Source</th><th>Destination</th><th>Proto</th><th>Info</th></tr>
<tr class="dns"><td>1</td><td>0.000</td><td>192.168.1.24</td><td>192.168.1.1</td><td>DNS</td><td>${hs('Standard query A shop.example.com','DNS query (UDP 53) asking for the A record.')}</td></tr>
<tr class="dns"><td>2</td><td>0.012</td><td>192.168.1.1</td><td>192.168.1.24</td><td>DNS</td><td>Standard query response A 203.0.113.80</td></tr>
<tr class="syn"><td>3</td><td>0.013</td><td>192.168.1.24</td><td>203.0.113.80</td><td>TCP</td><td>${hs('51544 → 80 [SYN]','Step 1 of the TCP 3‑way handshake.')}</td></tr>
<tr class="syn"><td>4</td><td>0.041</td><td>203.0.113.80</td><td>192.168.1.24</td><td>TCP</td><td>${hs('80 → 51544 [SYN, ACK]','Step 2: server acknowledges and synchronizes.')}</td></tr>
<tr><td>5</td><td>0.041</td><td>192.168.1.24</td><td>203.0.113.80</td><td>TCP</td><td>51544 → 80 [ACK]</td></tr>
<tr class="http"><td>6</td><td>0.042</td><td>192.168.1.24</td><td>203.0.113.80</td><td>HTTP</td><td>${hs('POST /login.php (user=alex&amp;pass=Summer26)','Cleartext credentials over HTTP – anyone capturing traffic can read them. This is why HTTPS (443) matters.','bad')}</td></tr>
<tr class="bad"><td>7</td><td>0.300</td><td>192.168.1.66</td><td>Broadcast</td><td>ARP</td><td>${hs('Who has 192.168.1.1? Tell 192.168.1.66 / 192.168.1.1 is at 00:0c:29:aa:bb:cc (duplicate)','Two MACs claiming the gateway IP → ARP poisoning / on‑path attack indicator.','bad')}</td></tr></table>
<div class="ws-detail">${hs('▸ Frame 6 › Ethernet II › Internet Protocol Version 4 › Transmission Control Protocol › Hypertext Transfer Protocol','Packet details pane shows each encapsulation layer: Frame (L1) → Ethernet (L2) → IP (L3) → TCP (L4) → HTTP (L7).')}</div>`)};

V['nmap'] = {t:'nmap scan', cap:'Port and service discovery. Only scan systems you are authorized to test!', h: term('kali@lab: ~',
`$ ${hs('nmap -sV -p 1-1000 10.0.5.20','-sV = detect service versions. -p = port range. -sS = SYN (half‑open) scan.')}
Starting Nmap ( https://nmap.org )
Nmap scan report for 10.0.5.20
${hs('Host is up (0.0021s latency).','Host discovery succeeded.')}
Not shown: 994 closed tcp ports (reset)
PORT     STATE    SERVICE      VERSION
22/tcp   open     ssh          OpenSSH 9.6
${hs('23/tcp   open     telnet       Linux telnetd','Telnet open = cleartext management. A finding to remediate (disable, use SSH).','bad')}
80/tcp   open     http         nginx 1.18.0
443/tcp  open     ssl/http     nginx 1.18.0
${hs('445/tcp  filtered microsoft-ds','filtered = a firewall is dropping probes; nmap can\'t tell if it\'s open.')}
${hs('3306/tcp open     mysql        MySQL 5.5.62','Old, unsupported MySQL exposed to the network – a vulnerability scanner would flag known CVEs.','bad')}

Nmap done: 1 IP address (1 host up) scanned in 9.84 seconds
`)};

V['siem'] = {t:'SIEM dashboard', cap:'Correlated alerts from many log sources.', h: `<div class="siem"><div class="siem-top"><b>🛡 SecureView SIEM</b><span>Last 24h · 1.2M events</span></div>
<div class="siem-cards"><div>${hs('<b>3</b><small>Critical</small>','Critical alerts need immediate triage.','crit')}</div><div><b>17</b><small>High</small></div><div><b>142</b><small>Medium</small></div><div>${hs('<b>38</b><small>Log sources</small>','Firewalls, endpoints/EDR, AD, servers, cloud, IDS – all forwarding (e.g., syslog UDP 514, agents, APIs).')}</div></div>
<div class="siem-chart">${[3,4,3,5,4,6,5,4,22,6,5,4].map((v,i)=>`<i style="height:${v*4}px" class="${v>15?'spike':''}"></i>`).join('')}${hs('','Spike at 02:00 – an anomaly vs. baseline. Correlate with alerts below.','abs')}</div>
<table class="tbl sm"><tr><th>Sev</th><th>Rule</th><th>Entity</th></tr>
<tr><td class="crit">CRIT</td><td>${hs('Impossible travel','Same account signed in from Chicago and Lagos 12 minutes apart – likely stolen credentials. Reset password, revoke sessions, check MFA.')}</td><td>jlee@corp</td></tr>
<tr><td class="crit">CRIT</td><td>${hs('Brute force → success','Many failed logins (4625) followed by a success (4624) for the same account – possible password guessing/spraying success.')}</td><td>svc-backup</td></tr>
<tr><td class="hi">HIGH</td><td>${hs('Outbound to known C2 IP','Threat‑intel feed matched a command‑and‑control address. Isolate the host (containment).')}</td><td>SALES-LT-014</td></tr>
<tr><td class="hi">HIGH</td><td>${hs('Audit log cleared (Event 1102)','Clearing the Security log is a classic attacker anti‑forensics step.')}</td><td>FS01</td></tr>
<tr><td class="md">MED</td><td>Port scan detected</td><td>10.0.9.33</td></tr></table></div>`};

V['router'] = {t:'SOHO router admin page', cap:'Typical home/small office router settings.', h: `<div class="router"><div class="r-top"><b>📶 HomeRouter AX3000</b><span>Firmware 1.2.4 · ${hs('Update available','Always install firmware updates – they patch security holes.')}</span></div>
<div class="r-nav"><span>Status</span><span class="on">Wireless</span><span>LAN/DHCP</span><span>NAT/Forwarding</span><span>Security</span><span>Admin</span></div>
<div class="r-body">
<div class="kv"><span>Network name (SSID)</span><span>${hs('SmithOffice','SSID = the Wi‑Fi network name. Hiding it is NOT real security.')}</span></div>
<div class="kv"><span>Security mode</span><span>${hs('WPA3‑Personal (SAE) ▾','Pick WPA3 (or WPA2/WPA3 transitional). Never WEP or open.')}</span></div>
<div class="kv"><span>Band / Channel</span><span>${hs('2.4 GHz: 6 · 5 GHz: 36 (80 MHz) · 6 GHz: Auto','2.4 GHz non‑overlapping channels are 1, 6, 11.')}</span></div>
<div class="kv"><span>WPS</span><span>${hs('Off','WPS PIN can be brute‑forced – turn it off.')}</span></div>
<div class="kv"><span>Guest network</span><span>${hs('On · Isolated','Guest network isolation keeps visitors off your LAN devices.')}</span></div>
<div class="kv"><span>DHCP reservation</span><span>${hs('Printer 3C:52:82:11:22:33 → 192.168.1.50','Reservation = same IP every time for that MAC.')}</span></div>
<div class="kv"><span>Port forwarding</span><span>${hs('TCP 8443 → 192.168.1.60:443 (camera)','Forwards one outside port to one inside device. Safer than a DMZ host.')}</span></div>
<div class="kv"><span>UPnP</span><span>${hs('Disabled','UPnP lets devices open ports automatically – malware can abuse it.')}</span></div>
<div class="kv"><span>Admin password</span><span>${hs('Changed ✔','The very first thing to change on any new router.')}</span></div></div></div>`};

V['phone'] = {t:'Phone settings & MDM', cap:'Mobile connectivity and management settings.', h: `<div class="phone"><div class="ph-notch"></div><div class="ph-scr"><div class="ph-h">Settings</div>
<div class="ph-row">${hs('✈ Airplane mode <i class="tg"></i>','Airplane mode turns off all radios. First thing to check when a phone has "no connectivity".')}</div>
<div class="ph-row">${hs('📶 Wi‑Fi · HomeNet','Forget network and rejoin if Wi‑Fi won\'t connect.')}</div>
<div class="ph-row">${hs('🔵 Bluetooth · On','Pair: enable → discoverable → select → PIN → test.')}</div>
<div class="ph-row">${hs('📡 Personal Hotspot','Shares cellular data with laptops (tethering).')}</div>
<div class="ph-row">${hs('💳 NFC & payments','NFC: ~4 cm range for tap‑to‑pay.')}</div>
<div class="ph-row">${hs('🏢 Work profile · Managed by Contoso MDM','MDM profile: enforces passcode, encryption, approved apps, VPN/Wi‑Fi configs, and allows remote wipe.')}</div>
<div class="ph-row">${hs('🔒 Face ID & Passcode','Screen lock + biometrics; failed attempts can trigger wipe per policy.')}</div>
<div class="ph-row">${hs('🔋 Battery · Health 71%','Battery health below ~80% → poor battery life; consider replacement.')}</div></div></div>`};

/* ---------- Diagrams ---------- */
V['osi'] = {t:'OSI model', cap:'Please Do Not Throw Sausage Pizza Away (1→7).', h: `<div class="osi">${CONTENT.osi.map(l=>`<div class="osi-l l${l.n}" data-tip="${e(`Layer ${l.n} ${l.name}: ${l.desc} PDU: ${l.pdu}. Examples: ${l.ex}. Devices: ${l.dev}.`)}"><b>${l.n}</b><span>${l.name}</span><small>${l.ex.split(',').slice(0,3).join(',')}</small></div>`).join('')}</div>`};

V['tcpip'] = {t:'Encapsulation & TCP/IP model', cap:'Each layer wraps the one above with its header.', h: `<div class="encap">
<div class="row" data-tip="Application data (HTTP request, email, etc.). TCP/IP model: Application layer = OSI 5‑7."><span class="blk app">DATA</span><small>Application (OSI 5‑7)</small></div>
<div class="row" data-tip="TCP/UDP header adds source & destination PORTS → Segment (TCP) / Datagram (UDP)."><span class="blk l4">TCP hdr</span><span class="blk app">DATA</span><small>Transport → Segment</small></div>
<div class="row" data-tip="IP header adds source & destination IP ADDRESSES and TTL → Packet."><span class="blk l3">IP hdr</span><span class="blk l4">TCP</span><span class="blk app">DATA</span><small>Internet → Packet</small></div>
<div class="row" data-tip="Ethernet header adds MAC addresses; trailer adds FCS (CRC error check) → Frame."><span class="blk l2">Eth hdr</span><span class="blk l3">IP</span><span class="blk l4">TCP</span><span class="blk app">DATA</span><span class="blk l2">FCS</span><small>Link → Frame</small></div>
<div class="row" data-tip="Frame turned into electrical, light, or radio signals: bits."><span class="blk l1">0101101001110100101…</span><small>Physical → Bits</small></div></div>`};

V['topologies'] = {t:'Network topologies', cap:'Tap a diagram.', h: `<div class="topos">
<svg viewBox="0 0 100 80" data-tip="Star: every device connects to a central switch. Easy to manage; the switch is a single point of failure."><circle cx="50" cy="40" r="8" class="hub"/>${[[15,12],[85,12],[10,60],[90,60],[50,75]].map(([x,y])=>`<line x1="50" y1="40" x2="${x}" y2="${y}"/><circle cx="${x}" cy="${y}" r="5"/>`).join('')}<text x="50" y="8">Star</text></svg>
<svg viewBox="0 0 100 80" data-tip="Full mesh: every node links to every other – maximum redundancy, highest cost. n(n‑1)/2 links.">${(()=>{const p=[[20,20],[80,20],[90,60],[50,75],[10,60]];let s='';for(let i=0;i<p.length;i++)for(let j=i+1;j<p.length;j++)s+=`<line x1="${p[i][0]}" y1="${p[i][1]}" x2="${p[j][0]}" y2="${p[j][1]}"/>`;return s+p.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5"/>`).join('')})()}<text x="50" y="8">Mesh</text></svg>
<svg viewBox="0 0 100 80" data-tip="Spine‑and‑leaf (data centers): every leaf switch connects to every spine switch, so any server is ≤2 hops away from any other.">${[30,70].map(x=>[15,40,65,90].map(l=>`<line x1="${x}" y1="22" x2="${l-5}" y2="60"/>`).join('')).join('')}${[30,70].map(x=>`<rect x="${x-9}" y="16" width="18" height="10" class="hub"/>`).join('')}${[15,40,65,90].map(x=>`<rect x="${x-12}" y="56" width="14" height="9"/>`).join('')}<text x="50" y="8">Spine &amp; leaf</text></svg>
<svg viewBox="0 0 100 80" data-tip="Hub‑and‑spoke WAN: branch sites connect only to headquarters. Cheaper than mesh, but branch‑to‑branch traffic goes through HQ."><rect x="40" y="32" width="20" height="14" class="hub"/>${[[12,15],[88,15],[12,68],[88,68]].map(([x,y])=>`<line x1="50" y1="39" x2="${x}" y2="${y}"/><rect x="${x-7}" y="${y-5}" width="14" height="10"/>`).join('')}<text x="50" y="8">Hub &amp; spoke</text></svg>
</div>`};

V['subnet'] = {t:'Subnetting a /26', cap:'192.168.10.77/26 – find network, broadcast and host range.', h: `<div class="subnet">
<div class="sn-row" data-tip="The address in binary. The mask decides which bits are network (blue) and host (orange)."><span>192.168.10.</span>${'01001101'.split('').map((b,i)=>`<i class="${i<2?'n':'h'}">${b}</i>`).join('')}<small>.77</small></div>
<div class="sn-row" data-tip="/26 = 26 ones: 255.255.255.192. In the last octet, 2 network bits (128+64=192) and 6 host bits."><span>255.255.255.</span>${'11000000'.split('').map((b,i)=>`<i class="${i<2?'n':'h'}">${b}</i>`).join('')}<small>.192</small></div>
<div class="sn-blocks">${[0,64,128,192].map(n=>`<div class="${n===64?'on':''}" data-tip="${n===64?'77 falls in this block: network .64, first host .65, last host .126, broadcast .127. 62 usable hosts.':'Subnet .'+n+' – .'+(n+63)}">.${n}–.${n+63}</div>`).join('')}</div>
<div class="sn-ans" data-tip="Block size = 256 − 192 = 64. Hosts = 2^6 − 2 = 62.">Block 64 → Network <b>.64</b> · Hosts <b>.65–.126</b> · Broadcast <b>.127</b> · <b>62</b> usable</div></div>`};

V['pki'] = {t:'PKI certificate chain', cap:'Browsers trust the root, so they trust what it signs.', h: `<div class="chain">
<div class="cert root" data-tip="Root CA: self‑signed, stored in the OS/browser trust store. Kept offline for safety.">🏛 <b>Root CA</b><small>Self‑signed · in trust store</small></div><div class="arrow">↓ signs</div>
<div class="cert int" data-tip="Intermediate CA: signed by the root; issues day‑to‑day certificates so the root key stays offline.">🏢 <b>Intermediate CA</b><small>Signed by Root</small></div><div class="arrow">↓ signs</div>
<div class="cert leaf" data-tip="Leaf/server certificate for shop.example.com: contains the server's PUBLIC key, subject, SAN names, validity dates, issuer's signature. Revocation checked via CRL or OCSP.">🔒 <b>shop.example.com</b><small>Public key · SAN · Valid to 2027‑11‑17</small></div>
<div class="keys"><span data-tip="Public key: shared with everyone. Others encrypt to you / verify your signatures with it.">🔑 Public key = share</span><span data-tip="Private key: never leaves the server/HSM. Used to decrypt and to sign.">🗝 Private key = secret</span><span data-tip="CSR: you generate a key pair, send the CSR (public key + identity) to the CA, and get back a signed certificate.">📝 CSR → CA → Certificate</span></div></div>`};

V['raid'] = {t:'RAID levels', cap:'Blocks A,B,C… across disks. P = parity.', h: `<div class="raid">${[
['RAID 0','Striping across 2+ disks. Fast, no redundancy – one failure loses everything.',[['A1','A3','A5'],['A2','A4','A6']]],
['RAID 1','Mirroring: identical copies on 2 disks. Survives 1 failure; 50% capacity.',[['A1','A2','A3'],['A1','A2','A3']]],
['RAID 5','Striping with distributed parity across 3+ disks. Survives 1 failure; capacity = n‑1 disks.',[['A1','B1','Cp'],['A2','Bp','C1'],['Ap','B2','C2']]],
['RAID 10','Mirror pairs, then striped (4+ disks). Fast + redundant; 50% capacity.',[['A1','A3'],['A1','A3'],['A2','A4'],['A2','A4']]]
].map(([n,tip,disks])=>`<div class="rd" data-tip="${e(tip)}"><b>${n}</b><div class="rdisks">${disks.map(d=>`<div class="rdisk">${d.map(b=>`<i class="${b.includes('p')?'par':''}">${b}</i>`).join('')}</div>`).join('')}</div></div>`).join('')}</div>`};

V['motherboard'] = {t:'ATX motherboard layout', cap:'Tap a component.', h: `<svg class="mobo" viewBox="0 0 300 330">
<rect x="2" y="2" width="296" height="326" rx="6" class="pcb"/>
<g data-tip="CPU socket (LGA): the processor sits here under the heat sink; apply thermal paste."><rect x="95" y="40" width="70" height="70" class="cpu"/><text x="130" y="80">CPU</text></g>
<g data-tip="DIMM slots: RAM. Fill matching colored slots (e.g., A2+B2) for dual‑channel.">${[190,202,214,226].map(x=>`<rect x="${x}" y="25" width="8" height="120" class="dimm"/>`).join('')}<text x="214" y="160">DIMM</text></g>
<g data-tip="24‑pin ATX main power connector from the PSU."><rect x="255" y="60" width="22" height="70" class="pwr"/><text x="266" y="145">24p</text></g>
<g data-tip="4/8‑pin EPS 12 V CPU power connector."><rect x="40" y="12" width="40" height="14" class="pwr"/><text x="60" y="38">8‑pin</text></g>
<g data-tip="Rear I/O panel: USB, audio, network (RJ45), video outputs for integrated graphics."><rect x="8" y="30" width="22" height="120" class="io"/><text x="19" y="165">I/O</text></g>
<g data-tip="M.2 slot: NVMe or SATA SSDs lie flat, held by one screw."><rect x="70" y="175" width="110" height="10" class="m2"/><text x="125" y="200">M.2</text></g>
<g data-tip="PCIe x16 slot: graphics cards."><rect x="40" y="215" width="160" height="10" class="pcie"/><text x="215" y="224">PCIe x16</text></g>
<g data-tip="PCIe x1 slot: small cards like Wi‑Fi, sound, capture cards."><rect x="40" y="245" width="45" height="8" class="pcie"/><text x="100" y="252">x1</text></g>
<g data-tip="Chipset (under heat sink): links CPU to SATA, USB, and extra PCIe lanes."><rect x="200" y="235" width="40" height="40" class="chip"/><text x="220" y="259">Chipset</text></g>
<g data-tip="SATA ports: 7‑pin data cables for SATA SSDs/HDDs and optical drives.">${[0,1,2,3].map(i=>`<rect x="262" y="${200+i*16}" width="18" height="10" class="sata"/>`).join('')}<text x="250" y="275">SATA</text></g>
<g data-tip="CMOS battery (CR2032): keeps time/firmware settings. If the clock resets, replace it."><circle cx="150" cy="290" r="14" class="cmos"/><text x="150" y="294">CMOS</text></g>
<g data-tip="Front‑panel headers: power switch, reset, LEDs, front USB and audio."><rect x="225" y="300" width="50" height="10" class="hdr"/><text x="250" y="323">Front panel</text></g>
</svg>`};

V['connectors'] = {t:'Common connectors', cap:'Tap each connector.', h: `<div class="conns">${[
['RJ45','8‑pin Ethernet connector on twisted pair (Cat 5e/6/6a).','<rect x="8" y="10" width="34" height="28" rx="2"/><rect x="14" y="4" width="22" height="8"/>'+[0,1,2,3,4,5,6,7].map(i=>`<line x1="${13+i*3.4}" y1="14" x2="${13+i*3.4}" y2="22" class="pin"/>`).join('')],
['RJ11','Smaller 6P2C/6P4C connector for phone lines/DSL.','<rect x="13" y="12" width="24" height="24" rx="2"/>'+[0,1].map(i=>`<line x1="${22+i*5}" y1="16" x2="${22+i*5}" y2="22" class="pin"/>`).join('')],
['USB‑A','Rectangular classic USB host port. Blue tongue often = USB 3.x.','<rect x="6" y="16" width="38" height="16" rx="1"/><rect x="10" y="20" width="30" height="5" class="tongue"/>'],
['USB‑C','Small, oval, reversible. Power, data, DisplayPort, Thunderbolt.','<rect x="10" y="19" width="30" height="10" rx="5"/><rect x="15" y="23" width="20" height="2" class="tongue"/>'],
['HDMI','Digital video + audio. Trapezoid shape.','<path d="M6 16 H44 V27 L39 32 H11 L6 27 Z"/>'],
['DisplayPort','Digital video+audio; one corner cut off.','<path d="M6 16 H44 V32 H11 L6 27 Z"/>'],
['VGA (DE15)','Analog video, 15 pins in 3 rows, usually blue.','<path d="M4 14 H46 L41 34 H9 Z" class="vga"/>'+[0,1,2].map(r=>[0,1,2,3,4].map(c=>`<circle cx="${14+c*5.5+r*1}" cy="${19+r*6}" r="1.4" class="pinf"/>`).join('')).join('')],
['DVI','Digital (DVI‑D) or analog (DVI‑A/I) video; wide white connector.','<rect x="3" y="15" width="44" height="18" rx="2"/>'+[0,1,2].map(r=>[0,1,2,3,4,5,6,7].map(c=>`<rect x="${7+c*3.3}" y="${18+r*4.5}" width="2" height="2" class="pinf"/>`).join('')).join('')+'<line x1="38" y1="24" x2="44" y2="24" class="pin"/>'],
['F‑type','Screw‑on coax connector for cable modems (RG6).','<circle cx="25" cy="24" r="14"/><circle cx="25" cy="24" r="3" class="pinf"/>'],
['LC','Small form‑factor fiber connector with latch, often duplex.','<rect x="8" y="14" width="14" height="20" rx="2"/><rect x="28" y="14" width="14" height="20" rx="2"/><circle cx="15" cy="24" r="2" class="pinf"/><circle cx="35" cy="24" r="2" class="pinf"/>'],
['SC','Square push‑pull fiber connector.','<rect x="12" y="10" width="26" height="28" rx="2"/><circle cx="25" cy="24" r="3" class="pinf"/>'],
['ST','Round bayonet twist‑lock fiber connector.','<circle cx="25" cy="24" r="14"/><circle cx="25" cy="24" r="3" class="pinf"/><rect x="36" y="22" width="8" height="4"/>'],
['SATA','L‑shaped 7‑pin internal drive data connector (power is 15‑pin).','<path d="M6 18 H44 V30 H12 V26 H6 Z"/>'],
['Lightning','Apple 8‑pin reversible connector (older iPhones).','<rect x="16" y="10" width="18" height="28" rx="3"/>'+[0,1,2,3].map(i=>`<rect x="20" y="${14+i*5}" width="10" height="2.5" class="pinf"/>`).join('')],
].map(([n,tip,svg])=>`<div class="conn" data-tip="${e(n+': '+tip)}"><svg viewBox="0 0 50 48">${svg}</svg><span>${n}</span></div>`).join('')}</div>`};

V['pinout'] = {t:'T568A vs T568B', cap:'Pin 1 is on the left with the clip facing away.', h: `<div class="pinout">${[
['T568B',['wo','o','wg','b','wb','g','wbr','br']],['T568A',['wg','g','wo','b','wb','o','wbr','br']]].map(([n,c])=>`<div class="po" data-tip="${n}: ${n==='T568B'?'White/Orange, Orange, White/Green, Blue, White/Blue, Green, White/Brown, Brown':'White/Green, Green, White/Orange, Blue, White/Blue, Orange, White/Brown, Brown'}. Same standard both ends = straight‑through; A on one end + B on the other = crossover."><b>${n}</b><div class="wires">${c.map((w,i)=>`<i class="w-${w}" title="${i+1}"><small>${i+1}</small></i>`).join('')}</div></div>`).join('')}</div>`};

V['laser'] = {t:'Laser printing process', cap:'Please Charge Every Day To Fully Charge.', h: `<div class="steps cyc">${[
['Processing','The printer builds a raster image of the page in memory.'],['Charging','Primary charge roller puts a uniform negative charge on the drum.'],['Exposing','The laser "writes" the image by neutralizing charge where toner should go.'],['Developing','Toner sticks to the exposed areas of the drum.'],['Transferring','Transfer roller/belt pulls toner from the drum onto the paper.'],['Fusing','Heat + pressure melt toner onto paper. Smears = fuser problem.'],['Cleaning','Wiper blade removes leftover toner; erase lamp clears charge. Ghosting = cleaning problem.']
].map(([n,t],i)=>`<div class="st" data-tip="${e(t)}"><b>${i+1}</b>${n}</div>`).join('')}</div>`};

V['hypervisor'] = {t:'Type 1 vs Type 2 hypervisors', cap:'Where the hypervisor sits.', h: `<div class="hv"><div class="stack" data-tip="Type 1 (bare‑metal): hypervisor runs directly on hardware – ESXi, Hyper‑V, KVM/Proxmox. Used in data centers."><div class="vms"><span>VM</span><span>VM</span><span>VM</span></div><div class="lay hyp">Hypervisor (Type 1)</div><div class="lay hw">Hardware</div><b>Type 1</b></div>
<div class="stack" data-tip="Type 2 (hosted): hypervisor is an app on a normal OS – VirtualBox, VMware Workstation, Parallels. Good for labs/testing."><div class="vms"><span>VM</span><span>VM</span></div><div class="lay hyp">Hypervisor app (Type 2)</div><div class="lay os">Host OS (Windows/macOS)</div><div class="lay hw">Hardware</div><b>Type 2</b></div>
<div class="stack" data-tip="Containers share the host kernel; each holds an app + libraries. Lighter and faster than VMs."><div class="vms"><span>App</span><span>App</span><span>App</span></div><div class="lay hyp">Container engine</div><div class="lay os">Host OS kernel</div><div class="lay hw">Hardware</div><b>Containers</b></div></div>`};

V['cloud'] = {t:'Cloud responsibility stack', cap:'Orange = you manage · Blue = provider manages.', h: `<div class="cloudm">${['On‑prem','IaaS','PaaS','SaaS'].map((m,mi)=>`<div class="cm" data-tip="${e({0:'On‑premises: you manage everything.',1:'IaaS: provider runs hardware, network, virtualization. You manage OS, runtime, apps, data. e.g., cloud VMs.',2:'PaaS: provider also runs OS & runtime. You manage your app and data.',3:'SaaS: provider runs everything; you manage users and data. e.g., Microsoft 365.'}[mi])}"><b>${m}</b>${['Data & users','Applications','Runtime','OS','Virtualization','Servers/Storage','Networking'].map((l,li)=>{const you = mi===0 || (mi===1&&li<4) || (mi===2&&li<2) || (mi===3&&li<1);return `<i class="${you?'you':'prov'}">${l}</i>`}).join('')}</div>`).join('')}</div>`};

V['dmz'] = {t:'Screened subnet (DMZ)', cap:'Public servers sit between two firewall zones.', h: `<svg class="net" viewBox="0 0 320 150">
<g data-tip="Internet: untrusted zone."><circle cx="30" cy="75" r="24" class="cloudc"/><text x="30" y="79">Internet</text></g>
<line x1="54" y1="75" x2="90" y2="75"/><g data-tip="Outer firewall: allows only needed ports (e.g., 443) from the internet to DMZ servers."><rect x="90" y="58" width="34" height="34" class="fw"/><text x="107" y="79">FW</text></g>
<line x1="124" y1="75" x2="160" y2="75"/><g data-tip="Screened subnet / DMZ: public‑facing web, mail, DNS servers. If compromised, the attacker still faces another firewall before the LAN."><rect x="150" y="18" width="70" height="114" rx="6" class="zone"/><text x="185" y="34">DMZ</text><rect x="165" y="50" width="40" height="22" class="srv"/><text x="185" y="65">Web</text><rect x="165" y="86" width="40" height="22" class="srv"/><text x="185" y="101">Mail</text></g>
<line x1="220" y1="75" x2="240" y2="75"/><g data-tip="Inner firewall: blocks DMZ→LAN except specific needed flows (e.g., web server to database)."><rect x="240" y="58" width="30" height="34" class="fw"/><text x="255" y="79">FW</text></g>
<line x1="270" y1="75" x2="285" y2="75"/><g data-tip="Internal LAN: trusted zone with users and databases."><rect x="285" y="40" width="30" height="70" rx="4" class="lan"/><text x="300" y="79">LAN</text></g></svg>`};

V['vpn'] = {t:'VPN tunnel', cap:'Encrypted tunnel over an untrusted network.', h: `<svg class="net" viewBox="0 0 320 120">
<g data-tip="Remote user's laptop with VPN client (client‑to‑site). Full tunnel sends all traffic; split tunnel only corporate traffic."><rect x="8" y="45" width="44" height="30" rx="3" class="srv"/><text x="30" y="64">Laptop</text></g>
<g data-tip="The tunnel: IPsec (ESP) or TLS/SSL VPN encrypts packets inside an outer header, so the ISP/coffee‑shop Wi‑Fi sees only encrypted data."><path d="M52 52 H268 M52 68 H268" class="tun"/><text x="160" y="46">encrypted tunnel (IPsec / TLS)</text><circle cx="110" cy="60" r="5" class="pkt"/><circle cx="170" cy="60" r="5" class="pkt"/><circle cx="230" cy="60" r="5" class="pkt"/></g>
<g data-tip="Internet: untrusted path."><ellipse cx="160" cy="95" rx="60" ry="14" class="cloudc"/><text x="160" y="99">Internet</text></g>
<g data-tip="VPN concentrator/firewall at HQ terminates the tunnel and places the user on the corporate network. Use MFA!"><rect x="268" y="45" width="46" height="30" rx="3" class="fw"/><text x="291" y="64">VPN GW</text></g></svg>`};

V['attackflow'] = {t:'Anatomy of a phishing → ransomware attack', cap:'Each step is a chance to detect or stop it.', h: `<div class="steps">${[
['Recon','OSINT: attacker finds staff names/emails on social media.','Limit public info; awareness training.'],
['Phishing email','Spoofed invoice email with malicious attachment.','SPF/DKIM/DMARC, email gateway, user reporting.'],
['Execution','User enables macros; payload runs.','Block macros by policy, EDR, application allow listing.'],
['Credential theft','Keylogger/tools dump passwords.','MFA, least privilege, credential guard.'],
['Lateral movement','Attacker uses RDP/SMB to reach servers.','Segmentation, disable unneeded RDP, monitor with SIEM.'],
['Exfiltration','Data copied out to cloud storage.','DLP, egress filtering, anomaly detection.'],
['Ransomware','Files encrypted; ransom note.','Offline/immutable backups, IR plan, isolate hosts.']
].map(([n,t,d],i)=>`<div class="st wide" data-tip="${e(t+' Defense: '+d)}"><b>${i+1}</b>${n}</div>`).join('')}</div>`};

V['ir'] = {t:'Incident response life cycle', cap:'Please Don\'t Allow Cats Ever Run Loose.', h: `<div class="steps cyc">${[
['Preparation','Policies, IR plan, tools, training, contact lists – before anything happens.'],['Detection','Identify that an incident may be occurring (alerts, user reports).'],['Analysis','Confirm, scope, and prioritize the incident.'],['Containment','Limit damage – isolate hosts, disable accounts.'],['Eradication','Remove the cause – malware, attacker accounts, patch the hole.'],['Recovery','Restore systems from clean backups and monitor.'],['Lessons learned','Post‑incident review; update the plan and controls.']
].map(([n,t],i)=>`<div class="st" data-tip="${e(t)}"><b>${i+1}</b>${n}</div>`).join('')}</div>`};

V['change'] = {t:'Change management flow', cap:'No change without approval and a backout plan.', h: `<div class="steps">${[
['Request','Submit a change request: purpose, scope, owner, affected systems.'],['Impact analysis','What could break? Dependencies, downtime, risk.'],['Test','Try it in a sandbox; capture test results.'],['Backout plan','Exactly how to undo the change if it fails.'],['CAB approval','Change Advisory Board approves/denies.'],['Implement','Execute during the maintenance window.'],['Document','Update diagrams, baselines, version control.']
].map(([n,t],i)=>`<div class="st wide" data-tip="${e(t)}"><b>${i+1}</b>${n}</div>`).join('')}</div>`};

window.VIS = V;
window.renderVis = function(id){
  const v = V[id]; if(!v) return '';
  return `<figure class="vis" data-vis="${id}"><figcaption><b>🖼 ${v.t}</b><small>${v.cap||''}</small></figcaption><div class="vis-body">${v.h}</div><div class="vis-tip">👆 Tap highlighted parts to explain them.</div></figure>`;
};
})();
