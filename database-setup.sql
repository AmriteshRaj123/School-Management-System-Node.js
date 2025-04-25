-- Create database
CREATE DATABASE IF NOT EXISTS school_management;
USE school_management;

-- Create schools table
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);

-- Add sample data
INSERT INTO schools (name, address, latitude, longitude) VALUES
('Central High School', '123 Main St, City Center', 40.7128, -74.0060),
('Westside Elementary', '456 Park Ave, West District', 40.7300, -74.0200),
('Eastside Middle School', '789 Broadway, East District', 40.7000, -73.9800),
('North County Academy', '101 North Rd, North District', 40.7500, -74.0100),
('South Bay School', '202 South St, South District', 40.6900, -74.0000);
