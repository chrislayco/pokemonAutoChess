import {TYPE, EFFECTS, ITEM} from '../models/enum';
import { AttackType } from '../types/enum/Game';
import Board from './board';
import PokemonEntity from './pokemon-entity';
import PokemonState from './pokemon-state';

export class AttackStrategy {
  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    pokemon.setMana(0);
    pokemon.count.ult += 1;
    if (pokemon.types.includes(TYPE.MONSTER) && pokemon.shield <= 0) {
      let shield = 0;
      if (pokemon.effects.includes(EFFECTS.PURSUIT)) {
        shield = Math.floor(pokemon.hp * 0.2);
      } else if (pokemon.effects.includes(EFFECTS.BRUTAL_SWING)) {
        shield = Math.floor(pokemon.hp * 0.3);
      } else if (pokemon.effects.includes(EFFECTS.POWER_TRIP)) {
        shield = Math.floor(pokemon.hp * 0.4);
      }
      if (shield > 0 && !pokemon.status.temporaryShield) {
        pokemon.status.triggerShield(4000);
        pokemon.handleShield(shield, pokemon);
      }
    }
    if (pokemon.types.includes(TYPE.SOUND)) {
      let atk = 0;
      if (pokemon.effects.includes(EFFECTS.LARGO)) {
        atk += 3;
      } else if (pokemon.effects.includes(EFFECTS.ALLEGRO)) {
        atk += 5;
      } else if (pokemon.effects.includes(EFFECTS.PRESTO)) {
        atk += 7;
      }
      if (atk > 0) {
        board.forEach((x: number, y: number, tg: PokemonEntity) => {
          if (tg && pokemon.team == tg.team && tg.types.includes(TYPE.SOUND)) {
            tg.count.soundCount ++;
            tg.atk += atk;
          }
        });
      }
    }
    board.forEach((r: number, c: number, value: PokemonEntity) => {
      if (value !== undefined && value.team != pokemon.team && value.items.has(ITEM.WATER_INCENSE)) {
        pokemon.count.incenseCount ++;
        pokemon.handleDamage(Math.ceil(value.maxMana * 0.2), board, AttackType.SPECIAL, value);
      }
    });
    if (pokemon.items.has(ITEM.AQUA_EGG)) {
      pokemon.setMana(pokemon.mana + 20);
    }
  }
}

export class KingShieldStrategy extends AttackStrategy {
  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let timer = 0;
    switch (pokemon.stars) {
      case 1:
        timer = 750;
        break;
      case 2:
        timer = 1500;
        break;
      case 3:
        timer = 3000;
        break;
      default:
        break;
    }
    pokemon.status.triggerProtect(timer);
    const farthestTarget = state.getFarthestTargetCoordinate(pokemon, board);
    const x = farthestTarget[0];
    const y = farthestTarget[1];
    const oldX = pokemon.positionX;
    const oldY = pokemon.positionY;

    if (x !== undefined && y !== undefined) {
      const tg = board.getValue(x, y);

      if (tg) {
        tg.positionX = oldX;
        tg.positionY = oldY;
      }
      board.swapValue(pokemon.positionX, pokemon.positionY, x, y);
      pokemon.positionX = x;
      pokemon.positionY = y;
    }
  }
}

export class ExplosionStrategy extends AttackStrategy {
  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let damage = 0;
    switch (pokemon.stars) {
      case 1:
        damage = 40;
        break;
      case 2:
        damage = 80;
        break;
      case 3:
        damage = 160;
        break;
      default:
        break;
    }

    const cells = board.getAdjacentCells(pokemon.positionX, pokemon.positionY);

    cells.forEach((cell) => {
      if (cell.value && pokemon.team != cell.value.team) {
        cell.value.handleSpellDamage(damage, board, AttackType.PHYSICAL, pokemon);
      }
    });

    pokemon.handleSpellDamage(damage, board, AttackType.PHYSICAL, pokemon);
  }
}

export class ClangorousSoulStrategy extends AttackStrategy {
  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let buffAtk = 0;
    let buffDef = 0;
    switch (pokemon.stars) {
      case 1:
        buffAtk = 2;
        buffDef = 1;
        break;
      case 2:
        buffAtk = 4;
        buffDef = 2;
        break;
      case 3:
        buffAtk = 8;
        buffDef = 4;
        break;
      default:
        break;
    }

    const cells = board.getAdjacentCells(pokemon.positionX, pokemon.positionY);

    cells.forEach((cell) => {
      if (cell.value && pokemon.team == cell.value.team) {
        cell.value.atk += buffAtk;
        cell.value.def += buffDef;
        cell.value.speDef += buffDef;
      }
    });
  }
}

