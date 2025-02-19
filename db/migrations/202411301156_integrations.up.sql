BEGIN;

CREATE TABLE integrations (
    id BIGSERIAL PRIMARY KEY,
    uuid UUID DEFAULT gen_random_uuid () NOT NULL UNIQUE,
    user_id BIGINT NOT NULL,
    integration_name TEXT NOT NULL,
    data JSONB NOT NULL DEFAULT '{}'::jsonb,
    FOREIGN KEY (user_id) REFERENCES users (id),
    UNIQUE(user_id, integration_name)
);

CREATE INDEX integrations_user_idx ON integrations USING btree(user_id);

COMMIT;