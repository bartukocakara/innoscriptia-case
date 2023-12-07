# Installation Guide

Before proceeding with the installation, please make sure that Git and Docker are working smoothly on your system.

## Installation Steps

First, clone the project to the desired directory using Git:

```bash
git clone https://github.com/bartukocakara/innoscriptia-case
```
Then navigate to the project directory:

```
cd innoscriptia-case
```

## Docker Setup
Build docker images

```
docker-compose up -d --build
docker-compose up
docker ps
docker exec -it backend  /bin/bash
php artisan setup:all
```

## User Login Credentials
User login: 
  - email: kocakarabartu@gmail.com, 
  - password: password

## Postgres Management Login Credentials
User user login: 
 - email: laravel@gmail.com, 
 - password: password

## Scheduled Tasks
To monitor scheduled tasks, use the following command:

``php artisan schedule:work``

To monitor queued jobs, use the following command:

``php artisan queue:work``