export class BonemerangStrategy extends AttackStrategy {
  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let damage = 0;
    switch (pokemon.stars) {
      case 1:
        damage = 30;
        break;
      case 2:
        damage = 60;
        break;
      case 3:
        damage = 120;
        break;
      default:
        break;
    }

    board.forEach((x: number, y: number, tg: PokemonEntity) => {
      if (tg && pokemon.team != tg.team && x == target.positionX) {
        tg.handleSpellDamage(damage, board, AttackType.PHYSICAL, pokemon);
      }
    });
  }
}

export class GrowlStrategy extends AttackStrategy {
  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let d = 0;
    switch (pokemon.stars) {
      case 1:
        d = 1000;
        break;
      case 2:
        d = 2000;
        break;
      case 3:
        d = 3000;
        break;
      default:
        break;
    }
    board.forEach((x: number, y: number, tg: PokemonEntity) => {
      if (tg && pokemon.team != tg.team) {
        tg.status.triggerWound(d);
      }
    });
  }
}

export class RelicSongStrategy extends AttackStrategy {
  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let d = 0;
    switch (pokemon.stars) {
      case 1:
        d = 500;
        break;
      case 2:
        d = 1000;
        break;
      case 3:
        d = 2000;
        break;
      default:
        break;
    }
    board.forEach((x: number, y: number, tg: PokemonEntity) => {
      if (tg && pokemon.team != tg.team) {
        tg.status.triggerSleep(d);
      }
    });
  }
}

export class DisarmingVoiceStrategy extends AttackStrategy {
  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let heal = 0;
    switch (pokemon.stars) {
      case 1:
        heal = 10;
        break;
      case 2:
        heal = 20;
        break;
      case 3:
        heal = 40;
        break;
      default:
        break;
    }
    board.forEach((x: number, y: number, tg: PokemonEntity) => {
      if (tg && pokemon.team == tg.team) {
        tg.setMana(tg.mana + heal);
      }
    });
  }
}
export class HighJumpKickStrategy extends AttackStrategy {
  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let damage = 0;
    switch (pokemon.stars) {
      case 1:
        damage = 50;
        break;
      case 2:
        damage = 100;
        break;
      case 3:
        damage = 200;
        break;
      default:
        break;
    }
    pokemon.setMana(target.mana);
    target.setMana(0);
    target.handleSpellDamage(damage, board, AttackType.PHYSICAL, pokemon);
  }
}

export class GrassWhistleStrategy extends AttackStrategy {
  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let n = 0;
    switch (pokemon.stars) {
      case 1:
        n = 1;
        break;
      case 2:
        n = 2;
        break;
      case 3:
        n = 4;
        break;
      default:
        break;
    }
    board.forEach((x: number, y: number, tg: PokemonEntity) => {
      if (tg && pokemon.team != tg.team && n > 0) {
        tg.status.triggerSleep(2000);
        n--;
      }
    });
  }
}


export class TriAttackStrategy extends AttackStrategy {
  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let duration = 0;
    switch (pokemon.stars) {
      case 1:
        duration = 2000;
        break;
      case 2:
        duration = 4000;
        break;
      case 3:
        duration = 8000;
        break;
      default:
        break;
    }
    target.status.triggerFreeze(duration);
    target.status.triggerWound(duration);
    target.status.triggerBurn(duration, target, pokemon);
  }
}

export class EchoStrategy extends AttackStrategy {
  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);

    let damage = 0;
    let additional = 0;

    switch (pokemon.stars) {
      case 1:
        damage = 5;
        additional = 3;
        break;
      case 2:
        damage = 10;
        additional = 6;
        break;
      case 3:
        damage = 20;
        additional = 9;
        break;
      default:
        break;
    }

    board.forEach((x: number, y: number, tg: PokemonEntity) => {
      if (tg && pokemon.team != tg.team) {
        tg.handleSpellDamage(damage + pokemon.echo * additional, board, AttackType.SPECIAL, pokemon);
      }
    });

    pokemon.echo ++;
  }
}

export class PetalDanceStrategy extends AttackStrategy {
  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);

    let damage = 0;
    let count = 0;

    switch (pokemon.stars) {
      case 1:
        damage = 30;
        count = 2;
        break;
      case 2:
        damage = 60;
        count = 3;
        break;
      case 3:
        damage = 90;
        count = 4;
        break;
      default:
        break;
    }

    board.forEach((x: number, y: number, tg: PokemonEntity) => {
      if (tg && pokemon.team != tg.team && count > 0) {
        tg.handleSpellDamage(damage, board, AttackType.SPECIAL, pokemon);
        count --;
        tg.count.petalDanceCount ++;
      }
    });
  }
}

