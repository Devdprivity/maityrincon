<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultados de tu evaluación</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f2e7dd; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f2e7dd;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%;">

                    {{-- Header --}}
                    <tr>
                        <td style="background: linear-gradient(135deg, #5f0a3c, #e05353); border-radius: 20px 20px 0 0; padding: 40px 30px; text-align: center;">
                            <h1 style="color: #f2e7dd; font-size: 24px; font-weight: 300; margin: 0 0 8px 0;">Psic. Maity Rincón</h1>
                            <p style="color: rgba(242, 231, 221, 0.85); font-size: 14px; margin: 0;">Psicólogo Clínico</p>
                        </td>
                    </tr>

                    {{-- Body --}}
                    <tr>
                        <td style="background-color: #ffffff; padding: 40px 30px;">

                            {{-- Saludo --}}
                            <p style="color: #5f0a3c; font-size: 20px; font-weight: 300; margin: 0 0 20px 0;">
                                Hola {{ $test->name }},
                            </p>
                            <p style="color: #706363; font-size: 15px; line-height: 1.6; margin: 0 0 30px 0;">
                                Gracias por completar el <strong>{{ $testName }}</strong>. A continuación encontrarás un resumen de tus resultados.
                            </p>

                            {{-- Resultado --}}
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
                                <tr>
                                    <td style="background: linear-gradient(135deg, #98ada4, #e05353); border-radius: 16px; padding: 30px; text-align: center;">
                                        <p style="color: rgba(255,255,255,0.9); font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px 0;">Tu puntuación</p>
                                        <p style="color: #ffffff; font-size: 48px; font-weight: 700; margin: 0 0 8px 0;">{{ $test->score }}</p>
                                        <p style="color: #ffffff; font-size: 18px; font-weight: 500; margin: 0;">{{ $test->interpretation }}</p>
                                    </td>
                                </tr>
                            </table>

                            {{-- Detalles --}}
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
                                <tr>
                                    <td style="background-color: #f2e7dd; border-radius: 12px; padding: 20px;">
                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td style="padding: 8px 0; color: #706363; font-size: 14px; border-bottom: 1px solid rgba(112,99,99,0.15);">
                                                    <strong style="color: #5f0a3c;">Test:</strong>
                                                </td>
                                                <td style="padding: 8px 0; color: #706363; font-size: 14px; text-align: right; border-bottom: 1px solid rgba(112,99,99,0.15);">
                                                    {{ $testName }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #706363; font-size: 14px; border-bottom: 1px solid rgba(112,99,99,0.15);">
                                                    <strong style="color: #5f0a3c;">Fecha:</strong>
                                                </td>
                                                <td style="padding: 8px 0; color: #706363; font-size: 14px; text-align: right; border-bottom: 1px solid rgba(112,99,99,0.15);">
                                                    {{ $test->completed_at->format('d/m/Y \a \l\a\s h:i A') }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #706363; font-size: 14px;">
                                                    <strong style="color: #5f0a3c;">Resultado:</strong>
                                                </td>
                                                <td style="padding: 8px 0; color: #706363; font-size: 14px; text-align: right;">
                                                    {{ $test->interpretation }}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            {{-- Recomendaciones --}}
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
                                <tr>
                                    <td style="border-left: 4px solid #98ada4; padding: 16px 20px; background-color: #faf7f4; border-radius: 0 12px 12px 0;">
                                        <p style="color: #5f0a3c; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">Recomendación personalizada:</p>
                                        <p style="color: #706363; font-size: 14px; line-height: 1.6; margin: 0;">{{ $recommendations }}</p>
                                    </td>
                                </tr>
                            </table>

                            {{-- Disclaimer --}}
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
                                <tr>
                                    <td style="border: 2px solid #e05353; border-radius: 12px; padding: 16px 20px;">
                                        <p style="color: #e05353; font-size: 13px; font-weight: 600; margin: 0 0 6px 0;">Importante:</p>
                                        <p style="color: #706363; font-size: 13px; line-height: 1.5; margin: 0;">
                                            Este test es una herramienta de orientación inicial y no sustituye una evaluación clínica profesional. Los resultados deben ser interpretados por un profesional de la salud mental en el contexto de una evaluación integral.
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            {{-- CTA --}}
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center">
                                        <p style="color: #706363; font-size: 15px; margin: 0 0 20px 0;">
                                            ¿Te gustaría profundizar en estos resultados?
                                        </p>
                                        <a href="https://wa.me/584246287530?text=Hola%20Maity%2C%20acabo%20de%20completar%20el%20{{ urlencode($testName) }}%20y%20me%20gustar%C3%ADa%20agendar%20una%20cita."
                                           style="display: inline-block; background: linear-gradient(135deg, #98ada4, #e05353); color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 50px; font-size: 15px; font-weight: 600;">
                                            Agendar una cita por WhatsApp
                                        </a>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    {{-- Footer --}}
                    <tr>
                        <td style="background-color: #5f0a3c; border-radius: 0 0 20px 20px; padding: 30px; text-align: center;">
                            <p style="color: #f2e7dd; font-size: 14px; font-weight: 500; margin: 0 0 8px 0;">Psic. Maity Rincón Reinberg</p>
                            <p style="color: rgba(242,231,221,0.7); font-size: 13px; margin: 0 0 4px 0;">Psicólogo Clínico | Maracaibo, Venezuela</p>
                            <p style="color: rgba(242,231,221,0.7); font-size: 13px; margin: 0 0 16px 0;">
                                <a href="tel:+584246287530" style="color: rgba(242,231,221,0.7); text-decoration: none;">+58 424 628 7530</a>
                            </p>
                            <p style="color: rgba(242,231,221,0.4); font-size: 11px; margin: 0;">
                                Este correo fue enviado porque completaste un test de evaluación en nuestro sitio web.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
