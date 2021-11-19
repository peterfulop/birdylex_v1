-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2021. Nov 19. 20:29
-- Kiszolgáló verziója: 10.4.14-MariaDB
-- PHP verzió: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `birdylex`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `dictionaries`
--

CREATE TABLE `dictionaries` (
  `id` int(11) NOT NULL,
  `dictionary_name` varchar(30) CHARACTER SET utf8mb4 NOT NULL,
  `fk_language_code_1` int(11) NOT NULL,
  `fk_language_code_2` int(11) NOT NULL,
  `relase_date` datetime NOT NULL,
  `fk_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `dictionaries`
--

INSERT INTO `dictionaries` (`id`, `dictionary_name`, `fk_language_code_1`, `fk_language_code_2`, `relase_date`, `fk_user_id`) VALUES
(1, 'Angol-Magyar', 4, 1, '2021-03-29 00:00:00', 1),
(2, 'Német-Magyar', 2, 1, '2021-03-29 00:00:00', 1),
(3, 'Olasz-Magyar', 10, 1, '2021-03-29 00:00:00', 1),
(4, 'Francia-Magyar', 7, 1, '2021-03-29 00:00:00', 1),
(5, 'Human Body', 4, 1, '2021-03-29 00:00:00', 1),
(268, 'Zöldségek, fűszernövények', 4, 1, '2021-06-19 13:18:35', 1),
(333, 'Wedding Day', 4, 1, '2021-07-28 14:36:55', 1),
(391, 'Teszt szótár 1.', 1, 1, '2021-11-16 13:00:53', 1),
(392, 'Teszt szótár 2.', 1, 1, '2021-11-16 13:35:05', 1),
(393, 'Első szótáram', 1, 1, '2021-11-16 14:24:52', 7);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `languages`
--

CREATE TABLE `languages` (
  `id` int(11) NOT NULL,
  `lang_code` varchar(10) CHARACTER SET utf8mb4 NOT NULL,
  `lang_name` varchar(30) CHARACTER SET utf8mb4 NOT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `languages`
--

INSERT INTO `languages` (`id`, `lang_code`, `lang_name`, `icon`) VALUES
(1, 'hu-HU', 'Magyar', 'hu.svg'),
(2, 'de-DE', 'Deutsch', 'de.svg'),
(3, 'en-US', 'US English', 'us.svg'),
(4, 'en-GB', 'UK English', 'gb.svg'),
(5, 'es-ES', 'Espanol', 'es.svg'),
(7, 'fr-FR', 'Francais', 'fr.svg'),
(8, 'hi-IN', 'Hindi', 'in.svg'),
(9, 'id-ID', 'Bahasa Indonesia', 'id.svg'),
(10, 'it-IT', 'Italiano', 'it.svg'),
(11, 'nl-NT', 'Nederlands', 'nl.svg'),
(12, 'pl-PL', 'Polski', 'pl.svg'),
(13, 'pt-BR', 'Portugues do Brasil', 'br.svg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `main_menu_hu`
--

CREATE TABLE `main_menu_hu` (
  `id` int(11) NOT NULL,
  `text` varchar(30) CHARACTER SET utf8mb4 NOT NULL,
  `icon` varchar(50) CHARACTER SET utf8mb4 NOT NULL,
  `position` int(11) NOT NULL,
  `view` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `main_menu_hu`
--

INSERT INTO `main_menu_hu` (`id`, `text`, `icon`, `position`, `view`) VALUES
(1, 'Kezdőoldal', 'fas fa-home', 1, 'home'),
(2, 'Profil', 'fas fa-user-circle', 2, 'profile'),
(3, 'Keresés', 'fas fa-search', 3, 'search'),
(4, 'Szótáraim', 'fas fa-book', 4, 'dictionaries'),
(5, 'Új szavak', 'fas fa-plus-circle', 5, 'addnew'),
(6, 'Agytorna', 'fas fa-brain', 6, 'brainteaser'),
(7, 'Felolvasó', 'fas fa-volume-up', 7, 'reader');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `fk_user_id` int(11) NOT NULL,
  `note` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `relase_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `notes`
--

INSERT INTO `notes` (`id`, `fk_user_id`, `note`, `relase_date`) VALUES
(63, 1, 'ring a bell - ismerősen hangzik', '2021-04-30 11:36:47'),
(64, 1, 'point taken - fogtam, értem', '2021-04-30 11:37:19'),
(65, 1, 'out of the blue - hirtelen, a semmiből', '2021-04-30 11:37:57'),
(66, 1, 'pardon my French - már bocsánat hogy ezt mondom', '2021-04-30 11:38:36'),
(67, 1, 'once in a while - néha néha, alkalmanként', '2021-04-30 11:39:05'),
(68, 1, 'once in a lifetime -  egyszer az életben, életreszóló', '2021-04-30 11:39:50'),
(69, 1, 'that’s a no brainer - gyerekjáték', '2021-04-30 11:40:42'),
(70, 1, 'not half - még szép, naná', '2021-04-30 11:41:08'),
(71, 1, 'not my cup of tea - nem az én asztalom', '2021-04-30 11:41:27'),
(72, 1, 'phony baloney - mesebeszéd', '2021-04-30 11:41:55'),
(73, 1, 'ring a bell - ismerősen hangzik,-cseng, rémlik', '2021-04-30 11:42:25'),
(74, 1, 'https://angolnyelv.net/angol-tanulas-blog/fontos-angol-kifejezesek', '2021-04-30 11:42:52');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `practice`
--

CREATE TABLE `practice` (
  `id` int(11) NOT NULL,
  `dictionary_name` varchar(50) NOT NULL,
  `fk_user_id` int(11) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `relase_date` datetime NOT NULL,
  `question_count` int(11) NOT NULL,
  `prompter_count` int(11) NOT NULL,
  `skipped_count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `practice`
--

INSERT INTO `practice` (`id`, `dictionary_name`, `fk_user_id`, `start_time`, `end_time`, `relase_date`, `question_count`, `prompter_count`, `skipped_count`) VALUES
(1, 'Korábbi tesztszótár', 1, '2021-04-01 17:08:55', '2021-04-01 17:11:05', '2021-04-01 17:11:05', 15, 3, 3),
(2, 'Korábbi tesztszótár', 1, '2021-04-03 11:15:45', '2021-04-03 11:20:05', '2021-04-03 11:20:05', 20, 5, 1),
(3, 'Korábbi tesztszótár', 1, '2021-04-03 13:08:55', '2021-04-03 13:11:05', '2021-04-03 13:11:05', 36, 8, 2),
(4, 'Korábbi tesztszótár', 1, '2021-04-08 20:11:35', '2021-04-08 20:19:49', '2021-04-08 20:19:49', 40, 10, 2),
(5, 'Korábbi tesztszótár', 1, '2021-04-01 15:08:55', '2021-04-01 15:11:05', '2021-06-08 15:33:09', 11, 3, 2),
(6, 'Korábbi tesztszótár', 1, '2021-06-01 15:08:55', '2021-06-01 15:11:05', '2021-06-08 15:34:15', 40, 10, 10),
(8, 'Korábbi tesztszótár', 1, '2021-06-01 15:08:55', '2021-06-01 15:11:05', '2021-06-08 16:15:59', 40, 10, 10),
(9, 'Korábbi tesztszótár', 1, '2021-06-01 15:08:55', '2021-06-01 15:11:05', '2021-06-08 16:16:14', 38, 3, 5),
(17, 'Korábbi tesztszótár', 1, '2021-06-08 14:32:55', '2021-06-08 14:33:19', '2021-06-08 16:33:33', 5, 2, 0),
(22, 'Korábbi tesztszótár', 1, '2021-06-01 15:08:55', '2021-06-01 15:11:05', '2021-06-08 17:05:21', 38, 3, 5),
(25, 'Korábbi tesztszótár', 1, '2021-06-08 15:08:04', '2021-06-08 15:08:07', '2021-06-08 17:08:10', 8, 1, 8),
(28, 'Korábbi tesztszótár', 1, '2021-06-08 15:28:32', '2021-06-08 15:28:34', '2021-06-08 17:28:36', 3, 0, 3),
(29, 'Korábbi tesztszótár', 1, '2021-06-08 15:29:41', '2021-06-08 15:29:42', '2021-06-08 17:29:46', 3, 0, 3),
(30, 'Korábbi tesztszótár', 1, '2021-06-08 15:30:19', '2021-06-08 15:30:22', '2021-06-08 17:30:23', 3, 0, 3),
(31, 'Korábbi tesztszótár', 1, '2021-06-08 15:32:03', '2021-06-08 15:32:06', '2021-06-08 17:32:13', 9, 0, 9),
(32, 'Korábbi tesztszótár', 1, '2021-06-08 15:43:57', '2021-06-08 15:43:58', '2021-06-08 17:44:00', 5, 0, 5),
(33, 'Korábbi tesztszótár', 1, '2021-06-16 12:02:28', '2021-06-16 12:02:30', '2021-06-16 14:02:32', 3, 0, 3),
(34, 'Korábbi tesztszótár', 1, '2021-06-16 12:04:38', '2021-06-16 12:04:40', '2021-06-16 14:04:42', 3, 0, 3),
(35, 'Korábbi tesztszótár', 1, '2021-07-28 12:48:03', '2021-07-28 12:49:07', '2021-07-28 14:49:21', 12, 0, 0),
(36, 'Korábbi tesztszótár', 1, '2021-07-28 13:35:43', '2021-07-28 13:36:55', '2021-07-28 15:36:58', 12, 0, 12),
(37, 'Korábbi tesztszótár', 1, '2021-11-15 12:07:49', '2021-11-15 12:07:55', '2021-11-15 13:07:58', 10, 4, 10),
(38, 'Korábbi tesztszótár', 1, '2021-11-15 12:09:02', '2021-11-15 12:09:07', '2021-11-15 13:09:09', 10, 5, 10),
(39, 'Teszt szótár 1.', 1, '2021-11-16 12:46:33', '2021-11-16 12:46:35', '2021-11-16 13:46:37', 3, 0, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `text`
--

CREATE TABLE `text` (
  `id` int(11) NOT NULL,
  `fk_user_id` int(11) NOT NULL,
  `fk_language_code` int(11) NOT NULL,
  `content` longtext NOT NULL,
  `relase_date` date DEFAULT NULL,
  `last_modified` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `unique_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 NOT NULL,
  `registered` datetime NOT NULL,
  `last_login` datetime DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `unique_id`, `name`, `email`, `password`, `registered`, `last_login`, `avatar`) VALUES
(1, '39112b13-9a19-4a08-b360-28e4e71ad21a', 'Péter', 'master@birdylex.com', '$2b$08$C5kh/vBrynLr54sUk/6e9uy5vqIuy0U2Pb9kyf7fOUqhqbSqk8yfy', '2021-11-12 17:09:10', '2021-11-18 17:06:11', '39112b13-9a19-4a08-b360-28e4e71ad21a.jpg'),
(7, 'dec42d2a-5657-4f97-a090-ff1a541cad45', 'birdy', 'birdy@birdylex.com', '$2b$08$TKNKXvcKDtH0//2qf.mAfurJyUVVOYFOeTyAs441B8JdGqLo3/IxK', '2021-11-15 15:31:43', '2021-11-18 17:24:12', 'dec42d2a-5657-4f97-a090-ff1a541cad45.png'),
(14, 'e032f52a-17b7-4e68-a435-8694cae094eb', 'Jennifer', 'jennifer@email.com', '$2b$08$rztqBAeBWBhWa4MIVBCYPO9sh3l/y9hn0r3wbqgIwEOdPf15JlAWu', '2021-11-19 12:29:01', '2021-11-19 12:29:11', 'dd881403-c2fe-4ed2-8231-ee4fa9cd2118.JPG'),
(17, '28965d04-ecb9-4e4d-9bf2-e8225951c181', 'register', 'register@email.com', '$2b$08$Tp/BMFqbjjN.zPAzFyMPl.erScDOGmVba04TJvhmbucVJTp5kpx52', '2021-11-19 17:30:23', '2021-11-19 17:30:41', 'avatar.png');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `words`
--

CREATE TABLE `words` (
  `id` int(11) NOT NULL,
  `fk_user_id` int(11) NOT NULL,
  `fk_dictionary_id` int(11) NOT NULL,
  `word_1` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `word_2` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `fk_language_code_1` int(11) NOT NULL,
  `fk_language_code_2` int(11) NOT NULL,
  `relase_date` datetime NOT NULL,
  `last_modified` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `words`
--

INSERT INTO `words` (`id`, `fk_user_id`, `fk_dictionary_id`, `word_1`, `word_2`, `fk_language_code_1`, `fk_language_code_2`, `relase_date`, `last_modified`) VALUES
(1, 1, 1, 'apple', 'alma', 3, 1, '2021-07-22 23:16:37', '2021-11-16 14:21:39'),
(2, 1, 1, 'book', 'könyv', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(3, 1, 1, 'car', 'autó', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(4, 1, 1, 'dictionary', 'szótár', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(5, 1, 4, 'pome', 'alma', 7, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(6, 1, 4, 'amour', 'szerelem', 7, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(7, 1, 4, 'livre', 'könyv', 7, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(8, 1, 4, 'automobile', 'autó', 7, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(9, 1, 4, 'arbre', 'fa', 7, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(10, 1, 4, 'orange', 'narancs', 7, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(11, 1, 2, 'das Auto', 'autó', 2, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(12, 1, 2, 'das Buch', 'könyv', 2, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(13, 1, 2, 'die Autobahn', 'autópálya', 2, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(14, 1, 2, 'der Highway', 'autópálya', 2, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(15, 1, 2, 'die Schnellstraße', 'autópálya', 2, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(16, 1, 2, 'die Freiheit', 'szabadság', 2, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(17, 1, 2, 'die Birne', 'körte', 2, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(18, 1, 2, 'der Wald', 'erdő', 2, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(19, 1, 1, 'face', 'arc', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(20, 1, 1, 'wrist', 'csukló', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(21, 1, 1, 'head', 'fej', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(22, 1, 1, 'shoulder', 'váll', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(23, 1, 3, 'pomo', 'alma', 10, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(24, 1, 3, 'auto', 'autó', 10, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(25, 1, 3, 'pane', 'kenyér', 10, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(26, 1, 3, 'vigneto', 'szőlő', 10, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(27, 1, 3, 'formaggio', 'sajt', 10, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(28, 1, 3, 'cacio', 'sajt', 10, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(29, 1, 3, 'mare', 'tenger', 10, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(30, 1, 3, 'maggiore', 'nagyobb', 10, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(31, 1, 3, 'maggiore', 'idősebb', 10, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(32, 1, 5, 'head', 'fej', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(33, 1, 5, 'tongue', 'nyelv', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(34, 1, 5, 'ear', 'fül', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(35, 1, 5, 'chest', 'mellkas', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(36, 1, 5, 'fingers', 'ujjak', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(37, 1, 5, 'wrist', 'csukló', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(38, 1, 5, 'chin', 'áll', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(39, 1, 5, 'stomach', 'has', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(40, 1, 5, 'navel', 'köldök', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(41, 1, 5, 'waist', 'derék', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(42, 1, 5, 'cheek', 'orca', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(43, 1, 5, 'face', 'arc', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(44, 1, 5, 'elbow', 'könyök', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(45, 1, 5, 'knee', 'térd', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(46, 1, 5, 'heel', 'sarok', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(47, 1, 5, 'forearm', 'alkar', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(48, 1, 5, 'rim', 'talp', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(49, 1, 5, 'hand', 'kéz', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(50, 1, 5, 'hair', 'haj', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(51, 1, 5, 'eyelashes', 'szempillák', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(52, 1, 5, 'pupil', 'pupilla', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(53, 1, 5, 'neck', 'nyak', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(54, 1, 5, 'eyelid', 'szemhéj', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(55, 1, 5, 'lip', 'ajak', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(56, 1, 5, 'mouth', 'száj', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(57, 1, 5, 'nose', 'orr', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(58, 1, 5, 'iris', 'írisz', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(59, 1, 5, 'eyebrow', 'szemöldök', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(60, 1, 5, 'forehead', 'homlok', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(61, 1, 5, 'The wite of the eye', 'szemfehérje', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(62, 1, 5, 'shoulder', 'váll', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(63, 1, 5, 'armpit', 'hónalj', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(64, 1, 5, 'back', 'hát', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(65, 1, 5, 'buttocks', 'fenék', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(66, 1, 5, 'calf', 'vádli', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(67, 1, 5, 'shin', 'lábszár, sípcsont', 3, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(68, 1, 1, 'deprecated', 'elavult', 3, 1, '2021-03-29 19:51:15', '2021-03-29 19:51:15'),
(69, 1, 1, 'bundling', 'árukapcsolás, csomózás', 4, 1, '2021-03-31 18:39:10', '2021-03-31 18:39:10'),
(70, 1, 1, 'elimination', 'kiesés', 4, 1, '2021-03-31 18:43:00', '2021-03-31 18:43:00'),
(71, 1, 1, 'execution', 'végrehajtás', 4, 1, '2021-03-31 18:44:20', '2021-03-31 18:44:20'),
(72, 1, 1, 'parsing', 'elemzés', 4, 1, '2021-03-31 18:45:08', '2021-03-31 18:45:08'),
(73, 1, 1, 'dependency', 'függőség', 4, 1, '2021-04-06 16:06:55', '2021-04-06 16:06:55'),
(74, 1, 1, 'parcel', 'csomag, rész, darab', 4, 1, '2021-04-06 16:07:35', '2021-04-06 16:07:35'),
(75, 1, 1, 'very brief', 'nagyon rövid', 4, 1, '2021-04-06 17:06:48', '2021-04-06 17:06:48'),
(76, 1, 1, 'received', 'elfogadott, irányadó', 4, 1, '2021-04-06 17:31:50', '2021-04-06 17:31:50'),
(77, 1, 1, 'generally', 'általában', 4, 1, '2021-04-06 17:32:48', '2021-04-06 17:32:48'),
(78, 1, 1, 'avoid', 'elkerül', 4, 1, '2021-04-06 17:33:46', '2021-04-06 17:33:46'),
(79, 1, 1, 'descriptive', 'leíró', 4, 1, '2021-04-06 17:34:45', '2021-04-06 17:34:45'),
(80, 1, 1, 'pollute', 'szennyez', 4, 1, '2021-04-06 17:35:32', '2021-04-06 17:35:32'),
(81, 1, 1, 'principle', 'alapelv, elv, alap', 4, 1, '2021-04-06 17:36:05', '2021-04-06 17:36:05'),
(82, 1, 1, 'encapsulate', 'magába zár, tokba zár', 4, 1, '2021-04-06 17:37:58', '2021-04-06 17:37:58'),
(83, 1, 1, 'synthesize', 'egységbe foglal', 4, 1, '2021-04-06 17:40:11', '2021-04-06 17:40:11'),
(84, 1, 1, 'mutate', 'átalakul', 4, 1, '2021-04-06 21:56:23', '2021-04-06 21:56:23'),
(85, 1, 1, 'implement', 'végrehajt, megvalósít', 4, 1, '2021-04-06 21:57:02', '2021-04-06 21:57:02'),
(86, 1, 1, 'regular', 'szokásos, normál, rendes', 4, 1, '2021-04-06 21:57:29', '2021-04-06 21:57:29'),
(87, 1, 1, 'guard clauses', 'binztonsági pont', 4, 1, '2021-04-06 21:57:55', '2021-04-06 21:57:55'),
(88, 1, 1, 'ternary operator', 'hármas operátor', 4, 1, '2021-04-06 21:58:13', '2021-04-06 21:58:13'),
(89, 1, 1, 'multiple', 'többszörös, összetett', 4, 1, '2021-04-06 21:58:37', '2021-04-06 21:58:37'),
(90, 1, 1, 'rejection', 'elutasítás, visszautasítás', 4, 1, '2021-04-06 21:58:59', '2021-04-06 21:58:59'),
(91, 1, 1, 'expense', 'költség', 4, 1, '2021-04-06 21:59:19', '2021-04-06 21:59:19'),
(92, 1, 1, 'income', 'bevétel, jövedelem', 4, 1, '2021-04-06 21:59:51', '2021-04-06 21:59:51'),
(93, 1, 1, 'imperative', 'szükségszerű', 4, 1, '2021-04-06 22:00:13', '2021-04-06 22:00:13'),
(94, 1, 1, 'declarative', 'kinyilatkoztató', 4, 1, '2021-04-06 22:00:33', '2021-04-06 22:00:33'),
(95, 1, 1, 'explain', 'kifejez, indokol', 4, 1, '2021-04-06 22:00:54', '2021-04-06 22:00:54'),
(97, 1, 1, 'archive the result', 'elérni az eredményt', 4, 1, '2021-04-06 22:01:50', '2021-04-06 22:01:50'),
(98, 1, 1, 'fundamentally', 'alapvetően', 4, 1, '2021-04-06 22:02:21', '2021-04-06 22:02:21'),
(99, 1, 1, 'external', 'külső', 4, 1, '2021-04-06 22:02:47', '2021-04-06 22:02:47'),
(100, 1, 1, 'internal', 'belső', 4, 1, '2021-04-06 22:03:17', '2021-04-06 22:03:17'),
(101, 1, 1, 'depend', 'függ', 4, 1, '2021-04-06 22:03:45', '2021-04-06 22:03:45'),
(102, 1, 1, 'does not depend', 'nem függ', 4, 1, '2021-04-06 22:04:05', '2021-04-06 22:04:05'),
(103, 1, 1, 'independence', 'függetlenség', 4, 1, '2021-04-06 22:04:26', '2021-04-06 22:04:26'),
(104, 1, 1, 'mutability', 'változékonyság', 4, 1, '2021-04-06 22:04:46', '2021-04-06 22:04:46'),
(105, 1, 1, 'immutability', 'állandóság', 4, 1, '2021-04-06 22:05:08', '2021-04-06 22:05:08'),
(106, 1, 1, 'not a big goal', 'nem egy nagy cél', 4, 1, '2021-04-06 22:05:46', '2021-04-06 22:05:46'),
(107, 1, 1, 'not a goal but a means', 'nem cél, hanem eszköz', 4, 1, '2021-04-06 22:06:12', '2021-04-06 22:06:12'),
(108, 1, 1, 'necessary', 'szükséges dolog', 4, 1, '2021-04-06 22:06:38', '2021-04-06 22:06:38'),
(109, 1, 1, 'strict', 'szigorú, pontos', 4, 1, '2021-04-06 22:07:06', '2021-04-06 22:07:06'),
(111, 1, 1, 'first of all', 'mindenek előtt', 4, 1, '2021-04-06 22:08:29', '2021-04-06 22:08:29'),
(115, 1, 1, 'executes', 'végrehajt', 4, 1, '2021-04-12 09:37:08', '2021-04-12 09:37:08'),
(116, 1, 1, 'rely on', 'támaszkodik rá, bízik benne, számít rá', 4, 1, '2021-04-12 09:37:37', '2021-04-12 09:37:37'),
(117, 1, 1, 'that commonly happens', 'ez mindennapos dolog', 4, 1, '2021-04-12 09:38:59', '2021-04-12 09:38:59'),
(118, 1, 1, 'most commonly used', 'legáltalánosabban használt', 4, 1, '2021-04-12 09:42:19', '2021-04-12 09:42:19'),
(119, 1, 1, 'growing popularity', 'növekvő népszerűség', 4, 1, '2021-04-12 09:42:19', '2021-04-12 09:42:19'),
(120, 1, 1, 'community', 'közösség', 4, 1, '2021-04-12 09:42:19', '2021-04-12 09:42:19'),
(121, 1, 1, 'shout out to somebody', 'üvölteni valakivel', 4, 1, '2021-04-12 09:42:19', '2021-04-12 09:42:19'),
(122, 1, 1, 'opinionated', 'makacs, önfejű, nagyképű', 4, 1, '2021-04-12 09:42:19', '2021-04-12 09:42:19'),
(123, 1, 1, 'you are in charge', 'te vagy a felelős', 4, 1, '2021-04-12 09:42:19', '2021-04-12 09:42:19'),
(124, 1, 1, 'inverted', 'átfordított, megfordított', 4, 1, '2021-04-12 09:42:19', '2021-04-12 09:42:19'),
(125, 1, 1, 'merely', 'csupán', 4, 1, '2021-04-12 09:42:19', '2021-04-12 09:42:19'),
(126, 1, 1, 'participant', 'résztvevő', 4, 1, '2021-04-12 09:42:19', '2021-04-12 09:42:19'),
(127, 1, 1, 'routing', 'útvonal megállapítása', 4, 1, '2021-04-12 09:42:19', '2021-04-12 09:42:19'),
(128, 1, 1, 'the point here is', 'itt a lényeg', 4, 1, '2021-04-12 09:42:19', '2021-04-12 09:42:19'),
(253, 1, 1, 'passion', 'szenvedély', 4, 1, '2021-04-28 22:04:12', '2021-04-28 22:04:12'),
(256, 1, 1, 'design paradigm', 'tervezési minta', 4, 1, '2021-05-07 11:34:46', '2021-05-07 11:34:46'),
(286, 1, 1, 'Chives', 'Metélőhagyma ', 4, 1, '2021-06-19 13:20:12', '2021-06-19 13:20:12'),
(288, 1, 268, 'oregano', 'oregánó', 4, 1, '2021-06-19 13:21:31', '2021-06-19 13:21:31'),
(289, 1, 268, 'herbs ', 'fűszer, gyógynövény', 4, 1, '2021-06-19 13:21:52', '2021-06-19 13:21:52'),
(290, 1, 268, 'thymes', 'kakukkfű', 4, 1, '2021-09-01 15:14:59', '2021-09-01 15:14:59'),
(291, 1, 268, 'sage', 'zsálya', 4, 1, '2021-06-19 13:22:20', '2021-06-19 13:22:20'),
(292, 1, 268, 'parsley', 'petrezselyem', 4, 1, '2021-06-19 13:22:41', '2021-06-19 13:22:41'),
(293, 1, 268, 'tarragon', 'tárkony', 4, 1, '2021-06-19 13:22:53', '2021-06-19 13:22:53'),
(294, 1, 268, 'chives', 'metélőhagyma, snidling', 4, 1, '2021-06-19 13:23:11', '2021-06-19 13:23:11'),
(296, 1, 268, 'basil', 'bazsalikom', 4, 1, '2021-06-19 13:23:48', '2021-06-19 13:23:48'),
(297, 1, 268, 'fennel', 'édeskömény', 4, 1, '2021-06-19 13:24:52', '2021-06-19 13:24:52'),
(298, 1, 268, 'anise', 'ánizs', 4, 1, '2021-06-19 13:24:57', '2021-06-19 13:24:57'),
(299, 1, 268, 'leek', 'póréhagyma', 4, 1, '2021-06-19 13:25:40', '2021-06-19 13:25:40'),
(300, 1, 268, 'pepperoni ', 'pepperoni ', 4, 1, '2021-06-19 13:26:58', '2021-06-19 13:26:58'),
(301, 1, 268, 'potato ', 'krumpli', 4, 1, '2021-06-19 13:27:21', '2021-06-19 13:27:21'),
(302, 1, 268, 'rosemary', 'rozmaring', 4, 1, '2021-06-19 13:28:13', '2021-06-19 13:28:13'),
(303, 1, 268, 'capers', 'kapribogyó', 4, 1, '2021-06-19 13:28:48', '2021-06-19 13:28:48'),
(304, 1, 268, 'anchovies', 'articsóka', 4, 1, '2021-06-19 13:29:12', '2021-06-19 13:29:12'),
(305, 1, 268, 'olive', 'olajbogyó', 4, 1, '2021-06-19 13:29:32', '2021-06-19 13:29:32'),
(306, 1, 268, 'garlic ', 'fokhagyma', 4, 1, '2021-06-19 13:33:56', '2021-06-19 13:33:56'),
(307, 1, 268, 'pine nuts', 'fenyőmag', 4, 1, '2021-06-19 13:37:11', '2021-06-19 13:37:11'),
(308, 1, 1, 'basil', 'bazsalikom', 4, 1, '2021-06-19 13:38:25', '2021-06-19 13:38:25'),
(309, 1, 268, 'arugula ', 'rukkola', 4, 1, '2021-06-19 13:38:51', '2021-06-19 13:38:51'),
(310, 1, 1, 'clear set of rules', 'világos szabályrendszer', 4, 1, '2021-06-28 15:34:46', '2021-06-28 15:34:46'),
(311, 1, 1, 'highly extensible', 'rendkívül bővíthető', 4, 1, '2021-06-28 15:36:42', '2021-06-28 15:36:42'),
(312, 1, 1, 'heavily', 'lassan, súlyosan', 4, 1, '2021-06-28 15:39:08', '2021-06-28 15:39:08'),
(313, 1, 1, 'forward', 'tovább', 4, 1, '2021-06-28 15:39:38', '2021-06-28 15:39:38'),
(314, 1, 1, 'exactly', 'pontosan', 4, 1, '2021-06-28 15:40:58', '2021-06-28 15:40:58'),
(315, 1, 1, 'otherwise', 'különben, egyébként', 4, 1, '2021-06-28 15:41:45', '2021-06-28 15:41:45'),
(316, 1, 1, 'elegantely', 'elegánsan', 4, 1, '2021-06-28 15:42:22', '2021-06-28 15:42:22'),
(317, 1, 1, 'last but not least', 'végül, de nem utolsó sorban', 4, 1, '2021-06-28 15:44:15', '2021-06-28 15:44:15'),
(622, 1, 1, 'phony baloney', 'mesebeszéd', 4, 1, '2021-07-20 01:42:33', '2021-07-20 01:42:33'),
(817, 1, 333, 'prep', 'készülés', 4, 1, '2021-07-28 14:37:23', '2021-07-28 14:37:23'),
(818, 1, 333, 'groom prep ', 'vőlegény készülődése', 4, 1, '2021-07-28 14:39:22', '2021-07-28 14:39:22'),
(819, 1, 333, 'bride prep', 'menyasszony készülődése', 4, 1, '2021-07-28 14:39:33', '2021-07-28 14:39:33'),
(820, 1, 333, 'groom', 'vőlegény', 4, 1, '2021-07-28 14:39:41', '2021-07-28 14:39:41'),
(821, 1, 333, 'bride', 'menyasszony', 4, 1, '2021-07-28 14:39:47', '2021-07-28 14:39:47'),
(822, 1, 333, 'bridesmaid', 'koszorúslány', 4, 1, '2021-07-28 14:46:14', '2021-07-28 14:46:14'),
(823, 1, 333, 'best man', 'tanú', 4, 1, '2021-07-28 14:40:47', '2021-07-28 14:40:47'),
(824, 1, 333, 'groomsmen', 'vőfély', 4, 1, '2021-07-28 14:41:41', '2021-07-28 14:41:41'),
(825, 1, 333, 'couple', 'pár', 4, 1, '2021-07-28 14:42:37', '2021-07-28 14:42:37'),
(826, 1, 333, 'ceremony', 'szertartás', 4, 1, '2021-07-28 14:42:58', '2021-07-28 14:42:58'),
(827, 1, 333, 'bridal party', 'násznép', 4, 1, '2021-07-28 14:43:30', '2021-07-28 14:43:30'),
(828, 1, 333, 'reception', 'fogadás', 4, 1, '2021-07-28 14:46:52', '2021-07-28 14:46:52'),
(829, 1, 1, 'this goes for everybody too', 'ez mindenkire vonatkozik', 4, 1, '2021-07-28 16:18:12', '2021-07-28 16:18:12'),
(830, 1, 1, 'mainly', 'főként', 4, 1, '2021-07-28 16:18:45', '2021-07-28 16:18:45'),
(831, 1, 333, 'I mainly shoot candid.', 'Főként őszinte pillanatokat lövök.', 4, 1, '2021-07-28 16:20:29', '2021-07-28 16:20:29'),
(832, 1, 333, 'I just want you to do stuff.', 'Csak azt szeretném, hogy valamit csináljatok.', 4, 1, '2021-07-28 20:41:59', '2021-07-28 20:41:59'),
(833, 1, 333, 'You gotta hang out and chill.', 'Lazíts, és relaxálj. ', 4, 1, '2021-07-28 16:26:39', '2021-07-28 16:26:39'),
(834, 1, 333, 'Unless I\'m asking you to look at the camera, dont worry about it.', 'Ha nem kérem hogy nézz a kamerába, ne aggódj.', 4, 1, '2021-07-28 16:27:36', '2021-07-28 16:27:36'),
(835, 1, 333, 'While we\'re here...', 'Amíg itt vagyunk...', 4, 1, '2021-07-28 16:28:46', '2021-07-28 16:28:46'),
(836, 1, 333, ' I don\'t like you to stop, and pose for me.', 'Nem szeretlek megállítani, és pózoltatni. ', 4, 1, '2021-07-28 16:31:42', '2021-07-28 16:31:42'),
(837, 1, 333, 'Make a hug.', 'Öleljétek meg egymást.', 4, 1, '2021-07-28 16:49:59', '2021-07-28 16:49:59'),
(838, 1, 333, 'Make a handshake.', 'Fogjatok kezet.', 4, 1, '2021-07-28 16:50:11', '2021-07-28 16:50:11'),
(839, 1, 333, 'touchy', 'érzékeny', 4, 1, '2021-07-28 16:50:53', '2021-07-28 16:50:53'),
(840, 1, 333, 'feely', 'érzelmes', 4, 1, '2021-07-28 16:51:18', '2021-07-28 16:51:18'),
(841, 1, 1, 'I\'m stuck in the past.', 'A múltban ragadtam.', 4, 1, '2021-07-28 16:54:46', '2021-07-28 16:54:46'),
(842, 1, 333, 'Please, turn out toward me.', 'Kérlek, fordulj felém.', 4, 1, '2021-07-28 16:56:14', '2021-07-28 16:56:14'),
(843, 1, 333, 'just a tad', 'csak egy picit', 4, 1, '2021-07-28 16:56:43', '2021-07-28 16:56:43'),
(844, 1, 1, 'just a tad', 'csak egy picit', 4, 1, '2021-07-28 16:56:52', '2021-07-28 16:56:52'),
(845, 1, 1, 'You wanna do something fun? ', 'Akartok valami vicceset csinálni? ', 4, 1, '2021-07-28 16:58:47', '2021-07-28 16:58:47'),
(846, 1, 333, 'No thought, just do it!', 'Ne gondolkozz, csak csináld!', 4, 1, '2021-07-28 16:59:58', '2021-07-28 16:59:58'),
(847, 1, 333, 'Let\'s come here real quick.', 'Jöjjünk ide gyorsan.', 4, 1, '2021-07-28 17:01:31', '2021-07-28 17:01:31'),
(848, 1, 333, 'Lets do solos with you!', 'Csináljunk egyénieket veled! ', 4, 1, '2021-07-28 17:04:13', '2021-07-28 17:04:13'),
(849, 1, 333, 'Take a step back this way!', 'Lépj egyet hátra, ebbe az irányba!', 4, 1, '2021-07-28 17:06:12', '2021-07-28 17:06:12'),
(850, 1, 333, 'Take a step forward!', 'Lép egyet előre!', 4, 1, '2021-07-28 17:05:30', '2021-07-28 17:05:30'),
(851, 1, 333, 'All the rest of you guys/ladies.', 'Az összes többi srác/hölgy. ', 4, 1, '2021-07-28 17:07:33', '2021-07-28 17:07:33'),
(852, 1, 333, 'If you have two arms up, you need to unbutton the jacket.', 'Ha mind a két kezed fent van, gombold ki a zakót.', 4, 1, '2021-07-28 17:11:33', '2021-07-28 17:11:33'),
(853, 1, 333, 'It\'s gonna get weired!', 'Furcsa lesz!', 4, 1, '2021-07-28 17:12:16', '2021-07-28 17:12:16'),
(854, 1, 333, 'Throw your left/right hand in your pocket!', 'Dugd a bal/jobb kezed a zsebedbe!', 4, 1, '2021-07-28 17:13:13', '2021-07-28 17:13:13'),
(855, 1, 333, 'The rule for today for you is...', 'A szabály mára neked az, hogy...', 4, 1, '2021-07-28 17:15:16', '2021-07-28 17:15:16'),
(856, 1, 333, 'Don\'t worry about being perfect!', 'Ne aggódj azon, hogy tökéletes legyél!', 4, 1, '2021-07-28 17:16:14', '2021-07-28 17:16:14'),
(857, 1, 333, 'I want you all to interacting with each other.', 'Szeretném, ha mindannyian kapcsolatba lépnétek egymással.', 4, 1, '2021-07-28 17:17:43', '2021-07-28 17:17:43'),
(858, 1, 333, 'robes', 'köntös', 4, 1, '2021-07-28 17:18:33', '2021-07-28 17:18:33'),
(859, 1, 333, 'Scoot over just a little bit.', 'Csússz odébb egy kicsit. (ülésnél)', 4, 1, '2021-07-28 17:21:35', '2021-07-28 17:21:35'),
(860, 1, 333, 'Everyone right at the camera, nice big smiles!', 'Mindenki a kamera előtt, szép, nagy mosolyt!', 4, 1, '2021-07-28 17:22:58', '2021-07-28 17:22:58'),
(861, 1, 333, 'Look at each other.', 'Nézzetek egymásra.', 4, 1, '2021-07-28 17:23:58', '2021-07-28 17:23:58'),
(862, 1, 333, 'Nice group hug!', 'Szép csoportos ölelés!', 4, 1, '2021-07-28 17:24:58', '2021-07-28 17:24:58'),
(863, 1, 333, 'Look at each other while you\'re hugging.', 'Nézzetek egymásra, ölelkezés közben.', 4, 1, '2021-07-28 17:25:40', '2021-07-28 17:25:40'),
(864, 1, 333, 'Take a shot of the dress.', 'Lefotózni a ruhát.', 4, 1, '2021-07-28 17:26:39', '2021-07-28 17:26:39'),
(865, 1, 333, 'No mess in the background of the photo.', 'Nincs rendetlenség a fotó hátterében.', 4, 1, '2021-07-28 17:28:24', '2021-07-28 17:28:24'),
(866, 1, 333, 'dress hanger', 'ruha fogas', 4, 1, '2021-07-28 17:30:46', '2021-07-28 17:30:46'),
(867, 1, 333, 'belt', 'öv', 4, 1, '2021-07-28 17:31:08', '2021-07-28 17:31:08'),
(868, 1, 333, 'tie', 'nyakkendő', 4, 1, '2021-07-28 17:31:23', '2021-07-28 17:31:23'),
(869, 1, 333, 'bow tie', 'csokornyakkendő', 4, 1, '2021-07-28 17:31:45', '2021-07-28 17:31:45'),
(870, 1, 333, 'vest', 'mellény', 4, 1, '2021-07-28 17:32:08', '2021-07-28 17:32:08'),
(871, 1, 333, 'trousers', 'nadrág', 4, 1, '2021-07-28 17:32:30', '2021-07-28 17:32:30'),
(872, 1, 333, 'earrings', 'fülbevaló', 4, 1, '2021-07-28 17:33:23', '2021-07-28 17:33:23'),
(873, 1, 333, 'cuff', 'mandzsetta', 4, 1, '2021-07-28 17:34:00', '2021-07-28 17:34:00'),
(874, 1, 333, 'necklace', 'nyaklánc', 4, 1, '2021-07-28 17:34:32', '2021-07-28 17:34:32'),
(875, 1, 333, 'crown', 'korona', 4, 1, '2021-07-28 17:35:19', '2021-07-28 17:35:19'),
(876, 1, 333, 'lipstick', 'rúzs', 4, 1, '2021-07-28 17:35:41', '2021-07-28 17:35:41'),
(877, 1, 333, 'to hang the dress somewhere', 'felakasztani a ruhát valahova', 4, 1, '2021-07-28 17:37:14', '2021-07-28 17:37:14'),
(878, 1, 333, 'It\'s time for the bride to get in her dress.', 'Itt az ideje, hogy a menyasszony felvegye a ruháját.', 4, 1, '2021-07-28 17:39:35', '2021-07-28 17:39:35'),
(879, 1, 333, 'Please, not to button it all the way up.', 'Kérlek, ne gombold be teljesen.', 4, 1, '2021-07-28 17:41:03', '2021-07-28 17:41:03'),
(880, 1, 333, 'Please, buttoning up the dress!', 'Kérlek, gombold be a ruhát!', 4, 1, '2021-07-28 17:42:18', '2021-07-28 17:42:18'),
(881, 1, 333, 'You dont have to stop or anithing.', 'Nem kell megállnod, vagy bármi mást csinálni.', 4, 1, '2021-07-28 18:24:14', '2021-07-28 18:24:14'),
(882, 1, 333, 'Just go ahead a little bit.', 'Csak menj előre egy kicsit.', 4, 1, '2021-07-28 17:44:43', '2021-07-28 17:44:43'),
(883, 1, 333, 'Button it up slowly.', 'Lassan gombold fel.', 4, 1, '2021-07-28 17:45:16', '2021-07-28 17:45:16'),
(884, 1, 333, 'Look back for your mother.', 'Nézz vissza anyukádra.', 4, 1, '2021-07-28 17:47:17', '2021-07-28 17:47:17'),
(885, 1, 333, 'Just joke with her/him.', 'Csak viccelődj vele.', 4, 1, '2021-07-28 17:48:11', '2021-07-28 17:48:11'),
(886, 1, 333, 'Turn around, and get a nice a hug.', 'Fordulj meg, és öleljétek meg egymást.', 4, 1, '2021-07-28 17:50:54', '2021-07-28 17:50:54'),
(887, 1, 333, 'give a kiss', 'puszit adni', 4, 1, '2021-07-28 17:51:32', '2021-07-28 17:51:32'),
(888, 1, 333, 'capture the moment', 'megragadni a pillanatot', 4, 1, '2021-07-28 17:52:03', '2021-07-28 17:52:03'),
(889, 1, 333, 'Please, put your jewerly on.', 'Kérlek, vedd fel az ékszereidet.', 4, 1, '2021-07-28 17:53:42', '2021-07-28 17:53:42'),
(890, 1, 333, 'bracelet', 'karkötő', 4, 1, '2021-07-28 17:54:03', '2021-07-28 17:54:03'),
(891, 1, 333, 'Stand around the bride!', 'Álljatok a menyasszony köré!', 4, 1, '2021-07-28 17:56:27', '2021-07-28 17:56:27'),
(892, 1, 333, 'Stand in a semicircle!', 'Álljatok félkörben!', 4, 1, '2021-07-28 17:56:55', '2021-07-28 17:56:55'),
(893, 1, 333, 'Make it look perfect.', 'Hogy tökéletes legyen.', 4, 1, '2021-07-28 17:58:00', '2021-07-28 17:58:00'),
(894, 1, 333, 'Just take your time!', 'Csak szánj rá időt!', 4, 1, '2021-07-28 17:58:31', '2021-07-28 17:58:31'),
(895, 1, 333, 'Let\'s one at a time for the shoes!', 'Nézzük egyesével a cipőket!', 4, 1, '2021-07-28 17:59:32', '2021-07-28 17:59:32'),
(896, 1, 333, 'Raise your legs!', 'Emeld fel a lábaid! ', 4, 1, '2021-07-28 18:01:14', '2021-07-28 18:01:14'),
(897, 1, 333, 'Raise your hand!', 'Emeld fel a kezed!', 4, 1, '2021-07-28 18:01:31', '2021-07-28 18:01:31'),
(898, 1, 333, 'Do you wanna be more straight?', 'Egyenesebb akarsz állni?', 4, 1, '2021-07-28 18:04:20', '2021-07-28 18:04:20'),
(899, 1, 333, 'Do you wanna be facing that way a little?', 'Akarsz egy kicsit arccal szemben lenni? ', 4, 1, '2021-07-28 18:05:36', '2021-07-28 18:05:36'),
(900, 1, 333, 'I would just move you over.', 'Csak áthelyeznélek.', 4, 1, '2021-07-28 18:06:08', '2021-07-28 18:06:08'),
(901, 1, 333, 'Try to match the bouquet.', 'Próbáld meg illeszteni a csokrot.', 4, 1, '2021-07-28 18:08:31', '2021-07-28 18:08:31'),
(902, 1, 333, 'bouquet', 'csokor', 4, 1, '2021-07-28 18:08:13', '2021-07-28 18:08:13'),
(903, 1, 333, 'Try and keep the bouquets around the same level.', 'Próbáljuk meg a csokrokat azonos szinten tartani.', 4, 1, '2021-07-28 18:09:35', '2021-07-28 18:09:35'),
(904, 1, 333, 'Eyes at me.', 'Nézzetek ide.', 4, 1, '2021-07-28 18:10:25', '2021-07-28 18:10:25'),
(905, 1, 333, 'Everone pick a girl.', 'Mindenki válasszon egy lányt.', 4, 1, '2021-07-28 18:11:23', '2021-07-28 18:11:23'),
(906, 1, 333, 'Laugh in her/his face.', 'Nevess az arcába.', 4, 1, '2021-07-28 18:11:43', '2021-07-28 18:11:43'),
(907, 1, 333, 'Warm each other up!', 'Melegítsük fel egymást!', 4, 1, '2021-07-28 18:12:18', '2021-07-28 18:12:18'),
(908, 1, 333, 'We\'re start out...', 'Elkezdjük...', 4, 1, '2021-07-28 18:15:04', '2021-07-28 18:15:04'),
(909, 1, 333, 'with straight face', 'komoly arccal', 4, 1, '2021-07-28 18:16:33', '2021-07-28 18:16:33'),
(910, 1, 333, 'And then now smile at the camera!', 'És akkor most mosoly a kamerára!', 4, 1, '2021-07-28 18:17:19', '2021-07-28 18:17:19'),
(911, 1, 333, 'Do you want something fun, or cute together? ', 'Szeretnétek valami mulatságosat vagy aranyosat együtt?', 4, 1, '2021-07-28 18:19:22', '2021-07-28 18:19:22'),
(912, 1, 333, 'Could you just come over here?', 'Át tudnál jönni ide? ', 4, 1, '2021-07-28 18:20:24', '2021-07-28 18:20:24'),
(913, 1, 333, 'please go ahead!', 'Kérlek menj előre!', 4, 1, '2021-08-11 23:25:32', '2021-08-11 23:25:32'),
(914, 1, 333, 'make her/him  laugh', 'megnevetteti', 4, 1, '2021-08-11 23:28:52', '2021-08-11 23:28:52'),
(915, 1, 333, 'Give her some little kisses on the cheek.', 'Adj neki néhány csókot az arcára.', 4, 1, '2021-08-11 23:35:24', '2021-08-11 23:35:24'),
(943, 1, 268, 'cilantro', 'koriander', 4, 1, '2021-11-15 12:55:51', '2021-11-15 12:55:51'),
(972, 1, 391, 'apple', 'alma', 3, 1, '2021-11-16 13:44:45', '2021-11-16 13:44:45'),
(973, 1, 391, 'phony baloney', 'mesebeszéd', 1, 1, '2021-11-16 13:44:45', '2021-11-16 13:44:45'),
(974, 1, 391, 'test', 'elegánsan', 1, 1, '2021-11-16 13:44:45', '2021-11-16 13:44:45'),
(977, 7, 393, 'phony baloney', 'test', 1, 1, '2021-11-16 14:25:00', '2021-11-16 14:25:00');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `dictionaries`
--
ALTER TABLE `dictionaries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_language_code_1` (`fk_language_code_1`) USING BTREE,
  ADD KEY `fk_language_code_2` (`fk_language_code_2`) USING BTREE,
  ADD KEY `fk_user_id` (`fk_user_id`);

--
-- A tábla indexei `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `main_menu_hu`
--
ALTER TABLE `main_menu_hu`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_id` (`fk_user_id`);

--
-- A tábla indexei `practice`
--
ALTER TABLE `practice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_id` (`fk_user_id`);

--
-- A tábla indexei `text`
--
ALTER TABLE `text`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_id` (`unique_id`);

--
-- A tábla indexei `words`
--
ALTER TABLE `words`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_language_code_1` (`fk_language_code_1`) USING BTREE,
  ADD KEY `fk_dictionary_id` (`fk_dictionary_id`) USING BTREE,
  ADD KEY `fk_language_code_2` (`fk_language_code_2`) USING BTREE,
  ADD KEY `fk_user_id` (`fk_user_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `dictionaries`
--
ALTER TABLE `dictionaries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=396;

--
-- AUTO_INCREMENT a táblához `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT a táblához `main_menu_hu`
--
ALTER TABLE `main_menu_hu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT a táblához `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT a táblához `practice`
--
ALTER TABLE `practice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT a táblához `words`
--
ALTER TABLE `words`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=979;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `dictionaries`
--
ALTER TABLE `dictionaries`
  ADD CONSTRAINT `dictionaries_ibfk_1` FOREIGN KEY (`fk_language_code_1`) REFERENCES `languages` (`id`),
  ADD CONSTRAINT `dictionaries_ibfk_2` FOREIGN KEY (`fk_language_code_2`) REFERENCES `languages` (`id`),
  ADD CONSTRAINT `dictionaries_ibfk_3` FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `dictionaries_ibfk_4` FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`id`);

--
-- Megkötések a táblához `practice`
--
ALTER TABLE `practice`
  ADD CONSTRAINT `practice_ibfk_1` FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`id`);

--
-- Megkötések a táblához `words`
--
ALTER TABLE `words`
  ADD CONSTRAINT `FK_dictionary_id` FOREIGN KEY (`fk_dictionary_id`) REFERENCES `dictionaries` (`id`),
  ADD CONSTRAINT `words_ibfk_1` FOREIGN KEY (`fk_language_code_1`) REFERENCES `languages` (`id`),
  ADD CONSTRAINT `words_ibfk_2` FOREIGN KEY (`fk_language_code_2`) REFERENCES `languages` (`id`),
  ADD CONSTRAINT `words_ibfk_3` FOREIGN KEY (`fk_dictionary_id`) REFERENCES `dictionaries` (`id`),
  ADD CONSTRAINT `words_ibfk_4` FOREIGN KEY (`fk_dictionary_id`) REFERENCES `dictionaries` (`id`),
  ADD CONSTRAINT `words_ibfk_5` FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `words_ibfk_6` FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