export class HyperVoiceStrategy extends AttackStrategy {
  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);

    let damage = 0;
    let confusion = 0;

    switch (pokemon.stars) {
      case 1:
        damage = 50;
        confusion = 1;
        break;
      case 2:
        damage = 100;
        confusion = 2;
        break;
      case 3:
        damage = 200;
        confusion = 3;
        break;
      default:
        break;
    }

    board.forEach((x: number, y: number, tg: PokemonEntity) => {
      if (tg && pokemon.team != tg.team && target.positionY == y) {
        tg.handleSpellDamage(damage, board, AttackType.SPECIAL, pokemon);
        tg.status.triggerConfusion(confusion * 1000);
      }
    });
  }
}
export class ShadowCloneStrategy extends AttackStrategy {
  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    const farthestCoordinate = state.getFarthestTargetCoordinateAvailablePlace(pokemon, board);
    const x = farthestCoordinate[0];
    const y = farthestCoordinate[1];
    if (x !== undefined && y !== undefined) {
      const clone = pokemon.simulation.addPokemonEntity(pokemon, x, y, pokemon.team);
      clone.life = pokemon.life;
    }
  }
}

export class VoltSwitchStrategy extends AttackStrategy {
  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);

    let damage = 0;
    switch (pokemon.stars) {
      case 1:
        damage = 40;
        break;
      case 2:
        damage = 80;
        break;
      case 3:
        damage = 160;
        break;
      default:
        break;
    }

    const farthestCoordinate = state.getFarthestTargetCoordinateAvailablePlace(pokemon, board);
    const x = farthestCoordinate[0];
    const y = farthestCoordinate[1];

    const cells = board.getCellsBetween(pokemon.positionX, pokemon.positionY, x, y);
    cells.forEach((cell)=>{
      if (cell.value && cell.value != pokemon) {
        cell.value.handleSpellDamage(damage, board, AttackType.SPECIAL, pokemon);
      }
    });

    board.swapValue(pokemon.positionX, pokemon.positionY, x, y);
    pokemon.positionX = x;
    pokemon.positionY = y;
  }
}

export class HeadSmashStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);

    let d = 0;
    let recoil = 0;
    switch (pokemon.stars) {
      case 1:
        d = 40;
        recoil = 5;
        break;
      case 2:
        d = 80;
        recoil = 10;
        break;
      case 3:
        d = 150;
        recoil = 15;
        break;
      default:
        break;
    }
    if (target.status.sleep || target.status.freeze) {
      target.handleSpellDamage(target.life, board, AttackType.TRUE, pokemon);
    } else {
      target.handleSpellDamage(d, board, AttackType.PHYSICAL, pokemon);
    }
    pokemon.handleSpellDamage(recoil, board, AttackType.TRUE, pokemon);
  }
}

export class RockSmashStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);

    let d = 0;
    let s = 0;
    switch (pokemon.stars) {
      case 1:
        d = 20;
        s = 3000;
        break;
      case 2:
        d = 40;
        s = 6000;
        break;
      case 3:
        d = 60;
        s= 9000;
        break;
      default:
        break;
    }

    target.handleSpellDamage(d, board, AttackType.PHYSICAL, pokemon);
    target.status.triggerSilence(s);
  }
}

export class RockTombStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);

    let factor=0;
    switch (pokemon.stars) {
      case 1:
        factor = 30;
        break;
      case 2:
        factor = 60;
        break;
      case 3:
        factor = 90;
        break;
      default:
        break;
    }

    target.handleSpellDamage(factor, board, AttackType.PHYSICAL, pokemon);
    target.handleAttackSpeed(-factor);
  }
}

export class RoarOfTimeStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);

    let candidate = pokemon;
    board.forEach((x: number, y: number, pkm: PokemonEntity) => {
      if (pkm && pokemon.team == pkm.team && pkm.items.size > candidate.items.size && !pkm.status.resurection) {
        candidate = pkm;
      }
    });

    candidate.status.resurection = true;
  }
}

export class HealBlockStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);

    let timer=0;
    switch (pokemon.stars) {
      case 1:
        timer = 5000;
        break;
      case 2:
        timer = 10000;
        break;
      case 3:
        timer = 15000;
        break;
      default:
        break;
    }
    const cells = board.getAdjacentCells(pokemon.positionX, pokemon.positionY);

    cells.forEach((cell) => {
      if (cell.value && pokemon.team != cell.value.team) {
        cell.value.status.triggerWound(timer);
      }
    });
  }
}


export class OriginPulseStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    const damage = 60;

    board.forEach((x: number, y: number, tg: PokemonEntity) => {
      if (tg && pokemon.team != tg.team && target.positionY == y) {
        tg.handleSpellDamage(damage, board, AttackType.SPECIAL, pokemon);
      }
    });
  }
}

