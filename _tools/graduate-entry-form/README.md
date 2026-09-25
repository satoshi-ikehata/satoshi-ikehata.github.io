総研大・東京大学の進学エントリーフォームを作成するための Google Apps Script です。
Google上のフォームはまだ作成していません。Code.gs を実行すると、実行したGoogleアカウントに日英併記の共通フォームが未公開で作成されます。

作成手順:

1. フォームを所有するGoogleアカウントで [Google Apps Script](https://script.google.com/home/start) を開き、新しいプロジェクトを作成します。
2. エディタの Code.gs を、このフォルダの Code.gs の内容で置き換えて保存します。
3. 関数 `createGraduateEntryForm` を選んで実行します。初回はGoogleフォームへのアクセス権限を確認して許可します。
4. 実行ログに表示される「編集用URL」を開き、設問・必須項目を確認します。変更はフォームの編集画面で行えます。
5. 受付を開始するときにGoogleフォームの「公開」から回答者の範囲を設定します。学外からの応募を受ける場合は、所属組織内だけに制限されていないことを確認してください。
6. 回答用リンクを取得します。このURLをWebサイトの総研大・東京大学の募集欄に設置すれば、共通フォームで受付できます。

同じアカウント・同じApps Scriptプロジェクトで再実行した場合は、作成済みフォームのURLを表示します。既存フォームの設問は書き換えません。途中で実行に失敗した場合は、Google Driveに未完成の下書きが残る場合があります。

入力項目:

| 項目 | 必須 |
| --- | --- |
| 氏名 | はい |
| 連絡先メールアドレス | はい |
| 所属大学・学部・研究科等 | はい |
| 学歴・卒業または修了見込み | はい |
| 志望大学・課程 | はい |
| 入学希望時期 | はい |
| 希望研究テーマ・志望理由 | はい |
| 研究経験・技術経験 | はい |
| CV・履歴書のURL | はい |
| 論文・研究成果 | いいえ |
| Webサイト・GitHub等のURL | いいえ |
| 奨学金・資金計画 | いいえ |
| 質問・補足事項 | いいえ |

志望課程の選択肢は、総研大の5年一貫制博士課程・博士後期課程、東京大学の修士課程・博士課程、未定・相談希望です。複数の課程を検討している場合は、補足事項に記載できます。

CVはURLで受け取り、閲覧制限がある場合は sikehata@nii.ac.jp に閲覧権限を付与してもらう案です。メールアドレスは入力欄で受け取り、メール形式を検証します。回答の概要を応募者に公開する設定は無効にしています。回答はフォームの「回答」タブで確認でき、必要ならそこからGoogleスプレッドシートに連携できます。

フォーム冒頭には、初回の相談はメールではなくフォームで送ることと、大学への正式な出願は別途必要であることを日英で記載しています。大学院エントリー用の締切は設定していません。

フォーム作成後にWebサイトへ掲載する文案:

- 日本語: 「大学院進学・研究指導に関する初回のご相談は、メールではなくエントリーフォームからお送りください。」
- English: “For initial inquiries about graduate study and research supervision, please use the entry form instead of email.”
- ボタン: 「エントリーフォーム / Entry Form」

現時点ではWebサイトにフォームURLを追加しておらず、両大学の募集欄は非表示のままです。

Google公式仕様: [FormApp.create](https://developers.google.com/apps-script/reference/forms/form-app)、[Form](https://developers.google.com/apps-script/reference/forms/form)、[入力形式の検証](https://developers.google.com/apps-script/reference/forms/text-validation-builder)。Googleアカウント上での動作確認は未実施です。
