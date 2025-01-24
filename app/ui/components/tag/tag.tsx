type Props = { text: string };

export const Tag = ({ text }: Props) => (
  <>
    <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full">
      # {text}
    </span>
  </>
);
