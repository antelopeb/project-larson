//login file

define([
	"dijit/_Widget",
	"dijit/_Templated", 
	"dojo/_base/declare",
	"dijit/form/Button",
	"dojo/text!./resources/mainLogin.html"
    ], function(_Widget, _Templated, declare, Button, template) {
   
    return declare("larson.login.mainLogin", [_Widget, _Templated], {
        templateString: template,
        widgetsInTemplate: true,
        baseClass: "mainLogin"
    })
})