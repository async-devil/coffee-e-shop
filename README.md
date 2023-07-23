# Coffee e-shop &middot; [![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0) [![wakatime](https://wakatime.com/badge/user/bc8fa60c-fa34-4507-b70f-24bdba32a74d/project/c71d4f0b-156e-4908-ba0c-20a1b626f1a8.svg)](https://wakatime.com/badge/user/bc8fa60c-fa34-4507-b70f-24bdba32a74d/project/c71d4f0b-156e-4908-ba0c-20a1b626f1a8)

```bash
aws cloudformation create-stack \
      --template-body file://cloudformation-template.yaml \
      --capabilities CAPABILITY_NAMED_IAM \
      --stack-name coffee-e-shop
```

```bash
aws cloudformation delete-stack --stack-name coffee-e-shop
```
