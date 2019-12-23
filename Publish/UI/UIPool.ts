
const { ccclass, property } = cc._decorator;

@ccclass
export default class UIPool extends cc.Component {
    //资源存储向 
    //添加缓存引用机制，增设panel打开次数统计 （当超出额定长度范围时  有限释放打开次数少）

    nodeMap = new Map();
    openCountMap = new Map();
    maxCount: number = 0;
    curCount: number = 0;
    GCNum: number = 0;

    /**
     *  PutPool : 当前panel要关闭的时调用
     *  增加关闭callback 
     *  解除当前panel身上的注册事件及计时器相关
     */
    PutPool(params) {
        if (params instanceof cc.Node) {
            if (!this.nodeMap.has(params)) {
                if (this.nodeMap.size > this.maxCount) {
                    this.CompareCallMinToRelease();
                } else
                    this.nodeMap.set(params.name, params);
            } else {
                params.destroy();
            }
        } else
            console.log('uipool PutPool error params :' + typeof (params));
    }

    GetNodeByName(params) {
        let c_node = null;
        let c_Count = 0;
        if (this.nodeMap.size > 0) {
            if (this.nodeMap.has(params)) {
                c_Count = this.openCountMap.get(params);
                c_node = this.nodeMap.get(params)

            }
            ++c_Count;
            this.openCountMap.set(params, c_Count);
            return c_node
        } else {
            //panel第一次加载时 loadres

        }
    }

    //获取调用次数最少的 node name
    CompareCallMinToRelease() {
        let t_node = null;

        if (this.nodeMap.size > 0) {
            let count = 100000;
            this.nodeMap.forEach((value, key) => {
                if (value < count) {
                    count = value;
                    t_node = key;
                };
            })
        }

        if (t_node != null && t_node instanceof cc.Node) {
            t_node.destroy();
        } else {
            console.log('uiPool CompareCallMinToRelease is error ')
        }
    }

    RevealNodeData() {
        if (this.nodeMap.size > 0) {
            this.nodeMap.forEach((value, key) => {
                console.log(key)
            })
        } else {
            console.log('uiPool is empty')
        }
    }

    //检测当前内存使用状况，设定GC线
    InitiativeClean() {

    }

    RevealUsedCount() {//展示当前场景 panel的打开次数
        if (this.openCountMap.size > 0) {

        } else {
            console.log('uiPool empty');
        }
    },

    ClearPool() {
        if (this.nodeMap.size > 0) {
            this.nodeMap.forEach((value, key) => {
                if (value instanceof cc.Node) {
                    value.destroy();
                }
            })
        }

        if (this.openCountMap.size > 0) {
            this.openCountMap.clear();
        }
    }

}

}
