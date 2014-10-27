/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
"use strict";

document.addEventListener("DOMContentLoaded", startup);

function startup() {
	// add states to dropdown
	var statesNode = document.querySelector("#signup select[name='state']");
	usStates.forEach(function(state) {
		var option = document.createElement("option");
		option.value = state.code;
		option.innerHTML = state.name;
		statesNode.appendChild(option);
	});
	
	// add "other" occupation box if "other" is selected
	var occupationNode = document.getElementById("occupation");
	var other = document.querySelector("#signup input[name='occupationOther']");
	if (occupationNode.value === "other") {	// in case of page refresh
		other.style.display = "initial";
	}
	occupationNode.addEventListener("change", function() {
		if (occupationNode.value === "other") {
			other.style.display = "initial";
		} else {
			other.style.display = "none";
		}
	});
	
	// confirm upon "no thanks"
	var cancelButton = document.getElementById("cancelButton");
	cancelButton.addEventListener("click", function() {
		if (window.confirm("Are you sure?")) {
			window.location = "http://google.com";
		}
	});
	
	var submitButton = document.querySelector("#signup button[type='submit']");
	submitButton.addEventListener("click", validateForm);
}

function validateForm(evt) {
	var valid = true;
	var checkedInputs = [
		"firstName", 
		"lastName", 
		"address1", 
		"city", 
		"state",
		"zip", 
		"birthdate",
		"occupationOther"
	];
	for (var i = 0; i < checkedInputs.length; i++) {
		var nodeName = checkedInputs[i];
		var node = document.getElementsByName(nodeName)[0];
		if (
				node.value.trim() === "" && nodeName !== "occupationOther" || 
				nodeName === "zip" && !(/^\d{5}$/.test(node.value)) ||
				nodeName === "birthdate" && !dudeIsOld(new Date(node.value)) ||
				node.value.trim() === "" &&
				nodeName === "occupationOther" && 
				document.getElementById("occupation").value === "other"
		) {
			node.classList.add("invalid");
			valid = false;
		} else {
			node.classList.remove("invalid");
		}
	}
	
	if (!valid) {
		evt.preventDefault();
		evt.returnValue = false;
		return false;
	}
}

function dudeIsOld(date) {
	var ageRequirement = 13;
	var oldEnough = true;
	
	var date2 = new Date();
	if (date2.getFullYear() - date.getFullYear() < ageRequirement) {
		oldEnough = false;
	} else if (date2.getFullYear() - date.getFullYear() === ageRequirement) {
		if (date2.getMonth() - date.getMonth() < 0) {
			oldEnough = false;
		} else if (date2.getDate() - date.getDate() < 0) {
			oldEnough = false;
		}
	}
	var birthdayMessage = document.getElementById("birthdateMessage");
	if (!oldEnough) {
		birthdayMessage.innerHTML = 
				"You must be at least 13 years of age to use this service.";
	} else {
		birthdayMessage.innerHTML = "";
	}
	return oldEnough;
}