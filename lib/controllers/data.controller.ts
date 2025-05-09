import { request } from 'http';
import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';

let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class DataController implements Controller {
    public path = '/api/data';
    public router = Router();
 
    constructor() {
        this.initializeRoutes();
    }
 
    private initializeRoutes() {
        this.router.get(`/latest`, this.getLatestReadingsFromAllDevices);
        this.router.post(`/:id`, this.addData);
        this.router.get('/latest/:id', this.getLatestReadingsFromAllDevicesById)
    }
 
     private getLatestReadingsFromAllDevices = async (request: Request, response: Response, next: NextFunction) => {
        response.send(testArr);
     }

     private getLatestReadingsFromAllDevicesById = async (request: Request, response: Response, next: NextFunction) => {
        const { elem } = request.body
        response.send(testArr[elem]);
     }

     private addData = async (request: Request, response: Response, next: NextFunction) => {
        const { elem } = request.body;
        console.log('Dodaję do testArr:', elem);
        testArr.push(elem);
        response.status(200).json(testArr);
    };
    
 }
 
 export default DataController;
 