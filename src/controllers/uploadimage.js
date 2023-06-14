const aws = require('aws-sdk');
const path = require('path');

const { S3_ENDPOINT, BUCKET_NAME } = process.env;

const spacesEndpoint = new aws.Endpoint(S3_ENDPOINT);

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

exports.UploadsImageMany = async (req, res, next) => {
   try {
    const files = req.files;
    if (!files) return res.json({ message: "Don't Have Any File" });
  
    const ArrUrlImage = [];
  
    for (let i = 0; i < files.length; i++) {
      const fileType = path.extname(files[i].originalname).toLowerCase();
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
            Body: files[i].buffer,
            ContentType: files[i].mimetype,
          })
          .promise();
  
        const urlImage = `https://ad-bucket.sgp1.digitaloceanspaces.com/saveimagecharg/${fileName}`;
  
        const data = {
          urlImage: urlImage,
          imageKey: fileName,
        };
  
        ArrUrlImage.push(data);
      } else {
        res.send({ message: 'Allow Only PNG, JPG, JPEG, PDF' });
      }
    }
  
    res.send({
      urlImage: ArrUrlImage,
      message: 'Upload Images Successfully',
    });
   } catch (error) {
    console.log(error);
   }
  };