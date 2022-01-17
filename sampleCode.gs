
function testcode() {
  const subdomain = "2qhz9ej1wltp";
  const apps = {
    YOUR_APPLICATION1: { appid: 2, name: "テストアプリ", token: PROP.get("KINTONE_TOKEN") },
  };
  var kintone_manager = new KintoneRecordManager(subdomain, apps);
  const searchresponse = kintone_manager.search("YOUR_APPLICATION1", "")
  console.log(searchresponse.records[[0]]);
  const record = searchresponse.records[[0]];

  // const keys = Object.keys(record);
  // console.log(keys)
  //console.log(searchresponse)

  for (const [key, value] of Object.entries(record)) {

    delete value.type;

    //決まったプロパティ
    delete record['レコード番号'];
    delete record['更新者'];
    delete record['作成者'];
    delete record['$revision'];
    delete record['更新日時'];
    delete record['作成日時'];
    delete record['$id'];

  }

  console.log(record); //	{ name: { value: 'soichiro' }, food: { value: 'ヨーグルト' } }


  /*

  */

  // for(const prop in record){
  //   console.log(prop.type)
  // } 

}
// { 'レコード番号': { type: 'RECORD_NUMBER', value: '38' },
//   '更新者': 
//    { type: 'MODIFIER',
//      value: { code: 'Administrator', name: 'Administrator' } },
//   '作成者': 
//    { type: 'CREATOR',
//      value: { code: 'Administrator', name: 'Administrator' } },
//   name: { type: 'SINGLE_LINE_TEXT', value: 'soichiro' },
//   '$revision': { type: '__REVISION__', value: '1' },
//   '更新日時': { type: 'UPDATED_TIME', value: '2022-01-16T21:56:00Z' },
//   '作成日時': { type: 'CREATED_TIME', value: '2022-01-16T21:56:00Z' },
//   food: { type: 'SINGLE_LINE_TEXT', value: 'ヨーグルト' },
//   '$id': { type: '__ID__', value: '38' } }

// [ 'レコード番号',
//   '更新者',
//   '作成者',
//   'name',
//   '$revision',
//   '更新日時',
//   '作成日時',
//   'food',
//   '$id' ]


function comparison() {
  var subdomain = "2qhz9ej1wltp";
  var apps = {
    YOUR_APPLICATION1: { appid: 2, name: "テストアプリ", token: PROP.get("KINTONE_TOKEN") },
  };

  const kintoneManager = new KintoneManager(subdomain, apps);
  const kintoneRecordManager = new KintoneRecordManager(subdomain, apps);
  return
}




function kintoneCreate() {

  var subdomain = "2qhz9ej1wltp";
  var apps = {
    YOUR_APPLICATION1: { appid: 2, name: "テストアプリ", token: PROP.get("KINTONE_TOKEN") },
  };

  var kintone_manager = new KintoneManager(subdomain, apps);


  var records = [
    {   // 1件目のデータ
      "name": {
        "value": "soichiro"
      },
      "food": {
        "value": "ヨーグルト"
      },
    },

  ];
  var response = kintone_manager.create("YOUR_APPLICATION1", records);
  // ステータスコード
  // 成功すれば200になる
  var code = response.getResponseCode();
  console.log(code)

}


function kintoneCreate2() {

  var subdomain = "2qhz9ej1wltp";
  var apps = {
    YOUR_APPLICATION1: { appid: 2, name: "アプリ１", token: PROP.get("KINTONE_TOKEN") },
  };

  var kintoneManagerClass = new KintoneRecordManager(subdomain, apps);


  var records = [
    {   // 1件目のデータ
      "name": {
        "value": "soichiro"
      },
      "food": {
        "value": "ヨーグルト"
      },
    },
    {   // 2件目のデータ
      "name": {
        "value": "tujike"
      },
      "food": {
        "value": "osusi"
      },
    },
  ];
  var createResponse = kintoneManagerClass.create("YOUR_APPLICATION1", records);
  let ids = createResponse.ids

  // ステータスコード
  // 成功すれば200になる


  const searchresponse = kintoneManagerClass.search("YOUR_APPLICATION1", "")
  const deleteresponse = kintoneManagerClass.destroy("YOUR_APPLICATION1", ids)

  return










}