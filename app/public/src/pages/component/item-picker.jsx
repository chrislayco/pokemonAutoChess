import React, { Component } from 'react';
import { ITEMS } from '../../../../models/enum';

const itemPoolStyle = {
    display:'flex',
    flexWrap:'wrap',
    backgroundColor:'rgb(255,255,255,0.7)',
    margin:'10px',
    marginTop:'0px'
}

const imgStyle = {
    width:'40px',
    height:'40px',
    imageRendering:'pixelated',
    cursor:`url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC) 14 0, pointer`
}

class ItemPicker extends Component{
    render(){
        return <div className='nes-container' style={itemPoolStyle}>
        {Object.keys(ITEMS).map(item=>{
            return <div onClick={()=>{this.props.selectEntity(item)}} key={item}><img style={imgStyle} src={'assets/items/' + ITEMS[item] + '.png'}/></div>;
        })}
      </div>
    }
}

export default ItemPicker;