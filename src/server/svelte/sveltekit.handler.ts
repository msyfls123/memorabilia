import { Injectable, type OnModuleInit } from '@nestjs/common';

@Injectable()
export class SvelteKitHandler implements OnModuleInit {
    private svelteKitHandler: any;

    async onModuleInit() {
        // @ts-ignore
        const { handler } = await import('../../../build/handler.js');
        this.svelteKitHandler = handler;
    }

    getHandler() {
        return this.svelteKitHandler;
    }
}