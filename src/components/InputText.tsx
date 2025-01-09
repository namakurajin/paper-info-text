
import { useState } from 'react';
import { Field } from '@ark-ui/react/field';
import styles from './InputText.module.scss';

interface Props {
  label: string;
  name: string;
  onChangeValue(name: string, value: string): void;
};

export default function InputText({label, name, onChangeValue}: Props) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onChangeValue(event.target.name, event.target.value);
  };

  return (
    <Field.Root className={styles.wrapper}>
      <Field.Label className={styles.label}>{label}</Field.Label>
      <Field.Input
        name={name}
        value={inputValue}
        onChange={(event) => handleChange(event)}
        className={styles.input}
      />
    </Field.Root>
  );
}
