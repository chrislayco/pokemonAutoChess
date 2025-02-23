import { Command } from '@colyseus/command'
import { GameUser } from '../../models/colyseus-models/game-user'
import UserMetadata, { IUserMetadata } from '../../models/mongo-models/user-metadata'
import BotV2 from '../../models/mongo-models/bot-v2'
import { Client } from 'colyseus'
import PreparationRoom from '../preparation-room'
import { Emotion, IMessage, Transfer } from '../../types'
import { BotDifficulty } from '../../types/enum/Game'

export class OnJoinCommand extends Command<PreparationRoom, {
  client: Client,
  options: any,
  auth: any
}> {
  execute({client, options, auth}) {
    if(this.state.ownerId == ''){
      this.state.ownerId = auth.uid
    }
    UserMetadata.findOne({'uid': auth.uid}, (err: any, user: IUserMetadata)=>{
      if (user) {
        this.state.users.set(client.auth.uid, new GameUser(user.uid, user.displayName, user.elo, user.avatar, false, false))

        if (user.uid == this.state.ownerId) {
          // console.log(user.displayName);
          this.state.ownerName = user.displayName
        }
        this.room.broadcast(Transfer.MESSAGES, {
          'name': 'Server',
          'payload': `${ user.displayName } joined.`,
          'avatar': user.avatar,
          'time': Date.now()
        })
      }
    })

    if (this.state.users.size >= 8) {
      return [new OnRemoveBotCommand().setPayload({target: undefined})]
    }
  }
}

export class OnGameStartCommand extends Command<PreparationRoom, {
  client: Client,
  message: any
}> {
  execute({client, message}) {
    let allUsersReady = true

    this.state.users.forEach((user: GameUser, key: string) => {
      if (!user.ready) {
        allUsersReady = false
      }
    })

    if (allUsersReady && !this.state.gameStarted) {
      this.state.gameStarted = true
      this.room.broadcast(Transfer.GAME_START, message, {except: client})
    }
  }
}

export class OnMessageCommand extends Command<PreparationRoom, {
  client: Client,
  message: IMessage
}> {
  execute({client, message}) {
    this.room.broadcast(Transfer.MESSAGES, {...message, time: Date.now()})
  }
}

export class OnRoomNameCommand extends Command<PreparationRoom, {
  client: Client,
  message: string
}> {
  execute({client, message}) {
    // console.log(client.auth.uid, this.state.ownerId);
    if(client.auth.uid == this.state.ownerId && this.state.name != message){
      this.room.setName(message)
      this.state.name = message
    }
  }
}


export class OnLeaveCommand extends Command<PreparationRoom, {
  client: Client,
  consented: boolean
}> {
  execute({client, consented}) {
    if (client && client.auth && client.auth.displayName) {
      this.room.broadcast(Transfer.MESSAGES, {
        'name': 'Server',
        'payload': `${ client.auth.displayName } left.`,
        'avatar': 'magnemite',
        'time': Date.now()
      })
      this.state.users.delete(client.auth.uid)
    }
  }
}

export class OnToggleReadyCommand extends Command<PreparationRoom, {
  client: Client
}> {
  execute({client}) {
    // console.log(this.state.users.get(client.auth.uid).ready);
    this.state.users.get(client.auth.uid).ready = !this.state.users.get(client.auth.uid).ready
  }
}

export class InitializeBotsCommand extends Command<PreparationRoom, {
  ownerId: string
}> {
  execute(ownerId) {
    UserMetadata.findOne({'uid': ownerId}, (err: any, user: IUserMetadata)=>{
      if (!user) {
        return
      }

      const difficulty = {$gt: user.elo - 100, $lt: user.elo + 100}

      BotV2.find({elo: difficulty}, ['avatar', 'elo', 'name'], null)
          .limit(7)
          .exec(
              (err, bots) => {
                if (!bots) {
                  return
                }
                bots.forEach((bot) => {
                  this.state.users.set(bot.avatar, new GameUser(
                    bot.avatar,
                    bot.name,
                    bot.elo,
                    bot.avatar,
                    true,
                    true
                  ))
                })
              }
          )
    })
  }
}

type OnAddBotPayload = {
  difficulty: BotDifficulty
}

export class OnAddBotCommand extends Command<PreparationRoom, OnAddBotPayload> {
  execute(data: OnAddBotPayload) {
    if (this.state.users.size >= 8) {
      return
    }

    const userArray = new Array<string>()

    this.state.users.forEach((value: GameUser, key: string) => {
      if (value.isBot) {
        userArray.push(key)
      }
    })

    const { difficulty } = data

    let d  
    
    switch (difficulty) {
      case BotDifficulty.EASY:
        d = {$lt: 800}
        break
      case BotDifficulty.MEDIUM:
        d = {$gt: 800, $lt: 1100}
        break
      case BotDifficulty.HARD:
        d = {$gt: 1100}
        break
    }

    BotV2.find({avatar: {$nin: userArray}, elo: d}, ['avatar', 'elo', 'name'], null, (err, bots) => {
      if (bots.length <= 0) {
        this.room.broadcast(Transfer.MESSAGES, {
          'name': 'Server',
          'payload': 'Error: No bots found',
          'avatar': 'magnemite',
          'time': Date.now()
        })
        return
      }

      const bot = bots[Math.floor(Math.random() * bots.length)]

      if (this.state.users.size >= 8) {
        return
      }
      else{
        this.state.users.set(bot.avatar, new GameUser(
          bot.avatar,
          bot.name,
          bot.elo,
          bot.avatar,
          true,
          true
      ))

      this.room.broadcast(Transfer.MESSAGES, {
        'name': 'Server',
        'payload': `Bot ${ bot.name } added.`,
        'avatar': `0081/${Emotion.NORMAL}`,
        'time': Date.now()
      })
      }
    })
  }
}


export class OnRemoveBotCommand extends Command<PreparationRoom, {
  target: string | undefined
  }> {
  execute({target}) {
    console.log(target)
    // if no message, delete a random bot
    if (!target) {
      // let botDeleted = false;
      const keys = this.state.users.keys()
      while (!keys.done) {
        const key = keys.next().value
        if (this.state.users.get(key).isBot) {
          this.room.broadcast(Transfer.MESSAGES, {
            'name': 'Server',
            'payload': `Bot ${key} removed to make room for new player.`,
            'avatar': `0081/${Emotion.NORMAL}`,
            'time': Date.now()
          })
          this.state.users.delete(key)
          // botDeleted = true;
          return
        }
      }
      console.log('error, no bots in lobby')
      return
    }

    const name = this.state.users.get(target).name
    if (this.state.users.delete(target)) {
      this.room.broadcast(Transfer.MESSAGES, {
        'name': 'Server',
        'payload': `Bot ${name} removed.`,
        'avatar': `0081/${Emotion.NORMAL}`,
        'time': Date.now()
      })
    }
  }
}
