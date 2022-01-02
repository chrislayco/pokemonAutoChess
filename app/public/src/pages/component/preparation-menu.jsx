import React, { Component } from 'react';
import Elo from './elo';
import InlineAvatar from './inline-avatar';

class PreparationMenu extends Component{
    render(){
        const btnStyle={
            marginLeft:'5px',
            marginRight:'5px'
        };
        return <div className="nes-container with-title is-centered" style={{
            backgroundColor: 'rgba(255, 255, 255, .6)',
             margin:'10px',
             display: 'flex',
             flexFlow: 'column',
             justifyContent: 'space-between'
             }}>

                <div style={{display:'flex', alignItems:'center'}}>
                    <form onSubmit={this.props.handleTitleSubmit} style={{
                        display:'flex',
                        flexFlow: 'row nowrap',
                        width:'100%',
                        justifyContent:'space-between'
                        }}>
                        <div className="nes-field" style={{width:'72%'}}>
                            <input id="name_field" type="text" className="nes-input" placeholder='Title for other players' onChange={this.props.setTitle} value={this.props.currentTitle} />
                        </div>
                        <button className="nes-btn">Set Title</button>
                    </form>
                 </div>

                <div>
                    <div>
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <p>Player</p>
                            <p>Elo</p>
                            <p>Ready</p>
                        </div>
                    </div>
                    <div>
                        {Array.from(this.props.users).map(this.createUser.bind(this))}
                    </div>
                </div>

                <div style={{display: 'flex', justifyContent:'space-between'}}>
                    <button style={btnStyle} className='nes-btn is-warning' onClick={this.props.toggleReady}>Ready</button>
                    <button style={btnStyle} className='nes-btn is-success' onClick={this.props.startGame}>Start Game</button>
                    <button style={btnStyle} className='nes-btn is-primary' onClick={this.props.addBot}>Add Bot</button>
                    <button style={btnStyle} className='nes-btn is-primary' onClick={this.props.removeBot}>Remove Bot</button>
                </div>
            </div>
    }

    createUser(keyValue){
        const k = keyValue[0];
        const v = keyValue[1];
        const ready = v.ready ? 'V' : 'X';
        return <div key={k} style={{display:'flex', justifyContent:'space-between'}}>
            <div><InlineAvatar avatar={v.avatar} name={v.name}/></div>
            <Elo elo={v.elo}/>
            <div>{ready}</div>
        </div>
    }
}

export default PreparationMenu;