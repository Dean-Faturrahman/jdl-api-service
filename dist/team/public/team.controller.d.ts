import { WebResponse } from 'src/model/web.model';
import { TeamService } from './team.service';
export declare class TeamController {
    private readonly teamService;
    constructor(teamService: TeamService);
    findAll(): Promise<WebResponse<any>>;
}
