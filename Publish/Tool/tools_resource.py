import os

resourceUrl = ".\\assets\\resources"  # 选取的文件夹路径
outUrl = ".\\assets\\res.json"  # 输出的文件路径
fileCategorys = ['.png', '.PNG']  # 选取的文件后缀
excludeFileName = ['.meta']  # 排除的文件后缀
resourcePath = []  # 获取后的文件路径名字集合


def ResourceDir():
    print('read resource start...')
    for (path, dirs, files)in os.walk(resourceUrl):
        if(len(excludeFileName) > 0):
            for file in files:
                isHave = True
                for t_exclude in excludeFileName:
                    if isHave == True:
                        isHave = file.find(t_exclude) != -1

                if isHave == False:
                    print('resourcePath Path :'+path+'  file :'+file)
                    splice_index = path.index("resources")+len("resources")+1
                    fileName = file.split(".")[0]
                    resPath = path[splice_index:]
                    resPath = resPath.replace("\\", "/")
                    resPath = resPath+'/'+fileName
                    resPath = "\t"+'"'+fileName+'"'+":"+'"'+resPath+'",'+'\n'
                    if resPath in resourcePath:
                        print('warn resource repeat :'+fileName)
                    else:
                        resourcePath.append(resPath)
        else:
            print('resourceDir excludeFileName is Empty')


def formatResourceUrl():
    if len(resourcePath) > 0:
        lastReosurcePath = resourcePath[len(resourcePath)-1].replace(',', '')
        resourcePath[len(resourcePath) - 1] = lastReosurcePath
    else:
        print('formatResourceUrl is empty')


def main():
    print("tools_resource start")
    ResourceDir()
    formatResourceUrl()

    t_json = open(outUrl, 'w', encoding="utf-8")
    t_json.write("{\n")
    for path in resourcePath:
        t_json.write(path)
    t_json.write("}")
    t_json.close()
    os.system('pause & exit')


if __name__ == '__main__':
    main()
