import * as THREE from 'three';
import './style.css';

// KIOSK is deliberately built from chunky procedural geometry and generated textures.
// The tiny render resolution, limited palette, and unstable lighting recreate a 1986 VHS horror look.

const $ = (q) => document.querySelector(q);
const $$ = (q) => [...document.querySelectorAll(q)];
const clamp = THREE.MathUtils.clamp;

const I18N = {
  en: {
    tagline:'EVERY ORDER LEAVES A TRACE', newGame:'BEGIN NIGHT ONE', continue:'CONTINUE', settings:'SETTINGS', about:'THE MISSING BOY', move:'MOVE', drag:'DRAG', interact:'INTERACT', pause:'PAUSE',
    missingHeadline:'LOCAL KIOSK WORKER STILL MISSING', missingStory:'Twenty-two-year-old Milo Kara was last seen closing the Night Window kiosk on June 16. Police found the shop unlocked, the lights on, and a meal left burning on the grill.', missingStory2:'Five days later, there is still no trace of him. You have accepted his old shift. The owner only gave one instruction: keep the window open.', clockIn:'CLOCK IN', caseFile:'THE MISSING BOY', caseText:'Last seen at 11:42 PM on June 16, 1986, working alone at the Kiosk on Bellweather Road. No body. No witnesses. No sign of forced entry.',
    language:'LANGUAGE', graphics:'GRAPHICS', sensitivity:'MOUSE SENSITIVITY', volume:'MASTER VOLUME', ambience:'AMBIENCE', subtitles:'SUBTITLES', voices:'CUSTOMER VOICES', shadows:'DYNAMIC SHADOWS', fullscreen:'TOGGLE FULLSCREEN', resume:'RETURN TO SHIFT', mainMenu:'SAVE & EXIT TO MENU', recipeBook:'RECIPE BOOK', delivery:'DELIVERY ORDER', deliveryHelp:'Choose one crate. It will be left outside the back door. Drag it onto the red unpacking mat.', day:'DAY', objective:'CURRENT TASK', powerOut:'MAIN POWER FAILURE',
    wait:'Wait for a customer at the front window.', prepare:'Prepare the order. The customer will wait.', serve:'Ring the bell when the entire order is on the serving tray.', sleep:'Five orders complete. Go to the bedroom and sleep.', restore:'The electricity is dead. Find the fuse box near the walk-in freezer.', package:'A delivery is waiting behind the back door.', killer:'He is inside. Hold the cleaver with RMB. Strike with LMB.',
    arrival:'A customer is approaching the window.', wrong:'The order is incomplete. Check the recipe ticket.', correct:'Order accepted.', empty:'That container is empty. Request a delivery.', busy:'This appliance is already running.', cooking:'Cooking…', delivered:'Delivery received. Check the back door.', unpacked:'Package unpacked. Stock has been added.', powerBack:'Power restored. Something moved in the dark.', recipeFail:'Those ingredients do not make anything. Check the book.', prepReady:'Prepared item ready. Drag it to the correct appliance.', dayLocked:'Finish all five customers before sleeping.', doorBlocked:'The door seems stuck.', ending:'THE WINDOW IS SHUT'
  },
  es: {
    tagline:'CADA PEDIDO DEJA UN RASTRO', newGame:'EMPEZAR NOCHE UNO', continue:'CONTINUAR', settings:'AJUSTES', about:'EL JOVEN DESAPARECIDO', move:'MOVER', drag:'ARRASTRAR', interact:'USAR', pause:'PAUSA', missingHeadline:'TRABAJADOR DEL QUIOSCO SIGUE DESAPARECIDO', missingStory:'Milo Kara, de veintidós años, fue visto por última vez cerrando el quiosco Night Window el 16 de junio. La policía encontró la tienda abierta, con las luces encendidas y comida quemándose en la parrilla.', missingStory2:'Cinco días después, no hay rastro de él. Has aceptado su antiguo turno. El dueño solo dio una instrucción: mantén la ventanilla abierta.', clockIn:'FICHAR', caseFile:'EL JOVEN DESAPARECIDO', caseText:'Visto por última vez a las 11:42 PM del 16 de junio de 1986, trabajando solo en el quiosco de Bellweather Road. Sin cuerpo. Sin testigos.', language:'IDIOMA', graphics:'GRÁFICOS', sensitivity:'SENSIBILIDAD DEL RATÓN', volume:'VOLUMEN GENERAL', ambience:'AMBIENTE', subtitles:'SUBTÍTULOS', voices:'VOCES', shadows:'SOMBRAS DINÁMICAS', fullscreen:'PANTALLA COMPLETA', resume:'VOLVER AL TURNO', mainMenu:'GUARDAR Y SALIR', recipeBook:'LIBRO DE RECETAS', delivery:'PEDIDO DE ENTREGA', deliveryHelp:'Elige una caja. Aparecerá tras la puerta trasera. Arrástrala hasta la zona roja.', day:'DÍA', objective:'TAREA ACTUAL', powerOut:'FALLO ELÉCTRICO', wait:'Espera a un cliente en la ventanilla.', prepare:'Prepara el pedido. El cliente esperará.', serve:'Toca la campana cuando todo esté en la bandeja.', sleep:'Cinco pedidos completos. Ve al dormitorio y duerme.', restore:'No hay electricidad. Busca los fusibles junto al congelador.', package:'Hay una entrega tras la puerta trasera.', killer:'Está dentro. Sujeta el cuchillo con RMB. Golpea con LMB.', arrival:'Un cliente se acerca.', wrong:'El pedido está incompleto. Revisa el ticket.', correct:'Pedido aceptado.', empty:'Está vacío. Pide una entrega.', busy:'El aparato está ocupado.', cooking:'Cocinando…', delivered:'Entrega recibida. Revisa la puerta trasera.', unpacked:'Caja abierta. Productos añadidos.', powerBack:'Electricidad restaurada. Algo se movió en la oscuridad.', recipeFail:'Esos ingredientes no forman una receta.', prepReady:'Preparación lista. Llévala al aparato correcto.', dayLocked:'Termina los cinco clientes.', doorBlocked:'La puerta está atascada.', ending:'LA VENTANILLA ESTÁ CERRADA'
  },
  fr: {
    tagline:'CHAQUE COMMANDE LAISSE UNE TRACE', newGame:'COMMENCER LA PREMIÈRE NUIT', continue:'CONTINUER', settings:'RÉGLAGES', about:'LE GARÇON DISPARU', move:'BOUGER', drag:'GLISSER', interact:'UTILISER', pause:'PAUSE', missingHeadline:'UN EMPLOYÉ DU KIOSQUE TOUJOURS PORTÉ DISPARU', missingStory:'Milo Kara, vingt-deux ans, a été vu pour la dernière fois fermant le kiosque Night Window le 16 juin. La police a trouvé la boutique ouverte, les lumières allumées et un repas brûlant sur le gril.', missingStory2:'Cinq jours plus tard, toujours aucune trace. Vous avez repris son service. Le propriétaire a donné une seule consigne : garder la fenêtre ouverte.', clockIn:'PRENDRE LE SERVICE', caseFile:'LE GARÇON DISPARU', caseText:'Vu pour la dernière fois à 23 h 42 le 16 juin 1986, seul au kiosque de Bellweather Road. Aucun corps. Aucun témoin.', language:'LANGUE', graphics:'GRAPHISMES', sensitivity:'SENSIBILITÉ SOURIS', volume:'VOLUME GÉNÉRAL', ambience:'AMBIANCE', subtitles:'SOUS-TITRES', voices:'VOIX DES CLIENTS', shadows:'OMBRES DYNAMIQUES', fullscreen:'PLEIN ÉCRAN', resume:'REPRENDRE LE SERVICE', mainMenu:'SAUVER ET QUITTER', recipeBook:'LIVRE DE RECETTES', delivery:'LIVRAISON', deliveryHelp:'Choisissez une caisse. Elle sera déposée derrière. Glissez-la sur la zone rouge.', day:'JOUR', objective:'TÂCHE ACTUELLE', powerOut:'PANNE DE COURANT', wait:'Attendez un client à la fenêtre.', prepare:'Préparez la commande. Le client attendra.', serve:'Sonnez quand toute la commande est sur le plateau.', sleep:'Cinq commandes terminées. Allez dormir.', restore:'Plus de courant. Trouvez les fusibles près du congélateur.', package:'Une livraison attend derrière la porte.', killer:'Il est entré. Tenez le couperet avec RMB. Frappez avec LMB.', arrival:'Un client approche.', wrong:'Commande incomplète. Vérifiez le ticket.', correct:'Commande acceptée.', empty:'Conteneur vide. Commandez une livraison.', busy:'Cet appareil est occupé.', cooking:'Cuisson…', delivered:'Livraison reçue. Vérifiez derrière.', unpacked:'Caisse ouverte. Stock ajouté.', powerBack:'Courant rétabli. Quelque chose a bougé.', recipeFail:'Ces ingrédients ne font aucune recette.', prepReady:'Préparation prête. Portez-la au bon appareil.', dayLocked:'Terminez les cinq clients.', doorBlocked:'La porte est bloquée.', ending:'LA FENÊTRE EST FERMÉE'
  },
  tr: {
    tagline:'HER SİPARİŞ BİR İZ BIRAKIR', newGame:'BİRİNCİ GECEYE BAŞLA', continue:'DEVAM ET', settings:'AYARLAR', about:'KAYIP GENÇ', move:'HAREKET', drag:'SÜRÜKLE', interact:'ETKİLEŞİM', pause:'DURAKLAT', missingHeadline:'BÜFE ÇALIŞANI HÂLÂ KAYIP', missingStory:'Yirmi iki yaşındaki Milo Kara en son 16 Haziran’da Night Window büfesini kapatırken görüldü. Polis dükkânı açık, ışıkları yanar ve ızgarada yanan yemekle buldu.', missingStory2:'Beş gün sonra hâlâ iz yok. Onun eski vardiyasını kabul ettin. Sahibinin tek talimatı: pencereyi açık tut.', clockIn:'VARDİYAYA BAŞLA', caseFile:'KAYIP GENÇ', caseText:'16 Haziran 1986, 23:42’de Bellweather Road büfesinde tek başına çalışırken görüldü. Ceset yok. Tanık yok.', language:'DİL', graphics:'GRAFİKLER', sensitivity:'FARE HASSASİYETİ', volume:'ANA SES', ambience:'ORTAM SESİ', subtitles:'ALTYAZILAR', voices:'MÜŞTERİ SESLERİ', shadows:'DİNAMİK GÖLGELER', fullscreen:'TAM EKRAN', resume:'VARDİYAYA DÖN', mainMenu:'KAYDET VE ÇIK', recipeBook:'TARİF KİTABI', delivery:'TESLİMAT SİPARİŞİ', deliveryHelp:'Bir kasa seç. Arka kapıya bırakılacak. Kırmızı alana sürükle.', day:'GÜN', objective:'GÖREV', powerOut:'ANA ELEKTRİK KESİNTİSİ', wait:'Pencerede bir müşteri bekle.', prepare:'Siparişi hazırla. Müşteri bekleyecek.', serve:'Tüm sipariş tepsideyken zile bas.', sleep:'Beş sipariş tamam. Yatak odasında uyu.', restore:'Elektrik kesildi. Dondurucu yanındaki sigortayı bul.', package:'Arka kapıda teslimat var.', killer:'İçeride. Satırı RMB ile tut. LMB ile vur.', arrival:'Bir müşteri yaklaşıyor.', wrong:'Sipariş eksik. Fişi kontrol et.', correct:'Sipariş kabul edildi.', empty:'Kap boş. Teslimat iste.', busy:'Bu cihaz meşgul.', cooking:'Pişiyor…', delivered:'Teslimat geldi. Arka kapıya bak.', unpacked:'Kasa açıldı. Stok eklendi.', powerBack:'Elektrik geldi. Karanlıkta bir şey hareket etti.', recipeFail:'Bu malzemeler bir tarif oluşturmuyor.', prepReady:'Hazırlık tamam. Doğru cihaza götür.', dayLocked:'Önce beş müşteriyi tamamla.', doorBlocked:'Kapı sıkışmış.', ending:'PENCERE KAPANDI'
  },
  ar: {
    tagline:'كل طلب يترك أثراً', newGame:'ابدأ الليلة الأولى', continue:'متابعة', settings:'الإعدادات', about:'الشاب المفقود', move:'حركة', drag:'سحب', interact:'تفاعل', pause:'إيقاف', missingHeadline:'عامل الكشك ما زال مفقوداً', missingStory:'شوهد ميلو كارا، البالغ 22 عاماً، للمرة الأخيرة وهو يغلق كشك نايت ويندو في 16 يونيو. وجدت الشرطة المتجر مفتوحاً والأضواء مضاءة والطعام يحترق.', missingStory2:'بعد خمسة أيام لا أثر له. قبلت العمل في نوبته القديمة. أعطاك المالك تعليمات واحدة: أبقِ النافذة مفتوحة.', clockIn:'ابدأ النوبة', caseFile:'الشاب المفقود', caseText:'شوهد آخر مرة الساعة 11:42 مساءً في 16 يونيو 1986 يعمل وحيداً في كشك طريق بيلويذر. لا جثة. لا شهود.', language:'اللغة', graphics:'الرسومات', sensitivity:'حساسية الفأرة', volume:'الصوت الرئيسي', ambience:'صوت الأجواء', subtitles:'الترجمة', voices:'أصوات الزبائن', shadows:'ظلال ديناميكية', fullscreen:'ملء الشاشة', resume:'العودة للنوبة', mainMenu:'حفظ وخروج', recipeBook:'كتاب الوصفات', delivery:'طلب توصيل', deliveryHelp:'اختر صندوقاً. سيُترك خلف الباب. اسحبه إلى المنطقة الحمراء.', day:'اليوم', objective:'المهمة الحالية', powerOut:'انقطاع الكهرباء', wait:'انتظر زبوناً عند النافذة.', prepare:'حضّر الطلب. الزبون سينتظر.', serve:'اضرب الجرس عندما يكتمل الطلب على الصينية.', sleep:'اكتملت خمسة طلبات. اذهب للنوم.', restore:'انقطعت الكهرباء. ابحث عن صندوق الكهرباء بجوار المجمد.', package:'هناك توصيل خلف الباب.', killer:'إنه في الداخل. أمسك الساطور بالزر الأيمن واضرب بالأيسر.', arrival:'زبون يقترب.', wrong:'الطلب غير مكتمل. راجع الوصفة.', correct:'تم قبول الطلب.', empty:'الحاوية فارغة. اطلب توصيلاً.', busy:'الجهاز مشغول.', cooking:'جارٍ الطهي…', delivered:'وصل التوصيل. افحص الباب الخلفي.', unpacked:'فُتح الصندوق وأضيف المخزون.', powerBack:'عادت الكهرباء. شيء تحرك في الظلام.', recipeFail:'هذه المكونات لا تصنع وصفة.', prepReady:'التحضير جاهز. انقله إلى الجهاز المناسب.', dayLocked:'أكمل خمسة زبائن أولاً.', doorBlocked:'الباب عالق.', ending:'أُغلقت النافذة'
  }
};

