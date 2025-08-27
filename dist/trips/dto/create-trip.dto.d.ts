import { CreateTripTranslationDto } from './trip-translataion.dto';
import { CreateTripImageDto } from './trip-image.dto';
import { CreateTripFacilityDto } from './trip-facility.dto';
import { CreateTripItineraryDto } from './trip-itenerary.dto';
import { CreateTripTermDto } from './trip-term.dto';
export declare class CreateTripDto {
    latitude?: string;
    longitude?: string;
    price?: number;
    discount?: number;
    book_url?: string;
    is_active?: boolean;
    is_highlight?: boolean;
    translations: CreateTripTranslationDto[];
    images?: CreateTripImageDto[];
    facilities?: CreateTripFacilityDto[];
    itinerary?: CreateTripItineraryDto[];
    terms?: CreateTripTermDto[];
}
