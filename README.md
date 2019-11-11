# Get IP

A AWS lambda function which show your IP address and user agent of current browser.

## Usage

Start development server

```
yarn dev
```

## Deployment

Deploy via AWS CDK

1. Copy `.env.example` to `.env`
1. Fill up the blanks.
1. Make sure you are in correct profile.
   ```
   aws sts get-caller-identity
   ```
1. Run `cdk deploy`
