// ==========================================
// STEAMDROP — CHALLENGES DATABASE
// Curated for rapid, immediate, and entertaining gameplay footage
// Strict YouTube Video Design Philosophy: 10s to ~10m objectives
// Zero Emojis Policy
// ==========================================

const CHALLENGES_DATABASE = [
  // --- COMBAT (30+ objectives) ---
  {
    id: "combat_defeat_enemy_1",
    text: "Defeat an enemy.",
    text_ar: "اهزم عدواً واحداً.",
    category: "combat",
    tags: ["combat", "immediate", "action"]
  },
  {
    id: "combat_defeat_enemies_2",
    text: "Defeat two enemies.",
    text_ar: "اهزم عدوين اثنين.",
    category: "combat",
    tags: ["combat", "immediate", "action"]
  },
  {
    id: "combat_defeat_enemies_3",
    text: "Defeat three enemies.",
    text_ar: "اهزم ثلاثة أعداء.",
    category: "combat",
    tags: ["combat", "action"]
  },
  {
    id: "combat_melee_kill",
    text: "Defeat an enemy using melee.",
    text_ar: "اهزم عدواً باستخدام سلاح اشتباك قريب (Melee).",
    category: "combat",
    tags: ["combat", "melee", "action"]
  },
  {
    id: "combat_ranged_kill",
    text: "Defeat an enemy using a ranged weapon.",
    text_ar: "اهزم عدواً باستخدام سلاح بعيد المدى.",
    category: "combat",
    tags: ["combat", "ranged", "action"]
  },
  {
    id: "combat_weakest_weapon",
    text: "Defeat an enemy using your weakest weapon.",
    text_ar: "اهزم عدواً بأضعف سلاح تمتلكه.",
    category: "combat",
    tags: ["combat", "challenge", "handicap"]
  },
  {
    id: "combat_unusual_weapon",
    text: "Defeat an enemy using an unusual weapon.",
    text_ar: "اهزم عدواً بسلاح غير معتاد أو غريب.",
    category: "combat",
    tags: ["combat", "unusual"]
  },
  {
    id: "combat_no_damage",
    text: "Defeat an enemy without taking damage.",
    text_ar: "اهزم عدواً بدون أن تتلقى أي ضرر.",
    category: "combat",
    tags: ["combat", "skill", "precision"]
  },
  {
    id: "combat_single_attack",
    text: "Defeat an enemy with a single attack.",
    text_ar: "اهزم عدواً بضربة واحدة فقط (One-shot).",
    category: "combat",
    tags: ["combat", "precision"]
  },
  {
    id: "combat_environment_kill",
    text: "Defeat an enemy using the environment.",
    text_ar: "اهزم عدواً باستخدام عناصر البيئة المحيطة.",
    category: "combat",
    tags: ["combat", "environment", "creative"]
  },
  {
    id: "combat_no_primary",
    text: "Deal damage without using your primary weapon.",
    text_ar: "ألحق ضرراً بعدو دون استخدام سلاحك الأساسي.",
    category: "combat",
    tags: ["combat", "handicap"]
  },
  {
    id: "combat_survive_encounter",
    text: "Survive one enemy encounter.",
    text_ar: "انجُ من مواجهة قتالية مع عدو.",
    category: "combat",
    tags: ["combat", "survival"]
  },
  {
    id: "combat_escape_encounter",
    text: "Escape an enemy encounter without dying.",
    text_ar: "اهرب من اشتباك قتالي وتراجع بسلام.",
    category: "combat",
    tags: ["combat", "survival", "escape"]
  },
  {
    id: "combat_fastest_kill",
    text: "Defeat an enemy as quickly as possible.",
    text_ar: "اهزم عدواً بأسرع وقت ممكن.",
    category: "combat",
    tags: ["combat", "speed"]
  },
  {
    id: "combat_new_weapon_attack",
    text: "Attack an enemy using a weapon you have not used before.",
    text_ar: "هاجم عدواً بسلاح لم تجربه من قبل.",
    category: "combat",
    tags: ["combat", "experimentation"]
  },
  {
    id: "combat_headshot",
    text: "Score a critical hit or headshot on an enemy.",
    text_ar: "سدد إصابة حرجة أو ضربة رأس (Headshot) لعدو.",
    category: "combat",
    tags: ["combat", "precision"]
  },
  {
    id: "combat_fist_kill",
    text: "Defeat an enemy with bare fists or unarmed attacks.",
    text_ar: "اهزم عدواً بقبضتيك مجردتين بدون سلاح.",
    category: "combat",
    tags: ["combat", "melee", "handicap"]
  },
  {
    id: "combat_explosive_kill",
    text: "Defeat an enemy using explosives or splash damage.",
    text_ar: "اهزم عدواً باستخدام متفجرات أو ضرر انفجاري.",
    category: "combat",
    tags: ["combat", "explosive"]
  },
  {
    id: "combat_backstab",
    text: "Attack an enemy from behind.",
    text_ar: "هاجم عدواً من الخلف.",
    category: "combat",
    tags: ["combat", "stealth"]
  },
  {
    id: "combat_aerial_attack",
    text: "Attack or defeat an enemy while airborne.",
    text_ar: "هاجم عدواً أو اهزمه أثناء وجودك في الهواء.",
    category: "combat",
    tags: ["combat", "movement"]
  },
  {
    id: "combat_parry_counter",
    text: "Perform a successful parry, block, or counterattack.",
    text_ar: "نفذ صد هجوم (Parry/Block) أو هجوماً مضاداً ناجحاً.",
    category: "combat",
    tags: ["combat", "defense", "skill"]
  },
  {
    id: "combat_throwable_kill",
    text: "Hit an enemy using a thrown object or grenade.",
    text_ar: "أصب عدواً باستخدام قنبلة أو غرض مقذوف.",
    category: "combat",
    tags: ["combat", "ranged"]
  },
  {
    id: "combat_stun_enemy",
    text: "Stun, freeze, or immobilize an enemy.",
    text_ar: "صعق عدواً، أو جمده، أو عطل حركته تماماً.",
    category: "combat",
    tags: ["combat", "status"]
  },
  {
    id: "combat_two_different_weapons",
    text: "Deal damage to one enemy using two different weapons.",
    text_ar: "ألحق ضرراً بنفس العدو باستخدام سلاحين مختلفين.",
    category: "combat",
    tags: ["combat", "combo"]
  },
  {
    id: "combat_finish_with_kick",
    text: "Attack an enemy with a kick or shove.",
    text_ar: "هاجم عدواً بركلة أو دفعة جسدية.",
    category: "combat",
    tags: ["combat", "melee"]
  },
  {
    id: "combat_trap_enemy",
    text: "Lure an enemy into a trap or hazard.",
    text_ar: "استدرج عدواً إلى فخ أو خطر بيئي.",
    category: "combat",
    tags: ["combat", "tactics"]
  },

  // --- MOVEMENT & TRAVERSAL (25+ objectives) ---
  {
    id: "movement_jump_obstacle",
    text: "Jump over an obstacle.",
    text_ar: "اقفز فوق حاجز أو عائق.",
    category: "movement",
    tags: ["movement", "immediate"]
  },
  {
    id: "movement_climb_something",
    text: "Climb something.",
    text_ar: "تسلق شيئاً في اللعبة (سلم، جدار، أو مرتفع).",
    category: "movement",
    tags: ["movement", "climbing"]
  },
  {
    id: "movement_reach_higher_platform",
    text: "Reach a higher platform.",
    text_ar: "اصعد إلى منصة أو سطح أعلى من موقعك الحالي.",
    category: "movement",
    tags: ["movement", "elevation"]
  },
  {
    id: "movement_cross_obstacle",
    text: "Cross an obstacle.",
    text_ar: "تجاوز عائقاً أو هاوية.",
    category: "movement",
    tags: ["movement", "traversal"]
  },
  {
    id: "movement_swim",
    text: "Swim in water.",
    text_ar: "اسبح في الماء.",
    category: "movement",
    tags: ["movement", "water"]
  },
  {
    id: "movement_dodge",
    text: "Perform a dodge, roll, or dash.",
    text_ar: "نفذ تفادياً، أو دحرجة، أو اندفاعاً سريعاً (Dash/Roll).",
    category: "movement",
    tags: ["movement", "agility"]
  },
  {
    id: "movement_ability",
    text: "Perform a movement ability.",
    text_ar: "استخدم مهارة حركة خاصة (قفزة مزدوجة، انزلاق، أو انتقال).",
    category: "movement",
    tags: ["movement", "ability"]
  },
  {
    id: "movement_sprint_continuous",
    text: "Travel a short distance without stopping.",
    text_ar: "تحرك أو اركض لمسافة قصيرة دون توقف.",
    category: "movement",
    tags: ["movement", "speed"]
  },
  {
    id: "movement_nearest_elevated",
    text: "Reach the nearest elevated position.",
    text_ar: "اصعد إلى أقرب مكان مرتفع من حولك.",
    category: "movement",
    tags: ["movement", "elevation"]
  },
  {
    id: "movement_trick",
    text: "Perform a movement trick or combo.",
    text_ar: "نفذ حركة مهارية بالحركة (قفز متتالي، تزلج، أو باركور).",
    category: "movement",
    tags: ["movement", "skill"]
  },
  {
    id: "movement_fall_survive",
    text: "Fall from a height and survive.",
    text_ar: "اسقط من مكان مرتفع وانجُ بحياتك.",
    category: "movement",
    tags: ["movement", "risk"]
  },
  {
    id: "movement_unconventional_route",
    text: "Cross an obstacle using an unconventional route.",
    text_ar: "اعبر مساراً باستخدام طريق بديل غير معتاد.",
    category: "movement",
    tags: ["movement", "creative"]
  },
  {
    id: "movement_crouch_walk",
    text: "Crouch walk under an obstacle.",
    text_ar: "امشِ في وضع القرفصاء (Crouch) تحت عائق.",
    category: "movement",
    tags: ["movement", "stealth"]
  },
  {
    id: "movement_slide",
    text: "Perform a slide across the floor.",
    text_ar: "تزحلق على الأرضية (Slide) أثناء الجري.",
    category: "movement",
    tags: ["movement", "agility"]
  },
  {
    id: "movement_reach_roof",
    text: "Get onto the roof of a building or structure.",
    text_ar: "اصعد إلى سطح مبنى أو هيكل مجاور.",
    category: "movement",
    tags: ["movement", "elevation"]
  },
  {
    id: "movement_rope_or_ladder",
    text: "Use a ladder, rope, or zipline.",
    text_ar: "استخدم سلماً، أو حبلاً، أو حبل انزلاق هوائي (Zipline).",
    category: "movement",
    tags: ["movement", "traversal"]
  },
  {
    id: "movement_dive_underwater",
    text: "Submerge completely underwater and surface safely.",
    text_ar: "اغطس بالكامل تحت سطح الماء ثم اخرج بسلام.",
    category: "movement",
    tags: ["movement", "water"]
  },
  {
    id: "movement_wall_jump",
    text: "Perform a wall jump or climb over a tall wall.",
    text_ar: "اقفز عن جدار أو تسلق جداراً عالياً.",
    category: "movement",
    tags: ["movement", "parkour"]
  },

  // --- COLLECTION & GATHERING (25+ objectives) ---
  {
    id: "collect_pickup_item",
    text: "Pick up an item.",
    text_ar: "التقط غرضاً واحداً من الأرض أو الحاويات.",
    category: "collection",
    tags: ["collection", "immediate"]
  },
  {
    id: "collect_three_items",
    text: "Collect three items.",
    text_ar: "اجمع ثلاثة أغراض.",
    category: "collection",
    tags: ["collection", "quantity"]
  },
  {
    id: "collect_three_different_items",
    text: "Collect three different items.",
    text_ar: "اجمع ثلاثة أغراض مختلفة ومميزة.",
    category: "collection",
    tags: ["collection", "variety"]
  },
  {
    id: "collect_resource",
    text: "Collect a resource.",
    text_ar: "اجمع مورداً واحداً (خشب، معدن، حجر، إلخ).",
    category: "collection",
    tags: ["collection", "gathering"]
  },
  {
    id: "collect_two_different_resources",
    text: "Collect two different resources.",
    text_ar: "اجمع نوعين مختلفين من الموارد.",
    category: "collection",
    tags: ["collection", "gathering"]
  },
  {
    id: "collect_first_useful_item",
    text: "Pick up the first useful item you see.",
    text_ar: "التقط أول غرض مفيد تقع عينك عليه.",
    category: "collection",
    tags: ["collection", "immediate"]
  },
  {
    id: "collect_find_and_collect",
    text: "Find and collect an item from a container or chest.",
    text_ar: "اعثر على غرض واجمعه من داخل صندوق أو حاوية.",
    category: "collection",
    tags: ["collection", "loot"]
  },
  {
    id: "collect_and_use_immediately",
    text: "Collect an item and immediately use it.",
    text_ar: "التقط غرضاً واستخدمه مباشرة في نفس اللحظة.",
    category: "collection",
    tags: ["collection", "action"]
  },
  {
    id: "collect_never_used_item",
    text: "Pick up an item you have never used before.",
    text_ar: "التقط غرضاً لم يسبق لك استخدامه من قبل.",
    category: "collection",
    tags: ["collection", "exploration"]
  },
  {
    id: "collect_gather_resource",
    text: "Gather a natural resource from the world.",
    text_ar: "اجمع مورداً طبيعياً من بيئة اللعبة.",
    category: "collection",
    tags: ["collection", "gathering"]
  },
  {
    id: "collect_gather_three_resources",
    text: "Gather three resources.",
    text_ar: "اجمع ثلاثة موارد من البيئة.",
    category: "collection",
    tags: ["collection", "gathering"]
  },
  {
    id: "collect_harvest_something",
    text: "Harvest something.",
    text_ar: "احصد نبتة، محصولاً، أو غرضاً نامياً.",
    category: "collection",
    tags: ["collection", "harvest"]
  },
  {
    id: "collect_mine_something",
    text: "Mine something.",
    text_ar: "قم بالتعدين واستخرج خامة صخرية أو معدنية.",
    category: "collection",
    tags: ["collection", "mining"]
  },
  {
    id: "collect_chop_down",
    text: "Chop something down.",
    text_ar: "اقطع شجرة أو كتلة خشبية.",
    category: "collection",
    tags: ["collection", "woodcutting"]
  },
  {
    id: "collect_dig_something",
    text: "Dig something up.",
    text_ar: "احفر التراب أو الأرض واستخرج شيئاً.",
    category: "collection",
    tags: ["collection", "digging"]
  },
  {
    id: "collect_ammo",
    text: "Find and collect ammunition or mana.",
    text_ar: "اعثر على ذخيرة أو طاقة واجمعها.",
    category: "collection",
    tags: ["collection", "supplies"]
  },
  {
    id: "collect_currency",
    text: "Pick up money, coins, or gold.",
    text_ar: "التقط عملة نقدية أو ذهباً أو نقوداً.",
    category: "collection",
    tags: ["collection", "money"]
  },
  {
    id: "collect_five_items",
    text: "Collect five items as fast as you can.",
    text_ar: "اجمع خمسة أغراض بأسرع ما يمكنك.",
    category: "collection",
    tags: ["collection", "speed"]
  },

  // --- FISHING & WATER (15+ objectives) ---
  {
    id: "fishing_catch_fish",
    text: "Catch a fish.",
    text_ar: "اصطد سمكة واحدة.",
    category: "fishing",
    tags: ["fishing", "immediate"]
  },
  {
    id: "fishing_catch_two_fish",
    text: "Catch two fish.",
    text_ar: "اصطد سمكتين اثنتين.",
    category: "fishing",
    tags: ["fishing", "quantity"]
  },
  {
    id: "fishing_catch_first_fish",
    text: "Catch the first fish you can find.",
    text_ar: "اصطد أول سمكة تعثر عليها.",
    category: "fishing",
    tags: ["fishing", "immediate"]
  },
  {
    id: "fishing_catch_and_cook",
    text: "Catch a fish and cook or consume it.",
    text_ar: "اصطد سمكة وقم بطهيها أو استهلاكها فوراً.",
    category: "fishing",
    tags: ["fishing", "crafting"]
  },
  {
    id: "fishing_catch_fastest",
    text: "Catch a fish as quickly as possible.",
    text_ar: "اصطد سمكة بأسرع وقت ممكن.",
    category: "fishing",
    tags: ["fishing", "speed"]
  },
  {
    id: "fishing_collect_from_water",
    text: "Collect something from water.",
    text_ar: "التقط غرضاً أو مورداً من داخل الماء.",
    category: "fishing",
    tags: ["fishing", "water"]
  },
  {
    id: "fishing_cast_line",
    text: "Cast a fishing rod line into water.",
    text_ar: "ارمِ خيط الصنارة داخل الماء.",
    category: "fishing",
    tags: ["fishing", "action"]
  },
  {
    id: "fishing_catch_unusual",
    text: "Catch something that is not a fish using a rod or net.",
    text_ar: "اصطد غرضاً غريباً أو خردة بواسطة الصنارة أو الشبكة.",
    category: "fishing",
    tags: ["fishing", "random"]
  },

  // --- INTERACTION & NPCS (25+ objectives) ---
  {
    id: "interact_talk_npc",
    text: "Talk to an NPC.",
    text_ar: "تحدث مع شخصية في اللعبة (NPC).",
    category: "interaction",
    tags: ["interaction", "npc", "immediate"]
  },
  {
    id: "interact_with_npc",
    text: "Interact with an NPC.",
    text_ar: "تفاعل مع أي شخصية في اللعبة.",
    category: "interaction",
    tags: ["interaction", "npc"]
  },
  {
    id: "interact_open_door",
    text: "Open a door.",
    text_ar: "افتح باباً.",
    category: "interaction",
    tags: ["interaction", "immediate"]
  },
  {
    id: "interact_open_locked_door",
    text: "Open a locked door or chest.",
    text_ar: "افتح باباً أو صندوقاً مغلقاً بقفل.",
    category: "interaction",
    tags: ["interaction", "puzzle"]
  },
  {
    id: "interact_activate_something",
    text: "Activate something in the world.",
    text_ar: "قم بتفعيل أي شيء في البيئة المحيطة.",
    category: "interaction",
    tags: ["interaction", "action"]
  },
  {
    id: "interact_press_button",
    text: "Press a button or switch.",
    text_ar: "اضغط على زر أو مفتاح تشغيل.",
    category: "interaction",
    tags: ["interaction", "action"]
  },
  {
    id: "interact_use_lever",
    text: "Use a lever.",
    text_ar: "اسحب مقبضاً أو رافعة (Lever).",
    category: "interaction",
    tags: ["interaction", "action"]
  },
  {
    id: "interact_use_elevator",
    text: "Use an elevator or lift.",
    text_ar: "اركب مصعداً أو منصة رفع.",
    category: "interaction",
    tags: ["interaction", "traversal"]
  },
  {
    id: "interact_use_shop",
    text: "Open and browse a shop or vendor menu.",
    text_ar: "افتح قائمة متجر أو تحدث مع بائع في اللعبة.",
    category: "interaction",
    tags: ["interaction", "economy"]
  },
  {
    id: "interact_buy_item",
    text: "Buy something from a vendor.",
    text_ar: "اشترِ غرضاً من متجر أو بائع.",
    category: "interaction",
    tags: ["interaction", "economy"]
  },
  {
    id: "interact_sell_item",
    text: "Sell an item to a vendor.",
    text_ar: "بِع غرضاً لمتجر أو بائع.",
    category: "interaction",
    tags: ["interaction", "economy"]
  },
  {
    id: "interact_trade_item",
    text: "Trade an item.",
    text_ar: "قم بمقايضة غرض أو إتمام تبادل تجاري.",
    category: "interaction",
    tags: ["interaction", "economy"]
  },
  {
    id: "interact_three_objects",
    text: "Interact with three different objects.",
    text_ar: "تفاعل مع ثلاثة أشياء أو أدوات مختلفة.",
    category: "interaction",
    tags: ["interaction", "variety"]
  },
  {
    id: "interact_nearest_usable",
    text: "Interact with the nearest usable object.",
    text_ar: "تفاعل مع أقرب غرض قابل للاستخدام في محيطك.",
    category: "interaction",
    tags: ["interaction", "immediate"]
  },
  {
    id: "interact_never_used_object",
    text: "Use an object you have never interacted with before.",
    text_ar: "استخدم غرضاً أو آلة لم يسبق لك التفاعل معها.",
    category: "interaction",
    tags: ["interaction", "exploration"]
  },
  {
    id: "interact_make_npc_react",
    text: "Make an NPC react to you.",
    text_ar: "اجعل شخصية غير لاعبة (NPC) تتفاعل أو تبدي ردة فعل تجاهك.",
    category: "interaction",
    tags: ["interaction", "npc"]
  },
  {
    id: "interact_sit_chair",
    text: "Sit on a chair, bench, or seat.",
    text_ar: "اجلس على كرسي، مقعد، أو أريكة في اللعبة.",
    category: "interaction",
    tags: ["interaction", "fun"]
  },
  {
    id: "interact_pet_animal",
    text: "Pet, feed, or interact with an animal.",
    text_ar: "ربّت على حيوان، أو أطعمه، أو تفاعل معه.",
    category: "interaction",
    tags: ["interaction", "creature"]
  },

  // --- VEHICLES & MOUNTS (20+ objectives) ---
  {
    id: "vehicle_enter",
    text: "Enter a vehicle or mount.",
    text_ar: "اصعد إلى مركبة أو اركب دابة.",
    category: "vehicles",
    tags: ["vehicles", "immediate"]
  },
  {
    id: "vehicle_drive",
    text: "Drive a vehicle.",
    text_ar: "قُد مركبة لمسافة قصيرة.",
    category: "vehicles",
    tags: ["vehicles", "driving"]
  },
  {
    id: "vehicle_ride",
    text: "Ride a vehicle or creature.",
    text_ar: "امتطِ مركبة أو كائناً حياً.",
    category: "vehicles",
    tags: ["vehicles", "riding"]
  },
  {
    id: "vehicle_change",
    text: "Change from one vehicle to another.",
    text_ar: "انتقل من مركبة إلى مركبة أخرى.",
    category: "vehicles",
    tags: ["vehicles", "variety"]
  },
  {
    id: "vehicle_drive_water",
    text: "Drive through water.",
    text_ar: "قُد مركبة عبر الماء أو استخدم قارباً.",
    category: "vehicles",
    tags: ["vehicles", "stunt"]
  },
  {
    id: "vehicle_jump",
    text: "Drive off a jump or ramp.",
    text_ar: "انطلق بمركبة واقفز بها من على منحدر.",
    category: "vehicles",
    tags: ["vehicles", "stunt"]
  },
  {
    id: "vehicle_drift",
    text: "Perform a drift.",
    text_ar: "نفذ تفحيطاً أو درفت (Drift) بمركبة.",
    category: "vehicles",
    tags: ["vehicles", "stunt"]
  },
  {
    id: "vehicle_unusual_maneuver",
    text: "Perform an unusual vehicle maneuver.",
    text_ar: "نفذ مناورة غير معتادة بالمركبة (دوران كامل، قفزة، إلخ).",
    category: "vehicles",
    tags: ["vehicles", "stunt"]
  },
  {
    id: "vehicle_crash",
    text: "Crash into something with a vehicle.",
    text_ar: "اصطدم بشيء بقوة باستخدام مركبة.",
    category: "vehicles",
    tags: ["vehicles", "chaos"]
  },
  {
    id: "vehicle_reach_destination",
    text: "Reach a nearby destination using a vehicle.",
    text_ar: "صل إلى وجهة قريبة باستخدام مركبة.",
    category: "vehicles",
    tags: ["vehicles", "travel"]
  },
  {
    id: "vehicle_speed_run",
    text: "Drive as fast as possible for a short distance.",
    text_ar: "قُد بأقصى سرعة ممكنة لمسافة قصيرة.",
    category: "vehicles",
    tags: ["vehicles", "speed"]
  },
  {
    id: "vehicle_exit_moving",
    text: "Exit a vehicle while it is still moving.",
    text_ar: "اقفز أو اخرج من مركبة أثناء حركتها.",
    category: "vehicles",
    tags: ["vehicles", "action"]
  },
  {
    id: "vehicle_new_vehicle",
    text: "Find and use a vehicle you have not used before.",
    text_ar: "اعثر على مركبة لم تجربها من قبل وقُدها.",
    category: "vehicles",
    tags: ["vehicles", "exploration"]
  },
  {
    id: "vehicle_honk_horn",
    text: "Honk the horn or siren of a vehicle.",
    text_ar: "اضغط بوق السيارة (Horn) أو أطلق صفارة الإنذار.",
    category: "vehicles",
    tags: ["vehicles", "fun"]
  },
  {
    id: "vehicle_destroy",
    text: "Destroy or wreck a vehicle.",
    text_ar: "دمر مركبة بالكامل أو عطلها تماماً.",
    category: "vehicles",
    tags: ["vehicles", "destruction"]
  },

  // --- STEALTH & EVASION (15+ objectives) ---
  {
    id: "stealth_hide_enemy",
    text: "Hide from an enemy.",
    text_ar: "اختبئ وتوارَ عن أنظار عدو.",
    category: "stealth",
    tags: ["stealth", "immediate"]
  },
  {
    id: "stealth_avoid_enemy",
    text: "Avoid an enemy encounter completely.",
    text_ar: "تفادَ مواجهة عدو وتجاوزه تماماً.",
    category: "stealth",
    tags: ["stealth", "evasion"]
  },
  {
    id: "stealth_takedown",
    text: "Perform a stealth takedown or sneak attack.",
    text_ar: "نفذ إسقاطاً تسللياً (Stealth Takedown) أو هجوماً صامتاً.",
    category: "stealth",
    tags: ["stealth", "combat"]
  },
  {
    id: "stealth_past_enemy",
    text: "Move past an enemy without being detected.",
    text_ar: "تسلل وعبر بجوار عدو دون أن يكتشفك.",
    category: "stealth",
    tags: ["stealth", "precision"]
  },
  {
    id: "stealth_break_sight",
    text: "Break line of sight after alerting an enemy.",
    text_ar: "اقطع خط الرؤية واهرب بعد كشفك من قِبل عدو.",
    category: "stealth",
    tags: ["stealth", "escape"]
  },
  {
    id: "stealth_hide_unusual",
    text: "Hide in an unusual location.",
    text_ar: "اختبئ في مكان غريب أو غير مألوف.",
    category: "stealth",
    tags: ["stealth", "creative"]
  },
  {
    id: "stealth_reach_undetected",
    text: "Reach a nearby location without being detected.",
    text_ar: "صل إلى وجهة قريبة دون أن يُلفت انتباه أي أحد.",
    category: "stealth",
    tags: ["stealth", "mission"]
  },
  {
    id: "stealth_escape_detection",
    text: "Escape detection and return to hidden status.",
    text_ar: "تخلص من حالة المطاردة وعد إلى وضع التخفي.",
    category: "stealth",
    tags: ["stealth", "escape"]
  },
  {
    id: "stealth_use_mechanic",
    text: "Use a stealth mechanic (crouch, bush, shadow, disguise).",
    text_ar: "استخدم ميزة تخفي (قرفصاء، شجيرة، ظلال، أو تنكر).",
    category: "stealth",
    tags: ["stealth", "mechanics"]
  },
  {
    id: "stealth_distract_enemy",
    text: "Distract an enemy by throwing an object or making noise.",
    text_ar: "شتت انتباه عدو برمي غرض أو إحداث صوت.",
    category: "stealth",
    tags: ["stealth", "tactics"]
  },

  // --- ENVIRONMENT & PHYSICS (20+ objectives) ---
  {
    id: "env_break_object",
    text: "Break an object.",
    text_ar: "حطم أو اكسر غرضاً في البيئة.",
    category: "physics",
    tags: ["physics", "destruction", "immediate"]
  },
  {
    id: "env_push_object",
    text: "Push an object.",
    text_ar: "ادفع غرضاً فيزيائياً.",
    category: "physics",
    tags: ["physics", "movement"]
  },
  {
    id: "env_pull_object",
    text: "Pull or drag an object.",
    text_ar: "اسحب غرضاً فيزيائياً.",
    category: "physics",
    tags: ["physics", "movement"]
  },
  {
    id: "env_move_object",
    text: "Move an object from one place to another.",
    text_ar: "انقل غرضاً فيزيائياً من مكان لآخر.",
    category: "physics",
    tags: ["physics", "manipulation"]
  },
  {
    id: "env_cause_collision",
    text: "Cause two objects to collide.",
    text_ar: "اجعل غرضين يصطدمان ببعضهما البعض.",
    category: "physics",
    tags: ["physics", "action"]
  },
  {
    id: "env_destroy_something",
    text: "Destroy a piece of terrain or structure.",
    text_ar: "دمّر جزءاً من تضاريس البيئة أو هيكلاً معمارياً.",
    category: "physics",
    tags: ["physics", "destruction"]
  },
  {
    id: "env_cause_explosion",
    text: "Cause an explosion.",
    text_ar: "أحدث انفجاراً (برميل متفجر، قنبلة، أو صاعقة).",
    category: "physics",
    tags: ["physics", "explosion"]
  },
  {
    id: "env_set_fire",
    text: "Set something on fire.",
    text_ar: "أشعل النار في غرض أو في البيئة.",
    category: "physics",
    tags: ["physics", "fire"]
  },
  {
    id: "env_trigger_trap",
    text: "Trigger a trap intentionally.",
    text_ar: "فعل فخاً أو شراكاً متعمداً وتجنب أذاه.",
    category: "physics",
    tags: ["physics", "hazard"]
  },
  {
    id: "env_activate_machinery",
    text: "Activate environmental machinery.",
    text_ar: "شغل آلة أو ميكانيكية بيئية (مروحة، طاحونة، ترس).",
    category: "physics",
    tags: ["physics", "machinery"]
  },
  {
    id: "env_use_against_enemy",
    text: "Use the environment to knock down or defeat an enemy.",
    text_ar: "استخدم عنصر بيئي لإسقاط أو إلحاق الضرر بعدو.",
    category: "physics",
    tags: ["physics", "combat"]
  },
  {
    id: "env_throw_physics_object",
    text: "Pick up and throw a physics object.",
    text_ar: "ارفع غرضاً فيزيائياً وارمه بقوة.",
    category: "physics",
    tags: ["physics", "throw"]
  },
  {
    id: "env_stack_objects",
    text: "Stack two or more objects on top of each other.",
    text_ar: "رتب غرضين أو أكثر فوق بعضهما البعض.",
    category: "physics",
    tags: ["physics", "balance"]
  },
  {
    id: "env_break_three_objects",
    text: "Break three breakable objects in rapid succession.",
    text_ar: "اكسر ثلاثة أشياء قابلة للكسر بتتابع سريع.",
    category: "physics",
    tags: ["physics", "destruction"]
  },

  // --- ITEMS & INVENTORY (20+ objectives) ---
  {
    id: "item_equip_new",
    text: "Equip a new item.",
    text_ar: "تجهز بغرض جديد من قائمة أدواتك.",
    category: "items",
    tags: ["items", "inventory", "immediate"]
  },
  {
    id: "item_change_equipped_weapon",
    text: "Change your equipped weapon.",
    text_ar: "بدل سلاحك المجهز حالياً بسلاح آخر.",
    category: "items",
    tags: ["items", "weapons"]
  },
  {
    id: "item_use_consumable",
    text: "Use a consumable (potion, food, bandage).",
    text_ar: "استخدم مادة استهلاكية (جرعة علاج، طعام، أو ضمادة).",
    category: "items",
    tags: ["items", "healing"]
  },
  {
    id: "item_use_never_used",
    text: "Use an item you have never used before.",
    text_ar: "استخدم غرضاً من مخزونك لم يسبق لك تجربته.",
    category: "items",
    tags: ["items", "exploration"]
  },
  {
    id: "item_use_after_getting",
    text: "Use an item immediately after obtaining it.",
    text_ar: "استخدم غرضاً فور الحصول عليه مباشرة.",
    category: "items",
    tags: ["items", "action"]
  },
  {
    id: "item_drop",
    text: "Drop an item from your inventory.",
    text_ar: "ارمِ أو تخلص من غرض من حقيبتك.",
    category: "items",
    tags: ["items", "inventory"]
  },
  {
    id: "item_upgrade",
    text: "Upgrade an item, weapon, or armor piece.",
    text_ar: "قم بترقية غرض، سلاح، أو درع.",
    category: "items",
    tags: ["items", "upgrade"]
  },
  {
    id: "item_repair",
    text: "Repair an item, tool, or vehicle.",
    text_ar: "أصلح غرضاً متضرراً، أداة، أو مركبة.",
    category: "items",
    tags: ["items", "crafting"]
  },
  {
    id: "item_craft",
    text: "Craft something.",
    text_ar: "اصنع غرضاً جديداً (Crafting).",
    category: "items",
    tags: ["items", "crafting"]
  },
  {
    id: "item_modify",
    text: "Modify an item or weapon attachment.",
    text_ar: "عدل سلاحاً أو ركب إضافة/ملحق عليه.",
    category: "items",
    tags: ["items", "customization"]
  },
  {
    id: "item_switch_mid_combat",
    text: "Switch weapons or equipment during active combat.",
    text_ar: "بدل سلاحك أو عتادك وسط اشتباك قتالي نشط.",
    category: "items",
    tags: ["items", "combat"]
  },
  {
    id: "item_reorganize_inventory",
    text: "Sort or reorganize your inventory.",
    text_ar: "رتب أو فرز حقيبة ومخزون أغراضك.",
    category: "items",
    tags: ["items", "organization"]
  },

  // --- GAME MECHANICS & MENUS (20+ objectives) ---
  {
    id: "mechanic_open_map",
    text: "Open the map and set a marker.",
    text_ar: "افتح الخريطة وحدد علامة (Waypoint).",
    category: "mechanics",
    tags: ["mechanics", "immediate"]
  },
  {
    id: "mechanic_open_inventory",
    text: "Open the inventory menu.",
    text_ar: "افتح قائمة الحقيبة أو المخزون.",
    category: "mechanics",
    tags: ["mechanics", "immediate"]
  },
  {
    id: "mechanic_open_upgrade_menu",
    text: "Open the skill or upgrade menu.",
    text_ar: "افتح قائمة المهارات أو الترقيات.",
    category: "mechanics",
    tags: ["mechanics", "menu"]
  },
  {
    id: "mechanic_unlock_ability",
    text: "Unlock an ability, perk, or talent.",
    text_ar: "افتح مهارة أو ميزة جديدة في شجرة المهارات.",
    category: "mechanics",
    tags: ["mechanics", "progression"]
  },
  {
    id: "mechanic_change_ability",
    text: "Change an equipped ability or spell.",
    text_ar: "غيّر مهارة أو تعويذة مجهزة في شريط المهارات.",
    category: "mechanics",
    tags: ["mechanics", "ability"]
  },
  {
    id: "mechanic_accept_quest",
    text: "Accept a quest or bounty.",
    text_ar: "اقبل مهمة جديدة أو مكافأة (Bounty).",
    category: "mechanics",
    tags: ["mechanics", "quest"]
  },
  {
    id: "mechanic_complete_objective",
    text: "Complete a small quest objective.",
    text_ar: "أنجز هدفاً صغيراً في مهمتك الحالية.",
    category: "mechanics",
    tags: ["mechanics", "quest"]
  },
  {
    id: "mechanic_trigger_event",
    text: "Trigger a dynamic game event or encounter.",
    text_ar: "فعل حدثاً ديناميكياً أو نشاطاً في العالم المفتوح.",
    category: "mechanics",
    tags: ["mechanics", "event"]
  },
  {
    id: "mechanic_activate_checkpoint",
    text: "Activate a checkpoint, bonfire, or fast travel point.",
    text_ar: "فعل نقطة حفظ، أو شعلة نار (Bonfire)، أو نقطة تنقل سريع.",
    category: "mechanics",
    tags: ["mechanics", "save"]
  },
  {
    id: "mechanic_save_game",
    text: "Save the game.",
    text_ar: "قم بحفظ اللعبة يدوياً.",
    category: "mechanics",
    tags: ["mechanics", "immediate"]
  },
  {
    id: "mechanic_change_setting",
    text: "Change a gameplay or audio setting.",
    text_ar: "غيّر إعداداً في اللعبة (صوت، تحكم، أو جرافيكس).",
    category: "mechanics",
    tags: ["mechanics", "options"]
  },
  {
    id: "mechanic_use_special_ability",
    text: "Use your character's ultimate or special ability.",
    text_ar: "استخدم القدرة الخارقة (Ultimate) أو الخاصة لشخصيتك.",
    category: "mechanics",
    tags: ["mechanics", "power"]
  },
  {
    id: "mechanic_use_photo_mode",
    text: "Enter photo mode and capture a clean shot.",
    text_ar: "افتح طور التصوير (Photo Mode) والتقط لقطة شاشة مميزة.",
    category: "mechanics",
    tags: ["mechanics", "creative"]
  },
  {
    id: "mechanic_emote",
    text: "Perform an emote, taunt, or gesture.",
    text_ar: "نفذ رقصة، حركة استعراضية، أو حركة تحية (Emote).",
    category: "mechanics",
    tags: ["mechanics", "fun"]
  },

  // --- MINIGAMES & PUZZLES (15+ objectives) ---
  {
    id: "minigame_play_round",
    text: "Play a minigame.",
    text_ar: "العب لعبة مصغرة (Minigame) داخل اللعبة.",
    category: "minigames",
    tags: ["minigames", "immediate"]
  },
  {
    id: "minigame_win_round",
    text: "Win a minigame.",
    text_ar: "فُز في جولة بلعبة مصغرة.",
    category: "minigames",
    tags: ["minigames", "win"]
  },
  {
    id: "minigame_complete_round",
    text: "Complete one round of a minigame.",
    text_ar: "أكمل جولة واحدة من لعبة مصغرة.",
    category: "minigames",
    tags: ["minigames", "progress"]
  },
  {
    id: "minigame_fast_win",
    text: "Beat a simple minigame as quickly as possible.",
    text_ar: "أنهِ لعبة مصغرة بأسرع وقت ممكن.",
    category: "minigames",
    tags: ["minigames", "speed"]
  },
  {
    id: "minigame_card_game",
    text: "Play a card game.",
    text_ar: "العب لعبة بطاقات (مثل غوينت أو بلاك جاك أو بوكر).",
    category: "minigames",
    tags: ["minigames", "cards"]
  },
  {
    id: "minigame_board_game",
    text: "Play a board or dice game.",
    text_ar: "العب لعبة طاولة أو نرد.",
    category: "minigames",
    tags: ["minigames", "dice"]
  },
  {
    id: "minigame_solve_puzzle",
    text: "Solve a simple puzzle or lockpick challenge.",
    text_ar: "حل لغزاً بسيطاً أو تجاوز لغز فتح الأقفال (Lockpick).",
    category: "minigames",
    tags: ["minigames", "puzzle"]
  },
  {
    id: "minigame_skill_check",
    text: "Complete a quick time event (QTE) or skill-based activity.",
    text_ar: "انجح في حدث استجابة سريعة (QTE) أو تحدي مهارة.",
    category: "minigames",
    tags: ["minigames", "skill"]
  },

  // --- SPEED & IMMEDIATE ACTIONS (25+ objectives) ---
  {
    id: "speed_reach_location",
    text: "Reach a nearby location as quickly as possible.",
    text_ar: "صل إلى معلم أو موقع قريب بأسرع وقت ممكن.",
    category: "speed",
    tags: ["speed", "movement"]
  },
  {
    id: "speed_find_item",
    text: "Find an item as quickly as possible.",
    text_ar: "اعثر على غرض في البيئة بأقصى سرعة.",
    category: "speed",
    tags: ["speed", "collection"]
  },
  {
    id: "speed_enter_vehicle",
    text: "Enter a vehicle as quickly as possible.",
    text_ar: "اركب أقرب مركبة بأسرع ما يمكنك.",
    category: "speed",
    tags: ["speed", "vehicles"]
  },
  {
    id: "speed_complete_interaction",
    text: "Complete an interaction as quickly as possible.",
    text_ar: "أكمل تفاعلاً بيئياً بأقصى سرعة.",
    category: "speed",
    tags: ["speed", "interaction"]
  },
  {
    id: "speed_defeat_enemy",
    text: "Defeat an enemy within 30 seconds of starting.",
    text_ar: "اهزم عدواً خلال 30 ثانية من بدء التحدي.",
    category: "speed",
    tags: ["speed", "combat"]
  },
  {
    id: "speed_escape_combat",
    text: "Escape combat as quickly as possible.",
    text_ar: "اهرب من القتال وتخلص من الخطر بأسرع ما يمكنك.",
    category: "speed",
    tags: ["speed", "survival"]
  },
  {
    id: "speed_reach_high_ground",
    text: "Reach high ground in under 45 seconds.",
    text_ar: "اصعد إلى مكان مرتفع في أقل من 45 ثانية.",
    category: "speed",
    tags: ["speed", "elevation"]
  },

  // --- RANDOM ACTIONS & CONTENT CREATOR PROMPTS (25+ objectives) ---
  {
    id: "random_pickup_first_item",
    text: "Pick up the first item you see.",
    text_ar: "التقط أول غرض تراه أمامك فوراً.",
    category: "random",
    tags: ["random", "immediate"]
  },
  {
    id: "random_interact_first_object",
    text: "Interact with the first usable object you see.",
    text_ar: "تفاعل مع أول شيء قابل للاستخدام تقع عينك عليه.",
    category: "random",
    tags: ["random", "immediate"]
  },
  {
    id: "random_talk_first_npc",
    text: "Talk to the first NPC you encounter.",
    text_ar: "تحدث مع أول شخصية تصادفها.",
    category: "random",
    tags: ["random", "npc"]
  },
  {
    id: "random_nearest_enemy_interact",
    text: "Find the nearest enemy and engage the situation.",
    text_ar: "توجه نحو أقرب عدو وتصرف مع الموقف.",
    category: "random",
    tags: ["random", "combat"]
  },
  {
    id: "random_find_nearest_vehicle",
    text: "Find the nearest vehicle and get in.",
    text_ar: "اعثر على أقرب مركبة واركبها فوراً.",
    category: "random",
    tags: ["random", "vehicles"]
  },
  {
    id: "random_follow_npc",
    text: "Follow the nearest NPC for a short distance.",
    text_ar: "امشِ خلف أقرب شخصية وتتبعها لمسافة قصيرة.",
    category: "random",
    tags: ["random", "stalking"]
  },
  {
    id: "random_follow_creature",
    text: "Follow an animal or creature.",
    text_ar: "تتبع حيواناً أو كائناً حياً.",
    category: "random",
    tags: ["random", "nature"]
  },
  {
    id: "random_interact_unusual",
    text: "Interact with something unusual.",
    text_ar: "تفاعل مع شيء غريب أو غير مألوف في المشهد.",
    category: "random",
    tags: ["random", "discovery"]
  },
  {
    id: "random_interact_ignored",
    text: "Interact with something you normally ignore.",
    text_ar: "تفاعل مع شيء عادةً ما تتجاهله أثناء لعبك.",
    category: "random",
    tags: ["random", "curiosity"]
  },
  {
    id: "random_use_first_item",
    text: "Use the first usable item in your inventory.",
    text_ar: "استخدم أول غرض صالح للاستهلاك في حقيبتك.",
    category: "random",
    tags: ["random", "inventory"]
  },
  {
    id: "random_find_moving_thing",
    text: "Find something that moves and interact with it.",
    text_ar: "اعثر على شيء متحرك في البيئة وتفاعل معه.",
    category: "random",
    tags: ["random", "dynamic"]
  },
  {
    id: "random_unexpected_reaction",
    text: "Cause an unexpected reaction in the game world.",
    text_ar: "تسبب برد فعل غير متوقع في عالم اللعبة.",
    category: "random",
    tags: ["random", "chaos"]
  },
  {
    id: "random_find_breakable",
    text: "Find something you can break and destroy it.",
    text_ar: "اعثر على شيء قابل للكسر ودمره بالكامل.",
    category: "random",
    tags: ["random", "destruction"]
  },
  {
    id: "random_find_movable",
    text: "Find something you can move and move it.",
    text_ar: "اعثر على شيء يمكن تحريكه وقم بإزاحته.",
    category: "random",
    tags: ["random", "physics"]
  },
  {
    id: "random_find_activatable",
    text: "Find something you can activate and turn it on.",
    text_ar: "اعثر على شيء يمكن تشغيله وقم بتفعيله.",
    category: "random",
    tags: ["random", "interaction"]
  },
  {
    id: "random_find_climbable",
    text: "Find something you can climb and reach the top.",
    text_ar: "اعثر على شيء يمكنك تسلقه واصعد لقمته.",
    category: "random",
    tags: ["random", "movement"]
  },
  {
    id: "random_find_rideable",
    text: "Find something you can ride.",
    text_ar: "اعثر على شيء أو كائن يمكنك ركوبه.",
    category: "random",
    tags: ["random", "vehicles"]
  },

  // --- SURVIVAL & RECOVERY (5 objectives) ---
  {
    id: "survival_start_campfire",
    text: "Start a campfire or light a torch.",
    text_ar: "أشعل نار تخييم أو شعلة نار (Campfire/Torch).",
    category: "survival",
    tags: ["survival", "crafting", "immediate"]
  },
  {
    id: "survival_consume_meal",
    text: "Eat a cooked meal or food item.",
    text_ar: "تناول وجبة مطبوخة أو طعاماً لاستعادة طاقتك.",
    category: "survival",
    tags: ["survival", "food"]
  },
  {
    id: "survival_drink_source",
    text: "Drink water from a natural source or canteen.",
    text_ar: "اشرب ماء من نبع طبيعي أو قارورة ماء.",
    category: "survival",
    tags: ["survival", "water"]
  },
  {
    id: "survival_rest_bed",
    text: "Sleep or rest in a bed, cot, or shelter.",
    text_ar: "نَم أو استرح في سرير أو مأوى.",
    category: "survival",
    tags: ["survival", "rest"]
  },
  {
    id: "survival_low_health_win",
    text: "Survive or win an encounter with low health.",
    text_ar: "انجُ أو فُز في قتال وأنت تمتلك صحة منخفضة.",
    category: "survival",
    tags: ["survival", "risk"]
  },

  // --- PRECISION & MARKSMAN (5 objectives) ---
  {
    id: "precision_long_range_hit",
    text: "Hit an enemy or target from long range.",
    text_ar: "أصب عدواً أو هدفاً من مسافة بعيدة.",
    category: "combat",
    tags: ["combat", "precision", "ranged"]
  },
  {
    id: "precision_shoot_while_moving",
    text: "Shoot or hit an enemy while sliding or jumping.",
    text_ar: "أصب عدواً أثناء الانزلاق أو القفز.",
    category: "combat",
    tags: ["combat", "movement", "skill"]
  },
  {
    id: "precision_three_consecutive_hits",
    text: "Land three consecutive attacks without missing.",
    text_ar: "سدد ثلاث ضربات متتالية ناجحة دون أن تخطئ.",
    category: "combat",
    tags: ["combat", "precision"]
  },
  {
    id: "precision_disarm_enemy",
    text: "Disarm or knock a weapon out of an enemy's hand.",
    text_ar: "نزع سلاح عدو أو أسقطه من يده.",
    category: "combat",
    tags: ["combat", "skill"]
  },
  {
    id: "precision_destroy_projectile",
    text: "Shoot, parry, or dodge an incoming enemy projectile.",
    text_ar: "أسقط أو صد أو تفادَ مقذوفاً أطلقه عليك عدو.",
    category: "combat",
    tags: ["combat", "defense"]
  },

  // --- STUNTS & RISK-TAKING (5 objectives) ---
  {
    id: "stunt_jump_moving_vehicle",
    text: "Jump off a moving vehicle without dying.",
    text_ar: "اقفز من مركبة متحركة وانجُ بحياتك.",
    category: "vehicles",
    tags: ["vehicles", "stunt", "risk"]
  },
  {
    id: "stunt_close_range_explosion",
    text: "Trigger an explosion at close range and survive.",
    text_ar: "فجر متفجرات عن قرب وانجُ من الضرر.",
    category: "physics",
    tags: ["physics", "risk"]
  },
  {
    id: "stunt_glide_or_parachute",
    text: "Glide, parachute, or wingsuit to a safe landing.",
    text_ar: "حلق بمظلة، أو طائرة شراعية، أو بدلة طيران واهبط بسلام.",
    category: "movement",
    tags: ["movement", "traversal"]
  },
  {
    id: "stunt_cross_narrow_beam",
    text: "Walk across a narrow beam, pipe, or tightrope without falling.",
    text_ar: "اعبر عارضة ضيقة أو أنبوباً أو حبلاً دون أن تسقط.",
    category: "movement",
    tags: ["movement", "balance"]
  },
  {
    id: "stunt_escape_alarm",
    text: "Trigger an alarm or police alert and completely escape it.",
    text_ar: "أطلق جرس إنذار أو تنبيه للشرطة واهرب تماماً من الملاحقة.",
    category: "stealth",
    tags: ["stealth", "escape"]
  },

  // --- TRAVERSAL & WORLD ACTIONS (5 objectives) ---
  {
    id: "world_highest_peak",
    text: "Reach the highest peak visible in your immediate area.",
    text_ar: "اصعد إلى أعلى قمة ظاهرة في منطقتك الحالية.",
    category: "movement",
    tags: ["movement", "elevation"]
  },
  {
    id: "world_discover_location",
    text: "Discover a new landmark or named location.",
    text_ar: "اكتشف معلماً جديداً أو موقعاً مسجلاً في الخريطة.",
    category: "mechanics",
    tags: ["mechanics", "exploration"]
  },
  {
    id: "world_throw_off_cliff",
    text: "Throw an item or object off a cliff or high ledge.",
    text_ar: "ارمِ غرضاً أو صخرة من حافة جرف شاهق.",
    category: "physics",
    tags: ["physics", "fun"]
  },
  {
    id: "world_ring_bell",
    text: "Ring a bell, sound a gong, or honk an environmental horn.",
    text_ar: "دق جرساً، أو اضرب غونغ، أو أطلق بوقاً في البيئة.",
    category: "interaction",
    tags: ["interaction", "fun"]
  },
  {
    id: "world_extinguish_fire",
    text: "Extinguish a fire or flame source.",
    text_ar: "أخمد ناراً أو شعلة باستخدام ماء أو رذاذ أو تفاعل.",
    category: "physics",
    tags: ["physics", "water"]
  },

  // --- CHAOS & NPC INTERACTION (5 objectives) ---
  {
    id: "chaos_friendly_fire",
    text: "Cause two enemy factions or creatures to fight each other.",
    text_ar: "تسبب باشتباك بين فصيلين معادين أو كائنين مفترسين ضد بعضهما.",
    category: "combat",
    tags: ["combat", "chaos"]
  },
  {
    id: "chaos_pickpocket_npc",
    text: "Pickpocket, steal, or loot an item from an unaware NPC.",
    text_ar: "اسرق أو انشل غرضاً من شخصية دون أن تلاحظك.",
    category: "stealth",
    tags: ["stealth", "crime"]
  },
  {
    id: "chaos_honk_at_npc",
    text: "Drive a vehicle up to an NPC and honk your horn at them.",
    text_ar: "قُد مركبة باتجاه شخصية واضغط البوق لتفزيعها.",
    category: "vehicles",
    tags: ["vehicles", "npc", "fun"]
  },
  {
    id: "chaos_drop_valuable",
    text: "Drop a valuable item on the ground and retrieve it.",
    text_ar: "ألقِ غرضاً ثميناً على الأرض ثم استعِده فوراً.",
    category: "items",
    tags: ["items", "inventory"]
  },
  {
    id: "chaos_break_two_doors",
    text: "Break or kick down two doors or gates.",
    text_ar: "حطم أو اركل بابين أو بوابتين واقتحمهما.",
    category: "physics",
    tags: ["physics", "action"]
  }
];

// Database Utilities
function getRandomChallenge(excludeIds = []) {
  const excludeSet = new Set(excludeIds || []);
  let pool = CHALLENGES_DATABASE.filter(c => !excludeSet.has(c.id));
  
  // If all challenges in pool were excluded, fall back to whole database
  if (pool.length === 0) {
    pool = CHALLENGES_DATABASE;
  }
  
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

function getChallengesByCategory(category) {
  if (!category || category === 'all') return CHALLENGES_DATABASE;
  return CHALLENGES_DATABASE.filter(c => c.category === category);
}

// Make accessible to window
if (typeof window !== 'undefined') {
  window.CHALLENGES_DATABASE = CHALLENGES_DATABASE;
  window.getRandomChallenge = getRandomChallenge;
  window.getChallengesByCategory = getChallengesByCategory;
}
