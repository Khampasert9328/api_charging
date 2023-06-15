const aws = require('aws-sdk');
const path = require('path');

const { S3_ENDPOINT, BUCKET_NAME } = process.env;

const spacesEndpoint = new aws.Endpoint(S3_ENDPOINT);

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

exports.UploadImageOne = async (req, res, next) => {
  const file = req.file;
  console.log("File = ", file)
  if (!file) return res.json({ msg: 'no file' });
  const fileType = path.extname(file.originalname).toLowerCase();
  console.log("fileType = ", fileType)

  if (
    fileType == '.png' ||
    fileType == '.jpg' ||
    fileType == '.jpeg' ||
    fileType == '.pdf'
  ) {
    // create file name
    const randomChar = Math.random().toString(36).substring(7);
    const time = new Date().getTime();
    const fileName = `${randomChar}${time}` + `${fileType}`;

    await s3
      .putObject({
        ACL: 'public-read',
        Bucket: BUCKET_NAME + '/saveimagecharg',
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
      .promise();

    const urlImage = `https://ad-bucket.sgp1.digitaloceanspaces.com/saveimagecharg/${fileName}`;
      console.log("Success Upload")
    res.status(200).json({
      urlImage: urlImage,
      imageKey: fileName,
      message: 'Upload Image Successfully',
    });
  } else {
    return res.status(500).json({ msg: 'Allow Only PNG, JPG, JPEG, PDF' });
  }
};