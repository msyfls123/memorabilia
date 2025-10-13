import { type MiddlewareConsumer, Module } from "@nestjs/common";
import { SvelteKitModule } from "./svelte/sveltekit.module.js";
import { SvelteKitMiddleware } from "./svelte/sveltekit.middleware.js";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path'

console.log('pathname', path.resolve(), process.execPath);

@Module({
    imports: [
        SvelteKitModule,
        ServeStaticModule.forRoot({
            rootPath: path.resolve('build/client/_app'),
            serveRoot: '/_app',
        })
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(SvelteKitMiddleware)
            .forRoutes('*')
    }
}