import { Link } from "react-router-dom";

const posts = [
  {
    id: 1,
    title: "5 consejos para reciclar mejor desde casa",
    excerpt:
      "Aprende a separar residuos correctamente y descubre pequeños hábitos con gran impacto ambiental.",
    image: "/slider8.jpg",
    date: "17 Mayo 2025",
  },
  {
    id: 2,
    title: "Cómo hacer manualidades con productos reciclados",
    excerpt:
      "Te contamos qué se puede crear, manipular y modificar productos reciclados a tu gusto",
    image: "/manualidades.jpg",
    date: "30 Abril 2025",
  },
  {
    id: 3,
    title: "Reciclaje tecnológico: ¿qué hacer con tus aparatos viejos?",
    excerpt:
      "Evita contaminar y aprovecha recursos reciclando correctamente dispositivos electrónicos.",
    image: "/paratos_electronicos.jpg",
    date: "21 abril 2025",
  },
  {
    id: 4,
    title: "Moda sostenible: dale una segunda vida a tu ropa",
    excerpt:
      "Descubre cómo puedes reciclar y reutilizar prendas de vestir para reducir el impacto ambiental.",
    image: "/ropa.jpg",
    date: "12 abril 2025",
  },
];

const Blog = () => {
  return (
    <div className=" py-16 px-4 md:px-12 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="dark:text-white text-4xl font-bold  mb-4 text-center">Nuestro Blog</h1>
        <p className="dark:text-white text-center mb-12">
          Historias, consejos y novedades sobre reciclaje y sostenibilidad.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow hover:shadow-lg hover:scale-105 transition-all duration-700"
            >
              <img
                src={post.image}
                alt={post.title}
                className="rounded-t-xl h-48 w-full object-cover"
              />
              <div className="p-6 flex flex-col justify-between h-[300px]">
                <div>
                  <h2 className="text-xl font-bold text-[#2d5e17] mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.date}</span>
                  <Link
                    to={`/blog/post/${post.id}`}
                    className="text-[#2d5e17] font-semibold hover:underline"
                  >
                    Leer más →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
