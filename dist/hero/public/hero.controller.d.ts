import { HeroService } from './hero.service';
import { LanguageQueryDto } from 'src/common/dto/language-query.dto';
import { WebResponse } from 'src/model/web.model';
export declare class HeroController {
    private readonly heroService;
    constructor(heroService: HeroService);
    findAll(query: LanguageQueryDto): Promise<WebResponse<any>>;
}
