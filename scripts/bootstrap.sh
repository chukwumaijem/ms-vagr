# Update Packages
apt-get update

# Upgrade Packages
apt-get upgrade -y

# Install Docker

## Remove old Docker
apt-get remove -y docker docker-engine docker.io containerd runc

## Install new Docker
apt-get update
apt-get install -y ca-certificates curl gnupg lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg \
  --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io

## Docker Homekeeping
docker pull selenoid/vnc_chrome:98.0

# install docker-compose
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

chmod +x /usr/local/bin/docker-compose
sudo chmod 666 /var/run/docker.sock

# install Nodejs
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
apt-get install -y nodejs
apt-get install -y npm
npm install -g npm@latest

# Install Nginx
apt-get update
apt-get install nginx -y

# Install passwords tools
sudo apt-get install -y apache2-utils
## Create credentials
sudo htpasswd -c /etc/apache2/.htpasswd chuk


## Set up nginx conf
sudo mv /etc/nginx/sites-available/default /home/vagrant/app/nginx/default.old
sudo cp /home/vagrant/app/nginx/conf/localhost /etc/nginx/sites-available/localhost
sudo rm /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/localhost /etc/nginx/sites-enabled/
sudo systemctl reload nginx
