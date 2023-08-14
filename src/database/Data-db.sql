
-- Datos de roles
INSERT INTO roles(id, nombre) VALUES 
(DEFAULT, 'personal');

INSERT INTO roles(id, nombre) VALUES 
(DEFAULT, 'administrador');

-- Datos de marcas
INSERT INTO marcas(id, nombre) VALUES 
(DEFAULT, 'channel');

INSERT INTO marcas(id, nombre) VALUES 
(DEFAULT, 'victoria secret');

-- Datos de colores
INSERT INTO colores(id, nombre) VALUES 
(DEFAULT, 'rojo');

INSERT INTO colores(id, nombre) VALUES 
(DEFAULT, 'amarillo');

INSERT INTO colores(id, nombre) VALUES 
(DEFAULT, 'verde');

INSERT INTO colores(id, nombre) VALUES 
(DEFAULT, 'marron');

INSERT INTO colores(id, nombre) VALUES 
(DEFAULT, 'morado');

INSERT INTO colores(id, nombre) VALUES 
(DEFAULT, 'azul');

INSERT INTO colores(id, nombre) VALUES 
(DEFAULT, 'naranja');

INSERT INTO colores(id, nombre) VALUES 
(DEFAULT, 'negro');

INSERT INTO colores(id, nombre) VALUES 
(DEFAULT, 'lima');

INSERT INTO colores(id, nombre) VALUES 
(DEFAULT, 'rosa');

INSERT INTO colores(id, nombre) VALUES 
(DEFAULT, 'gris');

-- Datos de medidas
INSERT INTO medidas(id, medida) VALUES 
(DEFAULT, '10ml');

INSERT INTO medidas(id, medida) VALUES 
(DEFAULT, '50ml');

INSERT INTO medidas(id, medida) VALUES 
(DEFAULT, '100ml');

INSERT INTO medidas(id, medida) VALUES 
(DEFAULT, '1L');

INSERT INTO medidas(id, medida) VALUES 
(DEFAULT, '2L');

INSERT INTO medidas(id, medida) VALUES 
(DEFAULT, '3L');

INSERT INTO medidas(id, medida) VALUES 
(DEFAULT, '10cc');

INSERT INTO medidas(id, medida) VALUES 
(DEFAULT, '50cc');

INSERT INTO medidas(id, medida) VALUES 
(DEFAULT, '100cc');

INSERT INTO medidas(id, medida) VALUES 
(DEFAULT, '10g');

INSERT INTO medidas(id, medida) VALUES 
(DEFAULT, '50g');

INSERT INTO medidas(id, medida) VALUES 
(DEFAULT, '100g');

INSERT INTO medidas(id, medida) VALUES 
(DEFAULT, '1kg');

INSERT INTO medidas(id, medida) VALUES 
(DEFAULT, '2kg');

INSERT INTO medidas(id, medida) VALUES 
(DEFAULT, '3kg');

-- Datos de categorias
INSERT INTO categorias(id, nombre) VALUES 
(DEFAULT, 'facial');

INSERT INTO categorias(id, nombre) VALUES 
(DEFAULT, 'capilar');

-- Datos de referencias

-- Datos de facturas

-- Datos de usuarios
INSERT INTO usuarios(id, nombre, email, `password`, imagen, direccion, `fecha-nacimiento`, telefono, `roles-fk`, logged) VALUES 
(DEFAULT, 'Rodrigo', 'rodrigol@gmail.com', '$2a$10$Dy50boBM5G7kKNCfsF7tZOUrmhq/4w8y69ImaoSyXarvHlL0jnXS6', '1691715394303_img.jpg', 'calle realmente falsa 29', '02-12-1983', 412772311, 1, 0);

INSERT INTO usuarios(id, nombre, email, `password`, imagen, direccion, `fecha-nacimiento`, telefono, `roles-fk`, logged) VALUES 
(DEFAULT,'Laura', 'laurita@gmail.com', '$2a$10$xIkq2GV3qlIiQZA2/Rc5Te6BuXL.R66MYaj9I2TSpsoFxeHe6Wq/y', '1691715465327_img.jpg', 'Hyrule callejon druida 15', '11-07-1993', 533907180, 1, 0);

INSERT INTO usuarios(id, nombre, email, `password`, imagen, direccion, `fecha-nacimiento`, telefono, `roles-fk`, logged) VALUES 
(DEFAULT, 'fifi', 'mimi@soy.com', '$2a$10$2GczhNkL4hqUhevsCpOSKe1.xqaUJAFOtlBAXNuOUdtYWL3BjnzPq', '1691713669955_img.jpg', 'avenida marciana helistica 2', '17-09-2005', 920678432, 2, 0);


INSERT INTO usuarios(id, nombre, email, `password`, `roles-fk`, logged) VALUES 
(DEFAULT, 'sofi', 'adb@fff.com', '$2a$10$kZRcMbgAHvMaXRjIfVqDZuonToJW1ES/6VuPUZB.wbnbumPJPJZ9S', 1, 0);


-- Datos de productos
INSERT INTO productos(id, nombre, precio, detalle, imagen, `fecha-publicacion`, `cantidad`, `marcas-fk`, `categorias-fk`) VALUES 
(DEFAULT, 'Face Cream', 5000, 'especialmente formulado para tratar y prevenir la caspa, calma la irritación del cuero cabelludo, elimina las escamas, equilibra el pH para evitar la resequedad y regular la producción de grasa. Rinde de 70 a 80 lavadas.', 'facecare.png', '17-09-2015', 50, 1, 1);

INSERT INTO productos(id, nombre, precio, detalle, imagen, `fecha-publicacion`, `cantidad`, `marcas-fk`, `categorias-fk`) VALUES 
(DEFAULT, 'Face Cream 2', 7000, 'Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.', 'facecare2.png', '17-09-2019', 31, 2, 2);

INSERT INTO productos(id, nombre, precio, detalle, imagen, `fecha-publicacion`, `cantidad`, `marcas-fk`, `categorias-fk`) VALUES 
(DEFAULT, 'Oil', 3000, 'Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.', 'oil.png', '17-09-2019', 12, 2, 1);

