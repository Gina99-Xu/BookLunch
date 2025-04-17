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



-- Create a function to find similar restaurants based on embedding similarity
CREATE OR REPLACE FUNCTION match_restaurants(
  query_embedding VECTOR(384), -- adjust dimension based on your model
  match_threshold FLOAT,
  match_count INT
)
RETURNS TABLE (
  id INT,
  name TEXT,
  cuisine TEXT,
  country TEXT,
  city TEXT,
  regularPrice INT,
  description TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    r.id,
    r.name,
    r.cuisine,
    r.country,
    r.city,
    r.regularPrice,
    r.description,
    1 - (re.embedding <=> query_embedding) AS similarity
  FROM
    restaurants r
  JOIN
    restaurant_embeddings re ON r.id = re.restaurant_id
  WHERE
    1 - (re.embedding <=> query_embedding) > match_threshold
  ORDER BY
    similarity DESC
  LIMIT match_count;
END;
$$;



-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE users 
ADD COLUMN embedding vector(768); 

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
  embedding VECTOR(768), 
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user preference embeddings table
CREATE TABLE user_preference_embeddings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  embedding VECTOR(768), -- adjust dimension based on your embedding model
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



-- Create a function to find similar restaurants based on embedding similarity
CREATE OR REPLACE FUNCTION match_restaurants(
  query_embedding VECTOR(768),
  match_threshold FLOAT,
  match_count INT
)
RETURNS TABLE (
  id BIGINT,
  name character varying,
  cuisine character varying,
  country character varying,
  city character varying,
  "regularPrice" SMALLINT,
  description character varying,
  image character varying,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    r.id,
    r.name::character varying,
    r.cuisine::character varying,
    r.country::character varying,
    r.city::character varying,
    r."regularPrice"::SMALLINT,
    r.description::character varying,
    r.image::character varying,
    1 - (re.embedding <=> query_embedding) AS similarity
  FROM
    restaurants r
  JOIN
    restaurant_embeddings re ON r.id = re.restaurant_id
  WHERE
    1 - (re.embedding <=> query_embedding) > match_threshold
  ORDER BY
    similarity DESC
  LIMIT match_count;
END;
$$;

