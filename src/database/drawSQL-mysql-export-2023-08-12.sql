CREATE TABLE `colores_productos`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `productos-fk` INT UNSIGNED NOT NULL,
    `colores-fk` INT UNSIGNED NOT NULL,
    `created-at` DATETIME NOT NULL,
    `updated-at` DATETIME NOT NULL,
    `deleted-at` DATETIME NOT NULL
);
CREATE TABLE `marcas`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL,
    `created-at` DATETIME NOT NULL,
    `updated-at` DATETIME NOT NULL,
    `deleted-at` DATETIME NOT NULL
);
CREATE TABLE `categorias`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL,
    `created-at` DATETIME NOT NULL,
    `updated-at` DATETIME NOT NULL,
    `deleted-at` DATETIME NOT NULL
);
CREATE TABLE `medidas_productos`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `medidas-fk` INT UNSIGNED NOT NULL,
    `productos-fk` INT UNSIGNED NOT NULL,
    `created-at` DATETIME NOT NULL,
    `updated-at` DATETIME NOT NULL,
    `deleted-at` DATETIME NOT NULL
);
CREATE TABLE `usuarios`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `imagen` TEXT NOT NULL DEFAULT 'defaultProfilePhoto.jpeg',
    `direccion` TEXT NOT NULL,
    `fecha-nacimiento` DATE NOT NULL,
    `telefono` INT NOT NULL,
    `logged` TINYINT NOT NULL,
    `roles-fk` INT UNSIGNED NOT NULL,
    `created-at` DATETIME NOT NULL,
    `updated-at` DATETIME NOT NULL,
    `deleted-at` DATETIME NOT NULL
);
CREATE TABLE `productos`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL,
    `precio` DECIMAL(6, 2) NOT NULL,
    `detalle` TEXT NOT NULL,
    `imagen` TEXT NOT NULL,
    `fecha-publicacion` DATE NOT NULL,
    `marcas-fk` INT UNSIGNED NOT NULL,
    `categorias-fk` INT UNSIGNED NOT NULL,
    `created-at` DATETIME NOT NULL,
    `updated-at` DATETIME NOT NULL,
    `deleted-at` DATETIME NOT NULL
);
CREATE TABLE `medidas`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `medida` VARCHAR(255) NOT NULL,
    `created-at` DATETIME NOT NULL,
    `updated-at` DATETIME NOT NULL,
    `deleted-at` DATETIME NOT NULL
);
CREATE TABLE `colores`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL,
    `created-at` DATETIME NOT NULL,
    `updated-at` DATETIME NOT NULL,
    `deleted-at` DATETIME NOT NULL
);
CREATE TABLE `facturas`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `total` DECIMAL(6, 2) NOT NULL,
    `fecha` DATETIME NOT NULL,
    `usuarios-fk` INT UNSIGNED NOT NULL,
    `metodo-pago` VARCHAR(255) NOT NULL,
    `created-at` DATETIME NOT NULL,
    `updated-at` DATETIME NOT NULL,
    `deleted-at` DATETIME NOT NULL
);
CREATE TABLE `roles`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL,
    `created-at` DATETIME NOT NULL,
    `updated-at` DATETIME NOT NULL,
    `deleted-at` DATETIME NOT NULL
);
CREATE TABLE `facturas_productos`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `productos-fk` INT UNSIGNED NOT NULL,
    `facturas-fk` INT UNSIGNED NOT NULL,
    `descuento` INT NOT NULL,
    `precio` DECIMAL(6, 2) NOT NULL,
    `created-at` DATETIME NOT NULL,
    `updated-at` DATETIME NOT NULL,
    `deleted-at` DATETIME NOT NULL
);
CREATE TABLE `referencias`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `comentario` TEXT NOT NULL,
    `fecha-creacion` DATETIME NOT NULL,
    `usuarios-fk` INT UNSIGNED NOT NULL,
    `productos-fk` INT UNSIGNED NOT NULL,
    `created-at` DATETIME NOT NULL,
    `updated-at` DATETIME NOT NULL,
    `deleted-at` DATETIME NOT NULL
);
ALTER TABLE
    `productos` ADD CONSTRAINT `productos_categorias_fk_foreign` FOREIGN KEY(`categorias-fk`) REFERENCES `categorias`(`id`);
ALTER TABLE
    `medidas_productos` ADD CONSTRAINT `medidas_productos_productos_fk_foreign` FOREIGN KEY(`productos-fk`) REFERENCES `productos`(`id`);
ALTER TABLE
    `facturas_productos` ADD CONSTRAINT `facturas_productos_productos_fk_foreign` FOREIGN KEY(`productos-fk`) REFERENCES `productos`(`id`);
ALTER TABLE
    `productos` ADD CONSTRAINT `productos_marcas_fk_foreign` FOREIGN KEY(`marcas-fk`) REFERENCES `marcas`(`id`);
ALTER TABLE
    `facturas_productos` ADD CONSTRAINT `facturas_productos_facturas_fk_foreign` FOREIGN KEY(`facturas-fk`) REFERENCES `facturas`(`id`);
ALTER TABLE
    `referencias` ADD CONSTRAINT `referencias_usuarios_fk_foreign` FOREIGN KEY(`usuarios-fk`) REFERENCES `usuarios`(`id`);
ALTER TABLE
    `colores_productos` ADD CONSTRAINT `colores_productos_productos_fk_foreign` FOREIGN KEY(`productos-fk`) REFERENCES `productos`(`id`);
ALTER TABLE
    `referencias` ADD CONSTRAINT `referencias_productos_fk_foreign` FOREIGN KEY(`productos-fk`) REFERENCES `productos`(`id`);
ALTER TABLE
    `colores_productos` ADD CONSTRAINT `colores_productos_colores_fk_foreign` FOREIGN KEY(`colores-fk`) REFERENCES `colores`(`id`);
ALTER TABLE
    `medidas_productos` ADD CONSTRAINT `medidas_productos_medidas_fk_foreign` FOREIGN KEY(`medidas-fk`) REFERENCES `medidas`(`id`);
ALTER TABLE
    `facturas` ADD CONSTRAINT `facturas_usuarios_fk_foreign` FOREIGN KEY(`usuarios-fk`) REFERENCES `usuarios`(`id`);
ALTER TABLE
    `usuarios` ADD CONSTRAINT `usuarios_roles_fk_foreign` FOREIGN KEY(`roles-fk`) REFERENCES `roles`(`id`);