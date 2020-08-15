---
layout: asides
toc: true
tasks: false
permalink: /:path/:basename/
---

# 104 Virtual Machine

As of Fall 2020, **we strongly recommend you use Docker**.
Instructions are available on the [repository](https://github.com/csci104/docker/).
If that doesn't work for you, go ahead and follow these legacy instructions for setting up a VirtualBox VM.
 
## Overview
  
The VM we provide is a customized Ubuntu LTS installation that comes with the most recent C++ compiler, libraries, and debuggers.
You can install it on your laptop regardless of your operating system, and use it for the entire semester for labs and homework assignments.
We will grade everything on this VM's compiler version and environment so it is critical you check your code on this system before submitting.
**All C++ compilers are NOT the same.**
The code you write on Visual Studio or XCode (common Windows and Mac development environments) may not run the same way on another system.

## Read This First

- **Never install updates on the Linux VM**.
  If it asks you, just say no!
- **Never checkout a Git repository** into a Dropbox or other sync'ed folder (Google Drive, etc.).
- A version of the VM is installed on the SAL PC's (under the Windows OS)...if your laptop breaks, use those PCs.
  See below for details
- If you can't seem to connect to the internet on your VM but your laptop OS can, simply reboot the VM (not your laptop).
  Most of the time this will allow your VM to reconnect.
- We will grade your assignments on the VM.
  If you want to use your own compiler/environment like Visual Studio, etc. you should ALWAYS bring your code over and test it on the VM before submission.
  If your code does not compile on the VM, **we will not try to fix it and you may get a 0**.
  Consider yourself officially warned!
- If VirtualBox cannot start your VM after it is imported you may need to enable virtualization in your BIOS which can be accessed on Win8 or 10 by following [these steps](https://support.lenovo.com/us/en/documents/ht081446).
  Look for the setting called "virtualization", "VT-x" or "AMD-V" and enable them.
- To be able to resize the Virtualbox window and have the display resize appropriately you may have to install the 'Guest Additions' on the VM.
  See below for details.

## Installation Instructions

To run this virtual machine you will need to download [Oracle VirtualBox](https://www.virtualbox.org/wiki/Downloads).
After installing VirtualBox, download and install the extension pack, available on [the same downloads page](https://www.virtualbox.org/wiki/Downloads).

### Download the Virtual Machine

Next download the virtual machine image.
We recommend using `curl` which is already installed on Mac and Linux machines.
A Windows version is available [here](http://www.confusedbycode.com/curl/).
`curl` is a command line utility to download files from the internet.
Go to a folder where you want to download the file and start a command prompt or Terminal there.
Then, run the command:
```
curl {{ site.data.urls.vm }} -o student-vm.ova
```

- Alternatively, the actual link is available [here]({{ site.data.urls.vm }}).
  Using curl is recommended because browser downloads might disconnect unexpectedly.
- **Optionally,** download an MD5 hash [verification program](http://www.winmd5.com/).
  Compute the MD5 of the `.ova` file you downloaded (with such a big file sometimes bits get corrupted that will cause the VM to be unable to install).
  Verify the MD5 has matches the original MD5 value: `2874fc95716c1e90d6a28c8a4a0dd3`.

### Install the Virtual Machine

Start Virtual Box and choose `File` then `Import`.
Select the Ubuntu Virtual Machine (`student-vm.ova`) you downloaded.
Use the default import options.
Now, ddjust the settings of your VM

Adjust the appropriate amount of base memory.
Everything has to be in the green zone:
<div class="showcase">
    <img src="http://bits.usc.edu/cs104/wp-content/uploads/sites/12/2014/12/mainboard-300x139.png" alt="settings in green zone" />
</div>

Make sure the VM has at least 2 CPU cores allocated.
You can adjust this later to get the best results.
<div class="showcase">
  <img src="http://bits.usc.edu/cs104/wp-content/uploads/sites/12/2014/12/cpu-300x110.png" alt="core count" />
</div>

Turn 3D Acceleration ON.
<div class="showcase">
  <img src="http://bits.usc.edu/cs104/wp-content/uploads/sites/12/2014/12/3d-300x110.png" alt="3d acceleration" />
</div>

Now, click on the Course VM option that now appears in VirtualBox's list and select `Start/Run`.
This will start the VM and start logging you in.
Answer yes or default answer to any dialog box that appears.
If you encounter errors starting your VM go to the [troubleshooting section](#troubleshooting) and then resume these directions.

### Finish Setup

- Login with the credentials:  **username**: `student`  **password**: `developer`
- Hit `Ctrl-Alt-T` to start a terminal window where you can type in commands
- Install the Virtual Box Guest Additions as detailed in the [Do's and Dont's](#DosDonts) Section
- Pick and setup a method to backup your files as detailed in the [Do's and Dont's](#DosDonts) Section
- If you haven't worked with Linux, check out a Linux tutorial such as [this one](http://www.ee.surrey.ac.uk/Teaching/Unix/) (Tutorials 1-6) or possibly [this one](http://vic.gedris.org/Manual-ShellIntro/1.2/ShellIntro.pdf).
- For starters, work through this [tutorial](http://cplusplus.com/doc/tutorial/). Start from the beginning and continuing through pointers. Write down any questions or unclear statements. We can discuss them at the beginning of the semester. Also, I have made lecture videos on most of these topics available at this [CS Modules Site](http://ee.usc.edu/~redekopp/csmodules.html). Please be sure you know the material covered in the first 3 modules (C++ Introduction and Control Structure and Functions) before coming to class. See the next section for details.

## Do's and Don'ts
<ul>
	<li>When you shutdown your VM <b>NEVER</b> "Save the State" of the machine but instead "Power off" the machine or send the "Shutdown Signal"</li>
	<li>In your Linux VM do <b><span style="text-decoration: underline">NOT</span></b> install any updates or upgrades to the OS or other source if it prompts you. Just use the VM as it is.</li>
	<li><b><span style="text-decoration: underline">DO</span></b> install the “Guest Additions” to your Linux VM. This will allow you resize the resolution/window and also support shared folders between your Host and Guest OSs. To do this, start your VM and click the Devices Menu..Install Guest Additions. You may have to enter your password (“developer”) or hit ‘Enter’ once or twice, but other than that it will just run and take a few minutes. When complete it will say “Hit Enter to close the window”. At this point restart your VM and everything should be working.</li>
	<li><b><span style="text-decoration: underline">DO</span></b> find a way to back up your code on the VM. This is not as important, because you will learn how to use git, a version control system, to maintain and save your code. That will automatically act as a reliable backup option, if used correctly. However, here are alternatives:
<ol>
	<li><strong>Dropbox. </strong>You can install Dropbox on the Linux VM and in that way your files will automatically be copied and sync’ed with that service.  However, please <strong>NEVER checkout a Git repository into any folder under Dropbox.</strong>  It may corrupt your Git repository. 
<ul>
	<li>The installation instructions are given <a href="https://www.dropbox.com/install?os=lnx">here</a>. As of Oct 27 2014, they say to enter the following commands one after the other in a command prompt:
<ol>
	<li><tt>cd ~</tt></li>
	<li><tt>wget -O - https://www.dropbox.com/download?plat=lnx.x86_64 | tar xzf -</tt></li>
	<li><tt>~/.dropbox-dist/dropboxd &amp;</tt></li>
	<li>Follow the default options in the installer.</li>
</ol>
</li>
	<li>This will create a folder <tt>/home/student/Dropbox</tt> (a.k.a. <tt>~/Dropbox</tt>). If you keep all of your work in there, it will all be synced. Don’t move or rename the <tt>Dropbox</tt> folder.</li>
</ul>
</li>
	<li><strong>Shared Folders. </strong>You can use the shared folders feature that is part of the VirtualBox service. Follow these steps to create a shared folder in VirtualBox. (note: “guest” or “VM” means the Linux box that you run your code on, while “host” means the system that you normally run.)
<ul>
	<li>Make sure that "Guest Additions" is installed.</li>
	<li>Make a folder called “cs104_files” somewhere on your host machine.</li>
	<li>Open VirtualBox and open the settings for the VM.</li>
	<li>Click on the “shared folders” button.</li>
	<li>Click the somewhat-obscure folder with a green + on it to add a shared folder to the list choosing . In the Folder Path box browse to the folder on the host that you want to share/make available (i.e. the “cs104_files” you just created). The Folder Name will automatically populate with the folder you just chose. Make sure “Auto-mount” is checked.</li>
	<li>Press OK.</li>
	<li>Open up the VM.</li>
	<li>Open a Terminal window.</li>
	<li>Type <code>sudo usermod -a -G vboxsf cs104 
</code>. This gives student the permission to access shared folders.</li>
	<li>Type <code>ln -s /media/sf_cs104_files cs104_files</code>. This creates a new alias in the current folder to where the shared folder was mounted.</li>
	<li>From here you can treat cs104_files just like any other folder on your linux guest.</li>
</ul>
</li>
</ol>
</li>
</ul>

## Troubleshooting
In this section, we briefly go over common problems with VirtualBox and Ubuntu.
<ul>
	<li>In the “Settings” menu, if there is a sign at the bottom of the window that reads “non-optimal”, it means you have chosen a wrong setting. Hover your mouse over the warning message to get the details.</li>
	<li>The error “Failed to install NtCreateSection monitor” on Windows can be due to a known bug. Try downloading the <a href="https://forums.virtualbox.org/viewtopic.php?f=6&amp;t=62615">test build here</a>.</li>
	<li>Error “VT-x features locked or unavailable in MSR”: You need to enable Virtualization for your laptop. If you don’t do this, Ubuntu won’t be able to take advantage of all your CPU power. Usually virtualization is disabled by default on PC laptops and enabled by default on Mac laptops. Here is how to enable it on Windows:
<ol>
	<li>Enter the bios settings. This is different from laptop to laptop so you have to Google it and find the instruction for your make and model. For example something like this “Laptop HP dv6 bios virtualization”. Usually, you have to keep pressing F2, F10, or something similar at the very beginning of your laptop power on. This is before Windows starts.</li>
	<li>Find the “Virtualization” setting in the sub menus and set it to “ON” or “Enable”.
<img title="Enable Virtualization in Bios" src="http://www-scf.usc.edu/~csci104/20142/installation/bios.png" alt="Enable Virtualization in Bios" /></li>
	<li>Save and Exit.</li>
	<li>Older laptops might not have a virtualization option. In that case switch back to single-core VM.</li>
	<li>If problems still persist, try uninstalling VirtualBox 4.3.18 in favor of an older version 4.3.12 or 4.3.14 (start with 4.3.12) available at the <a href="https://www.virtualbox.org/wiki/Download_Old_Builds_4_3">Older Build Site</a>. Once you've uninstalled 4.3.18 and reinstalled 4.3.12 or 14, then re-import the VM image (course-vm-2014.ova)</li>
	<li>If you can't connect to the Internet from your VM, simply try rebooting the VM (not your whole PC). When the wireless connection changes the VM seems to be unable to pick up the new connection w/o a reboot.</li>
</ol>
</li>
</ul>

## Other Options

The virtual machine image is installed on all the Windows PC's in the engineering computing center (SAL).
Thus, if you absolutely can't get the VM working on your laptop, you can use one of these computers. Follow the directions below:

1. Boot to Windows (not Mac)
1. Find the VirtualBox icon on the desktop and start the application (not Mac)
1. Many of these machines already have the student-vm imported and ready to run so that you can just start the VM and use it
1.  If the student-vm is not already imported you may do so by clicking File..Import Appliance. Then click the browse folder icon to go find the .ova file. Browse to
`Computer..C:\CS VM\` and pick the latest .ova file
1. Then click import.
1. Once the appliance is imported you can start it and use it
1. Checkout your git repository.
1. **Your files will not be saved from one session to the next, so please commit and push your repository files**
