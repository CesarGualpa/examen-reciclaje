import {
    useCallback,
    useEffect,
    useState
} from "react";

import PuntoCard
    from "./components/PuntoCard";

import { API_BASE_URL }
    from "./config/apiConfig";


function App() {

    const [nombre, setNombre] =
        useState("");

    const [sector, setSector] =
        useState("");

    const [material, setMaterial] =
        useState("");

    const [capacidad, setCapacidad] =
        useState("");


    const [puntos, setPuntos] =
        useState([]);

    const [cargando, setCargando] =
        useState(true);

    const [enviando, setEnviando] =
        useState(false);

    const [error, setError] =
        useState("");

    const [mensaje, setMensaje] =
        useState("");


    const cargarPuntos =
        useCallback(async () => {

            try {

                setCargando(true);

                setError("");

                const response =
                    await fetch(
                        `${API_BASE_URL}/api/puntos`
                    );

                if (!response.ok) {

                    throw new Error(
                        "No se pudieron cargar los puntos de reciclaje"
                    );
                }

                const datos =
                    await response.json();

                setPuntos(datos);

            } catch (error) {

                setError(
                    error.message
                );

            } finally {

                setCargando(false);
            }

        }, []);


    useEffect(() => {

        cargarPuntos();

    }, [cargarPuntos]);


    const manejarSubmit =
        async (e) => {

            e.preventDefault();

            setError("");
            setMensaje("");
            setEnviando(true);


            const nuevoPunto = {

                nombre:
                    nombre.trim(),

                sector:
                    sector.trim(),

                material:
                    material.trim(),

                capacidad:
                    Number(capacidad)
            };


            try {

                const response =
                    await fetch(
                        `${API_BASE_URL}/api/puntos`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    nuevoPunto
                                )
                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        "No se pudo registrar el punto de reciclaje"
                    );
                }


                const puntoCreado =
                    await response.json();


                setMensaje(
                    `Punto "${puntoCreado.nombre}" registrado correctamente`
                );


                setNombre("");
                setSector("");
                setMaterial("");
                setCapacidad("");


                await cargarPuntos();


            } catch (error) {

                setError(
                    error.message
                );


            } finally {

                setEnviando(false);
            }
        };


    return (

        <main className="app-container">

            <header className="app-header">

                <p className="app-eyebrow">
                    Sistema urbano
                </p>

                <h1>
                    Puntos de Reciclaje
                </h1>

                <p>
                    Registro y consulta de puntos
                    disponibles en la ciudad.
                </p>

            </header>


            <section className="form-section">

                <div className="section-title">

                    <div>

                        <h2>
                            Registrar nuevo punto
                        </h2>

                        <p>
                            Completa los cuatro campos
                            solicitados.
                        </p>

                    </div>

                </div>


                <form
                    className="punto-form"
                    onSubmit={manejarSubmit}
                >

                    <div className="form-group">

                        <label htmlFor="nombre">
                            Nombre del punto
                        </label>

                        <input
                            id="nombre"
                            type="text"
                            placeholder="Ej. EcoEstación Norte"
                            value={nombre}
                            onChange={(e) =>
                                setNombre(
                                    e.target.value
                                )
                            }
                            disabled={enviando}
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="sector">
                            Sector o barrio
                        </label>

                        <input
                            id="sector"
                            type="text"
                            placeholder="Ej. La Floresta"
                            value={sector}
                            onChange={(e) =>
                                setSector(
                                    e.target.value
                                )
                            }
                            disabled={enviando}
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="material">
                            Material recibido
                        </label>

                        <input
                            id="material"
                            type="text"
                            placeholder="Ej. Plástico"
                            value={material}
                            onChange={(e) =>
                                setMaterial(
                                    e.target.value
                                )
                            }
                            disabled={enviando}
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="capacidad">
                            Capacidad disponible
                        </label>

                        <input
                            id="capacidad"
                            type="number"
                            min="1"
                            placeholder="Ej. 120"
                            value={capacidad}
                            onChange={(e) =>
                                setCapacidad(
                                    e.target.value
                                )
                            }
                            disabled={enviando}
                            required
                        />

                    </div>


                    <button
                        className="btn-registrar"
                        type="submit"
                        disabled={enviando}
                    >

                        {
                            enviando
                                ? "Registrando..."
                                : "Registrar Punto"
                        }

                    </button>

                </form>


                {mensaje && (

                    <p className="mensaje-exito">
                        {mensaje}
                    </p>

                )}


                {error && (

                    <p className="mensaje-error">
                        {error}
                    </p>

                )}

            </section>


            <section className="listado-section">

                <div className="listado-header">

                    <div>

                        <h2>
                            Puntos registrados
                        </h2>

                        <p>
                            Información almacenada
                            en PostgreSQL.
                        </p>

                    </div>


                    <span className="contador">
                        {puntos.length} puntos
                    </span>

                </div>


                {cargando ? (

                    <p className="estado-texto">
                        Cargando puntos...
                    </p>

                ) : puntos.length === 0 ? (

                    <p className="estado-texto">
                        No existen puntos registrados.
                    </p>

                ) : (

                    <div className="puntos-grid">

                        {puntos.map((punto) => (

                            <PuntoCard
                                key={punto.id}
                                punto={punto}
                            />

                        ))}

                    </div>

                )}

            </section>

        </main>
    );
}


export default App;