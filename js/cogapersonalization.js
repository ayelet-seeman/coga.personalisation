/* name: personalisation1.0.js

author: Ayelet Seeman

The script personalises the web page according to user settings in the JSON profile

see more at: https://github.com/ayelet-seeman/coga.personalisation/
*/


// download JSON skin in url, and personalise page based on the settings in it
 function getPersonalisation(url) {
	  //load json skin (profile) and run it
	  makeCorsRequest(url);

  }

//personalise page based on the settings in the JSON object recieved
function personalisePage(profile) {
	//select all elements in document
	var x = document.querySelectorAll( 'body *' );

	for (var i = 0; i < x.length; i++) {
		//run personalisation
		personalise_element(x[i], profile);
	}
	//hide button for loading JSON skin. Line will be removed in later versions.
	document.getElementById("personalise_page").setAttribute("aria-hidden", "true");

}

  //personalise element according to the settings in the JSON object recieved
function personalise_element(element, profile) {

	personalise_element_attribute(element, profile['@tagName'], "tagName");
	personalise_element_attribute(element, profile['@role'], "role");
	personalise_element_attribute(element, profile['@aria-function'], "aria-function");
	personalise_element_importance(element, profile['@coga-simplification'])
}

//personalise element by attributeName according to the settings in the JSON object recieved
//works also with tag name
function personalise_element_attribute(element, profileAttribute, AttributeName) {
	//code for a tag
	if (AttributeName=="tagName") {var attribute =  element.tagName;}
	//code for an attribute
	else var attribute =  element.getAttribute(AttributeName);
	//check they are defined
	if (isDefined(profileAttribute))
	if (isDefined(attribute)) {
		var numFunc = profileAttribute.length;

		//get settings for that element
		for (var j=0; j<numFunc; j++) {
			if (isDefined(profileAttribute[j].offName))
			if (attribute== profileAttribute[j].offName) {

			//check if element needs to be personalised differently
			if (element.tagName=="INPUT") {
			style_form_element (element, profileAttribute[j]);
			}

			//change descendents
			if (isDefined(profileAttribute[j].descendents)) {
				setCSS_des (element, profileAttribute[j].descendents);

			}


			//check icon exists

			if (isDefined(profileAttribute[j].settings)) {

			if (isDefined(profileAttribute[j].settings.Symbol.url)) {

				//set width and height
				var height = "30";
				var width = "30";
				if (isDefined(profileAttribute[j].settings.Symbol.settings.height))
				var height = profileAttribute[j].settings.Symbol.settings.height;

				if (isDefined(profileAttribute[j].settings.Symbol.settings.width))
				var width = profileAttribute[j].settings.Symbol.settings.width;


				//add icon when text is defined
				if (isDefined(profileAttribute[j].settings.text))
			element.innerHTML = "\<img src\=\""+profileAttribute[j].settings.Symbol.url+"\" style\=\" margin:0em; padding:0em; padding\-top:-0.2em; float:left; \" height\=\""+height+"\"  width\=\""+width+"\"  alt\=\"\"\> "+" "+profileAttribute[j].settings.text;

				//add icon when text isn't defined
			else element.innerHTML = "\<img src\=\""+profileAttribute[j].settings.Symbol.url+"\" style\=\" margin:0em; padding:0em; padding\-top:-0.2em; float:left; \" height\=\""+height+"\"  width\=\""+width+"\"  alt\=\"\"\> "+" "+element.innerHTML;
			}

			else
			{
				//change text only
				if (isDefined(profileAttribute[j].settings.text))
				element.innerHTML = profileAttribute[j].settings.text;
			}

			//change width to fit text
			element.style.width = "auto";
			element.style.paddingRight = "0.5em";
			element.style.paddingLeft = "0.5em"

			//change style
			var styleSettings = profileAttribute[j].settings.css;
			setCSS (element, styleSettings);

			// add/change tooltip
			if (isDefined(profileAttribute[j].settings.tooltip))
			element.title = profileAttribute[j].settings.tooltip;

			// add/change shortcut (accesskey)
			if (isDefined(profileAttribute[j].settings.shortcut))
			element.accessKey=profileAttribute[j].settings.shortcut;


			}
						}

		}


	 }
}

//hide or display element by it's coga-simplification according to the settings in the JSON object recieved
function personalise_element_importance(element, imp_settings) {


	 arImp =  element.getAttribute("coga-simplification");

	 if (isDefined(arImp)&&isDefined(imp_settings[arImp].settings['@aria-hidden'])) {
	   //change aria-hidden attribute
	   if (imp_settings[arImp].settings['@aria-hidden']=="false")
	   element.setAttribute("aria-hidden", "false");
	   else if (imp_settings[arImp].settings['@aria-hidden']=="true")
	   element.setAttribute("aria-hidden", "true");
	 }
}

