
-- Datos de roles
INSERT INTO roles(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'personal', NOW(), NOW());

INSERT INTO roles(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'administrador', NOW(), NOW());

-- Datos de marcas
INSERT INTO marcas(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'Channel', NOW(), NOW());

INSERT INTO marcas(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'Victoria Secret', NOW(), NOW());

INSERT INTO marcas(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'Dolce & Gabbana', NOW(), NOW());

INSERT INTO marcas(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'Maybellin', NOW(), NOW());

INSERT INTO marcas(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'Organics', NOW(), NOW());

INSERT INTO marcas(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'Avon', NOW(), NOW());

INSERT INTO marcas(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'Revlon', NOW(), NOW());

INSERT INTO marcas(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'Shakira', NOW(), NOW());

INSERT INTO marcas(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'Sukin', NOW(), NOW());

-- Datos de colores
INSERT INTO colores(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'Rojo', NOW(), NOW());

INSERT INTO colores(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'Amarillo', NOW(), NOW());

INSERT INTO colores(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'Verde', NOW(), NOW());

INSERT INTO colores(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'Marrón', NOW(), NOW());

INSERT INTO colores(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'Morado', NOW(), NOW());

INSERT INTO colores(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'Azul', NOW(), NOW());

INSERT INTO colores(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'Naranja', NOW(), NOW());

INSERT INTO colores(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'Negro', NOW(), NOW());

INSERT INTO colores(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'Lima', NOW(), NOW());

INSERT INTO colores(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'Rosa', NOW(), NOW());

INSERT INTO colores(id, nombre, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'Gris', NOW(), NOW());

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
(DEFAULT, 'Capilar', NOW(), NOW());

INSERT INTO categorias VALUES 
(DEFAULT, 'Cuidado de la piel', NOW(),NOW(),NULL);

INSERT INTO categorias VALUES 
(DEFAULT, 'Maquillajes', NOW(),NOW(),NULL);

INSERT INTO categorias VALUES 
(DEFAULT, 'Cuidado del cabello', NOW(),NOW(),NULL);

INSERT INTO categorias VALUES 
(DEFAULT, 'Manos y uñas', NOW(),NOW(),NULL);

INSERT INTO categorias VALUES 
(DEFAULT, 'Facial', NOW(),NOW(),NULL);

INSERT INTO categorias VALUES 
(DEFAULT, 'Perfumes', NOW(),NOW(),NULL);


-- Datos de referencias

-- Datos de facturas

-- Datos de usuarios
INSERT INTO usuarios(id, nombre, email, `password`, imagen, direccion, `fecha-nacimiento`, telefono, `roles-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'Rodrigo', 'rodrigol@gmail.com', '$2a$10$Dy50boBM5G7kKNCfsF7tZOUrmhq/4w8y69ImaoSyXarvHlL0jnXS6', '1691715394303_img.jpg', 'calle realmente falsa 29', '1992-01-19', 412772311, 1, NOW(), NOW());

INSERT INTO usuarios(id, nombre, email, `password`, imagen, direccion, `fecha-nacimiento`, telefono, `roles-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT,'Laura', 'laurita@gmail.com', '$2a$10$xIkq2GV3qlIiQZA2/Rc5Te6BuXL.R66MYaj9I2TSpsoFxeHe6Wq/y', '1691715465327_img.jpg', 'Hyrule callejon druida 15', '1971-11-02', 533907180, 1, NOW(), NOW());

INSERT INTO usuarios(id, nombre, email, `password`, imagen, direccion, `fecha-nacimiento`, telefono, `roles-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'fifi', 'mimi@soy.com', '$2a$10$2GczhNkL4hqUhevsCpOSKe1.xqaUJAFOtlBAXNuOUdtYWL3BjnzPq', '1691713669955_img.jpg', 'avenida marciana helistica 2', '2003-06-27', 920678432, 2, NOW(), NOW());

INSERT INTO usuarios(id, nombre, email, `password`, `roles-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'sofi', 'adb@fff.com', '$2a$10$kZRcMbgAHvMaXRjIfVqDZuonToJW1ES/6VuPUZB.wbnbumPJPJZ9S', 1, NOW(), NOW());

