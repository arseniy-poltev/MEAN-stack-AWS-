import * as fs from 'fs';
import * as uuid from 'uuid';
import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import * as crypto from 'crypto-js';
import {Buffer} from 'buffer';
import * as path from 'path';

export class Utils{
    public static readFile(path:string, options:any):Promise<any>{
        return new Promise((resolve, reject)=>{
            var fileRead = fs.readFile(path,options,(err,data)=>{
                err ? reject(err) : resolve(data);
            });
        });
    }
    public static getConfig():Promise<Config>{
        return new Promise<Config>((resolve, reject) => { 
            fs.exists(path.resolve('dist'),(exist) => {
                //let configPath = path.resolve(`services/config.json`);
                //if(exist){
                let configPath = path.resolve(`dist/config.json`); 
                //}
                resolve(Utils.readFile(configPath,null)
                .then((data)=>{
                    return Promise.resolve(JSON.parse(data) as Config);
                })
                .catch((err)=>{
                    return Promise.reject(err);
                }));
            });
        });
    }
    public static createToken(config:Config){
        let endDate =  new Date();
        endDate.setHours(endDate.getHours() + config.hoursTokenExpired)
        let objToken = {
            token : Utils.createHash(uuid()),
            initDate : new Date(),
            expDate : endDate
        }
        return objToken;
    }
    public static createHash(content: string){
        const hash = crypto.SHA1(content).toString();
        const buff = Buffer.from(hash);
        return buff.toString('base64');
    }
}
export interface Config{
    hostDB:string;
    hoursTokenExpired:number;
    aws: any;
}
export class String {
    public static empty: string = "";
    public static isNullOrWhiteSpace(value: string): boolean {
        try {
            if (value == null || value == undefined)
                return false;

            return value.replace(/\s/g, '').length < 1;
        }
        catch (e) {
            return false;
        }
    }
    public static format(value:any, ...args:any[]): string {
    try {
        return value.replace(/{(\d+(:.*)?)}/g, (match:any, i:any) => {
                var s = match.split(':');
                if (s.length > 1) {
                    i = i[0];
                    match = s[1].replace('}', '');
                }

                var arg = String.formatPattern(match, args[i]);
                return typeof arg != 'undefined' && arg != null ? arg : String.empty;
            });
        }
        catch (e) {
            return String.empty;
        }
    }
    private static formatPattern(match:any, arg:any): string {
        switch (match) {
            case 'L':
                arg = arg.toLowerCase();
                break;
            case 'U':
                arg = arg.toUpperCase();
                break;
            default:
                break;
        }

        return arg;
    }
}
export default new Utils();