import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base'

interface ButtonProps extends IButtonProps {
  title: string
  type?: 'PRIMARY' | 'SECONDARY'
}

export function Button ({ title, type = "PRIMARY", ...rest }: ButtonProps) {
  return (
    <NativeBaseButton
          width={320}
          paddingY={18}
          alignItems="center"
          justifyContent="center"
          height={52}
          borderRadius={4}
          bgColor={type === "PRIMARY" ? "yellow.500" : "red.500"}
          textAlign="center"
          _loading={{
            _spinner: {
              color: type === "PRIMARY" ? "black" : "white"
            }
          }}
          _pressed={{
            bg: type === "PRIMARY"? "yellow.600" : "red.600",
          }}

          {...rest}
        >
          <Text marginLeft={2} fontSize="sm" fontFamily="heading" color={type === "PRIMARY" ? "black" : "white"}>
            {title}
          </Text>
        </NativeBaseButton>
  )
}