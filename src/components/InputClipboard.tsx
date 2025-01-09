
import { Clipboard } from '@ark-ui/react/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-react'
import styles from './InputClipboard.module.scss';

interface Props {
  value: string;
  onCopy(): void;
};

export default function InputClipboard({value, onCopy}: Props) {
  return (
    <Clipboard.Root
      value={value}
      className={styles.wrapper}
      onStatusChange={onCopy}
    >
      <Clipboard.Control className={styles.control}>
        <Clipboard.Input className={styles.result} />
        <Clipboard.Trigger>
          <Clipboard.Indicator copied={<CheckIcon />}>
            <ClipboardCopyIcon />
          </Clipboard.Indicator>
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard.Root>
  );
}
