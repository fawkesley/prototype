#Getting Started...

##Install docker on OSX

[You should have homebrew if you don't already](http://brew.sh)

`brew install boot2docker`

`boot2docker init`

##Get Docker IP Address
`docker ip`

returns

`The VM's Host only interface IP address is: 192.168.59.103`

##Add URL and IP to hosts file
`sudo bash -c "echo '192.168.59.103 proto.nhs.uk' >> /etc/hosts"`

##Development

`gulp`

http://localhost:8888/

##Build
`gulp build`

##Run
`docker run -i -t -d --privileged -p 3000:3000 nhsproto`

##View the site
http://proto.nhs.uk:3000/
