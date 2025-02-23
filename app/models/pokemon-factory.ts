import { Abomasnow, Abra, Absol, Aegislash, Aerodactyl, Aggron, Alakazam, AlolanMarowak, Altaria, Amaura, Ampharos, Anorith, Arcanine, Arceus, Archen, Archeops, Armaldo, Aron, Articuno, Aurorus, Axew, Azelf, Azumarill, Azurill, Bagon, Banette, Bastiodon, Bayleef, Beedrill, Beldum, Bellossom, Bellsprout, Blastoise, Blaziken, Braixen, Budew, Bulbasaur, Buneary, Butterfree, Cacnea, Cacturne, Camerupt, Carracosta, Carvanha, Castform, CastformHail, CastformRain, CastformSun, Caterpie, Celebi, Chandelure, Charizard, Charmander, Charmeleon, Chikorita, Chimchar, Clefable, Clefairy, Cleffa, Cobalion, Combusken, Corphish, Cradily, Cranidos, Crawdaunt, Cresselia, Crobat, Croconaw, Cubone, Cyndaquil, Darkrai, Deino, Delphox, Deoxys, Dialga, Diancie, Ditto, Doublade, Dragonair, Dragonite, Dratini, Duosion, Dusclops, Dusknoir, Duskull, Eevee, Electabuzz, Electivire, Electrike, Elekid, Empoleon, Entei, Espeon, Eternatus, Exploud, Fearow, Fennekin, Feraligatr, Flabebe, Flaffy, Flareon, Floette, Florges, Flygon, Fraxure, Froslass, Gabite, Galvantula, Garchomp, Gardevoir, Gastly, Genesect, Gengar, Geodude, Gible, Giratina, Glaceon, Glalie, Gloom, Golbat, Golem, Gourgeist, Graveler, Grotle, Groudon, Grovyle, Growlithe, Guzzlord, Gyarados, HakamoO, Hariyama, Hatenna, Hatterene, Hattrem, Haunter, Haxorus, Heatran, Honedge, HooH, Hoppip, Horsea, Houndour, Hydreigon, Igglybuff, Infernape, Ivysaur, JangmoO, Jigglypuff, Jirachi, Jolteon, Joltik, Jumpluff, Kabuto, Kabutops, Kadabra, Kakuna, Keldeo, Kingdra, Kirlia, KommoO, Krookodile, Krookorok, Kyogre, Kyurem, Lairon, Lampent, Landorus, Lapras, Larvitar, Latias, Latios, Leafeon, Leavanny, Lileep, Litwick, Lombre, Lopunny, Lotad, Loudred, Lucario, Ludicolo, Lugia, Luxio, Luxray, Machamp, Machoke, Machop, Magby, Magikarp, Magmar, Magmortar, Magnemite, Magneton, Magnezone, Makuhita, Mamoswine, Manaphy, Manectric, Mareep, Marill, Marowak, Marshtomp, Medicham, Meditite, MegaAbomasnow, MegaAltaria, MegaBanette, MegaCamerupt, MegaLopunny, MegaLucario, MegaManectric, MegaMedicham, Meganium, MegaRayquaza, MegaScizor, MegaSteelix, Meloetta, Meowth, Mesprit, Metagross, Metang, Metapod, Mewtwo, Moltres, Monferno, Mudkip, Munchlax, Nidoking, Nidoqueen, NidoranF, NidoranM, Nidorina, Nidorino, Nincada, Ninjask, Noibat, Noivern, Numel, Nuzleaf, Oddish, Omanyte, Omastar, Onix, Palkia, Palpitoad, Persian, Pichu, Pidgeot, Pidgeotto, Pidgey, Pikachu, Pikipek, Piloswine, Piplup, Pokemon, Politoed, Poliwag, Poliwhirl, Ponyta, Porygon, Porygon2, PorygonZ, PrimalGroudon, PrimalKyogre, Prinplup, Pumpkaboo, Pupitar, Quilava, Raichu, Raikou, Ralts, Rampardos, Rapidash, Raticate, Rattata, Rayquaza, Regice, Regidrago, Regieleki, Regigigas, Regirock, Registeel, Relicanth, Reshiram, Reuniclus, Rhydon, Rhyhorn, Rhyperior, Riolu, Roselia, Roserade, Rotom, Salamence, Sandile, Sceptile, Scizor, Scolipede, Scyther, Seadra, Sealeo, Seedot, Seismitoad, Sewaddle, Shaymin, Shedninja, Shelgon, Shieldon, Shiftry, Shinx, Shuppet, Skiploom, Slaking, Slakoth, Slowbro, Slowking, Slowpoke, Snorlax, Snorunt, Snover, Solosis, Spearow, Spheal, Spiritomb, Squirtle, Staraptor, Staravia, Starly, Steelix, Suicune, Swablu, Swadloon, Swampert, Swinub, Sylveon, Tauros, Terrakion, Thundurus, Tirtouga, Togekiss, Togepi, Togetic, Torchic, Tornadus, Torterra, Totodile, Toucannon, Trapinch, Treecko, Trumbeak, Turtwig, Tympole, Typhlosion, Tyranitar, Tyrantrum, Tyrunt, Umbreon, Uxie, Vanillish, Vanillite, Vanilluxe, Vaporeon, Venipede, Venusaur, Vibrava, Victini, Victreebel, Vigoroth, Vileplume, Virizion, Volcarona, Walrein, Wartortle, Weedle, Weepinbell, Whirlipede, Whismur, Wigglytuff, Zapdos, Zekrom, Zubat, Zweilous } from './colyseus-models/pokemon'
import {MapSchema} from  '@colyseus/schema'
import {IPokemon, Emotion} from '../types'
import { IPokemonConfig } from './mongo-models/user-metadata'
import PRECOMPUTED_TYPE_POKEMONS from './precomputed/type-pokemons.json'
import { Synergy } from '../types/enum/Synergy'
import { Pkm, PkmFamily } from '../types/enum/Pokemon'

