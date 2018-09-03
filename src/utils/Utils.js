const Utils = {
    successLoadImg(event) {
        let target = event.target || event.srcElement;
        let scale = target.parentElement.offsetWidth / target.parentElement.offsetHeight;
        let image = target;
        if (image.complete == true) {
            if (image.width > image.height * scale) {
                image.style.cssText = 'width: 100%;';
            } else {
                image.style.cssText = 'height: 100%;';
            }
        }
    },

    // 深拷贝
    deepClone(obj) {
        let str,
            newobj = obj.constructor === Array ? [] : {};
        if (typeof obj !== 'object') {
            return;
        } else if (window.JSON) {
            (str = JSON.stringify(obj)), //系列化对象
                (newobj = JSON.parse(str)); //还原
        } else {
            for (let i in obj) {
                newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
            }
        }
        return newobj;
    },

    // 检查是否是空对象
    checkNullObject(obj) {
        if(typeof obj === 'object') {
            if(JSON.stringify(obj) === '{}') {
                return false;
            } else {
                return true;
            }
        } else {
            return !!obj;
        }
    },

    // 数组去重（支持含对象数组）
    unique(array) {
        var obj = {};
        return array.filter(function(item, index, array){
            return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
        })
    },

     /**
     * 解决new Date()IE10不支持参数
     * @param str 目标字符
     * @returns {*}
     */
    newDate(str) { //解决new Date()IE10不支持参数
        //首先将日期分隔 ，获取到日期部分 和 时间部分
        var day = str.split(' ');
        //获取日期部分的年月日
        var days = day[0].split('-');
        //获取时间部分的 时分秒
        var mi = day[day.length - 1].split(':');
        //获取当前date类型日期
        var date = new Date();
        //给date赋值  年月日
        date.setUTCFullYear(days[0], days[1] - 1, days[2]);
        //给date赋值 时分秒  首先转换utc时区 ：+8
        date.setUTCHours(mi[0] - 8, mi[1], mi[2]);
        return date;
    },

    // 获取URL参数
    getUrlParam(paraName) {
        var url = document.location.toString();
        var arrObj = url.split('?');
        if (arrObj.length > 1) {
            var arrPara = arrObj[1].split('&');
            var arr;

            for (var i = 0; i < arrPara.length; i++) {
                arr = arrPara[i].split('=');
                if (arr != null && arr[0] == paraName) {
                    return arr[1];
                }
            }
            return '';
        } else {
            return '';
        }
    },

    // 时间格式化
    formatDate(date, fmt) {
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        };
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + '';
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length));
            }
        }
        return fmt;
    },

    addClass(el, cls) {
        if (!el) return;
        let curClass = el.className;
        let classes = (cls || '').split(' ');

        for (let i = 0, len = classes.length; i < len; i++) {
            let clsName = classes[i];
            if (!clsName) continue;

            if (el.classList) {
                el.classList.add(clsName);
            } else {
                if (!hasClass(el, clsName)) {
                    curClass += ' ' + clsName;
                }
            }
        }
        if (!el.classList) {
            el.className = curClass;
        }
    },

    removeClass(el, cls) {
        if (!el || !cls) return;
        let curClass = ' ' + el.className + ' ';
        let classes = cls.split(' ');

        for (let i = 0, len = classes.length; i < len; i++) {
            let clsName = classes[i];
            if (!clsName) continue;

            if (el.classList) {
                el.classList.remove(clsName);
            } else {
                if (hasClass(el, clsName)) {
                    curClass = curClass.replace(' ' + clsName + ' ', ' ');
                }
            }
        }
        if (!el.classList) {
            el.className = trim(curClass);
        }
    },


    /**
     * hasClass - 是否有指定class
     *
     * @param  {Object} elem 元素对象
     * @param  {String} cls  类名
     * @return {type}      description
     */

    hasClass(elem, cls) {
        cls = cls || '';
        if (cls.replace(/\s/g, '').length === 0) return false;
        return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
    },
};

export default Utils;