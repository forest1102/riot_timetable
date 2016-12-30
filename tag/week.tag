<week>
  <!--<Header curtag="week"></Header>-->
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
    <tbody>
      
    </tbody>
  </table>

  <script>
    this.on('mount', () => {
      RiotControl.trigger('init');
    });
    this.on('unmount',()=>{
      // console.log('week unmount!');
    })
    RiotControl.on('data_changed',(newdata)=>{
      // console.log(newdata);
      this.data=newdata;
      var datalen=this.data.length,
      arylen=this.data[0].length;
      var $tbody=$('tbody',this.root),
          text='';
      for (var i = 0; i < arylen; i++) {
        text+=`<tr><td>${i+1}</td>`;
        for (var j = 0; j < datalen; j++) {
          text+=`<td>${this.data[j][i].subject}</br>
                    ${this.data[j][i].place}</br></td>`;
        }
        text+='</tr>';
      }
      $tbody.append(text);
      this.update();
    })
  </script>
</week>