const FOOD = {
  bun:{name:'Burger bun', color:0xc58b45, group:'bakery'},
  hotdog_bun:{name:'Hot-dog bun', color:0xc99350, group:'bakery'},
  dough:{name:'Pizza dough', color:0xe0c58b, group:'bakery'},
  raw_patty:{name:'Raw meat patty', color:0x783a37, group:'meat'},
  cooked_patty:{name:'Cooked patty', color:0x3e251b},
  raw_sausage:{name:'Raw sausage', color:0xa55042, group:'meat'},
  cooked_sausage:{name:'Cooked sausage', color:0x693327},
  frozen_fries:{name:'Frozen fries', color:0xe8c466, group:'cold'},
  cooked_fries:{name:'Crispy fries', color:0xd69f35},
  cheese:{name:'Cheese slice', color:0xf0c83f, group:'cold'},
  lettuce:{name:'Lettuce', color:0x5d8e43, group:'produce'},
  pepperoni:{name:'Pepperoni', color:0x9a3327, group:'cold'},
  ketchup:{name:'Ketchup', color:0xb52621, group:'condiments'},
  mayo:{name:'Mayonnaise', color:0xede4ca, group:'condiments'},
  mustard:{name:'Mustard', color:0xd6aa24, group:'condiments'},
  hot_sauce:{name:'Hot sauce', color:0x7e1915, group:'condiments'},
  sauce:{name:'Tomato sauce', color:0xa43628, group:'condiments'},
  soda:{name:'Soda can', color:0x9d2726, group:'drinks'},
  orange_soda:{name:'Orange soda', color:0xd46928, group:'drinks'},
  raw_pizza:{name:'Unbaked cheese pizza', color:0xdec078},
  raw_pepperoni_pizza:{name:'Unbaked pepperoni pizza', color:0xd5b66e},
  baked_pizza:{name:'Baked cheese pizza', color:0xc77a32},
  baked_pepperoni_pizza:{name:'Baked pepperoni pizza', color:0xb96c2c},
  cleaver:{name:'Meat cleaver', color:0x888d87}
};

const FOOD_NAMES = {
  es:{bun:'Pan de hamburguesa',hotdog_bun:'Pan de perrito',dough:'Masa de pizza',raw_patty:'Carne cruda',cooked_patty:'Carne cocida',raw_sausage:'Salchicha cruda',cooked_sausage:'Salchicha cocida',frozen_fries:'Patatas congeladas',cooked_fries:'Patatas fritas',cheese:'Loncha de queso',lettuce:'Lechuga',pepperoni:'Pepperoni',ketchup:'Kétchup',mayo:'Mayonesa',mustard:'Mostaza',hot_sauce:'Salsa picante',sauce:'Salsa de tomate',soda:'Refresco de cola',orange_soda:'Refresco de naranja',baked_pizza:'Pizza de queso horneada',baked_pepperoni_pizza:'Pizza de pepperoni horneada',cleaver:'Cuchillo de carnicero'},
  fr:{bun:'Pain à burger',hotdog_bun:'Pain à hot-dog',dough:'Pâte à pizza',raw_patty:'Steak cru',cooked_patty:'Steak cuit',raw_sausage:'Saucisse crue',cooked_sausage:'Saucisse cuite',frozen_fries:'Frites surgelées',cooked_fries:'Frites croustillantes',cheese:'Tranche de fromage',lettuce:'Laitue',pepperoni:'Pepperoni',ketchup:'Ketchup',mayo:'Mayonnaise',mustard:'Moutarde',hot_sauce:'Sauce piquante',sauce:'Sauce tomate',soda:'Soda au cola',orange_soda:'Soda à l’orange',baked_pizza:'Pizza au fromage cuite',baked_pepperoni_pizza:'Pizza au pepperoni cuite',cleaver:'Couperet'},
  tr:{bun:'Hamburger ekmeği',hotdog_bun:'Sosisli ekmeği',dough:'Pizza hamuru',raw_patty:'Çiğ köfte',cooked_patty:'Pişmiş köfte',raw_sausage:'Çiğ sosis',cooked_sausage:'Pişmiş sosis',frozen_fries:'Donmuş patates',cooked_fries:'Çıtır patates',cheese:'Peynir dilimi',lettuce:'Marul',pepperoni:'Pepperoni',ketchup:'Ketçap',mayo:'Mayonez',mustard:'Hardal',hot_sauce:'Acı sos',sauce:'Domates sosu',soda:'Kola',orange_soda:'Portakallı gazoz',baked_pizza:'Pişmiş peynirli pizza',baked_pepperoni_pizza:'Pişmiş pepperonili pizza',cleaver:'Satır'},
  ar:{bun:'خبز برغر',hotdog_bun:'خبز نقانق',dough:'عجين بيتزا',raw_patty:'قطعة لحم نيئة',cooked_patty:'قطعة لحم مطهوة',raw_sausage:'نقانق نيئة',cooked_sausage:'نقانق مطهوة',frozen_fries:'بطاطس مجمدة',cooked_fries:'بطاطس مقرمشة',cheese:'شريحة جبن',lettuce:'خس',pepperoni:'بيبروني',ketchup:'كاتشب',mayo:'مايونيز',mustard:'خردل',hot_sauce:'صلصة حارة',sauce:'صلصة طماطم',soda:'مشروب كولا',orange_soda:'مشروب برتقال',baked_pizza:'بيتزا جبن مخبوزة',baked_pepperoni_pizza:'بيتزا بيبروني مخبوزة',cleaver:'ساطور'}
};
const RECIPE_NAMES = {
  es:{classic:'Hamburguesa clásica',cheese:'Hamburguesa con queso',pizza:'Pizza de queso',pepperoni:'Pizza de pepperoni',fries:'Patatas con kétchup',hotdog:'Perrito nocturno',combo:'Combo del quiosco',red:'Especial rojo'},
  fr:{classic:'Burger classique',cheese:'Cheeseburger',pizza:'Pizza au fromage',pepperoni:'Pizza au pepperoni',fries:'Frites et ketchup',hotdog:'Hot-dog de nuit',combo:'Menu du kiosque',red:'Spécial rouge'},
  tr:{classic:'Klasik burger',cheese:'Çizburger',pizza:'Peynirli pizza',pepperoni:'Pepperonili pizza',fries:'Patates ve ketçap',hotdog:'Gece sosisi',combo:'Büfe menüsü',red:'Kırmızı özel'},
  ar:{classic:'برغر كلاسيكي',cheese:'برغر بالجبن',pizza:'بيتزا بالجبن',pepperoni:'بيتزا بيبروني',fries:'بطاطس وكاتشب',hotdog:'هوت دوغ الليل',combo:'وجبة الكشك',red:'الطلب الأحمر'}
};
const foodName = type => FOOD_NAMES[lang]?.[type] || FOOD[type]?.name || type;
const recipeName = key => RECIPE_NAMES[lang]?.[key] || RECIPES[key]?.name || key;

const RECIPES = {
  classic:{name:'Classic Burger', icon:'🍔', requirements:['bun','cooked_patty','lettuce','ketchup'], steps:['Take one raw patty from the walk-in freezer.','Drag it onto the grill and wait until the light turns green.','Drag a bun, cooked patty, lettuce, and ketchup onto the serving tray.','Ring the brass service bell.'], tip:'The customer can wait. Burned meat is worse than a long night.'},
  cheese:{name:'Cheeseburger', icon:'🍔', requirements:['bun','cooked_patty','cheese','ketchup'], steps:['Cook a raw patty on the grill.','Take cheese from the drinks fridge.','Place bun, cooked patty, cheese, and ketchup on the serving tray.','Ring the service bell.'], tip:'The cheese is kept cold. Do not leave the fridge door open.'},
  pizza:{name:'Cheese Pizza', icon:'🍕', requirements:['baked_pizza'], steps:['Put dough, tomato sauce, and cheese on the PREP board.','Press the PREP button to form an unbaked pizza.','Drag the unbaked pizza into the furnace.','Move the baked pizza to the serving tray and ring the bell.'], tip:'The furnace gets loud enough to hide footsteps.'},
  pepperoni:{name:'Pepperoni Pizza', icon:'🍕', requirements:['baked_pepperoni_pizza'], steps:['Put dough, tomato sauce, cheese, and pepperoni on the PREP board.','Press PREP. Drag the unbaked pizza into the furnace.','When the green lamp lights, move it to the serving tray.','Ring the bell.'], tip:'Four ingredients. Count them. Milo always counted twice.'},
  fries:{name:'Fries & Ketchup', icon:'🍟', requirements:['cooked_fries','ketchup'], steps:['Take frozen fries from the walk-in freezer.','Drag them into the fryer.','Wait for the green lamp, then move the fries to the serving tray.','Add ketchup and ring the bell.'], tip:'If the oil stops hissing, check the electricity.'},
  hotdog:{name:'Night Dog', icon:'🌭', requirements:['hotdog_bun','cooked_sausage','mustard'], steps:['Cook one sausage on the grill.','Place a hot-dog bun, cooked sausage, and mustard on the serving tray.','Ring the service bell.'], tip:'The regular at 1 AM never gives his real name.'},
  combo:{name:'Kiosk Combo', icon:'🥤', requirements:['bun','cooked_patty','cheese','ketchup','soda'], steps:['Cook one raw patty on the grill.','Place bun, patty, cheese, and ketchup on the serving tray.','Add a cold soda from the drinks fridge.','Ring the service bell.'], tip:'Check the drink. Orange cans do not count.'},
  red:{name:'Red Special', icon:'●', requirements:['bun','cooked_patty','cheese','mayo','hot_sauce'], steps:['Cook one raw patty.','Place bun, patty, cheese, mayonnaise, and hot sauce on the tray.','Do not make substitutions.','Ring the bell.'], tip:'This recipe is not in the owner’s handwriting.'}
};

const DAY_ORDERS = [
  ['classic','fries','cheese','pizza','hotdog'],
  ['combo','pepperoni','fries','cheese','classic'],
  ['pizza','hotdog','combo','pepperoni','red'],
  ['red','fries','pepperoni','combo','classic'],
  ['cheese','red','pizza','hotdog','red']
];

const CUSTOMER_NAMES = ['NORA VALE','MR. DALCA','OFFICER REYES','MRS. HART','THE DRIVER','ELIAS','NO NAME','OFFICER KAYA','JUNE','THE NIGHT NURSE','SAMIR','MR. GREY','ANNA','THE REPORTER','OLD TOM','THE MAN IN RED'];
const STORY_DIALOGUE = {
  '1-1':'Evening. You are new. Milo used to put too much ketchup on everything.',
  '1-3':'Has Milo come back? He owed me a soda. Tell him Nora asked.',
  '1-5':'Lock the back door tonight. Stray dogs get into the boxes.',
  '2-1':'Police. I need to ask about the worker before you. June sixteenth—did the owner tell you anything?',
  '2-3':'I saw Milo arguing with a man in a red coat. That was five nights ago.',
  '2-5':'Funny. The window light blinked exactly like that the night he vanished.',
  '3-1':'Do you hear the freezer humming when the power is off?',
  '3-2':'Milo told me there was a room under this place. I thought he was joking.',
  '3-4':'Your name was on my receipt before I ordered.',
  '3-5':'That red recipe... I have not seen it since Milo worked here.',
  '4-1':'I am writing about the missing boy. The police found his watch behind your kiosk.',
  '4-2':'There is someone standing by the trees. Do not look now.',
  '4-3':'The man in the red coat asked which nights you work.',
  '4-5':'Milo scratched a word beneath the freezer shelf: DALCA.',
  '5-1':'Close early. I am serious. We traced Milo’s last call to your delivery line.',
  '5-2':'A red car has passed six times. Same driver every time.',
  '5-3':'If the lights go out, stay by the cleaver.',
  '5-4':'He is behind me, across the road. I will call the police.',
  '5-5':'You kept the window open. Just like Milo did.'
};

