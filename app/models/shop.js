const PokemonFactory = require('./pokemon-factory');
const {PKM, PROBABILITY} = require('./enum');

const COMMON = [PKM.GEODUDE, PKM.AZURILL, PKM.ZUBAT, PKM.MAREEP, PKM.CLEFFA, PKM.IGGLYBUFF, PKM.CATERPIE, PKM.WEEDLE, PKM.PIDGEY, PKM.HOPPIP, PKM.SEEDOT, PKM.STARLY, PKM.BELLSPROUT];
const UNCOMMON = [PKM.SWINUB, PKM.EEVEE, PKM.BULBASAUR, PKM.CHARMANDER, PKM.SLOWPOKE, PKM.SQUIRTLE, PKM.CHIKORITA, PKM.CYNDAQUIL, PKM.TOTODILE, PKM.TREECKO, PKM.TORCHIC, PKM.MUDKIP, PKM.TURTWIG, PKM.CHIMCHAR, PKM.PIPLUP, PKM.NIDORANF, PKM.NIDORANM];
const RARE = [PKM.SANDILE, PKM.VANILLITE, PKM.PICHU, PKM.MACHOP, PKM.HORSEA, PKM.TRAPINCH, PKM.SPHEAL, PKM.ARON, PKM.MAGNEMITE, PKM.RHYHORN, PKM.TOGEPI, PKM.DUSKULL, PKM.LOTAD, PKM.SHINX, PKM.POLIWAG];
const EPIC = [PKM.SOLOSIS, PKM.DEINO, PKM.SNORUNT, PKM.ABRA, PKM.GASTLY, PKM.DRATINI, PKM.LARVITAR, PKM.SLAKOTH, PKM.RALTS, PKM.BAGON, PKM.BELDUM, PKM.GIBLE, PKM.ELEKID, PKM.MAGBY, PKM.LITWICK];
const LEGENDARY = [PKM.MEDITITE, PKM.NUMEL, PKM.ONIX, PKM.SCYTHER, PKM.RIOLU, PKM.SNOVER];
const MYTHICAL_1 = [PKM.VIRIZION, PKM.REGICE, PKM.REGISTEEL, PKM.REGIROCK, PKM.UXIE, PKM.MESPRIT, PKM.AZELF, PKM.LATIAS, PKM.LATIOS, PKM.ZAPDOS, PKM.MOLTRES, PKM.ARTICUNO, PKM.LAPRAS, PKM.AERODACTYL, PKM.ABSOL, PKM.SPIRITOMB, PKM.ROTOM, PKM.MANAPHY, PKM.COBALION, PKM.TERRAKION, PKM.KELDEO, PKM.TORNADUS, PKM.THUNDURUS, PKM.LANDORUS, PKM.VOLCARONA];
//const MYTHICAL_1 = [PKM.VIRIZION, PKM.REGICE, PKM.REGISTEEL, PKM.REGIROCK, PKM.GROUDON, PKM.KYOGRE];
const MYTHICAL_2 = [PKM.MEWTWO, PKM.ENTEI, PKM.SUICUNE, PKM.RAIKOU, PKM.KYUREM, PKM.RESHIRAM, PKM.ZEKROM, PKM.REGIGIGAS, PKM.CELEBI, PKM.VICTINI, PKM.JIRACHI, PKM.ARCEUS, PKM.DEOXYS, PKM.SHAYMIN, PKM.GIRATINA, PKM.DARKRAI, PKM.CRESSELIA, PKM.HEATRAN, PKM.LUGIA, PKM.HOOH, PKM.PALKIA, PKM.DIALGA, PKM.RAYQUAZA, PKM.KYOGRE, PKM.GROUDON];


class Shop {

  assignShop(player) {

    for (let i = 0; i < 5; i++) {
      let pokemon = PokemonFactory.createPokemonFromName(this.pickPokemon(player));
      const seed = Math.random();
      if (seed > 0.993) {
        pokemon = PokemonFactory.createPokemonFromName(PKM.DITTO);
      }
      player.shop[i] = pokemon.name;
    }
  }

  assignFirstMythicalShop(player){
    let mythical_copy = JSON.parse(JSON.stringify(MYTHICAL_1));
    for (let i = 0; i < 5; i++) {
      let pkm = PokemonFactory.createPokemonFromName(mythical_copy[Math.floor(Math.random() * mythical_copy.length)]).name;
      mythical_copy.splice(mythical_copy.indexOf(pkm),1);
      player.shop[i] = pkm;
    }
  }

  assignSecondMythicalShop(player){
    let mythical_copy = JSON.parse(JSON.stringify(MYTHICAL_2));
    for (let i = 0; i < 5; i++) {
      let pkm = PokemonFactory.createPokemonFromName(mythical_copy[Math.floor(Math.random() * mythical_copy.length)]).name;
      mythical_copy.splice(mythical_copy.indexOf(pkm),1);
      player.shop[i] = pkm;
    }
  }

  pickPokemon(player) {
    const playerProbality = PROBABILITY[player.experienceManager.level];
    const seed = Math.random();
    let pokemon = '';
    let threshold = 0;
    const common = [];
    const uncommon = [];
    const rare = [];
    const epic = [];
    const legendary = [];
    const threeStars = [];

    player.board.forEach((pokemon, id) => {
      if (pokemon.stars == 3) {
        threeStars.push(PokemonFactory.getPokemonFamily(pokemon.name));
      }
    });

    COMMON.forEach((name) => {
      if (!threeStars.includes(name)) {
        common.push(name);
      }
    });
    UNCOMMON.forEach((name) => {
      if (!threeStars.includes(name)) {
        uncommon.push(name);
      }
    });
    RARE.forEach((name) => {
      if (!threeStars.includes(name)) {
        rare.push(name);
      }
    });
    EPIC.forEach((name) => {
      if (!threeStars.includes(name)) {
        epic.push(name);
      }
    });
    LEGENDARY.forEach((name) => {
      if (!threeStars.includes(name)) {
        legendary.push(name);
      }
    });
    for (let i = 0; i < playerProbality.length; i++) {
      threshold += playerProbality[i];
      if (seed < threshold) {
        switch (i) {
          case 0:
            pokemon = common[Math.floor(Math.random() * common.length)];
            break;
          case 1:
            pokemon = uncommon[Math.floor(Math.random() * uncommon.length)];
            break;
          case 2:
            pokemon = rare[Math.floor(Math.random() * rare.length)];
            break;
          case 3:
            pokemon = epic[Math.floor(Math.random() * epic.length)];
            break;
          case 4:
            pokemon = legendary[Math.floor(Math.random() * legendary.length)];
            break;
          default:
            console.log(`error in shop while picking seed = ${seed}, threshold = ${threshold}, index = ${i}`);
            break;
        }
        break;
      }
    }
    return pokemon;
  }
}

module.exports = Shop;
