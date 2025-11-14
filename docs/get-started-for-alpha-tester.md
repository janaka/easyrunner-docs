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

**What's happening?** We're installing the EasyRunner command-line tool on your computer.

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

## Step 2: Set Up a Server

You have two options:

- Create a new Ubuntu server on Hetzner
- Use any existing Ubuntu server you've created manually.

### Option A: Create a New Server on Hetzner Cloud Using EasyRunner

> **What's happening?** Link EasyRunner to your Hetzner project, then spin up a new server + firewall, and register it in EasyRunner.

**Prerequisites:**

- A Hetzner Cloud account ([sign up here](https://www.hetzner.com/cloud))
- A Hetzner API token ([create one here](https://console.hetzner.cloud/))
  - Create a project your Hetzner console.
  - Create an API key. Name is EasyRunner
- Link EasyRunner to your Hetzner project (securely stores the api key in your macOS keychain)
  - `er link hetzner --api-key <api key from the above step>  my-hetzner-project-name`

**Create the server:**

```bash
er server create my-first-easy-server hetzner
```

Replace `my-first-easy-server` with any name you like (e.g., `blog-server`, `app-host`).
This command can take 10-15mins if you have a poor Internet connection.

```bash
er server list
```

This should show basic details of your new server.

### Option B: Use an Existing Server

If you already have a Ubuntu server (like an Azure VM, DigitalOcean droplet, AWS EC2, GCP Compute Engine, or Hetzner server), you can use it.

**Requirements:**

- Ubuntu 24.04 or newer
- Root user with SSH access
- SSH port 22 open
- Public IP address

**Register your server to EasyRunner:**

```bash
er server add my-first-easy-server YOUR_SERVER_IP
```

Replace `YOUR_SERVER_IP` with your server's actual IP address (e.g., `192.0.2.1`).

> **What's happening?** EasyRunner creates a secure SSH key and saves your server information for future use.

---

## Step 3: Initialize Your Server

> **What's happening?** We're turning your server into a secure web hosting platform. EasyRunner installs and configures web server and container management software. At the end of this step the server will be ready to host your application.

```bash
er server init my-first-easy-server --username root
```

Replace `my-first-easy-server` with the name you used in Step 2, and change `--username` if needed:

- Use `root` for Hetzner servers or servers where you have root access
- Other cloud providers may use a deferent naming convention (e.g., `azureuser` for Azure VMs)

This process takes 5-10 minutes. EasyRunner will:

- Install essential software (Podman for containers, Caddy for HTTPS)
- Configure the OS firewall
- Prepare the server for deployment automation

ROADMAP: CIS Level 1 Server hardening will be added in the future.

---

## Step 4: Add Your Application

> **What's happening?** EasyRunner is saving information about your application and which server it should run on. This enables you to reference the application using it's short name in other commands.

```bash
er app add my-app my-first-easy-server git@github.com:yourusername/your-repo.git --custom-domain your-domain.com
```

Replace:

- `my-app` with a name for your application
- `my-first-easy-server` with your server name
- The GitHub URL with your actual repository URL (use the SSH format: `git@github.com:...`)
- `your-domain.com` replace with the domain you want your app accessible on like `app.easyrunner.xyz`

---

## Step 5: Configure You Application Repo for Deployment to Your EasyRunner Server

> **What's happening?** EasyRunner uses Docker container technology to build and run your application. The configuration for this process is managed in each applications code repo as it's application specific. This approach is called GitOps.

There are two things you need to drop into your repo:

- A `Dockerfile` or `Containerfile` for your application. EasyRunner uses this to build a container image for your app.
- A docker compose file into `.easyrunner/docker-compose-app.yaml`. EasyRunner uses this configuration to run your application container image.

- Make sure you commit and push/merge to main.

These repos have examples of these files you can copy and use as a starting point:

- Python Django: <https://github.com/janaka/django-helloworld-app>
- Node TypeScript: <https://github.com/janaka/ts-helloworld-api>
- NextJS: <https://github.com/janaka/next-helloworld-app>

ROADMAP: considering adding a command you can run to add the template files into your repo

---

## Step 6: Configure Your Domain Name

> **What's happening?** You'll be configuring a DNS record like www.my-easy-app.com for you application that you will be deploying to the server.

Add an A record pointing to the IP address of your EasyRunner web server.

You can view the server IP address by running:

```bash
er server list
```

ROADMAP: CloudFlare integration is coming which will automate domain name record setup.

---

## Step 7: Deploy Your Application

Now for the exciting part — deploy your application!

> **What's happening?** EasyRunner will:
>
>1. Download your code to the server
>2. Build the container image using the dockerfile in the repo
>3. Read your `docker-compose.yaml` file
>4. Configure your app container image
>5. Configure automatic HTTPS for the custom domain you setup
>6. Start your application

```bash
er app deploy my-app my-server
```

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

### Still Stuck

Email me at <janaka@easyrunner.xyz>

---

## What's Next?

Now that you have your first application running:

- **Deploy more applications** to the same server
- **Set up a staging server** for testing
- **Explore advanced features** in the documentation

## We Want Your Feedback

As a alpha tester, your feedback is invaluable. Please email <janaka@easyrunner.xyz> to let me know:

- What worked well
- What was confusing
- What features you'd like to see
- Any bugs or issues you encountered

Thank you for being part of the EasyRunner alpha! 🚀
