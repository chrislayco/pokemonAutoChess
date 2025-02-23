import { Item } from '../enum/Item'

  export const ItemName: {[key in Item]: string} = {
    [Item.FOSSIL_STONE]: 'Fossil Stone',
    [Item.TWISTED_SPOON]: 'Twisted Spoon',
    [Item.MYSTIC_WATER]: 'Mystic Water',
    [Item.MAGNET]: 'Magnet',
    [Item.BLACK_GLASSES]: 'Black Glasses',
    [Item.MIRACLE_SEED]: 'Miracle Seed',
    [Item.NEVER_MELT_ICE]: 'Never Melt Ice',
    [Item.CHARCOAL]: 'Charcoal',
    [Item.HEART_SCALE]: 'Heart Scale',
    [Item.OLD_AMBER]: 'Old Amber',
    [Item.DAWN_STONE]: 'Dawn Stone',
    [Item.WATER_STONE]: 'Water Stone',
    [Item.THUNDER_STONE]: 'Thunder Stone',
    [Item.FIRE_STONE]: 'Fire Stone',
    [Item.MOON_STONE]: 'Moon Stone',
    [Item.DUSK_STONE]: 'Dusk Stone',
    [Item.LEAF_STONE]: 'Leaf Stone',
    [Item.ICY_ROCK]: 'Icy Rock',
    [Item.CHOICE_SPECS]: 'Choice Specs',
    [Item.SOUL_DEW]: 'Soul Dew',
    [Item.UPGRADE]: 'Upgrade',
    [Item.REAPER_CLOTH]: 'Reaper Cloth',
    [Item.POKEMONOMICON]: 'Pokemonomicon',
    [Item.WATER_INCENSE]: 'Water Incense',
    [Item.SHELL_BELL]: 'Shell Bell',
    [Item.LUCKY_EGG]: 'Lucky Egg',
    [Item.AQUA_EGG]: 'Aqua Egg',
    [Item.BLUE_ORB]: 'Blue Orb',
    [Item.ZOOM_LENS]: 'Zoom Lens',
    [Item.BRIGHT_POWDER]: 'Bright Powder',
    [Item.DELTA_ORB]: 'Delta Orb',
    [Item.MANA_SCARF]: 'Mana Scarf',
    [Item.SMOKE_BALL]: 'Smoke Ball',
    [Item.XRAY_VISION]: 'XRay Vision',
    [Item.RAZOR_FANG]: 'Razor Fang',
    [Item.LEFTOVERS]: 'Leftovers',
    [Item.CHOICE_SCARF]: 'Choice Scarf',
    [Item.FIRE_GEM]: 'Fire Gem',
    [Item.DEFENSIVE_RIBBON]: 'Defensive Ribbon',
    [Item.WONDER_BOX]: 'Wonder Box',
    [Item.RUNE_PROTECT]: 'Rune Protect',
    [Item.WIDE_LENS]: 'Wide Lens',
    [Item.RAZOR_CLAW]: 'Razor Claw',
    [Item.FLUFFY_TAIL]: 'Fluffy Tail',
    [Item.ORAN_BERRY]: 'Oran Berry',
    [Item.SHINY_CHARM]: 'Shiny Charm',
    [Item.FOCUS_BAND]: 'Focus Band',
    [Item.FLAME_ORB]: 'Flame Orb',
    [Item.ASSAULT_VEST]: 'Assault Vest',
    [Item.KINGS_ROCK]: 'Kings Rock',
    [Item.POKE_DOLL]: 'Poke Doll',
    [Item.RED_ORB]: 'Red Orb',
    [Item.MAX_REVIVE]: 'Max Revive',
    [Item.ROCKY_HELMET]: 'Rocky Helmet'
  }

  export const ItemDescription: {[key in Item]: string} = Object.freeze({
    [Item.FOSSIL_STONE]: 'Give it to a Ditto to obtain a random fossil',
    [Item.TWISTED_SPOON]: '+10% spell damage',
    [Item.MYSTIC_WATER]: '+15 mana',
    [Item.MAGNET]: '+10% attack speed',
    [Item.BLACK_GLASSES]: '+5% critical hit',
    [Item.MIRACLE_SEED]: '+15 health',
    [Item.NEVER_MELT_ICE]: '+2 special defense',
    [Item.CHARCOAL]: '+1 attack',
    [Item.HEART_SCALE]: '+1 defense',
    [Item.OLD_AMBER]: 'The holder gains the fossil type',
    [Item.DAWN_STONE]: 'The holder gains the psychic type',
    [Item.WATER_STONE]: 'The holder gains the water type',
    [Item.THUNDER_STONE]: 'The holder gains the electric type',
    [Item.FIRE_STONE]: 'The holder gains the fire type',
    [Item.MOON_STONE]: 'The holder gains the fairy type',
    [Item.DUSK_STONE]: 'The holder gains the dark type',
    [Item.LEAF_STONE]: 'The holder gains the grass type',
    [Item.ICY_ROCK]: 'The holder gains the ice type',
    [Item.CHOICE_SPECS]: 'The holder gains 75% spell damage',
    [Item.SOUL_DEW]: 'During combat, the holder gains 30% spell damage every 5 seconds',
    [Item.UPGRADE]: 'Attacks grant +6% bonus Attack Speed for the rest of combat',
    [Item.REAPER_CLOTH]: 'The holder spells can critically strike (20% chance, 2x damage)',
    [Item.POKEMONOMICON]: 'When the holder deals damage with their Ability, they burn and wound the target for 2 seconds',
    [Item.WATER_INCENSE]: 'When an ennemy cast an ability, they take incense damage equal to 20% of their max mana',
    [Item.SHELL_BELL]: 'The holder spells heal for 40% of the damage dealt',
    [Item.LUCKY_EGG]: 'When combat begins, the holder and all allies within 2 hexes in the same row gain 20 shield points',
    [Item.AQUA_EGG]: 'The holder gains 50 mana. After casting their ability the holder gains 20 mana',
    [Item.BLUE_ORB]: 'The holder gains 10% bonus Attack Speed. Every third attack from the holder unleashes a chain lightning that bounces to 4 enemies, dealing 8 magic damage',
    [Item.ZOOM_LENS]: 'The holder gains 4 attack damage and 40% spell damage',
    [Item.BRIGHT_POWDER]: 'Every 5 seconds, the holder throws a bright powder within 1 hex, healing them for 18% of their missing health',
    [Item.DELTA_ORB]: 'When combat begins, the holder and all allies within 1 hex in the same row gain 30% Spell damage for the rest of combat',
    [Item.MANA_SCARF]: 'The holder attacks restore 8 additional mana',
    [Item.SMOKE_BALL]: 'Reduce the attack speed of ennemy attackers by 50% for 5 seconds',
    [Item.XRAY_VISION]: 'Increase the holders attack range by 1 hex and grants 55% bonus attack speed. The holder attacks can no longer miss.',
    [Item.RAZOR_FANG]: 'When the holder inflicts a critical hit, the targets Armor is reduced by 70% for 5 seconds. This effect does not stack.',
    [Item.LEFTOVERS]: 'During  the combat, the holder attack heals adjacent allies for 3 health point',
    [Item.CHOICE_SCARF]: 'The holder basic attack hit a second adjacent ennemy for 75% of holder damage',
    [Item.FIRE_GEM]: 'The holders Abilities and attacks do 20% bonus damage. If the target has more than 200 maximum Health, the bonus increases to 60%.',
    [Item.DEFENSIVE_RIBBON]: 'When the holder takes damage, they gain attack damage, 1 defense and 1 special defense. Stacks up to 5 times',
    [Item.WONDER_BOX]: 'At the beginning of each battle phase, the holder equips 2 temporary items',
    [Item.RUNE_PROTECT]: 'When combat begins, the holder and all allies whithin 1 hex in the same row gain a shield that block the damage and effects of the first ennemy ability',
    [Item.WIDE_LENS]: 'The holder gains 20% bonus attack speed. The holder is immune to poison/fire',
    [Item.RAZOR_CLAW]: 'The holder gains 75% Critical Strike Chance and 10% Critical Strike Damage',
    [Item.FLUFFY_TAIL]: 'When combat begins, every ennemy in the same column have their max mana increased by 30%',
    [Item.ORAN_BERRY]: 'Grants 100 bonus hp',
    [Item.SHINY_CHARM]: 'When combat begins, every ennemy in the same column falls asleep for 3 seconds',
    [Item.FOCUS_BAND]: 'When combat begins, the holder and all allies within 1 hexes in the same row gain +30% Attack Speed for the rest of combat',
    [Item.FLAME_ORB]: 'Every 2 seconds, a random ennemy is burned for 8 seconds',
    [Item.ASSAULT_VEST]: 'Grants 30 bonus special defense',
    [Item.KINGS_ROCK]: 'Physical damage heals the holder for 50% of the damage dealt',
    [Item.POKE_DOLL]: 'The holder gains 5 Armor and 5 Magic Resist',
    [Item.RED_ORB]: 'The holder gains 8 bonus Attack Damage',
    [Item.MAX_REVIVE]: 'Prevents the holder first death',
    [Item.ROCKY_HELMET]: 'Grants 10 bonus armor. Negates bonus damage from incoming critical hits.'
  })