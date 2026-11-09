const materialIconClass = "material-symbols-outlined";

export function NewsCard({ article }) {
  return (
    <article className="group bg-surface-container-lowest flex flex-col overflow-hidden rounded-3xl shadow-sm transition-all duration-300 hover:shadow-xl">
      <div className="bg-surface-container relative h-48 w-full overflow-hidden">
        <img
          alt={article.imageAlt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={article.image}
        />
        <span
          className={`font-label-sm text-label-sm absolute top-3 left-3 rounded-full px-3 py-1 shadow-md ${article.categoryClass}`}
        >
          {article.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-3 p-5">
        <div className="flex flex-col gap-2">
          <div className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-2">
            <span className={`${materialIconClass} text-primary text-[15px]`}>
              calendar_today
            </span>
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary-container line-clamp-2 leading-tight transition-colors">
            {article.title}
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        </div>
        <div className="font-label-sm text-label-sm text-on-surface-variant flex items-center justify-between pt-3">
          <span className="flex items-center gap-1">
            <span className={`${materialIconClass} text-[16px]`}>
              {article.authorIcon}
            </span>
            {article.author}
          </span>
          <span className="font-label-md text-label-md text-primary-container inline-flex items-center gap-1 transition-transform group-hover:translate-x-1">
            Baca{" "}
            <span className={`${materialIconClass} text-[16px]`}>
              arrow_forward
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}
