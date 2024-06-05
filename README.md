
---
#### Deploy (Note to Self)
```bash
!# Install Wrangler: https://developers.cloudflare.com/workers/wrangler/install-and-update/
npm install "wrangler@latest" -g

!# Clone Source
git clone --filter="blob:none" "https://github.com/Azathothas/ip.ajam.dev"
cd "./ip.ajam.dev"
code "./ip.ajam.dev"

!# Deploy
npm install ; wrangler login
wrangler deploy
```