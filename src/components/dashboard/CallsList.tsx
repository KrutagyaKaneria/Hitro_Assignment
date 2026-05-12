import type { CallDayGroup } from '@/utils/groupCallSessionsByDay'

import { CallRow } from './CallRow'

type Props = {
  groups: CallDayGroup[]
}

export function CallsList({ groups }: Props) {
  return (
    <div className="w-full space-y-6 lg:space-y-8">
      {groups.map((group) => (
        <section key={group.key} aria-labelledby={`day-${group.key}`}>
          <h3
            id={`day-${group.key}`}
            className="mb-4 text-center text-[10px] font-normal leading-none text-muted-foreground lg:mb-4 lg:text-[15px]"
          >
            {group.heading}
          </h3>
          <div className="mx-auto w-full max-w-[364px] lg:max-w-[790px]">
            {group.sessions.map((s) => (
              <CallRow key={s._id} session={s} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
