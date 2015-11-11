# coga.personalisation
<p>This is a project to help personlisation for any use - including people with learning and memory issues. It is described more at: <a href="https://www.w3.org/WAI/PF/cognitive-a11y-tf/wiki/Easy_Personalization">https://www.w3.org/WAI/PF/cognitive-a11y-tf/wiki/Easy_Personalization</a></p>
<p>It is made of 4 parts:</p>
<ol>
<li>Json files for user setting: <a href="https://github.com/ayelet-seeman/coga.personalisation/tree/JSON-Script">https://github.com/ayelet-seeman/coga.personalisation/tree/JSON-Script</a></li>
<li>Aria proposal for new syntax: <a href="https://rawgit.com/w3c/coga/master/issue-papers/links-buttons.html">https://rawgit.com/w3c/coga/master/issue-papers/links-buttons.html</a> <br />
note we are still working on it. more items will come/change</li>
<li>An HTML page that uses some of the new aria syntax: <a href="https://github.com/ayelet-seeman/coga.personalisation/tree/ExampleWebPage/">https://github.com/ayelet-seeman/coga.personalisation/tree/ExampleWebPage/</a></li>
<li>Scripts that a web auther can use or include that read the user settings in the JSON files and adapt the page for  the user needs: <a href="https://github.com/ayelet-seeman/coga.personalisation/tree/Script-Options">https://github.com/ayelet-seeman/coga.personalisation/tree/Script-Options</a></li>
<li> Stuctured HTML that idetifies the prefrences. Cascading: sort by order specified: if two declarations, the latter specified wins</li>
</ol>


<h2>To Do List</h2>
<ul>
<li>store as stuctured html in place of cookie- assigned to Chaohai</li>
<li> Cascading: sort by order specified: if two declarations, the latter specified wins - assigned to Chaohai in the stuctured htmle, and to ayelet in the implemtation</li>
<li> upgade the terms used with  the new proposal update and coga prefex</li>
<li> write 2 or 3 example JSON descriptions/files for MCI and dyscalcilia using the aria proposal on Adaptable Links and Buttons  dyscalcilia coga-numberfree= always, prefered , none (defualt)- assigned to Chaohai (on hond becuse we want to discuss settings with the group)</li>
<li> implement aria button and link functions to add  pannel for extra help with button added to main menu</li>

<li> define and enable cascading</li>
<li> add later aria properties to the html page </li>
<li> add later aria properties to the json </li>
<li>reminders and disterbences</li>
<li> add later aria properties to the script  </li>
<li> add later api (speach foalso for feedback, speach text highlighting, and other web components) to the html page, the json , the script </li>
<li> enable different default values for aria-importance</li>
<li> overide importance</li>
<li> proposed issues
<ul>
<li>Position of elements </li>
<li>Sentences can not be reliably divided. For that use aria-easylang or aria-hasalt as described abov</li>
<li>enlarged cursor</li>
<li>screen reading when available</li>
<li>a view bar for isolating text while reading,</li>
<li>Speak text and symbols</li>
<li>Highlighting: off, by word, phrase, sentence (do we need spans to identify divisions?)<mjm>Misspelling in question posed. I'm not sure I understand the question. Divisions of what, the content that would be read? Wouldn't that simply follow normal document/information structure (e.g. paragraph, line of info being displayed, sentence, etc.)</mjm>
</li>
<li>Disable background audio</li>
<li>Color and background color preference</li>
<li><mjm>How about persistent user settings for captioning or audio description or for filtering background noise in media?</mjm>
</li>
<li>F1 is help about the browser npt the content</li>
<li>Issues: a universal way for saying I need help – help panel and humen help </li>
<li>Ambiguity in link types contact us could be a link or section</li>
<li>Option  - make the names unabiuses contucuslink</li>
<li>Or trigger with both role and function  (unless role is implide by element type suc as ancor or section)</li>
<li>Local storage in html 5 not in cookie </li>
<li>Video and api</li><ul>
<li>1.	I want tooltips / I do not want tooltips when an item has focus</li>
<li>2. I want side panel that with show the “morehelp” open by defula</li>
<li>3. I want side panel that can be opened when I click on my help icon </li>
<li>4. I want extra help in a popup window</li>
<li>5. Show “more info” link </li>
<li>6. I want links to "more information" when ever possible </li>
<li>7. I want definitions in the side panel </li>
<li>
8. Iwant link to human help to be shown/not shown</li>
</li></ul></li>

Done items (note we only started keeping this as of novermber)
<ul>
<li> parse the the json to identify any attribute as a variable </li>
<li>identify the local storage</li>
</ul>

removed items
<ul>
<li>button for choosing what json file to load, reads  the name from  the json and provides that as an option - this is handeled by the stuctred html</li>
<li> implement aria button and link functions to add icon, change text, shortcut key add tooltip and pannel for extra help</li> - Ayelet
</ul>
