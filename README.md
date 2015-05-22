#Getting Started...

##Get Docker IP Address
`docker ip`

returns 

The VM's Host only interface IP address is: 192.168.59.103

##Add url and ip to hosts file
`sudo bash -c "echo '192.168.59.103 proto.nhs.uk' >> /etc/hosts"`

##Build The Docker Image
`docker build -t nhsproto .`

##Run an instance of the docker imade
`docker run -i -t -d --privileged -p 3000:3000 nhsproto`

##View the site
http://proto.nhs.uk:3000/

