import UIBase from "./UIBase";


const { ccclass, property } = cc._decorator;

@ccclass
export default class UIManager extends UIBase {

    public OpenUI(url: string, zOrder: number, parentNode?: cc.Node, type?: any, progress?: Function, succ_call?: Function, err_call?: Function, ...args: any) {
        cc.loader.loadRes(url, type, (completedCount: number, totalCount: number, item: any) => {
            progress && progress(completedCount, totalCount, item);
        }, (error, prefab) => {
            if (error) {
                return;
            }
            let uiNode: cc.Node = cc.instantiate(prefab);
            uiNode.parent = parentNode ? parentNode : cc.Canvas.instance.node;
                
        })
    }

}
