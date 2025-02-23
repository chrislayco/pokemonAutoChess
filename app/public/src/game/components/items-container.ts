import { SetSchema } from '@colyseus/schema'
import {GameObjects} from 'phaser'
import ItemContainer from './item-container'
import { Item } from '../../../../types/enum/Item'

export default class ItemsContainer extends GameObjects.Container {
  itemSize: number
  dragable: boolean
  constructor(scene: Phaser.Scene, inventory: SetSchema<Item>, x: number, y: number, dragable: boolean) {
    super(scene, x, y)
    this.itemSize = dragable ? 80: 25
    this.dragable = dragable
    scene.add.existing(this)

    inventory.forEach((item) => {
      this.addItem(item)
    })
  }

  addItem(value: Item) {
    this.add(new ItemContainer(this.scene, 0, 0, value, this.dragable))
    this.updateItems()
  }

  removeItem(item: string) {
    const target = this.findItem(item)
    if (target) {
      this.remove(target, true)
      this.updateItems()
    } else {
      console.warn('no item found looking for', item)
    }
  }

  updateItems() {
    for (let i = 0; i < this.list.length; i++) {
      const it = <ItemContainer> this.list[i]
      it.closeDetail()
      it.x = 0
      it.y = i * this.itemSize
    }
  }

  findItem(item: string) {
    return this.getFirst('name', item)
  }
}
