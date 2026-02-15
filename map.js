let map;
let markers = [];

const locations = [
    {
        id: 1,
        name: "Κρησφύγετο της TECH IT",
        lat: 41.064147,
        lng: 24.900603
    },
    {
        id: 2,
        name: "Μαγειρεῖον Πρώτης Ὁδοῦ",
        lat: 41.139817, 
        lng: 24.886933
    },
    {
        id: 3,
        name: "Παρθενώνας",
        lat: 37.971551, 
        lng: 23.7265
    },
    {
        id: 4,
        name: "Κρησφύγετο της EduACT",
        lat: 40.627479351467116, 
        lng: 22.951078702240398
    }
];

document.addEventListener('DOMContentLoaded', () => {
    map = L.map('map').setView([41.064147, 24.900603], 15);

    initLayers();
    addPins();
    buildLocationList();
});
        
function initLayers() {
    L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { attribution: '© OpenStreetMap' }
    ).addTo(map);
}
        
function addPins() {
    const bounds = L.latLngBounds();

    locations.forEach(loc => {
        const marker = L.marker([loc.lat, loc.lng])
            .addTo(map)
            .bindTooltip(`<b>${loc.name}</b>`);
    
        markers.push({
            id: loc.id,
            marker: marker
        });
    
        bounds.extend([loc.lat, loc.lng]);
    });

    map.fitBounds(bounds, { padding: [40, 40] });
}
        
function buildLocationList() {
    const list = document.getElementById('location-list');
    if (!list) return;

    locations.forEach(loc => {
        const btn = document.createElement('button');
        btn.textContent = loc.name;
        btn.className = 'location-button';
    
        btn.addEventListener('click', () => {
            focusMarker(loc.id);
        });
    
        list.appendChild(btn);
    });
}
        
function focusMarker(id) {
    const entry = markers.find(m => m.id === id);
    if (!entry) return;

    const marker = entry.marker;
    map.setView(marker.getLatLng(), 17, { animate: true });
    marker.openTooltip();
}