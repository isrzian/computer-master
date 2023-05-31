export default function Sphere({
  variant,
}: {
  variant: 'green' | 'purple' | 'pink'
}) {
  return (
    <div className="relative -z-50 h-48 w-48 overflow-hidden bg-pink-500 opacity-10 blur-3xl" />
  )
}
