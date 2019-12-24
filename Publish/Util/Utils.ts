import { Url } from "./Url";
import { Log, LOG_TAG } from "./Log";

export let Utils = {
    DATA_TOTAL_LEN: 4,	//数据总长度
    PROTOCOLTYPE_LEN: 4,	//协议号长度
    GetUrl(name) {
        if (!Url.hasOwnProperty(name)) {
            Log.log(LOG_TAG.UTILS, 'name not in Url')
            return null;
        }
        return Url[name];
    },

    /**
    * buffer转msg，解包用
    * 协议格式：总字节数（4个字节，总字节数=协议号字节数+数据长度） + 协议号（4个字节） + 数据
    * @param recvBuf 
    */
    bufferToMsg(recvBuf: ArrayBuffer) {
        let recvView = new DataView(recvBuf);
        let protocolType = recvView.getInt32(Utils.DATA_TOTAL_LEN);
        let msgBuf = recvBuf.slice(Utils.DATA_TOTAL_LEN + Utils.PROTOCOLTYPE_LEN, recvBuf.byteLength);
        return msgBuf;
    },

    /**
     * msg转buffer，封包用
     * 协议格式：总字节数（4个字节，总字节数=协议号字节数+数据长度） + 协议号（4个字节） + 数据
     * @param msg 
     */
    msgToBuffer(msg) {
        let protocolType = msg.protocolType;
        let dataBuf = msg.toArrayBuffer();
        let dataView = new DataView(dataBuf);
        let dataLen = dataBuf.byteLength

        let sendBuf = new ArrayBuffer(Utils.DATA_TOTAL_LEN + Utils.PROTOCOLTYPE_LEN + dataLen);
        let sendView = new DataView(sendBuf);
        sendView.setInt32(0, Utils.PROTOCOLTYPE_LEN + dataLen);
        sendView.setInt32(Utils.DATA_TOTAL_LEN, protocolType);
        for (let i = 0; i < dataLen; i++) {
            sendView.setInt8(Utils.PROTOCOLTYPE_LEN + Utils.DATA_TOTAL_LEN + i, dataView.getInt8(i));
        }

        return sendBuf;
    },

    Utils_MapValueToArray(t_map) {
        let valueArray = [];
        if (t_map instanceof Map) {
            if (t_map.size > 0) {
                t_map.forEach((value, key) => {
                    valueArray.push(value)
                })
            }
        }
        return valueArray;
    },

    Utils_MapKeyToArray(t_map) {
        let keyArray = [];
        if (t_map instanceof Map) {
            if (t_map.size > 0)
                t_map.forEach((value, key) => {
                    keyArray.push(key)
                })
        }
        return keyArray
    }


}
