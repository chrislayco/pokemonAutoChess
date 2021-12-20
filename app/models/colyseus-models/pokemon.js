/* eslint-disable max-len */

const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const uniqid = require('uniqid');
const ArraySchema = schema.ArraySchema;
const {SPECIAL_SKILL, TYPE, RARITY, COST, ATTACK_TYPE, PKM} = require('../enum');
const Items = require('./items');

class Pokemon extends Schema {
  constructor(name, frenchName, types, rarity, sheet, index, evolution, hp, atk, def, speDef, range, attackSprite, attackType, stars, maxMana, skill) {
    super();
    this.assign({
      id: uniqid(),
      name: name,
      types: new ArraySchema(),
      items: new Items(),
      sheet: sheet,
      rarity: rarity,
      index: index,
      evolution: evolution,
      positionX: -1,
      positionY: -1,
      cost: COST[rarity],
      hp: hp,
      atk: atk,
      def: def,
      speDef: speDef,
      range: range,
      attackSprite: attackSprite,
      atkSpeed: 1500,
      attackType: attackType,
      stars: stars,
      maxMana: maxMana,
      skill: skill,
      frenchName : frenchName
    });
    // this.items.add(ItemFactory.createRandomStone());
    if (types) {
      types.forEach((type) => {
        this.types.push(type);
      });
    }
  }

  toString() {
    return `Pokemon (Name: ${this.name}, (x: ${this.positionX}, y: ${this.positionY}))`;
  }
}

