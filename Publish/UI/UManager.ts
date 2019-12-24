import UIBase from "./UIBase";
import UIPool from "./UIPool";
import { Utils } from "../Util/Utils";


const { ccclass, property } = cc._decorator;

@ccclass
export default class UIManager extends UIBase {

    public OpenUI(url: string, zOrder: number, parentNode?: cc.Node, progress?: Function, succ_call?: Function, err_call?: Function, ...args: any) {

        let node: cc.Node = UIPool.getInstance().GetNodeByName(url);

        if (node) {
            node.parent = parentNode ? parentNode : cc.Canvas.instance.node;
            node.zIndex = zOrder;
            succ_call && succ_call();
        } else {
            url = Utils.GetUrl(url);
            if (url == null)
                return;
                
            cc.loader.loadRes(url, (completedCount: number, totalCount: number, item: any) => {
                progress && progress(completedCount, totalCount, item);
            }, (error, prefab) => {
                if (error) {
                    err_call && err_call();
                    return;
                }
                let uiNode: cc.Node = cc.instantiate(prefab);
                uiNode.parent = parentNode ? parentNode : cc.Canvas.instance.node;
                uiNode.zIndex = zOrder;
                succ_call && succ_call();
            })
        }
    }

    public CloseUI(node: cc.Node) {
        UIPool.getInstance().PutPool(node);

    }
    /**
     * 
     * @param url 判断当前路劲下释放非公共的资源
     */
    private ClearDependsRes(url) {
        let deps = cc.loader.getDependsRecursively(url);

        deps.forEach(item => {//判断是否为公共资源
            cc.loader.release(item);
        })
    }


}
