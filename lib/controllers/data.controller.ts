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
        this.router.get('/latest', this.getLatestReadingsFromAllDevices);
        this.router.get('/latest/:id', this.getLatestReadingsFromAllDevicesById);
        this.router.get('/:id/latest', this.getLatestReadingFromAllDevicesById);
        this.router.get('/:id/:num', this.getReadingsFromRange);
        this.router.delete('/all', this.deleteAllReadings);
        this.router.delete('/:id', this.deleteReadingById);        
        this.router.post('/add', this.addData);
   }

    private deleteReadingById = async (request: Request, response: Response, next: NextFunction) => {
        const index = parseInt(request.params.id);
        testArr.splice(index, 1);
        response.status(200).json(testArr);
    };     

    private deleteAllReadings = async (request: Request, response: Response, next: NextFunction) => {
        testArr.length = 0
        response.status(200).json(testArr);
    };    

    private getReadingsFromRange = async (request: Request, response: Response, next: NextFunction) => {
        const id = parseInt(request.params.id);
        const num = parseInt(request.params.num);

        const arrayRange = testArr.slice(id, num);
        response.status(200).json(arrayRange)
    };      

    private getLatestReadingFromAllDevicesById = async (request: Request, response: Response, next: NextFunction) => {

        const num: number = Math.max(...testArr);
        response.status(200).json(num)
    };      

    private getLatestReadingsFromAllDevicesById = async (request: Request, response: Response, next: NextFunction) => {
        const id = parseInt(request.params.id);

        if (isNaN(id) || id < 0 || id >= testArr.length) {
            return response.status(400).json({ message: 'Invalid index' });
        }

        const value = testArr[id];
        response.status(200).json({ value });
    };   

    private getLatestReadingsFromAllDevices = async (request: Request, response: Response, next: NextFunction) => {
        response.send(testArr)
    };

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const { elem } = request.body;

        testArr.push(elem);

        response.status(200).json(testArr);
};
}

export default DataController;