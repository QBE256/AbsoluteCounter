/*--------------------------------------------------------------------------
　射程外からでも反撃ができるスキルが作れるスクリプト
■作成者
キュウブ

■概要
タイトル通り射程外からでも反撃可能になるスキルを設定できます。
弓兵ボスに持たせておいて囲まれて一方的に殴られる事態を防ぐといった事に使えると思います。

■注意点
一方向武器に対しても反撃するように実装しています。

2016/11/05
・コード内で変数宣言してないところがあったので修正

■使い方
スキル"カスタム"のスキル効果に"absolute_counter"の文字列を入れてください。

■対応バージョン
SRPG Studio Version:1.099

■規約
・利用はSRPG Studioを使ったゲームに限ります。
・商用・非商用問いません。フリーです。
・加工等、問題ありません。
・クレジット明記無し　OK (明記する場合は"キュウブ"でお願いします)
・再配布、転載　OK (バグなどがあったら修正できる方はご自身で修正版を配布してもらっても構いません)
・wiki掲載　OK
・SRPG Studio利用規約は遵守してください。

--------------------------------------------------------------------------*/

(function() {

	var alias1 = AttackChecker.isCounterattack;
	AttackChecker.isCounterattack = function(unit, targetUnit) {


		// 武器を装備してない時に反撃可能にするのはまずいと思うので、
		// 事前に武器チェックだけはやっておく

		// 攻撃を受ける側の装備武器を取得
		var weapon = ItemControl.getEquippedWeapon(targetUnit);
		
		// 武器を装備していない場合は、反撃できない
		if (weapon === null) {
			return false;
		}
		
		// カスタムスキルを探す
		var skillArray = SkillControl.getDirectSkillArray(targetUnit, SkillType.CUSTOM, 'absolute_counter');

		// 一応skillArrayの中からカスタムキーワードが'absolute_counter'になっているものを探す処理にしているけど
		// 'absolute_counter'以外のスキル情報は取得できていないはずなのでfor文で回すの無駄かも
		// とりあえず、該当スキルがあったらtrueを返しちゃいます
		for (var index = 0; index < skillArray.length; index++) {
			if (skillArray[index].skill.getCustomKeyword() === 'absolute_counter') {
				return true;
			}
		}

		// カスタムスキルを持っていなければ本来の処理を行う
		return alias1.call(this, unit, targetUnit);
	}
})();