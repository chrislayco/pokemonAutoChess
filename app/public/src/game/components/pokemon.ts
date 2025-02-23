import {GameObjects} from 'phaser'
import Lifebar from './life-bar'
import Button from './button'
import PokemonDetail from './pokemon-detail'
import ItemsContainer from './items-container'
import { Effect } from '../../../../types/enum/Effect'
import {transformAttackCoordinate, getAttackScale} from '../../pages/utils/utils'
import { IPokemon, IPokemonEntity, instanceofPokemonEntity, Emotion, AttackSprite } from '../../../../types'
import MoveToPlugin from 'phaser3-rex-plugins/plugins/moveto-plugin'
import MoveTo from 'phaser3-rex-plugins/plugins/moveto'
import GameScene from '../scenes/game-scene'
import { AttackType, Orientation, PokemonActionState, SpriteType, PokemonTint } from '../../../../types/enum/Game'
import { Ability } from '../../../../types/enum/Ability'
import ManaBar from './mana-bar'
import { Synergy } from '../../../../types/enum/Synergy'

export default class Pokemon extends Button {
  emotion: Emotion
  shiny: boolean
  isPopup: boolean
  index: string
  id: string
  hp: number
  range: number
  critChance: number
  atk: number
  def: number
  speDef: number
  attackType: AttackType
  atkSpeed: number
  targetX: number | null
  targetY: number | null
  skill: Ability
  positionX: number
  positionY: number
  attackSprite: AttackSprite
  team: number | undefined
  critDamage: number
  spellDamage: number
  life: number | undefined
  shield: number | undefined
  projectile: GameObjects.Sprite | undefined
  itemsContainer: ItemsContainer
  orientation: Orientation
  action: PokemonActionState
  moveManager: MoveTo
  rangeType: string
  types: Synergy[]
  lifebar: Lifebar | undefined
  detail: PokemonDetail | undefined
  mana: number | undefined
  maxMana: number
  manabar: ManaBar | undefined
  sprite: GameObjects.Sprite
  shadow: GameObjects.Sprite
  wound: GameObjects.Sprite | undefined
  burn: GameObjects.Sprite | undefined
  sleep: GameObjects.Sprite | undefined
  silence: GameObjects.Sprite | undefined
  freeze: GameObjects.Sprite | undefined
  confusion: GameObjects.Sprite | undefined
  smoke: GameObjects.Sprite | undefined
  armorReduction: GameObjects.Sprite | undefined
  poison: GameObjects.Sprite | undefined
  protect: GameObjects.Sprite | undefined
  resurection: GameObjects.Sprite | undefined
  runeProtect: GameObjects.Sprite | undefined

  constructor(scene: Phaser.Scene, x: number, y: number, pokemon: IPokemonEntity | IPokemon, dragable: boolean, isPopup: boolean) {
    super(scene, x, y, 75, 75)
    this.emotion = pokemon.emotion
    this.shiny = pokemon.shiny
    this.isPopup = isPopup
    this.height = 0
    this.width = 0
    this.index = pokemon.index
    if(!scene.textures.exists(this.index)){this.index = '0000'}
    this.name = pokemon.name
    this.id = pokemon.id
    this.hp = pokemon.hp
    this.range = pokemon.range
    this.critChance = 10
    this.atk = pokemon.atk
    this.def = pokemon.def
    this.speDef = pokemon.speDef
    this.attackType = pokemon.attackType
    this.types = pokemon.types
    this.maxMana = pokemon.maxMana
    this.atkSpeed = pokemon.atkSpeed
    this.targetX = null
    this.targetY = null
    this.skill = pokemon.skill
    this.positionX = pokemon.positionX
    this.positionY = pokemon.positionY
    this.attackSprite = pokemon.attackSprite
    if (this.range > 1) {
      this.rangeType = 'range'
    } else {
      this.rangeType = 'melee'
    }
    const m = <MoveToPlugin> scene.plugins.get('rexMoveTo')
    this.moveManager = m.add(this, {
      speed: 300,
      rotateToTarget: false
    })
    const p = <IPokemonEntity> pokemon
    if(p.orientation){
      this.orientation = p.orientation
      this.action = p.action
    }
    else{
      this.orientation = Orientation.DOWNLEFT
      this.action = PokemonActionState.WALK
    }
    this.sprite = new GameObjects.Sprite(scene, 0, 0, this.index, `${PokemonTint.NORMAL}/${PokemonActionState.IDLE}/${SpriteType.ANIM}/${Orientation.DOWN}/0000`)
    //this.sprite.setOrigin(0,0);
    this.sprite.setScale(2, 2)
    this.sprite.on(Phaser.Animations.Events.ANIMATION_COMPLETE, (animation, frame, gameObject, frameKey: string)=>{const g = <GameScene> scene; if(frameKey.includes(PokemonActionState.ATTACK)){g.animationManager?.animatePokemon(this, PokemonActionState.IDLE)}})
    this.height = this.sprite.height
    this.width = this.sprite.width
    this.itemsContainer = new ItemsContainer(scene, p.items, this.width/2 + 25, -35, false)
    this.shadow = new GameObjects.Sprite(scene, 0, 5, this.index)
    //this.shadow.setOrigin(0,0);
    this.shadow.setScale(2, 2)
    scene.add.existing(this.shadow)
    scene.add.existing(this.sprite)
    this.add(this.shadow)
    this.add(this.itemsContainer)

    if(instanceofPokemonEntity(pokemon)){
      if (p.effects && (p.effects.includes(Effect.IRON_DEFENSE) || p.effects.includes(Effect.AUTOTOMIZE))) {
        this.sprite.setScale(3, 3)
      }
      this.setLifeBar(p, scene)
      this.setManaBar(p, scene)
      //this.setEffects(p, scene);
    }
    this.add(this.sprite)
    if (dragable) {
      scene.input.setDraggable(this)
    }
    if(instanceofPokemonEntity(pokemon)){
      const p = <IPokemonEntity> pokemon
      this.mana = p.mana
      this.team = p.team
      this.shield = p.shield
      this.life = p.life
      this.critDamage = p.critDamage
      this.spellDamage = p.spellDamage
      this.critChance = p.critChance
    }
    else{
      this.critDamage = 2
      this.spellDamage = 0
      this.critChance = 10
    }
    this.setDepth(5)
  }

