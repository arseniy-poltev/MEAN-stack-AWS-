import { S3 } from 'aws-sdk';

import { Utils } from './common.utils';

export class AWSUtils {
    public static async uploadToS3(params: any, config: any):Promise<any> {
        const s3Options = {
            "accessKeyId": config.aws.accessKeyId,
            "secretAccessKey": config.aws.secretAccessKey
        }
        const s3 = new S3(s3Options);
        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => err ? reject(err) : resolve(data));
        });
    }
    
}