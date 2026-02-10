# Skill: Implement Registry

This skill governs the implementation and extension of the **Registry System** within the Nexical Ecosystem. Registries are the primary mechanism for decoupling the Shell from individual Modules.

## Strict Quality Standards

- **Zero Tolerance for `any`**: The use of `any` is strictly prohibited. You MUST use specific types, `unknown` with validation, or proper interfaces. There are NO exceptions to this rule.
- **ESLint Compliance**: All code you generate must be strictly compliant with the project's ESLint rules. Always proactively check for and resolve any linting errors provided in tool feedback.

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
- **Pattern**: Vite glob imports of files in `src/registry/{zone}/`.
- **Rule**: Render order is determined by the `{order}-` prefix in the filename (e.g., `10-dashboard.tsx`).
- **Metadata**: Exporting `order` (number) or `name` (string) will override filename-derived values.
- **Directive**: Every interactive component MUST include `'use client';` at the top.

## 2. Manifest-Driven Integration (`ui.yaml`)

The `ui.yaml` file is the authoritative manifest for a module's UI contributions. 

- **Requirement**: Every registry component MUST be documented in the module's `ui.yaml`.
- **Purpose**: Used by generators for wiring and by `nexical audit ui` for consistency checks.
- **Path**: `apps/frontend/modules/{name}/ui.yaml`.

## 3. Initialization & Lifecycle

### Server-Side Initialization (`server-init.ts`)
- **API Modules**: `server-init.ts` is **STRICTLY GENERATED**. Do not edit manually. Use the `HookSystem` for custom logic.
- **UI/Email Modules**: Manual edits are permitted to register into core systems.
- **Path**: `src/server-init.ts`.

### Phased Module Loading
Modules are loaded in phases defined in `module.config.mjs` (Core, Provider, Feature, Theme). Themes should always load last to ensure their registry contributions can override default behaviors.

## 4. Implementation Standards

### Standard Hooks
Registry components should interact with the Shell via:
- `useNavData()`: To access user context and navigation state.
- `useShellStore()`: To control shell behavior (e.g., `setDetailPanel`, `toggleSidebar`).

### Semantic Styling (Theming)
To enable theme overrides, registry components MUST:
- Use kebab-case class names for all key structural elements (e.g., `className="user-menu-trigger"`).
- Define module-specific styles in `styles.css` using the `@layer components` directive.

## 5. Workflow

1. **For Directory-Based UI**:
   - Define the contribution in `ui.yaml`.
   - Place component in `src/registry/{zone-name}/`.
   - Use `{order}-{kebab-name}.tsx` naming.
   - Include `'use client';` and semantic classes.

2. **For Class/Context Registries**:
   - Register in `src/server-init.ts` (Manual modules only).
   - Use the `HookSystem` for API-driven logic.

3. **Metadata Overrides**:
   - Export `const order = X;` to change priority dynamically.