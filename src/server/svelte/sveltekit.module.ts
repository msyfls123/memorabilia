import { Module, type OnModuleInit } from '@nestjs/common';
import { SvelteKitHandler } from './sveltekit.handler.js';

@Module({
  providers: [SvelteKitHandler],
  exports: [SvelteKitHandler],
})
export class SvelteKitModule implements OnModuleInit {
  constructor(private readonly svelteKitHandler: SvelteKitHandler) {}

  async onModuleInit() {
    await this.svelteKitHandler.onModuleInit();
  }
}