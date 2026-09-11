import { Stack } from 'expo-router';
import { colors } from '../src/constants/colors';

export default function Layout() {
return (
<Stack screenOptions={{
headerShown: false,
contentStyle: { backgroundColor: colors.paper },
animation: 'slide_from_right',
}} />
);
}
