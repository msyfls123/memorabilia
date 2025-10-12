import { type MiddlewareConsumer, Module } from "@nestjs/common";
import { SvelteKitModule } from "./svelte/sveltekit.module";
import { SvelteKitMiddleware } from "./svelte/sveltekit.middleware";

@Module({
    imports: [SvelteKitModule],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(SvelteKitMiddleware)
            .forRoutes('*')
    }
}