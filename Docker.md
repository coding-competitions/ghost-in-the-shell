# Docker

Docker is a tool for building and delivering software in packages called containers. This challenge
will require participants to build Docker images as part of their submission. If you're not
familiar with Docker, this will provide a basic overview as well guide you through the process of
building your first container.

## Getting Docker

To get started, you'll want to download and install Docker Desktop. The recommended way of getting
Docker is through [Docker Hub][1] and creating an account. However, if you'd like to skip that
step, you can download the installer directly for [Windows][1] or [Mac][3].

## Downloading Images

Most public Docker images are hosted on [Docker Hub][4] and can easily be downloaded to run on 
your machine with the [`docker pull`][5] command, e.g.

    docker pull node

Will download the latest stable version of the image [`node`][6] (the official Node.js image) to
your machine.

## Querying images

You may many images on your machine at any moment, probably very many if you're actively building
images (see below). You manage images in your Docker image cache using the `docker image` command,
e.g.

    docker image ls

Will show all containers in your image cache. To cleanup any unused images, simply run

    docker image prune

## Creating Containers

To execute the software contained within an image you must create a container for it. This can be
done with the [`docker create`][7] command, e.g.

    docker create --name my-mongo mongo

Will create a new container for executing MongoDB and assigns the locally unique name `my-mongo`,
but crucially, this command will *not* start the container. 

## Running Containers

To start a previously created container like the one we created above, use the [`docker start`][8]
command, e.g.

    docker start --name my-mongo

Will start the container named `my-mongo` in a background process. The container will stop by
itself once its main process exits.

Note that the `create` and `start` steps may usually be combined into a single call using the
[`docker run`][9] command, e.g.

    docker run --name my-mongo mongo

Will create a new container from the image [`mongo`][10], assign it the name `my-mongo`, start that
container, and will show all the logs of that container in the current console (unlike
`docker start`, the `docker run` command will 'attach' to the created container, use
`--detach`/`-d` to detach).

The above commands are useful for service-type images, but for many images, you'll want to use
something like this:

    docker run --rm -it node node

This will create a new container from the image `node`, assign it a random name (since we didn't
specify one), attach to the container to current console, it will pass the command `node` to that
container to be executed (in this case, it will launch the Node.Js REPL), and finally, it cause the
container to be deleted once it's main process exits.

## Querying Containers

To get a list of containers, use the [`docker ps`][11] command, e.g.

    docker ps

Will show a list of all currently running containers. To include stopped containers as well, use

    docker ps -a

## Stopping and Removing Containers

To stop a running container, simply use the `docker stop` command, e.g.

    docker stop my-mongo

Will attempt to gracefully stop the running container, `my-mongo`. Unless created with the `--rm`
option, the container will remain on your machine to be restarted later.

To remove a stopped container, use the `docker rm` command, e.g.

    docker rm my-mongo

Will attempt to remove the stopped container, `my-mongo`. You can also remove all stopped
containers using

    docker container prune

## Persisting Data with Volumes

*TBD*

## Publishing Container Ports

Networking in Docker must be done explicitly. If you've been following along up until now, you
won't have been able to connect to any of the MongoDB containers we've created so because we
haven't enabled any network configuration.

To expose a containerized application to the outside world (i.e. to other applications on your
machine or to other machines) you'll need to publish a port, for example:

    docker run --name my-mongo --publish 11220:27017 mongo

Will create a container from the image `mongo`, name it `my-mongo` and publish the container's
port `27017` (MongoDB's default port) to the host machine's port `11220`, which will allow other
non-Docker applications on the same machine to connect to the MongoDB database using
`localhost:11220`, e.g. using the MongoDB shell,

    mongo localhost:11220

## Networking Containers

However, you frequently need other docker containers to be able to connect to each other. This is
done by first exposing ports (usually specified in the `Dockerfile` but this may also be done when
you create the container through `docker create --expose` or `docker run --expose`). Then you'll
need to create a virtual network to connect these containers using the [`docker network`][14]
command, e.g.

    docker network create mongo-network

Will create a new Docker network named `mongo-network` for connecting networks together. You'll
then connect the existing container to the network, e.g.

    docker network connect --alias mongo mongo-network my-mongo

Will connect the container `my-mongo` to the container `mongo-network` using the alias `mongo`
(this is the name that other containers in this network will be able to see this network as). You
can also connect new containers at the time of creation via `docker create` and `docker run`, e.g.

    docker run \
        --detach \
        --name my-mongo-express \
        --network mongo-network \
        --network-alias mongo-express \
        --env ME_CONFIG_MONGODB_SERVER=mongo \
        --publish 8081:8081 \
        mongo-express

Will create a new container from the image [`mongo-express`][15], assign it the name
`my-mongo-express`, attach it to the network `mongo-network`, assign it an network alias of
`mongo-express`, set an environment variable `ME_CONFIG_MONGODB_SERVER` with a value of `mongo`
(this is the network alias of the mongo server we connected earlier), and publish the container
port `8081` using the host port `8081`, and it will start that container detached from the
current console. You can now view your `mongo-express` dashboard by navigating to
http://localhost:8081/ in your browser.

You can also remove all unused networks by using

    docker network prune

## Orchestration with Docker Compose

You might be thinking this was a lot work just to get a couple containers running on your machine,
and you're right. Fortunately, Docker provides a convenient utility named [Docker Compose][16] that
simplifies a lot of this by allowing you to declaratively define container and network
configuration in one place. For example, the following `docker-compose.yml` file is roughly
equivalent to what we did in the previous section to setup a MongoDB server and Mongo Express
dashboard:

    version: "3.7"
    services:
        mongo:
            image: mongo
            ports:
                - "11220:27017"
        mongo-express:
            image: mongo-express
            ports:
                - "8081:8081"
            environment:
                - ME_CONFIG_MONGODB_SERVER=mongo

Save this file in a particular folder and then in this same folder simply execute

    docker-compose up

To quickly spin up all these services at once as well as review any logs from the services.
These services will typically continue to stick around even after you detach the console, so you 
can use

    docker-compose down

To quickly tear down the containers and networks created by the `up` command. If you've modified
the `docker-compose.yml` file in the mean time, there might be orphaned objects that won't be
deleted by `down`. You can usually clean this up very easily destroy *all* unused objects using

    docker system prune

## Building Containers

*TBD*

 [1]: https://hub.docker.com/?overlay=onboarding
 [2]: https://download.docker.com/win/stable/Docker%20for%20Windows%20Installer.exe
 [3]: https://download.docker.com/mac/stable/Docker.dmg
 [4]: https://hub.docker.com/
 [5]: https://docs.docker.com/engine/reference/commandline/pull/
 [6]: https://hub.docker.com/_/node
 [7]: https://docs.docker.com/engine/reference/commandline/create/
 [8]: https://docs.docker.com/engine/reference/commandline/start/
 [9]: https://docs.docker.com/engine/reference/commandline/run/
 [10]: https://hub.docker.com/_/mongo
 [11]: https://docs.docker.com/engine/reference/commandline/ps/
 [12]: https://docs.docker.com/engine/reference/commandline/stop/
 [13]: https://docs.docker.com/engine/reference/commandline/rm/
 [14]: https://docs.docker.com/engine/reference/commandline/network/
 [15]: https://hub.docker.com/_/mongo-express
 [16]: https://docs.docker.com/compose/