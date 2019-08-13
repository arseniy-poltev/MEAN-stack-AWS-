import { Router, Response, Request, NextFunction } from "express";
import { IModel } from "../models/model";
import * as socketIoClient from 'socket.io-client';
import { Emit } from "../interfaces/emit";
import { Error } from "mongoose";
export class ActionController{
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
                let action = new model.action(req.body.data);
                action.save().then((newAction)=>{
                    res.send(newAction);
                    const urlSocket = `${req.protocol}://${req.hostname}`;
                    const clientIO = socketIoClient(urlSocket);
                    const emit: Emit = {
                        modelName : 'action',
                        actionDb: "create",
                        data: newAction
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
                const action = new model.action(req.body.data);
                model.action.findById(action._id).exec().then((findAction)=>{
                    res.send(findAction);
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
                const action = new model.action(req.body.data);
                model.action.updateOne({_id:action._id},action).exec().then((findAction)=>{
                    res.send(findAction);
                    const urlSocket = `${req.protocol}://${req.hostname}`;
                    const clientIO = socketIoClient(urlSocket);
                    const emit: Emit = {
                        modelName : 'action',
                        actionDb: "update",
                        data: action
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
                const action = new model.action(req.body.data);
                model.action.deleteOne({_id:action._id}).exec().then((resp)=>{
                    res.send(resp);
                    const urlSocket = `${req.protocol}://${req.hostname}`;
                    const clientIO = socketIoClient(urlSocket);
                    const emit: Emit = {
                        modelName : 'action',
                        actionDb: "delete",
                        data: action
                    };
                    clientIO.emit('eventDB',emit);
                });
            }
        });
    }

    init(){
        this.router.post('/create',this.create);
        this.router.post('/find',this.find);
        this.router.post('/update',this.update);
        this.router.post('/delete',this.delete);
    }
}
let actionController = new ActionController();
actionController.init();
export default actionController.router;