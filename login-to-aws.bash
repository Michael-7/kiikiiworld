#!/bin/bash

echo "--- Logging into AWS ---"
source ~/.venv/aws/bin/activate
aws-adfs login --profile mmh-sandbox --adfs-host login.uva.nl --region eu-central-1
deactivate
# Insert password
echo "--- Successfully logged in ---"
export AWS_PROFILE=mmh-sandbox
echo "--- Profile ---"
aws sts get-caller-identity
echo "--- Done ---"