export default class PokemonFactory {
  static getNeutralPokemonsByLevelStage(level: number): MapSchema<Pokemon> {
    const pokemons = new MapSchema<Pokemon>()
    switch (level) {
      case 1:{
        const magikarp1 = PokemonFactory.createPokemonFromName(Pkm.MAGIKARP)
        magikarp1.positionX = 3
        magikarp1.positionY = 1
        const magikarp2 = PokemonFactory.createPokemonFromName(Pkm.MAGIKARP)
        magikarp2.positionX = 5
        magikarp2.positionY = 1
        pokemons.set(magikarp1.id, magikarp1)
        pokemons.set(magikarp2.id, magikarp2)
        break
      }

      case 2: {
        const rattata1 = PokemonFactory.createPokemonFromName(Pkm.RATTATA)
        rattata1.positionX = 3
        rattata1.positionY = 1
        const rattata2 = PokemonFactory.createPokemonFromName(Pkm.RATTATA)
        rattata2.positionX = 5
        rattata2.positionY = 1
        const raticate = PokemonFactory.createPokemonFromName(Pkm.RATICATE)
        raticate.positionX = 4
        raticate.positionY = 2
        pokemons.set(rattata1.id, rattata1)
        pokemons.set(rattata2.id, rattata2)
        pokemons.set(raticate.id, raticate)
        break
      }

      case 3: {
        const spearow1 = PokemonFactory.createPokemonFromName(Pkm.SPEAROW)
        spearow1.positionX = 3
        spearow1.positionY = 1
        const spearow2 = PokemonFactory.createPokemonFromName(Pkm.SPEAROW)
        spearow2.positionX = 5
        spearow2.positionY = 1
        const spearow3 = PokemonFactory.createPokemonFromName(Pkm.SPEAROW)
        spearow3.positionX = 4
        spearow3.positionY = 1
        const fearow = PokemonFactory.createPokemonFromName(Pkm.FEAROW)
        fearow.positionX = 4
        fearow.positionY = 2
        pokemons.set(spearow1.id, spearow1)
        pokemons.set(spearow2.id, spearow2)
        pokemons.set(spearow3.id, spearow3)
        pokemons.set(fearow.id, fearow)
        break
      }

      case 10: {
        const gyarados = PokemonFactory.createPokemonFromName(Pkm.GYARADOS)
        gyarados.positionX = 4
        gyarados.positionY = 2
        pokemons.set(gyarados.id, gyarados)
        break
      }

      case 15: {
        const lugia = PokemonFactory.createPokemonFromName(Pkm.LUGIA)
        lugia.positionX = 4
        lugia.positionY = 2
        pokemons.set(lugia.id, lugia)
        break
      }


      case 20: {
        const giratina = PokemonFactory.createPokemonFromName(Pkm.GIRATINA)
        giratina.positionX = 4
        giratina.positionY = 2
        pokemons.set(giratina.id, giratina)
        break
      }


      case 25: {
        const zapdos = PokemonFactory.createPokemonFromName(Pkm.ZAPDOS)
        zapdos.positionX = 2
        zapdos.positionY = 2
        pokemons.set(zapdos.id, zapdos)
        const moltres = PokemonFactory.createPokemonFromName(Pkm.MOLTRES)
        moltres.positionX = 4
        moltres.positionY = 2
        pokemons.set(moltres.id, moltres)
        const articuno = PokemonFactory.createPokemonFromName(Pkm.ARTICUNO)
        articuno.positionX = 6
        articuno.positionY = 2
        pokemons.set(articuno.id, articuno)
        break
      }


      case 30: {
        const dialga = PokemonFactory.createPokemonFromName(Pkm.DIALGA)
        dialga.positionX = 2
        dialga.positionY = 2
        pokemons.set(dialga.id, dialga)
        const palkia = PokemonFactory.createPokemonFromName(Pkm.PALKIA)
        palkia.positionX = 6
        palkia.positionY = 2
        pokemons.set(palkia.id, palkia)
        break
      }


      case 35: {
        const suicune = PokemonFactory.createPokemonFromName(Pkm.SUICUNE)
        suicune.positionX = 2
        suicune.positionY = 2
        pokemons.set(suicune.id, suicune)
        const raikou = PokemonFactory.createPokemonFromName(Pkm.RAIKOU)
        raikou.positionX = 4
        raikou.positionY = 2
        pokemons.set(raikou.id, raikou)
        const entei = PokemonFactory.createPokemonFromName(Pkm.ENTEI)
        entei.positionX = 6
        entei.positionY = 2
        pokemons.set(entei.id, entei)
        break
      }


      case 40: {
        const regice = PokemonFactory.createPokemonFromName(Pkm.REGICE)
        regice.positionX = 2
        regice.positionY = 3
        pokemons.set(regice.id, regice)
        const regirock = PokemonFactory.createPokemonFromName(Pkm.REGIROCK)
        regirock.positionX = 4
        regirock.positionY = 3
        pokemons.set(regirock.id, regirock)
        const registeel = PokemonFactory.createPokemonFromName(Pkm.REGISTEEL)
        registeel.positionX = 6
        registeel.positionY = 3
        pokemons.set(registeel.id, registeel)
        const regigigas = PokemonFactory.createPokemonFromName(Pkm.REGIGIGAS)
        regigigas.positionX = 4
        regigigas.positionY = 1
        pokemons.set(regigigas.id, regigigas)
        break
      }


      default: {
        const kyogre = PokemonFactory.createPokemonFromName(Pkm.KYOGRE)
        kyogre.positionX = 2
        kyogre.positionY = 2
        pokemons.set(kyogre.id, kyogre)
        const groudon = PokemonFactory.createPokemonFromName(Pkm.GROUDON)
        groudon.positionX = 4
        groudon.positionY = 2
        pokemons.set(groudon.id, groudon)
        const rayquaza = PokemonFactory.createPokemonFromName(Pkm.RAYQUAZA)
        rayquaza.positionX = 6
        rayquaza.positionY = 2
        pokemons.set(rayquaza.id, rayquaza)
        break
      }
    }
    return pokemons
  }

