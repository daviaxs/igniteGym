import { ScreenHeader } from "@components/screen-header/ScreenHeader"
import { VStack } from "@gluestack-ui/themed"
import { HistoryCard } from "./components/HistoryCard"

export function HistoryScreen() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico" />

      <HistoryCard />
    </VStack>
  )
}