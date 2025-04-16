-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE users 
ADD COLUMN embedding vector(1024); 



ALTER TABLE restaurant_embeddings 
ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();


ALTER TABLE user_preference_embeddings
ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();


ALTER TABLE restaurants_suggestions
ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();


-- Create embeddings table
CREATE TABLE restaurant_embeddings (
  id SERIAL PRIMARY KEY,
  restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
  embedding VECTOR(1024), 
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user preference embeddings table
CREATE TABLE user_preference_embeddings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  embedding VECTOR(1024), -- adjust dimension based on your embedding model
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create restaurant suggestion table
CREATE TABLE restaurants_suggestions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
  similarity_score FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);