function onInstall() {}
var ID_FORM = '';

function doGet(e) {
    if (e.parameter.id && e.parameter.about) {
        var hs = HtmlService.createHtmlOutputFromFile('aboutForm');
        var html = hs.getContent();
        var html2 = html.replace('ID_OF_FORM', e.parameter.id);
        return hs.setContent(html2);
    }
    if (e.parameter.id && e.parameter.shuffle) {

        ID_FORM = e.parameter.id;
        Logger.log(ID_FORM);
        return HtmlService.createTemplateFromFile('shuffle').evaluate();
    }
    if (e.parameter.id) {
        ID_FORM = e.parameter.id;
        return HtmlService.createTemplateFromFile('responses').evaluate();
    }
    try {
        var app = UiApp.createApplication();
        var clickHandler = app.createServerHandler('showDialog');
        var vp_content = app.createVerticalPanel()
            .setHorizontalAlignment(UiApp.HorizontalAlignment.CENTER)
            .setVerticalAlignment(UiApp.VerticalAlignment.MIDDLE)
            .setStyleAttributes({
                width: "100%",
                height: "99%"
            });
        var vp = app.createVerticalPanel().setHorizontalAlignment(UiApp.HorizontalAlignment.CENTER);
        var btn = app.createButton('Select your Form', clickHandler).setStyleAttributes(css.link);
        vp.add(btn);
        vp.add(app.createImage().setUrl(img1px).setHeight(5));
        var filePickerNameAnchor = app.createAnchor('', '').setId('filePickerNameAnchor').setName('filePickerNameAnchor').setStyleAttributes(css.link);
        vp.add(filePickerNameAnchor);
        vp.add(app.createImage().setUrl(img10px).setStyleAttributes(css.imgseparator));
        var aboutFormLabel = app.createAnchor('About me', true, 'https://plus.google.com/u/0/+AlexanderIvanov/about').setId('aboutFormLabel').setName('aboutFormLabel').setStyleAttributes(css.link);
        vp.add(aboutFormLabel);
        var aboutFormLabel2 = app.createAnchor('About me', true, 'https://plus.google.com/u/0/+AlexanderIvanov/about').setId('aboutFormLabel2').setName('aboutFormLabel2').setStyleAttributes(css.link);
        vp.add(aboutFormLabel2);
        var aboutFormLabel3 = app.createAnchor('About me', true, 'https://plus.google.com/u/0/+AlexanderIvanov/about').setId('aboutFormLabel3').setName('aboutFormLabel').setStyleAttributes(css.link);
        vp.add(aboutFormLabel3);
        vp.add(app.createImage().setUrl(img10px).setStyleAttributes(css.imgseparator));
        var qrCode = app.createImage().setId('qrCode').setUrl(returnURLQRCoge('Сообщество Google Документы и Диск https://plus.google.com/u/0/communities/110105258652966548522'));
        vp.add(qrCode);
        vp_content.add(vp);
        var about = app.createAnchor('QR API provide goqr.me without a licence', 'http://goqr.me').setStyleAttributes(css.link);
        vp_content.add(about);
        vp_content.setCellVerticalAlignment(about, UiApp.VerticalAlignment.BOTTOM);
        app.add(vp_content);
        setDefault(app);
        return app;
    } catch (er) {
        Logger.log(JSON.stringify(er));
        return HtmlService.createHtmlOutput('error  ' + er.message)
    }
}
var setDefault = function(app) {
    app.getElementById('filePickerNameAnchor').setText('Open Google Drive').setHref('https://drive.google.com/#query?filter=forms');
}

function showDialog() {
    DriveApp.getRootFolder();
    var app = UiApp.createApplication();
    var serverHandler = app.createServerHandler('pickerHandler');
    app.createDocsListDialog()
        .addView(UiApp.FileType.FORMS)
        .setMultiSelectEnabled(false)
        .addCloseHandler(serverHandler)
        .addSelectionHandler(serverHandler)
        .setOAuthToken(ScriptApp.getOAuthToken())
        .showDocsPicker();
    return app;
}

function pickerHandler(e) {
    var action = e.parameter.eventType;
    var app = UiApp.getActiveApplication();
    if (action == 'selection') {
        var doc = e.parameter.items[0];
        var id = doc.id;
        var name = doc.name;
        var url = doc.url;
        app.getElementById('filePickerNameAnchor').setText('OPEN "' + name + '"').setHref(url);
        app.getElementById('qrCode').setUrl(returnURLQRCoge(url));
        app.getElementById('aboutFormLabel').setHref('https://script.google.com/macros/s/AKfycbzCQU2btUlAT1WOne8Vc6HYJOKVTBgJ9xE5mszZybdX7o23vN7r/exec?id=' + id).setText('GO TO MANAGE RESPONSES OF "' + name + '"');
        app.getElementById('aboutFormLabel2').setHref('https://script.google.com/macros/s/AKfycbzCQU2btUlAT1WOne8Vc6HYJOKVTBgJ9xE5mszZybdX7o23vN7r/exec?id=' + id + '&about=true').setText('ABOUT FIELDS OF "' + name + '"');
    } else if (action == 'close') {
        setDefault(app);
    }
    app.close();
    return app;
}
var returnURLQRCoge = function(url) {
    return 'https://api.qrserver.com/v1/create-qr-code/?data=' + encodeURI(url) + '&size=200x200';
}

function test01() {
    var id = '1aDL-pseFzoKHvDrsvLQJgD_7m0ZtstY2fgiHksCoEu0';
    Logger.log(getAboutForm(id));
}

function getAboutForm(id) {
    var form = FormApp.openById(id);
    var result = [];
    var itemResponses = form.getResponses()[0].getItemResponses();
    for (var i = 0; i < itemResponses.length; i++) {
        var item = itemResponses[i].getItem();
        result.push({
            'id': item.getId(),
            'index': item.getIndex(),
            'type': item.getType().toString(),
            'title': item.getTitle(),
            'helpText': item.getHelpText()
        });
    }
    return JSON.stringify(result);
}
