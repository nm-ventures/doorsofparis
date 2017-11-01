"use strict";
var map;
var infoWindow;


// Markers
var initialMarkers = [
    {
        color: "black",
        lat: 48.849912,
        long: 2.354938,
        location: "17 Quai de la Tournelle",
        image: "images/door000001.jpg"
    },
    {
        color: "red",
        lat: 48.846681,
        long: 2.347630,
        location: "Place Sainte-Geneviève, the door left of the main one",
        image: "images/door000002.jpg"
    },
    {
        color: "gray",
        lat: 48.846752,
        long: 2.345883,
        location: "Place du Panthéon, probably not a permanentinstallaton",
        image: "images/door000003.jpg"
    },
    {
        color: "clear",
        lat: 48.846032,
        long: 2.342861,
        location: "198 Rue Saint-Jacques",
        image: "images/door000004.jpg"
    },
    {
        color: "red",
        lat: 48.845411,
        long: 2.342531,
        location: "210 Rue Saint-Jacques. it's tiny",
        image: "images/door000005.jpg"
    },
    {
        color: "brown",
        lat: 48.844436,
        long: 2.341862,
        location: "34 Rue Gay-Lussac. a door with a balcony!",
        image: "images/door000006.jpg"
    },
    {
        color: "red",
        lat: 48.844525,
        long: 2.341806,
        location: "32 Rue Gay-Lussac",
        image: "images/door000007.jpg"
    },
    {
        color: "brown",
        lat: 48.8439,
        long: 2.3419,
        location: "250 Bis Rue Saint-Jacques. non-permanent exhibition",
        image: "images/door000008.jpg"
    },
    {
        color: "blue",
        lat: 48.839957,
        long: 2.340414,
        location: "293 Rue Saint-Jacques",
        image: "images/door000009.jpg"
    },
    {
        color: "clear",
        lat: 48.839493,
        long: 2.340243,
        location: "299 Rue Saint-Jacques. hidden in the back, a play of mirrors and glass.",
        image: "images/door000010.jpg"
    },
    {
        color: "yellow",
        lat: 48.893638,
        long: 2.242080,
        location: "116 Passage Henri Regnault. at the back of the building.",
        image: "images/door000011.jpg"
    },
    {
        color : "purple",
        lat: 48.846587,
        long: 2.347497,
        location : 'Place Sainte-Geneviève, 75005 Paris',
        image : 'images/door000012.jpg'
    },
    {
        color : "brown",
        lat: 48.846005,
        long: 2.342941,
        location : '163 Rue Saint-Jacques, Paris, Île-de-France',
        image : 'images/door000013.jpg'
    },
    {
        color : "brown",
        lat: 48.845355,
        long: 2.342561,
        location : '212 Rue Saint-Jacques, Paris, Île-de-France',
        image : 'images/door000014.jpg'
    },
    {
        color : "blue",
        lat: 48.844474,
        long: 2.341806,
        location : '34 Rue Gay-Lussac Paris, Île-de-France',
        image : 'images/door000015.jpg'
    },
    {
        color : "brown",
        lat: 48.844927,
        long: 2.341717,
        location : '26 Rue Gay-Lussac Paris, Île-de-France',
        image : 'images/door000016.jpg'
    },
    {
        color : "blue",
        lat: 48.840221,
        long: 2.340582,
        location : '285 Rue Saint-Jacques Paris, Île-de-France',
        image : 'images/door000017jpg'
    },
    {
        color : "grey",
        lat: 448.840487,
        long: 2.340745,
        location : '279 Rue Saint-Jacques, Paris, Île-de-France',
        image : 'images/door000018.jpg'
    },
    {
        color : "grey",
        lat: 48.840547,
        long: 2.340825,
        location : '279 Rue Saint-Jacques, Paris, Île-de-France',
        image : 'images/door000019jpg'
    },
    {
        color : "teal, red",
        lat: 48.843920,
        long: 2.341799,
        location : '246 Rue Saint-Jacques Paris, Île-de-France',
        image : 'images/door000020.jpg'
    },
    {
        color : "green",
        lat: 48.806915,
        long: 2.473595,
        location : '10 Rue des Remises 94100 Saint-Maur-des-Fossés',
        image : 'images/door000021.jpg'
    },
    {
        color : "white",
        lat: 48.807164,
        long: 2.473716,
        location : '8 Rue des Remises 94100 Saint-Maur-des-Fossés',
        image : 'images/door000022.jpg'
    },
    {
        color : "red",
        lat: 48.807185,
        long: 2.473762,
        location : '3 Rue des Remises 94100 Saint-Maur-des-Fossés',
        image : 'images/door000023.jpg'
    },
    {
        color : "brown",
        lat: 48.855486,
        long: 2.358397,
        location : '68 Rue François Miron, Paris',
        image : 'images/door000024.jpg'
    },
    {
        color : "brown",
        lat: 48.855525,
        long: 2.358149,
        location : '66 Rue François Miron, Paris',
        image : 'images/door000025.jpg'
    },
    {
        color : "blue",
        lat: 48.855100,
        long: 2.356778,
        location : "27 Rue Geoffroy l'Asnier, Paris",
        image : 'images/door000026.jpg'
    },
    {
        color : "black",
        lat: 48.8058,
        long: 2.4732,
        location : "23 Rue Geoffroy l'Asnier, Paris",
        image : 'images/door000027.jpg'
    },
    {
        color : "green",
        lat: 48.8549,
        long: 2.3564,
        location : "27 Rue Geoffroy l'Asnier, Paris",
        image : 'images/door000028.jpg'
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
        document.getElementById("main").style.marginLeft = "0";
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

var doorMarker = 'images/door-marker.png'

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
        title: self.image(),
        icon: doorMarker
    });

    this.contentString = ko.computed(function() {
        return '<div>' + self.color() + ' door</div>' +
                '<div>' + self.location() + '</div>' +
                '<img class="thumb-img" src=' + self.image() +
                  ' alt=' + self.color() + '>';
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
        zoom: 13,
        center: {lat: 48.852961, lng: 2.349913}
    });

    ko.applyBindings(new ViewModel());
};

function googleMapsError() {
    alert("Google Maps has failed to load.");
}
