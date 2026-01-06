import { ListEditor } from '../TextEditor/ListEditor';
//eslint-disable-next-line
export const InterviewNotes = (_props: Partial<{}>) => {
  return (
    <ListEditor
      className="text-start"
      onFinish={(val) => alert(JSON.stringify(val))}
    />
  );
};
