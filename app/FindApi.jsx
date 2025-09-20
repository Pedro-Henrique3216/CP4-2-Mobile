import { View, Text, FlatList, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../src/api/posts';

export default function MotivationalQuotes() {
  const { data, isLoading, error, isError, isFetching, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.center} />;
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Erro ao buscar a frase</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Frase Motivacional</Text>
      <View style={styles.item}>
        <Text style={styles.quote}>{data.q}</Text>
        <Text style={styles.author}>- {data.a}</Text>
      </View>

      <Text style={styles.refresh} onPress={refetch}>
        Clique aqui para outra frase
      </Text>

      {isFetching && <ActivityIndicator size="small" style={{ marginTop: 16 }} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f0f0f0' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 12,
  },
  quote: { fontSize: 18, fontStyle: 'italic', marginBottom: 8 },
  author: { fontSize: 16, fontWeight: 'bold', textAlign: 'right' },
  refresh: { color: 'blue', textAlign: 'center', marginTop: 12, textDecorationLine: 'underline' },
});