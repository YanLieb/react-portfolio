import Link from 'next/link'

export default function Menu() {
  return (
    <div className="w-40 h-dvh border-r-1 border-gray-200 p-4 flex flex-col gap-2">
      <Link href="/dashboard/projects">Projects</Link>
      <Link href="/dashboard/categories">Categories</Link>
    </div>
  )
}