CREATE TABLE `marcas`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL UNIQUE,
    `created-at` DATETIME,
    `updated-at` DATETIME,
    `deleted-at` DATETIME
);
CREATE TABLE `categorias`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL UNIQUE,
    `created-at` DATETIME,
    `updated-at` DATETIME,
    `deleted-at` DATETIME
);
CREATE TABLE `usuarios`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `imagen` TEXT,
    `direccion` TEXT,
    `fecha-nacimiento` DATE,
    `telefono` INT UNSIGNED,
    `roles-fk` INT UNSIGNED NOT NULL,
    `created-at` DATETIME,
    `updated-at` DATETIME,
    `deleted-at` DATETIME
);
CREATE TABLE `productos`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `precio` DECIMAL(10, 2) NOT NULL,
    `cantidad` INT UNSIGNED NOT NULL,
    `colores-fk` INT UNSIGNED,
    `medidas-fk` INT UNSIGNED,
    `grupos-productos-fk` INT UNSIGNED NOT NULL,
    `created-at` DATETIME,
    `updated-at` DATETIME,
    `deleted-at` DATETIME
);
CREATE TABLE `grupos-productos`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL UNIQUE,
    `detalle` TEXT NOT NULL,
    `ingredientes` TEXT,
    `marcas-fk` INT UNSIGNED NOT NULL,
    `categorias-fk` INT UNSIGNED NOT NULL,
    `created-at` DATETIME,
    `updated-at` DATETIME,
    `deleted-at` DATETIME
);
CREATE TABLE `medidas`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `medida` VARCHAR(255) NOT NULL UNIQUE,
    `created-at` DATETIME,
    `updated-at` DATETIME,
    `deleted-at` DATETIME
);
CREATE TABLE `colores`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL UNIQUE,
    `created-at` DATETIME,
    `updated-at` DATETIME,
    `deleted-at` DATETIME
);
CREATE TABLE `facturas`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `total` DECIMAL(10, 2) NOT NULL,
    `envio` DECIMAL(10, 2),
    `metodo-pago` VARCHAR(255) NOT NULL,
    `usuarios-fk` INT UNSIGNED NOT NULL,
    `created-at` DATETIME,
    `updated-at` DATETIME,
    `deleted-at` DATETIME
);
CREATE TABLE `imagenes`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` TEXT NOT NULL,
    `grupos-productos-fk` INT UNSIGNED NOT NULL,
    `created-at` DATETIME,
    `updated-at` DATETIME,
    `deleted-at` DATETIME
);
CREATE TABLE `roles`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL UNIQUE,
    `created-at` DATETIME,
    `updated-at` DATETIME,
    `deleted-at` DATETIME
);
CREATE TABLE `facturas_productos`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `descuento` INT UNSIGNED,
    `cantidad` INT UNSIGNED NOT NULL,
    `productos-fk` INT UNSIGNED NOT NULL,
    `facturas-fk` INT UNSIGNED NOT NULL,
    `created-at` DATETIME,
    `updated-at` DATETIME,
    `deleted-at` DATETIME
);
CREATE TABLE `referencias`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `puntuacion` SMALLINT UNSIGNED NOT NULL,
    `comentario` TEXT,
    `visibilidad` TINYINT UNSIGNED NOT NULL,
    `usuarios-fk` INT UNSIGNED NOT NULL,
    `grupos-productos-fk` INT UNSIGNED NOT NULL,
    `created-at` DATETIME,
    `updated-at` DATETIME,
    `deleted-at` DATETIME
);
ALTER TABLE
    `grupos-productos` ADD CONSTRAINT `grupos_productos_categorias_fk_foreign` FOREIGN KEY(`categorias-fk`) REFERENCES `categorias`(`id`);
ALTER TABLE
    `grupos-productos` ADD CONSTRAINT `grupos_productos_marcas_fk_foreign` FOREIGN KEY(`marcas-fk`) REFERENCES `marcas`(`id`);
ALTER TABLE
    `facturas_productos` ADD CONSTRAINT `facturas_productos_productos_fk_foreign` FOREIGN KEY(`productos-fk`) REFERENCES `productos`(`id`);
ALTER TABLE
    `facturas_productos` ADD CONSTRAINT `facturas_productos_facturas_fk_foreign` FOREIGN KEY(`facturas-fk`) REFERENCES `facturas`(`id`);
ALTER TABLE
    `imagenes` ADD CONSTRAINT `imagenes_grupos_productos_fk_foreign` FOREIGN KEY(`grupos-productos-fk`) REFERENCES `grupos-productos`(`id`);
ALTER TABLE
    `referencias` ADD CONSTRAINT `referencias_usuarios_fk_foreign` FOREIGN KEY(`usuarios-fk`) REFERENCES `usuarios`(`id`);
ALTER TABLE
    `referencias` ADD CONSTRAINT `referencias_grupos_productos_fk_foreign` FOREIGN KEY(`grupos-productos-fk`) REFERENCES `grupos-productos`(`id`);
ALTER TABLE
    `facturas` ADD CONSTRAINT `facturas_usuarios_fk_foreign` FOREIGN KEY(`usuarios-fk`) REFERENCES `usuarios`(`id`);
ALTER TABLE
    `usuarios` ADD CONSTRAINT `usuarios_roles_fk_foreign` FOREIGN KEY(`roles-fk`) REFERENCES `roles`(`id`);
ALTER TABLE
    `productos` ADD CONSTRAINT `productos_colores_fk_foreign` FOREIGN KEY(`colores-fk`) REFERENCES `colores`(`id`);
ALTER TABLE
    `productos` ADD CONSTRAINT `productos_medidas_fk_foreign` FOREIGN KEY(`medidas-fk`) REFERENCES `medidas`(`id`);
ALTER TABLE
    `productos` ADD CONSTRAINT `productos_grupos-productos_fk_foreign` FOREIGN KEY(`grupos-productos-fk`) REFERENCES `grupos-productos`(`id`);