INSERT INTO usuarios(id, nombre, email, `password`, `roles-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 'eritos', 'ere@dfdf.sd', '$2a$10$kZRcMbgAHvMaXRjIfVqDZuonToJW1ES/6VuPUZB.wbnbumPJPJZ9S', 1, NOW(), NOW());

--In case the foreign keys bother in the process use this:
--SET FOREIGN_KEY_CHECKS = 0;

-- Datos de productos
INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 4500.00, 19, NULL, 3, 1, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 7000.00, 26, 4, 3, 2, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 7000.00, 26, 4, 11, 2, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 7000.00, 26, 10, 3, 2, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 7000.00, 26, 10, 11, 2, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 7000.00, 26, 11, 3, 2, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 3000.00, 3, NULL, 4, 3, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 6000.00, 23, 7, 10, 4, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 6000.00, 23, 7, 11, 4, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 2500.00, 8, 1, 1, 5, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 2500.00, 8, 4, 1, 5, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 2500.00, 8, 10, 1, 5, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 3500.00, 0, 1, 1, 6, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 3500.00, 0, 1, 5, 6, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 3500.00, 0, 1, 12, 6, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 3500.00, 0, 2, 1, 6, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 3500.00, 0, 2, 5, 6, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 3500.00, 0, 2, 12, 6, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 3500.00, 0, 5, 1, 6, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 3500.00, 0, 5, 5, 6, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 3500.00, 0, 5, 12, 6, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 3500.00, 0, 8, 1, 6, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 3500.00, 0, 8, 5, 6, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 3500.00, 0, 8, 12, 6, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 5000.00, 9, 10, 2, 7, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 5000.00, 9, 10, 3, 7, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 12000.00, 7, NULL, 7, 8, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 12000.00, 7, NULL, 13, 8, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 5000.00, 5, NULL, 9, 9, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 5000.00, 5, NULL, 15, 9, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 5600.00, 11, NULL, 1, 10, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 5600.00, 11, NULL, 2, 10, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 6000.00, 33, NULL, 4, 11, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 10000.00, 10, NULL, 3, 12, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 10000.00, 10, NULL, 4, 12, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 15000.00, 1, 2, 10, 13, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 15000.00, 1, 6, 10, 13, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 15000.00, 1, 9, 10, 13, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 15000.00, 1, 11, 10, 13, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 15000.00, 1, 6, 11, 13, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 15000.00, 1, 11, 11, 13, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 15000.00, 1, 2, 13, 13, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 15000.00, 1, 6, 13, 13, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 15000.00, 1, 11, 13, 13, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 4500.00, 25, NULL, 7, 14, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 4500.00, 25, NULL, 8, 14, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 4500.00, 25, NULL, 9, 14, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 5600.00, 30, 2, 2, 15, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 5600.00, 30, 2, 3, 15, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 5600.00, 30, 7, 2, 15, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 5600.00, 30, 7, 3, 15, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 2000.00, 15, NULL, 1, 16, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 2000.00, 15, NULL, 2, 16, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 3500.00, 27, NULL, 2, 17, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 3999.00, 10, NULL, 1, 18, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 3999.00, 10, NULL, 2, 18, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 3999.00, 10, NULL, 3, 18, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 3000.00, 14, NULL, 1, 19, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 3000.00, 14, NULL, 2, 19, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 3000.00, 14, NULL, 3, 19, NOW(), NOW());

INSERT INTO productos(id, precio, `cantidad`, `colores-fk`, `medidas-fk`, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES 
(DEFAULT, 3000.00, 14, NULL, 4, 19, NOW(), NOW());

-- Datos de gurpos-productos
INSERT INTO `grupos-productos`(id, nombre, detalle, `categorias-fk`, ingredientes, `marcas-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'Limpiador de Maquillaje', 'Remueve el maquillaje sin irritar o secar la piel.', 5, 'Aqua, Yeast Extract, Crambe Abyssinica Seed Oil Phytosterol Esters, Betaíne, Hydrogenated Ethylhexyl Olivate, Polyglyceryl-6 Distearate, Xantahn Gum, Glyceryl Stearate, Isoamyl Laurate, Sodium Stearoyl Lactylate, Jojoba Esters, Butyrospermum Parkii Butter, Glycine Soja Oil, Ahnfeltiopsis Concinna Extract / Ahnfeltia Concinna Extract, Vegetable Collagen, Hydrolyzed Hyaluronic Acid, Hydrogenated Olive Oil Unsaponifiables, Leuconostoc/Radish Root Ferment Filtrate, Cetyl Alcohol, Polyglyceryl-3 Beeswax, Tapioca Starch, Potassium Sorbate, Tocopherol, Glucosyl Ceramide, Algin, B-Sitosterol, Phospholipids, Squalene, Sodium Benzoate, Didecyldimmonium Chloride, Sodium Dehydroacetate, Cholesterol, Citric Acid, Parfum.', 3, NOW(), NOW());

