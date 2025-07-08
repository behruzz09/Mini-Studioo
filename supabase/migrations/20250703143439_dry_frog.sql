/*
  # Create support tickets table for customer support

  1. New Tables
    - `support_tickets`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `email` (text)
      - `message` (text)
      - `status` (text, default 'open')
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `support_tickets` table
    - Add policies for users to read their own tickets
    - Add policies for admins to read all tickets
*/

CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  email text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

-- Users can read their own tickets
CREATE POLICY "Users can read own tickets"
  ON support_tickets
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can create tickets
CREATE POLICY "Users can create tickets"
  ON support_tickets
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Anyone can create tickets (for non-authenticated users)
CREATE POLICY "Anyone can create tickets"
  ON support_tickets
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Admins can read and update all tickets
CREATE POLICY "Admins can manage all tickets"
  ON support_tickets
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );