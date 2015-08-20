#coga.personalisation
<p>This is a project to help personlisation for any use - including people with learning and memory issues. It is described more at: <a href="https://www.w3.org/WAI/PF/cognitive-a11y-tf/wiki/Easy_Personalization">https://www.w3.org/WAI/PF/cognitive-a11y-tf/wiki/Easy_Personalization</a></p>
<p>It is made of 4 parts:</p>
<ol>
<li>Json files for user setting: <a href="https://github.com/ayelet-seeman/coga.personalisation/tree/JSON-Script">https://github.com/ayelet-seeman/coga.personalisation/tree/JSON-Script</a></li>
<li>Aria proposal for new syntax: <a href="https://github.com/w3c/coga/blob/master/issue-papers/links-buttons.html">https://github.com/w3c/coga/blob/master/issue-papers/links-buttons.html</a> <br />
note we are still working on it. more items will come/change</li>
<li>An HTML page that uses some of the new aria syntax: <a href="https://github.com/ayelet-seeman/coga.personalisation/tree/ExampleWebPage/">https://github.com/ayelet-seeman/coga.personalisation/tree/ExampleWebPage/</a></li>
<li>Scripts that a web auther can use or include that read the user settings in the JSON files and adapt the page for  the user needs: <a href="https://github.com/ayelet-seeman/coga.personalisation/tree/Script-Options">https://github.com/ayelet-seeman/coga.personalisation/tree/Script-Options</a></li></ol>

##JavaScript Documentation
*  Scripts that personalise page according to elements' aria-importance & aria-function attributes and user settings in the JSON skin. 

##Functions
<p> <b>moreOptions(profile)</b> display elements with a lower aria-importance attribute</p>
<p><b>lessOptions(profilele)</b> hide elements with a higher aria-importance attribute</p>
<p><b>personalisePage(profile)</b> personalise page according to the aria-importance attribute, aria-function attribute, and user settings in JSON skin:
<ul><li>hide and display elements</li>
<li>add icon</li>
<li>change text</li>
<li>add tooltip</li>
<li>add access key</li></ul></p>
<p><b>personaliseImportance(profile)</b> hide and display elements according to their aria-importance attribute and user settings in JSON skin</p>
<p><b>personaliseFunction(profile)</b> personalise elements according to their aria-function attribute and user settings in JSON skin (profile):
<ul><li>add icon</li>
<li>change text</li>
<li>add tooltip</li>
<li>add access key</li></ul>
</p>
<p><b>personaliseForm (elem, profileFunction)</b> personalise form (input) element according to @aria-function and user settings in cogaProfile:
<ul><li>add icon</li>
<li>change text</li></ul>
</p>
<p><b>function makeCorsRequest(url)</b> Make the actual CORS request.
<p><b>function createCORSRequest(method, url)</b> Create the XHR object.



####Issues
<ol>
<li> The JSON skins are loaded using CORS.</li>
<ol><li>It isn't supported in all browsersers.<br>
Alternatives include using JSONP and using a proxy.</li>
<li> Using CORS with content we don't have control over could be a security issue.</li></ol>
<li>Adding an icon to a form element doesn't work on firefox.</li>
<li>Adding an icon to a form element on google chrome changes it color slightly.</li>
</ol>

##JSON-Skin Documentation

* Proposed default settings for @aria-importance in JSON script. 
* compose(default importance = "critical")

All the key-value in the JSON file is followed the https://rawgit.com/w3c/coga/master/issue-papers/links-buttons.html

###Guideline for creating the JSON profile:

```json
{
    "coga.profile": {
        "@aria-function": [{
                "function": "function",
                "type": ["proposed for the functions target widge type."],   
                "name": "function name",
                "inherits": "boolean",
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
                    }
                },
                    "@aria-hidden": "boolean override settings",
                    "css": "css override setting"
                }
            }],
        "@aria-importance": 
        {
            "critical ('critical','high','med','low')": { 
                    "settings": {
                        "@aria-hidden": "boolean",
                        "css": "css override setting"
                    }
                }
        }
    }
}

```

##Demo Website ([Online Clothes Shop](https://rawgit.com/ayelet-seeman/coga.personalisation/ExampleWebPage/demo1.0.html))

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

###Example Profile
- Example 1 [JSON-profile](https://github.com/ayelet-seeman/coga.personalisation/blob/JSON-Script/profile_exmaple_1.json)
- Example 2 [JSON-profile](https://github.com/ayelet-seeman/coga.personalisation/blob/JSON-Script/profile_exmaple_2.json)
