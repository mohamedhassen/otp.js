var _ = require('underscore');
var $ = jQuery = require('jquery-browserify');
var Backbone = require('../lib/backbone');


var OtpPlanResponseView = Backbone.View.extend({
 
    render : function() {

        if(this.options.narrative) {
            console.log(this.options.narrative);
            var narrativeView = new OTP.narrative_views.OtpPlanResponseNarrativeView({
                el: this.options.narrative,
                model: this.model
            });
            narrativeView.render();
        }
    	var itins = this.model.get("itineraries");
    	_.each(itins.models, this.processItinerary, this);

        itins.at(0).trigger("activate");
    },

    processItinerary : function(itin, index) {
    	
        if(this.options.map) {
            var itinMapView = new OTP.map_views.OtpItineraryMapView({
                map: this.options.map,
                model : itin,
            });
        }
        if(this.options.topo) {
            var itinTopoView = new OTP.topo_views.OtpItineraryTopoView({
                map: this.options.map,
                model : itin,
            });
        }
    },

    newResponse : function(response) {

        // fire a deactivate event on the old active itin, if needed
        if(this.model && this.model.get("itineraries") && this.model.get("itineraries").activeItinerary) {
            this.model.get("itineraries").activeItinerary.trigger("deactivate");
        }

        this.model = response;
        this.render();
    },
});

module.exports.OtpPlanResponseView = OtpPlanResponseView;
