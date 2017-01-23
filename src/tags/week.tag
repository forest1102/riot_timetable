<week>
    <!--<Header curtag="week"></Header>-->
    <div class="ui container app segment">
        <table class="ui unstackable celled definition table">
            <thead>
                <tr>
                    <th></th>
                    <th>Mon.</th>
                    <th>Tue.</th>
                    <th>Wed.</th>
                    <th>Thur.</th>
                    <th>Fri.</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>

    <script>
        this.on('mount', () => {
            var datalen = opts.timetable.length,
                arylen = opts.timetable[0].length;
            var $tbody = $('tbody', this.root),
                text = '';
            for (var i = 0; i < arylen; i++) {
                text += `<tr><td>${i + 1}</td>`;
                for (var j = 0; j < datalen; j++) {
                    text += `<td>${opts.timetable[j][i].subject}</br>
                      ${opts.timetable[j][i].place}</br></td>`;
                }
                text += '</tr>';
            }
            $tbody.html(text);
            this.update();
        });
        this.on('unmount', () => {
            // console.log('week unmount!');
        })
    </script>
</week>