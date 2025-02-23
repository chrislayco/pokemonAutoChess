import React from 'react'
import { Item } from '../../../../../types/enum/Item'
import CSS from 'csstype'
import { Pkm } from '../../../../../types/enum/Pokemon'

const itemPoolStyle: CSS.Properties = {
    display:'flex',
    flexWrap:'wrap',
    backgroundColor:'rgb(255,255,255,0.7)',
    margin:'10px',
    marginTop:'0px'
}

const imgStyle: CSS.Properties = {
    width:'40px',
    height:'40px',
    imageRendering:'pixelated',
    cursor:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC) 14 0, pointer'
}

export default function ItemPicker(props:{selectEntity: React.Dispatch<React.SetStateAction<Pkm|Item>>}){
    return <div className='nes-container' style={itemPoolStyle}>
    {(Object.keys(Item) as Item[]).map(item=>{
        return <div onClick={()=>{props.selectEntity(item)}} key={item}><img style={imgStyle} src={'assets/item/' + Item[item] + '.png'}/></div>
    })}
  </div>
}