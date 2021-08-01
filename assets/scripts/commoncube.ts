
import { _decorator, Component, Node, SystemEvent, SystemEventType, EventHandler, Quat } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CommonCube')
export class CommonCube extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    rotationDirection: 'horizontal'|'vertical' = 'horizontal';

    start () {
 
    }


    onBtnClick(customData:any){
        console.log('button has been clicked ' + customData);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
