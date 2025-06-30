import { Module } from '@nestjs/common';
import { AdminHeroService } from './admin/hero.service';
import { AdminHeroController } from './admin/hero.controller';
import { HeroService } from './public/hero.service';
import { HeroController } from './public/hero.controller';

@Module({
  controllers: [
    HeroController,     
    AdminHeroController,
  ],

  providers: [
    HeroService,         
    AdminHeroService,    
  ],
})
export class HeroModule {}
