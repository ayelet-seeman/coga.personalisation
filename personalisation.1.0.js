/* name: personalisation1.0.js
author: Ayelet Seeman
functions: personaliseImportance(cogaProfile), moreOptions(cogaProfile), lessOptions(cogaProfile), personaliseFunction(cogaProfile), personaliseForm (elem, profileFunction)
input: cogaProfile (Json file in accordance with https://rawgit.com/ayelet-seeman/coga.personalisation/JSON-Script/README.md) 
output: personalises page according to user settings in JSON profile
*/
  
 /* var scr = document.createElement("script");
  scr.type = "text/javascript";
scr.src = "file:///C:/Users/jgjy/Documents/coga/personalisation/demo/HelloWorld.js";

  */
  
  
  function loadJSON(callback) { 
  var xobj;
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xobj=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xobj=new ActiveXObject("Microsoft.XMLHTTP");
  }   
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'skin1.0.json', true); 
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
     
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 loadJSON(function(response) {
  // Parse JSON string into object
    var cogaProfile = JSON.parse(response);
	personaliseImportance(cogaProfile);
personaliseFunction(cogaProfile);
 });

  
  document.getElementById("demo").innerHTML+="third";


/* function-name: personaliseImportance
author: Ayelet Seeman
input: cogaProfile (Json file in accordance with https://rawgit.com/ayelet-seeman/coga.personalisation/JSON-Script/README.md) 
output: hides elements according to @aria-importance and user settings in cogaProfile
*/
function personaliseImportance(cogaProfile)
{
	//declare variables
  var profile = cogaProfile;
    var arImp;
document.getElementById("demo").innerHTML =
 profile['@aria-importance'].critical.settings['@aria-hidden'] + 
 profile['@aria-importance'].high.settings['@aria-hidden'] +
 profile['@aria-importance'].med.settings['@aria-hidden'] +
 profile['@aria-importance'].low.settings['@aria-hidden'];
  //get all elements
    var x = document.querySelectorAll( 'body *' );
//hide elements according to @aria-importance and user settings in cogaProfile
for (var i = 0; i < x.length; i++) {
       arImp =  x[i].getAttribute("aria-importance");
	   if (arImp!=undefined)
	   {
	   
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


/* function-name: moreOptions
author: Ayelet Seeman
input: cogaProfile (Json file in accordance with https://rawgit.com/ayelet-seeman/coga.personalisation/JSON-Script/README.md) 
output: displays an additional level of elements based on the aria-importance attribute and user settings in cogaProfile
*/

function moreOptions(cogaProfile)
{

	var profile = cogaProfile;
	if (profile['@aria-importance'].high.settings['@aria-hidden']=="true")
	  profile['@aria-importance'].high.settings['@aria-hidden']="false";
	  else
	    if (profile['@aria-importance'].med.settings['@aria-hidden']=="true")
	      profile['@aria-importance'].med.settings['@aria-hidden']="false";
		  else 
		  if (profile['@aria-importance'].low.settings['@aria-hidden']=="true")
			    {
					profile['@aria-importance'].low.settings['@aria-hidden']="false";
					var temp = 1;
				}
			 
	personaliseImportance(profile);
	if (temp == 1) document.getElementById("more_options").setAttribute("aria-hidden", "true");	 

	
}

/* function-name: lessOptions
input: cogaProfile (Json file in accordance with https://rawgit.com/ayelet-seeman/coga.personalisation/JSON-Script/README.md) 
output: hides an additional level of elements based on the aria-importance attribute and user settings in cogaProfile
*/

function lessOptions(cogaProfile)
{
		var profile = cogaProfile;
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
			 
	personaliseImportance(profile);
}



/* function-name: personaliseFunction
author: Ayelet Seeman
input: cogaProfile (Json file in accordance with https://rawgit.com/ayelet-seeman/coga.personalisation/JSON-Script/README.md) 
output: personalises page according to @aria-function and user settings in cogaProfile:
1. add icon
2. change text
3. add tooltip
4. add access key
*/

function personaliseFunction(cogaProfile)
{

	var profile = cogaProfile;
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
			if (x[i].tagName=="INPUT") 
			{
			personaliseForm (x[i], profile['@aria-function'][j])
			}
			
			x[i].innerHTML = "\<img src\=\""+profile['@aria-function'][j].settings.Symbol+"\" style\=\" margin:0.1em; padding:0.1em; float:left; \" height\=\"30\"  width\=\"30\" style=\"\" alt\=\"\"\> "+" "+profile['@aria-function'][j].settings.text;
			x[i].title = profile['@aria-function'][j].settings.tooltip;
			x[i].style = profile['@aria-function'][j].settings.css;
			x[i].accessKey=profile['@aria-function'][j].settings.shortcut;
			}
			
		}
			
		}
	 }
	
	
}

/* function-name: personaliseForm
author: Ayelet Seeman
input: elem(element), profileFunction(json object)) 
output: personalises element according to @aria-function and user settings in cogaProfile:
1. add icon
2. change text
*/

function personaliseForm (elem, profileFunction)
{
	elem.value = "    "+profileFunction.settings.text;
	elem.setAttribute('style', 'display:block; background-position:left; background-repeat:no-repeat; background-size:1.2em\;'); 
	elem.style.backgroundImage="url("+profileFunction.settings.Symbol+")";
	
}







