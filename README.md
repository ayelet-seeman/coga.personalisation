#coga.personalisation
<p>This is a project to help personlisation for any use - including people with learning and memory issues. It is described more at: <a href="https://www.w3.org/WAI/PF/cognitive-a11y-tf/wiki/Easy_Personalization">https://www.w3.org/WAI/PF/cognitive-a11y-tf/wiki/Easy_Personalization</a></p>
<p>It consists of 4 parts:</p>
<ol>
<li>Json files for user setting: <a href="https://github.com/ayelet-seeman/coga.personalisation/tree/JSON-Script">https://github.com/ayelet-seeman/coga.personalisation/tree/JSON-Script</a></li>
<li>Aria proposal for new syntax: <a href="https://github.com/w3c/coga/blob/master/issue-papers/links-buttons.html">https://github.com/w3c/coga/blob/master/issue-papers/links-buttons.html</a> <br />
note we are still working on it. more items will come/change</li>
<li>An HTML page that uses some of the new aria syntax: <a href="https://github.com/ayelet-seeman/coga.personalisation/tree/ExampleWebPage/">https://github.com/ayelet-seeman/coga.personalisation/tree/ExampleWebPage/</a></li>
<li>Scripts that a web auther can use or include that read the user settings in the JSON files and adapt the page for  the user needs: <a href="https://github.com/ayelet-seeman/coga.personalisation/tree/Script-Options">https://github.com/ayelet-seeman/coga.personalisation/tree/Script-Options</a></li></ol>

<h2>JavaScript Documentation</h2>
<p>The JavaScript file personalises the web page according to user settings specified in a JSON file, which trigger by the tag name, role, aria-importance attribute and aria-function attribute.</p>
<p> The settings in the JSON file need to be in accordance with <a href="https://github.com/ayelet-seeman/coga.personalisation/tree/JSON-Script">https://github.com/ayelet-seeman/coga.personalisation/tree/JSON-Script</a>.</p>

<h2>Functions</h2>
<p><b>getPersonalisation (url (String))</b> -  download JSON object in url, and personalise page based on the settings in it.</p>

<p><b>moreOptions (profile (JSON object))</b> - display elements with an aria-importance attribute one level lower.</p>

<p><b>lessOptions (profile (JSON object))</b> - hide elements with an aria-importance attribute one level higher.</p>

<p><b>personalisePage (profile (JSON object))</b> - personalise page based on the settings in the JSON object recieved.</p>

<p><b>personalise_page_attribute (profileAttribute, AttributeName)</b> - personalise page by attributeName according to the settings in the JSON object recieved</b> - also works with tagName.</p>

<p><b>personalise_page_importance (profile (JSON object))</b> - hide or display elements by aria-importance according to the settings in the JSON object recieved.</p>

<p><b>personalise_page_role (profile (JSON object))</b> - personalise page by role according to the settings in the JSON object recieved.</p>

<p><b>personalise_page_tagName (profile (JSON object))</b> - personalise page by tag name according to the settings in the JSON object recieved.</p>

<p><b>personalise_page_function (profile (JSON object))</b> - personalise page by the aria-function attribute according to the settings in the JSON object recieved.</p>

<p><b>personalise_element (element, profile)</b> - personalise element according to the settings in the JSON object recieved.</p>

<p><b>personalise_element_attribute (element, profileAttribute, AttributeName)</b> - personalise element by attributeName according to the settings in the JSON object recieved</b> - also works with tagName.</p>

<p><b>personalise_element_importance (element, imp_settings)</b> - hide or display element by it's aria-importance according to the settings in the JSON object recieved.</p>

<p><b>setCSS (element, settings)</b> - set elements' CSS according to the settings in the JSON object recieved.</p>

<p><b>setCSS_des (element, des_settings)</b> - set element's descendents' CSS according to the settings in the JSON object recieved.</p>

<p><b>personalise_form_element (elem, profile)</b> - personalise text and icon of form (input) element according to settings in the JSON object recieved.</p>

<p><b>createCORSRequest (method, url)</b> - create the XHR object.</p>

<p><b>makeCorsRequest (url)</b> - make the actual CORS request and run the personalisation.</p>

<p><b>isDefined (variable)</b> -  return true if the variable is defined, false otherwise.</p>

<h3>Issues</h3>
<ol>
<li> The JSON skins are loaded using CORS.</li>
<ol><li>It isn't supported in all browsersers.<br>
Alternatives include using JSONP and using a proxy.</li>
<li> Using CORS with content we don't have control over could be a security issue.</li></ol>
<li> Adding an icon to a form element changes it's color slightly.</li>
<li> Do we want to enable specifying different settings for the same aria-function attribute value depending on the element's tag?</li>
<li> Is there an efficient way to cascade JSON skins?</li> 
</ol>
