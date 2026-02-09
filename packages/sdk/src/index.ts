import { ApiClient, type ApiClientOptions } from '@nexical/sdk-core';
import { initializeSdkRegistry, type SdkRegistry } from './registry.generated.js';

export * from '@nexical/sdk-core';
export * from './registry.generated.js';

export interface NexicalClient extends SdkRegistry { }

export class NexicalClient extends ApiClient {
    constructor(options: ApiClientOptions) {
        super(options);
        Object.assign(this, initializeSdkRegistry(this));
    }
}
