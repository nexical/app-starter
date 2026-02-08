# Skill: Implement Registry

This skill governs the implementation and extension of the **Registry System** within the Nexical Ecosystem. Registries are the primary mechanism for decoupling the Shell from individual Modules.

## 1. Registry Types

The Nexical Ecosystem uses three distinct registry patterns:

### A. Class-Based Registry (Singleton)
Used for managing pluggable logic, templates, or policies identified by string IDs.
- **Pattern**: Singleton class using a `Map` for storage.
- **Rule**: Must support overrides by allowing `register` to overwrite existing keys.
- **Example**: `RoleRegistry`, `EmailRegistry`.

### B. Context-Aware Registry (UI Shell)
Used for selecting a component (e.g., a Shell) based on a matcher/predicate.
- **Pattern**: Ordered list of components with predicates.
- **Rule**: **LIFO (Last-In-First-Out)** selection. The latest registration wins. Selection iterates in reverse order of registration.
- **Example**: `ShellRegistry`.

### C. Directory-Based Registry (Zones)
Used for automatic discovery of UI components for layout slots (Zones).
- **Pattern**: Vite glob imports of files in `src/registry/`.
- **Rule**: Render order is determined by the `{order}-` prefix in the filename (e.g., `10-dashboard.tsx`).
- **Directive**: Every interactive component MUST include `'use client';` at the top.

## 2. Server-Side Initialization (`server-init.ts`)

Every module MUST have a standardized entry point for registration:

- **Path**: `apps/backend/modules/{name}/src/server-init.ts` or `apps/frontend/modules/{name}/src/server-init.ts`.
- **Standard**: Export an `async function init()`.
- **Logic**: This function is the ONLY place where registration into class-based or context-aware registries should occur.
- **Discovery**: Core uses `import.meta.glob` via `glob-helper.ts` to automatically find and execute these files.

## 3. Split Module Pattern

To reduce dependency bloat, follow the split naming convention:
- `*-api`: Core domain logic, models, and CRUD services.
- `*-ui`: Frontend pages and registry components.
- `*-email`: React-Email templates and registration.

## 4. Implementation Workflow

1. **For Directory-Based UI**:
   - Place component in `src/registry/{zone-name}/`.
   - Use `{order}-{kebab-name}.tsx` naming.
   - Include `'use client';`.

2. **For Class/Context Registries**:
   - Ensure the Registry exists in `core/src/lib/registries/`.
   - In your module's `src/server-init.ts`, call `Registry.register(...)`.

3. **Creating a New Registry**:
   - Follow the Class-Based Singleton pattern.
   - Implement LIFO logic if it involves conditional selection.
   - Use generic interfaces to ensure module compatibility.

## 5. Standard Headers
- **NEVER** modify `server-init.ts` in API modules if it contains the `// GENERATED CODE` header. Use the `HookSystem` for custom logic instead.
