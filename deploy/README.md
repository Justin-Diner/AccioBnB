# AccioBnB Production Deployment

Live site: [https://acciobnb.com](https://acciobnb.com)

App path on the droplet: `/var/www/AccioBnB`

## Stack

| Component | Service |
|-----------|---------|
| App server | Puma (systemd `acciobnb` service, port 5000) |
| Reverse proxy | nginx + Let's Encrypt (certbot) |
| Database | DigitalOcean Managed MySQL |
| File uploads | DigitalOcean Spaces (`DO_SPACES_PREFIX=acciobnb/`) |
| Frontend | React build output in `public/` (served by Rails) |
| Maps | Google Maps JavaScript API (`REACT_APP_MAPS_API_KEY`) |

## First-time setup

See the example files in this folder:

- `env.production.example` → copy to `/var/www/AccioBnB/.env`
- `nginx.conf.example` → copy to `/etc/nginx/sites-available/acciobnb`
- `acciobnb.service.example` → copy to `/etc/systemd/system/acciobnb.service`
- `setup-server.sh` / `deploy.sh` → server bootstrap and deploy scripts

After HTTPS is enabled with certbot, set in `.env`:

```env
SESSION_COOKIE_SECURE=true
```

## Deploying updates

From the droplet:

```bash
cd /var/www/AccioBnB
git pull
cd frontend && npm run build   # required if frontend changed
cd ..
sudo systemctl restart acciobnb
```

Or use the deploy script (builds frontend, runs migrations, restarts the service):

```bash
cd /var/www/AccioBnB
bash deploy/deploy.sh
```

### Notes

- **Frontend env vars** (e.g. Google Maps key) are baked in at build time. If you change `REACT_APP_MAPS_API_KEY`, rebuild the frontend.
- **Backend env vars** in `.env` are loaded by systemd (`EnvironmentFile`). After changing them, restart Puma — no frontend rebuild needed.
- **Database migrations** run automatically via `deploy.sh`, or manually:

  ```bash
  set -a && source .env && set +a
  RAILS_ENV=production bundle exec rails db:migrate
  ```

## Google Maps API key

1. Create or find the key in [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Enable **Maps JavaScript API**.
3. Restrict the key to HTTP referrers:
   ```
   https://acciobnb.com/*
   https://www.acciobnb.com/*
   ```
4. Add the key to `frontend/.env` on the server:
   ```env
   REACT_APP_MAPS_API_KEY=your_key_here
   ```
5. Rebuild the frontend (see above).

Referrer changes in Google Cloud take effect without a rebuild. Changing the key itself requires a rebuild.

## Useful commands

```bash
# App status and logs
sudo systemctl status acciobnb
sudo journalctl -u acciobnb -f

# nginx
sudo nginx -t
sudo systemctl reload nginx

# Renew SSL (certbot sets this up automatically)
sudo certbot renew --dry-run
```

## Demo login (seed data)

- `boywholived@accio.com` / `dumbledore`
- `squib@accio.com` / `dumbledore`