const DIALOGUE_LOCAL = {
  es:{
    '1-1':'Buenas noches. Eres nuevo. Milo ponía demasiado kétchup en todo.','1-3':'¿Ha vuelto Milo? Me debía un refresco. Dile que preguntó Nora.','1-5':'Cierra la puerta trasera esta noche. Los perros callejeros entran en las cajas.',
    '2-1':'Policía. Debo preguntar por el trabajador anterior. Dieciséis de junio. ¿Te contó algo el dueño?','2-3':'Vi a Milo discutiendo con un hombre de abrigo rojo. Fue hace cinco noches.','2-5':'Curioso. La luz de la ventana parpadeó igual la noche que desapareció.',
    '3-1':'¿Oyes el congelador cuando no hay electricidad?','3-2':'Milo me dijo que había una habitación bajo este lugar. Pensé que bromeaba.','3-4':'Tu nombre estaba en mi recibo antes de pedir.','3-5':'Esa receta roja... no la veía desde que Milo trabajaba aquí.',
    '4-1':'Escribo sobre el joven desaparecido. La policía halló su reloj detrás del quiosco.','4-2':'Hay alguien junto a los árboles. No mires ahora.','4-3':'El hombre del abrigo rojo preguntó qué noches trabajas.','4-5':'Milo grabó una palabra bajo el estante del congelador: DALCA.',
    '5-1':'Cierra temprano. En serio. Rastrearon la última llamada de Milo hasta tu línea de entregas.','5-2':'Un coche rojo ha pasado seis veces. El mismo conductor.','5-3':'Si se apagan las luces, quédate junto al cuchillo.','5-4':'Está detrás de mí, al otro lado de la carretera. Llamaré a la policía.','5-5':'Mantuviste la ventanilla abierta. Igual que Milo.'
  },
  fr:{
    '1-1':'Bonsoir. Vous êtes nouveau. Milo mettait trop de ketchup partout.','1-3':'Milo est revenu ? Il me devait un soda. Dites-lui que Nora est passée.','1-5':'Fermez la porte arrière cette nuit. Les chiens fouillent les caisses.',
    '2-1':'Police. Je dois parler de votre prédécesseur. Le seize juin. Le patron vous a dit quelque chose ?','2-3':'J’ai vu Milo se disputer avec un homme au manteau rouge. Il y a cinq nuits.','2-5':'Étrange. La lumière clignotait ainsi la nuit de sa disparition.',
    '3-1':'Vous entendez le congélateur bourdonner quand le courant est coupé ?','3-2':'Milo disait qu’il y avait une pièce sous cet endroit. Je croyais qu’il plaisantait.','3-4':'Votre nom était sur mon ticket avant ma commande.','3-5':'Cette recette rouge... Je ne l’avais pas vue depuis Milo.',
    '4-1':'J’écris sur le garçon disparu. La police a trouvé sa montre derrière le kiosque.','4-2':'Quelqu’un se tient près des arbres. Ne regardez pas maintenant.','4-3':'L’homme au manteau rouge a demandé quelles nuits vous travaillez.','4-5':'Milo a gravé un mot sous l’étagère du congélateur : DALCA.',
    '5-1':'Fermez tôt. Je suis sérieux. Le dernier appel de Milo venait de votre ligne de livraison.','5-2':'Une voiture rouge est passée six fois. Même conducteur.','5-3':'Si les lumières s’éteignent, restez près du couperet.','5-4':'Il est derrière moi, de l’autre côté de la route. J’appelle la police.','5-5':'Vous avez gardé la fenêtre ouverte. Comme Milo.'
  },
  tr:{
    '1-1':'İyi akşamlar. Yenisiniz. Milo her şeye çok fazla ketçap koyardı.','1-3':'Milo döndü mü? Bana bir gazoz borcu vardı. Nora’nın sorduğunu söyleyin.','1-5':'Bu gece arka kapıyı kilitleyin. Sokak köpekleri kasalara giriyor.',
    '2-1':'Polis. Sizden önceki çalışanı sormalıyım. On altı Haziran. Sahibi bir şey anlattı mı?','2-3':'Milo’yu kırmızı paltolu bir adamla tartışırken gördüm. Beş gece önceydi.','2-5':'Tuhaf. Kaybolduğu gece pencere ışığı aynen böyle yanıp söndü.',
    '3-1':'Elektrik yokken dondurucunun uğultusunu duyuyor musunuz?','3-2':'Milo bu yerin altında bir oda olduğunu söyledi. Şaka sanmıştım.','3-4':'Sipariş vermeden önce adınız fişimde yazıyordu.','3-5':'Şu kırmızı tarif... Milo çalıştığından beri görmemiştim.',
    '4-1':'Kayıp genç hakkında yazıyorum. Polis saatini büfenin arkasında buldu.','4-2':'Ağaçların yanında biri duruyor. Şimdi bakmayın.','4-3':'Kırmızı paltolu adam hangi geceler çalıştığınızı sordu.','4-5':'Milo dondurucu rafının altına bir kelime kazımış: DALCA.',
    '5-1':'Erken kapatın. Ciddiyim. Milo’nun son araması teslimat hattınıza yapılmış.','5-2':'Kırmızı bir araba altı kez geçti. Her seferinde aynı sürücü.','5-3':'Işıklar sönerse satırın yanında kalın.','5-4':'Arkamda, yolun karşısında. Polisi arayacağım.','5-5':'Pencereyi açık tuttun. Tıpkı Milo gibi.'
  },
  ar:{
    '1-1':'مساء الخير. أنت جديد. كان ميلو يضع الكثير من الكاتشب على كل شيء.','1-3':'هل عاد ميلو؟ كان مديناً لي بمشروب. أخبره أن نورا سألت عنه.','1-5':'أغلق الباب الخلفي الليلة. الكلاب تدخل إلى الصناديق.',
    '2-1':'الشرطة. أريد أن أسأل عن العامل السابق. السادس عشر من يونيو. هل أخبرك المالك بشيء؟','2-3':'رأيت ميلو يتشاجر مع رجل يرتدي معطفاً أحمر. كان ذلك قبل خمس ليالٍ.','2-5':'غريب. ضوء النافذة ومض هكذا ليلة اختفائه.',
    '3-1':'هل تسمع صوت المجمد حين تنقطع الكهرباء؟','3-2':'قال ميلو إن هناك غرفة تحت هذا المكان. ظننته يمزح.','3-4':'كان اسمك على إيصالي قبل أن أطلب.','3-5':'تلك الوصفة الحمراء... لم أرها منذ أن كان ميلو يعمل هنا.',
    '4-1':'أكتب عن الشاب المفقود. وجدت الشرطة ساعته خلف الكشك.','4-2':'هناك شخص يقف قرب الأشجار. لا تنظر الآن.','4-3':'سأل الرجل ذو المعطف الأحمر عن الليالي التي تعمل فيها.','4-5':'حفر ميلو كلمة تحت رف المجمد: DALCA.',
    '5-1':'أغلق مبكراً. أنا جاد. آخر اتصال لميلو كان بخط التوصيل لديك.','5-2':'مرت سيارة حمراء ست مرات. السائق نفسه كل مرة.','5-3':'إذا انطفأت الأنوار، ابقَ قرب الساطور.','5-4':'إنه خلفي عبر الطريق. سأتصل بالشرطة.','5-5':'أبقيت النافذة مفتوحة. تماماً مثل ميلو.'
  }
};

const DELIVERY = {
  meat:{name:'BUTCHER CRATE', items:{raw_patty:8,raw_sausage:6}, desc:'8 patties · 6 sausages'},
  bakery:{name:'BAKERY CRATE', items:{bun:8,hotdog_bun:6,dough:6}, desc:'buns · dough'},
  cold:{name:'COLD GOODS', items:{cheese:10,pepperoni:8,frozen_fries:8}, desc:'cheese · pepperoni · fries'},
  produce:{name:'PRODUCE BOX', items:{lettuce:10}, desc:'fresh lettuce'},
  condiments:{name:'CONDIMENT CASE', items:{ketchup:12,mayo:8,mustard:8,hot_sauce:8,sauce:10}, desc:'five sauces'},
  drinks:{name:'DRINKS FLAT', items:{soda:10,orange_soda:8}, desc:'cola · orange'}
};

let lang = localStorage.getItem('kiosk.language') || 'en';
const t = (key) => (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
function applyLanguage(){
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  $$('[data-i18n]').forEach(el => { const v=t(el.dataset.i18n); if(v) el.textContent=v; });
  if (game) { updateObjective(); renderRecipeBook(activeRecipe); updateOrderTicket(); }
}

const SETTINGS = {
  quality: localStorage.getItem('kiosk.quality') || 'low', sensitivity:+(localStorage.getItem('kiosk.sensitivity')||.8),
  volume:+(localStorage.getItem('kiosk.volume')||.65), ambience:+(localStorage.getItem('kiosk.ambience')||.55),
  subtitles:localStorage.getItem('kiosk.subtitles')!=='false', voices:localStorage.getItem('kiosk.voices')!=='false', shadows:localStorage.getItem('kiosk.shadows')==='true'
};

let game = null;
let activeRecipe = 'classic';
let notificationTimer = null;
let subtitleTimer = null;

function showOnly(id){ $$('.screen').forEach(x=>x.classList.add('hidden')); $(id).classList.remove('hidden'); }
function showModal(id){ $(id).classList.remove('hidden'); if(game?.started) game.unlock(); }
function closeModals(){ $$('.modal').forEach(x=>x.classList.add('hidden')); if(game?.started && !game.paused) game.lock(); }
function notify(text, ms=2600){ const el=$('#notification'); el.textContent=text; el.classList.remove('hidden'); clearTimeout(notificationTimer); notificationTimer=setTimeout(()=>el.classList.add('hidden'),ms); }
function subtitle(speaker,text,ms=5200){
  const el=$('#subtitle'); el.querySelector('b').textContent=speaker; el.querySelector('span').textContent=text;
  if(SETTINGS.subtitles){ el.classList.remove('hidden'); clearTimeout(subtitleTimer); subtitleTimer=setTimeout(()=>el.classList.add('hidden'),ms); }
  if(SETTINGS.voices && 'speechSynthesis' in window){ window.speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text); u.lang={en:'en-US',es:'es-ES',fr:'fr-FR',tr:'tr-TR',ar:'ar-SA'}[lang]; u.rate=.84; u.pitch=.72+Math.random()*.3; u.volume=SETTINGS.volume*.8; window.speechSynthesis.speak(u); }
}

function saveSettings(){
  Object.entries(SETTINGS).forEach(([k,v])=>localStorage.setItem(`kiosk.${k}`,v));
  localStorage.setItem('kiosk.language',lang);
}
function syncSettingsUI(){
  $('#language').value=lang; $('#quality').value=SETTINGS.quality; $('#sensitivity').value=SETTINGS.sensitivity; $('#volume').value=SETTINGS.volume; $('#ambience-volume').value=SETTINGS.ambience;
  $('#subtitles-toggle').checked=SETTINGS.subtitles; $('#voices-toggle').checked=SETTINGS.voices; $('#shadows-toggle').checked=SETTINGS.shadows;
  $('#sensitivity').nextElementSibling.value=SETTINGS.sensitivity.toFixed(1); $('#volume').nextElementSibling.value=Math.round(SETTINGS.volume*100)+'%'; $('#ambience-volume').nextElementSibling.value=Math.round(SETTINGS.ambience*100)+'%';
}

class Soundscape {
  constructor(){ this.ctx=null; this.master=null; this.ambience=null; this.hum=null; this.noise=null; }
  start(){
    if(this.ctx){ this.ctx.resume(); return; }
    this.ctx=new (window.AudioContext||window.webkitAudioContext)();
    this.master=this.ctx.createGain(); this.master.gain.value=SETTINGS.volume; this.master.connect(this.ctx.destination);
    this.ambience=this.ctx.createGain(); this.ambience.gain.value=SETTINGS.ambience*.22; this.ambience.connect(this.master);
    const o=this.ctx.createOscillator(), o2=this.ctx.createOscillator(), g=this.ctx.createGain();
    o.type='sine'; o.frequency.value=58; o2.type='triangle';o2.frequency.value=61.3;g.gain.value=.07;
    o.connect(g);o2.connect(g);g.connect(this.ambience);o.start();o2.start();this.hum=[o,o2,g];
    const len=this.ctx.sampleRate*2, buffer=this.ctx.createBuffer(1,len,this.ctx.sampleRate), data=buffer.getChannelData(0);
    for(let i=0;i<len;i++) data[i]=(Math.random()*2-1)*(.25+.15*Math.sin(i*.003));
    const n=this.ctx.createBufferSource(), ng=this.ctx.createGain(), filter=this.ctx.createBiquadFilter(); n.buffer=buffer;n.loop=true;ng.gain.value=.045;filter.type='lowpass';filter.frequency.value=750;n.connect(filter);filter.connect(ng);ng.connect(this.ambience);n.start();this.noise=n;
  }
  set(){ if(this.master)this.master.gain.setTargetAtTime(SETTINGS.volume,this.ctx.currentTime,.05); if(this.ambience)this.ambience.gain.setTargetAtTime(SETTINGS.ambience*.22,this.ctx.currentTime,.05); }
  tone(freq=220,dur=.12,type='square',vol=.08,delay=0){
    if(!this.ctx)return; const now=this.ctx.currentTime+delay,o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type=type;o.frequency.setValueAtTime(freq,now);o.frequency.exponentialRampToValueAtTime(Math.max(35,freq*.72),now+dur);g.gain.setValueAtTime(vol,now);g.gain.exponentialRampToValueAtTime(.0001,now+dur);o.connect(g);g.connect(this.master);o.start(now);o.stop(now+dur+.02);
  }
  bell(){ this.tone(1150,.55,'sine',.09);this.tone(820,.8,'sine',.055,.04); }
  door(){this.tone(92,.4,'sawtooth',.035);}
  click(){this.tone(180,.06,'square',.04);}
  success(){this.tone(440,.12,'sine',.06);this.tone(660,.3,'sine',.05,.1);}
  error(){this.tone(90,.28,'sawtooth',.06);}
  scare(){this.tone(41,2.5,'sawtooth',.11);this.tone(49,3,'sine',.12);}
  power(on){ if(!this.hum)return; this.hum[2].gain.setTargetAtTime(on?.07:0,this.ctx.currentTime,.2); this.tone(on?72:45,on?.8:1.4,'sawtooth',.08); }
}
const audio=new Soundscape();