INSERT INTO `grupos-productos`(id, nombre, detalle, `categorias-fk`, ingredientes, `marcas-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'Crema Exfoliante AHA', 'Crema exfoliante AHA facial y corporal con Alfa hidroxiácidos; como el ácido glicólico, ácido láctico y ácido mandélico son los más usados dentro de las rutinas de belleza actuales. Al ser del tipo hidrofílico, ayudan a renovar las capas superficiales de la piel, estimular la síntesis del colágeno y elastina, combatir la hiperpigmentación (y también desinflamar granitos).', 4, 'Componentes: AHA, Manteca de cacao y Chamomilla', 2, NOW(), NOW());

INSERT INTO `grupos-productos`(id, nombre, detalle, `categorias-fk`, ingredientes, `marcas-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'Sesaderma Oil', 'Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.', 9, NULL, 1, NOW(), NOW());

INSERT INTO `grupos-productos`(id, nombre, detalle, `categorias-fk`, ingredientes, `marcas-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'Serum contorno de ojos', 'Este poderoso sérum contiene una rejuvenecedora mezcla de péptidos, niacinamida, coenzima Q10 y extracto de pepino, que estimula la producción de colágeno y elastina, al tiempo que reduce la profundidad de las arrugas y las manchas de la edad. En solo unos pocos días tendrás una mirada más fresca, descansada y juvenil. ¡No vas a poder creer lo que están viendo tus ojos!
 
 Fue creado para combatir los principales signos de deterioro de la piel debajo y alrededor de los ojos tales como arrugas, líneas de expresión, ojeras, hinchazón y falta de firmeza.
 
 Ideal para todo tipo de piel.', 9, 'Péptidos: moléculas que surgen de la unión de dos o más aminoácidos. Los tetrapéptidos ayudan a reducir la apariencia de las arrugas y a promover una mayor elasticidad en la piel.
 Niacinamida o vitamina B3: potente comunicador intracelular que contribuye a mejorar la elasticidad en la piel y a recuperar un tono y textura saludable. Este ingrediente, presente en el aceite de oliva, es un antioxidante que previene los daños de los rayos UV, la formación de manchas y promueve el crecimiento celular.
 Extracto de pepino: contiene propiedades hidratantes, descongestivas, antioxidantes y revitalizantes.
 
 Producto cruelty free certificado por PETA.', 2, NOW(), NOW());

INSERT INTO `grupos-productos`(id, nombre, detalle, `categorias-fk`, ingredientes, `marcas-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'Esmalte Cremoso Revlon', 'El esmalte de uñas Revlon Nail Enamel con su fórmula Chip Defiant™ cubre las uñas con un color maravillosamente suave. Con ShadeLock™ Technology resistente a la decoloración.', 8, NULL, 7, NOW(), NOW());

