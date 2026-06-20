#!/usr/bin/env bash
set -euo pipefail

# Run from /var/www/acciobnb on the droplet after .env is configured:
#   bash deploy/deploy.sh

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$APP_DIR"

if [[ ! -f .env ]]; then
  echo "Missing .env file. Copy deploy/env.production.example to .env first."
  exit 1
fi

set -a
source .env
set +a

export PATH="$HOME/.rbenv/bin:$HOME/.rbenv/shims:$PATH"
eval "$(rbenv init - bash)"

echo "==> Installing Ruby gems"
bundle config set deployment 'true'
bundle config set without 'development test'
bundle install

echo "==> Building frontend"
if [[ -n "${REACT_APP_MAPS_API_KEY:-}" ]]; then
  export REACT_APP_MAPS_API_KEY
fi
npm run build

echo "==> Preparing database"
bundle exec rails db:create 2>/dev/null || true
bundle exec rails db:migrate

if [[ "${SEED_DATABASE:-false}" == "true" ]]; then
  echo "==> Seeding database"
  bundle exec rails db:seed
fi

echo "==> Restarting app"
if command -v systemctl >/dev/null 2>&1 && systemctl is-enabled acciobnb >/dev/null 2>&1; then
  sudo systemctl restart acciobnb
else
  echo "Systemd service not installed yet. Start manually with:"
  echo "  bundle exec puma -C config/puma.rb"
fi

echo "==> Deploy complete"
