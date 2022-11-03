import { IInputProps, Input as NativeBaseInput } from "native-base";

interface InputProps extends IInputProps {}

export function Input({ type = "text", ...rest }: InputProps) {
  return (
    <NativeBaseInput
      background="gray.800"
      color="gray.300"
      placeholderTextColor="gray.300"
      fontSize="sm"
      height={50}
      fontFamily="body"
      px={4}
      py={2}
      _focus={{
        borderColor: "gray.600",
      }}
      width="full"
      borderRadius={4}
      borderColor="gray.600"
      borderWidth={1}
      type={type}
      {...rest}
    />
  );
}
