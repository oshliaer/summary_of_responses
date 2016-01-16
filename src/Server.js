function getManageResponses(id) {

    var responses = FormApp.openById(id).getResponses();
    var content = [];
    responses.forEach(function(e) {
        content.push({
            id: e.getId(),
            PrefilledUrl: e.toPrefilledUrl()
        });
        //responses[0].toPrefilledUrl()
    });
    //var cs = CacheService.getScriptCache().
    //var responses[0].getItemResponses()[]
    return JSON.stringify(content);
}

function createResponds() {
    var form = FormApp.openById('1A-CiPvSNCWQ13-oNBkihF61c_Se9HUswhaHEL6PDKhI');

    var responcse = form.getResponses()[0].getItemResponses();
    for (var j = 0; j < 100; j++) {
        var nr = form.createResponse();
        for (var i in responcse) {
            nr.withItemResponse(responcse[i]);
        }
        nr.submit();
        Utilities.sleep(1000);
    }
}

function editLast() {
    var form = FormApp.openById('1A-CiPvSNCWQ13-oNBkihF61c_Se9HUswhaHEL6PDKhI');
    //var nr = form.createResponse();
    //nr.getItemResponses()
    var responcses = form.getResponses();
    var last = responcses[responcses.length - 1];
    Logger.log(last.getEditResponseUrl());
}
