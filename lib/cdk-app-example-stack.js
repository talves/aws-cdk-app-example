const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const apiGateway = require("@aws-cdk/aws-apigateway");
const s3 = require("@aws-cdk/aws-s3");
const s3Notifications = require("@aws-cdk/aws-s3-notifications");
const s3Deployment = require("@aws-cdk/aws-s3-deployment");
const { Backend } = require("./backend");
const { SPADeploy } = require("cdk-spa-deploy");

class CdkAppExampleStack extends cdk.Stack {
  /**
   * @param {cdk.App} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // Call a custom Construct for our app
    const appBackend = new Backend(this, "AppBackend");

    // Setting up our lambda function
    const helloLambda = new lambda.Function(this, "HelloLambda", {
      code: lambda.Code.fromAsset("lambda"),
      handler: "hello.handler",
      runtime: lambda.Runtime.NODEJS_12_X,
      memorySize: 256,
      timeout: cdk.Duration.seconds(10),
      environment: { isProduction: "nope, nada, none" },
    });

    // Setting up our api gateway for our function
    new apiGateway.LambdaRestApi(this, "Endpoint", {
      handler: helloLambda,
    });

    // To create a storage bucket
    const imageBucket = new s3.Bucket(this, "ImageBucket", {
      publicReadAccess: true,
    });

    // call our function when something is changed in the s3 bucket
    // imageBucket.addEventNotification(
    //   s3.EventType.OBJECT_CREATED,
    //   new s3Notifications.LambdaDestination(helloLambda)
    // );

    // Deploy images from the images directory
    new s3Deployment.BucketDeployment(this, "DeployImages", {
      destinationBucket: imageBucket,
      sources: [s3Deployment.Source.asset("./images")],
    });

    // To create a website bucket. Don't do this. It has no cdn, https etc.
    // const websiteBucket = new s3.Bucket(this, "WebsiteBucket", {
    //   publicReadAccess: true,
    //   websiteIndexDocument: "index.html",
    // });

    // new s3Deployment.BucketDeployment(this, "DeployWebsite", {
    //   destinationBucket: websiteBucket,
    //   sources: [s3Deployment.Source.asset("./www/site/build")],
    // });

    // new cdk.CfnOutput(this, "WebsiteAddress", {
    //   value: websiteBucket.bucketWebsiteUrl,
    // });

    // a community provisioning of a website using CloudFront
    new SPADeploy(this, "WebsiteDeploy").createSiteWithCloudfront({
      indexDoc: "index.html",
      websiteFolder: "./www/site/build",
    });
  }
}

module.exports = { CdkAppExampleStack };
