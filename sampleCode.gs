
function testcode(){
  const subdomain = "2qhz9ej1wltp";
  const apps = {
    YOUR_APPLICATION1: { appid: 2, name: "テストアプリ", token: PROP.get("KINTONE_TOKEN") },
  };
  var kintone_manager = new KintoneRecordManager(subdomain, apps);
  const searchresponse = kintone_manager.search("YOUR_APPLICATION1","")

  console.log(searchresponse)

}
// 情報	{ records: 
//    [ { 'レコード番号': [Object],
//        '更新者': [Object],
//        '作成者': [Object],
//        name: [Object],
//        '$revision': [Object],
//        '更新日時': [Object],
//        '作成日時': [Object],
//        food: [Object],
//        '$id': [Object] },


function comparison(){
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
  let ids =createResponse.ids

  // ステータスコード
  // 成功すれば200になる


  const searchresponse = kintoneManagerClass.search("YOUR_APPLICATION1","")
  const deleteresponse = kintoneManagerClass.destroy("YOUR_APPLICATION1",ids)

  return










}