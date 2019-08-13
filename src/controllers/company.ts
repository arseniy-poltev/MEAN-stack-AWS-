import { Router, Response, Request, NextFunction } from "express";
import { IModel } from "../models/model";
import { Emit } from "../interfaces/emit";
import * as socketIoClient from 'socket.io-client';
import { Error } from "mongoose";
export class CompanyController{
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
                const company = new model.company(req.body.data);
                company.save().then((newCompany)=>{
                    res.send(newCompany);
                    const urlSocket = `${req.protocol}://${req.hostname}`;
                    const clientIO = socketIoClient(urlSocket);
                    const emit: Emit = {
                        modelName : 'company',
                        actionDb: "create",
                        data: newCompany
                    };
                    clientIO.emit('eventDB',emit)
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
                const company = new model.company(req.body.data);
                model.company.findById(company._id).exec().then((findCompany)=>{
                    res.send(findCompany);
                    
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
                const company = new model.company(req.body.data);
                model.company.updateOne({_id:company._id},company).exec().then((findCompany)=>{
                    res.send(findCompany);
                    const urlSocket = `${req.protocol}://${req.hostname}`;
                    const clientIO = socketIoClient(urlSocket);
                    const emit: Emit = {
                        modelName : 'company',
                        actionDb: "update",
                        data: company
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
                const company = new model.company(req.body.data);
                model.company.deleteOne({_id:company._id}).exec().then((resp)=>{
                    res.send(resp);
                    const urlSocket = `${req.protocol}://${req.hostname}`;
                    const clientIO = socketIoClient(urlSocket);
                    const emit: Emit = {
                        modelName : 'company',
                        actionDb: "delete",
                        data: company
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
                const company = new model.company(req.body.data);
                model.company.find({}).exec().then((companies)=>{
                    res.send(companies);
                });
            }
        });
    }

    init(){
        this.router.post('/create',this.create);
        this.router.post('/find',this.find);
        this.router.post('/update',this.update);
        this.router.post('/delete',this.delete);
        this.router.post('/getall',this.getAll);
    }
}
let companyController = new CompanyController();
companyController.init();
export default companyController.router;