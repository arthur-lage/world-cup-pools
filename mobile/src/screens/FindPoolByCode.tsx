import { Text, View, VStack } from "native-base";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function FindPoolByCode() {
  return (
    <View flex={1}>
      <Header canGoBack text="Buscar por código" />

      <VStack px="8">
        <Text
          marginBottom={10}
          width={335}
          fontSize="xl"
          fontFamily={"heading"}
          color="white"
          textAlign={"center"}
        >
          Encontre um bolão através de seu código único
        </Text>

        <Input placeholder="Qual o código do bolão?" />

        <Button title="BUSCAR BOLÃO" marginTop={2} width="full" />
      </VStack>
    </View>
  );
}
