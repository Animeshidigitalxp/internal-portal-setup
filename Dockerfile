# Stage 1: Install dependencies and build the project
FROM node:20-slim AS builder

ENV PNPM_HOME="/pnpm"  
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && corepack prepare pnpm@9.13.2 --activate

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to install dependencies
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including dev for the build)
RUN node --max-old-space-size=8192 $(which pnpm) install --frozen-lockfile --ignore-scripts


# Copy the rest of the application code and build it
COPY src ./src
COPY config.json ./
COPY eslint.config.mjs ./
COPY next.config.ts ./
COPY postcss.config.mjs ./
COPY tsconfig.json ./
RUN pnpm build

# Stage 2: Run the app in a production environment
FROM node:20-slim AS runtime

ENV PNPM_HOME="/pnpm"  
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && corepack prepare pnpm@latest --activate && \
	useradd -m nodeuser && mkdir -p /app && chown -R nodeuser:nodeuser /app

# Switch to non-root user immediately
USER nodeuser

# Set working directory
WORKDIR /app
# Copy only the built application and necessary dependencies from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/config.json ./config.json
COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# Set environment to production and run the Next.js app in production mode
ENV NODE_ENV=production
CMD ["pnpm", "start", "--keepAliveTimeout", "65000"]