export class SeedFlareStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    const damage = 30;

    board.forEach((x: number, y: number, tg: PokemonEntity) => {
      if (tg && pokemon.team != tg.team) {
        tg.speDef = Math.max(0, tg.speDef - 2);
        tg.handleSpellDamage(damage, board, AttackType.SPECIAL, pokemon);
      }
    });
  }
}

export class NightmareStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let timer = 0;
    switch (pokemon.stars) {
      case 1:
        timer = 2000;
        break;
      case 2:
        timer = 4000;
        break;
      case 3:
        timer = 8000;
        break;
      default:
        break;
    }
    board.forEach((x: number, y: number, value: PokemonEntity) => {
      if (value && pokemon.team != value.team) {
        value.status.triggerPoison(timer, value, pokemon);
      }
    });
  }
}

export class BurnStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let timer = 0;
    switch (pokemon.stars) {
      case 1:
        timer = 5000;
        break;
      case 2:
        timer = 10000;
        break;
      case 3:
        timer = 20000;
        break;
      default:
        break;
    }
    board.forEach((x: number, y: number, value: PokemonEntity) => {
      if (value && pokemon.team != value.team) {
        value.status.triggerBurn(timer, value, pokemon);
        value.status.triggerWound(timer);
      }
    });
  }
}

export class SilenceStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let timer = 0;
    switch (pokemon.stars) {
      case 1:
        timer = 2000;
        break;
      case 2:
        timer = 4000;
        break;
      case 3:
        timer = 8000;
        break;
      default:
        break;
    }
    board.forEach((x: number, y: number, value: PokemonEntity) => {
      if (value && pokemon.team != value.team) {
        value.status.triggerSilence(timer);
      }
    });
  }
}

export class PoisonStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let timer = 0;
    switch (pokemon.stars) {
      case 1:
        timer = 5000;
        break;
      case 2:
        timer = 10000;
        break;
      case 3:
        timer = 20000;
        break;
      default:
        break;
    }
    target.status.triggerPoison(timer, target, pokemon);
  }
}

export class FreezeStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let timer = 0;
    switch (pokemon.stars) {
      case 1:
        timer = 1000;
        break;
      case 2:
        timer = 2000;
        break;
      case 3:
        timer = 4000;
        break;
      default:
        break;
    }
    board.forEach((x: number, y: number, value: PokemonEntity) => {
      if (value && pokemon.team != value.team) {
        value.status.triggerFreeze(timer);
      }
    });
  }
}


export class ProtectStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let timer = 0;
    switch (pokemon.stars) {
      case 1:
        timer = 3000;
        break;
      case 2:
        timer = 5000;
        break;
      case 3:
        timer = 7000;
        break;
      default:
        break;
    }
    pokemon.status.triggerProtect(timer);
  }
}

export class SleepStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let timer = 0;
    switch (pokemon.stars) {
      case 1:
        timer = 3000;
        break;
      case 2:
        timer = 5000;
        break;
      case 3:
        timer = 7000;
        break;
      default:
        break;
    }
    target.status.triggerSleep(timer);
  }
}

export class ConfusionStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let timer = 0;
    switch (pokemon.stars) {
      case 1:
        timer = 500;
        break;
      case 2:
        timer = 1500;
        break;
      case 3:
        timer = 3000;
        break;
      default:
        break;
    }

    board.forEach((x: number, y: number, value: PokemonEntity) => {
      if (value && pokemon.team != value.team) {
        value.status.triggerConfusion(timer);
      }
    });
  }
}

export class FireBlastStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let damage = 0;
    switch (pokemon.stars) {
      case 1:
        damage = 30;
        break;
      case 2:
        damage = 50;
        break;
      case 3:
        damage = 100;
        break;
      default:
        break;
    }
    target.handleSpellDamage(damage, board, AttackType.SPECIAL, pokemon);
  }
}

export class SeismicTossStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let damage = 0;
    board.forEach((x: number, y: number, value: PokemonEntity) => {
      if (value && pokemon.team == value.team) {
        damage += pokemon.stars;
      }
    });
    damage = damage * 5;
    target.handleSpellDamage(damage, board, AttackType.TRUE, pokemon);
  }
}

export class GuillotineStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    const damage = pokemon.atk * pokemon.stars;
    const victim = target.handleSpellDamage(damage, board, AttackType.PHYSICAL, pokemon);
    if (victim) {
      pokemon.setMana(Math.floor(pokemon.maxMana / 2));
    }
  }
}

