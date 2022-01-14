var KintoneManager = (function() {
    "use strict";
    // user, passが指定されれば、パスワード認証
    // 指定されなければ、APIトークン認証
    // appsは以下の形式
    // {
    //    // アプリケーション名はkintoneのデータに依存せず、GAS内のコードで取り扱う専用
    //    YOUR_APP_NAME1: {
    //       appid: 1,
    //       guestid: 2,
    //       name: "日報",
    //       token: "XXXXXXXXXXXXXX_YOUR_TOKEN_XXXXXXXXXXXXXX" // パスワード認証する場合は省略化
    //    },
    //    YOUR_APP_NAME2: {
    //       ...
    //    }
    // }
    function KintoneManager(subdomain, apps, user, pass){
        this.subdomain = subdomain;
        this.authorization = null;
        this.apps = apps;

        if (arguments.length > 3) {
            this.authorization = Utilities.base64Encode(user + ":" + pass);
        } else if (arguments.length > 2) {
            // 引数が3つの場合はエンコード済みの認証情報として処理
            this.authorization = user;
        }
    }
    // レコードの作成
    KintoneManager.prototype.create = function(app_name, records) {
        var app = this.apps[app_name];
        var payload = {
          app: app.appid,
          records: records
        };
        var response = UrlFetchApp.fetch(
            "@1/records.json".replace(/@1/g,this._getEndpoint(app.guestid)),
           this._postOption(app, payload)
        );
        return response;
    };
    // レコードの検索
    KintoneManager.prototype.search = function(app_name, query){
       var q = encodeURIComponent(query);
       var app = this.apps[app_name];
       var response = UrlFetchApp.fetch(
         "@1/records.json?app=@2&query=@3"
            .replace(/@1/g, this._getEndpoint(app.guestid))
            .replace(/@2/g, app.appid)
            .replace(/@3/g, q),
         this._getOption(app)
       );
       return response;
    };
    // レコードの更新
    KintoneManager.prototype.update = function(app_name, records) {
        var app = this.apps[app_name];
        var payload = {
          app: app.appid,
          records: records
        };
        var response = UrlFetchApp.fetch(
            "@1/records.json".replace(/@1/g, this._getEndpoint(app.guestid)),
           this._putOption(app, payload)
        );
        return response;
    };
    // レコードの削除
    KintoneManager.prototype.destroy = function(app_name, record_ids){
       var app = this.apps[app_name];
       var query = "app=" + app.appid;
       for(var i=0; i<record_ids.length;i++){
           query += "&ids[@1]=@2".replace(/@1/g,i).replace(/@2/g,record_ids[i]);
       }
       var response = UrlFetchApp.fetch(
         "@1/records.json?@2"
            .replace(/@1/g, this._getEndpoint(app.guestid))
            .replace(/@2/g, query),
         this._deleteOption(app)
       );
       return response;
    };
    // GETメソッドの時のオプション情報
    KintoneManager.prototype._getOption = function(app) {
       var option = {
          method: "get",
          headers: this._authorizationHeader(app),
          muteHttpExceptions: true
       };
       return option;
    };
    // POSTメソッドの時のオプション情報
    KintoneManager.prototype._postOption = function(app,payload) {
       var option = {
               method: "post",
               contentType: "application/json",
               headers: this._authorizationHeader(app),
               muteHttpExceptions: true,
               payload: JSON.stringify(payload)
       };
       return option;
    };
    // PUTメソッドの時のオプション情報
    KintoneManager.prototype._putOption = function(app,payload) {
       var option = {
               method: "put",
               contentType: "application/json",
               headers: this._authorizationHeader(app),
               muteHttpExceptions: true,
               payload: JSON.stringify(payload)
       };
       return option;
    };
    // DELETEメソッドの時のオプション情報
    KintoneManager.prototype._deleteOption = function(app) {
       var option = {
          method: "delete",
          headers: this._authorizationHeader(app),
          muteHttpExceptions: true
       };
       return option;
    };
    // エンドポイントの取得
    KintoneManager.prototype._getEndpoint = function(guest_id) {
      var endpoint = "https://@1.cybozu.com".replace(/@1/g,this.subdomain);
      if (guest_id == null) {
        return endpoint + "/k/v1";
      } else {
        return endpoint + "/k/guest/@1/v1".replace(/@1/g, guest_id);
      }
    };
    // ヘッダーの認証情報
    KintoneManager.prototype._authorizationHeader = function(app) {
      if (this.authorization) {
         // パスワード認証
         return { "X-Cybozu-Authorization": this.authorization };
      } else if (app.token) {
         // APIトークン認証
         return { "X-Cybozu-API-Token": app.token };
      } else {
        throw new Error("kintone APIを呼ぶための認証情報がありません。");
      }
    };
    return KintoneManager;
})();