//user menu after logged in

define([
	"dijit/_Widget",
	"dijit/_Templated", 
	"dojo/_base/declare",
	"dojo/cookie",
	"dojo/_base/connect",
	"dijit/DropDownMenu",
	"dijit/MenuItem",
	"dijit/popup",
	"dojo/text!./resources/userMenu.html"
    ], function(_Widget, _Templated, declare, cookie, connect,
    DropDownMenu, MenuItem, popup, template) {
   
    return declare("larson.login.userMenu", [_Widget, _Templated], {
        templateString: template,
        widgetsInTemplate: true,
        baseClass: "accountMenu",
        id: "accountMenu",
        postCreate: function() {
        	this.inherited(arguments)

        	var signoutButton = dijit.byId("signout")

        	connect.connect(signoutButton, "onClick", this.destroyCookie)
        },
        destroyCookie: function() {
        	this.inherited(arguments)

			popup.hide(dijit.byId("accountMenu"))
        	
			dojo.removeClass(dojo.byId("signinNode"), "hidden")
			dijit.byId("accountButton").destroy()
			dojo.addClass(dojo.byId("signedinNode"), "hidden")
			dojo.byId("signedinNode").innerHTML = "<div id='signedinButton'></div>"
			dojo.removeClass(dojo.byId("registerNode"), "hidden")
			cookie("loginCookie", null, { expires: -1 })
			
			//reset login form
			dijit.byId("username").set("value", "")
			dijit.byId("password").set("value", "")
			dojo.byId("passwordError").innerHTML = ""
			dojo.byId("usernameError").innerHTML = ""
        }
    })
})