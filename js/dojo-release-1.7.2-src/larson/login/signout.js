//signout file

define([
	"dijit/_Widget",
	"dijit/_Templated", 
	"dojo/_base/declare",
	"dojo/cookie",
	"dojo/ready",
	"dojo/parser",
	"dojo/_base/connect",
	"dijit/form/Button",
	"dojo/text!./resources/signout.html"
    ], function(_Widget, _Templated, declare, cookie, ready, parser, connect, Button, template) {
   
    declare("larson.login.signout", [_Widget, _Templated], {
        templateString: template,
        widgetsInTemplate: true,
        postCreate: function() {
        	this.inherited(arguments)
        	
        	var signoutButton = dijit.byId("signout")
        	        	
        	connect.connect(signoutButton, "onClick", this.destroyCookie)
        },
        destroyCookie: function() {
        	this.inherited(arguments)
        	
			dojo.removeClass(dojo.byId("signinNode"), "hidden")
			dojo.addClass(dojo.byId("signedinNode"), "hidden")
			dojo.byId("signedinNode").innerHTML = ""
			dojo.addClass(dojo.byId("signoutNode"), "hidden")
			dojo.removeClass(dojo.byId("registerNode"), "hidden")
			cookie("loginCookie", null, { expires: -1 })

			//reset login form
			dijit.byId("username").set("value", "")
			dijit.byId("password").set("value", "")
			dojo.byId("passwordError").innerHTML = ""
			dojo.byId("usernameError").innerHTML = ""
        }
    })

     ready(function(){
         // Call the parser manually so it runs after our widget is defined, and page has finished loading
         parser.parse();
     })
 })