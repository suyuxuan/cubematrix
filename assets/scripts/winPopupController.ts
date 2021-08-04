
import { _decorator, Component, Node, Label, Scene, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('WinPopupController')
export class WinPopupController extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start() {
        // [3]
        this.node.active = false;
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    public showWindow(timecost: number) {
        let timecostLabel = this.node.getChildByPath('/Canvas/Nodes/SpriteSplash/TimecostLabel')?.getComponent(Label) as Label;
        timecostLabel.string = `Time Cost: ${timecost}s`;

        this.node.active = true;
    }

    public hideWindow() {
        this.node.active = false;
    }

    private backHome(){
        director.loadScene('main');
    }


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
