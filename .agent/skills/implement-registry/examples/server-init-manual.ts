import { EmailRegistry } from '@/lib/email/email-registry';
import { HookSystem } from '@/lib/modules/hooks';
import MyTemplate from './emails/MyTemplate';

/**
 * MANUAL server-init.ts example
 * Use this for non-API modules (e.g., -email, -ui) to register into core systems.
 */
export async function init() {
  // 1. Register Email Templates
  EmailRegistry.register('my-module:welcome', MyTemplate);

  // 2. Register Hooks
  HookSystem.on('user:created', async (user) => {
    console.log('User created:', user.id);
  });
}
