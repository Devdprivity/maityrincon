import { Head } from '@inertiajs/react'
import AuthSimpleLayout from '@/layouts/auth/auth-simple-layout'
import BeckDepressionTestForm from '@/components/Tests/BeckDepressionTestForm'

export default function BeckDepressionTest() {
    return (
        <AuthSimpleLayout>
            <Head title="Inventario de Depresión de Beck (BDI-II)" />
            <BeckDepressionTestForm />
        </AuthSimpleLayout>
    )
}