function canvasTexture(draw,size=128){
  const c=document.createElement('canvas');c.width=c.height=size;const x=c.getContext('2d');draw(x,size);const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.magFilter=THREE.NearestFilter;tex.minFilter=THREE.NearestMipmapLinearFilter;return tex;
}
function speckledTexture(base, fleck, count=500){ return canvasTexture((x,s)=>{x.fillStyle=base;x.fillRect(0,0,s,s);x.fillStyle=fleck;for(let i=0;i<count;i++){let z=Math.random()*2+1;x.globalAlpha=Math.random()*.35;x.fillRect(Math.random()*s,Math.random()*s,z,z)}x.globalAlpha=1;}); }
const TEX={
  tile:canvasTexture((x,s)=>{x.fillStyle='#77796c';x.fillRect(0,0,s,s);for(let a=0;a<8;a++)for(let b=0;b<8;b++){x.fillStyle=(a+b)%2?'#66695f':'#707367';x.fillRect(a*16+1,b*16+1,14,14)}},128),
  wall:speckledTexture('#a5a492','#4e534b',700), metal:speckledTexture('#71766f','#252b27',420), freezer:speckledTexture('#b9c3b9','#6e786f',160),
  wood:canvasTexture((x,s)=>{x.fillStyle='#6b4228';x.fillRect(0,0,s,s);for(let i=0;i<20;i++){x.strokeStyle=`rgba(34,17,9,${Math.random()*.3})`;x.beginPath();x.moveTo(0,Math.random()*s);x.bezierCurveTo(35,Math.random()*s,80,Math.random()*s,s,Math.random()*s);x.stroke()}},128),
  cardboard:canvasTexture((x,s)=>{x.fillStyle='#8e7047';x.fillRect(0,0,s,s);for(let i=0;i<80;i++){x.fillStyle='rgba(30,20,10,.12)';x.fillRect(Math.random()*s,Math.random()*s,Math.random()*5,1)}x.strokeStyle='#5c422b';x.strokeRect(5,5,s-10,s-10);x.font='bold 14px monospace';x.fillStyle='#493521';x.fillText('NW-0616',23,67)},128),
  road:canvasTexture((x,s)=>{x.fillStyle='#252824';x.fillRect(0,0,s,s);for(let i=0;i<400;i++){x.fillStyle=`rgba(170,170,150,${Math.random()*.1})`;x.fillRect(Math.random()*s,Math.random()*s,1,1)}},128),
  paper:speckledTexture('#c7c0a6','#6f6958',130)
};
TEX.tile.repeat.set(8,9);TEX.wall.repeat.set(5,3);TEX.road.repeat.set(12,4);TEX.wood.repeat.set(3,3);TEX.metal.repeat.set(2,2);
const MAT={
  wall:new THREE.MeshStandardMaterial({map:TEX.wall,roughness:.95,color:0xb8b7a4}), tile:new THREE.MeshStandardMaterial({map:TEX.tile,roughness:.9}),
  dark:new THREE.MeshStandardMaterial({color:0x171b17,roughness:.85}), metal:new THREE.MeshStandardMaterial({map:TEX.metal,color:0x92988f,roughness:.55,metalness:.35}),
  wood:new THREE.MeshStandardMaterial({map:TEX.wood,roughness:.92}), cardboard:new THREE.MeshStandardMaterial({map:TEX.cardboard,roughness:1}),
  red:new THREE.MeshStandardMaterial({color:0x7d2420,roughness:.8}), black:new THREE.MeshStandardMaterial({color:0x080a08,roughness:.8}),
  glass:new THREE.MeshStandardMaterial({color:0xa7b7ad,roughness:.1,metalness:.05,transparent:true,opacity:.22}),
  white:new THREE.MeshStandardMaterial({color:0xd7d4c2,roughness:.8}), green:new THREE.MeshStandardMaterial({color:0x315e3b,roughness:.8})
};
function mesh(geo,mat,pos=[0,0,0],rot=[0,0,0],name='') { const m=new THREE.Mesh(geo,mat);m.position.set(...pos);m.rotation.set(...rot);m.name=name;m.castShadow=true;m.receiveShadow=true;return m; }
function box(w,h,d,mat,pos,rot,name){return mesh(new THREE.BoxGeometry(w,h,d),mat,pos,rot,name)}
function cyl(r,h,mat,pos,segments=10,rot=[0,0,0]){return mesh(new THREE.CylinderGeometry(r,r,h,segments),mat,pos,rot)}
function textTexture(text,fg='#dedbc9',bg='#191c18',w=512,h=128,font=38){
  const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.fillStyle=bg;x.fillRect(0,0,w,h);x.strokeStyle='#6d7168';x.lineWidth=5;x.strokeRect(4,4,w-8,h-8);x.fillStyle=fg;x.font=`${font}px "Courier New",monospace`;x.textAlign='center';x.textBaseline='middle';x.fillText(text, w/2,h/2);const tx=new THREE.CanvasTexture(c);tx.colorSpace=THREE.SRGBColorSpace;tx.magFilter=THREE.NearestFilter;return tx;
}
function sign(text,w=2.4,h=.52,pos=[0,2,0],rot=[0,0,0],fg,bg){ const m=mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:textTexture(text,fg,bg),side:THREE.DoubleSide}),pos,rot);m.castShadow=false;return m; }
function makeLabelSprite(text,color='#ece8d7'){
  const c=document.createElement('canvas');c.width=256;c.height=64;const x=c.getContext('2d');x.fillStyle='rgba(5,7,5,.75)';x.fillRect(0,0,256,64);x.strokeStyle='rgba(180,180,160,.5)';x.strokeRect(2,2,252,60);x.fillStyle=color;x.font='20px monospace';x.textAlign='center';x.textBaseline='middle';x.fillText(text.toUpperCase(),128,32);const tx=new THREE.CanvasTexture(c);tx.colorSpace=THREE.SRGBColorSpace;const s=new THREE.Sprite(new THREE.SpriteMaterial({map:tx,depthTest:true,transparent:true}));s.scale.set(1.8,.45,1);return s;
}

function foodModel(type){
  const f=FOOD[type], g=new THREE.Group();g.name=f?.name||type;
  const material=new THREE.MeshStandardMaterial({color:f?.color||0xaaaaaa,roughness:.78,metalness:type==='cleaver'?.65:0});
  let m;
  if(type.includes('patty')) m=cyl(.28,.1,material,[0,0,0],12,[Math.PI/2,0,0]);
  else if(type.includes('sausage')) m=mesh(new THREE.CapsuleGeometry(.09,.42,4,8),material,[0,0,0],[0,0,Math.PI/2]);
  else if(type==='bun'){
    m=cyl(.3,.18,material,[0,0,0],12);const top=cyl(.29,.13,material,[0,.11,0],12);top.geometry.translate(0,.02,0);g.add(top);
  } else if(type==='hotdog_bun') m=mesh(new THREE.CapsuleGeometry(.14,.42,3,8),material,[0,0,0],[0,0,Math.PI/2]);
  else if(type==='cheese') m=box(.5,.035,.5,material,[0,0,0],[0,.15,0]);
  else if(type==='lettuce') m=mesh(new THREE.TorusGeometry(.22,.065,5,10),material,[0,0,0],[Math.PI/2,0,0]);
  else if(type==='frozen_fries'||type==='cooked_fries') {for(let i=0;i<7;i++)g.add(box(.055,.42,.055,material,[(i-3)*.07,Math.random()*.08,0],[0,0,(i-3)*.04]));}
  else if(type.includes('pizza')) {m=cyl(.43,.07,material,[0,0,0],16);const sMat=new THREE.MeshStandardMaterial({color:0xd89b3e,roughness:.8});g.add(cyl(.36,.075,sMat,[0,.035,0],16));if(type.includes('pepperoni'))for(let i=0;i<5;i++)g.add(cyl(.055,.015,new THREE.MeshStandardMaterial({color:0x912d25}),[(i%3-1)*.15,.08,(i%2-.5)*.2],8));}
  else if(['ketchup','mayo','mustard','hot_sauce','sauce'].includes(type)){m=cyl(.09,.36,material,[0,0,0],8);const capMat=new THREE.MeshStandardMaterial({color:0xddd9c7});g.add(cyl(.06,.07,capMat,[0,.215,0],8));}
  else if(type.includes('soda')){m=cyl(.095,.34,material,[0,0,0],12);g.add(cyl(.085,.012,MAT.metal,[0,.176,0],12));}
  else if(type==='dough')m=cyl(.32,.07,material,[0,0,0],14);
  else if(type==='pepperoni')m=cyl(.19,.09,material,[0,0,0],12);
  else if(type==='cleaver'){m=box(.08,.55,.48,material,[0,.2,0]);g.add(cyl(.065,.52,new THREE.MeshStandardMaterial({color:0x2c1d13}),[0,-.32,0],8));}
  else m=box(.28,.2,.28,material,[0,0,0]);
  if(m)g.add(m);g.traverse(x=>{if(x.isMesh){x.castShadow=true;x.receiveShadow=true;}});g.userData.itemType=type;g.userData.draggable=true;return g;
}

