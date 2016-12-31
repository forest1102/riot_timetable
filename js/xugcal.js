// JavaScript
function newEvent(id, summary, startDatetime, endDatetime,
    location, description, updated, sequence) {
    var resource = new Object();
    resource['id'] = id; // GoogleがEvent作成時に付与するID
    resource['summary'] = summary; // 予定のタイトル
    resource['start_dateTime'] = startDatetime; //Dateオブジェクト
    resource['end_dateTime'] = endDatetime; //Dateオブジェクト
    resource['location'] = location; // 場所
    resource['description'] = description; // 説明
    resource['updated'] = updated; // Dateオブジェクト
    resource['sequence'] = sequence; // シーケンス番号(更新時に1ずつ増えていく)
    return resource;
}
var GCALENDAR = function(calendar_id) {
    this.calendarId = calendar_id;
}
GCALENDAR.prototype.addEventA = function(summary, start, end, location,
        description, callback) {
        var item = newEvent(null, summary, start, end, location,
            description, null, 0);
        this.addEvent(item, function(data) {
            callback(data);
        });
    }
    // 
GCALENDAR.prototype.addEvent = function(xEvent, callback) {
    // console.log(this.calendarId);
    xEvent['start'] = new Object();
    xEvent['start'].dateTime = xEvent['start_dateTime'].toISOString();
    xEvent['end'] = new Object();
    xEvent['end'].dateTime = xEvent['end_dateTime'].toISOString();
    // xEvent['updated'] は追加時に自動でセットされる
    gapi.client.load('calendar', 'v3', () => {
        var request = gapi.client.calendar.events.insert({
            'calendarId': this.calendarId,
            'resource': xEvent
        });
        request.execute(function(resp) {
            callback(resp);
        });
    });
}
GCALENDAR.prototype.show = function(date, callback) {
    gapi.client.load('calendar', 'v3', () => {
        var request = gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (date).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        });
        request.execute((resp) => {
            callback(resp);
        })
    });
};
