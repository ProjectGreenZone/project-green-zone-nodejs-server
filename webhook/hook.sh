cd ..
echo +++++ PWD : `pwd` +++++ 
echo +++++ Running git pull +++++ 
git pull
echo +++++ Removing log files ! +++++
rm '/home/ubuntu/www/logs/gz-server-err.log'
rm '/home/ubuntu/www/logs/gz-server-out.log'
rm '/home/ubuntu/www/logs/gz-server-combined.log'
echo +++++ Running pm2 restart gz-server +++++
pm2 restart gz-server
