#!/usr/bin/env bash
set -euo pipefail

# One-time Ubuntu droplet setup for AccioBnB.
# Run as a user with sudo on the server:
#   bash deploy/setup-server.sh

APP_DIR="/var/www/acciobnb"
DEPLOY_USER="${DEPLOY_USER:-$USER}"

echo "==> Installing system packages"
sudo apt-get update
sudo apt-get install -y git curl build-essential libssl-dev libreadline-dev \
  zlib1g-dev libyaml-dev libffi-dev libmysqlclient-dev default-mysql-client \
  nginx

if ! command -v rbenv >/dev/null 2>&1; then
  echo "==> Installing rbenv"
  git clone https://github.com/rbenv/rbenv.git "$HOME/.rbenv"
  git clone https://github.com/rbenv/ruby-build.git "$HOME/.rbenv/plugins/ruby-build"
  echo 'export PATH="$HOME/.rbenv/bin:$HOME/.rbenv/shims:$PATH"' >> "$HOME/.bashrc"
  echo 'eval "$(rbenv init - bash)"' >> "$HOME/.bashrc"
  export PATH="$HOME/.rbenv/bin:$HOME/.rbenv/shims:$PATH"
  eval "$(rbenv init - bash)"
fi

if ! rbenv versions --bare | grep -qx "3.1.1"; then
  echo "==> Installing Ruby 3.1.1"
  rbenv install 3.1.1
fi
rbenv global 3.1.1
gem install bundler -v 2.4.5 --no-document

if ! command -v node >/dev/null 2>&1; then
  echo "==> Installing Node.js 16"
  curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

echo "==> Preparing app directory"
sudo mkdir -p "$APP_DIR"
sudo chown "$DEPLOY_USER:$DEPLOY_USER" "$APP_DIR"

echo "==> Setup complete"
echo "Next steps:"
echo "  1. Clone the repo into $APP_DIR"
echo "  2. Copy deploy/env.production.example to $APP_DIR/.env and fill in values"
echo "  3. Create the MySQL database and user"
echo "  4. Run bash deploy/deploy.sh"
