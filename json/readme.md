## coga.personalisation
This is a project to help personlisation for any use - including people with learning and memory issues. It is described more at
https://www.w3.org/WAI/PF/cognitive-a11y-tf/wiki/Easy_Personalization and https://docs.google.com/document/d/1UG5OvMJ_0_9a45J1Z9oeQhWHoIw6jZfLuLafdm-k4MM/edit?usp=sharing
It is made of 3 parts.
1. Json files for user setting
2. Aria proposal for new syntax: https://w3c.github.io/personalization-semantics/
note we are still working on it. more items will come/change
3. An HTML page that uses some of the new coga syntax
4. Scripts that a web auther can use or include that read the user settings in the JSON files and adapt the page for  the user needs 

##JSON-Skin Documentation

* Proposed default settings for @coga-simplification in JSON script. 
* compose(default importance = "critical")

All the key-value in the JSON file is followed the https:https://w3c.github.io/personalization-semantics/

###Guideline for creating the JSON profile:

```json
{
        "@coga-action"('@role','@tag'): [{
                "offName": "function",
                "type": ["proposed for the functions target widge type."],   
                "name": "function name",
                "inherits": "boolean",
		"descendents":[
			{ 
			"descendentTag":"string, tag",
			"settings":
				{
				  "css": [
					  {
						  "propertyName":"propertyName",
						  "value":"value"
					  
					  }
					  ]
				 }
				 }
			 ], 
                "settings": { 
                    "shortcut": "Shortcut setting for this function",
                    "longdesc": "description for settings",
                    "tooltip": "tooltip for display",
                    "text": "text for display",
                    "Symbol": {
                    "url": "url symbol",
                    "creator": {
                        "name": "creator name",
                        "url": "creator url"
                        
                    },
                    "license": {
                        "name": "licenses",
                        "url": "licenses url"
                    },

			"settings":{
					"width":"num of px",
					"height":"num of px",
					"margin":"value",
					"padding":"value"
					}
                    }
               
                    "@aria-hidden": "boolean",
                    "css": "css override setting"
                }
            }],
            

	
	
        "@coga-simplification": 
        {
            "critical ('critical','high','med','low')": { 
                    "settings": {
                        "@aria-hidden": "boolean",
                        "css": "css override setting"
                    }
                }
        }
    
}

```

##Demo Website ([Personalised Clothes - Contact Us](https://rawgit.com/ayelet-seeman/coga.personalisation/ExampleWebPage/contactUs.html))

###button functions:
- send email
- reset contact us form
- send contact us form

###links functions:
- home
- contact us
- site map
- product
- services

###form control
- name
- phone
- email
- subject
- message

###OLD Example Profile
- Example 1 [JSON-profile](https://github.com/ayelet-seeman/coga.personalisation/blob/JSON-Script/profile_exmaple_1.json)
- Example 2 [JSON-profile](https://github.com/ayelet-seeman/coga.personalisation/blob/JSON-Script/profile_exmaple_2.json)

###New Example Profile 
https://rawgit.com/ayelet-seeman/coga.personalisation/master/json/profile_exmaple_1.json
https://rawgit.com/ayelet-seeman/coga.personalisation/master/json/profile_example_3.json