//login file

define([
	"dijit/_Widget",
	"dijit/_Templated", 
	"dojo/_base/declare",
	"dojo/_base/connect",
	"dijit/form/Button",
	"dijit/form/ValidationTextBox",
	"dojo/text!./resources/mainLogin.html"
    ], function(_Widget, _Templated, declare, connect, Button, TextBox, template) {
   
    return declare("larson.login.mainLogin", [_Widget, _Templated], {
        templateString: template,
        widgetsInTemplate: true,
        baseClass: "mainLogin",
        postCreate: function() {
        	this.inherited(arguments)
        	
        	var usernameField = dijit.byId("username"),
        		loginButton = dijit.byId("loginButton")
        	
        	connect.connect(usernameField, "onChange", this.getData)
        	connect.connect(loginButton, "onClick", this.validatePassword)
        },
        password: "",
        getData: function() {
        	this.inherited(arguments)
        	var username = dijit.byId("username").get("value")
			var xhrArgs = {
				url: "http://localhost/users/"+username,
				handleAs: "json",
				load: function(data) { 
					dojo.byId("usernameError").innerHTML = ""
					this.password = data.password
				},
				error: function(error) {
					dojo.byId("usernameError").innerHTML = "Username not found"
				}
			}
			
			var deferred = dojo.xhrGet(xhrArgs);
        },
        validatePassword: function() {
        	this.inherited(arguments)
        	var passwordEntered = dijit.byId("password").get("value")
        	alert(passwordEntered + " " + this.password)
        	
        	if(passwordEntered == this.password) {
        		window.location="/page2.html"
				dojo.byId("passwordError").innerHTML = ""
        	}
        	else {
        		dojo.byId("passwordError").innerHTML = "You entered the wrong password"
        	}
        }
    })
})