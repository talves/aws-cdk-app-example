const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const apiGateway = require("@aws-cdk/aws-apigateway");
const s3 = require("@aws-cdk/aws-s3");

class CdkAppExampleStack extends cdk.Stack {
  /**
   * @param {cdk.App} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

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
    const imageBucket = new s3.Bucket(this, "ImageBucket", {});
  }
}

module.exports = { CdkAppExampleStack };
