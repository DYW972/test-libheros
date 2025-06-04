import Link from 'next/link';
import { Types } from '@/shared';

export default function ClickToAction({
  route,
  question,
  action,
}: Types.TClickToAction) {
  return (
    <p className="mt-10 text-center text-sm/6 text-gray-500">
      {question}&nbsp;
      <Link
        href={route}
        className="font-semibold text-indigo-600 hover:text-indigo-500"
      >
        {action}
      </Link>
    </p>
  );
}
