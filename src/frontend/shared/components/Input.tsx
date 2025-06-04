import { Types } from '@/shared';

function Input(props: Types.TInput) {
  return (
    <input
      id={props.id}
      type={props.type}
      name={props.name}
      value={props.value}
      required={props.required}
      onChange={props.onChange}
      className={props.className}
      autoComplete={props.autoComplete}
    />
  );
}

export default Input;
