import Link from 'next/link'

export default function Menu() {
  return (
    <div className="w-40 h-dvh bg-gray-500 p-4">
      <div className="flex flex-col">
        <Link href="/dashboard/projects">Projects</Link>
        <Link href="/dashboard/categories">Categories</Link>
      </div>
    </div>
  )
}