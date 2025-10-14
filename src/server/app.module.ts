import { type MiddlewareConsumer, Module } from "@nestjs/common";
import { SvelteKitModule } from "./svelte/sveltekit.module.js";
import { SvelteKitMiddleware } from "./svelte/sveltekit.middleware.js";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path'
import { ConfigModule } from "@nestjs/config";
import { DevelopmentMiddleware } from "./development/development.middleware.js";

const envFilePaths = [
    path.resolve('env/aws.env'),
]

if (process.env.NODE_ENV === 'development') {
    envFilePaths.push(path.resolve('env/.env.development'))
} else {
    envFilePaths.push(path.resolve('env/.env.production'))
}

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: envFilePaths
        }),
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
            .apply(DevelopmentMiddleware, SvelteKitMiddleware)
            .forRoutes('/')
    }
}