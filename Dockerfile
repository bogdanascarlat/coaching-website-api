FROM node:16-slim

COPY --chown=node:node . /opt/backend
WORKDIR /opt/backend

# Update apt packages
RUN runDeps="patch git" \
  && apt-get update \
  && apt-get install -y --no-install-recommends $runDeps \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* \+

USER node

ARG MAX_OLD_SPACE_SIZE=8192
ENV NODE_OPTIONS=--max_old_space_size=$MAX_OLD_SPACE_SIZE

RUN cd /opt/backend \
  && npm install \
  && rm -rf /home/node/.cache

EXPOSE 8080

ENTRYPOINT ["/opt/backend/entrypoint.sh"]
CMD ["npm", "start"]