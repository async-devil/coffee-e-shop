# Coffee e-shop &middot; [![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0) [![wakatime](https://wakatime.com/badge/user/bc8fa60c-fa34-4507-b70f-24bdba32a74d/project/c71d4f0b-156e-4908-ba0c-20a1b626f1a8.svg)](https://wakatime.com/badge/user/bc8fa60c-fa34-4507-b70f-24bdba32a74d/project/c71d4f0b-156e-4908-ba0c-20a1b626f1a8)

# Instructions

**Attention:** your `docker compose` command might be as `docker-compose`. If so, edit commands for your needs in `package.json`

## Development

Before running, be sure to have `.dev.env` file in project root folder. Example env is `.env.example`

```bash
sudo yarn build:dev
sudo yarn start:dev
```

## Production

### Local

Before running, be sure to have `.prod.env` file in project root folder. Example env is `.env.example`

```bash
sudo yarn build:prod
sudo yarn start:prod
```

### AWS

This command creates an AWS stack which contains S3 bucket, EC2 instance and a bunch of policy stuff.

```bash
aws cloudformation create-stack \
      --template-body file://cloudformation-template.yaml \
      --capabilities CAPABILITY_IAM \
      --stack-name coffee-e-shop
```

#### Configuration and executing

EC2 goes with pre-downloaded docker/docker compose and this repo in home directory. It already has a `.prod.env` which is a copy of `.env.example`. **DO NOT FORGET TO CHANGE CREDENTIALS THERE!** You can do it, for example, using `nano` command.

EC2 has access to S3 bucket without need to have any AWS credentials in `.prod.env`.

Before using ssh to access EC2 create and download key pair, you can do it in **AWS Console -> EC2 -> Network & Security -> Key Pairs**. The name of the key must be **STRICTLY** `aws-key-coffee-e-shop`. This key name is hard coded into the cloudformation template.

To run docker image on EC2, connect to instance via ssh: `ssh -i aws-key-coffee-e-shop.pem ec2-user@x.x.x.x` or using AWS instance connect feature. Then execute the following commands *(which are stored in package.json)*:

```bash
sudo docker compose -f docker-compose.prod.yml --env-file ./.prod.env build
sudo docker compose -f docker-compose.prod.yml --env-file ./.prod.env up
```

#### Deletion

**Notice:** S3 bucket won't be deleted if it contains something.

```bash
aws cloudformation delete-stack --stack-name coffee-e-shop
```