INSERT INTO `grupos-productos`(id, nombre, detalle, `categorias-fk`, ingredientes, `marcas-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'Esmaltes Cremosos de Maybelline', 'Los Esmaltes Cremosos de Maybelline, vienen en una amplia gama de colores que año a año se actualiza, de acuerdo a las últimas tendencias de la moda y al gusto de las consumidoras. En cada etapa del proceso de desarrollo de los nuevos tonos, estos son sometidos a exigentes pruebas de calidad que aseguran una excelente adherencia, brillo, durabilidad, viscosidad, secado y fijación sobre las uñas. Los esmaltes de Masglo no tienen agentes que perjudiquen la uña, ofreciéndole protección, dureza, brillo y una gran variedad de tonos entre esmaltes Cremosos, Translúcidos, Perlados y Metalizados.', 8, 'Fluorado de Magnesio y Aceite de Coco', 4, NOW(), NOW());

INSERT INTO `grupos-productos`(id, nombre, detalle, `categorias-fk`, ingredientes, `marcas-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'Crema De Manos  Con Vitaminas A & E Verano', 'La Crema de Manos y Cuerpo con Vitaminas A & E Verano Vital de Sukin es un producto grasoso de rápida absorción, elaborada con Vitaminas A & E humectantes y emolientes que proporcionan frescura y suavidad a manos y cuerpo.  Este producto te brindará un aroma de salidas cítricas de mandarina, limón y eucalipto hasta llegar un fondo vital de sándalo y ámbar.', 8, NULL, 9, NOW(), NOW());

INSERT INTO `grupos-productos`(id, nombre, detalle, `categorias-fk`, ingredientes, `marcas-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'Perfume EDT Shakira Dance Ocean', 'Dance Ocean de Shakira es una fragancia de la familia olfativa para Mujeres. Esta fragrancia es nueva. Dance Ocean se lanzó en 2023. Las Notas de Salida son bergamota, mandarina y mango. Las Notas de Corazón son pimienta rosa, jengibre, rosa y jazmín. Las Notas de Fondo son cedro, almizcle y vainilla.', 10, 'Aceite de ajonjolí y carbón activado', 8, NOW(), NOW());

INSERT INTO `grupos-productos`(id, nombre, detalle, `categorias-fk`, ingredientes, `marcas-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'Crema Hidratante Anti-Edad Con Q10', 'La Crema Hidratante Anti-Edad con Q10 de ORGANICS ofrece emulsión ligera de rápida absorción indicada para todo tipo de piel, elaborada con Coenzima Q10; excelente antioxidante y activador de procesos de regeneración celular. Ahora con Prebiótico que estimula la barrera de protección, contribuyendo a fortalecer su inmunidad. Contiene Extracto de Raíz de Ginseng indiano, que protege la piel de la luz emitida por dispositivos electrónicos.', 9, NULL, 5, NOW(), NOW());

INSERT INTO `grupos-productos`(id, nombre, detalle, `categorias-fk`, ingredientes, `marcas-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'Crema Hidratante Regeneradora Con Liposomas', 'La Crema Hidratante Regeneradora con Liposomas de Organics es una emulsión ligera de rápida absorción que mejora la apariencia de la piel haciéndola ver más saludable y radiante. Elaborada con Melhydran LS, complejo natural hidroregulador que brinda humectación prolongada a la epidermis. Además está enriquecida con liposomas ASC III, que penetran profundamente la piel y estimulan la regeneración celular.', 9, 'Su tecnología de eficacia probada combina:
 Mieles y jalea real
 Ácido hialurónico 
 Contiene una serie de productos de la abeja rigurosamente seleccionados: exclusiva miel de la isla de Ouessant, miel de Córcega, miel de trébol de Nueva Zelanda y una jalea real recolectada en Francia.', 5, NOW(), NOW());

INSERT INTO `grupos-productos`(id, nombre, detalle, `categorias-fk`, ingredientes, `marcas-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'Repair Shampoo Reconstructor', 'El Shampoo Reconstructor de Sukin es un shampoo reparador ideal para cabello decolorado o sobreprocesado. Devuelve la fuerza para evitar el rompimiento de la hebra.', 6, NULL, 9, NOW(), NOW());

INSERT INTO `grupos-productos`(id, nombre, detalle, `categorias-fk`, ingredientes, `marcas-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'Semi Di Lino Moisture Nutritive Shampoo', 'El Shampoo Semi Di Lino Moisture de Avon te ofrece limpieza y nutrición completa, para una suavidad y una sedosidad característica de los cabellos sanos.', 6, NULL, 6, NOW(), NOW());

INSERT INTO `grupos-productos`(id, nombre, detalle, `categorias-fk`, ingredientes, `marcas-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'Polvo Facial Compacto Aclarante Y Humectante', 'El Polvo Facial Compacto Aclarante y Humectante de Victoria Secret está elaborado con fino Polvo de Arroz, Ácido hialurónico y Sepiwhite ingredientes activos aclarantes y humectantes que ayudan a unificar el tono de la piel.', 5, NULL, 2, NOW(), NOW());

