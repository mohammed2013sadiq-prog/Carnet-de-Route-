import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

function formatDate(value) {
if (!value) return '';
const parts = value.split(/[-/]/);
if (parts.length === 3) {
const year = parts[0];
const monthIndex = parseInt(parts[1], 10) - 1;
const day = parseInt(parts[2], 10);
const months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
return `${day} ${months[monthIndex]} ${year}`;
}
return value;
}

export function TripCard({ trip, onPress }) {
return (
<Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]} onPress={onPress}>
{trip.photo ? (
<Image source={{ uri: trip.photo }} style={styles.photo} />
) : (
<View style={styles.photoPlaceholder}>
<Ionicons name="image-outline" size={26} color={colors.white} />
</View>
)}
<View style={styles.content}>
<View style={styles.metaRow}>
<Text style={styles.destination}>{trip.destination}</Text>
<Text style={styles.date}>{formatDate(trip.startDate)}</Text>
</View>
<Text style={styles.title}>{trip.title}</Text>
<Text style={styles.range}>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</Text>
<View style={styles.footer}>
<Text style={styles.notes} numberOfLines={1}>{trip.notes || 'Aucune note pour ce voyage'}</Text>
<Ionicons name="arrow-forward" size={18} color={colors.terracotta} />
</View>
</View>
</Pressable>
);
}

const styles = StyleSheet.create({
card: { backgroundColor: colors.white, borderRadius: 18, overflow: 'hidden', marginBottom: 16, borderWidth: 1, borderColor: colors.line },
pressed: { opacity: 0.84 },
photo: { height: 118, width: '100%' },
photoPlaceholder: { height: 118, backgroundColor: colors.sage, alignItems: 'center', justifyContent: 'center' },
content: { padding: 14 },
metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
destination: { color: colors.terracotta, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.6 },
date: { color: colors.muted, fontSize: 11 },
title: { color: colors.ink, fontSize: 19, fontWeight: '800', marginTop: 7 },
range: { color: colors.muted, fontSize: 12, marginTop: 5 },
footer: { flexDirection: 'row', alignItems: 'center', marginTop: 14 },
notes: { color: colors.muted, flex: 1, fontSize: 12, marginRight: 8 },
});
