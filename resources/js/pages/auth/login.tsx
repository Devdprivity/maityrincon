import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { 
    Eye, 
    EyeOff, 
    Mail, 
    Lock, 
    ArrowLeft,
    User
} from 'lucide-react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    // Cargar la imagen de fondo antes de mostrar el formulario
    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setIsBackgroundLoaded(true);
        };
        img.src = '/img/IMG_1580.jpg';
    }, []);

    return (
        <>
            <Head title="Iniciar Sesión - Psicología Clínica" />
            
            <div className="min-h-screen relative overflow-hidden">
                {/* Imagen de Fondo */}
                <div className="absolute inset-0 z-0">
                    <div 
                        className={`w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-500 ${
                            isBackgroundLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{ backgroundImage: 'url(/img/IMG_1580.jpg)' }}
                    ></div>
                    {/* Overlay con gradiente pastel mejorado */}
                    <div className="absolute inset-0 bg-black/30"></div>
                    
                    {/* Elementos decorativos flotantes */}
                    <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200/20 rounded-full floating-animation"></div>
                    <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200/20 rounded-full floating-animation" style={{animationDelay: '2s'}}></div>
                    <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-blue-200/20 rounded-full floating-animation" style={{animationDelay: '4s'}}></div>
                    <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-green-200/20 rounded-full floating-animation" style={{animationDelay: '1s'}}></div>
                </div>

                {/* Loading Screen */}
                {!isBackgroundLoaded && (
                    <div className="absolute inset-0 z-20 bg-gradient-to-br from-sage/90 to-teal/90 flex items-center justify-center">
                        <div className="text-center">
                            <div className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg p-2">
                                <img 
                                    src="/img/logonegro.png" 
                                    alt="Logo" 
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                            <p className="text-white text-lg font-medium">Cargando...</p>
                        </div>
                    </div>
                )}

                {/* Contenido Principal */}
                <div className={`relative z-10 min-h-screen flex items-center py-12 px-4 sm:px-6 lg:px-8 transition-opacity duration-500 ${
                    isBackgroundLoaded ? 'opacity-100' : 'opacity-0'
                }`}>
                    {/* Desktop: Formulario a la izquierda */}
                    <div className="hidden lg:flex lg:items-center lg:justify-start lg:w-1/2 lg:pl-8">
                        <div className="max-w-md w-full space-y-8">
                        {/* Botón Volver */}
                        <div className="flex justify-start">
                            <a
                                href="/"
                                className="inline-flex items-center transition-colors font-medium"
                                style={{ color: '#f2e7dd' }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#e05353'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#f2e7dd'}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Volver al inicio
                            </a>
                        </div>

                        {/* Card de Login */}
                        <div className="glass-effect rounded-3xl shadow-2xl p-8 border border-sage/30 backdrop-blur-lg">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg p-2">
                                    <img 
                                        src="/img/logonegro.png" 
                                        alt="Logo" 
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <h2 className="text-4xl font-light text-white mb-3">
                                    Bienvenida de vuelta
                                </h2>
                                <p className="text-white font-medium text-lg">
                                    Psicología Clínica Profesional
                                </p>
                            </div>

                            {/* Formulario */}
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                                        Correo Electrónico
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 color-sage" />
                                        </div>
                                        <input
                                            id="email-desktop"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="appearance-none relative block w-full pl-12 pr-3 py-4 border border-sage/50 rounded-2xl placeholder-sage/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage focus:z-10 sm:text-sm bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/90"
                                            placeholder="tu@email.com"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                {/* Password */}
                                <div>
                                    <label htmlFor="password-desktop" className="block text-sm font-medium text-white mb-2">
                                        Contraseña
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 color-sage" />
                                        </div>
                                        <input
                                    id="password-desktop"
                                    name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            autoComplete="current-password"
                                    required
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="appearance-none relative block w-full pl-12 pr-12 py-4 border border-sage/50 rounded-2xl placeholder-sage/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage focus:z-10 sm:text-sm bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/90"
                                            placeholder="Tu contraseña"
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                            <button
                                                type="button"
                                                className="color-sage hover:color-teal transition-colors"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5" />
                                                ) : (
                                                    <Eye className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                                    )}
                            </div>

                                {/* Remember Me */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                    id="remember-desktop"
                                    name="remember"
                                            type="checkbox"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            className="h-4 w-4 color-sage focus:ring-sage/30 border-sage/50 rounded"
                                        />
                                        <label htmlFor="remember" className="ml-2 block text-sm text-white">
                                            Recordarme
                                        </label>
                                    </div>

                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-white hover:text-teal-400 transition-colors">
                                            ¿Olvidaste tu contraseña?
                                        </a>
                                    </div>
                            </div>

                                {/* Submit Button */}
                                <div>
                                    <button
                                type="submit"
                                disabled={processing}
                                        className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-lg font-medium rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                                        style={{ backgroundColor: '#5f0a3c' }}
                                        onMouseEnter={(e) => {
                                            if (!processing) {
                                                e.currentTarget.style.backgroundColor = '#706363';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!processing) {
                                                e.currentTarget.style.backgroundColor = '#5f0a3c';
                                            }
                                        }}
                                    >
                                        <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                                            <User className="h-6 w-6 text-white group-hover:rotate-12 transition-transform duration-300" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7), 0 0 6px rgba(0,0,0,0.5)' }} />
                                        </span>
                                        <span className="flex items-center" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7), 0 0 6px rgba(0,0,0,0.5)' }}>
                                            {processing ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                                    Iniciando sesión...
                                                </>
                                            ) : (
                                                'Iniciar Sesión'
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </form>

                        </div>

                        {/* Elementos Decorativos */}
                        <div className="absolute top-20 left-10 w-20 h-20 bg-sage/20 rounded-full animate-pulse"></div>
                        <div className="absolute top-40 right-20 w-16 h-16 bg-teal/20 rounded-full animate-pulse delay-1000"></div>
                        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-terracotta/20 rounded-full animate-pulse delay-2000"></div>
                        <div className="absolute bottom-40 right-1/3 w-14 h-14 bg-sage/20 rounded-full animate-pulse delay-500"></div>
                        </div>
                    </div>

                    {/* Mobile: Formulario centrado */}
                    <div className="lg:hidden flex items-center justify-center w-full">
                        <div className="max-w-md w-full space-y-8">
                            {/* Botón Volver */}
                            <div className="flex justify-start">
                                <a
                                    href="/"
                                    className="inline-flex items-center transition-colors font-medium"
                                    style={{ color: '#f2e7dd' }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#e05353'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#f2e7dd'}
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Volver al inicio
                                </a>
                            </div>

                            {/* Card de Login */}
                            <div className="glass-effect rounded-3xl shadow-2xl p-8 border border-sage/30 backdrop-blur-lg">
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <div className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg p-2">
                                        <img 
                                            src="/img/logonegro.png" 
                                            alt="Logo" 
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <h2 className="text-4xl font-light text-white mb-3">
                                        Bienvenida de vuelta
                                    </h2>
                                    <p className="text-white font-medium text-lg">
                                        Psicología Clínica Profesional
                                    </p>
                                   
                                </div>

                                {/* Formulario */}
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email-mobile" className="block text-sm font-medium text-white mb-2">
                                            Correo Electrónico
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 color-sage" />
                                            </div>
                                            <input
                                                id="email-mobile"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="appearance-none relative block w-full pl-12 pr-3 py-4 border border-sage/50 rounded-2xl placeholder-sage/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage focus:z-10 sm:text-sm bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/90"
                                                placeholder="tu@email.com"
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                                        )}
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label htmlFor="password-mobile" className="block text-sm font-medium text-white mb-2">
                                            Contraseña
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 color-sage" />
                                            </div>
                                            <input
                                                id="password-mobile"
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                autoComplete="current-password"
                                                required
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                className="appearance-none relative block w-full pl-12 pr-12 py-4 border border-sage/50 rounded-2xl placeholder-sage/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage focus:z-10 sm:text-sm bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/90"
                                                placeholder="Tu contraseña"
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                <button
                                                    type="button"
                                                    className="color-sage hover:color-teal transition-colors"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-5 w-5" />
                                                    ) : (
                                                        <Eye className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        {errors.password && (
                                            <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                                        )}
                                    </div>

                                    {/* Remember Me */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                id="remember-mobile"
                                                name="remember"
                                                type="checkbox"
                                                checked={data.remember}
                                                onChange={(e) => setData('remember', e.target.checked)}
                                                className="h-4 w-4 color-sage focus:ring-sage/30 border-sage/50 rounded"
                                            />
                                            <label htmlFor="remember-mobile" className="ml-2 block text-sm text-white">
                                                Recordarme
                                            </label>
                                        </div>

                                        <div className="text-sm">
                                            <a href="#" className="font-medium text-white hover:text-teal-400 transition-colors">
                                                ¿Olvidaste tu contraseña?
                                            </a>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-lg font-medium rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                                            style={{ backgroundColor: '#5f0a3c' }}
                                            onMouseEnter={(e) => {
                                                if (!processing) {
                                                    e.currentTarget.style.backgroundColor = '#706363';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!processing) {
                                                    e.currentTarget.style.backgroundColor = '#5f0a3c';
                                                }
                                            }}
                                        >
                                            <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                                                <User className="h-6 w-6 text-white group-hover:rotate-12 transition-transform duration-300" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7), 0 0 6px rgba(0,0,0,0.5)' }} />
                                            </span>
                                            <span className="flex items-center" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7), 0 0 6px rgba(0,0,0,0.5)' }}>
                                                {processing ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                                        Iniciando sesión...
                                                    </>
                                                ) : (
                                                    'Iniciar Sesión'
                                                )}
                                            </span>
                                        </button>
                                    </div>
                                </form>

                                {/* Footer */}
                              
                            </div>

                            {/* Elementos Decorativos */}
                            <div className="absolute top-20 left-10 w-20 h-20 bg-sage/20 rounded-full animate-pulse"></div>
                            <div className="absolute top-40 right-20 w-16 h-16 bg-teal/20 rounded-full animate-pulse delay-1000"></div>
                            <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-terracotta/20 rounded-full animate-pulse delay-2000"></div>
                            <div className="absolute bottom-40 right-1/3 w-14 h-14 bg-sage/20 rounded-full animate-pulse delay-500"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}