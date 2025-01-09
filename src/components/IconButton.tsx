
import { PlusIcon } from 'lucide-react';
import styles from './IconButton.module.scss';

interface Props {
  iconType: 'plus' // アイコンのバリエーションを増やす場合はここに追加する想定
  label: string;
  onClickButton(): void;
};

export default function IconButton({iconType, label, onClickButton}: Props) {
  return (
    <button type="button" className={styles.wrapper} onClick={onClickButton}>
      <div className={styles.icon}>
        {iconType === 'plus' && <PlusIcon />}
      </div>

      { label }
  </button>
  );
}
