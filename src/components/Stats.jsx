import { HiArchiveBox } from "react-icons/hi2";


export default function Stats() {
  return (
    <div className="flex rounded-full overflow-hidden bg-neutral-100 border border-neutral-300">
      <div className="flex items-center gap-2 px-4 [&_svg]:size-5 [&_svg]:text-orange-400 py-2">
        <HiArchiveBox />
        <p>
          <span className="font-semibold text-lg mr-1">213</span>Open Risk
        </p>
      </div>
      <div className="flex items-center gap-2 px-4 [&_svg]:size-5 [&_svg]:text-orange-400 py-2">
        <HiArchiveBox />
        <p>
          <span className="font-semibold text-lg mr-1">23</span>High Priority
        </p>
      </div>
      <div className="flex items-center gap-2 px-4 [&_svg]:size-5 [&_svg]:text-orange-400 py-2">
        <HiArchiveBox />
        <p>
          <span className="font-semibold text-lg mr-1">121</span>Threats
        </p>
      </div>
    </div>
  );
}
