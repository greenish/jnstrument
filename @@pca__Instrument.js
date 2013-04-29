/* Instrument Userscript Snippet: function(){ ...

    if(__pca__) {
        var __pca__liner = __pca__.liner(this, arguments);
        if(__pca__liner) return __pca__liner;
    };
*/
(function(window, document, undefined){
    function __pca__Instrument() {
        if (this == window) return new __pca__Instrument(); // has to be called as Constructor
/*//////////////////////////////////////////////////////////////////////////////
    Private Properties
/*//////////////////////////////////////////////////////////////////////////////
        var objIndex = 0;
        var maxDepth = 2;
        var dontInstrument = [/*document,*/ window.location, window.localStorage,window.sessionStorage, window.console.debug, "__pca__", "__pca__objInfo", window.chrome, null];

        var structure = {};
/*//////////////////////////////////////////////////////////////////////////////
    Public Properties
/*//////////////////////////////////////////////////////////////////////////////
/*//////////////////////////////////////////////////////////////////////////////
    Private Methods
/*//////////////////////////////////////////////////////////////////////////////
        var getPropertyType = function(property){
            return property!=null && typeof(property.__pca__objInfo) == "object"?
                property.__pca__objInfo.oid:
                    property == null?
                      "null":
                      typeof(property); 
        };
 ///////////////////////////////////////////////////////////////////////////////
       var getObjId = function(method){
            return method.__pca__objInfo && method.__pca__objInfo.oid >=0 ?
                method.__pca__objInfo.oid:
                -1;
        }
 ///////////////////////////////////////////////////////////////////////////////
       var getProperties = function(method){
            var properties = {};
            for(var m in method) 
                if(m!="__pca__objInfo") 
                   properties[m] = getPropertyType(method[m]);
               
            return properties;
        }
///////////////////////////////////////////////////////////////////////////////       
        var instrumentation = function (_this, _arguments) {
            var info = _this.__pca__objInfo;
            sendData({
                oid : info.oid,
                parentName : info.name,
                properties : getProperties(info.obj),
                name : _this.constructor.name,
                method : _arguments.callee
            });
        }
///////////////////////////////////////////////////////////////////////////////
        var sendData = function (data) {
            console.debug(data);
        }
/*//////////////////////////////////////////////////////////////////////////////
    Public Methods
/*//////////////////////////////////////////////////////////////////////////////
        this.wrapper = function (method, depth, parent, name) {
            switch(typeof(method)) {
                case "function" :
                    var wrapper = function() {
                        var result, tempArguments;
                        if(getObjId(this) < 0 && this != window) { // if new instance/ constructor
                            tempArguments = Array.prototype.slice.call(arguments);
                            Array.prototype.unshift.call(tempArguments, null);
                            result = new (Function.prototype.bind.apply(method, tempArguments)); 
                            result = __pca__.wrapper(result);
                            instrumentation(result, arguments);
                        }  
                        else { // if normal function call
                            result = __pca__.wrapper(method.apply(this, arguments));
                            instrumentation(this, arguments);
                        }
                        return result;
                    };
                    return method.toString() == wrapper.toString() ?
                        method:
                        wrapper;
                break;            
                case "object":
                    if(dontInstrument.indexOf(method) >= 0 || depth > maxDepth || (getObjId(method) >= 0 && depth != undefined)) return method;
                    
                    method.__pca__objInfo = {
                        oid:objIndex++, 
                        name: (method.constructor && method.constructor.name != "" ? method.constructor.name : name), 
                        obj: method
                    };
                    for(var m in method){
                        if(dontInstrument.indexOf(m) < 0 && dontInstrument.indexOf(method[m]) <0) {
                            var newMethod =this.wrapper(method[m], depth+1 || 0, method, m);
                            if(newMethod) method[m]=newMethod;
                        }
                    }
                    return method;
                break;
                default:
                    return false;   
                break;   
            }
        }
 ///////////////////////////////////////////////////////////////////////////////
        this.liner = function (_this, _arguments) {
            var newClass, tempArguments;
            if(_arguments.callee.caller != null && _arguments.callee.caller.toString() == this.wrapper(this.liner).toString()) return; //if wrapped
            
            if(_this != window && getObjId(_this) < 0 && _arguments[_arguments.length-1] != "__pca__new") {
                var tempArguments = Array.prototype.slice.call(_arguments);
                Array.prototype.push.call(tempArguments, "__pca__new");
                Array.prototype.unshift.call(tempArguments, null);
                var newClass = new (Function.prototype.bind.apply(_arguments.callee, tempArguments));

                this.wrapper(newClass);
                instrumentation(newClass, _arguments);
                return newClass;
            }
            else {
                Array.prototype.splice.call(_arguments, _arguments.length-1, 1);
                return false;
            }
        }
 ///////////////////////////////////////////////////////////////////////////////
    }
    __pca__=__pca__Instrument();
    __pca__.wrapper(window);
})(window, document);