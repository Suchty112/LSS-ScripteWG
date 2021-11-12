// ==UserScript==
// @name         FreigeberAnzeige
// @version      1.0.0
// @description  Zeigt an wer den Einsatz freigegeben hat, Suchfunktion sucht dann auch nach Namen
// @author       HerrWaldgott
// @include      *://www.leitstellenspiel.de/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $('#mission_list_alliance > .missionSideBarEntry, #mission_list_alliance_event > .missionSideBarEntry').each(function(){
        var $this = $(this);
        var $attributes = $this[0].attributes;
        var missionId = +($attributes).mission_id.value;
        $.get("https://www.leitstellenspiel.de/missions/" + missionId, function (data, status) {
            var parser = new DOMParser();
            var htmlDoc = parser.parseFromString(data, 'text/html');
            var div = htmlDoc.getElementById('col_left');
            var nameDiv = div.getElementsByClassName('alert-info');
            var name = nameDiv[0].childNodes[1].innerHTML;

            var id = "mission_address_" + missionId;
            $('#' + id).text($('#' + id).text() + " - " + name);
            $('#mission_' + missionId).attr('search_attribute', $('#mission_' + missionId).attr('search_attribute') + ", " + name);
        });
    });
})();
