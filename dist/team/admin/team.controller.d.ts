import { AdminTeamService } from './team.service';
import { CreateTeamDto } from '../dto/create-team.dto';
import { UpdateTeamDto } from '../dto/update-team.dto';
import { WebResponse } from 'src/model/web.model';
export declare class AdminTeamController {
    private readonly teamService;
    constructor(teamService: AdminTeamService);
    create(createTeamDto: CreateTeamDto): Promise<WebResponse<any>>;
    findAll(): Promise<WebResponse<any>>;
    findOne(id: number): Promise<WebResponse<any>>;
    update(id: number, updateTeamDto: UpdateTeamDto): Promise<WebResponse<any>>;
    remove(id: number): Promise<WebResponse<any>>;
}
