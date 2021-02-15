const cdk = require("@aws-cdk/core");
// const dynamodb = require("@aws-cdk/aws-dynamodb");

class Backend extends cdk.Construct {
  /**
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id);
  }

  // Start provisioning resources here. Maybe a database etc.
  // new dynamodb.Table(this, "AppDatabase", {
  //   partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
  // })
}

module.exports = { Backend };
