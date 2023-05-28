/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

// add new controllers here
var idahoControllers = [
    {
        path: "index.htm",
        html_selector: "#index_htm",
        controller: function (args) {
            alert (JSON.stringify(args));
        }
    },
    
    {
        path: "index.html",
        html_selector: "#index_html",
        controller: function (args) {
            alert (JSON.stringify(args));
        }
    }
];

function htmlGet(selector) {
    var r = [];

    document.querySelectorAll(selector).forEach((e) => {
        r.push(e.value);
    });

    return r;
}

function htmlSet(selector, v) {
    document.querySelectorAll(selector).forEach((e) => {
        if (e.value != null) e.value = v;
    });
}

/*
function ajaxGet(selector, url) {
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function () {
        alert ('qqq');
        htmlSet(selector, this.responseText);
    };

    xhttp.open("GET", url);
    xhttp.send();
    
    return null;
}

function ajaxSet(o, v) {
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function () {
        alert ('ttt')
        htmlSet(o.html_selector, v);
    };

    xhttp.open("POST", o.url);
    xhttp.send(JSON.stringify(v));
}
*/

function idahoGetValue(o) {
    //if (o.url == null) return htmlGet(o.html_selector);
    //return ajaxGet(o.html_selector, o.url);
    
    return htmlGet(o.html_selector);
}

function idahoSetValue(o, v) {
    /*
    if (o.url == null) {
        htmlSet(o.html_selector, v);
    } else {
        ajaxSet(o.url, v);
    }*/
    
    htmlSet(o.html_selector, v);
}

var idahoObjects = [
    {
        html_selector: '#textfield',
        get value() { return idahoGetValue(this); },
        set value(v) { idahoSetValue(this, v); }
    },
    
    {
        html_selector: '#textfieldarea',
        //url: "file:///C:/Users/mspma/Documents/GitHub/IdahoJS/index.html",
        get value() { return idahoGetValue(this); },
        set value(v) { idahoSetValue(this, v); }
    }
];

function decodeURLSymbol(c) {
    if (c.charCodeAt(0) >= '0'.charCodeAt(0)
            && c.charCodeAt(0) <= '9'.charCodeAt(0))
                return c.charCodeAt(0) - '0'.charCodeAt(0);
    
    if (c.charCodeAt(0) >= 'a'.charCodeAt(0)
            && c.charCodeAt(0) <= 'f'.charCodeAt(0))
                return c.charCodeAt(0) - 'a'.charCodeAt(0) + 10;

    if (c.charCodeAt(0) >= 'A'.charCodeAt(0)
            && c.charCodeAt(0) <= 'F'.charCodeAt(0))
                return c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
    
    return -1;
}

function decodeURLString(s) {
    var i = 0;
    var r = "";
    
    while (i < s.length) {
        if (s.charAt(i) == '%') {
            ++i;
            
            var k = 0, p;
            
            while ((p = decodeURLSymbol(s.charAt(i))) != -1) {
                k = (k << 4) | p;
                ++i;
            }
            
            r += String.fromCharCode(k);
        } else {
            r += s.charAt(i);
            
            ++i;
        }
    }
    
    return r;
}

function idahoInitialize() {
    var h = window.location.href + "";
    
    if (h.indexOf('?') >= 0) {
        h = h.substring (0, h.indexOf('?'));
    }
    
    if (h.indexOf('/') >= 0) {
        h = h.substring(h.lastIndexOf('/') + 1);
    }
    
    var queryString = window.location.search + "";
    
    if (queryString.indexOf('?') == 0) {
        queryString = queryString.substring(1);
    }
    
    var e = queryString.split('+').join(' ').split('&');
    
    var args = [];
    
    for (var t in e) {
        var p = e[t].split('=');
        
        for (var i in p) {
            p[i] = decodeURLString (p[i]);
        }
        
        var j = -1;
        
        for (var i = 0; i < args.length; ++i) {
            if (args.at(i).key == p[0]) {
                j = i;
                break;
            }
        }
        
        if (j == -1) {
            args.push({ key : p[0], values: [p.length >= 2 ? p.slice(1).join('') : null] });            
        } else {
            args.at(j).values.push(p.length >= 2 ? p.slice(1).join('') : null);
        }
    }
    
    for (var t in idahoControllers) {
        if (idahoControllers[t].path != h) {
            document.querySelectorAll(idahoControllers[t].html_selector).forEach(
                    (e) => { e.remove(); });
        }
    }
    
    for (var t in idahoControllers) {
        if (idahoControllers[t].path == h) {
            idahoControllers[t].controller (args);
        }
    }
}
