import { Controller, DefaultValuePipe, Get, HttpStatus, Param, ParseBoolPipe, ParseIntPipe, Post, Query } from "@nestjs/common";
import { TripsService } from "./trips.service";
import { WebResponse } from "src/model/web.model";
import { Public } from "src/auth/decorator/public.decorator";
import { LanguageQueryDto } from "src/common/dto/language-query.dto";

@Controller('api/v1/trips')
export class TripsController {
    constructor(private readonly tripsService: TripsService) { }

    @Public()
    @Get()
    async findAll(
        @Query() query: LanguageQueryDto,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('is_highlight', new ParseBoolPipe({ optional: true })) ishighlight?: boolean,
    ): Promise<WebResponse<any>> {
        const result = await this.tripsService.findAll(query, page, limit, ishighlight);

        return {
            status_code: HttpStatus.OK,
            message: 'Successfully retrieved all trips',
            data: result,
        };
    }

    @Public()
    @Get(':id')
    async findOne(
        @Query() query: LanguageQueryDto,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<WebResponse<any>> {
        const result = await this.tripsService.findOne(query, id);

        return {
            status_code: HttpStatus.OK,
            message: 'Successfully retrieved a trip',
            data: result,
        };
    }
}
