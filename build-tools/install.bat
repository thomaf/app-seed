echo "Installation de Chocolatey"
@powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin

echo "Installation de node js"
choco install nodejs 

echo "Installation des modules node_js"
npm install

echo "Installation des librairies bower"
./node_modules/bower/bin/bower install