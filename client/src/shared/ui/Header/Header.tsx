type Props = {
  name: string;
};

export const Header = ({ name }: Props) => {
  return <h1 className="font-semibold text-2xl text-gray-700">{name}</h1>;
};
