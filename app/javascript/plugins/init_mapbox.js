// app/javascript/plugins/init_mapbox.js
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// smallest possbile rectangle that contains the markers
const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  // padding is how far the markers are in the edge of the map
  // duration is a zooming effect in milliseconds
  map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 });
};

const initMapbox = () => {
  const mapElement = document.getElementById('map');

  // map generator
  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10'
    });
    
    // map marker
    // [ ... ]
    const markers = JSON.parse(mapElement.dataset.markers);
    markers.forEach((marker) => {
      // retrieve nifo_window data
      const popup = new mapboxgl.Popup().setHTML(marker.info_window);

      new mapboxgl.Marker()
        .setLngLat([ marker.lng, marker.lat ])
        .setPopup(popup)
        .addTo(map);
    });
  }

  // zoom into the map
  fitMapToMarkers(map, markers);
};

export { initMapbox };