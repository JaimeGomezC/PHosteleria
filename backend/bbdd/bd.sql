DROP TABLE turnos;
CREATE TABLE `Turnos` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `id_admin` int,
  `id_menu` int,
  `tipoTurno` varchar(255),
  `fecha` datetime,
  `n_plazas` int,
  `observaciones` varchar(400),
  `visible` int
);
INSERT into turnos set id_admin='1',id_menu='1',tipoTurno='Comida',fecha='2023/04/01',n_plazas='50',visible='1',observaciones='Al que madruga..';
INSERT into turnos set id_admin='1',id_menu='2',tipoTurno='Cena',fecha='2023/04/02',n_plazas='20',visible='1',observaciones='Duerme la siesta..';
INSERT into turnos set id_admin='1',id_menu='3',tipoTurno='Comida',fecha='2023/04/03',n_plazas='30',visible='1',observaciones='Cena temprano..';

DROP TABLE menu;
CREATE TABLE `menu` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `menu` varchar(255),
  `observaciones` varchar(255)
);
INSERT into menu set menu='Tortilla de patatas',observaciones='Preparada con mucho cariño';
INSERT into menu set menu='Michirones',observaciones='Tipicos de la huerta';

DROP TABLE administrador;
CREATE TABLE `administrador` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255),
  `password` varchar(255),
  `token` varchar(255),
  `nombre` varchar(255),
  `activo` int
);

INSERT INTO `administrador` (`id`, `username`, `password`, `token`, `nombre`, `activo`) VALUES
(100, 'prueba', '655e786674d9d3e77bc05ed1de37b4b6bc89f788829f9f3c679e7687b410c89b', '', 'Usuario de Prueba', 1);

CREATE TABLE `profesor` (
  `id` int PRIMARY KEY,
  `nombre` varchar(255),
  `apellido1` varchar(255),
  `apellido2` varchar(255),
  `observaciones` varchar(255),
  `activo` int
);

CREATE TABLE `grupo` (
  `id` int PRIMARY KEY,
  `nombre` varchar(255),
  `observaciones` varchar(255),
  `id_profesor` int,
  `activo` int
);

CREATE TABLE `alumno` (
  `id` int PRIMARY KEY,
  `nombre` varchar(255),
  `apellido1` varchar(255),
  `apellido2` varchar(255),
  `id_grupo` int,
  `observaciones` varchar(255),
  `activo` int
);

CREATE TABLE `reservas` (
  `id` int PRIMARY KEY,
  `id_grupo` int,
  `id_turno` int,
  `id_cliente` int,
  `observaciones` int,
  `fecha` datetime,
  `n_plazas` int
);

CREATE TABLE `cliente` (
  `id` int PRIMARY KEY,
  `nombre` varchar(255),
  `apellido1` varchar(255),
  `apellido2` varchar(255),
  `observaciones` int,
  `fecha` datetime
);

ALTER TABLE `Turnos` ADD FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id`);

ALTER TABLE `reservas` ADD FOREIGN KEY (`id_turno`) REFERENCES `Turnos` (`id`);

ALTER TABLE `Turnos` ADD FOREIGN KEY (`id_admin`) REFERENCES `administrador` (`id`);

ALTER TABLE `reservas` ADD FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`);

ALTER TABLE `grupo` ADD FOREIGN KEY (`id_profesor`) REFERENCES `profesor` (`id`);

ALTER TABLE `reservas` ADD FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id`);

ALTER TABLE `alumno` ADD FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id`);
