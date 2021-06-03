import cdk = require('@aws-cdk/core');
import lambda = require('@aws-cdk/aws-lambda');
import apigateway = require('@aws-cdk/aws-apigateway');
import certmgr = require('@aws-cdk/aws-certificatemanager');

require('dotenv').config()
const { certArn, customDomain } = process.env;

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFn = new lambda.Function(this, 'func', {
      code: lambda.Code.fromAsset('./get_ip.zip'),
      handler: 'index.handler',
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_14_X
    });

    const acmCert = certmgr.Certificate.fromCertificateArn(this, 'cert', certArn!);
    const domain = new apigateway.DomainName(this, 'domain', {
      domainName: customDomain!,
      certificate: acmCert,
      endpointType: apigateway.EndpointType.REGIONAL
    })
    const api = new apigateway.RestApi(this, 'get-ip');
    const integration = new apigateway.LambdaIntegration(lambdaFn);
    api.root.addMethod('GET', integration);
    domain.addBasePathMapping(api);
  }
}
