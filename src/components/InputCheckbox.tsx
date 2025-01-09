
import { useState } from 'react';
import { Checkbox } from '@ark-ui/react/checkbox';
import { CheckIcon } from 'lucide-react'
import styles from './InputCheckbox.module.scss';

interface Props {
  label: string;
  name: string;
  onChangeStatus(name: string, isChecked: boolean): void;
};

export default function InputCheckbox({label, name, onChangeStatus}: Props) {
  const [checked, setChecked] = useState<Checkbox.CheckedState>(false);

  const handleChange = (checked: Checkbox.CheckedState) => {
    if (checked === 'indeterminate') return; // 今回は不確定要素を考慮しない
    setChecked(checked);
    onChangeStatus(name, checked);
  };

  return (
    <Checkbox.Root
      className={styles.wrapper}
      checked={checked}
      onCheckedChange={(e) => handleChange(e.checked)}
    >
      <Checkbox.Control className={styles.checkbox}>
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.HiddenInput name={name} className={styles.input} />
      <Checkbox.Label>{label}</Checkbox.Label>
    </Checkbox.Root>
  );
}
