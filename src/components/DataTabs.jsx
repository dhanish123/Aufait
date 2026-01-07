import { Tabs } from "antd";

const items = [
  {
    key: "1",
    label: "All",
    children: null,
  },
  {
    key: "2",
    label: "New",
    children: null,
  },
  {
    key: "3",
    label: "Under mitigation",
    children: null,
  },
  {
    key: "4",
    label: "Closed",
    children: null,
  },
];

export default function DataTabs() {
  const onChange = (key) => {
    console.log(key);
  };

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
}
