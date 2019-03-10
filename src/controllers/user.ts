import { Router, Response, Request, NextFunction } from "express";
import { IModel } from "../models/model";
import { Emit } from "../interfaces/emit";
import * as socketIoClient from 'socket.io-client';
import { Error } from "mongoose";
export class UserController{
    router:Router;
    constructor(){
        this.router = Router();
    }
    create(req:Request, res:Response, next: NextFunction){
        const model:IModel = req.app.locals.model;
        model.token.findOne({token:req.body.token}).then((findToken)=>{
            if(findToken == null){
                res.send(new Error("not allowed"));
            } else if (findToken.expDate <= new Date()) {
                res.send(new Error("not allowed"));
            } else {
                let user = new model.user(req.body.data);
                user.save().then((newUser)=>{
                    res.send(newUser);
                    const urlSocket = `${req.protocol}://${req.hostname}`;
                    const clientIO = socketIoClient(urlSocket);
                    const emit: Emit = {
                        modelName : 'user',
                        actionDb: "create",
                        data: newUser
                    };
                    clientIO.emit('eventDB',emit);
                }); 
            }
        });
    }
    find(req:Request, res:Response, next: NextFunction){
        const model:IModel = req.app.locals.model;
        model.token.findOne({token:req.body.token}).then((findToken)=>{
            if(findToken == null){
                res.send(new Error("not allowed"));
            } else if (findToken.expDate <= new Date()) {
                res.send(new Error("not allowed"));
            } else {
                const user = new model.user(req.body.data);
                model.user.findOne({mail:user.mail,password:user.password}).exec().then((findUser)=>{
                    res.send(findUser);
                });
            }
        });
        
    }
    update(req:Request, res:Response, next: NextFunction){
        const model:IModel = req.app.locals.model;
        model.token.findOne({token:req.body.token}).then((findToken)=>{
            if(findToken == null){
                res.send(new Error("not allowed"));
            } else if (findToken.expDate <= new Date()) {
                res.send(new Error("not allowed"));
            } else {
                const user = new model.user(req.body.data);
                model.user.updateOne({_id:user._id},user).exec().then((findUser)=>{
                    res.send(findUser);
                    const urlSocket = `${req.protocol}://${req.hostname}`;
                    const clientIO = socketIoClient(urlSocket);
                    const emit: Emit = {
                        modelName : 'user',
                        actionDb: "update",
                        data: findUser
                    };
                    clientIO.emit('eventDB',emit);
                });
            }
        });
       
    }
    delete(req:Request, res:Response, next: NextFunction){
        const model:IModel = req.app.locals.model;
        model.token.findOne({token:req.body.token}).then((findToken)=>{
            if(findToken == null){
                res.send(new Error("not allowed"));
            } else if (findToken.expDate <= new Date()) {
                res.send(new Error("not allowed"));
            } else {
                const user = new model.user(req.body.data);
                model.user.deleteOne({_id:user._id}).exec().then((resp)=>{
                    res.send(resp);
                    const urlSocket = `${req.protocol}://${req.hostname}`;
                    const clientIO = socketIoClient(urlSocket);
                    const emit: Emit = {
                        modelName : 'user',
                        actionDb: "delete",
                        data: resp
                    };
                    clientIO.emit('eventDB',emit);
                });
            }
        });
    }
    getAll(req:Request, res:Response, next: NextFunction){
        const model:IModel = req.app.locals.model;
        model.token.findOne({token:req.body.token}).then((findToken)=>{
            if(findToken == null){
                res.send(new Error("not allowed"));
            } else if (findToken.expDate <= new Date()) {
                res.send(new Error("not allowed"));
            } else {                
                model.user.find({}).exec().then((users)=>{
                    res.send(users);
                });
            }
        });
    }
    findByRol(req:Request, res:Response, next: NextFunction){
        const model:IModel = req.app.locals.model;
        model.token.findOne({token:req.body.token}).then((findToken)=>{
            if(findToken == null){
                res.send(new Error("not allowed"));
            } else if (findToken.expDate <= new Date()) {
                res.send(new Error("not allowed"));
            } else {
                model.user.find({rol:req.body.data}).exec().then((users)=>{
                    res.send(users);
                });
            }
        });
    }

    init(){
        this.router.post('/create',this.create);
        this.router.post('/find',this.find);
        this.router.post('/update',this.update);
        this.router.post('/delete',this.delete);
        this.router.post('/getAll',this.getAll);
        this.router.post('/findByRol',this.findByRol);
    }
}
let userController = new UserController();
userController.init();
export default userController.router;