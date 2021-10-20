-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-10-2021 a las 20:51:02
-- Versión del servidor: 10.4.6-MariaDB
-- Versión de PHP: 7.1.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `be_better`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_personal_profesional`
--

CREATE TABLE `tbl_personal_profesional` (
  `cedula` varchar(11) NOT NULL,
  `nombre_completo` varchar(80) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `profesion` varchar(45) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `municipio` varchar(50) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `sexo` char(1) DEFAULT NULL,
  `vehiculo` varchar(45) DEFAULT NULL,
  `marca` varchar(40) DEFAULT NULL,
  `anio` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tbl_personal_profesional`
--

INSERT INTO `tbl_personal_profesional` (`cedula`, `nombre_completo`, `fecha_nacimiento`, `profesion`, `direccion`, `municipio`, `telefono`, `sexo`, `vehiculo`, `marca`, `anio`) VALUES
('11123', 'Carlos Ortiz', '1979-04-29', 'Ingeniero', 'Santa Cecilia ', 'Cualquiera !!', '5589245', 'M', 'Motocicleta', 'Yamaha', 2015),
('29120135', 'Carmen Pedreira', '1992-11-29', 'Docente', 'Carrera 52 ', 'Cali', '552635', 'F', 'Auto', 'Pollito', 2018),
('E81232123', 'Belén García', '1968-12-15', 'Profesor', 'El piñal', 'Fernandez Feo', 'NN', 'M', '', '', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbl_personal_profesional`
--
ALTER TABLE `tbl_personal_profesional`
  ADD PRIMARY KEY (`cedula`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
