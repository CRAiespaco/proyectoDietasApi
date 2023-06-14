import { Link } from "react-router-dom"
function Post({ datos }) {
    let fecha = datos.fechaCreacion.split(" ")[0];
    return (
        <>
            <article className="post">
                <Link to={`/detallesReceta/${datos.id}`}><img src={datos.imagen} alt="" /></Link>
                <div className="text">
                    <Link to={`/detallesReceta/${datos.id}`}>{datos.nombre}</Link>
                    <div className="post-info">{fecha}</div>
                </div>
            </article>
        </>
    )
} export default Post;