class Ditto extends Pokemon {
  constructor() {
    super(PKM.DITTO, 'métamoprh', [TYPE.NORMAL], RARITY.LEGENDARY, 'LEGENDARY', 132, '', 30, 1, 1, 1, 1, 'NORMAL/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.DEFAULT);
  }
}

class Riolu extends Pokemon {
  constructor() {
    super(PKM.RIOLU, 'riolu', [TYPE.FIGHTING, TYPE.HUMAN], RARITY.LEGENDARY, 'LEGENDARY', 447, PKM.LUCARIO, 90, 5, 3, 3, 2, 'FIGHTING/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.SILENCE);
  }
}

class Lucario extends Pokemon {
  constructor() {
    super(PKM.LUCARIO, 'lucario', [TYPE.FIGHTING, TYPE.HUMAN, TYPE.METAL], RARITY.LEGENDARY, 'LEGENDARY', 448, PKM.MEGALUCARIO, 130, 9, 3, 3, 2, 'FIGHTING/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.SILENCE);
  }
}

class MegaLucario extends Pokemon {
  constructor() {
    super(PKM.MEGALUCARIO, 'méga-lucario', [TYPE.FIGHTING, TYPE.HUMAN, TYPE.METAL], RARITY.LEGENDARY, 'LEGENDARY', 4480, '', 230, 18, 3, 3, 2, 'FIGHTING/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.SILENCE);
  }
}

class Scyther extends Pokemon {
  constructor() {
    super(PKM.SCYTHER, 'insécatueur', [TYPE.BUG, TYPE.NORMAL], RARITY.LEGENDARY, 'LEGENDARY', 123, PKM.SCIZOR, 90, 5, 5, 5, 1, 'NORMAL/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.PROTECT);
  }
}

class Scizor extends Pokemon {
  constructor() {
    super(PKM.SCIZOR, 'cizayox', [TYPE.BUG, TYPE.METAL], RARITY.LEGENDARY, 'LEGENDARY', 212, PKM.MEGASCIZOR, 130, 9, 6, 6, 1, 'NORMAL/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.PROTECT);
  }
}

class MegaScizor extends Pokemon {
  constructor() {
    super(PKM.MEGASCIZOR, 'méga-cizayox', [TYPE.BUG, TYPE.METAL], RARITY.LEGENDARY, 'LEGENDARY', 2120, '', 230, 20, 7, 7, 1, 'NORMAL/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.PROTECT);
  }
}

class Onix extends Pokemon {
  constructor() {
    super(PKM.ONIX, 'onix',[TYPE.MINERAL, TYPE.GROUND], RARITY.LEGENDARY, 'LEGENDARY', 95, PKM.STEELIX, 150, 5, 7, 7, 1, 'ROCK/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.IRON_DEFENSE);
  }
}

class Steelix extends Pokemon {
  constructor() {
    super(PKM.STEELIX, 'steelix',[TYPE.MINERAL, TYPE.GROUND, TYPE.METAL], RARITY.LEGENDARY, 'LEGENDARY', 208, PKM.MEGASTEELIX, 300, 9, 10, 10, 1, 'ROCK/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.IRON_DEFENSE);
  }
}

class MegaSteelix extends Pokemon {
  constructor() {
    super(PKM.MEGASTEELIX, 'méga-steelix',[TYPE.MINERAL, TYPE.GROUND, TYPE.METAL], RARITY.LEGENDARY, 'LEGENDARY', 2080, '', 400, 20, 20, 20, 1, 'ROCK/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.IRON_DEFENSE);
  }
}

class Growlithe extends Pokemon {
  constructor() {
    super(PKM.GROWLITHE, 'caninos',[], RARITY.LEGENDARY, 'LEGENDARY', 58, PKM.ARCANINE, 90, 9, 5, 5, 1, 'FIRE/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.DEFAULT);
  }
}

class Arcanine extends Pokemon {
  constructor() {
    super(PKM.ARCANINE, 'arcanin',[], RARITY.LEGENDARY, 'LEGENDARY', 59, '', 130, 20, 5, 5, 1, 'FIRE/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.DEFAULT);
  }
}

class Numel extends Pokemon {
  constructor() {
    super(PKM.NUMEL, 'chamallot',[TYPE.FIRE, TYPE.FIELD, TYPE.GROUND], RARITY.LEGENDARY, 'LEGENDARY', 322, PKM.CAMERUPT, 90, 5, 5, 5, 1, 'FIRE/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.BURN);
  }
}

class Camerupt extends Pokemon {
  constructor() {
    super(PKM.CAMERUPT, 'camerupt',[TYPE.FIRE, TYPE.FIELD, TYPE.GROUND], RARITY.LEGENDARY, 'LEGENDARY', 323, PKM.MEGACAMERUPT, 150, 9, 10, 10, 1, 'FIRE/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.BURN);
  }
}

class MegaCamerupt extends Pokemon {
  constructor() {
    super(PKM.MEGACAMERUPT, 'méga-camerupt',[TYPE.FIRE, TYPE.FIELD, TYPE.GROUND], RARITY.LEGENDARY, 'LEGENDARY', 3230, '', 230, 20, 15, 15, 1, 'FIRE/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.BURN);
  }
}

class Munchlax extends Pokemon {
  constructor() {
    super(PKM.MUNCHLAX, 'goinfrex',[], RARITY.LEGENDARY, 'LEGENDARY', 446, PKM.SNORLAX, 90, 9, 5, 5, 1, 'NORMAL/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.DEFAULT);
  }
}

class Snorlax extends Pokemon {
  constructor() {
    super(PKM.SNORLAX, 'ronflex',[], RARITY.LEGENDARY, 'LEGENDARY', 143, '', 130, 20, 5, 5, 1, 'NORMAL/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.DEFAULT);
  }
}

class Meditite extends Pokemon {
  constructor() {
    super(PKM.MEDITITE, 'méditika',[TYPE.NORMAL, TYPE.HUMAN, TYPE.FIGHTING], RARITY.LEGENDARY, 'LEGENDARY', 307, PKM.MEDICHAM, 90, 5, 5, 5, 2, 'PSYCHIC/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.CONFUSION);
  }
}

class Medicham extends Pokemon {
  constructor() {
    super(PKM.MEDICHAM, 'charmina',[TYPE.NORMAL, TYPE.HUMAN, TYPE.FIGHTING], RARITY.LEGENDARY, 'LEGENDARY', 308, PKM.MEGAMEDICHAM, 130, 9, 6, 6, 1, 'NORMAL/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.CONFUSION);
  }
}

class MegaMedicham extends Pokemon {
  constructor() {
    super(PKM.MEGAMEDICHAM, 'méga-charmina',[TYPE.NORMAL, TYPE.HUMAN, TYPE.FIGHTING], RARITY.LEGENDARY, 'LEGENDARY', 3080, '', 230, 20, 7, 7, 1, 'NORMAL/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.CONFUSION);
  }
}

class Magby extends Pokemon {
  constructor() {
    super(PKM.MAGBY, 'magby',[TYPE.FIRE, TYPE.HUMAN], RARITY.EPIC, 'EPIC', 240, PKM.MAGMAR, 90, 5, 1, 1, 2, 'FIRE/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.HEAT_WAVE);
  }
}

class Magmar extends Pokemon {
  constructor() {
    super(PKM.MAGMAR, 'magmar',[TYPE.FIRE, TYPE.HUMAN], RARITY.EPIC, 'EPIC', 126, PKM.MAGMORTAR, 130, 9, 1, 1, 2, 'FIRE/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.HEAT_WAVE);
  }
}

class Magmortar extends Pokemon {
  constructor() {
    super(PKM.MAGMORTAR, 'maganon',[TYPE.FIRE, TYPE.HUMAN], RARITY.EPIC, 'EPIC', 467, '', 230, 18, 1, 1, 2, 'FIRE/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.HEAT_WAVE);
  }
}

class Elekid extends Pokemon {
  constructor() {
    super(PKM.ELEKID, 'elekid',[TYPE.ELECTRIC, TYPE.HUMAN], RARITY.EPIC, 'EPIC', 239, PKM.ELECTABUZZ, 90, 5, 4, 4, 1, 'ELECTRIC/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.DISCHARGE);
  }
}

class Electabuzz extends Pokemon {
  constructor() {
    super(PKM.ELECTABUZZ, 'élektek',[TYPE.ELECTRIC, TYPE.HUMAN], RARITY.EPIC, 'EPIC', 125, PKM.ELECTIVIRE, 130, 9, 5, 5, 1, 'ELECTRIC/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.DISCHARGE);
  }
}

class Electivire extends Pokemon {
  constructor() {
    super(PKM.ELECTIVIRE, 'élekable',[TYPE.ELECTRIC, TYPE.HUMAN], RARITY.EPIC, 'EPIC', 466, '', 230, 20, 6, 6, 1, 'ELECTRIC/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.DISCHARGE);
  }
}

class Gible extends Pokemon {
  constructor() {
    super(PKM.GIBLE, 'griknot',[TYPE.DRAGON, TYPE.GROUND, TYPE.MONSTER], RARITY.EPIC, 'EPIC', 443, PKM.GABITE, 90, 5, 4, 4, 1, 'DRAGON/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.DRAGON_TAIL);
  }
}

class Gabite extends Pokemon {
  constructor() {
    super(PKM.GABITE, 'carmache',[TYPE.DRAGON, TYPE.GROUND, TYPE.MONSTER], RARITY.EPIC, 'EPIC', 444, PKM.GARCHOMP, 130, 9, 4, 4, 1, 'DRAGON/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.DRAGON_TAIL);
  }
}

class Garchomp extends Pokemon {
  constructor() {
    super(PKM.GARCHOMP, 'carchakrok',[TYPE.DRAGON, TYPE.GROUND, TYPE.MONSTER], RARITY.EPIC, 'EPIC', 445, '', 230, 20, 4, 4, 1, 'DRAGON/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.DRAGON_TAIL);
  }
}

class Beldum extends Pokemon {
  constructor() {
    super(PKM.BELDUM, 'tehral',[TYPE.PSYCHIC, TYPE.METAL, TYPE.MINERAL], RARITY.EPIC, 'EPIC', 374, PKM.METANG, 90, 5, 4, 4, 1, 'DRAGON/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.METEOR_MASH);
  }
}

class Metang extends Pokemon {
  constructor() {
    super(PKM.METANG, 'métang',[TYPE.PSYCHIC, TYPE.METAL, TYPE.MINERAL], RARITY.EPIC, 'EPIC', 375, PKM.METAGROSS, 130, 9, 4, 4, 1, 'DRAGON/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.METEOR_MASH);
  }
}

class Metagross extends Pokemon {
  constructor() {
    super(PKM.METAGROSS, 'métalosse',[TYPE.PSYCHIC, TYPE.METAL, TYPE.MINERAL], RARITY.EPIC, 'EPIC', 376, '', 230, 20, 4, 4, 1, 'DRAGON/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.METEOR_MASH);
  }
}

class Bagon extends Pokemon {
  constructor() {
    super(PKM.BAGON, 'draby',[TYPE.DRAGON, TYPE.MONSTER], RARITY.EPIC, 'EPIC', 371, PKM.SHELGON, 90, 5, 3, 3, 1, 'DRAGON/melee', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.DRACO_METEOR);
  }
}

class Shelgon extends Pokemon {
  constructor() {
    super(PKM.SHELGON, 'drackhaus',[TYPE.DRAGON, TYPE.MONSTER], RARITY.EPIC, 'EPIC', 372, PKM.SALAMENCE, 130, 9, 3, 3, 1, 'DRAGON/melee', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.DRACO_METEOR);
  }
}

class Salamence extends Pokemon {
  constructor() {
    super(PKM.SALAMENCE, 'drattak',[TYPE.DRAGON, TYPE.MONSTER, TYPE.FLYING], RARITY.EPIC, 'EPIC', 373, '', 230, 18, 1, 1, 2, 'FIRE/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.DRACO_METEOR);
  }
}

class Ralts extends Pokemon {
  constructor() {
    super(PKM.RALTS, 'tarsal',[TYPE.PSYCHIC, TYPE.FAIRY, TYPE.HUMAN], RARITY.EPIC, 'EPIC', 280, PKM.KIRLIA, 90, 5, 1, 1, 3, 'PSYCHIC/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.CALM_MIND);
  }
}

class Kirlia extends Pokemon {
  constructor() {
    super(PKM.KIRLIA, 'kirlia',[TYPE.PSYCHIC, TYPE.FAIRY, TYPE.HUMAN], RARITY.EPIC, 'EPIC', 281, PKM.GARDEVOIR, 130, 9, 1, 1, 3, 'PSYCHIC/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.CALM_MIND);
  }
}

class Gardevoir extends Pokemon {
  constructor() {
    super(PKM.GARDEVOIR, 'gardevoir',[TYPE.PSYCHIC, TYPE.FAIRY, TYPE.HUMAN], RARITY.EPIC, 'EPIC', 282, '', 230, 18, 1, 1, 3, 'PSYCHIC/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.CALM_MIND);
  }
}

class Slakoth extends Pokemon {
  constructor() {
    super(PKM.SLAKOTH, 'parecool',[TYPE.NORMAL, TYPE.FIELD], RARITY.EPIC, 'EPIC', 287, PKM.VIGOROTH, 90, 5, 4, 4, 1, 'NORMAL/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.SEISMIC_TOSS);
  }
}

class Vigoroth extends Pokemon {
  constructor() {
    super(PKM.VIGOROTH, 'vigoroth',[TYPE.NORMAL, TYPE.FIELD], RARITY.EPIC, 'EPIC', 288, PKM.SLAKING, 130, 9, 4, 4, 1, 'NORMAL/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.SEISMIC_TOSS);
  }
}

class Slaking extends Pokemon {
  constructor() {
    super(PKM.SLAKING, 'monaflemit',[TYPE.NORMAL, TYPE.FIELD], RARITY.EPIC, 'EPIC', 289, '', 230, 20, 4, 4, 1, 'NORMAL/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.SEISMIC_TOSS);
  }
}

class Larvitar extends Pokemon {
  constructor() {
    super(PKM.LARVITAR, 'embrylex',[TYPE.DARK, TYPE.MONSTER, TYPE.MINERAL], RARITY.EPIC, 'EPIC', 246, PKM.PUPITAR, 90, 8, 4, 4, 1, 'ROCK/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.BITE);
  }
}

class Pupitar extends Pokemon {
  constructor() {
    super(PKM.PUPITAR, 'ymphect',[TYPE.DARK, TYPE.MONSTER, TYPE.MINERAL], RARITY.EPIC, 'EPIC', 247, PKM.TYRANITAR, 130, 9, 4, 4, 1, 'ROCK/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.BITE);
  }
}

class Tyranitar extends Pokemon {
  constructor() {
    super(PKM.TYRANITAR, 'tyranocif',[TYPE.DARK, TYPE.MONSTER, TYPE.MINERAL], RARITY.EPIC, 'EPIC', 248, '', 230, 20, 4, 4, 1, 'ROCK/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.BITE);
  }
}

class Dratini extends Pokemon {
  constructor() {
    super(PKM.DRATINI, 'minidraco',[TYPE.DRAGON, TYPE.AQUATIC], RARITY.EPIC, 'EPIC', 147, PKM.DRAGONAIR, 90, 5, 4, 4, 1, 'DRAGON/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.DRAGON_BREATH);
  }
}

class Dragonair extends Pokemon {
  constructor() {
    super(PKM.DRAGONAIR, 'draco',[TYPE.DRAGON, TYPE.AQUATIC], RARITY.EPIC, 'EPIC', 148, PKM.DRAGONITE, 130, 9, 4, 4, 1, 'DRAGON/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.DRAGON_BREATH);
  }
}

class Dragonite extends Pokemon {
  constructor() {
    super(PKM.DRAGONITE, 'dracolosse',[TYPE.DRAGON, TYPE.AQUATIC, TYPE.FLYING], RARITY.EPIC, 'EPIC', 149, '', 230, 20, 4, 4, 1, 'DRAGON/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.DRAGON_BREATH);
  }
}

class Gastly extends Pokemon {
  constructor() {
    super(PKM.GASTLY, 'fantominus',[TYPE.MONSTER, TYPE.POISON, TYPE.AMORPH], RARITY.EPIC, 'EPIC', 92, PKM.HAUNTER, 90, 5, 1, 1, 2, 'GHOST/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.DARK_PULSE);
  }
}

class Haunter extends Pokemon {
  constructor() {
    super(PKM.HAUNTER, 'spectrum',[TYPE.MONSTER, TYPE.POISON, TYPE.AMORPH], RARITY.EPIC, 'EPIC', 93, PKM.GENGAR, 130, 9, 1, 1, 2, 'GHOST/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.DARK_PULSE);
  }
}

class Gengar extends Pokemon {
  constructor() {
    super(PKM.GENGAR, 'ectoplasma',[TYPE.MONSTER, TYPE.POISON, TYPE.AMORPH], RARITY.EPIC, 'EPIC', 94, '', 230, 18, 1, 1, 2, 'GHOST/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.DARK_PULSE);
  }
}

class Deino extends Pokemon {
  constructor() {
    super(PKM.DEINO, 'solochi',[TYPE.DARK, TYPE.DRAGON], RARITY.EPIC, 'february', 633, PKM.ZWEILOUS, 90, 5, 1, 1, 2, 'FIRE/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.DRACO_METEOR);
  }
}

class Zweilous extends Pokemon {
  constructor() {
    super(PKM.ZWEILOUS, 'diamat',[TYPE.DARK, TYPE.DRAGON], RARITY.EPIC, 'february', 634, PKM.HYDREIGON, 130, 9, 1, 1, 2, 'FIRE/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.DRACO_METEOR);
  }
}

class Hydreigon extends Pokemon {
  constructor() {
    super(PKM.HYDREIGON, 'tryoxhydre',[TYPE.DARK, TYPE.DRAGON], RARITY.EPIC, 'february', 635, '', 230, 18, 1, 1, 2, 'FIRE/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.DRACO_METEOR);
  }
}

class Abra extends Pokemon {
  constructor() {
    super(PKM.ABRA, 'abra',[TYPE.PSYCHIC, TYPE.HUMAN], RARITY.EPIC, 'EPIC', 63, PKM.KADABRA, 90, 5, 1, 1, 4, 'PSYCHIC/range', ATTACK_TYPE.SPECIAL, 1, 50, SPECIAL_SKILL.TELEPORT);
  }
}

class Kadabra extends Pokemon {
  constructor() {
    super(PKM.KADABRA, 'kadabra',[TYPE.PSYCHIC, TYPE.HUMAN], RARITY.EPIC, 'EPIC', 64, PKM.ALAKAZAM, 130, 9, 1, 1, 4, 'PSYCHIC/range', ATTACK_TYPE.SPECIAL, 2, 50, SPECIAL_SKILL.TELEPORT);
  }
}

class Alakazam extends Pokemon {
  constructor() {
    super(PKM.ALAKAZAM, 'alakazam',[TYPE.PSYCHIC, TYPE.HUMAN], RARITY.EPIC, 'EPIC', 65, '', 230, 18, 1, 1, 4, 'PSYCHIC/range', ATTACK_TYPE.SPECIAL, 3, 50, SPECIAL_SKILL.TELEPORT);
  }
}

class Litwick extends Pokemon {
  constructor() {
    super(PKM.LITWICK, 'funécire',[TYPE.FIRE, TYPE.AMORPH], RARITY.EPIC, 'EPIC2', 607, PKM.LAMPENT, 90, 5, 1, 1, 3, 'GHOST/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.FIRE_BLAST);
  }
}

class Lampent extends Pokemon {
  constructor() {
    super(PKM.LAMPENT, 'mélancolux',[TYPE.FIRE, TYPE.AMORPH], RARITY.EPIC, 'EPIC2', 608, PKM.CHANDELURE, 130, 9, 1, 1, 3, 'GHOST/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.FIRE_BLAST);
  }
}

class Chandelure extends Pokemon {
  constructor() {
    super(PKM.CHANDELURE, 'lugulabre',[TYPE.FIRE, TYPE.AMORPH], RARITY.EPIC, 'EPIC2', 609, '', 230, 18, 1, 1, 3, 'GHOST/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.FIRE_BLAST);
  }
}

class Solosis extends Pokemon {
  constructor() {
    super(PKM.SOLOSIS, 'nucléos',[TYPE.PSYCHIC, TYPE.AMORPH], RARITY.EPIC, 'april', 577, PKM.DUOSION, 90, 5, 1, 1, 3, 'PSYCHIC/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.LEECH_LIFE);
  }
}

class Duosion extends Pokemon {
  constructor() {
    super(PKM.DUOSION, 'méïos',[TYPE.PSYCHIC, TYPE.AMORPH], RARITY.EPIC, 'april', 578, PKM.REUNICLUS, 130, 9, 1, 1, 3, 'PSYCHIC/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.LEECH_LIFE);
  }
}

class Reuniclus extends Pokemon {
  constructor() {
    super(PKM.REUNICLUS, 'symbios',[TYPE.PSYCHIC, TYPE.AMORPH], RARITY.EPIC, 'april', 579, '', 230, 18, 1, 1, 3, 'PSYCHIC/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.LEECH_LIFE);
  }
}

class Poliwag extends Pokemon {
  constructor() {
    super(PKM.POLIWAG, 'ptitard',[TYPE.WATER, TYPE.FIGHTING], RARITY.RARE, 'RARE', 60, PKM.POLIWHIRL, 80, 5, 1, 1, 2, 'WATER/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.SOAK);
  }
}

class Poliwhirl extends Pokemon {
  constructor() {
    super(PKM.POLIWHIRL, 'tetarte',[TYPE.WATER, TYPE.FIGHTING], RARITY.RARE, 'RARE', 61, PKM.POLITOED, 120, 9, 1, 1, 2, 'WATER/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.SOAK);
  }
}

class Politoed extends Pokemon {
  constructor() {
    super(PKM.POLITOED, 'tarpaud',[TYPE.WATER, TYPE.FIGHTING], RARITY.RARE, 'RARE', 186, '', 220, 18, 1, 1, 2, 'WATER/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.SOAK);
  }
}

class Shinx extends Pokemon {
  constructor() {
    super(PKM.SHINX, 'lixy',[TYPE.ELECTRIC, TYPE.FIELD], RARITY.RARE, 'RARE', 403, PKM.LUXIO, 80, 5, 4, 4, 1, 'ELECTRIC/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.DISCHARGE);
  }
}

class Luxio extends Pokemon {
  constructor() {
    super(PKM.LUXIO, 'luxio',[TYPE.ELECTRIC, TYPE.FIELD], RARITY.RARE, 'RARE', 404, PKM.LUXRAY, 120, 9, 4, 4, 1, 'ELECTRIC/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.DISCHARGE);
  }
}

class Luxray extends Pokemon {
  constructor() {
    super(PKM.LUXRAY, 'luxray',[TYPE.ELECTRIC, TYPE.FIELD], RARITY.RARE, 'RARE', 405, '', 220, 20, 4, 4, 1, 'ELECTRIC/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.DISCHARGE);
  }
}

class Lotad extends Pokemon {
  constructor() {
    super(PKM.LOTAD, 'nénupiot',[TYPE.GRASS, TYPE.WATER], RARITY.RARE, 'RARE', 270, PKM.LOMBRE, 80, 5, 1, 1, 2, 'GRASS/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.TORMENT);
  }
}

class Lombre extends Pokemon {
  constructor() {
    super(PKM.LOMBRE, 'lombre',[TYPE.GRASS, TYPE.WATER], RARITY.RARE, 'RARE', 271, PKM.LUDICOLO, 120, 9, 1, 1, 2, 'GRASS/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.TORMENT);
  }
}

class Ludicolo extends Pokemon {
  constructor() {
    super(PKM.LUDICOLO, 'ludicolo',[TYPE.GRASS, TYPE.WATER], RARITY.RARE, 'RARE', 272, '', 220, 18, 1, 1, 2, 'GRASS/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.TORMENT);
  }
}

class Duskull extends Pokemon {
  constructor() {
    super(PKM.DUSKULL, 'skélénox',[TYPE.DARK, TYPE.AMORPH], RARITY.RARE, 'RARE', 355, PKM.DUSCLOPS, 80, 5, 1, 1, 2, 'GHOST/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.NIGHT_SLASH);
  }
}

class Dusclops extends Pokemon {
  constructor() {
    super(PKM.DUSCLOPS, 'téraclope',[TYPE.DARK, TYPE.AMORPH], RARITY.RARE, 'RARE', 356, PKM.DUSKNOIR, 120, 9, 1, 1, 2, 'GHOST/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.NIGHT_SLASH);
  }
}

class Dusknoir extends Pokemon {
  constructor() {
    super(PKM.DUSKNOIR, 'noctunoir',[TYPE.DARK, TYPE.AMORPH], RARITY.RARE, 'RARE', 477, '', 220, 18, 1, 1, 2, 'GHOST/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.NIGHT_SLASH);
  }
}

class Togepi extends Pokemon {
  constructor() {
    super(PKM.TOGEPI, 'togépi',[TYPE.NORMAL, TYPE.FAIRY], RARITY.RARE, 'RARE', 175, PKM.TOGETIC, 80, 5, 1, 1, 2, 'FLYING/range', ATTACK_TYPE.SPECIAL, 1, 50, SPECIAL_SKILL.WISH);
  }
}

class Togetic extends Pokemon {
  constructor() {
    super(PKM.TOGETIC, 'togétic',[TYPE.NORMAL, TYPE.FAIRY, TYPE.FLYING], RARITY.RARE, 'RARE', 176, PKM.TOGEKISS, 120, 9, 1, 1, 2, 'FLYING/range', ATTACK_TYPE.SPECIAL, 2, 50, SPECIAL_SKILL.WISH);
  }
}

class Togekiss extends Pokemon {
  constructor() {
    super(PKM.TOGEKISS, 'togekiss',[TYPE.NORMAL, TYPE.FAIRY, TYPE.FLYING], RARITY.RARE, 'RARE', 468, '', 220, 18, 1, 1, 2, 'FLYING/range', ATTACK_TYPE.SPECIAL, 3, 50, SPECIAL_SKILL.WISH);
  }
}

class Sandile extends Pokemon {
  constructor() {
    super(PKM.SANDILE, 'mascaïman',[TYPE.GROUND, TYPE.DARK, TYPE.FIELD], RARITY.RARE, 'february', 551, PKM.KROKOROK, 80, 5, 4, 4, 1, 'ROCK/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.STOMP);
  }
}

class Krookorok extends Pokemon {
  constructor() {
    super(PKM.KROKOROK, 'escroco',[TYPE.GROUND, TYPE.DARK, TYPE.FIELD], RARITY.RARE, 'february', 552, PKM.KROOKODILE, 120, 9, 6, 6, 1, 'ROCK/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.STOMP);
  }
}

class Krookodile extends Pokemon {
  constructor() {
    super(PKM.KROOKODILE, 'krocorible',[TYPE.GROUND, TYPE.DARK, TYPE.FIELD], RARITY.RARE, 'february', 553, '', 220, 20, 8, 8, 1, 'ROCK/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.STOMP);
  }
}

class Rhyhorn extends Pokemon {
  constructor() {
    super(PKM.RHYHORN, 'rhinocorne',[TYPE.GROUND, TYPE.MONSTER, TYPE.MINERAL], RARITY.RARE, 'RARE', 111, PKM.RHYDON, 80, 5, 4, 4, 1, 'ROCK/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.STOMP);
  }
}

class Rhydon extends Pokemon {
  constructor() {
    super(PKM.RHYDON, 'rhinoféros',[TYPE.GROUND, TYPE.MONSTER, TYPE.MINERAL], RARITY.RARE, 'RARE', 112, PKM.RHYPERIOR, 120, 9, 6, 6, 1, 'ROCK/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.STOMP);
  }
}

class Rhyperior extends Pokemon {
  constructor() {
    super(PKM.RHYPERIOR, 'rhinastoc',[TYPE.GROUND, TYPE.MONSTER, TYPE.MINERAL], RARITY.RARE, 'RARE', 464, '', 220, 20, 8, 8, 1, 'ROCK/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.STOMP);
  }
}

class Magnemite extends Pokemon {
  constructor() {
    super(PKM.MAGNEMITE, 'magnéti',[TYPE.ELECTRIC, TYPE.METAL], RARITY.RARE, 'RARE', 81, PKM.MAGNETON, 80, 5, 1, 1, 2, 'ELECTRIC/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.CHARGE);
  }
}

class Magneton extends Pokemon {
  constructor() {
    super(PKM.MAGNETON, 'magnéton',[TYPE.ELECTRIC, TYPE.METAL], RARITY.RARE, 'RARE', 82, PKM.MAGNEZONE, 120, 9, 1, 1, 2, 'ELECTRIC/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.CHARGE);
  }
}

class Magnezone extends Pokemon {
  constructor() {
    super(PKM.MAGNEZONE, 'magnézone',[TYPE.ELECTRIC, TYPE.METAL], RARITY.RARE, 'RARE', 462, '', 220, 18, 1, 1, 2, 'ELECTRIC/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.CHARGE);
  }
}

class Aron extends Pokemon {
  constructor() {
    super(PKM.ARON, 'galékid',[TYPE.METAL, TYPE.MONSTER, TYPE.MINERAL], RARITY.RARE, 'RARE', 304, PKM.LAIRON, 80, 5, 4, 4, 1, 'ROCK/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.STOMP);
  }
}

class Lairon extends Pokemon {
  constructor() {
    super(PKM.LAIRON, 'galégon',[TYPE.METAL, TYPE.MONSTER, TYPE.MINERAL], RARITY.RARE, 'RARE', 305, PKM.AGGRON, 120, 9, 6, 6, 1, 'ROCK/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.STOMP);
  }
}

class Aggron extends Pokemon {
  constructor() {
    super(PKM.AGGRON, 'galéking',[TYPE.METAL, TYPE.MONSTER, TYPE.MINERAL], RARITY.RARE, 'RARE', 306, '', 220, 20, 8, 8, 1, 'ROCK/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.STOMP);
  }
}

class Spheal extends Pokemon {
  constructor() {
    super(PKM.SPHEAL, 'obalie',[TYPE.AQUATIC, TYPE.ICE], RARITY.RARE, 'RARE', 363, PKM.SEALEO, 80, 5, 4, 4, 1, 'ICE/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.ICICLE_CRASH);
  }
}

class Sealeo extends Pokemon {
  constructor() {
    super(PKM.SEALEO, 'phogleur',[TYPE.AQUATIC, TYPE.ICE], RARITY.RARE, 'RARE', 364, PKM.WALREIN, 120, 9, 4, 4, 1, 'ICE/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.ICICLE_CRASH);
  }
}

class Walrein extends Pokemon {
  constructor() {
    super(PKM.WALREIN, 'kaimorse',[TYPE.AQUATIC, TYPE.ICE], RARITY.RARE, 'RARE', 365, '', 220, 20, 4, 4, 1, 'ICE/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.ICICLE_CRASH);
  }
}

class Swinub extends Pokemon {
  constructor() {
    super(PKM.SWINUB, 'marcarin',[TYPE.GROUND, TYPE.ICE], RARITY.UNCOMMON, 'december', 220, PKM.PILOSWINE, 80, 5, 4, 4, 1, 'ICE/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.ICICLE_CRASH);
  }
}

class Piloswine extends Pokemon {
  constructor() {
    super(PKM.PILOSWINE, 'cochignon',[TYPE.GROUND, TYPE.ICE], RARITY.UNCOMMON, 'december', 221, PKM.MAMOSWINE, 120, 9, 4, 4, 1, 'ICE/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.ICICLE_CRASH);
  }
}

class Mamoswine extends Pokemon {
  constructor() {
    super(PKM.MAMOSWINE, 'mammochon',[TYPE.GROUND, TYPE.ICE], RARITY.UNCOMMON, 'december', 473, '', 220, 20, 6, 6, 1, 'ICE/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.ICICLE_CRASH);
  }
}

class Snover extends Pokemon {
  constructor() {
    super(PKM.SNOVER, 'blizzi', [TYPE.GRASS, TYPE.ICE], RARITY.LEGENDARY, 'december', 459, PKM.ABOMASNOW, 80, 7, 6, 6, 1, 'ICE/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.FREEZE);
  }
}

class Abomasnow extends Pokemon {
  constructor() {
    super(PKM.ABOMASNOW, 'blizzaroi',[TYPE.GRASS, TYPE.ICE], RARITY.LEGENDARY, 'december', 460, PKM.MEGAABOMASNOW, 120, 11, 8, 8, 1, 'ICE/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.FREEZE);
  }
}

class MegaAbomasnow extends Pokemon {
  constructor() {
    super(PKM.MEGAABOMASNOW, 'méga-blizzaroi',[TYPE.GRASS, TYPE.ICE], RARITY.LEGENDARY, 'december', 4600, '', 220, 25, 10, 10, 1, 'ICE/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.FREEZE);
  }
}

class Snorunt extends Pokemon {
  constructor() {
    super(PKM.SNORUNT, 'stalgamin',[TYPE.AMORPH, TYPE.ICE], RARITY.EPIC, 'december', 361, PKM.GLALIE, 80, 5, 2, 2, 3, 'GHOST/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.DARK_PULSE);
  }
}

class Glalie extends Pokemon {
  constructor() {
    super(PKM.GLALIE, 'oniglali',[TYPE.AMORPH, TYPE.ICE], RARITY.EPIC, 'december', 362, PKM.FROSLASS, 120, 9, 2, 2, 3, 'GHOST/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.DARK_PULSE);
  }
}

class Froslass extends Pokemon {
  constructor() {
    super(PKM.FROSLASS, 'momartik',[TYPE.AMORPH, TYPE.ICE], RARITY.EPIC, 'december', 478, '', 220, 20, 2, 2, 3, 'GHOST/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.DARK_PULSE);
  }
}

class Vanillite extends Pokemon {
  constructor() {
    super(PKM.VANILLITE, 'sorbébé',[TYPE.FAIRY, TYPE.ICE], RARITY.RARE, 'december', 582, PKM.VANILLISH, 80, 5, 2, 2, 3, 'FAIRY/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.SLEEP);
  }
}

class Vanillish extends Pokemon {
  constructor() {
    super(PKM.VANILLISH, 'sorboul',[TYPE.FAIRY, TYPE.ICE], RARITY.RARE, 'december', 583, PKM.VANILLUXE, 120, 8, 2, 2, 3, 'FAIRY/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.SLEEP);
  }
}

class Vanilluxe extends Pokemon {
  constructor() {
    super(PKM.VANILLUXE, 'sorbouboul',[TYPE.FAIRY, TYPE.ICE], RARITY.RARE, 'december', 584, '', 220, 19, 2, 2, 3, 'FAIRY/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.SLEEP);
  }
}

class Trapinch extends Pokemon {
  constructor() {
    super(PKM.TRAPINCH, 'kraknoix',[TYPE.GROUND, TYPE.BUG], RARITY.RARE, 'RARE', 328, PKM.VIBRAVA, 80, 5, 4, 4, 1, 'DRAGON/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.DRAGON_TAIL);
  }
}

class Vibrava extends Pokemon {
  constructor() {
    super(PKM.VIBRAVA, 'vibranif',[TYPE.GROUND, TYPE.DRAGON, TYPE.BUG], RARITY.RARE, 'RARE', 329, PKM.FLYGON, 120, 9, 4, 4, 1, 'DRAGON/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.DRAGON_TAIL);
  }
}

class Flygon extends Pokemon {
  constructor() {
    super(PKM.FLYGON, 'libegon',[TYPE.GROUND, TYPE.DRAGON, TYPE.BUG], RARITY.RARE, 'RARE', 330, '', 220, 20, 4, 4, 1, 'DRAGON/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.DRAGON_TAIL);
  }
}

class Horsea extends Pokemon {
  constructor() {
    super(PKM.HORSEA, 'hypotrempe',[TYPE.WATER, TYPE.DRAGON], RARITY.RARE, 'RARE', 116, PKM.SEADRA, 80, 5, 1, 1, 2, 'WATER/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.HYDRO_PUMP);
  }
}

class Seadra extends Pokemon {
  constructor() {
    super(PKM.SEADRA, 'hypocéan', [TYPE.WATER, TYPE.DRAGON], RARITY.RARE, 'RARE', 117, PKM.KINGDRA, 120, 9, 1, 1, 2, 'WATER/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.HYDRO_PUMP);
  }
}

class Kingdra extends Pokemon {
  constructor() {
    super(PKM.KINGDRA, 'hyporoi',[TYPE.WATER, TYPE.DRAGON], RARITY.RARE, 'RARE', 230, '', 220, 18, 1, 1, 2, 'WATER/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.HYDRO_PUMP);
  }
}

class Machop extends Pokemon {
  constructor() {
    super(PKM.MACHOP, 'machoc',[TYPE.FIGHTING, TYPE.HUMAN], RARITY.RARE, 'RARE', 66, PKM.MACHOKE, 80, 5, 4, 4, 1, 'FIGHTING/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.GUILLOTINE);
  }
}

class Machoke extends Pokemon {
  constructor() {
    super(PKM.MACHOKE, 'machopeur',[TYPE.FIGHTING, TYPE.HUMAN], RARITY.RARE, 'RARE', 67, PKM.MACHAMP, 120, 9, 4, 4, 1, 'FIGHTING/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.GUILLOTINE);
  }
}

class Machamp extends Pokemon {
  constructor() {
    super(PKM.MACHAMP, 'mackogneur',[TYPE.FIGHTING, TYPE.HUMAN], RARITY.RARE, 'RARE', 68, '', 220, 20, 4, 4, 1, 'FIGHTING/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.GUILLOTINE);
  }
}

class Pichu extends Pokemon {
  constructor() {
    super(PKM.PICHU, 'pichu',[TYPE.ELECTRIC, TYPE.FAIRY], RARITY.RARE, 'RARE', 172, PKM.PIKACHU, 80, 5, 1, 1, 2, 'ELECTRIC/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.THUNDER);
  }
}

class Pikachu extends Pokemon {
  constructor() {
    super(PKM.PIKACHU, 'pikachu',[TYPE.ELECTRIC, TYPE.FAIRY], RARITY.RARE, 'RARE', 25, PKM.RAICHU, 120, 9, 1, 1, 2, 'ELECTRIC/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.THUNDER);
  }
}

class Raichu extends Pokemon {
  constructor() {
    super(PKM.RAICHU, 'raichu',[TYPE.ELECTRIC, TYPE.FAIRY], RARITY.RARE, 'RARE', 26, '', 220, 18, 1, 1, 2, 'ELECTRIC/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.THUNDER);
  }
}

class Bulbasaur extends Pokemon {
  constructor() {
    super(PKM.BULBASAUR, 'bulbizarre',[TYPE.GRASS, TYPE.POISON, TYPE.FLORA], RARITY.UNCOMMON, 'UNCOMMON', 1, PKM.IVYSAUR, 70, 5, 1, 1, 2, 'GRASS/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.ROOT);
  }
}

class Ivysaur extends Pokemon {
  constructor() {
    super(PKM.IVYSAUR, 'herbizarre',[TYPE.GRASS, TYPE.POISON, TYPE.FLORA], RARITY.UNCOMMON, 'UNCOMMON', 2, PKM.VENUSAUR, 120, 9, 1, 1, 2, 'GRASS/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.ROOT);
  }
}

class Venusaur extends Pokemon {
  constructor() {
    super(PKM.VENUSAUR, 'florizarre',[TYPE.GRASS, TYPE.POISON, TYPE.FLORA], RARITY.UNCOMMON, 'UNCOMMON', 3, '', 210, 18, 1, 1, 2, 'GRASS/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.ROOT);
  }
}

class Chikorita extends Pokemon {
  constructor() {
    super(PKM.CHIKORITA, 'germignon',[TYPE.GRASS, TYPE.FLORA], RARITY.UNCOMMON, 'UNCOMMON', 152, PKM.BAYLEEF, 70, 5, 1, 1, 2, 'GRASS/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.STUN_SPORE);
  }
}

class Bayleef extends Pokemon {
  constructor() {
    super(PKM.BAYLEEF, 'macronium',[TYPE.GRASS, TYPE.FLORA], RARITY.UNCOMMON, 'UNCOMMON', 153, PKM.MEGANIUM, 120, 9, 1, 1, 2, 'GRASS/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.STUN_SPORE);
  }
}

class Meganium extends Pokemon {
  constructor() {
    super(PKM.MEGANIUM, 'meganium',[TYPE.GRASS, TYPE.FLORA], RARITY.UNCOMMON, 'UNCOMMON', 154, '', 210, 20, 1, 1, 2, 'GRASS/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.STUN_SPORE);
  }
}

class NidoranF extends Pokemon {
  constructor() {
    super(PKM.NIDORANF, 'nidoranF',[TYPE.POISON, TYPE.FIELD], RARITY.UNCOMMON, 'UNCOMMON', 29, PKM.NIDORINA, 70, 5, 3, 2, 1, 'POISON/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.POISON_STING);
  }
}

class Nidorina extends Pokemon {
  constructor() {
    super(PKM.NIDORINA, 'nidorina',[TYPE.POISON, TYPE.FIELD], RARITY.UNCOMMON, 'UNCOMMON', 30, PKM.NIDOQUEEN, 120, 9, 3, 2, 1, 'POISON/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.POISON_STING);
  }
}

class Nidoqueen extends Pokemon {
  constructor() {
    super(PKM.NIDOQUEEN, 'nidoqueen',[TYPE.POISON, TYPE.FIELD], RARITY.UNCOMMON, 'UNCOMMON', 31, '', 210, 20, 3, 3, 1, 'POISON/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.POISON_STING);
  }
}

class NidoranM extends Pokemon {
  constructor() {
    super(PKM.NIDORANM, 'nidoranM',[TYPE.POISON, TYPE.FIELD], RARITY.UNCOMMON, 'UNCOMMON', 32, PKM.NIDORINO, 70, 5, 3, 3, 1, 'POISON/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.POISON);
  }
}

class Nidorino extends Pokemon {
  constructor() {
    super(PKM.NIDORINO, 'nidorino',[TYPE.POISON, TYPE.FIELD], RARITY.UNCOMMON, 'UNCOMMON', 33, PKM.NIDOKING, 120, 9, 3, 3, 1, 'POISON/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.POISON);
  }
}

class Nidoking extends Pokemon {
  constructor() {
    super(PKM.NIDOKING, 'nidoking',[TYPE.POISON, TYPE.FIELD], RARITY.UNCOMMON, 'UNCOMMON', 34, '', 210, 20, 3, 3, 1, 'POISON/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.POISON);
  }
}

class Piplup extends Pokemon {
  constructor() {
    super(PKM.PIPLUP, 'tiplouf',[TYPE.WATER, TYPE.FLYING], RARITY.UNCOMMON, 'UNCOMMON', 393, PKM.PRINPLUP, 70, 5, 3, 3, 1, 'WATER/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.IRON_TAIL);
  }
}

class Prinplup extends Pokemon {
  constructor() {
    super(PKM.PRINPLUP, 'prinplouf',[TYPE.WATER, TYPE.FLYING, TYPE.METAL], RARITY.UNCOMMON, 'UNCOMMON', 394, PKM.EMPOLEON, 120, 9, 3, 3, 1, 'WATER/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.IRON_TAIL);
  }
}

class Empoleon extends Pokemon {
  constructor() {
    super(PKM.EMPOLEON, 'pingoléon',[TYPE.WATER, TYPE.FLYING, TYPE.METAL], RARITY.UNCOMMON, 'UNCOMMON', 395, '', 210, 20, 3, 3, 1, 'WATER/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.IRON_TAIL);
  }
}

class Chimchar extends Pokemon {
  constructor() {
    super(PKM.CHIMCHAR, 'ouisticram',[TYPE.FIRE, TYPE.HUMAN], RARITY.UNCOMMON, 'UNCOMMON', 390, PKM.MONFERNO, 70, 5, 3, 3, 1, 'FIRE/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.TORMENT);
  }
}

class Monferno extends Pokemon {
  constructor() {
    super(PKM.MONFERNO, 'chimpenfeu',[TYPE.FIRE, TYPE.HUMAN, TYPE.FIGHTING], RARITY.UNCOMMON, 'UNCOMMON', 391, PKM.INFERNAPE, 120, 9, 3, 3, 1, 'FIRE/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.TORMENT);
  }
}

class Infernape extends Pokemon {
  constructor() {
    super(PKM.INFERNAPE, 'simiabraz',[TYPE.FIRE, TYPE.HUMAN, TYPE.FIGHTING], RARITY.UNCOMMON, 'UNCOMMON', 392, '', 210, 20, 3, 3, 1, 'FIRE/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.TORMENT);
  }
}

class Turtwig extends Pokemon {
  constructor() {
    super(PKM.TURTWIG, 'tortipouss',[TYPE.GRASS, TYPE.GROUND, TYPE.FLORA], RARITY.UNCOMMON, 'UNCOMMON', 387, PKM.GROTLE, 70, 5, 3, 3, 1, 'GRASS/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.STOMP);
  }
}

class Grotle extends Pokemon {
  constructor() {
    super(PKM.GROTLE, 'boskara',[TYPE.GRASS, TYPE.GROUND, TYPE.FLORA], RARITY.UNCOMMON, 'UNCOMMON', 388, PKM.TORTERRA, 120, 9, 3, 3, 1, 'GRASS/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.STOMP);
  }
}

class Torterra extends Pokemon {
  constructor() {
    super(PKM.TORTERRA, 'torterra',[TYPE.GRASS, TYPE.GROUND, TYPE.FLORA], RARITY.UNCOMMON, 'UNCOMMON', 389, '', 210, 20, 3, 3, 1, 'GRASS/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.STOMP);
  }
}

class Mudkip extends Pokemon {
  constructor() {
    super(PKM.MUDKIP, 'gobou',[TYPE.WATER, TYPE.GROUND], RARITY.UNCOMMON, 'UNCOMMON', 258, PKM.MARSHTOMP, 70, 5, 3, 3, 1, 'WATER/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.SOAK);
  }
}

class Marshtomp extends Pokemon {
  constructor() {
    super(PKM.MARSHTOMP, 'flobio',[TYPE.WATER, TYPE.GROUND], RARITY.UNCOMMON, 'UNCOMMON', 259, PKM.SWAMPERT, 120, 9, 3, 3, 1, 'WATER/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.SOAK);
  }
}

class Swampert extends Pokemon {
  constructor() {
    super(PKM.SWAMPERT, 'laggron',[TYPE.WATER, TYPE.GROUND], RARITY.UNCOMMON, 'UNCOMMON', 260, '', 210, 20, 3, 3, 1, 'WATER/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.SOAK);
  }
}

class Torchic extends Pokemon {
  constructor() {
    super(PKM.TORCHIC, 'poussifeu',[TYPE.FIRE, TYPE.FLYING], RARITY.UNCOMMON, 'UNCOMMON', 255, PKM.COMBUSKEN, 70, 5, 3, 3, 1, 'FIRE/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.BLAZE_KICK);
  }
}

class Combusken extends Pokemon {
  constructor() {
    super(PKM.COMBUSKEN, 'galifeu',[TYPE.FIRE, TYPE.FIGHTING, TYPE.FLYING], RARITY.UNCOMMON, 'UNCOMMON', 256, PKM.BLAZIKEN, 120, 9, 3, 3, 1, 'FIRE/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.BLAZE_KICK);
  }
}

class Blaziken extends Pokemon {
  constructor() {
    super(PKM.BLAZIKEN, 'braségali',[TYPE.FIRE, TYPE.FIGHTING, TYPE.FLYING], RARITY.UNCOMMON, 'UNCOMMON', 257, '', 210, 20, 3, 3, 1, 'FIRE/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.BLAZE_KICK);
  }
}

class Treecko extends Pokemon {
  constructor() {
    super(PKM.TREECKO, 'arcko',[TYPE.GRASS, TYPE.MONSTER], RARITY.UNCOMMON, 'UNCOMMON', 252, PKM.GROVYLE, 70, 5, 3, 3, 1, 'GRASS/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.THIEF);
  }
}

class Grovyle extends Pokemon {
  constructor() {
    super(PKM.GROVYLE, 'massko',[TYPE.GRASS, TYPE.MONSTER], RARITY.UNCOMMON, 'UNCOMMON', 253, PKM.SCEPTILE, 120, 9, 3, 3, 1, 'GRASS/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.THIEF);
  }
}

class Sceptile extends Pokemon {
  constructor() {
    super(PKM.SCEPTILE, 'jungko',[TYPE.GRASS, TYPE.MONSTER], RARITY.UNCOMMON, 'UNCOMMON', 254, '', 210, 20, 3, 3, 1, 'GRASS/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.THIEF);
  }
}

class Totodile extends Pokemon {
  constructor() {
    super(PKM.TOTODILE, 'kaiminus',[TYPE.MONSTER, TYPE.AQUATIC], RARITY.UNCOMMON, 'UNCOMMON', 158, PKM.CROCONAW, 70, 5, 3, 3, 1, 'WATER/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.BITE);
  }
}

class Croconaw extends Pokemon {
  constructor() {
    super(PKM.CROCONAW, 'crocodil',[TYPE.MONSTER, TYPE.AQUATIC], RARITY.UNCOMMON, 'UNCOMMON', 159, PKM.FERALIGATR, 120, 9, 3, 3, 1, 'WATER/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.BITE);
  }
}

class Feraligatr extends Pokemon {
  constructor() {
    super(PKM.FERALIGATR, 'aligatueur',[TYPE.MONSTER, TYPE.AQUATIC], RARITY.UNCOMMON, 'UNCOMMON', 160, '', 210, 20, 3, 3, 1, 'WATER/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.BITE);
  }
}

class Cyndaquil extends Pokemon {
  constructor() {
    super(PKM.CYNDAQUIL, 'héricendre',[TYPE.FIRE, TYPE.FIELD], RARITY.UNCOMMON, 'UNCOMMON', 155, PKM.QUILAVA, 70, 5, 1, 1, 2, 'FIRE/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.WHEEL_OF_FIRE);
  }
}

class Quilava extends Pokemon {
  constructor() {
    super(PKM.QUILAVA, 'feurisson',[TYPE.FIRE, TYPE.FIELD], RARITY.UNCOMMON, 'UNCOMMON', 156, PKM.TYPHLOSION, 120, 9, 1, 1, 2, 'FIRE/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.WHEEL_OF_FIRE);
  }
}

class Typhlosion extends Pokemon {
  constructor() {
    super(PKM.TYPHLOSION, 'typhlosion',[TYPE.FIRE, TYPE.FIELD], RARITY.UNCOMMON, 'UNCOMMON', 157, '', 210, 18, 1, 1, 2, 'FIRE/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.WHEEL_OF_FIRE);
  }
}

class Charmander extends Pokemon {
  constructor() {
    super(PKM.CHARMANDER, 'salamèche',[TYPE.FIRE, TYPE.MONSTER], RARITY.UNCOMMON, 'UNCOMMON', 4, PKM.CHARMELEON, 70, 5, 3, 3, 1, 'FIRE/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.BLAST_BURN);
  }
}

class Charmeleon extends Pokemon {
  constructor() {
    super(PKM.CHARMELEON, 'reptincel',[TYPE.FIRE, TYPE.MONSTER], RARITY.UNCOMMON, 'UNCOMMON', 5, PKM.CHARIZARD, 120, 9, 3, 3, 1, 'FIRE/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.BLAST_BURN);
  }
}

class Charizard extends Pokemon {
  constructor() {
    super(PKM.CHARIZARD, 'dracaufeu',[TYPE.FIRE, TYPE.MONSTER, TYPE.FLYING], RARITY.UNCOMMON, 'UNCOMMON', 6, '', 210, 20, 3, 3, 1, 'FIRE/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.BLAST_BURN);
  }
}

class Slowpoke extends Pokemon {
  constructor() {
    super(PKM.SLOWPOKE, 'ramoloss',[TYPE.AQUATIC, TYPE.PSYCHIC], RARITY.UNCOMMON, 'UNCOMMON2', 79, PKM.SLOWBRO, 70, 5, 2, 2, 1, 'WATER/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.SOAK);
  }
}

class Slowbro extends Pokemon {
  constructor() {
    super(PKM.SLOWBRO, 'flagadoss',[TYPE.AQUATIC, TYPE.PSYCHIC], RARITY.UNCOMMON, 'UNCOMMON2', 80, PKM.SLOWKING, 120, 9, 3, 3, 1, 'WATER/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.SOAK);
  }
}

class Slowking extends Pokemon {
  constructor() {
    super(PKM.SLOWKING, 'roigada',[TYPE.AQUATIC, TYPE.PSYCHIC], RARITY.UNCOMMON, 'UNCOMMON2', 199, '', 210, 20, 4, 4, 1, 'WATER/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.SOAK);
  }
}

class Squirtle extends Pokemon {
  constructor() {
    super(PKM.SQUIRTLE, 'carapuce',[TYPE.WATER, TYPE.FIELD], RARITY.UNCOMMON, 'UNCOMMON', 7, PKM.WARTORTLE, 70, 5, 1, 1, 2, 'WATER/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.HYDRO_PUMP);
  }
}

class Wartortle extends Pokemon {
  constructor() {
    super(PKM.WARTORTLE, 'carabaffe',[TYPE.WATER, TYPE.FIELD], RARITY.UNCOMMON, 'UNCOMMON', 8, PKM.BLASTOISE, 120, 9, 1, 1, 2, 'WATER/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.HYDRO_PUMP);
  }
}

class Blastoise extends Pokemon {
  constructor() {
    super(PKM.BLASTOISE, 'tortank',[TYPE.WATER, TYPE.FIELD], RARITY.UNCOMMON, 'UNCOMMON', 9, '', 210, 20, 1, 1, 2, 'WATER/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.HYDRO_PUMP);
  }
}

class Geodude extends Pokemon {
  constructor() {
    super(PKM.GEODUDE, 'racaillou',[TYPE.GROUND, TYPE.MINERAL], RARITY.COMMON, 'COMMON', 74, PKM.GRAVELER, 60, 5, 2, 2, 1, 'ROCK/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.ROCK_SLIDE);
  }
}

class Graveler extends Pokemon {
  constructor() {
    super(PKM.GRAVELER, 'gravalanch',[TYPE.GROUND, TYPE.MINERAL], RARITY.COMMON, 'COMMON', 75, PKM.GOLEM, 110, 9, 4, 4, 1, 'ROCK/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.ROCK_SLIDE);
  }
}

class Golem extends Pokemon {
  constructor() {
    super(PKM.GOLEM, 'grolem',[TYPE.GROUND, TYPE.MINERAL], RARITY.COMMON, 'COMMON', 76, '', 200, 20, 8, 8, 1, 'ROCK/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.ROCK_SLIDE);
  }
}

class Azurill extends Pokemon {
  constructor() {
    super(PKM.AZURILL, 'azurill',[TYPE.WATER, TYPE.FAIRY], RARITY.COMMON, 'COMMON', 298, PKM.MARILL, 60, 5, 1, 1, 2, 'WATER/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.HYDRO_PUMP);
  }
}

class Marill extends Pokemon {
  constructor() {
    super(PKM.MARILL, 'marill',[TYPE.WATER, TYPE.FAIRY], RARITY.COMMON, 'COMMON', 183, PKM.AZUMARILL, 110, 9, 1, 1, 2, 'WATER/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.HYDRO_PUMP);
  }
}

class Azumarill extends Pokemon {
  constructor() {
    super(PKM.AZUMARILL, 'azumarill',[TYPE.WATER, TYPE.FAIRY], RARITY.COMMON, 'COMMON', 184, '', 200, 20, 1, 1, 2, 'WATER/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.HYDRO_PUMP);
  }
}

class Zubat extends Pokemon {
  constructor() {
    super(PKM.ZUBAT, 'nosferapti',[TYPE.POISON, TYPE.FLYING], RARITY.COMMON, 'COMMON', 41, PKM.GOLBAT, 60, 5, 1, 1, 2, 'PSYCHIC/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.LEECH_LIFE);
  }
}

class Golbat extends Pokemon {
  constructor() {
    super(PKM.GOLBAT, 'nosferalto',[TYPE.POISON, TYPE.FLYING], RARITY.COMMON, 'COMMON', 42, PKM.CROBAT, 110, 9, 1, 1, 2, 'PSYCHIC/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.LEECH_LIFE);
  }
}

class Crobat extends Pokemon {
  constructor() {
    super(PKM.CROBAT, 'nostenfer',[TYPE.POISON, TYPE.FLYING], RARITY.COMMON, 'COMMON', 169, '', 200, 18, 1, 1, 2, 'PSYCHIC/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.LEECH_LIFE);
  }
}

class Mareep extends Pokemon {
  constructor() {
    super(PKM.MAREEP, 'wattouat',[TYPE.ELECTRIC, TYPE.FIELD], RARITY.COMMON, 'COMMON', 179, PKM.FLAFFY, 60, 5, 1, 1, 2, 'ELECTRIC/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.THUNDER);
  }
}

class Flaffy extends Pokemon {
  constructor() {
    super(PKM.FLAFFY, 'lainergie',[TYPE.ELECTRIC, TYPE.FIELD], RARITY.COMMON, 'COMMON', 180, PKM.AMPHAROS, 110, 9, 1, 1, 2, 'ELECTRIC/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.THUNDER);
  }
}

class Ampharos extends Pokemon {
  constructor() {
    super(PKM.AMPHAROS, 'pharamp',[TYPE.ELECTRIC, TYPE.FIELD], RARITY.COMMON, 'COMMON', 181, '', 200, 18, 1, 1, 2, 'ELECTRIC/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.THUNDER);
  }
}

class Cleffa extends Pokemon {
  constructor() {
    super(PKM.CLEFFA, 'mélo',[TYPE.FAIRY, TYPE.NORMAL], RARITY.COMMON, 'COMMON', 173, PKM.CLEFAIRY, 60, 5, 2, 2, 1, 'FAIRY/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.METRONOME);
  }
}

class Clefairy extends Pokemon {
  constructor() {
    super(PKM.CLEFAIRY, 'mélofée',[TYPE.FAIRY, TYPE.NORMAL], RARITY.COMMON, 'COMMON', 35, PKM.CLEFABLE, 110, 9, 2, 2, 1, 'FAIRY/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.METRONOME);
  }
}

class Clefable extends Pokemon {
  constructor() {
    super(PKM.CLEFABLE, 'mélodelfe',[TYPE.FAIRY, TYPE.NORMAL], RARITY.COMMON, 'COMMON', 36, '', 200, 18, 2, 2, 1, 'FAIRY/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.METRONOME);
  }
}

class Igglybuff extends Pokemon {
  constructor() {
    super(PKM.IGGLYBUFF, 'toudoudou',[TYPE.FAIRY, TYPE.NORMAL], RARITY.COMMON, 'COMMON', 174, PKM.JIGGLYPUFF, 60, 5, 1, 1, 2, 'FAIRY/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.SLEEP);
  }
}

class Jigglypuff extends Pokemon {
  constructor() {
    super(PKM.JIGGLYPUFF, 'rondoudou',[TYPE.FAIRY, TYPE.NORMAL], RARITY.COMMON, 'COMMON', 39, PKM.WIGGLYTUFF, 110, 9, 1, 1, 2, 'FAIRY/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.SLEEP);
  }
}

class Wigglytuff extends Pokemon {
  constructor() {
    super(PKM.WIGGLYTUFF, 'grodoudou',[TYPE.FAIRY, TYPE.NORMAL], RARITY.COMMON, 'COMMON', 40, '', 200, 18, 1, 1, 2, 'FAIRY/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.SLEEP);
  }
}

class Caterpie extends Pokemon {
  constructor() {
    super(PKM.CATERPIE, 'chenipan',[TYPE.GRASS, TYPE.BUG], RARITY.COMMON, 'COMMON', 10, PKM.METAPOD, 60, 5, 1, 1, 2, 'POISON/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.BUG_BUZZ);
  }
}

class Metapod extends Pokemon {
  constructor() {
    super(PKM.METAPOD, 'chrysacier',[TYPE.GRASS, TYPE.BUG], RARITY.COMMON, 'COMMON', 11, PKM.BUTTERFREE, 110, 9, 1, 1, 2, 'POISON/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.BUG_BUZZ);
  }
}

class Butterfree extends Pokemon {
  constructor() {
    super(PKM.BUTTERFREE, 'papilusion',[TYPE.GRASS, TYPE.BUG, TYPE.FLYING], RARITY.COMMON, 'COMMON', 12, '', 200, 18, 1, 1, 2, 'POISON/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.BUG_BUZZ);
  }
}

class Weedle extends Pokemon {
  constructor() {
    super(PKM.WEEDLE, 'aspicot',[TYPE.POISON, TYPE.BUG], RARITY.COMMON, 'COMMON', 13, PKM.KAKUNA, 60, 5, 2, 2, 1, 'BUG/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.BUG_BUZZ);
  }
}

class Kakuna extends Pokemon {
  constructor() {
    super(PKM.KAKUNA, 'coconfort',[TYPE.POISON, TYPE.BUG], RARITY.COMMON, 'COMMON', 14, PKM.BEEDRILL, 110, 9, 2, 2, 1, 'BUG/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.BUG_BUZZ);
  }
}

class Beedrill extends Pokemon {
  constructor() {
    super(PKM.BEEDRILL, 'dardagnan',[TYPE.POISON, TYPE.BUG, TYPE.FLYING], RARITY.COMMON, 'COMMON', 15, '', 200, 20, 2, 2, 1, 'BUG/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.BUG_BUZZ);
  }
}

class Pidgey extends Pokemon {
  constructor() {
    super(PKM.PIDGEY, 'roucool',[TYPE.NORMAL, TYPE.FLYING], RARITY.COMMON, 'COMMON', 16, PKM.PIDGEOTTO, 60, 5, 1, 1, 2, 'FLYING/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.HURRICANE);
  }
}

class Pidgeotto extends Pokemon {
  constructor() {
    super(PKM.PIDGEOTTO, 'roucoups',[TYPE.NORMAL, TYPE.FLYING], RARITY.COMMON, 'COMMON', 17, PKM.PIDGEOT, 110, 9, 1, 1, 2, 'FLYING/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.HURRICANE);
  }
}

class Pidgeot extends Pokemon {
  constructor() {
    super(PKM.PIDGEOT, 'roucarnage',[TYPE.NORMAL, TYPE.FLYING], RARITY.COMMON, 'COMMON', 18, '', 200, 18, 1, 1, 2, 'FLYING/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.HURRICANE);
  }
}

class Hoppip extends Pokemon {
  constructor() {
    super(PKM.HOPPIP, 'granivol',[TYPE.GRASS, TYPE.FLYING, TYPE.FLORA], RARITY.COMMON, 'COMMON', 187, PKM.SKIPLOOM, 60, 5, 1, 1, 2, 'FLYING/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.STUN_SPORE);
  }
}

class Skiploom extends Pokemon {
  constructor() {
    super(PKM.SKIPLOOM, 'floravol',[TYPE.GRASS, TYPE.FLYING, TYPE.FLORA], RARITY.COMMON, 'COMMON', 188, PKM.JUMPLUFF, 110, 9, 1, 1, 2, 'FLYING/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.STUN_SPORE);
  }
}

class Jumpluff extends Pokemon {
  constructor() {
    super(PKM.JUMPLUFF, 'cotovol',[TYPE.GRASS, TYPE.FLYING, TYPE.FLORA], RARITY.COMMON, 'COMMON', 189, '', 220, 18, 1, 1, 2, 'FLYING/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.STUN_SPORE);
  }
}

class Seedot extends Pokemon {
  constructor() {
    super(PKM.SEEDOT, 'granipiot',[TYPE.GRASS, TYPE.DARK, TYPE.FIELD], RARITY.COMMON, 'COMMON', 273, PKM.NUZLEAF, 60, 5, 2, 2, 1, 'GRASS/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.THIEF);
  }
}

class Nuzleaf extends Pokemon {
  constructor() {
    super(PKM.NUZLEAF, 'pifeuil',[TYPE.GRASS, TYPE.DARK, TYPE.FIELD], RARITY.COMMON, 'COMMON', 274, PKM.SHIFTRY, 110, 9, 2, 2, 1, 'GRASS/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.THIEF);
  }
}

class Shiftry extends Pokemon {
  constructor() {
    super(PKM.SHIFTRY, 'tengalice',[TYPE.GRASS, TYPE.DARK, TYPE.FIELD], RARITY.COMMON, 'COMMON', 275, '', 200, 20, 2, 2, 1, 'GRASS/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.THIEF);
  }
}

class Starly extends Pokemon {
  constructor() {
    super(PKM.STARLY, 'étourmi',[TYPE.NORMAL, TYPE.FLYING], RARITY.COMMON, 'COMMON', 396, PKM.STARAVIA, 60, 5, 2, 2, 1, 'FLYING/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.HURRICANE);
  }
}

class Staravia extends Pokemon {
  constructor() {
    super(PKM.STARAVIA, 'étourvol',[TYPE.NORMAL, TYPE.FLYING], RARITY.COMMON, 'COMMON', 397, PKM.STARAPTOR, 110, 9, 2, 2, 1, 'FLYING/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.HURRICANE);
  }
}

class Staraptor extends Pokemon {
  constructor() {
    super(PKM.STARAPTOR, 'étouraptor',[TYPE.NORMAL, TYPE.FLYING], RARITY.COMMON, 'COMMON', 398, '', 200, 20, 2, 2, 1, 'FLYING/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.HURRICANE);
  }
}

class Bellsprout extends Pokemon {
  constructor() {
    super(PKM.BELLSPROUT, 'chétiflor',[TYPE.GRASS, TYPE.POISON, TYPE.FLORA], RARITY.COMMON, 'december', 69, PKM.WEEPINBELL, 60, 5, 2, 2, 1, 'GRASS/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.ROOT);
  }
}

class Weepinbell extends Pokemon {
  constructor() {
    super(PKM.WEEPINBELL, 'boustiflor',[TYPE.GRASS, TYPE.POISON, TYPE.FLORA], RARITY.COMMON, 'december', 70, PKM.VICTREEBEL, 110, 9, 2, 2, 1, 'GRASS/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.ROOT);
  }
}

class Victreebel extends Pokemon {
  constructor() {
    super(PKM.VICTREEBEL, 'empiflor',[TYPE.GRASS, TYPE.POISON, TYPE.FLORA], RARITY.COMMON, 'december', 71, '', 200, 20, 2, 2, 1, 'GRASS/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.ROOT);
  }
}

class Carvanha extends Pokemon {
  constructor() {
    super(PKM.CARVANHA, 'carvanha',[TYPE.WATER, TYPE.DARK], RARITY.SUMMON, 'february', 318, '', 40, 4, 1, 1, 1, 'WATER/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.BITE);
  }
}

class Houndour extends Pokemon {
  constructor() {
    super(PKM.HOUNDOUR, 'malosse',[TYPE.FIRE, TYPE.DARK], RARITY.SUMMON, 'february', 228, '', 40, 4, 1, 1, 1, 'FIRE/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.BLAZE_KICK);
  }
}

class Swablu extends Pokemon {
  constructor() {
    super(PKM.SWABLU, 'tylton',[TYPE.FAIRY, TYPE.FLYING], RARITY.SUMMON, 'september', 333, '', 40, 4, 1, 1, 1, 'DRAGON/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.DRAGON_TAIL);
  }
}

class Magikarp extends Pokemon {
  constructor() {
    super(PKM.MAGIKARP, 'magicarpe',[TYPE.WATER], RARITY.NEUTRAL, 'NEUTRAL', 129, PKM.GYARADOS, 30, 1, 1, 1, 1, 'WATER/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.DEFAULT);
  }
}

class Gyarados extends Pokemon {
  constructor() {
    super(PKM.GYARADOS, 'léviator',[TYPE.WATER], RARITY.NEUTRAL, 'NEUTRAL', 130, '', 200, 20, 5, 1, 1, 'WATER/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.HYDRO_PUMP);
  }
}

class Rattata extends Pokemon {
  constructor() {
    super(PKM.RATTATA, 'ratatta',[TYPE.NORMAL], RARITY.NEUTRAL, 'NEUTRAL', 19, PKM.RATICATE, 30, 5, 1, 1, 1, 'NORMAL/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.DEFAULT);
  }
}

class Raticate extends Pokemon {
  constructor() {
    super(PKM.RATICATE, 'ratattac',[TYPE.NORMAL], RARITY.NEUTRAL, 'NEUTRAL', 20, '', 60, 7, 1, 1, 1, 'NORMAL/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.DEFAULT);
  }
}

class Spearow extends Pokemon {
  constructor() {
    super(PKM.SPEAROW, 'piafabec',[TYPE.FLYING, TYPE.NORMAL], RARITY.NEUTRAL, 'NEUTRAL', 21, '', 30, 5, 1, 1, 1, 'NORMAL/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.DEFAULT);
  }
}

class Fearow extends Pokemon {
  constructor() {
    super(PKM.FEAROW, 'rapasdepic',[TYPE.FLYING, TYPE.NORMAL], RARITY.NEUTRAL, 'NEUTRAL', 22, '', 60, 7, 1, 1, 1, 'NORMAL/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.DEFAULT);
  }
}

class Lugia extends Pokemon {
  constructor() {
    super(PKM.LUGIA, 'lugia',[TYPE.AQUATIC, TYPE.FLYING, TYPE.PSYCHIC], RARITY.MYTHICAL, 'NEUTRAL', 249, '', 300, 30, 5, 5, 4, 'FLYING/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.SILENCE);
  }
}

class Giratina extends Pokemon {
  constructor() {
    super(PKM.GIRATINA, 'giratina',[TYPE.DRAGON, TYPE.AMORPH], RARITY.MYTHICAL, 'NEUTRAL', 487, '', 300, 30, 5, 5, 2, 'GHOST/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.NIGHT_SLASH);
  }
}

class Zapdos extends Pokemon {
  constructor() {
    super(PKM.ZAPDOS, 'électhor',[TYPE.ELECTRIC, TYPE.FLYING], RARITY.MYTHICAL, 'NEUTRAL', 145, '', 200, 20, 3, 3, 2, 'ELECTRIC/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.CHARGE);
  }
}

class Moltres extends Pokemon {
  constructor() {
    super(PKM.MOLTRES, 'sulfura',[TYPE.FIRE, TYPE.FLYING], RARITY.MYTHICAL, 'NEUTRAL', 146, '', 200, 20, 3, 3, 2, 'FIRE/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.WHEEL_OF_FIRE);
  }
}

class Articuno extends Pokemon {
  constructor() {
    super(PKM.ARTICUNO, 'artikodin',[TYPE.ICE, TYPE.FLYING], RARITY.MYTHICAL, 'NEUTRAL', 144, '', 200, 20, 3, 3, 2, 'FLYING/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.FREEZE);
  }
}

class Dialga extends Pokemon {
  constructor() {
    super(PKM.DIALGA, 'dialga',[TYPE.METAL, TYPE.DRAGON], RARITY.MYTHICAL, 'NEUTRAL', 483, '', 300, 30, 5, 5, 2, 'FIRE/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.DRACO_METEOR);
  }
}

class Palkia extends Pokemon {
  constructor() {
    super(PKM.PALKIA, 'palkia',[TYPE.DRAGON, TYPE.WATER], RARITY.MYTHICAL, 'NEUTRAL', 484, '', 300, 30, 5, 5, 1, 'DRAGON/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.DRAGON_TAIL);
  }
}

class Suicune extends Pokemon {
  constructor() {
    super(PKM.SUICUNE, 'suicune',[TYPE.WATER, TYPE.ICE], RARITY.MYTHICAL, 'NEUTRAL', 245, '', 300, 30, 5, 5, 1, 'WATER/melee', ATTACK_TYPE.PHYSICAL, 3, 100, SPECIAL_SKILL.HYDRO_PUMP);
  }
}

class Raikou extends Pokemon {
  constructor() {
    super(PKM.RAIKOU, 'raikou',[TYPE.ELECTRIC, TYPE.FIELD], RARITY.MYTHICAL, 'NEUTRAL', 243, '', 300, 30, 5, 5, 1, 'ELECTRIC/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.THUNDER);
  }
}

class Entei extends Pokemon {
  constructor() {
    super(PKM.ENTEI, 'entei',[TYPE.FIRE, TYPE.FIELD], RARITY.MYTHICAL, 'NEUTRAL', 244, '', 300, 30, 5, 5, 1, 'FIRE/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.FIRE_BLAST);
  }
}

class Regice extends Pokemon {
  constructor() {
    super(PKM.REGICE, 'régice',[TYPE.ICE, TYPE.HUMAN], RARITY.MYTHICAL, 'NEUTRAL', 378, '', 200, 20, 6, 6, 1, 'ICE/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.ICICLE_CRASH);
  }
}

class Regirock extends Pokemon {
  constructor() {
    super(PKM.REGIROCK, 'régirock',[TYPE.MINERAL, TYPE.HUMAN], RARITY.MYTHICAL, 'NEUTRAL', 377, '', 200, 20, 6, 6, 1, 'ROCK/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.ROCK_SLIDE);
  }
}

class Registeel extends Pokemon {
  constructor() {
    super(PKM.REGISTEEL, 'régisteel',[TYPE.METAL, TYPE.HUMAN], RARITY.MYTHICAL, 'NEUTRAL', 379, '', 200, 20, 6, 6, 1, 'DRAGON/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.IRON_DEFENSE);
  }
}

class Regigigas extends Pokemon {
  constructor() {
    super(PKM.REGIGIGAS, 'régigigas',[TYPE.NORMAL, TYPE.MONSTER, TYPE.HUMAN], RARITY.MYTHICAL, 'NEUTRAL', 486, '', 300, 30, 5, 5, 1, 'DRAGON/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.IRON_TAIL);
  }
}

class Kyogre extends Pokemon {
  constructor() {
    super(PKM.KYOGRE, 'kyogre',[TYPE.WATER, TYPE.AQUATIC], RARITY.MYTHICAL, 'NEUTRAL', 382, '', 300, 30, 5, 5, 4, 'WATER/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.ORIGIN_PULSE);
  }
}

class Groudon extends Pokemon {
  constructor() {
    super(PKM.GROUDON, 'groudon',[TYPE.GROUND, TYPE.FIRE], RARITY.MYTHICAL, 'NEUTRAL', 383, '', 300, 30, 5, 5, 1, 'FIRE/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.HEAT_WAVE);
  }
}

class Rayquaza extends Pokemon {
  constructor() {
    super(PKM.RAYQUAZA, 'rayquaza',[TYPE.DRAGON, TYPE.FLYING], RARITY.MYTHICAL, 'NEUTRAL', 384, '', 300, 30, 5, 5, 1, 'DRAGON/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.DRACO_METEOR);
  }
}

class Eevee extends Pokemon {
  constructor() {
    super(PKM.EEVEE, 'évoli',[TYPE.NORMAL, TYPE.FIELD], RARITY.UNCOMMON, 'UNCOMMON', 133, '', 130, 5, 2, 2, 1, 'NORMAL/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.HAPPY_HOUR);
  }
}

class Vaporeon extends Pokemon {
  constructor() {
    super(PKM.VAPOREON, 'aquali',[TYPE.WATER, TYPE.FIELD], RARITY.UNCOMMON, 'UNCOMMON', 134, '', 130, 9, 1, 1, 2, 'WATER/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.HAPPY_HOUR);
  }
}

class Jolteon extends Pokemon {
  constructor() {
    super(PKM.JOLTEON, 'voltali',[TYPE.ELECTRIC, TYPE.FIELD], RARITY.UNCOMMON, 'UNCOMMON', 135, '', 130, 9, 1, 1, 2, 'ELECTRIC/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.HAPPY_HOUR);
  }
}

class Flareon extends Pokemon {
  constructor() {
    super(PKM.FLAREON, 'pyroli',[TYPE.FIRE, TYPE.FIELD], RARITY.UNCOMMON, 'UNCOMMON', 136, '', 130, 9, 3, 2, 1, 'FIRE/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.HAPPY_HOUR);
  }
}

class Espeon extends Pokemon {
  constructor() {
    super(PKM.ESPEON, 'mentali',[TYPE.PSYCHIC, TYPE.FIELD], RARITY.UNCOMMON, 'UNCOMMON', 196, '', 130, 9, 1, 1, 2, 'PSYCHIC/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.HAPPY_HOUR);
  }
}

class Umbreon extends Pokemon {
  constructor() {
    super(PKM.UMBREON, 'noctali',[TYPE.DARK, TYPE.FIELD], RARITY.UNCOMMON, 'UNCOMMON', 197, '', 130, 9, 3, 2, 1, 'DRAGON/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.HAPPY_HOUR);
  }
}

class Leafeon extends Pokemon {
  constructor() {
    super(PKM.LEAFEON, 'phylali',[TYPE.GRASS, TYPE.FLORA, TYPE.FIELD], RARITY.UNCOMMON, 'UNCOMMON', 470, '', 130, 9, 3, 2, 1, 'GRASS/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.HAPPY_HOUR);
  }
}

class Sylveon extends Pokemon {
  constructor() {
    super(PKM.SYLVEON, 'nymphali',[TYPE.FAIRY, TYPE.FIELD], RARITY.UNCOMMON, 'UNCOMMON', 700, '', 130, 9, 1, 1, 2, 'FAIRY/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.HAPPY_HOUR);
  }
}

class Glaceon extends Pokemon {
  constructor() {
    super(PKM.GLACEON, 'givrali',[TYPE.ICE, TYPE.FIELD], RARITY.UNCOMMON, 'december', 471, '', 130, 9, 1, 1, 2, 'ICE/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.HAPPY_HOUR);
  }
}

class Sandshrew extends Pokemon {
  constructor() {
    super(PKM.SANDSHREW, 'sabelette',[TYPE.GROUND, TYPE.FIELD], RARITY.NEUTRAL, 'NEUTRAL', 27, '', 70, 5, 1, 1, 1, 'NORMAL/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.DEFAULT);
  }
}

class Darkrai extends Pokemon {
  constructor() {
    super(PKM.DARKRAI, 'darkrai',[TYPE.DARK, TYPE.MONSTER, TYPE.AMORPH], RARITY.MYTHICAL, 'NEUTRAL', 491, '', 300, 30, 3, 3, 3, 'GHOST/range', ATTACK_TYPE.SPECIAL, 3, 100, SPECIAL_SKILL.DARK_PULSE);
  }
}

class Volcarona extends Pokemon {
  constructor() {
    super(PKM.VOLCARONA, 'pyrax',[TYPE.FIRE, TYPE.BUG], RARITY.MYTHICAL, 'february', 637, '', 200, 20, 3, 3, 3, 'PSYCHIC/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.FIRE_BLAST);
  }
}

class Landorus extends Pokemon {
  constructor() {
    super(PKM.LANDORUS, 'démétéros',[TYPE.GROUND, TYPE.FLYING], RARITY.MYTHICAL, 'february', 645, '', 200, 20, 3, 3, 2, 'FLYING/range', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.ROCK_SLIDE);
  }
}

class Thundurus extends Pokemon {
  constructor() {
    super(PKM.THUNDURUS, 'fulguris',[TYPE.ELECTRIC, TYPE.FLYING], RARITY.MYTHICAL, 'february', 642, '', 200, 20, 3, 3, 3, 'ELECTRIC/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.THUNDER);
  }
}

class Tornadus extends Pokemon {
  constructor() {
    super(PKM.TORNADUS, 'boréas',[TYPE.FLYING], RARITY.MYTHICAL, 'february', 641, '', 200, 20, 3, 3, 3, 'ELECTRIC/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.HURRICANE);
  }
}

class Keldeo extends Pokemon {
  constructor() {
    super(PKM.KELDEO, 'keldeo',[TYPE.WATER, TYPE.FIGHTING], RARITY.MYTHICAL, 'february', 647, '', 200, 20, 3, 3, 2, 'WATER/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.GUILLOTINE);
  }
}

class Terrakion extends Pokemon {
  constructor() {
    super(PKM.TERRAKION, 'terrakium',[TYPE.MINERAL, TYPE.FIGHTING], RARITY.MYTHICAL, 'february', 639, '', 200, 20, 6, 6, 1, 'ROCK/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.ROCK_SLIDE);
  }
}

class Virizion extends Pokemon {
  constructor() {
    super(PKM.VIRIZION, 'viridium',[TYPE.GRASS, TYPE.FIGHTING], RARITY.MYTHICAL, 'february', 640, '', 200, 20, 6, 6, 1, 'GRASS/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.SEISMIC_TOSS);
  }
}

class Cobalion extends Pokemon {
  constructor() {
    super(PKM.COBALION, 'cobaltium',[TYPE.METAL, TYPE.FIGHTING], RARITY.MYTHICAL, 'february', 638, '', 200, 20, 6, 6, 1, 'FIGHTING/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.SEISMIC_TOSS);
  }
}

class Manaphy extends Pokemon {
  constructor() {
    super(PKM.MANAPHY, 'manaphy',[TYPE.WATER, TYPE.BUG], RARITY.MYTHICAL, 'february', 490, '', 200, 20, 3, 3, 3, 'PSYCHIC/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.NASTY_PLOT);
  }
}

class Rotom extends Pokemon {
  constructor() {
    super(PKM.ROTOM, 'motisma',[TYPE.ELECTRIC, TYPE.AMORPH], RARITY.MYTHICAL, 'february', 479, '', 200, 12, 3, 3, 3, 'ELECTRIC/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.CALM_MIND);
  }
}

class Spiritomb extends Pokemon {
  constructor() {
    super(PKM.SPIRITOMB, 'spiritomb',[TYPE.DARK, TYPE.AMORPH], RARITY.MYTHICAL, 'february', 442, '', 200, 20, 3, 3, 3, 'GHOST/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.NIGHT_SLASH);
  }
}

class Absol extends Pokemon {
  constructor() {
    super(PKM.ABSOL, 'absol',[TYPE.DARK, TYPE.FIELD], RARITY.MYTHICAL, 'february', 359, '', 250, 20, 6, 6, 1, 'DRAGON/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.THIEF);
  }
}

class Lapras extends Pokemon {
  constructor() {
    super(PKM.LAPRAS, 'lokhlass',[TYPE.WATER, TYPE.ICE], RARITY.MYTHICAL, 'february', 131, '', 250, 20, 6, 6, 1, 'WATER/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.SOAK);
  }
}

class Latias extends Pokemon {
  constructor() {
    super(PKM.LATIAS, 'latias',[TYPE.PSYCHIC, TYPE.DRAGON], RARITY.MYTHICAL, 'february', 380, '', 200, 20, 3, 3, 3, 'FIRE/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.DRACO_METEOR);
  }
}

class Latios extends Pokemon {
  constructor() {
    super(PKM.LATIOS, 'latios',[TYPE.PSYCHIC, TYPE.DRAGON], RARITY.MYTHICAL, 'february', 381, '', 200, 20, 3, 3, 3, 'FIRE/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.DRACO_METEOR);
  }
}

class Uxie extends Pokemon {
  constructor() {
    super(PKM.UXIE, 'créhelf',[TYPE.PSYCHIC, TYPE.FAIRY], RARITY.MYTHICAL, 'february', 480, '', 200, 12, 3, 3, 3, 'PSYCHIC/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.CALM_MIND);
  }
}

class Mesprit extends Pokemon {
  constructor() {
    super(PKM.MESPRIT, 'créfollet',[TYPE.PSYCHIC, TYPE.FAIRY], RARITY.MYTHICAL, 'february', 481, '', 200, 12, 3, 3, 3, 'PSYCHIC/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.CALM_MIND);
  }
}

class Azelf extends Pokemon {
  constructor() {
    super(PKM.AZELF, 'créfadet',[TYPE.PSYCHIC, TYPE.FAIRY], RARITY.MYTHICAL, 'february', 482, '', 200, 12, 3, 3, 3, 'PSYCHIC/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.CALM_MIND);
  }
}

class Mewtwo extends Pokemon {
  constructor() {
    super(PKM.MEWTWO, 'mewtwo',[TYPE.PSYCHIC, TYPE.MONSTER], RARITY.MYTHICAL, 'february', 150, '', 300, 30, 5, 5, 3, 'PSYCHIC/range', ATTACK_TYPE.TRUE, 2, 100, SPECIAL_SKILL.TORMENT);
  }
}

class Kyurem extends Pokemon {
  constructor() {
    super(PKM.KYUREM, 'kyurem',[TYPE.DRAGON, TYPE.MONSTER, TYPE.ICE], RARITY.MYTHICAL, 'february', 646, '', 300, 30, 5, 5, 3, 'FIRE/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.FREEZE);
  }
}

class Reshiram extends Pokemon {
  constructor() {
    super(PKM.RESHIRAM, 'reshiram',[TYPE.DRAGON, TYPE.FIRE], RARITY.MYTHICAL, 'february', 643, '', 300, 30, 5, 5, 3, 'FIRE/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.BURN);
  }
}

class Zekrom extends Pokemon {
  constructor() {
    super(PKM.ZEKROM, 'zekrom',[TYPE.DRAGON, TYPE.ELECTRIC], RARITY.MYTHICAL, 'february', 644, '', 300, 30, 5, 5, 3, 'ELECTRIC/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.THUNDER);
  }
}

class Celebi extends Pokemon {
  constructor() {
    super(PKM.CELEBI, 'celebi',[TYPE.GRASS, TYPE.PSYCHIC], RARITY.MYTHICAL, 'february', 251, '', 300, 30, 5, 5, 3, 'GRASS/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.LEECH_LIFE);
  }
}

class Victini extends Pokemon {
  constructor() {
    super(PKM.VICTINI, 'victini',[TYPE.FIRE, TYPE.PSYCHIC], RARITY.MYTHICAL, 'february', 494, '', 300, 30, 5, 5, 3, 'FIRE/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.BURN);
  }
}

class Jirachi extends Pokemon {
  constructor() {
    super(PKM.JIRACHI, 'jirachi',[TYPE.METAL, TYPE.PSYCHIC], RARITY.MYTHICAL, 'february', 385, '', 300, 30, 5, 5, 3, 'PSYCHIC/range', ATTACK_TYPE.SPECIAL, 2, 50, SPECIAL_SKILL.WISH);
  }
}

class Arceus extends Pokemon {
  constructor() {
    super(PKM.ARCEUS, 'arceus',[TYPE.NORMAL, TYPE.FIELD], RARITY.MYTHICAL, 'february', 493, '', 300, 30, 5, 5, 1, 'DRAGON/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.HAPPY_HOUR);
  }
}

class Deoxys extends Pokemon {
  constructor() {
    super(PKM.DEOXYS, 'deoxys',[TYPE.PSYCHIC, TYPE.HUMAN], RARITY.MYTHICAL, 'february', 386, '', 300, 30, 5, 5, 1, 'PSYCHIC/range', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.PROTECT);
  }
}

class Shaymin extends Pokemon {
  constructor() {
    super(PKM.SHAYMIN, 'shaymin',[TYPE.GRASS, TYPE.FLORA], RARITY.MYTHICAL, 'february', 492, '', 300, 30, 5, 5, 3, 'GRASS/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.SEED_FLARE);
  }
}

class Cresselia extends Pokemon {
  constructor() {
    super(PKM.CRESSELIA, 'cresselia',[TYPE.PSYCHIC, TYPE.FAIRY], RARITY.MYTHICAL, 'february', 488, '', 300, 30, 5, 5, 3, 'PSYCHIC/range', ATTACK_TYPE.SPECIAL, 2, 50, SPECIAL_SKILL.WISH);
  }
}

class Heatran extends Pokemon {
  constructor() {
    super(PKM.HEATRAN, 'heatran',[TYPE.FIRE, TYPE.METAL], RARITY.MYTHICAL, 'february', 485, '', 300, 30, 5, 5, 3, 'FIRE/range', ATTACK_TYPE.SPECIAL, 2, 100, SPECIAL_SKILL.BURN);
  }
}

class HooH extends Pokemon {
  constructor() {
    super(PKM.HOOH, 'ho-Oh',[TYPE.FIRE, TYPE.FLYING], RARITY.MYTHICAL, 'february', 250, '', 300, 30, 5, 5, 3, 'FIRE/range', ATTACK_TYPE.SPECIAL, 1, 100, SPECIAL_SKILL.BURN);
  }
}

class PrimalGroudon extends Pokemon {
  constructor() {
    super(PKM.PRIMALGROUDON, 'Primo-Groudon',[TYPE.GROUND, TYPE.FIRE], RARITY.MYTHICAL, 'february', 3830, '', 400, 40, 10, 10, 1, 'FIRE/melee', ATTACK_TYPE.TRUE, 3, 100, SPECIAL_SKILL.BURN);
  }
}

class PrimalKyogre extends Pokemon {
  constructor() {
    super(PKM.PRIMALKYOGRE, 'Primo-Kyogre',[TYPE.WATER, TYPE.ELECTRIC, TYPE.AQUATIC], RARITY.MYTHICAL, 'february', 3820, '', 400, 40, 5, 5, 3, 'WATER/range', ATTACK_TYPE.TRUE, 3, 100, SPECIAL_SKILL.THUNDER);
  }
}

class MegaRayquaza extends Pokemon {
  constructor() {
    super(PKM.MEGARAYQUAZA, 'Mega-Rayquaza',[TYPE.DRAGON, TYPE.FLYING], RARITY.MYTHICAL, 'september', 3840, '', 400, 40, 5, 5, 3, 'FIRE/range', ATTACK_TYPE.TRUE, 3, 100, SPECIAL_SKILL.DRACO_METEOR);
  }
}

class Meowth extends Pokemon {
  constructor() {
    super(PKM.MEOWTH, 'miaouss',[], RARITY.NEUTRAL, 'february', 52, '', 100, 10, 2, 2, 1, 'NORMAL/melee', ATTACK_TYPE.PHYSICAL, 1, 100, SPECIAL_SKILL.DEFAULT);
  }
}

class Persian extends Pokemon {
  constructor() {
    super(PKM.PERSIAN, 'persian',[], RARITY.NEUTRAL, 'february', 53, '', 100, 10, 2, 2, 1, 'NORMAL/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.DEFAULT);
  }
}

class Oddish extends Pokemon {
  constructor() {
    super(PKM.ODDISH, 'mystherbe',[TYPE.POISON, TYPE.GRASS], RARITY.SUMMON, 'september', 43, PKM.GLOOM, 120, 9, 2, 2, 2, 'GRASS/range', ATTACK_TYPE.TRUE, 1, 100, SPECIAL_SKILL.ROOT);
  }
}

class Gloom extends Pokemon {
  constructor() {
    super(PKM.GLOOM, 'ortide',[TYPE.POISON, TYPE.GRASS], RARITY.SUMMON, 'september', 44, PKM.VILEPLUME, 230, 18, 3, 3, 2, 'GRASS/range', ATTACK_TYPE.TRUE, 2, 100, SPECIAL_SKILL.ROOT);
  }
}

class Vileplume extends Pokemon {
  constructor() {
    super(PKM.VILEPLUME, 'rafflesia',[TYPE.POISON, TYPE.GRASS], RARITY.SUMMON, 'september', 45, '', 360, 27, 4, 4, 2, 'GRASS/range', ATTACK_TYPE.TRUE, 3, 100, SPECIAL_SKILL.ROOT);
  }
}

class Bellossom extends Pokemon {
  constructor() {
    super(PKM.BELLOSSOM, 'joliflor',[TYPE.POISON, TYPE.GRASS], RARITY.SUMMON, 'september', 182, '', 360, 27, 8, 8, 2, 'GRASS/range', ATTACK_TYPE.TRUE, 3, 100, SPECIAL_SKILL.ROOT);
  }
}

class Amaura extends Pokemon {
  constructor() {
    super(PKM.AMAURA, 'amaura',[TYPE.FOSSIL, TYPE.ICE], RARITY.LEGENDARY, 'fossil', 43, PKM.AURORUS, 120, 9, 2, 2, 2, 'GRASS/range', ATTACK_TYPE.TRUE, 1, 100, SPECIAL_SKILL.ROOT);
  }
}

class Aurorus extends Pokemon {
  constructor() {
    super(PKM.AURORUS, 'aurorus',[TYPE.FOSSIL, TYPE.ICE], RARITY.LEGENDARY, 'fossil', 43, '', 120, 9, 2, 2, 2, 'GRASS/range', ATTACK_TYPE.TRUE, 1, 100, SPECIAL_SKILL.ROOT);
  }
}

class Anorith extends Pokemon {
  constructor() {
    super(PKM.ANORITH, 'anorith',[TYPE.FOSSIL, TYPE.BUG], RARITY.LEGENDARY, 'fossil', 43, PKM.ARMALDO, 120, 9, 2, 2, 2, 'GRASS/range', ATTACK_TYPE.TRUE, 1, 100, SPECIAL_SKILL.ROOT);
  }
}

class Armaldo extends Pokemon {
  constructor() {
    super(PKM.ARMALDO, 'armaldo',[TYPE.FOSSIL, TYPE.BUG], RARITY.LEGENDARY, 'fossil', 43, '', 120, 9, 2, 2, 2, 'GRASS/range', ATTACK_TYPE.TRUE, 1, 100, SPECIAL_SKILL.ROOT);
  }
}

class Archen extends Pokemon {
  constructor() {
    super(PKM.ARCHEN, 'aéroptéri',[TYPE.FOSSIL, TYPE.FLYING], RARITY.LEGENDARY, 'fossil', 43, PKM.ARCHEOPS, 120, 9, 2, 2, 2, 'GRASS/range', ATTACK_TYPE.TRUE, 1, 100, SPECIAL_SKILL.ROOT);
  }
}

class Archeops extends Pokemon {
  constructor() {
    super(PKM.ARCHEOPS, 'aéroptéryx',[TYPE.FOSSIL, TYPE.FLYING], RARITY.LEGENDARY, 'fossil', 43, '', 120, 9, 2, 2, 2, 'GRASS/range', ATTACK_TYPE.TRUE, 1, 100, SPECIAL_SKILL.ROOT);
  }
}

class Shieldon extends Pokemon {
  constructor() {
    super(PKM.SHIELDON, 'dinoclier',[TYPE.FOSSIL, TYPE.METAL], RARITY.LEGENDARY, 'fossil', 43, PKM.BASTIODON, 120, 9, 2, 2, 2, 'GRASS/range', ATTACK_TYPE.TRUE, 1, 100, SPECIAL_SKILL.ROOT);
  }
}

class Bastiodon extends Pokemon {
  constructor() {
    super(PKM.BASTIODON, 'bastiodon',[TYPE.FOSSIL, TYPE.METAL], RARITY.LEGENDARY, 'fossil', 43, '', 120, 9, 2, 2, 2, 'GRASS/range', ATTACK_TYPE.TRUE, 1, 100, SPECIAL_SKILL.ROOT);
  }
}

class Tirtouga extends Pokemon {
  constructor() {
    super(PKM.TIRTOUGA, 'tirtouga',[TYPE.FOSSIL, TYPE.WATER], RARITY.LEGENDARY, 'fossil', 43, PKM.CARRACOSTA, 120, 9, 2, 2, 2, 'GRASS/range', ATTACK_TYPE.TRUE, 1, 100, SPECIAL_SKILL.ROOT);
  }
}

class Carracosta extends Pokemon {
  constructor() {
    super(PKM.CARRACOSTA, 'carracosta',[TYPE.FOSSIL, TYPE.WATER], RARITY.LEGENDARY, 'fossil', 43, '', 120, 9, 2, 2, 2, 'GRASS/range', ATTACK_TYPE.TRUE, 1, 100, SPECIAL_SKILL.ROOT);
  }
}

class Lileep extends Pokemon {
  constructor() {
    super(PKM.LILEEP, 'lilia',[TYPE.FOSSIL, TYPE.GRASS], RARITY.LEGENDARY, 'fossil', 43, PKM.CRADILY, 120, 9, 2, 2, 2, 'GRASS/range', ATTACK_TYPE.TRUE, 1, 100, SPECIAL_SKILL.ROOT);
  }
}

class Cradily extends Pokemon {
  constructor() {
    super(PKM.CRADILY, 'vacylis',[TYPE.FOSSIL, TYPE.GRASS], RARITY.LEGENDARY, 'fossil', 43, '', 120, 9, 2, 2, 2, 'GRASS/range', ATTACK_TYPE.TRUE, 1, 100, SPECIAL_SKILL.ROOT);
  }
}

class Cranidos extends Pokemon {
  constructor() {
    super(PKM.CRANIDOS, 'kranidos',[TYPE.FOSSIL, TYPE.MONSTER], RARITY.LEGENDARY, 'fossil', 43, PKM.RAMPARDOS, 120, 9, 2, 2, 2, 'GRASS/range', ATTACK_TYPE.TRUE, 1, 100, SPECIAL_SKILL.ROOT);
  }
}

class Rampardos extends Pokemon {
  constructor() {
    super(PKM.RAMPARDOS, 'charkos',[TYPE.FOSSIL, TYPE.MONSTER], RARITY.LEGENDARY, 'fossil', 43, '', 120, 9, 2, 2, 2, 'GRASS/range', ATTACK_TYPE.TRUE, 1, 100, SPECIAL_SKILL.ROOT);
  }
}

class Kabuto extends Pokemon {
  constructor() {
    super(PKM.KABUTO, 'kabuto',[TYPE.FOSSIL, TYPE.WATER], RARITY.LEGENDARY, 'fossil', 43, PKM.KABUTOPS, 120, 9, 2, 2, 2, 'GRASS/range', ATTACK_TYPE.TRUE, 1, 100, SPECIAL_SKILL.ROOT);
  }
}

class Kabutops extends Pokemon {
  constructor() {
    super(PKM.KABUTOPS, 'kabutops',[TYPE.FOSSIL, TYPE.WATER], RARITY.LEGENDARY, 'fossil', 43, '', 120, 9, 2, 2, 2, 'GRASS/range', ATTACK_TYPE.TRUE, 1, 100, SPECIAL_SKILL.ROOT);
  }
}

class Omanyte extends Pokemon {
  constructor() {
    super(PKM.OMANYTE, 'omanyte',[TYPE.FOSSIL, TYPE.WATER], RARITY.LEGENDARY, 'fossil', 43, PKM.OMASTAR, 120, 9, 2, 2, 2, 'GRASS/range', ATTACK_TYPE.TRUE, 1, 100, SPECIAL_SKILL.ROOT);
  }
}

class Omastar extends Pokemon {
  constructor() {
    super(PKM.OMASTAR, 'omastar',[TYPE.FOSSIL, TYPE.WATER], RARITY.LEGENDARY, 'fossil', 43, '', 120, 9, 2, 2, 2, 'GRASS/range', ATTACK_TYPE.TRUE, 1, 100, SPECIAL_SKILL.ROOT);
  }
}

class Tyrunt extends Pokemon {
  constructor() {
    super(PKM.TYRUNT, 'ptyranidur',[TYPE.FOSSIL, TYPE.DRAGON], RARITY.LEGENDARY, 'fossil', 43, PKM.TYRANTRUM, 120, 9, 2, 2, 2, 'GRASS/range', ATTACK_TYPE.TRUE, 1, 100, SPECIAL_SKILL.ROOT);
  }
}

class Tyrantrum extends Pokemon {
  constructor() {
    super(PKM.TYRANTRUM, 'rexilius',[TYPE.FOSSIL, TYPE.DRAGON], RARITY.LEGENDARY, 'fossil', 43, '', 120, 9, 2, 2, 2, 'GRASS/range', ATTACK_TYPE.TRUE, 1, 100, SPECIAL_SKILL.ROOT);
  }
}

class Aerodactyl extends Pokemon {
  constructor() {
    super(PKM.AERODACTYL, 'ptéra',[TYPE.FOSSIL, TYPE.FLYING], RARITY.LEGENDARY, 'february', 142, '', 200, 20, 6, 6, 1, 'ROCK/melee', ATTACK_TYPE.PHYSICAL, 2, 100, SPECIAL_SKILL.ROCK_SLIDE);
  }
}


schema.defineTypes(Pokemon, {
  id: 'string',
  name: 'string',
  types: ['string'],
  rarity: 'string',
  sheet: 'string',
  index: 'uint16',
  evolution: 'string',
  positionX: 'uint8',
  positionY: 'uint8',
  cost: 'uint8',
  attackSprite: 'string',
  atkSpeed: 'uint16',
  def: 'uint8',
  speDef: 'uint8',
  attackType: 'string',
  atk: 'uint8',
  hp: 'uint16',
  range: 'uint8',
  stars: 'uint8',
  maxMana: 'uint8',
  skill: 'string',
  items: Items,
  frenchName:'string'
});

module.exports = {
  Pokemon,
  Ditto,
  Bulbasaur,
  Ivysaur,
  Venusaur,
  Charmander,
  Charmeleon,
  Charizard,
  Squirtle,
  Wartortle,
  Blastoise,
  Geodude,
  Graveler,
  Golem,
  Azurill,
  Marill,
  Azumarill,
  Zubat,
  Golbat,
  Crobat,
  Mareep,
  Flaffy,
  Ampharos,
  Cleffa,
  Clefairy,
  Clefable,
  Igglybuff,
  Wigglytuff,
  Jigglypuff,
  Caterpie,
  Metapod,
  Butterfree,
  Weedle,
  Kakuna,
  Beedrill,
  Pidgey,
  Pidgeotto,
  Pidgeot,
  Hoppip,
  Skiploom,
  Jumpluff,
  Seedot,
  Nuzleaf,
  Shiftry,
  Starly,
  Staravia,
  Staraptor,
  Chikorita,
  Bayleef,
  Meganium,
  Cyndaquil,
  Quilava,
  Typhlosion,
  Totodile,
  Croconaw,
  Feraligatr,
  Treecko,
  Grovyle,
  Sceptile,
  Torchic,
  Combusken,
  Blaziken,
  Mudkip,
  Marshtomp,
  Swampert,
  Turtwig,
  Grotle,
  Torterra,
  Chimchar,
  Monferno,
  Infernape,
  Piplup,
  Prinplup,
  Empoleon,
  NidoranF,
  Nidorina,
  Nidoqueen,
  NidoranM,
  Nidorino,
  Nidoking,
  Pichu,
  Pikachu,
  Raichu,
  Machop,
  Machoke,
  Machamp,
  Horsea,
  Seadra,
  Kingdra,
  Trapinch,
  Vibrava,
  Flygon,
  Spheal,
  Sealeo,
  Walrein,
  Aron,
  Lairon,
  Aggron,
  Magnemite,
  Magneton,
  Magnezone,
  Rhyhorn,
  Rhydon,
  Rhyperior,
  Togepi,
  Togetic,
  Togekiss,
  Duskull,
  Dusclops,
  Dusknoir,
  Lotad,
  Lombre,
  Ludicolo,
  Shinx,
  Luxio,
  Luxray,
  Poliwag,
  Poliwhirl,
  Politoed,
  Abra,
  Kadabra,
  Alakazam,
  Gastly,
  Haunter,
  Gengar,
  Dratini,
  Dragonair,
  Dragonite,
  Larvitar,
  Pupitar,
  Tyranitar,
  Slakoth,
  Vigoroth,
  Slaking,
  Ralts,
  Kirlia,
  Gardevoir,
  Bagon,
  Shelgon,
  Salamence,
  Beldum,
  Metang,
  Metagross,
  Gible,
  Gabite,
  Garchomp,
  Elekid,
  Electabuzz,
  Electivire,
  Magby,
  Magmar,
  Magmortar,
  Munchlax,
  Snorlax,
  Growlithe,
  Arcanine,
  Onix,
  Steelix,
  MegaSteelix,
  Scyther,
  Scizor,
  MegaScizor,
  Riolu,
  Lucario,
  MegaLucario,
  Magikarp,
  Rattata,
  Raticate,
  Spearow,
  Fearow,
  Gyarados,
  Lugia,
  Giratina,
  Zapdos,
  Moltres,
  Articuno,
  Dialga,
  Palkia,
  Suicune,
  Raikou,
  Entei,
  Regice,
  Regirock,
  Registeel,
  Kyogre,
  Groudon,
  Rayquaza,
  Regigigas,
  Eevee,
  Vaporeon,
  Jolteon,
  Flareon,
  Espeon,
  Umbreon,
  Leafeon,
  Sylveon,
  Meditite,
  Medicham,
  MegaMedicham,
  Numel,
  Camerupt,
  MegaCamerupt,
  Sandshrew,
  Darkrai,
  Litwick,
  Lampent,
  Chandelure,
  Slowpoke,
  Slowbro,
  Slowking,
  Bellsprout,
  Weepinbell,
  Victreebel,
  Swinub,
  Piloswine,
  Mamoswine,
  Snorunt,
  Glalie,
  Froslass,
  Snover,
  Abomasnow,
  MegaAbomasnow,
  Vanillite,
  Vanillish,
  Vanilluxe,
  Glaceon,
  Volcarona,
  Landorus,
  Thundurus,
  Tornadus,
  Keldeo,
  Terrakion,
  Virizion,
  Cobalion,
  Manaphy,
  Rotom,
  Spiritomb,
  Absol,
  Lapras,
  Latias,
  Latios,
  Mesprit,
  Azelf,
  Uxie,
  Mewtwo,
  Kyurem,
  Reshiram,
  Zekrom,
  Celebi,
  Victini,
  Jirachi,
  Arceus,
  Deoxys,
  Shaymin,
  Cresselia,
  Heatran,
  HooH,
  Aerodactyl,
  Houndour,
  Carvanha,
  PrimalGroudon,
  PrimalKyogre,
  Meowth,
  Persian,
  Deino,
  Zweilous,
  Hydreigon,
  Sandile,
  Krookorok,
  Krookodile,
  Solosis,
  Duosion,
  Reuniclus,
  MegaRayquaza,
  Swablu,
  Oddish,
  Gloom,
  Vileplume,
  Bellossom,
  Amaura,
  Aurorus,
  Anorith,
  Archen,
  Archeops,
  Armaldo,
  Bastiodon,
  Carracosta,
  Cradily,
  Cranidos,
  Kabuto,
  Kabutops,
  Lileep,
  Omanyte,
  Omastar,
  Rampardos,
  Shieldon,
  Tirtouga,
  Tyrantrum,
  Tyrunt
};
