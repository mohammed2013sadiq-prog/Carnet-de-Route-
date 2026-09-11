import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useTripDetail } from '../../src/hooks/useTripDetail';
import { colors } from '../../src/constants/colors';

function formatDate(value) {
return value ? new Date(`${value}T12:00:00`).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }) : '';
}

export default function TripDetailScreen() {
const { id } = useLocalSearchParams();
const { trip, loading, error, reload } = useTripDetail(id);
if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={colors.terracotta} /></View>;
if (error || !trip) return <View style={styles.center}><Ionicons name="alert-circle-outline" size={35} color={colors.danger} /><Text style={styles.error}>{error || 'Voyage introuvable.'}</Text><Pressable onPress={reload}><Text style={styles.retry}>Réessayer</Text></Pressable></View>;

return <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
<View style={styles.top}><Pressable onPress={() => router.back()} style={styles.back}><Ionicons name="arrow-back" size={21} color={colors.ink} /></Pressable><Text style={styles.topTitle}>Détail du voyage</Text><Pressable style={styles.share}><Ionicons name="share-outline" size={20} color={colors.ink} /></Pressable></View>
<View style={styles.hero}>
{trip.photo ? (
<ImageBackground source={{ uri: trip.photo }} style={styles.heroBg} imageStyle={{ opacity: 0.8 }} resizeMode="cover">
<View style={styles.heroOverlay}><Text style={styles.heroDestination}>{trip.destination}</Text><Text style={styles.heroTitle}>{trip.title}</Text></View>
</ImageBackground>
) : (
<>
<View style={styles.heroIcon}><Ionicons name="image-outline" size={30} color={colors.white} /></View>
<View style={styles.heroOverlay}><Text style={styles.heroDestination}>{trip.destination}</Text><Text style={styles.heroTitle}>{trip.title}</Text></View>
</>
)}
</View>
<View style={styles.dateCard}><View style={styles.dateItem}><Text style={styles.dateLabel}>DÉPART</Text><Text style={styles.dateValue}>{formatDate(trip.startDate)}</Text></View><View style={styles.divider} /><View style={styles.dateItem}><Text style={styles.dateLabel}>RETOUR</Text><Text style={styles.dateValue}>{formatDate(trip.endDate)}</Text></View></View>
<View style={styles.section}><View style={styles.sectionTitleRow}><Text style={styles.sectionTitle}>Notes & impressions</Text><Ionicons name="create-outline" size={18} color={colors.terracotta} /></View><Text style={styles.notes}>{trip.notes || 'Aucune impression ajoutée pour ce voyage.'}</Text></View>
<View style={styles.section}><Text style={styles.sectionTitle}>Souvenirs clés</Text><View style={styles.memoryRow}><View style={styles.memoryIcon}><Ionicons name="location-outline" size={18} color={colors.terracotta} /></View><View><Text style={styles.memoryTitle}>Une nouvelle étape</Text><Text style={styles.memoryText}>Votre carnet garde la trace de cette aventure.</Text></View></View></View>
<Pressable style={styles.backButton} onPress={() => router.back()}><Ionicons name="arrow-back" size={17} color={colors.white} /><Text style={styles.backButtonText}>Retour à mes voyages</Text></Pressable>
</ScrollView>;
}

const styles = StyleSheet.create({
screen: { flex: 1, backgroundColor: colors.paper }, content: { padding: 22, paddingTop: 55, paddingBottom: 42 }, top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }, back: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' }, share: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }, topTitle: { color: colors.ink, fontWeight: '800', fontSize: 16 }, hero: { height: 215, borderRadius: 19, overflow: 'hidden', backgroundColor: colors.sage, justifyContent: 'flex-end' }, heroBg: { width: '100%', height: '100%', justifyContent: 'flex-end' }, heroIcon: { position: 'absolute', top: 78, left: 0, right: 0, alignItems: 'center' }, heroOverlay: { padding: 18, backgroundColor: 'rgba(37,49,47,0.58)' }, heroDestination: { color: colors.sand, textTransform: 'uppercase', fontSize: 11, fontWeight: '800', letterSpacing: 1 }, heroTitle: { color: colors.white, fontSize: 22, fontWeight: '800', marginTop: 4 }, dateCard: { backgroundColor: colors.white, borderRadius: 15, marginTop: 14, padding: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderWidth: 1, borderColor: colors.line }, dateItem: { flex: 1 }, divider: { width: 1, height: 34, backgroundColor: colors.line }, dateLabel: { color: colors.terracotta, fontSize: 10, fontWeight: '800', letterSpacing: 1 }, dateValue: { color: colors.ink, fontSize: 13, fontWeight: '700', marginTop: 6 }, section: { backgroundColor: colors.white, borderRadius: 15, padding: 17, marginTop: 14, borderWidth: 1, borderColor: colors.line }, sectionTitleRow: { flexDirection: 'row', justifyContent: 'space-between' }, sectionTitle: { color: colors.ink, fontSize: 16, fontWeight: '800' }, notes: { color: colors.muted, fontSize: 14, lineHeight: 22, marginTop: 13 }, memoryRow: { flexDirection: 'row', alignItems: 'center', marginTop: 15, gap: 11 }, memoryIcon: { width: 35, height: 35, borderRadius: 18, backgroundColor: colors.sageLight, alignItems: 'center', justifyContent: 'center' }, memoryTitle: { color: colors.ink, fontWeight: '700', fontSize: 13 }, memoryText: { color: colors.muted, fontSize: 11, marginTop: 3 }, backButton: { height: 50, borderRadius: 14, backgroundColor: colors.terracotta, marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }, backButtonText: { color: colors.white, fontWeight: '800' }, center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30, backgroundColor: colors.paper }, error: { color: colors.danger, textAlign: 'center', marginTop: 12 }, retry: { color: colors.terracotta, fontWeight: '800', marginTop: 12 },
});
