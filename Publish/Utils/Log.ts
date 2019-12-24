export interface LOG_TAG {
    SOCKET: { desc: 'socket', isOpen: true },
    HTTP: { desc: 'http', isOpen: true },
    UIMANAGER: { desc: 'uimanager', isOpen: true },
    UIPOOL: { desc: 'uipool', isOpen: true },
    CONFIG: { desc: 'config', isOpen: true },
    BRIDGE: { desc: 'bridge', isOpen: true },
}


export class Log {
    public static log(tag, ...args) {
        let backLog = console.log || cc.log;
        if (!tag || !tag.isOpen) { return; }

        let arr: Array<any> = Array.prototype.slice.call(arguments);
        arr.splice(0, 1, `[${tag.desc}]`);
        let info = Log.stack(2) + Log.getDateString() + " ";
        arr.splice(1, 0, info);

        backLog.apply(this, arr)
    }   

    private static stack(index = 2): string {
        var e = new Error();
        var lines = e.stack.split("\n");
        lines.shift();
        var result = [];
        lines.forEach(function (line) {
            line = line.substring(7);
            var lineBreak = line.split(" ");
            if (lineBreak.length < 2) {
                result.push(lineBreak[0]);
            } else {
                result.push({ [lineBreak[0]]: lineBreak[1] });
            }
        });

        var list = [];
        if (index < result.length - 1) {
            for (var a in result[index]) {
                list.push(a);
            }
        }

        var splitList = list[0].split(".");
        return (splitList[0] + ".js->" + splitList[1] + ":");
    }

    private static getDateString(): string {
        let d = new Date();
        let str = d.getHours().toString();
        let timeStr = "";
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getMinutes().toString();
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getSeconds().toString();
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getMilliseconds().toString();
        if (str.length == 1) str = "00" + str;
        if (str.length == 2) str = "0" + str;
        timeStr += str;

        timeStr = "[" + timeStr + "]";
        return timeStr;
    }

}
