# S3Piper

###

#### What is S3Piper?
A lightweight Node.js tool to upload, compress and push images to Amazon S3. It is made using Kraken's awesome image compression API.

![alt text](https://raw.githubusercontent.com/shivtools/S3Piper/master/markdown/home.png "Sneak peek!")

#### Get started

* The app runs on port 5000. After starting the following command, navigate to localhost:5000 in your browser.

```
npm start
```

* In order to get started, include a **configs** folder in the root directory,
along with a **config.json** file.

* Your **config.json** file should look like this:

```json
{
  "KRAKEN_API_KEY": "<your kraken api key>",
  "KRAKEN_API_SECRET": "<your kraken api secret>",
  "S3_KEY": "<your aws s3 key>",
  "S3_SECRET": "<your aws s3 secret>",
  "S3_REGION": "<your aws region>"
}

```

Example of S3-region would be: us-west-2.

* You **must** already have a bucket ready in S3 and paste its filename into the input filed that asks for your S3 bucket name. In order to modify the compression sizes, simply modify the index.js file. Here's more on [Kraken's documentation](https://kraken.io/docs/upload-url) (look under direct upload).

Feel free to get in touch with me regarding any questions or to add more functionality to this tool!
