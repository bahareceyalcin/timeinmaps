
(function ($) {

    function renderMaps(data) {
        ymaps.ready(init);

        function init() {

            var myMap = new ymaps.Map("map", {
                center: [55.76, 37.64],
                zoom: 2
            },
                {
                    searchControlProvider: 'yandex#search'
                });

            $.each(data, function (i, item) {
                moment.tz.add(item.timezone);
                var time2;
                function updateTime() {
                    time2 = moment.tz(item.timezoneName).format('HH:mm:ss');
                    $('.' + item.capitalName).html(time2);
                };

                updateTime();
                setInterval(function () {
                    updateTime();
                }, 1000);


                myGeoObject = new ymaps.GeoObject({
                    geometry: {
                        type: "Point",
                        coordinates: [item.latitude, item.longtitude]
                    },
                    properties: {
                        hintContent: item.capitalName,
                        balloonContentHeader: '<div><div>' + item.capitalName + '</div><div>' + item.country + '</div></div> ',
                        iconContent: '<div class="' + item.capitalName + '">' + time2 + '</div>'
                    }
                }
                    , {
                        preset: 'islands#blackStretchyIcon',
                        draggable: false
                    }),
                    myMap.geoObjects
                        .add(myGeoObject);
            });
        }
    }
    $.fn.Timeinmaps = function (map) {
        console.log("dsfs");
        renderMaps(map.data);
    };
}(jQuery));
