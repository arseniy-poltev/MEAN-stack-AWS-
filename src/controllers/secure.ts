import { Router, Response, Request, NextFunction } from "express";
import { IModel } from "../models/model";
import { Utils } from "../utilities/common.utils";
import { Error } from "mongoose";
export class SecureController{
    router:Router;
    constructor(){
        this.router = Router();
    }
    getToken(req:Request, res:Response, next: NextFunction){
        Utils.getConfig().then((config)=>{
            const model:IModel = req.app.locals.model;
            const user = new model.user(req.body);
            model.user.findOne({mail:user.mail,password:user.password}).exec().then((findUser)=>{
                if(findUser){
                    const token = new model.token(Utils.createToken(config));
                    token.save().then((saveToken)=>{
                        res.send(saveToken)
                    });
                }
                else{
                    res.send(new Error("not allowed"));
                }
            });
        });
    }
    init(){
        this.router.post('/',this.getToken);
    }
}
let secureController = new SecureController();
secureController.init();
export default secureController.router;