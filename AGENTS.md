# El Reino del Flexiahorro

## Workflow Rule
**Never write code without a plan.** Before any implementation:
1. Call `read_knowledge_base` with no arguments to load the full knowledge base.
2. Update `.knowledge/` files to reflect the design intent via `write_knowledge_file`.
3. Call `write_plan` to record the implementation plan in `PLAN.md`.
Only then write code — in the order defined in `PLAN.md`.

## Observability Gate
Every feature must have logging, tracing, and metrics defined in `.knowledge/conventions.md ## Observability` before coding starts.

## Environment Rule
Always use Docker for services, databases, and tools — never install software directly on the host.

## Build & Verify
- `<add build command>`
- `<add verify command>`

## Purpose
<fill in project purpose — see .knowledge/architecture.md>

## Key Constraints
- <fill in from .knowledge/architecture.md ## Constraints>
- <fill in from .knowledge/conventions.md ## Constraints>
