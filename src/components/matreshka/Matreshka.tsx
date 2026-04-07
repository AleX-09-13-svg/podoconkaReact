import { cn } from '../../lib/utils'

type MatreshkaProps = {
  text?: string
  className?: string
}

export default function Matreshka({
  text,
  className,
}: MatreshkaProps) {
  return (
    <div
      className={cn(
        'flex-1 w-full border-8 border-red-500',
        'sm:w-3/4 md:w-2/3 lg:w-1/2',
        className,
      )}
    >
      {text}
    </div>
  )
}