export class RockSlideStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let damage = 0;
    switch (pokemon.stars) {
      case 1:
        damage = 40;
        break;
      case 2:
        damage = 50;
        break;
      case 3:
        damage = 60;
        break;
      default:
        break;
    }
    if (target.types.includes(TYPE.FLYING)) {
      damage = damage * 2;
    }
    target.handleSpellDamage(damage, board, AttackType.PHYSICAL, pokemon);
  }
}

export class WheelOfFireStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let damage = 0;
    switch (pokemon.stars) {
      case 1:
        damage = 30;
        break;
      case 2:
        damage = 40;
        break;
      case 3:
        damage = 50;
        break;
      default:
        break;
    }
    const cells = board.getCellsBetween(pokemon.positionX, pokemon.positionY, target.positionX, target.positionY);
    cells.forEach((cell)=>{
      if (cell.value && cell.value != pokemon) {
        cell.value.handleSpellDamage(damage, board, AttackType.SPECIAL, pokemon);
      }
    });
  }
}

export class HeatWaveStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let damage = 0;
    switch (pokemon.stars) {
      case 1:
        damage = 30;
        break;
      case 2:
        damage = 40;
        break;
      case 3:
        damage = 50;
        break;
      default:
        break;
    }
    target.handleSpellDamage(damage, board, AttackType.PHYSICAL, pokemon);
    const secondTarget = board.getValue(target.positionX, target.positionY + 1);
    const thirdTarget = board.getValue(target.positionX, target.positionY + 2);
    if (secondTarget && secondTarget != pokemon) {
      secondTarget.handleSpellDamage(damage, board, AttackType.PHYSICAL, pokemon);
    }
    if (thirdTarget && thirdTarget != pokemon) {
      thirdTarget.handleSpellDamage(damage, board, AttackType.PHYSICAL, pokemon);
    }
  }
}

export class HydroPumpStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let damage = 0;
    switch (pokemon.stars) {
      case 1:
        damage = 30;
        break;
      case 2:
        damage = 40;
        break;
      case 3:
        damage = 50;
        break;
      default:
        break;
    }
    target.handleSpellDamage(damage, board, AttackType.SPECIAL, pokemon);
    const secondTarget = board.getValue(target.positionX, target.positionY + 1);
    if (secondTarget && secondTarget != pokemon) {
      secondTarget.handleSpellDamage(damage, board, AttackType.SPECIAL, pokemon);
    }
  }
}

export class ThunderStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let damage = 0;
    switch (pokemon.stars) {
      case 1:
        damage = 30;
        break;
      case 2:
        damage = 50;
        break;
      case 3:
        damage = 70;
        break;
      default:
        break;
    }
    target.handleSpellDamage(damage, board, AttackType.SPECIAL, pokemon);
  }
}

export class DracoMeteorStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let damage = 0;
    switch (pokemon.stars) {
      case 1:
        damage = 10;
        break;
      case 2:
        damage = 20;
        break;
      case 3:
        damage = 40;
        break;
      default:
        break;
    }
    board.forEach((x: number, y: number, tg: PokemonEntity) => {
      if (tg && pokemon.team != tg.team) {
        tg.handleSpellDamage(damage, board, AttackType.SPECIAL, pokemon);
      }
    });
  }
}

export class BlazeKickStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    const damage = 30 * pokemon.stars;
    target.handleSpellDamage(damage, board, AttackType.PHYSICAL, pokemon);
  }
}

export class WishStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    const heal = 50;
    let count = pokemon.stars;

    board.forEach((x: number, y: number, ally: PokemonEntity) => {
      if (ally && pokemon.team == ally.team && count > 0 && ally.life < ally.hp) {
        ally.handleHeal(heal, pokemon);
        count -= 1;
      }
    });
  }
}

export class CalmMindStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let buff = 0;
    switch (pokemon.stars) {
      case 1:
        buff = 0.5;
        break;
      case 2:
        buff = 1;
        break;
      case 3:
        buff = 1.5;
        break;
      default:
        break;
    }

    pokemon.atk += Math.ceil(pokemon.baseAtk * buff);
  }
}

export class IronDefenseStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let buff = 0;
    switch (pokemon.stars) {
      case 1:
        buff = 4;
        break;
      case 2:
        buff = 6;
        break;
      case 3:
        buff = 8;
        break;
      default:
        break;
    }
    pokemon.def += buff;
    pokemon.speDef += buff;
  }
}

export class SoakStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let damage = 0;
    switch (pokemon.stars) {
      case 1:
        damage = 20;
        break;
      case 2:
        damage = 30;
        break;
      case 3:
        damage = 40;
        break;
      default:
        break;
    }

    board.forEach((x: number, y: number, ally: PokemonEntity) => {
      if (ally && pokemon.team == ally.team) {
        ally.setMana(ally.mana + 10);
      }
    });

    target.handleSpellDamage(damage, board, AttackType.SPECIAL, pokemon);
  }
}

