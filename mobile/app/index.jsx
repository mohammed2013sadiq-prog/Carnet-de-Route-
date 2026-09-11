import { useCallback, useState, useMemo } from 'react';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { TripCard } from '../src/components/TripCard';
import { useTrips } from '../src/hooks/useTrips';
import { colors } from '../src/constants/colors';

export default function TripListScreen() {
const { trips, loading, error, reload } = useTrips();
const [searchQuery, setSearchQuery] = useState('');

const filteredTrips = useMemo(() => {
if (!searchQuery) return trips;
return trips.filter(trip => 
(trip.destination && trip.destination.toLowerCase().includes(searchQuery.toLowerCase())) || 
(trip.title && trip.title.toLowerCase().includes(searchQuery.toLowerCase()))
);
}, [trips, searchQuery]);

useFocusEffect(useCallback(() => {
reload();
}, [reload]));

return (
<View style={styles.screen}>
<View style={styles.header}>
<View>
<Text style={styles.eyebrow}>CARNET DE ROUTE</Text>
<Text style={styles.heading}>Mes voyages</Text>
<Text style={styles.subtitle}>{trips.length} aventure{trips.length > 1 ? 's' : ''} dans vos archives</Text>
</View>
<View style={styles.avatar}><Text style={styles.avatarText}>NC</Text></View>
</View>

<View style={styles.toolbar}>
<View style={styles.search}>
<Ionicons name="search-outline" size={17} color={colors.muted} />
<TextInput 
style={styles.searchInput} 
placeholder="Rechercher une destination" 
placeholderTextColor={colors.muted}
value={searchQuery}
onChangeText={setSearchQuery}
/>
</View>
<Pressable style={styles.addButton} onPress={() => router.push('/add')} accessibilityLabel="Ajouter un voyage">
<Ionicons name="add" size={27} color={colors.white} />
</Pressable>
</View>

{loading && trips.length === 0 ? <View style={styles.center}><ActivityIndicator color={colors.terracotta} size="large" /></View> : null}
{error ? <View style={styles.errorBox}><Ionicons name="cloud-offline-outline" size={20} color={colors.danger} /><Text style={styles.error}>{error}</Text><Pressable onPress={reload}><Text style={styles.retry}>Réessayer</Text></Pressable></View> : null}
{!loading && !error && trips.length === 0 ? <View style={styles.empty}><Ionicons name="map-outline" size={42} color={colors.sage} /><Text style={styles.emptyTitle}>Votre carnet est vierge</Text><Text style={styles.emptyText}>Ajoutez votre premier voyage et gardez vos souvenirs au même endroit.</Text></View> : null}

<FlatList
data={filteredTrips}
keyExtractor={(trip) => String(trip.id)}
renderItem={({ item }) => <TripCard trip={item} onPress={() => router.push(`/trip/${item.id}`)} />}
contentContainerStyle={styles.list}
showsVerticalScrollIndicator={false}
refreshControl={<RefreshControl refreshing={loading} onRefresh={reload} tintColor={colors.terracotta} />}
/>
<View style={styles.bottomBar}><Ionicons name="map" size={20} color={colors.terracotta} /><Text style={styles.bottomActive}>Voyages</Text><Ionicons name="bookmark-outline" size={20} color={colors.muted} /><Text style={styles.bottomText}>Favoris</Text><Ionicons name="person-outline" size={20} color={colors.muted} /><Text style={styles.bottomText}>Profil</Text></View>
</View>
);
}

const styles = StyleSheet.create({
screen: { flex: 1, backgroundColor: colors.paper, paddingTop: 58 },
header: { paddingHorizontal: 22, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
eyebrow: { color: colors.terracotta, fontSize: 11, fontWeight: '800', letterSpacing: 1.3 },
heading: { color: colors.ink, fontSize: 31, fontWeight: '800', marginTop: 5 },
subtitle: { color: colors.muted, fontSize: 13, marginTop: 5 },
avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.sand, alignItems: 'center', justifyContent: 'center' },
avatarText: { color: colors.terracottaDark, fontSize: 12, fontWeight: '800' },
toolbar: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 22, marginTop: 22, marginBottom: 18 },
search: { height: 46, flex: 1, borderRadius: 13, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14 },
searchInput: { flex: 1, color: colors.ink, fontSize: 13, marginLeft: 8 },
addButton: { width: 46, height: 46, borderRadius: 15, backgroundColor: colors.terracotta, alignItems: 'center', justifyContent: 'center' },
list: { paddingHorizontal: 22, paddingBottom: 105 },
center: { paddingTop: 80 },
errorBox: { marginHorizontal: 22, padding: 14, borderRadius: 12, backgroundColor: '#F9E8E5', flexDirection: 'row', alignItems: 'center', gap: 8 },
error: { color: colors.danger, flex: 1, fontSize: 12 },
retry: { color: colors.danger, fontWeight: '800', fontSize: 12 },
empty: { alignItems: 'center', padding: 50, paddingHorizontal: 35 },
emptyTitle: { color: colors.ink, fontSize: 20, fontWeight: '800', marginTop: 15 },
emptyText: { color: colors.muted, textAlign: 'center', lineHeight: 20, marginTop: 8 },
bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 76, backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.line, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' },
bottomActive: { color: colors.terracotta, fontSize: 11, fontWeight: '800', marginLeft: -22 },
bottomText: { color: colors.muted, fontSize: 11, marginLeft: -22 },
});
