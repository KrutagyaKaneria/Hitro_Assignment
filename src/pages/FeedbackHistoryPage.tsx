import { motion } from 'framer-motion'

import { PAGE_SHELL_CLASS } from '@/constants/pageShell'
import { FeedbackHistoryCard } from '@/components/feedback/FeedbackHistoryCard'
import { FeedbackHistoryEmptyTable } from '@/components/feedback/FeedbackHistoryEmptyTable'
import { FeedbackHistoryTable } from '@/components/feedback/FeedbackHistoryTable'
import { EmptyFeedbackState } from '@/components/feedback/EmptyFeedbackState'
import { useFeedbackFlow } from '@/contexts/useFeedbackFlow'
import { useFeedbackHistory } from '@/hooks/useFeedbackHistory'

export function FeedbackHistoryPage() {
  const { entries, hasEntries } = useFeedbackHistory()
  const { open } = useFeedbackFlow()

  return (
    <div className={PAGE_SHELL_CLASS}>
      <motion.p
        className="max-w-[271px] text-[12px] font-medium leading-[1.204] tracking-[0.3px] text-black/40"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        Browse your previous feedback submissions
      </motion.p>

      <div className="mt-10 lg:mt-20">
        {!hasEntries ? (
          <>
            <FeedbackHistoryEmptyTable onGiveFeedback={open} />
            <div className="mt-10 lg:hidden">
              <EmptyFeedbackState onGiveFeedback={open} />
            </div>
          </>
        ) : (
          <>
            <FeedbackHistoryTable entries={entries} />
            <motion.ul
              className="mt-6 flex flex-col gap-2 lg:hidden"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.06 },
                },
              }}
            >
              {entries.map((entry) => (
                <motion.li
                  key={entry.id}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  <FeedbackHistoryCard entry={entry} />
                </motion.li>
              ))}
            </motion.ul>
          </>
        )}
      </div>
    </div>
  )
}