  closeDetail(){
    if(this.detail){
      this.detail.dom.remove()
      this.remove(this.detail, true)
      this.detail = undefined
    }
  }

  enterButtonActiveState(pointer: Phaser.Input.Pointer){
    if(pointer.rightButtonDown()){
      const s = <GameScene> this.scene
      if(s.lastPokemonDetail && s.lastPokemonDetail != this){
        s.lastPokemonDetail.closeDetail()
        s.lastPokemonDetail = undefined
      }
      if (this.detail) {
        this.closeDetail()
      }
      else{
        if (this.life && this.mana) {
          this.detail = new PokemonDetail(this.scene, 0, 0, this.name, this.life, this.atk, this.def, this.speDef, this.attackType, this.range, this.atkSpeed.toFixed(2), this.critChance, this.critDamage, this.spellDamage, this.mana, this.types, this.skill, this.emotion, this.shiny, this.index)
        } else {
          this.detail = new PokemonDetail(this.scene, 0, 0, this.name, this.hp, this.atk, this.def, this.speDef, this.attackType, this.range, this.atkSpeed.toFixed(2), this.critChance, this.critDamage, this.spellDamage, this.maxMana, this.types, this.skill, this.emotion, this.shiny, this.index)
        }
        this.detail.setPosition(this.detail.width / 2 + 40, -this.detail.height / 2 - 40)
        this.add(this.detail)
        s.lastPokemonDetail = this
      }
    }
  }

