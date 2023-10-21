import style from './step.module.scss';

type Props = {
  index: any;
  active: boolean;
  path: string;
};

export const Step = ({ index, active, path }: Props) => {
  return (
    <div className={style.container}>
      <div className={style.step}>
        {path}
        <div>{active}</div>

        <div>{index}</div>
      </div>
    </div>
  );
};
