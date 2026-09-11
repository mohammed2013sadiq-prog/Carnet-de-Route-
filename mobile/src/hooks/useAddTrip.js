import { useState } from 'react';
import { createTrip } from '../services/apiService';
import * as ImagePicker from 'expo-image-picker';

const initialForm = {
  title: '',
  destination: '',
  startDate: '',
  endDate: '',
  notes: '',
  photo: null,
};

export function useAddTrip() {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets[0]) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      updateField('photo', base64Image);
    }
  }

  async function submit() {
    setError('');
    if (!form.title || !form.destination || !form.startDate || !form.endDate) {
      setError('Complete les quatre champs obligatoires.');
      return false;
    }
    setSaving(true);
    try {
      await createTrip(form);
      return true;
    } catch (saveError) {
      setError(saveError.message);
      return false;
    } finally {
      setSaving(false);
    }
  }

  return { form, updateField, submit, saving, error, pickImage };
}
