/* name: personalisation1.0.js

author: Ayelet Seeman

functions: moreOptions(profile), lessOptions(profile), personalisePage(profile), personaliseImportance(profile), personaliseFunction(profile), personaliseForm (elem, profileFunction), function makeCorsRequest(url), function createCORSRequest(method, url)

The script personalises the web page according to user settings in the JSON profile

see more at: https://github.com/ayelet-seeman/coga.personalisation/
*/
  
 function getPersonalisation(url)
  {
	  //load json skin (profile)
	  makeCorsRequest(url);

	  	  
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
 personalisePage(profile);

  };

  xhr.onerror = function() {
    console.log("looks like the browser doesn't support CORS. Alternatives include using a proxy or JSONP.");
  };

  xhr.send();
}

/*
personalise page according to the aria-importance attribute, aria-function attribute, and user settings in JSON skin
*/
function personalisePage(profile)
{
	
		    var x = document.querySelectorAll( 'body *' );

for (var i = 0; i < x.length; i++) {
	personalise_element(x[i], profile);
}

	document.getElementById("personalise_page").setAttribute("aria-hidden", "true");
	
}


//hide and display elements according to their aria-importance attribute and user settings in JSON skin
function personalise_page_importance(profile)
{
   

  //get all elements
    var x = document.querySelectorAll( 'body *' );

for (var i = 0; i < x.length; i++) {
	personalise_element_importance(x[i], profile['@aria-importance']);
	   
	 }

}



//display elements with a lower aria-importance attribute
function moreOptions(profile)
{

var temp = 0;
	//change settings in local JSON skin (profile)
	if (profile['@aria-importance'].high.settings['@aria-hidden']=="true")
	  profile['@aria-importance'].high.settings['@aria-hidden']="false";
	  else
	    if (profile['@aria-importance'].med.settings['@aria-hidden']=="true")
	      profile['@aria-importance'].med.settings['@aria-hidden']="false";
		  else 
		  if (profile['@aria-importance'].low.settings['@aria-hidden']=="true")
			    {
					profile['@aria-importance'].low.settings['@aria-hidden']="false";
					temp = 1;
				}
	//personalise importance according to new profile
	personalise_page_importance(profile);
	// hide the more options button if all elements are displayed
	if (temp == 1) document.getElementById("more_options").setAttribute("aria-hidden", "true");	 

	
}

//hide elements with a higher aria-importance attribute
function lessOptions(profile)
{
	//change settings in local JSON skin (profile)		
	if (profile['@aria-importance'].low.settings['@aria-hidden']=="false")
	  profile['@aria-importance'].low.settings['@aria-hidden']="true";
	  else
	    if (profile['@aria-importance'].med.settings['@aria-hidden']=="false")
	      profile['@aria-importance'].med.settings['@aria-hidden']="true";
		  else 
		  if (profile['@aria-importance'].high.settings['@aria-hidden']=="false")
			    {
					profile['@aria-importance'].high.settings['@aria-hidden']="true";
					
				}
	//personalise importance according to new profile			 
	personalise_page_importance(profile);
}




//personalise elements according to their aria-function attribute and user settings in JSON skin (profile)


function personalise_page_function(profile)
{

	personalise_page_attribute(profile['@aria-function'], "aria-function");

	
}

function personalise_page_role(profile)
{

	personalise_page_attribute(profile['@role'], "role");

	
}
/* personalise form (input) element according to @aria-function and user settings in cogaProfile:
1. add icon
2. change text
*/

function personalise_form_element(elem, profileFunction)
{
	//add icon
	//note: adding an icon changes slightly the color of the button

	if (isDefined(profileFunction.settings.Symbol.url) )
	{
		elem.value = "    "+profileFunction.settings.text;
		elem.setAttribute('style', 'display/:block/; background/-position/:left/; background-repeat:no-repeat; background-size:1.2em;');

		elem.style.backgroundImage="url("+profileFunction.settings.Symbol.url+")";
	}
	
	else
	elem.value = profileFunction.settings.text;
	
}



function personalise_page_attribute(profileAttribute, AttributeName)
{


	  //get all elements
    var x = document.querySelectorAll( 'body *' );
	
 for (var i = 0; i < x.length; i++)
	 {
		personalise_element_attribute(x[i], profileAttribute, AttributeName);
	 }

}


function setCSS (element, settings)
{
	for (var i=0; i<settings.length; i++)
			{
				var propertyName = settings[i].propertyName;
				var value = settings[i].value;
				$(element).css(propertyName, value);
	
			}

}

