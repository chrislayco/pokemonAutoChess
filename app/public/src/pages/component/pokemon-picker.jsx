import React, { Component } from 'react';
import { PRECOMPUTED_TYPE_POKEMONS_ALL } from '../../../../models/enum';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const pokemonPoolStyle = {
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

const cursorStyle = {
    cursor:`url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC) 14 0, pointer`
}

class PokemonPicker extends Component{
    render(){
        return <Tabs className='nes-container' style={pokemonPoolStyle}>
        <TabList>
          {Object.keys(PRECOMPUTED_TYPE_POKEMONS_ALL).map((t)=>{
              return <Tab style={cursorStyle} key={t}><img src={'assets/types/' + t + '.png'}></img></Tab>
          })}
        </TabList>
        
        {Object.keys(PRECOMPUTED_TYPE_POKEMONS_ALL).map((key)=>{
          return <TabPanel key={key} style={{display:'flex', flexWrap:'wrap'}}>
                {PRECOMPUTED_TYPE_POKEMONS_ALL[key].map((pkm)=>{
                  return <div onClick={()=>{this.props.selectEntity(pkm)}} key={pkm}><img style={imgStyle} src={'assets/avatar/' + pkm + '.png'}/></div>;
                })}
            </TabPanel>
        })}
        </Tabs>
    }
}

export default PokemonPicker;