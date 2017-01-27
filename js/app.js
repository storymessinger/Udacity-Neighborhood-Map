
// INITIATE
// This function loads after the google API is all loaded
// made it like this because i wanted to use the map components
// in the knockoutjs ViewModel

var loadMap = function() {
    initMap();
    ko.applyBindings(new ViewModel(markers));
};

// share 'map' as a Global variable
var map;
// share 'largeInfowindow; as Global variable
var largeInfowindow;
// share bounder
var bounds;

function initMap() {
    var self = this;
	// uglified the styles of the map to save space
    var mapStyles=[{featureType:"water",elementType:"all",stylers:[{hue:"#7fc8ed"},{saturation:55},{lightness:-6},{visibility:"on"}]},{featureType:"water",elementType:"labels",stylers:[{hue:"#7fc8ed"},{saturation:55},{lightness:-6},{visibility:"off"}]},{featureType:"poi.park",elementType:"geometry",stylers:[{hue:"#83cead"},{saturation:1},{lightness:-15},{visibility:"on"}]},{featureType:"landscape",elementType:"geometry",stylers:[{hue:"#f3f4f4"},{saturation:-84},{lightness:59},{visibility:"on"}]},{featureType:"landscape",elementType:"labels",stylers:[{hue:"#ffffff"},{saturation:-100},{lightness:100},{visibility:"off"}]},{featureType:"road",elementType:"geometry",stylers:[{hue:"#ffffff"},{saturation:-100},{lightness:100},{visibility:"on"}]},{featureType:"road",elementType:"labels",stylers:[{hue:"#bbbbbb"},{saturation:-100},{lightness:26},{visibility:"on"}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{hue:"#ffcc00"},{saturation:100},{lightness:-35},{visibility:"simplified"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{hue:"#ffcc00"},{saturation:100},{lightness:-22},{visibility:"on"}]},{featureType:"poi.school",elementType:"all",stylers:[{hue:"#d7e4e4"},{saturation:-60},{lightness:23},{visibility:"on"}]}];
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        styles: mapStyles,
    });
    // making an instance of a infowindow
    largeInfowindow = new google.maps.InfoWindow();

    // This makes bounding easier
    bounds = new google.maps.LatLngBounds();

    // bound map - purple - western food
    // boundingMap(init_markers, "purple");
    // bound map - red - japanese food
    // bound map - orange - korean food
    // bound map - brown - beer and liquer
    boundingMap(European, "orange");
    boundingMap(Asian, "red");
    boundingMap(Beer, "brown");


    function boundingMap(markerGroup, color){

        markerGroup.forEach(function(place){

            var title = place.name;
            var position = place.geometry.location;
            var photo = place.photo;
            bounds.extend(place.geometry.location);
            markMarkers(position, title, photo, largeInfowindow, color);
        });

        map.fitBounds(bounds);
    }
}


// marking the Markers with added functionalty of Event-trigger
function markMarkers(position, title, photo, Infowindow, color) {

    var thisInfowindow = Infowindow;
    var icon = "imgs/marker_" + color + ".png";

    var marker = new google.maps.Marker({
        map: map,
        position: position,
        title: title,
        photo: photo,
        animation: google.maps.Animation.DROP,
        icon: icon,
    });
    markers.push(marker);

    marker.addListener('click', function() {
        var self= this;
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){ marker.setAnimation(null); }, 1500);
        populateInfoWindow(self, thisInfowindow);
    });
}

// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        // Clear the infowindow content to give the streetview time to load.
        infowindow.setContent('');
        infowindow.marker = marker;
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });
        var streetViewService = new google.maps.StreetViewService();
        var radius = 50;
        // In case the status is OK, which means the pano was found, compute the
        // position of the streetview image, then calculate the heading, then get a
        // panorama from that and set the options
        var getStreetView =function(data, status) {
            if (status == google.maps.StreetViewStatus.OK) {
                var nearStreetViewLocation = data.location.latLng;
                var heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, marker.position);
                infowindow.setContent('<div>' +marker.title+ '</div><div id="pano"></div>');

                var panoramaOptions = {
                    position: nearStreetViewLocation,
                    pov: {
                        heading: heading,
                        pitch: 30
                    }
                };
                var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);

            } else {
                infowindow.setContent('<div>' + marker.title + '</div>' +
                    '<div>No Street View Found</div>');
            }
        };
        // Use streetview service to get the closest streetview image within
        // 50 meters of the markers position
        streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
        // Open the infowindow on the correct marker.
        infowindow.open(map, marker);
    }
}

// This function will loop through the listings and hide them all.
function hideListings() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
}

function showListings(markerArr) {

        bounds = new google.maps.LatLngBounds();

        markerArr.forEach(function(marker){
            marker.setMap(map);
            bounds.extend(marker.position);
        });
        map.fitBounds(bounds);
}


var ViewModel = function(Markers) {
    var self = this;

    this.filterMarkers = ko.observableArray();
    Markers.forEach(function(marker){
        self.filterMarkers.push(marker);
    });
    this.query = ko.observable('');
    this.filter = ko.computed(function(){
        hideListings();
        var value = self.query();

        self.filterMarkers.removeAll();

        Markers.forEach(function(marker){
            if(marker.title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                self.filterMarkers.push(marker);
            }
        });

        showListings(self.filterMarkers());
    });

    this.sdFold = ko.observable(false);
    this.toggleClass_sd = function(){
        if(self.sdFold() === false) {
            self.sdFold(true);
        } else {
            self.sdFold(false);
        }
    };


    this.clickSide = function(data){
        console.log(data);

        // show blog information from DAUM API
        self.getPlaceInfo_daum(data.title);

        // animates the marker
        var clickedMarker = Markers.find(function(marker){
            return data.title == marker.title;
        });
        clickedMarker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){ clickedMarker.setAnimation(null); }, 1500);

    };

    this.getPlaceInfo_daum = function(search, cb) {
        var daumHTML;

         $.ajax({
             asnyc: true,
             dataType: "jsonp",
             type: "GET",
             // sort: accuracy first
             // result: only one
             url: "https://apis.daum.net/search/blog?apikey=b77c955174086c502f96c40fb9cec076&sort=accu&result=2&q=" + search + "&output=json",
             success: function(daumResult, status) {
                    var daumHTML;
                    var resultNum;

                    console.log(daumResult.channel.item[0].title);

                    // if(daumResult[1].length === 0) {
                    //     daumHTML = '<ul><li>' + 'no results from wiki' + '</li></ul>';
                    //
                    // } else {
                    //     console.log(daumResult);
                    //     daumHTML = '<ul>';
                    //     daumHTML += "<br><li> (mediawiki results) </li>";
                    //     daumHTML += '<li class="placeName"><h3>'+  daumResult[1][0] + '</h3></li>';
                    //     daumHTML += '<li class="placeDesc">' + daumResult[2][0] + '</li>';
                    //     daumHTML += '</ul>';
                    // }

                 if (cb) {
                     cb();
                 }
             },
             error: function(result, status, err) {
                 alert("error with connection from daum: " + status);
                 //run only the callback without attempting to parse result due to error
                 if (cb) {
                     cb();
                 }
             }
         });

    };
};
