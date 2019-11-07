sudo cp /etc/letsencrypt/live/dexternet.southeastasia.cloudapp.azure.com/privkey.pem /home/ubuntu/privkey.pem
sudo chmod 777 /home/ubuntu/privkey.pem
sudo cp /etc/letsencrypt/live/dexternet.southeastasia.cloudapp.azure.com/fullchain.pem /home/ubuntu/fullchain.pem
sudo chmod 777 /home/ubuntu/fullchain.pem
nodemon server-production.js