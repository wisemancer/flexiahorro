# PLAN.md — El Reino del Flexiahorro
## Milestone 1: Frontend, Lógica de Negocio e Interacción con el Cliente

**Alcance de esta sesión**: Frontend (PWA), modelo de dominio, flujos de usuario, y experiencia de cliente. El backend completo (base de datos, infraestructura, APIs) se define en sesión técnica posterior.

---

## Contexto

El Reino del Flexiahorro es una plataforma B2B2C white-label gamificada. Las entidades financieras (tenants) adquieren pools de Chocopuntos y los distribuyen a sus usuarios como incentivo de ahorro. Los usuarios los gastan en microjuegos, promociones y torneos dentro de la app.

Stack confirmado: PWA standalone + .NET/ASP.NET Core (C#). Mercado inicial: Ecuador.

---

## Fases del Milestone 1

### Fase 1: Modelo de Dominio y Reglas de Negocio

**Objetivo**: Tener claro el modelo de datos del negocio antes de cualquier pantalla.

- [ ] Definir el modelo completo de `Tenant` (configuración, branding, pool de Chocopuntos)
- [ ] Definir el modelo de `Usuario` (perfil público de jugador, wallet, estado)
- [ ] Definir el modelo de `Wallet` (estados: disponible, bloqueado, cancelado, gastado)
- [ ] Definir la lógica de distribución de Chocopuntos por tenant
- [ ] Definir el catálogo de Promociones / Items / Torneos con precios en Chocopuntos
- [ ] Definir la lógica de conversión dólares → Chocopuntos (B2B, por contrato)
- [ ] Documentar reglas del pool: techo por tenant, límite por usuario

### Fase 2: Arquitectura de la PWA

**Objetivo**: Definir la estructura técnica del frontend antes de construirlo.

- [ ] Seleccionar framework frontend (React, Angular, Blazor WASM — a discutir)
- [ ] Configurar PWA con manifest.json para modo standalone (borderless)
- [ ] Definir estrategia de autenticación (SSO con entidad financiera / token del tenant)
- [ ] Definir estructura de rutas y módulos de la app
- [ ] Definir sistema de theming multi-tenant (branding dinámico por tenant)
- [ ] Definir estrategia de manejo de estado del cliente (wallet, sesión, juego)

### Fase 3: Flujos de Usuario Principales

**Objetivo**: Implementar los flujos core que definen la propuesta de valor.

#### 3.1 — Onboarding y Activación
- [ ] Pantalla de bienvenida con narrativa del reino (primer ingreso)
- [ ] Activación del ahorro programado (Season Pass)
- [ ] Animación de apertura de cofre + lluvia de Chocopuntos (primer depósito)
- [ ] Ruleta de bienvenida (multiplicador + semilla mágica)

#### 3.2 — Dashboard del Reino
- [ ] Vista del castillo/reino con estado actual del usuario
- [ ] Balance de Chocopuntos (disponible vs bloqueado)
- [ ] Indicador de racha de ahorro
- [ ] Acceso a microjuegos

#### 3.3 — Wallet y Transacciones
- [ ] Vista del wallet con historial de transacciones (timestamps visibles)
- [ ] Estado visual diferenciado: disponible / bloqueado / gastado
- [ ] Mensaje amigable para Chocopuntos bloqueados
- [ ] Notificación al confirmar/rechazar por operador

#### 3.4 — Hibernación y Despertar
- [ ] Animación de hibernación al detectar retiro de fondos
- [ ] Vista del reino "dormido" con call-to-action para despertar
- [ ] Animación de despertar al próximo depósito

#### 3.5 — Microjuegos (MVP)
- [ ] Juego de construcción de castillo (usa Chocopuntos para acelerar)
- [ ] Tienda de skins para avatar
- [ ] Torneo semanal PvP con pozo acumulado de Chocopuntos

### Fase 4: Sistema de Logging y Observabilidad (Frontend)

**Objetivo**: Todos los eventos de interacción generan logs estructurados.

- [ ] Implementar cliente de logging con timestamp UTC en todos los eventos
- [ ] Eventos obligatorios: activación ahorro, canje de puntos, inicio de juego, retiro, hibernación, despertar, errores
- [ ] Integrar con servicio de logging (por definir en sesión de backend)

### Fase 5: Multi-Tenant y Branding

**Objetivo**: La app se adapta visualmente y funcionalmente según el tenant.

- [ ] Sistema de carga de configuración de tenant al iniciar sesión
- [ ] Theming dinámico (colores, logo, nombre) por tenant
- [ ] Reglas de distribución de Chocopuntos configurables por tenant
- [ ] Límite de pool por tenant aplicado en cliente y validado en backend

---

## Decisiones Pendientes (próxima sesión)

- Framework frontend específico (React / Angular / Blazor WASM)
- Estrategia de autenticación multi-tenant
- Backend: base de datos, infraestructura, APIs, panel de administración
- Lógica detallada de conversión dólares → Chocopuntos
- Estrategia de despliegue (cloud provider, CI/CD)

---

## Restricciones Activas

- No escribir código de backend hasta sesión técnica específica
- No implementar panel de administración en este milestone
- Todo error al usuario debe ser mensaje amigable en lenguaje del juego
- El progreso del juego nunca se destruye, solo hiberna
- Los Chocopuntos bloqueados son visibles pero no usables hasta confirmación de operador
