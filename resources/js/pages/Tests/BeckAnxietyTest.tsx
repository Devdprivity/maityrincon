import { Head } from '@inertiajs/react'
import AuthSimpleLayout from '@/layouts/auth/auth-simple-layout'
import BeckAnxietyTestForm from '@/components/Tests/BeckAnxietyTestForm'

export default function BeckAnxietyTest() {
    return (
        <AuthSimpleLayout>
            <Head title="Inventario de Ansiedad de Beck (BAI)" />
            <BeckAnxietyTestForm />
        </AuthSimpleLayout>
    )
}
