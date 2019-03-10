import { Router, Response, Request, NextFunction } from "express";
import { IModel } from "../models/model";
import { Emit } from "../interfaces/emit";
import * as socketIoClient from 'socket.io-client';
import { Error } from "mongoose";
export class PalletController{
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
                let pallet = new model.pallet(req.body.data);
                pallet.save().then((newPallet)=>{
                    res.send(newPallet);
                    const urlSocket = `${req.protocol}://${req.hostname}`;
                    const clientIO = socketIoClient(urlSocket);
                    const emit: Emit = {
                        modelName : 'pallet',
                        actionDb: "create",
                        data: newPallet
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
                const pallet = new model.pallet(req.body.data);
                model.pallet.findById(pallet._id).exec().then((findPallet)=>{
                    res.send(findPallet);
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
                model.pallet.find({company:company._id}).exec().then((pallets)=>{
                    res.send(pallets);
                });
            }
        });
    }   
    findByCompanyAndCreator(req:Request, res:Response, next: NextFunction){
        const model:IModel = req.app.locals.model;
        model.token.findOne({token:req.body.token}).then((findToken)=>{
            if(findToken == null){
                res.send(new Error("not allowed"));
            } else if (findToken.expDate <= new Date()) {
                res.send(new Error("not allowed"));
            } else {
                const company = new model.company(req.body.data);
                model.pallet.find({
                    $and:[
                        {company:company._id},
                        {createdBy:req.body.createdBy}
                    ]
                }).exec().then((pallet)=>{
                    res.send(pallet);
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
                const pallet = new model.pallet(req.body.data);
                model.pallet.updateOne({_id:pallet._id},pallet).exec().then((findPallet)=>{
                    res.send(findPallet);
                    const urlSocket = `${req.protocol}://${req.hostname}`;
                    const clientIO = socketIoClient(urlSocket);
                    const emit: Emit = {
                        modelName : 'pallet',
                        actionDb: "update",
                        data: pallet
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
                const pallet = new model.pallet(req.body.data);
                model.pallet.deleteOne({_id:pallet._id}).exec().then((resp)=>{
                    res.send(resp);
                    const urlSocket = `${req.protocol}://${req.hostname}`;
                    const clientIO = socketIoClient(urlSocket);
                    const emit: Emit = {
                        modelName : 'pallet',
                        actionDb: "delete",
                        data: pallet
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
        this.router.post('/findByCompany',this.findByCompany);
        this.router.post('/findByCompanyAndCreator',this.findByCompanyAndCreator);
    }
}
let palletController = new PalletController();
palletController.init();
export default palletController.router;