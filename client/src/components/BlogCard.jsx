/* eslint-disable react/prop-types */
const BlogCard = ({ data }) => {
  return (
    <div
      key={data.id}
      className="overflow-hidden transition-shadow duration-300 rounded shadow-sm"
    >
      <img src={data.imageSrc} className="object-cover w-full h-64" alt="" />
      <div className="p-5 border border-t-0">
        <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
          <a
            href="/"
            className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
            aria-label="Category"
            title={data.category}
          >
            {data.category}
          </a>
          <span className="">— {data.date}</span>
        </p>
        <a
          href="/"
          aria-label="Category"
          title={data.title}
          className="inline-block mb-3 text-2xl leading-8 font-bold transition-colors duration-200 hover:text-deep-purple-accent-700"
        >
          {data.title}
        </a>
        <p className="mb-2 ">{data.content}</p>
        <a
          href="/"
          aria-label=""
          className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
        >
          Learn more
        </a>
      </div>
    </div>
  );
};

export default BlogCard;
