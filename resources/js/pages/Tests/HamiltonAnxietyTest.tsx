import { Head } from '@inertiajs/react'
import AuthSimpleLayout from '@/layouts/auth/auth-simple-layout'
import HamiltonAnxietyTestForm from '@/components/Tests/HamiltonAnxietyTestForm'

export default function HamiltonAnxietyTest() {
    return (
        <AuthSimpleLayout>
            <Head title="Test de Ansiedad de Hamilton" />
            <HamiltonAnxietyTestForm />
        </AuthSimpleLayout>
    )
}
