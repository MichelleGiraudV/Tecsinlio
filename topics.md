# Ideas de temas (el modo --weekly las prioriza)

## Prioridad 1 (van primero)
- npm run build vs npm run dev — reel — "dev = cocina de prueba, build = plato empaquetado para servir" (hecho: r05)
- MCP vs API — carrusel — "API = un enchufe; MCP = un enchufe universal para que la IA use herramientas" (hecho: c10)
- Kubernetes (muy for dummies) — reel — "Docker = un contenedor; Kubernetes = el capitán del puerto que los organiza"
- WebSockets — carrusel — "HTTP = mandar cartas; WebSocket = llamada telefónica abierta"
- API vs SDK — estático — "API = el menú; SDK = el kit con utensilios para pedir más fácil" (hecho: e08)
- NotebookLM — reel — "tu cuaderno con IA que solo responde con TUS documentos"

## Pendientes
- Variables de entorno y archivos .env (hecho: c08)
- .dockerignore: qué es y por qué acelera el build (hecho: e06)
- Puertos en Docker: -p 3000:3000 (hecho: s03)
- Multi-stage builds (hecho: c09)
- git stash (hecho: e07)
- Secrets en GitHub Actions (hecho: s04)
- Cache en GitHub Actions
- Qué es una API REST
- Qué es serverless
- AI Skills: enseñar capacidades concretas a agentes de IA.
- Qué es Github 
- Github vs Gitlab
- Qué es PR
- Gitflow

## AI y desarollo moderno 
- MCP (Model Context Protocol).
- Qué son los AI Agents.
- RAG: conectar una IA con tus propios documentos.
- Vector databases.
- Embeddings: cómo una IA convierte texto en números.
- Function Calling.
- Prompt injection.
- Context windows: límites de memoria de los modelos.
- AI coding agents vs copilots.
- Qué es un archivo AGENTS.md.
- Qué son los MCP Servers.
- Cómo funcionan los sistemas de memoria de los agentes.
- Evaluación automática de respuestas de IA.
- Qué es un LLM Gateway.

## Docker
- Que es Docker?
- Docker vs máquina virtual: en qué se diferencian
- Por qué no usar la etiqueta :latest en producción (hecho: s05)
- docker logs y docker exec: cómo mirar dentro de un contenedor
- Healthchecks: cómo sabe Docker que tu app está viva
- Docker volumes: dónde se guardan realmente los datos.
- Docker networks: cómo se comunican los contenedores.
- Docker Compose: levantar varios servicios a la vez.
- Docker healthchecks: cómo saber si un contenedor funciona.
- Docker ENTRYPOINT vs CMD.
- Docker bind mounts vs volumes.
- Docker build context: qué archivos se envían al construir una imagen.
- Docker layer caching: cómo acelerar builds.
- Docker networking: localhost dentro de un contenedor.
- Distroless images: contenedores sin herramientas innecesarias.

## Git
- .gitignore: qué no subir nunca al repo
- Cómo escribir un buen mensaje de commit
- git revert vs git reset
- Resolver un conflicto de merge paso a paso
- Ramas típicas: main, feature y hotfix
- git cherry-pick: traer commits específicos.
- git rebase vs git merge.
- git reset vs git revert.
- git reflog: recuperar commits aparentemente perdidos.
- git bisect: encontrar qué commit introdujo un bug.
- git worktree: trabajar con varias ramas a la vez.
- Git hooks: automatizar tareas antes de un commit.
- Conventional Commits: estandarizar mensajes.
- CODEOWNERS: asignar responsables automáticamente.
- GitHub Dependabot: actualizar dependencias automáticamente.

## CI/CD
- Cuándo se ejecuta un workflow: push, pull_request y workflow_dispatch
- Tests automáticos: unitarios vs de integración
- Matrix en GitHub Actions: probar en varias versiones a la vez
- Renovate / Dependabot: actualizar dependencias sin hacerlo a mano
- Entornos dev, staging y prod
- Qué es un pipeline CI/CD.
- Cache en GitHub Actions.
- Artifacts en GitHub Actions.
- GitHub Actions: needs vs dependencies.
- Qué son los runners self-hosted.
- Variables vs secrets en CI/CD.
- Blue-Green Deployment.
- Canary Deployments.
- Rollback automático de aplicaciones.
- Infrastructure as Code (Terraform).
- Qué es un reverse proxy.
- Qué es un load balancer.
- Nginx vs Apache.
- Qué es un health check.
- Cómo funciona el DNS en producción.

## Backend and API
- Backend y APIs
- REST vs GraphQL.
- WebSockets vs HTTP.
- Qué es un webhook.
- Rate limiting: limitar peticiones a una API.
- API Gateway: para qué sirve.
- JWT: cómo funcionan los tokens.
- Refresh tokens vs access tokens.
- CORS: por qué el navegador bloquea peticiones.
- Middleware: qué ocurre antes de llegar a una ruta.
- Idempotencia en APIs.
- Pagination: offset vs cursor.
- HTTP status codes que pocos conocen.
- Qué es gRPC.

## Base de datos 
- Índices en SQL: por qué aceleran las consultas.
- N+1 Query Problem.
- Database migrations.
- Database transactions: COMMIT y ROLLBACK.
- ACID: qué significa realmente.
- SQL JOIN vs UNION.
- Redis: cuándo utilizar una base de datos en memoria.
- Database connection pooling.
- Replicación vs sharding.
- Soft deletes: eliminar sin borrar realmente.
- Optimistic vs pessimistic locking.
- Database seeding

## Cloud
- Qué es Cloud Run
- Escalar a cero: pagar solo cuando hay tráfico
- Artifact Registry vs Docker Hub
- Desplegar sin claves: Workload Identity Federation
- Dónde ver los logs de tu app en la nube
- Qué es Infrastructure as Code
- Monolito vs microservicios
- Event-driven architecture
- Message queues: RabbitMQ vs Kafka
- Qué es un cron job
- Cold starts en serverless
- Qué es Kubernetes
- Qué es autoscaling
- Qué es observability
- Logs vs metrics vs traces

## Seguridad y herramientas de desarrollo 
- Qué es OAuth 2.0.
- Qué es OpenID Connect.
- SSH Keys: cómo funcionan.
- TLS/SSL: cómo se protege una conexión HTTPS.
- Hashing vs encryption.
- Qué es un vulnerability scanner.
- SAST vs DAST.
- Dependabot vs Renovate.
- Software Supply Chain Security.
- SBOM: inventario de componentes de software.
- Qué es un secret leak.
- Qué es Zero Trust.

## Humor
- Meme: "en staging funcionaba"
- Meme: tu primer conflicto de merge
