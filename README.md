#NHS.UK prototypes

This a place to store experiments on the future NHS.UK.

[Play with the prototypes](http://nhsprototypes.s3-website-eu-west-1.amazonaws.com/)

## Prerequisites

### Clone this repository

Download and navigate into this repository.

`git clone https://github.com/nhsalpha/prototype && cd prototype`

### Install this project's Node dependencies

From inside this repo's directory

`npm install`

This inspects the `package.json` file and installs all the project's Node.js dependencies, for example the `gulp` build tool.


## Develop (Without Docker)

To develop locally and see local changes immediately (ignoring Docker altogether), run:

`gulp`

Then navigate to:

[http://localhost:8888/](http://localhost:8888/)


## Develop (With Docker)

We use a Linux Virtual Machine (VM) which provides a Docker Daemon. The VM is setup by `boot2docker` inside  VirtualBox (similar to Vagrant).

You'll need:

- [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
- docker (you need the client on your host machine to send containers to the VM)


###Install boot2docker utility

[You should have homebrew if you don't already](http://brew.sh)

`brew install boot2docker`

### Create and run the VM using boot2docker

Create the VM in VirtualBox using the boot2docker.iso file.

`boot2docker init`

Start the new VM:

`boot2docker up`

###Point docker at VM's docker daemon

Tell your local docker client to communicate with the docker daemon on the VM, rather than looking for one locally:

`$(boot2docker shellinit)`

This sets the environment variables `DOCKER_HOST`, `DOCKER_CERT` and `DOCKER_TLS_VERIFY`

###Get Docker IP Address
`docker ip`

returns

`The VM's Host only interface IP address is: 192.168.59.103`

###Add URL and IP to hosts file

For convenience, map `proto.nhs.uk` DNS to the IP of the VM.

`sudo bash -c "echo '192.168.59.103 proto.nhs.uk' >> /etc/hosts"`


###Build Container & Push to VM

To build the docker container and upload to the VM's docker daemon, run:

`gulp build`

###Run Container in VM
`docker run -i -t -d --privileged -p 3000:3000 nhsproto`

This will communicate with the Docker daemon running on the VM because of the environment variables set previously.

###View the site
http://proto.nhs.uk:3000/


