function iniciarMap() {
    var geocoder = new google.maps.Geocoder();
    var address = 'Cl. 19 # 20 24 LOCAL 2, Armenia, Quindío';

    geocoder.geocode({ 'address': address }, function(results, status) {
        if (status === 'OK') {
            var mapUrl = 'https://www.google.com/maps/embed/v1/place?key=' + 'AIzaSyA8C9_RVJ1rssDXtY-IpkpRGScDw-n0BHE' + '&q=' + encodeURIComponent(results[0].formatted_address);
            var iframe = document.getElementById('map-iframe');
            iframe.src = mapUrl;
            
        } else {
            console.log('Geocode was not successful for the following reason: ' + status);
        }
    });
}
