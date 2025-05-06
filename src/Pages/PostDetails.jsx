import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const posts = [
    {
        id: 1,
        title: "5 consejos para reciclar mejor desde casa",
        content: `
            <p><strong>1. Separa correctamente los residuos</strong><br/>
                Usa diferentes cubos o bolsas para separar plásticos, vidrios, papel/cartón, materia orgánica y desechos no reciclables. Etiquetarlos puede ayudarte a no confundirte.</p>
            
            <p><strong>2. Limpia los envases antes de tirarlos</strong><br/>
                Los restos de comida o líquidos pueden contaminar materiales reciclables. Un enjuague rápido con agua es suficiente para asegurarte de que todo pueda reciclarse correctamente.</p>

            <p><strong>3. Aplasta lo que puedas</strong><br/>
                Botellas de plástico, bricks y cajas pueden ocupar mucho espacio. Aplástalos para que quepan más cosas en el contenedor y se optimice el transporte.</p>

            <p><strong>4. Infórmate sobre lo que se puede reciclar en tu zona</strong><br/>
                Cada municipio puede tener normas diferentes. Consulta la web de tu ayuntamiento o centros de reciclaje para saber exactamente qué se recoge y cómo.</p>

            <p><strong>5. Hazlo parte de tu rutina diaria</strong><br/>
                Coloca los cubos de reciclaje en lugares visibles y accesibles, como la cocina o el lavadero. Si lo tienes fácil, lo harás sin darte cuenta.</p>

            <p>🌱 <strong>Recuerda:</strong> cada pequeño gesto suma. Si todos reciclamos mejor desde casa, el impacto colectivo será enorme.</p>
        `,
        image: "/slider6.jpg",
        date: "17 Mayo 2025",
    },
    {
        id: 2,
        title: "Cómo hacer manualidades con productos reciclados",
        content: `
            <p><strong>Las manualidades con materiales reciclados no solo son una excelente manera de reutilizar objetos que de otro modo terminarían en la basura, sino que también fomentan la creatividad y la conciencia ambiental. Aquí te damos algunas ideas fáciles y divertidas para comenzar a crear:</strong></p>

            <p><strong>1. Reciclar botellas de plástico para hacer macetas decorativas</strong><br/>
                Las botellas de plástico pueden ser reutilizadas para hacer pequeñas macetas decorativas para tu hogar. Solo tienes que cortarlas por la mitad, pintarlas y añadirle tierra y plantas. Si las decoras con pintura o cintas, ¡quedarán perfectas para regalar o decorar tu hogar!</p>

            <p><strong>2. Crear un marco de fotos con cartón reciclado</strong><br/>
                Con una caja de cartón o cualquier otro tipo de cartón que tengas a mano, puedes hacer un marco de fotos único. Recorta el cartón en la forma deseada, píntalo, y agrega detalles como botones, tela o papel reciclado para darle un toque personal.</p>

            <p><strong>3. Hacer una lámpara con tarros de cristal</strong><br/>
                Los tarros de cristal (como los de mermelada) pueden convertirse en originales lámparas o faroles. Solo tienes que colocar una vela en el interior, o incluso una luz LED para hacerla más segura, y decorar el exterior con cuerda, pintura o trozos de tela reciclada.</p>

            <p><strong>4. Reutilizar latas de aluminio para hacer organizadores</strong><br/>
                Las latas de aluminio, como las de refrescos, pueden convertirse en útiles organizadores. Píntalas y pégalas a una base de madera o cartón, para crear un organizador de escritorio, de baño o para tus utensilios de cocina.</p>

            <p><strong>5. Hacer adornos navideños con CDs viejos</strong><br/>
                Los viejos CDs o DVDs pueden tener una nueva vida como adornos navideños. Solo tienes que decorarlos con pinturas brillantes, purpurina, cintas o pegarle pequeños adornos. Puedes colgarlos en el árbol de Navidad o usarlos como guirnaldas.</p>

            <p><strong>🌍 Recuerda:</strong> El reciclaje creativo no solo reduce los desechos, sino que también te permite crear artículos útiles y decorativos con objetos que, de otro modo, habrían terminado en el vertedero. ¡Pon en práctica tu creatividad y haz del reciclaje una parte divertida de tu vida!</p>
        `,
        image: "/manualidades.jpg",
        date: "30 Abril 2025",
    },
    {
        id: 3,
        title: "Reciclaje tecnológico: ¿qué hacer con tus aparatos viejos?",
        content: `
        <p>El reciclaje de aparatos tecnológicos es crucial para reducir la contaminación y aprovechar los recursos que estos dispositivos contienen. Si tienes viejos teléfonos, computadoras o electrodomésticos en casa, aquí te dejamos algunas ideas sobre qué hacer con ellos para contribuir al cuidado del medio ambiente:</p>
        
        <p><strong>1. No los tires a la basura</strong><br/>
        Muchos aparatos electrónicos contienen materiales peligrosos, como mercurio y plomo, que pueden contaminar el medio ambiente si se tiran incorrectamente. Es importante no desecharlos en la basura común.</p>
        
        <p><strong>2. Lleva tus dispositivos a puntos de reciclaje</strong><br/>
        La mayoría de las ciudades cuentan con puntos de reciclaje especializados donde puedes dejar tus aparatos electrónicos para que sean tratados adecuadamente. Estos centros desmantelan los dispositivos y recuperan materiales valiosos como metales, plásticos y vidrio.</p>
        
        <p><strong>3. Reciclaje mediante programas de devolución</strong><br/>
        Muchas marcas y empresas ofrecen programas de devolución donde puedes entregar tus viejos aparatos a cambio de descuentos en productos nuevos. Algunos fabricantes de tecnología también se encargan de reciclar sus propios productos de manera responsable.</p>
        
        <p><strong>4. Dona o vende si siguen funcionando</strong><br/>
        Si tus aparatos aún están en funcionamiento, puedes donar o vender dispositivos electrónicos que no necesitas. Muchas organizaciones sin fines de lucro aceptan productos electrónicos usados y los reparan para darles una segunda vida.</p>
        
        <p><strong>5. Haz algo creativo: reutiliza los componentes</strong><br/>
        Si te gusta el bricolaje, puedes reutilizar las piezas de tus dispositivos viejos para hacer manualidades o proyectos de arte. Las pantallas viejas, los teclados y las baterías pueden convertirse en algo completamente nuevo con un poco de creatividad.</p>
        
        <p>🌍 <strong>Recuerda:</strong> el reciclaje de dispositivos electrónicos no solo ayuda a reducir la contaminación, sino que también contribuye a la conservación de recursos naturales. Asegúrate de deshacerte de tus viejos dispositivos de la forma más responsable posible.</p>
    `,        
    image: "/paratos_electronicos.jpg",
        date: "21 Abril 2025",
    },
    {
        id: 4,
        title: "Moda sostenible: dale una segunda vida a tu ropa",
        content: `
            <p>La moda sostenible es un movimiento que busca reducir el impacto ambiental de la industria textil, que es una de las más contaminantes del mundo. A través de prácticas responsables, podemos prolongar la vida útil de nuestra ropa y reducir la cantidad de desechos. Aquí te mostramos algunas formas de darle una segunda vida a tu ropa:</p>
        
            <p><strong>1. Rediseña y transforma tu ropa vieja</strong><br/>
                Si tienes prendas que ya no usas, puedes transformarlas en algo nuevo. Cambiar el corte, agregar parches, bordados o incluso pintar tu ropa pueden ser maneras de hacerla más atractiva y personalizada.</p>
        
            <p><strong>2. Recicla o dona tus prendas</strong><br/>
                Si tus prendas están demasiado gastadas o ya no las puedes usar, es mejor donarlas o reciclarlas. Muchas organizaciones aceptan ropa usada para darle una segunda oportunidad a alguien que lo necesite. Algunas marcas también tienen programas de reciclaje de ropa.</p>
        
            <p><strong>3. Compra ropa de segunda mano</strong><br/>
                La ropa de segunda mano está ganando popularidad. Comprar ropa de segunda mano no solo ahorra dinero, sino que también reduce la demanda de producción de nuevas prendas, lo cual tiene un impacto positivo en el medio ambiente.</p>
        
            <p><strong>4. Elige marcas que promuevan la moda ética</strong><br/>
            Si necesitas comprar ropa nueva, busca marcas que utilicen materiales sostenibles y que promuevan prácticas de comercio justo. Asegúrate de que la marca tenga un compromiso con el bienestar de los trabajadores y el respeto por el medio ambiente.</p>
        
            <p><strong>5. Aprende a cuidar bien tu ropa</strong><br/>
                Alargar la vida útil de las prendas es una manera sencilla de ser más sostenible. Lava la ropa a bajas temperaturas, evita el uso excesivo de la secadora y repara la ropa cuando se desgasta en lugar de desecharla.</p>
        
            <p>🌱 <strong>Recuerda:</strong> cada pequeña acción cuenta cuando se trata de moda sostenible. Si todos tomamos decisiones más conscientes, podemos hacer una gran diferencia en el mundo de la moda.</p>
        `,
        image: "/ropa.jpg",
        date: "12 Abril 2025",
    },
];

const PostDetail = () => {
    const { id } = useParams();
    const post = posts.find((p) => p.id === parseInt(id));

    if (!post) {
        return <div className="p-10 text-center text-red-600">Post no encontrado.</div>;
    }

    return (
        <div className="bg-[#f5f6f1] min-h-screen py-16 px-4 md:px-12">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
                <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-lg mb-6" />
                <h1 className="text-3xl font-bold text-[#2d5e17] mb-2">{post.title}</h1>
                <p className="text-sm text-gray-500 mb-6">{post.date}</p>
                {/* Aquí es donde se muestra el contenido del post */}
                <div
                    className="text-gray-700 leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
                {/* Volver atrás */}
                <div className="mt-8">
                    <Link
                        to="/blog"
                        className="inline-block text-[#2d5e17] font-semibold hover:underline"
                    >
                        ← Volver atrás
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
