import { Icon, Text, View, VStack } from "native-base";
import { Button } from "../components/Button";
import { Header } from "../components/Header";

import { Fontisto } from '@expo/vector-icons'

export function MyPools() {
  return (
    <View flex={1}>
      <Header text="Meus bolões" />

      <VStack px="8" alignItems="center">
        <Button title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={<Icon name="search" as={Fontisto} size={"5"} color="black" />}
        />

        <View width="full" height={1} background="gray.800" my="4"></View>

        <Text
          textAlign="center"
          fontSize="sm"
          fontFamily="body"
          color="gray.200"
        >
          Você ainda não está participando de nenhum bolão, que tal buscar um
          por código ou criar um novo?
        </Text>
      </VStack>
    </View>
  );
}
