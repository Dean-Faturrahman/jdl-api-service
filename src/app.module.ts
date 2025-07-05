import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HeroModule } from './hero/hero.module';
import { QuotesModule } from './quotes/quotes.module';
import { HighlightsModule } from './highlights/highlights.module';

@Module({
  imports: [CommonModule, UserModule, AuthModule, HeroModule, QuotesModule, HighlightsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
