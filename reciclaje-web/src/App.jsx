import { useState } from "react";


function App() {

    const [nombre, setNombre] =
        useState("");

    const [sector, setSector] =
        useState("");

    const [material, setMaterial] =
        useState("");

    const [capacidad, setCapacidad] =
        useState("");


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

        <main>

            <h1>
                Puntos de Reciclaje Urbano
            </h1>


            <form onSubmit={manejarSubmit}>

                <div>

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


                <div>

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


                <div>

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


                <div>

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


                <button type="submit">
                    Registrar Punto
                </button>

            </form>

        </main>
    );
}


export default App;