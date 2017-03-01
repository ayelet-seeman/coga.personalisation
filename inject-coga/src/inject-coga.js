var mapping = null;
var mappings_url = "http://localhost:8000/mappings/dir.json";

function find_mapping_for_domain(domain_uri) {

    $.getJSON(mappings_url)
      .done(function(json) {
        json.domains.forEach(function(obj) {
            if (obj.domain == domain_uri) {
                $.getJSON(obj.mapping)
                  .done(function(json) {
                    apply_mapping(json);
                  })
                  .fail(function( jqxhr, textStatus, error ) {
                    var err = textStatus + ", " + error;
                    console.log( "Request Failed: " + err );
                });
            }
        });

      })
      .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    });
}

function add_attributes(node, attributes) {
    attributes.forEach(function(obj) {
        console.log("Setting " + obj.name + " = " + obj.value + " for <" + node.nodeName + ">");
        node.setAttribute(obj.name, obj.value);
    });
}

// finish here
function apply_mapping(mapping) {
    mapping.page_elements.forEach(function(obj) {
        var elms = document.evaluate(obj.xpath, document)
        var elm = elms.iterateNext();
        // save these elements because after we modify them, the iterator won't work anymore
        // it complains that the document has changed
        var saved_elms = []
        if (elm != null) {
            saved_elms.push(elm);
        }

        while (elm) {
            elm = elms.iterateNext();
            if (elm != null) {
                saved_elms.push(elm);
            }
        }
        saved_elms.forEach(function(saved_elm) {
            add_attributes(saved_elm, obj.attributes);
        });
        
    });
}

// start here
function inject_coga() {
    var mapping = find_mapping_for_domain(window.location.host);
}

inject_coga();

