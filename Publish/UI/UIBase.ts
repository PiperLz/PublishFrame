
const { ccclass, property } = cc._decorator;

@ccclass
export default abstract class UIBase extends cc.Component {

    private EventList: Map<string, Function[]> = new Map();

    onLoad() {

    }

    start() {

    }

    onDestroy() {

    }

    onEnable() {

    }

    onDisable() {

    }

    public OnInit() {

    }

    public OnHide() {

    }

    public OnShow() {

    }


    public OnRegisterEvent(node: cc.Node, eventTag: string, callback: Function, tag) {
        if (node instanceof cc.Node) {
            if (!this.EventList.has(node.name + eventTag)) {
                node.on(eventTag, callback, tag);
            } else {
                this.UnRegisterEvent(node, eventTag, tag);
                console.error(`registerEvent is error :${node.name},'  >>'${eventTag}`)
            }
        }


    }

    public UnRegisterEvent(node: cc.Node, eventTag: string, tag) {
        if (this.EventList.has(node.name + eventTag)) {
            node.off(eventTag);
            this.EventList.delete(node.name + eventTag);
        }
    }


}
