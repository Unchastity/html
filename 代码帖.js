/**
 * Object()方法将非对象的value转为对应的对象，或返回对象value的原对象
 * 可用于判断值value是否是对象
 * @param value 对象或原始类型数据
 * @returns {boolean}
 */
function isObject(value) {
    return value === Object(value);
}

/**
 * Object.prototype.toString()方法可以返回对象的类型字符串，如[objrct Object],
 * [object Number], [object Array]等，第二个值表示该值得构造函数，比typeof运算符更
 * 准确的判断类型
 * @param o 原始数据或对象
 * @returns {string}
 */
var type = function (o) {
    var str = Object.prototype.toString.call(o);
    return str.match(/\[object (.*?)\]/)[1].toLowerCase();
};

['Null', 'Undefined', 'String', 'Number', 'Boolean', 'Object', 'Array', 'Function', 'RegExp'].forEach(function (t) {

    type['is' + t] = function (o) {
        return type(0) === t.toLowerCase();
    }
});

/*
type.isObject({}); //true
 */


/**
 * 遍历数value
 */
Number.prototype.iteror = function () {
    var result = [];
    for (var i = 1; i <= this; ++i) {
        result.push(i);
    }
    return result;
};

/*
8..iteror();

[0, 1, 2, 3, 4, 5, 6, 7, 8]
 */

/**
 * 返回value的整数部分
 * @param value
 * @returns {number}
 */
function toInteger(value) {
    return value < 0 ? Math.ceil(value) : Math.floor(value);
}

/**
 * 返回任意范围的随机数
 * Math.random()产生【0，1）之间的随机数，大于等于0，一定小于1。
 * @param min
 * @param max
 * @returns {*}
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * 返回任意范围的随机整数
 * @param min int
 * @param max int
 * @returns {*}
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min +1)) + min;
}

/**
 * 返回指定长度的随机字符串
 * @param length
 * @returns {string}
 */
function random_str(length) {
    var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    ALPHABET += 'abcdefghijklmnopqrstuvwxyz';
    ALPHABET += '0123456789';

    var str = '';
    for(var i = 0; i < length; ++i) {
        var rand = Math.floor(Math.random() * ALPHABET.length);
        str += ALPHABET.charAt(rand);
    }
    return str;
}

/*
random_str(100);

"NdJDJISrkZicWQqx28cDadA2hmDgvE1nstiPgObCva9U3YjzjVHLhj0eF4t2dagxTvpTTDBFRUNKHkv3OGYxiIoWWwbvI9KDrejR"
 */

/**
 * 返回本年度剩余天数
 * @returns {number}
 */
function leftDays() {
    var today = new Date();
    var endDay = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);
    var msPerDay = 3600 * 24 * 1000;

    return Math.round((endDay.getTime() - today.getTime()) / msPerDay);
}

/*
在构造函数内部使用'use strict'，可以防止在构造对象时，丢失new命令，导致错误，
不使用new命令时，Obj()就是普通的函数，函数内的this指向window。

new命令会返回一个对象，若构造函数内有return语句，若return的不是对象，则会被忽略，返回this指向的对象；若return的是一个对象，则返回return返回的对象；而不论改对象是不是this指向的对象！！！！！！
 */
var Obj = function () {
    "use strict";
    this.name = "";
    this.id = "";
};

// function Obje() {
//     if (!(this instanceOf Obje)) {
//         return new Obje();
//     }
// //    构造函数代码
// }

// function Objec() {
//     if (!new.target) {
//         throw new Error("请使用new 命令");
//     }
// //    构造函数代码
// }

function _new(/* 构造函数 */ constructor, /* 构造函数参数 */ param1) {
    // 将 arguments 对象转为数组
    var args = [].slice.call(arguments);
    // 取出构造函数
    var constructor = args.shift();
    // 创建一个空对象，继承构造函数的 prototype 属性
    var context = Object.create(constructor.prototype);
    // 执行构造函数
    var result = constructor.apply(context, args);
    // 如果返回结果是对象，就直接返回，则返回 context 对象
    return (typeof result === 'object' && result != null) ? result : context;
}

// 实例
var actor = _new(Person, '张三', 28);

/*
属性与dom对象双向绑定
 */
Object.defineProperty(user, 'name', {
    get: function () {
        return document.getElementById('foo').value;
    },
    set: function (newValue) {
        document.getElementById('foo').value = newValue;
    },
    configurable: true
});

/*
拷贝
 */
var extend = function (to, from) {
    for (var property in from) {
        var descriptor = Object.getOwnPropertyDescriptor(from, property);

        if (descriptor && ( !descriptor.writable
                || !descriptor.configurable
                || !descriptor.enumerable
                || descriptor.get
                || descriptor.set)) {
            Object.defineProperty(to, property, descriptor);
        } else {
            to[property] = from[property];
        }
    }
}

/*
某个属性到底是原型链上哪个对象自身的属性
 */
function getDefiningObj(obj, prop) {
    while (obj && !Object.hasOwnProperty.call(obj, prop)) {
        obj = Object.getPropertyValue(obj);
    }
    return obj;
}


/*
获取对象所有属性，自己的和继承的
 */
function getOwnPropertiesNameIgnoreIherit(obj) {
    var props = {};
    while (obj) {
        Object.getOwnPropertyNames(obj).forEach(function (t) {
            props[t] = true;
        })
        obj = Object.getPrototypeOf(obj);
    }
    return Object.getOwnPropertyNames(props);
}

/*
对象拷贝
1. 原型对象相同，确保构造函数和继承的属性相同
2. 对象自身的属性，包括不可枚举的和可枚举的
 */
function copyObject(orig) {
    //相同的原型，这继承的属性相同
    var copy = Object.create(Object.getPrototypeOf(orig));
    //拷贝对象自身的属性
    copyOwnPrepertiesFrom(copy, orig);
    return copy;
}

function copyOwnPrepertiesFrom(target, source) {
    //获取源对象自身的所有属性，包括不可枚举
    var props = Object.getOwnPropertyNames(source);
    //遍历属性，获得属性描述对象，在给目标对象设置属性
    props.forEach(function (t) {
        var propDesc = Object.getOwnPropertyDescriptor(source, t);
        Object.defineProperty(target, t, propDesc);
    })
    return target;
}