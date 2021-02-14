#!/usr/bin/env node
const cdk = require('@aws-cdk/core');
const { CdkAppExampleStack } = require('../lib/cdk-app-example-stack');

const app = new cdk.App();
new CdkAppExampleStack(app, 'CdkAppExampleStack');
