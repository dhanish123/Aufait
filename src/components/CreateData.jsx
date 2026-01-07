import { Button, Popover, Form, Input } from "antd";
import { useDataStore } from "../hooks/useDataStore";

const { TextArea } = Input;

export default function CreateData() {
  return (
    <Popover content={<CreateForm />} title="Create" trigger="click">
      <button className="bg-orange-500 max-w-32 text-white bored w-full px-4 py-1.2">Create</button>
    </Popover>
  );
}

function CreateForm() {
  const { data, addData } = useDataStore();

  const onFinish = (values) => {
    addData({
      id: data.length + 1,
      title: values.title,
      body: values.body,
    });
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input your title!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Body"
        name="body"
        rules={[{ required: true, message: "Please input your body!" }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
