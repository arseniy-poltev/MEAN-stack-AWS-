import { Injectable } from '@angular/core';
import {Buffer} from 'buffer';
import * as crypto from 'crypto-js';


@Injectable({
    providedIn: 'root'
})
export class CommonUtils {
    createHash(content: string) {
        const hash = crypto.SHA1(content).toString();
        const buff = Buffer.from(hash);        
        return buff.toString('base64');
    }
    
}
