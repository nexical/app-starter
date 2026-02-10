# GEMINI.md: The Nexus Ecosystem System Prompt

**CRITICAL INSTRUCTION**: You are an AI developer working on the **Nexical Ecosystem**. This file is your PRIMARY DIRECTIVE. Before starting ANY task, you **MUST** reference and strictly adhere to the standards defined in the following files:

1.  [`core/ARCHITECTURE.md`](./core/ARCHITECTURE.md) - The High-Level Design & "Shell-Registry" Pattern.
2.  [`core/CODE.md`](./core/CODE.md) - The Strict Coding Standards & Naming Conventions.
3.  [`core/MODULES.md`](./core/MODULES.md) - The Modular Extension & Plugin Guide.
4.  [`core/THEME.md`](./core/THEME.md) - The Authoritative Guide for Theming & UI Development.

**VIOLATION OF THESE STANDARDS IS NOT PERMITTED.**

---

## 1. Core Project Description

The **Nexical Ecosystem** is NOT a traditional monolithic application. It is a **SaaS Operating System (Shell)** that hosts **Dynamic Plugins (Registry)**.

- **The Shell** (`apps/frontend/src/components/shell/`): This is the immutable kernel. It handles viewport responsiveness, layout physics, and "Zones" (empty slots). You **DO NOT** add business features here.
- **The Registry** (`apps/frontend/modules/{name}/src/registry/`): This is the "User Space." Every feature (Dashboard widget, User Profile link) is a standalone component that "pins" itself into a specific Zone in the Shell.

**The Golden Rule**: We utilize a **Modular Monolith** architecture. Features are developed in isolated `apps/backend/modules/` or `apps/frontend/modules/` directories but compiled into a single high-performance application.

---

## 2. Mandatory Architectural Standards

You must enforce the **Strict Separation of Concerns** as defined in `core/ARCHITECTURE.md`.

### The "Shell & Registry" Pattern

- **NEVER** hardcode feature links into the Shell.
- **ALWAYS** use the `RegistryLoader` to render content dynamically.
- **ALWAYS** follow the registry file naming convention: `{order}-{kebab-name}.tsx`.

### Core Isolation & Module Independence

- **Core Neutrality**: The Core (Shell) must **NEVER** contain information about, imports from, or references to specific installed modules. It is an agnostic host.
  - **The Agnostic Mandate**: The core platform must never know what modules are installed on the system.
  - **Integration Pattern**: If the core needs to know or interact with information from modules (e.g., config, routes, icons), it MUST implement generic **Module Loaders** or **Registries**.
- **Module Self-Containment**: Modules must be self-contained units of functionality.
- **Dependency Direction**:
  - Modules MAY import from Core (Shared components, Utils).
  - Modules MAY import from other Modules (if clearly defined).
  - **FORBIDDEN**: Circular dependencies between modules.

### The Modular API & SDK

- **Restricted**: Do **NOT** use `astro:actions` for core business logic.
- **Required**: Use the **Modular SDK** pattern (`api.{module}.{method}`) for all data access.
- **Protocol**:
  1.  **Define CRUD Contracts** in `apps/backend/modules/{name}/models.yaml` using the `role` configuration for automatic endpoint generation.
  2.  **Define Custom Operations** in `apps/backend/modules/{name}/api.yaml` for logic that falls outside standard CRUD.
  3.  **Generate** the SDK and API handlers using `nexical gen api {name}`.
  4.  Implement custom domain logic in manual `src/services/` or `src/actions/` files.
  5.  **Centralized SDK Mandate**: All SDK access (methods and types) MUST be routed through the centralized `api` object and `*ModuleTypes` namespaces in `@/lib/api`. Direct imports from module SDKs (e.g., `@modules/{name}/src/sdk`) are **FORBIDDEN**.

---

## 3. Strict Coding Standards

You must adhere to the hygiene rules in `core/CODE.md`.

### Imports & hygiene

- **FORBIDDEN**: **Strict Zero-Tolerance for the `any` type.** You MUST use specific interfaces, `unknown` with Zod validation, or proper generics. The use of `any` is a critical failure.
- **MANDATORY**: **ESLint Compliance.** All generated code MUST strictly adhere to the project's ESLint rules. You MUST proactively monitor tool feedback for linting errors and resolve them immediately.
- **FORBIDDEN**: Dynamic imports (`import(...)`). Use static named imports at the top of the file.
- **REQUIRED**: Named Imports (Aliases).
  - Use `@/` for `src/`.
  - Use `@modules/` for `apps/backend/modules/` or `apps/frontend/modules/`.
  - Use `@tests/` for `tests/`.

### Server Actions (Service Layer)

- Actions are **Gateways**, not Engines.
- **Validation**: Handled by generated API handlers (via `api.yaml`). Manual actions receive parsed input in the `run` method.
- **NEVER** put complex business logic (Prisma calls) inside an Action handler. Delegate to a `Service` class.

---

## 4. Module Development Standards

Refer to `core/MODULES.md` for building extensions.

- **Data Models**: Defined in `models.yaml` (Additive Schema). NEVER edit `schema.prisma` directly for module data.
- **Routing**: Use `src/pages` inside modules for "virtualized" routing.
- **Events**: Use `HookSystem.dispatch` and `HookSystem.on` for cross-module logic.
- **Styling**: Adhere strictly to [`core/THEME.md`](./core/THEME.md). Use `styles.css` with `@layer components` for module-specific styles.

