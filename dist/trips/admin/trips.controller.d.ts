import { AdminTripsService } from './trips.service';
import { CreateTripDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';
import { WebResponse } from 'src/model/web.model';
export declare class AdminTripsController {
    private readonly tripsService;
    constructor(tripsService: AdminTripsService);
    create(createTripDto: CreateTripDto): Promise<WebResponse<any>>;
    findAll(page: number, limit: number): Promise<WebResponse<any>>;
    findOne(id: number): Promise<WebResponse<any>>;
    update(id: number, updateTripDto: UpdateTripDto): Promise<WebResponse<any>>;
    remove(id: number): Promise<WebResponse<any>>;
}
