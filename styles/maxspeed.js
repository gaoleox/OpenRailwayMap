
(function (MapCSS) {
    'use strict';

    function restyle(style, tags, zoom, type, selector) {
        var s_default = {};

        if ((selector == 'meta')) {
            s_default['title'] = 'OpenRailwayMap maxspeed layer';
            s_default['version'] = '0';
            s_default['description'] = 'Style for a maxspeed layer of the railroad network.';
            s_default['author'] = 'rurseekatze';
            s_default['link'] = 'http://wiki.openstreetmap.org/wiki/OpenRailwayMap';
            s_default['watch-modified'] = 'true';
        }

        if ((selector == 'canvas')) {
            s_default['background-color'] = '#8a8a8a';
            s_default['default-points'] = 'true';
            s_default['default-lines'] = 'true';
        }

        if ((type == 'node' && zoom >= 1 && zoom <= 20)) {
            s_default['symbol-shape'] = 'square';
            s_default['symbol-fill-opacity'] = '0';
            s_default['symbol-size'] = '0';
            s_default['text'] = MapCSS.e_localize(tags, "");
            s_default['z-index'] = -1000;
        }

        if (((type == 'way' && tags['maxspeed'] == '5')) || ((type == 'way' && tags['maxspeed'] == '10'))) {
            s_default['z-index'] = 50;
            s_default['color'] = '#0100CB';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '15')) || ((type == 'way' && tags['maxspeed'] == '20'))) {
            s_default['z-index'] = 150;
            s_default['color'] = '#001ECB';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '25')) || ((type == 'way' && tags['maxspeed'] == '30'))) {
            s_default['z-index'] = 250;
            s_default['color'] = '#003DCB';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '35')) || ((type == 'way' && tags['maxspeed'] == '40'))) {
            s_default['z-index'] = 350;
            s_default['color'] = '#005BCB';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '45')) || ((type == 'way' && tags['maxspeed'] == '50'))) {
            s_default['z-index'] = 450;
            s_default['color'] = '#007ACB';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '55')) || ((type == 'way' && tags['maxspeed'] == '60'))) {
            s_default['z-index'] = 550;
            s_default['color'] = '#0098CB';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '65')) || ((type == 'way' && tags['maxspeed'] == '70'))) {
            s_default['z-index'] = 650;
            s_default['color'] = '#00B7CB';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '75')) || ((type == 'way' && tags['maxspeed'] == '80'))) {
            s_default['z-index'] = 750;
            s_default['color'] = '#00CBC1';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '85')) || ((type == 'way' && tags['maxspeed'] == '90'))) {
            s_default['z-index'] = 850;
            s_default['color'] = '#00CBA2';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '95')) || ((type == 'way' && tags['maxspeed'] == '100'))) {
            s_default['z-index'] = 950;
            s_default['color'] = '#00CB84';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '105')) || ((type == 'way' && tags['maxspeed'] == '110'))) {
            s_default['z-index'] = 1100;
            s_default['color'] = '#00CB66';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '115')) || ((type == 'way' && tags['maxspeed'] == '120'))) {
            s_default['z-index'] = 1200;
            s_default['color'] = '#00CB47';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '125')) || ((type == 'way' && tags['maxspeed'] == '130'))) {
            s_default['z-index'] = 1300;
            s_default['color'] = '#00CB29';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '135')) || ((type == 'way' && tags['maxspeed'] == '140'))) {
            s_default['z-index'] = 1400;
            s_default['color'] = '#00CB0A';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '145')) || ((type == 'way' && tags['maxspeed'] == '150'))) {
            s_default['z-index'] = 1500;
            s_default['color'] = '#14CB00';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '155')) || ((type == 'way' && tags['maxspeed'] == '160'))) {
            s_default['z-index'] = 1600;
            s_default['color'] = '#33CB00';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '165')) || ((type == 'way' && tags['maxspeed'] == '170'))) {
            s_default['z-index'] = 1700;
            s_default['color'] = '#51CB00';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '175')) || ((type == 'way' && tags['maxspeed'] == '180'))) {
            s_default['z-index'] = 1800;
            s_default['color'] = '#70CB00';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '185')) || ((type == 'way' && tags['maxspeed'] == '190'))) {
            s_default['z-index'] = 1900;
            s_default['color'] = '#8ECB00';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '195')) || ((type == 'way' && tags['maxspeed'] == '200'))) {
            s_default['z-index'] = 2000;
            s_default['color'] = '#ADCB00';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '205')) || ((type == 'way' && tags['maxspeed'] == '210'))) {
            s_default['z-index'] = 2100;
            s_default['color'] = '#CBCB00';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '215')) || ((type == 'way' && tags['maxspeed'] == '220'))) {
            s_default['z-index'] = 2200;
            s_default['color'] = '#CBAD00';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '225')) || ((type == 'way' && tags['maxspeed'] == '230'))) {
            s_default['z-index'] = 2300;
            s_default['color'] = '#CB8E00';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '235')) || ((type == 'way' && tags['maxspeed'] == '240'))) {
            s_default['z-index'] = 2300;
            s_default['color'] = '#CB7000';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '245')) || ((type == 'way' && tags['maxspeed'] == '250'))) {
            s_default['z-index'] = 2300;
            s_default['color'] = '#CB5100';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '255')) || ((type == 'way' && tags['maxspeed'] == '260'))) {
            s_default['z-index'] = 2300;
            s_default['color'] = '#CB3300';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '265')) || ((type == 'way' && tags['maxspeed'] == '270'))) {
            s_default['z-index'] = 2300;
            s_default['color'] = '#CB1400';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '275')) || ((type == 'way' && tags['maxspeed'] == '280'))) {
            s_default['z-index'] = 2300;
            s_default['color'] = '#CB0007';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '285')) || ((type == 'way' && tags['maxspeed'] == '290'))) {
            s_default['z-index'] = 2300;
            s_default['color'] = '#CB0025';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '295')) || ((type == 'way' && tags['maxspeed'] == '300'))) {
            s_default['z-index'] = 2300;
            s_default['color'] = '#CB0044';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '305')) || ((type == 'way' && tags['maxspeed'] == '310')) || ((type == 'way' && tags['maxspeed'] == '315')) || ((type == 'way' && tags['maxspeed'] == '320'))) {
            s_default['z-index'] = 2300;
            s_default['color'] = '#CB0062';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '325')) || ((type == 'way' && tags['maxspeed'] == '330')) || ((type == 'way' && tags['maxspeed'] == '335')) || ((type == 'way' && tags['maxspeed'] == '340'))) {
            s_default['z-index'] = 2300;
            s_default['color'] = '#CB0081';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '345')) || ((type == 'way' && tags['maxspeed'] == '350')) || ((type == 'way' && tags['maxspeed'] == '355')) || ((type == 'way' && tags['maxspeed'] == '360'))) {
            s_default['z-index'] = 2300;
            s_default['color'] = '#CB009F';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '365')) || ((type == 'way' && tags['maxspeed'] == '370')) || ((type == 'way' && tags['maxspeed'] == '375')) || ((type == 'way' && tags['maxspeed'] == '380'))) {
            s_default['z-index'] = 2300;
            s_default['color'] = '#CB00BD';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['maxspeed'] == '385')) || ((type == 'way' && tags['maxspeed'] == '390')) || ((type == 'way' && tags['maxspeed'] == '395')) || ((type == 'way' && tags['maxspeed'] == '400'))) {
            s_default['z-index'] = 2300;
            s_default['color'] = '#BA00CB';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && (tags.hasOwnProperty('maxspeed'))))) {
            s_default['z-index'] = 5000;
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
        }

        if (Object.keys(s_default).length) {
            style['default'] = s_default; }
        return style;
    }
    
    var sprite_images = {
    }, external_images = [], presence_tags = [], value_tags = ['maxspeed', ""];

    MapCSS.loadStyle('maxspeeds', restyle, sprite_images, external_images, presence_tags, value_tags);
    MapCSS.preloadExternalImages('maxspeeds');
})(MapCSS);
    