export class IronTailStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let damage = 0;
    let buff = 0;
    switch (pokemon.stars) {
      case 1:
        damage = 20;
        buff = 1;
        break;
      case 2:
        damage = 30;
        buff = 3;
        break;
      case 3:
        damage = 40;
        buff = 5;
        break;
      default:
        break;
    }
    pokemon.def += buff;
    target.handleSpellDamage(damage, board, AttackType.SPECIAL, pokemon);
  }
}

export class BlastBurnStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let damage = 0;

    switch (pokemon.stars) {
      case 1:
        damage = 30;
        break;
      case 2:
        damage = 50;
        break;
      case 3:
        damage = 80;
        break;
      default:
        break;
    }

    const cells = board.getAdjacentCells(pokemon.positionX, pokemon.positionY);

    cells.forEach((cell) => {
      if (cell.value && pokemon.team != cell.value.team) {
        cell.value.handleSpellDamage(damage, board, AttackType.SPECIAL, pokemon);
      }
    });
  }
}

export class ChargeStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let buff = 0;
    switch (pokemon.stars) {
      case 1:
        buff = 0.1;
        break;
      case 2:
        buff = 0.2;
        break;
      case 3:
        buff = 0.3;
        break;
      default:
        break;
    }

    board.forEach((x: number, y: number, ally: PokemonEntity) => {
      if (ally && pokemon.team == ally.team && ally.types.includes(TYPE.ELECTRIC)) {
        ally.atk += Math.ceil(pokemon.baseAtk * buff);
      }
    });
  }
}

export class DischargeStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let damage = 0;

    switch (pokemon.stars) {
      case 1:
        damage = 40;
        break;
      case 2:
        damage = 60;
        break;
      case 3:
        damage = 80;
        break;
      default:
        break;
    }

    const cells = board.getAdjacentCells(pokemon.positionX, pokemon.positionY);

    cells.forEach((cell) => {
      if (cell.value && pokemon.team != cell.value.team) {
        cell.value.handleSpellDamage(damage, board, AttackType.SPECIAL, pokemon);
      }
    });
  }
}

export class BiteStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let damage = 0;
    switch (pokemon.stars) {
      case 1:
        damage = 30;
        break;
      case 2:
        damage = 50;
        break;
      case 3:
        damage = 70;
        break;
      default:
        break;
    }
    target.handleSpellDamage(damage, board, AttackType.PHYSICAL, pokemon);
    pokemon.handleHeal(Math.floor(damage/2), pokemon);
  }
}

export class DragonTailStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let damage = 0;
    switch (pokemon.stars) {
      case 1:
        damage = 30;
        break;
      case 2:
        damage = 40;
        break;
      case 3:
        damage = 50;
        break;
      default:
        break;
    }
    target.handleSpellDamage(damage, board, AttackType.PHYSICAL, pokemon);
    pokemon.def += pokemon.stars;
    pokemon.speDef += pokemon.stars;
  }
}

export class DragonBreathStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let damage = 0;
    switch (pokemon.stars) {
      case 1:
        damage = 30;
        break;
      case 2:
        damage = 40;
        break;
      case 3:
        damage = 50;
        break;
      default:
        break;
    }
    target.handleSpellDamage(damage, board, AttackType.TRUE, pokemon);
    const secondTarget = board.getValue(target.positionX, target.positionY + 1);
    if (secondTarget && secondTarget != pokemon) {
      secondTarget.handleSpellDamage(damage, board, AttackType.TRUE, pokemon);
    }
  }
}

export class IcicleCrashStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let damage = 0;

    switch (pokemon.stars) {
      case 1:
        damage = 30;
        break;
      case 2:
        damage = 40;
        break;
      case 3:
        damage = 50;
        break;
      default:
        break;
    }

    const cells = board.getAdjacentCells(target.positionX, target.positionY);

    cells.forEach((cell) => {
      if (cell.value && pokemon.team != cell.value.team) {
        cell.value.handleSpellDamage(damage, board, AttackType.SPECIAL, pokemon);
      }
    });
  }
}

export class RootStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let heal = 0;

    switch (pokemon.stars) {
      case 1:
        heal = 20;
        break;
      case 2:
        heal = 30;
        break;
      case 3:
        heal = 40;
        break;
      default:
        break;
    }

    const cells = board.getAdjacentCells(pokemon.positionX, pokemon.positionY);
    pokemon.handleHeal(heal, pokemon);

    cells.forEach((cell) => {
      if (cell.value && pokemon.team == cell.value.team) {
        cell.value.handleHeal(heal, pokemon);
      }
    });
  }
}

