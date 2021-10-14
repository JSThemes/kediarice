function umberto_googlemap_init(dom_obj, coords) {
	"use strict";
	if (typeof google=="undefined") {
		return;
	}
	if (typeof UMBERTO_STORAGE['googlemap_init_obj'] == 'undefined') umberto_googlemap_init_styles();
	UMBERTO_STORAGE['googlemap_init_obj'].geocoder = '';
	try {
		var id = dom_obj.id;
		UMBERTO_STORAGE['googlemap_init_obj'][id] = {
			dom: dom_obj,
			markers: coords.markers,
			geocoder_request: false,
			opt: {
				zoom: coords.zoom,
				center: null,
				scrollwheel: false,
				scaleControl: false,
				disableDefaultUI: false,
				panControl: true,
				zoomControl: true, //zoom
				mapTypeControl: false,
				streetViewControl: false,
				overviewMapControl: false,
				styles: UMBERTO_STORAGE['googlemap_styles'][coords.style ? coords.style : 'default'],
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
		};
		
		umberto_googlemap_create(id);

	} catch (e) {
		
		dcl(UMBERTO_STORAGE['strings']['googlemap_not_avail']);

	};
}

function umberto_googlemap_create(id) {
	"use strict";

	// Create map
	UMBERTO_STORAGE['googlemap_init_obj'][id].map = new google.maps.Map(UMBERTO_STORAGE['googlemap_init_obj'][id].dom, UMBERTO_STORAGE['googlemap_init_obj'][id].opt);

	// Add markers
	for (var i in UMBERTO_STORAGE['googlemap_init_obj'][id].markers)
		UMBERTO_STORAGE['googlemap_init_obj'][id].markers[i].inited = false;
	umberto_googlemap_add_markers(id);
	
	// Add resize listener
	jQuery(window).resize(function() {
		if (UMBERTO_STORAGE['googlemap_init_obj'][id].map)
			UMBERTO_STORAGE['googlemap_init_obj'][id].map.setCenter(UMBERTO_STORAGE['googlemap_init_obj'][id].opt.center);
	});
}

function umberto_googlemap_add_markers(id) {
	"use strict";
	for (var i in UMBERTO_STORAGE['googlemap_init_obj'][id].markers) {
		
		if (UMBERTO_STORAGE['googlemap_init_obj'][id].markers[i].inited) continue;
		
		if (UMBERTO_STORAGE['googlemap_init_obj'][id].markers[i].latlng == '') {
			
			if (UMBERTO_STORAGE['googlemap_init_obj'][id].geocoder_request!==false) continue;
			
			if (UMBERTO_STORAGE['googlemap_init_obj'].geocoder == '') UMBERTO_STORAGE['googlemap_init_obj'].geocoder = new google.maps.Geocoder();
			UMBERTO_STORAGE['googlemap_init_obj'][id].geocoder_request = i;
			UMBERTO_STORAGE['googlemap_init_obj'].geocoder.geocode({address: UMBERTO_STORAGE['googlemap_init_obj'][id].markers[i].address}, function(results, status) {
				"use strict";
				if (status == google.maps.GeocoderStatus.OK) {
					var idx = UMBERTO_STORAGE['googlemap_init_obj'][id].geocoder_request;
					if (results[0].geometry.location.lat && results[0].geometry.location.lng) {
						UMBERTO_STORAGE['googlemap_init_obj'][id].markers[idx].latlng = '' + results[0].geometry.location.lat() + ',' + results[0].geometry.location.lng();
					} else {
						UMBERTO_STORAGE['googlemap_init_obj'][id].markers[idx].latlng = results[0].geometry.location.toString().replace(/\(\)/g, '');
					}
					UMBERTO_STORAGE['googlemap_init_obj'][id].geocoder_request = false;
					setTimeout(function() { 
						umberto_googlemap_add_markers(id); 
						}, 200);
				} else
					dcl(UMBERTO_STORAGE['strings']['geocode_error'] + ' ' + status);
			});
		
		} else {
			
			// Prepare marker object
			var latlngStr = UMBERTO_STORAGE['googlemap_init_obj'][id].markers[i].latlng.split(',');
			var markerInit = {
				map: UMBERTO_STORAGE['googlemap_init_obj'][id].map,
				position: new google.maps.LatLng(latlngStr[0], latlngStr[1]),
				clickable: UMBERTO_STORAGE['googlemap_init_obj'][id].markers[i].description!=''
			};
			if (UMBERTO_STORAGE['googlemap_init_obj'][id].markers[i].point) markerInit.icon = UMBERTO_STORAGE['googlemap_init_obj'][id].markers[i].point;
			if (UMBERTO_STORAGE['googlemap_init_obj'][id].markers[i].title) markerInit.title = UMBERTO_STORAGE['googlemap_init_obj'][id].markers[i].title;
			UMBERTO_STORAGE['googlemap_init_obj'][id].markers[i].marker = new google.maps.Marker(markerInit);
			
			// Set Map center
			if (UMBERTO_STORAGE['googlemap_init_obj'][id].opt.center == null) {
				UMBERTO_STORAGE['googlemap_init_obj'][id].opt.center = markerInit.position;
				UMBERTO_STORAGE['googlemap_init_obj'][id].map.setCenter(UMBERTO_STORAGE['googlemap_init_obj'][id].opt.center);				
			}
			
			// Add description window
			if (UMBERTO_STORAGE['googlemap_init_obj'][id].markers[i].description!='') {
				UMBERTO_STORAGE['googlemap_init_obj'][id].markers[i].infowindow = new google.maps.InfoWindow({
					content: UMBERTO_STORAGE['googlemap_init_obj'][id].markers[i].description
				});
				google.maps.event.addListener(UMBERTO_STORAGE['googlemap_init_obj'][id].markers[i].marker, "click", function(e) {
					var latlng = e.latLng.toString().replace("(", '').replace(")", "").replace(" ", "");
					for (var i in UMBERTO_STORAGE['googlemap_init_obj'][id].markers) {
						if (latlng == UMBERTO_STORAGE['googlemap_init_obj'][id].markers[i].latlng) {
							UMBERTO_STORAGE['googlemap_init_obj'][id].markers[i].infowindow.open(
								UMBERTO_STORAGE['googlemap_init_obj'][id].map,
								UMBERTO_STORAGE['googlemap_init_obj'][id].markers[i].marker
							);
							break;
						}
					}
				});
			}
			
			UMBERTO_STORAGE['googlemap_init_obj'][id].markers[i].inited = true;
		}
	}
}

function umberto_googlemap_refresh() {
	"use strict";
	for (id in UMBERTO_STORAGE['googlemap_init_obj']) {
		umberto_googlemap_create(id);
	}
}

function umberto_googlemap_init_styles() {
	// Init Google map
	UMBERTO_STORAGE['googlemap_init_obj'] = {};
	UMBERTO_STORAGE['googlemap_styles'] = {
		'default': []
	};
	if (window.umberto_theme_googlemap_styles!==undefined)
		UMBERTO_STORAGE['googlemap_styles'] = umberto_theme_googlemap_styles(UMBERTO_STORAGE['googlemap_styles']);
}