class KioskGame {
  constructor(){
    this.container=$('#game');this.started=false;this.paused=false;this.locked=false;this.day=1;this.completed=0;this.currentOrder=null;this.customer=null;this.customerPhase='none';this.customerQueueTimer=0;
    this.scene=new THREE.Scene();this.scene.background=new THREE.Color(0x080c0d);this.scene.fog=new THREE.FogExp2(0x080c0d,.018);
    this.renderer=new THREE.WebGLRenderer({antialias:false,powerPreference:'high-performance'});this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.shadowMap.enabled=SETTINGS.shadows;this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;this.container.appendChild(this.renderer.domElement);
    this.camera=new THREE.PerspectiveCamera(67,innerWidth/innerHeight,.06,140);
    this.rig=new THREE.Group();this.pitch=new THREE.Group();this.rig.add(this.pitch);this.pitch.add(this.camera);this.scene.add(this.rig);this.rig.position.set(0,1.66,4.4);
    this.clock=new THREE.Clock();this.elapsed=0;this.raycaster=new THREE.Raycaster();this.raycaster.far=3.4;this.center=new THREE.Vector2(0,0);
    this.keys={};this.interactives=[];this.draggables=[];this.held=null;this.heldDistance=2.05;this.hover=null;this.dropZones=[];this.colliders=[];this.powerLights=[];this.animated=[];this.cars=[];this.appliances={};this.tray=[];this.prep=[];this.pendingDelivery=false;this.power=true;this.powerEventDone=false;this.finale=false;this.killerHits=0;
    this.stock={bun:5,hotdog_bun:4,dough:4,raw_patty:6,raw_sausage:4,frozen_fries:5,cheese:6,lettuce:6,pepperoni:5,ketchup:8,mayo:5,mustard:5,hot_sauce:5,sauce:6,soda:5,orange_soda:4};
    this.clues=new Set(JSON.parse(localStorage.getItem('kiosk.clues')||'[]'));
    this.initRenderer();this.buildWorld();this.bind();this.renderRecipeBook();this.renderDelivery();this.applyQuality();this.updateClues();
    this.animate();
  }
  initRenderer(){ this.renderer.setSize(innerWidth,innerHeight);this.renderer.setPixelRatio(1); }
  applyQuality(){
    const scale={verylow:.48,low:.68,medium:1}[SETTINGS.quality];this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.25)*scale);this.renderer.setSize(innerWidth,innerHeight);document.body.classList.toggle('verylow',SETTINGS.quality==='verylow');this.renderer.shadowMap.enabled=SETTINGS.shadows;
  }
  add(obj,parent=this.scene){parent.add(obj);return obj;}
  collider(x,z,w,d){this.colliders.push({x1:x-w/2,x2:x+w/2,z1:z-d/2,z2:z+d/2});}
  markInteractive(root,label,action){root.userData.interactive=true;root.userData.prompt=label;root.userData.action=action;this.interactives.push(root);return root;}
  markDraggable(root){root.userData.draggable=true;if(!this.draggables.includes(root))this.draggables.push(root);return root;}
  markSource(root,type){root.userData.sourceType=type;root.userData.draggable=true;root.userData.prompt=`Take ${foodName(type)}`;this.draggables.push(root);return root;}
  makeLight(x,y,z,color=0xdde0c4,intensity=1.15){
    const fixture=new THREE.Group(), shade=box(1.4,.08,.42,MAT.metal,[0,0,0]);fixture.add(shade);const glow=box(1.18,.025,.3,new THREE.MeshBasicMaterial({color}),[0,-.055,0]);fixture.add(glow);fixture.position.set(x,y,z);this.scene.add(fixture);
    const l=new THREE.PointLight(color,intensity,11,2);l.position.set(x,y-.15,z);l.castShadow=SETTINGS.shadows;l.shadow.mapSize.set(512,512);this.scene.add(l);this.powerLights.push({light:l,glow,base:intensity,color:new THREE.Color(color)});return l;
  }
  buildWorld(){
    // Shell of the kiosk
    this.add(box(18,.12,18,MAT.tile,[0,-.06,0]));this.add(box(18,.16,18,MAT.dark,[0,3.85,0]));
    this.add(box(.18,4,18,MAT.wall,[-9,1.9,0]));this.add(box(.18,4,18,MAT.wall,[9,1.9,0]));
    this.add(box(5.8,4,.18,MAT.wall,[-6.1,1.9,-9]));this.add(box(5.8,4,.18,MAT.wall,[6.1,1.9,-9]));this.add(box(6.4,.8,.18,MAT.wall,[0,3.45,-9]));this.add(box(6.4,1.05,.18,MAT.wall,[0,.52,-9]));
    this.add(box(9.3,4,.18,MAT.wall,[-4.35,1.9,9]));this.add(box(5.5,4,.18,MAT.wall,[6.25,1.9,9]));this.add(box(1.2,1,.18,MAT.wall,[1.1,3.35,9]));
    this.add(box(6.4,2.25,.06,MAT.glass,[0,2.15,-8.92]));
    this.add(sign('NIGHT  WINDOW',5.5,.65,[0,3.43,-8.8],[0,0,0],'#c6b76e','#1d2a22'));
    this.collider(-8.9,0,.3,18);this.collider(8.9,0,.3,18);this.collider(-6.1,-8.9,5.8,.3);this.collider(6.1,-8.9,5.8,.3);this.collider(-4.35,8.9,9.3,.3);this.collider(6.25,8.9,5.5,.3);
    // Fluorescent fixtures. Their slight mismatch produces a sickly interior.
    this.makeLight(-4,3.62,-3,0xcbd8bd,1.05);this.makeLight(3,3.62,-2,0xd7d5b8,.95);this.makeLight(0,3.62,4,0xb8c9b3,.95);this.makeLight(-5.6,3.5,6,0xb7d1d2,.75);
    const redLight=new THREE.PointLight(0x7d1713,.24,8);redLight.position.set(2.2,2.4,9.5);this.scene.add(redLight);this.redBackLight=redLight;
    this.buildExterior();this.buildCounter();this.buildWorkStations();this.buildFreezer();this.buildFridge();this.buildBedroom();this.buildDeliveryArea();this.buildStoryProps();
    const amb=new THREE.HemisphereLight(0x89958e,0x15150f,.26);this.scene.add(amb);
  }
  buildExterior(){
    this.add(box(70,.12,45,new THREE.MeshStandardMaterial({color:0x182018,roughness:1}),[0,-.11,-22]));
    this.add(box(90,.08,9,new THREE.MeshStandardMaterial({map:TEX.road,roughness:.98}),[0,-.02,-18]));
    for(let x=-38;x<40;x+=7)this.add(box(3.3,.025,.16,new THREE.MeshBasicMaterial({color:0xb7ad72}),[x,.03,-18]));
    // Buildings and dim windows across the road.
    for(let i=0;i<8;i++){
      const x=-33+i*9.4,h=5+(i%3)*1.8,d=4+(i%2)*2;this.add(box(7,h,d,new THREE.MeshStandardMaterial({color:i%2?0x232b29:0x2d2d29,roughness:1}),[x,h/2-0.1,-28]));
      for(let wx=-2;wx<=2;wx+=2)for(let wy=1.2;wy<h-1;wy+=1.7){if(Math.random()>.42)this.add(box(.72,.5,.03,new THREE.MeshBasicMaterial({color:Math.random()>.3?0x716845:0x202421}),[x+wx,wy,-25.95-d/2]));}
    }
    // Trees are low-poly silhouettes.
    for(const [x,z,s] of [[-12,-12,1],[13,-12,1.2],[-18,-25,.8],[19,-26,1.1],[-27,-12,.9]]){
      this.add(cyl(.18*s,3.5*s,new THREE.MeshStandardMaterial({color:0x2d271b}),[x,1.7*s,z],6));
      this.add(mesh(new THREE.ConeGeometry(1.5*s,3.8*s,7),new THREE.MeshStandardMaterial({color:0x152219,roughness:1}),[x,4*s,z]));
    }
    const lamp=this.add(cyl(.11,6,MAT.metal,[10,3,-12],8));this.add(box(1.2,.16,.36,MAT.metal,[10,6,-12]));const ll=new THREE.PointLight(0xb7b784,.7,13);ll.position.set(10,5.8,-12);this.scene.add(ll);
    // Passing cars travel forever in both directions.
    for(let i=0;i<4;i++){
      const car=new THREE.Group(), color=[0x492b28,0x263c42,0x4a4732,0x262827][i];car.add(box(3,.65,1.35,new THREE.MeshStandardMaterial({color,roughness:.65}),[0,.55,0]));car.add(box(1.55,.58,1.2,new THREE.MeshStandardMaterial({color:0x202726,roughness:.25}),[.15,1.05,0]));
      for(const x of [-.95,1])for(const z of [-.58,.58])car.add(cyl(.25,.13,MAT.black,[x,.3,z],8,[Math.PI/2,0,0]));
      const dir=i%2?1:-1;car.position.set(dir*20+i*8,0,-16+(i%2)*-3.6);car.userData={dir,speed:2.5+i*.45};this.scene.add(car);this.cars.push(car);
    }
  }
  buildCounter(){
    const counter=new THREE.Group();counter.position.set(0,0,-6.75);counter.add(box(7,1.05,1,MAT.wood,[0,.52,0]));counter.add(box(7.2,.12,1.18,MAT.metal,[0,1.08,0]));this.scene.add(counter);this.collider(0,-6.75,7.1,1.1);
    const tray=box(2,.06,.7,new THREE.MeshStandardMaterial({color:0x575e57,metalness:.55,roughness:.4}),[0,1.19,-6.35]);this.scene.add(tray);this.dropZones.push({type:'tray',pos:new THREE.Vector3(0,1.35,-6.25),radius:1.85});
    const mat=new THREE.MeshStandardMaterial({color:0xc8a348,metalness:.65,roughness:.25});const bell=new THREE.Group();bell.add(cyl(.18,.08,mat,[0,0,0],12));bell.add(mesh(new THREE.SphereGeometry(.16,10,6,0,Math.PI*2,0,Math.PI/2),mat,[0,.05,0]));bell.add(cyl(.035,.08,mat,[0,.17,0],8));bell.position.set(2.2,1.2,-6.3);this.scene.add(bell);
    this.markInteractive(bell,'Ring service bell',()=>this.submitOrder());
    this.add(sign('SERVING TRAY',1.7,.28,[0,1.33,-6.8],[-Math.PI/2,0,0],'#282b25','#bbb79f'));
  }
  buildWorkStations(){
    const base=(x,label)=>{const g=new THREE.Group();g.position.set(x,0,-3.4);g.add(box(1.75,.9,1.35,MAT.metal,[0,.45,0]));g.add(sign(label,1.35,.3,[0,1.13,.69],[0,0,0],'#c9c6b5','#1b1e1b'));this.scene.add(g);this.collider(x,-3.4,1.8,1.4);return g;};
    // Grill
    let g=base(-3.3,'GRILL');g.add(box(1.5,.08,1.05,MAT.black,[0,.98,0]));for(let i=-3;i<=3;i++)g.add(box(.06,.03,.95,MAT.metal,[i*.19,1.04,0]));
    const grillLamp=cyl(.06,.03,new THREE.MeshBasicMaterial({color:0x245a2e}),[.64,1.2,.7],8,[Math.PI/2,0,0]);g.add(grillLamp);this.appliances.grill={group:g,busy:false,lamp:grillLamp,pos:new THREE.Vector3(-3.3,1.3,-3.4)};this.dropZones.push({type:'grill',pos:this.appliances.grill.pos,radius:1});
    // Fryer
    g=base(-.9,'FRYER');g.add(box(1.25,.35,.9,MAT.dark,[0,1.04,0]));g.add(box(.95,.08,.63,new THREE.MeshStandardMaterial({color:0x3e3322,roughness:.25}),[0,1.22,0]));
    const fryerLamp=cyl(.06,.03,new THREE.MeshBasicMaterial({color:0x245a2e}),[.64,1.2,.7],8,[Math.PI/2,0,0]);g.add(fryerLamp);this.appliances.fryer={group:g,busy:false,lamp:fryerLamp,pos:new THREE.Vector3(-.9,1.4,-3.4)};this.dropZones.push({type:'fryer',pos:this.appliances.fryer.pos,radius:1});
    // Furnace / pizza oven
    g=base(1.5,'FURNACE');g.add(box(1.4,.65,1,MAT.dark,[0,1.2,0]));g.add(box(1.05,.37,.03,new THREE.MeshStandardMaterial({color:0x090b09}),[0,1.22,.52]));g.add(box(.8,.23,.02,new THREE.MeshBasicMaterial({color:0x542316}),[0,1.22,.535]));
    const ovenLamp=cyl(.06,.03,new THREE.MeshBasicMaterial({color:0x245a2e}),[.64,1.67,.54],8,[Math.PI/2,0,0]);g.add(ovenLamp);this.appliances.oven={group:g,busy:false,lamp:ovenLamp,pos:new THREE.Vector3(1.5,1.35,-3.1)};this.dropZones.push({type:'oven',pos:this.appliances.oven.pos,radius:1});
    // Sink
    g=base(4.05,'WASH');g.add(box(1.2,.22,.85,new THREE.MeshStandardMaterial({color:0x49514d,metalness:.65}),[0,1.03,0]));g.add(mesh(new THREE.TorusGeometry(.23,.035,6,10,Math.PI),MAT.metal,[0,1.48,-.18],[0,0,Math.PI]));
    // Central prep table and chopping board.
    const table=new THREE.Group();table.add(box(4.2,.16,2.5,MAT.wood,[0,1.05,0]));for(const x of [-1.8,1.8])for(const z of [-1,1])table.add(box(.16,1.05,.16,MAT.metal,[x,.52,z]));table.position.set(0,0,.1);this.scene.add(table);this.collider(0,.1,4.2,2.5);
    const board=box(1.45,.08,1,new THREE.MeshStandardMaterial({color:0xb79665,roughness:1}),[-.65,1.18,.1]);this.scene.add(board);this.dropZones.push({type:'prep',pos:new THREE.Vector3(-.65,1.35,.1),radius:.9});
    const prepButton=new THREE.Group();prepButton.add(box(.55,.12,.48,MAT.red,[0,0,0]));prepButton.add(sign('PREP',.44,.2,[0,.07,.25],[-Math.PI/2,0,0],'#eee4ce','#74251f'));prepButton.position.set(.65,1.23,.1);this.scene.add(prepButton);this.markInteractive(prepButton,'Combine prep ingredients',()=>this.combinePrep());
    // Recipe book, physically present on the table.
    const book=new THREE.Group();book.add(box(.75,.09,.95,new THREE.MeshStandardMaterial({map:TEX.paper,color:0x9b362d,roughness:.9}),[0,0,0]));book.add(sign('RECIPES',.62,.24,[0,.052,.05],[-Math.PI/2,0,0],'#d8cba9','#7b2b26'));book.position.set(1.45,1.21,.25);this.scene.add(book);this.markInteractive(book,'Open recipe book [B]',()=>showModal('#recipe-panel'));
    // Cleaver hangs beside the preparation table. It becomes important on night five.
    const cleaver=foodModel('cleaver');cleaver.scale.set(.8,.8,.8);cleaver.position.set(2.1,1.45,.55);cleaver.rotation.z=-.2;this.scene.add(cleaver);this.markDraggable(cleaver);this.cleaver=cleaver;
  }
  makeStockBin(type,pos,parent=this.scene,label=true){
    const bin=box(.72,.42,.72,new THREE.MeshStandardMaterial({color:0x444c43,roughness:.9}),[...pos]);parent.add(bin);const sample=foodModel(type);sample.scale.set(.78,.78,.78);sample.position.set(pos[0],pos[1]+.34,pos[2]);parent.add(sample);this.markSource(sample,type);if(label){const s=makeLabelSprite(foodName(type));s.position.set(pos[0],pos[1]+.82,pos[2]);parent.add(s);}return sample;
  }
  buildFreezer(){
    // Walk-in room at the rear left. It is large enough for the player to enter.
    const coldMat=new THREE.MeshStandardMaterial({map:TEX.freezer,color:0xaab8b1,roughness:.65,metalness:.1});
    this.add(box(.14,3.15,6.3,coldMat,[-8.25,1.58,5.45]));this.add(box(5,.14,6.3,new THREE.MeshStandardMaterial({color:0x788985}),[-5.75,3.1,5.45]));
    this.add(box(1.7,3.15,.14,coldMat,[-7.42,1.58,2.3]));this.add(box(1.8,3.15,.14,coldMat,[-4.2,1.58,2.3]));this.add(box(.14,3.15,6.3,coldMat,[-3.25,1.58,5.45]));
    this.collider(-8.25,5.45,.25,6.3);this.collider(-3.25,5.45,.25,6.3);this.collider(-7.42,2.3,1.7,.25);this.collider(-4.2,2.3,1.8,.25);
    const pivot=new THREE.Group();pivot.position.set(-6.5,0,2.3);const door=box(1.45,2.75,.12,coldMat,[.72,1.38,0]);pivot.add(door);this.scene.add(pivot);pivot.userData.open=false;this.markInteractive(pivot,'Open walk-in freezer',()=>{pivot.userData.open=!pivot.userData.open;pivot.rotation.y=pivot.userData.open?-Math.PI/2:0;pivot.userData.prompt=pivot.userData.open?'Close walk-in freezer':'Open walk-in freezer';audio.door();});
    this.add(sign('WALK-IN FREEZER',2.6,.38,[-5.75,2.88,2.22],[0,0,0],'#1f322f','#aab6ad'));
    // Metal shelving and supplies
    const shelf=(z)=>{this.add(box(3.9,.09,.7,MAT.metal,[-5.65,.52,z]));this.add(box(3.9,.09,.7,MAT.metal,[-5.65,1.55,z]));for(const x of [-7.4,-3.9])this.add(box(.1,2.1,.1,MAT.metal,[x,1.05,z]));};shelf(7.7);shelf(4.2);
    this.makeStockBin('raw_patty',[-6.8,.78,7.7]);this.makeStockBin('raw_sausage',[-5.5,.78,7.7]);this.makeStockBin('frozen_fries',[-4.2,.78,7.7]);this.makeStockBin('dough',[-6.8,1.8,7.7]);this.makeStockBin('pepperoni',[-5.5,1.8,7.7]);
    const coldLight=this.makeLight(-5.7,2.92,5.4,0xb9dcdf,.68);coldLight.distance=7;
    // Fuse box. On night three this is the only lit interactive object.
    const fuse=new THREE.Group();fuse.add(box(.72,1,.17,MAT.metal,[0,0,0]));fuse.add(box(.5,.04,.04,MAT.red,[0,.2,.11],[0,0,.55]));fuse.add(sign('FUSE',.55,.2,[0,-.27,.1],[0,0,0],'#222','#aaa99a'));fuse.position.set(-3.12,1.55,3.4);fuse.rotation.y=-Math.PI/2;this.scene.add(fuse);this.fuse=fuse;this.markInteractive(fuse,'Reset main breaker',()=>this.restorePower());
  }
  buildFridge(){
    const body=new THREE.Group();body.position.set(7.7,0,-.3);body.add(box(1.8,3.2,1.1,new THREE.MeshStandardMaterial({color:0xc4c7b9,roughness:.7,metalness:.05}),[0,1.6,0]));body.add(box(1.46,2.75,.04,new THREE.MeshStandardMaterial({color:0x47514b,transparent:true,opacity:.42,metalness:.35}),[0,1.6,-.57]));
    for(let y=.5;y<2.8;y+=.7)body.add(box(1.45,.04,.85,MAT.metal,[0,y,0]));this.scene.add(body);this.collider(7.7,-.3,1.8,1.15);
    this.add(sign('COLD DRINKS + CHEESE',2.2,.32,[7.65,3.35,-.3],[0,-Math.PI/2,0],'#c1dbd1','#20342e'));
    this.makeStockBin('cheese',[7.03,.58,-.18]);this.makeStockBin('soda',[7.03,1.3,-.18]);this.makeStockBin('orange_soda',[7.03,2.03,-.18]);
    // Condiment/produce rack beside the fridge
    const rack=new THREE.Group();rack.position.set(6.7,0,2.2);rack.add(box(2.7,.08,.75,MAT.metal,[0,.45,0]));rack.add(box(2.7,.08,.75,MAT.metal,[0,1.4,0]));for(const x of [-1.25,1.25])rack.add(box(.08,1.9,.08,MAT.metal,[x,.95,0]));this.scene.add(rack);this.collider(6.7,2.2,2.8,.8);
    const sourcePositions=[['lettuce',5.75,.72],['ketchup',6.4,.72],['mayo',7.05,.72],['mustard',5.75,1.68],['hot_sauce',6.4,1.68],['sauce',7.05,1.68]];
    sourcePositions.forEach(([type,x,y])=>this.makeStockBin(type,[x,y,2.2],this.scene,false));
    this.add(sign('SAUCES  /  PRODUCE',2.4,.3,[6.7,2.15,2.18],[0,0,0],'#ddd5b9','#34392f'));
    // Bakery dry rack
    const dry=new THREE.Group();dry.position.set(6.7,0,-3.2);dry.add(box(2.7,.08,.75,MAT.wood,[0,.45,0]));dry.add(box(2.7,.08,.75,MAT.wood,[0,1.4,0]));for(const x of [-1.25,1.25])dry.add(box(.09,1.9,.09,MAT.metal,[x,.95,0]));this.scene.add(dry);this.collider(6.7,-3.2,2.8,.8);
    this.makeStockBin('bun',[6,.72,-3.2],this.scene,false);this.makeStockBin('hotdog_bun',[7.2,.72,-3.2],this.scene,false);this.makeStockBin('dough',[6.6,1.68,-3.2],this.scene,false);this.add(sign('BREAD',2.2,.3,[6.7,2.15,-3.18],[0,0,0],'#ded5bb','#4d3726'));
  }
  buildBedroom(){
    // A tiny employee bedroom partitioned from the storeroom.
    this.add(box(.14,3.3,2.2,MAT.wall,[4.25,1.65,7.8]));this.add(box(.14,3.3,1.5,MAT.wall,[4.25,1.65,4.05]));this.add(box(4.7,3.3,.14,MAT.wall,[6.6,1.65,3.3]));
    this.collider(4.25,7.8,.2,2.2);this.collider(4.25,4.05,.2,1.5);this.collider(6.6,3.3,4.7,.2);
    const bed=new THREE.Group();bed.position.set(6.65,0,7.4);bed.add(box(3.2,.55,1.55,MAT.wood,[0,.28,0]));bed.add(box(2.9,.32,1.4,new THREE.MeshStandardMaterial({color:0x48534a,roughness:1}),[0,.64,0]));bed.add(box(.75,.2,1.18,new THREE.MeshStandardMaterial({color:0xb0ad9c,roughness:1}),[1,.87,0]));this.scene.add(bed);this.collider(6.65,7.4,3.2,1.55);this.markInteractive(bed,'Sleep until the next night',()=>this.sleep());
    const lamp=new THREE.PointLight(0xb49365,.28,5);lamp.position.set(5.2,1.4,5);this.scene.add(lamp);this.powerLights.push({light:lamp,base:.28});
    this.add(sign('EMPLOYEES ONLY',2,.35,[6.5,2.95,3.37],[0,0,0],'#ddd7c0','#56221f'));
    const locker=new THREE.Group();locker.position.set(8,0,4.6);locker.add(box(1.2,2.6,.85,MAT.metal,[0,1.3,0]));for(let y=.5;y<2.3;y+=.23)locker.add(box(.55,.035,.02,MAT.dark,[0,y,-.44]));this.scene.add(locker);this.collider(8,4.6,1.2,.9);
  }
  buildDeliveryArea(){
    const terminal=new THREE.Group();terminal.position.set(2.8,0,6.8);terminal.add(box(1.15,1.05,.75,MAT.dark,[0,.53,0]));terminal.add(box(.85,.52,.03,new THREE.MeshBasicMaterial({color:0x416650}),[0,.65,-.39]));terminal.add(sign('ORDER',.75,.2,[0,1.18,0],[0,0,0],'#b5c6a7','#20251f'));this.scene.add(terminal);this.collider(2.8,6.8,1.2,.8);this.markInteractive(terminal,'Use delivery terminal',()=>showModal('#delivery-panel'));
    const doorPivot=new THREE.Group();doorPivot.position.set(.5,0,8.93);const door=box(1.6,3.2,.14,MAT.wood,[.8,1.6,0]);door.add(sign('DELIVERIES',1.1,.28,[0,1.05,-.08],[0,0,0],'#d5d0b8','#51251f'));doorPivot.add(door);this.scene.add(doorPivot);doorPivot.userData.open=false;this.backDoor=doorPivot;this.markInteractive(doorPivot,'Open back door',()=>{doorPivot.userData.open=!doorPivot.userData.open;doorPivot.rotation.y=doorPivot.userData.open?Math.PI/2:0;doorPivot.userData.prompt=doorPivot.userData.open?'Close back door':'Open back door';audio.door();});
    const unpack=box(2.7,.025,2.1,new THREE.MeshStandardMaterial({color:0x66231f,roughness:1}),[1.2,.02,10.35]);this.scene.add(unpack);this.add(sign('DROP CRATE HERE',2,.35,[1.2,.06,10.35],[-Math.PI/2,0,0],'#d1c6a8','#66231f'));this.dropZones.push({type:'unpack',pos:new THREE.Vector3(1.2,.5,10.35),radius:1.55});
    this.add(box(7,.12,4,new THREE.MeshStandardMaterial({color:0x2c322b,roughness:1}),[1.2,-.04,10.7]));
  }
  buildStoryProps(){
    const poster=new THREE.Group();poster.add(box(1.3,1.75,.025,new THREE.MeshStandardMaterial({map:TEX.paper,color:0xc8bea1}),[0,0,0]));poster.add(sign('MISSING\nMILO KARA',1.12,1.52,[0,0,.02],[0,0,0],'#2d2921','#bdb497'));poster.position.set(-8.88,2,0);poster.rotation.y=Math.PI/2;this.scene.add(poster);this.markInteractive(poster,'Read missing poster',()=>this.openNote(0));
    const radio=new THREE.Group();radio.add(box(1.1,.6,.5,new THREE.MeshStandardMaterial({color:0x3d3023,roughness:.8}),[0,0,0]));radio.add(cyl(.2,.02,MAT.dark,[-.3,0,.26],12,[Math.PI/2,0,0]));for(let i=0;i<6;i++)radio.add(box(.025,.3,.02,MAT.dark,[.1+i*.1,0,.26]));radio.position.set(-7.6,1.35,-4.6);this.scene.add(radio);this.markInteractive(radio,'Tune the radio',()=>this.radioMessage());
    const clockFace=new THREE.MeshBasicMaterial({map:textTexture('11:47', '#a63931','#161915',256,128,44)});const clock=mesh(new THREE.PlaneGeometry(1.2,.55),clockFace,[0,2.8,8.87],[0,Math.PI,0]);this.scene.add(clock);
  }
  bind(){
    window.addEventListener('resize',()=>{this.camera.aspect=innerWidth/innerHeight;this.camera.updateProjectionMatrix();this.applyQuality();});
    document.addEventListener('keydown',e=>{
      this.keys[e.code]=true;
      if(!this.started)return;
      if(e.code==='KeyB' && !this.paused){showModal('#recipe-panel');}
      if(e.code==='Escape' && this.locked) this.unlock();
    });
    document.addEventListener('keyup',e=>this.keys[e.code]=false);
    document.addEventListener('mousemove',e=>{
      if(!this.locked)return;const s=.0018*SETTINGS.sensitivity;this.rig.rotation.y-=e.movementX*s;this.pitch.rotation.x=clamp(this.pitch.rotation.x-e.movementY*s,-1.48,1.48);
    });
    document.addEventListener('contextmenu',e=>e.preventDefault());
    document.addEventListener('mousedown',e=>{
      if(!this.started||!this.locked)return;
      if(e.button===2)this.grab();
      if(e.button===0)this.use();
    });
    document.addEventListener('mouseup',e=>{if(e.button===2&&this.held)this.drop();});
    document.addEventListener('wheel',e=>{if(this.held)this.heldDistance=clamp(this.heldDistance+Math.sign(e.deltaY)*.18,1.1,2.8);});
    this.renderer.domElement.addEventListener('click',()=>{if(this.started&&!this.locked&&!this.paused&&!$$('.modal:not(.hidden)').length)this.lock();});
    document.addEventListener('pointerlockchange',()=>{
      this.locked=document.pointerLockElement===this.renderer.domElement;
      if(this.started&&!this.locked&&!this.paused&&!$$('.modal:not(.hidden)').length){this.paused=true;$('#pause-panel').classList.remove('hidden');}
    });
  }
  lock(){this.renderer.domElement.requestPointerLock?.();}
  unlock(){if(document.pointerLockElement)document.exitPointerLock();}
  start(reset=true){
    audio.start();this.started=true;this.paused=false;
    if(reset){
      this.day=1;this.completed=0;this.stock={bun:5,hotdog_bun:4,dough:4,raw_patty:6,raw_sausage:4,frozen_fries:5,cheese:6,lettuce:6,pepperoni:5,ketchup:8,mayo:5,mustard:5,hot_sauce:5,sauce:6,soda:5,orange_soda:4};this.tray=[];this.prep=[];this.clues=new Set();this.pendingDelivery=false;this.held=null;
      this.draggables.filter(o=>!o.userData.sourceType&&o!==this.cleaver).forEach(o=>this.scene.remove(o));this.draggables=this.draggables.filter(o=>o.userData.sourceType||o===this.cleaver);this.scene.attach(this.cleaver);this.cleaver.position.set(2.1,1.45,.55);this.cleaver.rotation.set(0,0,-.2);this.cleaver.scale.set(.8,.8,.8);this.appliances&&Object.values(this.appliances).forEach(a=>a.busy=false);
    }
    this.rig.position.set(0,1.66,4.4);this.rig.rotation.set(0,0,0);this.pitch.rotation.set(0,0,0);this.power=true;this.powerLights.forEach(({light,color})=>color&&light.color.copy(color));this.redBackLight.intensity=.24;this.setPower(true);
    $('#menu').classList.add('hidden');$('#intro').classList.add('hidden');$('#ending').classList.add('hidden');$('#hud').classList.remove('hidden');$('#day-num').textContent=this.day;this.renderTray();this.updateClues();this.startDay();setTimeout(()=>this.lock(),100);
  }
  continue(){
    const data=JSON.parse(localStorage.getItem('kiosk.save')||'null');if(!data){showOnly('#intro');return;}
    this.day=data.day||1;this.completed=data.completed||0;this.stock={...this.stock,...data.stock};this.clues=new Set(data.clues||[]);this.start(false);this.updateClues();
  }
  save(){localStorage.setItem('kiosk.save',JSON.stringify({day:this.day,completed:this.completed,stock:this.stock,clues:[...this.clues]}));$('#continue-game').disabled=false;}
  startDay(){
    if(this.customer){this.scene.remove(this.customer);this.customer=null;}this.currentOrder=null;this.customerPhase='none';this.powerEventDone=false;this.finale=false;this.customerQueueTimer=3.5;$('#order-ticket').classList.add('hidden');$('#day-num').textContent=this.day;$('#shift-label').textContent=this.day===1?'NIGHT SHIFT':`NIGHT ${this.day}`;
    notify(`NIGHT ${this.day} — ${5-this.completed} ORDERS REMAIN`,3500);updateObjective();
    if(this.day===2)setTimeout(()=>this.flicker(2),2500);
    if(this.day===4)setTimeout(()=>this.showFigure(),9000);
    this.save();
  }
  sleep(){
    if(this.completed<5){notify(t('dayLocked'));audio.error();return;}
    if(this.day>=5){notify('There will be no morning yet.');return;}
    this.unlock();const fade=document.createElement('div');fade.style.cssText='position:fixed;inset:0;background:#000;z-index:35;opacity:0;transition:opacity 1.4s;display:grid;place-items:center;font:15px monospace;letter-spacing:.25em;color:#aaa';fade.textContent=`JUNE ${21+this.day}, 1986`;document.body.appendChild(fade);requestAnimationFrame(()=>fade.style.opacity=1);
    setTimeout(()=>{this.day++;this.completed=0;this.tray=[];this.prep=[];this.renderTray();this.rig.position.set(6.1,1.66,5.4);this.setPower(true);this.startDay();fade.style.opacity=0;setTimeout(()=>{fade.remove();this.lock();},1400);},1900);
  }
  updateRay(){
    if(!this.started||!this.locked||this.paused){this.setHover(null);return;}
    this.raycaster.setFromCamera(this.center,this.camera);const pool=[...this.interactives,...this.draggables].filter(x=>x.parent&&x!==this.held);const hits=this.raycaster.intersectObjects(pool,true);
    let target=null,kind=null,hit=null;
    for(const h of hits){let o=h.object;while(o&&o!==this.scene&&!o.userData.interactive&&!o.userData.draggable)o=o.parent;if(o?.userData.interactive||o?.userData.draggable){target=o;kind=o.userData.interactive?'use':'grab';hit=h;break;}}
    this.setHover(target,kind,hit);
  }
  setHover(target,kind=null,hit=null){
    this.hover=target?{root:target,kind,hit}:null;document.body.classList.toggle('can-use',kind==='use');document.body.classList.toggle('can-grab',kind==='grab');const p=$('#prompt');const stock=$('#stock-peek');
    if(target){p.classList.remove('hidden');p.querySelector('kbd').textContent=kind==='grab'?'RMB':'LMB';p.querySelector('span').textContent=target.userData.sourceType?`RMB — ${foodName(target.userData.sourceType)}`:(target.userData.prompt||(kind==='grab'?'HOLD / DRAG':'INTERACT'));if(target.userData.sourceType){const type=target.userData.sourceType;stock.innerHTML=`<b>${foodName(type).toUpperCase()}</b><br>STOCK REMAINING: ${this.stock[type]||0}`;stock.classList.remove('hidden')}else stock.classList.add('hidden');} else {p.classList.add('hidden');stock.classList.add('hidden');}
  }
  grab(){
    if(this.held||!this.hover||this.hover.kind!=='grab')return;const root=this.hover.root;let obj;
    if(root.userData.sourceType){const type=root.userData.sourceType;if((this.stock[type]||0)<=0){notify(t('empty'));audio.error();return;}this.stock[type]--;obj=foodModel(type);obj.position.copy(root.getWorldPosition(new THREE.Vector3()));this.scene.add(obj);this.markDraggable(obj);}
    else obj=root;
    if(!obj.userData.draggable)return;obj.updateMatrixWorld();this.scene.attach(obj);this.held=obj;this.heldDistance=2.05;obj.userData.wasHeld=true;$('#held-label').classList.remove('hidden');$('#held-label b').textContent=obj.userData.package?obj.userData.package.name:(foodName(obj.userData.itemType)||obj.name||'ITEM');audio.click();
  }
  use(){
    if(this.finale&&this.held?.userData.itemType==='cleaver'){this.attackKiller();return;}
    if(this.hover?.kind==='use'){audio.click();this.hover.root.userData.action?.();}
  }
  drop(){
    const obj=this.held;this.held=null;$('#held-label').classList.add('hidden');if(!obj)return;
    const p=obj.getWorldPosition(new THREE.Vector3());let zone=null,dist=Infinity;
    for(const z of this.dropZones){const d=Math.hypot(p.x-z.pos.x,p.z-z.pos.z);if(d<z.radius&&d<dist){zone=z;dist=d;}}
    if(zone&&this.handleDrop(obj,zone))return;
    obj.position.y=Math.max(.18,obj.position.y);obj.rotation.x=0;obj.rotation.z=0;
  }
  removeObject(obj){this.scene.remove(obj);this.draggables=this.draggables.filter(x=>x!==obj);}
  handleDrop(obj,zone){
    const type=obj.userData.itemType;
    if(zone.type==='tray'&&type&&type!=='cleaver'&&type!=='package'){
      this.tray.push(type);this.removeObject(obj);this.renderTray();audio.click();return true;
    }
    if(zone.type==='prep'&&type&&['dough','sauce','cheese','pepperoni'].includes(type)){
      this.prep.push(type);this.removeObject(obj);this.renderPrep();audio.click();return true;
    }
    if(zone.type==='unpack'&&obj.userData.package){Object.entries(obj.userData.package.items).forEach(([k,v])=>this.stock[k]=(this.stock[k]||0)+v);this.pendingDelivery=false;this.removeObject(obj);notify(t('unpacked'));audio.success();updateObjective();this.save();return true;}
    const valid={grill:{raw_patty:'cooked_patty',raw_sausage:'cooked_sausage'},fryer:{frozen_fries:'cooked_fries'},oven:{raw_pizza:'baked_pizza',raw_pepperoni_pizza:'baked_pepperoni_pizza'}}[zone.type];
    if(valid?.[type]){const appliance=this.appliances[zone.type];if(appliance.busy){notify(t('busy'));audio.error();return false;}this.removeObject(obj);this.runAppliance(zone.type,valid[type]);return true;}
    return false;
  }
  runAppliance(name,output){
    const a=this.appliances[name];a.busy=true;a.lamp.material.color.setHex(0xa13326);notify(t('cooking'));const duration=name==='oven'?15000:name==='grill'?11000:9000;let remain=duration;
    const finish=()=>{if(!this.power){setTimeout(finish,1000);return;}a.busy=false;a.lamp.material.color.setHex(0x45a65a);audio.tone(720,.2,'square',.05);audio.tone(920,.25,'square',.035,.22);const item=foodModel(output);item.position.copy(a.pos);item.position.y+=.25;this.scene.add(item);this.markDraggable(item);setTimeout(()=>a.lamp.material.color.setHex(0x245a2e),3500);};setTimeout(finish,remain);
  }
  combinePrep(){
    const sorted=[...this.prep].sort().join(',');const cheese=['cheese','dough','sauce'].sort().join(','),pep=['cheese','dough','pepperoni','sauce'].sort().join(',');let type=sorted===cheese?'raw_pizza':sorted===pep?'raw_pepperoni_pizza':null;
    if(!type){notify(t('recipeFail'));audio.error();if(this.prep.length){this.prep=[];this.renderPrep();}return;}
    this.prep=[];this.renderPrep();const item=foodModel(type);item.position.set(-.65,1.45,.1);this.scene.add(item);this.markDraggable(item);notify(t('prepReady'));audio.success();
  }
  renderPrep(){
    this.scene.children.filter(x=>x.userData.prepVisual).forEach(x=>this.scene.remove(x));this.prep.forEach((type,i)=>{const v=foodModel(type);v.scale.set(.35,.35,.35);v.position.set(-.95+(i%3)*.32,1.29,-.05+Math.floor(i/3)*.25);v.userData.prepVisual=true;v.userData.draggable=false;this.scene.add(v);});
  }
  renderTray(){
    this.scene.children.filter(x=>x.userData.trayVisual).forEach(x=>this.scene.remove(x));this.tray.forEach((type,i)=>{const v=foodModel(type);v.scale.set(.32,.32,.32);v.position.set(-.65+(i%5)*.33,1.29,-6.25+Math.floor(i/5)*.18);v.userData.trayVisual=true;v.userData.draggable=false;this.scene.add(v);});updateOrderTicket();
  }
  submitOrder(){
    audio.bell();if(!this.currentOrder){notify(t('wait'));return;}const needed=[...RECIPES[this.currentOrder].requirements];const have=[...this.tray];const ok=needed.every(n=>{const i=have.indexOf(n);if(i<0)return false;have.splice(i,1);return true;});
    if(!ok){notify(t('wrong'),3500);audio.error();return;}notify(t('correct'));audio.success();this.tray=[];this.renderTray();this.finishCustomer();
  }
  createCustomer(index,killer=false){
    const g=new THREE.Group(), skin=[0xb78163,0xd1a17d,0x805944,0xb89479,0xc08b65][index%5], coats=[0x354c43,0x49423a,0x263d50,0x5a4a31,0x3b343e];
    const skinMat=new THREE.MeshStandardMaterial({color:skin,roughness:.88}),coatMat=new THREE.MeshStandardMaterial({color:killer?0x651c1a:coats[index%coats.length],roughness:.93}),pants=new THREE.MeshStandardMaterial({color:0x1e2523,roughness:1});
    const torso=box(.68,1.05,.36,coatMat,[0,1.55,0]);g.add(torso);const head=mesh(new THREE.IcosahedronGeometry(.29,1),skinMat,[0,2.28,0]);head.scale.z=.9;g.add(head);
    const hair=mesh(new THREE.SphereGeometry(.3,8,5,0,Math.PI*2,0,Math.PI/2),new THREE.MeshStandardMaterial({color:index%3?0x241b15:0x4b3525}),[0,2.42,0]);g.add(hair);
    // Eyes are deliberately simple and too dark.
    const eyeMat=new THREE.MeshBasicMaterial({color:killer?0x5e0b08:0x111311});for(const x of [-.1,.1])g.add(mesh(new THREE.SphereGeometry(.028,6,4),eyeMat,[x,2.3,.265]));
    const mouth=box(.14,.018,.018,new THREE.MeshBasicMaterial({color:0x43211e}),[0,2.16,.276]);g.add(mouth);
    const limbs=[];for(const x of [-.23,.23]){const leg=box(.2,.85,.22,pants,[x,.63,0]);g.add(leg);limbs.push(leg);const arm=box(.18,.9,.2,coatMat,[x>0?.44:-.44,1.55,0]);g.add(arm);limbs.push(arm);}
    if(index%4===2&&!killer){const hat=mesh(new THREE.CylinderGeometry(.2,.32,.18,8),new THREE.MeshStandardMaterial({color:0x1f2934}),[0,2.6,0]);g.add(hat);}
    if(killer){const hood=mesh(new THREE.TorusGeometry(.31,.09,5,9,Math.PI*1.45),coatMat,[0,2.32,.03],[0,0,-.7]);g.add(hood);const blade=box(.1,.5,.16,new THREE.MeshStandardMaterial({color:0x8b908b,metalness:.8,roughness:.3}),[.48,1.02,.18],[0,0,-.34]);const handle=box(.11,.28,.13,new THREE.MeshStandardMaterial({color:0x251a12}),[.57,.68,.13],[0,0,-.34]);g.add(blade,handle);}
    g.userData={limbs,head,customer:true,killer,baseY:0};g.traverse(x=>{if(x.isMesh){x.castShadow=true;x.receiveShadow=true;}});return g;
  }
  spawnCustomer(){
    if(this.customer||this.completed>=5||!this.power&&!this.powerEventDone)return;
    const final=this.day===5&&this.completed===4,index=(this.day-1)*5+this.completed;this.customer=this.createCustomer(index,final);this.customer.position.set(index%2?-14:14,0,-9.85);this.customer.rotation.y=0;this.scene.add(this.customer);this.customerPhase='arriving';this.customerTargetX=(this.completed%3-1)*1.35;this.currentOrder=DAY_ORDERS[this.day-1][this.completed];notify(t('arrival'));updateObjective();
  }
  customerArrived(){
    this.customerPhase='waiting';$('#order-ticket').classList.remove('hidden');updateOrderTicket();updateObjective();const key=`${this.day}-${this.completed+1}`;const fallback={en:`${this.day===1?'Good evening':'You are still working here'}. ${recipeName(this.currentOrder)}, please.`,es:`Buenas noches. ${recipeName(this.currentOrder)}, por favor.`,fr:`Bonsoir. Un ${recipeName(this.currentOrder)}, s’il vous plaît.`,tr:`İyi akşamlar. Bir ${recipeName(this.currentOrder)}, lütfen.`,ar:`مساء الخير. أريد ${recipeName(this.currentOrder)} من فضلك.`}[lang];const line=DIALOGUE_LOCAL[lang]?.[key]||STORY_DIALOGUE[key]||fallback;const name=this.day===5&&this.completed===4?'MR. DALCA':CUSTOMER_NAMES[((this.day-1)*5+this.completed)%CUSTOMER_NAMES.length];$('#customer-name').textContent=name;setTimeout(()=>subtitle(name,line,6500),450);
    if((this.day>=2&&this.completed===0)||(this.day===4&&this.completed===2))this.addClue(`day${this.day}-${this.completed}`);
  }
  finishCustomer(){
    const wasFinal=this.day===5&&this.completed===4;this.completed++;$('#order-ticket').classList.add('hidden');this.currentOrder=null;this.save();this.triggerAfterOrder();
    if(wasFinal){this.beginFinale();return;}
    this.customerPhase='leaving';this.customerTargetX=this.customer.position.x<0?-16:16;updateObjective();
  }
  triggerAfterOrder(){
    if(this.day===1&&this.completed===3)this.addClue('milo-name');
    if(this.day===2&&this.completed===3)this.flicker(4);
    if(this.day===3&&this.completed===2&&!this.powerEventDone){setTimeout(()=>this.cutPower(),1800);}
    if(this.day===4&&this.completed===2){this.addClue('red-coat');this.backDoor.rotation.y=Math.PI/2;this.backDoor.userData.open=true;}
    if(this.day===4&&this.completed===5)this.addClue('dalca');
  }
  updateCustomer(dt){
    if(!this.customer)return;const c=this.customer;this.elapsed+=0;const moving=this.customerPhase==='arriving'||this.customerPhase==='leaving';
    if(moving){const dx=this.customerTargetX-c.position.x,step=Math.sign(dx)*dt*2.15;c.position.x+=Math.abs(step)>Math.abs(dx)?dx:step;const walk=this.elapsed*7;c.userData.limbs?.forEach((l,i)=>l.rotation.x=Math.sin(walk+(i%2)*Math.PI)*.42);c.position.y=Math.abs(Math.sin(walk))*.025;if(Math.abs(dx)<.05){if(this.customerPhase==='arriving')this.customerArrived();else{this.scene.remove(c);this.customer=null;this.customerPhase='none';if(this.completed>=5){updateObjective();}else if(this.power){this.customerQueueTimer=4+Math.random()*3;}}}
    } else if(this.customerPhase==='waiting'){c.position.y=Math.sin(this.elapsed*1.4)*.012;c.userData.head.rotation.y=Math.sin(this.elapsed*.35)*.08;}
    else if(this.customerPhase==='killer'){
      const target=this.rig.position.clone();target.y=0;const d=target.clone().sub(c.position);const distance=d.length();d.normalize();c.position.addScaledVector(d,dt*.48);c.lookAt(this.rig.position.x,c.position.y,this.rig.position.z);c.userData.limbs?.forEach((l,i)=>l.rotation.x=Math.sin(this.elapsed*5+(i%2)*Math.PI)*.5);
      if(distance<1.25&&!this.killerAttackCooldown){this.killerAttackCooldown=true;audio.scare();notify('HE SWINGS THE KNIFE — MOVE!',1600);document.body.style.filter='sepia(.5) saturate(1.8) brightness(.55)';setTimeout(()=>document.body.style.filter='',450);c.position.addScaledVector(d,-3.2);setTimeout(()=>this.killerAttackCooldown=false,1800);}
    }
  }
  beginFinale(){
    this.customerPhase='waiting';const name='MR. DALCA';subtitle(name,'Milo found the invoices. He should have kept the window open and his eyes closed.',8000);this.addClue('confession');
    setTimeout(()=>{this.setPower(false);audio.scare();$('#order-ticket').classList.add('hidden');this.backDoor.rotation.y=Math.PI/2;this.backDoor.userData.open=true;this.customer.position.set(1.2,0,11);this.customerPhase='killer';this.finale=true;this.killerHits=0;updateObjective();subtitle(name,'Five nights. I only needed you to finish what he started.',6000);},6000);
  }
  attackKiller(){
    if(!this.customer||this.customerPhase!=='killer')return;const to=this.customer.position.clone().sub(this.camera.getWorldPosition(new THREE.Vector3()));const distance=to.length();const forward=new THREE.Vector3();this.camera.getWorldDirection(forward);if(distance>3.1||forward.dot(to.normalize())<.6){audio.tone(120,.13,'sawtooth',.05);return;}
    this.killerHits++;audio.tone(74,.3,'sawtooth',.12);this.customer.position.addScaledVector(forward,-1.1);this.customer.rotation.z=(this.killerHits%2?-.15:.15);notify(`HIT ${this.killerHits} / 3`,900);
    if(this.killerHits>=3){this.finale=false;this.customerPhase='dead';this.customer.rotation.z=-Math.PI/2;this.customer.position.y=.42;this.setPower(true);this.powerLights.forEach(({light})=>light.color.setHex(0x6b1714));this.redBackLight.intensity=2;subtitle('YOU','It is over.',3500);setTimeout(()=>this.endGame(),5000);}
  }
  endGame(){
    this.unlock();this.started=false;$('#hud').classList.add('hidden');$('#ending-title').textContent=t('ending');$('#ending').classList.remove('hidden');localStorage.removeItem('kiosk.save');audio.tone(330,1.1,'sine',.06);audio.tone(440,1.1,'sine',.05,.45);
  }
  cutPower(){
    if(this.powerEventDone)return;this.powerEventDone=true;this.setPower(false);$('#power-warning').classList.remove('hidden');notify('THE KIOSK GOES SILENT',3200);this.addClue('power');this.customerQueueTimer=-1;updateObjective();
  }
  setPower(on){this.power=on;this.powerLights.forEach(({light,glow,base})=>{light.intensity=on?base:0;if(glow)glow.material.color.setHex(on?0xd5d8bd:0x171917)});audio.power(on);if(on)$('#power-warning').classList.add('hidden');}
  restorePower(){
    if(this.power){notify('The breaker is already on.');return;}this.setPower(true);notify(t('powerBack'),4200);audio.success();this.customerQueueTimer=5;this.showFigure();updateObjective();
  }
  flicker(count=3){
    if(!this.power)return;let i=0;const pulse=()=>{if(i++>=count*2){this.setPower(true);return;}const on=i%2===0;this.powerLights.forEach(({light,base})=>light.intensity=on?base:0);if(!on)audio.tone(48,.1,'square',.025);setTimeout(pulse,120+Math.random()*260);};pulse();
  }
  showFigure(){
    if(this.figure?.parent)return;const f=this.createCustomer(3,true);f.scale.set(.92,.92,.92);f.position.set(-13,0,-12);f.traverse(m=>{if(m.material)m.material=new THREE.MeshStandardMaterial({color:0x080a08,roughness:1});});this.scene.add(f);this.figure=f;setTimeout(()=>{if(this.figure?.parent)this.scene.remove(this.figure);},9000);
  }
  addClue(id){if(this.clues.has(id))return;this.clues.add(id);this.updateClues();this.save();notify('SHIFT LOG UPDATED',2200);}
  updateClues(){const el=$('#clues');el.innerHTML='';for(let i=0;i<8;i++){const p=document.createElement('i');p.className='clue-pip'+(i<this.clues.size?' found':'');el.appendChild(p);}}
  openNote(id){
    const notes=[['JUNE 16 — 10:18 PM','D. changed the delivery code again. Someone keeps ordering meat after closing. Red car outside for the third night. If I do not come in tomorrow, look beneath the cold shelf.'],['JUNE 18 — POLICE COPY','No forced entry. Register untouched. One broken wristwatch recovered near rear loading area. Time stopped: 11:47 PM.'],['UNDATED','DALCA knows about the floor. He says the owner paid him. I put the invoice in the recipe book.']];const n=notes[Math.min(id,notes.length-1)];$('#note-date').textContent=n[0];$('#note-text').textContent=n[1];showModal('#note-panel');this.addClue(`note-${id}`);
  }
  radioMessage(){
    audio.tone(165,.7,'sawtooth',.025);const messages=['…police continue the search for local employee Milo Kara…','…the caller said the lights were still on at eleven forty-seven…','…do not open the back door, do you hear me?…'];const idx=Math.min(this.day-1,2);subtitle('RADIO',messages[idx],5200);if(this.day>=2)this.addClue('radio');
  }
  requestDelivery(key){
    if(this.pendingDelivery){notify('ONE DELIVERY IS ALREADY ON THE ROAD');audio.error();return;}this.pendingDelivery=true;closeModals();notify('ORDER TRANSMITTED — PLEASE WAIT',3000);updateObjective();
    setTimeout(()=>{const data=DELIVERY[key],crate=new THREE.Group();crate.add(box(1.15,.85,1,MAT.cardboard,[0,0,0]));crate.add(sign(data.name,.85,.22,[0,.08,-.51],[0,0,0],'#30271d','#a98858'));crate.position.set(1.3,.5,10.7);crate.userData.draggable=true;crate.userData.itemType='package';crate.userData.package=data;crate.userData.prompt='Drag delivery crate';this.scene.add(crate);this.markDraggable(crate);notify(t('delivered'),4200);audio.tone(240,.12,'square',.06);audio.tone(190,.13,'square',.05,.2);updateObjective();},7000);
  }
  movePlayer(dt){
    let f=(this.keys.KeyW?1:0)-(this.keys.KeyS?1:0),s=(this.keys.KeyD?1:0)-(this.keys.KeyA?1:0);if(!f&&!s)return;const len=Math.hypot(f,s);f/=len;s/=len;const speed=(this.keys.ShiftLeft||this.keys.ShiftRight)?4.7:3.25;const v=new THREE.Vector3(s,0,-f).applyAxisAngle(new THREE.Vector3(0,1,0),this.rig.rotation.y).multiplyScalar(speed*dt);const r=.28;
    const blocked=(x,z)=>x<-8.62||x>8.62||z<-8.58||z>11.65||this.colliders.some(c=>x+r>c.x1&&x-r<c.x2&&z+r>c.z1&&z-r<c.z2);
    const nx=this.rig.position.x+v.x,nz=this.rig.position.z+v.z;if(!blocked(nx,this.rig.position.z))this.rig.position.x=nx;if(!blocked(this.rig.position.x,nz))this.rig.position.z=nz;
    const targetY=(this.keys.ControlLeft||this.keys.KeyC)?1.18:1.66;this.rig.position.y=THREE.MathUtils.lerp(this.rig.position.y,targetY,dt*8);
  }
  updateHeld(){
    if(!this.held)return;const wp=this.camera.getWorldPosition(new THREE.Vector3()),q=this.camera.getWorldQuaternion(new THREE.Quaternion()),off=new THREE.Vector3(0,-.14,-this.heldDistance).applyQuaternion(q);this.held.position.copy(wp.add(off));this.held.quaternion.copy(q);this.held.rotateX(-.2);
  }
  updateWorld(dt){
    this.cars.forEach(c=>{c.position.x+=c.userData.dir*c.userData.speed*dt;if(c.position.x>48)c.position.x=-48;if(c.position.x<-48)c.position.x=48;});
    if(this.customerQueueTimer>0&&this.power){this.customerQueueTimer-=dt;if(this.customerQueueTimer<=0)this.spawnCustomer();}
    this.updateCustomer(dt);
    // Neon and outside lamp never hold perfectly still.
    if(this.power)this.powerLights.forEach(({light,base},i)=>light.intensity=base*(.96+Math.sin(this.elapsed*7.1+i*3)*.018));
  }
  animate(){
    requestAnimationFrame(()=>this.animate());const dt=Math.min(this.clock.getDelta(),.05);this.elapsed+=dt;
    if(this.started&&!this.paused){if(this.locked)this.movePlayer(dt);this.updateHeld();this.updateWorld(dt);this.updateRay();}
    this.renderer.render(this.scene,this.camera);
  }
}

