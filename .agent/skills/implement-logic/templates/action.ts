import type { APIContext } from 'astro';
import type { ServiceResponse } from '@/types/service';
import { db } from '@/lib/core/db';
import { config } from '@/lib/core/config';
import { getTranslation } from '@/lib/core/i18n';
import type { __ActionInput__DTO, __ActionOutput__DTO } from '../sdk/types';

/**
 * Action Template (Implementation Logic)
 * 
 * NOTE: This file is generated via `nexical gen api {module}` based on api.yaml.
 * Implementation should focus on the logic within the static `run` method.
 *
 * Rules:
 * 1. Must implement a static `run(input, context: APIContext)` method.
 * 2. MUST check for actor authorization.
 * 3. Direct 'db' access is permitted for Action-level implementation.
 * 4. Use `getTranslation()` for user-facing strings/errors.
 * 5. Use `config` helper for environment variables.
 */

export class __ActionName__Action {
  /**
   * Orchestrates the action logic.
   * @param input Typed DTO from SDK (Source of Truth: api.yaml)
   * @param context Astro API Context
   */
  public static async run(
    input: __ActionInput__DTO,
    context: APIContext,
  ): Promise<ServiceResponse<__ActionOutput__DTO>> {
    const actor = context.locals.actor;
    const translate = await getTranslation();

    // 1. Authorization Check
    if (!actor) {
      return { success: false, error: 'service.error.unauthorized' };
    }

    // 2. Implementation Logic (Universal DB Access)
    // You can use Prisma directly for action-specific logic
    const exists = await db.__entity__.findUnique({ where: { id: input.id } });
    
    if (!exists) {
      return { 
        success: false, 
        error: translate('service.error.not_found') 
      };
    }

    // 3. Environment Config
    if (config.NODE_ENV === 'production') {
       // Production specific logic
    }

    return {
      success: true,
      data: { ...exists } as __ActionOutput__DTO,
    };
  }
}