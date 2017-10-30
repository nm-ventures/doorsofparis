"use strict";
var map;
var infoWindow;


// Markers
var initialMarkers = [
    {
        color : "COLOR",
        lat: 48.807195,
        long: 2.473693,
        location : '8 Rue des Remises, Saint-Maur-des-Fossés',
        image : 'images/french-flag.png'
    }
];


// ViewModel
var ViewModel = function() {
    var self = this;

    this.markerList = ko.observableArray([]);

    initialMarkers.forEach( function(markerItem) {
        self.markerList.push( new Marker(markerItem) );
    });

    infoWindow = new google.maps.InfoWindow();


    this.openNav = function() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    };

    this.closeNav = function() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
        document.body.style.backgroundColor = "white";
    };

    this.navState = ko.observable(true);
    this.navBtn = ko.observable('&#8801;');

    this.toggleNav = ko.pureComputed({
        read: function () {
            return self.navBtn();
        },
        write: function () {
            if (self.navState() === true) {
                self.navBtn('&times;');
                self.openNav();
                self.navState(false);
                return self.navBtn;
            } else {
                self.navBtn('&#8801;');
                self.closeNav();
                self.navState(true);
                return self.navBtn;
            }
        },
        owner: self
    });

    this.query = ko.observable('');

    this.filteredList = ko.computed(function() {
        var filter = self.query().toLowerCase();
        if (filter === null) {
            return self.markerList();
        } else {
            return ko.utils.arrayFilter(self.markerList(), function(e) {
                if(e.color().toLowerCase().indexOf(filter) >= 0) {
                    e.selected(true);
                    e.mapMarker.setVisible(true);
                    return true;
                } else {
                    e.selected(false);
                    e.mapMarker.setVisible(false);
                    return false;
                }
            })
        }
    }, self);

};

// Model
var Marker = function(markerItem) {
    var self = this;

    this.color = ko.observable(markerItem.color);
    this.location = ko.observable(markerItem.location);
    this.lat = ko.observable(markerItem.lat);
    this.long = ko.observable(markerItem.long);
    this.image = ko.observable(markerItem.image);
    this.selected = ko.observable(true);


    this.mapMarker = new google.maps.Marker({
        position: {
        lat: self.lat(),
        lng: self.long()
        },
        animation: google.maps.Animation.DROP,
        map: map,
        title: self.image()
    });

    this.contentString = ko.computed(function() {
        return '<div>' + self.color() + ' Door</div>' +
                '<div>' + self.location() + '</div>';
    });

    this.mapMarker.addListener('click', function() {
        infoWindow.setContent(self.contentString());
        infoWindow.open(map, self.mapMarker);
        self.mapMarker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            self.mapMarker.setAnimation(null);
        }, 700);
    });

    this.mapMarker.setMap(map);

    // Animates mapMarker when marker clicked from list
    this.animateClick = function() {
        google.maps.event.trigger(self.mapMarker, 'click');
    };

};


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {lat: 48.852961, lng: 2.349913}
    });

    ko.applyBindings(new ViewModel());
};

function googleMapsError() {
    alert("Google Maps has failed to load.");
}