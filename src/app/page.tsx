'use client';

import { useState } from "react";
import { toast } from 'react-toastify';

// CSS Modules以外で良い感じのがまだ見つからない
import styles from './page.module.scss';

// 必要なコンポーネントを用意
import InputCheckbox from '@/components/InputCheckbox';
import InputClipboard from '@/components/InputClipboard';
import InputText from '@/components/InputText';
import IconButton from '@/components/IconButton';

// 必要な型定義を用意
import { Author } from '@/types/author';
import { Option } from '@/types/option';
import { PaperInformation  } from '@/types/paperInformation';

// 著者情報の初期データ
const initAuthorCount: number = 6;
const initAuthors: Author[] = Array.from({ length: initAuthorCount }, () => ({
  firstName: '',
  lastName: ''
}));

// 論文情報の初期データ
const initPaperInformation: PaperInformation = {
  paperYear: '',
  paperTitle: '',
  bookTitle: '',
  paperVolume: '',
  paperIssue: '',
  paperPageStart: '',
  paperPageEnd: ''
};

// オプションの初期データ
const initOption: Option = {
  isEnglish: false,
  isAccepted: false
};

export default function App() {
  const [authors, setAuthors] = useState(initAuthors);
  const [paperInformation, setPaperInformation] = useState(initPaperInformation);
  const [option, setOption] = useState(initOption);
  const [result, setResult] = useState('');

  /**
   * 著者情報を更新する。
   *
   * @param { string } nameAttribute
   * @param { string } valueAttribute
   * @param { number } authorIndex
   */
  function updateAuthors(nameAttribute: string, valueAttribute: string, authorIndex: number): void {
    const newData = [...authors];

    newData[authorIndex] = {
      ...newData[authorIndex],
      [nameAttribute]: valueAttribute
    }

    setAuthors(newData);
  }

  /**
   * 著者情報の入力枠を追加する。
   */
  function addAuthor() {
    const newData = [...authors];

    newData.push(
      {
        firstName: '',
        lastName: '',
      }
    );

    setAuthors(newData);
  }

  /**
   * 論文情報を更新する。
   *
   * @param { string } nameAttribute
   * @param { string } valueAttribute
   */
  function updatePaperInformation(nameAttribute: string, valueAttribute: string): void {
    const newData = {
      ...paperInformation,
      [nameAttribute]: valueAttribute
    };

    setPaperInformation(newData);
  }

  /**
   * オプションを更新する。
   *
   * @param { string } nameAttribute
   * @param { boolean } isChecked
   */
  function updateOption(nameAttribute: string, isChecked: boolean): void {
    const newData = {
      ...option,
      [nameAttribute]: isChecked
    };

    setOption(newData);

    /*
      オプションの変更を受けて結果テキストを更新しようと思ったら、
      generateText()の中ではまだsetOptionされていない状態だったので、
      最新の状態を引数で渡してそれを使用している。
      もっと良い方法がある気がする。
    */
    if (result !== '') generateText(newData);
  }


  /**
   * 論文情報テキストを生成する。
   *
   * @param { Option|null } preRenderingLatestOption - レンダリング前の最新オプション情報
   */
  function generateText(preRenderingLatestOption: Option|null = null): void {
    let updated_result = '';

    const isEnglish = preRenderingLatestOption && preRenderingLatestOption.isEnglish
      || !preRenderingLatestOption && option.isEnglish;

    const isAccepted = preRenderingLatestOption && preRenderingLatestOption.isAccepted
      || !preRenderingLatestOption && option.isAccepted;

    // 著者名
    for (let i = 0; i < authors.length; i++) {
      if (authors[i]['firstName'] === '' || authors[i]['lastName'] === '') continue;

      if (isEnglish) {
        const lastNameEn = authors[i]['lastName'].charAt(0).toUpperCase() + authors[i]['lastName'].slice(1);
        const firstNameEnInitial = authors[i]['firstName'].slice(0, 1).toUpperCase();
        updated_result += `${lastNameEn} ${firstNameEnInitial}`;
      } else {
        const lastNameJa = authors[i]['lastName'];
        const firstNameJa = authors[i]['firstName'];
        updated_result += lastNameJa + firstNameJa;
      }

      updated_result += ', ';
    }

    updated_result = updated_result.slice(0, -2); // 最後の著者うしろの「, 」は不要なので除去
    updated_result += ` (${paperInformation.paperYear})`;
    updated_result += ` ${paperInformation.paperTitle}.`;
    updated_result += ` ${paperInformation.bookTitle},`;
    updated_result += ` ${paperInformation.paperVolume}`;
    updated_result += `(${paperInformation.paperIssue}),`;
    updated_result += ` ${paperInformation.paperPageStart}`;
    updated_result += `-${paperInformation.paperPageEnd}`;
    updated_result += isAccepted ? ` (accepted)` : '';

    setResult(updated_result);
  }

  /**
   * コピーした旨をトーストで表示する。
   */
  function copyText(): void {
    toast('コピーしました！', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false
    });
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>論文情報テキストを作成するツール</h1>

      <div className={styles.result}>
        <button type="button" className={styles.button} onClick={() => {generateText();}}>
          作成する
        </button>

        <InputClipboard value={result} onCopy={copyText} />
      </div>

      <div className={styles.options}>
        <div className={styles.option}>
          <InputCheckbox
            label="英語フォーマット"
            name="isEnglish"
            onChangeStatus={(name, checked) => updateOption(name, checked)}
          />
        </div>

        <div className={styles.option}>
          <InputCheckbox
            label="アクセプト論文"
            name="isAccepted"
            onChangeStatus={(name, checked) => updateOption(name, checked)}
          />
        </div>
      </div>

      <div className={styles.sections}>
        <section className={styles.section} data-section-id="author">
          <h2 className={styles.heading}>著者名</h2>

          <div className={styles.authors}>
            { authors.map((author, index) => (
              <div key={`author${index}`} className={styles.author}>
                <InputText
                  label="名字"
                  name="lastName"
                  onChangeValue={(name, value) => updateAuthors(name, value, index)}
                />

                <InputText
                  label="名前"
                  name="firstName"
                  onChangeValue={(name, value) => updateAuthors(name, value, index)}
                />
              </div>
            ))}
          </div>

          <div className={styles.addAuthorButtonWrapper}>
            <IconButton
              iconType={'plus'}
              label={`著者を追加する`}
              onClickButton={() => addAuthor()}
            />
          </div>
        </section>

        <section className={styles.section} data-section-id="paper">
          <h2 className={styles.heading}>論文情報</h2>

          <InputText
            label="論文タイトル"
            name="paperTitle"
            onChangeValue={(name, value) => updatePaperInformation(name, value)}
          />

          <InputText
            label="論文誌名"
            name="bookTitle"
            onChangeValue={(name, value) => updatePaperInformation(name, value)}
          />

          <div className={styles.paperInformationGroup}>
            <div>
              <InputText
                label="年"
                name="paperYear"
                onChangeValue={(name, value) => updatePaperInformation(name, value)}
              />
            </div>

            <div>
              <InputText
                label="巻"
                name="paperVolume"
                onChangeValue={(name, value) => updatePaperInformation(name, value)}
              />
            </div>

            <div>
              <InputText
                label="号"
                name="paperIssue"
                onChangeValue={(name, value) => updatePaperInformation(name, value)}
              />
            </div>
          </div>

          <div className={styles.paperInformationGroup}>
            <div>
              <InputText
                label="ページ（開始）"
                name="paperPageStart"
                onChangeValue={(name, value) => updatePaperInformation(name, value)}
              />
            </div>

            <div>
              <InputText
                label="ページ（終了）"
                name="paperPageEnd"
                onChangeValue={(name, value) => updatePaperInformation(name, value)}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
