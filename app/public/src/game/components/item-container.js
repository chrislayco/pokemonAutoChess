import Button from './button';
import {GameObjects} from 'phaser';
import ItemDetail from './item-detail';

export default class ItemContainer extends Button {
  constructor(scene, x, y, item, dragable, place) {
    super(scene, x, y, 15, 15);
    this.objType = 'item';
    this.add(new GameObjects.Image(scene, 0, 0, 'hexagon').setScale(0.5, 0.5));
    this.sprite = new GameObjects.Image(scene, 0, 0, 'items', item);
    this.detail = new ItemDetail(scene, 15, 0, item);
    this.name = item;
    this.place = place;
    this.add(this.sprite);
    this.add(this.detail);
    if (dragable) {
      scene.input.setDraggable(this);
    }
  }

  enterButtonHoverState() {
    this.detail.setScale(1, 1);
  }

  enterButtonRestState() {
    this.detail.setScale(0, 0);
  }
}