function renderRecipeBook(which=activeRecipe){
  activeRecipe=which;const tabs=$('#recipe-tabs');if(!tabs)return;tabs.innerHTML='';Object.entries(RECIPES).forEach(([key,r])=>{const b=document.createElement('button');b.textContent=recipeName(key);b.className=key===which?'active':'';b.onclick=()=>renderRecipeBook(key);tabs.appendChild(b);});
  const r=RECIPES[which];$('#recipe-content').innerHTML=`<div class="recipe-illustration">${r.icon}</div><h3>${recipeName(which)}</h3><p class="recipe-desc">Night Window standard preparation.</p><ol class="recipe-steps">${r.steps.map(s=>`<li>${s}</li>`).join('')}</ol><p class="recipe-tip">${r.tip}</p>`;
}
function renderDelivery(){
  const list=$('#delivery-list');list.innerHTML='';Object.entries(DELIVERY).forEach(([key,d])=>{const b=document.createElement('div');b.className='delivery-item';b.innerHTML=`<b>${d.name}</b><span>${d.desc}</span>`;b.onclick=()=>game.requestDelivery(key);list.appendChild(b);});
}
function updateOrderTicket(){
  if(!game||!game.currentOrder)return;const r=RECIPES[game.currentOrder];$('#order-number').textContent=`#${616+game.day*10+game.completed}`;$('#order-name').textContent=recipeName(game.currentOrder);const used=[];$('#order-items').innerHTML=r.requirements.map(type=>{let idx=game.tray.findIndex((x,i)=>x===type&&!used.includes(i));if(idx>=0)used.push(idx);return `<li class="${idx>=0?'done':''}">${foodName(type)}</li>`;}).join('');
}
function updateObjective(){
  if(!game)return;let text;if(game.finale)text=t('killer');else if(!game.power&&game.powerEventDone)text=t('restore');else if(game.pendingDelivery)text=t('package');else if(game.completed>=5)text=t('sleep');else if(game.currentOrder)text=game.tray.length?t('serve'):t('prepare');else text=t('wait');$('#objective-text').textContent=text;
}

