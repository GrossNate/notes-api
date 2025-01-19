CREATE TABLE notes (
  id bigint GENERATED ALWAYS AS IDENTITY,
  username text NOT NULL,
  content text,
  created_timestamp timestamp DEFAULT current_timestamp);