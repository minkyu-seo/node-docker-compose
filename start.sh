#!/bin/bash

# Node Test Docker Start Sheel Script
echo "Node Service Start"

INSTANCE=typescript-test
TAG=ts-example-01
ENv=test
EXTERNAL_PORT=30000
INTERNSL_PORT=30000

docker rm $INSTANCE
docker build --tag $TAG:$ENv .
docker run -d --name $INSTANCE -p $EXTERNAL_PORT:$INTERNSL_PORT $TAG:$ENv
