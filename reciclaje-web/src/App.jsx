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

    const [error, setError] =
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


    const manejarSubmit = (e) => {

        e.preventDefault();

        console.log({
            nombre,
            sector,
            material,
            capacidad
        });
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

                <h2>
                    Registrar nuevo punto
                </h2>


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
                            value={nombre}
                            onChange={(e) =>
                                setNombre(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="sector">
                            Sector
                        </label>

                        <input
                            id="sector"
                            type="text"
                            value={sector}
                            onChange={(e) =>
                                setSector(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="material">
                            Material
                        </label>

                        <input
                            id="material"
                            type="text"
                            value={material}
                            onChange={(e) =>
                                setMaterial(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="capacidad">
                            Capacidad
                        </label>

                        <input
                            id="capacidad"
                            type="number"
                            min="1"
                            value={capacidad}
                            onChange={(e) =>
                                setCapacidad(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>


                    <button
                        className="btn-registrar"
                        type="submit"
                    >
                        Registrar Punto
                    </button>

                </form>

            </section>


            <section className="listado-section">

                <div className="listado-header">

                    <h2>
                        Puntos registrados
                    </h2>

                    <span>
                        Total: {puntos.length}
                    </span>

                </div>


                {error && (

                    <p className="mensaje-error">
                        {error}
                    </p>

                )}


                {cargando ? (

                    <p>
                        Cargando puntos...
                    </p>

                ) : puntos.length === 0 ? (

                    <p className="sin-registros">
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