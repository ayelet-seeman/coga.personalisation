/* name: personalisation.1.0.js
author: Ayelet Seeman
function: personaliseImportance
input: cogaProfile
output: hides elements according to @aria-importance and user settings in cogaProfile
*/

personaliseImportance(cogaProfile);
function personaliseImportance(cogaProfile)
{
	//declare variables
  var profile = cogaProfile;
    var x = document.querySelectorAll( 'body *' );
    var i, arImp;
	var oneHidden, twoHidden, threeHidden, fourHidden;
oneHidden = profile.ariaImportance.one.settings.ariaHidden;
twoHidden = profile.ariaImportance.two.settings.ariaHidden;
threeHidden = profile.ariaImportance.three.settings.ariaHidden;
fourHidden = profile.ariaImportance.four.settings.ariaHidden;

//get all elements
    for (i = 0; i < x.length; i++) {
       arImp =  x[i].getAttribute("@aria-importance")
//hide elements elements according to @aria-importance and user settings in cogaProfile
	   if (arImp!=undefined)
	   if (arImp=="1")
	   {
		   if (oneHidden == "true")
		   {
			   x[i].style.display="none";
		   }
	   }
	    else	  if (arImp=="2")
	   {
		   if (twoHidden == "true")
		   {
			   x[i].style.display="none";
		   }
	   }
		   
		  else  if (arImp=="3")
	   {
		   if (threeHidden == "true")
		   {
			   x[i].style.display="none";
		   }
	   }
		   else  if (arImp=="4")
	   {
		   if (threeHidden =="true")
		   {
			   x[i].style.display="none";
		   }
	   }
	   
	}
}
