---
name: implement-logic
description: Expert knowledge of the Service Layer, Business Logic, and Hook System. Enforces the Static Service pattern, Action pattern, Job Processors, and Providers.
---

# implement-logic Skill

## Critical Standards

You **MUST** follow the standards defined in:

- `core/ARCHITECTURE.md`: Shell-Registry, Service Layer, Agents.
- `core/MODULES.md`: Modular Monolith, Hooks, API/SDK Flow.
- `core/CODE.md`: Strict Types, Zod Validation, Error Handling.
- **Core Neutrality**: The core platform must never know what modules are installed on the system.

## 1. Universal Database Access

While Services remain the primary "System of Record" for shared business logic, the Nexical Ecosystem permits **Universal Database Access**.

- **Rule**: Import `db` from `@/lib/core/db` for all database operations across all backend layers (**Actions, Services, and Hooks**).
- **Usage**: `import { db } from '@/lib/core/db';`

## 2. The Service Pattern

Services encapsulate complex domain logic, Prisma transactions, and emit hooks.

- **File Naming**: Manual domain services MUST use `{kebab-case}-ops-service.ts`.
- **Class**: Must be a **Static Class**. Do not instantiate services.
- **Actor Context**: All public domain methods **MUST** accept an `actor?: ApiActor` parameter to enable security scoping and authorship tracking.
- **Return Type**: **ALL** public methods MUST return a `ServiceResponse<T>` object.
- **Hook-First Flow**:
    1. **Filter (Pre)**: `HookSystem.filter('{entity}.before{Action}', ...)`
    2. **Execute**: Perform logic/DB operation.
    3. **Dispatch (Post)**: `HookSystem.dispatch('{entity}.{action}Performed', ...)`
    4. **Filter (Read)**: `HookSystem.filter('{entity}.read', ...)`

## 3. The Action Pattern (API Operations)

Actions are single-purpose operations triggered by API endpoints.

- **Generation Protocol**: **NEVER** create Action files manually. Define the operation in `api.yaml` and run `nexical gen api {module}`. Implement custom logic within the generated class.
- **Location**: `src/actions/`.
- **Logic**: Actions may contain direct DB access (Prisma) and business logic for "action" type endpoints.
- **Authorization**: MUST check for the presence of an `actor` in `context.locals.actor`.
- **I18n**: Subject lines and user-facing strings MUST be fetched using `getTranslation()`, never hardcoded as literals.

## 4. Hook Registration & Auto-Discovery

Cross-module side-effects and data transformations are isolated in Hook classes.

- **Location**: `src/hooks/*-hooks.ts`.
- **Auto-Discovery Rule**: Every hook file **MUST** export an `init` function that calls the class's static `init` method.
- **Registration**: Use `HookSystem.on` for side effects and `HookSystem.filter` for data transformations (e.g., password hashing).
- **Example**:
  ```typescript
  export class UserHooks {
    static init() {
      HookSystem.filter('user.beforeCreate', async (data) => {
        data.password = await hash(data.password);
        return data;
      });
    }
  }
  export const init = () => UserHooks.init();
  ```

## 5. Background Agents & Jobs

- **Job Processors**: Discrete tasks queued via `JobProcessor<T>`. Payloads MUST be defined in `models.yaml`.
- **Persistent Agents**: Long-running workers extending `PersistentAgent`.
- **Access**: Both may use direct `db` imports or `this.api` (Federated SDK).

## 6. Modular Communications (Email Registry)

- **Rule**: Always use `EmailRegistry.render` with a string-based template identifier for email communications.
- **Example**: `EmailRegistry.render('user:verify-email', payload)`.

## 7. Configuration & Environment

- **Rule**: Use the centralized `config` helper from `@/lib/core/config` for all environment-dependent values (e.g., `config.PUBLIC_SITE_NAME`).

## 8. Templates

- `templates/service.ts`: `{kebab-case}-ops-service.ts` (Manual domain logic).
- `templates/action.ts`: Implementation logic for generated Actions.
- `templates/hook.ts`: Hook registration class with auto-discovery export.
- `templates/job.ts`: Background job processor.
- `templates/persistent-agent.ts`: Long-running worker.