export class TormentStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let boost = 1;

    switch (pokemon.stars) {
      case 1:
        boost = 20;
        break;
      case 2:
        boost = 30;
        break;
      case 3:
        boost = 40;
        break;
      default:
        break;
    }
    pokemon.handleAttackSpeed(boost);
  }
}

export class StompStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    const damage = pokemon.atk * pokemon.stars * 2;
    target.handleSpellDamage(damage, board, AttackType.PHYSICAL, pokemon);
  }
}

export class DarkPulseStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let damage = 0;
    switch (pokemon.stars) {
      case 1:
        damage = 30;
        break;
      case 2:
        damage = 50;
        break;
      case 3:
        damage = 70;
        break;
      default:
        break;
    }
    target.handleSpellDamage(damage, board, AttackType.SPECIAL, pokemon);
    pokemon.handleHeal(damage, pokemon);
  }
}

export class NightSlashStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let damage = 0;

    switch (pokemon.stars) {
      case 1:
        damage = 40;
        break;
      case 2:
        damage = 60;
        break;
      case 3:
        damage = 80;
        break;
      default:
        break;
    }

    target.handleSpellDamage(damage, board, AttackType.SPECIAL, pokemon);

    board.forEach((x: number, y: number, v: PokemonEntity) => {
      if (v && pokemon.team != v.team) {
        v.def = Math.max(0, v.def - 1);
      }
    });
  }
}

export class BugBuzzStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let damage = 0;

    switch (pokemon.stars) {
      case 1:
        damage = 20;
        break;
      case 2:
        damage = 30;
        break;
      case 3:
        damage = 40;
        break;
      default:
        break;
    }

    target.handleSpellDamage(damage, board, AttackType.TRUE, pokemon);
  }
}

export class PoisonStingStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let damage = 0;

    switch (pokemon.stars) {
      case 1:
        damage = 30;
        break;
      case 2:
        damage = 40;
        break;
      case 3:
        damage = 50;
        break;
      default:
        break;
    }
    if (pokemon.status.poison) {
      damage = damage * 2;
    }

    target.handleSpellDamage(damage, board, AttackType.PHYSICAL, pokemon);
  }
}

export class LeechLifeStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let damage = 0;

    switch (pokemon.stars) {
      case 1:
        damage = 10;
        break;
      case 2:
        damage = 20;
        break;
      case 3:
        damage = 30;
        break;
      default:
        break;
    }

    const cells = board.getAdjacentCells(target.positionX, target.positionY);

    cells.forEach((cell) => {
      if (cell.value && pokemon.team != cell.value.team) {
        cell.value.handleSpellDamage(damage, board, AttackType.SPECIAL, pokemon);
        pokemon.handleHeal(damage, pokemon);
      }
    });
  }
}

export class HappyHourStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let buff = 0;
    switch (pokemon.stars) {
      case 1:
        buff = 3;
        break;
      case 2:
        buff = 6;
        break;
      case 3:
        buff = 9;
        break;
      default:
        break;
    }
    board.forEach((x: number, y: number, ally: PokemonEntity) => {
      if (ally && pokemon.team == ally.team) {
        ally.atk += buff;
      }
    });
  }
}

export class TeleportStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);

    const potentialCells = [[0, 0], [0, 5], [7, 5], [7, 0]];
    this.shuffleArray(potentialCells);

    for (let i = 0; i < potentialCells.length; i++) {
      const entity = board.getValue(potentialCells[i][0], potentialCells[i][1]);
      if (entity === undefined) {
        board.swapValue(pokemon.positionX, pokemon.positionY, potentialCells[i][0], potentialCells[i][1]);
        pokemon.positionX = potentialCells[i][0];
        pokemon.positionY = potentialCells[i][1];
        break;
      }
    }
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

export class NastyPlotStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let buff = 0;
    switch (pokemon.stars) {
      case 1:
        buff = 5;
        break;
      case 2:
        buff = 10;
        break;
      case 3:
        buff = 20;
        break;
      default:
        break;
    }
    pokemon.atk += buff;
  }
}

