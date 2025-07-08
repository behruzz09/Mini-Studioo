/*
  # Create designs table for storing generated designs

  1. New Tables
    - `designs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `business_name` (text)
      - `logo_url` (text)
      - `slogan` (text)
      - `video_url` (text, nullable)
      - `merchandise_urls` (text array)
      - `design_type` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `designs` table
    - Add policies for users to read their own designs
    - Add policies for admins to read all designs
*/

CREATE TABLE IF NOT EXISTS designs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  business_name text NOT NULL,
  logo_url text,
  slogan text,
  video_url text,
  merchandise_urls text[] DEFAULT '{}',
  design_type text DEFAULT 'logo' CHECK (design_type IN ('logo', 'video', 'merchandise')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE designs ENABLE ROW LEVEL SECURITY;

-- Users can read their own designs
CREATE POLICY "Users can read own designs"
  ON designs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can create their own designs
CREATE POLICY "Users can create own designs"
  ON designs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own designs
CREATE POLICY "Users can update own designs"
  ON designs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can delete their own designs
CREATE POLICY "Users can delete own designs"
  ON designs
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Admins can read all designs
CREATE POLICY "Admins can read all designs"
  ON designs
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );