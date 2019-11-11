#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { CdkStack } from './cdk-stack';

const app = new cdk.App();
new CdkStack(app, 'get-ip');
