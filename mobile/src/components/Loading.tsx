import { Center, Spinner } from "native-base";

export function Loading () {
  return (
    <Center flex={1} bg="gray.900">
      <Spinner fontSize={18} color="yellow.500" />
    </Center>
  )
}