---

## 5. Testing Protocols

You MUST follow the specific instructions for the type of test you are creating.

### Integration Tests

**Reference**: [`core/tests/integration/README.md`](./core/tests/integration/README.md)

- **Philosophy**: "Black Box" API testing + "White Box" Data Setup.
- **Tooling**: Use `ApiClient` to make HTTP requests against the running server.
- **Setup**: Use `Factory.create('model', ...)` to seed the DB directly. **DO NOT** use the API to create prerequisite data (it is slow and flaky).
- **Auth**: Use `.as('user', ...)` to handle authentication automatically.

### End-to-End (E2E) Tests

**Reference**: [`core/tests/e2e/README.md`](./core/tests/e2e/README.md)

- **Tooling**: Playwright.
- **Selectors**: **ALWAYS** use `data-testid` attributes (`page.getByTestId(...)`) for selecting elements. Do not rely on CSS classes or text content unless testing those specifically.
- **Pattern**: Use **Page Objects** for complex interactions.
- **Setup**: Use the `actor` fixture to create data and log in instantly (bypassing the login UI).

---

## Summary of Command

1.  **READ** the standards files (`core/ARCHITECTURE.md`, `core/CODE.md`, `core/MODULES.md`, `core/THEME.md`) before analyzing any request.
2.  **PLAN** your changes to be modular and additive.
3.  **EXECUTE** using the strict patterns (Aliased imports, Service Layer, Registry).
4.  **VERIFY** using the correct testing framework (Integration vs E2E) and following their specific patterns (`DataFactory`, `data-testid`).

**YOU ARE BUILDING A HIGH-QUALITY OPERATING SYSTEM. DO NOT CUT CORNERS.**

---

## 6. Skill Index

You have access to the following specialized skills. Use them to perform complex tasks correctly.

- **[analyze-domain](file:///home/adrian/Projects/nexical/app-starter/.agent/skills/analyze-domain/SKILL.md)**: Deconstructs a vague user request (e.g., "I want a referral system") into concrete entities, flows, and user stories within the Nexus Ecosystem.
- **[construct-agent](file:///home/adrian/Projects/nexical/app-starter/.agent/skills/construct-agent/SKILL.md)**: Expert guide for building Autonomous Agentic Modules using JobProcessor and PersistentAgent patterns.
- **[construct-api](file:///home/adrian/Projects/nexical/app-starter/.agent/skills/construct-api/SKILL.md)**: Expert guide for building API Modules, defining Endpoints, and following the flexible Endpoint-Service (CRUD) or Endpoint-Action-Service (Business Logic) flow.
- **[construct-ui](file:///home/adrian/Projects/nexical/app-starter/.agent/skills/construct-ui/SKILL.md)**: Expert guide for building UI Modules, Surface Interfaces, and Registry Components using the Shell & Registry pattern.
- **[design-data](file:///home/adrian/Projects/nexical/app-starter/.agent/skills/design-data/SKILL.md)**: Strict governance of the models.yaml (Distributed Schema) and api.yaml. Handles entity relationships, enums, Prisma attribute logic, and API contract definitions.
- **[ensure-security](file:///home/adrian/Projects/nexical/app-starter/.agent/skills/ensure-security/SKILL.md)**: Expert knowledge of the Security Model, Role-Based Access Control (RBAC), and Attribute-Based Access Control (ABAC).
- **[forge-agent](file:///home/adrian/Projects/nexical/app-starter/.agent/skills/forge-agent/SKILL.md)**: Specific knowledge of the JobProcessor and PersistentAgent classes. It understands the async queue system.
- **[implement-logic](file:///home/adrian/Projects/nexical/app-starter/.agent/skills/implement-logic/SKILL.md)**: Expert knowledge of the Service Layer, Business Logic, and Hook System. Enforces the Static Service pattern, Action pattern, Job Processors, and Providers.
- **[implement-registry](file:///home/adrian/Projects/nexical/app-starter/.agent/skills/implement-registry/SKILL.md)**: No description provided.
- **[manage-db](file:///home/adrian/Projects/nexical/app-starter/.agent/skills/manage-db/SKILL.md)**: Expert usage of the Database Compiler. Handles the additive Schema Ontology (models.yaml) and the Generated Prisma Client.
- **[map-system](file:///home/adrian/Projects/nexical/app-starter/.agent/skills/map-system/SKILL.md)**: Maintains the "Constitution." It updates the global PROJECT_MAP.md so the AI always knows the current state of the architecture.
- **[plan-feature](file:///home/adrian/Projects/nexical/app-starter/.agent/skills/plan-feature/SKILL.md)**: Determines the blast radius of a change and produces a file implementation checklist, respecting the API/UI module split and strict generation rules.
- **[scaffold-module](file:///home/adrian/Projects/nexical/app-starter/.agent/skills/scaffold-module/SKILL.md)**: Expert usage of the 'arc' CLI (or manual fallback) to generate correctly structured modules within the Nexus Ecosystem.
- **[validate-schema](file:///home/adrian/Projects/nexical/app-starter/.agent/skills/validate-schema/SKILL.md)**: Ensures that changes to models.yaml are valid Prisma syntax, DTO compliant, and don't break architectural contracts.
- **[verify-quality](file:///home/adrian/Projects/nexical/app-starter/.agent/skills/verify-quality/SKILL.md)**: Expert strategy for Testing. Defines the strict "White Box Setup / Black Box Execution" protocol.