//display elements with an coga-simplification attribute one level lower than currently displayed
function moreOptions(profile) {

var temp = 0;
	//change settings in local JSON skin (profile)
	if (profile['@coga-simplification'].high.settings['@aria-hidden']=="true")
	  profile['@coga-simplification'].high.settings['@aria-hidden']="false";
	  else
	    if (profile['@coga-simplification'].med.settings['@aria-hidden']=="true")
	      profile['@coga-simplification'].med.settings['@aria-hidden']="false";
		  else
		  if (profile['@coga-simplification'].low.settings['@aria-hidden']=="true")
			    {
					profile['@coga-simplification'].low.settings['@aria-hidden']="false";
					temp = 1;
				}
	//personalise importance according to new profile
	personalise_page_importance(profile);
	// hide the more options button if all elements are displayed
	if (temp == 1) document.getElementById("more_options").setAttribute("aria-hidden", "true");


}

//hide elements with an coga-simplification attribute one level higher than currently hidden
function lessOptions(profile) {
	//change settings in local JSON skin (profile)
	if (profile['@coga-simplification'].low.settings['@aria-hidden']=="false")
	  profile['@coga-simplification'].low.settings['@aria-hidden']="true";
	  else
	    if (profile['@coga-simplification'].med.settings['@aria-hidden']=="false")
	      profile['@coga-simplification'].med.settings['@aria-hidden']="true";
		  else
		  if (profile['@coga-simplification'].high.settings['@aria-hidden']=="false")
			    {
					profile['@coga-simplification'].high.settings['@aria-hidden']="true";

				}
	//personalise importance according to new profile
	personalise_page_importance(profile);
}

//hide or display elements by coga-simplification according to the settings in the JSON object recieved
function personalise_page_importance(profile)
{


	//select all elements in document
    var x = document.querySelectorAll( 'body *' );

	for (var i = 0; i < x.length; i++) {
		//hide or display element
		personalise_element_importance(x[i], profile['@coga-simplification']);

		 }

}

// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}


// Make the actual CORS request.
function makeCorsRequest(url) {

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
	//parse JSON
	var jsonSkin = JSON.parse(text);
	//make global variable

  console.log(jsonSkin.hello);
 window.profile = jsonSkin;

 //run settings
 personalisePage(jsonSkin);

  };

  xhr.onerror = function() {
    console.log("looks like the browser doesn't support CORS. Alternatives include using a proxy or JSONP.");
  };

  xhr.send();
}

//set elements' CSS according to the settings in the JSON object recieved
function setCSS (element, settings) {
	if (isDefined(settings))
	  for (var i=0; i<settings.length; i++)
			  {
				  if (isDefined(settings[i].propertyName))
				  {
					  var propertyName = settings[i].propertyName;
					  if (isDefined(settings[i].value))
					  {
						  var value = settings[i].value;
					  $(element).css(propertyName, value);
					  }
				  }

			  }

}


//set elements' descendents' CSS according to the settings in the JSON object recieved
function setCSS_des (element, des_settings) {
	if (isDefined(des_settings))
		for (var i=0; i<des_settings.length; i++)
		{
			var styleSettings = des_settings[i].settings.css;
			if (isDefined(styleSettings));
			for (var j=0; j<styleSettings.length; j++)
			{
				var propertyName = styleSettings[j].propertyName;
				var value = styleSettings[j].value;
				if (isDefined(propertyName) && isDefined(value))
					$(element).find(des_settings[i].descendentTag).css(propertyName, value);
			}
		}

}

// personalise text and icon of form (input) element according to settings in the JSON object recieved
function style_form_element(elem, profileFeature) {
	//add icon
	//note: adding an icon changes slightly the color of the button

	if (isDefined(profileFeature.settings.Symbol.url))
	{
		if (isDefined(profileFeature.settings.text))
		elem.value = "    "+profileFeature.settings.text;
		else elem.value = "    "+elem.value;
		elem.style.backgroundPosition="left";
		elem.style.backgroundRepeat="no\-repeat";
		elem.style.backgroundSize="1.2em";
		elem.style.backgroundImage="url("+profileFeature.settings.Symbol.url+")";
	}

	else
	if (isDefined(profileFeature.settings.text))
	elem.value = profileFeature.settings.text;

}

//returns false if the variable is undefined, empty or equalls to null, and true otherwise
function isDefined (variable)
{
	if (variable != null && variable != undefined && variable != "")
		return true;
	return false;

}

//personalise page by attributeName according to the settings in the JSON object recieved
//also works with tagName
function personalise_page_attribute(profileAttribute, AttributeName)
{


	  //select all elements
    var x = document.querySelectorAll( 'body *' );

 for (var i = 0; i < x.length; i++)
	 {
		 //personalise each element by attribute
		personalise_element_attribute(x[i], profileAttribute, AttributeName);
	 }

}

//personalise page by aria-function according to the settings in the JSON object recieved
function personalise_page_function(profile)
{

	personalise_page_attribute(profile['@aria-function'], "aria-function");


}

//personalise page by role according to the settings in the JSON object recieved
function personalise_page_role(profile)
{

	personalise_page_attribute(profile['@role'], "role");


}

//personalise page by tag name according to the settings in the JSON object recieved
function personalise_page_tagName (profile)
{

	personalise_page_attribute(profile['@tagName'], "tagName");


}
