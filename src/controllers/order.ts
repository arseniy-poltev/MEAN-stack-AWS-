import { Router, Response, Request, NextFunction } from "express";
import { IModel } from "../models/model";
import { Emit } from "../interfaces/emit";
import * as socketIoClient from 'socket.io-client';
import { Error } from "mongoose";
export class OrderController{
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
                let order = new model.order(req.body.data);
                order.save().then((newOrder)=>{
                    res.send(newOrder);
                    const urlSocket = `${req.protocol}://${req.hostname}`;
                    const clientIO = socketIoClient(urlSocket);
                    const emit: Emit = {
                        modelName : 'order',
                        actionDb: "create",
                        data: newOrder
                    };
                    clientIO.emit('eventDB',emit);
                });
            }
        });
        
    }
    findByCompany(req:Request, res:Response, next: NextFunction){
        const model:IModel = req.app.locals.model;
        model.token.findOne({token:req.body.token}).then((findToken)=>{
            if(findToken == null){
                res.send(new Error("not allowed"));
            } else if (findToken.expDate <= new Date()) {
                res.send(new Error("not allowed"));
            } else {
                const company = new model.company(req.body.data);
                model.order.find({company:company._id}).exec().then((orders)=>{
                    res.send(orders);
                });
            }
        });
    }
    findByCompanyAndState(req:Request, res:Response, next: NextFunction){
        const model:IModel = req.app.locals.model;
        model.token.findOne({token:req.body.token}).then((findToken)=>{
            if(findToken == null){
                res.send(new Error("not allowed"));
            } else if (findToken.expDate <= new Date()) {
                res.send(new Error("not allowed"));
            } else {
                const company = new model.company(req.body.data);
                model.order.find({
                    $and:[
                        {company:company._id},
                        {status:req.body.state}
                    ]
                }).exec().then((orders)=>{
                    res.send(orders);
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
                const order = new model.order(req.body.data);
                model.order.findById(order._id).exec().then((findOrder)=>{
                    res.send(findOrder);
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
                const order = new model.order(req.body.data);
                model.order.updateOne({_id:order._id},order).exec().then((findOrder)=>{
                    res.send(findOrder);
                    const urlSocket = `${req.protocol}://${req.hostname}`;
                    const clientIO = socketIoClient(urlSocket);
                    const emit: Emit = {
                        modelName : 'order',
                        actionDb: "update",
                        data: order
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
                const order = new model.order(req.body.data);
                model.order.deleteOne({_id:order._id}).exec().then((resp)=>{
                    res.send(resp);
                    const urlSocket = `${req.protocol}://${req.hostname}`;
                    const clientIO = socketIoClient(urlSocket);
                    const emit: Emit = {
                        modelName : 'order',
                        actionDb: "delete",
                        data: order
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
        this.router.post('/findbycompany',this.findByCompany);
        this.router.post('/findbycompanyandstate',this.findByCompanyAndState);
    }
}
let orderController = new OrderController();
orderController.init();
export default orderController.router;