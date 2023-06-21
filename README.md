# Coffee e-shop

```bash
aws cloudformation create-stack \
      --template-body file://cloudformation-template.yaml \
      --capabilities CAPABILITY_NAMED_IAM \
      --stack-name coffee-e-shop
```

```bash
aws cloudformation delete-stack --stack-name coffee-e-shop
```