// Menu and overlay wiring
$$('.close-modal').forEach(b=>b.addEventListener('click',()=>{b.closest('.modal').classList.add('hidden');if(game?.started){if(game.paused)$('#pause-panel').classList.remove('hidden');else game.lock();}}));
$('#new-game').addEventListener('click',()=>showOnly('#intro'));
$('#enter-kiosk').addEventListener('click',()=>game.start(true));
$('#continue-game').addEventListener('click',()=>game.continue());
$('#open-settings').addEventListener('click',()=>showModal('#settings-panel'));
$('#open-credits').addEventListener('click',()=>showModal('#about-panel'));
$('#resume').addEventListener('click',()=>{game.paused=false;$('#pause-panel').classList.add('hidden');game.lock();});
$('#pause-settings').addEventListener('click',()=>{$('#pause-panel').classList.add('hidden');$('#settings-panel').classList.remove('hidden');});
$('#to-menu').addEventListener('click',()=>{if(game.held)game.drop();game.save();game.started=false;game.paused=false;$('#pause-panel').classList.add('hidden');$('#hud').classList.add('hidden');showOnly('#menu');});
$('#ending-menu').addEventListener('click',()=>{$('#ending').classList.add('hidden');showOnly('#menu');});
$('#fullscreen').addEventListener('click',()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen());

