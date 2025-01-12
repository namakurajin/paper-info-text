
import { PlusIcon, Trash2 } from 'lucide-react';
import styles from './IconButton.module.scss';

interface Props {
  iconType: 'plus' | 'trash'
  label: string;
  onClickButton(): void;
};

export default function IconButton({iconType, label, onClickButton}: Props) {
  return (
    <button type="button" className={styles.wrapper} onClick={onClickButton}>
      <div className={styles.icon}>
        {iconType === 'plus' && <PlusIcon />}
        {iconType === 'trash' && <Trash2 />}
      </div>

      { label }
  </button>
  );
}
