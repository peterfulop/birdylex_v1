-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2021. Dec 08. 11:47
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
CREATE DATABASE IF NOT EXISTS `birdylex` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `birdylex`;

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
(2, 'Német-Magyar', 2, 1, '2021-03-29 00:00:00', 1),
(3, 'Olasz-Magyar', 10, 1, '2021-03-29 00:00:00', 1),
(4, 'Francia-Magyar', 7, 1, '2021-03-29 00:00:00', 1),
(268, 'Zöldségek, fűszernövények', 4, 1, '2021-06-19 13:18:35', 1),
(400, 'IT kifejezések', 1, 4, '2021-11-23 13:09:04', 1);

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
(123, 1, 'Első jegyzetem', '2021-12-08 11:05:32'),
(124, 1, 'Második jegyzetem', '2021-12-08 11:05:49'),
(125, 1, 'Harmadik feljegyzésem', '2021-12-08 11:06:02');

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
(1, '39112b13-9a19-4a08-b360-28e4e71ad21a', 'Birdy', 'birdy@birdylex.com', '$2b$08$dxE2JJOtotKsg0nKQzSUAOtfDRXmVCPD7w0GZShjWs8VvP6v.WcwG', '2021-11-12 17:09:10', '2021-12-08 11:03:00', 'avatar.png');

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
(23, 1, 3, 'pomo', 'alma', 10, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(24, 1, 3, 'auto', 'autó', 10, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(25, 1, 3, 'pane', 'kenyér', 10, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(26, 1, 3, 'vigneto', 'szőlő', 10, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(27, 1, 3, 'formaggio', 'sajt', 10, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(28, 1, 3, 'cacio', 'sajt', 10, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(29, 1, 3, 'mare', 'tenger', 10, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(30, 1, 3, 'maggiore', 'nagyobb', 10, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
(31, 1, 3, 'maggiore', 'idősebb', 10, 1, '2021-03-29 00:00:00', '2021-03-29 00:00:00'),
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
(309, 1, 268, 'arugula ', 'rukkola', 4, 1, '2021-06-19 13:38:51', '2021-06-19 13:38:51'),
(943, 1, 268, 'cilantro', 'koriander', 4, 1, '2021-11-15 12:55:51', '2021-11-15 12:55:51'),
(979, 1, 400, 'apple', 'alma', 4, 1, '2021-11-23 13:10:02', '2021-11-23 13:10:02'),
(980, 1, 400, 'absztrakt adattípus', 'abstract data type', 1, 4, '2021-11-23 00:00:00', '2021-11-23 00:00:00'),
(981, 1, 400, 'adatrész', 'cargo', 1, 4, '2021-11-23 00:00:00', '2021-11-23 00:00:00'),
(982, 1, 400, 'adatszerkezet', 'data structure', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(983, 1, 400, 'adattípus', 'data type', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(984, 1, 400, 'ág', 'branch', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(985, 1, 400, 'alacsony szintű nyelv', 'low-level language', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(986, 1, 400, 'alapértelmezett érték', 'default value', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(987, 1, 400, 'alapeset', 'base case', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(988, 1, 400, 'alapvető félreérthetőség tétel', 'fundamental ambiguity theorem', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(989, 1, 400, 'algoritmus', 'algorithm', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(990, 1, 400, 'általánosítás', 'generalization', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(991, 1, 400, 'animáció sebessége', 'animation rate', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(992, 1, 400, 'argumentum', 'argument', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(993, 1, 400, 'attribútum', 'attribute', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(994, 1, 400, 'beágyazás', 'nesting, encapsulate', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(995, 1, 400, 'beágyazott ciklus', 'nested loop', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(996, 1, 400, 'beágyazott lista', 'nested list', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(997, 1, 400, 'beágyazott referencia', 'embedded reference', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(998, 1, 400, 'beégetett animáció', 'baked animation', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(999, 1, 400, 'befejezési feltétel', 'terminating condition', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1000, 1, 400, 'bejárás', 'traverse', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1001, 1, 400, 'belső szorzat', 'dot product', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1002, 1, 400, 'bináris fa', 'binary tree', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1003, 1, 400, 'bináris keresés', 'binary search', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1004, 1, 400, 'bináris operátor', 'binary operator', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1005, 1, 400, 'blokk', 'block', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1006, 1, 400, 'Boole algebra', 'Boolean algebra', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1007, 1, 400, 'Boolean érték, logikai érték', 'Boolean value, logical value', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1008, 1, 400, 'Boolean függvény, logikai függvény', 'Boolean function', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1009, 1, 400, 'Boolean kifejezés, logikai kifejezés', 'Boolean expression, logical expression', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1010, 1, 400, 'ciklus', 'loop', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1011, 1, 400, 'ciklus törzs', 'loop body', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1012, 1, 400, 'ciklusváltozó', 'loop variable', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1013, 1, 400, 'continue utasítás', 'continue statement', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1014, 1, 400, 'csatlakozó', 'socket', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1015, 1, 400, 'csevego függvény', 'chatterbox function', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1016, 1, 400, 'csomagoló', 'wrapper', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1017, 1, 400, 'csomópont', 'node', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1018, 1, 400, 'dekrementálás', 'decrementation', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1019, 1, 400, 'deszerializáció', 'deserialization', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1020, 1, 400, 'dokumentációs sztring', 'docstring', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1021, 1, 400, 'egész osztás', 'floor division, integer division', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1022, 1, 400, 'egyke', 'singleton', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1023, 1, 400, 'egységteszt', 'unit testing', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1024, 1, 400, 'elem', 'element, item', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1025, 1, 400, 'elérhetetlen kód', 'unreachable code', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1026, 1, 400, 'élettartam', 'lifetime', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1027, 1, 400, 'előfeltétel', 'precondition', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1028, 1, 400, 'előírt lépésszámú ciklus', 'definite iteration', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1029, 1, 400, 'előltesztelő ciklus', 'pre-test loop', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1030, 1, 400, 'érték', 'value', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1031, 1, 400, 'érték szerinti egyenlőség', 'deep equality', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1032, 1, 400, 'értékadás jele', 'assignment token', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1033, 1, 400, 'értékadó utasítás', 'assignment statement', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1034, 1, 400, 'escape karakter', 'escape sequence', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1035, 1, 400, 'esemény', 'event', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1036, 1, 400, 'eseményfigyelés', 'poll', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1037, 1, 400, 'eseménykezelő', 'handler', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1038, 1, 400, 'fájl', 'file', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1039, 1, 400, 'fájl rendszer', 'file system', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1040, 1, 400, 'fedőnevek', 'aliases', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1041, 1, 400, 'fejléc', 'header line', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1042, 1, 400, 'fejlesztési terv', 'development plan', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1043, 1, 400, 'felejto memória', 'volatile memory', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1044, 1, 400, 'feltétel', 'condition', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1045, 1, 400, 'feltételes utasítás', 'conditional statement', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1046, 1, 400, 'felület', 'surface', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1047, 1, 400, 'FIFO', 'FIFO (First In, First Out)', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1048, 1, 400, 'float', 'float', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1049, 1, 400, 'for ciklus', 'for loop', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1050, 1, 400, 'formális nyelv', 'formal language', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1051, 1, 400, 'forráskód', 'source code', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1052, 1, 400, 'főciklus', 'game loop', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1053, 1, 400, 'funkcionális programozási stílus', 'functional programming style', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1054, 1, 400, 'futási idejű hiba', 'runtime error', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1055, 1, 400, 'függvény', 'function', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1056, 1, 400, 'függvény definíció', 'function definition', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1057, 1, 400, 'függvények egymásba ágyazása', 'function composition, composition of functions', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1058, 1, 400, 'függvényhívás', 'function call', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1059, 1, 400, 'generikus adatszerkezet', 'generic data structure', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1060, 1, 400, 'gzip', 'gzip', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1061, 1, 400, 'gyerek', 'child', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1062, 1, 400, 'gyerek osztály', 'child class', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1063, 1, 400, 'gyökér', 'root', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1064, 1, 400, 'gyűjtő', 'accumulator', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1065, 1, 400, 'halott kód', 'dead code', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1066, 1, 400, 'határoló', 'delimiter', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1067, 1, 400, 'határozatlan ismétlés', 'indefinite iteration', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1068, 1, 400, 'hátultesztelo ciklus', 'post-test loop', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1069, 1, 400, 'hívás', 'invoke', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1070, 1, 400, 'hívási gráf', 'call graph', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1071, 1, 400, 'hordozhatóság', 'portability', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1072, 1, 400, 'hozzárendelés, kötés', 'bind', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1073, 1, 400, 'ideiglenes változó', 'temporary variable', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1074, 1, 400, 'igazságtábla', 'truth table', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1075, 1, 400, 'ígéret', 'promise', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1076, 1, 400, 'implementáció', 'implementation', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1077, 1, 400, 'import utasítás', 'import statement', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1078, 1, 400, 'index', 'index', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1079, 1, 400, 'infix alak', 'infix', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1080, 1, 400, 'inicializáció', 'initialization', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1081, 1, 400, 'inicializáló metódus', 'initializer method', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1082, 1, 400, 'inkrementálás', 'incrementation', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1083, 1, 400, 'inkrementális fejlesztés', 'incremental development', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1084, 1, 400, 'int', 'int', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1085, 1, 400, 'interaktív mód', 'immediate mode', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1086, 1, 400, 'interfész', 'interface', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1087, 1, 400, 'invariáns', 'invariant', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1088, 1, 400, 'iteráció', 'iteration', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1089, 1, 400, 'JSON', 'JSON', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1090, 1, 400, 'képátvitel', 'blitting', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1091, 1, 400, 'képfrissítés sebessége', 'frame rate', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1092, 1, 400, 'képpont', 'pixel', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1093, 1, 400, 'keret', 'frame', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1094, 1, 400, 'kezelő', 'handle', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1095, 1, 400, 'kiértékelés', 'evaluate', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1096, 1, 400, 'kifejezés', 'expression', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1097, 1, 400, 'kivált', 'raise', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1098, 1, 400, 'kivétel', 'exception', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1099, 1, 400, 'kivételkezelés', 'handle an exception', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1100, 1, 400, 'kliens', 'client', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1101, 1, 400, 'klónozás', 'clone', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1102, 1, 400, 'kód csomagolása függvénybe', 'wrapping code in a function', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1103, 1, 400, 'kódol', 'encode', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1104, 1, 400, 'konstans idejű', 'constant time', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1105, 1, 400, 'konstruktor', 'constructor', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1106, 1, 400, 'könyvtár', 'directory', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1107, 1, 400, 'középen tesztelő ciklus', 'middle-test loop', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1108, 1, 400, 'kulcs', 'key', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1109, 1, 400, 'kulcs:érték pár', 'key:value pair', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1110, 1, 400, 'kulcsszó', 'keyword', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1111, 1, 400, 'kurzor', 'cursor', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1112, 1, 400, 'láncolt feltételes utasítás', 'chained conditional', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1113, 1, 400, 'láncolt lista', 'linked list', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1114, 1, 400, 'láncolt sor', 'linked queue', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1115, 1, 400, 'leképezés típus', 'mapping type', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1116, 1, 400, 'lépésenkénti végrehajtás', 'single-step', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1117, 1, 400, 'lépésköz', 'step size', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1118, 1, 400, 'levél', 'leaf', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1119, 1, 400, 'lineáris', 'linear', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1120, 1, 400, 'lineáris idejű', 'linear time', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1121, 1, 400, 'link', 'link', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1122, 1, 400, 'lista', 'list', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1123, 1, 400, 'lista bejárás', 'list traversal', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1124, 1, 400, 'logikai operátor', 'logical operator', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1125, 1, 400, 'lokális változó', 'local variable', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1126, 1, 400, 'magas szintű nyelvek', 'high-level language', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1127, 1, 400, 'maradékos osztás', 'modulus operator', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1128, 1, 400, 'megjegyzés', 'comment', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1129, 1, 400, 'mellékhatás', 'side effect', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1130, 1, 400, 'mély másolás', 'deep copy', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1131, 1, 400, 'memo', 'memo', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1132, 1, 400, 'meta-jelölés', 'meta-notation', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1133, 1, 400, 'metódus', 'method', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1134, 1, 400, 'minosítés', 'dot notation', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1135, 1, 400, 'minta', 'pattern', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1136, 1, 400, 'mód', 'mode', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1137, 1, 400, 'módosíthatatlan érték, változtathatatlan adatérték', 'immutable data value', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1138, 1, 400, 'módosítható érték, módosítható adat típusok, változtatható érték', 'mutable data value', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1139, 1, 400, 'módosító', 'modifier', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1140, 1, 400, 'modul', 'module', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1141, 1, 400, 'műveleti jel, operátor', 'operator', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1142, 1, 400, 'nem felejtő memória', 'non-volatile memory', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1143, 1, 400, 'névtér', 'namespace', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1144, 1, 400, 'névütközések', 'naming collision', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1145, 1, 400, 'None', 'None', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1146, 1, 400, 'normalizált', 'normalized', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1147, 1, 400, 'nyelvtani elemzés', 'parse', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1148, 1, 400, 'nyomkövetés', 'debugging, trace', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1149, 1, 400, 'objektum', 'object', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1150, 1, 400, 'objektumorientált nyelv', 'object-oriented language', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1151, 1, 400, 'objektumorientált programozás', 'object-oriented programming, OOP', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1152, 1, 400, 'opcionális paraméter', 'optional parameter', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1153, 1, 400, 'operandus', 'operand', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1154, 1, 400, 'operátor túlterhelés', 'operator overloading', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1155, 1, 400, 'osztály', 'class', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1156, 1, 400, 'osztály attribútum', 'class attribute', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1157, 1, 400, 'öröklődés', 'inheritance', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1158, 1, 400, 'Összefésülés algoritmusa', 'Merge algorithm', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1159, 1, 400, 'összefűzés', 'concatenate', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1160, 1, 400, 'összehasonlítás', 'probe', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1161, 1, 400, 'összehasonlító operátor', 'comparison operator', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1162, 1, 400, 'összetett adattípus', 'compound data type', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1163, 1, 400, 'összetett utasítás', 'compound statement', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1164, 1, 400, 'paraméter', 'parameter', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1165, 1, 400, 'parancsértelmező', 'interpreter', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1166, 1, 400, 'példány', 'instance', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1167, 1, 400, 'példányosítás', 'instantiate', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1168, 1, 400, 'polimorf', 'polymorphic', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1169, 1, 400, 'pont operátor', 'dot operator', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1170, 1, 400, 'postorder', 'postorder', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1171, 1, 400, 'posztfix alak', 'postfix', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1172, 1, 400, 'precedenciarendszer', 'rules of precedence', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1173, 1, 400, 'prefix írásmód', 'prefix notation', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1174, 1, 400, 'preorder', 'preorder', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1175, 1, 400, 'print függvény', 'print function', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1176, 1, 400, 'prioritásos sor', 'priority queue', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1177, 1, 400, 'problémamegoldás', 'problem solving', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1178, 1, 400, 'produktív függvény', 'fruitful function', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1179, 1, 400, 'program', 'program', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1180, 1, 400, 'program hiba', 'bug', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1181, 1, 400, 'programvezérlés', 'control flow, flow of execution', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1182, 1, 400, 'prompt', 'prompt', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1183, 1, 400, 'Python shell', 'Python shell', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1184, 1, 400, 'refaktorálás', 'refactor', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1185, 1, 400, 'referencia szerinti egyenlőség', 'shallow equality', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1186, 1, 400, 'rekurzió', 'recursion', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1187, 1, 400, 'rekurzív definíció', 'recursive definition', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1188, 1, 400, 'rekurzív hívás', 'recursive call', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1189, 1, 400, 'rendezett n-es', 'tuple', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1190, 1, 400, 'rendezett n-es értékadás', 'tuple assignment', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1191, 1, 400, 'részkifejezés', 'subexpression', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1192, 1, 400, 'rövidzár-kiértékelés', 'short-circuit evaluation', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1193, 1, 400, 'scaffolding', 'scaffolding', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1194, 1, 400, 'segítő', 'helper', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1195, 1, 400, 'sekély másolás', 'shallow copy', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1196, 1, 400, 'skalárral való szorzás', 'scalar multiplication', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1197, 1, 400, 'sor', 'queue', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1198, 1, 400, 'sorbanállási rend', 'queueing policy', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1199, 1, 400, 'sorozat', 'sequence', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1200, 1, 400, 'sprite', 'sprite', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1201, 1, 400, 'standard könyvtár', 'standard library', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1202, 1, 400, 'str', 'str', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1203, 1, 400, 'számláló', 'counter', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1204, 1, 400, 'szelet', 'slice', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1205, 1, 400, 'szemantika', 'semantics', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1206, 1, 400, 'szemantikai hiba', 'semantic error', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1207, 1, 400, 'szerializáció', 'serialization', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1208, 1, 400, 'szint', 'level', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1209, 1, 400, 'szintaktikai hiba', 'syntax error', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1210, 1, 400, 'szintaxis', 'syntax', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1211, 1, 400, 'szkript', 'script', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1212, 1, 400, 'szolgáltató', 'provider', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1213, 1, 400, 'szótár', 'dictionary', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1214, 1, 400, 'szövegelem', 'token', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1215, 1, 400, 'szöveges fájl', 'text file', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1216, 1, 400, 'szülő', 'parent', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1217, 1, 400, 'szülő osztály', 'parent class', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1218, 1, 400, 'tabulátor', 'tab', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1219, 1, 400, 'tárgy kód', 'object code', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1220, 1, 400, 'tartomány', 'range', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1221, 1, 400, 'teljes keresés', 'linear search', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1222, 1, 400, 'teljesen minősített név', 'fully qualified name', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1223, 1, 400, 'természetes nyelv', 'natural language', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1224, 1, 400, 'testvérek', 'siblings', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1225, 1, 400, 'tesztkészlet', 'test suite', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1226, 1, 400, 'tesztvezérelt fejlesztés', 'test-driven development, TDD', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1227, 1, 400, 'típuskonverzió', 'type conversion', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1228, 1, 400, 'tiszta függvény', 'pure function', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1229, 1, 400, 'töréspont', 'breakpoint', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1230, 1, 400, 'törzs', 'body', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1231, 1, 400, 'trichotómia', 'trichotomy', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1232, 1, 400, 'új sor karakter', 'newline', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1233, 1, 400, 'utasítás', 'statement', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1234, 1, 400, 'útvonal', 'path', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1235, 1, 400, 'változó', 'variable', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1236, 1, 400, 'változónév', 'variable name', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1237, 1, 400, 'vászon', 'canvas', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1238, 1, 400, 'végtelen ciklus', 'infinite loop', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1239, 1, 400, 'végtelen rekurzió', 'infinite recursion', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1240, 1, 400, 'verem diagram', 'stack diagram', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1241, 1, 400, 'visszakövetés', 'traceback, stack trace', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1242, 1, 400, 'visszatérési érték', 'return value', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1243, 1, 400, 'void függvény', 'void function', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00'),
(1244, 1, 400, 'whitespace', 'whitespace', 1, 4, '2021-11-23 13:05:00', '2021-11-23 13:05:00');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=407;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- AUTO_INCREMENT a táblához `practice`
--
ALTER TABLE `practice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT a táblához `words`
--
ALTER TABLE `words`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1272;

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
