import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HeroModule } from './hero/hero.module';
import { QuotesModule } from './quotes/quotes.module';
import { TestimoniesModule } from './testimonies/testimonies.module';
import { TripsModule } from './trips/trips.module';
import { CompanyModule } from './company/company.module';
import { TeamModule } from './team/team.module';
import { AppController } from './app.controller';
import { StoriesModule } from './stories/stories.module';

@Module({
  imports: [CommonModule, UserModule, AuthModule, HeroModule, QuotesModule, TestimoniesModule, TripsModule, CompanyModule, TeamModule, StoriesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
