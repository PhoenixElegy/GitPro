//函数参考网址
//https://blog.csdn.net/weixin_51952373/article/details/123961426?spm=1001.2101.3001.6650.6&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EESLANDING%7Edefault-6-123961426-blog-122601189.pc_relevant_multi_platform_whitelistv4eslandingrelevant2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EESLANDING%7Edefault-6-123961426-blog-122601189.pc_relevant_multi_platform_whitelistv4eslandingrelevant2&utm_relevant_index=10
class Generates{
    private count:number = 0
    constructor(counterStartNumber:number){
        this.count = counterStartNumber
    }

    //生成自增数
    AutoIncreaseInteger(){
        return this.count++
    }

    //生成随机数，具有范围约束[min.max)
    //min 最大值
    //max 最小值
    RangeInteger( min: number,max: number ){
        const range = max - min
        const value = Math.floor(Math.random() * range + min)
        return value
    }

    //生成随机一个指定参数中的字符串
    //...strings 指定的字符串组
    SpecifiedString (strings: string[] ){ 
        const map = new Map(Object.entries(strings))
        return map.get(this.RangeInteger( 0 , strings.length ) + "")
    }

    //生成指定长度的随机 含[a-z]的字符串
    //length 指定字符串的长度
    //toUpper 首字母是否大写
    RandomString(length: number , firstToUpper?: boolean){
        let str = ""
        for (let i = 0; i < length; i++){
            if(firstToUpper && i == 1){
                str += String.fromCharCode(this.RangeInteger(97,123)).toUpperCase()
                continue
            }
            str += String.fromCharCode(this.RangeInteger(97,123))
        }
        return str
    }
}

export { Generates }