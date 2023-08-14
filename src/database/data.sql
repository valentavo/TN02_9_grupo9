
-- Datos de roles
INSERT INTO roles(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'personal', NOW(), NOW());

INSERT INTO roles(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'administrador', NOW(), NOW());

-- Datos de marcas
INSERT INTO marcas(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'channel', NOW(), NOW());

INSERT INTO marcas(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'victoria secret', NOW(), NOW());

-- Datos de colores
INSERT INTO colores(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'rojo', NOW(), NOW());

INSERT INTO colores(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'amarillo', NOW(), NOW());

INSERT INTO colores(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'verde', NOW(), NOW());

INSERT INTO colores(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'marron', NOW(), NOW());

INSERT INTO colores(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'morado', NOW(), NOW());

INSERT INTO colores(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'azul', NOW(), NOW());

INSERT INTO colores(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'naranja', NOW(), NOW());

INSERT INTO colores(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'negro', NOW(), NOW());

INSERT INTO colores(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'lima', NOW(), NOW());

INSERT INTO colores(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'rosa', NOW(), NOW());

INSERT INTO colores(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'gris', NOW(), NOW());

-- Datos de medidas
INSERT INTO medidas(id, medida, `created-at`, `updated-at`) VALUES 
(DEFAULT, '10ml', NOW(), NOW());

INSERT INTO medidas(id, medida, `created-at`, `updated-at`) VALUES 
(DEFAULT, '50ml', NOW(), NOW());

INSERT INTO medidas(id, medida, `created-at`, `updated-at`) VALUES 
(DEFAULT, '100ml', NOW(), NOW());

INSERT INTO medidas(id, medida, `created-at`, `updated-at`) VALUES 
(DEFAULT, '1L', NOW(), NOW());

INSERT INTO medidas(id, medida, `created-at`, `updated-at`) VALUES 
(DEFAULT, '2L', NOW(), NOW());

INSERT INTO medidas(id, medida, `created-at`, `updated-at`) VALUES 
(DEFAULT, '3L', NOW(), NOW());

INSERT INTO medidas(id, medida, `created-at`, `updated-at`) VALUES 
(DEFAULT, '10cc', NOW(), NOW());

INSERT INTO medidas(id, medida, `created-at`, `updated-at`) VALUES 
(DEFAULT, '50cc', NOW(), NOW());

INSERT INTO medidas(id, medida, `created-at`, `updated-at`) VALUES 
(DEFAULT, '100cc', NOW(), NOW());

INSERT INTO medidas(id, medida, `created-at`, `updated-at`) VALUES 
(DEFAULT, '10g', NOW(), NOW());

INSERT INTO medidas(id, medida, `created-at`, `updated-at`) VALUES 
(DEFAULT, '50g', NOW(), NOW());

INSERT INTO medidas(id, medida, `created-at`, `updated-at`) VALUES 
(DEFAULT, '100g', NOW(), NOW());

INSERT INTO medidas(id, medida, `created-at`, `updated-at`) VALUES 
(DEFAULT, '1kg', NOW(), NOW());

INSERT INTO medidas(id, medida, `created-at`, `updated-at`) VALUES 
(DEFAULT, '2kg', NOW(), NOW());

INSERT INTO medidas(id, medida, `created-at`, `updated-at`) VALUES 
(DEFAULT, '3kg', NOW(), NOW());

-- Datos de categorias
INSERT INTO categorias(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'facial', NOW(), NOW());

INSERT INTO categorias(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'capilar', NOW(), NOW());

-- Datos de referencias

-- Datos de facturas

-- Datos de usuarios
INSERT INTO usuarios(id, nombre, email, `password`, imagen, direccion, `fecha-nacimiento`, telefono, `roles-fk`, logged, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'Rodrigo', 'rodrigol@gmail.com', '$2a$10$Dy50boBM5G7kKNCfsF7tZOUrmhq/4w8y69ImaoSyXarvHlL0jnXS6', '1691715394303_img.jpg', 'calle realmente falsa 29', '02-12-1983', 412772311, 1, 0, NOW(), NOW());

INSERT INTO usuarios(id, nombre, email, `password`, imagen, direccion, `fecha-nacimiento`, telefono, `roles-fk`, logged, `created-at`, `updated-at`) VALUES 
(DEFAULT,'Laura', 'laurita@gmail.com', '$2a$10$xIkq2GV3qlIiQZA2/Rc5Te6BuXL.R66MYaj9I2TSpsoFxeHe6Wq/y', '1691715465327_img.jpg', 'Hyrule callejon druida 15', '11-07-1993', 533907180, 1, 0, NOW(), NOW());

INSERT INTO usuarios(id, nombre, email, `password`, imagen, direccion, `fecha-nacimiento`, telefono, `roles-fk`, logged, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'fifi', 'mimi@soy.com', '$2a$10$2GczhNkL4hqUhevsCpOSKe1.xqaUJAFOtlBAXNuOUdtYWL3BjnzPq', '1691713669955_img.jpg', 'avenida marciana helistica 2', '17-09-2005', 920678432, 2, 0, NOW(), NOW());


INSERT INTO usuarios(id, nombre, email, `password`, `roles-fk`, logged, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'sofi', 'adb@fff.com', '$2a$10$kZRcMbgAHvMaXRjIfVqDZuonToJW1ES/6VuPUZB.wbnbumPJPJZ9S', 1, 0, NOW(), NOW());


-- Datos de productos
INSERT INTO productos(id, nombre, precio, detalle, imagen, `cantidad`, `marcas-fk`, `categorias-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'Face Cream', 5000, 'especialmente formulado para tratar y prevenir la caspa, calma la irritación del cuero cabelludo, elimina las escamas, equilibra el pH para evitar la resequedad y regular la producción de grasa. Rinde de 70 a 80 lavadas.', 'facecare.png', 50, 1, 1, NOW(), NOW());

INSERT INTO productos(id, nombre, precio, detalle, imagen, `cantidad`, `marcas-fk`, `categorias-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'Face Cream 2', 7000, 'Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.', 'facecare2.png', 31, 2, 2, NOW(), NOW());

INSERT INTO productos(id, nombre, precio, detalle, imagen, `cantidad`, `marcas-fk`, `categorias-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'Oil', 3000, 'Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.', 'oil.png', 12, 2, 1, NOW(), NOW());

