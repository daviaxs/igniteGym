import { Box } from "@gluestack-ui/themed"
import { useRef } from "react"
import { Animated } from "react-native"

export function Skeleton() {
  const opacityAnim = useRef(new Animated.Value(1)).current

  Animated.loop(
    Animated.sequence([
      Animated.timing(opacityAnim, {
        toValue: 0.5,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      })
    ])
  ).start()

  return (
    <Animated.View style={{ opacity: opacityAnim }}>
      <Box bg="$gray500" w="$full" h="$20" rounded='$md' />
    </Animated.View>
  )
}