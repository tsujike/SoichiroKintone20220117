'use strict'
class KintoneManager {

  /**
   * 
   * @constructor
   */
  constructor(subdomain, apps, user, pass) {
    this.subdomain = subdomain;
    this.authorization = null;
    this.apps = apps;
    this.user = user
    if (arguments.length > 3) {
      this.authorization = Utilities.base64Encode(user + ":" + pass);
    } else if (arguments.length > 2) {
      // 引数が3つの場合はエンコード済みの認証情報として処理
      this.authorization = user;
    }

  }
  /**
   * kintoneにレコードを追加するメソッド
   * @params {String} appName - アプリの名前
   * @params {Array} records - 登録するレコード
   */
  create(appName,records){
    return
  }
  /**
   * kintoneからレコードを検索するメソッド
   * @params {String} appName - アプリの名前
   * @params {String} query - 検索するクエリ
   */
  search(appName,query){
    return

  }
  /**
   * kintoneに登録されたレコードを更新するメソッド
   * @params {String} appName - アプリの名前
   * @params {Array.<Array.<string>>} records - 登録するレコード
   */
  update(appName,records){
    return
  }
  /**
   * kintoneに登録されたレコードを削除するメソッド
   * @params {String} appName - アプリの名前
   * @params {Array.<Array.<string>>} records - 削除するレコードのID
   */
  destroy(appName,record_ids){
    return
  }

  _getOption(){

  }
  _postOption(){

  }
  _putOption(){

  }
  _deleteOption(){

  }
  _getEndpoint(){

  }
  _authorizationHeader(){

  }
}