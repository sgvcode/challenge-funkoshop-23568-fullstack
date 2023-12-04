-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql-sgvero.alwaysdata.net
-- Generation Time: Dec 03, 2023 at 08:53 PM
-- Server version: 10.6.14-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sgvero_funkoshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(60) NOT NULL,
  `product_description` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `sku` varchar(30) NOT NULL,
  `dues` int(11) DEFAULT NULL,
  `image_front` varchar(200) DEFAULT NULL,
  `image_back` varchar(200) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `licence_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_description`, `price`, `stock`, `discount`, `sku`, `dues`, `image_front`, `image_back`, `create_time`, `licence_id`, `category_id`) VALUES
(1, 'Baby Yoda Blueball', 'Figura coleccionable de Baby Yoda (Grogu) - The Mandalorian Saga, edición limitada.', 1799.99, 8, 10, 'STW001001', 3, 'star-wars/baby-yoda-1.webp', 'star-wars/baby-yoda-box.webp', '2023-10-06 19:29:04', 2, 1),
(2, 'Luke Skylwalker & Grogu', 'Figura coleccionable de Luke Skylwalker & Grogu - The Mandalorian Saga.', 2399.99, 8, 10, 'STW001003', 3, 'star-wars/luke-1.webp', 'star-wars/luke-box.webp', '2023-10-06 19:29:04', 2, 1),
(3, 'Stormtrooper Lightsaber', 'Figura coleccionable de Stormtrooper Lightsaber - Star Wars Saga.', 1799.99, 8, 10, 'STW001004', 3, 'star-wars/trooper-1.webp', 'star-wars/trooper-box.webp', '2023-10-06 19:29:04', 2, 1),
(4, 'Charmander Smiley', 'Figura coleccionable de Charmander - Pokemon Saga.', 1799.99, 8, 10, 'PKM001001', 3, 'pokemon/charmander-1.webp', 'pokemon/charmander-box.webp', '2023-10-06 19:29:04', 1, 1),
(5, 'Dragonite Hi!', 'Figura coleccionable de Dragonite - Pokemon Saga.', 1799.99, 8, 10, 'PKM001002', 3, 'pokemon/dragonite-1.webp', 'pokemon/dragonite-box.webp', '2023-10-06 19:29:04', 1, 1),
(6, 'Pidgeotto Flying', 'Figura coleccionable de Pidgeotto - Pokemon Saga.', 1799.99, 8, 10, 'PKM00103', 3, 'pokemon/pidgeotto-1.webp', 'pokemon/pidgeotto-box.webp', '2023-10-06 19:29:04', 1, 1),
(7, 'Pikachu Smiley', 'Figura coleccionable de Pikachu - Pokemon Saga.', 1799.99, 8, 10, 'PKM001004', 3, 'pokemon/pikachu-1.webp', 'pokemon/pikachu-box.webp', '2023-10-06 19:29:04', 1, 1),
(8, 'Vulpix Fancy', 'Figura coleccionable de Vulpix - Pokemon Saga.', 1799.99, 8, 10, 'PKM001005', 3, 'pokemon/vulpix-1.webp', 'pokemon/vulpix-box.webp', '2023-10-06 19:29:04', 1, 1),
(9, 'Harry Potter & Hegwid', 'Figura coleccionable de Harry Potter & Hegwid - Harry Potter Saga.', 1799.99, 11, 10, 'HPT001001', 9, 'harry-potter/harry-1.webp', 'harry-potter/harry-box.webp', '2023-10-06 19:29:04', 3, 1),
(10, 'Herminione Ball Dress', 'Figura coleccionable de Herminione - Harry Potter Saga.', 1799.99, 8, 10, 'HPT001002', 3, 'harry-potter/hermione-1.webp', 'harry-potter/hermione-box.webp', '2023-10-06 19:29:04', 3, 1),
(11, 'Luna Lovegood Lion Mask', 'Figura coleccionable de Luna Lovegood - Harry Potter Saga.', 1799.99, 8, 10, 'HPT001003', 3, 'harry-potter/luna-1.webp', 'harry-potter/luna-box.webp', '2023-10-06 19:29:04', 3, 1),
(12, 'Snape Patronus', 'Figura coleccionable de Snape Patronus - Harry Potter Saga.', 1799.99, 13, 10, 'HPT001004', 3, 'harry-potter/snape-patronus-1.webp', 'harry-potter/snape-patronus-box.webp', '2023-10-06 19:29:04', 3, 1),
(13, 'Hatake Kahashi con Rayo', 'Figura coleccionable de Hatake Kahashi Shippuden con Rayo', 1799.00, 10, 12, 'NAR001001', 6, '/1694066023151-nr-cover-1.png', '/1694066023182-nr-cover-box.png', '2023-10-18 20:21:42', 4, 1),
(14, 'Uzumaki con Ramel', 'Figura coleccionable de Uzuamaki con Ramel', 29990.00, 1, 12, 'NAR001002', 0, '/1701631450487-uzumaki-1.webp', '/1701631450503-uzumaki-box.webp', '2023-12-03 19:24:12', 4, 1),
(15, 'Jiraiya Shippuden Sage Mode', 'Figura coleccionable de Jiraiya Shippuden (Sage Mode)', 29990.00, 8, 10, 'NAR001003', 3, '/1701632398323-jiraiya-1.webp', '/1701632398329-jiraiya-box.webp', '2023-12-03 19:40:00', 4, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD UNIQUE KEY `sku_UNIQUE` (`sku`),
  ADD KEY `fk_product_licence1_idx` (`licence_id`),
  ADD KEY `fk_product_category1_idx` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `fk_product_category1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`),
  ADD CONSTRAINT `fk_product_licence1` FOREIGN KEY (`licence_id`) REFERENCES `licence` (`licence_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
