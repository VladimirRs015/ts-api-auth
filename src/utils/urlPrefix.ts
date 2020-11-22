export default class PrefixUrl {
     url : string;
     prefix : string;
    constructor(url:string,prefix:string){
        this.url = url;
        this.prefix = prefix;
    }
    toString(){
        return `${this.prefix}/${this.url}`;
    }
}