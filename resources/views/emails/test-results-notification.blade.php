<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo test completado</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f2e7dd; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f2e7dd;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%;">

                    {{-- Header --}}
                    <tr>
                        <td style="background: linear-gradient(135deg, #5f0a3c, #98ada4); border-radius: 20px 20px 0 0; padding: 30px; text-align: center;">
                            <h1 style="color: #f2e7dd; font-size: 20px; font-weight: 300; margin: 0 0 6px 0;">Nuevo Test Completado</h1>
                            <p style="color: rgba(242, 231, 221, 0.85); font-size: 13px; margin: 0;">Notificación automática del sitio web</p>
                        </td>
                    </tr>

                    {{-- Body --}}
                    <tr>
                        <td style="background-color: #ffffff; padding: 35px 30px;">

                            <p style="color: #5f0a3c; font-size: 18px; font-weight: 300; margin: 0 0 20px 0;">
                                Hola Maity,
                            </p>
                            <p style="color: #706363; font-size: 15px; line-height: 1.6; margin: 0 0 25px 0;">
                                Un nuevo paciente ha completado un test de evaluación en tu sitio web. Aquí tienes los detalles:
                            </p>

                            {{-- Datos del paciente --}}
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 25px;">
                                <tr>
                                    <td style="background-color: #f2e7dd; border-radius: 12px; padding: 20px;">
                                        <p style="color: #5f0a3c; font-size: 14px; font-weight: 600; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px;">Datos del paciente</p>
                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td style="padding: 6px 0; color: #5f0a3c; font-size: 14px; font-weight: 600; width: 100px;">Nombre:</td>
                                                <td style="padding: 6px 0; color: #706363; font-size: 14px;">{{ $test->name }}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 6px 0; color: #5f0a3c; font-size: 14px; font-weight: 600;">Email:</td>
                                                <td style="padding: 6px 0; color: #706363; font-size: 14px;">
                                                    <a href="mailto:{{ $test->email }}" style="color: #e05353; text-decoration: none;">{{ $test->email }}</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 6px 0; color: #5f0a3c; font-size: 14px; font-weight: 600;">Fecha:</td>
                                                <td style="padding: 6px 0; color: #706363; font-size: 14px;">{{ $test->completed_at->format('d/m/Y \a \l\a\s h:i A') }}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            {{-- Resultado del test --}}
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 25px;">
                                <tr>
                                    <td style="background: linear-gradient(135deg, #98ada4, #e05353); border-radius: 16px; padding: 25px; text-align: center;">
                                        <p style="color: rgba(255,255,255,0.85); font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px 0;">{{ $testName }}</p>
                                        <p style="color: #ffffff; font-size: 44px; font-weight: 700; margin: 0 0 6px 0;">{{ $test->score }}</p>
                                        <p style="color: #ffffff; font-size: 16px; font-weight: 500; margin: 0;">{{ $test->interpretation }}</p>
                                    </td>
                                </tr>
                            </table>

                            {{-- Respuestas detalladas --}}
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 25px;">
                                <tr>
                                    <td style="border: 1px solid #e8e0d8; border-radius: 12px; padding: 20px;">
                                        <p style="color: #5f0a3c; font-size: 14px; font-weight: 600; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px;">Respuestas individuales</p>
                                        <p style="color: #706363; font-size: 13px; line-height: 1.8; margin: 0;">
                                            @foreach($test->responses as $index => $value)
                                                <span style="display: inline-block; background-color: {{ $value == 0 ? '#98ada4' : ($value == 1 ? '#d4b896' : ($value == 2 ? '#e09953' : '#e05353')) }}; color: #ffffff; padding: 2px 8px; border-radius: 6px; font-size: 12px; margin: 2px 1px; font-weight: 600;">P{{ $index + 1 }}: {{ $value }}</span>
                                            @endforeach
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            {{-- Resumen --}}
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="border-left: 4px solid #5f0a3c; padding: 12px 16px; background-color: #faf7f4; border-radius: 0 12px 12px 0;">
                                        <p style="color: #5f0a3c; font-size: 13px; font-weight: 600; margin: 0 0 4px 0;">Resumen:</p>
                                        <p style="color: #706363; font-size: 13px; line-height: 1.5; margin: 0;">
                                            {{ $test->name }} completó el {{ $testName }} obteniendo {{ $test->score }} puntos con resultado: <strong>{{ $test->interpretation }}</strong>.
                                        </p>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    {{-- Footer --}}
                    <tr>
                        <td style="background-color: #5f0a3c; border-radius: 0 0 20px 20px; padding: 20px 30px; text-align: center;">
                            <p style="color: rgba(242,231,221,0.5); font-size: 11px; margin: 0;">
                                Notificación automática generada por psicomaityrincon.com
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
