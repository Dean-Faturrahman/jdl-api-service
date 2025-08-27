import { HeroTranslationDto } from './hero-translation.dto';
import { HeroImageDto } from './hero-image.dto';
export declare class CreateHeroDto {
    image_url: HeroImageDto[];
    translations: HeroTranslationDto[];
}
