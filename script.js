function initMap() {
  // Verifica se o navegador suporta a API de Geolocalização
  if (navigator.geolocation) {
    // Obtém a localização do usuário
    navigator.geolocation.getCurrentPosition(function(position) {
      // Cria um objeto de coordenadas usando a localização do usuário
      var userLocation = { 
        lat: position.coords.latitude, 
        lng: position.coords.longitude 
      };

      // Cria um mapa centrado na localização do usuário
      var map = new google.maps.Map(document.getElementById('map-container'), {
        zoom: 14,
        center: userLocation
      });

      // Adiciona um marcador na localização do usuário
      var marker = new google.maps.Marker({
        position: userLocation,
        map: map,
        title: 'Sua Localização'
      });

      
      // Realiza uma busca por delegacias próximas
      var request = {
        location: userLocation,
        radius: '5000', // Raio em metros (ajuste conforme necessário)
        type: ['police']
      };

      var service = new google.maps.places.PlacesService(map);

      service.nearbySearch(request, function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i].geometry.location, map);
          }
        }
      });
    });
  } else {
    console.log("Geolocalização não é suportada pelo seu navegador.");
  }
}

function createMarker(position, map) {

  new google.maps.Marker({
      position: position,
      map: map
  });
}

// Chama a função initMap imediatamente após a carga da página
initMap();
