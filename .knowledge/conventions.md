---
module: conventions
updated: 2026-05-15
files: [src/**/*.cs, src/**/*.tsx, src/**/*.ts]
---

## Purpose
Estándares y patrones para El Reino del Flexiahorro. Aplican a todos los archivos fuente y son no negociables.

## Agent Workflow
- **Knowledge-first — sin código sin plan**: Antes de escribir código, actualizar los archivos `.knowledge/` y llamar `write_plan` para producir `PLAN.md`.
- **Base de conocimiento primero**: Durante planificación e implementación, leer archivos `.knowledge/` vía `read_knowledge_base` y `search_knowledge`.
- **Observabilidad es no negociable**: Cada feature debe definir su cobertura de logging y métricas en `.knowledge/` antes de comenzar implementación.

## Observabilidad

### Logging
- **Formato**: JSON estructurado con timestamp ISO 8601 obligatorio en todos los registros
- **Destino**: stderr / servicio externo (por definir en sesión técnica posterior)
- **Eventos que siempre se registran**:
  - Activación de ahorro programado
  - Asignación de Chocopuntos (exitosa / bloqueada)
  - Retiro de fondos y transición a hibernación
  - Despertar de reino (nuevo depósito)
  - Canje de Chocopuntos en promoción o torneo
  - Inicio y cierre de sesión de usuario
  - Cualquier error del sistema (con stack trace)
- **Propósito**: los logs son input directo para decisiones de producto — nuevas features, segmentación y retención de usuarios

### Timestamps
- Todos los eventos tienen timestamp con zona horaria UTC
- Los timestamps permiten análisis de comportamiento y segmentación de usuarios por patrones temporales

### Métricas (orientadas a producto)
- Tasa de retención de rachas de ahorro
- Ratio de usuarios que regresan tras hibernación
- Volumen de Chocopuntos bloqueados vs disponibles por tenant
- Distribución de Chocopuntos por tipo de evento
- Engagement por microjuego (tiempo jugado, puntos gastados, torneos completados)
- Conversión de usuario nuevo → primer depósito

### Tracing
- Por definir en sesión técnica de backend

### Error Reporting
- Todos los errores se muestran al usuario con mensajes amigables en español
- Nunca se exponen errores técnicos, stack traces, ni mensajes de sistema al usuario final
- Los errores internos de sincronización entre tenants se resuelven silenciosamente
- Panel de administración para operadores: fase posterior

## Manejo de Errores

### Contrato general
- Los errores se traducen siempre a mensajes amigables antes de llegar al usuario
- Capa de presentación no maneja lógica de error — solo muestra el mensaje recibido del sistema
- Errores de pago: Chocopuntos pasan a estado `bloqueado` (visibles pero no usables) con mensaje contextual

### Estados de Chocopuntos
- `disponible`: acreditados y usables
- `bloqueado`: pendiente de confirmación de operador (visible en wallet, no usable)
- `cancelado`: operación rechazada por operador (notificación amigable al usuario)
- `gastado`: canjeado en juego o promoción

### Mensajes de error al usuario
- Usar lenguaje narrativo del juego: "Tu cofre está esperando confirmación", "Tus soldados están descansando"
- Nunca usar terminología técnica o bancaria fría en mensajes al usuario final
- Siempre incluir una acción esperada o mensaje de esperanza ("volverán cuando...")

## Restricciones del Sistema

- **Nunca** circulan dólares dentro de la app — solo Chocopuntos
- **Nunca** un tenant puede acceder a datos financieros de otro tenant
- **Nunca** los Chocopuntos bloqueados pueden ser usados hasta confirmación de operador
- **Nunca** el progreso del juego se destruye por un retiro — solo entra en hibernación
- **Nunca** se muestran errores técnicos al usuario final
- Un tenant no puede distribuir más Chocopuntos de los que tiene en su pool adquirido

## Patrones de Diseño

### UI Optimista con bloqueo
Al ocurrir un pago no confirmado: mostrar los Chocopuntos como visibles en el wallet (UI optimista) pero con estado `bloqueado`. Esto evita la sensación de pérdida mientras se resuelve el conflicto.

### Hibernación sobre destrucción
Cuando el usuario retira fondos, el progreso del juego nunca se destruye — entra en hibernación con animación suspendida. El retorno se incentiva mostrando el estado "dormido" del reino.

### Traducción emocional
El lenguaje financiero (depósito, retiro, penalización, saldo) siempre se traduce al lenguaje del juego (aporte al reino, oro, hibernación, tesoro). Esta traducción es obligatoria en toda la UI.

## Convenciones de Código

### Backend (.NET / C#)
- Por definir en sesión técnica posterior

### Frontend (PWA)
- Por definir en sesión técnica posterior
- La app debe funcionar en modo standalone (sin barra del navegador)
- Responsive first: diseñar para móvil, escalar a desktop
