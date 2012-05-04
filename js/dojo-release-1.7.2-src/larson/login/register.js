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
	"dijit/form/ValidationTextBox",
	"dijit/Dialog",
	"dijit/form/Form",
	"dojo/text!./resources/register.html",
	"dojo/text!./resources/registerDialog.html"
    ], function(_Widget, _Templated, declare, cookie, ready, parser, connect, 
    Button, TextBox, Dialog, form, template, dialogTemplate) {
   
    declare("larson.login.register", [_Widget, _Templated], {
        templateString: template,
        widgetsInTemplate: true,
        dialog: "",
        username: "",
        postCreate: function() {
        	this.inherited(arguments)
        	
        	var registerButton = dijit.byId("register")
        	        	        	
        	connect.connect(registerButton, "onClick", this.showRegistrationDialog)
        	
        },
        showRegistrationDialog: function() {
        	this.inherited(arguments)
        	        	
        	this.dialog = new Dialog({
        		title: "Register for Larson",
        		content: dialogTemplate,
        		style: "width: 400px",
        		id: "registerDialog",
        		draggable: false,
        		onClose: dojo.hitch(this, setTimeout(function(){
					if (!dijit.byId("registerDialog").open){
						dijit.byId("registerDialog").destroyRecursive()
					}
				}, 10))
        	})

        	this.dialog.show()
        	
        	var myForm = dijit.byId("registerForm")
        	
			myForm.watch('value', function() {
				if(myForm.isValid()) {
					dijit.byId("registerButton").setAttribute('disabled', false)
				}
				else {
					dijit.byId("registerButton").setAttribute('disabled', true)
				}
			})
			var emailAddress = dijit.byId("emailAddress")
        	connect.connect(emailAddress, "onChange", this.checkEmailAddress)
        },
        checkEmailAddress: function() {
        	this.inherited(arguments)
        	alert("checking email")
			this.username = dijit.byId("emailAddress").get("value")
        	
			var xhrArgs = {
				url: "http://localhost/users/"+this.username,
				handleAs: "json",
				load: function(data) { 
					dojo.byId("emailError").innerHTML = "This email is already taken"
					dijit.byId("emailAddress").setAttribute("value", "")
				},
				error: function(error) {
					dojo.byId("emailError").innerHTML = ""
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