export class ThiefStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let damage = 0;
    switch (pokemon.stars) {
      case 1:
        damage = 5;
        break;
      case 2:
        damage = 10;
        break;
      case 3:
        damage = 20;
        break;
      default:
        break;
    }
    const l = target.items.size;
    target.items.forEach( (item) => {
      if (pokemon.items.size <3) {
        pokemon.items.add(item);
      }
      target.items.delete(item);
    });

    if (pokemon.effects.includes(EFFECTS.HONE_CLAWS)) {
      pokemon.atk += 4 * l;
      pokemon.handleShield(20 * l, pokemon);
    }

    if (pokemon.effects.includes(EFFECTS.ASSURANCE)) {
      pokemon.atk += 7 * l;
      pokemon.handleShield(30 * l, pokemon);
    }

    if (pokemon.effects.includes(EFFECTS.BEAT_UP)) {
      pokemon.atk += 10 * l;
      pokemon.handleShield(50 * l, pokemon);
    }

    // pokemon.simulation.applyItemsEffects(pokemon);
    // target.simulation.applyItemsEffects(target);
    target.handleSpellDamage(damage, board, AttackType.PHYSICAL, pokemon);
  }
}

export class StunSporeStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let debuff = 0;
    let damage = 0;
    switch (pokemon.stars) {
      case 1:
        debuff = 50;
        damage = 5;
        break;
      case 2:
        debuff = 100;
        damage = 10;
        break;
      case 3:
        debuff = 200;
        damage = 20;
        break;
      default:
        break;
    }
    target.handleSpellDamage(damage, board, AttackType.SPECIAL, pokemon);
    target.handleAttackSpeed(-debuff);
  }
}

export class MeteorMashStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let damage = 0;

    switch (pokemon.stars) {
      case 1:
        damage = 30;
        break;
      case 2:
        damage = 50;
        break;
      case 3:
        damage = 70;
        break;
      default:
        break;
    }

    pokemon.atk += 5;
    const cells = board.getAdjacentCells(pokemon.positionX, pokemon.positionY);

    cells.forEach((cell) => {
      if (cell.value && pokemon.team != cell.value.team) {
        cell.value.handleSpellDamage(damage, board, AttackType.SPECIAL, pokemon);
      }
    });
  }
}

export class HurricaneStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    let damage = 0;
    switch (pokemon.stars) {
      case 1:
        damage = 10;
        break;
      case 2:
        damage = 20;
        break;
      case 3:
        damage = 30;
        break;
      default:
        break;
    }
    target.handleSpellDamage(damage, board, AttackType.SPECIAL, pokemon);
    const secondTarget = board.getValue(target.positionX, target.positionY + 1);
    if (secondTarget && secondTarget != pokemon) {
      secondTarget.handleSpellDamage(damage, board, AttackType.SPECIAL, pokemon);
    }
  }
}

export class MetronomeStrategy extends AttackStrategy {
  constructor() {
    super();
  }

  process(pokemon: PokemonEntity, state: PokemonState, board: Board, target: PokemonEntity) {
    super.process(pokemon, state, board, target);
    const skills = [
      FireBlastStrategy,
      WheelOfFireStrategy,
      SeismicTossStrategy,
      GuillotineStrategy,
      RockSlideStrategy,
      HeatWaveStrategy,
      ThunderStrategy,
      HydroPumpStrategy,
      DracoMeteorStrategy,
      BlazeKickStrategy,
      WishStrategy,
      CalmMindStrategy,
      IronDefenseStrategy,
      SoakStrategy,
      IronTailStrategy,
      BlastBurnStrategy,
      ChargeStrategy,
      DischargeStrategy,
      BiteStrategy,
      DragonTailStrategy,
      DragonBreathStrategy,
      IcicleCrashStrategy,
      RootStrategy,
      TormentStrategy,
      StompStrategy,
      DarkPulseStrategy,
      NightSlashStrategy,
      BugBuzzStrategy,
      PoisonStingStrategy,
      LeechLifeStrategy,
      HappyHourStrategy,
      TeleportStrategy,
      NastyPlotStrategy,
      ThiefStrategy,
      StunSporeStrategy,
      MeteorMashStrategy,
      HurricaneStrategy,
      BurnStrategy,
      SleepStrategy,
      FreezeStrategy,
      ConfusionStrategy,
      ProtectStrategy,
      PoisonStrategy,
      SilenceStrategy,
      OriginPulseStrategy,
      SeedFlareStrategy,
      HealBlockStrategy,
      RoarOfTimeStrategy,
      RockTombStrategy,
      RockSmashStrategy,
      HeadSmashStrategy,
      VoltSwitchStrategy,
      ShadowCloneStrategy,
      HyperVoiceStrategy,
      PetalDanceStrategy,
      EchoStrategy,
      TriAttackStrategy,
      GrassWhistleStrategy,
      HighJumpKickStrategy,
      DisarmingVoiceStrategy,
      RelicSongStrategy,
      GrowlStrategy,
      BonemerangStrategy,
      ClangorousSoulStrategy,
      NightmareStrategy,
      ExplosionStrategy,
      KingShieldStrategy
    ];
    const strategy = new skills[Math.floor(Math.random() * skills.length)]();
    strategy.process(pokemon, state, board, target);
  }
}