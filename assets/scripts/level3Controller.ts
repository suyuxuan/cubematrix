
import {
    Animation,
    _decorator,
    geometry,
    systemEvent, SystemEventType, Component, Node, Camera, PhysicsSystem, AudioSource, Label, Color,
    AudioClip,
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Level3Controller')
export class Level3Controller extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    states: number[] = [3, 3, 3, 3];

    target: number[] = [0, 0, 0, 0];

    @property(Label)
    titleLabel: Label | null = null;

    @property(AudioSource)
    audio: AudioSource | null = null;

    @property(AudioSource)
    passedAudio: AudioSource | null = null;

    @property(Camera)
    camera: Camera | null = null;

    @property(Node)
    node0: any = null;

    @property(Node)
    node1: any = null;

    @property(Node)
    node2: any = null;

    @property(Node)
    node3: any = null;

    startTime = new Date().getTime();

    start() {
        // [3]
        systemEvent.on(SystemEventType.TOUCH_START, this.onTouchStart, this);
        this.startTime = new Date().getTime();
    }

    onTouchStart(touch: any) {

        let ray = new geometry.Ray();

        this.camera?.screenPointToRay(touch._point.x, touch._point.y, ray);

        if (PhysicsSystem.instance.raycast(ray)) {
            const r = PhysicsSystem.instance.raycastResults;
            for (let i = 0; i < r.length; i++) {
                const item = r[i];
                if (item.collider.node.uuid == this.node0.uuid) {

                    this.batchMoveNode(0, 1, 3);


                } else if (item.collider.node.uuid == this.node1.uuid) {
                    this.batchMoveNode(1, 0, 2);

                } else if (item.collider.node.uuid == this.node2.uuid) {
                    this.batchMoveNode(2, 1, 3);
                }
                else if (item.collider.node.uuid == this.node3.uuid) {
                    this.batchMoveNode(3, 2, 0);
                }
            }
        }

    }

    private win(): boolean {
        let win: boolean = this.states.every((value, index) => value == this.target[index]);
        return win;
    }


    private moveNode(nodeIndex: number) {

        console.log('click node ' + nodeIndex);
        let cubeNode;

        if (nodeIndex == 0) {
            cubeNode = this.node0;
        } else if (nodeIndex == 1) {
            cubeNode = this.node1;
        } else if (nodeIndex == 2) {
            cubeNode = this.node2;
        } else if (nodeIndex == 3) {
            cubeNode = this.node3;
        }
        let anim = cubeNode.getComponent(Animation);
        console.log('trigger cubeAnim' + this.states[nodeIndex]);
        let animState: any = anim?.play('cubeAnim' + this.states[nodeIndex]);

        this.states[nodeIndex]++;
        if (this.states[nodeIndex] >= 4) this.states[nodeIndex] = 0;

    }

    private batchMoveNode(...indices: number[]) {
        if(this.win()) return;

        this.playRollAudio();
        for (let index of indices) {
            this.moveNode(index);
        }

        if (this.win() && !!this.titleLabel) {
            this.titleLabel.string += " PASSED!";
            this.passedAudio?.play();

            let timecost = new Date().getTime() - this.startTime;
            console.log(`Pass time cost - ${timecost / 1000}s`);

            let popupController = this.node.getChildByName("winPopup")?.getComponent('WinPopupController') as WinPopupController;
            popupController.showWindow(timecost / 1000);
        }
    }

    private playRollAudio() {
        if (this.audio == null || this.audio == undefined) return;
        this.audio.play();
    }

    update(deltaTime: number) {
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