$('#language').addEventListener('change',e=>{lang=e.target.value;applyLanguage();saveSettings();});
$('#quality').addEventListener('change',e=>{SETTINGS.quality=e.target.value;game.applyQuality();saveSettings();});
$('#sensitivity').addEventListener('input',e=>{SETTINGS.sensitivity=+e.target.value;e.target.nextElementSibling.value=(+e.target.value).toFixed(1);saveSettings();});
$('#volume').addEventListener('input',e=>{SETTINGS.volume=+e.target.value;e.target.nextElementSibling.value=Math.round(+e.target.value*100)+'%';audio.set();saveSettings();});
$('#ambience-volume').addEventListener('input',e=>{SETTINGS.ambience=+e.target.value;e.target.nextElementSibling.value=Math.round(+e.target.value*100)+'%';audio.set();saveSettings();});
$('#subtitles-toggle').addEventListener('change',e=>{SETTINGS.subtitles=e.target.checked;saveSettings();});
$('#voices-toggle').addEventListener('change',e=>{SETTINGS.voices=e.target.checked;saveSettings();});
$('#shadows-toggle').addEventListener('change',e=>{SETTINGS.shadows=e.target.checked;game.renderer.shadowMap.enabled=SETTINGS.shadows;saveSettings();notify('Shadow setting applies fully after restart.');});

syncSettingsUI();applyLanguage();game=new KioskGame();
$('#continue-game').disabled=!localStorage.getItem('kiosk.save');
