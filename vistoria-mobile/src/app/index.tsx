import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BotaoConcluirVistoria } from "@/components/Buttons/BotaoConcluirVistoria";
import { MapaDaVistoria } from "@/components/Home/MapaDaVistoria";
import { NavegacaoInferior } from "@/components/Navegacao/NavegacaoInferior";

import { CoresVistoria } from "@/constants/theme";

import { useRelogioGlobal } from "@/hooks/use-relogio-global";

import { useVistoriaStore } from "@/stores/use-vistoria-store";

export default function HomeScreen() {
  const { dataAtual, horarioAtual } = useRelogioGlobal();
  const vistoriaAtiva = useVistoriaStore((estado) => estado.vistoriaAtiva);
  const possuiVistoriaAtiva = Boolean(vistoriaAtiva);

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.areaSegura}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.conteudo}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cabecalho}>
            <Text style={styles.marca}>PEACORE</Text>
            <Text style={styles.titulo}>Peacore Vistorias</Text>
            <Text style={styles.descricao}>
              Os dados da vistoria serão exibidos aqui.
            </Text>
          </View>

          <MapaDaVistoria />

          <View style={styles.informacoes}>
            <Text style={styles.horario}>{horarioAtual}</Text>
            <View style={styles.dataContainer}>
              <Text style={styles.data}>{dataAtual}</Text>
              <Text style={styles.vistoriaAtiva}>
                {vistoriaAtiva?.titulo ?? "Nenhum vistoria selecionada"}
              </Text>
            </View>
          </View>

          <View style={styles.acao}>
            <BotaoConcluirVistoria possuiVistoriaAtiva={possuiVistoriaAtiva} />
          </View>

          {possuiVistoriaAtiva ? (
            <View style={styles.resumo}>
              <Text style={styles.resumoTitulo}>Resumo da vistoria</Text>
              <Text style={styles.resumoDescricao}>
                Nenhum dado disponível.
              </Text>
              <Text style={styles.resumoComplemento}>
                As informações serão exibidas nesta área.
              </Text>
            </View>
          ) : null}
        </ScrollView>

        <NavegacaoInferior />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  areaSegura: {
    backgroundColor: CoresVistoria.fundo,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  conteudo: {
    paddingBottom: 24,
  },
  cabecalho: {
    backgroundColor: CoresVistoria.superficie,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  marca: {
    color: CoresVistoria.marca,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  titulo: {
    color: CoresVistoria.titulo,
    fontSize: 30,
    fontWeight: "700",
    marginTop: 4,
  },
  descricao: {
    color: CoresVistoria.textoAuxiliar,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
  },
  informacoes: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  horario: {
    color: CoresVistoria.marca,
    fontSize: 56,
    fontVariant: ["tabular-nums"],
    fontWeight: "700",
    letterSpacing: -2,
  },
  dataContainer: {
    alignItems: "flex-end",
  },
  data: {
    color: CoresVistoria.marca,
    fontSize: 18,
    fontWeight: "700",
  },
  vistoriaAtiva: {
    color: CoresVistoria.titulo,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
    textAlign: "right",
  },
  acao: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  resumo: {
    backgroundColor: CoresVistoria.superficie,
    borderColor: CoresVistoria.borda,
    borderRadius: 16,
    borderWidth: 1,
    marginHorizontal: 24,
    marginTop: 24,
    padding: 24,
  },
  resumoTitulo: {
    color: CoresVistoria.titulo,
    fontSize: 20,
    fontWeight: "700",
  },
  resumoDescricao: {
    color: CoresVistoria.titulo,
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
  },
  resumoComplemento: {
    color: CoresVistoria.textoAuxiliar,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
});
