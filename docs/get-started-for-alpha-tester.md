# Getting Started with EasyRunner (Alpha)

Welcome to EasyRunner! This guide will help you deploy your first web application to your own server.

## What You'll Need

- A Mac computer  
- A Ubuntu server (else we'll help you set one up on Hetzner)  
- A Github repo with your web app code.

## Overview

EasyRunner makes it simple to host web applications on your own server. Here's what we'll do:

1. **Install EasyRunner** on your computer  
2. **Set up a server** in the cloud (or use one you already have)  
3. **Deploy your application** to the server

Let's get started\!

---

## Step 1: Install EasyRunner

Open your terminal and run these commands:

`brew tap janaka/easyrunner`

`brew install easyrunner-cli-beta`

Verify the installation:

`er --version`

or

`easy --version`

Add license:

`er license install path_to_licence_file.jwt`

You should see something like `EasyRunner CLI version 0.0.7b0`.

`er --help` or `er license --help` or `er server --help`

Add `--help` to the end of any command to discover available options and explanations.

**What's happening?** We're installing the EasyRunner command-line tool on your computer. This tool helps you configure Ubuntu servers as secure web hosts and deploy applications. You execute the tool using `er` or `easy` ( the former is easier to type).

## Step 2: Set Up a Server

You have two options: create a new Ubuntu server or use any existing Ubuntu server.

### Option A: Create a New Server on Hetzner Cloud

If you don't have a server yet, EasyRunner can create one for you on Hetzner Cloud (a reliable and affordable hosting provider).

**Prerequisites:**

- A Hetzner Cloud account ([sign up here](https://www.hetzner.com/cloud))
- A Hetzner API token ([create one here](https://console.hetzner.cloud/))
  - Create a project your Hetzner console.
  - Create an API key. Name is EasyRunner
- Link EasyRunner to your Hetzner project (securely stores the api key in your macOS keychain)
  - `er link hetzner my-hetzner-project-name --api-key <api key from the above step>`

**Create the server:**

```bash
er server create my-first-server hetzner
```

Replace `my-first-server` with any name you like (e.g., `blog-server`, `app-host`).

> **What's happening?**

- Creates a new server with a firewall in the hetzner project you linked.
- Setup root user SSH access and config the keys on your laptop
- Registers it with EasyRunner.
- Return the server's IP address

### Option B: Use an Existing Server

If you already have a Linux server (like an Azure VM, DigitalOcean droplet, or Hetzner server), you can use it.

**Requirements:**

- Ubuntu 24.04 or newer
- Root user SSH access
- Public IP address

**Add your server to EasyRunner:**

```bash
er server add my-server YOUR_SERVER_IP
```

Replace `YOUR_SERVER_IP` with your server's actual IP address (e.g., `192.0.2.1`).

> **What's happening?** EasyRunner creates a secure SSH key and saves your server information for future use.

---

## Step 3: Initialize Your Server

Now we'll install the web hosting software on your server and configure it:

```bash
er server init my-server --username root
```

Replace `my-server` with the name you used in Step 2, and change `--username` if needed:

- Use `root` for Hetzner servers or servers where you have root access
- Use your actual root username for other cloud providers (e.g., `azureuser` for Azure)

This process takes 5-10 minutes. EasyRunner will:

- Install essential software (Podman for containers, Caddy for HTTPS)
- Configure the firewall
- Prepare the server for deployments

> **What's happening?** We're turning your server into a secure web hosting platform. Think of it like installing a management system for your applications.

---

## Step 4: Add Your Application

Tell EasyRunner about your application:

```bash
er app add my-app my-server git@github.com:yourusername/your-repo.git --custom-domain your-domain.com
```

Replace:

- `my-app` with a name for your application
- `my-server` with your server name
- The GitHub URL with your actual repository URL (use the SSH format: `git@github.com:...`)
- `your-domain.com` replace with the domain you want your app accessible on like `app.easyrunner.xyz`

> **What's happening?** EasyRunner is saving information about your application and which server it should run on.

---

## Step 5: Configure You Application Repo for Deployment on Your EasyRunner Server

There are two things you need to drop into your repo:

- A docker compose file into `.easyrunner/docker-compose-app.yaml`. EasyRunner users this to configure app hosting.
- A `Dockerfile` or `Containerfile` for your application. EasyRunner uses this to build container image for your app and deploy it.
- Make sure you commit and push/merge to main.

These repos have examples you can copy and use as a starting point:

<https://github.com/janaka/django-helloworld-app>
<https://github.com/janaka/ts-helloworld-api>
<https://github.com/janaka/next-helloworld-app>

ROADMAP: considering adding a command you can run to add the template files in.

---

## Step 6: Config Your Domain Name

Add an A record pointing to the IP address of your EasyRunner web server.

You can view the server IP address by running:

```bash
er server list
```

ROADMAP: CloudFlare integration is coming which will automate domain name record setup.

---

## Step 7: Deploy Your Application

Now for the exciting part — deploy your application!

```bash
er app deploy my-app my-server
```

EasyRunner will:

1. Download your code to the server
2. Read your `docker-compose.yaml` file
3. Set up your application's containers
4. Configure automatic HTTPS for the custom domain you setup
5. Start your application

**Your application is now live!** 🎉

Browse to <https://your-domain.com>

---

## Getting Help

### Built-in Help

Every command has built-in help:

```bash
er --help
er server --help
er app --help
```

### Troubleshooting

**Can't connect to your server?**

- Check that your server's firewall allows SSH (port 22), HTTP (port 80), and HTTPS (port 443)
- Verify the IP address is correct: `er server list`

**Application won't start?**

- Check your `docker-compose.yaml` file is valid
- View logs: `er app logs my-app my-server`

**HTTPS not working?**

- Ensure your domain's DNS points to your server's IP
- Wait 5-10 minutes for DNS propagation
- Check that ports 80 and 443 are open in your firewall

---

## What's Next?

Now that you have your first application running:

- **Deploy more applications** to the same server
- **Set up a staging server** for testing
- **Explore advanced features** in the documentation

## We Want Your Feedback

As a alpha tester, your feedback is invaluable. Please let us know:

- What worked well
- What was confusing
- What features you'd like to see
- Any bugs or issues you encountered

Thank you for being part of the EasyRunner alpa! 🚀
