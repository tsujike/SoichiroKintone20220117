

function kintoneCreate() {

  var subdomain = "2qhz9ej1wltp";
  var apps = {
    YOUR_APPLICATION1: { appid: 2, name: "アプリ１", token: PROP.get("KINTONE_TOKEN") },
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