  // transforms a pokemon into another pokemon,
  // transferring its items and position to
  // the new pokemon
  static transformPokemon(before: Pokemon, afterName: Pkm) {
    const transformation = this.createPokemonFromName(afterName)
    transformation.positionX = before.positionX
    transformation.positionY = before.positionY
    transformation.items = before.items
    return transformation
  }

  static getPokemonBaseEvolution(name: Pkm) {
    switch (name) {
      case Pkm.VAPOREON:
        return Pkm.EEVEE
      case Pkm.JOLTEON:
        return Pkm.EEVEE
      case Pkm.FLAREON:
        return Pkm.EEVEE
      case Pkm.ESPEON:
        return Pkm.EEVEE
      case Pkm.UMBREON:
        return Pkm.EEVEE
      case Pkm.LEAFEON:
        return Pkm.EEVEE
      case Pkm.SYLVEON:
        return Pkm.EEVEE
      case Pkm.GLACEON:
        return Pkm.EEVEE
      default:
        return PkmFamily[name]
    }
  }

  static createPokemonFromName(name: Pkm, config?: IPokemonConfig) {
    const s = config && config.selectedShiny ? true: false
    const e = config && config.selectedEmotion ? config.selectedEmotion: Emotion.NORMAL
    switch (name) {
      case Pkm.BULBASAUR:
        return new Bulbasaur(s,e)
      case Pkm.IVYSAUR:
        return new Ivysaur(s,e)
      case Pkm.VENUSAUR:
        return new Venusaur(s,e)
      case Pkm.CHARMANDER:
        return new Charmander(s,e)
      case Pkm.CHARMELEON:
        return new Charmeleon(s,e)
      case Pkm.CHARIZARD:
        return new Charizard(s,e)
      case Pkm.SQUIRTLE:
        return new Squirtle(s,e)
      case Pkm.WARTORTLE:
        return new Wartortle(s,e)
      case Pkm.BLASTOISE:
        return new Blastoise(s,e)
      case Pkm.SLOWPOKE:
        return new Slowpoke(s,e)
      case Pkm.SLOWBRO:
        return new Slowbro(s,e)
      case Pkm.SLOWKING:
        return new Slowking(s,e)
      case Pkm.GEODUDE:
        return new Geodude(s,e)
      case Pkm.GRAVELER:
        return new Graveler(s,e)
      case Pkm.GOLEM:
        return new Golem(s,e)
      case Pkm.AZURILL:
        return new Azurill(s,e)
      case Pkm.MARILL:
        return new Marill(s,e)
      case Pkm.AZUMARILL:
        return new Azumarill(s,e)
      case Pkm.ZUBAT:
        return new Zubat(s,e)
      case Pkm.GOLBAT:
        return new Golbat(s,e)
      case Pkm.CROBAT:
        return new Crobat(s,e)
      case Pkm.AMPHAROS:
        return new Ampharos(s,e)
      case Pkm.MAREEP:
        return new Mareep(s,e)
      case Pkm.FLAFFY:
        return new Flaffy(s,e)
      case Pkm.CLEFFA:
        return new Cleffa(s,e)
      case Pkm.CLEFAIRY:
        return new Clefairy(s,e)
      case Pkm.CLEFABLE:
        return new Clefable(s,e)
      case Pkm.IGGLYBUFF:
        return new Igglybuff(s,e)
      case Pkm.JIGGLYPUFF:
        return new Jigglypuff(s,e)
      case Pkm.WIGGLYTUFF:
        return new Wigglytuff(s,e)
      case Pkm.CATERPIE:
        return new Caterpie(s,e)
      case Pkm.METAPOD:
        return new Metapod(s,e)
      case Pkm.BUTTERFREE:
        return new Butterfree(s,e)
      case Pkm.WEEDLE:
        return new Weedle(s,e)
      case Pkm.KAKUNA:
        return new Kakuna(s,e)
      case Pkm.BEEDRILL:
        return new Beedrill(s,e)
      case Pkm.PIDGEY:
        return new Pidgey(s,e)
      case Pkm.PIDGEOTTO:
        return new Pidgeotto(s,e)
      case Pkm.PIDGEOT:
        return new Pidgeot(s,e)
      case Pkm.HOPPIP:
        return new Hoppip(s,e)
      case Pkm.SKIPLOOM:
        return new Skiploom(s,e)
      case Pkm.JUMPLUFF:
        return new Jumpluff(s,e)
      case Pkm.SEEDOT:
        return new Seedot(s,e)
      case Pkm.NUZLEAF:
        return new Nuzleaf(s,e)
      case Pkm.SHIFTRY:
        return new Shiftry(s,e)
      case Pkm.STARLY:
        return new Starly(s,e)
      case Pkm.STARAVIA:
        return new Staravia(s,e)
      case Pkm.STARAPTOR:
        return new Staraptor(s,e)
      case Pkm.CHIKORITA:
        return new Chikorita(s,e)
      case Pkm.BAYLEEF:
        return new Bayleef(s,e)
      case Pkm.MEGANIUM:
        return new Meganium(s,e)
      case Pkm.CYNDAQUIL:
        return new Cyndaquil(s,e)
      case Pkm.QUILAVA:
        return new Quilava(s,e)
      case Pkm.TYPHLOSION:
        return new Typhlosion(s,e)
      case Pkm.TOTODILE:
        return new Totodile(s,e)
      case Pkm.CROCONAW:
        return new Croconaw(s,e)
      case Pkm.FERALIGATR:
        return new Feraligatr(s,e)
      case Pkm.TREECKO:
        return new Treecko(s,e)
      case Pkm.GROVYLE:
        return new Grovyle(s,e)
      case Pkm.SCEPTILE:
        return new Sceptile(s,e)
      case Pkm.TORCHIC:
        return new Torchic(s,e)
      case Pkm.COMBUSKEN:
        return new Combusken(s,e)
      case Pkm.BLAZIKEN:
        return new Blaziken(s,e)
      case Pkm.MUDKIP:
        return new Mudkip(s,e)
      case Pkm.MARSHTOMP:
        return new Marshtomp(s,e)
      case Pkm.SWAMPERT:
        return new Swampert(s,e)
      case Pkm.TURTWIG:
        return new Turtwig(s,e)
      case Pkm.GROTLE:
        return new Grotle(s,e)
      case Pkm.TORTERRA:
        return new Torterra(s,e)
      case Pkm.CHIMCHAR:
        return new Chimchar(s,e)
      case Pkm.MONFERNO:
        return new Monferno(s,e)
      case Pkm.INFERNAPE:
        return new Infernape(s,e)
      case Pkm.PIPLUP:
        return new Piplup(s,e)
      case Pkm.PRINPLUP:
        return new Prinplup(s,e)
      case Pkm.EMPOLEON:
        return new Empoleon(s,e)
      case Pkm.NIDORANF:
        return new NidoranF(s,e)
      case Pkm.NIDORINA:
        return new Nidorina(s,e)
      case Pkm.NIDOQUEEN:
        return new Nidoqueen(s,e)
      case Pkm.NIDORANM:
        return new NidoranM(s,e)
      case Pkm.NIDORINO:
        return new Nidorino(s,e)
      case Pkm.NIDOKING:
        return new Nidoking(s,e)
      case Pkm.PICHU:
        return new Pichu(s,e)
      case Pkm.PIKACHU:
        return new Pikachu(s,e)
      case Pkm.RAICHU:
        return new Raichu(s,e)
      case Pkm.MACHOP:
        return new Machop(s,e)
      case Pkm.MACHOKE:
        return new Machoke(s,e)
      case Pkm.MACHAMP:
        return new Machamp(s,e)
      case Pkm.HORSEA:
        return new Horsea(s,e)
      case Pkm.SEADRA:
        return new Seadra(s,e)
      case Pkm.KINGDRA:
        return new Kingdra(s,e)
      case Pkm.TRAPINCH:
        return new Trapinch(s,e)
      case Pkm.VIBRAVA:
        return new Vibrava(s,e)
      case Pkm.FLYGON:
        return new Flygon(s,e)
      case Pkm.SPHEAL:
        return new Spheal(s,e)
      case Pkm.SEALEO:
        return new Sealeo(s,e)
      case Pkm.WALREIN:
        return new Walrein(s,e)
      case Pkm.ARON:
        return new Aron(s,e)
      case Pkm.LAIRON:
        return new Lairon(s,e)
      case Pkm.AGGRON:
        return new Aggron(s,e)
      case Pkm.MAGNEMITE:
        return new Magnemite(s,e)
      case Pkm.MAGNETON:
        return new Magneton(s,e)
      case Pkm.MAGNEZONE:
        return new Magnezone(s,e)
      case Pkm.RHYHORN:
        return new Rhyhorn(s,e)
      case Pkm.RHYDON:
        return new Rhydon(s,e)
      case Pkm.RHYPERIOR:
        return new Rhyperior(s,e)
      case Pkm.TOGEPI:
        return new Togepi(s,e)
      case Pkm.TOGETIC:
        return new Togetic(s,e)
      case Pkm.TOGEKISS:
        return new Togekiss(s,e)
      case Pkm.DUSKULL:
        return new Duskull(s,e)
      case Pkm.DUSCLOPS:
        return new Dusclops(s,e)
      case Pkm.DUSKNOIR:
        return new Dusknoir(s,e)
      case Pkm.LOTAD:
        return new Lotad(s,e)
      case Pkm.LOMBRE:
        return new Lombre(s,e)
      case Pkm.LUDICOLO:
        return new Ludicolo(s,e)
      case Pkm.SHINX:
        return new Shinx(s,e)
      case Pkm.LUXIO:
        return new Luxio(s,e)
      case Pkm.LUXRAY:
        return new Luxray(s,e)
      case Pkm.POLIWAG:
        return new Poliwag(s,e)
      case Pkm.POLIWHIRL:
        return new Poliwhirl(s,e)
      case Pkm.POLITOED:
        return new Politoed(s,e)
      case Pkm.ABRA:
        return new Abra(s,e)
      case Pkm.KADABRA:
        return new Kadabra(s,e)
      case Pkm.ALAKAZAM:
        return new Alakazam(s,e)
      case Pkm.GASTLY:
        return new Gastly(s,e)
      case Pkm.HAUNTER:
        return new Haunter(s,e)
      case Pkm.GENGAR:
        return new Gengar(s,e)
      case Pkm.DRATINI:
        return new Dratini(s,e)
      case Pkm.DRAGONAIR:
        return new Dragonair(s,e)
      case Pkm.DRAGONITE:
        return new Dragonite(s,e)
      case Pkm.LARVITAR:
        return new Larvitar(s,e)
      case Pkm.PUPITAR:
        return new Pupitar(s,e)
      case Pkm.TYRANITAR:
        return new Tyranitar(s,e)
      case Pkm.SLAKOTH:
        return new Slakoth(s,e)
      case Pkm.VIGOROTH:
        return new Vigoroth(s,e)
      case Pkm.SLAKING:
        return new Slaking(s,e)
      case Pkm.RALTS:
        return new Ralts(s,e)
      case Pkm.KIRLIA:
        return new Kirlia(s,e)
      case Pkm.GARDEVOIR:
        return new Gardevoir(s,e)
      case Pkm.BAGON:
        return new Bagon(s,e)
      case Pkm.SHELGON:
        return new Shelgon(s,e)
      case Pkm.SALAMENCE:
        return new Salamence(s,e)
      case Pkm.BELDUM:
        return new Beldum(s,e)
      case Pkm.METANG:
        return new Metang(s,e)
      case Pkm.METAGROSS:
        return new Metagross(s,e)
      case Pkm.GIBLE:
        return new Gible(s,e)
      case Pkm.GABITE:
        return new Gabite(s,e)
      case Pkm.GARCHOMP:
        return new Garchomp(s,e)
      case Pkm.ELEKID:
        return new Elekid(s,e)
      case Pkm.ELECTABUZZ:
        return new Electabuzz(s,e)
      case Pkm.ELECTIVIRE:
        return new Electivire(s,e)
      case Pkm.MAGBY:
        return new Magby(s,e)
      case Pkm.MAGMAR:
        return new Magmar(s,e)
      case Pkm.MAGMORTAR:
        return new Magmortar(s,e)
      case Pkm.MUNCHLAX:
        return new Munchlax(s,e)
      case Pkm.SNORLAX:
        return new Snorlax(s,e)
      case Pkm.GROWLITHE:
        return new Growlithe(s,e)
      case Pkm.ARCANINE:
        return new Arcanine(s,e)
      case Pkm.ONIX:
        return new Onix(s,e)
      case Pkm.STEELIX:
        return new Steelix(s,e)
      case Pkm.MEGA_STEELIX:
        return new MegaSteelix(s,e)
      case Pkm.SCYTHER:
        return new Scyther(s,e)
      case Pkm.SCIZOR:
        return new Scizor(s,e)
      case Pkm.MEGA_SCIZOR:
        return new MegaScizor(s,e)
      case Pkm.RIOLU:
        return new Riolu(s,e)
      case Pkm.LUCARIO:
        return new Lucario(s,e)
      case Pkm.MEGA_LUCARIO:
        return new MegaLucario(s,e)
      case Pkm.MAGIKARP:
        return new Magikarp(s,e)
      case Pkm.RATTATA:
        return new Rattata(s,e)
      case Pkm.RATICATE:
        return new Raticate(s,e)
      case Pkm.SPEAROW:
        return new Spearow(s,e)
      case Pkm.FEAROW:
        return new Fearow(s,e)
      case Pkm.GYARADOS:
        return new Gyarados(s,e)
      case Pkm.LUGIA:
        return new Lugia(s,e)
      case Pkm.ZAPDOS:
        return new Zapdos(s,e)
      case Pkm.MOLTRES:
        return new Moltres(s,e)
      case Pkm.ARTICUNO:
        return new Articuno(s,e)
      case Pkm.DIALGA:
        return new Dialga(s,e)
      case Pkm.PALKIA:
        return new Palkia(s,e)
      case Pkm.SUICUNE:
        return new Suicune(s,e)
      case Pkm.RAIKOU:
        return new Raikou(s,e)
      case Pkm.ENTEI:
        return new Entei(s,e)
      case Pkm.KYOGRE:
        return new Kyogre(s,e)
      case Pkm.GROUDON:
        return new Groudon(s,e)
      case Pkm.RAYQUAZA:
        return new Rayquaza(s,e)
      case Pkm.MEGA_RAYQUAZA:
        return new MegaRayquaza(s,e)
      case Pkm.REGICE:
        return new Regice(s,e)
      case Pkm.REGIROCK:
        return new Regirock(s,e)
      case Pkm.REGISTEEL:
        return new Registeel(s,e)
      case Pkm.REGIGIGAS:
        return new Regigigas(s,e)
      case Pkm.GIRATINA:
        return new Giratina(s,e)
      case Pkm.EEVEE:
        return new Eevee(s,e)
      case Pkm.VAPOREON:
        return new Vaporeon(s,e)
      case Pkm.JOLTEON:
        return new Jolteon(s,e)
      case Pkm.FLAREON:
        return new Flareon(s,e)
      case Pkm.ESPEON:
        return new Espeon(s,e)
      case Pkm.UMBREON:
        return new Umbreon(s,e)
      case Pkm.LEAFEON:
        return new Leafeon(s,e)
      case Pkm.SYLVEON:
        return new Sylveon(s,e)
      case Pkm.GLACEON:
        return new Glaceon(s,e)
      case Pkm.MEDITITE:
        return new Meditite(s,e)
      case Pkm.MEDICHAM:
        return new Medicham(s,e)
      case Pkm.MEGA_MEDICHAM:
        return new MegaMedicham(s,e)
      case Pkm.NUMEL:
        return new Numel(s,e)
      case Pkm.CAMERUPT:
        return new Camerupt(s,e)
      case Pkm.MEGA_CAMERUPT:
        return new MegaCamerupt(s,e)
      case Pkm.DITTO:
        return new Ditto(s,e)
      case Pkm.DARKRAI:
        return new Darkrai(s,e)
      case Pkm.LITWICK:
        return new Litwick(s,e)
      case Pkm.LAMPENT:
        return new Lampent(s,e)
      case Pkm.CHANDELURE:
        return new Chandelure(s,e)
      case Pkm.BELLSPROUT:
        return new Bellsprout(s,e)
      case Pkm.WEEPINBELL:
        return new Weepinbell(s,e)
      case Pkm.VICTREEBEL:
        return new Victreebel(s,e)
      case Pkm.SWINUB:
        return new Swinub(s,e)
      case Pkm.PILOSWINE:
        return new Piloswine(s,e)
      case Pkm.MAMOSWINE:
        return new Mamoswine(s,e)
      case Pkm.SNORUNT:
        return new Snorunt(s,e)
      case Pkm.GLALIE:
        return new Glalie(s,e)
      case Pkm.FROSLASS:
        return new Froslass(s,e)
      case Pkm.SNOVER:
        return new Snover(s,e)
      case Pkm.ABOMASNOW:
        return new Abomasnow(s,e)
      case Pkm.MEGA_ABOMASNOW:
        return new MegaAbomasnow(s,e)
      case Pkm.VANILLITE:
        return new Vanillite(s,e)
      case Pkm.VANILLISH:
        return new Vanillish(s,e)
      case Pkm.VANILLUXE:
        return new Vanilluxe(s,e)
      case Pkm.VOLCARONA:
        return new Volcarona(s,e)
      case Pkm.LANDORUS:
        return new Landorus(s,e)
      case Pkm.THUNDURUS:
        return new Thundurus(s,e)
      case Pkm.TORNADUS:
        return new Tornadus(s,e)
      case Pkm.KELDEO:
        return new Keldeo(s,e)
      case Pkm.TERRAKION:
        return new Terrakion(s,e)
      case Pkm.VIRIZION:
        return new Virizion(s,e)
      case Pkm.COBALION:
        return new Cobalion(s,e)
      case Pkm.MANAPHY:
        return new Manaphy(s,e)
      case Pkm.SPIRITOMB:
        return new Spiritomb(s,e)
      case Pkm.ABSOL:
        return new Absol(s,e)
      case Pkm.LAPRAS:
        return new Lapras(s,e)
      case Pkm.LATIAS:
        return new Latias(s,e)
      case Pkm.LATIOS:
        return new Latios(s,e)
      case Pkm.MESPRIT:
        return new Mesprit(s,e)
      case Pkm.AZELF:
        return new Azelf(s,e)
      case Pkm.UXIE:
        return new Uxie(s,e)
      case Pkm.MEWTWO:
        return new Mewtwo(s,e)
      case Pkm.KYUREM:
        return new Kyurem(s,e)
      case Pkm.RESHIRAM:
        return new Reshiram(s,e)
      case Pkm.ZEKROM:
        return new Zekrom(s,e)
      case Pkm.CELEBI:
        return new Celebi(s,e)
      case Pkm.VICTINI:
        return new Victini(s,e)
      case Pkm.JIRACHI:
        return new Jirachi(s,e)
      case Pkm.ARCEUS:
        return new Arceus(s,e)
      case Pkm.DEOXYS:
        return new Deoxys(s,e)
      case Pkm.SHAYMIN:
        return new Shaymin(s,e)
      case Pkm.CRESSELIA:
        return new Cresselia(s,e)
      case Pkm.HEATRAN:
        return new Heatran(s,e)
      case Pkm.HO_OH:
        return new HooH(s,e)
      case Pkm.ROTOM:
        return new Rotom(s,e)
      case Pkm.AERODACTYL:
        return new Aerodactyl(s,e)
      case Pkm.HOUNDOUR:
        return new Houndour(s,e)
      case Pkm.SWABLU:
        return new Swablu(s,e)
      case Pkm.CARVANHA:
        return new Carvanha(s,e)
      case Pkm.PRIMAL_KYOGRE:
        return new PrimalKyogre(s,e)
      case Pkm.PRIMAL_GROUDON:
        return new PrimalGroudon(s,e)
      case Pkm.MEOWTH:
        return new Meowth(s,e)
      case Pkm.PERSIAN:
        return new Persian(s,e)
      case Pkm.DEINO:
        return new Deino(s,e)
      case Pkm.ZWEILOUS:
        return new Zweilous(s,e)
      case Pkm.HYDREIGON:
        return new Hydreigon(s,e)
      case Pkm.SANDILE:
        return new Sandile(s,e)
      case Pkm.KROKOROK:
        return new Krookorok(s,e)
      case Pkm.KROOKODILE:
        return new Krookodile(s,e)
      case Pkm.SOLOSIS:
        return new Solosis(s,e)
      case Pkm.DUOSION:
        return new Duosion(s,e)
      case Pkm.REUNICLUS:
        return new Reuniclus(s,e)
      case Pkm.ODDISH:
        return new Oddish(s,e)
      case Pkm.GLOOM:
        return new Gloom(s,e)
      case Pkm.VILEPLUME:
        return new Vileplume(s,e)
      case Pkm.BELLOSSOM:
        return new Bellossom(s,e)
      case Pkm.AMAURA:
        return new Amaura(s,e)
      case Pkm.AURORUS:
        return new Aurorus(s,e)
      case Pkm.ANORITH:
        return new Anorith(s,e)
      case Pkm.ARMALDO:
        return new Armaldo(s,e)
      case Pkm.ARCHEN:
        return new Archen(s,e)
      case Pkm.ARCHEOPS:
        return new Archeops(s,e)
      case Pkm.SHIELDON:
        return new Shieldon(s,e)
      case Pkm.BASTIODON:
        return new Bastiodon(s,e)
      case Pkm.TIRTOUGA:
        return new Tirtouga(s,e)
      case Pkm.CARRACOSTA:
        return new Carracosta(s,e)
      case Pkm.LILEEP:
        return new Lileep(s,e)
      case Pkm.CRADILY:
        return new Cradily(s,e)
      case Pkm.OMANYTE:
        return new Omanyte(s,e)
      case Pkm.OMASTAR:
        return new Omastar(s,e)
      case Pkm.CRANIDOS:
        return new Cranidos(s,e)
      case Pkm.RAMPARDOS:
        return new Rampardos(s,e)
      case Pkm.TYRUNT:
        return new Tyrunt(s,e)
      case Pkm.TYRANTRUM:
        return new Tyrantrum(s,e)
      case Pkm.KABUTO:
        return new Kabuto(s,e)
      case Pkm.KABUTOPS:
        return new Kabutops(s,e)
      case Pkm.BUDEW:
        return new Budew(s,e)
      case Pkm.ROSELIA:
        return new Roselia(s,e)
      case Pkm.ROSERADE:
        return new Roserade(s,e)
      case Pkm.BUNEARY:
        return new Buneary(s,e)
      case Pkm.LOPUNNY:
        return new Lopunny(s,e)
      case Pkm.MEGA_LOPUNNY:
        return new MegaLopunny(s,e)
      case Pkm.AXEW:
        return new Axew(s,e)
      case Pkm.FRAXURE:
        return new Fraxure(s,e)
      case Pkm.HAXORUS:
        return new Haxorus(s,e)
      case Pkm.VENIPEDE:
        return new Venipede(s,e)
      case Pkm.WHIRLIPEDE:
        return new Whirlipede(s,e)
      case Pkm.SCOLIPEDE:
        return new Scolipede(s,e)
      case Pkm.PORYGON:
        return new Porygon(s,e)
      case Pkm.PORYGON_2:
        return new Porygon2(s,e)
      case Pkm.PORYGON_Z:
        return new PorygonZ(s,e)
      case Pkm.ELECTRIKE:
        return new Electrike(s,e)
      case Pkm.MANECTRIC:
        return new Manectric(s,e)
      case Pkm.MEGA_MANECTRIC:
        return new MegaManectric(s,e)
      case Pkm.SHUPPET:
        return new Shuppet(s,e)
      case Pkm.BANETTE:
        return new Banette(s,e)
      case Pkm.MEGA_BANETTE:
        return new MegaBanette(s,e)
      case Pkm.HONEDGE:
        return new Honedge(s,e)
      case Pkm.DOUBLADE:
        return new Doublade(s,e)
      case Pkm.AEGISLASH:
        return new Aegislash(s,e)
      case Pkm.CUBONE:
        return new Cubone(s,e)
      case Pkm.MAROWAK:
        return new Marowak(s,e)
      case Pkm.ALOLAN_MAROWAK:
        return new AlolanMarowak(s,e)
      case Pkm.WHISMUR:
        return new Whismur(s,e)
      case Pkm.LOUDRED:
        return new Loudred(s,e)
      case Pkm.EXPLOUD:
        return new Exploud(s,e)
      case Pkm.TYMPOLE:
        return new Tympole(s,e)
      case Pkm.PALPITOAD:
        return new Palpitoad(s,e)
      case Pkm.SEISMITOAD:
        return new Seismitoad(s,e)
      case Pkm.SEWADDLE:
        return new Sewaddle(s,e)
      case Pkm.SWADLOON:
        return new Swadloon(s,e)
      case Pkm.LEAVANNY:
        return new Leavanny(s,e)
      case Pkm.PIKIPEK:
        return new Pikipek(s,e)
      case Pkm.TRUMBEAK:
        return new Trumbeak(s,e)
      case Pkm.TOUCANNON:
        return new Toucannon(s,e)
      case Pkm.FLABEBE:
        return new Flabebe(s,e)
      case Pkm.FLOETTE:
        return new Floette(s,e)
      case Pkm.FLORGES:
        return new Florges(s,e)
      case Pkm.JANGMO_O:
        return new JangmoO(s,e)
      case Pkm.HAKAMO_O:
        return new HakamoO(s,e)
      case Pkm.KOMMO_O:
        return new KommoO(s,e)
      case Pkm.MELOETTA:
        return new Meloetta(s,e)
      case Pkm.ALTARIA:
        return new Altaria(s,e)
      case Pkm.MEGA_ALTARIA:
        return new MegaAltaria(s,e)
      case Pkm.CASTFORM:
        return new Castform(s,e)
      case Pkm.CASTFORM_SUN:
        return new CastformSun(s,e)
      case Pkm.CASTFORM_RAIN:
        return new CastformRain(s,e)
      case Pkm.CASTFORM_HAIL:
        return new CastformHail(s,e)
      case Pkm.CORPHISH:
        return new Corphish(s,e)
      case Pkm.CRAWDAUNT:
        return new Crawdaunt(s,e)
      case Pkm.JOLTIK:
        return new Joltik(s,e)
      case Pkm.GALVANTULA:
        return new Galvantula(s,e)
      case Pkm.GENESECT:
        return new Genesect(s,e)
      case Pkm.DIANCIE:
        return new Diancie(s,e)
      case Pkm.HATENNA:
        return new Hatenna(s,e)
      case Pkm.HATTREM:
        return new Hattrem(s,e)
      case Pkm.HATTERENE:
        return new Hatterene(s,e)
      case Pkm.FENNEKIN:
        return new Fennekin(s,e)
      case Pkm.BRAIXEN:
        return new Braixen(s,e)
      case Pkm.DELPHOX:
        return new Delphox(s,e)
      case Pkm.MAKUHITA:
        return new Makuhita(s,e)
      case Pkm.HARIYAMA:
        return new Hariyama(s,e)
      case Pkm.REGIELEKI:
        return new Regieleki(s,e)
      case Pkm.REGIDRAGO:
        return new Regidrago(s,e)
      case Pkm.GUZZLORD:
        return new Guzzlord(s,e)
      case Pkm.ETERNATUS:
        return new Eternatus(s,e)
      case Pkm.PONYTA:
        return new Ponyta(s,e)
      case Pkm.RAPIDASH:
        return new Rapidash(s,e)
      case Pkm.NINCADA:
        return new Nincada(s,e)
      case Pkm.NINJASK:
        return new Ninjask(s,e)
      case Pkm.SHEDNINJA:
        return new Shedninja(s,e)
      case Pkm.NOIBAT:
        return new Noibat(s,e)
      case Pkm.NOIVERN:
        return new Noivern(s,e)
      case Pkm.PUMPKABOO:
        return new Pumpkaboo(s,e)
      case Pkm.GOURGEIST:
        return new Gourgeist(s,e)
      case Pkm.CACNEA:
        return new Cacnea(s,e)
      case Pkm.CACTURNE:
        return new Cacturne(s,e)
      case Pkm.RELICANTH:
        return new Relicanth(s,e)
      case Pkm.TAUROS:
        return new Tauros(s,e)
      case Pkm.DEFAULT:
        return new Magikarp(s,e)
      default:
        // console.log(`No pokemon with name "${name}" found, return magikarp`);
        return new Magikarp(s,e)
    }
  }

  static getPokemonRarityFromName(name: Pkm) {
    const pokemon: Pokemon = PokemonFactory.createPokemonFromName(name)
    return pokemon.rarity
  }

  static getPkmIndexFromName(name: Pkm) {
      const pokemon: Pokemon = PokemonFactory.createPokemonFromName(name)
      return pokemon.index
  }

  static getRandomFossil(board: MapSchema<Pokemon>) {
    const currentFossils = new Array<Pkm>()
    board.forEach( (p) =>{
      if (p.types.includes(Synergy.FOSSIL)) {
        currentFossils.push(p.name)
      }
    })
    const possibleFossils = new Array<Pkm>();
    (PRECOMPUTED_TYPE_POKEMONS[Synergy.FOSSIL].pokemons as Pkm[]).forEach((p)=>{
      if (!currentFossils.includes(p)) {
        possibleFossils.push(p)
      }
    })
    if (possibleFossils.length > 0) {
      return possibleFossils[Math.floor(Math.random() * possibleFossils.length)]
    } else {
      return Pkm.AERODACTYL
    }
  }
}
