import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAddTrip } from '../src/hooks/useAddTrip';
import { colors } from '../src/constants/colors';

const fields = [
{ key: 'title', label: 'Titre du voyage', placeholder: 'Ex. Escapade dans le Sud' },
{ key: 'destination', label: 'Destination', placeholder: 'Ex. Dakhla, Sahara marocain' },
{ key: 'startDate', label: 'Date de début', placeholder: 'AAAA-MM-JJ' },
{ key: 'endDate', label: 'Date de fin', placeholder: 'AAAA-MM-JJ' },
];

export default function AddTripScreen() {
const { form, updateField, submit, saving, error, pickImage } = useAddTrip();

async function handleSubmit() {
if (await submit()) router.back();
}

return (
<ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
<View style={styles.top}><Pressable onPress={() => router.back()} style={styles.back}><Ionicons name="arrow-back" size={21} color={colors.ink} /></Pressable><Text style={styles.topTitle}>Nouveau voyage</Text><View style={{ width: 40 }} /></View>
<View style={styles.intro}><Text style={styles.eyebrow}>NOUVELLE PAGE</Text><Text style={styles.heading}>Un nouveau souvenir</Text><Text style={styles.subtitle}>Racontez ce voyage pendant qu'il est encore bien frais.</Text></View>
{fields.map((field) => <View style={styles.field} key={field.key}><Text style={styles.label}>{field.label}<Text style={styles.required}> *</Text></Text><TextInput value={form[field.key]} onChangeText={(value) => updateField(field.key, value)} placeholder={field.placeholder} placeholderTextColor="#A8ADA8" style={styles.input} autoCapitalize="sentences" /></View>)}
<View style={styles.field}><Text style={styles.label}>Notes & impressions</Text><TextInput value={form.notes} onChangeText={(value) => updateField('notes', value)} placeholder="Ce que vous voulez retenir..." placeholderTextColor="#A8ADA8" style={[styles.input, styles.notesInput]} multiline textAlignVertical="top" /></View>
<View style={styles.field}>
<Text style={styles.label}>Photos</Text>
{form.photo ? (
<View style={styles.photoPreviewContainer}>
<Image source={{ uri: form.photo }} style={styles.photoPreview} />
<Pressable style={styles.changePhotoBtn} onPress={pickImage}>
<Text style={styles.changePhotoText}>Changer la photo</Text>
</Pressable>
</View>
) : (
<Pressable style={styles.photoButton} onPress={pickImage}>
<View style={styles.photoIconBox}>
<Ionicons name="images-outline" size={24} color={colors.terracotta} />
</View>
<View style={styles.photoButtonTextContainer}>
<Text style={styles.photoButtonTitle}>Ajouter un carnet photo</Text>
<Text style={styles.photoButtonSub}>Vous pourrez associer vos clichés...</Text>
</View>
<Ionicons name="chevron-forward" size={20} color={colors.muted} />
</Pressable>
)}
</View>
{error ? <View style={styles.errorBox}><Ionicons name="alert-circle-outline" size={18} color={colors.danger} /><Text style={styles.error}>{error}</Text></View> : null}
<Pressable style={({ pressed }) => [styles.submit, pressed && styles.pressed]} onPress={handleSubmit} disabled={saving}><Ionicons name={saving ? 'hourglass-outline' : 'checkmark-circle-outline'} size={20} color={colors.white} /><Text style={styles.submitText}>{saving ? 'Enregistrement...' : 'Enregistrer ce voyage'}</Text></Pressable>
<Pressable onPress={() => router.back()} style={styles.cancel}><Text style={styles.cancelText}>Annuler</Text></Pressable>
</ScrollView>
);
}

const styles = StyleSheet.create({
screen: { flex: 1, backgroundColor: colors.paper }, content: { padding: 22, paddingTop: 55, paddingBottom: 42 },
top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, back: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' }, topTitle: { color: colors.ink, fontWeight: '800', fontSize: 16 },
intro: { marginTop: 28, marginBottom: 27 }, eyebrow: { color: colors.terracotta, fontSize: 11, fontWeight: '800', letterSpacing: 1.2 }, heading: { color: colors.ink, fontSize: 28, fontWeight: '800', marginTop: 7 }, subtitle: { color: colors.muted, lineHeight: 20, marginTop: 7 },
field: { marginBottom: 18 }, label: { color: colors.ink, fontSize: 13, fontWeight: '700', marginBottom: 8 }, required: { color: colors.terracotta }, input: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, borderRadius: 12, minHeight: 49, paddingHorizontal: 14, color: colors.ink, fontSize: 14 }, notesInput: { minHeight: 130, paddingTop: 14 }, photoButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: colors.line, marginTop: 4 }, photoIconBox: { width: 44, height: 44, backgroundColor: '#FFF0ED', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12 }, photoButtonTextContainer: { flex: 1 }, photoButtonTitle: { color: colors.ink, fontWeight: '700', fontSize: 14 }, photoButtonSub: { color: colors.muted, fontSize: 12, marginTop: 2 }, photoPreviewContainer: { borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white }, photoPreview: { width: '100%', height: 200 }, changePhotoBtn: { padding: 12, alignItems: 'center', borderTopWidth: 1, borderTopColor: colors.line }, changePhotoText: { color: colors.terracotta, fontWeight: '600' }, errorBox: { flexDirection: 'row', gap: 8, padding: 12, backgroundColor: '#F9E8E5', borderRadius: 11, marginBottom: 15 }, error: { color: colors.danger, flex: 1, fontSize: 12 }, submit: { height: 53, backgroundColor: colors.terracotta, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, marginTop: 5 }, pressed: { opacity: 0.8 }, submitText: { color: colors.white, fontWeight: '800', fontSize: 14 }, cancel: { alignItems: 'center', padding: 18 }, cancelText: { color: colors.muted, fontSize: 13 },
});
