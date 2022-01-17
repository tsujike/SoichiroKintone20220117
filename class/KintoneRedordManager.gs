'use strict'
class KintoneRecordManager {
  /**
   * 
   * @constructor
   */
  constructor(subdomain, apps, user, pass) {
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
  /**
   * kintoneにレコードを追加するメソッド
   * @param {string} appName - アプリの名前
   * @param {Array.<Array.<string>>} records - 登録するレコード
   * @return {Object} response - リクエストの結果
   */
  create(appName, records) {
    const app = this.apps[appName];
    const payload = {
      app: app.appid,
      records: records
    };
    const endpoint = `${this._getEndpoint(app.guestid)}/records.json`;
    const option = this._postOption(app, payload);
    const response = this.getAsObject(endpoint, option)
    return response;
  }
  /**
   * kintoneからレコードを検索するメソッド
   * @param {string} appName - アプリの名前
   * @param {string} query - 検索するクエリ
   * @return {Object}response - response
   */
  search(appName, query) {
    const q = encodeURIComponent(query);
    const app = this.apps[appName];
    const endpoint = `${this._getEndpoint(app.guestid)}/records.json?app=${app.appid}&query=${q}`;
    const option = this._getOption(app);

    const response = this.getAsObject(endpoint, option)
    return response;

  }
  /**
   * kintoneに登録されたレコードを更新するメソッド
   * @param {string} appName - アプリの名前
   * @param {Array.<Array.<string>>} records - 登録するレコード
   */
  update(appName, records) {
    const app = this.apps[appName];
    const payload = {
      app: app.appid,
      records: records
    };
    const endpoint = `${this._getEndpoint(app.guestid)}/records.json`;
    const option = this._putOption(app, payload);
    const response = this.getAsObject(endpoint, option)
    return response;
  }
  /**
   * kintoneに登録されたレコードを削除するメソッド(最大100件まで)
   * @param {string} appName - アプリの名前
   * @param {Array.string} recordIds - 削除するレコードのIDの配列
   * @return {Array.<Object>} records - 削除するレコードのID
   */
  destroy(appName, recordIds) {
    const app = this.apps[appName];
    const payload = {
      app: app.appid,
      ids: recordIds
    };
    const endpoint = `${this._getEndpoint(app.guestid)}/records.json`;
    const option = this._deleteOption(app, payload);
    const response = this.getAsObject(endpoint, option)
    return response;
  }
  /**
   * UrlFetchApp を利用して取得した値をオブジェクト化して返す関数
   * 処理成功時は空の JSON データが返されます。
   * @param {string} url - fetch メソッド用の URL
   * @param {Object} params - fetch メソッド用のパラメーター
   * return {Object} - {}
   */
  getAsObject(url, params) {
    const response = UrlFetchApp.fetch(url, params);
    const json = response.getContentText();
    const object = JSON.parse(json);
    return object;
  }


  /**
   * GETする時のオプションを作成するサブメソッド
   * @param {string} app - app
   * @return {Object} option - option
   */
  _getOption(app) {
    const option = {
      method: "get",
      headers: this._authorizationHeader(app),
      muteHttpExceptions: true
    };
    return option;
  }

  /**
   * POSTする時のオプションを作成するサブメソッド
   * @param {string} app - app
   * @param {Object} payload - payload
   * @return {Object} option - option
   */
  _postOption(app, payload) {
    const option = {
      method: "post",
      contentType: "application/json",
      headers: this._authorizationHeader(app),
      muteHttpExceptions: true,
      payload: JSON.stringify(payload)
    };
    return option;
  }

  /**
   * putする時のオプションを作成するサブメソッド
   * @param {string} app - app
   * @param {Object} payload - payload
   * @return {Object} option - option
   */
  _putOption(app, payload) {
    const option = {
      method: "put",
      contentType: "application/json",
      headers: this._authorizationHeader(app),
      muteHttpExceptions: true,
      payload: JSON.stringify(payload)
    };
    return option;
  }

  /**
   * deleteする時のオプションを作成するサブメソッド
   * @param {string} app - app
   * @param {Object} payload - payload
   * @return {Object} option - option
   */
  _deleteOption(app, payload) {
    const option = {
      method: "DELETE",
      contentType: "application/json",
      headers: this._authorizationHeader(app),
      muteHttpExceptions: true,
      payload: JSON.stringify(payload)
    };
    return option;
  }

  /**
   * kintoneのエンドポイントを作成するサブメソッド
   * @param {string} guestId - アプリの名前
   * @return {string} endpoint - エンドポイント
   */
  _getEndpoint(guestId) {
    let endpoint = `https://${this.subdomain}.cybozu.com`
    if (guestId == null) {
      endpoint += "/k/v1";
      return endpoint
    } else {
      endpoint = `${endpoint}/k/guest/${guestId}/v1`
      return endpoint
    }
  }
  /**
   * kintoneの認証情報を作成するサブメソッド
   * @param {string} app - アプリの名前
   * @param {Object} authorization - 認証情報のオブジェクト
   */
  _authorizationHeader(app) {
    if (this.authorization) {
      // パスワード認証
      return { "X-Cybozu-Authorization": this.authorization };
    } else if (app.token) {
      // APIトークン認証
      return { "X-Cybozu-API-Token": app.token };
    } else {
      throw new Error("kintone APIを呼ぶための認証情報がありません。");
    }
  }

}












