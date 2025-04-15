-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;


ALTER TABLE users 
ADD COLUMN embedding vector(1024); 