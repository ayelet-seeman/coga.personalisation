/* name: personalisation1.0.js

author: Ayelet Seeman

functions: moreOptions(profile), lessOptions(profile), personalisePage(profile), personaliseImportance(profile), personaliseFunction(profile), personaliseForm (elem, profileFunction), function makeCorsRequest(url), function createCORSRequest(method, url)

The script personalises the web page according to user settings in the JSON profile

see more at: https://github.com/ayelet-seeman/coga.personalisation/
*/
  
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
    window.profile = jsonSkin;
	// run personalisation
	console.log(jsonSkin.hello);
	personalisePage(jsonSkin);
  

  };

  xhr.onerror = function() {
    console.log("looks like the browser doesn't support CORS. Alternatives include using a proxy or JSONP.");
  };

  xhr.send();
}

//a JSON skin compliant with:
//https://rawgit.com/ayelet-seeman/coga.personalisation/JSON-Script/README.md
var url = 'https://rawgit.com/ayelet-seeman/coga.personalisation/JSON-Script/json_skin.js';

makeCorsRequest(url);

/*
personalise page according to the aria-importance attribute, aria-function attribute, and user settings in JSON skin:
1. add icon
2. change text
3. add tooltip
4. add access key
5. hide and display elements
*/
function personalisePage(profile)
{
	personaliseImportance(profile);
    personaliseFunction(profile);	
}

//hide and display elements according to their aria-importance attribute and user settings in JSON skin
function personaliseImportance(profile)
{
    var arImp;

  //get all elements
    var x = document.querySelectorAll( 'body *' );

for (var i = 0; i < x.length; i++) {
	
	//get element's aria-importance
	
       arImp =  x[i].getAttribute("aria-importance");
	 //hide/show elements using aria-hidden
	   if (arImp!=undefined)
	   {
	   //elements with aria-importance critical are always displayed
		   if (arImp=="critical"){ x[i].setAttribute("aria-hidden", "false");}
		   else 
		     if (arImp=="high" && profile['@aria-importance'].high.settings['@aria-hidden']=="false") 
			 {x[i].setAttribute("aria-hidden", "false");}
			 else
			  if (arImp=="med" && profile['@aria-importance'].med.settings['@aria-hidden']=="false")
			  {x[i].setAttribute("aria-hidden", "false");}
			   else 
		         if (arImp=="low" && profile['@aria-importance'].low.settings['@aria-hidden']=="false") x[i].setAttribute("aria-hidden", "false");
			     else x[i].setAttribute("aria-hidden", "true");

		   }
	   
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
	personaliseImportance(profile);
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
	personaliseImportance(profile);
}



/*
personalise elements according to their aria-function attribute and user settings in JSON skin (profile):
1. add icon
2. change text
3. add tooltip
4. add access key
*/

function personaliseFunction(profile)
{

	  //get all elements
    var x = document.querySelectorAll( 'body *' );
	var i, j;

	var numFunc = profile['@aria-function'].length;

 
 for (i = 0; i < x.length; i++)
	 {
		 arFunc =  x[i].getAttribute("aria-function");
		if (arFunc!= undefined)
		{
			 	for (j=0; j<numFunc; j++)
		{
			if (arFunc== profile['@aria-function'][j].function_name)
			{
			//check if element needs to be personalised differently
			if (x[i].tagName=="INPUT") 
			{
			personaliseForm (x[i], profile['@aria-function'][j]);
			}
			//check icon exists
			if (profile['@aria-function'][j].settings.Symbol != "" && profile['@aria-function'][j].settings.Symbol != null)
			//add icon and change text
			x[i].innerHTML = "\<img src\=\""+profile['@aria-function'][j].settings.Symbol+"\" style\=\" margin:0.1em; padding:0.1em; float:left; \" height\=\"30\"  width\=\"30\"  alt\=\"\"\> "+" "+profile['@aria-function'][j].settings.text;
			//change text
			else x[i].innerHTML = profile['@aria-function'][j].settings.text;
			// add/change tooltip
			x[i].title = profile['@aria-function'][j].settings.tooltip;
			// add/change style
			x[i].style = profile['@aria-function'][j].settings.css;
			// add/change shortcut (accesskey)
			x[i].accessKey=profile['@aria-function'][j].settings.shortcut;
			}
			
		}
			
		}
	 }
	
	
}

/* personalise form (input) element according to @aria-function and user settings in cogaProfile:
1. add icon
2. change text
*/

function personaliseForm (elem, profileFunction)
{
	//add icon
	//note: adding an icon changes slightly the color of the button
	if (profileFunction.settings.Symbol != "" && profileFunction.settings.Symbol != null)
	{
		elem.value = "    "+profileFunction.settings.text;
		elem.setAttribute('style', 'display/:block/; background/-position/:left/; background-repeat:no-repeat; background-size:1.2em;');

		elem.style.backgroundImage="url("+profileFunction.settings.Symbol+")";
	}
	
	else
	elem.value = profileFunction.settings.text;
	
}