function setCSS_des (element, des_settings)
{

	for (var i=0; i<des_settings.length; i++)
				{
					
			var styleSettings = des_settings[i].settings.css;


			for (var j=0; j<styleSettings.length; j++)
			{

				if (isDefined(styleSettings[j].propertyName) )
				{
				var propertyName = styleSettings[j].propertyName;
				var value = styleSettings[j].value;


				$(element).find(des_settings[i].descendentTag).css(propertyName, value);
				
				}
				
			}
				}
}

function isDefined (variable)
{
	
	
if (variable != null && variable != undefined && variable != "")
{

return true;
}
return false;	
	
}

function personalise_element_attribute(element, profileAttribute, AttributeName)
{
	attribute =  element.getAttribute(AttributeName);
		var numFunc = profileAttribute.length;
		if (isDefined(attribute) )
		{ 

				for (var j=0; j<numFunc; j++)
		{
			
			if (attribute== profileAttribute[j].offName)
			{

			//check if element needs to be personalised differently
			if (element.tagName=="INPUT") 
			{
			personalise_form_element (element, profileAttribute[j]);
			}
			
			//change descendents
			if (isDefined(profileAttribute[j].descendents) )
			{
				setCSS_des (element, profileAttribute[j].descendents);
				
			}

			
			//check icon exists
			
			if (isDefined(profileAttribute[j].settings) )
			{ 
				
			if (isDefined(profileAttribute[j].settings.Symbol.url) )
			{
			
				var height = "30";
				var width = "30";
				if (isDefined(profileAttribute[j].settings.Symbol.settings.height) )
				var height = profileAttribute[j].settings.Symbol.settings.height;
				 
				if (isDefined(profileAttribute[j].settings.Symbol.settings.width) )
				var width = profileAttribute[j].settings.Symbol.settings.width;
				
				
				//add icon
			element.innerHTML = "\<img src\=\""+profileAttribute[j].settings.Symbol.url+"\" style\=\" margin:0em; padding:0em; padding\-top:-0.2em; float:left; \" height\=\""+height+"\"  width\=\""+width+"\"  alt\=\"\"\> "+" "+profileAttribute[j].settings.text;
		
						
			}
			
			else 
			{
				//change text
				element.innerHTML = profileAttribute[j].settings.text;
				
				console.log("step4");
			}
			
			element.style.width = "auto";
			element.style.paddingRight = "0.5em";
			element.style.paddingLeft = "0.5em"
			
			
			var styleSettings = profileAttribute[j].settings.css;
			
			setCSS (element, styleSettings);

			// add/change tooltip
			element.title = profileAttribute[j].settings.tooltip;

			// add/change shortcut (accesskey)
			element.accessKey=profileAttribute[j].settings.shortcut;
			console.log ("made it to the end.");
			
			}
						}
			
		}
			
		}
	 }


function personalise_element(element, profile)
{
	personalise_element_attribute(element, profile['@role'], "role");
	personalise_element_attribute(element, profile['@aria-function'], "aria-function");
	personalise_element_importance(element, profile['@aria-importance'])
	
	
}

function personalise_element_importance(element, imp_settings)
{
	
	
       arImp =  element.getAttribute("aria-importance");
	 
	 
	 //more elegant and easier to add additional levels, but less robust.  
	 /*  //hide/show element depending on it's aria importance
	   if (is_defined(arImp) )
	   {
	   console.log(imp_settings[arImp].settings['@aria-hidden']);
	   if (imp_settings[arImp].settings['@aria-hidden']=="false")
	   element.setAttribute("aria-hidden", "false");
	   else if (imp_settings[arImp].settings['@aria-hidden']=="true")
	   element.setAttribute("aria-hidden", "true");
	   }
	   */
	   
	   	 //hide/show elements using aria-hidden
	   if (isDefined(arImp) )
	   {
	   //elements with aria-importance critical are always displayed
		   if (arImp=="critical"){ element.setAttribute("aria-hidden", "false");}
		   else 
		     if (arImp=="high" && imp_settings.high.settings['@aria-hidden']=="false") 
			 {element.setAttribute("aria-hidden", "false");}
			 else
			  if (arImp=="med" && imp_settings.med.settings['@aria-hidden']=="false")
			  {element.setAttribute("aria-hidden", "false");}
			   else 
		         if (arImp=="low" && imp_settings.low.settings['@aria-hidden']=="false") element.setAttribute("aria-hidden", "false");
			     else element.setAttribute("aria-hidden", "true");

		   }
	   
	 }
	 
