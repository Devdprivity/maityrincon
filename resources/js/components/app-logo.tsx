export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-white p-1">
                <img 
                    src="/img/logonegro.png" 
                    alt="Maity Rincón" 
                    className="size-6 object-contain"
                />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Maity Rincón
                </span>
            </div>
        </>
    );
}
