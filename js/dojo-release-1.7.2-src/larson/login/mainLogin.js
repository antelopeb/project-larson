//login file

define([
	"dijit/_Widget",
	"dijit/_Templated", 
	"dojo/_base/declare",
	"dojo/cookie",
	"dojo/ready",
	"dojo/parser",
	"dojo/_base/connect",
	"dijit/form/Button",
	"dijit/form/DropDownButton",
	"dijit/TooltipDialog",
	"dijit/form/TextBox",
	"dojo/text!./resources/mainLogin.html"
    ], function(_Widget, _Templated, declare, cookie, ready, parser, connect, Button, DropButton, TooltipDialog, TextBox, template) {
   
    declare("larson.login.mainLogin", [_Widget, _Templated], {
        templateString: template,
        widgetsInTemplate: true,
        baseClass: "mainLogin",
        postCreate: function() {
        	this.inherited(arguments)
        	
        	var usernameField = dijit.byId("username"),
        		loginButton = dijit.byId("loginButton"),
        		passwordField = dijit.byId("password")
        	        	
        	connect.connect(usernameField, "onChange", this.getData)
        	connect.connect(loginButton, "onClick", this.validatePassword)
        	
        },
        password: "",
        username: "",
        getData: function() {
        	this.inherited(arguments)
			this.username = dijit.byId("username").get("value")
        	
			var xhrArgs = {
				url: "http://localhost/users/"+this.username,
				handleAs: "json",
				load: function(data) { 
					dojo.byId("usernameError").innerHTML = ""
					this.password = data.password
				},
				error: function(error) {
					dojo.byId("usernameError").innerHTML = "Username not found"
				}
			}
			
			var deferred = dojo.xhrGet(xhrArgs)
        },
        validatePassword: function() {
        	this.inherited(arguments)
			this.username = dijit.byId("username").get("value")
        	
			var xhrArgs = {
				url: "http://localhost/users/"+this.username,
				handleAs: "json",
				load: function(data) { 
					this.username = dijit.byId("username").get("value")
					this.password = dijit.byId("password").get("value")
					
					if(this.password == data.password) {
						dojo.addClass(dojo.byId("signinNode"), "hidden")
						dojo.removeClass(dojo.byId("signedinNode"), "hidden")
						dojo.byId("signedinNode").innerHTML = "Hi " + data.firstname + ", welcome back!"
						dojo.byId("passwordError").innerHTML = ""
						dijit.popup.close(dijit.byId("signinTooltip"))
						dojo.removeClass(dojo.byId("signoutNode"), "hidden")
						dojo.addClass(dojo.byId("registerNode"), "hidden")
						cookie("loginCookie", dojo.toJson(data), { expires: 1 })
					}
					else {
						dojo.byId("passwordError").innerHTML = "You entered the wrong password"
					}
				},
				error: function(error) {
					dojo.byId("passwordError").innerHTML = "Something went wrong"
				}
			}
			
			var deferred = dojo.xhrGet(xhrArgs)			
        }
    })

     ready(function(){
         // Call the parser manually so it runs after our widget is defined, and page has finished loading
         parser.parse();
     })
 })