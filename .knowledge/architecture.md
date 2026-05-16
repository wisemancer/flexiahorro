# Arquitectura — El Reino del Flexiahorro

## Visión General

Plataforma gamificada de fidelización financiera, modelo **B2B2C white-label**. La empresa vende Chocopuntos a entidades financieras; las entidades los distribuyen a sus usuarios como mecanismo de incentivo; los usuarios los gastan dentro de la app en juegos y promociones.

El dinero real nunca circula dentro de la app. Los dólares solo intervienen en la compra de pools de Chocopuntos (relación B2B). Regulatoriamente, la plataforma opera como vendedor de producto digital, no como entidad financiera.

---

## Modelo de Negocio

```
[Empresa] --vende pools de Chocopuntos--> [Entidad Financiera / Tenant]
[Entidad Financiera]  --distribuye Chocopuntos--> [Usuarios del banco]
[Usuarios] --gastan Chocopuntos--> [Juegos / Promociones / Torneos]
```

- Cada entidad financiera adquiere un pool de Chocopuntos por contrato B2B.
- El pool define el techo de puntos que los usuarios de esa entidad pueden acumular.
- Los criterios de distribución los configura cada entidad en su tenant.

---

## Arquitectura Multi-Tenant

Cada entidad financiera es un tenant con configuración independiente:

- **Branding**: logo, colores, nombre
- **Pool de Chocopuntos**: límite adquirido por contrato
- **Reglas de distribución**: cómo y cuándo se asignan puntos
- **Integración de pagos**: API del botón de pagos propio
- **Usuarios**: aislados financieramente

**Aislamiento de datos:**
- Datos bancarios/financieros: completamente aislados por tenant.
- Perfiles de jugador: públicos y cross-tenant (los usuarios interactúan entre sí sin importar el banco).

---

## Stack Tecnológico

- **Frontend**: PWA con modo standalone (instalable en cualquier dispositivo sin app store, responsive)
- **Backend**: .NET / ASP.NET Core con C# (robusto, seguro, estándar en sector bancario)
- **Base de datos**: por definir en sesión técnica posterior
- **Infraestructura**: por definir en sesión técnica posterior

---

## Entidades Clave del Dominio

**Tenant**: entidad financiera con branding, pool de Chocopuntos y configuración propia.

**Usuario**: pertenece a un tenant; tiene perfil público de jugador cross-tenant y wallet de Chocopuntos.

**Wallet**: balance disponible, balance bloqueado (pendiente de confirmación de operador), historial de transacciones con timestamps.

**Chocopuntos**: única moneda de la app. Adquiridos por entidades (B2B), distribuidos a usuarios según reglas del tenant, canjeables en juegos y promociones.

**Promoción / Item / Torneo**: precio expresado en Chocopuntos. La empresa define el catálogo; los tenants activan o desactivan ítems.

---

## Mercado Inicial

- **País**: Ecuador — regulación Superintendencia de Bancos (SB)
- **Marco regulatorio**: opera como plataforma de producto digital (no maneja dinero real internamente)
- **Visión global**: arquitectura multi-tenant diseñada para expansión regional y multi-moneda en capa B2B

---

## Flujos Críticos

### Adquisición de Chocopuntos
1. Evento en entidad financiera (ej: depósito de ahorro confirmado)
2. Entidad llama API del tenant solicitando asignación de puntos
3. Sistema verifica disponibilidad en el pool del tenant
4. Si hay disponibilidad y pago confirmado: Chocopuntos en wallet con estado `disponible`
5. Si el pago no está confirmado: Chocopuntos con estado `bloqueado` + mensaje amigable al usuario

### Retiro / Hibernación
1. Usuario retira dinero real desde su entidad financiera
2. La entidad notifica a la plataforma
3. El progreso del juego entra en estado `hibernacion` (no se destruye)
4. Al próximo depósito, el reino despierta automáticamente

### Resolución de Conflictos (Pagos Bloqueados)
1. Chocopuntos bloqueados: visibles en wallet pero no utilizables
2. Operador revisa y confirma o rechaza manualmente (panel de admin — fase posterior)
3. Confirmado: estado pasa a `disponible`
4. Rechazado: estado pasa a `cancelado` + notificación amigable al usuario
