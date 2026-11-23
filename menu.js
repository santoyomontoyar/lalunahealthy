/* =========================================================
   La Luna Healthy Life — datos del menú
   Precios tomados del menú oficial (fotos de WhatsApp).
   - price: precio base
   - groups: opciones de personalización
       type "one"  = elegir una (p = costo extra)
       type "many" = elegir varias (p = costo extra c/u)
   - tags: "favorito" | "proteina" | "vegetariano" | "fit"
   ========================================================= */

const G = {
  bebidaIncluida: { name: "Bebida incluida", type: "one", options: [
    { l: "Agua de jamaica", p: 0 }, { l: "Té verde", p: 0 }, { l: "Café", p: 0 },
    { l: "Cambiar por jugo de naranja", p: 20 }, { l: "Cambiar por jugo combinado", p: 35 },
    { l: "Cambiar por jugo de zanahoria", p: 45 }, { l: "Cambiar por jugo verde", p: 65 } ] },
  queso: { name: "Queso extra", type: "one", optional: true, options: [
    { l: "Queso mozzarella", p: 30 }, { l: "Queso gouda", p: 35 } ] },
  extras: { name: "Extras", type: "many", options: [
    { l: "Cecina o bistec", p: 65 }, { l: "Huevo extra", p: 25 }, { l: "Pollo o carnitas", p: 45 },
    { l: "Complemento", p: 45 }, { l: "Aguacate", p: 35 } ] },
  acompFav: { name: "Acompañada con", type: "one", options: [
    { l: "Ensalada y chilaquiles", p: 0 }, { l: "Ensalada y chips de plátano", p: 0 }, { l: "Chilaquiles y frijoles", p: 0 } ] },
  papasEnsalada: { name: "Acompañamiento", type: "one", options: [ { l: "Ensalada", p: 0 }, { l: "Papas a la francesa", p: 0 } ] },
  proteinaHealthy: { name: "Proteína", type: "one", options: [
    { l: "Huevo en torta", p: 0 }, { l: "Pollo desmenuzado", p: 0 }, { l: "Pollo a la plancha", p: 0 },
    { l: "Jamón de pavo", p: 0 }, { l: "Atún", p: 0 } ] },
  incluyeHealthy: { name: "Incluye", type: "one", options: [ { l: "Chips", p: 0 }, { l: "Ensalada", p: 0 } ] },
  bebidaHealthy: { name: "Bebida", type: "one", options: [ { l: "Agua de jamaica", p: 0 }, { l: "Té verde", p: 0 }, { l: "Café", p: 0 } ] },
  leche: { name: "Tipo de leche", type: "one", options: [
    { l: "Entera", p: 0 }, { l: "Deslactosada", p: 0 }, { l: "Vegetal (consultar)", p: 0 } ] },
  tapioca: { name: "Toppings", type: "many", options: [ { l: "Tapioca blanca (precio en tienda)", p: 0 } ] },
};

const CATEGORIES = [
  { id: "desayunos", name: "Desayunos", note: "8:00 am – 1:00 pm" },
  { id: "chilaquiles", name: "Chilaquiles" },
  { id: "healthy", name: "Desayuno healthy" },
  { id: "comidas", name: "Comidas", note: "Desde 1 pm · incluyen entrada y bebida" },
  { id: "especiales", name: "Especiales de la casa" },
  { id: "snacks", name: "Waffles y snacks" },
  { id: "bebidas", name: "Bebidas" },
];

