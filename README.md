# S3Piper

### A lightweight Node.js tool to upload, compress and push images to Amazon S3.

Made using Kraken's awesome image compression API. In order to get started, include a **configs** folder in the root directory,
along with a ** configs.json ** file.

Your config.json file should look like this: 

```json
{
  "KRAKEN_API_KEY": "<your kraken api key>",
  "KRAKEN_API_SECRET": "<your kraken api secret>",
  "S3_KEY": "<your aws s3 key>",
  "S3_SECRET": "<your aws s3 secret>",
  "S3_REGION": "<your aws region>"
}

```
