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
	"dojo/dom-form",
	"dojo/text!./resources/register.html",
	"dojo/text!./resources/registerDialog.html"
    ], function(_Widget, _Templated, declare, cookie, ready, parser, connect, 
    Button, TextBox, Dialog, form, domForm, template, dialogTemplate) {
   
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
        				
			//add the email validator
			var emailAddress = dijit.byId("emailAddress")
        	
        	connect.connect(emailAddress, "onChange", function() {
				//todo - figure out how to not inline this function and make it a mixin
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
        	})
        	
        	var registerButton = dijit.byId("registerButton")
        	
        	connect.connect(registerButton, "onClick", function() {
				var formId = "registerForm",
					formJson = domForm.toJson(formId),
					username = dijit.byId("emailAddress").get("value")

				//add the form watcher
				var myForm = dijit.byId("registerForm")
				
				if(myForm.isValid()) {
					dojo.xhrPut({
						url: "http://localhost/users/" + username,
						handleAs: "json",
						putData: formJson,
						load: function(data) {
							dijit.byId('registerDialog').hide()
							alert("Congrats, " + data.firstname + ", you've been successfully registered! Click sign in to get started")
						},
						error: function() {
							dojo.byId("generalError").innerHTML = "There was a problem"
						}
					})
				}
				else {
					dojo.byId("generalError").innerHTML = "Please complete all fields first"
				}

        	})        	
        }
    })

     ready(function(){
         // Call the parser manually so it runs after our widget is defined, and page has finished loading
         parser.parse();
     })
 })