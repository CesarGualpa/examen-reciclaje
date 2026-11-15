function PuntoCard({ punto }) {

    return (

        <article className="punto-card">

            <div className="punto-card-header">

                <span className="punto-id">
                    Punto #{punto.id}
                </span>

                <span className="material-badge">
                    {punto.material}
                </span>

            </div>

            <h2>
                {punto.nombre}
            </h2>

            <div className="punto-info">

                <p>
                    <strong>
                        Sector:
                    </strong>{" "}
                    {punto.sector}
                </p>

                <p>
                    <strong>
                        Material:
                    </strong>{" "}
                    {punto.material}
                </p>

                <p>
                    <strong>
                        Capacidad:
                    </strong>{" "}
                    {punto.capacidad} unidades
                </p>

            </div>

        </article>
    );
}

export default PuntoCard;