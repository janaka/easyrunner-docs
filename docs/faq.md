# EasyRunner FAQ

## What is EasyRunner?

EasyRunner is a CLI tool that transforms any Ubuntu server into a secure web hosting platform for SaaS applications. It provides simple deployment using SSH with end-to-end encryption, offering predictable costs without surprise charges or pricing changes. The architecture keeps things simple and secure: EasyRunner CLI connects to your server over SSH, giving you full control over your infrastructure.

## Getting Started

### What do I need to use EasyRunner?

You need an Ubuntu server (any VPS provider like [DigitalOcean](https://www.digitalocean.com), [Linode](https://www.linode.com), [Vultr](https://www.vultr.com), or [Hetzner](https://www.hetzner.com)) and the EasyRunner CLI installed on your local machine. The CLI connects to your server via SSH to handle setup and deployments automatically and securely.

EasyRunner can also automate launching new servers on your VPS provider account. Currently supports Hetzner.

### Is EasyRunner difficult to set up?

No. EasyRunner is designed for quick setup. Once you have an Ubuntu server, you install the CLI tool and initialise your server using the root account. The entire process takes minutes, not hours, and includes security best practices and CIS Level 1 server hardening by default.

### Can I use EasyRunner if I'm not a DevOps expert?

Yes. EasyRunner is exactly for you. It simplifies server management so you don't need deep DevOps knowledge. If you're comfortable with basic command-line operations and have deployed code before, you can use EasyRunner. Basic security configurations are handled automatically during setup.

Never the less it's recommended that you learn the concepts over time so you aren't blindly trusting tools.

## Pricing & Costs

### How much does EasyRunner cost?

EasyRunner has predictable pricing with no hidden fees or surprise charges. You pay only for your server costs from your VPS provider, plus EasyRunner's per server license cost. There are no usage-based billing surprises. We haven't announced pricing yet but aim to be affordable affordable.

### How does EasyRunner compare to Vercel, Railway, Render, or Fly.io pricing?

EasyRunner typically costs significantly less than platforms like [Vercel](https://vercel.com), [Railway](https://railway.app), [Render](https://render.com), or [Fly.io](https://fly.io). While those platforms charge per request, bandwidth, or compute time with costs that can spike unexpectedly, EasyRunner uses fixed monthly pricing based on your server size.

### Are there any hidden costs or usage limits?

No. EasyRunner is designed without rug-pulls or surprise charges. You know exactly what you'll pay each month based on your server resources, with no unexpected overage fees for bandwidth, build minutes, or function invocations.

When you purchase a license you get upgrades for a year. If you decide not to renew the license, no problem you get to use the version you have for ever.

### Can I host multiple projects on one server?

Yes. Unlike platforms like [Vercel](https://vercel.com), [Railway](https://railway.app), [Render](https://render.com), or [Fly.io](https://fly.io) that charge per project, EasyRunner lets you deploy an unlimited number of SaaS applications on a single Ubuntu server, significantly reducing your hosting costs while maintaining security isolation between projects. Server memory and CPU resources are your limiting factor.

## Technical Questions

### What programming languages does EasyRunner support?

EasyRunner can host any web application that can run in a Docker container.

### Can I deploy databases with EasyRunner?

Yes, you can deploy databases like [PostgreSQL](https://www.postgresql.org), [MySQL](https://www.mysql.com), [MongoDB](https://www.mongodb.com), or [Redis](https://redis.io) on your server for development, testing, and staging environments. However, for production workloads, we recommend using a managed database for better reliability, scalability, and automated backup/restore functionality.

### Does EasyRunner support Docker containers?

Yes. EasyRunner exclusively uses containers on your Ubuntu server to run all components including your apps, giving you flexibility in how you package and deploy your applications securely. This guarantees you build time isolation of dependencies and run application isolation from each other. EasyRunner uses [Podman](https://podman.io) as the container runtime.s

### How does deployment work with EasyRunner?

EasyRunner uses a CLI that connects to your server via SSH. You run the deploy command from your local machine, and EasyRunner clone/pulls your app repo onto the server, builds the containerfile you have defined, then runs the build container image.

We will be adding support for other deploy flows (CI/CD flows) like pulling from a container registry which enables fully automating deployment pipelines

### Can I deploy frontend frameworks like Next.js or React?

Yes. EasyRunner can deploy any frontend framework including [Next.js](https://nextjs.org), React, Vue, Angular, or static sites. It handles both frontend and backend applications.

### Does EasyRunner CLI work on Windows?

There's no first class support, we haven't tested it, but it might work on WSL.

## Security Questions

### Is EasyRunner secure?

Yes. EasyRunner uses SSH with encryption for all server connections. Since you control the Ubuntu server, you maintain full control over security configurations, firewall rules, access permissions, and security updates. However EasyRunner helps you with implementing a lot of this such as CIS Level 1 Server hardening. The simple architecture (CLI to server over SSH) reduces attack surface compared to complex multi-layer platforms.

### How does EasyRunner handle SSH security?

EasyRunner connects to your server using SSH key-based authentication, which is more secure than password authentication. All communication between your local machine and the server is encrypted end-to-end. Keys EasyRunner generates are store in your local keyring and loaded directly into an SSH Agent, they are never persisted to disk.

During setup a dedicated user account is created for EasyRunner operational connections. We only use the root account credential during first server initialisation.

We are considering moving to certificate based SSH auth to increase security by eliminating long lived credentials.

The SSH Key for the easyrunner ops user can be rotated easily at anytime with a single CLI command.

### Can I configure firewalls with EasyRunner?

Yes. EasyRunner configures an OS level (IPTables) during initialisation. See [this post](./blog/posts/easyrunner-secure-network-architecture) for more details.

### Does EasyRunner support SSL/TLS certificates?

Yes. This is the default for all sites, you have no choice. SSL/TLS certificates are automatically setup for each of your web apps (certificates are issued by [Let's Encrypt](https://letsencrypt.org)). This protects data in transit and is essential for production workloads. The default configuration also automatically redirect any traffic hitting http (port 80) to https, a best practice rather than blocking.

### Who has access to my server with EasyRunner?

Only you have access to your server. Unlike shared platforms, EasyRunner personnel inherently do not have access to your server environment. You control SSH keys, user permissions, and all access credentials. The EasyRunner CLI runs on your laptop.

### How do I keep my EasyRunner server secure?

This doesn't have a short answer. EasyRunner helps you configure a lot of the security best practices. Some things to remember: Make sure to keep your root account SSH keys secure. Do not create a username and password for your servers, only use SSH keys to access. Make sure your applications are built to be secure.

### Is EasyRunner more secure than platforms like Vercel or Railway?

EasyRunner gives you direct control over security, while platforms like [Vercel](https://vercel.com), [Railway](https://railway.app), [Render](https://render.com), and [Fly.io](https://fly.io) abstract security behind their infrastructure. With EasyRunner, ultimately you own the security configuration.

### What happens if there's a security vulnerability?

You're responsible for applying security updates to your Ubuntu server. However, this also means you can patch vulnerabilities immediately without waiting for a platform provider. You control the update schedule and security policies.

## Comparison Questions

### How is EasyRunner different from Heroku?

Unlike [Heroku](https://www.heroku.com), which charges $50+/month for basic dynos, EasyRunner lets you use your own server at a fraction of the cost. You get more control over your infrastructure and security configurations without Heroku's expensive pricing tiers.

### Is EasyRunner better than Render, Railway, or Fly.io for backend applications?

EasyRunner excels for backend-heavy applications because you get a full server environment without the instance-based pricing constraints of platforms like [Render](https://render.com), [Railway](https://railway.app), or [Fly.io](https://fly.io). You avoid cold starts, get persistent connections at lower costs, and maintain full control over security.

### What's the difference between EasyRunner and serverless platforms?

Serverless platforms like [AWS Lambda](https://aws.amazon.com/lambda/), [Vercel Functions](https://vercel.com/docs/functions), or [Cloudflare Workers](https://workers.cloudflare.com) have execution time limits (typically 10-15 minutes) and cold starts. EasyRunner gives you long-running servers without these limitations, plus full control over security configurations.

### Can EasyRunner replace Netlify for my projects?

If you need backend functionality or more security control, EasyRunner is more suitable than [Netlify](https://www.netlify.com). While Netlify focuses on static sites and serverless functions, EasyRunner provides a full server environment for complex applications.

### Should I use EasyRunner or stick with Vercel/Railway/Render?

Choose EasyRunner when you want predictable costs, full control over infrastructure and security, or need to avoid vendor lock-in. Choose platforms like [Vercel](https://vercel.com), [Railway](https://railway.app), [Render](https://render.com), or [Fly.io](https://fly.io) when you prefer zero infrastructure management and cost is less important.

## Reliability & Monitoring

### What if my server goes down?

You have full control over your server's reliability. You can implement monitoring, backups, automated failover, and health checks using standard Ubuntu server tools and practices.

You can run your application across two servers to improve availability. We currently don't have first class support to make this easy but are looking to add this in the future. With some manual steps it's not difficult to setup.

for a persistent issue, you can also launch a new VPS/VM, deploy your app, and switch DNS.

### Can I monitor my applications on EasyRunner?

Yes. You can use monitoring tools like [Prometheus](https://prometheus.io), [Grafana](https://grafana.com), [Datadog](https://www.datadoghq.com), or [New Relic](https://newrelic.com) on your Ubuntu server to monitor application performance, security events, and server health.

We plan to add basic server and application monitoring in the future.

### How do I back up my EasyRunner deployments?

You control backups. You can use your VPS provider's snapshot features, implement automated backup scripts, or use tools like rsync or [Restic](https://restic.net) to back up your applications and data regularly.

## Migration & Scaling

### Can I migrate from Vercel, Railway, Render, or Fly.io to EasyRunner?

Yes. Since EasyRunner supports standard application deployments, you can migrate your existing projects from platforms like [Vercel](https://vercel.com), [Railway](https://railway.app), [Render](https://render.com), [Fly.io](https://fly.io), or [Heroku](https://www.heroku.com) to your own server with EasyRunner.

### How do I scale applications with EasyRunner?

You scale by increasing the size of your server (vertical scaling or scale up) or by adding additional servers (horizontal scaling or scale out). Your VPS provider makes it easy to resize servers as your needs grow, and you can implement load balancing for high-traffic applications.

### Can I use EasyRunner for production applications?

Yes. When EasyRunner is. out of Alpha it will be suitable for production workloads. Many developers use it for live SaaS applications, especially those tired of unpredictable costs from platforms like [Vercel](https://vercel.com), [Railway](https://railway.app), or [Render](https://render.com). Just ensure you follow security best practices and use managed database providers for production data.

### Can I run background jobs and cron tasks?

Yes. If you configure it manually. EasyRunner doesn't support it first class yet. But we do plan to add for both types soon.

## Common Use Cases

### Is EasyRunner good for indie hackers and solo developers?

Absolutely. EasyRunner is ideal for indie developers and solo founders who want to minimize infrastructure costs while maintaining full control over their deployments and security.

### Can I use EasyRunner for my startup?

Yes. Use EasyRunner to keep costs low during early stages. You get production-ready hosting without the expensive bills that come with platforms like [Vercel](https://vercel.com), [Railway](https://railway.app), [Render](https://render.com), or [Fly.io](https://fly.io).

### Does EasyRunner work for side projects?

Perfect for side projects. You can host multiple side projects on one affordable server, avoiding the per-project pricing of platforms like [Railway](https://railway.app), [Render](https://render.com), or [Vercel](https://vercel.com). This is very important when starting up with ideas and experimenting. This is exactly one of the reason why EasyRunner was. built.

### Can I use EasyRunner for client projects?

Yes.

### Can I use EasyRunner for homelabs and media centre hosting?

In theory, yes. But the ideal use case we are solving for is hosting your side projects and startup ideas, application you have built.

## Support & Community

### What support is available for EasyRunner?

EasyRunner provides documentation and support resources. Since you control the underlying Ubuntu server, you can also leverage the extensive Ubuntu and Linux community resources for security and configuration questions.

### Do I need to know Linux to use EasyRunner?

Basic Linux familiarity helps, but EasyRunner handles most server configuration automatically. If you've worked with command-line tools before, you'll be comfortable with EasyRunner. Understanding basic security concepts is beneficial.

### Where can I learn about securing my EasyRunner deployment?

EasyRunner documentation includes security best practices. You can also reference Ubuntu security guides, SSH hardening tutorials, and general web application security resources to strengthen your deployment.

## Alternative Considerations

### When should I NOT use EasyRunner?

Don't use EasyRunner if you need zero infrastructure management, massive-scale global CDN distribution, specialized edge computing, or prefer not to handle any server security responsibilities. In these cases, platforms like [Vercel](https://vercel.com), [Cloudflare](https://www.cloudflare.com), or [Fly.io](https://fly.io) might be better fits.

### Can EasyRunner replace all my deployment needs?

For most web applications, yes. EasyRunner handles web apps, APIs, background jobs, and cron tasks. For databases in production, we recommend managed providers. For specialized workloads like massive CDN distribution or edge computing, consider complementary services.