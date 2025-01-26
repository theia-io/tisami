type Props = { text: string };

export const Tag = ({ text }: Props) => (
  <>
    <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full">
      #{text}
    </span>
  </>
);

type TagsProps = { tags?: Array<string> };
export const Tags = ({ tags }: TagsProps) =>
  tags &&
  tags.length > 0 && (
    <div className="flex flex-nowrap overflow-auto gap-2">
      {tags.map((tag) => (
        <Tag text={tag} key={tag}></Tag>
      ))}
    </div>
  );
