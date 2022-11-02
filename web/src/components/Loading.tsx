import { CircleNotch } from "phosphor-react";

export function Loading () {
  return (
    <div>
      <CircleNotch weight="bold" className="text-xl text-zinc-900 animate-spin" />
    </div>
  )
}