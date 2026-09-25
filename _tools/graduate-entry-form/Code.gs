/**
 * Run createGraduateEntryForm in Google Apps Script.
 * Creates one unpublished, bilingual graduate entry form in your account.
 * Subsequent runs in the same project return the existing form.
 */
function createGraduateEntryForm() {
  const properties = PropertiesService.getUserProperties();
  const propertyKey = 'IKEHATA_GRADUATE_ENTRY_FORM_ID';
  const existingId = properties.getProperty(propertyKey);

  if (existingId) {
    const existingForm = FormApp.openById(existingId);
    logGraduateFormLinks_(existingForm);
    return existingForm.getEditUrl();
  }

  const form = FormApp.create(
    'Graduate Study Inquiry / 大学院進学エントリー — Satoshi Ikehata',
    false
  );

  form.setDescription([
    'For prospective graduate students interested in working with Satoshi Ikehata at SOKENDAI or the University of Tokyo. Please submit your initial inquiry through this form instead of email. You may answer in English or Japanese.',
    '総合研究大学院大学または東京大学で池畑諭の研究指導を希望する方向けのエントリーフォームです。初回のご相談はメールではなく、このフォームからお送りください。日本語・英語のどちらでも回答できます。',
    'This form is for a preliminary inquiry about research supervision. Formal university admission requires a separate application through the relevant university.',
    '本フォームは研究指導に関する事前相談用です。大学への正式な出願は、各大学の案内に従って別途行ってください。'
  ].join('\n\n'));

  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setPublishingSummary(false);
  form.setAllowResponseEdits(true);
  form.setShowLinkToRespondAgain(false);
  form.setShuffleQuestions(false);
  form.setConfirmationMessage(
    'Thank you. Your entry has been received. / エントリーを受け付けました。ご入力ありがとうございます。'
  );

  form.addSectionHeaderItem().setTitle('Applicant details / 応募者情報');

  form.addTextItem()
    .setTitle('Full name / 氏名')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Contact email address / 連絡先メールアドレス')
    .setHelpText('An address where you can receive a reply. / 返信を受け取れるアドレスを入力してください。')
    .setValidation(FormApp.createTextValidation().requireTextIsEmail().build())
    .setRequired(true);

  form.addTextItem()
    .setTitle('Current institution and department / 現在の所属大学・学部・研究科等')
    .setHelpText('If you are not currently enrolled, enter your most recent institution or current employer. / 在学中でない場合は、最終所属大学または勤務先を入力してください。')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Education and expected graduation / 学歴・卒業または修了見込み')
    .setHelpText('Degrees obtained or in progress, institutions, and graduation dates (YYYY-MM). / 取得済み・取得予定の学位、大学名、卒業・修了年月を記載してください。')
    .setRequired(true);

  form.addSectionHeaderItem().setTitle('Graduate study plans / 進学希望');

  form.addMultipleChoiceItem()
    .setTitle('Preferred university and program / 志望大学・課程')
    .setChoiceValues([
      'SOKENDAI: Five-year doctoral program / 総研大：5年一貫制博士課程',
      'SOKENDAI: Three-year doctoral program / 総研大：博士後期課程',
      "University of Tokyo: Master's program / 東京大学：修士課程",
      'University of Tokyo: Doctoral program / 東京大学：博士課程',
      'Undecided / 未定・相談希望'
    ])
    .setHelpText('Select your first preference. If considering multiple programs, explain in the final comments field. / 第一希望を選択してください。複数の課程を検討中の場合は、最後の自由記入欄に記載してください。')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Preferred enrollment date / 入学希望時期')
    .setHelpText('Enter the year and month, or write "Undecided". / 希望する年月、または「未定」と記載してください。')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Research interests and motivation / 希望研究テーマ・志望理由')
    .setHelpText('Describe what you would like to study and why you would like to work with Satoshi Ikehata. / 取り組みたい研究と、池畑の研究指導を希望する理由を記載してください。')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Research and technical experience / 研究経験・技術経験')
    .setHelpText('Describe relevant projects, your contributions, and programming or other technical experience. If new to research, describe coursework or personal projects. / 関連する研究・開発、担当内容、プログラミング等の経験を記載してください。研究未経験の場合は授業や個人制作について記載してください。')
    .setRequired(true);

  form.addSectionHeaderItem().setTitle('Supporting materials / 参考資料');

  form.addTextItem()
    .setTitle('CV or resume URL / CV・履歴書のURL')
    .setHelpText('Provide a link to your CV. For restricted files, grant viewing access to sikehata@nii.ac.jp. / CV・履歴書のリンクを入力してください。閲覧を制限している場合は sikehata@nii.ac.jp に閲覧権限を付与してください。')
    .setValidation(FormApp.createTextValidation().requireTextIsUrl().build())
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Publications and research outputs / 論文・研究成果（任意）')
    .setHelpText('Titles, links, and your contributions, if applicable. / 該当する場合、タイトル、URL、ご自身の貢献を記載してください。')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Website, GitHub, or portfolio URL / Webサイト・GitHub・ポートフォリオのURL（任意）')
    .setValidation(FormApp.createTextValidation().requireTextIsUrl().build())
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Scholarships or funding plans / 奨学金・資金計画（任意）')
    .setHelpText('If relevant, describe scholarships obtained or planned applications. / 該当する場合、採用済み・申請予定の奨学金等について記載してください。')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Questions and additional information / 質問・補足事項（任意）')
    .setRequired(false);

  properties.setProperty(propertyKey, form.getId());
  logGraduateFormLinks_(form);
  return form.getEditUrl();
}

function logGraduateFormLinks_(form) {
  console.log('Edit URL / 編集用URL: ' + form.getEditUrl());
  console.log('Respondent URL (usable after publishing) / 回答用URL（公開後に利用）: ' + form.getPublishedUrl());
}