  attackAnimation() {
    let x: number | null
    let y: number | null
    if (this.range > 1) {
      x = this.positionX
      y = this.positionY
    } else {
      x = this.targetX
      y = this.targetY
    }

    if (this.projectile) {
        this.projectile.destroy()
    }

    if(x && y){
      const coordinates = transformAttackCoordinate(x, y)

      this.projectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'attacks', `${this.attackSprite}/000`)
      const scale = getAttackScale(this.attackSprite)
      this.projectile.setScale(scale[0], scale[1])
      this.projectile.anims.play(`${this.attackSprite}`)
      this.addTween()
    }
  }

  petalDanceAnimation() {
    const coordinates = transformAttackCoordinate(this.positionX, this.positionY)
    const specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], Ability.PETAL_DANCE, '000')
    specialProjectile.setDepth(7)
    specialProjectile.setScale(2, 2)
    specialProjectile.anims.play(Ability.PETAL_DANCE)
    specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      specialProjectile.destroy()
    })
  }

  fieldDeathAnimation() {
    const coordinates = transformAttackCoordinate(this.positionX, this.positionY)
    const specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'FIELD_DEATH', '000')
    specialProjectile.setDepth(7)
    specialProjectile.setScale(2, 2)
    specialProjectile.anims.play('FIELD_DEATH')
    specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      specialProjectile.destroy()
    })
  }

  fairyCritAnimation() {
    const coordinates = transformAttackCoordinate(this.positionX, this.positionY)
    const specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'FAIRY_CRIT', '000')
    specialProjectile.setDepth(7)
    specialProjectile.setScale(2, 2)
    specialProjectile.anims.play('FAIRY_CRIT')
    specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      specialProjectile.destroy()
    })
  }

  soundAnimation() {
    const coordinates = transformAttackCoordinate(this.positionX, this.positionY)
    const specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'ECHO', '000')
    specialProjectile.setDepth(7)
    specialProjectile.setScale(2, 2)
    specialProjectile.anims.play('ECHO')
    specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      specialProjectile.destroy()
    })
  }

  growGroundAnimation() {
    const coordinates = transformAttackCoordinate(this.positionX, this.positionY)
    const specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'attacks', 'GROUND/cell/000')
    specialProjectile.setDepth(7)
    specialProjectile.setScale(1.5, 1.5)
    specialProjectile.anims.play('ground-grow')
    specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      specialProjectile.destroy()
    })
  }

  incenseAnimation() {
    const coordinates = transformAttackCoordinate(this.positionX, this.positionY)
    const specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'INCENSE_DAMAGE', '000')
    specialProjectile.setDepth(7)
    specialProjectile.setScale(2, 2)
    specialProjectile.anims.play('INCENSE_DAMAGE')
    specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      specialProjectile.destroy()
    })
  }

  brightPowderAnimation() {
    const coordinates = transformAttackCoordinate(this.positionX, this.positionY)
    const specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'BRIGHT_POWDER', '000')
    specialProjectile.setDepth(7)
    specialProjectile.setScale(2, 2)
    specialProjectile.anims.play('BRIGHT_POWDER')
    specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      specialProjectile.destroy()
    })
  }

  staticAnimation() {
    const coordinates = transformAttackCoordinate(this.positionX, this.positionY)
    const specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'STATIC', '000')
    specialProjectile.setDepth(7)
    specialProjectile.setScale(3, 3)
    specialProjectile.anims.play('STATIC')
    specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      specialProjectile.destroy()
    })
  }

  earthquakeAnimation(){
    const coordinates = transformAttackCoordinate(this.positionX, this.positionY)
    const specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], Ability.EARTHQUAKE, '000')
    specialProjectile.setDepth(7)
    specialProjectile.setScale(3, 3)
    specialProjectile.anims.play(Ability.EARTHQUAKE)
    specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      specialProjectile.destroy()
    })
  }

  deathAnimation() {
    this.life = 0
    if(this.lifebar){
      this.lifebar.setAmount(this.life)
    }

    if (this.projectile) {
        this.projectile.destroy()
    }

    this.scene.add.tween({
      targets: [this],
      ease: 'Linear',
      duration: 1500,
      delay: 0,
      alpha: {
        getStart: () => 1,
        getEnd: () => 0
      },
      onComplete: () => {
        this.destroy(true)
      }
    })
  }

  specialAttackAnimation(group: Phaser.GameObjects.Group) {
    if (this.skill) {
      let coordinates: number[]
      let specialProjectile: GameObjects.Sprite
      let additionalProjectile: GameObjects.Sprite
      let coordinatesTarget: number[]

      if (this.targetX && this.targetY && this.targetX != -1 && this.targetY != -1) {
        switch (this.skill) {
            case Ability.FIRE_BLAST:
                coordinates = transformAttackCoordinate(this.targetX, this.targetY)
                specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.FIRE_BLAST}/000`)
                specialProjectile.setDepth(7)
                specialProjectile.setScale(2, 2)
                specialProjectile.anims.play(Ability.FIRE_BLAST)
                specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                  specialProjectile.destroy()
                })
                break

            case Ability.CORRUPTED_NATURE:
                coordinates = transformAttackCoordinate(this.positionX, this.positionY)
                specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'pmd-replace', `${Ability.CORRUPTED_NATURE}/000`)
                specialProjectile.setDepth(7)
                specialProjectile.setScale(2, 2)
                specialProjectile.anims.play(Ability.CORRUPTED_NATURE)
                specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                specialProjectile.destroy()
                })
                break

            case Ability.CRABHAMMER:
                coordinates = transformAttackCoordinate(this.targetX, this.targetY)
                specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'pmd-replace', `${Ability.CRABHAMMER}/000`)
                specialProjectile.setDepth(7)
                specialProjectile.setScale(2, 2)
                specialProjectile.anims.play(Ability.CRABHAMMER)
                specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                specialProjectile.destroy()
                })
                break

            case Ability.DIAMOND_STORM:
                coordinates = transformAttackCoordinate(this.positionX, this.positionY)
                specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'pmd-replace', `${Ability.DIAMOND_STORM}/000`)
                specialProjectile.setDepth(7)
                specialProjectile.setScale(2, 2)
                specialProjectile.anims.play(Ability.DIAMOND_STORM)
                specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                specialProjectile.destroy()
                })
                break

            case Ability.DRACO_ENERGY:
                coordinates = transformAttackCoordinate(this.targetX, this.targetY)
                specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'pmd-replace', `${Ability.DRACO_ENERGY}/000`)
                specialProjectile.setDepth(7)
                specialProjectile.setScale(2, 2)
                specialProjectile.anims.play(Ability.DRACO_ENERGY)
                specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                specialProjectile.destroy()
                })
                break

            case Ability.DYNAMAX_CANNON:
                coordinates = transformAttackCoordinate(this.targetX, this.targetY)
                specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'pmd-replace', `${Ability.DYNAMAX_CANNON}/000`)
                specialProjectile.setDepth(7)
                specialProjectile.setScale(2, 2)
                specialProjectile.anims.play(Ability.DYNAMAX_CANNON)
                specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                specialProjectile.destroy()
                })
                break

            case Ability.DYNAMIC_PUNCH:
                coordinates = transformAttackCoordinate(this.targetX, this.targetY)
                specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'pmd-replace', `${Ability.DYNAMIC_PUNCH}/000`)
                specialProjectile.setDepth(7)
                specialProjectile.setScale(2, 2)
                specialProjectile.anims.play(Ability.DYNAMIC_PUNCH)
                specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                specialProjectile.destroy()
                })
                break

            case Ability.ELECTRO_WEB:
                coordinates = transformAttackCoordinate(this.targetX, this.targetY)
                specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'pmd-replace', `${Ability.ELECTRO_WEB}/000`)
                specialProjectile.setDepth(7)
                specialProjectile.setScale(2, 2)
                specialProjectile.anims.play(Ability.ELECTRO_WEB)
                specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                specialProjectile.destroy()
                })
                break

            case Ability.FIRE_TRICK:
                coordinates = transformAttackCoordinate(this.targetX, this.targetY)
                specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'pmd-replace', `${Ability.FIRE_TRICK}/000`)
                specialProjectile.setDepth(7)
                specialProjectile.setScale(2, 2)
                specialProjectile.anims.play(Ability.FIRE_TRICK)
                specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                specialProjectile.destroy()
                })
                break

            case Ability.FLAME_CHARGE:
                coordinates = transformAttackCoordinate(this.positionX, this.positionY)
                specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'pmd-replace', `${Ability.FLAME_CHARGE}/000`)
                specialProjectile.setDepth(7)
                specialProjectile.setScale(2, 2)
                specialProjectile.anims.play(Ability.FLAME_CHARGE)
                specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                specialProjectile.destroy()
                })
                break

            case Ability.LEECH_SEED:
                coordinates = transformAttackCoordinate(this.targetX, this.targetY)
                specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'pmd-replace', `${Ability.LEECH_SEED}/000`)
                specialProjectile.setDepth(7)
                specialProjectile.setScale(2, 2)
                specialProjectile.anims.play(Ability.LEECH_SEED)
                specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                specialProjectile.destroy()
                })
                break

            case Ability.LOCK_ON:
                coordinates = transformAttackCoordinate(this.targetX, this.targetY)
                specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'pmd-replace', `${Ability.LOCK_ON}/000`)
                specialProjectile.setDepth(7)
                specialProjectile.setScale(2, 2)
                specialProjectile.anims.play(Ability.LOCK_ON)
                specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                specialProjectile.destroy()
                })
                break

            case Ability.PSYCH_UP:
                coordinates = transformAttackCoordinate(this.positionX, this.positionY)
                specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'pmd-replace', `${Ability.PSYCH_UP}/000`)
                specialProjectile.setDepth(7)
                specialProjectile.setScale(2, 2)
                specialProjectile.anims.play(Ability.PSYCH_UP)
                specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                specialProjectile.destroy()
                })
                break

          case Ability.RAZOR_WIND:
                coordinates = transformAttackCoordinate(this.targetX, this.targetY)
                specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'pmd-replace', `${Ability.RAZOR_WIND}/000`)
                specialProjectile.setDepth(7)
                specialProjectile.setScale(2, 2)
                specialProjectile.anims.play(Ability.RAZOR_WIND)
                specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                specialProjectile.destroy()
                })
                break

            case Ability.TWISTING_NEITHER:
                coordinates = transformAttackCoordinate(this.targetX, this.targetY)
                specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'pmd-replace', `${Ability.TWISTING_NEITHER}/000`)
                specialProjectile.setDepth(7)
                specialProjectile.setScale(4, 4)
                specialProjectile.anims.play(Ability.TWISTING_NEITHER)
                specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                specialProjectile.destroy()
                })
                break
    

          case Ability.WHEEL_OF_FIRE:
            coordinatesTarget = transformAttackCoordinate(this.targetX, this.targetY)
            coordinates = transformAttackCoordinate(this.positionX, this.positionY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.WHEEL_OF_FIRE}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.WHEEL_OF_FIRE)
            this.scene.tweens.add({
              targets: specialProjectile,
              x: coordinatesTarget[0],
              y: coordinatesTarget[1],
              ease: 'Power2',
              yoyo: true,
              duration: 500,
              onComplete: () => {
                specialProjectile.destroy()
              }
            })
            break

          case Ability.ORIGIN_PULSE:
            coordinatesTarget = transformAttackCoordinate(0, this.targetY)
            coordinates = transformAttackCoordinate(8, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.ORIGIN_PULSE}/0`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.ORIGIN_PULSE)
            this.scene.tweens.add({
              targets: specialProjectile,
              x: coordinatesTarget[0],
              y: coordinatesTarget[1],
              duration: 2000,
              onComplete: () => {
                specialProjectile.destroy()
              }
            })
            break

          case Ability.SEED_FLARE:
            coordinates = transformAttackCoordinate(this.positionX, this.positionY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.SEED_FLARE}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(5, 5)
            specialProjectile.anims.play(Ability.SEED_FLARE)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.SEISMIC_TOSS:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.SEISMIC_TOSS}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.SEISMIC_TOSS)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.GUILLOTINE:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.GUILLOTINE}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(3, 3)
            specialProjectile.anims.play(Ability.GUILLOTINE)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.ROCK_SLIDE:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.ROCK_SLIDE}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.ROCK_SLIDE)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.HEAT_WAVE:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.HEAT_WAVE}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.HEAT_WAVE)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.THUNDER:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.THUNDER}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.THUNDER)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.HYDRO_PUMP:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.HYDRO_PUMP}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.HYDRO_PUMP)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.DRACO_METEOR:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.DRACO_METEOR}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.DRACO_METEOR)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.BLAZE_KICK:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.BLAZE_KICK}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.BLAZE_KICK)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.WISH:
            coordinates = transformAttackCoordinate(this.positionX, this.positionY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.WISH}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(3, 3)
            specialProjectile.anims.play(Ability.WISH)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.CALM_MIND:
            coordinates = transformAttackCoordinate(this.positionX, this.positionY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.CALM_MIND}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.CALM_MIND)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.IRON_DEFENSE:
            coordinates = transformAttackCoordinate(this.positionX, this.positionY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.IRON_DEFENSE}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.IRON_DEFENSE)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.METRONOME:
            coordinates = transformAttackCoordinate(this.positionX, this.positionY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.METRONOME}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.METRONOME)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.SOAK:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.SOAK}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.SOAK)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.IRON_TAIL:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.IRON_TAIL}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.IRON_TAIL)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.BLAST_BURN:
            coordinates = transformAttackCoordinate(this.positionX, this.positionY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.BLAST_BURN}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(3, 3)
            specialProjectile.anims.play(Ability.BLAST_BURN)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.CHARGE:
            coordinates = transformAttackCoordinate(this.positionX, this.positionY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.CHARGE}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.CHARGE)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.DISCHARGE:
            coordinates = transformAttackCoordinate(this.positionX, this.positionY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.DISCHARGE}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(3, 3)
            specialProjectile.anims.play(Ability.DISCHARGE)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.BITE:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.BITE}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.BITE)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.DRAGON_TAIL:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.DRAGON_TAIL}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.DRAGON_TAIL)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.DRAGON_BREATH:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.DRAGON_BREATH}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.DRAGON_BREATH)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.ICICLE_CRASH:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.ICICLE_CRASH}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(3, 3)
            specialProjectile.anims.play(Ability.ICICLE_CRASH)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.ROOT:
            coordinates = transformAttackCoordinate(this.positionX, this.positionY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.ROOT}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.ROOT)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.TORMENT:
            coordinates = transformAttackCoordinate(this.positionX, this.positionY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.TORMENT}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.TORMENT)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.STOMP:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.STOMP}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(3, 3)
            specialProjectile.anims.play(Ability.STOMP)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.DARK_PULSE:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.DARK_PULSE}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.DARK_PULSE)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.NIGHT_SLASH:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.NIGHT_SLASH}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.NIGHT_SLASH)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.BUG_BUZZ:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.BUG_BUZZ}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.BUG_BUZZ)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.POISON_STING:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.POISON_STING}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.POISON_STING)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.LEECH_LIFE:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.LEECH_LIFE}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.LEECH_LIFE)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.HAPPY_HOUR:
            coordinates = transformAttackCoordinate(this.positionX, this.positionY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.HAPPY_HOUR}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.HAPPY_HOUR)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.TELEPORT:
            coordinates = transformAttackCoordinate(this.positionX, this.positionY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.TELEPORT}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.TELEPORT)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.NASTY_PLOT:
            coordinates = transformAttackCoordinate(this.positionX, this.positionY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.NASTY_PLOT}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.NASTY_PLOT)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.THIEF:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.THIEF}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.THIEF)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.STUN_SPORE:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.STUN_SPORE}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.STUN_SPORE)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.METEOR_MASH:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.METEOR_MASH}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(3, 3)
            specialProjectile.anims.play(Ability.METEOR_MASH)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.HURRICANE:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'specials', `${Ability.HURRICANE}/000`)
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.HURRICANE)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.ROAR_OF_TIME:
            coordinates = transformAttackCoordinate(this.positionX, this.positionY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'ROAR_OF_TIME', '000')
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.ROAR_OF_TIME)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.ROCK_TOMB:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'ROCK_TOMB', '000')
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.ROCK_TOMB)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.ROCK_SMASH:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], 'ROCK_SMASH', '000')
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.ROCK_SMASH)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.VOLT_SWITCH:
            coordinates = transformAttackCoordinate(this.positionX, this.positionY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], Ability.VOLT_SWITCH, '0')
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.VOLT_SWITCH)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.HYPER_VOICE:
            coordinatesTarget = transformAttackCoordinate(8, this.targetY)
            coordinates = transformAttackCoordinate(0, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], Ability.HYPER_VOICE, '0')
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.HYPER_VOICE)
            this.scene.tweens.add({
              targets: specialProjectile,
              x: coordinatesTarget[0],
              y: coordinatesTarget[1],
              duration: 1000,
              onComplete: () => {
                specialProjectile.destroy()
              }
            })
            break

          case Ability.SHADOW_CLONE:
            coordinates = transformAttackCoordinate(this.positionX, this.positionY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], Ability.SHADOW_CLONE, '0')
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.SHADOW_CLONE)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.ECHO:
            coordinates = transformAttackCoordinate(this.positionX, this.positionY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], Ability.ECHO, '000')
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.ECHO)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.EXPLOSION:
            coordinates = transformAttackCoordinate(this.positionX, this.positionY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], Ability.EXPLOSION, '000')
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.EXPLOSION)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break


          case Ability.CLANGOROUS_SOUL:
            coordinates = transformAttackCoordinate(this.positionX, this.positionY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], Ability.CLANGOROUS_SOUL, '000')
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.CLANGOROUS_SOUL)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.GROWL:
            coordinates = transformAttackCoordinate(this.positionX, this.positionY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], Ability.GROWL, '000')
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.GROWL)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.DISARMING_VOICE:
            group.getChildren().forEach((p) => {
              const pokemon = <Pokemon> p
              if (this.team == pokemon.team) {
                const coordinates = transformAttackCoordinate(pokemon.positionX, pokemon.positionY)
                const s = this.scene.add.sprite(coordinates[0], coordinates[1], Ability.DISARMING_VOICE, '000')
                s.setDepth(7)
                s.setScale(2, 2)
                s.anims.play(Ability.DISARMING_VOICE)
                s.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                  s.destroy()
                })
              }
            })
            break

          case Ability.RELIC_SONG:
            group.getChildren().forEach((p) => {
              const pokemon = <Pokemon> p
              if (this.team != pokemon.team) {
                const coordinates = transformAttackCoordinate(pokemon.positionX, pokemon.positionY)
                const s = this.scene.add.sprite(coordinates[0], coordinates[1], Ability.RELIC_SONG, '000')
                s.setDepth(7)
                s.setScale(2, 2)
                s.anims.play(Ability.RELIC_SONG)
                s.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                  s.destroy()
                })
              }
            })
            break

          case Ability.HIGH_JUMP_KICK:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], Ability.HIGH_JUMP_KICK, '000')
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.HIGH_JUMP_KICK)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            break

          case Ability.TRI_ATTACK:
            coordinatesTarget = transformAttackCoordinate(this.targetX, this.targetY)
            coordinates = transformAttackCoordinate(this.positionX, this.positionY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], Ability.TRI_ATTACK, '000')
            specialProjectile.setDepth(7)
            specialProjectile.anims.play(Ability.TRI_ATTACK)
            this.scene.tweens.add({
              targets: specialProjectile,
              x: coordinatesTarget[0],
              y: coordinatesTarget[1],
              duration: 500,
              onComplete: () => {
                specialProjectile.destroy()
              }
            })
            break

          case Ability.BONEMERANG:
            coordinatesTarget = transformAttackCoordinate(this.targetX, 6)
            coordinates = transformAttackCoordinate(this.targetX, 0)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], Ability.BONEMERANG, '000')
            specialProjectile.setDepth(7)
            specialProjectile.setScale(3, 3)
            specialProjectile.anims.play(Ability.BONEMERANG)
            this.scene.tweens.add({
              targets: specialProjectile,
              x: coordinatesTarget[0],
              y: coordinatesTarget[1],
              ease: 'Power2',
              yoyo: true,
              duration: 1000,
              onComplete: () => {
                specialProjectile.destroy()
              }
            })
            break

          case Ability.SONG_OF_DESIRE:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], Ability.SONG_OF_DESIRE, '000')
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.SONG_OF_DESIRE)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            coordinates = transformAttackCoordinate(this.positionX, this.positionY)
            additionalProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], Ability.SONG_OF_DESIRE, '000')
            additionalProjectile.setDepth(7)
            additionalProjectile.setScale(2, 2)
            additionalProjectile.anims.play(Ability.SONG_OF_DESIRE)
            additionalProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              additionalProjectile.destroy()
            })
            break

          case Ability.CONFUSING_MIND:
            coordinates = transformAttackCoordinate(this.targetX, this.targetY)
            specialProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], Ability.CONFUSING_MIND, '000')
            specialProjectile.setDepth(7)
            specialProjectile.setScale(2, 2)
            specialProjectile.anims.play(Ability.CONFUSING_MIND)
            specialProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              specialProjectile.destroy()
            })
            coordinates = transformAttackCoordinate(this.positionX, this.positionY)
            additionalProjectile = this.scene.add.sprite(coordinates[0], coordinates[1], Ability.CONFUSING_MIND, '000')
            additionalProjectile.setDepth(7)
            additionalProjectile.setScale(2, 2)
            additionalProjectile.anims.play(Ability.CONFUSING_MIND)
            additionalProjectile.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
              additionalProjectile.destroy()
            })
            break

          default:
            break
        }
      }
    }
  }

  addTween() {
    if (this.targetX && this.targetY && this.targetX != -1 && this.targetY != -1) {
      const coordinates = transformAttackCoordinate(this.targetX, this.targetY)

      if (this.scene) {
        // console.log(`Shooting a projectile to (${this.targetX},${this.targetY})`);
        this.scene.tweens.add({
          targets: this.projectile,
          x: coordinates[0],
          y: coordinates[1],
          ease: 'Linear',
          duration: this.atkSpeed ? 1000 / this.atkSpeed: 1500,
          onComplete: () => {
            if(this.projectile){
              this.projectile.destroy()
            }
          }
        })
      } else {
        if(this.projectile){
          this.projectile.destroy()
        }
      }
    }
  }

  setLifeBar(pokemon: IPokemonEntity, scene: Phaser.Scene) {
    if (pokemon.life !== undefined) {
      this.lifebar = new Lifebar(scene, 0, this.height/2 + 6, 60, pokemon.life + pokemon.shield, pokemon.shield, pokemon.team)
      this.lifebar.setAmount(pokemon.life)
      this.lifebar.setShieldAmount(pokemon.shield)
      this.add(this.lifebar)
    }
  }

  setManaBar(pokemon: IPokemonEntity, scene: Phaser.Scene) {
    if (pokemon.mana !== undefined) {
      this.manabar = new ManaBar(scene, 0, this.height/2 + 12, 60, pokemon.maxMana)
      this.manabar.setAmount(pokemon.mana)
      this.add(this.manabar)
    }
  }

  addWound() {
    if (!this.wound) {
      this.wound = new GameObjects.Sprite(this.scene, 0, -30, 'wound', '000')
      this.wound.setScale(2, 2)
      this.scene.add.existing(this.wound)
      this.wound.anims.play('wound')
      this.add(this.wound)
    }
  }

  removeWound() {
    if (this.wound) {
      this.remove(this.wound, true)
      this.wound = undefined
    }
  }

  addBurn() {
    if (!this.burn) {
      this.burn = new GameObjects.Sprite(this.scene, 0, -30, 'status', 'status/burn/000')
      this.burn.setScale(2, 2)
      this.scene.add.existing(this.burn)
      this.burn.anims.play('burn')
      this.add(this.burn)
    }
  }

  removeBurn() {
    if (this.burn) {
      this.remove(this.burn, true)
      this.burn = undefined
    }
  }

  addSleep() {
    if (!this.sleep) {
      this.sleep = new GameObjects.Sprite(this.scene, 0, -30, 'status', 'status/sleep/000')
      this.sleep.setScale(2, 2)
      this.scene.add.existing(this.sleep)
      this.sleep.anims.play('sleep')
      this.add(this.sleep)
    }
    const s = <GameScene> this.scene
    s.animationManager?.animatePokemon(this, PokemonActionState.SLEEP)
  }

  removeSleep() {
    if (this.sleep) {
      this.remove(this.sleep, true)
      this.sleep = undefined
    }
  }

  addSilence() {
    if (!this.silence) {
      this.silence = new GameObjects.Sprite(this.scene, 0, -30, 'status', 'status/silence/000')
      this.silence.setScale(2, 2)
      this.scene.add.existing(this.silence)
      this.silence.anims.play('silence')
      this.add(this.silence)
    }
  }

  removeSilence() {
    if (this.silence) {
      this.remove(this.silence, true)
      this.silence = undefined
    }
  }

  addFreeze() {
    if (!this.freeze) {
      this.freeze = new GameObjects.Sprite(this.scene, 0, 0, 'status', 'status/freeze/000')
      this.freeze.setScale(2, 2)
      this.scene.add.existing(this.freeze)
      this.freeze.anims.play('freeze')
      this.add(this.freeze)
    }
  }

  removeFreeze() {
    if (this.freeze) {
      this.remove(this.freeze, true)
      this.freeze = undefined
    }
  }

  addConfusion() {
    if (!this.confusion) {
      this.confusion = new GameObjects.Sprite(this.scene, 0, -30, 'status', 'status/confusion/000')
      this.confusion.setScale(2, 2)
      this.scene.add.existing(this.confusion)
      this.confusion.anims.play('confusion')
      this.add(this.confusion)
    }
  }

  removeConfusion() {
    if (this.confusion) {
      this.remove(this.confusion, true)
      this.confusion = undefined
    }
  }

  addSmoke() {
    if (!this.smoke) {
      this.smoke = new GameObjects.Sprite(this.scene, 0, -40, 'smoke', '000')
      this.smoke.setScale(2, 2)
      this.scene.add.existing(this.smoke)
      this.smoke.anims.play('smoke')
      this.add(this.smoke)
    }
  }

  removeSmoke() {
    if (this.smoke) {
      this.remove(this.smoke, true)
      this.smoke = undefined
    }
  }

  addArmorReduction() {
    if (!this.armorReduction) {
      this.armorReduction = new GameObjects.Sprite(this.scene, 0, -40, 'armorReduction', '000')
      this.armorReduction.setScale(2, 2)
      this.scene.add.existing(this.armorReduction)
      this.armorReduction.anims.play('armorReduction')
      this.add(this.armorReduction)
    }
  }

  removeArmorReduction() {
    if (this.armorReduction) {
      this.remove(this.armorReduction, true)
      this.armorReduction = undefined
    }
  }


  addPoison() {
    if (!this.poison) {
      this.poison = new GameObjects.Sprite(this.scene, 0, -30, 'status', 'status/poison/000')
      this.poison.setScale(2, 2)
      this.scene.add.existing(this.poison)
      this.poison.anims.play('poison')
      this.add(this.poison)
    }
  }

  removePoison() {
    if (this.poison) {
      this.remove(this.poison, true)
      this.poison = undefined
    }
  }

  addProtect() {
    if (!this.protect) {
      this.protect = new GameObjects.Sprite(this.scene, 0, -30, 'status', 'status/protect/000')
      this.protect.setScale(2, 2)
      this.scene.add.existing(this.protect)
      this.protect.anims.play('protect')
      this.add(this.protect)
    }
  }

  removeProtect() {
    if (this.protect) {
      this.remove(this.protect, true)
      this.protect = undefined
    }
  }

  addResurection() {
    if (!this.resurection) {
      this.resurection = new GameObjects.Sprite(this.scene, 0, -45, 'resurection', '000')
      this.resurection.setScale(2, 2)
      this.scene.add.existing(this.resurection)
      this.resurection.anims.play('resurection')
      this.add(this.resurection)
    }
  }

  removeResurection() {
    if (this.resurection) {
      this.remove(this.resurection, true)
      this.resurection = undefined
    }
  }

  addRuneProtect() {
    if (!this.runeProtect) {
      this.runeProtect = new GameObjects.Sprite(this.scene, 0, -45, 'rune_protect', '000')
      this.runeProtect.setScale(2, 2)
      this.scene.add.existing(this.runeProtect)
      this.runeProtect.anims.play('rune_protect')
      this.add(this.runeProtect)
    }
  }

  removeRuneProtect() {
    if (this.runeProtect) {
      this.remove(this.runeProtect, true)
      this.runeProtect = undefined
    }
  }
}