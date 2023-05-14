/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var idahoFunctions = [
    function example (e) {
        alert (JSON.stringify(e));
    }
];

function idahoInitialize() {
    document.body.addEventListener ('input', function (e) {
        for (var t in idahoFunctions) {
            idahoFunctions[t] (e);
        }
    });
}
