# Etapa base #Dockerfile
# --------------------------------------------------------------------------------------
FROM node:20-slim AS base
# Configuración de entorno para pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
# Copiamos todos los archivos del proyecto
COPY . /app
WORKDIR /app
#  Etapa de dependencias de producción
# --------------------------------------------------------------------------------------
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile
# Etapa de construcción (si el backend tuviera build)
# --------------------------------------------------------------------------------------
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
# Imagen final
# --------------------------------------------------------------------------------------
FROM base
# Copiamos solo las dependencias necesarias
COPY --from=prod-deps /app/node_modules /app/node_modules
# Si el backend genera un /dist, también se copiaría:
# COPY --from=build /app/dist /app/dist
COPY . .
# Exponemos el puerto del backend
EXPOSE 4000
# Comando para iniciar el servidor
CMD ["pnpm", "start"]