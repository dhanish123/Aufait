import { HiArchiveBox } from "react-icons/hi2";

const menu = [
  {
    id: 1,
    label: "Home",
    icon: <HiArchiveBox />,
  },
  {
    id: 2,
    label: "Home",
    icon: <HiArchiveBox />,
  },
  {
    id: 3,
    label: "Home",
    icon: <HiArchiveBox />,
  },
  {
    id: 4,
    label: "Home",
    icon: <HiArchiveBox />,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-16 border-r h-full border-neutral-200 bg-neutral-100">
      <ul className="flex flex-col gap-6 w-full justify-center pt-16">
        {menu.map((item) => (
          <li
            key={item.id}
            className="size-11 rounded-lg *:size-6 inline-flex items-center justify-center mx-auto hover:bg-orange-500 hover:*:text-white cursor-pointer"
          >
            {item.icon}
          </li>
        ))}
      </ul>
    </aside>
  );
}