const MENU = [
  /* ---------------- DESAYUNOS ---------------- */
  { id: "desayuno-chilaquiles", cat: "desayunos", name: "Desayuno con chilaquiles", price: 140, img: "assets/img/desayuno.jpg", tags: ["favorito"],
    desc: "Huevos al gusto, frijoles refritos, chilaquiles y bebida.",
    groups: [
      { name: "Huevos al gusto", type: "one", options: [
        { l: "A la mexicana", p: 0 }, { l: "Con jamón", p: 0 }, { l: "Con chorizo", p: 0 }, { l: "Con tocino", p: 0 },
        { l: "Estrellado", p: 0 }, { l: "En salsa roja", p: 0 }, { l: "En salsa verde", p: 0 }, { l: "Con salchicha", p: 0 },
        { l: "Con chistorra", p: 0 }, { l: "Divorciados", p: 10 }, { l: "Con nopales y cebolla", p: 10 },
        { l: "Con rajas poblanas y cebolla", p: 10 }, { l: "Omelette de jamón", p: 35 }, { l: "Omelette de champiñones", p: 35 },
        { l: "Omelette de espinacas y champiñones", p: 45 } ] },
      G.bebidaIncluida, G.queso, G.extras ] },
  { id: "desayuno-ensalada", cat: "desayunos", name: "Desayuno con ensalada", price: 140, img: null, tags: ["fit"],
    desc: "Huevos al gusto, frijoles refritos, ensalada y bebida.",
    groups: null /* se copian del anterior abajo */ },
  { id: "huevito", cat: "desayunos", name: "Huevito al gusto con frijoles", price: 120, img: null, tags: [],
    desc: "2 huevos orgánicos revueltos con frijoles refritos, bolillito campesino y agua de jamaica." },
  { id: "croissant-jq", cat: "desayunos", name: "Croissant de jamón y queso", price: 125, img: null, tags: [],
    desc: "Croissant de mantequilla con jamón, queso gouda y mayonesa. Incluye chocomilk." },

  /* ---------------- CHILAQUILES ---------------- */
  { id: "chilaquiles", cat: "chilaquiles", name: "Chilaquiles + proteína + café", price: 160, img: "assets/img/chilaquiles-huevo.jpg", tags: ["favorito", "proteina"],
    desc: "Arma los tuyos: totopo, salsa y proteína. Incluyen café.",
    groups: [
      { name: "Tamaño", type: "one", options: [ { l: "Media orden", p: 0 }, { l: "Orden completa", p: 30 } ] },
      { name: "Totopo", type: "one", options: [ { l: "Amarillo", p: 0 }, { l: "Azul", p: 0 } ] },
      { name: "Salsa", type: "one", options: [ { l: "Verde", p: 0 }, { l: "Roja", p: 0 }, { l: "Chipotle", p: 0 }, { l: "Divorciados (2 salsas)", p: 0 }, { l: "Mole poblano", p: 30 } ] },
      { name: "Proteína", type: "one", options: [
        { l: "Pollo", p: 0 }, { l: "Chorizo", p: 0 }, { l: "Bistec de res", p: 20 }, { l: "Cecina", p: 20 },
        { l: "Carnitas (sáb y dom)", p: 0 }, { l: "Huevo con jamón", p: 0 }, { l: "Huevo con chorizo", p: 0 },
        { l: "Huevo con tocino", p: 0 }, { l: "Huevo estrellado (2)", p: 0 }, { l: "Huevo con salchicha", p: 0 },
        { l: "Huevo con chistorra", p: 0 }, { l: "Huevo con nopales y cebolla", p: 0 }, { l: "Huevo con rajas y cebolla", p: 0 } ] },
      { name: "Bebida", type: "one", options: [
        { l: "Café", p: 0 }, { l: "Cambiar por jugo de naranja", p: 20 }, { l: "Cambiar por jugo combinado", p: 35 },
        { l: "Cambiar por jugo de zanahoria", p: 45 }, { l: "Cambiar por jugo verde", p: 65 } ] },
      G.queso, G.extras ] },

  /* ---------------- DESAYUNO HEALTHY ---------------- */
  ...[
    ["sandwich-avena", "Sándwich de avena", 165, "assets/img/sandwich-avena.jpg", ["fit", "proteina"]],
    ["sandwich-masa-madre", "Sándwich de masa madre", 165, null, ["fit"]],
    ["bagel", "Bagel healthy", 145, "assets/img/bagel.jpg", ["fit"]],
    ["croissant-healthy", "Croissant healthy", 145, null, []],
    ["chapata", "Chapata healthy", 155, "assets/img/chapata.jpg", ["fit"]],
  ].map(([id, name, price, img, tags]) => ({ id, cat: "healthy", name, price, img, tags,
    desc: "Lechugas mixtas, proteína a elegir, germen de trigo, jitomate, queso panela y aderezo de chipotle. Incluye bebida.",
    groups: [G.proteinaHealthy, G.incluyeHealthy, G.bebidaHealthy] })),

  /* ---------------- COMIDAS ---------------- */
  { id: "pechuga-empanizada", cat: "comidas", name: "Pechuga de pollo empanizada", price: 140, img: null, tags: ["favorito"], desc: "De los favoritos. Incluye entrada y bebida.", groups: [G.acompFav] },
  { id: "pechuga-asada", cat: "comidas", name: "Pechuga de pollo asada", price: 140, img: null, tags: ["proteina", "fit"], desc: "De los favoritos. Incluye entrada y bebida.", groups: [G.acompFav] },
  { id: "cecina-asada", cat: "comidas", name: "Cecina asada", price: 140, img: null, tags: ["proteina"], desc: "De los favoritos. Incluye entrada y bebida.", groups: [G.acompFav] },
  { id: "enchiladas", cat: "comidas", name: "Enchiladas de pollo", price: 165, img: "assets/img/enchiladas.jpg", tags: ["favorito"],
    desc: "Pollo desmenuzado en tortillas, bañadas en la salsa que elijas.",
    groups: [ { name: "Salsa", type: "one", options: [ { l: "Verde", p: 0 }, { l: "Roja", p: 0 }, { l: "Chipotle", p: 0 }, { l: "Mole", p: 0 } ] } ] },
  { id: "bistec-mexicana", cat: "comidas", name: "Bistec a la mexicana", price: 155, img: null, tags: ["proteina"], desc: "Bistec de res con cebolla, jitomate y chile." },
  { id: "bistec-nopales", cat: "comidas", name: "Bistec con nopales", price: 155, img: null, tags: ["proteina"], desc: "Bistec de res con cebolla y nopales, acompañado de frijoles." },
  { id: "bistec-calabazas", cat: "comidas", name: "Bistec con calabazas", price: 155, img: null, tags: ["proteina"], desc: "Bistec de res con cebolla y calabazas, acompañado de frijoles." },
  { id: "pechuga-champi", cat: "comidas", name: "Pechuga con champiñones y espinacas", price: 175, img: null, tags: ["proteina"], desc: "Pechuga asada con champiñones y espinacas salteadas, bañada con queso mozzarella." },
  { id: "pechuga-nopales", cat: "comidas", name: "Pechuga con nopales y calabazas", price: 165, img: null, tags: ["proteina", "fit"], desc: "Pechuga asada con nopales y calabazas bañados en salsa roja." },
  { id: "pechuga-mole", cat: "comidas", name: "Pechuga con mole", price: 165, img: null, tags: ["proteina"], desc: "Pechuga asada bañada en mole, complementada con arroz." },

  /* ---------------- ESPECIALES ---------------- */
  { id: "burrito", cat: "especiales", name: "Burrito", price: 145, img: null, tags: [],
    desc: "Tortilla de harina, frijoles refritos, queso mozzarella y proteína a elegir.",
    groups: [
      { name: "Proteína", type: "one", options: [ { l: "Chilorio", p: 0 }, { l: "Cochinita", p: 0 }, { l: "Carne deshebrada BBQ", p: 0 }, { l: "Cecina", p: 25 }, { l: "Bistec", p: 25 } ] },
      G.papasEnsalada ] },
  { id: "alambre-sirloin", cat: "especiales", name: "Alambre de sirloin con queso", price: 165, img: null, tags: ["proteina"], desc: "Bistec de res con pimientos verdes, cebolla y queso mozzarella. Con tortillas de harina." },
  { id: "alambre-luna", cat: "especiales", name: "Alambre Luna", price: 195, img: null, tags: ["favorito", "proteina"], desc: "Bistec de res con pimientos, cebolla, chorizo, queso y nopales. Con tortillas de harina." },
  { id: "alambre-mexicano", cat: "especiales", name: "Alambre mexicano", price: 195, img: null, tags: ["proteina"], desc: "Bistec de res con pimientos, cebolla, chorizo, queso y jitomate. Con tortillas de harina." },
  { id: "tacos-dorados", cat: "especiales", name: "Tacos dorados", price: 165, img: null, tags: [], desc: "Tacos dorados de pollo (4 pzas) con lechuga, queso y crema." },
  { id: "fajitas", cat: "especiales", name: "Fajitas de pollo", price: 165, img: null, tags: ["proteina"], desc: "Fajitas de pechuga con pimiento y cebolla." },
  { id: "napolitana", cat: "especiales", name: "Pechuga napolitana", price: 185, img: "assets/img/napolitana.jpg", tags: ["favorito"],
    desc: "Pechuga empanizada en salsa de tomate, queso mozzarella y jamón de pavo.", groups: [G.papasEnsalada] },

  /* ---------------- WAFFLES Y SNACKS ---------------- */
  { id: "moon-waffle", cat: "snacks", name: "Moon Waffle", price: 150, img: null, tags: ["favorito", "vegetariano"], desc: "Waffle de avena con plátano, frutos rojos, helado de vainilla, crema batida, nuez, miel y chispas de chocolate." },
  { id: "bubble-waffle", cat: "snacks", name: "Bubble Waffle", price: 140, img: null, tags: ["vegetariano"], desc: "Waffle de avena con plátano, helado de vainilla, nuez y jarabe de chocolate." },
  { id: "waffle", cat: "snacks", name: "Waffle de avena", price: 100, img: null, tags: ["vegetariano", "fit"],
    desc: "Waffle de avena y almendras con plátano, fresa y jalea a elegir.",
    groups: [ { name: "Jalea", type: "one", options: [ { l: "Crema de avellana", p: 0 }, { l: "Miel de abeja", p: 0 }, { l: "Mermelada", p: 0 }, { l: "Cajeta", p: 0 } ] } ] },
  { id: "pizza-waffle", cat: "snacks", name: "Pizza waffle", price: 140, img: null, tags: [],
    desc: "Waffle de avena con salsa de tomate, queso mozzarella y un ingrediente.",
    groups: [ { name: "Ingrediente", type: "one", options: ["Champiñón", "Piña", "Espinacas", "Jamón", "Tocino", "Chorizo"].map(l => ({ l, p: 0 })) } ] },
  { id: "mollete-waffle", cat: "snacks", name: "Mollete waffle", price: 110, img: null, tags: [], desc: "Waffle de avena con frijoles, queso mozzarella, jamón y jitomate cherry." },
  { id: "pan-frances", cat: "snacks", name: "Sándwich de pan francés", price: 140, img: null, tags: ["vegetariano"], desc: "Masa madre bañada en huevo, leche y canela, relleno de frutos rojos y plátano con miel." },
  { id: "club-sandwich", cat: "snacks", name: "Club sándwich", price: 185, img: null, tags: ["proteina"], desc: "Masa madre con mayonesa, lechuga, jamón, pechuga asada y mozzarella. Con papas a la francesa." },
  { id: "mini-quesadillas", cat: "snacks", name: "Mini quesadillas", price: 95, img: null, tags: [],
    desc: "Tortilla de maíz con queso mozzarella y el relleno que elijas.",
    groups: [ { name: "Relleno", type: "one", options: [ { l: "Jamón", p: 0 }, { l: "Espinacas", p: 0 }, { l: "Champiñones", p: 0 } ] } ] },
  { id: "molletes", cat: "snacks", name: "Molletes campesinos", price: 110, img: null, tags: [], desc: "3 mini molletes de bolillo campesino con frijol, queso mozzarella y jamón." },

  /* ---------------- BEBIDAS ---------------- */
  { id: "smoothie", cat: "bebidas", name: "Smoothie", price: 95, img: null, tags: ["vegetariano"], desc: "Fruta natural licuada, fresca y cremosa.",
    groups: [ { name: "Sabor", type: "one", options: ["Fresa", "Mango", "Mango-maracuyá", "Fresacoco", "Coco"].map(l => ({ l, p: 0 })) }, G.tapioca ] },
  { id: "frappe", cat: "bebidas", name: "Frappé", price: 95, img: null, tags: [], desc: "Frappé helado con el sabor que más te guste.",
    groups: [ { name: "Sabor", type: "one", options: ["Moka", "Fresas con crema", "Chocolate", "Oreo", "Taro", "Flan", "Capuchino"].map(l => ({ l, p: 0 })) }, G.leche, G.tapioca ] },
  { id: "shake", cat: "bebidas", name: "Shake", price: 105, img: null, tags: [], desc: "Malteada cremosa de la casa.",
    groups: [ { name: "Sabor", type: "one", options: ["Flan de coco", "Churro", "Chocolate", "Cookies", "Fresas con crema", "Matcha", "Chai", "Arroz con leche"].map(l => ({ l, p: 0 })) }, G.leche, G.tapioca ] },
  { id: "latte", cat: "bebidas", name: "Latte", price: 75, img: null, tags: [], desc: "Caliente $75 · frío $95.",
    groups: [ { name: "Temperatura", type: "one", options: [ { l: "Caliente", p: 0 }, { l: "Frío", p: 20 } ] },
      { name: "Sabor", type: "one", options: ["Caramelo", "Canela", "Moka", "Cajeta", "Capuchino", "Leche dorada", "Nutella"].map(l => ({ l, p: 0 })) }, G.leche ] },
  { id: "loaded-tea", cat: "bebidas", name: "Loaded tea", price: 105, img: null, tags: [], desc: "Bebida energizante con guaraná y cafeína.",
    groups: [ { name: "Sabor", type: "one", options: [ { l: "Granada con moras", p: 0 }, { l: "Naranja con piña", p: 0 } ] } ] },
  { id: "fresh-mango", cat: "bebidas", name: "Fresh Mango", price: 95, img: null, tags: ["vegetariano"], desc: "Con trozos de mango, áloe vera y jugo de mango." },
  { id: "suero-acai", cat: "bebidas", name: "Suero de açaí", price: 75, img: null, tags: [], desc: "Suero sabor açaí con frutos rojos." },
  { id: "limonada", cat: "bebidas", name: "Limonada o naranjada", price: 55, img: null, tags: ["fit"], desc: "Endulzada con stevia.",
    groups: [ { name: "Sabor", type: "one", options: [ { l: "Limonada", p: 0 }, { l: "Naranjada", p: 0 } ] }, { name: "Agua", type: "one", options: [ { l: "Natural", p: 0 }, { l: "Mineral", p: 0 } ] } ] },
  { id: "licuado", cat: "bebidas", name: "Licuado", price: 50, img: null, tags: [], desc: "Chico $50 · grande $90.",
    groups: [ { name: "Tamaño", type: "one", options: [ { l: "Chico", p: 0 }, { l: "Grande", p: 40 } ] },
      { name: "Sabor", type: "one", options: ["Fresa", "Chocomilk", "Chocoplátano", "Plátano"].map(l => ({ l, p: 0 })) }, G.leche ] },
  { id: "jugo", cat: "bebidas", name: "Jugo natural", price: 45, img: null, tags: ["fit"], desc: "Recién hecho.",
    groups: [ { name: "Jugo", type: "one", options: [ { l: "Naranja", p: 0 }, { l: "Combinado", p: 25 }, { l: "Zanahoria", p: 30 }, { l: "Jugo verde", p: 50 } ] } ] },
  { id: "agua", cat: "bebidas", name: "Agua fresca", price: 45, img: null, tags: [], desc: "Del día, hecha en casa.",
    groups: [ { name: "Sabor", type: "one", options: ["Fresa", "Piña", "Mango", "Jamaica", "Té verde", "Fresa con piña"].map(l => ({ l, p: 0 })) } ] },
  { id: "cafe", cat: "bebidas", name: "Café", price: 45, img: null, tags: [], desc: "De olla o americano.",
    groups: [ { name: "Tipo", type: "one", options: [ { l: "De olla", p: 0 }, { l: "Americano", p: 0 } ] } ] },
  { id: "coca", cat: "bebidas", name: "Coca-Cola", price: 45, img: null, tags: [], desc: "Regular o light.",
    groups: [ { name: "Tipo", type: "one", options: [ { l: "Regular", p: 0 }, { l: "Light", p: 0 } ] } ] },
  { id: "agua-mineral", cat: "bebidas", name: "Agua mineral", price: 45, img: null, tags: [], desc: "Bien fría." },
];

// El desayuno con ensalada comparte opciones con el de chilaquiles
MENU.find(p => p.id === "desayuno-ensalada").groups = MENU.find(p => p.id === "desayuno-chilaquiles").groups;

const TAGS = {
  favorito: "Favorito",
  proteina: "Alto en proteína",
  vegetariano: "Vegetariano",
  fit: "Ligero",
};
