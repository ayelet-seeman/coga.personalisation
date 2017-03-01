#Inject COGA

CSUN Code Sprint 2017
marisa.demeglio@gmail.com 

## Concept

COGA attributes allow for machine-readable identification of web page elements so that these elements may be labelled and styled according to a user's preferences.

The problem is that a website must have these attributes coded into it, and not all web developers may be aware of how they work.

The solution is to define a mapping of elements to attributes, in a remote file, and use a javascript file to inject these attributes into the page.

The drawback is that each mapping is quite site-specific, but many users could benefit from a single mapping, so it may be worth it to invest the time in creating this file.

## What it does

* Runs as a chrome extension.
* Injects COGA attributes to a webpage. See https://github.com/w3c/personalization-semantics for more information about COGA. 
* The attributes are assigned to elements based on a mapping file (e.g. mapping01.json). The mapping file is associated with a URI based on another mapping file (dir.json).
* The idea is that the mappings can live on a server and be discovered by this script.
* Right now, the mapping directory is served up on localhost (you have to do this part yourself), but it could live anywhere. Just edit the URLs appropriately.

## What it doesn't do

* Needs better integration with COGA personalize scripts
* See https://github.com/ayelet-seeman/coga.personalisation for some examples of these scripts
* Element matching ability is limited by the XPath functions available in the browser.