INSERT INTO `grupos-productos`(id, nombre, detalle, `categorias-fk`, ingredientes, `marcas-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'Loción tónica purificante', 'Loción tónica purificante para pieles grasas o mixtas que ayuda a restaurar el equilibrio de la microbiota cutánea gracias al revolucionario Microbiote complex , a la vez que reequilibra el tipo de piel, dejándola saludable y bella.', 9, 'ingredientes marinos y polifenoles de azafrán', 4, NOW(), NOW());

INSERT INTO `grupos-productos`(id, nombre, detalle, `categorias-fk`, ingredientes, `marcas-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'Exfoliante facial en gel', 'Gel exfoliante facial activo para todo tipo de pieles, basado en las propiedades exfoliantes de la vitamina C y la vitamina B3.', 9, 'Ingredientes principales: niacinamida, vitamina C, vitamina E, proteínas de arroz hidrolizadas, aceite de camelia japonesa, vitamina B5, B6.', 6, NOW(), NOW());

INSERT INTO `grupos-productos`(id, nombre, detalle, `categorias-fk`, ingredientes, `marcas-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'Mascarilla nutri-hidratante', 'Contiene un 46% de granada rica en polifenoles para proporcionar una hidratación instantánea y a largo plazo a las pieles secas y castigadas.
 Esta mascarilla hidratante está elaborada con fibra natural derivada de plantas para una excelente adherencia que proporciona una profunda penetración de los ingredientes activos.
 Esta solución hidratante altamente concentrada favorece la barrera cutánea evitando la pérdida de agua y protegiendo contra los factores de estrés ambiental.', 9, 'Punica Granatum Fruit Extract, Water, Methylpropanediol, Glycerin, 1,2-Hexanediol, Hydroxyethyl Acrylate/Sodium Acryloyldimethyl Taurate Copolymer, Betaine, Diphenylsiloxy Phenyl Trimethicone, Panthenol, PEG-60 Hydrogenated Castor Oil, Glycosyl Trehalose, Hydrogenated Starch Hydrolysate, Xanthan Gum, Diphenyl Dimethicone, Octyldodeceth-16, Triethylhexanoin, Allantoin, Adenosine, Polysorbate 60, Sorbitan Isostearate, Hydrogenated Lecithin, Polyglyceryl-10 Oleate, Sodium Hyaluronate, Glyceryl Acrylate/Acrylic Acid Copolymer, Coco-Caprylate/Caprate, Prunus Armeniaca (Apricot) Kernel Oil, Vitis Vinifera (Grape) Seed Oil, Caprylic/Capric Triglyceride, Hyaluronic Acid, Fucus Vesiculosus Extract, Prunella Vulgaris Extract, Butylene Glycol, Soluble Collagen, Citrus Paradisi (Grapefruit) Seed Oil, Mangifera Indica (Mango) Seed Oil, Punica Granatum Seed Oil, Solanum Lycopersicum (Tomato) Seed Oil, Phytosterols, Tocopherol, Disodium EDTA, Phenoxyethanol, Chlorphenesin, Fragrance', 7, NOW(), NOW());

INSERT INTO `grupos-productos`(id, nombre, detalle, `categorias-fk`, ingredientes, `marcas-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'Crema Cactus hidratante', 'Una crema hidratante que calma rápidamente la piel sensible formando una barrera de hidratación con extracto de tallo de Opuntia Ficus-Indica y pantenol.', 9, 'Opuntia Ficus-Indica Stem Extract, Butylene Glycol, Panthenol,
 Cetyl Ethylhexanoate, Caprylic/Capric Triglyceride, Propanediol, 1,2-Hexanediol, Cetearyl Alcohol, C13-15 Alkane, Glyceryl Stearate, C14-22 Alcohols, Simethicone, Palmitic Acid, Sorbitan Stearate, Stearic Acid, Carbomer, Tromethamine, Dipropylene Glycol, C12-20 Alkyl Glucoside, Polyglyceryl-6 Oleate, Sodium Polyacrylate Starch, Hydroxyacetophenone, Caprylyl Glycol, Ethylhexylglycerin, Disodium EDTA, Aqua/Water, Glucose, Dipotassium Glycyrrhizate.', 8, NOW(), NOW());

INSERT INTO `grupos-productos`(id, nombre, detalle, `categorias-fk`, ingredientes, `marcas-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'Tónico facial suave', 'Tónico facial suave, contiene una mezcla de AHA, BHA y PHA que ayuda a eliminar las células muertas de la piel y a limpiar los poros.', 9, 'Opuntia humifusa Flower/Stem Extract, Glycerin, Water, Diisostearyl Malate, Butylene Glycol, Isononyl Isononanoate, Pentylene Glycol, 1,2-Hexanediol, Jojoba Esters, Chlorella vulgaris Extract, Citrus grandis (Grapefruit) Peel Oil, Pelargonium graveolens Oil, Cedrus atlantica Bark Oil, Citrus Aurantium bergamia (Bergamot) Fruit Oil, Michelia alba Flower Oil, Citrus Aurantium dulcis (Orange) Oil, Salvia sclarea (Clary) Oil, Cananga odorata Flower Oil, Cymbopogon martini Oil, Citrus Aurantium dulcis (Orange) Peel Oil, Sedum sarmentosum Extract, Citrus aurantifolia (Lime) Oil, Cinnamomum cassia Leaf Oil, Rose Flower Oil, Bacillus Ferment, Citrus tangerina (Tangerine) Extract, Terminalia ferdinandiana Fruit Extract.', 9, NOW(), NOW());

INSERT INTO `grupos-productos`(id, nombre, detalle, `categorias-fk`, ingredientes, `marcas-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'Mascarilla Marshmallow Flull Cream', 'Fomulada con almendras dulces, aloe vera y vainilla ideal para eliminar la suciedad del rostro, dejandola cuidada e hidratada. Aroma a vainilla.', 9, 'Aqua (Wasser), Octyldodecanol, Canola Oil, Glyceryl Stearate, PEG-100 Stearate, Cetyl Alcohol, Dimethicone, Cetyl Palmitate, Glycerin, Butyrospermum Parkii (Shea) Butter, Methylsilanol Mannuronate, Sodium Acrylate/Sodium Acryloyldimethyl Taurate Copolymer, Isohexadecane, Polysorbate 80, Propylene Glycol, Hydrolyzed Caesalpinia Spinosa Gum, Caesalpinia Spinosa Gum, Butylene Glycol, Prunus Mume Fruit Extract, Vegetable Collagen (Collagen Amino Acids), Sodium Hyaluronate, Xanthan Gum, Cetyl Hydroxyethylcellulose, Hydroxyacetophenone, Methylparaben, Parfum (Fragrance), Hexyl Cinnamal, Citronellol, Limonene, Citric Acid.', 6, NOW(), NOW());

-- Imagenes de productos
INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p1v1.png', 1, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p2v1.png', 2, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p3v1.png', 3, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p4v1.png', 4, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p5v1.png', 5, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p5v2.png', 5, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p6v1.png', 6, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p6v2.png', 6, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p6v3.png', 6, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p7v1.png', 7, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p7v2.png', 7, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p8v1.png', 8, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p8v2.png', 8, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p9v1.png', 9, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p9v2.png', 9, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p10v1.png', 10, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p10v2.png', 10, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p11v1.png', 11, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p11v2.png', 11, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p12v1.png', 12, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p12v2.png', 12, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p13v1.png', 13, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p13v2.png', 13, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p14v1.png', 14, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p14v2.png', 14, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p15v1.png', 15, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p15v2.png', 15, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p16v1.png', 16, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p16v2.png', 16, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p16v3.png', 16, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p17v1.png', 17, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p17v2.png', 17, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p18v1.png', 18, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p18v2.png', 18, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p19v1.png', 19, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p19v2.png', 19, NOW(), NOW());

INSERT INTO imagenes(id, nombre, `grupos-productos-fk`, `created-at`, `updated-at`) VALUES
(DEFAULT, 'p19v3.png', 19, NOW(), NOW());

--SET FOREIGN_KEY_CHECKS = 1;