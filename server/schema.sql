-- BridgeEd Database Schema
-- Run this once in your Neon SQL Editor to create all tables

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'Fresher',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mentors table
CREATE TABLE IF NOT EXISTS mentors (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  faculty TEXT,
  university TEXT,
  subjects TEXT,
  rating NUMERIC DEFAULT 5.0,
  avatar TEXT DEFAULT 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed some default mentors
INSERT INTO mentors (name, faculty, university, subjects, rating, avatar) VALUES
  ('Kasun Perera', 'Engineering', 'University of Moratuwa', 'Mathematics, Physics', 4.9, 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop'),
  ('Amandi Silva', 'Medicine', 'University of Colombo', 'Biology, Chemistry', 5.0, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'),
  ('Dilshan Fernando', 'IT', 'UCSC', 'Programming, Data Structures', 4.8, 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop'),
  ('Nethmi Rajapaksha', 'Science', 'University of Peradeniya', 'Statistics, Chemistry', 4.7, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop')
ON CONFLICT DO NOTHING;

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  sender_name TEXT NOT NULL,
  receiver_name TEXT NOT NULL,
  content TEXT NOT NULL,
  reply TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quiz results table
CREATE TABLE IF NOT EXISTS quiz_results (
  id SERIAL PRIMARY KEY,
  user_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Community posts table
CREATE TABLE IF NOT EXISTS community_posts (
  id SERIAL PRIMARY KEY,
  author_name TEXT NOT NULL,
  author_email TEXT,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
