# Environment-Related Troubleshooting

## Errors You May Encounter

### Testing-related
We utilize a package called `pa11y-ci` which runs tests found in the `pa11y/` directory.  These run within docker containers, but they also seem to leak memory [see this issue](https://github.com/nodejs/docker-node/issues/1096) from within Node itself.  This has resulted in the need to split our many `pa11y` tests into several more runs, each smaller in size (see `.circleci/config.yml` and the multiple steps within 'e2e-pa11y' job).  If a `pa11y` test repeatedly succeed when running locally but frequently fail within the CI docker container, you may be hitting a memory constraint and should consider further splitting up your `pa11y` test tasks.

### AWS-related

#### ServerlessError
> ```deploy failed with ServerlessError: An error occurred: YourLambdaFunction - The role defined for the function cannot be assumed by Lambda. (Service: AWSLambdaInternal; Status Code: 400; Error Code: InvalidParameterValueException; Request ID: ae81b07e-8a75-4f98-9473-2096a5da63f9).```
If you're standing up a new environment, it is critical that you run the scripts (mentioned above and found in SETUP.md) to create Lambda roles & policies.

#### ROLLBACK_COMPLETE
> ``` ROLLBACK_COMPLETE ```
If you see this error in the AWS Cloudformation Stacks for your `$ENVIRONMENT`, there was an error configuring this stack. This stack will need to be DELETED prior to attempting to deploy again.  We hope to identify the causes of these situations as well as avoid downtime by utilizing blue/green deploy strategies.

#### repository xxxxx.dkr.ecr.us-east-1.amazonaws.com/ef-cms-us-east-1 not found

> ```Error response from daemon: repository xxxxx.dkr.ecr.us-east-1.amazonaws.com/ef-cms-us-east-1 not found```
This issue is due to a deletion of our ECR repository. We aren't sure the cause of the deletion yet, but the fix is to recreate the ECR repository (name it `ef-cms-us-east-1`) and run `./docker-to-ecr.sh` to rebuild the Docker container and send it to the repository.

#### IAM permissions errors

When a deploy fails due to a permissions error with AWS, it’s likely that the IAM permissions within that environment have not been updated. Do so like such, substituting the environment in question for `stg`:

```
cd iam/terraform/account-specific/main && ../bin/deploy-app.sh && cd ../../environment-specific/main && ../bin/deploy-app.sh stg
```

### Serverless 1.61.1

We needed to lock the serverless file down to 1.61.1 because it throws this error when trying to do deploys:

```
Domain Manager: UnknownEndpoint: Inaccessible host: `acm.undefined.amazonaws.com'. This service may not be available in the `us-east-1' region.
Serverless: [AWS apigatewayv2 undefined 0s 0 retries] getDomainName({ DomainName: 'efcms-dev.ustc-case-mgmt.flexion.us' })
Serverless: [AWS acm undefined 0.476s 3 retries] listCertificates({
  CertificateStatuses: [ 'PENDING_VALIDATION', 'ISSUED', 'INACTIVE', [length]: 3 ]
})
```

### serverless-domain-manager

This is pointing to our own fork which includes the functionality required to host web socket endpoints.  The current state of serverless-domain-manager does not support web sockets.


### Jest and babel-jest version 25.x

These libaries are locked to version 24.x because upgrading them causes Sonarcloud to report 0% coverage.


### Issues with terraform deploy - first time

```
Error: Error applying plan:

2 error(s) occurred:

* module.environment.aws_cloudfront_distribution.public_distribution: 1 error(s) occurred:

* aws_cloudfront_distribution.public_distribution: error creating CloudFront Distribution: InvalidViewerCertificate: The specified SSL certificate doesn't exist, isn't in us-east-1 region, isn't valid, or doesn't include a valid certificate chain.
	status code: 400, request id: 88163d5d-bb9b-43db-abd7-57ba923cb103
* module.environment.aws_cloudfront_distribution.distribution: 1 error(s) occurred:

* aws_cloudfront_distribution.distribution: error creating CloudFront Distribution: InvalidViewerCertificate: The specified SSL certificate doesn't exist, isn't in us-east-1 region, isn't valid, or doesn't include a valid certificate chain.
	status code: 400, request id: 8fb7c31a-8e7a-4608-ac7b-10d118deae59
```

If this occurs, rerun the build.

### Lambda Code Storage Size Exceeded

```
  Serverless Error ---------------------------------------
 
  ServerlessError: An error occurred: CasePublicSearchLambdaFunction - Code storage limit exceeded. (Service: AWSLambdaInternal; Status Code: 400; Error Code: CodeStorageExceededException
```

This usually occurs after ClamAV is rebuilt and redeployed. After opening a ticket with AWS previously, CloudFormation retries creation after 60 seconds. Further debugging revealed that creating a layer using 110 MB zip file took around ~37 seconds; however, creating a layer using a 180MB zip file took ~60 seconds. Since our ClamAV layer is ~184MB, this meets the criteria for CloudFormation to continuously create dozens (in most cases, at least 100) of layers.


#### Solution

If this happens, we can utilize our `serverless-prune-plugin` library by navigating to it in `node_modules` and opening its `index.js` file. Here, you'll find (as of 4/6/2020) some [Serverless lifecycle events](https://serverless.com/framework/docs/providers/aws/guide/plugins#lifecycle-events) — specifically, at line `57`:

```javascript
'after:deploy:deploy': this.postDeploy.bind(this)
```

What you can do here is change `after` to `before`:

```javascript
'before:deploy:deploy': this.postDeploy.bind(this)
```

Next, we'll need to build the ClamAV layer by executing the following command:

- `cd web-api/runtimes/clamav && ./build.sh`

After this successfully runs, you can navigate to the project root (via `cd ../..`) and execute the following command to _first_ prune all other ClamAV layers and redeploy it:

- `./web-api/run-serverless-clamav.sh <env> <region>`, where `<env>` would be your environment (dev, stg, prod, etc.) and `<region>` would be your AWS region (us-east-1, us-west-1, etc.)

To revert your `serverless-prune-plugin`, just change `before` back to `after` or run `npm i` again.