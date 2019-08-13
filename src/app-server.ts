import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as path from 'path';
import { IModel } from './models/model';
import { Utils, Config } from './utilities/common.utils';
import { AWSUtils } from './utilities/aws-s3.utils';
import mongoose = require("mongoose");
import { IUserModel } from './models/user';
import { userSchema } from './schemas/user';
import { IPalletModel } from './models/pallet';
import { palletSchema } from './schemas/pallet';
import { ICompanyModel } from './models/company';
import { companySchema } from './schemas/company';
import { IActionModel } from './models/action';
import { actionSchema } from './schemas/action';
import UserController from './controllers/user';
import ActionController from './controllers/action';
import CompanyController from './controllers/company';
import PalletController from './controllers/pallet';
import SecureController  from './controllers/secure';

import { ITokenModel } from './models/token';
import { tokenSchema } from './schemas/token';
import OrderController  from './controllers/order';
import { IOrderModel } from './models/order';
import { orderSchema } from './schemas/order';

export class App {
  private model: IModel;
  private configObj: Config;
  public express: express.Application;
  
  constructor() {
    this.model = Object(); 
    this.express = express();
    this.middleware();
    this.routes();
    this.config();
  }

  private config(){
    Utils.getConfig().then((config) => {
      this.configObj = config;
      const MONGODB_CONNECTION: string = config.hostDB;      
      global.Promise = require("q").Promise;
      mongoose.Promise = global.Promise;
      mongoose.createConnection(MONGODB_CONNECTION,{
        useNewUrlParser:true,
      }).then((connection)=>{
        this.model.user = connection.model<IUserModel>("User", userSchema);
        this.model.pallet = connection.model<IPalletModel>("Pallet", palletSchema);
        this.model.company = connection.model<ICompanyModel>("Company", companySchema);
        this.model.action = connection.model<IActionModel>("Action", actionSchema);
        this.model.token = connection.model<ITokenModel>("Token", tokenSchema);
        this.model.order = connection.model<IOrderModel>("Order", orderSchema);
        
        this.express.locals.model = this.model;
      });      
    });
  }
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(bodyParser.text());
    this.express.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    this.express.use(cors());
  }
  private routes(): void {
    const allowedExt = [
      '.js',
      '.ico',
      '.css',
      '.png',
      '.jpg',
      '.woff2',
      '.woff',
      '.ttf',
      '.svg'
    ];
    let router = express.Router();
    let routerApp = express.Router();
    router.get('/', (req, res, next) => {
      res.json({
        message: 'connected'
      });
    });
    //image upload to s3 
    router.put('/api/images-:resourseId/:key', (req, res) => {
      const params = {
        Key: req.params.resourseId + '-' + req.params.key,
        Body: req,
        Bucket: this.configObj.aws.s3.Bucket,
        ACL: this.configObj.aws.s3.ACL
      };
      AWSUtils.uploadToS3(params, this.configObj)
      .then( () => res.status(201).end())
      .catch(err => res.status(500).json({ message: err.message || 'Internal server error'}));
    });
    //router to angular
    routerApp.get('*', (req, res) => {
      if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        const file = path.resolve(`app/${req.url}`);
        res.sendFile(file);
      }
      else {
        const file = path.resolve('app/index.html');
        res.sendFile(file);
      }
    });
    this.express.use('/',routerApp);
    this.express.use('/app',routerApp);
    this.express.use('/services', router);
    this.express.use('/services/api/user',UserController);
    this.express.use('/services/api/pallet',PalletController);
    this.express.use('/services/api/action',ActionController);
    this.express.use('/services/api/company',CompanyController);
    this.express.use('/services/api/token',SecureController);
    this.express.use('/services/api/order',OrderController);
        
  }



}

export default new App().express;

